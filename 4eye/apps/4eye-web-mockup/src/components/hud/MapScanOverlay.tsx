"use client";

/**
 * MapScanOverlay — renders a weighted-random scan sweep animation over the
 * full-screen map surface.
 *
 * Behaviour:
 *   • When `active` becomes true: sweeps immediately, again +5 s, then every 15 s.
 *   • Each sweep picks a wave variant via `useScanCycle` (WideGlide = 50 %).
 *   • `key={scanKey}` on the inner element forces a DOM remount which restarts
 *     the CSS animation from the beginning.
 *   • Hidden completely when `active` is false (no DOM cost at all).
 *
 * The component owns its own clip container (overflow: hidden) so callers
 * don't need to add one. Pass `sx` to control zIndex or other context-
 * specific positioning from the parent.
 *
 * Reduced-motion: all bar elements include a prefers-reduced-motion guard
 * that hides the animation.
 */

import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material";
import { useScanCycle } from "./useScanCycle";
import { WAVE_DEFS, WAVE_V_MASK } from "./scanWaves";

export interface MapScanOverlayProps {
  /** Show and schedule sweeps when true; fully hidden when false. */
  active: boolean;
  /** Primary brand colour — used to derive the bar gradient and glow. */
  color: string;
  /** Extra MUI sx overrides applied to the clip container (e.g. zIndex). */
  sx?: SxProps<Theme>;
}

export function MapScanOverlay({ active, color, sx }: MapScanOverlayProps) {
  const { scanKey, waveId } = useScanCycle(active);

  if (!active) return null;

  const def = WAVE_DEFS[waveId];

  return (
    // Clip container — overflow:hidden so bars that overshoot don't bleed
    // outside the map surface. Position covers the full parent.
    <Box
      aria-hidden
      sx={{
        position:      "absolute",
        inset:         0,
        overflow:      "hidden",
        pointerEvents: "none",
        ...sx,
      }}
    >
      {/* Keyed inner wrapper — remounting this resets all bar animations. */}
      <Box key={scanKey} sx={{ position: "absolute", inset: 0 }}>
        {def.bars.map((bar, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              top:       0,
              left:      0,
              width:     `${def.barWidth}px`,
              height:    "100%",
              background:      def.gradient(color),
              WebkitMaskImage: WAVE_V_MASK,
              maskImage:       WAVE_V_MASK,
              ...(def.boxShadow ? { boxShadow: def.boxShadow(color) } : {}),
              [`@keyframes ${def.kfName}`]: def.keyframes,
              animation: `${def.kfName} ${def.cycleDur} linear ${bar.delayMs}ms infinite`,
              "@media (prefers-reduced-motion: reduce)": { display: "none" },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
