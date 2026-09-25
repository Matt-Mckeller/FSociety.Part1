"use client"

import React from "react"
import { Box, Tooltip, type SxProps, type Theme } from "@mui/material"
import { useMemo } from "react"
import { useNavigation } from "../../navigation"
import type { TileConfig } from "../../navigation/types"

// =============================================================================
// Types
// =============================================================================

export interface MinimapOverlayProps {
  /** Tile size in pixels */
  tileSize?: number
  /** Gap between tiles */
  gap?: number
  /** Custom styles */
  sx?: SxProps<Theme>
  /** Disable click navigation */
  disabled?: boolean
  /** Show tile labels on hover */
  showLabels?: boolean
}

// =============================================================================
// MinimapOverlayTile Component
// =============================================================================

interface TileProps {
  tile: TileConfig | null
  x: number
  y: number
  isActive: boolean
  tileSize: number
  showLabels: boolean
  disabled: boolean
  onClick: () => void
}

function MinimapOverlayTile({
  tile,
  x,
  y,
  isActive,
  tileSize,
  showLabels,
  disabled,
  onClick,
}: TileProps) {
  const label = tile?.display.label ?? `(${x}, ${y})`
  const colors = tile?.display.colors
  const isDisabled = tile?.behavior?.disabled || disabled
  const isHidden = tile?.behavior?.hidden
  const hasSpecialPage = !!tile

  if (isHidden) return <Box sx={{ width: tileSize, height: tileSize }} />

  const tileContent = (
    <Box
      onClick={isDisabled ? undefined : onClick}
      aria-label={label}
      sx={{
        width: tileSize,
        height: tileSize,
        borderRadius: 0.5,
        bgcolor: isActive
          ? colors?.active ?? "primary.main"
          : hasSpecialPage
            ? `${colors?.inactive ?? "rgba(139, 92, 246, 0.4)"}`
            : "rgba(255, 255, 255, 0.05)",
        border: "1px solid",
        borderColor: isActive
          ? colors?.active ?? "primary.light"
          : hasSpecialPage
            ? `${colors?.inactive ?? "rgba(139, 92, 246, 0.3)"}`
            : "rgba(255, 255, 255, 0.1)",
        cursor: isDisabled ? "default" : "pointer",
        transition: "all 0.15s ease",
        opacity: isDisabled ? 0.4 : 1,
        "&:hover": isDisabled
          ? {}
          : {
              bgcolor: isActive
                ? colors?.active ?? "primary.light"
                : "rgba(255, 255, 255, 0.15)",
              transform: "scale(1.1)",
            },
      }}
    />
  )

  if (showLabels) {
    return (
      <Tooltip title={label} placement="top" arrow>
        {tileContent}
      </Tooltip>
    )
  }

  return tileContent
}

// =============================================================================
// MinimapOverlay Component
// =============================================================================

/**
 * Glass-morphism style minimap overlay.
 * Shows the grid with special pages highlighted and current position.
 * 
 * @example
 * ```tsx
 * <NavigationProvider config={config}>
 *   <MinimapOverlay tileSize={24} showLabels />
 * </NavigationProvider>
 * ```
 */
export function MinimapOverlay({
  tileSize = 24,
  gap = 2,
  sx,
  disabled = false,
  showLabels = true,
}: MinimapOverlayProps) {
  const { position: currentPos, gridSize, navigateTo, getTileAt } = useNavigation()

  // Generate grid cells
  const cells = useMemo(() => {
    const result: Array<{ x: number; y: number; tile: TileConfig | null }> = []
    for (let y = 0; y < gridSize.height; y++) {
      for (let x = 0; x < gridSize.width; x++) {
        result.push({ x, y, tile: getTileAt(x, y) })
      }
    }
    return result
  }, [gridSize, getTileAt])

  return (
    <Box
      sx={{
        bgcolor: "rgba(20, 20, 30, 0.95)",
        backdropFilter: "blur(8px)",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        p: 1,
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize.width}, ${tileSize}px)`,
          gridTemplateRows: `repeat(${gridSize.height}, ${tileSize}px)`,
          gap: `${gap}px`,
        }}
      >
        {cells.map(({ x, y, tile }) => (
          <MinimapOverlayTile
            key={`${x}-${y}`}
            tile={tile}
            x={x}
            y={y}
            isActive={currentPos.x === x && currentPos.y === y}
            tileSize={tileSize}
            showLabels={showLabels}
            disabled={disabled}
            onClick={() => navigateTo(x, y)}
          />
        ))}
      </Box>
    </Box>
  )
}

export default MinimapOverlay
