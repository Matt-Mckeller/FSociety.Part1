"use client";

/**
 * HabitGrid / StatusStrip — the Today lens companions.
 *
 * Habits stay on SquareTileGrid. Mood / Auras / Gear / Buffs live in
 * {@link StatusTargetsSection} as one larger grid → HUD language. StatusStrip
 * is the compact pinned summary (want + counts), not a second expand path.
 */

import * as React from "react";
import { Box, LinearProgress, Stack, Tooltip, Typography, alpha } from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

import { useProfileStore } from "../store/CharacterProfileStore";
import { HABITS } from "../model/habits";
import { HabitGlyph } from "./HabitGlyphs";
import { MOOD_META } from "../model/status";
import { useCharacterSeedEffects, useCharacterStatus } from "../store/useCharacterPresentation";
import { SquareTileGrid, type SquareTile } from "./SquareTileGrid";
import { MorphLabel } from "@4eye/web/components/hud/resourceBars/widgets";
import { AuraGlyphsChip } from "./shared/AuraGlyphs";
import { GearChipRow } from "./shared/GearChip";

export { BuffGrid, StatusTargetsSection, StatusTargetsCombined, StatusTargets } from "./StatusTargetsSection";

/* ------------------------------------------------------------------ habits */

export function HabitGrid() {
  const { state, dispatch } = useProfileStore();
  const equipped = HABITS.filter((h) => state.habitEquipped[h.id] ?? h.equipped);
  const done = equipped.filter((h) => (state.habitState[h.id]?.progress ?? 0) >= 1).length;
  const pct = equipped.length > 0 ? (done / equipped.length) * 100 : 0;

  const tiles: SquareTile[] = equipped.map((h) => {
    const progress = state.habitState[h.id]?.progress ?? h.todayProgress ?? 0;
    const isDone = progress >= 1;
    return {
      id: h.id,
      label: h.label,
      glyph: <HabitGlyph id={h.id} size={18} title={h.label} />,
      color: h.color,
      done: isDone,
      onToggle: () => {
        if (!isDone) dispatch({ type: "mark-habit-done", habitId: h.id });
      },
      meta: h.streak ? `${h.streak}d` : undefined,
      detail: (
        <Stack sx={{ gap: 0.5 }}>
          <Typography sx={{ fontSize: "0.68rem", color: "text.secondary" }}>
            {h.schedule.timeSlots.join(" · ")}
            {h.streak ? ` — ${h.streak} day streak` : ""}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={Math.min(100, progress * 100)}
            sx={{
              height: 4,
              borderRadius: 1,
              bgcolor: alpha(h.color, 0.15),
              "& .MuiLinearProgress-bar": { bgcolor: h.color, borderRadius: 1 },
            }}
          />
        </Stack>
      ),
    };
  });

  if (tiles.length === 0) return null;

  return (
    <SquareTileGrid
      tiles={tiles}
      header={
        <Stack direction="row" sx={{ alignItems: "center", gap: 1, mb: 0.85 }}>
          <Typography sx={{ color: "text.secondary", fontWeight: 800, fontSize: "0.62rem", letterSpacing: "0.12em" }}>
            ROUTINE
          </Typography>
          <Box sx={{ flex: 1, height: 4, borderRadius: 1, bgcolor: alpha("#16a34a", 0.14), overflow: "hidden" }}>
            <Box sx={{ width: `${pct}%`, height: "100%", bgcolor: "#16a34a", borderRadius: 1, transition: "width .4s ease" }} />
          </Box>
          <Typography sx={{ color: "#16a34a", fontWeight: 800, fontSize: "0.62rem", flexShrink: 0 }}>
            {done}/{equipped.length}
          </Typography>
        </Stack>
      }
    />
  );
}

/* ------------------------------------------------------------------ status */

/**
 * StatusStrip — want + compact counts for auras/gear/buffs/mood.
 *
 * Full Mood / Auras / Gear / Buffs interaction is {@link StatusTargetsSection}.
 */
function StatusChipRow({
  chips,
  fill,
  wrap = false,
}: {
  chips: Array<{
    key: string;
    label: string;
    value: React.ReactNode;
    color: string;
    bgcolor?: string;
    hint?: string;
    icon?: React.ReactNode;
  }>;
  fill: boolean;
  wrap?: boolean;
}) {
  if (chips.length === 0) return null;
  return (
    <Stack
      sx={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 0.75,
        width: fill ? "100%" : undefined,
      }}
    >
      {chips.map((c) => {
        const solid = Boolean(c.bgcolor);
        const chip = (
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: fill ? "center" : "flex-start",
              gap: 0.5,
              px: 1,
              py: fill ? 0.75 : 0.5,
              flex: fill ? 1 : undefined,
              minWidth: 0,
              borderRadius: fill ? 1.5 : 999,
              border: "1px solid",
              borderColor: solid ? c.color : alpha(c.color, 0.35),
              bgcolor: c.bgcolor ?? alpha(c.color, 0.07),
              cursor: c.hint ? "help" : undefined,
            }}
          >
            {c.icon ?? (
              <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: c.color, flexShrink: 0 }} />
            )}
            <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: solid ? c.color : "text.secondary", letterSpacing: 0.2 }}>
              {c.label}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.72rem",
                fontWeight: 800,
                color: c.color,
                overflow: wrap ? "visible" : "hidden",
                textOverflow: wrap ? "clip" : "ellipsis",
                whiteSpace: wrap ? "normal" : "nowrap",
                lineHeight: wrap ? 1.25 : undefined,
                fontFamily: wrap
                  ? 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
                  : undefined,
              }}
            >
              {c.value}
            </Typography>
          </Stack>
        );
        return c.hint ? (
          <Tooltip key={c.key} title={c.hint} arrow>
            {chip}
          </Tooltip>
        ) : (
          <React.Fragment key={c.key}>{chip}</React.Fragment>
        );
      })}
    </Stack>
  );
}

function WantValue({ want }: { want: { label: string; cypherWords?: string[]; color: string } }) {
  if (want.cypherWords && want.cypherWords.length > 1) {
    return (
      <Box sx={{ display: "inline-flex", minWidth: "2ch" }}>
        <MorphLabel
          motion="scramble"
          words={want.cypherWords}
          color={want.color}
          active
          hold={2200}
          maxPasses={null}
          fontSize="0.72rem"
          weight={800}
          letterSpacing={0.3}
        />
      </Box>
    );
  }
  return want.label;
}

export function StatusStrip({ fill = false }: { fill?: boolean } = {}) {
  const { state } = useProfileStore();
  const status = useCharacterStatus();
  const seeded = useCharacterSeedEffects();
  const moodMeta = MOOD_META[status.mood];
  const want = status.wants[0];
  const liveEffects = seeded ?? state.activeEffects;
  const buffs = liveEffects.filter((e) => e.kind === "buff").length;
  const debuffs = liveEffects.filter((e) => e.kind === "debuff").length;
  const auraCount = Object.values(state.auraActive).filter(Boolean).length;
  const gearCount = state.equippedItems.filter((i) => i.equipped).length;

  const chips: Array<{
    key: string;
    label: string;
    value: React.ReactNode;
    color: string;
    bgcolor?: string;
    hint?: string;
    icon?: React.ReactNode;
  }> = [
    ...(want
      ? [{
          key: "want",
          label: "Want",
          value: <WantValue want={want} />,
          color: want.color,
          hint: want.description,
          icon: (
            <FavoriteRoundedIcon sx={{ fontSize: 13, color: want.color, flexShrink: 0 }} />
          ),
        }]
      : []),
    ...(moodMeta
      ? [{
          key: "mood",
          label: "Mood",
          value: moodMeta.label,
          color: moodMeta.color,
          bgcolor: moodMeta.chipBg,
          hint: "Open Status Targets below for the full mood HUD",
        }]
      : []),
    {
      key: "auras",
      label: "",
      value: <AuraGlyphsChip size={16} />,
      color: "#818cf8",
      hint: `${auraCount} auras applied`,
    },
    {
      key: "gear",
      label: "",
      value: <GearChipRow size={26} />,
      color: state.equippedItems.find((i) => i.equipped)?.color ?? "#64748b",
      hint: `${gearCount} equipped`,
    },
    { key: "buffs", label: "Buffs", value: String(buffs), color: "#16a34a" },
    ...(debuffs > 0 ? [{ key: "debuffs", label: "Debuffs", value: String(debuffs), color: "#dc2626" }] : []),
  ];

  return (
    <Stack sx={{ gap: 0.75, width: fill ? "100%" : undefined }}>
      <StatusChipRow chips={chips} fill={fill} />
    </Stack>
  );
}
