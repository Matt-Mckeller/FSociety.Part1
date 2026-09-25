/**
 * Planning — Zod schemas
 *
 * Runtime validation mirroring the planning TypeScript types. Critical for the
 * "generated" tile: AI-produced TileSpecs MUST be validated here before render
 * (they are untrusted input — data-only, never executed).
 */

import { z } from "zod";

// --- Traits ---------------------------------------------------------------

export const DepthTraitSchema = z.object({
  kind: z.literal("depth"),
  value: z.number().int().min(1).max(7),
});

export const WeightTraitSchema = z.object({
  kind: z.literal("weight"),
  value: z.number().min(0).max(100),
});

export const StatusTraitSchema = z.object({
  kind: z.literal("status"),
  value: z.enum([
    "idea",
    "planned",
    "active",
    "blocked",
    "review",
    "done",
    "archived",
  ]),
});

export const ScheduleTraitSchema = z.object({
  kind: z.literal("schedule"),
  start: z.number().optional(),
  due: z.number().optional(),
  completedAt: z.number().optional(),
});

export const EstimateTraitSchema = z.object({
  kind: z.literal("estimate"),
  points: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(5),
    z.literal(8),
    z.literal(13),
    z.literal(21),
  ]),
});

export const GoalDirectedTraitSchema = z.object({
  kind: z.literal("goalDirected"),
  outcome: z.string().optional(),
});

export const OwnerTraitSchema = z.object({
  kind: z.literal("owner"),
  ownerId: z.string(),
});

export const ProgressMilestoneSchema = z.object({
  at: z.number().min(0).max(100),
  label: z.string(),
  note: z.string().optional(),
});

export const ProgressTraitSchema = z.object({
  kind: z.literal("progress"),
  done: z.number().min(0).max(100),
  planned: z.number().min(0).max(100).optional(),
  milestones: z.array(ProgressMilestoneSchema).optional(),
});

export const TraitSchema = z.discriminatedUnion("kind", [
  DepthTraitSchema,
  WeightTraitSchema,
  StatusTraitSchema,
  ScheduleTraitSchema,
  EstimateTraitSchema,
  GoalDirectedTraitSchema,
  OwnerTraitSchema,
  ProgressTraitSchema,
]);

// --- Entity ---------------------------------------------------------------

export const ChangeEventSchema = z.object({
  at: z.number(),
  kind: z.string(),
  by: z.string().optional(),
  meta: z.record(z.unknown()).optional(),
});

export const EntitySchema = z.object({
  id: z.string(),
  slug: z.string(),
  type: z.string(),
  name: z.string(),
  symbol: z.string().optional(),
  symbolColor: z.string().optional(),
  traits: z.array(TraitSchema),
  history: z.array(ChangeEventSchema).optional(),
  meta: z.record(z.unknown()).optional(),
  createdAt: z.number(),
  updatedAt: z.number().optional(),
});

// --- Relationship & GoalLink ---------------------------------------------

export const RelationshipSchema = z.object({
  id: z.string(),
  fromId: z.string(),
  fromType: z.string(),
  toId: z.string(),
  toType: z.string(),
  relationType: z.string(),
  order: z.number().optional(),
  meta: z.record(z.unknown()).optional(),
  createdAt: z.number(),
});

export const GoalLinkSchema = z.object({
  id: z.string(),
  goalId: z.string(),
  entityId: z.string(),
  entityType: z.string(),
  weight: z.number().min(0).max(100),
  depth: z.number().int().min(1).max(7).optional(),
  note: z.string().optional(),
  createdAt: z.number(),
});

// --- TileSpec (validate AI-generated tiles here) -------------------------

export const TileSlotSchema = z.object({
  key: z.string(),
  label: z.string().optional(),
  value: z.union([z.string(), z.number(), z.boolean(), z.null()]).optional(),
  render: z
    .enum(["text", "badge", "meter", "dots", "date", "symbol", "link"])
    .optional(),
  refId: z.string().optional(),
});

export const TileActionSchema = z.object({
  id: z.string(),
  label: z.string(),
  intent: z.string(),
  symbol: z.string().optional(),
});

/** Recursive TileSpec (children are TileSpecs). */
export const TileSpecSchema: z.ZodType<unknown> = z.lazy(() =>
  z.object({
    type: z.string(),
    entityId: z.string(),
    entityType: z.string(),
    viewMode: z.enum(["pm", "narrative"]),
    title: z.string().optional(),
    symbol: z.string().optional(),
    symbolColor: z.string().optional(),
    layout: z.enum(["card", "row", "panel", "modal"]).optional(),
    slots: z.array(TileSlotSchema),
    actions: z.array(TileActionSchema).optional(),
    children: z.array(TileSpecSchema).optional(),
    generatedFrom: z.string().optional(),
    meta: z.record(z.unknown()).optional(),
  }),
);
