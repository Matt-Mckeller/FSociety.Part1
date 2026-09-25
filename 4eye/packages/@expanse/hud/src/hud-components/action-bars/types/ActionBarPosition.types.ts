import type { SxProps, Theme } from "@mui/material"
import type { ReactNode } from "react"
import type { Position } from '@expanse/map/navigation/types/Position.types'
import type { ActionBarOrientation } from './ActionBar.types'

// =============================================================================
// Anchor Positions
// =============================================================================

/**
 * Anchor point on screen - WHERE the bar attaches
 * Combines edge + alignment for precise placement
 */
export type ActionBarAnchor =
  // Corners
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  // Edge centers
  | "top-center"
  | "bottom-center"
  | "left-center"
  | "right-center"
  // Full edges (stretch entire edge)
  | "top"
  | "bottom"
  | "left"
  | "right"
  // Floating (absolute positioned)
  | "floating"

// ActionBarOrientation is imported from ActionBar.types.ts to avoid duplicate exports

/**
 * Layer - stacking order for multiple bars at same anchor
 * 0 = primary (closest to edge)
 * 1 = secondary (inward from primary)
 * 2 = tertiary (furthest from edge)
 */
export type ActionBarLayer = 0 | 1 | 2

/**
 * Stretch behavior - how bar fills its anchor area
 */
export type ActionBarStretch =
  | "fit-content"          // Size to content
  | "fill"                 // Fill entire anchor edge
  | "fill-start"           // Fill from start of edge
  | "fill-end"             // Fill from end of edge
  | { pixels: number }     // Fixed pixel size
  | { percent: number }    // Percentage of edge

/**
 * Full position configuration
 */
export interface ActionBarPosition {
  anchor: ActionBarAnchor
  orientation?: ActionBarOrientation  // defaults based on anchor
  layer?: ActionBarLayer              // default: 0 (primary)
  stretch?: ActionBarStretch          // defaults to "fit-content"
  offset?: {                          // offset from anchor point
    x?: number
    y?: number
  }
  zIndex?: number                     // manual z-index override
}

// =============================================================================
// Position Presets
// =============================================================================

/**
 * Common preset configurations for quick setup
 * Naming convention: {anchor}[-{layer}]
 */
export type ActionBarPreset =
  // Full edge bars (layer 0)
  | "top"
  | "bottom"
  | "left"
  | "right"
  // Full edge bars (layer 1)
  | "top-secondary"
  | "bottom-secondary"
  | "left-secondary"
  | "right-secondary"
  // Full edge bars (layer 2)
  | "top-tertiary"
  | "bottom-tertiary"
  | "left-tertiary"
  | "right-tertiary"
  // Center bars (all layers)
  | "bottom-center"
  | "bottom-center-secondary"
  | "bottom-center-tertiary"
  | "top-center"
  | "top-center-secondary"
  | "top-center-tertiary"
  // Corner docks (all layers)
  | "bottom-left"
  | "bottom-left-secondary"
  | "bottom-right"
  | "bottom-right-secondary"
  | "top-left"
  | "top-left-secondary"
  | "top-right"
  | "top-right-secondary"
  // Floating
  | "floating-bottom"
  | "floating-center"

/**
 * Preset definitions - maps preset name to full config
 */
export const ACTION_BAR_PRESETS: Record<ActionBarPreset, ActionBarPosition> = {
  // Full edges - Layer 0
  "top": { anchor: "top", orientation: "horizontal", layer: 0, stretch: "fill" },
  "bottom": { anchor: "bottom", orientation: "horizontal", layer: 0, stretch: "fill" },
  "left": { anchor: "left", orientation: "vertical", layer: 0, stretch: "fill" },
  "right": { anchor: "right", orientation: "vertical", layer: 0, stretch: "fill" },
  
  // Full edges - Layer 1
  "top-secondary": { anchor: "top", orientation: "horizontal", layer: 1, stretch: "fill" },
  "bottom-secondary": { anchor: "bottom", orientation: "horizontal", layer: 1, stretch: "fill" },
  "left-secondary": { anchor: "left", orientation: "vertical", layer: 1, stretch: "fill" },
  "right-secondary": { anchor: "right", orientation: "vertical", layer: 1, stretch: "fill" },
  
  // Full edges - Layer 2
  "top-tertiary": { anchor: "top", orientation: "horizontal", layer: 2, stretch: "fill" },
  "bottom-tertiary": { anchor: "bottom", orientation: "horizontal", layer: 2, stretch: "fill" },
  "left-tertiary": { anchor: "left", orientation: "vertical", layer: 2, stretch: "fill" },
  "right-tertiary": { anchor: "right", orientation: "vertical", layer: 2, stretch: "fill" },
  
  // Center bars
  "bottom-center": { anchor: "bottom-center", orientation: "horizontal", layer: 0, stretch: "fit-content" },
  "bottom-center-secondary": { anchor: "bottom-center", orientation: "horizontal", layer: 1, stretch: "fit-content" },
  "bottom-center-tertiary": { anchor: "bottom-center", orientation: "horizontal", layer: 2, stretch: "fit-content" },
  "top-center": { anchor: "top-center", orientation: "horizontal", layer: 0, stretch: "fit-content" },
  "top-center-secondary": { anchor: "top-center", orientation: "horizontal", layer: 1, stretch: "fit-content" },
  "top-center-tertiary": { anchor: "top-center", orientation: "horizontal", layer: 2, stretch: "fit-content" },
  
  // Corner docks
  "bottom-left": { anchor: "bottom-left", orientation: "horizontal", layer: 0, stretch: "fit-content" },
  "bottom-left-secondary": { anchor: "bottom-left", orientation: "horizontal", layer: 1, stretch: "fit-content" },
  "bottom-right": { anchor: "bottom-right", orientation: "horizontal", layer: 0, stretch: "fit-content" },
  "bottom-right-secondary": { anchor: "bottom-right", orientation: "horizontal", layer: 1, stretch: "fit-content" },
  "top-left": { anchor: "top-left", orientation: "horizontal", layer: 0, stretch: "fit-content" },
  "top-left-secondary": { anchor: "top-left", orientation: "horizontal", layer: 1, stretch: "fit-content" },
  "top-right": { anchor: "top-right", orientation: "horizontal", layer: 0, stretch: "fit-content" },
  "top-right-secondary": { anchor: "top-right", orientation: "horizontal", layer: 1, stretch: "fit-content" },
  
  // Floating
  "floating-bottom": { anchor: "floating", orientation: "horizontal", layer: 0, stretch: "fit-content", offset: { y: -20 } },
  "floating-center": { anchor: "floating", orientation: "horizontal", layer: 0, stretch: "fit-content" },
}

/**
 * Resolve a preset or position to full position config
 */
export function resolveActionBarPosition(
  positionOrPreset: ActionBarPosition | ActionBarPreset
): ActionBarPosition {
  if (typeof positionOrPreset === "string") {
    return ACTION_BAR_PRESETS[positionOrPreset]
  }
  return positionOrPreset
}

// =============================================================================
// Bar Items
// =============================================================================

/**
 * Base action bar item
 */
export interface ActionBarItem {
  /** Unique identifier */
  id: string
  /** Item type */
  type: "button" | "nav" | "menu" | "separator" | "spacer" | "custom"
  /** Display label */
  label?: string
  /** Icon (MUI icon component or element) */
  icon?: ReactNode
  /** Tooltip text */
  tooltip?: string
  /** Disabled state */
  disabled?: boolean
  /** Hidden state */
  hidden?: boolean
  /** Click handler */
  onClick?: () => void
  /** Custom render function */
  render?: () => ReactNode
  /** Custom styles */
  sx?: SxProps<Theme>
}

/**
 * Navigation-specific item (extends base)
 */
export interface NavItem extends ActionBarItem {
  type: "nav"
  /** Grid position to navigate to */
  position: Position
  /** URL route (for routing sync) */
  route?: string
  /** Currently active/selected */
  active?: boolean
  /** Notification badge */
  badge?: number | string
}

/**
 * Menu group item
 */
export interface MenuGroupItem extends ActionBarItem {
  type: "menu"
  /** Child items in menu */
  children: ActionBarItem[]
  /** Expandable */
  expandable?: boolean
  /** Currently expanded */
  expanded?: boolean
}

// =============================================================================
// Bar Skin/Appearance
// =============================================================================

/**
 * Visual skin/theme for the bar
 */
export interface ActionBarSkin {
  background?: string | "glass" | "solid" | "transparent"
  borderRadius?: number
  shadow?: boolean
  blur?: number
}

/**
 * Size configuration
 */
export type ActionBarSize =
  | "xs"           // 32px
  | "sm"           // 48px
  | "md"           // 56px (default)
  | "lg"           // 72px
  | "xl"           // 96px
  | { pixels: number }

/**
 * Size to pixels mapping
 */
export const ACTION_BAR_SIZE_PX: Record<Exclude<ActionBarSize, { pixels: number }>, number> = {
  xs: 32,
  sm: 48,
  md: 56,
  lg: 72,
  xl: 96,
}

/**
 * Resolve size to pixels
 */
export function resolveActionBarSize(size: ActionBarSize | undefined): number {
  if (!size) return ACTION_BAR_SIZE_PX.md
  if (typeof size === "object") return size.pixels
  return ACTION_BAR_SIZE_PX[size]
}

// =============================================================================
// Bar Configuration
// =============================================================================

/**
 * Full configuration for an action bar
 */
export interface ActionBarConfig {
  /** Unique identifier */
  id: string
  
  /** Positioning (modular system with layers) */
  position: ActionBarPosition | ActionBarPreset
  
  /** Appearance */
  size?: ActionBarSize
  skin?: ActionBarSkin
  
  /** Content */
  items: ActionBarItem[]
  
  /** State */
  visible?: boolean
  disabled?: boolean
  collapsed?: boolean
}

// =============================================================================
// Helper functions
// =============================================================================

/**
 * All anchor values (useful for initializing lookup maps)
 */
export const ALL_ANCHORS: ActionBarAnchor[] = [
  "top",
  "bottom",
  "left",
  "right",
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
  "left-center",
  "right-center",
  "floating",
]

/**
 * Check if a position or preset targets a specific anchor
 */
export function getAnchorFromPosition(
  positionOrPreset: ActionBarPosition | ActionBarPreset
): ActionBarAnchor {
  const resolved = resolveActionBarPosition(positionOrPreset)
  return resolved.anchor
}
