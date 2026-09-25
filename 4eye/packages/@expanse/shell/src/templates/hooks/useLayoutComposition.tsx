"use client";
/**
 * Headless layout hooks for full customization without opinionated UI
 */

import { useCallback, useMemo, useState, useEffect } from "react"
import type { SxProps, Theme } from "@mui/material"
import { Z_INDEX } from "@expanse/theme"
import type { Position } from '@expanse/map/navigation/types'

// =============================================================================
// Types
// =============================================================================

export interface BarConfig {
  show: boolean
  size?: number
  zIndex?: number
  sx?: SxProps<Theme>
}

export interface BarsConfig {
  top?: BarConfig
  left?: BarConfig
  right?: BarConfig
  bottom?: BarConfig
}

export interface OverlayConfig {
  show: boolean
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"
  zIndex?: number
  sx?: SxProps<Theme>
}

export interface LayoutConfig {
  bars?: BarsConfig
  minimap?: OverlayConfig
  navigation?: OverlayConfig
  background?: string
}

export interface BarStyles {
  container: SxProps<Theme>
  content: SxProps<Theme>
}

export interface OverlayStyles {
  container: SxProps<Theme>
}

export interface LayoutStyles {
  root: SxProps<Theme>
  content: SxProps<Theme>
  bars: {
    top?: BarStyles
    left?: BarStyles
    right?: BarStyles
    bottom?: BarStyles
  }
  overlays: {
    minimap?: OverlayStyles
    navigation?: OverlayStyles
  }
}

// =============================================================================
// useLayoutConfig Hook
// =============================================================================

/**
 * Headless hook for managing layout configuration.
 * 
 * Provides a structured way to configure layout bars, overlays, and styling
 * without rendering any UI. Perfect for building fully custom layouts.
 * 
 * @example
 * ```tsx
 * function MyCustomLayout() {
 *   const { styles, contentPadding, toggleBar } = useLayoutConfig({
 *     bars: {
 *       top: { show: true, size: 64 },
 *       left: { show: true, size: 240 }
 *     },
 *     minimap: { show: true, position: "top-right" }
 *   })
 * 
 *   return (
 *     <div style={styles.root}>
 *       <div style={styles.bars.top.container}>
 *         <TopBar onToggle={() => toggleBar('left')} />
 *       </div>
 *       <div style={styles.content}>
 *         <Content />
 *       </div>
 *     </div>
 *   )
 * }
 * ```
 */
export function useLayoutConfig(config: LayoutConfig) {
  // Calculate content padding based on visible bars
  const contentPadding = useMemo(() => {
    const padding = {
      paddingTop: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
    }

    if (config.bars?.top?.show && config.bars.top.size) {
      padding.paddingTop = config.bars.top.size
    }
    if (config.bars?.left?.show && config.bars.left.size) {
      padding.paddingLeft = config.bars.left.size
    }
    if (config.bars?.right?.show && config.bars.right.size) {
      padding.paddingRight = config.bars.right.size
    }
    if (config.bars?.bottom?.show && config.bars.bottom.size) {
      padding.paddingBottom = config.bars.bottom.size
    }

    return padding
  }, [config.bars])

  // Generate styles for all layout elements
  const styles: LayoutStyles = useMemo(() => {
    const overlayPositions = (position: OverlayConfig["position"]) => {
      switch (position) {
        case "top-left":
          return { top: 16, left: 16 }
        case "top-right":
          return { top: 16, right: 16 }
        case "bottom-left":
          return { bottom: 16, left: 16 }
        case "bottom-right":
          return { bottom: 16, right: 16 }
        case "center":
          return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
        default:
          return {}
      }
    }

    return {
      root: {
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: config.background || "transparent",
      },
      content: {
        position: "relative",
        width: "100%",
        height: "100%",
        zIndex: Z_INDEX.CONTENT,
        ...contentPadding,
      },
      bars: {
        top: config.bars?.top?.show
          ? {
              container: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: config.bars.top.size || 64,
                zIndex: config.bars.top.zIndex || Z_INDEX.BARS,
                ...config.bars.top.sx,
              },
              content: {},
            }
          : undefined,
        left: config.bars?.left?.show
          ? {
              container: {
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: config.bars.left.size || 240,
                zIndex: config.bars.left.zIndex || Z_INDEX.BARS,
                ...config.bars.left.sx,
              },
              content: {},
            }
          : undefined,
        right: config.bars?.right?.show
          ? {
              container: {
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: config.bars.right.size || 240,
                zIndex: config.bars.right.zIndex || Z_INDEX.BARS,
                ...config.bars.right.sx,
              },
              content: {},
            }
          : undefined,
        bottom: config.bars?.bottom?.show
          ? {
              container: {
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: config.bars.bottom.size || 64,
                zIndex: config.bars.bottom.zIndex || Z_INDEX.BARS,
                ...config.bars.bottom.sx,
              },
              content: {},
            }
          : undefined,
      },
      overlays: {
        minimap: config.minimap?.show
          ? {
              container: {
                position: "absolute",
                ...overlayPositions(config.minimap.position),
                zIndex: config.minimap.zIndex || Z_INDEX.OVERLAY_ZONES,
                ...config.minimap.sx,
              },
            }
          : undefined,
        navigation: config.navigation?.show
          ? {
              container: {
                position: "absolute",
                ...overlayPositions(config.navigation.position),
                zIndex: config.navigation.zIndex || Z_INDEX.ACTION_BARS,
                ...config.navigation.sx,
              },
            }
          : undefined,
      },
    }
  }, [config, contentPadding])

  return {
    styles,
    contentPadding,
  }
}

// =============================================================================
// useLayoutState Hook
// =============================================================================

export interface LayoutState {
  bars: {
    top: boolean
    left: boolean
    right: boolean
    bottom: boolean
  }
  overlays: {
    minimap: boolean
    navigation: boolean
  }
}

/**
 * Headless hook for managing layout state (show/hide bars and overlays).
 * 
 * Provides toggle functions and state management without rendering UI.
 * 
 * @example
 * ```tsx
 * function MyLayout() {
 *   const { state, toggleBar, toggleOverlay, showAll, hideAll } = useLayoutState({
 *     bars: { top: true, left: true, right: false, bottom: true },
 *     overlays: { minimap: true, navigation: true }
 *   })
 * 
 *   return (
 *     <>
 *       <button onClick={() => toggleBar('left')}>
 *         Toggle Sidebar
 *       </button>
 *       {state.bars.left && <Sidebar />}
 *     </>
 *   )
 * }
 * ```
 */
export function useLayoutState(initialState: LayoutState) {
  const [state, setState] = useState<LayoutState>(initialState)

  const toggleBar = useCallback((bar: keyof LayoutState["bars"]) => {
    setState((prev) => ({
      ...prev,
      bars: {
        ...prev.bars,
        [bar]: !prev.bars[bar],
      },
    }))
  }, [])

  const toggleOverlay = useCallback((overlay: keyof LayoutState["overlays"]) => {
    setState((prev) => ({
      ...prev,
      overlays: {
        ...prev.overlays,
        [overlay]: !prev.overlays[overlay],
      },
    }))
  }, [])

  const showAll = useCallback(() => {
    setState((prev) => ({
      bars: {
        top: true,
        left: true,
        right: true,
        bottom: true,
      },
      overlays: {
        minimap: true,
        navigation: true,
      },
    }))
  }, [])

  const hideAll = useCallback(() => {
    setState((prev) => ({
      bars: {
        top: false,
        left: false,
        right: false,
        bottom: false,
      },
      overlays: {
        minimap: false,
        navigation: false,
      },
    }))
  }, [])

  return {
    state,
    toggleBar,
    toggleOverlay,
    showAll,
    hideAll,
  }
}

// =============================================================================
// useResponsiveLayout Hook
// =============================================================================

export interface ResponsiveBreakpoints {
  mobile: number
  tablet: number
  desktop: number
}

export type DeviceType = "mobile" | "tablet" | "desktop"

/**
 * Headless hook for responsive layout behavior.
 * 
 * Detects viewport size and provides device type without rendering UI.
 * 
 * @example
 * ```tsx
 * function MyLayout() {
 *   const { deviceType, isMobile, isTablet, isDesktop } = useResponsiveLayout()
 * 
 *   return (
 *     <Layout
 *       bars={{
 *         left: { show: !isMobile, size: isTablet ? 180 : 240 }
 *       }}
 *     />
 *   )
 * }
 * ```
 */
export function useResponsiveLayout(
  breakpoints: ResponsiveBreakpoints = {
    mobile: 768,
    tablet: 1024,
    desktop: 1440,
  }
) {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop")

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      if (width < breakpoints.mobile) {
        setDeviceType("mobile")
      } else if (width < breakpoints.tablet) {
        setDeviceType("tablet")
      } else {
        setDeviceType("desktop")
      }
    }

    handleResize() // Initial check
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [breakpoints])

  return {
    deviceType,
    isMobile: deviceType === "mobile",
    isTablet: deviceType === "tablet",
    isDesktop: deviceType === "desktop",
  }
}
