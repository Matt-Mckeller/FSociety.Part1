"use client";

/**
 * Entity Tile — interactive Storybook.
 *
 * Demonstrates the Entity System pipeline:
 *   Entity (+traits) → toTileJSON(entity, viewMode) → TileSpec → <TileRenderer>
 *
 * Variants:
 *   - Summary:        compact HUD card.
 *   - Detail:         Inspector/Focus body.
 *   - Metric:         metrics-only strip.
 *   - ListWithEpics:  a project with child epics (Epics-per-Entity).
 *   - NarrativeSkin:  same data under ViewMode "narrative".
 *   - GeneratedTile:  data-only AI-generated spec (provenance shown).
 *   - ProjectsBoard:  the website Projects page / app Planning tile surface.
 *
 * White background per project Storybook conventions.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import { TileRenderer } from "./TileRenderer";
import { SEED, SEED_IDS } from "./store/seed-data";
import { PlanningBoard } from "./components/PlanningBoard";
import { PlanningProvider, PlanningViews } from "./index";
import { PlanningStore, toTileJSON } from "../../model";
import type { TileSpec, ViewMode } from "@4eye/types";

const WHITE_BG = {
  backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
} as const;

const store = new PlanningStore(SEED);

function spec(
  entityId: string,
  tileType: TileSpec["type"],
  viewMode: ViewMode = "pm",
): TileSpec {
  const entity = store.getEntity(entityId)!;
  return toTileJSON(entity, {
    tileType,
    viewMode,
    goalLinks: store.goalLinksFor(entityId),
  });
}

function listSpec(viewMode: ViewMode = "pm"): TileSpec {
  const children = store
    .children(SEED_IDS.project, "epic-of")
    .map((e) => toTileJSON(e, { tileType: "summary", viewMode, goalLinks: store.goalLinksFor(e.id) }));
  const project = store.getEntity(SEED_IDS.project)!;
  return toTileJSON(project, { tileType: "list", viewMode, goalLinks: store.goalLinksFor(project.id), children });
}

const meta: Meta = {
  title: "Planning/Entity Tile",
  parameters: { layout: "padded", ...WHITE_BG },
};
export default meta;
type Story = StoryObj;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ p: 2, bgcolor: "#fff", display: "inline-block" }}>{children}</Box>
);

export const Summary: Story = {
  render: () => (
    <Frame>
      <TileRenderer spec={spec(SEED_IDS.project, "summary")} />
    </Frame>
  ),
};

export const Detail: Story = {
  render: () => (
    <Frame>
      <TileRenderer spec={spec(SEED_IDS.project, "detail")} />
    </Frame>
  ),
};

export const Metric: Story = {
  render: () => (
    <Frame>
      <TileRenderer spec={spec(SEED_IDS.epicChat, "metric")} />
    </Frame>
  ),
};

export const ListWithEpics: Story = {
  render: () => (
    <Frame>
      <TileRenderer spec={listSpec("pm")} />
    </Frame>
  ),
};

export const NarrativeSkin: Story = {
  render: () => (
    <Frame>
      <Stack spacing={2}>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          ViewMode "narrative" — same data, narrative labels.
        </Typography>
        <TileRenderer spec={listSpec("narrative")} />
      </Stack>
    </Frame>
  ),
};

export const GeneratedTile: Story = {
  render: () => {
    const generated: TileSpec = {
      ...spec(SEED_IDS.epicPm, "generated"),
      type: "generated",
      generatedFrom: "show PM-in-chat status and importance",
    };
    return (
      <Frame>
        <TileRenderer spec={generated} />
      </Frame>
    );
  },
};

export const ProjectsBoard: Story = {
  render: () => (
    <Frame>
      <Stack spacing={1.5}>
        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
          Projects — shared by website page &amp; app Planning tile
        </Typography>
        <Stack spacing={1.5} sx={{ flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start" }}>
          {store.allEntities().map((e) => (
            <TileRenderer
              key={e.id}
              spec={toTileJSON(e, { tileType: "summary", goalLinks: store.goalLinksFor(e.id) })}
            />
          ))}
        </Stack>
      </Stack>
    </Frame>
  ),
};

export const PlanningBoardSurface: Story = {
  name: "Planning Board (shared surface)",
  render: () => (
    <Frame>
      <PlanningBoard title="Plan" />
    </Frame>
  ),
};

export const PlanningBoardNarrative: Story = {
  name: "Planning Board · narrative",
  render: () => (
    <Frame>
      <PlanningBoard title="Plan" viewMode="narrative" />
    </Frame>
  ),
};

export const PlanningViewsPM: Story = {
  name: "Planning Views (PM in chat)",
  render: () => (
    <Frame>
      <PlanningProvider>
        <PlanningViews title="Plan" />
      </PlanningProvider>
    </Frame>
  ),
};
