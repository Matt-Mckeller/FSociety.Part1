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

export interface FullbleedSkeletonProps {
  /** Overlay zones configuration */
  overlays?: OverlayZonesConfig
  /** Main content */
  children: ReactNode
  /** Background style */
  background?: string | SxProps<Theme>
  /** Custom styles for root container */
  sx?: SxProps<Theme>
  /** Custom styles for content area */
  contentSx?: SxProps<Theme>
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

/**
 * Get position styles for an overlay
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
// FullbleedSkeleton Component
// =============================================================================

/**
 * FullbleedSkeleton - Full-screen content with overlay zones
 * 
 * Simpler than LayoutSkeleton - no bars, just fullscreen content
 * with optional floating overlays (minimap, controls, etc.).
 * 
 * Perfect for immersive content-first layouts.
 * 
 * @internal This is an internal component, not exported in public API
 * 
 * @example
 * ```tsx
 * <FullbleedSkeleton
 *   overlays={{
 *     "top-right": <Minimap />,
 *     "bottom-center": <NavControls />,
 *   }}
 * >
 *   <PageContent />
 * </FullbleedSkeleton>
 * ```
 */
export function FullbleedSkeleton({
  overlays = {},
  children,
  background,
  sx,
  contentSx,
}: FullbleedSkeletonProps) {
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
      data-fullbleed-skeleton
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

      {/* Full-screen Content */}
      <Box
        component="main"
        data-content-area
        sx={mergeSx(
          {
            width: "100%",
            height: "100%",
            overflow: "hidden",
          },
          contentSx
        )}
      >
        {children}
      </Box>
    </Box>
  )
}

export default FullbleedSkeleton
