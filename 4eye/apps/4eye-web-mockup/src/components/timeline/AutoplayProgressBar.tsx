"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export interface AutoplayProgressBarProps {
  /** Duration, in ms, of the slide currently auto-advancing. `null` hides the bar. */
  durationMs: number | null | undefined;
  /** Identifier that resets the bar to 0% on change. */
  resetKey: string | number | undefined;
  /** Hex / CSS color for the fill. */
  color: string;
  /** Bar height in px. Defaults to 3. */
  thickness?: number;
  /** Optional sx overrides for the wrapper. */
  position?: "absolute" | "relative";
  /** Side anchoring — by default the bar fills from `left: 0`. Use "right"
   *  to mirror the fill (drains right-to-left); rarely needed. */
  fillFrom?: "left" | "right";
}

/**
 * Thin top-of-timeline progress bar that visualizes the per-slide
 * auto-advance timer.
 *
 * Implementation: drives a single `width: 0%` → `width: 100%` transition
 * via CSS (`transition: width <durationMs>ms linear`). On `resetKey`
 * change the bar snaps back to 0% with `transition: none`, then on the
 * next animation frame re-enables the transition and tweens to 100%.
 * Avoids requestAnimationFrame loops or React-driven ticking — the
 * browser handles the interpolation natively.
 *
 * Hidden (display: none) when `durationMs` is null/undefined so callers
 * can drive the bar's visibility via the same prop that drives its rate.
 */
export function AutoplayProgressBar({
  durationMs,
  resetKey,
  color,
  thickness = 3,
  position = "absolute",
  fillFrom = "left",
}: AutoplayProgressBarProps) {
  // Tri-state: -1 = freshly reset (snap to 0%, no transition);
  //             0 = ready to animate (width: 0%, transition enabled);
  //           100 = animate to 100%.
  const [phase, setPhase] = useState<-1 | 0 | 100>(-1);

  useEffect(() => {
    if (durationMs == null) return;
    // Snap to 0% with no transition.
    setPhase(-1);
    // Two rAFs: first to flush the no-transition snap, second to
    // re-enable the transition and tween to 100%. One rAF is sometimes
    // batched by React with the snap, leaving the bar at 0% forever.
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => setPhase(100));
      // Stash for cleanup via closure.
      return () => cancelAnimationFrame(r2);
    });
    return () => cancelAnimationFrame(r1);
  }, [resetKey, durationMs]);

  if (durationMs == null) return null;

  const transition =
    phase === -1 ? "none" : `width ${durationMs}ms linear`;
  const width = phase === 100 ? "100%" : "0%";

  return (
    <Box
      aria-hidden
      sx={{
        position,
        top: 0,
        [fillFrom]: 0,
        height: thickness,
        width,
        bgcolor: color,
        borderRadius: `${thickness / 2}px ${thickness / 2}px 0 0`,
        transition,
        pointerEvents: "none",
        zIndex: 11,
      }}
    />
  );
}
