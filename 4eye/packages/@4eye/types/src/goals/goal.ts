import type { SymbolColor, SymbolName } from "../symbols";
import type { DomainType } from "../domain";

/**
 * High-level life category (Eisenhower-ish meta-goal).
 */
export type GoalCategory =
  | "health"
  | "cognitive"
  | "behavioral"
  | "social"
  | "purpose"
  | "environmental"
  | "identity";

/**
 * Profile pyramid bracket a goal belongs to. Chat pulls these in as
 * optional sources rather than flattening every aim into one list.
 */
export type GoalSection = "now" | "vision" | "ongoing" | "others" | "relationships";

export interface Goal {
  id: string;
  /** Short chip label, e.g. "Save" or "Heart.Evolve" */
  word: string;
  symbol: SymbolName;
  symbolColor: SymbolColor;
  category: GoalCategory;
  domain: DomainType;
  /** One-line target — always visible in the picker. */
  description?: string;
  /** Profile section this goal was pulled from. */
  section?: GoalSection;
  /** Coded form, shown when the picker row is expanded. */
  code?: string;
  /** Longer narrative, shown when the picker row is expanded. */
  detail?: string;
  /** Typed for this prompt only — not saved to the profile catalog. */
  ephemeral?: boolean;
}

export interface SelectedGoal {
  goalId: string;
  selectedAt: number;
}

export const MAX_SELECTED_GOALS = 3;
