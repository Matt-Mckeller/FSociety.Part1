import { buildMinimapLegendColors, buildMinimapCategoryColors } from "@expanse/theme"
import type { MinimapTileVariant, MinimapTileVariantProps } from "@expanse/theme"

// =============================================================================
// Fallback variant configs — used when theme.components.ExpanseMinimapTile
// is absent.
// =============================================================================

export const FALLBACK_VARIANTS: Record<MinimapTileVariant, MinimapTileVariantProps> = {
  default: {
    borderRadius: 2,
    baseBorder: "1px solid rgba(0,0,0,0.12)",
    activeBorder: "2px solid rgba(0,0,0,0.35)",
    baseBoxShadow: "none",
    activeBoxShadow: "none",
    hoverBoxShadow: "none",
    opacity: 1,
  },
  circular: {
    borderRadius: "50%",
    baseBorder: "1.5px solid rgba(0,0,0,0.16)",
    activeBorder: "2px solid rgba(0,0,0,0.35)",
    baseBoxShadow: "none",
    activeBoxShadow: "none",
    hoverBoxShadow: "none",
    opacity: 1,
  },
  sharp: {
    borderRadius: 0,
    baseBorder: "1px solid rgba(0,0,0,0.12)",
    activeBorder: "2px solid rgba(0,0,0,0.35)",
    baseBoxShadow: "none",
    activeBoxShadow: "none",
    hoverBoxShadow: "none",
    opacity: 1,
  },
  outlined: {
    borderRadius: 4,
    baseBorder: "2px solid rgba(0,0,0,0.12)",
    activeBorder: "3px solid rgba(0,0,0,0.35)",
    baseBoxShadow: "none",
    activeBoxShadow: "none",
    hoverBoxShadow: "none",
    opacity: 1,
  },
  minimal: {
    borderRadius: 6,
    baseBorder: "none",
    activeBorder: "1px solid rgba(0,0,0,0.35)",
    baseBoxShadow: "none",
    activeBoxShadow: "none",
    hoverBoxShadow: "none",
    opacity: 0.85,
  },
  glow: {
    borderRadius: 4,
    baseBorder: "1px solid rgba(0,0,0,0.12)",
    activeBorder: "2px solid rgba(0,0,0,0.35)",
    baseBoxShadow: "none",
    activeBoxShadow: "none",
    hoverBoxShadow: "none",
    opacity: 1,
  },
}

/**
 * Canonical active-tile fill color — consistent across all categories.
 * Used only when no theme registers `ExpanseMinimapTile` (see
 * `useMinimapTileColors`); also seeds the legend swatch hues below so the
 * fallback palette and the themed palette come from the same computation.
 */
export const FALLBACK_ACTIVE_TILE_COLOR = "#5B8DEF"

/**
 * Four-swatch legend palette — inactive tile background colors, computed
 * from `FALLBACK_ACTIVE_TILE_COLOR`'s hue via the same builder the themed
 * factory uses (`createMinimapTileConfig`), so this fallback never drifts
 * out of sync with the themed palette. Order: primary, secondary, tertiary,
 * quaternary.
 */
export const FALLBACK_LEGEND_COLORS: string[] = buildMinimapLegendColors(FALLBACK_ACTIVE_TILE_COLOR)

export const FALLBACK_CATEGORY_COLORS: Record<string, string> = buildMinimapCategoryColors(FALLBACK_LEGEND_COLORS)

export const FALLBACK_EMPTY_TILE_COLOR = "#455a64"

// =============================================================================
// Layout constants — exported so responsive grid wrappers can reserve the
// right amount of space for the label strip in iconAndLabel mode.
// =============================================================================

/**
 * Vertical space (px) reserved for the single-line caption below each chip
 * in `iconAndLabel` mode. (caption 12px × line-height 1.2 ≈ 15px + mt 4px + margin)
 */
export const MINIMAP_TILE_LABEL_OVERHEAD = 22

/**
 * Minimum horizontal width (px) of the label below a chip in `iconAndLabel`
 * mode. The label may extend beyond the chip's own width.
 */
export const MINIMAP_TILE_LABEL_MIN_WIDTH = 112
