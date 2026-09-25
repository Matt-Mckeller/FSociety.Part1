/**
 * Entity Tile — seed data.
 *
 * A tiny planning graph (a Storyline/project with two epics) used to exercise
 * the Entity → TileSpec → TileRenderer pipeline in Storybook. Built on the
 * shared ECS types so it mirrors real planning data.
 */

import type { Entity, GoalLink, Relationship } from "@4eye/types";
import type { PlanningData } from "../../../model";

const now = Date.now();

const project: Entity = {
  id: "ent_4eye",
  slug: "4eye",
  type: "storyline",
  name: "4eye AI Chat",
  symbol: "Star",
  symbolColor: "blue",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 92 },
    { kind: "depth", value: 6 },
    { kind: "goalDirected", outcome: "Ship a complete, perfect AI chat" },
  ],
  meta: { work: { rank: "project", category: "development" } },
  createdAt: now,
};

const epicChat: Entity = {
  id: "ent_epic_chat",
  slug: "epic-chat-core",
  type: "quest",
  name: "Chat Core",
  symbol: "Wave",
  traits: [
    { kind: "status", value: "active" },
    { kind: "weight", value: 80 },
    { kind: "estimate", points: 13 },
    { kind: "schedule", due: now + 1000 * 60 * 60 * 24 * 14 },
  ],
  meta: { work: { rank: "epic", category: "development" } },
  createdAt: now,
};

const epicPm: Entity = {
  id: "ent_epic_pm",
  slug: "epic-pm-in-chat",
  type: "quest",
  name: "PM in Chat",
  symbol: "Pipeline",
  traits: [
    { kind: "status", value: "planned" },
    { kind: "weight", value: 65 },
    { kind: "estimate", points: 8 },
  ],
  meta: { work: { rank: "epic", category: "planning" } },
  createdAt: now,
};

const relationships: Relationship[] = [
  {
    id: "rel_1",
    fromId: project.id,
    fromType: project.type,
    toId: epicChat.id,
    toType: epicChat.type,
    relationType: "epic-of",
    order: 1,
    createdAt: now,
  },
  {
    id: "rel_2",
    fromId: project.id,
    fromType: project.type,
    toId: epicPm.id,
    toType: epicPm.type,
    relationType: "epic-of",
    order: 2,
    createdAt: now,
  },
];

const goalLinks: GoalLink[] = [
  {
    id: "gl_1",
    goalId: "GOAL_PERFECT_CHAT",
    entityId: project.id,
    entityType: project.type,
    weight: 95,
    depth: 6,
    note: "Primary objective",
    createdAt: now,
  },
];

export const SEED: PlanningData = {
  entities: [project, epicChat, epicPm],
  relationships,
  goalLinks,
};

export const SEED_IDS = {
  project: project.id,
  epicChat: epicChat.id,
  epicPm: epicPm.id,
} as const;
