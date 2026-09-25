"use client";
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Box } from "@mui/material"

import { Z_INDEX } from "@expanse/theme"
import {
  useBottomBars,
  useHudBarSizes,
  useHudChromeVisibility,
  useRegisterHudInset,
} from "../slots"

/**
 * BottomChromeStack — single fixed flex column at the bottom edge that
 * stacks every bar registered via `useRegisterBottomBar` (sorted by
 * `order`, lowest on top). Built-in bars (OrbBar, AIInputBar) are
 * registered by `RegisterDefaultBottomBars`. Behavior:
 *
 * - Per-bar visibility: each entry's optional `hideKey` is matched
 *   against `useHudChromeVisibility` so descendants can hide individual
 *   bars (e.g. `useRegisterHudChromeHide({ hide: ["aiInputBar"] })`).
 *   Hidden bars contribute zero height — the remaining bars sit snug
 *   against the bottom edge.
 * - Uniform spacing: bars are separated by `barSizes.edge` (the same
 *   `HUD_EDGE_PADDING` token used for top/left/right viewport gaps), and
 *   the whole stack sits `barSizes.edge` above the viewport bottom.
 * - When an external panel registers a bottom-edge inset (e.g. an
 *   expanded AI chat panel calling `useRegisterHudInset({ edge: "bottom",
 *   size })`), the entire stack lifts by that amount with a smooth
 *   transition.
 * - Self-measures via ResizeObserver and registers `fullhud-bottom` with
 *   its real height + edge padding, so `HudContentArea` shrinks/grows to
 *   match the actually-visible chrome.
 */
export function BottomChromeStack() {
  const [measuredHeight, setMeasuredHeight] = useState(0)
  const observerRef = useRef<ResizeObserver | null>(null)
  const { hidden: chromeHidden } = useHudChromeVisibility()
  const { entries: barEntries } = useBottomBars()
  const barSizes = useHudBarSizes()

  // Callback ref: re-attaches the ResizeObserver every time the underlying
  // DOM node changes. Critical because this component returns `null` while
  // there are no visible bars — a one-shot `useEffect` with `useRef` would
  // miss the moment the Box first mounts (e.g. when a slide-scoped bar like
  // `LearnActionBar` registers AFTER initial mount). That bug caused the
  // bottom inset to read just `barSizes.edge` (e.g. 12px on tablet) because
  // `measuredHeight` stayed at its initial `0`.
  const setBoxRef = useCallback((el: HTMLDivElement | null) => {
    observerRef.current?.disconnect()
    if (!el) {
      observerRef.current = null
      // Element removed (no visible bars) → reset to 0 so the inset
      // collapses cleanly on the next register call.
      setMeasuredHeight(0)
      return
    }
    const ro = new ResizeObserver((entries) => {
      const h = entries[0]?.contentRect.height ?? 0
      setMeasuredHeight(Math.ceil(h))
    })
    ro.observe(el)
    observerRef.current = ro
  }, [])

  useEffect(
    () => () => {
      observerRef.current?.disconnect()
      observerRef.current = null
    },
    [],
  )

  // Filter out bars hidden via the chrome-visibility registry. A bar with
  // no `hideKey` is always visible (unless the entire bottom chrome is
  // hidden, which short-circuits below).
  const visibleBars = barEntries.filter(
    (e) => !e.hideKey || !chromeHidden[e.hideKey],
  )

  // Report the real bottom inset (measured chrome + edge padding) so the
  // content area auto-respects what's actually visible. When the entire
  // bottom chrome is hidden OR no bars are visible, contribute zero so
  // content can fill the area.
  const hasVisibleContent = !chromeHidden.bottomChrome && visibleBars.length > 0
  useRegisterHudInset({
    id: "fullhud-bottom",
    edge: "bottom",
    size: hasVisibleContent ? measuredHeight + barSizes.edge : 0,
    label: "Bottom chrome (registered bars)",
  })

  if (!hasVisibleContent) return null

  return (
    <Box
      ref={setBoxRef}
      sx={{
        position: "fixed",
        bottom: barSizes.edge,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // Uniform inter-bar gap, matches the viewport-edge padding used
        // on every other side of the HUD chrome.
        gap: `${barSizes.edge}px`,
        zIndex: Z_INDEX.ACTION_BARS,
        pointerEvents: "none",
        // Children handle their own pointer events.
        "& > *": { pointerEvents: "auto" },
      }}
    >
      {visibleBars.map((entry) => (
        <React.Fragment key={entry.id}>{entry.node}</React.Fragment>
      ))}
    </Box>
  )
}
