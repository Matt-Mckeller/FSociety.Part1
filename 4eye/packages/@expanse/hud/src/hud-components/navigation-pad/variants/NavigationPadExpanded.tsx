"use client"

import React from "react"
import { Box, IconButton, alpha, type SxProps, type Theme } from "@mui/material"
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
 * Expanded navigation pad variant with D-Pad style.
 * Shows all buttons in a 3x3 grid with filled center area.
 * Uses theme-aware colors for proper contrast in both light and dark modes.
 * 
 * @example
 * ```tsx
 * <NavigationPadExpanded
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
export function NavigationPadExpanded({
  buttonSize,
  iconSize,
  showHome,
  showBack,
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
  // Extended button styles for expanded variant with scale transform
  const getExpandedButtonStyles = (theme: Theme, isEnabled: boolean, colorType: "primary" | "secondary" | "warning" = "primary") => {
    const baseStyles = getNavPadButtonStyles(theme, {
      buttonSize,
      highContrast,
      isEnabled,
      colorType,
    })
    
    return {
      ...baseStyles,
      border: "2px solid",
      borderColor: highContrast 
        ? (theme.palette.mode === "light" ? theme.palette.common.black : theme.palette.common.white)
        : (isEnabled ? theme.palette[colorType].main : alpha(theme.palette.divider, 0.3)),
      "&:hover": {
        ...baseStyles["&:hover"],
        transform: "scale(1.05)",
      },
    }
  }

  const renderDirectionButton = (direction: Direction) => {
    const Icon = customIcons?.[direction] || DIRECTION_ICONS[direction]
    const canNav = canNavigate(direction)

    return (
      <IconButton
        onClick={() => onNavigate(direction)}
        disabled={disabled || !canNav}
        aria-label={`Navigate ${direction}`}
        sx={(theme: Theme) => getExpandedButtonStyles(theme, canNav, "primary")}
      >
        {renderIcon(Icon, iconSize)}
      </IconButton>
    )
  }

  return (
    <Box
      sx={[
        (theme: Theme) => ({
          display: "grid",
          gridTemplateColumns: `repeat(3, ${buttonSize}px)`,
          gridTemplateRows: showBack
            ? `repeat(4, ${buttonSize}px)`
            : `repeat(3, ${buttonSize}px)`,
          gap: 0.5,
          bgcolor: highContrast 
            ? theme.palette.background.paper
            : alpha(theme.palette.background.paper, 0.7),
          borderRadius: 2,
          p: 1,
          border: highContrast ? "2px solid" : "1px solid",
          borderColor: highContrast 
            ? (theme.palette.mode === "light" ? theme.palette.common.black : theme.palette.common.white)
            : alpha(theme.palette.divider, 0.2),
        }),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {/* Back button (top row, center) */}
      {showBack && (
        <>
          <Box />
          <IconButton
            onClick={onBack}
            disabled={disabled || isHome}
            aria-label="Go back"
            sx={(theme: Theme) => getExpandedButtonStyles(theme, !isHome, "secondary")}
          >
            {renderIcon(customIcons?.back ?? UndoIcon, iconSize)}
          </IconButton>
          <Box />
        </>
      )}

      {/* Row 1: Corner, Up, Corner */}
      <Box
        sx={(theme: Theme) => ({
          width: buttonSize,
          height: buttonSize,
          bgcolor: highContrast 
            ? theme.palette.action.hover
            : alpha(theme.palette.action.hover, 0.3),
          borderRadius: 1,
        })}
      />
      {renderDirectionButton("up")}
      <Box
        sx={(theme: Theme) => ({
          width: buttonSize,
          height: buttonSize,
          bgcolor: highContrast 
            ? theme.palette.action.hover
            : alpha(theme.palette.action.hover, 0.3),
          borderRadius: 1,
        })}
      />

      {/* Row 2: Left, Home/Center, Right */}
      {renderDirectionButton("left")}
      {showHome ? (
        <IconButton
          onClick={onHome}
          disabled={disabled || isHome}
          aria-label="Go home"
          sx={(theme: Theme) => getExpandedButtonStyles(theme, !isHome, "warning")}
        >
          {renderIcon(customIcons?.home ?? HomeIcon, iconSize)}
        </IconButton>
      ) : (
        <Box
          sx={(theme: Theme) => ({
            width: buttonSize,
            height: buttonSize,
            bgcolor: highContrast 
              ? theme.palette.action.hover
              : alpha(theme.palette.action.hover, 0.3),
            borderRadius: 1,
          })}
        />
      )}
      {renderDirectionButton("right")}

      {/* Row 3: Corner, Down, Corner */}
      <Box
        sx={(theme: Theme) => ({
          width: buttonSize,
          height: buttonSize,
          bgcolor: highContrast 
            ? theme.palette.action.hover
            : alpha(theme.palette.action.hover, 0.3),
          borderRadius: 1,
        })}
      />
      {renderDirectionButton("down")}
      <Box
        sx={(theme: Theme) => ({
          width: buttonSize,
          height: buttonSize,
          bgcolor: highContrast 
            ? theme.palette.action.hover
            : alpha(theme.palette.action.hover, 0.3),
          borderRadius: 1,
        })}
      />
    </Box>
  )
}
