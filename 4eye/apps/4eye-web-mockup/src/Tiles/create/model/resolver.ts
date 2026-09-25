/**
 * Seeding — goal-inheritance resolver (pure, read-time).
 *
 * A Scene's effective goals = its parent Sequence's goal links (marked
 * `inherited`) merged UNDER the scene's own links. On a `goalId` collision
 * the scene's link wins (its `weight`/`depth` override the inherited values).
 *
 * Nothing is duplicated in storage — this is computed on read.
 */

import type { Goal, GoalLink, ResolvedGoalLink, Scene } from "./types";

function resolve(link: GoalLink, goals: Goal[], inherited: boolean): ResolvedGoalLink | null {
  const goal = goals.find((g) => g.id === link.goalId);
  if (!goal) return null;
  return { ...link, goal, inherited };
}

/**
 * Compute the effective, de-duplicated goal links for a scene.
 *
 * @param scene     the scene to resolve goals for
 * @param goalLinks the full edge list (all goal↔scene/sequence links)
 * @param goals     all goal entities (to attach the resolved `goal`)
 * @returns resolved links sorted by descending weight
 */
export function getEffectiveGoals(
  scene: Scene,
  goalLinks: GoalLink[],
  goals: Goal[],
): ResolvedGoalLink[] {
  const byGoalId = new Map<string, ResolvedGoalLink>();

  // 1. Inherited (sequence-level) first — lower priority.
  for (const link of goalLinks) {
    if (link.toType === "sequence" && link.toId === scene.sequenceId) {
      const resolved = resolve(link, goals, true);
      if (resolved) byGoalId.set(link.goalId, resolved);
    }
  }

  // 2. Scene-level overrides — same goalId replaces the inherited entry.
  for (const link of goalLinks) {
    if (link.toType === "scene" && link.toId === scene.id) {
      const resolved = resolve(link, goals, false);
      if (resolved) byGoalId.set(link.goalId, resolved);
    }
  }

  return [...byGoalId.values()].sort((a, b) => b.weight - a.weight);
}

/** Direct (non-resolved) goal links for a sequence, sorted by weight. */
export function getSequenceGoals(
  sequenceId: string,
  goalLinks: GoalLink[],
  goals: Goal[],
): ResolvedGoalLink[] {
  return goalLinks
    .filter((l) => l.toType === "sequence" && l.toId === sequenceId)
    .map((l) => resolve(l, goals, false))
    .filter((r): r is ResolvedGoalLink => r !== null)
    .sort((a, b) => b.weight - a.weight);
}
