"use client"

import React from "react"
import { Box, Tooltip } from "@mui/material"
import type { MinimapVariantProps, MinimapTileProps } from "../types"

// =============================================================================
// Dot Tile Component
// =============================================================================

function DotTile({
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

  // Calculate dot size (smaller than tile size for minimal aesthetic)
  const dotSize = tileSize * 0.4
  const activeSize = tileSize * 0.7

  if (isHidden) {
    return <Box sx={{ width: tileSize, height: tileSize, opacity: 0 }} />
  }

  const tileContent = (
    <Box
      onClick={isDisabled ? undefined : onClick}
      sx={{
        width: tileSize,
        height: tileSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: isDisabled ? "default" : "pointer",
        position: "relative",
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
    >
      <Box
        sx={{
          width: isActive ? activeSize : dotSize,
          height: isActive ? activeSize : dotSize,
          borderRadius: "50%",
          bgcolor: isActive
            ? colors.active ?? "primary.main"
            : colors.inactive ?? "action.hover",
          opacity: isDisabled ? 0.4 : 1,
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isActive ? "scale(1)" : "scale(1)",
          "&:hover": isDisabled
            ? {}
            : {
                width: activeSize,
                height: activeSize,
                bgcolor: colors.hover ?? colors.active ?? "primary.light",
              },
        }}
      />
    </Box>
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
// Dots Variant Component
// =============================================================================

/**
 * Dots variant: Individual circular dots for each tile
 * Minimal visual style with smooth transitions
 */
export function MinimapDots({
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
      aria-label="Dots minimap"
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
            <DotTile
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
