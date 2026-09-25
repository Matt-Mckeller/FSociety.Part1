"use client";

import { useEffect, useState } from "react";
import { RING_SCHEDULE, type RingVariantId } from "../rings";

/**
 * Cycles the compass through {@link RING_SCHEDULE} in order, advancing
 * to the next variant after its `duration` ms elapses. Wraps around
 * indefinitely.
 *
 * The current variant id is intended to be passed as a React `key` on
 * the wrapper so CSS keyframes restart cleanly on each transition.
 *
 * @param initial - starting variant (default: first in schedule)
 */
export function useRingCycle(initial: RingVariantId = RING_SCHEDULE[0].id): RingVariantId {
  const [variant, setVariant] = useState<RingVariantId>(initial);

  useEffect(() => {
    const entry = RING_SCHEDULE.find((s) => s.id === variant);
    if (!entry) return;
    const t = setTimeout(() => {
      const idx = RING_SCHEDULE.findIndex((s) => s.id === variant);
      setVariant(RING_SCHEDULE[(idx + 1) % RING_SCHEDULE.length].id);
    }, entry.duration);
    return () => clearTimeout(t);
  }, [variant]);

  return variant;
}
