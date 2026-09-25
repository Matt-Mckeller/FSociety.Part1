"use client"

import React from "react"
import { Box, type SxProps, type Theme } from "@mui/material"
import { type ReactNode, useMemo } from "react"
import { mergeSx } from "@expanse/ui"
import { Z_INDEX } from "@expanse/theme"
import { NavigationPad } from "../../hud-components/navigation-pad"
import { Minimap } from "@expanse/map"
import type { Position } from "@expanse/map"

// =============================================================================
// Types
// =============================================================================

/**
 * Layout fragment for composing custom layouts
 */
export interface LayoutFragment {
  /** Fragment name for debugging */
  name?: string
  /** Show/hide this fragment */
  show?: boolean
  /** Z-index for this fragment */
  zIndex?: number
  /** Position/layout props */
  position?: "top" | "left" | "right" | "bottom" | "center" | "floating"
  /** Size constraints */
  size?: number | string
  /** Custom styles */
  sx?: SxProps<Theme>
  /** Fragment content */
  content: ReactNode
}

/**
 * Minimap configuration fragment
 */
export interface MinimapFragment {
  /** Show minimap */
  show?: boolean
  /** Minimap position */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  /** Minimap variant */
  variant?: "grid" | "dots" | "blocks"
  /** Minimap size */
  size?: "small" | "medium" | "large"
  /** Custom styles */
  sx?: SxProps<Theme>
}

/**
 * Navigation controls configuration fragment
 */
export interface NavigationFragment {
  /** Show navigation controls */
  show?: boolean
  /** Navigation position */
  position?: "bottom-left" | "bottom-center" | "bottom-right"
  /** Navigation variant */
  variant?: "default" | "hints" | "compact" | "expanded"
  /** Navigation size */
  size?: "small" | "medium" | "large"
  /** Custom styles */
  sx?: SxProps<Theme>
}

/**
 * Chrome configuration fragment
 */
export interface ChromeFragment {
  /** Show chrome */
  show?: boolean
  /** Chrome variant */
  variant?: "absolute" | "grid" | "svg"
  /** Chrome slots */
  slots?: {
    topLeft?: ReactNode
    topCenter?: ReactNode
    topRight?: ReactNode
    centerLeft?: ReactNode
    center?: ReactNode
    centerRight?: ReactNode
    bottomLeft?: ReactNode
    bottomCenter?: ReactNode
    bottomRight?: ReactNode
  }
  /** Custom styles */
  sx?: SxProps<Theme>
}

/**
 * ComposableLayout props
 */
export interface ComposableLayoutProps {
  /** Main content */
  children?: ReactNode
  /** Layout fragments to compose */
  fragments?: LayoutFragment[]
  /** Minimap configuration */
  minimap?: MinimapFragment
  /** Navigation controls configuration */
  navigation?: NavigationFragment
  /** Chrome configuration */
  chrome?: ChromeFragment
  /** Root container styles */
  sx?: SxProps<Theme>
  /** Content area styles */
  contentSx?: SxProps<Theme>
  /** Background */
  background?: string | SxProps<Theme>
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get position styles for a fragment
 */
function getFragmentPositionStyles(
  position: LayoutFragment["position"],
  size?: number | string
): SxProps<Theme> {
  switch (position) {
    case "top":
      return {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: size || "auto",
        zIndex: Z_INDEX.BARS,
      }
    case "bottom":
      return {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: size || "auto",
        zIndex: Z_INDEX.BARS,
      }
    case "left":
      return {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: size || "auto",
        zIndex: Z_INDEX.BARS,
      }
    case "right":
      return {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        width: size || "auto",
        zIndex: Z_INDEX.BARS,
      }
    case "floating":
      return {
        position: "absolute",
        zIndex: Z_INDEX.OVERLAY_ZONES,
      }
    case "center":
    default:
      return {
        position: "relative",
        zIndex: Z_INDEX.CONTENT,
      }
  }
}

// =============================================================================
// ComposableLayout Component
// =============================================================================

/**
 * Composable layout system for mixing layout features.
 * 
 * Allows you to build custom layouts by composing fragments from different
 * templates, providing maximum flexibility while maintaining consistency.
 * 
 * **Features**:
 * - Mix and match features from different templates
 * - Full control over positioning and z-index
 * - Minimap and navigation controls as optional fragments
 * - Chrome overlay system integration
 * - Type-safe fragment composition
 * 
 * @example
 * ```tsx
 * <ComposableLayout
 *   minimap={{ show: true, position: "top-right" }}
 *   navigation={{ show: true, position: "bottom-center" }}
 *   fragments={[
 *     {
 *       name: "sidebar",
 *       position: "left",
 *       size: 240,
 *       content: <Sidebar />
 *     },
 *     {
 *       name: "header",
 *       position: "top",
 *       size: 64,
 *       content: <Header />
 *     }
 *   ]}
 * >
 *   <MainContent />
 * </ComposableLayout>
 * ```
 * 
 * @example
 * ```tsx
 * // Mix documentation sidebar with minimal chrome
 * <ComposableLayout
 *   fragments={[
 *     {
 *       name: "docs-sidebar",
 *       position: "left",
 *       size: 280,
 *       content: <DocsSidebar />
 *     }
 *   ]}
 *   chrome={{
 *     show: true,
 *     variant: "absolute",
 *     slots: {
 *       topRight: <UserMenu />,
 *       bottomLeft: <StatusIndicator />
 *     }
 *   }}
 * >
 *   <ArticleContent />
 * </ComposableLayout>
 * ```
 */
export function ComposableLayout({
  children,
  fragments = [],
  minimap,
  navigation,
  chrome,
  sx,
  contentSx,
  background,
}: ComposableLayoutProps) {
  // Calculate content padding based on fixed fragments
  const contentPadding = useMemo(() => {
    return fragments.reduce(
      (acc, fragment) => {
        if (!fragment.show && fragment.show !== undefined) return acc
        
        const size = typeof fragment.size === "number" ? `${fragment.size}px` : fragment.size || 0

        switch (fragment.position) {
          case "top":
            return { ...acc, paddingTop: size }
          case "bottom":
            return { ...acc, paddingBottom: size }
          case "left":
            return { ...acc, paddingLeft: size }
          case "right":
            return { ...acc, paddingRight: size }
          default:
            return acc
        }
      },
      { paddingTop: 0 as string | number, paddingBottom: 0 as string | number, paddingLeft: 0 as string | number, paddingRight: 0 as string | number }
    )
  }, [fragments])

  return (
    <Box
      sx={mergeSx(
        {
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          ...(typeof background === "string"
            ? { backgroundColor: background }
            : background),
        },
        sx
      )}
    >
      {/* Render fragments */}
      {fragments.map((fragment, index) => {
        // Skip hidden fragments
        if (fragment.show === false) return null

        return (
          <Box
            key={fragment.name || `fragment-${index}`}
            sx={mergeSx(
              getFragmentPositionStyles(fragment.position, fragment.size),
              {
                zIndex: fragment.zIndex,
              },
              fragment.sx
            )}
          >
            {fragment.content}
          </Box>
        )
      })}

      {/* Main content area */}
      <Box
        sx={[
          {
            position: "relative",
            width: "100%",
            height: "100%",
            zIndex: Z_INDEX.CONTENT,
            ...contentPadding,
          },
          ...(contentSx ? (Array.isArray(contentSx) ? contentSx : [contentSx]) : []),
        ]}
      >
        {children}
      </Box>

      {/* Minimap */}
      {minimap?.show && (
        <Box
          sx={mergeSx(
            {
              position: "absolute",
              zIndex: Z_INDEX.OVERLAY_ZONES,
              ...(minimap.position === "top-left" && { top: 16, left: 16 }),
              ...(minimap.position === "top-right" && { top: 16, right: 16 }),
              ...(minimap.position === "bottom-left" && { bottom: 16, left: 16 }),
              ...(minimap.position === "bottom-right" && { bottom: 16, right: 16 }),
            },
            minimap.sx
          )}
        >
          <Minimap
            variant={minimap.variant}
            size={minimap.size}
          />
        </Box>
      )}

      {/* Navigation Controls */}
      {navigation?.show && (
        <Box
          sx={mergeSx(
            {
              position: "absolute",
              bottom: 16,
              zIndex: Z_INDEX.ACTION_BARS,
              ...(navigation.position === "bottom-left" && { left: 16 }),
              ...(navigation.position === "bottom-center" && {
                left: "50%",
                transform: "translateX(-50%)",
              }),
              ...(navigation.position === "bottom-right" && { right: 16 }),
            },
            navigation.sx
          )}
        >
          <NavigationPad
            variant={navigation.variant}
            size={navigation.size}
          />
        </Box>
      )}

      {/* Chrome overlay (if configured) */}
      {chrome?.show && chrome.slots && (
        <Box
          sx={mergeSx(
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: "none",
              zIndex: Z_INDEX.CHROME,
            },
            chrome.sx
          )}
        >
          {/* Render chrome slots in a 3x3 grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gridTemplateRows: "auto 1fr auto",
              width: "100%",
              height: "100%",
              gap: 0,
            }}
          >
            {/* Top row */}
            <Box sx={{ pointerEvents: "auto" }}>{chrome.slots.topLeft}</Box>
            <Box sx={{ pointerEvents: "auto" }}>{chrome.slots.topCenter}</Box>
            <Box sx={{ pointerEvents: "auto" }}>{chrome.slots.topRight}</Box>

            {/* Middle row */}
            <Box sx={{ pointerEvents: "auto" }}>{chrome.slots.centerLeft}</Box>
            <Box sx={{ pointerEvents: "auto" }}>{chrome.slots.center}</Box>
            <Box sx={{ pointerEvents: "auto" }}>{chrome.slots.centerRight}</Box>

            {/* Bottom row */}
            <Box sx={{ pointerEvents: "auto" }}>{chrome.slots.bottomLeft}</Box>
            <Box sx={{ pointerEvents: "auto" }}>{chrome.slots.bottomCenter}</Box>
            <Box sx={{ pointerEvents: "auto" }}>{chrome.slots.bottomRight}</Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default ComposableLayout
