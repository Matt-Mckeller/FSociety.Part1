"use client"

import { useMemo } from "react"
import { useTheme } from "@mui/material/styles"
import { useNavigation } from "../../navigation"
import type { MinimapPanelLegendItem } from "./legend.types"
import type { MinimapTileThemeProps } from "@expanse/theme"

/**
 * Neutral placeholders used when a category has no registered
 * `categoryLabels` entry. Prefer these over raw keys (`primary`,
 * `secondary`) which read as implementation detail, and over premature
 * semantic names that collide with tile titles.
 */
export const MINIMAP_CATEGORY_PLACEHOLDERS = [
  "Group A",
  "Group B",
  "Group C",
  "Group D",
] as const

/**
 * Derive legend items (label + color) from the active grid registry.
 *
 * Walks every position in the grid via `useNavigation().getTileAt` and
 * returns one entry per category, in first-seen order.
 *
 * Sources of truth:
 * - **Color**: `theme.components.ExpanseMinimapTile.categoryColors`
 *   (theme owns the visual palette). An optional `categoryColors` arg
 *   merges on top for per-instance overrides.
 * - **Label**: `useNavigation().config.categoryLabels` (navigation
 *   context owns the human-readable group names). Falls back to
 *   `Group A` / `Group B` / … placeholders when no label is registered,
 *   so the legend stays quiet until real group names are settled.
 *
 * Used by both `MinimapPanel` and `MinimapFullView` so the legend stays
 * consistent across surfaces.
 */
export function useMinimapLegendItems(
  categoryColors?: Record<string, string>,
): MinimapPanelLegendItem[] {
  const { gridSize, getTileAt, config } = useNavigation()
  const theme = useTheme()

  const themeCategoryColors = (
    theme.components as { ExpanseMinimapTile?: MinimapTileThemeProps } | undefined
  )?.ExpanseMinimapTile?.categoryColors

  const categoryLabels = config.categoryLabels

  return useMemo(() => {
    const colorMap: Record<string, string> = {
      ...(themeCategoryColors ?? {}),
      ...(categoryColors ?? {}),
    }
    const seen = new Map<string, { label: string; color: string }>()
    for (let y = 0; y < gridSize.height; y++) {
      for (let x = 0; x < gridSize.width; x++) {
        const tile = getTileAt(x, y)
        const category = tile?.display.category
        if (!category || seen.has(category)) continue
        const color = colorMap[category] ?? "#607d8b"
        const placeholder =
          MINIMAP_CATEGORY_PLACEHOLDERS[seen.size] ?? `Group ${seen.size + 1}`
        const label = categoryLabels?.[category] ?? placeholder
        seen.set(category, { label, color })
      }
    }
    return Array.from(seen.values())
  }, [gridSize, getTileAt, themeCategoryColors, categoryColors, categoryLabels])
}
