import type { Target } from "@4eye/types";

/**
 * Targets in selected context that are not the aim.
 *
 * Aimed targets are the cursor. These ride along without being the
 * focus — included, not directed.
 */
export function includedTargets(selected: Target[], aimed: Target[]): Target[] {
  const aimedIds = new Set(aimed.map((t) => t.id));
  return selected.filter((t) => !aimedIds.has(t.id));
}
