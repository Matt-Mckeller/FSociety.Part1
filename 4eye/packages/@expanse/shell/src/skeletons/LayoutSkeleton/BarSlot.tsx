"use client"

import React from "react"
import { Box } from "@mui/material"
import type { BarEdge, BarSlotConfig } from "./types"

export interface BarSlotProps {
  /** Which edge to position the bar on */
  edge: BarEdge
  /** Bar configuration */
  config: BarSlotConfig
  /** Adjacent bar sizes (for calculating positioning) */
  adjacentBars?: {
    top?: number
    bottom?: number
    left?: number
    right?: number
  }
}

/**
 * BarSlot - Renders a fixed-position bar at a specific edge
 * 
 * Handles positioning logic for top/bottom/left/right bars
 * and accounts for adjacent bars to prevent overlap.
 */
export function BarSlot({ edge, config, adjacentBars = {} }: BarSlotProps) {
  if (!config.visible || !config.content) {
    return null
  }

  const { content, size = 56, offset = 0, zIndex = 100, sx } = config

  // Calculate positioning based on edge
  const getEdgeStyles = () => {
    const baseStyles = {
      position: "fixed" as const,
      zIndex,
      display: "flex",
    }

    switch (edge) {
      case "top":
        return {
          ...baseStyles,
          top: offset,
          left: adjacentBars.left ?? 0,
          right: adjacentBars.right ?? 0,
          height: size,
          flexDirection: "row" as const,
          alignItems: "center" as const,
        }

      case "bottom":
        return {
          ...baseStyles,
          bottom: offset,
          left: adjacentBars.left ?? 0,
          right: adjacentBars.right ?? 0,
          height: size,
          flexDirection: "row" as const,
          alignItems: "center" as const,
          justifyContent: "center" as const,
        }

      case "left":
        return {
          ...baseStyles,
          left: offset,
          top: adjacentBars.top ?? 0,
          bottom: adjacentBars.bottom ?? 0,
          width: size,
          flexDirection: "column" as const,
        }

      case "right":
        return {
          ...baseStyles,
          right: offset,
          top: adjacentBars.top ?? 0,
          bottom: adjacentBars.bottom ?? 0,
          width: size,
          flexDirection: "column" as const,
        }
    }
  }

  return (
    <Box
      data-bar-slot={edge}
      sx={{
        ...getEdgeStyles(),
        ...sx,
      }}
    >
      {content}
    </Box>
  )
}
