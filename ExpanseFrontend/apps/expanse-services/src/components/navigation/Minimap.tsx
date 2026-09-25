"use client"

import { Box, Tooltip } from "@mui/material"
import { useNavigation } from "@/context"
import {
  GRID_SIZE,
  SPECIAL_PAGES,
  getPageConfigFromPosition,
  type Position,
} from "@/types/grid"

// =============================================================================
// Types
// =============================================================================

interface MinimapProps {
  size?: "small" | "medium" | "large"
}

// =============================================================================
// Constants
// =============================================================================

const CELL_SIZES = {
  small: 16,
  medium: 24,
  large: 32,
}

// =============================================================================
// Component
// =============================================================================

export function Minimap({ size = "medium" }: MinimapProps) {
  const { currentPosition, navigateTo, isValidPosition } = useNavigation()
  const cellSize = CELL_SIZES[size]
  const gap = 2

  // Build special pages lookup for efficient access
  const specialPagesMap = new Map(
    SPECIAL_PAGES.map((p) => [`${p.position.x}-${p.position.y}`, p]),
  )

  const handleCellClick = (position: Position) => {
    if (isValidPosition(position)) {
      navigateTo(position)
    }
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 72,
        right: 72,
        bgcolor: "rgba(20, 20, 30, 0.95)",
        backdropFilter: "blur(8px)",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        p: 1,
        zIndex: 1200,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, ${cellSize}px)`,
          gap: `${gap}px`,
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const x = index % GRID_SIZE
          const y = Math.floor(index / GRID_SIZE)
          const position: Position = { x, y }
          const key = `${x}-${y}`
          const isCurrentPosition =
            currentPosition.x === x && currentPosition.y === y
          const pageConfig = specialPagesMap.get(key)

          return (
            <Tooltip
              key={key}
              title={pageConfig?.title ?? `(${x}, ${y})`}
              placement="top"
              arrow
            >
              <Box
                onClick={() => handleCellClick(position)}
                sx={{
                  width: cellSize,
                  height: cellSize,
                  borderRadius: 0.5,
                  bgcolor: isCurrentPosition
                    ? "primary.main"
                    : pageConfig
                      ? "rgba(139, 92, 246, 0.4)"
                      : "rgba(255, 255, 255, 0.05)",
                  border: "1px solid",
                  borderColor: isCurrentPosition
                    ? "primary.light"
                    : pageConfig
                      ? "rgba(139, 92, 246, 0.3)"
                      : "rgba(255, 255, 255, 0.1)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  "&:hover": {
                    bgcolor: isCurrentPosition
                      ? "primary.light"
                      : "rgba(255, 255, 255, 0.15)",
                    transform: "scale(1.1)",
                  },
                }}
              />
            </Tooltip>
          )
        })}
      </Box>
    </Box>
  )
}

export default Minimap
