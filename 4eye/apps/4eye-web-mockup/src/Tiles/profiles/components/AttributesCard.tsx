"use client";

/**
 * AttributesCard — attributes on the surfaced band, in three treatments.
 *
 * The summary card used to hide the number in a tooltip and paint every value
 * in one accent — so a row of capped attributes read as identical blue/green
 * "100"s. Here the number is always on the surface in neutral ink, the
 * attribute's own hue only marks the glyph / bar, and uncapped totals keep two
 * maxed attributes distinguishable. A ShowMore expands past the head of six.
 *
 *   bars    icon · label · number · bar · tier   — most information, tallest
 *   grid    icon over number, tier on hover      — densest, most scannable
 *   chips   icon + number in a pill, wrapping    — lightest, best when narrow
 */

import * as React from "react";
import { Box, Grid, LinearProgress, Stack, Tooltip, Typography, alpha } from "@mui/material";
import { ATTRIBUTE_ICONS } from "@4eye/icons";

import { useEffectiveAttributes } from "@4eye/web/Tiles/character/store/CharacterProfileStore";
import { ATTRIBUTES, tierIndex } from "@4eye/web/Tiles/character/model/attributes";
import { ShowMore, useCapped } from "@4eye/web/Tiles/character/components/shared/ShowMore";

export type AttributeVariant = "bars" | "grid" | "chips";
export const ATTRIBUTE_VARIANTS: AttributeVariant[] = ["bars", "grid", "chips"];

/** How many attributes surface by default — the head of a larger ranked set. */
const SHOWN = 6;

interface Row {
  id: string;
  label: string;
  color: string;
  /** Capped at 100 for the bar. */
  value: number;
  /** Uncapped base + bonus — the only thing that separates capped attributes. */
  raw: number;
  bonus: number;
  tier: string;
}

function useRankedAttributes(): Row[] {
  const effective = useEffectiveAttributes();
  return React.useMemo(() => {
    return ATTRIBUTES.map((a) => {
      const prog = effective[a.id] ?? { base: 0, bonus: 0 };
      const raw = prog.base + prog.bonus;
      const value = Math.min(100, raw);
      return {
        id: a.id,
        label: a.label,
        color: a.color,
        value,
        raw,
        bonus: prog.bonus,
        tier: a.tiers[tierIndex(value)],
      };
    }).sort((x, y) => y.raw - x.raw);
  }, [effective]);
}

function Glyph({ id, color, size = 14 }: { id: string; color: string; size?: number }) {
  const Icon = ATTRIBUTE_ICONS[id];
  if (!Icon) return null;
  return <Box component={Icon} size={size} sx={{ color, flexShrink: 0 }} />;
}

function displayValue(r: Row): number {
  return r.raw > 100 ? r.raw : r.value;
}

/* -------------------------------------------------------------------- bars */

function BarsVariant({ rows }: { rows: Row[] }) {
  return (
    <Stack sx={{ gap: 0.9 }}>
      {rows.map((r) => (
        <Box key={r.id}>
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.6, mb: 0.3 }}>
            <Glyph id={r.id} color={r.color} />
            <Typography component="span" sx={{ fontSize: "0.66rem", fontWeight: 700, color: "text.secondary", flex: 1, minWidth: 0 }}>
              {r.label}
            </Typography>
            <Typography
              component="span"
              sx={{ fontSize: "0.72rem", fontWeight: 800, color: "text.primary", fontVariantNumeric: "tabular-nums" }}
            >
              {displayValue(r)}
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={r.value}
            aria-label={`${r.label} ${displayValue(r)}${r.raw > 100 ? " (over cap)" : " of 100"}`}
            sx={{
              height: 5,
              borderRadius: 1,
              bgcolor: alpha(r.color, 0.12),
              "& .MuiLinearProgress-bar": { bgcolor: r.color, borderRadius: 1, opacity: 0.9 },
            }}
          />
          <Typography component="div" sx={{ fontSize: "0.58rem", fontWeight: 700, color: "text.secondary", mt: 0.2 }}>
            {r.tier}
            {r.bonus > 0 ? ` · +${r.bonus} gear` : ""}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}

/* -------------------------------------------------------------------- grid */

function GridVariant({ rows }: { rows: Row[] }) {
  return (
    <Grid container spacing={1}>
      {rows.map((r) => (
        <Grid key={r.id} size={{ zero: 4 }}>
          <Tooltip title={`${r.label}: ${r.raw}${r.bonus > 0 ? ` (incl. +${r.bonus} gear)` : ""} · ${r.tier}`} arrow>
            <Stack
              tabIndex={0}
              sx={{
                alignItems: "center",
                gap: 0.35,
                py: 0.9,
                px: 0.5,
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: alpha(r.color, 0.22),
                bgcolor: alpha(r.color, 0.05),
                cursor: "help",
                "&:hover": { borderColor: alpha(r.color, 0.45) },
                "&:focus-visible": { outline: `2px solid ${r.color}`, outlineOffset: 2 },
              }}
            >
              <Glyph id={r.id} color={r.color} size={17} />
              <Typography
                component="div"
                sx={{
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  color: "text.primary",
                  lineHeight: 1.1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {displayValue(r)}
              </Typography>
              <Typography
                component="div"
                sx={{
                  fontSize: "0.52rem",
                  fontWeight: 700,
                  color: "text.secondary",
                  letterSpacing: 0.4,
                  lineHeight: 1.2,
                  textAlign: "center",
                  mt: 0.1,
                }}
              >
                {r.label.toUpperCase()}
              </Typography>
            </Stack>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
}

/* ------------------------------------------------------------------- chips */

function ChipsVariant({ rows }: { rows: Row[] }) {
  return (
    <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.6 }}>
      {rows.map((r) => (
        <Tooltip key={r.id} title={`${r.label}: ${r.raw}${r.bonus > 0 ? ` (incl. +${r.bonus} gear)` : ""} · ${r.tier}`} arrow>
          <Stack
            tabIndex={0}
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: 0.4,
              px: 0.9,
              py: 0.4,
              borderRadius: 999,
              border: "1px solid",
              borderColor: alpha(r.color, 0.28),
              bgcolor: alpha(r.color, 0.07),
              cursor: "help",
              "&:focus-visible": { outline: `2px solid ${r.color}`, outlineOffset: 2 },
            }}
          >
            <Glyph id={r.id} color={r.color} size={13} />
            <Typography
              component="span"
              sx={{ fontSize: "0.7rem", fontWeight: 800, color: "text.primary", fontVariantNumeric: "tabular-nums" }}
            >
              {displayValue(r)}
            </Typography>
          </Stack>
        </Tooltip>
      ))}
    </Stack>
  );
}

/* -------------------------------------------------------------------- card */

export function AttributesCard({ accent, variant }: { accent: string; variant: AttributeVariant }) {
  const ranked = useRankedAttributes();
  const capped = useCapped(ranked, SHOWN);
  const rows = capped.items;

  if (ranked.length === 0) {
    return (
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        No attributes recorded yet.
      </Typography>
    );
  }

  return (
    <Box>
      {variant === "grid" ? (
        <GridVariant rows={rows} />
      ) : variant === "chips" ? (
        <ChipsVariant rows={rows} />
      ) : (
        <BarsVariant rows={rows} />
      )}
      <ShowMore capped={capped} accent={accent} noun="attributes" />
    </Box>
  );
}
