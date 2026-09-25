"use client";

/**
 * Character — Highest-Value Data grid.
 *
 * Ranked value-theme alignments rendered as compact accent chips. Extracted
 * from CharacterTile; reads the profile's value-alignment model.
 */

import * as React from "react";
import { Box, Tooltip, Typography, alpha } from "@mui/material";

import { COLOR_MAP } from "@4eye/types";
import {
  VALUE_THEME_META,
  rankValueAlignments,
  type ValueThemeAlignment,
} from "@4eye/web/Tiles/profiles/model/highest-value-data";

export function HighestValueGrid({ alignments }: { alignments?: ValueThemeAlignment[] }) {
  if (!alignments?.length) return null;
  const ranked = rankValueAlignments(alignments);
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0.75 }}>
      {ranked.map((a) => {
        const meta = VALUE_THEME_META[a.theme];
        const label = a.label ?? meta.label;
        const accent = COLOR_MAP[a.accent ?? meta.accent];
        return (
          <Tooltip key={a.theme} title={meta.blurb} arrow>
            <Box
              sx={{
                px: 0.75,
                py: 0.6,
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: alpha(accent, 0.28),
                borderLeft: `3px solid ${accent}`,
                bgcolor: alpha(accent, 0.06),
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 0.5,
                cursor: "default",
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 800, color: accent, lineHeight: 1.2 }}>
                {label}
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", lineHeight: 1.2 }}>
                {a.weight}
              </Typography>
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );
}
