import React from "react"
import { Box } from "@mui/material"
import { TileProps } from "../types"
import { useTile } from "../hooks"

/**
 * Tile component - Visual representation of a TileConfig in the main grid view
 */
export function Tile({
  config,
  state,
  variant = "default",
  children,
  onClick,
  onHover,
  sx,
}: TileProps) {
  const tileState = useTile(config.position)
  
  // Merge prop state with context state
  const isActive = state?.isActive ?? false
  const isHovered = state?.isHovered ?? tileState.isHovered
  const isDisabled = state?.isDisabled ?? false
  const isLoading = state?.isLoading ?? false
  
  const handleMouseEnter = () => {
    tileState.setHovered(true)
    onHover?.(true)
  }
  
  const handleMouseLeave = () => {
    tileState.setHovered(false)
    onHover?.(false)
  }
  
  const handleClick = () => {
    if (!isDisabled) {
      onClick?.()
    }
  }
  
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: variant === "thumbnail" ? "hidden" : "auto",
        opacity: isDisabled ? 0.5 : 1,
        cursor: isDisabled ? "not-allowed" : onClick ? "pointer" : "default",
        transition: "opacity 0.2s ease",
        ...sx,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-tile-position={`${config.position.x},${config.position.y}`}
      data-tile-active={isActive}
      data-tile-hovered={isHovered}
      data-tile-loading={isLoading}
      data-tile-variant={variant}
    >
      {children}
    </Box>
  )
}
