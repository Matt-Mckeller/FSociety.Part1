"use client"

import React from "react"
import { Box } from "@mui/material"
import { alpha } from "@mui/material/styles"
import type { SxProps, Theme } from "@mui/material"
import { useMinimapTileContext } from "../context/MinimapTileContext"
import { TileChipContent } from "./TileChipContent"

interface TileChipProps {
  as?: React.ElementType
  interactionProps?: React.HTMLAttributes<HTMLElement> & {
    href?: string
    target?: string
    rel?: string
    type?: string
  }
  onMouseEnter: () => void
  onMouseLeave: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
  onClick?: () => void
  disabled: boolean
  sx?: SxProps<Theme>
}

/**
 * The colored, shaped, interactive chip. Renders the correct semantic
 * element (div / button / a) and applies all visual styles from context.
 * Inner content is delegated to TileChipContent.
 */
export function TileChip({
  as = "div",
  interactionProps = {},
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onClick,
  disabled,
  sx,
}: TileChipProps) {
  const {
    size,
    variantConfig,
    border,
    boxShadow,
    tileBgColor,
    activeTileColor,
    hovered,
    isActive,
    isEmpty,
    isInteractive,
    pulseAnimation,
  } = useMinimapTileContext()

  return (
    <Box
      component={as}
      {...interactionProps}
      aria-label={useMinimapTileContext().label ? `Navigate to ${useMinimapTileContext().label}` : undefined}
      aria-current={isActive ? "true" : undefined}
      aria-disabled={disabled || undefined}
      tabIndex={isInteractive ? 0 : undefined}
      role={as === "div" ? "img" : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={onKeyDown}
      sx={[
        {
          // Sizing
          width: size,
          height: size,
          flexShrink: 0,
          // Shape
          borderRadius: variantConfig.borderRadius,
          border,
          boxShadow,
          // Animation
          opacity: variantConfig.opacity,
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: hovered ? "scale(1.15)" : isActive ? "scale(1.1)" : "scale(1)",
          animation: pulseAnimation,
          zIndex: isActive || hovered ? 2 : 0,
          // Layout
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // Interaction
          cursor: isInteractive ? "pointer" : "default",
          userSelect: "none",
          // Reset button styles before setting bgcolor
          ...(as === "button" && {
            appearance: "none",
            padding: 0,
            background: "none",
            outline: "none",
            fontFamily: "inherit",
          }),
          ...(as === "a" && {
            textDecoration: "none",
            color: "inherit",
            outline: "none",
          }),
          bgcolor: tileBgColor,
          "&:focus-visible": isInteractive
            ? { outline: `2px solid ${activeTileColor}`, outlineOffset: 2 }
            : undefined,
          "&:active": isInteractive ? { transform: "scale(0.95)" } : undefined,
          "@keyframes minimap-tile-pulse": {
            "0%, 100%": { boxShadow: `0 0 10px ${alpha(activeTileColor, 0.55)}` },
            "50%":      { boxShadow: `0 0 20px ${alpha(activeTileColor, 0.80)}` },
          },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {!isEmpty && <TileChipContent />}
    </Box>
  )
}
