"use client"

import React, { memo } from "react"
import { Paper, type SxProps, type Theme } from "@mui/material"
import { Z_INDEX } from "@expanse/theme"
import type { MinimapProps } from "../types"
import { useMinimap } from "../hooks/useMinimap"
import { MinimapGrid } from "../variants/MinimapGrid"
import { MinimapDots } from "../variants/MinimapDots"
import { MinimapBlocks } from "../variants/MinimapBlocks"

/**
 * Visual minimap showing the grid and current position.
 * Supports multiple visual variants with shared navigation logic.
 * 
 * Memoized to prevent unnecessary re-renders when parent components update.
 *
 * @example
 * ```tsx
 * // Grid variant (default)
 * <Minimap variant="grid" size="medium" position="top-right" />
 *
 * // Dots variant with custom colors
 * <Minimap
 *   variant="dots"
 *   colorScheme="custom"
 *   customColors={{ active: "#ff0000", inactive: "#333" }}
 * />
 *
 * // Blocks variant, large size
 * <Minimap variant="blocks" size="large" showLabels />
 * ```
 */
export const Minimap = memo(function Minimap({
  variant = "grid",
  position = "inline",
  showLabels = true,
  showIndicator = true,
  sx,
  ...props
}: MinimapProps) {
  // Get shared minimap state and logic
  const minimapState = useMinimap({ variant, position, showLabels, showIndicator, ...props })

  // Position styles for floating minimap
  const positionStyles: SxProps<Theme> =
    position === "inline"
      ? {}
      : {
          position: "fixed",
          zIndex: Z_INDEX.OVERLAY_ZONES + 1000, // Higher than typical overlays but below chrome
          ...({
            "top-right": { top: 16, right: 16 },
            "top-left": { top: 16, left: 16 },
            "bottom-right": { bottom: 16, right: 16 },
            "bottom-left": { bottom: 16, left: 16 },
          }[position]),
        }

  // Common props for all variants
  const variantProps = {
    grid: minimapState.grid,
    currentPosition: minimapState.currentPosition,
    gridSize: minimapState.gridSize,
    tileSize: minimapState.tileSize,
    gap: minimapState.gap,
    showLabels,
    showIndicator,
    disabled: minimapState.disabled,
    colors: minimapState.colors,
    onTileClick: minimapState.handleTileClick,
  }

  // Render appropriate variant
  let variantComponent: JSX.Element

  switch (variant) {
    case "dots":
      variantComponent = <MinimapDots {...variantProps} />
      break
    case "blocks":
      variantComponent = <MinimapBlocks {...variantProps} />
      break
    case "grid":
    default:
      variantComponent = <MinimapGrid {...variantProps} />
      break
  }

  // Wrap in Paper for elevation and styling
  return (
    <Paper
      role="region"
      aria-label="Minimap navigation"
      elevation={position === "inline" ? 0 : 3}
      sx={{
        p: 1,
        borderRadius: 1,
        bgcolor: "background.paper",
        ...positionStyles,
        ...sx,
      }}
    >
      {variantComponent}
    </Paper>
  )
})

export default Minimap
