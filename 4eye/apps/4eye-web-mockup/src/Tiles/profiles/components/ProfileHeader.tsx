"use client";

/**
 * ProfileHeader — avatar, name/username, level badge, and titles.
 *
 * Self-contained and brand-themed. The level badge sits at the BOTTOM-LEFT of
 * the avatar per the userProfile improvement note. Real names are gated behind
 * the `showRealNames` toggle (defaults to usernames-only).
 */

import * as React from "react";
import { Box, FormControlLabel, Stack, Switch, Typography, alpha } from "@mui/material";
import { ProfileFrame, type TierLevel } from "@expanse/character/2d";
import { CHARACTER_PERSONAS } from "@expanse/character/2d";
import { COLOR_MAP } from "@4eye/types";

import { useProfiles } from "../store/ProfileProvider";
import { IdentityMarks } from "./shared/IdentityMarks";
import { HighestValueStrip } from "./shared/HighestValueData";
import { formatLevelMark } from "@yen/content/character/types";

export function ProfileHeader() {
  const { profile, state, dispatch } = useProfiles();
  const displayName =
    state.showRealNames && profile.realName ? profile.realName : profile.username;

  // Character image styling — driven by the profile's brand accent and a
  // level-based progression tier (matches the map page's character quality).
  const accentHex = COLOR_MAP[profile.accent ?? "blue"];
  const tier = Math.min(5, Math.max(1, Math.ceil(profile.level / 4))) as TierLevel;

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
        pb: 2,
        mb: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ position: "relative", display: "flex" }}>
        <ProfileFrame
          {...CHARACTER_PERSONAS.hero}
          size={64}
          zoom="head"
          tier={tier}
          customColors={{
            primary: accentHex,
            accent: accentHex,
            glow: `${accentHex}55`,
          }}
          background="transparent"
        />
        {/* Level badge — bottom-left per improvement note. */}
        <Box
          sx={{
            position: "absolute",
            bottom: -2,
            left: -2,
            zIndex: 2,
            px: 0.75,
            height: 20,
            display: "flex",
            alignItems: "center",
            borderRadius: 1,
            bgcolor: accentHex,
            color: "common.white",
            fontSize: 11,
            fontWeight: 800,
            boxShadow: 1,
          }}
        >
          {formatLevelMark(profile.level)}
        </Box>
      </Box>

      <Box sx={{ flex: 1, minWidth: 160 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", lineHeight: 1.2 }}>
          {displayName}
        </Typography>
        {state.showRealNames && profile.realName && (
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            @{profile.username}
          </Typography>
        )}
        <IdentityMarks
          titles={profile.titles}
          roles={profile.roles}
          activeRoleGoal={profile.activeRoleGoal}
          accent={accentHex}
          quietRoles
        />
        {(profile.highestValueData?.length ?? 0) > 0 && (
          <Box sx={{ mt: 0.75 }}>
            <HighestValueStrip alignments={profile.highestValueData} />
          </Box>
        )}
      </Box>

      <Stack sx={{ alignItems: "flex-end", gap: 0.75 }}>
        <FormControlLabel
          sx={{ m: 0 }}
          control={
            <Switch
              size="small"
              color="primary"
              checked={state.showRealNames}
              onChange={() => dispatch({ kind: "toggle-real-name" })}
            />
          }
          label={
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
              Real name
            </Typography>
          }
        />
      </Stack>
    </Stack>
  );
}
