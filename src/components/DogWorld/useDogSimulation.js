// Owns the behavior + physics simulation: one requestAnimationFrame
// loop, driving `motion` values directly (no React re-render per
// frame) and a `useState` label that only changes on state
// transitions (a few times a minute).
//
// Coordinate convention: every position in this file — the dog's
// physics state, the house target, the pointer target — represents
// the dog's *feet* (bottom-center anchor), all sharing one ground
// line near the bottom of the stage. The dog only ever needs to
// move along that ground line in Phase 1 (pointer targets translate
// to "walk to the x under the pointer", not float toward it), so a
// fully general 2D stepper is used but y stays effectively constant.
// Dog.module.css positions the SVG so translate(x, y) lands exactly
// on this feet point (see the negative margin trick there).

import { useEffect, useRef, useState } from "react";
import { useMotionValue } from "motion/react";
import { DOG_CONFIG, DogState } from "./dogConfig";
import { evaluateTransitions, computeEnterPatch } from "./dogStateMachine";
import { stepArriveSteering, clampToBounds, distance } from "./dogPhysics";
import { isPointerRecentlyActive } from "./usePointerTracker";

function rollObservationDelay() {
  const { observationDelayMin, observationDelayMax } = DOG_CONFIG;
  return observationDelayMin + Math.random() * (observationDelayMax - observationDelayMin);
}

export default function useDogSimulation({ stageRef, houseRef, pointerRef, prefersReduced }) {
  const xMV = useMotionValue(0);
  const yMV = useMotionValue(0);
  const facingMV = useMotionValue(1);
  const [dogState, setDogState] = useState(DogState.IDLE);

  const sim = useRef({
    state: DogState.IDLE,
    timeInState: 0,
    lastFrameTime: null,
    physics: { x: 0, y: 0, vx: 0, vy: 0 },
    facing: 1,
    targetType: null,
    observationDelay: rollObservationDelay(),
  });
  const houseAnchor = useRef(null);
  const groundY = useRef(0);
  const bounds = useRef({ minX: 0, maxX: 0, minY: 0, maxY: 0 });
  const initialized = useRef(false);

  // Measure the stage/house geometry, place the dog near (but not
  // on top of) the house the first time we get a real measurement,
  // and re-measure on resize. Runs regardless of reduced-motion so
  // the dog always renders in the right spot even when static.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    function measure() {
      const stageRect = stage.getBoundingClientRect();
      const gy = Math.max(
        DOG_CONFIG.dogHeight,
        stageRect.height - DOG_CONFIG.boundsMarginBottom
      );
      groundY.current = gy;
      bounds.current = {
        minX: DOG_CONFIG.boundsMarginX,
        maxX: Math.max(DOG_CONFIG.boundsMarginX, stageRect.width - DOG_CONFIG.boundsMarginX),
        minY: DOG_CONFIG.dogHeight,
        maxY: gy,
      };

      const houseEl = houseRef.current;
      const houseFrontX = houseEl
        ? houseEl.getBoundingClientRect().left - stageRect.left + DOG_CONFIG.houseWidth * 0.22
        : stageRect.width - DOG_CONFIG.houseWidth;
      houseAnchor.current = { x: houseFrontX, y: gy };

      if (!initialized.current) {
        const startX = Math.max(bounds.current.minX, houseFrontX - DOG_CONFIG.dogWidth * 1.6);
        sim.current.physics = { x: startX, y: gy, vx: 0, vy: 0 };
        xMV.set(startX);
        yMV.set(gy);
        facingMV.set(1);
        initialized.current = true;
      }
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [stageRef, houseRef, xMV, yMV, facingMV]);

  useEffect(() => {
    if (prefersReduced) return undefined; // stays at its placed IDLE position, no autonomous loop

    let rafId;
    let running = true;

    function tick(now) {
      if (!running) return;
      rafId = requestAnimationFrame(tick);
      if (document.visibilityState === "hidden") return; // pause work, keep the loop scheduled

      const s = sim.current;
      const last = s.lastFrameTime ?? now;
      const dt = Math.min((now - last) / 1000, 0.05);
      s.lastFrameTime = now;
      if (dt <= 0 || !houseAnchor.current) return;

      const stageRect = stageRef.current?.getBoundingClientRect();
      if (!stageRect) return;

      const pointer = pointerRef.current;
      const pointerActive = isPointerRecentlyActive(pointer, now);
      const pointerStage = pointerActive
        ? { x: pointer.x - stageRect.left, y: groundY.current }
        : null;

      const pointerInCuriosityZone = Boolean(
        pointerStage && distance(s.physics, pointerStage) <= DOG_CONFIG.curiosityRadius
      );

      let target = null;
      let reachedTarget = false;
      let targetLost = false;

      if (s.state === DogState.WALKING) {
        target =
          s.targetType === "house"
            ? houseAnchor.current
            : pointerStage
            ? {
                x: Math.min(bounds.current.maxX, Math.max(bounds.current.minX, pointerStage.x)),
                y: groundY.current,
              }
            : null;

        if (!target) {
          targetLost = true;
        } else {
          const stopThreshold =
            s.targetType === "pointer" ? DOG_CONFIG.pointerApproachOffset : DOG_CONFIG.stopRadius * 1.5;
          reachedTarget = distance(s.physics, target) <= stopThreshold;
          if (s.targetType === "pointer" && !pointerInCuriosityZone) targetLost = true;
        }
      }

      const ctx = {
        timeInState: s.timeInState,
        pointerInCuriosityZone,
        reachedTarget,
        targetType: s.targetType,
        targetLost,
        observationDelay: s.observationDelay,
        config: DOG_CONFIG,
        rollObservationDelay,
      };

      const nextState = evaluateTransitions(s.state, ctx);
      if (nextState !== s.state) {
        const patch = computeEnterPatch(s.state, nextState, ctx);
        Object.assign(s, patch);
        s.state = nextState;
        s.timeInState = 0;
        setDogState(nextState);
      } else {
        s.timeInState += dt * 1000;
      }

      if (s.state === DogState.WALKING && target) {
        s.physics = stepArriveSteering(s.physics, target, dt, DOG_CONFIG);
        s.physics = clampToBounds(s.physics, bounds.current);
        if (Math.abs(s.physics.vx) > DOG_CONFIG.facingFlipHysteresis) {
          s.facing = s.physics.vx > 0 ? 1 : -1;
        }
      }

      xMV.set(s.physics.x);
      yMV.set(s.physics.y);
      facingMV.set(s.facing);
    }

    rafId = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafId);
    };
  }, [prefersReduced, stageRef, pointerRef, xMV, yMV, facingMV]);

  return { xMV, yMV, facingMV, dogState };
}
