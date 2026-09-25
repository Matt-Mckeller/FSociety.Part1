"use client"

import { Box, type SxProps, type Theme } from "@mui/material"
import { type ReactNode, useMemo } from "react"
import { useNavigation } from "@expanse/map"
import type { Position, TileConfig } from "@expanse/map"
import { NavigationPad } from "../../hud-components/navigation-pad"
import { Minimap } from "@expanse/map"
import type { MinimapPosition } from "@expanse/map"
import {
  LayoutSkeleton,
  ChatSkeleton,
  usePageKey,
  useLayoutTransition,
} from "@expanse/shell"
import type {
  BarSlotConfig,
  NavControlsPosition,
} from "@expanse/shell"

// =============================================================================
// Types
// =============================================================================

export type TransitionType = "fade" | "slide" | "slide-fade" | "none"

export interface FullScreenLayoutProps {
  /** Show built-in minimap overlay */
  showMinimap?: boolean
  /** Show built-in navigation controls overlay */
  showNavigationControls?: boolean
  /** Minimap position */
  minimapPosition?: MinimapPosition
  /** Navigation controls position */
  navControlsPosition?: NavControlsPosition
  /** Custom minimap element (overrides built-in) */
  customMinimap?: ReactNode
  /** Custom navigation controls (overrides built-in) */
  customNavigationControls?: ReactNode
  /** Fixed position bars */
  bars?: {
    top?: ReactNode | BarSlotConfig
    bottom?: ReactNode | BarSlotConfig
    left?: ReactNode | BarSlotConfig
    right?: ReactNode | BarSlotConfig
  }
  /** Page renderer - called with current position and tile */
  children: ReactNode | ((position: Position, tile: TileConfig | null) => ReactNode)
  /** Transition type */
  transitionType?: TransitionType
  /** Transition duration in ms */
  transitionDuration?: number
  /** Background color/style */
  background?: string | SxProps<Theme>
  /** Custom styles for root container */
  sx?: SxProps<Theme>
  /** Custom styles for main content area */
  contentSx?: SxProps<Theme>
  
  // === Chat Zone (Symbol Grid Style) ===
  /** Enable chat zone at bottom (overrides bottom bar) */
  enableChatZone?: boolean
  /** Chat input component (centered, 350px wide) */
  chatInput?: ReactNode
  /** Left targeting panel */
  targetingLeft?: ReactNode
  /** Right targeting panel */
  targetingRight?: ReactNode
  /** Chat zone bottom gap (default: 24px) */
  chatZoneBottomGap?: number
  /** Chat input width (default: 350px) */
  chatInputWidth?: number
  /** Custom styles for chat zone */
  chatZoneSx?: SxProps<Theme>
}


// =============================================================================
// FullScreenLayout Component
// =============================================================================

/**
 * Full-screen layout for grid navigation apps.
 * 
 * Features:
 * - 100vw × 100vh viewport
 * - Fixed position overlays (minimap, navigation controls)
 * - Fixed position bars (top/bottom/left/right)
 * - CSS page transitions
 * - Main content fills remaining space
 * - Optional chat zone for chat-style interfaces
 * 
 * @example
 * ```tsx
 * <NavigationProvider config={config}>
 *   <FullScreenLayout
 *     showMinimap
 *     showNavigationControls
 *     minimapPosition="top-right"
 *     bars={{
 *       top: <TopBar />,
 *       left: { content: <LeftSidebar />, size: 80 },
 *       bottom: <ChatInput />,
 *     }}
 *   >
 *     {(position, tile) => <PageContent position={position} tile={tile} />}
 *   </FullScreenLayout>
 * </NavigationProvider>
 * ```
 */
export function FullScreenLayout({
  showMinimap = false,
  showNavigationControls = false,
  minimapPosition = "top-right",
  navControlsPosition = "bottom-center",
  customMinimap,
  customNavigationControls,
  bars,
  children,
  transitionType = "fade",
  transitionDuration = 250,
  background,
  sx,
  contentSx,
  // Chat zone
  enableChatZone = false,
  chatInput,
  targetingLeft,
  targetingRight,
  chatZoneBottomGap = 24,
  chatInputWidth = 350,
  chatZoneSx,
}: FullScreenLayoutProps) {
  const { position, currentTile } = useNavigation()

  // Page key for transitions
  const pageKey = usePageKey(position)

  // Transition styles
  const transitionStyles = useLayoutTransition({
    type: transitionType,
    duration: transitionDuration,
  })

  // Render content
  const pageContent = useMemo(() => {
    if (typeof children === "function") {
      return children(position, currentTile)
    }
    return children
  }, [children, position, currentTile])

  // Wrapped content with transitions
  const wrappedContent = useMemo(() => (
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
  ), [pageKey, transitionStyles, pageContent])

  // Build overlays
  const overlays = useMemo(() => {
    const result: Record<string, ReactNode> = {}

    if (showMinimap || customMinimap) {
      result[minimapPosition] = customMinimap ?? <Minimap size="medium" />
    }

    if (showNavigationControls || customNavigationControls) {
      result[navControlsPosition] = customNavigationControls ?? <NavigationPad variant="default" />
    }

    return result
  }, [showMinimap, customMinimap, minimapPosition, showNavigationControls, customNavigationControls, navControlsPosition])

  // If chat zone is enabled, use ChatSkeleton
  if (enableChatZone) {
    return (
      <ChatSkeleton
        chatInput={chatInput}
        targetingLeft={targetingLeft}
        targetingRight={targetingRight}
        chatZoneGap={chatZoneBottomGap}
        chatInputWidth={chatInputWidth}
        overlays={overlays}
        background={background}
        sx={sx}
        contentSx={contentSx}
        chatZoneSx={chatZoneSx}
      >
        {wrappedContent}
      </ChatSkeleton>
    )
  }

  // Otherwise use LayoutSkeleton with bars
  return (
    <LayoutSkeleton
      bars={bars}
      overlays={overlays}
      background={background}
      sx={sx}
      contentSx={{
        overflow: "auto",
        ...contentSx,
      }}
    >
      {wrappedContent}
    </LayoutSkeleton>
  )
}

export default FullScreenLayout
