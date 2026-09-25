"use client"

import React, { useMemo } from "react"
import { Box, Typography } from "@mui/material"
import { useMinimapTileContext } from "../context/MinimapTileContext"

/**
 * Renders the content inside the tile chip:
 * - `iconOnly`: icon or first-letter fallback
 * - `titleOnTile`: icon + label stacked vertically inside the chip
 * - `iconAndLabel`: icon only (label is rendered outside by TileLabel)
 */
export function TileChipContent() {
  const { Icon, firstLetter, label, content, size, iconSize, fgColor, isActive } = useMinimapTileContext()

  const showTitleOnTile = content === "titleOnTile" && !!label && size >= 48
  const renderedIconSize = showTitleOnTile ? Math.max(14, Math.round(iconSize * 0.85)) : iconSize

  const iconSx = {
    fontSize: renderedIconSize,
    color: fgColor,
    display: "block",
    pointerEvents: "none" as const,
  }

  const glyph = Icon ? (
    <Icon sx={iconSx} />
  ) : firstLetter ? (
    <Typography
      component="span"
      sx={{
        fontSize: Math.max(10, Math.round(renderedIconSize * 1.05)),
        lineHeight: 1,
        fontWeight: 700,
        letterSpacing: "-0.02em",
        color: fgColor,
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {firstLetter}
    </Typography>
  ) : null

  if (!showTitleOnTile) return <>{glyph}</>

  const labelFontPx = Math.max(10, Math.min(15, Math.round(size * 0.13)))

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.5,
        px: 0.75,
        minWidth: 0,
        maxWidth: "100%",
        pointerEvents: "none",
      }}
    >
      {glyph}
      <Typography
        component="span"
        sx={{
          fontSize: labelFontPx,
          lineHeight: 1.1,
          fontWeight: 700,
          letterSpacing: "0.01em",
          color: fgColor,
          opacity: isActive ? 1 : 0.9,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "100%",
          userSelect: "none",
        }}
      >
        {label}
      </Typography>
    </Box>
  )
}
