"use client";

import { Box, Container, Fade } from "@mui/material";
import type { ReactNode } from "react";
import { useHudSafeArea } from "@expanse/hud"

/**
 * SlideShell — base wrapper used by every slide in the home slideshow.
 *
 * Owns the visual chrome that's shared across `LearnSlide`, `SeeSlide`,
 * `ControlSlide`, `DomainsSlide`, `CatalogSlide`, and `EarnSlide`:
 *
 *   - One-screen sizing (`minHeight: 100%` against the HUD content area)
 *   - HUD-aware safe-area padding driven by the LIVE inset registry via
 *     `useHudSafeArea()` from `@expanse/shell`. Slides automatically
 *     respond to chrome changes (e.g. a per-slide orb bar appearing,
 *     the AI chat opening, a side rail collapsing) without needing
 *     hardcoded breakpoint padding.
 *   - Optional CSS scroll-snap (currently unused by the fade-mode
 *     slideshow but kept as a prop in case a future variant goes back
 *     to scroll-driven navigation)
 *   - Tonal background variants (`default`, `muted`, `accent`)
 *   - MUI Fade entrance for the section
 *
 * `TileContainer` (which wraps `HomeTile`) already clips at the bottom
 * chrome edge via `bottom: insets.bottom`, so SlideShell does NOT need
 * to subtract the chrome again. Instead it adds a small "breathing
 * room" buffer on each side so slide content never sits flush against
 * the safe-area edge. The buffers ARE chrome-aware (they grow slightly
 * when chrome is present) so the slide reflows when the orb bar
 * appears mid-deck.
 *
 * This is a home-slideshow-specific fork of the generic `Section`
 * primitive at `@4eye/web/components/layout/Section`. Forked so the home
 * slideshow can evolve independently from the generic layout building
 * blocks used by the other tiles.
 */

export type SlideTone = "default" | "muted" | "accent";

export interface SlideShellProps {
  id?: string;
  tone?: SlideTone;
  align?: "center" | "start";
  /**
   * Vertical placement of children within the slide. Defaults to `center`.
   * Use `start` for slides whose content needs to flow from the top —
   * e.g. when a child uses `position: sticky` and must begin at the top
   * of the scroll viewport rather than the center.
   */
  verticalAlign?: "center" | "start";
  maxWidth?: "sm" | "md" | "lg";
  /**
   * When true, this slide participates in CSS scroll-snap as a
   * full-screen snap target. Defaults to false because the home
   * slideshow is fade-mode (no scrolling between slides).
   */
  snap?: boolean;
  children: ReactNode;
}

const TONE_STYLES: Record<SlideTone, { bg: string }> = {
  default: { bg: "transparent" },
  muted: { bg: "background.paper" },
  accent: {
    bg: "linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.06) 100%)",
  },
};

/**
 * Pure breathing-room buffers in pixels. TileContainer already excludes
 * the chrome insets, so these are the only padding the slide needs.
 *
 * `bottomBuffer` adds an extra ~16px when the bottom chrome is visible,
 * so slide CTAs (Play / Continue / etc.) never sit flush against the
 * top of the orb bar. Top is generous because the floating timeline
 * card sits in the top inset region but is NOT registered as a HUD
 * inset, so the slide must reserve its own room for it.
 */
const BREATHING = {
  topBase: 16, // small buffer above slide content
  topExtra: 16, // a touch more room so titles don't kiss the timeline
  bottomBase: 12,
  bottomBuffer: 12, // added when bottom chrome is visible
  side: 16,
} as const;

export default function SlideShell({
  id,
  tone = "default",
  align = "center",
  verticalAlign = "center",
  maxWidth = "md",
  snap = false,
  children,
}: SlideShellProps) {
  const tonal = TONE_STYLES[tone];
  const insets = useHudSafeArea();
  // Bottom chrome (orb bar + AI input) already excluded by TileContainer.
  // Add a small extra buffer when chrome is present so CTAs have visible
  // breathing room above it instead of kissing its top edge.
  const pbPx =
    BREATHING.bottomBase + (insets.bottom > 0 ? BREATHING.bottomBuffer : 0);
  const ptPx = BREATHING.topBase + BREATHING.topExtra;
  return (
    <Fade in timeout={500}>
      <Box
        id={id}
        component="section"
        sx={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          // `safe center` falls back to `flex-start` when content
          // overflows the container. Without this, plain `center`
          // pushes the overflow equally above AND below — the top
          // half is unreachable by scroll and the bottom half slides
          // under the bottom chrome (orb bar) on short viewports.
          justifyContent:
            verticalAlign === "start" ? "flex-start" : "safe center",
          alignItems: "center",
          textAlign: align === "center" ? "center" : "left",
          pt: `${ptPx}px`,
          pb: `${pbPx}px`,
          pl: `${BREATHING.side}px`,
          pr: `${BREATHING.side}px`,
          // Smooth padding shifts when chrome appears / disappears.
          transition: "padding 220ms ease",
          background: tonal.bg,
          ...(snap && {
            scrollSnapAlign: "start",
            scrollSnapStop: "normal",
          }),
        }}
      >
        <Container maxWidth={maxWidth} sx={{ width: "100%" }}>
          {children}
        </Container>
      </Box>
    </Fade>
  );
}
