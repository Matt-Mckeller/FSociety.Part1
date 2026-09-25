"use client";

import { Box, Container, Fade } from "@mui/material";
import type { ReactNode } from "react";
import { useHudSafeArea } from "@expanse/hud"

export type SectionTone = "default" | "muted" | "accent";

export interface SectionProps {
  id?: string;
  tone?: SectionTone;
  align?: "center" | "start";
  /**
   * Vertical placement of children. Defaults to `center`. Use `start`
   * when content needs to flow from the top (e.g. a sticky child that
   * must begin at the top of the scroll viewport).
   */
  verticalAlign?: "center" | "start";
  maxWidth?: "sm" | "md" | "lg";
  /**
   * When true (default), this section participates in CSS scroll-snap
   * as a full-screen snap target. Set to false for in-page sub-sections
   * that shouldn't be snap stops.
   */
  children: ReactNode;
}

const TONE_STYLES: Record<SectionTone, { bg: string }> = {
  default: { bg: "transparent" },
  muted: { bg: "background.paper" },
  accent: {
    bg: "linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.06) 100%)",
  },
};

/**
 * Pure breathing-room buffers in pixels. When this section is placed
 * inside a `TileContainer`, the chrome insets are already excluded by
 * the container — these buffers exist only so content does not sit
 * flush against the safe-area edge. When chrome is visible we add a
 * little extra so CTAs do not kiss the orb bar.
 */
const BREATHING = {
  top: 24,
  bottomBase: 16,
  bottomBuffer: 16,
  side: 16,
} as const;

/**
 * Full-viewport content section with HUD-aware breathing room.
 *
 * Generic layout primitive — knows nothing about tiles, slides, or
 * decks. Pair with `<ScrollSnapColumn>` for snap-by-section flows.
 *
 * Reads live insets via `useHudSafeArea()` so padding reacts when
 * chrome appears (per-tile orb bars, AI chat, etc.). When this Section
 * is placed inside a `TileContainer mode="fit"`, the container has
 * already clipped at the chrome edges — the buffers below are pure
 * breathing room, not chrome reservation.
 */
export function Section({
  id,
  tone = "default",
  align = "center",
  verticalAlign = "center",
  maxWidth = "md",
  children,
}: SectionProps) {
  const tonal = TONE_STYLES[tone];
  const insets = useHudSafeArea();
  const pbPx =
    BREATHING.bottomBase + (insets.bottom > 0 ? BREATHING.bottomBuffer : 0);
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
          // makes the top overflow unreachable by scroll on short
          // viewports.
          justifyContent:
            verticalAlign === "start" ? "flex-start" : "safe center",
          alignItems: "center",
          textAlign: align === "center" ? "center" : "left",
          pt: `${BREATHING.top}px`,
          pb: `${pbPx}px`,
          pl: `${BREATHING.side}px`,
          pr: `${BREATHING.side}px`,
          transition: "padding 220ms ease",
          background: tonal.bg,
        }}
      >
        <Container maxWidth={maxWidth} sx={{ width: "100%" }}>
          {children}
        </Container>
      </Box>
    </Fade>
  );
}
