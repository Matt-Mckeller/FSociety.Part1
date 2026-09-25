"use client";

/**
 * InfluencePill — the Influence-balance chip shown above upgradable grids
 * (Auras, Traits). Previously duplicated in both; this is the single source.
 */

import * as React from "react";
import { Stack, Typography, alpha } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import { CHARACTER_ACCENT } from "../../theme/tokens";

export function InfluencePill({ balance }: { balance: number }) {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{
        alignItems: "center",
        px: 1,
        py: 0.3,
        borderRadius: 5,
        bgcolor: alpha(CHARACTER_ACCENT, 0.1),
        color: CHARACTER_ACCENT,
      }}
    >
      <AutoAwesomeRoundedIcon sx={{ fontSize: 15 }} />
      <Typography sx={{ fontSize: "0.72rem", fontWeight: 900, letterSpacing: 0.3 }}>
        {balance.toLocaleString()}
      </Typography>
      <Typography sx={{ fontSize: "0.62rem", fontWeight: 700, opacity: 0.75 }}>Influence</Typography>
    </Stack>
  );
}
