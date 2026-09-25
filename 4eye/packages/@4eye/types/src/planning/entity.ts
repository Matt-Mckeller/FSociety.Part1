/**
 * Planning — Entity base
 *
 * ECS (Entity-Component-System) model: every planning thing is one `Entity`
 * that *composes* traits (see ./trait), rather than subclassing. A per-type
 * registry (see ./registry) declares what each type looks like and can do.
 *
 * Shared by Command Center (PM), Report (life docs), animation, profiles, etc.
 */

import type { SymbolName, SymbolColor } from "../symbols";
import type { Trait } from "./trait";

/**
 * Entity type discriminator. Open-ended on purpose — the registry
 * (EntityTypeConfig) is the source of truth for what each type can do.
 * Common planning/PM + Report types listed; extend as new types appear.
 */
export type EntityType =
  // PM / Work (rendered via ViewMode skins — see ./work)
  | "legend"
  | "campaign"
  | "storyline"
  | "quest"
  | "objective"
  | "action"
  | "work"
  | "checkpoint"
  | "artifact"
  // Strategic lenses — cross-cutting themes work items align to (e.g. Money, UI/UX)
  | "priority"
  // Plan compass — life-codes and focus goals in active / next phases
  | "process"
  // Report / life documentation
  | "symbol"
  | "connection"
  | "communication"
  | "interpretation"
  | "theory"
  | "event"
  // People / things
  | "profile"
  | "item"
  // Non-person entities that can own goals and tasks
  | "location"
  | "organization"
  | "team"
  // Creative work (assignable via the same Assignment pipeline)
  | "sequence"
  | "scene"
  | "project"
  // Escape hatch for registry-defined types
  | (string & {});

/**
 * A single record of change on an entity (lightweight audit trail).
 */
export interface ChangeEvent {
  at: number;
  /** Free-form change kind, e.g. "created", "status", "weight". */
  kind: string;
  /** Optional human/agent author id. */
  by?: string;
  /** Optional structured detail. */
  meta?: Record<string, unknown>;
}

/**
 * Thin Entity base. Identity + symbol + composed traits + history + meta.
 * NO domain logic lives here — capabilities come from traits and the registry.
 */
export interface Entity {
  id: string;
  /** Stable, human-readable slug (unique within a type). */
  slug: string;
  type: EntityType;
  /** Display label. */
  name: string;
  /** Each entity has its own symbol (icon marker). */
  symbol?: SymbolName;
  symbolColor?: SymbolColor;
  /** Composable capability/data slices. */
  traits: Trait[];
  /** Lightweight change history. */
  history?: ChangeEvent[];
  /** Open metadata bag (timeline variant/version, etc.). */
  meta?: Record<string, unknown>;
  createdAt: number;
  updatedAt?: number;
}
