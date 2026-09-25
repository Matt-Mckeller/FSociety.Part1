"use client";

import { Box, type BoxProps } from "@mui/material";
import type { SystemProps, Theme } from "@mui/system";
import { forwardRef } from "react";

/**
 * Default visible footprint of the home-page persistent mascot. Used by
 * {@link MascotSlot} placeholders so multiple slides can reserve identical
 * vertical/horizontal space for the same mascot instance to portal into.
 *
 * Larger on small screens (the character is the visual anchor of the
 * hero) and tapers down on lg+ where the page has more competing
 * elements. Uses the **actual** `@expanse/theme` breakpoint keys
 * (`zero`/`tablet`/`laptop`/`desktop`) — the stock MUI keys (xs/sm/md/lg)
 * are not registered in this theme and would be silently ignored.
 */
export const HOME_MASCOT_SIZE = {
  zero: 280,
  tablet: 320,
  laptop: 360,
  desktop: 380,
} as const;

export interface MascotSlotProps extends Omit<BoxProps, "ref"> {
  /** Override the slot's footprint. Defaults to {@link HOME_MASCOT_SIZE}. */
  size?: SystemProps<Theme>["width"];
}

/**
 * Empty sized container that reserves layout space for the persistent
 * home-page mascot. The actual `<FourEyeMascot />` is rendered once at
 * the HomeTile level inside an absolutely-positioned FLIP overlay
 * whose top/left/size animate to match whichever active slot is mounted,
 * so the same React/SVG/GSAP instance carries across slide transitions
 * without remounting.
 */
export const MascotSlot = forwardRef<HTMLDivElement, MascotSlotProps>(
  function MascotSlot({ size = HOME_MASCOT_SIZE, sx, ...rest }, ref) {
    return (
      <Box
        ref={ref}
        aria-hidden
        sx={[
          {
            width: size,
            height: size,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            // The slot itself is invisible — only its bounding box matters
            // for layout. The portaled mascot fills it via its own width/
            // height, which is in turn driven by `FourEyeMascot`'s `size`.
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...rest}
      />
    );
  },
);
