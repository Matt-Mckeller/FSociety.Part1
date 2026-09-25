"use client";

/**
 * GoalsShowcase — the three signature goals as stacked, animated hero rows.
 *   1 · 🌍.Save()   spinning Earth flanked by infinities
 *   2 · value       simple money → coin stack → crown at rest; the full
 *                   "everything worth valuing" grid merges into view on click
 *   3 · /👑         the Command King liquid crown
 */

import { Box, Typography } from "@mui/material";
import { GOALS, type VisionGoal } from "./goalsData";
import { GoalRow } from "./GoalRow";
import { SpinningGlobe } from "./SpinningGlobe";
import { InfinityGlyph } from "./InfinityGlyph";
import { ValueEssence } from "./ValueEssence";
import { ValueMerge } from "./ValueMerge";
import { TerminalMark } from "./TerminalMark";
import { LiquidCrown } from "./LiquidCrown";

function SaveArt() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: { zero: 1, tablet: 2 } }}>
      <InfinityGlyph width={52} />
      <SpinningGlobe size={96} />
      <InfinityGlyph width={52} />
    </Box>
  );
}

function KingArt() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: { zero: 1.5, tablet: 3 }, py: 1 }}>
      <TerminalMark />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
        <LiquidCrown size={132} hero followCursor />
        <Typography sx={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.28em", color: "#ff8aa0", textTransform: "uppercase" }}>
          Win. Collect. Achieve.
        </Typography>
      </Box>
    </Box>
  );
}

/**
 * How the goal rows are arranged.
 *
 * `stack` is the original: full-width rows, one per goal, most room for the
 * bespoke art. It is also the tallest, which is why the others exist.
 *
 *   stack        full-width rows — most art, most height
 *   row          side-by-side cards — scannable, art shrinks
 *   alternating  rows that alternate which side the art sits on
 *   centred      narrow centred column — calmest, best when goals are the
 *                only thing on the page
 */
export type GoalsLayout = "stack" | "row" | "alternating" | "centred";
export const GOALS_LAYOUTS: GoalsLayout[] = ["stack", "row", "alternating", "centred"];

export interface GoalsShowcaseProps {
  /** Defaults to the character's three signature goals. */
  goals?: VisionGoal[];
  /**
   * `paper` flattens the background to the card surface and strengthens the
   * border, for contexts (the parent facet) where the accent wash would compete
   * with the goal art rather than support it.
   */
  variant?: "default" | "paper";
  layout?: GoalsLayout;
}

/** Art belongs to specific goal ids; anything else renders without it. */
function artFor(id: string) {
  if (id === "save") return <SaveArt />;
  if (id === "value") return <ValueEssence />;
  if (id === "king") return <KingArt />;
  return null;
}

export function GoalsShowcase({
  goals = GOALS,
  variant = "default",
  layout = "stack",
}: GoalsShowcaseProps = {}) {
  const paper = variant === "paper";

  const paperSx = paper
    ? {
        bgcolor: "background.paper",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.03)",
        p: 1.75,
      }
    : {};

  const rows = goals.map((goal, i) => (
    <GoalRow
      key={goal.id}
      goal={goal}
      index={i}
      mirrored={layout === "alternating" && i % 2 === 1}
      expandedContent={goal.id === "value" ? (open) => <ValueMerge open={open} /> : undefined}
    >
      {artFor(goal.id)}
    </GoalRow>
  ));

  if (layout === "row") {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { zero: "1fr", tablet: `repeat(${Math.min(goals.length, 3)}, 1fr)` },
          gap: 1.75,
          alignItems: "stretch",
          ...paperSx,
        }}
      >
        {rows}
      </Box>
    );
  }

  if (layout === "centred") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", ...paperSx }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.75, width: "100%", maxWidth: 620 }}>
          {rows}
        </Box>
      </Box>
    );
  }

  // stack and alternating share the column; `alternating` mirrors odd rows.
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.75, ...paperSx }}>
      {rows}
    </Box>
  );
}
