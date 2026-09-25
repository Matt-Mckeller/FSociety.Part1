"use client"

import { Box, type SxProps, type Theme, useTheme } from "@mui/material"
import { type ReactNode, useMemo } from "react"
import { useNavigation } from "@expanse/map"
import type { Position, TileConfig } from "@expanse/map"
import { NavigationPad } from "../../hud-components/navigation-pad"
import { Minimap } from "@expanse/map"
import { SimpleBar, type SimpleBarItem } from "../../hud-components/action-bars"
import type {
  PageRegistry,
  DocumentationLayoutPreset,
  ThemeMode,
} from "@expanse/shell"
import type { SimplifiedLayoutProps } from "../types/common"
import {
  documentationLayoutPresets,
  useLayoutTransition,
  usePageKey,
  LayoutSkeleton,
  usePageRenderer,
} from "@expanse/shell"
import { useAutoGeneration } from "../hooks/useAutoGeneration"

// =============================================================================
// Types
// =============================================================================

export interface DocumentationLayoutProps extends SimplifiedLayoutProps {
  /** Layout preset */
  preset?: DocumentationLayoutPreset
  /** Show built-in minimap overlay */
  showMinimap?: boolean
  /** Show built-in navigation controls */
  showNavigationControls?: boolean
  /** Show top bar */
  showTopBar?: boolean
  /** Show left sidebar */
  showLeftBar?: boolean
  /** Show right sidebar */
  showRightBar?: boolean
  /** Minimap position */
  minimapPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  /** Navigation controls position */
  navControlsPosition?: "bottom-center" | "bottom-left" | "bottom-right"
  /** Minimap variant */
  minimapVariant?: "grid" | "dots" | "blocks"
  /** Minimap size */
  minimapSize?: "small" | "medium" | "large"
  /** Navigation pad variant */
  navPadVariant?: "default" | "hints" | "compact" | "expanded"
  /** Navigation pad size */
  navPadSize?: "small" | "medium" | "large"
  /** Action bar variant */
  actionBarVariant?: "simple" | "rich" | "collapsible"
  /** Left sidebar items (auto-generated if autoNavigation is set) */
  leftItems?: SimpleBarItem[]
  /** Right sidebar items (auto-generated if autoNavigation is set) */
  rightItems?: SimpleBarItem[]
  /** Custom minimap component */
  customMinimap?: ReactNode
  /** Custom navigation controls */
  customNavigationControls?: ReactNode
  /** Custom top bar */
  customTopBar?: ReactNode
  /** Custom left bar */
  customLeftBar?: ReactNode
  /** Custom right bar */
  customRightBar?: ReactNode
  /** Custom page registry (merged with autoPages) */
  customPageRegistry?: PageRegistry
  /** Page renderer - called with current position and tile */
  children?: ReactNode | ((position: Position, tile: TileConfig | null) => ReactNode)
  /** Transition duration in ms */
  transitionDuration?: number
  /** Background color/style */
  background?: string | SxProps<Theme>
  /** Custom styles for root container */
  sx?: SxProps<Theme>
  /** Custom styles for main content area */
  contentSx?: SxProps<Theme>
  /** Bar sizes */
  barSizes?: {
    top?: number
    bottom?: number
    left?: number
    right?: number
  }
}

// =============================================================================
// Default Values
// =============================================================================

const DEFAULT_BAR_SIZES = {
  top: 56,
  bottom: 80,
  left: 56,
  right: 56,
}

// =============================================================================
// DocumentationLayout Component
// =============================================================================

/**
 * Documentation-style layout for grid navigation.
 * 
 * Features:
 * - Glass-morphism styled overlays
 * - Simple top bar with title and navigation
 * - Side bars with icon shortcuts (auto-generated or manual)
 * - Minimap overlay showing grid position
 * - Navigation controls with keyboard hints
 * - CSS fade transitions
 * - Theme-aware styling
 * 
 * **Presets**:
 * - `default`: Top bar + both sidebars + minimap + controls
 * - `minimal`: Just top bar + minimap
 * - `sidebar-focus`: Emphasized sidebars for navigation
 * - `clean`: Top bar only, no sidebars
 * 
 * Best for:
 * - Documentation sites
 * - Marketing/landing pages
 * - Feature showcases
 * 
 * @example
 * **Simple with preset and auto-generation**:
 * ```tsx
 * <NavigationProvider config={gridConfig}>
 *   <DocumentationLayout
 *     preset="default"
 *     themeMode="system"
 *     autoNavigation="from-grid"
 *     autoPages={{
 *       home: HomePage,
 *       docs: DocsPage,
 *     }}
 *   />
 * </NavigationProvider>
 * ```
 * 
 * **Manual configuration (legacy)**:
 * ```tsx
 * <NavigationProvider config={config}>
 *   <DocumentationLayout
 *     showMinimap
 *     showNavigationControls
 *     showTopBar
 *     leftItems={[
 *       { id: "demos", icon: PlayArrowIcon, label: "Demos", position: { x: 3, y: 4 } },
 *     ]}
 *   >
 *     {(position, tile) => <YourPage />}
 *   </DocumentationLayout>
 * </NavigationProvider>
 * ```
 */
export function DocumentationLayout({
  preset = "default",
  themeMode,
  themePreset,
  showThemeToggle = false,
  showColorPicker = false,
  autoNavigation,
  autoPages,
  customPageRegistry,
  showMinimap,
  showNavigationControls,
  showTopBar,
  showLeftBar,
  showRightBar,
  minimapPosition,
  navControlsPosition,
  minimapVariant = "grid",
  minimapSize = "medium",
  navPadVariant = "default",
  navPadSize = "medium",
  actionBarVariant = "rich",
  leftItems,
  rightItems,
  customMinimap,
  customNavigationControls,
  customTopBar,
  customLeftBar,
  customRightBar,
  children,
  transitionDuration = 250,
  background,
  sx,
  contentSx,
  barSizes,
}: DocumentationLayoutProps): JSX.Element {
  const theme = useTheme()
  const { position, currentTile, config } = useNavigation()

  // Get preset configuration (can be overridden by explicit props)
  const presetConfig = documentationLayoutPresets[preset]

  // Resolve final configuration (explicit props override preset)
  const finalShowMinimap = showMinimap ?? presetConfig.showMinimap
  const finalShowNavigationControls = showNavigationControls ?? presetConfig.showNavigationControls
  const finalShowTopBar = showTopBar ?? presetConfig.showTopBar
  const finalShowLeftBar = showLeftBar ?? presetConfig.showLeftBar
  const finalShowRightBar = showRightBar ?? presetConfig.showRightBar
  const finalMinimapPosition = minimapPosition ?? presetConfig.minimapPosition ?? "top-right"
  const finalNavControlsPosition = navControlsPosition ?? presetConfig.navControlsPosition ?? "bottom-center"

  // Auto-generate navigation items and page registry
  const { leftItems: autoLeftItems, rightItems: autoRightItems, pageRegistry } = useAutoGeneration({
    config,
    autoNavigation,
    autoPages,
    customPageRegistry,
    leftItems,
    rightItems,
  })

  // Use provided items or auto-generated
  const finalLeftItems = leftItems ?? autoLeftItems
  const finalRightItems = rightItems ?? autoRightItems

  // Render page content
  const pageContent = usePageRenderer({
    children,
    position,
    currentTile,
    pageRegistry,
  })

  // Merge bar sizes with defaults and preset
  const DEFAULT_BAR_SIZES = {
    top: 56,
    bottom: 80,
    left: 56,
    right: 56,
  }
  const sizes = useMemo(() => ({
    ...DEFAULT_BAR_SIZES,
    ...presetConfig.barSizes,
    ...barSizes,
  }), [barSizes, presetConfig.barSizes])

  // Calculate content padding based on visible elements (needed for overlay positioning)
  const contentPadding = useMemo(() => ({
    top: finalShowTopBar ? sizes.top : 0,
    left: (finalShowLeftBar || finalLeftItems.length > 0 || customLeftBar) ? sizes.left : 0,
    right: (finalShowRightBar || finalRightItems.length > 0 || customRightBar) ? sizes.right : 0,
    bottom: 0, // No bottom bar in this layout
  }), [finalShowTopBar, finalShowLeftBar, finalShowRightBar, finalLeftItems, finalRightItems, customLeftBar, customRightBar, sizes])

  // Page key for transitions
  const pageKey = usePageKey(position)

  // Get transition styles from hook
  const transitionStyles = useLayoutTransition({
    type: "fade",
    duration: transitionDuration,
    withScale: true,
  })

  // Background styles - theme-aware
  const bgStyles: SxProps<Theme> = typeof background === "string"
    ? { bgcolor: background }
    : background ?? {
        bgcolor: theme.palette.mode === "dark" 
          ? theme.palette.background.default 
          : theme.palette.background.default,
      }

  // Minimap positioning
  const minimapStyles = useMemo(() => {
    const base = { position: "fixed" as const, zIndex: 1200 }
    const topOffset = finalShowTopBar ? sizes.top + 16 : 16
    const bottomOffset = contentPadding.bottom + 16
    const leftOffset = contentPadding.left + 16
    const rightOffset = contentPadding.right + 16

    switch (finalMinimapPosition) {
      case "top-left": return { ...base, top: topOffset, left: leftOffset }
      case "top-right": return { ...base, top: topOffset, right: rightOffset }
      case "bottom-left": return { ...base, bottom: bottomOffset, left: leftOffset }
      case "bottom-right": return { ...base, bottom: bottomOffset, right: rightOffset }
    }
  }, [finalMinimapPosition, finalShowTopBar, sizes.top, contentPadding])

  // Nav controls positioning
  const navStyles = useMemo(() => {
    const base = { position: "fixed" as const, zIndex: 1200, bottom: 16 }
    switch (finalNavControlsPosition) {
      case "bottom-center": return { ...base, left: "50%", transform: "translateX(-50%)" }
      case "bottom-left": return { ...base, left: contentPadding.left + 16 }
      case "bottom-right": return { ...base, right: contentPadding.right + 16 }
    }
  }, [finalNavControlsPosition, contentPadding])

  return (
    <LayoutSkeleton
      bars={{
        top: finalShowTopBar ? {
          size: sizes.top,
          content: customTopBar ?? <SimpleBar edge="top" size={sizes.top} />,
        } : undefined,
        left: (finalShowLeftBar || finalLeftItems.length > 0 || customLeftBar) ? {
          size: sizes.left,
          content: customLeftBar ?? <SimpleBar edge="left" size={sizes.left} items={finalLeftItems} />,
        } : undefined,
        right: (finalShowRightBar || finalRightItems.length > 0 || customRightBar) ? {
          size: sizes.right,
          content: customRightBar ?? <SimpleBar edge="right" size={sizes.right} items={finalRightItems} />,
        } : undefined,
      }}
      overlays={{
        // Minimap overlay
        ...(finalShowMinimap && {
          [finalMinimapPosition]: {
            content: customMinimap ?? <Minimap variant={minimapVariant} size={minimapSize} />,
          },
        }),
        // Navigation controls overlay
        ...(finalShowNavigationControls && {
          [finalNavControlsPosition]: {
            content: customNavigationControls ?? <NavigationPad variant={navPadVariant} size={navPadSize} />,
          },
        }),
      }}
      contentSx={contentSx}
      sx={bgStyles}
    >
      <Box
        key={pageKey}
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          ...transitionStyles,
        }}
      >
        {pageContent}
      </Box>
    </LayoutSkeleton>
  )
}

export default DocumentationLayout
