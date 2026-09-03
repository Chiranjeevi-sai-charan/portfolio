// Composition root for the interactive dog experience: a small,
// purely decorative world living at the bottom of the hero's text
// column. Notices the visitor's pointer, gets curious, walks over
// to look, then heads home to rest — never intercepts a click, a
// scroll, or keyboard focus (aria-hidden, pointer-events:none is
// applied by the caller's slot class in Home.module.css).

import { useRef } from "react";
import { useReducedMotion } from "motion/react";
import Dog from "./Dog";
import DogHouse from "./DogHouse";
import useDogSimulation from "./useDogSimulation";
import usePointerTracker from "./usePointerTracker";
import styles from "./DogWorld.module.css";

export default function DogWorld({ className }) {
  const stageRef = useRef(null);
  const houseRef = useRef(null);
  const pointerRef = usePointerTracker();
  const prefersReduced = useReducedMotion();

  const { xMV, yMV, facingMV, dogState } = useDogSimulation({
    stageRef,
    houseRef,
    pointerRef,
    prefersReduced,
  });

  return (
    <div ref={stageRef} className={[styles.stage, className].filter(Boolean).join(" ")} aria-hidden="true">
      <DogHouse ref={houseRef} />
      <Dog x={xMV} y={yMV} scaleX={facingMV} pose={dogState} />
    </div>
  );
}
