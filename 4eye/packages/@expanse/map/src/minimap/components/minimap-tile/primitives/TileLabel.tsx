"use client"

import React from "react"
import { Tooltip, Typography } from "@mui/material"
import { useMinimapTileContext } from "../context/MinimapTileContext"
import { MINIMAP_TILE_LABEL_MIN_WIDTH } from "../constants"

/**
 * Under-chip label for `iconAndLabel` mode.
 *
 * Kept visually quiet (lighter weight / opacity) so the chip icon stays
 * the primary signal. Truncates with ellipsis; full name is always in a
 * tooltip — useful while labels are long or still placeholders.
 */
export function TileLabel() {
  const { label, isActive, size } = useMinimapTileContext()

  if (!label) return null

  const el = (
    <Typography
      variant="caption"
      sx={{
        mt: 0.5,
        maxWidth: Math.max(size + 32, MINIMAP_TILE_LABEL_MIN_WIDTH),
        textAlign: "center",
        lineHeight: 1.15,
        fontWeight: isActive ? 600 : 500,
        // Inherits from shell so it works on both dark and light surfaces.
        color: "inherit",
        opacity: isActive ? 0.9 : 0.55,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        letterSpacing: "0.01em",
        // Avoid competing with the chip / hover card.
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {label}
    </Typography>
  )

  return (
    <Tooltip title={label} placement="bottom" enterDelay={400}>
      {/* Wrapper restores pointer events so the tooltip can trigger. */}
      <span style={{ display: "inline-block", maxWidth: "100%", pointerEvents: "auto" }}>
        {el}
      </span>
    </Tooltip>
  )
}
