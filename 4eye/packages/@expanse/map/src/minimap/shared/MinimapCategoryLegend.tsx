"use client"

import React from "react"
import { Box, Tooltip, Typography, type SxProps, type Theme } from "@mui/material"
import type { MinimapPanelLegendItem } from "./legend.types"

export interface MinimapCategoryLegendProps {
  items: MinimapPanelLegendItem[]
  /** Optional border for swatches (matches panel chrome). */
  swatchBorder?: string
  /**
   * Swatch size in px. @default 12
   */
  swatchSize?: number
  /**
   * How category labels are shown.
   * - `"tooltip"` (default): color swatches only; label appears on hover /
   *   focus via tooltip. Keeps the chrome quiet while groups are still
   *   placeholder / unsettled.
   * - `"inline"`: classic swatch + visible caption (use when labels are
   *   finalized and worth reading at a glance).
   * @default "tooltip"
   */
  labelDisplay?: "tooltip" | "inline"
  sx?: SxProps<Theme>
}

/**
 * Shared category legend used by both `MinimapPanel` and `MinimapFullView`.
 * Pure presentational — color alone is never the only signal: labels stay
 * available via tooltip (default) or inline text, plus `aria-label` on each
 * swatch.
 */
export function MinimapCategoryLegend({
  items,
  swatchBorder,
  swatchSize = 12,
  labelDisplay = "tooltip",
  sx,
}: MinimapCategoryLegendProps) {
  if (items.length === 0) return null

  const showInline = labelDisplay === "inline"

  return (
    <Box
      role="list"
      aria-label="Map color groups"
      sx={[
        {
          display: "flex",
          flexWrap: "wrap",
          rowGap: 0.75,
          columnGap: showInline ? 1.5 : 1,
          alignItems: "center",
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {items.map((item) => {
        const swatch = (
          <Box
            sx={{
              width: swatchSize,
              height: swatchSize,
              borderRadius: 0.5,
              bgcolor: item.color,
              border: swatchBorder,
              flexShrink: 0,
            }}
          />
        )

        return (
          <Box
            key={item.label}
            role="listitem"
            sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
          >
            <Tooltip title={item.label} placement="top" enterDelay={300}>
              <Box
                component="span"
                aria-label={item.label}
                sx={{
                  display: "inline-flex",
                  // Focusable so keyboard users can reveal the tooltip.
                  outline: "none",
                  borderRadius: 0.5,
                  "&:focus-visible": {
                    outline: "2px solid",
                    outlineColor: "primary.main",
                    outlineOffset: 2,
                  },
                }}
                tabIndex={0}
              >
                {swatch}
              </Box>
            </Tooltip>
            {showInline && (
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.75rem",
                  color: "text.primary",
                  opacity: 0.85,
                  fontWeight: 600,
                }}
              >
                {item.label}
              </Typography>
            )}
          </Box>
        )
      })}
    </Box>
  )
}
