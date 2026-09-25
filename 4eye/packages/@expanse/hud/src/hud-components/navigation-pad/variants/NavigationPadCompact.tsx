"use client"

import React from "react"
import { Box, IconButton, type Theme } from "@mui/material"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import type { NavigationPadVariantImplProps } from "../types"
import type { Direction } from '@expanse/map/navigation/types'
import { renderIcon } from "@expanse/ui"
import { getNavPadButtonStyles } from "../utils/buttonStyles"

// =============================================================================
// Icons
// =============================================================================

const DIRECTION_ICONS: Record<Direction, typeof KeyboardArrowUpIcon> = {
  up: KeyboardArrowUpIcon,
  down: KeyboardArrowDownIcon,
  left: KeyboardArrowLeftIcon,
  right: KeyboardArrowRightIcon,
}

// =============================================================================
// Component
// =============================================================================

/**
 * Compact navigation pad variant with minimal design.
 * Uses keyboard arrow icons in a tight, space-efficient layout.
 * Uses theme-aware colors for proper contrast in both light and dark modes.
 * Removes home/back buttons to save space.
 * 
 * @example
 * ```tsx
 * <NavigationPadCompact
 *   buttonSize={32}
 *   iconSize={20}
 *   onNavigate={(dir) => console.log(dir)}
 *   canNavigate={(dir) => true}
 * />
 * ```
 */
export function NavigationPadCompact({
  buttonSize,
  iconSize,
  disabled,
  highContrast,
  customIcons,
  onNavigate,
  canNavigate,
  sx,
}: NavigationPadVariantImplProps) {
  const renderDirectionButton = (direction: Direction) => {
    const Icon = customIcons?.[direction] || DIRECTION_ICONS[direction]
    const canNav = canNavigate(direction)

    return (
      <IconButton
        onClick={() => onNavigate(direction)}
        disabled={disabled || !canNav}
        size="small"
        aria-label={`Navigate ${direction}`}
        sx={(theme: Theme) => ({
          ...getNavPadButtonStyles(theme, {
            buttonSize,
            highContrast,
            isEnabled: canNav,
            colorType: "primary",
          }),
          minWidth: buttonSize,
          minHeight: buttonSize,
          // Override transition for compact variant
          transition: "all 0.15s ease",
        })}
      >
        {renderIcon(Icon, iconSize)}
      </IconButton>
    )
  }

  return (
    <Box
      sx={{
        display: "inline-grid",
        gridTemplateColumns: `repeat(3, ${buttonSize}px)`,
        gridTemplateRows: `repeat(3, ${buttonSize}px)`,
        gap: 0.5,
        ...sx,
      }}
    >
      {/* Row 1: Empty, Up, Empty */}
      <Box />
      {renderDirectionButton("up")}
      <Box />

      {/* Row 2: Left, Empty, Right */}
      {renderDirectionButton("left")}
      <Box />
      {renderDirectionButton("right")}

      {/* Row 3: Empty, Down, Empty */}
      <Box />
      {renderDirectionButton("down")}
      <Box />
    </Box>
  )
}
