// Explicit finite state machine as data: a flat transition table
// (first matching rule wins) instead of scattered booleans or
// nested conditionals. Everything here is pure; only
// `useDogSimulation` has side effects.

import { DogState } from "./dogConfig";

// context (`c`) shape, built fresh each tick by useDogSimulation:
// {
//   timeInState, pointerInCuriosityZone, reachedTarget, targetType,
//   targetLost, observationDelay, config, rollObservationDelay,
// }

export const TRANSITIONS = {
  [DogState.IDLE]: [
    { to: DogState.LOOKING, when: (c) => c.pointerInCuriosityZone },
  ],
  [DogState.LOOKING]: [
    { to: DogState.CURIOUS, when: (c) => c.pointerInCuriosityZone && c.timeInState > c.observationDelay },
    { to: DogState.IDLE, when: (c) => !c.pointerInCuriosityZone },
  ],
  [DogState.CURIOUS]: [
    { to: DogState.WALKING, when: (c) => c.pointerInCuriosityZone && c.timeInState > c.observationDelay },
    { to: DogState.IDLE, when: (c) => !c.pointerInCuriosityZone },
  ],
  [DogState.WALKING]: [
    { to: DogState.INVESTIGATING, when: (c) => c.reachedTarget && c.targetType === "pointer" },
    { to: DogState.RESTING, when: (c) => c.reachedTarget && c.targetType === "house" },
    { to: DogState.IDLE, when: (c) => c.targetLost },
  ],
  [DogState.INVESTIGATING]: [
    { to: DogState.WALKING, when: (c) => c.timeInState > c.config.investigateDurationMs },
  ],
  [DogState.RESTING]: [
    { to: DogState.LOOKING, when: (c) => c.pointerInCuriosityZone },
  ],
};

export function evaluateTransitions(state, ctx) {
  const rules = TRANSITIONS[state] || [];
  for (const rule of rules) {
    if (rule.when(ctx)) return rule.to;
  }
  return state;
}

// Decides what changes when *entering* a new state (previous state
// matters here: WALKING means something different depending on
// whether the dog just got curious about the visitor or just
// finished investigating and is heading home). Returns a plain
// patch object for the caller to apply — this function has no
// side effects itself.
export function computeEnterPatch(prevState, nextState, ctx) {
  if (nextState === DogState.LOOKING || nextState === DogState.CURIOUS) {
    return { observationDelay: ctx.rollObservationDelay() };
  }

  if (nextState === DogState.WALKING) {
    if (prevState === DogState.INVESTIGATING) {
      return { targetType: "house" };
    }
    return { targetType: "pointer" };
  }

  return {};
}

