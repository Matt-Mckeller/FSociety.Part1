"use client";

/**
 * ProfileRoles — display of a profile's canonical audience roles.
 *
 * Marketing audiences (Students / Teachers / …) stay collapsed behind a single
 * Default audience control so the identity band stays about the person, not the
 * product pitch. Selection still lives in the HUD map context; this is a
 * display-only lens on the profile.
 */

import * as React from "react";
import { Chip, Stack, Tooltip, alpha } from "@mui/material";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";

import { getRole, ROLE_ACCENT } from "@4eye/web/components/hud/mapContent/roles";
import type { RoleKey } from "@4eye/web/components/hud/mapContent/types";

/** Audience role keys shown under Default audience — skip the meta `default` key. */
function audienceRolesOf(roles?: RoleKey[]): RoleKey[] {
  return (roles ?? []).filter((key) => key !== "default");
}

export function ProfileRoleChips({
  roles,
  quiet = false,
}: {
  roles?: RoleKey[];
  /**
   * Drop the role hue to a neutral outline. For the profile header, where these
   * chips sit under an accent-anchored identity band and their blue was one of
   * several competing colours. The icon keeps the accent, so the association is
   * still there for anyone who has seen the full-colour version elsewhere.
   */
  quiet?: boolean;
}) {
  const list = audienceRolesOf(roles);
  if (list.length === 0) return null;
  return (
    <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.5 }}>
      {list.map((key) => {
        const role = getRole(key);
        const Icon = role.Icon;
        return (
          <Tooltip key={key} title={role.blurb} arrow>
            <Chip
              icon={<Icon sx={{ fontSize: 14 }} />}
              label={role.label}
              size="small"
              sx={{
                height: 22,
                fontWeight: 700,
                color: quiet ? "text.secondary" : ROLE_ACCENT,
                bgcolor: quiet ? "transparent" : alpha(ROLE_ACCENT, 0.1),
                border: `1px solid ${alpha(ROLE_ACCENT, quiet ? 0.22 : 0.3)}`,
                "& .MuiChip-icon": { color: quiet ? alpha(ROLE_ACCENT, 0.7) : ROLE_ACCENT },
              }}
            />
          </Tooltip>
        );
      })}
    </Stack>
  );
}

/**
 * Single header control for marketing audiences. Click to highlight and reveal
 * the underlying role chips (Students, Teachers, …).
 */
export function DefaultAudienceMark({
  roles,
  quiet = false,
}: {
  roles?: RoleKey[];
  quiet?: boolean;
}) {
  const list = audienceRolesOf(roles);
  const [open, setOpen] = React.useState(false);

  if (list.length === 0) return null;

  const labels = list.map((key) => getRole(key).label).join(" · ");

  return (
    <Stack sx={{ gap: 0.5, alignItems: "flex-start" }}>
      <Tooltip title={open ? "Hide default audiences" : labels} arrow>
        <Chip
          icon={<GroupsOutlined sx={{ fontSize: 15 }} />}
          label="Default audience"
          size="small"
          onClick={() => setOpen((v) => !v)}
          aria-pressed={open}
          sx={{
            height: 22,
            fontWeight: 700,
            cursor: "pointer",
            color: open ? ROLE_ACCENT : quiet ? "text.secondary" : ROLE_ACCENT,
            bgcolor: open ? alpha(ROLE_ACCENT, 0.14) : quiet ? "transparent" : alpha(ROLE_ACCENT, 0.08),
            border: `1px solid ${alpha(ROLE_ACCENT, open ? 0.45 : quiet ? 0.22 : 0.28)}`,
            boxShadow: open ? `inset 0 0 0 1px ${alpha(ROLE_ACCENT, 0.2)}` : "none",
            "& .MuiChip-icon": {
              color: open ? ROLE_ACCENT : quiet ? alpha(ROLE_ACCENT, 0.7) : ROLE_ACCENT,
              ml: 0.5,
            },
          }}
        />
      </Tooltip>
      {open && <ProfileRoleChips roles={list} quiet={quiet} />}
    </Stack>
  );
}

/** Full roles section: default-audience control (+ expanded role chips). */
export function ProfileRolesSection({
  roles,
}: {
  roles?: RoleKey[];
  /** @deprecated Marketing goal text is no longer shown on the profile identity band. */
  activeRoleGoal?: string;
}) {
  if (!roles || audienceRolesOf(roles).length === 0) return null;
  return (
    <Stack spacing={0.75}>
      <DefaultAudienceMark roles={roles} />
    </Stack>
  );
}
