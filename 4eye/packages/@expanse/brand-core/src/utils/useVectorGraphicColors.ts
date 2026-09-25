/**
 * useVectorGraphicColors - Hook for consistent vector graphic coloring
 *
 * Provides theme-aware colors for vector graphics, optimized for the
 * multi-layer stroke pattern that creates the Expanse "glow" effect.
 *
 * ## Three-Layer Color Philosophy
 *
 * The colors create a progression from diffuse → concentrated:
 * - **Outer**: Low opacity (15-20%) - soft glow/halo
 * - **Center**: Medium opacity (40-50%) - transition zone
 * - **Inner**: High opacity (80-100%) - sharp definition
 *
 * ## Color Design Principles
 *
 * 1. **Complementary**: Colors work together to create depth
 * 2. **Theme-aware**: Adapts to light/dark mode
 * 3. **Primary-based**: Uses theme primary color when available
 * 4. **Fallback-safe**: Gracefully handles missing theme extensions
 *
 * ## Where It's Used
 *
 * - TripleLayerPath primitive
 * - LighteningCloud
 * - ContactUsGraphic
 * - Any component needing consistent brand coloring
 */

"use client"

import { useTheme } from "@mui/system"

export interface VectorGraphicColors {
  /** Stroke color for shape outlines */
  shapeStrokeColor: string
  /** Fill color for primary shapes */
  filledShapeColor: string
  /** Color for text line placeholders */
  textLineRepresentationColor: string
  /** Outer stroke for three-layer borders (widest, low opacity glow) */
  threeLayerOuterStroke: string
  /** Center stroke for three-layer borders (medium, transition) */
  threeLayerCenterStroke: string
  /** Inner stroke for three-layer borders (thinnest, sharp edge) */
  threeLayerInnerStroke: string
}

/**
 * Returns consistent colors for vector graphics based on current theme mode.
 *
 * ## Three-Layer Border Pattern
 *
 * The three-layer border creates depth and luminosity:
 *
 * | Layer | Purpose | Dark Mode | Light Mode |
 * |-------|---------|-----------|------------|
 * | Outer | Glow/halo | Light + low opacity | Dark + low opacity |
 * | Center | Transition | Medium background | Medium background |
 * | Inner | Edge definition | Primary + high opacity | Primary + high opacity |
 *
 * ## Color Opacity Progression
 *
 * For optimal glow effect, use these opacity ranges:
 * - Outer: 15-20% (diffuse glow)
 * - Center: 40-50% (smooth blend)
 * - Inner: 80-100% (crisp edge)
 *
 * @example
 * ```tsx
 * const { threeLayerOuterStroke, threeLayerInnerStroke } = useVectorGraphicColors()
 *
 * return (
 *   <g>
 *     <path stroke={threeLayerOuterStroke} strokeWidth={6} d={path} />
 *     <path stroke={threeLayerInnerStroke} strokeWidth={2} d={path} />
 *   </g>
 * )
 * ```
 */
export function useVectorGraphicColors(): VectorGraphicColors {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === "dark"

  // Safely access extended background colors with fallbacks
  const bgExtended = theme.palette.background as Record<string, string | undefined>

  // Shape colors
  const shapeStrokeColor = bgExtended?.contrastBG ?? theme.palette.text.secondary
  const filledShapeColor = theme.palette.primary.main
  const textLineRepresentationColor = bgExtended?.dark ?? theme.palette.grey[700]

  // Primary color for glow effect
  const primaryMain = theme.palette.primary.main

  // Three-layer border colors with improved complementary design
  // Using primary color base with opacity progression for glow effect
  let threeLayerOuterStroke: string
  let threeLayerCenterStroke: string
  let threeLayerInnerStroke: string

  // Generate primary-based fallback colors
  const primaryRgb = hexToRgb(primaryMain)

  if (isDarkMode) {
    // Dark mode: Primary-based glow that pops against dark backgrounds
    // Outer: subtle glow using light background or primary at low opacity
    threeLayerOuterStroke =
      bgExtended?.light ?? (primaryRgb ? `rgba(${primaryRgb}, 0.15)` : theme.palette.grey[700])

    // Center: medium background for transition
    threeLayerCenterStroke =
      bgExtended?.medium ?? (primaryRgb ? `rgba(${primaryRgb}, 0.4)` : theme.palette.grey[500])

    // Inner: darkest for contrast or primary at high opacity
    threeLayerInnerStroke =
      bgExtended?.dark ?? (primaryRgb ? `rgba(${primaryRgb}, 0.9)` : theme.palette.grey[900])
  } else {
    // Light mode: darker outer for shadow, lighter inner for highlights
    threeLayerOuterStroke =
      bgExtended?.dark ?? (primaryRgb ? `rgba(${primaryRgb}, 0.2)` : theme.palette.grey[400])

    threeLayerCenterStroke =
      bgExtended?.medium ?? (primaryRgb ? `rgba(${primaryRgb}, 0.45)` : theme.palette.grey[500])

    threeLayerInnerStroke =
      bgExtended?.light ?? (primaryRgb ? `rgba(${primaryRgb}, 0.85)` : theme.palette.grey[200])
  }

  return {
    shapeStrokeColor,
    filledShapeColor,
    textLineRepresentationColor,
    threeLayerOuterStroke,
    threeLayerCenterStroke,
    threeLayerInnerStroke,
  }
}

/**
 * Converts a hex color to RGB string for use in rgba()
 * @param hex - Hex color like "#00d4ff" or "00d4ff"
 * @returns RGB string like "0, 212, 255" or null if invalid
 */
function hexToRgb(hex: string): string | null {
  // Remove # if present
  const cleanHex = hex.replace(/^#/, "")

  // Handle 3-char hex
  const fullHex =
    cleanHex.length === 3
      ? cleanHex.split("").map((c) => c + c).join("")
      : cleanHex

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex)
  if (!result) return null

  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
}
