import type { ReactNode } from "react"
import type { SxProps, Theme } from "@mui/material"

// =============================================================================
// Bar Slot Configuration
// =============================================================================

/**
 * Edge position for a bar slot
 */
export type BarEdge = "top" | "bottom" | "left" | "right"

/**
 * Configuration for a single bar slot
 */
export interface BarSlotConfig {
  /** Bar content */
  content?: ReactNode
  /** Size (height for top/bottom, width for left/right) */
  size?: number
  /** Whether the bar is visible */
  visible?: boolean
  /** Fixed offset from edge */
  offset?: number
  /** Custom z-index (default: 100) */
  zIndex?: number
  /** Custom styles */
  sx?: SxProps<Theme>
}

/**
 * All bar slots
 */
export interface BarSlotsConfig {
  top?: BarSlotConfig | ReactNode
  bottom?: BarSlotConfig | ReactNode
  left?: BarSlotConfig | ReactNode
  right?: BarSlotConfig | ReactNode
}

// =============================================================================
// Overlay Zone Configuration
// =============================================================================

/**
 * Overlay zone position (for minimap, nav controls, etc.)
 */
export type OverlayPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center"
  | "center-left"
  | "center-right"
  | "center"

/**
 * Configuration for an overlay zone
 */
export interface OverlayZoneConfig {
  /** Overlay content */
  content?: ReactNode
  /** Position */
  position: OverlayPosition
  /** Gap from edge (default: 16px) */
  gap?: number
  /** Custom z-index (default: 200) */
  zIndex?: number
  /** Custom styles */
  sx?: SxProps<Theme>
}

/**
 * Map of overlay zones by position
 */
export type OverlayZonesConfig = Partial<Record<OverlayPosition, ReactNode | OverlayZoneConfig>>

// =============================================================================
// Layout Skeleton Props
// =============================================================================

/**
 * Main LayoutSkeleton component props
 */
export interface LayoutSkeletonProps {
  /** Bar slots configuration */
  bars?: BarSlotsConfig
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
  /** Minimum content area size (prevents bars from overlapping) */
  minContentSize?: { width?: number; height?: number }
}
