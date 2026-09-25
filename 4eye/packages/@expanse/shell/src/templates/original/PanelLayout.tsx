"use client"

import { Box, type SxProps, type Theme } from "@mui/material"
import { type ReactNode, useMemo } from "react"
import { useNavigation } from "@expanse/map"
import type { BarConfig } from "@expanse/map"

// =============================================================================
// Types
// =============================================================================

export interface PanelLayoutSlots {
  /** Top action bar content */
  top?: ReactNode
  /** Bottom action bar content */
  bottom?: ReactNode
  /** Left sidebar content */
  left?: ReactNode
  /** Right sidebar content */
  right?: ReactNode
}

export interface PanelLayoutProps {
  /** Main content area */
  children: ReactNode
  /** Slot content for action bars */
  slots?: PanelLayoutSlots
  /** Override bar configurations */
  barOverrides?: {
    top?: Partial<BarConfig>
    bottom?: Partial<BarConfig>
    left?: Partial<BarConfig>
    right?: Partial<BarConfig>
  }
  /** Additional styles for the root container */
  sx?: SxProps<Theme>
  /** Additional styles for the main content area */
  contentSx?: SxProps<Theme>
  /** Full height layout (100vh) */
  fullHeight?: boolean
}

// =============================================================================
// Default Bar Settings
// =============================================================================

const DEFAULT_BAR_HEIGHT = 64
const DEFAULT_BAR_WIDTH = 280

// =============================================================================
// ActionBar Component (internal)
// =============================================================================

interface ActionBarProps {
  position: "top" | "bottom" | "left" | "right"
  config?: Partial<BarConfig>
  children?: ReactNode
}

function ActionBar({ position, config, children }: ActionBarProps) {
  if (!config?.enabled && !children) return null

  const isHorizontal = position === "top" || position === "bottom"
  const height = config?.height ?? DEFAULT_BAR_HEIGHT
  const width = config?.width ?? DEFAULT_BAR_WIDTH

  const positionStyles: SxProps<Theme> = {
    top: {
      top: 0,
      left: 0,
      right: 0,
      height,
      borderBottom: 1,
      borderColor: "divider",
    },
    bottom: {
      bottom: 0,
      left: 0,
      right: 0,
      height,
      borderTop: 1,
      borderColor: "divider",
    },
    left: {
      top: 0,
      bottom: 0,
      left: 0,
      width,
      borderRight: 1,
      borderColor: "divider",
    },
    right: {
      top: 0,
      bottom: 0,
      right: 0,
      width,
      borderLeft: 1,
      borderColor: "divider",
    },
  }[position]

  return (
    <Box
      component="aside"
      role="complementary"
      aria-label={`${position} action bar`}
      sx={{
        position: config?.sticky ? "sticky" : "relative",
        zIndex: 10,
        bgcolor: "background.paper",
        display: "flex",
        alignItems: "center",
        justifyContent: isHorizontal ? "center" : "flex-start",
        flexDirection: isHorizontal ? "row" : "column",
        overflow: "hidden",
        transition: "all 0.2s ease",
        ...positionStyles,
      }}
    >
      {children ?? config?.content}
    </Box>
  )
}

// =============================================================================
// PanelLayout Component
// =============================================================================

/**
 * Panel-based layout with flex slots for action bars.
 * 
 * Use for:
 * - Split-screen layouts
 * - Presentations
 * - Embedded grid navigation
 * 
 * For full-screen apps, use FullScreenLayout instead.
 * 
 * @example
 * ```tsx
 * <NavigationProvider config={config}>
 *   <PanelLayout
 *     slots={{
 *       top: <Header />,
 *       bottom: <NavigationPad />,
 *       left: <Minimap />,
 *     }}
 *     barOverrides={{ left: { width: 200 } }}
 *   >
 *     <MainContent />
 *   </PanelLayout>
 * </NavigationProvider>
 * ```
 */
export function PanelLayout({
  children,
  slots,
  barOverrides,
  sx,
  contentSx,
  fullHeight = true,
}: PanelLayoutProps) {
  // Try to get config from context, but don't require it
  let contextConfig: { top?: BarConfig; bottom?: BarConfig; left?: BarConfig; right?: BarConfig } | undefined
  try {
    useNavigation()
    // For future: could read layout config from context
  } catch {
    // PanelLayout can be used outside of provider
  }

  // Merge configurations
  const barConfigs = useMemo(() => ({
    top: { ...contextConfig?.top, ...barOverrides?.top },
    bottom: { ...contextConfig?.bottom, ...barOverrides?.bottom },
    left: { ...contextConfig?.left, ...barOverrides?.left },
    right: { ...contextConfig?.right, ...barOverrides?.right },
  }), [contextConfig, barOverrides])

  const hasTop = slots?.top || barConfigs.top?.enabled
  const hasBottom = slots?.bottom || barConfigs.bottom?.enabled
  const hasLeft = slots?.left || barConfigs.left?.enabled
  const hasRight = slots?.right || barConfigs.right?.enabled

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: fullHeight ? "100vh" : undefined,
        height: fullHeight ? "100vh" : undefined,
        overflow: "hidden",
        position: "relative",
        ...sx,
      }}
    >
      {/* Top Bar */}
      {hasTop && (
        <ActionBar position="top" config={barConfigs.top}>
          {slots?.top}
        </ActionBar>
      )}

      {/* Middle Section */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Left Bar */}
        {hasLeft && (
          <ActionBar position="left" config={barConfigs.left}>
            {slots?.left}
          </ActionBar>
        )}

        {/* Main Content */}
        <Box
          component="main"
          role="main"
          sx={{
            flex: 1,
            overflow: "auto",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            ...contentSx,
          }}
        >
          {children}
        </Box>

        {/* Right Bar */}
        {hasRight && (
          <ActionBar position="right" config={barConfigs.right}>
            {slots?.right}
          </ActionBar>
        )}
      </Box>

      {/* Bottom Bar */}
      {hasBottom && (
        <ActionBar position="bottom" config={barConfigs.bottom}>
          {slots?.bottom}
        </ActionBar>
      )}
    </Box>
  )
}

export default PanelLayout
