"use client"

import React from "react"
import { Box, type SxProps, type Theme } from "@mui/material"
import { mergeSx } from "../../utils"
import type { OverlayPosition, OverlayZoneConfig } from "./types"

export interface OverlayZoneProps {
  /** Overlay configuration */
  config: OverlayZoneConfig
  /** Content padding (from bars) for offset calculations */
  contentPadding?: {
    top?: number
    bottom?: number
    left?: number
    right?: number
  }
}

/**
 * OverlayZone - Renders a floating overlay at a specific position
 * 
 * Handles positioning logic for various overlay positions and
 * accounts for content padding from bars.
 */
export function OverlayZone({ config, contentPadding = {} }: OverlayZoneProps) {
  if (!config.content) {
    return null
  }

  const { content, position, gap = 16, zIndex = 200, sx } = config

  // Calculate positioning based on position
  const getPositionStyles = (): SxProps<Theme> => {
    const baseStyles = {
      position: "fixed" as const,
      zIndex,
    }

    const { top = 0, bottom = 0, left = 0, right = 0 } = contentPadding

    switch (position) {
      case "top-left":
        return {
          ...baseStyles,
          top: top + gap,
          left: left + gap,
        }

      case "top-right":
        return {
          ...baseStyles,
          top: top + gap,
          right: right + gap,
        }

      case "top-center":
        return {
          ...baseStyles,
          top: top + gap,
          left: "50%",
          transform: "translateX(-50%)",
        }

      case "bottom-left":
        return {
          ...baseStyles,
          bottom: bottom + gap,
          left: left + gap,
        }

      case "bottom-right":
        return {
          ...baseStyles,
          bottom: bottom + gap,
          right: right + gap,
        }

      case "bottom-center":
        return {
          ...baseStyles,
          bottom: bottom + gap,
          left: "50%",
          transform: "translateX(-50%)",
        }

      case "center-left":
        return {
          ...baseStyles,
          top: "50%",
          left: left + gap,
          transform: "translateY(-50%)",
        }

      case "center-right":
        return {
          ...baseStyles,
          top: "50%",
          right: right + gap,
          transform: "translateY(-50%)",
        }

      case "center":
        return {
          ...baseStyles,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }
    }
  }

  return (
    <Box
      data-overlay-zone={position}
      sx={mergeSx(
        getPositionStyles(),
        sx
      )}
    >
      {content}
    </Box>
  )
}
