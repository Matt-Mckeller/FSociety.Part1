"use client";

/**
 * PlanningViews — the PM-in-chat surface.
 *
 * A view-switcher over the shared planning graph (from {@link PlanningProvider}):
 *   • Board      — projects with nested epics (delivery view)
 *   • Sprint     — all work items grouped into status columns
 *   • Priorities — flat list of work items, strongest weight first
 *
 * Every view renders through the same Entity Tile pipeline
 * (toTileJSON → TileRenderer), so the visual language is identical across
 * the website Projects page, the app Planning tile, and the AI Chat.
 */

import * as React from "react";
import { Box, Stack, ToggleButton, ToggleButtonGroup, Typography, alpha } from "@mui/material";
import { getTrait, type Entity, type StatusTrait, type ViewMode } from "@4eye/types";

import { TileRenderer } from "../TileRenderer";
import { toTileJSON } from "../../../model";
import { usePlanningColors } from "./slot-visuals";
import { usePlanning } from "../store/PlanningProvider";
import { AddChildControl, ReorderControl, StatusControl, WeightControl } from "./PlanningControls";

type PlanningViewKind = "board" | "sprint" | "priorities";

const STATUS_ORDER: StatusTrait["value"][] = [
  "idea",
  "planned",
  "active",
  "blocked",
  "review",
  "done",
];

const STATUS_LABEL: Record<string, string> = {
  idea: "Idea",
  planned: "Planned",
  active: "Active",
  blocked: "Blocked",
  review: "Review",
  done: "Done",
  archived: "Archived",
};

export interface PlanningViewsProps {
  viewMode?: ViewMode;
  /** Entity types treated as top-level "projects". */
  rootTypes?: string[];
  /** Relationship type that defines a project's children. */
  childRelation?: string;
  /** Entity type created when adding a child to a project. */
  childType?: string;
  title?: string;
}

export function PlanningViews({
  viewMode = "pm",
  rootTypes = ["storyline", "legend", "campaign"],
  childRelation = "epic-of",
  childType = "epic",
  title = "Plan",
}: PlanningViewsProps) {
  const { store } = usePlanning();
  const [view, setView] = React.useState<PlanningViewKind>("board");

  const roots = React.useMemo(
    () => store.allEntities().filter((e) => rootTypes.includes(e.type)),
    [store, rootTypes],
  );

  /** Every non-root work item (the things that move through a sprint). */
  const workItems = React.useMemo(
    () => store.allEntities().filter((e) => !rootTypes.includes(e.type)),
    [store, rootTypes],
  );

  return (
    <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 2, color: "text.primary" }}>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1.5,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary" }}>
          {title}
        </Typography>
        <ToggleButtonGroup
          size="small"
          exclusive
          color="primary"
          value={view}
          onChange={(_, v: PlanningViewKind | null) => v && setView(v)}
          sx={{
            "& .MuiToggleButton-root": {
              textTransform: "none",
              fontWeight: 700,
              px: 1.25,
              borderColor: "divider",
            },
          }}
        >
          <ToggleButton value="board">Board</ToggleButton>
          <ToggleButton value="sprint">Sprint</ToggleButton>
          <ToggleButton value="priorities">Priorities</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {view === "board" && (
        <BoardView
          roots={roots}
          childRelation={childRelation}
          childType={childType}
          viewMode={viewMode}
        />
      )}
      {view === "sprint" && <SprintView items={workItems} viewMode={viewMode} />}
      {view === "priorities" && (
        <PrioritiesView items={workItems} viewMode={viewMode} />
      )}
    </Box>
  );
}

/* ------------------------------------------------------------------ Board */

function BoardView({
  roots,
  childRelation,
  childType,
  viewMode,
}: {
  roots: Entity[];
  childRelation: string;
  childType: string;
  viewMode: ViewMode;
}) {
  const { store } = usePlanning();
  return (
    <Stack sx={{ flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", gap: 1.5 }}>
      {roots.map((root) => {
        const children = store.children(root.id, childRelation);
        const headerSpec = toTileJSON(root, {
          tileType: "list",
          viewMode,
          goalLinks: store.goalLinksFor(root.id),
          children: [],
        });
        return (
          <Box key={root.id} sx={{ minWidth: 260 }}>
            <TileRenderer spec={headerSpec} />
            <Stack spacing={0.75} sx={{ mt: 0.75 }}>
              {children.map((c, i) => (
                <Stack
                  key={c.id}
                  sx={{ flexDirection: "row", alignItems: "center", gap: 0.5 }}
                >
                  <ReorderControl
                    parentId={root.id}
                    childId={c.id}
                    relationType={childRelation}
                    isFirst={i === 0}
                    isLast={i === children.length - 1}
                  />
                  <Box sx={{ flex: 1 }}>
                    <TileRenderer
                      spec={toTileJSON(c, {
                        tileType: "summary",
                        viewMode,
                        goalLinks: store.goalLinksFor(c.id),
                      })}
                    />
                  </Box>
                </Stack>
              ))}
              {children.length === 0 && <Empty label="No epics yet." />}
            </Stack>
            <Box sx={{ mt: 0.75, pl: 0.5 }}>
              <AddChildControl
                parentId={root.id}
                relationType={childRelation}
                childType={childType}
              />
            </Box>
          </Box>
        );
      })}
      {roots.length === 0 && <Empty label="No projects yet." />}
    </Stack>
  );
}

/* ----------------------------------------------------------------- Sprint */

function statusOf(e: Entity): StatusTrait["value"] {
  return getTrait(e.traits, "status")?.value ?? "idea";
}

function SprintView({ items, viewMode }: { items: Entity[]; viewMode: ViewMode }) {
  const { store } = usePlanning();
  const colors = usePlanningColors();
  const columns = STATUS_ORDER.map((status) => ({
    status,
    items: items.filter((e) => statusOf(e) === status),
  })).filter((c) => c.items.length > 0);

  if (columns.length === 0) return <Empty label="No work items yet." />;

  return (
    <Stack sx={{ flexDirection: "row", alignItems: "flex-start", gap: 1.5, overflowX: "auto" }}>
      {columns.map((col) => (
        <Box
          key={col.status}
          sx={{
            minWidth: 220,
            flexShrink: 0,
            p: 1,
            borderRadius: 2,
            bgcolor: alpha(colors.status(col.status), 0.05),
            border: "1px solid",
            borderColor: alpha(colors.status(col.status), 0.18),
          }}
        >
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1, mb: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: colors.status(col.status),
              }}
            />
            <Typography variant="overline" sx={{ fontWeight: 800, color: "text.secondary" }}>
              {STATUS_LABEL[col.status]} · {col.items.length}
            </Typography>
          </Stack>
          <Stack spacing={1}>
            {col.items.map((e) => (
              <Box key={e.id}>
                <TileRenderer
                  spec={toTileJSON(e, {
                    tileType: "summary",
                    viewMode,
                    goalLinks: store.goalLinksFor(e.id),
                  })}
                />
                <Box sx={{ mt: 0.5, display: "flex", justifyContent: "flex-end" }}>
                  <StatusControl entity={e} />
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}

/* ------------------------------------------------------------- Priorities */

function PrioritiesView({ items, viewMode }: { items: Entity[]; viewMode: ViewMode }) {
  const { store } = usePlanning();
  const ranked = [...items].sort(
    (a, b) =>
      (getTrait(b.traits, "weight")?.value ?? 0) -
      (getTrait(a.traits, "weight")?.value ?? 0),
  );
  if (ranked.length === 0) return <Empty label="No work items yet." />;
  return (
    <Stack spacing={1}>
      {ranked.map((e, i) => (
        <Stack key={e.id} sx={{ flexDirection: "row", alignItems: "center", gap: 1.5 }}>
          <Typography
            variant="caption"
            sx={{ fontWeight: 800, color: "text.secondary", width: 20, textAlign: "right" }}
          >
            {i + 1}
          </Typography>
          <Box sx={{ flex: 1 }}>
            <TileRenderer
              spec={toTileJSON(e, {
                tileType: "metric",
                viewMode,
                goalLinks: store.goalLinksFor(e.id),
              })}
            />
          </Box>
          <WeightControl entity={e} />
        </Stack>
      ))}
    </Stack>
  );
}

/* ------------------------------------------------------------------ utils */

function Empty({ label }: { label: string }) {
  return (
    <Typography variant="caption" sx={{ color: "text.secondary" }}>
      {label}
    </Typography>
  );
}

export default PlanningViews;
