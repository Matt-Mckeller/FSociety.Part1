"use client";

/**
 * Command Center — CrewAvatar.
 *
 * A small initials badge tinted with a crew member's brand accent. Shared by the
 * Crew board column headers and the My Queue profile switcher so a person reads
 * the same everywhere.
 */

import * as React from "react";
import { Box, alpha } from "@mui/material";
import { COLOR_MAP } from "@4eye/types";

import type { CrewMember } from "../store/crew";

export function CrewAvatar({
  member,
  size = 28,
}: {
  member: CrewMember;
  size?: number;
}) {
  const color = COLOR_MAP[member.accent];
  return (
    <Box
      aria-hidden
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: size * 0.4,
        color,
        bgcolor: alpha(color, 0.16),
        border: "1.5px solid",
        borderColor: alpha(color, 0.5),
        userSelect: "none",
      }}
    >
      {member.initials}
    </Box>
  );
}
