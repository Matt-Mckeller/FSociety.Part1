"use client";

/**
 * Shared Acting as + Active goals block for chat header + workbench Profile panel.
 */

import {
  Box,
  ListSubheader,
  MenuItem,
  Select,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import TheaterComedyRoundedIcon from "@mui/icons-material/TheaterComedyRounded";
import type { Goal } from "@4eye/types";
import { useGoals, useProfileContext } from "@4eye/features";

import { useSurface } from "@4eye/web/components/surface";
import { useProfiles } from "@4eye/web/Tiles/profiles";
import { ActingAsRoleList } from "./ActingAsSelectorPanel";
import { MorphingTabContent } from "./MorphingTabContent";
import {
  MAX_SELECTED_ROLES,
  equippedRolesFromTitles,
  resolveActingAsRoles,
} from "./actingAsRoles";
import { GOAL_SECTION_META, GOAL_SECTION_ORDER } from "./profileGoals";
import { processesHref, PROCESS_HASH } from "@4eye/web/Tiles/profiles/lib/profileDeepLink";
import NextLink from "next/link";

export function ActiveGoalsSelect({
  accent,
  showProcessesLink = true,
}: {
  accent?: string;
  showProcessesLink?: boolean;
}) {
  const surface = useSurface();
  const { profile } = useProfiles();
  const { settings, setActiveGoalId } = useProfileContext();
  const { goals } = useGoals();
  const ink = accent ? surface.ink(accent) : surface.text.hi;

  const active = goals.find((g) => g.id === settings.activeGoalId);
  const processesLink =
    active?.section === "others"
      ? processesHref(PROCESS_HASH.jannaVision)
      : active?.section === "ongoing"
        ? processesHref(PROCESS_HASH.selfOngoing)
        : processesHref(PROCESS_HASH.selfOperational);

  return (
    <Box>
      <Typography sx={{ fontSize: 10, fontWeight: 700, color: surface.text.lo, mb: 0.4 }}>
        Active goals
      </Typography>
      <Select
        size="small"
        fullWidth
        value={settings.activeGoalId ?? ""}
        onChange={(e) => setActiveGoalId(e.target.value || undefined)}
        displayEmpty
        sx={{ fontSize: 12, "& .MuiSelect-select": { py: 0.7 } }}
      >
        <MenuItem value="" sx={{ fontSize: 13 }}>
          {profile.activeRoleGoal ?? "None"}
        </MenuItem>
        {GOAL_SECTION_ORDER.flatMap((section) => {
          const items = goals.filter((g: Goal) => g.section === section);
          if (items.length === 0) return [];
          return [
            <ListSubheader key={`h-${section}`} sx={{ fontSize: 10, lineHeight: "28px" }}>
              {GOAL_SECTION_META[section].label}
            </ListSubheader>,
            ...items.map((g) => (
              <MenuItem key={g.id} value={g.id} sx={{ fontSize: 13 }}>
                {g.word}
              </MenuItem>
            )),
          ];
        })}
        {goals
          .filter((g) => !g.section)
          .map((g) => (
            <MenuItem key={g.id} value={g.id} sx={{ fontSize: 13 }}>
              {g.word}
            </MenuItem>
          ))}
      </Select>
      {showProcessesLink && (
        <Typography
          component={NextLink}
          href={processesLink}
          sx={{
            display: "inline-block",
            mt: 0.6,
            fontSize: 10,
            fontWeight: 700,
            color: ink,
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Open on Processes
        </Typography>
      )}
    </Box>
  );
}

export function ActingAsGoalsBlock({
  accent = "#818cf8",
  showPreview = true,
}: {
  accent?: string;
  showPreview?: boolean;
}) {
  const surface = useSurface();
  const { profile } = useProfiles();
  const { settings, toggleActingAsRole } = useProfileContext();
  const equippedRoles = equippedRolesFromTitles(profile.titles);
  const selectedActingAs = resolveActingAsRoles(settings.actingAsRoles ?? [], profile.titles);

  return (
    <Stack sx={{ gap: 1 }}>
      <Box>
        <Stack sx={{ flexDirection: "row", alignItems: "center", mb: 0.5 }}>
          <Typography sx={{ fontSize: 10, fontWeight: 700, color: surface.text.lo, flex: 1 }}>
            Acting as
          </Typography>
          <Typography
            sx={{
              fontSize: 10,
              color: surface.text.faint,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {selectedActingAs.length} / {MAX_SELECTED_ROLES}
          </Typography>
        </Stack>
        {showPreview && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 0.5,
              mb: 0.5,
              borderRadius: 1.5,
              border: "1px solid",
              borderColor: surface.dividerBorder,
              bgcolor: alpha(accent, 0.06),
            }}
          >
            <MorphingTabContent
              KindIcon={TheaterComedyRoundedIcon}
              label="Acting as"
              selected={selectedActingAs}
              max={MAX_SELECTED_ROLES}
              shape="circle"
              glyphColor="slate"
            />
          </Box>
        )}
        <ActingAsRoleList
          equipped={equippedRoles}
          selectedIds={settings.actingAsRoles ?? []}
          onToggle={toggleActingAsRole}
        />
      </Box>
      <ActiveGoalsSelect accent={accent} />
    </Stack>
  );
}
