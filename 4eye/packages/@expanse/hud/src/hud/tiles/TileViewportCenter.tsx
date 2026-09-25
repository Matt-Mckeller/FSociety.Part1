"use client"

import React, { type ReactNode, type CSSProperties } from "react"
import { Box, type SxProps, type Theme } from "@mui/material"
import { useHudInsets } from "../slots"

// =============================================================================
// Types
// =============================================================================

export interface TileViewportCenterProps {
  /** Children rendered centered. */
  children?: ReactNode
  /**
   * If `true` (default), keeps content fully inside the safe area when
   * the asymmetric-inset shift would otherwise push it under the bottom
   * chrome. If `false`, the offset is always applied verbatim — useful
   * for ambient art that's allowed to slip under chrome.
   * @default true
   */
  clamp?: boolean
  /**
   * Outline + label the centerer so you can see it during layout work.
   * @default false
   */
  debug?: boolean
  /** Extra styles applied to the wrapper Box. */
  sx?: SxProps<Theme>
}

// =============================================================================
// Component
// =============================================================================

/**
 * Centers children at the **viewport** center — not the safe-area center.
 *
 * Use inside a `<TileContainer mode="fit">`. When the top and bottom HUD
 * insets are unequal (typical: bottom chrome > top chrome), naive flex
 * centering lands content at the safe-area center, which sits visually
 * above the viewport center. `TileViewportCenter` compensates with a
 * `translateY` of `(bottomInset − topInset) / 2` so the content's visual
 * center matches the viewport center, while still being clipped by the
 * surrounding `TileContainer` so it cannot leak under the chrome.
 *
 * @example
 * ```tsx
 * <TileContainer mode="fit">
 *   <TileViewportCenter>
 *     <HeroBlock />
 *   </TileViewportCenter>
 * </TileContainer>
 * ```
 */
export function TileViewportCenter({
  children,
  clamp = true,
  debug = false,
  sx,
}: TileViewportCenterProps) {
  const { insets } = useHudInsets()

  // Difference between viewport center and safe-area center. When bottom
  // chrome > top chrome, the safe-area center is *above* the viewport
  // center, so a positive `translateY` pulls content back down to the
  // viewport center.
  const offset = (insets.bottom - insets.top) / 2

  // Inline style so updates on chrome resize are cheap (no emotion class
  // regen) and observable in jsdom tests.
  const layoutStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: `translateY(${offset}px)`,
    transition: "transform 220ms ease",
    pointerEvents: "none", // wrapper itself is transparent to events
    ...(clamp ? { maxHeight: "100%" } : {}),
  }

  const baseSx: SxProps<Theme> = {
    // Re-enable pointer events on actual children.
    "& > *": { pointerEvents: "auto" },
    ...(debug
      ? {
          outline: "2px dashed rgba(255,152,0,0.7)",
          outlineOffset: -2,
        }
      : {}),
  }

  return (
    <Box
      data-tile-viewport-center
      data-vp-offset={offset}
      style={layoutStyle}
      sx={[baseSx, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
    >
      {children}
      {debug && (
        <Box
          sx={{
            position: "absolute",
            top: 4,
            left: 4,
            px: 0.75,
            py: 0.25,
            fontFamily: "monospace",
            fontSize: 10,
            color: "rgba(230, 81, 0, 0.95)",
            bgcolor: "rgba(255,255,255,0.9)",
            borderRadius: 0.5,
            pointerEvents: "none",
          }}
        >
          TileViewportCenter · offset {offset}px
        </Box>
      )}
    </Box>
  )
}

export default TileViewportCenter
