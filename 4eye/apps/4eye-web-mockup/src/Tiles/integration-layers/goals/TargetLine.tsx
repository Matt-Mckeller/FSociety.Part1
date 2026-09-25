"use client";

/**
 * TargetLine — renders a goal's Target as plain text interleaved with
 * cyphertext (scrambling) words, each width-locked to its longest option so
 * the line never reflows mid-scramble.
 */

import { Box, Typography } from "@mui/material";
import { MorphLabel } from "@4eye/web/components/hud/resourceBars/widgets";
import type { TargetSegment } from "./goalsData";
import { useLayerSurface } from "../components/surfaceTokens";

export function TargetLine({
  segments,
  accent,
  hold = 2600,
  active = true,
  fontSize = "0.9rem",
  fontWeight = 700,
  color,
  lineHeight = 1.4,
}: {
  segments: TargetSegment[];
  accent: string;
  hold?: number;
  /** Whether the cyphertext words scramble — pass the card's open/expanded state so it triggers on click. */
  active?: boolean;
  fontSize?: string | number;
  fontWeight?: number;
  color?: string;
  lineHeight?: number;
}) {
  const surface = useLayerSurface();
  const ink = color ?? surface.text.hi;
  return (
    <Typography
      component="span"
      sx={{ fontSize, fontWeight, color: ink, lineHeight }}
    >
      {segments.map((seg, i) =>
        typeof seg === "string" ? (
          <Box key={i} component="span">
            {seg}
          </Box>
        ) : (
          <Box
            key={i}
            component="span"
            sx={{
              display: "inline-flex",
              justifyContent: seg.subtle ? "flex-start" : "center",
              minWidth: `${seg.ch ?? 7}ch`,
            }}
          >
            <MorphLabel
              motion="scramble"
              words={seg.morph}
              color={seg.subtle ? ink : surface.ink(accent)}
              active={active}
              hold={hold}
              maxPasses={seg.swaps != null ? undefined : (seg.maxPasses ?? null)}
              swaps={seg.swaps}
              fontSize={fontSize}
              weight={seg.subtle ? fontWeight : 700}
              letterSpacing={seg.subtle ? 0 : 0.2}
              fontFamily={seg.subtle ? "inherit" : "monospace"}
            />
          </Box>
        )
      )}
    </Typography>
  );
}
