/**
 * Planning — Relationship (the single polymorphic edge table)
 *
 * ONE reusable edge model for all entity-to-entity links, instead of a table
 * per relationship type. `relationType` discriminates the meaning; `meta`
 * carries extras (timeline variant/version, ordering, etc.).
 */

import type { EntityType } from "./entity";

export type RelationType =
  // Work hierarchy (Epics-per-Entity)
  | "epic-of"
  | "task-of"
  | "child-of"
  | "blocks"
  | "depends-on"
  // Report / graph
  | "connected-to"
  | "communicates-with"
  | "references"
  // Generic
  | "relates-to"
  | (string & {});

export interface Relationship {
  id: string;
  fromId: string;
  fromType: EntityType;
  toId: string;
  toType: EntityType;
  relationType: RelationType;
  /** Optional ordering within a parent (for hierarchy/lists). */
  order?: number;
  /** Timeline variant/version and any edge-specific data. */
  meta?: Record<string, unknown>;
  createdAt: number;
}
