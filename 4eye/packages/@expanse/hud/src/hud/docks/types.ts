import type { SxProps, Theme } from "@mui/material"
import type { ReactNode } from "react"

// =============================================================================
// Position Types
// =============================================================================

/**
 * Corner positions (4)
 */
export type ActionDockCorner = 
  | "top-left" 
  | "top-right" 
  | "bottom-left" 
  | "bottom-right"

/**
 * Edge center positions (4)
 */
export type ActionDockEdge = 
  | "top-center" 
  | "bottom-center" 
  | "left-center" 
  | "right-center"

/**
 * All 9 screen positions
 * - 4 corners
 * - 4 edge centers
 * - 1 center
 */
export type ActionDockPosition = 
  | ActionDockCorner 
  | ActionDockEdge 
  | "center"

// =============================================================================
// Component Props
// =============================================================================

/**
 * ActionDock Props
 * 
 * ActionDock is a pure positioning component.
 * It places children at fixed screen positions with appropriate offsets.
 * 
 * Use ActionBar inside ActionDock for visual styling.
 * 
 * @example
 * ```tsx
 * // Bottom-center toolbar
 * <ActionDock position="bottom-center">
 *   <ActionBar skin="frosted-float">
 *     <ActionButton icon={<PlayIcon />} />
 *   </ActionBar>
 * </ActionDock>
 * 
 * // Corner dock
 * <ActionDock position="bottom-right" offset={24}>
 *   <ActionBar skin="minimal" orientation="vertical">
 *     <ActionButton icon={<AddIcon />} />
 *   </ActionBar>
 * </ActionDock>
 * 
 * // Attached to edge (no gap)
 * <ActionDock position="top-center" attached>
 *   <ActionBar skin="solid-pro">
 *     <ActionButton icon={<MenuIcon />} />
 *   </ActionBar>
 * </ActionDock>
 * ```
 */
export interface ActionDockProps {
  /** Screen position (9 options) */
  position: ActionDockPosition
  
  /** Offset from edge/corner in pixels (default: 16) */
  offset?: number
  
  /** Attach directly to edge/corner (offset=0) */
  attached?: boolean
  
  /** Custom z-index (default: 900) */
  zIndex?: number
  
  /** Content - typically ActionBar components */
  children?: ReactNode
  
  /** Custom styles */
  sx?: SxProps<Theme>
}

// =============================================================================
// Helpers
// =============================================================================

/**
 * Check if position is a corner
 */
export function isDockCorner(pos: ActionDockPosition): pos is ActionDockCorner {
  return pos === "top-left" || pos === "top-right" || 
         pos === "bottom-left" || pos === "bottom-right"
}

/**
 * Check if position is an edge center
 */
export function isDockEdge(pos: ActionDockPosition): pos is ActionDockEdge {
  return pos === "top-center" || pos === "bottom-center" || 
         pos === "left-center" || pos === "right-center"
}

/**
 * Get the edge for a position
 */
export function getDockEdge(pos: ActionDockPosition): "top" | "bottom" | "left" | "right" | "center" {
  if (pos === "center") return "center"
  if (pos.startsWith("top")) return "top"
  if (pos.startsWith("bottom")) return "bottom"
  if (pos.startsWith("left")) return "left"
  return "right"
}
