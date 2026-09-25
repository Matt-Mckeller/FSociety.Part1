"use client"

import React from "react"
import { Box, IconButton, Tooltip, Typography, type Theme } from "@mui/material"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import HomeIcon from "@mui/icons-material/Home"
import UndoIcon from "@mui/icons-material/Undo"
import type { NavigationPadVariantImplProps } from "../types"
import type { Direction } from '@expanse/map/navigation/types'
import { renderIcon } from "@expanse/ui"
import { getNavPadButtonStyles, getNavPadHintStyles } from "../utils/buttonStyles"

// =============================================================================
// Icons & Hints
// =============================================================================

const DIRECTION_ICONS: Record<Direction, typeof ArrowUpwardIcon> = {
  up: ArrowUpwardIcon,
  down: ArrowDownwardIcon,
  left: ArrowBackIcon,
  right: ArrowForwardIcon,
}

const KEYBOARD_HINTS: Record<Direction, { key: string; arrow: string }> = {
  up: { key: "W", arrow: "↑" },
  down: { key: "S", arrow: "↓" },
  left: { key: "A", arrow: "←" },
  right: { key: "D", arrow: "→" },
}

// =============================================================================
// Component
// =============================================================================

/**
 * Navigation pad variant with keyboard hints.
 * Shows WASD keyboard shortcuts below each directional button.
 * Uses theme-aware colors for proper contrast in both light and dark modes.
 * 
 * @example
 * ```tsx
 * <NavigationPadHints
 *   buttonSize={44}
 *   iconSize={24}
 *   showKeyboardHints
 *   onNavigate={(dir) => console.log(dir)}
 *   canNavigate={(dir) => true}
 * />
 * ```
 */
export function NavigationPadHints({
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
    const hint = KEYBOARD_HINTS[direction]
    const canNav = canNavigate(direction)

    const tooltipText = `${direction.charAt(0).toUpperCase() + direction.slice(1)} (${hint.arrow} or ${hint.key})`

    return (
      <Tooltip title={tooltipText} arrow>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
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
          {showKeyboardHints && (
            <Typography
              variant="caption"
              sx={(theme: Theme) => getNavPadHintStyles(theme, {
                highContrast,
                isEnabled: canNav,
              })}
            >
              {hint.key}
            </Typography>
          )}
        </Box>
      </Tooltip>
    )
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(3, auto)`,
        gridTemplateRows: showBack ? `repeat(4, auto)` : `repeat(3, auto)`,
        gap: 1,
        alignItems: "center",
        justifyItems: "center",
        ...sx,
      }}
    >
      {/* Back button (top row, center) */}
      {showBack && (
        <>
          <Box />
          <Tooltip title="Back (Backspace)" arrow>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
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
              {showKeyboardHints && (
                <Typography
                  variant="caption"
                  sx={(theme: Theme) => getNavPadHintStyles(theme, {
                    highContrast,
                    isEnabled: !isHome,
                  })}
                >
                  ⌫
                </Typography>
              )}
            </Box>
          </Tooltip>
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
        <Tooltip title="Home (H)" arrow>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
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
            {showKeyboardHints && (
              <Typography
                variant="caption"
                sx={(theme: Theme) => getNavPadHintStyles(theme, {
                  highContrast,
                  isEnabled: !isHome,
                })}
              >
                H
              </Typography>
            )}
          </Box>
        </Tooltip>
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
