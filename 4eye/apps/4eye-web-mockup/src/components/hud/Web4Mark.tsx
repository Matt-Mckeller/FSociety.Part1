"use client";

/**
 * Web4Mark — the app realm's glyph, standing in for the word "App".
 *
 * Concentric rings pulsing outward from a cored globe: the soundwave/ripple
 * reading at a glance, the meridian giving it the globe reading up close.
 *
 * Deliberately not `SpinningGlobe` from the goals set. That component draws
 * recognisable continents on a 100-unit sphere and is built for ~84px; at the
 * 16px this slot allows, the landmasses collapse into noise. Rings survive the
 * size, and they echo the ring language already used by the character compass.
 */

import { Box, keyframes } from "@mui/material";

const ripple = keyframes`
  0%   { transform: scale(0.45); opacity: 0; }
  25%  { opacity: 0.85; }
  100% { transform: scale(1);    opacity: 0; }
`;

export interface Web4MarkProps {
  size?: number;
  /** Dim the mark when its realm is not the active one. */
  active?: boolean;
}

export function Web4Mark({ size = 16, active = true }: Web4MarkProps) {
  return (
    <Box
      aria-hidden
      sx={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
        lineHeight: 0,
        opacity: active ? 1 : 0.58,
        transition: "opacity 180ms ease",
      }}
    >
      {/* Pulsing rings. Three, staggered, so one is always mid-travel. */}
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          component="span"
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid currentColor",
            animation: `${ripple} 2.4s ease-out ${i * 0.8}s infinite`,
            "@media (prefers-reduced-motion: reduce)": {
              animation: "none",
              opacity: 0.28,
              transform: "scale(1)",
            },
          }}
        />
      ))}

      {/* Core: a small sphere with one meridian and one equator. */}
      <Box
        component="svg"
        viewBox="0 0 24 24"
        sx={{ position: "relative", width: "100%", height: "100%", display: "block" }}
      >
        <circle cx="12" cy="12" r="5.25" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="12" cy="12" rx="2.2" ry="5.25" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.75" />
        <path d="M6.9 12h10.2" stroke="currentColor" strokeWidth="1.1" opacity="0.75" />
      </Box>
    </Box>
  );
}
