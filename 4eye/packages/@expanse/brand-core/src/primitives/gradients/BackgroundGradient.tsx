/**
 * BackgroundGradient - Theme-aware diagonal gradient for vector graphics
 *
 * Creates a linear gradient that follows the brand's "darkness to light" / "growth" theme.
 * The gradient direction and colors adapt to dark/light mode.
 *
 * ## Design Pattern
 * This gradient creates a configurable diagonal split that represents:
 * - **Growth**: Small to large, expansion
 * - **Darkness to Light**: Progression, enlightenment, hope
 * - **Transformation**: Turning negative to positive
 *
 * ## Split Modes
 * - **soft**: Smooth transition across the full gradient (default)
 * - **hard**: Sharp 50/50 split with minimal transition zone
 * - **sharp**: Pure 50/50 split with no transition
 *
 * ## Usage
 * Place in SVG `<defs>`, then reference with `fill="url(#gradient-id)"`
 *
 * ```tsx
 * <defs>
 *   <BackgroundGradient id="my-gradient" />
 *   <BackgroundGradient id="hard-gradient" split="hard" />
 * </defs>
 * <rect fill="url(#my-gradient)" ... />
 * ```
 */

"use client"

import React from "react"
import { useTheme } from "@mui/system"

export type GradientDirection =
  | "bottom-left-to-top-right" // Default: diagonal growth upward
  | "top-left-to-bottom-right" // Diagonal descending
  | "left-to-right" // Horizontal progress
  | "right-to-left" // Horizontal reverse
  | "bottom-to-top" // Vertical ascent
  | "top-to-bottom" // Vertical descent

export type GradientSplit = "soft" | "hard" | "sharp"

export interface GradientStop {
  offset: number | string
  color?: string
  opacity?: number
}

export interface BackgroundGradientProps {
  /** Unique ID for the gradient (required for SVG reference) */
  id: string
  /** Gradient direction */
  direction?: GradientDirection
  /** Split mode: soft (smooth), hard (50/50 with small transition), sharp (50/50 exact) */
  split?: GradientSplit
  /** Custom start color (overrides theme) */
  startColor?: string
  /** Custom end color (overrides theme) */
  endColor?: string
  /** Custom gradient stops (overrides split and colors) */
  stops?: GradientStop[]
}

/**
 * Get x1, y1, x2, y2 coordinates for gradient direction
 */
function getGradientCoordinates(direction: GradientDirection): {
  x1: string
  y1: string
  x2: string
  y2: string
} {
  switch (direction) {
    case "top-left-to-bottom-right":
      return { x1: "0", y1: "0", x2: "1", y2: "1" }
    case "left-to-right":
      return { x1: "0", y1: "0.5", x2: "1", y2: "0.5" }
    case "right-to-left":
      return { x1: "1", y1: "0.5", x2: "0", y2: "0.5" }
    case "bottom-to-top":
      return { x1: "0.5", y1: "1", x2: "0.5", y2: "0" }
    case "top-to-bottom":
      return { x1: "0.5", y1: "0", x2: "0.5", y2: "1" }
    case "bottom-left-to-top-right":
    default:
      return { x1: "0", y1: "1", x2: "1", y2: "0" }
  }
}

/**
 * Generate stops based on split mode
 */
function generateSplitStops(
  split: GradientSplit,
  startColor: string,
  endColor: string,
): GradientStop[] {
  switch (split) {
    case "sharp":
      // Pure 50/50 split - no transition
      return [
        { offset: 0, color: startColor },
        { offset: 0.5, color: startColor },
        { offset: 0.5, color: endColor },
        { offset: 1, color: endColor },
      ]
    case "hard":
      // 50/50 with small transition zone (45%-55%)
      return [
        { offset: 0, color: startColor },
        { offset: 0.45, color: startColor },
        { offset: 0.55, color: endColor },
        { offset: 1, color: endColor },
      ]
    case "soft":
    default:
      // Smooth transition across full gradient
      return [
        { offset: 0, color: startColor },
        { offset: 1, color: endColor },
      ]
  }
}

export function BackgroundGradient({
  id,
  direction = "bottom-left-to-top-right",
  split = "soft",
  startColor: customStartColor,
  endColor: customEndColor,
  stops: customStops,
}: BackgroundGradientProps) {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === "dark"

  // Default theme-aware colors (darkness to light)
  const defaultStartColor = theme.palette.background.default
  const defaultEndColor = isDarkMode
    ? theme.palette.primary.light
    : theme.palette.primary.dark

  const startColor = customStartColor ?? defaultStartColor
  const endColor = customEndColor ?? defaultEndColor

  const coords = getGradientCoordinates(direction)

  // Use custom stops if provided, otherwise generate from split mode
  const gradientStops =
    customStops ?? generateSplitStops(split, startColor, endColor)

  return (
    <linearGradient
      id={id}
      x1={coords.x1}
      y1={coords.y1}
      x2={coords.x2}
      y2={coords.y2}
      gradientUnits="objectBoundingBox"
    >
      {gradientStops.map((stop, index) => (
        <stop
          key={`${id}-stop-${index}`}
          offset={
            typeof stop.offset === "number"
              ? `${stop.offset * 100}%`
              : stop.offset
          }
          stopColor={stop.color ?? (index === 0 ? startColor : endColor)}
          stopOpacity={stop.opacity}
        />
      ))}
    </linearGradient>
  )
}

// ============================================================
// PRESET GRADIENTS
// ============================================================

/**
 * Preset gradient configurations for common use cases
 */
export const GRADIENT_PRESETS = {
  /** Default growth gradient: dark (bottom-left) to light (top-right) */
  growth: {
    direction: "bottom-left-to-top-right" as const,
    split: "soft" as const,
  },
  /** Hard 50/50 split diagonal */
  splitDiagonal: {
    direction: "bottom-left-to-top-right" as const,
    split: "hard" as const,
  },
  /** Sharp 50/50 split diagonal */
  sharpDiagonal: {
    direction: "bottom-left-to-top-right" as const,
    split: "sharp" as const,
  },
  /** Horizontal progress (left to right) */
  horizontalProgress: {
    direction: "left-to-right" as const,
    split: "soft" as const,
  },
  /** Vertical ascent (bottom to top) */
  verticalAscent: {
    direction: "bottom-to-top" as const,
    split: "soft" as const,
  },
} as const
