"use client";

/**
 * CommandCenterTile — the single Command Center surface.
 *
 * A fixed-height HUD dashboard: a brand-glyph view rail on the left, the
 * active sub-view filling the rest, and the shared Inspector mounted once.
 * Twelve views (Dashboard / Goals / Quests / Sprint / Priorities / Lenses /
 * Roadmap / Crew / My Queue / Compass / Docs / Guide) render the same planning
 * graph through the Entity-Tile language.
 *
 * The top bar carries two cross-view controls:
 *   • PerspectiveSwitcher — whose lens are we looking through?
 *   • EntityContextSwitcher — which entity's plan are we viewing?
 *
 * Self-wraps in {@link CommandCenterProvider} when used standalone; pass
 * `initialData` / `initialView` to drive it from Storybook or tests.
 */

import * as React from "react";
import { Box, Chip, Divider, Stack, Typography, alpha, useMediaQuery, useTheme } from "@mui/material";
import type { PlanningData } from "../../model";

import {
  CommandCenterProvider,
  useCommandCenter,
} from "./store/CommandCenterProvider";
import type { CommandView } from "./components/planning-glyphs";
import { ViewSwitcher } from "./components/ViewSwitcher";
import { Inspector } from "./components/Inspector";
import { GoalItemInspector } from "./components/GoalItemInspector";
import { PerspectiveSwitcher } from "./components/PerspectiveSwitcher";
import { EntityContextSwitcher } from "./components/EntityContextSwitcher";
import { DashboardView } from "./components/views/DashboardView";
import { QuestsView } from "./components/views/QuestsView";
import { SprintView } from "./components/views/SprintView";
import { PrioritiesView } from "./components/views/PrioritiesView";
import { RoadmapView } from "./components/views/RoadmapView";
import { CrewView } from "./components/views/CrewView";
import { QueueView } from "./components/views/QueueView";
import { CompassSection } from "./components/views/CompassSection";
import { DocsView } from "./components/views/DocsView";
import { InstructionsView } from "./components/views/InstructionsView";

// The four Compass children share one tabbed shell, so they all resolve to
// CompassSection (which reads activeView to pick the tab).
const VIEW_COMPONENT: Record<CommandView, React.ComponentType> = {
  dashboard: DashboardView,
  strategicFocus: CompassSection,
  swot: CompassSection,
  goals: CompassSection,
  lenses: CompassSection,
  quests: QuestsView,
  sprint: SprintView,
  priorities: PrioritiesView,
  roadmap: RoadmapView,
  crew: CrewView,
  queue: QueueView,
  docs: DocsView,
  instructions: InstructionsView,
};

const PERSPECTIVE_LABELS = {
  business: "Business",
  self: "Person",
  "self-to-others": "Person → Entity",
  "others-to-self": "Entity",
};

function CommandCenterSurface() {
  const theme = useTheme();
  const { state, setView, setPerspective } = useCommandCenter();
  const narrow = useMediaQuery(theme.breakpoints.down("tablet"));
  const ActiveView = VIEW_COMPONENT[state.activeView];

  const showContextBar = !narrow;

  return (
    <Stack
      sx={{
        flexDirection: narrow ? "column" : "row",
        height: "100%",
        minHeight: 0,
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <ViewSwitcher
        active={state.activeView}
        onChange={setView}
        orientation={narrow ? "bar" : "rail"}
      />

      <Stack sx={{ flex: 1, minWidth: 0, minHeight: 0 }}>
        {/* ── Cross-view context bar ── */}
        {showContextBar && (
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              gap: 1,
              px: 1.5,
              py: 0.6,
              borderBottom: "1px solid",
              borderColor: "divider",
              flexShrink: 0,
              bgcolor: alpha(theme.palette.background.paper, 0.6),
              flexWrap: "wrap",
            }}
          >
            {/* Viewing context label */}
            <Typography
              variant="caption"
              sx={{ color: "text.disabled", fontWeight: 700, letterSpacing: 0.3, flexShrink: 0 }}
            >
              View:
            </Typography>
            <EntityContextSwitcher />

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.25 }} />

            <Typography
              variant="caption"
              sx={{ color: "text.disabled", fontWeight: 700, letterSpacing: 0.3, flexShrink: 0 }}
            >
              Lens:
            </Typography>
            <PerspectiveSwitcher
              value={state.activePerspective}
              onChange={setPerspective}
            />

            {/* Active context pill */}
            {state.activeEntityContext && (
              <>
                <Box sx={{ flex: 1 }} />
                <Chip
                  size="small"
                  label={`${state.activeEntityContext.name} · ${PERSPECTIVE_LABELS[state.activePerspective]}`}
                  sx={{
                    height: 20,
                    fontSize: 10,
                    fontWeight: 800,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                    "& .MuiChip-label": { px: 1 },
                  }}
                />
              </>
            )}
          </Stack>
        )}

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            p: 1.5,
            overflowY: "auto",
          }}
        >
          <ActiveView />
        </Box>
      </Stack>

      <Inspector />
      <GoalItemInspector />
    </Stack>
  );
}

export interface CommandCenterTileProps {
  data?: PlanningData;
  initialView?: CommandView;
}

export function CommandCenterTile({
  data,
  initialView,
}: CommandCenterTileProps = {}) {
  return (
    <CommandCenterProvider initialData={data} initialView={initialView}>
      <CommandCenterSurface />
    </CommandCenterProvider>
  );
}

export default CommandCenterTile;
