/**
 * Motion — maps a lens motion personality to a base animation duration
 * (seconds). Shells multiply this against their own per-element factors.
 */

import type { LensMotion } from "./types"

export const MOTION_DURATION: Record<LensMotion, number> = {
  calm: 6,
  steady: 3.6,
  lively: 2,
  intense: 1.1,
}

/** Resolve the base duration (s) for a motion personality. */
export function durationFor(motion: LensMotion = "steady"): number {
  return MOTION_DURATION[motion] ?? MOTION_DURATION.steady
}
