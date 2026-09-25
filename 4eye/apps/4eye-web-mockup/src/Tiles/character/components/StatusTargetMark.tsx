"use client";

/**
 * StatusTargetMark — glyph for a status target at any size (tile, HUD, bar pin).
 */

import * as React from "react";
import { Box, alpha } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import { EffectGlyph } from "./EffectGlyphs";
import {
  AURAS,
  JANNA_AURAS,
  type AuraMeta,
} from "./Auras";
import { MOOD_META, type StatusEffect } from "../model/status";
import type { StatusTargetRef } from "../model/statusTargets";
import type { EquipmentItem } from "../model/equipment";
import { useIsJannaProfile } from "../store/useCharacterPresentation";

export function MoodMark({ moodId, size = 22 }: { moodId: string; size?: number }) {
  const meta = MOOD_META[moodId as keyof typeof MOOD_META];
  const color = meta?.color ?? "#64748b";
  const letter = (meta?.label ?? moodId).slice(0, 1).toUpperCase();
  return (
    <Box
      aria-hidden
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        bgcolor: meta?.chipBg ?? alpha(color, 0.18),
        border: `1.5px solid ${alpha(color, 0.55)}`,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.48,
        fontWeight: 900,
        lineHeight: 1,
      }}
    >
      {letter}
    </Box>
  );
}

export function AuraMark({
  aura,
  size = 22,
}: {
  aura: AuraMeta;
  size?: number;
}) {
  const Glyph = aura.Glyph;
  return <Glyph size={size} color={aura.color} title={aura.label} />;
}

export function GearMark({
  item,
  size = 22,
}: {
  item?: EquipmentItem | null;
  size?: number;
}) {
  const color = item?.color ?? "#64748b";
  return <Inventory2OutlinedIcon sx={{ fontSize: size, color }} />;
}

export function BuffMark({
  effect,
  size = 22,
}: {
  effect?: StatusEffect | null;
  size?: number;
}) {
  if (effect?.glyph) {
    return <EffectGlyph id={effect.glyph} size={size} title={effect.label} />;
  }
  return (
    <Box sx={{ fontSize: size * 0.85, lineHeight: 1, color: effect?.color ?? "#16a34a" }}>
      {effect?.emoji ?? "⚡"}
    </Box>
  );
}

export function StatusTargetMark({
  target,
  size = 22,
  auraCatalog,
  gearItem,
  effect,
}: {
  target: StatusTargetRef;
  size?: number;
  auraCatalog?: readonly AuraMeta[];
  gearItem?: EquipmentItem | null;
  effect?: StatusEffect | null;
}) {
  const isJanna = useIsJannaProfile();
  const auras = auraCatalog ?? (isJanna ? JANNA_AURAS : AURAS);

  switch (target.kind) {
    case "mood":
      return <MoodMark moodId={target.moodId} size={size} />;
    case "aura": {
      const aura = auras.find((a) => a.id === target.auraId);
      if (!aura) return <MoodMark moodId="neutral" size={size} />;
      return <AuraMark aura={aura} size={size} />;
    }
    case "gear":
      return <GearMark item={gearItem} size={size} />;
    case "buff":
      return <BuffMark effect={effect} size={size} />;
  }
}
