"use client";
import { useMemo, useCallback } from "react"
import { useNavigation } from "../../navigation"
import type { Position } from "../../navigation/types"
import type {
  MinimapProps,
  MinimapCustomColors,
  MinimapSizePreset,
} from "../types"
import { SIZE_PRESETS, COLOR_SCHEMES } from "../types"

/**
 * Shared minimap logic hook
 * Handles grid generation, navigation, and color resolution
 */
export function useMinimap(props: MinimapProps) {
  const {
    size = "medium",
    colorScheme = "default",
    customColors,
    tileSize: customTileSize,
    gap: customGap,
    onClick: customOnClick,
    disabled = false,
  } = props

  const {
    position: currentPos,
    gridSize,
    navigateTo,
    getTileAt,
  } = useNavigation()

  // Resolve size dimensions
  const { tileSize, gap } = useMemo<MinimapSizePreset>(() => ({
    tileSize: customTileSize ?? SIZE_PRESETS[size].tileSize,
    gap: customGap ?? SIZE_PRESETS[size].gap,
  }), [size, customTileSize, customGap])

  // Resolve color scheme
  const colors = useMemo<MinimapCustomColors>(() => {
    const schemeColors = COLOR_SCHEMES[colorScheme]
    if (colorScheme === "custom" && customColors) {
      return { ...schemeColors, ...customColors }
    }
    return schemeColors
  }, [colorScheme, customColors])

  // Generate grid data
  const grid = useMemo(() => {
    const rows: Array<{ x: number; y: number; tile: any }[]> = []
    for (let y = 0; y < gridSize.height; y++) {
      const row: Array<{ x: number; y: number; tile: any }> = []
      for (let x = 0; x < gridSize.width; x++) {
        row.push({ x, y, tile: getTileAt(x, y) })
      }
      rows.push(row)
    }
    return rows
  }, [gridSize, getTileAt])

  // Handle tile click
  const handleTileClick = useCallback(
    (x: number, y: number) => {
      if (disabled) return

      if (customOnClick) {
        customOnClick({ x, y })
      } else {
        navigateTo(x, y)
      }
    },
    [disabled, customOnClick, navigateTo]
  )

  // Calculate total dimensions
  const dimensions = useMemo(() => {
    const width = gridSize.width * tileSize + (gridSize.width - 1) * gap
    const height = gridSize.height * tileSize + (gridSize.height - 1) * gap
    return { width, height }
  }, [gridSize, tileSize, gap])

  return {
    // Grid data
    grid,
    gridSize,
    currentPosition: currentPos,
    
    // Dimensions
    tileSize,
    gap,
    dimensions,
    
    // Colors
    colors,
    
    // Handlers
    handleTileClick,
    
    // State
    disabled,
  }
}

export type MinimapState = ReturnType<typeof useMinimap>
