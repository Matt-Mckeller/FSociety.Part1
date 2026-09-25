/**
 * Shared goal catalogs — reusable across relationships, crew, and profiles.
 *
 * Keep these short chip labels (same shape as `sharedGoals` on a relationship).
 * Domain sets are meant to be spread into partner seats rather than rewritten
 * per person, so World / Food / Health stay one vocabulary everywhere.
 */

/** Improve-the-world domains — generic import for partner / queen shared seats. */
export const WORLD_IMPROVEMENT_GOALS = [
  "Improve the world",
  "World",
  "Food",
  "Health",
] as const;

export type WorldImprovementGoal = (typeof WORLD_IMPROVEMENT_GOALS)[number];

/** Mutable copy for seed arrays that need `string[]`. */
export const worldImprovementGoals = (): string[] => [...WORLD_IMPROVEMENT_GOALS];
