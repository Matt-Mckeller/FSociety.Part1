"use client"

import React from "react"
import { Box, type SxProps, type Theme } from "@mui/material"
import { useMemo, type ReactNode } from "react"
import { mergeSx } from "../../utils"
import { BarSlot } from "./BarSlot"
import { OverlayZone } from "./OverlayZone"
import { ContentArea } from "./ContentArea"
import type {
  LayoutSkeletonProps,
  BarSlotConfig,
  BarSlotsConfig,
  OverlayZoneConfig,
  OverlayPosition,
} from "./types"

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Normalize a bar config from ReactNode | BarSlotConfig to BarSlotConfig
 * 
 * @internal
 */
function normalizeBarConfig(
  bar: ReactNode | BarSlotConfig | undefined,
  defaultSize: number
): BarSlotConfig | null {
  if (!bar) return null

  // If it's a BarSlotConfig object
  if (
    typeof bar === "object" &&
    bar !== null &&
    ("content" in bar || "size" in bar || "visible" in bar)
  ) {
    return {
      size: defaultSize,
      visible: true,
      ...bar,
    }
  }

  // Otherwise it's ReactNode content
  return {
    content: bar as ReactNode,
    size: defaultSize,
    visible: true,
  }
}

/**
 * Normalize overlay config from ReactNode | OverlayZoneConfig to OverlayZoneConfig
 * 
 * @internal
 */
function normalizeOverlayConfig(
  overlay: ReactNode | OverlayZoneConfig | undefined,
  overlayPosition: OverlayPosition
): OverlayZoneConfig | null {
  if (!overlay) return null

  // If it's an OverlayZoneConfig object
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

  // Otherwise it's ReactNode content
  return {
    content: overlay as ReactNode,
    position: overlayPosition,
  }
}

// =============================================================================
// LayoutSkeleton Component
// =============================================================================

/**
 * LayoutSkeleton - Pure structural layout with bar slots and overlay zones
 * 
 * Provides a flexible foundation for template layouts with:
 * - Fixed position bars (top/bottom/left/right)
 * - Floating overlay zones (9 positions)
 * - Automatic content area padding
 * - No feature-specific logic
 * 
 * @internal This is an internal component, not exported in public API
 * 
 * @example
 * ```tsx
 * <LayoutSkeleton
 *   bars={{
 *     top: <TopBar />,
 *     left: { content: <Sidebar />, size: 240 },
 *   }}
 *   overlays={{
 *     "top-right": <Minimap />,
 *     "bottom-center": <NavControls />,
 *   }}
 * >
 *   <PageContent />
 * </LayoutSkeleton>
 * ```
 */
export function LayoutSkeleton({
  bars = {},
  overlays = {},
  children,
  background,
  sx,
  contentSx,
  minContentSize,
}: LayoutSkeletonProps) {
  // Normalize bar configurations
  const topBar = useMemo(() => normalizeBarConfig(bars.top, 56), [bars.top])
  const bottomBar = useMemo(() => normalizeBarConfig(bars.bottom, 80), [bars.bottom])
  const leftBar = useMemo(() => normalizeBarConfig(bars.left, 56), [bars.left])
  const rightBar = useMemo(() => normalizeBarConfig(bars.right, 56), [bars.right])

  // Calculate content padding based on visible bars
  const contentPadding = useMemo(
    () => ({
      top: topBar?.visible && topBar.size ? topBar.size : 0,
      bottom: bottomBar?.visible && bottomBar.size ? bottomBar.size : 0,
      left: leftBar?.visible && leftBar.size ? leftBar.size : 0,
      right: rightBar?.visible && rightBar.size ? rightBar.size : 0,
    }),
    [topBar, bottomBar, leftBar, rightBar]
  )

  // Calculate adjacent bar sizes for each bar
  const adjacentBars = useMemo(
    () => ({
      top: {
        left: contentPadding.left,
        right: contentPadding.right,
      },
      bottom: {
        left: contentPadding.left,
        right: contentPadding.right,
      },
      left: {
        top: contentPadding.top,
        bottom: contentPadding.bottom,
      },
      right: {
        top: contentPadding.top,
        bottom: contentPadding.bottom,
      },
    }),
    [contentPadding]
  )

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

  return (
    <Box
      data-layout-skeleton
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
      {/* Top Bar */}
      {topBar && (
        <BarSlot edge="top" config={topBar} adjacentBars={adjacentBars.top} />
      )}

      {/* Bottom Bar */}
      {bottomBar && (
        <BarSlot edge="bottom" config={bottomBar} adjacentBars={adjacentBars.bottom} />
      )}

      {/* Left Bar */}
      {leftBar && (
        <BarSlot edge="left" config={leftBar} adjacentBars={adjacentBars.left} />
      )}

      {/* Right Bar */}
      {rightBar && (
        <BarSlot edge="right" config={rightBar} adjacentBars={adjacentBars.right} />
      )}

      {/* Overlay Zones */}
      {overlayConfigs.map(({ position, config }) => (
        <OverlayZone
          key={position}
          config={config}
          contentPadding={contentPadding}
        />
      ))}

      {/* Main Content Area */}
      <ContentArea padding={contentPadding} sx={contentSx} minSize={minContentSize}>
        {children}
      </ContentArea>
    </Box>
  )
}

export default LayoutSkeleton
