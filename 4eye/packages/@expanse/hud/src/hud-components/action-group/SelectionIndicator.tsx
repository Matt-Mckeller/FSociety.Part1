/**
 * SelectionIndicator Component
 *
 * Visual indicator for selection state in ActionGroups.
 * Supports various shapes: circle, square, triangle, dot, underline, ring.
 */

"use client"

import React from "react"
import { Box, useTheme } from "@mui/material"
import type { SelectionIndicatorShape, SelectionIndicatorSize, ActionGroupMode } from "./types"
import { INDICATOR_SIZE_PX } from "./types"

// =============================================================================
// Types
// =============================================================================

export interface SelectionIndicatorProps {
  /** Indicator shape */
  shape: SelectionIndicatorShape
  /** Whether the item is active/selected */
  active: boolean
  /** Selection mode (affects indicator appearance) */
  mode: ActionGroupMode
  /** Indicator size */
  size?: SelectionIndicatorSize
  /** Custom color (default: theme primary) */
  color?: string
  /** Orientation for triangle pointing */
  orientation?: "horizontal" | "vertical"
}

// =============================================================================
// Component
// =============================================================================

export function SelectionIndicator({
  shape,
  active,
  mode,
  size = "sm",
  color,
  orientation = "horizontal",
}: SelectionIndicatorProps) {
  const theme = useTheme()

  if (shape === "none" || !active) {
    return null
  }

  const sizePx = INDICATOR_SIZE_PX[size]
  const indicatorColor = color ?? theme.palette.primary.main

  // Common styles
  const baseStyles = {
    transition: "all 0.15s ease-in-out",
    flexShrink: 0,
  }

  switch (shape) {
    case "circle":
      return (
        <Box
          sx={{
            ...baseStyles,
            width: sizePx,
            height: sizePx,
            borderRadius: "50%",
            bgcolor: indicatorColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {mode === "checkbox" && (
            <Box
              component="svg"
              viewBox="0 0 24 24"
              sx={{
                width: sizePx * 0.65,
                height: sizePx * 0.65,
                color: theme.palette.primary.contrastText,
              }}
            >
              <path
                fill="currentColor"
                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
              />
            </Box>
          )}
        </Box>
      )

    case "circle-outline":
      return (
        <Box
          sx={{
            ...baseStyles,
            width: sizePx,
            height: sizePx,
            borderRadius: "50%",
            border: `2px solid ${indicatorColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {mode === "radio" ? (
            <Box
              sx={{
                width: sizePx * 0.5,
                height: sizePx * 0.5,
                borderRadius: "50%",
                bgcolor: indicatorColor,
              }}
            />
          ) : (
            mode === "checkbox" && (
              <Box
                sx={{
                  width: sizePx * 0.4,
                  height: sizePx * 0.4,
                  borderRadius: "50%",
                  bgcolor: indicatorColor,
                }}
              />
            )
          )}
        </Box>
      )

    case "square":
      return (
        <Box
          sx={{
            ...baseStyles,
            width: sizePx,
            height: sizePx,
            borderRadius: sizePx * 0.15,
            bgcolor: indicatorColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {mode === "checkbox" && (
            <Box
              component="svg"
              viewBox="0 0 24 24"
              sx={{
                width: sizePx * 0.7,
                height: sizePx * 0.7,
                color: theme.palette.primary.contrastText,
              }}
            >
              <path
                fill="currentColor"
                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
              />
            </Box>
          )}
        </Box>
      )

    case "square-outline":
      return (
        <Box
          sx={{
            ...baseStyles,
            width: sizePx,
            height: sizePx,
            borderRadius: sizePx * 0.15,
            border: `2px solid ${indicatorColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {mode === "checkbox" && (
            <Box
              component="svg"
              viewBox="0 0 24 24"
              sx={{
                width: sizePx * 0.7,
                height: sizePx * 0.7,
                color: indicatorColor,
              }}
            >
              <path
                fill="currentColor"
                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
              />
            </Box>
          )}
        </Box>
      )

    case "triangle":
      // Triangle points right (horizontal) or down (vertical)
      const rotation = orientation === "vertical" ? 90 : 0
      return (
        <Box
          sx={{
            ...baseStyles,
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: `${sizePx / 2}px 0 ${sizePx / 2}px ${sizePx * 0.866}px`,
            borderColor: `transparent transparent transparent ${indicatorColor}`,
            transform: `rotate(${rotation}deg)`,
          }}
        />
      )

    case "dot":
      return (
        <Box
          sx={{
            ...baseStyles,
            width: sizePx * 0.5,
            height: sizePx * 0.5,
            borderRadius: "50%",
            bgcolor: indicatorColor,
          }}
        />
      )

    case "underline":
      return (
        <Box
          sx={{
            ...baseStyles,
            width: orientation === "horizontal" ? "100%" : 3,
            height: orientation === "horizontal" ? 3 : "100%",
            bgcolor: indicatorColor,
            borderRadius: 1.5,
            position: "absolute",
            bottom: orientation === "horizontal" ? 0 : undefined,
            left: orientation === "vertical" ? 0 : undefined,
          }}
        />
      )

    case "ring":
      return (
        <Box
          sx={{
            ...baseStyles,
            position: "absolute",
            inset: -2,
            borderRadius: "50%",
            border: `2px solid ${indicatorColor}`,
            boxShadow: `0 0 8px ${indicatorColor}40`,
            pointerEvents: "none",
          }}
        />
      )

    default:
      return null
  }
}

export default SelectionIndicator
