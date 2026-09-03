// Single source of truth for every tunable number and color in the
// dog experience. Change behavior/feel here rather than hunting
// through the simulation, physics, or SVG files.

export const DOG_PALETTE = {
  cream: "#F6F3EE",
  furLight: "#EDE6D9",
  furMid: "#D8CD88",
  sage: "#A3B18A",
  sageDeep: "#6B8E6A",
  furDark: "#8D6E63",
  ink: "#5D5A54",
  accent: "#C97A5D",
};

export const DOG_CONFIG = {
  // Stage/world. The dog walks along a single ground line near the
  // bottom of its stage rather than roaming freely in 2D — the
  // stage is short and the pointer can be anywhere on the page
  // (including up over the heading), so "walk to the x position
  // under the pointer, feet on the ground" reads far more coherently
  // than a dog floating toward a point above the grass.
  dogWidth: 64,
  dogHeight: 70,
  houseWidth: 84,
  houseHeight: 76,
  boundsMarginX: 12,
  boundsMarginBottom: 6,

  // Proximity zones, in px from the dog's current position
  curiosityRadius: 220,
  interactionRadius: 90,
  // Standoff distance kept when "walking toward the pointer" so the
  // dog approaches and observes rather than sitting exactly under
  // the cursor.
  pointerApproachOffset: 60,

  // Timing, ms
  observationDelayMin: 150,
  observationDelayMax: 400,
  investigateDurationMs: 2600,
  touchAttentionMs: 1800,

  // Movement physics (arrive-steering)
  maxSpeed: 90, // px/s
  maxAccel: 260, // px/s^2
  arriveRadius: 46, // start decelerating within this distance of target
  stopRadius: 4, // close enough to be "arrived"
  friction: 0.86, // per-second-ish damping applied when no target

  // Orientation
  facingFlipHysteresis: 6, // px/s of vx required to flip facing, avoids jitter at ~0

  // Visual scale
  dogScale: 1,
  houseScale: 1,
};

export const DogState = {
  IDLE: "IDLE",
  LOOKING: "LOOKING",
  CURIOUS: "CURIOUS",
  WALKING: "WALKING",
  INVESTIGATING: "INVESTIGATING",
  RESTING: "RESTING",
};
