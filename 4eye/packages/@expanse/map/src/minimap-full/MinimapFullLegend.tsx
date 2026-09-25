"use client"

import React from "react"
import type { SxProps, Theme } from "@mui/material"
import {
  MinimapCategoryLegend,
  useMinimapLegendItems,
} from "../minimap/shared"
import type { MinimapPanelLegendItem } from "../minimap/shared"

export interface MinimapFullLegendProps {
  /**
   * Override the auto-derived legend (category → color from the active
   * tile registry). Leave undefined to derive automatically.
   */
  items?: MinimapPanelLegendItem[]
  /** Per-instance category color overrides used when auto-deriving. */
  categoryColors?: Record<string, string>
  /** Optional swatch border (defaults to a subtle outline). */
  swatchBorder?: string
  sx?: SxProps<Theme>
}

/**
 * Hero legend for `MinimapFullView`. Auto-derives one entry per category
 * from the active grid registry by default; pass `items` to override.
 */
export function MinimapFullLegend({
  items,
  categoryColors,
  swatchBorder = "1px solid rgba(0, 0, 0, 0.10)",
  sx,
}: MinimapFullLegendProps) {
  const auto = useMinimapLegendItems(categoryColors)
  const resolved = items ?? auto
  return (
    <MinimapCategoryLegend
      items={resolved}
      swatchBorder={swatchBorder}
      sx={sx}
    />
  )
}
