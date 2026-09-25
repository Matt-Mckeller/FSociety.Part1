"use client";

/** QualityBadge — small corner diamond marking an action's quality tier. */

import * as React from "react";
import { Box, Tooltip } from "@mui/material";

import { QUALITY_TIER_META, type QualityTier } from "../model/types";

export function QualityBadge({ tier, size = 12 }: { tier: QualityTier; size?: number }) {
  const meta = QUALITY_TIER_META[tier];
  return (
    <Tooltip title={`${meta.label} quality`} arrow>
      <Box
        sx={{
          width: size,
          height: size,
          flexShrink: 0,
          bgcolor: meta.color,
          transform: "rotate(45deg)",
          borderRadius: "2px",
          boxShadow: "0 0 0 1.5px white",
        }}
      />
    </Tooltip>
  );
}
