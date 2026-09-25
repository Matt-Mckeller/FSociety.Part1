"use client"

import { useMemo } from "react"
import { useTheme } from "@mui/material"
import { alpha } from "@mui/material/styles"
import { ensureContrast, compositeOverHex, brandConcentricRing, brandRingScale } from "@expanse/theme"
import type { MinimapTileVariantProps, MinimapTileThemeProps, MinimapTileVariant } from "@expanse/theme"
import {
  FALLBACK_VARIANTS,
  FALLBACK_CATEGORY_COLORS,
  FALLBACK_EMPTY_TILE_COLOR,
  FALLBACK_ACTIVE_TILE_COLOR,
} from "../constants"

interface UseMinimapTileColorsInput {
  variant: MinimapTileVariant
  category?: string
  color?: string
  isEmpty: boolean
  isActive: boolean
  hovered: boolean
  animateActive: boolean
  inactiveColorOpacity: number
  instanceCategoryColors?: Record<string, string>
  isSpecial: boolean
  ringColor?: string
  chip?: "filled" | "outline"
  size?: number
}

interface UseMinimapTileColorsResult {
  resolvedColor: string
  activeTileColor: string
  variantConfig: MinimapTileVariantProps
  fgColor: string
  tileBgColor: string
  border: string
  boxShadow: string
  pulseAnimation: string | undefined
}

/**
 * Resolves all color and visual style values for a minimap tile.
 *
 * fg/icon color logic:
 * - Active:   white on the solid `activeTileColor` fill, WCAG-checked.
 * - Inactive: the solid (alpha-stripped) category color, walked toward
 *   black/white by `ensureContrast` only as far as needed to clear 4.5:1
 *   against the tile's actual (alpha-composited) background — so legibility
 *   holds regardless of which hue theme is active, instead of a fixed
 *   "darken by 25%" that was tuned by eye against one fixed palette.
 */
export function useMinimapTileColors({
  variant,
  category,
  color,
  isEmpty,
  isActive,
  hovered,
  animateActive,
  inactiveColorOpacity,
  instanceCategoryColors,
  isSpecial,
  ringColor,
  chip = "filled",
  size = 22,
}: UseMinimapTileColorsInput): UseMinimapTileColorsResult {
  const theme = useTheme()

  const themeConfig = (theme.components as { ExpanseMinimapTile?: MinimapTileThemeProps } | undefined)
    ?.ExpanseMinimapTile

  const variantConfig: MinimapTileVariantProps =
    themeConfig?.variants?.[variant] ?? FALLBACK_VARIANTS[variant]

  const resolvedCategoryColors = useMemo((): Record<string, string> => ({
    ...FALLBACK_CATEGORY_COLORS,
    ...(themeConfig?.categoryColors ?? {}),
    ...(instanceCategoryColors ?? {}),
  }), [themeConfig?.categoryColors, instanceCategoryColors])

  const emptyTileColor  = themeConfig?.emptyTileColor  ?? FALLBACK_EMPTY_TILE_COLOR
  const activeTileColor = themeConfig?.activeTileColor ?? FALLBACK_ACTIVE_TILE_COLOR

  const resolvedColor = useMemo((): string => {
    if (color) return color
    if (category && resolvedCategoryColors[category]) return resolvedCategoryColors[category]
    return emptyTileColor
  }, [color, category, resolvedCategoryColors, emptyTileColor])

  // Strip alpha for foreground text/icon so it is fully opaque and readable
  // on both light and dark surface backgrounds.
  const solidColor = alpha(resolvedColor, 1)

  const outline = chip === "outline"
  const ink = ringColor ?? solidColor

  const tileBgColor = isEmpty || (outline && !isActive && !hovered)
    ? "transparent"
    : outline
      ? alpha(ink, isActive ? 0.16 : 0.08)
      : isActive
        ? activeTileColor
        : alpha(resolvedColor, inactiveColorOpacity)

  // Tile fills are translucent (pastel category swatches, alpha-wrapped) —
  // composite over the panel surface to get what fg actually sits on, then
  // walk fg only as far as needed to clear 4.5:1 against that. Replaces a
  // flat "darken by 25%"/"always white" that was tuned by eye against one
  // fixed palette and can't be trusted now that colors vary per hue theme.
  //
  // Reference surface: common.black/white, not `background.paper` — the
  // sibling MinimapPanel factory deliberately avoids `paper` because several
  // hue themes don't give it a mode-appropriate value (see
  // minimap-panel.factory.ts), and derives its own glass chrome from
  // common.black/white the same way.
  const surfaceReference = theme.palette.mode === "dark"
    ? theme.palette.common.black
    : theme.palette.common.white

  const effectiveBgColor = isEmpty || outline
    ? surfaceReference
    : compositeOverHex(tileBgColor, surfaceReference)

  const fgColor = isActive && !outline
    ? ensureContrast(theme.palette.common.white, effectiveBgColor, 4.5)
    : ensureContrast(outline ? ink : solidColor, effectiveBgColor, 4.5)

  const rings = outline
    ? brandConcentricRing(ink, { scale: brandRingScale(size) })
    : null

  const border = rings
    ? rings.border
    : isEmpty
      ? `2px solid ${alpha(theme.palette.text.secondary, 0.5)}`
      : isActive
        ? `2px solid ${activeTileColor}`
        : `2px solid ${alpha(solidColor, 0.7)}`

  const baseBoxShadow = variant === "glow" && isSpecial
    ? `0 0 6px ${alpha(resolvedColor, 0.5)}`
    : variantConfig.baseBoxShadow

  const stateBoxShadow = !isEmpty && isActive && !outline
    ? `0 0 10px ${alpha(activeTileColor, 0.55)}`
    : !isEmpty && hovered && !outline
      ? `0 0 5px ${alpha(resolvedColor, 0.3)}`
      : baseBoxShadow

  const boxShadow = rings
    ? [rings.boxShadow, stateBoxShadow === "none" ? "" : stateBoxShadow]
        .filter(Boolean)
        .join(", ")
    : stateBoxShadow

  const pulseAnimation =
    isActive && animateActive
      ? "minimap-tile-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
      : undefined

  return {
    resolvedColor,
    activeTileColor,
    variantConfig,
    fgColor,
    tileBgColor,
    border,
    boxShadow,
    pulseAnimation,
  }
}

/**
 * Shared accent resolver — used by peers like MinimapTileGrid to derive the
 * same accent without duplicating the fallback table.
 */
export function resolveTileAccent(
  category: string | undefined,
  instanceCategoryColors?: Record<string, string>,
): string {
  if (!category) return FALLBACK_ACTIVE_TILE_COLOR
  return (
    instanceCategoryColors?.[category] ??
    FALLBACK_CATEGORY_COLORS[category] ??
    FALLBACK_ACTIVE_TILE_COLOR
  )
}
