"use client"

import React from "react"
import { Box, type BoxProps, type SxProps, type Theme } from "@mui/material"
import type { SystemProps } from "@mui/system"

/**
 * WaterBackground — solid panel-blue base with two oversized SVG
 * fractal-noise tiles drifting on different axes, speeds, and blend
 * modes. The interference between the two layers reads as gentle
 * rippling water without any color shift.
 *
 * Usage:
 * ```tsx
 * <Box sx={{ position: "relative", ... }}>
 *   <WaterBackground />
 *   {children}
 * </Box>
 * ```
 *
 * Or as a self-contained surface (gives itself a solid color fill):
 * ```tsx
 * <WaterBackground bgcolor="#2C4F76" sx={{ position: "absolute", inset: 0 }}>
 *   {content}
 * </WaterBackground>
 * ```
 *
 * Defaults to absolutely-positioned `inset: 0` so it can be dropped
 * straight into a `position: relative` parent as a backdrop.
 *
 * Constraints:
 * - Texture opacity ≤ 0.14 — reads as shimmer, not pattern.
 * - Slow loops (28s + 44s reverse).
 * - Respects `prefers-reduced-motion`.
 * - `pointerEvents: none` so it never intercepts clicks.
 */

export interface WaterBackgroundProps extends Omit<BoxProps, "children"> {
  /**
   * Optional solid base color. If omitted, the component renders only
   * the two animated noise layers (transparent base) so it can sit on
   * top of any existing fill / gradient.
   *
   * Pass a hex / theme token (e.g. `"#2C4F76"` or
   * `"background.dark"`) to make the component its own surface.
   */
  bgcolor?: SystemProps<Theme>["bgcolor"]
  /**
   * Optional children rendered above the noise layers (still inside
   * the same wrapper). Most callers leave this empty and place
   * content as siblings in the parent instead.
   */
  children?: React.ReactNode
  /**
   * Disable both animations (still renders the noise layers
   * statically). Defaults to `false`. Reduced-motion users get this
   * automatically via media query.
   */
  motionDisabled?: boolean
}

const NOISE_A_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")"

const NOISE_B_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='480' height='480'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")"

export function WaterBackground({
  bgcolor,
  children,
  motionDisabled = false,
  sx,
  ...boxProps
}: WaterBackgroundProps) {
  const rootSx: SxProps<Theme> = {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    pointerEvents: "none",
    ...(bgcolor !== undefined ? { bgcolor } : null),
    ...(sx as object),
  }

  const layerABase: SxProps<Theme> = {
    position: "absolute",
    inset: "-40%",
    opacity: 0.14,
    mixBlendMode: "overlay",
    backgroundImage: NOISE_A_URL,
  }
  const layerBBase: SxProps<Theme> = {
    position: "absolute",
    inset: "-40%",
    opacity: 0.10,
    mixBlendMode: "soft-light",
    backgroundImage: NOISE_B_URL,
  }

  const layerAMotion: SxProps<Theme> = motionDisabled
    ? {}
    : {
        animation: "waterNoisePanA 28s linear infinite",
        "@keyframes waterNoisePanA": {
          "0%":   { transform: "translate(0%, 0%) scale(1)" },
          "50%":  { transform: "translate(-12%, -8%) scale(1.04)" },
          "100%": { transform: "translate(-24%, 0%) scale(1)" },
        },
        "@media (prefers-reduced-motion: reduce)": { animation: "none" },
      }

  const layerBMotion: SxProps<Theme> = motionDisabled
    ? {}
    : {
        animation: "waterNoisePanB 44s linear infinite reverse",
        "@keyframes waterNoisePanB": {
          "0%":   { transform: "translate(0%, 0%) scale(1)" },
          "50%":  { transform: "translate(8%, -10%) scale(1.06)" },
          "100%": { transform: "translate(16%, 4%) scale(1)" },
        },
        "@media (prefers-reduced-motion: reduce)": { animation: "none" },
      }

  return (
    <Box aria-hidden {...boxProps} sx={rootSx}>
      <Box sx={{ ...layerABase, ...layerAMotion } as SxProps<Theme>} />
      <Box sx={{ ...layerBBase, ...layerBMotion } as SxProps<Theme>} />
      {children}
    </Box>
  )
}

export default WaterBackground
