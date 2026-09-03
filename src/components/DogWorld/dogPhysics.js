// Pure, framework-agnostic movement math. No React, no motion
// values in here — just numbers in, numbers out, so the feel can be
// reasoned about (and re-tuned) independently of rendering.

export function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function withinRadius(a, b, radius) {
  return distance(a, b) <= radius;
}

// Semi-implicit Euler "arrive" steering: accelerate toward the
// target, capped at maxSpeed, decelerating within arriveRadius so
// the dog settles at the target instead of overshooting/oscillating
// (the property a spring targeting a fixed point would not have).
export function stepArriveSteering(state, target, dt, cfg) {
  const { x, y, vx, vy } = state;

  if (!target) {
    // No destination: bleed off velocity via friction.
    const decay = Math.pow(cfg.friction, dt * 60);
    const nvx = vx * decay;
    const nvy = vy * decay;
    return { x: x + nvx * dt, y: y + nvy * dt, vx: nvx, vy: nvy };
  }

  const toTargetX = target.x - x;
  const toTargetY = target.y - y;
  const dist = Math.hypot(toTargetX, toTargetY);

  if (dist <= cfg.stopRadius) {
    return { x: target.x, y: target.y, vx: 0, vy: 0 };
  }

  const desiredSpeed = dist < cfg.arriveRadius ? cfg.maxSpeed * (dist / cfg.arriveRadius) : cfg.maxSpeed;
  const dirX = toTargetX / dist;
  const dirY = toTargetY / dist;
  const desiredVx = dirX * desiredSpeed;
  const desiredVy = dirY * desiredSpeed;

  // Steer velocity toward the desired velocity, capped by maxAccel.
  let ax = desiredVx - vx;
  let ay = desiredVy - vy;
  const accelMag = Math.hypot(ax, ay);
  if (accelMag > cfg.maxAccel) {
    const scale = cfg.maxAccel / accelMag;
    ax *= scale;
    ay *= scale;
  }

  const nvx = vx + ax * dt;
  const nvy = vy + ay * dt;
  return { x: x + nvx * dt, y: y + nvy * dt, vx: nvx, vy: nvy };
}

export function clampToBounds(state, bounds) {
  const { minX, maxX, minY, maxY } = bounds;
  let { x, y, vx, vy } = state;
  if (x < minX) { x = minX; vx = Math.max(vx, 0); }
  if (x > maxX) { x = maxX; vx = Math.min(vx, 0); }
  if (y < minY) { y = minY; vy = Math.max(vy, 0); }
  if (y > maxY) { y = maxY; vy = Math.min(vy, 0); }
  return { x, y, vx, vy };
}
