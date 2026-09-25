"use client";

/**
 * Focused goals — the three goal ids the profile holds in focus.
 *
 * Resolves catalog ids (vision / ongoing) plus the live unicorn string.
 */

import {
  ONGOING_GOALS,
  VISION_GOALS,
  type VisionGoal,
} from "@4eye/web/Tiles/integration-layers/goals/goalsData";
import { CURRENT_GOAL_SEED } from "../model/today";

const CATALOG = new Map<string, VisionGoal>(
  [...VISION_GOALS, ...ONGOING_GOALS].map((g) => [g.id, g]),
);

export interface FocusedGoalView {
  id: string;
  label: string;
  accent: string;
  accent2?: string;
  visionGoal?: VisionGoal;
}

export function resolveFocusedGoal(id: string, currentGoal: string): FocusedGoalView {
  if (id === "unicorn") {
    return {
      id,
      label: currentGoal || CURRENT_GOAL_SEED,
      accent: "#a78bfa",
      accent2: "#c4b5fd",
    };
  }
  const visionGoal = CATALOG.get(id);
  if (visionGoal) {
    return {
      id,
      label: visionGoal.targetPlain,
      accent: visionGoal.accent,
      accent2: visionGoal.accent2,
      visionGoal,
    };
  }
  return { id, label: id, accent: "#64748b" };
}

export function resolveFocusedGoals(ids: readonly string[], currentGoal: string): FocusedGoalView[] {
  return ids.slice(0, 3).map((id) => resolveFocusedGoal(id, currentGoal));
}
