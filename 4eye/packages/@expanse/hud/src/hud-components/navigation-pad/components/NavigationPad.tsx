"use client"

import React, { memo } from "react"
import { Box } from "@mui/material"
import { Z_INDEX } from "@expanse/theme"
import { useNavigationPad } from "../hooks/useNavigationPad"
import { NavigationPadDefault } from "../variants/NavigationPadDefault"
import { NavigationPadHints } from "../variants/NavigationPadHints"
import { NavigationPadCompact } from "../variants/NavigationPadCompact"
import { NavigationPadExpanded } from "../variants/NavigationPadExpanded"
import { NavigationPadHud } from "../variants/NavigationPadHud"
import { useNavigation } from '@expanse/map/navigation'
import type { NavigationPadProps, NavigationPadVariant } from "../types"

// =============================================================================
// Component
// =============================================================================

/**
 * Navigation pad with multiple visual variants.
 * Provides directional navigation with arrow buttons in different styles:
 * - `default`: Clean arrow buttons in cross pattern
 * - `hints`: Arrows with keyboard shortcut hints (WASD)
 * - `compact`: Minimal space-efficient design
 * - `expanded`: D-Pad style with filled background
 * - `hud`: Dark glass HUD-style with center compass (symbol-grid aesthetic)
 * 
 * All variants share common logic via `useNavigationPad` hook and support
 * customization via size presets, positioning, and optional home/back buttons.
 * 
 * Memoized to prevent unnecessary re-renders when parent components update.
 * 
 * @example
 * ```tsx
 * // Default variant
 * <NavigationPad variant="default" size="medium" showHome showBack />
 * 
 * // With keyboard hints
 * <NavigationPad variant="hints" size="large" showKeyboardHints />
 * 
 * // Compact for mobile
 * <NavigationPad variant="compact" size="small" position="bottom-right" />
 * 
 * // Expanded D-Pad style
 * <NavigationPad variant="expanded" size="large" showHome showBack />
 * 
 * // HUD-style for spatial layouts
 * <NavigationPad variant="hud" position="bottom-right" showHome />
 * 
 * // High contrast for accessibility
 * <NavigationPad variant="default" highContrast />
 * ```
 */
export const NavigationPad = memo(function NavigationPad({
  variant = "default",
  size = "medium",
  position = "inline",
  showKeyboardHints = false,
  showHome = false,
  showBack = false,
  disabled = false,
  highContrast = false,
  customIcons,
  sx,
}: NavigationPadProps) {
  const {
    onNavigate,
    onHome,
    onBack,
    canNavigate,
    isHome,
    sizeConfig,
  } = useNavigationPad(size)

  // Get current position for HUD variant
  const navigation = useNavigation()
  const currentPosition = navigation?.position

  // Shared props for all variants
  const variantProps = {
    buttonSize: sizeConfig.buttonSize,
    iconSize: sizeConfig.iconSize,
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
  }

  // Render variant
  const renderVariant = () => {
    switch (variant) {
      case "hints":
        return <NavigationPadHints {...variantProps} />
      case "compact":
        return <NavigationPadCompact {...variantProps} />
      case "expanded":
        return <NavigationPadExpanded {...variantProps} />
      case "hud":
        return <NavigationPadHud {...variantProps} currentPosition={currentPosition} />
      case "default":
      default:
        return <NavigationPadDefault {...variantProps} />
    }
  }

  // Position styling
  const positionStyles = (() => {
    switch (position) {
      case "bottom-left":
        return {
          position: "fixed" as const,
          bottom: 24,
          left: 24,
          zIndex: Z_INDEX.ACTION_BARS,
        }
      case "bottom-right":
        return {
          position: "fixed" as const,
          bottom: 24,
          right: 24,
          zIndex: Z_INDEX.ACTION_BARS,
        }
      case "bottom-center":
        return {
          position: "fixed" as const,
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: Z_INDEX.ACTION_BARS,
        }
      case "inline":
      default:
        return {}
    }
  })()

  return (
    <Box sx={{ ...positionStyles, ...sx }}>
      {renderVariant()}
    </Box>
  )
})
