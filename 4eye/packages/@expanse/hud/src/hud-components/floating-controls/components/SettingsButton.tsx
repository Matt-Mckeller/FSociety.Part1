"use client"

import { Fab, Tooltip, type SxProps, type Theme } from "@mui/material"
import { Settings as SettingsIcon } from "@mui/icons-material"
import type { FloatingPosition } from "../types"

export interface SettingsButtonProps {
  /** Position on screen */
  position?: FloatingPosition
  /** Custom z-index */
  zIndex?: number
  /** Click handler */
  onClick?: () => void
  /** Tooltip text */
  tooltip?: string
  /** Custom styles */
  sx?: SxProps<Theme>
}

/**
 * Get position styles based on position preset
 */
function getPositionStyles(position: FloatingPosition) {
  switch (position) {
    case "top-left":
      return { top: 24, left: 24 }
    case "top-center":
      return { top: 24, left: "50%", transform: "translateX(-50%)" }
    case "top-right":
      return { top: 24, right: 24 }
    case "bottom-left":
      return { bottom: 24, left: 24 }
    case "bottom-center":
      return { bottom: 24, left: "50%", transform: "translateX(-50%)" }
    case "bottom-right":
      return { bottom: 24, right: 24 }
  }
}

/**
 * Floating action button for opening settings
 *
 * @example
 * ```tsx
 * <SettingsButton
 *   position="bottom-right"
 *   onClick={() => setDrawerOpen(true)}
 * />
 * ```
 */
export function SettingsButton({
  position = "bottom-right",
  zIndex = 1300,
  onClick,
  tooltip = "Layout Settings",
  sx,
}: SettingsButtonProps) {
  const posStyles = getPositionStyles(position)

  return (
    <Tooltip title={tooltip} placement="left">
      <Fab
        color="primary"
        onClick={onClick}
        sx={{
          position: "fixed",
          ...posStyles,
          zIndex,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          ...sx,
        }}
      >
        <SettingsIcon />
      </Fab>
    </Tooltip>
  )
}
