"use client"

import React, { useMemo } from "react"
import { Box, useTheme, alpha } from "@mui/material"
import type { 
  ActionBarProps, 
  ActionBarVariant,
  ActionBarColorMode,
  ActionBarLayerConfig,
} from "../types"
import {
  DEFAULT_THICKNESS,
  DEFAULT_GAP,
  DEFAULT_PADDING,
  resolveActionBarThickness,
  resolveActionBarLength,
  resolveActionBarShape,
  resolveActionBarAttached,
  resolveActionBarGradient,
} from "../types"
import type { ActionBarThemeProps } from "@expanse/theme"
import { ActionBarSurfaceContext } from "../context"
import { ActionBarLayered } from "./ActionBarLayered"
import { mergeSx } from "@expanse/ui"

// =============================================================================
// Fallback Styles (when no theme config)
// =============================================================================

/**
 * Default variant styles when theme.components.ExpanseActionBar is not configured.
 * Uses dark glass on light backgrounds for contrast (assumes light mode fallback).
 */
const FALLBACK_VARIANTS: Required<ActionBarThemeProps>["variants"] = {
  glass: {
    bgcolor: "rgba(0, 0, 0, 0.85)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: 28,
    backdropFilter: "blur(12px)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.25)",
  },
  solid: {
    bgcolor: "rgba(30, 30, 35, 0.95)",
    border: "none",
    borderRadius: 12,
    backdropFilter: "none",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.25)",
  },
  frosted: {
    bgcolor: "rgba(0, 0, 0, 0.75)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: 28,
    backdropFilter: "blur(20px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
  },
  minimal: {
    bgcolor: "transparent",
    border: "none",
    borderRadius: 12,
    backdropFilter: "none",
    boxShadow: "none",
  },
  outlined: {
    bgcolor: "transparent",
    border: "2px solid rgba(0, 0, 0, 0.4)",
    borderRadius: 6,
    backdropFilter: "none",
    boxShadow: "none",
  },
  technical: {
    bgcolor: "rgba(30, 30, 35, 0.95)",
    border: "2px solid #6366f1",
    borderRadius: 0,
    backdropFilter: "none",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
  },
  orbs: {
    bgcolor: "transparent",
    border: "none",
    borderRadius: 0,
    backdropFilter: "none",
    boxShadow: "none",
  },
}

// =============================================================================
// Component
// =============================================================================

/**
 * ActionBar - Pure visual container for toolbar-style interfaces.
 *
 * ActionBar is responsible for:
 * - Visual styling (variant for surface treatment, shape for border radius)
 * - Layout (orientation, gap, padding, alignment)
 * - Sizing (thickness, length)
 *
 * ActionBar does NOT handle:
 * - Positioning on screen (use ActionDock)
 * - Selection behavior (use ActionGroup)
 *
 * @example
 * ```tsx
 * // Glass pill (default)
 * <ActionBar>
 *   <ActionButton icon={<HomeIcon />} label="Home" />
 * </ActionBar>
 *
 * // Solid with rounded corners
 * <ActionBar variant="solid" shape="rounded">
 *   <ActionButton icon={<EditIcon />} />
 * </ActionBar>
 *
 * // Custom overrides
 * <ActionBar variant="glass" blur={20} bgcolor="rgba(0,0,0,0.5)">
 *   <ActionButton icon={<PlayIcon />} />
 * </ActionBar>
 *
 * // Positioned with ActionDock
 * <ActionDock position="bottom-center">
 *   <ActionBar variant="frosted">
 *     <ActionButton icon={<PlayIcon />} onClick={play} />
 *   </ActionBar>
 * </ActionDock>
 * ```
 */
export function ActionBar(props: ActionBarProps) {
  const theme = useTheme()

  const {
    children,
    // Visual
    variant = "glass",
    shape = "pill",
    colorMode = "surface",
    gradient,
    attached,
    layered,
    // Overrides
    bgcolor: bgcolorOverride,
    blur: blurOverride,
    borderRadius: borderRadiusOverride,
    boxShadow: boxShadowOverride,
    border: borderOverride,
    // Size
    thickness = DEFAULT_THICKNESS,
    length,
    // Layout
    orientation = "horizontal",
    alignment = "center",
    gap = DEFAULT_GAP,
    padding = DEFAULT_PADDING,
    // Behavior
    disabled = false,
    sx,
  } = props

  // ===== Layered Rendering =====
  // If layered is enabled, delegate to ActionBarLayered component
  if (layered) {
    const layerConfig: ActionBarLayerConfig = typeof layered === "boolean" ? {} : layered
    return (
      <ActionBarLayered
        {...props}
        layerConfig={layerConfig}
      />
    )
  }

  // ===== Resolve Sizes =====

  const thicknessPx = resolveActionBarThickness(thickness)
  const isHorizontal = orientation === "horizontal"

  // ===== Resolve Attached Mode =====
  const attachedConfig = resolveActionBarAttached(attached)

  // ===== Resolve Variant Styles =====

  // Get theme variant config or fallback
  const themeVariants = (theme.components as { ExpanseActionBar?: ActionBarThemeProps } | undefined)
    ?.ExpanseActionBar?.variants
  const variantConfig = themeVariants?.[variant] ?? FALLBACK_VARIANTS[variant]

  // Extract values from variant (fallback if somehow missing)
  const variantBgcolor = variantConfig?.bgcolor ?? "transparent"
  const variantBorder = variantConfig?.border ?? "none"
  const variantBackdropFilter = variantConfig?.backdropFilter ?? "none"
  const variantBoxShadow = variantConfig?.boxShadow ?? "none"

  // ===== Resolve Color Mode Background =====
  const colorModeBackground = useMemo(() => {
    if (colorMode === "primary") {
      return alpha(theme.palette.primary.main, 0.9)
    }
    if (colorMode === "secondary") {
      return alpha(theme.palette.secondary.main, 0.9)
    }
    return undefined // Use variant or gradient
  }, [colorMode, theme.palette.primary.main, theme.palette.secondary.main])

  // ===== Resolve Gradient =====
  const gradientBackground = useMemo(() => {
    if (gradient) {
      return resolveActionBarGradient(gradient, theme)
    }
    return undefined
  }, [gradient, theme])

  // ===== Resolve Shape =====
  const resolvedBorderRadius = useMemo(() => {
    if (borderRadiusOverride !== undefined) return borderRadiusOverride
    return resolveActionBarShape(shape)
  }, [borderRadiusOverride, shape])

  // ===== Apply Attached Edge Styling =====
  const attachedStyles = useMemo(() => {
    if (!attachedConfig) return {}
    
    const styles: { boxShadow?: string } = {}
    
    // Remove shadow on attached edge
    if (attachedConfig.noShadowOnEdge) {
      // For attached bars, use a directional shadow away from the edge
      const { edge } = attachedConfig
      if (edge === "bottom") {
        styles.boxShadow = "0 -4px 16px rgba(0, 0, 0, 0.25)"
      } else if (edge === "top") {
        styles.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.25)"
      } else if (edge === "left") {
        styles.boxShadow = "4px 0 16px rgba(0, 0, 0, 0.25)"
      } else if (edge === "right") {
        styles.boxShadow = "-4px 0 16px rgba(0, 0, 0, 0.25)"
      }
    }
    
    return styles
  }, [attachedConfig])

  // ===== Final Resolved Values =====
  // Priority: override → colorMode → gradient → variant
  const finalBgcolor = bgcolorOverride ?? colorModeBackground ?? undefined
  const finalBackground = gradientBackground ?? (finalBgcolor ? undefined : variantBgcolor)
  const finalBorder = borderOverride ?? variantBorder
  const finalBoxShadow = boxShadowOverride ?? attachedStyles.boxShadow ?? variantBoxShadow
  const finalBackdropFilter = blurOverride !== undefined 
    ? (blurOverride > 0 ? `blur(${blurOverride}px)` : "none")
    : variantBackdropFilter

  // ===== Build Size Styles =====

  const sizeStyles: { width?: number | string; height?: number | string } = {}

  if (isHorizontal) {
    if (thicknessPx !== undefined) sizeStyles.height = thicknessPx
    if (length) {
      sizeStyles.width = resolveActionBarLength(length)
    }
  } else {
    if (thicknessPx !== undefined) sizeStyles.width = thicknessPx
    if (length) {
      sizeStyles.height = resolveActionBarLength(length)
    }
  }

  // ===== Determine Surface Color Mode for Children =====
  // ActionBars use dark surfaces in light mode and light surfaces in dark mode.
  // Transparent variants (minimal, outlined) let the page show through.
  // Primary/secondary color modes may need different icon colors
  
  const isTransparentVariant = variant === "minimal" || variant === "outlined" || variant === "orbs"
  const isPrimaryVariant = colorMode === "primary" || colorMode === "secondary"
  const surfaceColorMode: "dark" | "light" = isTransparentVariant 
    ? theme.palette.mode  // Transparent: page shows through, use theme mode
    : isPrimaryVariant
      ? "dark"  // Primary/secondary backgrounds are assumed to need light icons
      : "dark"  // All other variants have dark appearance, need light icons

  // ===== Render =====

  return (
    <ActionBarSurfaceContext.Provider value={{ surfaceColorMode }}>
      <Box
        sx={mergeSx(
          {
            ...sizeStyles,
            bgcolor: finalBgcolor,
            background: finalBackground,
            border: finalBorder,
            borderRadius: resolvedBorderRadius,
            backdropFilter: finalBackdropFilter,
            boxShadow: finalBoxShadow,
            display: "flex",
            flexDirection: isHorizontal ? "row" : "column",
            alignItems: "center",
            justifyContent: alignment,
            gap: `${gap}px`,
            padding: `${padding}px`,
            pointerEvents: disabled ? "none" : "auto",
            opacity: disabled ? 0.5 : 1,
          },
          sx,
        )}
      >
        {children}
      </Box>
    </ActionBarSurfaceContext.Provider>
  )
}
