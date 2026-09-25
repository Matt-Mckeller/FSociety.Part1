/**
 * Planning — GoalLink (the primary relationship type)
 *
 * Reconciles the existing life-`Goal` (../goals/goal) with production/work
 * goals. The shared `Goal` stays identity-only; meaning lives on the LINK:
 *
 *  - `weight` (0..100) is ALWAYS present — how much this thing serves the goal.
 *  - `depth`  (1..7)   is OPTIONAL — only where complexity is meaningful
 *                       (depth does not apply to every relationship).
 *
 * GoalLink is the most-used edge: it connects any entity to a Goal.
 */

import type { EntityType } from "./entity";

export interface GoalLink {
  id: string;
  /** Linked Goal id (see ../goals/goal). */
  goalId: string;
  /** The entity this goal-relationship is attached to. */
  entityId: string;
  entityType: EntityType;
  /** Broad importance toward the goal, 0..100. Always present. */
  weight: number;
  /** Optional complexity/depth, 1..7. Omit where not meaningful. */
  depth?: number;
  /** Optional rationale. */
  note?: string;
  createdAt: number;
}
