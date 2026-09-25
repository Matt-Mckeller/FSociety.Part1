"use client";

/**
 * useCatalogReveal — encapsulates the reveal lifecycle for the Catalog slide.
 *
 * Tracks `pillsVisible` (false until the BrandWordplay headline reaches its
 * final stage), and resets it whenever the slide becomes inactive so re-entry
 * re-animates the modality grid reveal.
 *
 * A watchdog timeout forces `pillsVisible` true after the maximum expected
 * animation duration (~5 500 ms) in case the animation callback is ever
 * silently skipped (e.g. stale closure, tab backgrounding, slow device).
 */

import { useCallback, useEffect, useState } from "react";

// Total animation time: HOLD[0](500) + scramble(520) + HOLD[1](2200) + scramble(520) ≈ 3 740 ms
// Watchdog fires 1 750 ms after that to guarantee the content always appears.
const WATCHDOG_MS = 5_500;

export interface UseCatalogRevealResult {
  pillsVisible: boolean;
  markFinalStageReached: () => void;
}

export function useCatalogReveal(isActive: boolean): UseCatalogRevealResult {
  const [pillsVisible, setPillsVisible] = useState(false);

  // Reset when the slide becomes inactive so re-entry re-animates the reveal.
  // Also arm the watchdog whenever the slide becomes active.
  useEffect(() => {
    if (!isActive) {
      setPillsVisible(false);
      return;
    }

    // Watchdog: force reveal if the animation hasn't fired within expected time.
    const watchdog = window.setTimeout(() => {
      setPillsVisible(true);
    }, WATCHDOG_MS);

    return () => clearTimeout(watchdog);
  }, [isActive]);

  const markFinalStageReached = useCallback(() => {
    setPillsVisible(true);
  }, []);

  return { pillsVisible, markFinalStageReached };
}
