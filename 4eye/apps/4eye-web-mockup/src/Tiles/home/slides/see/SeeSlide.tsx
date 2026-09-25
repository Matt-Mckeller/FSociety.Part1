"use client";

import { Box } from "@mui/material";
import { useRef } from "react";
import { SlideShell } from "@4eye/web/Tiles/home/slides/shared";
import { SeeGlimpses } from "@4eye/web/Tiles/home/slides/see/components/SeeGlimpses";
import { useGsapEnter } from "@4eye/web/hooks/animation";
import { SeeActionBar } from "./SeeActionBar";

export interface SeeSlideProps {
  lensResetKey?: string | number;
}

export default function SeeSlide(_props: SeeSlideProps = {}) {
  const ref = useRef<HTMLDivElement>(null);

  // Sticky band (chips + tabs) fades in on enter.
  useGsapEnter(ref, ".bp-sticky", {
    y: 24,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out",
  });

  // Panel body stagger in ~900 ms after the sticky band
  // so the user has a moment to read "Improve your" before the content
  // below draws the eye downward.
  useGsapEnter(ref, ".bp-panel", {
    y: 16,
    opacity: 0,
    duration: 0.55,
    delay: 0.9,
    ease: "power3.out",
  });

  return (
    <SlideShell tone="accent" id="promise" maxWidth="lg" verticalAlign="start">
      <SeeActionBar />
      <Box
        ref={ref}
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: 820, md: 1000 },
          mx: "auto",
        }}
      >
        {/* Sticky "Improve your" band + tabs */}
        <Box className="bp-glimpses" sx={{ width: "100%" }}>
          <SeeGlimpses />
        </Box>
      </Box>
    </SlideShell>
  );
}
