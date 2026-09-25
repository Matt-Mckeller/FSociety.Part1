/**
 * MinimapTile Factory
 *
 * Creates theme configuration for MinimapTile from a MUI palette.
 *
 * The factory derives colors entirely from the palette — no hardcoded hex
 * values. The active-tile accent and the four category/legend swatches are
 * both derived from `palette.primary.main`'s hue, so the minimap re-themes
 * correctly across every hue theme instead of rendering one fixed palette
 * regardless of which theme is active.
 *
 * Variants:
 * - default:  Standard rounded tile with subtle border
 * - circular: Fully circular tiles (50% radius). Outline chips add
 *             Expanse 1:2:3 concentric rings on top of this shape.
 * - sharp:    Hard square tiles (0px radius)
 * - outlined: Heavier border, accent color on special tiles
 * - minimal:  No border, slightly translucent
 * - glow:     Ambient color glow on non-empty tiles
 */

import { alpha } from "@mui/material/styles"
import type { Palette } from "@mui/material/styles"
import { hue, hslToHex } from "../../styles/contrast"
import type { MinimapTileThemeProps, MinimapTileVariantProps } from "../types"

// =============================================================================
// Helpers
// =============================================================================

/** Build standard glow/shadow strings from a color */
function activeGlow(color: string): string {
  return `0 0 8px ${alpha(color, 0.6)}`
}

function hoverGlow(color: string): string {
  return `0 0 4px ${alpha(color, 0.3)}`
}

function colorGlow(color: string): string {
  return `0 0 6px ${alpha(color, 0.5)}`
}

function strongActiveGlow(color: string, activeColor: string): string {
  return `0 0 8px ${alpha(activeColor, 0.6)}, 0 0 16px ${alpha(color, 0.4)}`
}

// =============================================================================
// Color builders — exported standalone so the map package's no-theme
// fallback (`FALLBACK_LEGEND_COLORS`/`FALLBACK_CATEGORY_COLORS`) can compute
// from the same logic instead of hand-copying literal values that drift out
// of sync with this factory.
// =============================================================================

/**
 * Builds the four legend/category swatches from a single accent color's
 * hue, spread 90° apart for guaranteed mutual distinctness. See
 * `createMinimapTileConfig`'s active/legend section for the full rationale.
 */
export function buildMinimapLegendColors(accentColor: string): string[] {
  const baseHue = hue(accentColor)
  return [0, 90, 180, 270].map((offset) =>
    alpha(hslToHex((baseHue + offset) % 360, 0.65, 0.68), 0.5),
  )
}

/** Maps semantic + legacy category keys onto the four legend swatches. */
export function buildMinimapCategoryColors(legendColors: string[]): Record<string, string> {
  return {
    primary:    legendColors[0],
    secondary:  legendColors[1],
    tertiary:   legendColors[2],
    quaternary: legendColors[3],
    // Back-compat aliases — resolve to the same legend swatches
    Home:     legendColors[2], // mint
    Learning: legendColors[0], // blue
    Gaming:   legendColors[3], // purple
    Social:   legendColors[1], // pink
    Tools:    legendColors[2],
    Utility:  legendColors[0],
    Context:  legendColors[2],
    Template: legendColors[1],
    Game:     legendColors[3],
    Chat:     legendColors[0],
  }
}

// =============================================================================
// Factory
// =============================================================================

/**
 * Create MinimapTile theme configuration
 *
 * @param palette - MUI Palette object for deriving colors
 * @returns MinimapTile theme props with all variant configurations and category colors
 */
export function createMinimapTileConfig(palette: Palette): MinimapTileThemeProps {
  const isDark = palette.mode === "dark"

  // Structural colors from palette
  // NOTE: custom palettes don't include a `grey` scale, so we derive neutral
  // empty-tile colors from text.secondary and common.white instead.
  const emptyTileColor = isDark
    ? alpha(palette.common.white, 0.25)  // Visible against dark backgrounds
    : palette.text.secondary             // Visible against light backgrounds

  const emptyBorderColor = isDark
    ? alpha(palette.common.white, 0.15)
    : alpha(palette.common.black, 0.15)

  const activeTileColor = isDark
    ? palette.common.white   // White border on dark backgrounds
    : alpha(palette.common.black, 0.6) // Dark border on light backgrounds

  // Shared active/hover glows using activeTileColor for empty tile states
  const activeBoxShadow = "none"
  const hoverBoxShadow  = "none"

  // Shared base border
  const baseBorder   = `1px solid ${emptyBorderColor}`
  const activeBorder = `2px solid ${activeTileColor}`

  // ==========================================================================
  // Variant definitions
  // ==========================================================================

  const defaultVariant: MinimapTileVariantProps = {
    borderRadius: 2,
    baseBorder,
    activeBorder,
    baseBoxShadow: "none",
    activeBoxShadow,
    hoverBoxShadow,
    opacity: 1,
  }

  const circularVariant: MinimapTileVariantProps = {
    borderRadius: "50%",
    baseBorder: `1.5px solid ${emptyBorderColor}`,
    activeBorder,
    baseBoxShadow: "none",
    activeBoxShadow,
    hoverBoxShadow,
    opacity: 1,
  }

  const sharpVariant: MinimapTileVariantProps = {
    borderRadius: 0,
    baseBorder,
    activeBorder,
    baseBoxShadow: "none",
    activeBoxShadow: "none",
    hoverBoxShadow: "none",
    opacity: 1,
  }

  const outlinedVariant: MinimapTileVariantProps = {
    borderRadius: 4,
    // NOTE: outlined uses a thicker base border (2px vs 1px).
    // The special-tile border is derived dynamically in the component
    // because it depends on the tile's category/explicit color.
    baseBorder: `2px solid ${emptyBorderColor}`,
    activeBorder: `3px solid ${activeTileColor}`,
    baseBoxShadow: "none",
    activeBoxShadow,
    hoverBoxShadow,
    opacity: 1,
  }

  const minimalVariant: MinimapTileVariantProps = {
    borderRadius: 6,
    baseBorder: "none",
    activeBorder: `1px solid ${activeTileColor}`,
    baseBoxShadow: "none",
    activeBoxShadow: "none",
    hoverBoxShadow: "none",
    opacity: 0.85,
  }

  const glowVariant: MinimapTileVariantProps = {
    borderRadius: 4,
    baseBorder,
    activeBorder,
    // NOTE: baseBoxShadow and activeBoxShadow use the tile's own color for the
    // glow effect and are computed dynamically in the component.
    // These theme values serve as fallbacks for empty tiles.
    baseBoxShadow: "none",
    activeBoxShadow,
    hoverBoxShadow,
    opacity: 1,
  }

  // ==========================================================================
  // Active tile fill — single canonical color used for the selected tile
  // across all categories. Overrides any per-tile color so the active state
  // reads consistently no matter what category it belongs to.
  // ==========================================================================
  const activeTileFillColor = palette.primary.main

  // ==========================================================================
  // Legend / category colors — four pastel swatches spread 90° apart around
  // the wheel starting from the theme's own primary hue. Even spacing
  // maximizes the minimum hue distance between the four swatches, so they
  // stay mutually distinguishable in every hue theme (unlike reusing palette
  // roles like success/info, which collide with primary in some hue themes —
  // e.g. green, where primary and success are both light desaturated
  // greens). A fixed saturation/lightness band keeps the pastel character of
  // the original hand-picked swatches. The 4eye marketing nav uses
  // "primary"/"secondary"/"tertiary" categories; legacy keys (Home,
  // Learning, etc.) preserved for back-compat but resolved against the same
  // legend palette.
  // ==========================================================================
  const legendColors = buildMinimapLegendColors(activeTileFillColor)
  const categoryColors = buildMinimapCategoryColors(legendColors)

  return {
    variants: {
      default:  defaultVariant,
      circular: circularVariant,
      sharp:    sharpVariant,
      outlined: outlinedVariant,
      minimal:  minimalVariant,
      glow:     glowVariant,
    },
    categoryColors,
    emptyTileColor,
    emptyBorderColor,
    activeTileColor: activeTileFillColor,
  }
}
