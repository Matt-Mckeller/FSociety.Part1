"use client";

import { Box, Chip, Stack } from "@mui/material";
import { useRef } from "react";
import gsap from "gsap";
import { useGsap } from "@4eye/web/hooks/animation";

export interface HudChipOverlayProps {
  chips?: string[];
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const DEFAULT_CHIPS = ["+Learning", "+Engagement", "+Happiness"];

const POSITION_SX: Record<NonNullable<HudChipOverlayProps["position"]>, object> = {
  "top-left": { top: 16, left: 16 },
  "top-right": { top: 16, right: 16 },
  "bottom-left": { bottom: 16, left: 16 },
  "bottom-right": { bottom: 16, right: 16 },
};

export default function HudChipOverlay({
  chips = DEFAULT_CHIPS,
  position = "top-left",
}: HudChipOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGsap(ref, () => {
    gsap.from(".hud-chip", {
      y: -12,
      opacity: 0,
      duration: 0.5,
      stagger: 0.12,
      ease: "power2.out",
    });
  });

  return (
    <Box
      ref={ref}
      sx={{
        position: "absolute",
        zIndex: 4,
        pointerEvents: "none",
        ...POSITION_SX[position],
      }}
    >
      <Stack direction="row" spacing={1}>
        {chips.map((c) => (
          <Chip
            key={c}
            label={c}
            size="small"
            className="hud-chip"
            sx={{
              bgcolor: "rgba(255,255,255,0.85)",
              border: "1px solid",
              borderColor: "primary.light",
              color: "primary.dark",
              fontWeight: 600,
              fontFamily: "monospace",
              backdropFilter: "blur(6px)",
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
