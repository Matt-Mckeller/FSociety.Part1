"use client";

import { Box, Fade } from "@mui/material";
import { type ReactNode } from "react";
import { useSlideshow } from "@4eye/web/Tiles/home/slideshow/SlideshowProvider";
import { FADE_MS, FADE_MS_AUTO } from "@4eye/web/Tiles/home/slideshow/steps";

interface SlideStageProps {
  slides: ReactNode[];
  /**
   * Pixels to reserve at the top of each slide for the floating timeline
   * overlay. Passed in so this component stays purely presentational.
   */
  timelineHeightPx: number;
}

/**
 * Renders the absolutely-positioned `<Fade>` stack that contains every
 * slide. Inactive slides have `pointerEvents: none` to prevent click /
 * hover bleed-through during the cross-fade. `data-slide-scroll` lets
 * the wheel handler detect when an inner scroll should preempt
 * slideshow advance.
 */
export function SlideStage({ slides, timelineHeightPx }: SlideStageProps) {
  const {
    state: { activeIdx, isPlaying },
  } = useSlideshow();

  return (
    <>
      {slides.map((slide, i) => (
        <Fade
          key={i}
          in={i === activeIdx}
          timeout={isPlaying ? FADE_MS_AUTO : FADE_MS}
          unmountOnExit={false}
        >
          <Box
            data-slide-scroll
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pt: `${timelineHeightPx}px`,
              overflow: "auto",
              pointerEvents: i === activeIdx ? "auto" : "none",
            }}
          >
            {slide}
          </Box>
        </Fade>
      ))}
    </>
  );
}
