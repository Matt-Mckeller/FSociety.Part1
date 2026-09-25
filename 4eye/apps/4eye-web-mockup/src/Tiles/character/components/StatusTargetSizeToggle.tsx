"use client";

/**
 * StatusTargetSizeToggle — Compact · Grid · Large size control for Status Targets.
 */

import * as React from "react";
import { Box, ToggleButton, ToggleButtonGroup, Tooltip, Typography, alpha } from "@mui/material";

import {
  STATUS_TARGET_SIZE_META,
  STATUS_TARGET_SIZES,
  type StatusTargetSize,
} from "../model/statusTargetSizes";

export interface StatusTargetSizeToggleProps {
  value: StatusTargetSize;
  onChange: (size: StatusTargetSize) => void;
  accent?: string;
}

export function StatusTargetSizeToggle({
  value,
  onChange,
  accent = "#818cf8",
}: StatusTargetSizeToggleProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, mb: 1 }}>
      <Typography
        sx={{
          fontSize: "0.58rem",
          fontWeight: 800,
          letterSpacing: "0.14em",
          color: "text.secondary",
          textTransform: "uppercase",
        }}
      >
        Display size
      </Typography>
      <ToggleButtonGroup
        size="small"
        exclusive
        value={value}
        onChange={(_, next: StatusTargetSize | null) => next && onChange(next)}
        sx={{
          "& .MuiToggleButton-root": {
            textTransform: "none",
            fontWeight: 800,
            fontSize: "0.62rem",
            px: 1,
            py: 0.25,
            borderColor: alpha(accent, 0.35),
            color: "text.secondary",
            "&.Mui-selected": {
              bgcolor: alpha(accent, 0.14),
              color: accent,
              borderColor: alpha(accent, 0.5),
              "&:hover": { bgcolor: alpha(accent, 0.2) },
            },
          },
        }}
      >
        {STATUS_TARGET_SIZES.map((size) => {
          const meta = STATUS_TARGET_SIZE_META[size];
          return (
            <ToggleButton key={size} value={size}>
              <Tooltip title={meta.hint} arrow placement="top">
                <span>{meta.label}</span>
              </Tooltip>
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </Box>
  );
}
