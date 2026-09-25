"use client"

import React from "react"
import { Box, type SxProps, type Theme, useTheme } from "@mui/material"
import { type ReactNode, useMemo } from "react"
import { mergeSx } from "@expanse/ui"
import { useNavigation } from "@expanse/map"
import type { Position, TileConfig } from "@expanse/map"
import { NavigationPad } from "../../hud-components/navigation-pad"
import { Minimap } from "@expanse/map"
import type {
  MinimalLayoutPreset,
  ThemeMode,
  PageRegistry,
} from "@expanse/shell"
import {
  FullbleedSkeleton,
  minimalLayoutPresets,
  usePageKey,
  useLayoutTransition,
  usePageRenderer,
} from "@expanse/shell"
import type { SimplifiedLayoutProps } from "../types/common"
import { useAutoGeneration } from "../hooks/useAutoGeneration"

// =============================================================================
// Types
// =============================================================================

export interface MinimalLayoutProps extends SimplifiedLayoutProps {
  /** Layout preset */
  preset?: MinimalLayoutPreset
  /** Minimap variant */
  minimapVariant?: "grid" | "dots" | "blocks"
  /** Minimap size */
  minimapSize?: "small" | "medium" | "large"
  /** Navigation pad variant */
  navPadVariant?: "default" | "hints" | "compact" | "expanded"
  /** Navigation pad size */
  navPadSize?: "small" | "medium" | "large"
  /** Custom minimap component */
  customMinimap?: ReactNode
  /** Custom navigation controls */
  customNavigationControls?: ReactNode
  /** Custom page registry (merged with autoPages) */
  customPageRegistry?: PageRegistry
  /** Transition duration in ms */
  transitionDuration?: number
  /** Background color/style */
  background?: string | SxProps<Theme>
  /** Custom styles for root container */
  sx?: SxProps<Theme>
  /** Custom styles for main content area */
  contentSx?: SxProps<Theme>
}

// =============================================================================
// MinimalLayout Component
// =============================================================================

/**
 * Minimal layout for grid navigation.
 * 
 * The cleanest possible layout with maximum focus on content.
 * Perfect for presentations, immersive experiences, or content-first applications.
 * 
 * **Presets**:
 * - `clean`: Pure content, no controls visible
 * - `floating-controls`: Subtle floating minimap and navigation controls
 * - `bottom-controls`: Minimap in bottom-right, controls in bottom bar
 * 
 * **Features**:
 * - Automatic navigation generation from grid
 * - Automatic page registration
 * - Theme-aware styling
 * - Minimal chrome and distractions
 * 
 * @example
 * ```tsx
 * <NavigationProvider config={gridConfig}>
 *   <MinimalLayout 
 *     preset="floating-controls"
 *     themeMode="dark"
 *     autoNavigation="from-grid"
 *     autoPages={{
 *       home: HomePage,
 *       about: AboutPage,
 *     }}
 *   />
 * </NavigationProvider>
 * ```
 */
export function MinimalLayout({
  preset = "clean",
  themeMode,
  themePreset,
  showThemeToggle = false,
  showColorPicker = false,
  autoNavigation,
  autoPages,
  customPageRegistry,
  minimapVariant = "grid",
  minimapSize = "medium",
  navPadVariant = "default",
  navPadSize = "medium",
  customMinimap,
  customNavigationControls,
  children,
  transitionDuration = 250,
  background,
  sx,
  contentSx,
}: MinimalLayoutProps): JSX.Element {
  const theme = useTheme()
  const { position, currentTile, config } = useNavigation()

  // Get preset configuration (with fallback to 'clean')
  const presetConfig = minimalLayoutPresets[preset] || minimalLayoutPresets['clean']

  // Auto-generation: navigation items and page registry
  const { pageRegistry } = useAutoGeneration({
    config,
    autoNavigation,
    autoPages,
    customPageRegistry,
  })

  // Render page content (using hook)
  const pageContent = usePageRenderer({
    position,
    currentTile,
    children,
    pageRegistry,
  })

  // Page key for transitions
  const pageKey = usePageKey(position)

  // Transition styles
  const transitionStyles = useLayoutTransition({
    type: "fade",
    duration: transitionDuration,
  })

  // Build overlays based on preset
  const overlays = useMemo(() => {
    const result: Record<string, ReactNode> = {}

    // Minimap overlay
    if (presetConfig.showMinimap) {
      const position = presetConfig.minimapPosition || "top-right"
      result[position] = customMinimap || <Minimap variant={minimapVariant} size={minimapSize} />
    }

    // Navigation controls overlay (if not in bottom bar)
    if (presetConfig.showNavigationControls && !presetConfig.showBottomBar) {
      const position = presetConfig.navControlsPosition || "bottom-center"
      result[position] = customNavigationControls || <NavigationPad variant={navPadVariant} size={navPadSize} />
    }

    return result
  }, [presetConfig, customMinimap, customNavigationControls, minimapVariant, minimapSize, navPadVariant, navPadSize])

  // Compute background style
  const backgroundStyle = useMemo<string | SxProps<Theme>>(() => {
    if (background) {
      return background
    }
    return {
      background: theme.palette.mode === "dark"
        ? theme.palette.background.default
        : theme.palette.background.default,
    }
  }, [background, theme.palette.mode, theme.palette.background.default])

  // If preset has bottom bar, we need a different approach
  if (presetConfig.showBottomBar) {
    return (
      <Box
        sx={mergeSx(
          {
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
          },
          typeof backgroundStyle === "string" ? { bgcolor: backgroundStyle } : backgroundStyle,
          presetConfig.styles?.root,
          sx
        )}
      >
        {/* Minimap Overlay */}
        {presetConfig.showMinimap && (
          <Box
            sx={{
              position: "fixed",
              zIndex: 200,
              ...(presetConfig.minimapPosition === "top-left" && { top: 16, left: 16 }),
              ...(presetConfig.minimapPosition === "top-right" && { top: 16, right: 16 }),
              ...(presetConfig.minimapPosition === "bottom-left" && { bottom: (presetConfig.barSizes?.bottom || 60) + 16, left: 16 }),
              ...(presetConfig.minimapPosition === "bottom-right" && { bottom: (presetConfig.barSizes?.bottom || 60) + 16, right: 16 }),
            }}
          >
            {customMinimap || <Minimap variant={minimapVariant} size={minimapSize} />}
          </Box>
        )}

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            position: "absolute",
            top: 0,
            bottom: presetConfig.barSizes?.bottom || 60,
            left: 0,
            right: 0,
            overflow: "hidden",
            ...presetConfig.styles?.content,
            ...contentSx,
          }}
        >
          <Box
            key={pageKey}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              ...transitionStyles,
            }}
          >
            {pageContent}
          </Box>
        </Box>

        {/* Bottom Bar */}
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: presetConfig.barSizes?.bottom || 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: theme.palette.mode === "dark"
              ? "rgba(0, 0, 0, 0.3)"
              : "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(10px)",
            borderTop: `1px solid ${theme.palette.divider}`,
            zIndex: 100,
          }}
        >
          {customNavigationControls || (
            presetConfig.showNavigationControls && <NavigationPad variant={navPadVariant} size={navPadSize} />
          )}
        </Box>
      </Box>
    )
  }

  // Use FullbleedSkeleton for presets without bottom bar
  return (
    <FullbleedSkeleton
      overlays={overlays}
      background={backgroundStyle}
      sx={{
        ...presetConfig.styles?.root,
        ...sx,
      }}
      contentSx={{
        ...presetConfig.styles?.content,
        ...contentSx,
      }}
    >
      <Box
        key={pageKey}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          ...transitionStyles,
        }}
      >
        {pageContent}
      </Box>
    </FullbleedSkeleton>
  )
}

export default MinimalLayout
