"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useStepProgress
 *
 * Drives a 0→1 visual progress value over the active step's duration.
 * Resets to 0 whenever `activeIdx` changes; clamps at 1 and STAYS at 1
 * — never auto-advances. The fill is purely a visual countdown that
 * tells the user "this is roughly how long the slide was tuned to
 * read for"; the user always drives the actual advance.
 *
 * Tab-visibility pause: while `document.hidden` is true the RAF loop
 * stops, so the progress doesn't burn through while the user is on
 * another tab.
 *
 * @param activeIdx  0-based index of the active step.
 * @param durationMs Active step's full duration in ms (e.g. from
 *                   `SLIDE_DURATIONS_MS[activeIdx]`).
 * @param enabled    Gate (e.g. intro complete) — when false, returns 0.
 */
export function useStepProgress({
  activeIdx,
  durationMs,
  enabled = true,
}: {
  activeIdx: number;
  durationMs: number;
  enabled?: boolean;
}): number {
  const [progress, setProgress] = useState(0);
  const startedAtRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setProgress(0);
    if (!enabled || durationMs <= 0) return;

    let cancelled = false;
    startedAtRef.current = performance.now();

    const tick = () => {
      if (cancelled) return;
      if (typeof document !== "undefined" && document.hidden) {
        // Pause the clock: re-anchor so when the tab returns we don't
        // jump forward by the offscreen elapsed time.
        startedAtRef.current = performance.now() - progressToElapsed(progress, durationMs);
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const elapsed = performance.now() - startedAtRef.current;
      const p = Math.min(1, elapsed / durationMs);
      setProgress(p);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
    // We intentionally exclude `progress` — it's read inside the closure
    // only to re-anchor on tab visibility change, and including it would
    // restart the RAF chain on every frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx, durationMs, enabled]);

  return progress;
}

function progressToElapsed(progress: number, durationMs: number): number {
  return Math.max(0, Math.min(1, progress)) * durationMs;
}
