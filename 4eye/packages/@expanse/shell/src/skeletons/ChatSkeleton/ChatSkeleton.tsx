"use client"

import React from "react"
import { Box, type SxProps, type Theme } from "@mui/material"
import { useMemo, type ReactNode } from "react"
import { mergeSx } from "../../utils"
import { Z_INDEX } from "@expanse/theme"
import type { OverlayZonesConfig, OverlayPosition } from "../LayoutSkeleton/types"

// =============================================================================
// Types
// =============================================================================

export interface ChatSkeletonProps {
  /** Main content */
  children: ReactNode
  /** Chat input component (centered) */
  chatInput?: ReactNode
  /** Left targeting panel */
  targetingLeft?: ReactNode
  /** Right targeting panel */
  targetingRight?: ReactNode
  /** Chat zone bottom gap (default: 24px) */
  chatZoneGap?: number
  /** Chat input width (default: 350px) */
  chatInputWidth?: number
  /** Overlay zones configuration */
  overlays?: OverlayZonesConfig
  /** Background style */
  background?: string | SxProps<Theme>
  /** Custom styles for root container */
  sx?: SxProps<Theme>
  /** Custom styles for content area */
  contentSx?: SxProps<Theme>
  /** Custom styles for chat zone */
  chatZoneSx?: SxProps<Theme>
}

interface OverlayZoneConfig {
  content?: ReactNode
  position: OverlayPosition
  gap?: number
  zIndex?: number
  sx?: SxProps<Theme>
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Normalize overlay config
 * 
 * @internal
 */
function normalizeOverlayConfig(
  overlay: ReactNode | OverlayZoneConfig | undefined,
  overlayPosition: OverlayPosition
): OverlayZoneConfig | null {
  if (!overlay) return null

  if (
    typeof overlay === "object" &&
    overlay !== null &&
    ("content" in overlay || "position" in overlay)
  ) {
    const { position: _, ...rest } = overlay as OverlayZoneConfig
    return {
      position: overlayPosition,
      ...rest,
    }
  }

  return {
    content: overlay as ReactNode,
    position: overlayPosition,
  }
}

/**
 * Get overlay position styles
 * 
 * @internal
 */
function getOverlayPositionStyles(overlayPosition: OverlayPosition, gap: number): SxProps<Theme> {
  const baseStyles = {
    position: "fixed" as const,
    zIndex: Z_INDEX.OVERLAY_ZONES,
  }

  switch (overlayPosition) {
    case "top-left":
      return { ...baseStyles, top: gap, left: gap }
    case "top-right":
      return { ...baseStyles, top: gap, right: gap }
    case "top-center":
      return { ...baseStyles, top: gap, left: "50%", transform: "translateX(-50%)" }
    case "bottom-left":
      return { ...baseStyles, bottom: gap, left: gap }
    case "bottom-right":
      return { ...baseStyles, bottom: gap, right: gap }
    case "bottom-center":
      return { ...baseStyles, bottom: gap, left: "50%", transform: "translateX(-50%)" }
    case "center-left":
      return { ...baseStyles, top: "50%", left: gap, transform: "translateY(-50%)" }
    case "center-right":
      return { ...baseStyles, top: "50%", right: gap, transform: "translateY(-50%)" }
    case "center":
      return { ...baseStyles, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
  }
}

// =============================================================================
// ChatSkeleton Component
// =============================================================================

/**
 * ChatSkeleton - Full-screen content with fixed bottom chat zone
 * 
 * Features:
 * - Full-screen content area
 * - Fixed bottom chat input (centered, with optional panels)
 * - Optional overlay zones for minimap, controls, etc.
 * - Content area has bottom padding to prevent overlap with chat zone
 * 
 * Perfect for chat-style interfaces or apps with persistent input.
 * 
 * @internal This is an internal component, not exported in public API
 * 
 * @example
 * ```tsx
 * <ChatSkeleton
 *   chatInput={<ChatInput />}
 *   targetingLeft={<UserPanel />}
 *   targetingRight={<OptionsPanel />}
 * >
 *   <PageContent />
 * </ChatSkeleton>
 * ```
 */
export function ChatSkeleton({
  children,
  chatInput,
  targetingLeft,
  targetingRight,
  chatZoneGap = 24,
  chatInputWidth = 350,
  overlays = {},
  background,
  sx,
  contentSx,
  chatZoneSx,
}: ChatSkeletonProps) {
  // Normalize overlay configurations
  const overlayConfigs = useMemo(() => {
    return Object.entries(overlays)
      .map(([overlayPosition, config]) => {
        const normalized = normalizeOverlayConfig(config, overlayPosition as OverlayPosition)
        return normalized ? { position: overlayPosition as OverlayPosition, config: normalized } : null
      })
      .filter(Boolean) as Array<{ position: OverlayPosition; config: OverlayZoneConfig }>
  }, [overlays])

  // Background styles
  const backgroundStyle: SxProps<Theme> = useMemo(() => {
    if (typeof background === "string") {
      return { bgcolor: background }
    }
    return background ?? {}
  }, [background])

  // Has chat zone
  const hasChatZone = chatInput || targetingLeft || targetingRight

  return (
    <Box
      data-chat-skeleton
      sx={mergeSx(
        {
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        },
        backgroundStyle,
        sx
      )}
    >
      {/* Overlay Zones */}
      {overlayConfigs.map(({ position, config }) => (
        <Box
          key={position}
          data-overlay-zone={position}
          sx={mergeSx(
            getOverlayPositionStyles(position, config.gap ?? 16),
            { zIndex: config.zIndex ?? 200 },
            config.sx
          )}
        >
          {config.content}
        </Box>
      ))}

      {/* Chat Zone - Fixed Bottom Center */}
      {hasChatZone && (
        <Box
          data-chat-zone
          sx={mergeSx(
            {
              position: "fixed",
              bottom: chatZoneGap,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: Z_INDEX.ACTION_BARS - 50, // Below action bars, above overlays
              display: "flex",
              alignItems: "flex-end",
              gap: 2,
              pointerEvents: "none",
              "& > *": {
                pointerEvents: "auto",
              },
            },
            chatZoneSx
          )}
        >
          {/* Left Targeting Panel */}
          {targetingLeft}

          {/* Chat Input - Centered */}
          {chatInput && (
            <Box sx={{ width: chatInputWidth, minWidth: chatInputWidth }}>
              {chatInput}
            </Box>
          )}

          {/* Right Targeting Panel */}
          {targetingRight}
        </Box>
      )}

      {/* Content Area with bottom padding for chat zone */}
      <Box
        component="main"
        data-content-area
        sx={mergeSx(
          {
            width: "100%",
            height: "100%",
            overflow: "auto",
          },
          // Add bottom padding for chat zone if present
          hasChatZone ? {
            paddingBottom: `${chatZoneGap + 200}px`, // Estimated chat zone height
          } : undefined,
          contentSx
        )}
      >
        {children}
      </Box>
    </Box>
  )
}

export default ChatSkeleton
