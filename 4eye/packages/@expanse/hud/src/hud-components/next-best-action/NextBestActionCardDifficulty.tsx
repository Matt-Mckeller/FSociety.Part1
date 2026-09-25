"use client";

/**
 * NextBestActionCardDifficulty — 5-dot depth/difficulty meter.
 *
 * Mirrors the DepthDots visual vocabulary from the seeding tiles:
 * filled dots use a light→dark blue ramp (tier 1 = lightest, tier 5 =
 * darkest); unfilled dots are a neutral gray. Replaces the previous
 * 5-heart design.
 *
 * Designed to anchor in the bottom-right of `NextBestActionCard`'s
 * body row, alongside the chip stack.
 */

import {
  Box,
  Stack,
  Tooltip,
  type SxProps,
} from "@mui/material";

export type DifficultyValue = 1 | 2 | 3 | 4 | 5;

export interface NextBestActionCardDifficultyProps {
  /** Filled dot count (1 = easy / shallow, 5 = hard / deep). */
  value: DifficultyValue;
  /**
   * Optional rough time-to-value shown in the tooltip alongside the
   * difficulty rating. Example: `"~2 min"`.
   */
  minutesEstimate?: string;
  /** Pixel diameter of each dot. @default 7 */
  size?: number;
  /** sx passthrough for the wrapping Stack. */
  sx?: SxProps;
}

export function NextBestActionCardDifficulty({
  value,
  minutesEstimate,
  size = 7,
  sx,
}: NextBestActionCardDifficultyProps) {
  const tooltipLabel = minutesEstimate
    ? `Difficulty: ${value} / 5 · ${minutesEstimate}`
    : `Difficulty: ${value} / 5`;

  return (
    <Tooltip title={tooltipLabel} arrow>
      <Stack
        aria-label={`Difficulty ${value} of 5`}
        spacing={0.5}
        sx={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
          flexShrink: 0,
          ml: 1,
          pl: 0.75,
          borderLeft: "1px solid rgba(0,0,0,0.1)",
          ...sx,
        }}
      >
        {[1, 2, 3, 4, 5].map((tier) => {
          const on = tier <= value;
          // light → dark blue ramp matching DepthDots (hsl 210 45%)
          const shade = 20 + tier * 12; // 32 → 80
          return (
            <Box
              key={tier}
              sx={{
                width: size,
                height: size,
                borderRadius: "50%",
                bgcolor: on
                  ? `hsl(210 45% ${70 - shade / 2}%)`
                  : "rgba(0,0,0,0.12)",
                transition: "background-color 150ms ease",
              }}
            />
          );
        })}
      </Stack>
    </Tooltip>
  );
}

export default NextBestActionCardDifficulty;
