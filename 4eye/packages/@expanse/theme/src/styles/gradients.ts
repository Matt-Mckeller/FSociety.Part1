/**
 * Common gradient styles
 * Provides reusable gradient patterns
 */

import type { SxProps, Theme } from "@mui/material"

/**
 * Gradient direction
 */
export type GradientDirection =
  | "to-bottom"
  | "to-top"
  | "to-right"
  | "to-left"
  | "to-bottom-right"
  | "to-bottom-left"
  | "to-top-right"
  | "to-top-left"

/**
 * Convert gradient direction to CSS value
 */
function getGradientDirection(direction: GradientDirection): string {
  return direction.replace(/-/g, " ");
}

/**
 * Create linear gradient background
 * 
 * @param from - Start color
 * @param to - End color
 * @param direction - Gradient direction
 * @returns MUI sx props with gradient
 * 
 * @example
 * ```tsx
 * <Box sx={linearGradient('#ff0000', '#0000ff', 'to-bottom')}>
 *   Gradient background
 * </Box>
 * ```
 */
export function linearGradient(
  from: string,
  to: string,
  direction: GradientDirection = "to-bottom"
): SxProps<Theme> {
  return {
    background: `linear-gradient(${getGradientDirection(direction)}, ${from}, ${to})`,
  }
}

/**
 * Create radial gradient background
 * 
 * @param from - Center color
 * @param to - Edge color
 * @returns MUI sx props with radial gradient
 * 
 * @example
 * ```tsx
 * <Box sx={radialGradient('#ff0000', '#0000ff')}>
 *   Radial gradient
 * </Box>
 * ```
 */
export function radialGradient(from: string, to: string): SxProps<Theme> {
  return {
    background: `radial-gradient(circle, ${from}, ${to})`,
  }
}

/**
 * Primary gradient overlay (indigo/purple)
 */
export function primaryGradientOverlay(
  direction: GradientDirection = "to-bottom",
  opacity: number = 0.1
): SxProps<Theme> {
  return linearGradient(
    `rgba(99, 102, 241, ${opacity})`,
    "transparent",
    direction
  )
}

/**
 * Accent gradient overlay (customizable)
 */
export function accentGradientOverlay(
  color: string = "rgb(99, 102, 241)",
  direction: GradientDirection = "to-bottom",
  opacity: number = 0.1
): SxProps<Theme> {
  // Parse color to add opacity
  const colorWithOpacity = color.startsWith("rgb")
    ? color.replace("rgb", "rgba").replace(")", `, ${opacity})`)
    : `${color}${Math.round(opacity * 255).toString(16)}`

  return linearGradient(colorWithOpacity, "transparent", direction)
}

/**
 * Dark gradient overlay (for overlays on bright content)
 */
export function darkOverlayGradient(
  direction: GradientDirection = "to-bottom",
  opacity: number = 0.5
): SxProps<Theme> {
  return linearGradient(
    `rgba(0, 0, 0, ${opacity})`,
    "transparent",
    direction
  )
}

/**
 * Light gradient overlay (for overlays on dark content)
 */
export function lightOverlayGradient(
  direction: GradientDirection = "to-bottom",
  opacity: number = 0.3
): SxProps<Theme> {
  return linearGradient(
    `rgba(255, 255, 255, ${opacity})`,
    "transparent",
    direction
  )
}

/**
 * Shimmer/shine effect gradient for loading states
 */
export function shimmerGradient(): SxProps<Theme> {
  return {
    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 2s infinite",
    "@keyframes shimmer": {
      "0%": { backgroundPosition: "-200% 0" },
      "100%": { backgroundPosition: "200% 0" },
    },
  }
}
