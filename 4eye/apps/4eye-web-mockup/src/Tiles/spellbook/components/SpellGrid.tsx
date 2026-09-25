"use client";

/**
 * SpellGrid — keypad of spell cards, organised by lane + subgroup.
 *
 * Learn keeps compress/depth/anchor/challenge. Other lanes get the same
 * section treatment so All / For you never dump into a flat wall.
 */

import * as React from "react";
import { Box, Button, Stack, Typography, alpha } from "@mui/material";

import { useSpellbook } from "../store/SpellbookProvider";
import {
  FOR_YOU_PRESET_ID,
  LANE_SUBGROUP_META,
  LANE_SUBGROUP_ORDER,
  SPELL_LANE_META,
  SPELL_LANE_ORDER,
  spellPlacement,
  type LaneSubgroup,
  type SpellLane,
} from "../model/lanes";
import type { Spell } from "../model/types";
import { SpellCard } from "./SpellCard";

const GRID_SX = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
  gap: 1.25,
} as const;

function GridBlock({
  title,
  color,
  blurb,
  spells,
}: {
  title: string;
  color: string;
  blurb?: string;
  spells: Spell[];
}) {
  if (spells.length === 0) return null;
  return (
    <Box>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.75,
          mb: blurb ? 0.35 : 0.75,
          px: 1,
          py: 0.35,
          borderRadius: 1.5,
          bgcolor: alpha(color, 0.07),
          border: `1px solid ${alpha(color, 0.2)}`,
        }}
      >
        <Box
          sx={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            bgcolor: color,
            flexShrink: 0,
          }}
        />
        <Typography
          variant="overline"
          sx={{ fontWeight: 800, color: "text.primary", letterSpacing: 0.5, lineHeight: 1 }}
        >
          {title}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", fontWeight: 700, lineHeight: 1 }}
        >
          · {spells.length}
        </Typography>
      </Box>
      {blurb && (
        <Typography
          variant="caption"
          sx={{ display: "block", color: "text.disabled", mb: 0.75, px: 0.5, fontWeight: 600 }}
        >
          {blurb}
        </Typography>
      )}
      <Box sx={GRID_SX}>
        {spells.map((s) => (
          <SpellCard key={s.id} spell={s} />
        ))}
      </Box>
    </Box>
  );
}

function LaneView({ spells }: { spells: Spell[] }) {
  const byLane = React.useMemo(() => {
    const map = Object.fromEntries(SPELL_LANE_ORDER.map((l) => [l, [] as Spell[]])) as Record<
      SpellLane,
      Spell[]
    >;
    for (const s of spells) {
      map[spellPlacement(s).lane].push(s);
    }
    return map;
  }, [spells]);

  return (
    <Stack spacing={2.75}>
      {SPELL_LANE_ORDER.map((lane) => {
        const laneSpells = byLane[lane];
        if (laneSpells.length === 0) return null;
        const meta = SPELL_LANE_META[lane];
        const order = LANE_SUBGROUP_ORDER[lane];
        const bySub = Object.fromEntries(order.map((g) => [g, [] as Spell[]])) as Record<
          LaneSubgroup,
          Spell[]
        >;
        for (const s of laneSpells) {
          const g = spellPlacement(s).subgroup;
          (bySub[g] ?? bySub.other).push(s);
        }
        const filled = order.filter((g) => bySub[g].length > 0);
        // Single subgroup → just the lane header.
        if (filled.length <= 1) {
          return (
            <GridBlock
              key={lane}
              title={meta.label}
              color={meta.color}
              blurb={meta.blurb}
              spells={laneSpells}
            />
          );
        }
        return (
          <Stack key={lane} spacing={1.75}>
            <Box sx={{ px: 0.25 }}>
              <Typography
                variant="overline"
                sx={{ fontWeight: 900, color: meta.color, letterSpacing: 0.7 }}
              >
                {meta.label}
              </Typography>
              <Typography
                variant="caption"
                sx={{ display: "block", color: "text.disabled", fontWeight: 600 }}
              >
                {meta.blurb}
              </Typography>
            </Box>
            {filled.map((g) => (
              <GridBlock
                key={g}
                title={LANE_SUBGROUP_META[g].label}
                color={meta.color}
                spells={bySub[g]}
              />
            ))}
          </Stack>
        );
      })}
    </Stack>
  );
}

export function SpellGrid() {
  const { state, visibleSpells, dispatch } = useSpellbook();

  if (visibleSpells.length === 0) {
    return (
      <Box
        sx={{
          p: 3,
          textAlign: "center",
          borderRadius: 2,
          border: "1px dashed",
          borderColor: "divider",
          color: "text.secondary",
        }}
      >
        <Typography variant="body2" sx={{ mb: 1.25 }}>
          No spells match your filters.
        </Typography>
        <Button
          size="small"
          variant="outlined"
          onClick={() => dispatch({ type: "apply-preset", id: FOR_YOU_PRESET_ID })}
          sx={{ textTransform: "none", fontWeight: 700 }}
        >
          Try For you
        </Button>
      </Box>
    );
  }

  if (state.splitMode) {
    const always = visibleSpells.filter((s) => s.alwaysAvailable);
    const contextual = visibleSpells.filter((s) => !s.alwaysAvailable);
    return (
      <Stack spacing={2}>
        <GridBlock title="Always available" color="#64748b" spells={always} />
        <GridBlock title="Contextual" color="#94a3b8" spells={contextual} />
      </Stack>
    );
  }

  // Single-lane filter → still subgroup inside that lane.
  if (state.lane !== "all") {
    return <LaneView spells={visibleSpells} />;
  }

  return <LaneView spells={visibleSpells} />;
}
