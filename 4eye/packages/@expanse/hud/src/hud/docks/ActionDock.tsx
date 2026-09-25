"use client"

import React from "react"
import { Box, type SxProps, type Theme } from "@mui/material"
import type { ActionDockProps, ActionDockPosition } from "./types"
import { isDockCorner, isDockEdge } from "./types"
import { Z_INDEX } from "@expanse/theme"

// =============================================================================
// Position Styles
// =============================================================================

/**
 * Get CSS position styles for a dock position
 */
function getPositionStyles(
  position: ActionDockPosition,
  offset: number
): SxProps<Theme> {
  // Center position
  if (position === "center") {
    return {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }
  }

  // Corner positions
  if (isDockCorner(position)) {
    const styles: Record<string, number | string> = {}
    
    if (position.startsWith("top")) styles.top = offset
    if (position.startsWith("bottom")) styles.bottom = offset
    if (position.endsWith("left")) styles.left = offset
    if (position.endsWith("right")) styles.right = offset
    
    return styles
  }

  // Edge center positions
  if (isDockEdge(position)) {
    switch (position) {
      case "top-center":
        return {
          top: offset,
          left: "50%",
          transform: "translateX(-50%)",
        }
      case "bottom-center":
        return {
          bottom: offset,
          left: "50%",
          transform: "translateX(-50%)",
        }
      case "left-center":
        return {
          left: offset,
          top: "50%",
          transform: "translateY(-50%)",
        }
      case "right-center":
        return {
          right: offset,
          top: "50%",
          transform: "translateY(-50%)",
        }
    }
  }

  return {}
}

// =============================================================================
// Component
// =============================================================================

/**
 * ActionDock - Screen positioning wrapper for ActionBars and other HUD elements.
 * 
 * ActionDock is a pure positioning component. It handles:
 * - Fixed screen positioning (9 positions)
 * - Offset from edges/corners
 * - Z-index layering
 * 
 * ActionDock does NOT handle visual styling - use ActionBar inside.
 * 
 * **Positions:**
 * - Corners: top-left, top-right, bottom-left, bottom-right
 * - Edge centers: top-center, bottom-center, left-center, right-center
 * - Center: center (middle of screen)
 * 
 * @example
 * ```tsx
 * // Bottom-center toolbar
 * <ActionDock position="bottom-center">
 *   <ActionBar skin="frosted-float">
 *     <ActionButton icon={<PlayIcon />} />
 *     <ActionButton icon={<PauseIcon />} />
 *   </ActionBar>
 * </ActionDock>
 * 
 * // Corner quick actions
 * <ActionDock position="bottom-right" offset={24}>
 *   <ActionBar skin="minimal" orientation="vertical">
 *     <ActionButton icon={<AddIcon />} />
 *     <ActionButton icon={<SettingsIcon />} />
 *   </ActionBar>
 * </ActionDock>
 * 
 * // Attached to top edge
 * <ActionDock position="top-center" attached>
 *   <ActionBar skin="solid-pro">
 *     <ActionButton icon={<MenuIcon />} />
 *   </ActionBar>
 * </ActionDock>
 * ```
 */
export function ActionDock({
  position,
  offset = 16,
  attached = false,
  zIndex = Z_INDEX.ACTION_BARS,
  children,
  sx,
}: ActionDockProps) {
  // Effective offset: 0 when attached
  const effectiveOffset = attached ? 0 : offset

  return (
    <Box
      sx={[
        {
          position: "fixed",
          zIndex,
          ...getPositionStyles(position, effectiveOffset),
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {children}
    </Box>
  )
}

export default ActionDock
