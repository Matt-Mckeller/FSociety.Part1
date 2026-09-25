"use client";

/**
 * IdentityMarks — titles and a collapsed Default audience control on one line.
 *
 * Marketing audiences (Students / Teachers / …) and the old active-role-goal
 * callout no longer compete with titles in the identity band. Expanding
 * Default audience reveals those roles underneath.
 */

import * as React from "react";
import { Stack } from "@mui/material";

import type { RoleKey } from "@4eye/web/components/hud/mapContent/types";
import { DefaultAudienceMark } from "./ProfileRoles";
import { ProfileTitleChips } from "./ProfileTitles";

export function IdentityMarks({
  titles,
  roles,
  accent,
  quietRoles = false,
}: {
  titles?: string[];
  roles?: RoleKey[];
  /** Kept for call-site compatibility; no longer rendered in the identity band. */
  activeRoleGoal?: string;
  accent: string;
  quietRoles?: boolean;
}) {
  const hasTitles = (titles?.length ?? 0) > 0;
  const hasRoles = roles?.some((key) => key !== "default") ?? false;
  if (!hasTitles && !hasRoles) return null;

  return (
    <Stack
      sx={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: 0.5,
        mt: 0.75,
      }}
    >
      {hasTitles && <ProfileTitleChips titles={titles} accent={accent} />}
      {hasRoles && <DefaultAudienceMark roles={roles} quiet={quietRoles} />}
    </Stack>
  );
}
