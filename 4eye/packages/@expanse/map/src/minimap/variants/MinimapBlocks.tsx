"use client"

import React from "react"
import { Box, Tooltip } from "@mui/material"
import type { MinimapVariantProps, MinimapTileProps } from "../types"

// =============================================================================
// Block Tile Component
// =============================================================================

function BlockTile({
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
        borderRadius: 1,
        cursor: isDisabled ? "default" : "pointer",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        bgcolor: isActive
          ? colors.active ?? "primary.main"
          : colors.inactive ?? "action.hover",
        opacity: isDisabled ? 0.3 : isActive ? 1 : 0.7,
        position: "relative",
        overflow: "hidden",
        
        // Active indicator overlay
        "&::before": isActive ? {
          content: '""',
          position: "absolute",
          inset: 0,
          border: 3,
          borderColor: colors.active ?? "primary.main",
          borderRadius: 1,
          opacity: 0.6,
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        } : {},
        
        "&:hover": isDisabled
          ? {}
          : {
              bgcolor: colors.hover ?? colors.active ?? "primary.light",
              opacity: 1,
              transform: "scale(1.05)",
              boxShadow: isActive
                ? `0 0 12px ${colors.active ?? "#2196f3"}`
                : `0 0 8px ${colors.hover ?? "#64b5f6"}`,
            },
            
        "@keyframes pulse": {
          "0%, 100%": {
            opacity: 0.6,
          },
          "50%": {
            opacity: 0.3,
          },
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
// Blocks Variant Component
// =============================================================================

/**
 * Blocks variant: Solid filled rectangles with spacing
 * Clean, modern aesthetic with smooth animations
 */
export function MinimapBlocks({
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
        padding: 1,
        ...sx,
      }}
      role="navigation"
      aria-label="Blocks minimap"
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
            <BlockTile
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
