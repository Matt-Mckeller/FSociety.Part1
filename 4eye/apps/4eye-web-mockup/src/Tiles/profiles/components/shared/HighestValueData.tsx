"use client";

/**
 * HighestValueData — surfaces an individual's highest-value data.
 *
 * Renders the person's weighted alignment to the brand's five core value
 * themes (Evolve / Innovate / Win / Heal / Protect), highest-value first,
 * each with the individual's highest-value words. Uses the shared
 * WeightMeter colour vocabulary so it stays consistent with the rest of the app.
 *
 * Two densities:
 *   - "panel"   — full section with theme rows, words, and weight meters.
 *   - "strip"   — compact inline chips (top themes) for the header.
 */

import * as React from "react";
import { Box, Chip, Stack, Tooltip, Typography, alpha } from "@mui/material";
import { COLOR_MAP } from "@4eye/types";

import { WeightMeter } from "@4eye/web/Tiles/create/components/visuals";
import { MorphLabel, rgba } from "@4eye/web/components/hud/resourceBars/widgets";
import {
  VALUE_THEME_META,
  rankValueAlignments,
  type ValueThemeAlignment,
} from "../../model/highest-value-data";
import { Empty } from "./primitives";

/* ------------------------------------------------------------------ Panel */

export function HighestValueData({
  alignments,
}: {
  alignments?: ValueThemeAlignment[];
}) {
  if (!alignments || alignments.length === 0) {
    return <Empty label="No value data yet." />;
  }
  const ranked = rankValueAlignments(alignments);

  return (
    <Stack spacing={1}>
      {ranked.map((a) => {
        const meta = VALUE_THEME_META[a.theme];
        const label = a.label ?? meta.label;
        const accent = COLOR_MAP[a.accent ?? meta.accent];
        return (
          <Box
            key={a.theme}
            sx={{
              p: 1.25,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              borderLeft: `3px solid ${accent}`,
            }}
          >
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
                mb: 0.5,
              }}
            >
              <Tooltip title={meta.blurb} arrow>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 800, color: accent, cursor: "default" }}
                >
                  {label}
                </Typography>
              </Tooltip>
              <WeightMeter weight={a.weight} label="alignment" />
            </Stack>
            <Box sx={{ px: 0.25 }}>
              <MorphLabel
                motion="scramble"
                words={meta.userConnectors}
                color={rgba(accent, 0.85)}
                active
                fontSize="0.65rem"
                weight={700}
                letterSpacing={1.2}
              />
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}

/* ------------------------------------------------------------------ Strip */

/** Compact top-themes strip for the profile header. */
export function HighestValueStrip({
  alignments,
  max = 3,
  quiet = false,
}: {
  alignments?: ValueThemeAlignment[];
  max?: number;
  /**
   * Keep the per-theme hue as a left edge only, and set the label in neutral
   * text. Three differently-coloured chips are the right call in the panel,
   * where they are the content; in the profile header they were three more hues
   * competing with the identity band. Rank order and the tooltip still carry
   * which theme is which.
   */
  quiet?: boolean;
}) {
  if (!alignments || alignments.length === 0) return null;
  const ranked = rankValueAlignments(alignments).slice(0, max);

  return (
    <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.5 }}>
      {ranked.map((a) => {
        const meta = VALUE_THEME_META[a.theme];
        const label = a.label ?? meta.label;
        const accent = COLOR_MAP[a.accent ?? meta.accent];
        return (
          <Tooltip key={a.theme} title={`${label} · ${a.weight}/100 — ${meta.blurb}`} arrow>
            <Chip
              label={`${label} ${a.weight}`}
              size="small"
              sx={{
                height: 20,
                fontSize: 10.5,
                fontWeight: 800,
                color: quiet ? "text.secondary" : accent,
                bgcolor: quiet ? "transparent" : alpha(accent, 0.12),
                border: `1px solid ${alpha(accent, quiet ? 0.22 : 0.3)}`,
                ...(quiet && { borderLeft: `3px solid ${alpha(accent, 0.75)}` }),
              }}
            />
          </Tooltip>
        );
      })}
    </Stack>
  );
}
