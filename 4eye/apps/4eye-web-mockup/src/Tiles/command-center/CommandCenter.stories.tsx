"use client";

/**
 * Command Center — interactive Storybook.
 *
 * The full Command Center tile and each of its seven sub-views, driven by the
 * re-authored ECS planning fixtures:
 *   Dashboard · Quests · Sprint · Priorities · Roadmap · Compass · Docs
 *
 * Variants cover the default tile, each view in isolation, the PM vs narrative
 * label skin, and an empty graph. White background per project conventions.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";

import { CommandCenterTile } from "./CommandCenterTile";
import { CommandCenterProvider } from "./store/CommandCenterProvider";
import { COMMAND_CENTER_SEED } from "./store/seed-data";
import type { PlanningData } from "../../model";
import { DashboardView } from "./components/views/DashboardView";
import { QuestsView } from "./components/views/QuestsView";
import { SprintView } from "./components/views/SprintView";
import { PrioritiesView } from "./components/views/PrioritiesView";
import { RoadmapView } from "./components/views/RoadmapView";
import { RoadmapSpine } from "./components/views/roadmap/RoadmapSpine";
import { RoadmapBranches } from "./components/views/roadmap/RoadmapBranches";
import { RoadmapStreams } from "./components/views/roadmap/RoadmapStreams";
import { RoadmapVariableMap } from "./components/views/roadmap/RoadmapVariableMap";
import { CrewView } from "./components/views/CrewView";
import { QueueView } from "./components/views/QueueView";
import { StrategicFocusView } from "./components/views/StrategicFocusView";
import { SwotView } from "./components/views/SwotView";
import { CompassSection } from "./components/views/CompassSection";
import { DocsView } from "./components/views/DocsView";
import { Inspector } from "./components/Inspector";

const meta: Meta<typeof CommandCenterTile> = {
  title: "Command Center/Command Center",
  component: CommandCenterTile,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof CommandCenterTile>;

/** A tall frame so the fixed-height HUD tile has room to breathe. */
const Frame = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ height: "100vh", p: 2, bgcolor: "#fff", boxSizing: "border-box" }}>
    {children}
  </Box>
);

/** Render a single view inside the provider (so it has the graph + Inspector). */
function ViewStory({
  View,
  data = COMMAND_CENTER_SEED,
}: {
  View: React.ComponentType;
  data?: PlanningData;
}) {
  return (
    <CommandCenterProvider initialData={data}>
      <Box sx={{ height: "100%", overflowY: "auto", p: 1 }}>
        <View />
        <Inspector />
      </Box>
    </CommandCenterProvider>
  );
}

const EMPTY: PlanningData = { entities: [], relationships: [], goalLinks: [] };

export const Default: Story = {
  render: () => (
    <Frame>
      <CommandCenterTile />
    </Frame>
  ),
};

export const Dashboard: Story = {
  render: () => (
    <Frame>
      <ViewStory View={DashboardView} />
    </Frame>
  ),
};

export const Quests: Story = {
  render: () => (
    <Frame>
      <ViewStory View={QuestsView} />
    </Frame>
  ),
};

export const Sprint: Story = {
  render: () => (
    <Frame>
      <ViewStory View={SprintView} />
    </Frame>
  ),
};

export const Priorities: Story = {
  render: () => (
    <Frame>
      <ViewStory View={PrioritiesView} />
    </Frame>
  ),
};

export const Roadmap: Story = {
  render: () => (
    <Frame>
      <ViewStory View={RoadmapView} />
    </Frame>
  ),
};

export const RoadmapSpinePerspective: Story = {
  name: "Roadmap · Spine",
  render: () => (
    <Frame>
      <ViewStory View={RoadmapSpine} />
    </Frame>
  ),
};

export const RoadmapBranchesPerspective: Story = {
  name: "Roadmap · Branches",
  render: () => (
    <Frame>
      <ViewStory View={RoadmapBranches} />
    </Frame>
  ),
};

export const RoadmapStreamsPerspective: Story = {
  name: "Roadmap · Streams",
  render: () => (
    <Frame>
      <ViewStory View={RoadmapStreams} />
    </Frame>
  ),
};

export const RoadmapVariableMapPerspective: Story = {
  name: "Roadmap · Variable Map",
  render: () => (
    <Frame>
      <ViewStory View={RoadmapVariableMap} />
    </Frame>
  ),
};

/** All four perspectives stacked for side-by-side comparison ("pick the perfect one"). */
export const RoadmapPerspectives: Story = {
  render: () => (
    <Box sx={{ p: 2, bgcolor: "#fff" }}>
      <CommandCenterProvider initialData={COMMAND_CENTER_SEED}>
        <Box sx={{ display: "grid", gap: 2 }}>
          {[RoadmapSpine, RoadmapBranches, RoadmapStreams, RoadmapVariableMap].map(
            (View, i) => (
              <Box key={i} sx={{ height: 460 }}>
                <View />
              </Box>
            ),
          )}
          <Inspector />
        </Box>
      </CommandCenterProvider>
    </Box>
  ),
};

export const Crew: Story = {
  render: () => (
    <Frame>
      <ViewStory View={CrewView} />
    </Frame>
  ),
};

export const Queue: Story = {
  render: () => (
    <Frame>
      <ViewStory View={QueueView} />
    </Frame>
  ),
};

export const Compass: Story = {
  render: () => (
    <Frame>
      <ViewStory View={CompassSection} />
    </Frame>
  ),
};

export const StrategicFocus: Story = {
  render: () => (
    <Frame>
      <ViewStory View={StrategicFocusView} />
    </Frame>
  ),
};

export const Swot: Story = {
  render: () => (
    <Frame>
      <ViewStory View={SwotView} />
    </Frame>
  ),
};

export const Docs: Story = {
  render: () => (
    <Frame>
      <ViewStory View={DocsView} />
    </Frame>
  ),
};

export const QuestsEmpty: Story = {
  render: () => (
    <Frame>
      <ViewStory View={QuestsView} data={EMPTY} />
    </Frame>
  ),
};

export const StartOnQuests: Story = {
  render: () => (
    <Frame>
      <CommandCenterTile initialView="quests" />
    </Frame>
  ),
};
