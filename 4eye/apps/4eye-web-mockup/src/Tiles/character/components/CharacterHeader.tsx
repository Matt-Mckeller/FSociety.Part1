"use client";

/**
 * CharacterHeader — avatar, name, level badge, titles, and roles.
 *
 * Reuses the 2D ProfileFrame character art (same as the Profiles header) so the
 * Character screen and the matching Profile feel like one identity. Marketing
 * audiences collapse behind Default audience in {@link IdentityMarks}. Resource
 * meters (XP/coins/energy and the richer Mind/Body bars) now live in the corner
 * HUD ({@link ResourceCornerHud}), not in this header.
 */

import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { ProfileFrame, type TierLevel, CHARACTER_PERSONAS } from "@expanse/character/2d";
import { COLOR_MAP } from "@4eye/types";

import { IdentityMarks } from "@4eye/web/Tiles/profiles/components/shared/IdentityMarks";
import { PROFILE_JADE } from "@4eye/web/Tiles/profiles/lib/profileDeepLink";
import { PROFILES_SEED } from "@4eye/web/Tiles/profiles/store/seed-data";
import { useCharacter } from "../store/CharacterProvider";
import { RoleEquip } from "./RoleEquip";
import { formatLevelMark } from "@yen/content/character/types";

export function CharacterHeader({
  nameSlot,
  badgeSlot,
  accent: accentProp,
}: {
  /** Overrides the name display (e.g. a logo mark) without touching the rest of the header. */
  nameSlot?: React.ReactNode;
  /** Overrides the avatar's corner badge content (defaults to "L{level}") without touching its chrome. */
  badgeSlot?: React.ReactNode;
  /** Accent for marks / badge — defaults to profile jade for continuity with ProfilePage. */
  accent?: string;
} = {}) {
  const { character } = useCharacter();
  const accentHex = accentProp ?? PROFILE_JADE;
  const personaAccent = COLOR_MAP[character.accent];
  const tier = Math.min(5, Math.max(1, Math.ceil(character.level / 4))) as TierLevel;
  const profile = PROFILES_SEED.profiles.find((p) => p.id === character.profileId);
  const roles = profile?.roles;

  return (
    <Stack spacing={1.5}>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ position: "relative", display: "flex" }}>
          <ProfileFrame
            {...CHARACTER_PERSONAS.hero}
            size={72}
            zoom="head"
            tier={tier}
            customColors={{ primary: personaAccent, accent: personaAccent, glow: `${personaAccent}55` }}
            background="transparent"
          />
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
            {badgeSlot ?? formatLevelMark(character.level)}
          </Box>
        </Box>

        <Box sx={{ flex: 1, minWidth: 160 }}>
          {nameSlot ?? (
            <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", lineHeight: 1.2 }}>
              {character.name}
            </Typography>
          )}
          {character.realName && (
            <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 500, lineHeight: 1.2 }}>
              {character.realName}
            </Typography>
          )}
          <Stack sx={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 0.5, mt: 0.75 }}>
            <RoleEquip />
            {(roles?.length ?? 0) > 0 && (
              <IdentityMarks titles={[]} roles={roles} accent={accentHex} quietRoles />
            )}
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}
