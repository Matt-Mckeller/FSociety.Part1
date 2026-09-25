"use client";

/**
 * Command Center — Sprint view.
 *
 * A rolling Now / Next / Later board (no fixed dates — solo-founder friendly).
 * Every leaf work item lands in a lane: by default derived from its status
 * (active → Now, planned/review → Next, idea → Later, done → hidden), with a
 * manual per-item override via the lane toggle. Each lane shows a capacity
 * meter summing Fibonacci estimate points.
 */

import * as React from "react";
import { Box, Chip, Stack, Typography, alpha, useTheme } from "@mui/material";
import type { Entity } from "@4eye/types";

import { useCommandCenter, type SprintLane } from "../../store/CommandCenterProvider";
import { EntityRow } from "../EntityRow";
import { LaneControl, statusOf, pointsOf } from "../EntityControls";
import { SprintGlyph } from "../planning-glyphs";
import { Panel, EmptyState } from "./shared";

const LANES: { id: SprintLane; label: string; hint: string }[] = [
  { id: "now", label: "Now", hint: "In flight" },
  { id: "next", label: "Next", hint: "Queued up" },
  { id: "later", label: "Later", hint: "Backlog" },
];

/** Soft per-lane capacity guidance (points). Over this = the meter warns. */
const LANE_CAPACITY: Record<SprintLane, number> = { now: 21, next: 34, later: 999 };

/** Default lane for an item from its status. */
function defaultLane(e: Entity): SprintLane | null {
  switch (statusOf(e)) {
    case "active":
      return "now";
    case "planned":
    case "review":
    case "blocked":
      return "next";
    case "idea":
      return "later";
    default:
      return null; // done / archived → not on the board
  }
}

function CapacityMeter({ used, cap }: { used: number; cap: number }) {
  const theme = useTheme();
  const bounded = cap >= 999;
  const over = !bounded && used > cap;
  const pct = bounded ? Math.min(100, used * 4) : Math.min(100, (used / cap) * 100);
  const color = over ? theme.palette.error.main : theme.palette.primary.main;
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75, flexShrink: 0 }}>
      <Box
        sx={{
          width: 60,
          height: 6,
          borderRadius: 3,
          bgcolor: alpha(color, 0.16),
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${pct}%`,
            height: "100%",
            borderRadius: 3,
            background: `linear-gradient(90deg, ${alpha(color, 0.7)}, ${color})`,
            transition: "width 200ms ease",
          }}
        />
      </Box>
      <Typography variant="caption" sx={{ fontWeight: 700, color }}>
        {used}
        {!bounded ? `/${cap}` : ""}p
      </Typography>
    </Stack>
  );
}

export function SprintView() {
  const { store, state } = useCommandCenter();

  // Sprint candidates = leaf work items (no children) excluding the legend.
  const candidates = React.useMemo(
    () =>
      store
        .allEntities()
        .filter(
          (e) => e.type !== "legend" && store.edgesFrom(e.id).length === 0,
        ),
    [store],
  );

  // Resolve each candidate's effective lane (override → default).
  const byLane = React.useMemo(() => {
    const map: Record<SprintLane, Entity[]> = { now: [], next: [], later: [] };
    for (const e of candidates) {
      const lane = state.sprintLanes[e.id] ?? defaultLane(e);
      if (lane) map[lane].push(e);
    }
    return map;
  }, [candidates, state.sprintLanes]);

  return (
    <Box
      sx={{
        display: "grid",
        gap: 1.5,
        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
        height: "100%",
        minHeight: 0,
        alignItems: "stretch",
      }}
    >
      {LANES.map((lane) => {
        const items = byLane[lane.id];
        const used = items.reduce((sum, e) => sum + (pointsOf(e) ?? 0), 0);
        return (
          <Panel
            key={lane.id}
            title={lane.label}
            fill
            glyph={
              <Box sx={{ color: "primary.main", display: "flex" }}>
                <SprintGlyph size={18} />
              </Box>
            }
            action={<CapacityMeter used={used} cap={LANE_CAPACITY[lane.id]} />}
          >
            <Stack spacing={0.75}>
              <Typography variant="caption" sx={{ color: "text.secondary", mb: 0.25 }}>
                {lane.hint} · {items.length} item{items.length === 1 ? "" : "s"}
              </Typography>
              {items.length > 0 ? (
                items
                  .slice()
                  .sort((a, b) => (pointsOf(b) ?? 0) - (pointsOf(a) ?? 0))
                  .map((e) => (
                    <EntityRow
                      key={e.id}
                      entity={e}
                      showSummary={false}
                      trailing={<LaneControl entity={e} lane={lane.id} />}
                    />
                  ))
              ) : (
                <EmptyState>Nothing here yet.</EmptyState>
              )}
            </Stack>
          </Panel>
        );
      })}
    </Box>
  );
}
