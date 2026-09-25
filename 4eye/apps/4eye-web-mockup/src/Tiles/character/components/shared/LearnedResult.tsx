"use client";

/**
 * The learned → result reveal, shared by Cold Storage cards and the Events
 * timeline.
 *
 * An event that cannot say what it taught and what it changed is just a date,
 * so wherever an entry carries both, it can be opened to show them as a
 * consequence chain rather than as two more paragraphs: the lesson first, the
 * outcome below it, joined by a rail. Reading it top to bottom is meant to feel
 * like cause and effect, because that is what it is.
 *
 * Purple marks the lesson consistently — it is the one colour in the character
 * palette not already spoken for by valence, so "what I learned" never collides
 * with "this was a good thing" or "this was a bad thing". A hard event can
 * still have taught something excellent, and the colours need to allow that.
 */

import * as React from "react";
import { Box, Stack, Typography, alpha } from "@mui/material";

/** Anything with an optional lesson and outcome. */
export interface LearnedResultSource {
  learned?: string;
  result?: string;
}

export const LEARNED_COLOR = "#7c3aed";

export function hasLearnedResult(entry: LearnedResultSource): boolean {
  return Boolean(entry.learned || entry.result);
}

/**
 * The affordance label. Kept here so the wording stays identical everywhere it
 * appears — it is the same gesture on both surfaces.
 */
export function learnedToggleLabel(open: boolean): string {
  return open ? "− what it taught" : "+ what it taught";
}

export function LearnedResult({
  entry,
  /** Valence colour of the host card — used for the outcome step. */
  color,
}: {
  entry: LearnedResultSource;
  color: string;
}) {
  const rows: Array<{ label: string; body: string; tone: string }> = [];
  if (entry.learned) rows.push({ label: "Learned", body: entry.learned, tone: LEARNED_COLOR });
  if (entry.result) rows.push({ label: "Result", body: entry.result, tone: color });
  if (!rows.length) return null;

  return (
    <Stack sx={{ mt: 0.9, pl: 0.25 }}>
      {rows.map((row, i) => (
        <Stack key={row.label} direction="row" sx={{ gap: 0.9, alignItems: "stretch" }}>
          {/* Rail: a dot per step, connected where another step follows. */}
          <Stack sx={{ alignItems: "center", flexShrink: 0, width: 10 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                mt: 0.35,
                bgcolor: row.tone,
                boxShadow: `0 0 6px ${alpha(row.tone, 0.5)}`,
                flexShrink: 0,
              }}
            />
            {i < rows.length - 1 && (
              <Box sx={{ width: 2, flex: 1, my: 0.3, borderRadius: 1, bgcolor: alpha(row.tone, 0.3) }} />
            )}
          </Stack>
          <Box sx={{ pb: i < rows.length - 1 ? 0.9 : 0, minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: "0.57rem",
                fontWeight: 800,
                letterSpacing: 0.5,
                color: row.tone,
                textTransform: "uppercase",
                lineHeight: 1.4,
              }}
            >
              {row.label}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block", lineHeight: 1.5 }}>
              {row.body}
            </Typography>
          </Box>
        </Stack>
      ))}
    </Stack>
  );
}
