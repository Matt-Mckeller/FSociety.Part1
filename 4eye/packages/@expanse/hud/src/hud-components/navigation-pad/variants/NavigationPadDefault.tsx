"use client"

import React from "react"
import { Box, IconButton, type Theme } from "@mui/material"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import HomeIcon from "@mui/icons-material/Home"
import UndoIcon from "@mui/icons-material/Undo"
import type { NavigationPadVariantImplProps } from "../types"
import type { Direction } from '@expanse/map/navigation/types'
import { renderIcon } from "@expanse/ui"
import { getNavPadButtonStyles } from "../utils/buttonStyles"

// =============================================================================
// Icons
// =============================================================================

const DIRECTION_ICONS: Record<Direction, typeof ArrowUpwardIcon> = {
  up: ArrowUpwardIcon,
  down: ArrowDownwardIcon,
  left: ArrowBackIcon,
  right: ArrowForwardIcon,
}

// =============================================================================
// Component
// =============================================================================

/**
 * Default navigation pad variant with clean arrow buttons.
 * Displays directional arrows in a cross pattern with optional home/back buttons.
 * Uses theme-aware colors for proper contrast in both light and dark modes.
 * 
 * @example
 * ```tsx
 * <NavigationPadDefault
 *   buttonSize={44}
 *   iconSize={24}
 *   showHome
 *   showBack
 *   onNavigate={(dir) => console.log(dir)}
 *   onHome={() => console.log("home")}
 *   onBack={() => console.log("back")}
 *   canNavigate={(dir) => true}
 *   isHome={false}
 * />
 * ```
 */
export function NavigationPadDefault({
  buttonSize,
  iconSize,
  showHome,
  showBack,
  showKeyboardHints,
  disabled,
  highContrast,
  customIcons,
  onNavigate,
  onHome,
  onBack,
  canNavigate,
  isHome,
  sx,
}: NavigationPadVariantImplProps) {
  const renderDirectionButton = (direction: Direction) => {
    const Icon = customIcons?.[direction] || DIRECTION_ICONS[direction]
    const canNav = canNavigate(direction)

    return (
      <IconButton
        onClick={() => onNavigate(direction)}
        disabled={disabled || !canNav}
        aria-label={`Navigate ${direction}`}
        sx={(theme: Theme) => getNavPadButtonStyles(theme, {
          buttonSize,
          highContrast,
          isEnabled: canNav,
          colorType: "primary",
        })}
      >
        {renderIcon(Icon, iconSize)}
      </IconButton>
    )
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(3, ${buttonSize}px)`,
        gridTemplateRows: showBack
          ? `repeat(4, ${buttonSize}px)`
          : `repeat(3, ${buttonSize}px)`,
        gap: 1,
        ...sx,
      }}
    >
      {/* Back button (top row, center) */}
      {showBack && (
        <>
          <Box />
          <IconButton
            onClick={onBack}
            disabled={disabled || isHome}
            aria-label="Go back"
            sx={(theme: Theme) => getNavPadButtonStyles(theme, {
              buttonSize,
              highContrast,
              isEnabled: !isHome,
              colorType: "secondary",
            })}
          >
            {renderIcon(customIcons?.back ?? UndoIcon, iconSize)}
          </IconButton>
          <Box />
        </>
      )}

      {/* Row 1: Empty, Up, Empty */}
      <Box />
      {renderDirectionButton("up")}
      <Box />

      {/* Row 2: Left, Home (or Empty), Right */}
      {renderDirectionButton("left")}
      {showHome ? (
        <IconButton
          onClick={onHome}
          disabled={disabled || isHome}
          aria-label="Go home"
          sx={(theme: Theme) => getNavPadButtonStyles(theme, {
            buttonSize,
            highContrast,
            isEnabled: !isHome,
            colorType: "warning",
          })}
        >
          {renderIcon(customIcons?.home ?? HomeIcon, iconSize)}
        </IconButton>
      ) : (
        <Box />
      )}
      {renderDirectionButton("right")}

      {/* Row 3: Empty, Down, Empty */}
      <Box />
      {renderDirectionButton("down")}
      <Box />
    </Box>
  )
}
