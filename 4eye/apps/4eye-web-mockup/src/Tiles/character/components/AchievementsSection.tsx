"use client";

/**
 * Character — Achievements section.
 *
 * A wrapping grid of rarity-tinted achievement badges with a locked/unlocked
 * count. Custom SVG icons when registered; emoji fallback otherwise.
 */

import * as React from "react";
import { Box, Stack, Tooltip, Typography, alpha } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {
  ACHIEVEMENT_SEED,
  ACHIEVEMENT_ICONS,
  type Achievement,
} from "@4eye/web/components/achievements";
import { Section } from "./shared/EquipSlot";
import { RARITY_COLORS } from "../theme/tokens";

function AchievementBadge({ achievement: a }: { achievement: Achievement }) {
  const rarityKey = a.rarity ?? "common";
  const { color, bg } = RARITY_COLORS[rarityKey] ?? RARITY_COLORS.common;
  const Icon = ACHIEVEMENT_ICONS[a.iconId ?? a.id];

  return (
    <Tooltip
      title={
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: "0.72rem" }}>{a.title}</Typography>
          {a.rarity && a.rarity !== "common" && (
            <Typography sx={{ fontSize: "0.62rem", color: color, fontWeight: 700, textTransform: "capitalize" }}>
              {a.rarity}
            </Typography>
          )}
          <Typography sx={{ fontSize: "0.68rem", mt: 0.25, color: "rgba(255,255,255,0.8)" }}>
            {a.unlocked ? a.description : `🔒 ${a.unlockCondition}`}
          </Typography>
        </Box>
      }
      arrow
      placement="top"
    >
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: 2,
          border: "2px solid",
          borderColor: a.unlocked ? alpha(color, 0.45) : "divider",
          bgcolor: a.unlocked ? alpha(bg, 0.7) : "action.hover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "default",
          opacity: a.unlocked ? 1 : 0.45,
          fontSize: "1.1rem",
          flexShrink: 0,
          position: "relative",
          color: a.unlocked ? color : "text.disabled",
        }}
      >
        {a.unlocked ? (
          Icon ? <Icon size={20} title={a.title} /> : (a.icon ?? "🏆")
        ) : (
          <LockOutlinedIcon sx={{ fontSize: 15, color: "text.disabled" }} />
        )}
      </Box>
    </Tooltip>
  );
}

export function AchievementsSection({
  achievements = ACHIEVEMENT_SEED,
}: {
  achievements?: readonly Achievement[];
}) {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  return (
    <Section
      title="Achievements"
      action={
        <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 600 }}>
          {unlockedCount}/{achievements.length}
        </Typography>
      }
    >
      <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.75 }}>
        {achievements.map((a) => (
          <AchievementBadge key={a.id} achievement={a} />
        ))}
      </Stack>
    </Section>
  );
}
