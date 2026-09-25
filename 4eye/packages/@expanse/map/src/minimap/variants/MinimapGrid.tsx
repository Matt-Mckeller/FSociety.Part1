"use client"

import React from "react"
import { Box, Tooltip } from "@mui/material"
import type { MinimapVariantProps, MinimapTileProps } from "../types"

// =============================================================================
// Grid Tile Component
// =============================================================================

function GridTile({
  tile,
  x,
  y,
  isActive,
  tileSize,
  showLabel,
  disabled,
  colors,
  onClick,
}: MinimapTileProps) {
  const label = tile?.display.label ?? `(${x}, ${y})`
  const isDisabled = tile?.behavior?.disabled || disabled
  const isHidden = tile?.behavior?.hidden

  if (isHidden) {
    return <Box sx={{ width: tileSize, height: tileSize, opacity: 0 }} />
  }

  const tileContent = (
    <Box
      onClick={isDisabled ? undefined : onClick}
      sx={{
        width: tileSize,
        height: tileSize,
        borderRadius: 0.5,
        cursor: isDisabled ? "default" : "pointer",
        transition: "all 0.15s ease",
        bgcolor: isActive
          ? colors.active ?? "primary.main"
          : colors.inactive ?? "action.hover",
        opacity: isDisabled ? 0.4 : 1,
        border: isActive ? 2 : 1,
        borderColor: isActive
          ? colors.active ?? "primary.dark"
          : colors.gridLines ?? "divider",
        transform: isActive ? "scale(1.15)" : "scale(1)",
        zIndex: isActive ? 1 : 0,
        "&:hover": isDisabled
          ? {}
          : {
              bgcolor: colors.hover ?? colors.active ?? "primary.light",
              transform: "scale(1.1)",
              zIndex: 2,
            },
      }}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-label={`Navigate to ${label}`}
      aria-current={isActive ? "true" : undefined}
      onKeyDown={(e) => {
        if (!isDisabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault()
          onClick()
        }
      }}
    />
  )

  if (showLabel) {
    return (
      <Tooltip title={label} placement="top" arrow>
        {tileContent}
      </Tooltip>
    )
  }

  return tileContent
}

// =============================================================================
// Grid Variant Component
// =============================================================================

/**
 * Grid variant: Connected grid with visible border lines
 * Tiles have borders that create a grid pattern
 */
export function MinimapGrid({
  grid,
  currentPosition,
  tileSize,
  gap,
  showLabels,
  showIndicator,
  disabled,
  colors,
  onTileClick,
  sx,
}: MinimapVariantProps) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        ...sx,
      }}
      role="navigation"
      aria-label="Grid minimap"
    >
      {grid.map((row, y) => (
        <Box
          key={y}
          sx={{
            display: "flex",
            gap: `${gap}px`,
            "&:not(:last-child)": { mb: `${gap}px` },
          }}
        >
          {row.map(({ x, y: posY, tile }) => (
            <GridTile
              key={`${x}-${posY}`}
              tile={tile}
              x={x}
              y={posY}
              isActive={showIndicator && currentPosition.x === x && currentPosition.y === posY}
              tileSize={tileSize}
              showLabel={showLabels}
              disabled={disabled}
              colors={colors}
              onClick={() => onTileClick(x, posY)}
            />
          ))}
        </Box>
      ))}
    </Box>
  )
}
