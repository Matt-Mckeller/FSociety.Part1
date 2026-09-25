"use client"

import React from "react"
import { Box, IconButton, Paper, Typography, Tooltip, type Theme } from "@mui/material"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import NavigationIcon from "@mui/icons-material/Navigation"
import UndoIcon from "@mui/icons-material/Undo"
import type { NavigationPadVariantImplProps } from "../types"
import type { Direction } from '@expanse/map/navigation/types'
import { renderIcon } from "@expanse/ui"

// =============================================================================
// Icons (Use Keyboard Arrow icons for cleaner look)
// =============================================================================

const DIRECTION_ICONS: Record<Direction, typeof KeyboardArrowUpIcon> = {
  up: KeyboardArrowUpIcon,
  down: KeyboardArrowDownIcon,
  left: KeyboardArrowLeftIcon,
  right: KeyboardArrowRightIcon,
}

// =============================================================================
// Types
// =============================================================================

export interface NavigationPadHudProps extends NavigationPadVariantImplProps {
  /** Current position for display (optional) */
  currentPosition?: { x: number; y: number }
  /** Show position indicator (default: true) */
  showPositionIndicator?: boolean
}

// =============================================================================
// Component
// =============================================================================

/**
 * HUD-style navigation pad variant.
 * Matches the symbol-grid aesthetic with dark glass styling,
 * compact 3x3 D-pad layout, and center compass icon.
 * 
 * Features:
 * - Dark glass background (rgba(20, 20, 25, 0.95))
 * - Backdrop blur effect
 * - Compact 3x3 grid with directional arrows
 * - Center compass/navigation icon for "home"
 * - Optional [x, y] position indicator
 * - Blue accent color on hover and for home icon
 * 
 * @example
 * ```tsx
 * <NavigationPadHud
 *   buttonSize={32}
 *   iconSize={20}
 *   showHome
 *   currentPosition={{ x: 5, y: 3 }}
 *   onNavigate={(dir) => handleNav(dir)}
 *   onHome={() => goHome()}
 *   canNavigate={(dir) => canNav[dir]}
 *   isHome={false}
 * />
 * ```
 */
export function NavigationPadHud({
  buttonSize = 32,
  iconSize = 20,
  showHome = true,
  showBack = false,
  disabled,
  customIcons,
  onNavigate,
  onHome,
  onBack,
  canNavigate,
  isHome,
  currentPosition,
  showPositionIndicator = true,
  sx,
}: NavigationPadHudProps) {
  const smallButtonSize = Math.round(buttonSize * 0.85)
  const smallIconSize = Math.round(iconSize * 0.9)

  const getButtonSx = (isEnabled: boolean, isCenter = false) => ({
    color: isCenter ? "#3b82f6" : isEnabled ? "white" : "rgba(255, 255, 255, 0.2)",
    p: 0.5,
    minWidth: smallButtonSize,
    width: smallButtonSize,
    height: smallButtonSize,
    "&:hover": {
      bgcolor: "rgba(59, 130, 246, 0.3)",
    },
    "&.Mui-disabled": {
      color: "rgba(255, 255, 255, 0.2)",
    },
    transition: "all 0.15s ease-in-out",
  })

  const renderDirectionButton = (direction: Direction, label: string) => {
    const Icon = customIcons?.[direction] || DIRECTION_ICONS[direction]
    const canNav = canNavigate(direction)

    return (
      <IconButton
        size="small"
        onClick={() => onNavigate(direction)}
        disabled={disabled || !canNav}
        aria-label={label}
        sx={getButtonSx(canNav)}
      >
        {renderIcon(Icon, smallIconSize)}
      </IconButton>
    )
  }

  return (
    <Paper
      elevation={4}
      sx={[
        {
          bgcolor: "rgba(20, 20, 25, 0.95)",
          borderRadius: 3,
          p: 1,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.5,
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {/* Back button (above d-pad if shown) */}
      {showBack && (
        <IconButton
          size="small"
          onClick={onBack}
          disabled={disabled || isHome}
          aria-label="Go back"
          sx={{
            ...getButtonSx(!isHome),
            mb: 0.5,
          }}
        >
          {renderIcon(customIcons?.back ?? UndoIcon, smallIconSize)}
        </IconButton>
      )}

      {/* Mini D-Pad: 3x3 grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(3, ${smallButtonSize}px)`,
          gap: 0.25,
        }}
      >
        {/* Row 1: empty, up, empty */}
        <Box />
        {renderDirectionButton("up", "Navigate up")}
        <Box />

        {/* Row 2: left, center (home), right */}
        {renderDirectionButton("left", "Navigate left")}
        
        {showHome ? (
          <Tooltip title="Go to Home" arrow placement="top">
            <IconButton
              size="small"
              onClick={onHome}
              disabled={disabled}
              aria-label="Go to home"
              sx={getButtonSx(true, true)}
            >
              {renderIcon(customIcons?.home ?? NavigationIcon, Math.round(smallIconSize * 0.8))}
            </IconButton>
          </Tooltip>
        ) : (
          <Box sx={{ width: smallButtonSize, height: smallButtonSize }} />
        )}
        
        {renderDirectionButton("right", "Navigate right")}

        {/* Row 3: empty, down, empty */}
        <Box />
        {renderDirectionButton("down", "Navigate down")}
        <Box />
      </Box>

      {/* Position indicator */}
      {showPositionIndicator && currentPosition && (
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: 9,
            fontFamily: "monospace",
            mt: 0.5,
          }}
        >
          [{currentPosition.x + 1}, {currentPosition.y + 1}]
        </Typography>
      )}
    </Paper>
  )
}

export default NavigationPadHud
