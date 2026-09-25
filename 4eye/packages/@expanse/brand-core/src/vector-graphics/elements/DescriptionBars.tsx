"use client"
import React from "react"
import { Box } from "@mui/material"
import { useTheme, alpha, SxProps, Theme } from "@mui/material/styles"

// =============================================================================
// Types
// =============================================================================

export type DescriptionBarsVariant = "default" | "growth" | "stairs" | "descending"

export interface DescriptionBarsProps {
  /**
   * Visual arrangement variant:
   * - default: standard text placeholder bars
   * - growth: bars progressively get longer (small to large, 1:2:3 pattern)
   * - stairs: stepped staircase pattern
   * - descending: bars progressively get shorter (large to small)
   */
  variant?: DescriptionBarsVariant
  /**
   * Number of bars to display (default varies by variant)
   */
  barCount?: number
  /**
   * Bar height in pixels
   */
  barHeight?: number
  /**
   * Gap between bars in pixels
   */
  gap?: number
  /**
   * Maximum bar width in pixels
   */
  maxWidth?: number
  /**
   * Minimum bar width in pixels (for varying widths)
   */
  minWidth?: number
  /**
   * Bar color override (uses theme-aware default if not provided)
   */
  color?: string
  /**
   * Opacity of the bars
   */
  opacity?: number
  /**
   * Border radius of bars
   */
  borderRadius?: number
  /**
   * Additional sx props
   */
  sx?: SxProps<Theme>
}

// =============================================================================
// Helper Functions
// =============================================================================

function getDefaultBarCount(variant: DescriptionBarsVariant): number {
  switch (variant) {
    case "growth":
      return 3 // 1:2:3 pattern
    case "stairs":
      return 4
    case "descending":
      return 3
    default:
      return 3
  }
}

function getBarWidths(
  variant: DescriptionBarsVariant,
  barCount: number,
  maxWidth: number,
  minWidth: number
): number[] {
  const widthRange = maxWidth - minWidth

  switch (variant) {
    case "growth":
      // Progressive growth: small to large (1:2:3 pattern)
      return Array.from({ length: barCount }, (_, i) => {
        const ratio = (i + 1) / barCount
        return minWidth + widthRange * ratio
      })

    case "stairs":
      // Stepped staircase: alternating pattern
      return Array.from({ length: barCount }, (_, i) => {
        // Creates a stepped pattern: [short, medium, long, medium]
        const step = i % 4
        const ratios = [0.3, 0.55, 1, 0.7]
        return minWidth + widthRange * ratios[step]
      })

    case "descending":
      // Progressive descent: large to small
      return Array.from({ length: barCount }, (_, i) => {
        const ratio = (barCount - i) / barCount
        return minWidth + widthRange * ratio
      })

    default:
      // Default: natural variation like text
      return Array.from({ length: barCount }, (_, i) => {
        // Simulates natural text line lengths
        const patterns = [0.9, 1, 0.7, 0.85, 0.6]
        const ratio = patterns[i % patterns.length]
        return maxWidth * ratio
      })
  }
}

// =============================================================================
// Component
// =============================================================================

export function DescriptionBars({
  variant = "default",
  barCount,
  barHeight = 10,
  gap = 6,
  maxWidth = 120,
  minWidth = 40,
  color,
  opacity = 0.56,
  borderRadius = 4,
  sx,
}: DescriptionBarsProps) {
  const theme = useTheme()

  // Determine bar count
  const count = barCount ?? getDefaultBarCount(variant)

  // Calculate widths for each bar
  const widths = getBarWidths(variant, count, maxWidth, minWidth)

  // Determine bar color (theme-aware)
  const barColor =
    color ??
    (theme.palette.mode === "dark"
      ? alpha(theme.palette.common.white, 0.77)
      : alpha(theme.palette.grey[700], 0.7))

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: `${gap}px`,
        ...sx,
      }}
    >
      {widths.map((width, index) => (
        <Box
          key={index}
          sx={{
            width: `${width}px`,
            height: `${barHeight}px`,
            backgroundColor: barColor,
            opacity,
            borderRadius: `${borderRadius}px`,
            transition: "width 0.3s ease-out",
          }}
        />
      ))}
    </Box>
  )
}

// =============================================================================
// Preset Components
// =============================================================================

/**
 * Standard text placeholder bars with natural variation
 */
export function DefaultDescriptionBars(
  props: Omit<DescriptionBarsProps, "variant">
) {
  return <DescriptionBars variant="default" {...props} />
}

/**
 * Growth pattern bars (small to large, 1:2:3)
 * Represents progression, learning, improvement
 */
export function GrowthDescriptionBars(
  props: Omit<DescriptionBarsProps, "variant">
) {
  return <DescriptionBars variant="growth" {...props} />
}

/**
 * Staircase pattern bars
 * Represents steps, progress, achievement levels
 */
export function StairsDescriptionBars(
  props: Omit<DescriptionBarsProps, "variant">
) {
  return <DescriptionBars variant="stairs" {...props} />
}

/**
 * Descending pattern bars (large to small)
 * Represents completion, narrowing down, focus
 */
export function DescendingDescriptionBars(
  props: Omit<DescriptionBarsProps, "variant">
) {
  return <DescriptionBars variant="descending" {...props} />
}

// =============================================================================
// SVG Version (for use in vector graphics)
// =============================================================================

export interface DescriptionBarsSvgProps {
  variant?: DescriptionBarsVariant
  barCount?: number
  barHeight?: number
  gap?: number
  maxWidth?: number
  minWidth?: number
  fill?: string
  opacity?: number
  rx?: number
  x?: number
  y?: number
}

/**
 * SVG version of DescriptionBars for embedding in SVG vector graphics
 */
export function DescriptionBarsSvg({
  variant = "default",
  barCount,
  barHeight = 10,
  gap = 6,
  maxWidth = 120,
  minWidth = 40,
  fill = "currentColor",
  opacity = 0.56,
  rx = 4,
  x = 0,
  y = 0,
}: DescriptionBarsSvgProps) {
  const count = barCount ?? getDefaultBarCount(variant)
  const widths = getBarWidths(variant, count, maxWidth, minWidth)

  return (
    <g transform={`translate(${x}, ${y})`}>
      {widths.map((width, index) => (
        <rect
          key={index}
          x={0}
          y={index * (barHeight + gap)}
          width={width}
          height={barHeight}
          rx={rx}
          ry={rx}
          fill={fill}
          opacity={opacity}
        />
      ))}
    </g>
  )
}

export default DescriptionBars
