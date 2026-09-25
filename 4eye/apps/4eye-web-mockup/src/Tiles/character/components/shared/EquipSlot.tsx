"use client";

/**
 * Character — shared building blocks.
 *
 * - Section:  a labelled section wrapper (matches the Profiles tile language).
 * - EquipSlot: a reusable equipped-slot card with a left accent strip, optional
 *   weight meter, status badge, and progress bar. Used by work + goal lists.
 * - Empty:    a muted empty-state line for unfilled slots.
 */

import * as React from "react";
import { Box, LinearProgress, Stack, Typography, alpha } from "@mui/material";

import { WeightMeter } from "@4eye/web/Tiles/create/components/visuals";

export function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          mb: 0.5,
        }}
      >
        <Typography
          variant="overline"
          sx={{ fontWeight: 800, color: "text.secondary", letterSpacing: 0.6 }}
        >
          {title}
        </Typography>
        {action}
      </Stack>
      {children}
    </Box>
  );
}

export function Empty({ label = "Nothing equipped yet." }: { label?: string }) {
  return (
    <Typography variant="caption" sx={{ color: "text.secondary", fontStyle: "italic" }}>
      {label}
    </Typography>
  );
}

export function EquipSlot({
  accent,
  title,
  mark,
  badge,
  detail,
  weight,
  weightLabel,
  progress,
  onClick,
}: {
  accent: string;
  title: React.ReactNode;
  /** Optional leading glyph — same drawn language as Direction focus marks. */
  mark?: React.ReactNode;
  /** Status/kind chip rendered beside the title. */
  badge?: React.ReactNode;
  detail?: string;
  weight?: number;
  /** Tooltip context for the weight meter (e.g. "priority"). */
  weightLabel?: string;
  /** 0..1 completion bar. */
  progress?: number;
  /** When provided, the slot becomes a clickable button (pointer + hover). */
  onClick?: () => void;
}) {
  const pct = progress != null ? Math.round(progress * 100) : null;
  return (
    <Box
      onClick={onClick}
      sx={{
        p: 1.25,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        borderLeft: `3px solid ${accent}`,
        ...(onClick && {
          cursor: "pointer",
          transition: "border-color .15s, background-color .15s, transform .1s",
          "&:hover": { borderColor: alpha(accent, 0.5), bgcolor: alpha(accent, 0.04) },
          "&:active": { transform: "scale(0.995)" },
        }),
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75, minWidth: 0 }}>
          {mark && (
            <Box sx={{ display: "flex", color: accent, flexShrink: 0 }}>
              {mark}
            </Box>
          )}
          {badge}
          <Typography variant="body2" sx={{ fontWeight: 800, color: "text.primary" }}>
            {title}
          </Typography>
        </Stack>
        {weight != null && <WeightMeter weight={weight} label={weightLabel} />}
      </Stack>
      {detail && (
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.25 }}>
          {detail}
        </Typography>
      )}
      {pct != null && (
        <LinearProgress
          variant="determinate"
          value={pct}
          sx={{
            mt: 0.75,
            height: 6,
            borderRadius: 3,
            bgcolor: alpha(accent, 0.14),
            "& .MuiLinearProgress-bar": { borderRadius: 3, bgcolor: accent },
          }}
        />
      )}
    </Box>
  );
}
