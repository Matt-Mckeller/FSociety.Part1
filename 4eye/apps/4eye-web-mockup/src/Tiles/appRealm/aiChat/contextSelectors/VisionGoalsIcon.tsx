"use client";

import { Box, type SxProps, type Theme } from "@mui/material";
import { GOAL_CENTER_MARK } from "./tokens";

/**
 * Combo mark for the Vision · Goals tab: a dashed triangle (the vision
 * chip silhouette) with a gray center (the goal target). `currentColor`
 * tints the outline so it follows the ContextBar icon color.
 */
export function VisionGoalsIcon({ sx }: { sx?: SxProps<Theme> }) {
  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        display: "inline-flex",
        width: "1em",
        height: "1em",
        fontSize: 18,
        lineHeight: 0,
        ...sx,
      }}
    >
      <svg viewBox="0 0 24 24" width="1em" height="1em" focusable="false">
        <polygon
          points="12,2.4 22.2,21.2 1.8,21.2"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.65}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray="3.2 2.1"
        />
        <circle cx={12} cy={14.35} r={3.4} fill={GOAL_CENTER_MARK} />
      </svg>
    </Box>
  );
}
