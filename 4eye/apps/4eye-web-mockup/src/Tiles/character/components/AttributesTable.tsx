"use client";

/**
 * AttributesTable — attributes as information, not decoration.
 *
 * `AttributesGrid` gives each attribute its own hue, a radial
 * gradient, a coloured glow and a coloured shadow — so many cards carry
 * colours that mean nothing beyond "this is a different attribute". It
 * also hardcodes `bgcolor: "#fff"`, which is simply wrong in dark mode.
 *
 * Here colour appears exactly three times, and each time it means something:
 *   - the bar fill, one accent for all rows, so lengths are comparable
 *   - a green delta when gear is contributing a bonus
 *   - a muted tier word, which is a category not a value
 *
 * Everything else is neutral. What replaces the colour is data the grid only
 * had in a tooltip: base, bonus and effective value are all on the surface, so
 * two attributes can be compared without hovering either.
 */

import * as React from "react";
import { Box, Stack, Tooltip, Typography, alpha } from "@mui/material";
import { ATTRIBUTE_ICONS } from "@4eye/icons";

import { useSurface } from "@4eye/web/components/surface";
import { useEffectiveAttributes } from "../store/CharacterProfileStore";
import { ATTRIBUTE_GROUP_LABEL, ATTRIBUTES, formatAttributeMark, tierIndex } from "../model/attributes";
import { ShowMore, useCapped } from "./shared/ShowMore";
import { CypherAttributeTier } from "./shared/CypherAttributeTier";

const BONUS_COLOR = "#16a34a";

/**
 * How many rows the panel shows before "show all".
 *
 * Rows are sorted by effective value, so the head is the attributes that
 * actually characterise this profile; the tail is worth having but not worth
 * the full vertical budget on a lens that also holds gear, perks and spells.
 */
const HEAD_ROWS = 6;
const LABEL_W = 118;

function Row({
  id,
  label,
  description,
  group,
  base,
  bonus,
  tier,
  accent,
}: {
  id: string;
  label: string;
  description?: string;
  group: string;
  base: number;
  bonus: number;
  tier: string;
  accent: string;
}) {
  const raw = base + bonus;
  const infinite = !Number.isFinite(raw);
  const effective = infinite ? 100 : Math.min(100, raw);
  const Icon = ATTRIBUTE_ICONS[id];

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
          {group} · <CypherAttributeTier attrId={id} tier={tier} fontSize="0.6rem" weight={600} />
        </Typography>
      </Box>

      {/* One accent for every bar, so lengths are directly comparable. */}
      <Tooltip title={description ?? label} arrow>
        <Box sx={{ flex: 1, minWidth: 60, height: 6, borderRadius: 1, bgcolor: alpha(accent, 0.14), overflow: "hidden" }}>
          <Box sx={{ width: `${effective}%`, height: "100%", bgcolor: accent, borderRadius: 1, transition: "width .3s ease" }} />
        </Box>
      </Tooltip>

      {/* base + bonus = total. Show uncapped total so two maxed attributes still differ. */}
      <Stack sx={{ flexDirection: "row", alignItems: "baseline", gap: 0.4, width: 84, justifyContent: "flex-end", flexShrink: 0 }}>
        <Typography
          component="span"
          sx={{ fontSize: "0.62rem", color: "text.secondary", fontVariantNumeric: "tabular-nums" }}
        >
          {formatAttributeMark(base)}
        </Typography>
        {Number.isFinite(bonus) && bonus > 0 && (
          <Typography
            component="span"
            sx={{ fontSize: "0.62rem", fontWeight: 700, color: BONUS_COLOR, fontVariantNumeric: "tabular-nums" }}
          >
            +{bonus}
          </Typography>
        )}
        <Typography
          component="span"
          sx={{ fontSize: "0.82rem", fontWeight: 800, color: "text.primary", fontVariantNumeric: "tabular-nums" }}
        >
          {formatAttributeMark(raw)}
        </Typography>
      </Stack>
    </Stack>
  );
}

export function AttributesTable({ accent }: { accent: string }) {
  const effective = useEffectiveAttributes();
  const surface = useSurface();
  const ink = surface.ink(accent);

  const rows = ATTRIBUTES.map((a) => {
    const p = effective[a.id] ?? { base: 0, bonus: 0 };
    return {
      id: a.id,
      label: a.label,
      description: a.description,
      group: ATTRIBUTE_GROUP_LABEL[a.group],
      base: p.base,
      bonus: p.bonus,
      tier: a.tiers[tierIndex(Number.isFinite(p.base + p.bonus) ? Math.min(100, p.base + p.bonus) : Infinity)],
    };
  }).sort((x, y) => {
    const xv = x.base + x.bonus;
    const yv = y.base + y.bonus;
    if (!Number.isFinite(xv) && !Number.isFinite(yv)) return 0;
    if (!Number.isFinite(xv)) return -1;
    if (!Number.isFinite(yv)) return 1;
    return yv - xv;
  });

  const capped = useCapped(rows, HEAD_ROWS);
  const geared = rows.filter((r) => r.bonus > 0).length;

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
          ATTRIBUTE
        </Typography>
        <Box sx={{ flex: 1, minWidth: 60 }} />
        <Typography
          component="div"
          sx={{ width: 84, textAlign: "right", flexShrink: 0, fontSize: "0.56rem", fontWeight: 800, letterSpacing: "0.1em", color: "text.secondary" }}
        >
          BASE · GEAR · TOTAL
        </Typography>
      </Stack>

      {capped.items.map((r) => (
        <Row key={r.id} {...r} accent={ink} />
      ))}

      <ShowMore capped={capped} accent={accent} noun="attributes" />

      {geared > 0 && (
        <Typography component="div" sx={{ mt: 1, fontSize: "0.62rem", color: "text.secondary" }}>
          {geared} of {rows.length} attributes are currently receiving a gear bonus.
        </Typography>
      )}
    </Box>
  );
}
