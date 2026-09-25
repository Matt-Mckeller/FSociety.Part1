"use client";

/**
 * GearChip — compact equipped count badge for StatusStrip.
 *
 * Detail lives in Status Targets (tile → HUD). Hover popover removed so gear
 * does not keep a parallel expand shell.
 */

import * as React from "react";
import { Box, Stack, Tooltip, Typography, alpha } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import { useProfileStore } from "../../store/CharacterProfileStore";

export interface GearChipProps {
  size?: number;
}

export function GearChip({ size = 28 }: GearChipProps) {
  const { state } = useProfileStore();
  const equipped = state.equippedItems.filter((i) => i.equipped);
  const count = equipped.length;
  const accent = equipped[0]?.color ?? "#64748b";

  if (count === 0) return null;

  const names = equipped.map((i) => i.name).join(" · ");

  return (
    <Tooltip title={names || `${count} equipped`} arrow>
      <Box
        role="img"
        aria-label={`Gear: ${count} equipped`}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          borderRadius: 1,
          border: "1px solid",
          borderColor: alpha(accent, 0.4),
          bgcolor: alpha(accent, 0.1),
          position: "relative",
          flexShrink: 0,
        }}
      >
        <Inventory2OutlinedIcon sx={{ fontSize: size * 0.48, color: accent }} />
        <Box
          sx={{
            position: "absolute",
            right: -4,
            bottom: -4,
            minWidth: 14,
            height: 14,
            px: 0.35,
            borderRadius: 999,
            bgcolor: accent,
            color: "#fff",
            fontSize: "0.5rem",
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          }}
        >
          {count}
        </Box>
      </Box>
    </Tooltip>
  );
}

/** Chip wrapper for StatusStrip — label + GearChip. */
export function GearChipRow({ size = 26 }: { size?: number }) {
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.5 }}>
      <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: "text.secondary", letterSpacing: 0.2 }}>
        Gear
      </Typography>
      <GearChip size={size} />
    </Stack>
  );
}
