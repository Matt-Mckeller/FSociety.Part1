"use client"

import React, { type ReactNode } from "react"
import { Box, Typography, type SxProps, type Theme } from "@mui/material"
import { useHudInsets, type HudInsetEntry } from "../slots"

export interface HudContentAreaProps {
  /** Page content rendered inside the safe area. */
  children?: ReactNode
  /**
   * If true, draw a labelled border around the content area and overlay the
   * registered HUD inset entries so you can see exactly which chrome is
   * claiming which edge. @default false
   */
  debug?: boolean
  /**
   * Whether to subtract the minimap inset from the right edge.
   * Most HUDs let content flow under the (frosted) minimap, so this is off
   * by default.
   * @default false
   */
  reserveMinimap?: boolean
  /** Extra styles applied to the content `<Box>`. */
  sx?: SxProps<Theme>
}

const DEBUG_BORDER_COLOR = "rgba(33, 150, 243, 0.6)"
const DEBUG_FILL_COLOR = "rgba(33, 150, 243, 0.04)"
const DEBUG_TEXT_COLOR = "rgba(33, 150, 243, 0.95)"
const DEBUG_INSET_FILL = "rgba(255, 152, 0, 0.10)"
const DEBUG_INSET_BORDER = "rgba(255, 152, 0, 0.55)"
const DEBUG_INSET_TEXT = "rgba(180, 90, 0, 0.95)"

/**
 * Renders page content inside the HUD safe area.
 *
 * Reads the aggregated insets from `HudInsetsProvider` and absolutely
 * positions a `<main>` Box that:
 *   - top:    insets.top    (clear of top chrome)
 *   - left:   insets.left   (clear of left rail)
 *   - right:  insets.right  (+ minimap if `reserveMinimap`)
 *   - bottom: 0             (runs to the viewport bottom)
 *
 * The bottom edge is intentionally NOT clipped by the bottom inset.
 * Tile content opts into fit vs scroll via `<TileContainer mode="fit"|"scroll">`:
 *   - `fit`    applies `bottom: insets.bottom` to bound itself.
 *   - `scroll` runs to the viewport bottom and lets content flow under
 *              the floating chrome.
 *
 * **Pure positioning component** — does NOT set an `overflow` rule. If a
 * page renders raw children without a TileContainer they will overflow
 * visibly. This is intentional: container choice belongs to the tile.
 *
 * When `debug` is on, draws labelled rails along each occupied edge.
 */
export function HudContentArea({
  children,
  debug = false,
  reserveMinimap = false,
  sx,
}: HudContentAreaProps) {
  const { insets, entries } = useHudInsets()

  const right = insets.right + (reserveMinimap ? insets.minimap : 0)

  return (
    <>
      <Box
        component="main"
        sx={{
          position: "absolute",
          top: insets.top,
          bottom: 0,
          left: insets.left,
          right,
          // No overflow rule here — TileContainer (or the page itself)
          // owns scroll semantics. Bottom edge runs to the viewport
          // bottom so scroll-mode tiles can flow under the chrome.
          ...(debug
            ? {
                outline: `2px dashed ${DEBUG_BORDER_COLOR}`,
                outlineOffset: -2,
                bgcolor: DEBUG_FILL_COLOR,
              }
            : {}),
          ...sx,
        }}
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
              color: DEBUG_TEXT_COLOR,
              bgcolor: "rgba(255,255,255,0.85)",
              border: `1px solid ${DEBUG_BORDER_COLOR}`,
              borderRadius: 0.5,
              pointerEvents: "none",
            }}
          >
            content area · top {insets.top} · bottom {insets.bottom} · left {insets.left} · right {right}
            {insets.minimap > 0 && ` · minimap ${insets.minimap}`}
          </Box>
        )}
      </Box>

      {debug && <DebugInsetRails entries={entries} insets={insets} />}
    </>
  )
}

// =============================================================================
// Debug overlay
// =============================================================================

function DebugInsetRails({
  entries,
  insets,
}: {
  entries: HudInsetEntry[]
  insets: { top: number; bottom: number; left: number; right: number; minimap: number }
}) {
  return (
    <>
      {/* Edge rails */}
      {insets.top > 0 && (
        <EdgeRail edge="top" size={insets.top} label={`TOP · ${insets.top}px`} />
      )}
      {insets.bottom > 0 && (
        <EdgeRail edge="bottom" size={insets.bottom} label={`BOTTOM · ${insets.bottom}px`} />
      )}
      {insets.left > 0 && (
        <EdgeRail edge="left" size={insets.left} label={`LEFT · ${insets.left}px`} />
      )}
      {insets.right > 0 && (
        <EdgeRail edge="right" size={insets.right} label={`RIGHT · ${insets.right}px`} />
      )}
      {insets.minimap > 0 && (
        <EdgeRail edge="right" size={insets.minimap} label={`MINIMAP · ${insets.minimap}px`} stripe />
      )}

      {/* Per-entry list panel */}
      <Box
        sx={{
          position: "fixed",
          top: 8,
          right: 8,
          zIndex: 2000,
          fontFamily: "monospace",
          fontSize: 10,
          bgcolor: "rgba(255,255,255,0.95)",
          border: `1px solid ${DEBUG_INSET_BORDER}`,
          color: DEBUG_INSET_TEXT,
          borderRadius: 1,
          px: 1,
          py: 0.75,
          pointerEvents: "none",
          maxWidth: 280,
        }}
      >
        <Typography
          component="div"
          sx={{ fontFamily: "monospace", fontSize: 10, fontWeight: 700, mb: 0.5 }}
        >
          HUD INSET ENTRIES ({entries.length})
        </Typography>
        {entries.length === 0 ? (
          <Typography component="div" sx={{ fontFamily: "monospace", fontSize: 10, opacity: 0.6 }}>
            (none registered)
          </Typography>
        ) : (
          entries
            .slice()
            .sort((a, b) => a.edge.localeCompare(b.edge) || a.id.localeCompare(b.id))
            .map((e) => (
              <Typography
                key={e.id}
                component="div"
                sx={{ fontFamily: "monospace", fontSize: 10, lineHeight: 1.45 }}
              >
                <b>{e.edge}</b> · {e.size}px · {e.label ?? e.id}
              </Typography>
            ))
        )}
      </Box>
    </>
  )
}

function EdgeRail({
  edge,
  size,
  label,
  stripe = false,
}: {
  edge: "top" | "bottom" | "left" | "right"
  size: number
  label: string
  stripe?: boolean
}) {
  const isHorizontal = edge === "top" || edge === "bottom"
  const positionStyles: SxProps<Theme> = isHorizontal
    ? {
        position: "fixed",
        left: 0,
        right: 0,
        height: size,
        ...(edge === "top" ? { top: 0 } : { bottom: 0 }),
      }
    : {
        position: "fixed",
        top: 0,
        bottom: 0,
        width: size,
        ...(edge === "left" ? { left: 0 } : { right: 0 }),
      }

  return (
    <Box
      sx={{
        ...positionStyles,
        zIndex: 1999,
        pointerEvents: "none",
        bgcolor: DEBUG_INSET_FILL,
        border: `1px dashed ${DEBUG_INSET_BORDER}`,
        ...(stripe
          ? {
              backgroundImage: `repeating-linear-gradient(45deg, ${DEBUG_INSET_FILL}, ${DEBUG_INSET_FILL} 6px, rgba(255,152,0,0.18) 6px, rgba(255,152,0,0.18) 12px)`,
            }
          : {}),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          fontFamily: "monospace",
          fontSize: 10,
          fontWeight: 700,
          color: DEBUG_INSET_TEXT,
          bgcolor: "rgba(255,255,255,0.95)",
          border: `1px solid ${DEBUG_INSET_BORDER}`,
          borderRadius: 0.5,
          px: 0.75,
          py: 0.25,
          ...(isHorizontal ? {} : { writingMode: "vertical-rl" }),
        }}
      >
        {label}
      </Typography>
    </Box>
  )
}
