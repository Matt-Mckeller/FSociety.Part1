/**
 * Shared planning model — Entity → TileSpec serializer.
 *
 *   Entity (+traits) → toTileJSON(entity, opts) → TileSpec (pure JSON)
 *
 * The TileSpec is the data contract consumed by <TileRenderer>. This keeps the
 * "what to show" decision as serializable data (storable, server-sendable,
 * AI-generatable) and out of React. No display logic lives here.
 */

import type {
  Entity,
  GoalLink,
  TileSlot,
  TileSpec,
  TileType,
  ViewMode,
  WorkPayload,
} from "@4eye/types";
import { getTrait, rankLabel } from "@4eye/types";

export interface ToTileOptions {
  viewMode?: ViewMode;
  tileType?: TileType;
  /** Goal links to summarize as slots (already filtered for this entity). */
  goalLinks?: GoalLink[];
  /** Child specs for list tiles. */
  children?: TileSpec[];
}

/** Build the metric slots common to most planning entities (status/weight/depth/estimate). */
function metricSlots(entity: Entity): TileSlot[] {
  const slots: TileSlot[] = [];

  const status = getTrait(entity.traits, "status");
  if (status) {
    slots.push({ key: "status", label: "Status", value: status.value, render: "badge" });
  }

  const weight = getTrait(entity.traits, "weight");
  if (weight) {
    slots.push({ key: "weight", label: "Weight", value: weight.value, render: "meter" });
  }

  const depth = getTrait(entity.traits, "depth");
  if (depth) {
    slots.push({ key: "depth", label: "Depth", value: depth.value, render: "dots" });
  }

  const estimate = getTrait(entity.traits, "estimate");
  if (estimate) {
    slots.push({ key: "estimate", label: "Points", value: estimate.points, render: "badge" });
  }

  const schedule = getTrait(entity.traits, "schedule");
  if (schedule?.due) {
    slots.push({ key: "due", label: "Due", value: schedule.due, render: "date" });
  }

  return slots;
}

/** Goal-link slots (importance toward goals). */
function goalSlots(goalLinks: GoalLink[]): TileSlot[] {
  return goalLinks.map((g) => ({
    key: `goal:${g.goalId}`,
    label: "Goal",
    value: g.weight,
    render: "meter" as const,
    refId: g.goalId,
  }));
}

/**
 * Serialize an entity into a TileSpec.
 */
export function toTileJSON(entity: Entity, opts: ToTileOptions = {}): TileSpec {
  const viewMode: ViewMode = opts.viewMode ?? "pm";
  const type: TileType = opts.tileType ?? "summary";

  // Title respects the narrative skin for work entities.
  const work = entity.meta?.work as WorkPayload | undefined;
  const title =
    work && viewMode === "narrative"
      ? `${rankLabel(work.rank, viewMode)} · ${entity.name}`
      : entity.name;

  const slots: TileSlot[] = [...metricSlots(entity), ...goalSlots(opts.goalLinks ?? [])];

  return {
    type,
    entityId: entity.id,
    entityType: entity.type,
    viewMode,
    title,
    symbol: entity.symbol,
    symbolColor: entity.symbolColor,
    layout: type === "detail" ? "modal" : type === "list" ? "panel" : "card",
    slots,
    actions: [{ id: "inspect", label: "Inspect", intent: "inspect", symbol: entity.symbol }],
    children: opts.children,
  };
}
