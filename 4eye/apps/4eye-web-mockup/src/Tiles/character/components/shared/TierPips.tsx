"use client";

/**
 * TierPips — a row of tier dots for progression (Traits, Auras).
 *
 * Two call styles, both previously duplicated:
 *  - plain:    <TierPips level={n} color={c} />            → 4 dots, no labels
 *  - labelled: <TierPips level={n} color={c} degrees={…} /> → one dot per degree,
 *              each with a tooltip of its tier name.
 */

import * as React from "react";
import { Box, Stack, Tooltip, alpha } from "@mui/material";

export function TierPips({
  level,
  color,
  degrees,
}: {
  level: number;
  color: string;
  /** Tier names; when provided, each pip gets a tooltip. Defaults to 4 pips. */
  degrees?: string[];
}) {
  const items = degrees ?? ["", "", "", ""];
  const labelled = degrees != null;
  return (
    <Stack direction="row" spacing={labelled ? 0.5 : 0.4} sx={{ alignItems: "center" }}>
      {items.map((degree, i) => {
        const filled = i <= level;
        const size = labelled ? 9 : filled ? 8 : 7;
        const pip = (
          <Box
            sx={{
              width: size,
              height: size,
              borderRadius: "50%",
              bgcolor: filled ? color : alpha(color, labelled ? 0.16 : 0.15),
              boxShadow: filled ? `0 0 ${labelled ? 4 : 5}px ${alpha(color, labelled ? 0.6 : 0.65)}` : "none",
              cursor: labelled ? "help" : "default",
              transition: "all .2s",
            }}
          />
        );
        return labelled ? (
          <Tooltip key={degree || i} title={degree} arrow placement="top" disableInteractive>
            {pip}
          </Tooltip>
        ) : (
          <Box key={i}>{pip}</Box>
        );
      })}
    </Stack>
  );
}
