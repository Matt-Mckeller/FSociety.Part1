"use client";

import { useMediaQuery, useTheme } from "@mui/material";

import {
  TIMELINE_HEIGHT_DESKTOP_PX,
  TIMELINE_HEIGHT_MOBILE_PX,
} from "@4eye/web/components/timeline/types";

/**
 * Returns the intrinsic height (px) of whichever `SlideshowTimeline`
 * variant the responsive facade is currently rendering. Stays in lockstep
 * with the facade's media-query so consumers (e.g. `PageDeck`) reserve
 * the right amount of top-padding.
 *
 * Breakpoint matches `SlideshowTimeline` (theme breakpoint `tablet`,
 * which is 768 in `@expanse/theme`).
 */
export function useSlideshowTimelineHeight(): number {
  const theme = useTheme();
  // `noSsr: true` makes the value reflect the real client viewport on first
  // client render — accepting a hydration mismatch warning in exchange for
  // not flashing the wrong layout.
  const isTabletUp = useMediaQuery(
    theme.breakpoints.up("tablet"),
    { noSsr: true },
  );
  return isTabletUp ? TIMELINE_HEIGHT_DESKTOP_PX : TIMELINE_HEIGHT_MOBILE_PX;
}
