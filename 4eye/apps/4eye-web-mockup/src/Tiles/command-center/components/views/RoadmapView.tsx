"use client";

/**
 * Command Center — Roadmap view.
 *
 * A committed trunk that forks into four destiny branches (A/B/C/D, ranked by
 * desirability). The same plan is viewable through several perspectives, chosen
 * with an in-panel switcher:
 *   Spine (single line) · Branches (tree) · Streams (swimlanes) · Variable Map (lens)
 *
 * Read-only display; content lives in `strategy-data.ts` (ROADMAP_PLAN).
 */

import * as React from "react";
import { Box, Stack, Typography, alpha, useTheme } from "@mui/material";

import { RoadmapSpine } from "./roadmap/RoadmapSpine";
import { RoadmapBranches } from "./roadmap/RoadmapBranches";
import { RoadmapStreams } from "./roadmap/RoadmapStreams";
import { RoadmapVariableMap } from "./roadmap/RoadmapVariableMap";

type Perspective = "spine" | "branches" | "streams" | "map";

const PERSPECTIVES: { id: Perspective; label: string }[] = [
  { id: "spine", label: "Spine" },
  { id: "branches", label: "Branches" },
  { id: "streams", label: "Streams" },
  { id: "map", label: "Variable Map" },
];

const PERSPECTIVE_COMPONENT: Record<Perspective, React.ComponentType> = {
  spine: RoadmapSpine,
  branches: RoadmapBranches,
  streams: RoadmapStreams,
  map: RoadmapVariableMap,
};

export function RoadmapView() {
  const theme = useTheme();
  const accent = theme.palette.primary.main;
  const [perspective, setPerspective] = React.useState<Perspective>("branches");
  const Active = PERSPECTIVE_COMPONENT[perspective];

  return (
    <Stack sx={{ height: "100%", minHeight: 0, gap: 1 }}>
      {/* Perspective switcher */}
      <Stack
        role="tablist"
        aria-label="Roadmap perspective"
        sx={{ flexDirection: "row", alignItems: "center", gap: 0.75, flexShrink: 0, flexWrap: "wrap" }}
      >
        <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", mr: 0.5 }}>
          Perspective
        </Typography>
        {PERSPECTIVES.map((p) => {
          const active = p.id === perspective;
          return (
            <Box
              key={p.id}
              role="tab"
              aria-selected={active}
              tabIndex={0}
              onClick={() => setPerspective(p.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setPerspective(p.id);
                }
              }}
              sx={{
                px: 1.25,
                py: 0.5,
                borderRadius: 1.5,
                fontSize: 12,
                fontWeight: active ? 800 : 600,
                cursor: "pointer",
                userSelect: "none",
                color: active ? accent : alpha(theme.palette.text.primary, 0.62),
                bgcolor: active ? alpha(accent, 0.12) : "transparent",
                border: "1px solid",
                borderColor: active ? alpha(accent, 0.32) : "divider",
                transition: "all 140ms ease",
                "&:hover": { bgcolor: active ? alpha(accent, 0.16) : alpha(accent, 0.06) },
                "&:focus-visible": { outline: `2px solid ${alpha(accent, 0.6)}`, outlineOffset: 1 },
              }}
            >
              {p.label}
            </Box>
          );
        })}
      </Stack>

      {/* Active perspective (each brings its own Panel) */}
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <Active />
      </Box>
    </Stack>
  );
}
