"use client";

/**
 * LearningStylesTable — same information layout as AttributesTable.
 *
 * Styles (modalities) and preferences (format / stance) share one ranked list
 * so the character page can answer "how do I take things in?" without a second
 * visual language. Bonus column stays for parity; seed has no session boosts yet.
 */

import * as React from "react";
import { Box, Stack, Tooltip, Typography, alpha } from "@mui/material";
import { ATTRIBUTE_ICONS } from "@4eye/icons";

import { useSurface } from "@4eye/web/components/surface";
import {
  LEARNING_FACET_GROUP_LABEL,
  LEARNING_FACET_KIND_LABEL,
  LEARNING_FACET_PROGRESS_SEED,
  LEARNING_FACETS,
  learningTierIndex,
} from "../model/learning-styles";
import { ShowMore, useCapped } from "./shared/ShowMore";

const HEAD_ROWS = 6;
const LABEL_W = 118;

/** Soft glyph fallbacks — reuse attribute marks that read the same idea. */
const FACET_ICON_FALLBACK: Record<string, string> = {
  visual: "perception",
  associative: "power",
  storytelling: "communication",
  "problem-solving": "intelligence",
  "ship-by-building": "discipline",
  logical: "intelligence",
  "deep-systems": "wisdom",
  "reading-writing": "memory",
  "small-chunks-imagery": "creativity",
  "gaming-analogies": "charisma",
  verbal: "communication",
  "teach-to-learn": "wisdom",
  social: "empathy",
  kinesthetic: "agility",
  "soft-public": "courage",
  auditory: "focus",
};

function Row({
  id,
  label,
  description,
  kind,
  group,
  base,
  bonus,
  tier,
  accent,
}: {
  id: string;
  label: string;
  description?: string;
  kind: string;
  group: string;
  base: number;
  bonus: number;
  tier: string;
  accent: string;
}) {
  const raw = base + bonus;
  const effective = Math.min(100, raw);
  const iconId = FACET_ICON_FALLBACK[id];
  const Icon = iconId ? ATTRIBUTE_ICONS[iconId] : undefined;

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 1.25,
        py: 0.85,
        borderBottom: "1px solid",
        borderColor: "divider",
        "&:last-of-type": { borderBottom: "none" },
      }}
    >
      {Icon && <Box component={Icon} size={16} sx={{ color: "text.secondary", flexShrink: 0 }} />}

      <Box sx={{ width: LABEL_W, flexShrink: 0 }}>
        <Typography
          component="div"
          sx={{ fontSize: "0.74rem", fontWeight: 700, color: "text.primary", lineHeight: 1.25 }}
        >
          {label}
        </Typography>
        <Typography
          component="div"
          sx={{ fontSize: "0.6rem", fontWeight: 600, color: "text.secondary", lineHeight: 1.25 }}
        >
          {kind} · {group} · {tier}
        </Typography>
      </Box>

      <Tooltip title={description ?? label} arrow>
        <Box sx={{ flex: 1, minWidth: 60, height: 6, borderRadius: 1, bgcolor: alpha(accent, 0.14), overflow: "hidden" }}>
          <Box sx={{ width: `${effective}%`, height: "100%", bgcolor: accent, borderRadius: 1, transition: "width .3s ease" }} />
        </Box>
      </Tooltip>

      <Stack sx={{ flexDirection: "row", alignItems: "baseline", gap: 0.4, width: 84, justifyContent: "flex-end", flexShrink: 0 }}>
        <Typography
          component="span"
          sx={{ fontSize: "0.62rem", color: "text.secondary", fontVariantNumeric: "tabular-nums" }}
        >
          {base}
        </Typography>
        {bonus > 0 && (
          <Typography
            component="span"
            sx={{ fontSize: "0.62rem", fontWeight: 700, color: "#16a34a", fontVariantNumeric: "tabular-nums" }}
          >
            +{bonus}
          </Typography>
        )}
        <Typography
          component="span"
          sx={{ fontSize: "0.82rem", fontWeight: 800, color: "text.primary", fontVariantNumeric: "tabular-nums" }}
        >
          {raw}
        </Typography>
      </Stack>
    </Stack>
  );
}

export function LearningStylesTable({ accent }: { accent: string }) {
  const surface = useSurface();
  const ink = surface.ink(accent);

  const rows = LEARNING_FACETS.map((f) => {
    const p = LEARNING_FACET_PROGRESS_SEED[f.id] ?? { base: 0, bonus: 0 };
    return {
      id: f.id,
      label: f.label,
      description: `${f.description} · ${f.source}`,
      kind: LEARNING_FACET_KIND_LABEL[f.kind],
      group: LEARNING_FACET_GROUP_LABEL[f.group],
      base: p.base,
      bonus: p.bonus,
      tier: f.tiers[learningTierIndex(Math.min(100, p.base + p.bonus))],
    };
  }).sort((x, y) => y.base + y.bonus - (x.base + x.bonus));

  const capped = useCapped(rows, HEAD_ROWS);
  const styles = rows.filter((r) => r.kind === "Style").length;
  const prefs = rows.length - styles;

  return (
    <Box>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 1.25,
          pb: 0.5,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ width: 16, flexShrink: 0 }} />
        <Typography
          component="div"
          sx={{ width: LABEL_W, flexShrink: 0, fontSize: "0.56rem", fontWeight: 800, letterSpacing: "0.1em", color: "text.secondary" }}
        >
          STYLE · PREF
        </Typography>
        <Box sx={{ flex: 1, minWidth: 60 }} />
        <Typography
          component="div"
          sx={{ width: 84, textAlign: "right", flexShrink: 0, fontSize: "0.56rem", fontWeight: 800, letterSpacing: "0.1em", color: "text.secondary" }}
        >
          FIT · TOTAL
        </Typography>
      </Stack>

      {capped.items.map((r) => (
        <Row key={r.id} {...r} accent={ink} />
      ))}

      <ShowMore capped={capped} accent={accent} noun="learning facets" />

      <Typography component="div" sx={{ mt: 1, fontSize: "0.62rem", color: "text.secondary" }}>
        {styles} learning styles · {prefs} preferences — ranked for this character.
      </Typography>
    </Box>
  );
}
