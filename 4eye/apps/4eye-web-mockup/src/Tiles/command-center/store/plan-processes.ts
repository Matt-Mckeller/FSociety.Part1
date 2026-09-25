/**
 * Command Center — plan process entities.
 *
 * Strategic Focus active / next phases are ECS `process` entities seeded from
 * the shared Direction priority list and profile focus goal ids.
 */

import type { Entity, SymbolColor } from "@4eye/types";
import {
  PLAN_ACTIVE_FOCUS_GOAL_IDS,
  PLAN_ACTIVE_PHASE,
  PLAN_NEXT_FOCUS_GOAL_IDS,
  type PersonalPriority,
} from "@yen/content/character/priorities";

export type PlanPhase = "active" | "next";
export type ProcessKind = "life-code" | "focus-goal";

export interface ProcessMeta {
  planPhase: PlanPhase;
  processKind: ProcessKind;
  /** `pri-*` id or vision / ongoing goal id. */
  sourceId: string;
  code?: string;
  hint?: string;
  color?: SymbolColor;
  goalId?: string;
  sortOrder: number;
}

const now = Date.now();

function lifeCodeProcess(priority: PersonalPriority, phase: PlanPhase, sortOrder: number): Entity {
  return {
    id: `cc-process-${priority.id}`,
    slug: priority.id.replace(/^pri-/, ""),
    type: "process",
    name: priority.code,
    symbol: "Lightning",
    symbolColor: priority.color,
    traits: [
      { kind: "status", value: phase === "active" ? "active" : "planned" },
      { kind: "weight", value: phase === "active" ? 96 - sortOrder : 48 - sortOrder },
    ],
    meta: {
      planPhase: phase,
      processKind: "life-code",
      sourceId: priority.id,
      code: priority.code,
      hint: priority.hint,
      color: priority.color,
      sortOrder,
    } satisfies ProcessMeta,
    createdAt: now,
  };
}

function focusGoalProcess(goalId: string, phase: PlanPhase, sortOrder: number): Entity {
  return {
    id: `cc-process-goal-${goalId}`,
    slug: goalId,
    type: "process",
    name: goalId,
    symbol: "Star",
    symbolColor: "purple",
    traits: [
      { kind: "status", value: phase === "active" ? "active" : "planned" },
      { kind: "weight", value: phase === "active" ? 96 - sortOrder : 48 - sortOrder },
    ],
    meta: {
      planPhase: phase,
      processKind: "focus-goal",
      sourceId: goalId,
      goalId,
      sortOrder,
    } satisfies ProcessMeta,
    createdAt: now,
  };
}

export const planProcesses: Entity[] = [
  ...PLAN_ACTIVE_PHASE.map((p, i) => lifeCodeProcess(p, "active", i)),
  ...PLAN_ACTIVE_FOCUS_GOAL_IDS.map((id, i) =>
    focusGoalProcess(id, "active", PLAN_ACTIVE_PHASE.length + i),
  ),
  ...PLAN_NEXT_FOCUS_GOAL_IDS.map((id, i) => focusGoalProcess(id, "next", i)),
];

export function processMeta(entity: Entity): ProcessMeta | undefined {
  if (entity.type !== "process") return undefined;
  const meta = entity.meta as ProcessMeta | undefined;
  return meta?.planPhase ? meta : undefined;
}

export function planProcessesByPhase(entities: Entity[], phase: PlanPhase): Entity[] {
  return entities
    .filter((e) => processMeta(e)?.planPhase === phase)
    .sort((a, b) => (processMeta(a)?.sortOrder ?? 0) - (processMeta(b)?.sortOrder ?? 0));
}
