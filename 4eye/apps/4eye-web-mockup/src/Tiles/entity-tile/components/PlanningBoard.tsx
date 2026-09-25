"use client";

/**
 * PlanningBoard — the shared planning surface.
 *
 * Renders a planning graph (projects + their epics) through the Entity Tile
 * pipeline. This single component is the reuse point described in the Entity
 * System plan: the website Projects page, the in-app Planning tile, and the
 * AI Chat "Plan" view all mount THIS, differing only by their container.
 *
 *   PlanningStore → toTileJSON(entity) → TileSpec → <TileRenderer>
 */

import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import type { TileSpec, ViewMode } from "@4eye/types";

import { TileRenderer } from "../TileRenderer";
import { PlanningStore, toTileJSON } from "../../../model";
import { SEED } from "../store/seed-data";

export interface PlanningBoardProps {
  /** Data source. Defaults to the built-in seed graph. */
  store?: PlanningStore;
  /** PM vs narrative skin. */
  viewMode?: ViewMode;
  /** Relationship type that defines a project's children. */
  childRelation?: string;
  /** Entity types treated as top-level "projects". */
  rootTypes?: string[];
  title?: string;
  onAction?: (intent: string, spec: TileSpec) => void;
}

const DEFAULT_STORE = new PlanningStore(SEED);

export function PlanningBoard({
  store = DEFAULT_STORE,
  viewMode = "pm",
  childRelation = "epic-of",
  rootTypes = ["storyline", "legend", "campaign"],
  title = "Planning",
  onAction,
}: PlanningBoardProps) {
  const roots = React.useMemo(
    () => store.allEntities().filter((e) => rootTypes.includes(e.type)),
    [store, rootTypes],
  );

  const specs = React.useMemo<TileSpec[]>(
    () =>
      roots.map((root) => {
        const children = store
          .children(root.id, childRelation)
          .map((c) =>
            toTileJSON(c, {
              tileType: "summary",
              viewMode,
              goalLinks: store.goalLinksFor(c.id),
            }),
          );
        return toTileJSON(root, {
          tileType: "list",
          viewMode,
          goalLinks: store.goalLinksFor(root.id),
          children,
        });
      }),
    [roots, store, childRelation, viewMode],
  );

  return (
    <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 2, color: "text.primary" }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, color: "text.primary" }}>
        {title}
      </Typography>
      <Stack
        spacing={1.5}
        sx={{ flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start" }}
      >
        {specs.map((spec) => (
          <TileRenderer key={spec.entityId} spec={spec} onAction={onAction} />
        ))}
        {specs.length === 0 && (
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            No projects yet.
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

export default PlanningBoard;
