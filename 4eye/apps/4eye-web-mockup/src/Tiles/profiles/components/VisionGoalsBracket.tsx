"use client";

/**
 * VisionGoalsBracket — collapsed vision pyramid (Goals 1–3 only).
 *
 * Entity goals (Janna, ongoing practice, children) live on the Processes lens
 * where each person/symbol owns expandable goal cards and operational scripts.
 */

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { GoalsIcon } from "@4eye/icons";

import { SectionDisclosure } from "@4eye/web/components/surface";
import {
  GoalsShowcase,
  GoalGlyphs,
  VISION_GOALS,
  type GoalsLayout,
} from "@4eye/web/Tiles/integration-layers/goals";

export function VisionGoalsBracket({
  accent,
  layout,
  onOpenProcesses,
}: {
  accent: string;
  layout: GoalsLayout;
  onLayoutChange?: (next: GoalsLayout) => void;
  /** Deep-link to Processes lens for entity goals (Janna, ongoing, etc.). */
  onOpenProcesses?: () => void;
}) {
  return (
    <SectionDisclosure
      id="profile-vision-goals-bracket"
      label="Vision · Goals"
      accent={accent}
      Icon={GoalsIcon}
      meta={`${VISION_GOALS.length} · 1–3`}
      adornment={<GoalGlyphs goals={VISION_GOALS} size={18} />}
      hint="Save the world · value & currency · Command King. Entity goals (Janna, ongoing) → Processes lens."
    >
      <GoalsShowcase goals={VISION_GOALS} layout={layout} />

      {onOpenProcesses && (
        <Box sx={{ mt: 1.25, pt: 1, borderTop: "1px solid", borderColor: "divider" }}>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
            Janna goals, ongoing practice, and operational scripts live on{" "}
            <Box
              component="button"
              type="button"
              onClick={onOpenProcesses}
              sx={{
                p: 0,
                border: "none",
                bgcolor: "transparent",
                color: accent,
                fontWeight: 700,
                cursor: "pointer",
                font: "inherit",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              Processes
            </Box>
            .
          </Typography>
        </Box>
      )}
    </SectionDisclosure>
  );
}
