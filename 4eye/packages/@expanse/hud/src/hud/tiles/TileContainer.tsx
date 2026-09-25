"use client"

import React, { useEffect, useRef, type ReactNode, type CSSProperties } from "react"
import { Box, type SxProps, type Theme } from "@mui/material"
import { useHudInsets } from "../slots"
import { TILE_SCROLL_FADE_HEIGHT } from "../constants"

// =============================================================================
// Types
// =============================================================================

/**
 * Container behavior for a tile/page rendered inside the HUD safe area.
 *
 * - `"fit"`   — content is bounded by the HUD insets on all four sides.
 *               No scrolling. Use for pages whose layout is designed to
 *               fit the visible safe area (slideshows, dashboards, maps).
 * - `"scroll"` — content is bounded by top / left / right insets only.
 *                The bottom edge runs to the viewport bottom; chrome (FAB
 *                cluster, AI input bar) floats over the lower portion of
 *                the page. The container scrolls vertically and adds
 *                `paddingBottom = bottomInset` so the last bit of content
 *                can be scrolled clear of the chrome. Long-form content,
 *                docs, lists.
 *
 * Both modes always disable horizontal scroll (`overflow-x: hidden`) and
 * react to chrome size changes (e.g. AI chat opening) automatically via
 * the `HudInsetsProvider`.
 */
export type TileContainerMode = "fit" | "scroll"

export interface TileContainerProps {
  /** @default "fit" */
  mode?: TileContainerMode
  /** Children rendered inside the safe area. */
  children?: ReactNode
  /**
   * In `"scroll"` mode, render a soft fade mask along the bottom edge so
   * users see content disappearing under the floating chrome.
   * @default true in scroll mode, ignored in fit mode.
   */
  fadeBottom?: boolean
  /**
   * Outline + label the container so you can see fit vs scroll at a glance.
   * @default false
   */
  debug?: boolean
  /** Extra styles applied to the container Box. */
  sx?: SxProps<Theme>
  /** Forwarded to the inner scrollable element (scroll mode). */
  scrollRef?: React.Ref<HTMLDivElement>
}

// =============================================================================
// Component
// =============================================================================

/**
 * Container that hosts a tile's page content inside the HUD safe area.
 *
 * `TileContainer` is the only place page content should make decisions
 * about overflow / scroll. `HudContentArea` provides the inset-aware
 * positioning surface; `TileContainer` chooses what to do with that
 * surface (fit it exactly, or let content scroll under the bottom chrome).
 *
 * @example
 * ```tsx
 * // Default: bound on all sides, no scroll
 * export default function HomeTile() {
 *   return (
 *     <TileContainer mode="fit">
 *       <Slideshow />
 *     </TileContainer>
 *   )
 * }
 *
 * // Long-form content scrolls under the bottom chrome
 * export default function DocsTile() {
 *   return (
 *     <TileContainer mode="scroll">
 *       <Article />
 *     </TileContainer>
 *   )
 * }
 * ```
 */
export function TileContainer({
  mode = "fit",
  children,
  fadeBottom = true,
  debug = false,
  sx,
  scrollRef,
}: TileContainerProps) {
  const { insets } = useHudInsets()

  // Bottom inset claimed by the chrome stack (FAB cluster + AI input bar +
  // any panel-registered claim). `HudContentArea` runs to the viewport
  // bottom; the container decides what to do with that space:
  //   - fit:    bound itself at `bottom: chromeBottom` so content never
  //             goes under the chrome.
  //   - scroll: run full height, add `paddingBottom` so the last bit of
  //             content can be scrolled clear of the chrome.
  const bottomChrome = insets.bottom

  // Bottom-chrome shrinks (a bar disappearing, e.g. `MapActionBar` unmounting
  // on a realm switch) must clear space immediately — easing it would leave
  // a window where fixed-position overlays above this container (e.g. the
  // full-screen map surface) still occupy the region the chrome just
  // vacated, visually overlapping it. Growth still eases so the container
  // gracefully retreats when chrome appears/expands.
  const prevBottomChromeRef = useRef(bottomChrome)
  const isShrinking = bottomChrome < prevBottomChromeRef.current
  useEffect(() => {
    prevBottomChromeRef.current = bottomChrome
  }, [bottomChrome])

  // Layout-critical values are set as inline styles so they can update
  // cheaply on chrome resize (no emotion class regen) and so they're
  // observable in jsdom tests via `el.style.*`.
  const layoutStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: mode === "fit" ? bottomChrome : 0,
    overflowX: "hidden",
    overflowY: mode === "fit" ? "hidden" : "auto",
    paddingBottom: mode === "scroll" ? bottomChrome : undefined,
    transition:
      mode === "fit"
        ? isShrinking
          ? "none"
          : "bottom 220ms ease"
        : "padding-bottom 220ms ease",
  }

  const baseSx: SxProps<Theme> = {
    ...(debug
      ? {
          outline: `2px dashed ${
            mode === "fit" ? "rgba(76,175,80,0.7)" : "rgba(156,39,176,0.7)"
          }`,
          outlineOffset: -2,
        }
      : {}),
  }

  const showFade = mode === "scroll" && fadeBottom && bottomChrome > 0

  return (
    <Box
      ref={scrollRef}
      data-tile-container={mode}
      style={layoutStyle}
      sx={[baseSx, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
    >
      {children}
      {debug && (
        <Box
          sx={{
            position: "sticky",
            top: 4,
            left: 4,
            display: "inline-block",
            px: 0.75,
            py: 0.25,
            fontFamily: "monospace",
            fontSize: 10,
            color:
              mode === "fit"
                ? "rgba(27, 94, 32, 0.95)"
                : "rgba(106, 27, 154, 0.95)",
            bgcolor: "rgba(255,255,255,0.9)",
            borderRadius: 0.5,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          TileContainer · {mode} · bottom-chrome {bottomChrome}px
        </Box>
      )}
      {showFade && <BottomFade height={TILE_SCROLL_FADE_HEIGHT} />}
    </Box>
  )
}

// =============================================================================
// Bottom fade
// =============================================================================

function BottomFade({ height }: { height: number }) {
  // Sits in the scrollable area as a sticky element so it floats just
  // above the chrome regardless of scroll position.
  const style: CSSProperties = {
    position: "sticky",
    bottom: 0,
    left: 0,
    right: 0,
    height,
    marginTop: -height,
    pointerEvents: "none",
    background:
      "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 100%)",
  }
  return <div aria-hidden style={style} />
}

export default TileContainer
