
/**
 * Character tile — domain model.
 *
 * The Character screen is the game/action layer for the active character —
 * distinct from the identity/data Profiles tile. It shows what the character
 * has *equipped*: actions, spells, active work (plans/tasks/quests), and goals,
 * plus a launcher into the Spellbook.
 *
 * "Equipped" entries are thin references (id + display fields + status/weight).
 * The source entities live in their own tiles (quests/projects/goals/spellbook);
 * nothing is duplicated as a source of truth — these are the slotted view.
 *
 * UI-first per the Character & Screens plan
 * (`_current/plans/character-and-screens/character-screens-update-plan.md`).
 */

import type { SymbolColor } from "@4eye/types";

/* ------------------------------------------------------------- Identity */

export interface CharacterStat {
  id: string;
  label: string;
  value: string | number;
  /** 0..1 progress for bar-style stats (XP, energy). */
  progress?: number;
  /** Accent override; defaults to the character accent. */
  accent?: SymbolColor;
}

/* ----------------------------------------------------------- Equipped slots */

/** A castable/triggerable action on the action bar. */
/**
 * Which third of the action bar an action belongs to.
 *
 * `direct` acts on the thing in front of you; `craft` acts on the piece you
 * are making; `people` acts on everyone else. The split is what the dividers
 * mark — without it the actions are just a row that happens to be long.
 */
export type ActionGroup = "direct" | "craft" | "people";

export interface EquippedAction {
  id: string;
  label: string;
  /** MUI icon key, resolved in the action bar. */
  icon: string;
  accent: SymbolColor;
  /** Short hint shown on hover. */
  hint?: string;
  /** Defaults to `direct` when unset, so older data keeps working. */
  group?: ActionGroup;
}

/** An equipped spell — references a Spellbook spell by id. */
export interface EquippedSpell {
  /** Id into the Spellbook registry (SPELLBOOK_SEED). */
  spellId: string;
}

export type WorkKind = "plan" | "task" | "quest";
export type WorkStatus = "active" | "blocked" | "done";

/** An equipped active-work item (plan / task / quest). */
export interface EquippedWorkItem {
  id: string;
  kind: WorkKind;
  label: string;
  status: WorkStatus;
  /** Importance 0–100 (drives the WeightMeter). */
  weight: number;
  /** 0..1 completion. */
  progress?: number;
  /** Short context line. */
  detail?: string;
}

/** An equipped goal slot. */
export interface EquippedGoal {
  id: string;
  label: string;
  /** Importance 0–100. */
  weight: number;
  /** 0..1 progress toward the goal. */
  progress?: number;
  accent?: SymbolColor;
}

/* --------------------------------------------------------------- Character */

export interface Character {
  id: string;
  /** Links to a Profile id (identity lives in the Profiles tile). */
  profileId?: string;
  name: string;
  realName?: string;
  accent: SymbolColor;
  /** Finite rank, or `Infinity` — one ∞ for power in every domain. */
  level: number;
  /** Equipped role titles (max {@link MAX_EQUIPPED_ROLES}), chosen from ROLE_TITLE_OPTIONS. */
  titles: string[];
  stats: CharacterStat[];
  equippedActions: EquippedAction[];
  equippedSpells: EquippedSpell[];
  equippedWork: EquippedWorkItem[];
  equippedGoals: EquippedGoal[];
}

export interface CharacterData {
  characters: Character[];
  activeCharacterId: string;
}

/** Avatar / status mark. Infinity is a single ∞, not a stacked triforce. */
export function formatLevelMark(level: number, style: "badge" | "lvl" = "badge"): string {
  if (!Number.isFinite(level)) return "∞";
  return style === "lvl" ? `LVL ${level}` : `L${level}`;
}

export const WORK_KIND_LABEL: Record<WorkKind, string> = {
  plan: "Plan",
  task: "Task",
  quest: "Quest",
};

export const WORK_STATUS_COLOR: Record<WorkStatus, string> = {
  active: "#1976d2", // blue — in progress
  blocked: "#e0911f", // amber — blocked
  done: "#2e7d32", // green — complete
};

export const WORK_STATUS_LABEL: Record<WorkStatus, string> = {
  active: "Active",
  blocked: "Blocked",
  done: "Done",
};

/**
 * An entry in the character's live activity feed.
 *
 * Defined here rather than in the app's profile store because `timeline.ts`
 * needs it and the model must not depend on a React store. The store re-exports
 * it so existing imports keep working.
 */
export interface FeedEvent {
  id: string;
  type:
    | "habit-complete"
    | "consumable-used"
    | "trait-upgrade"
    | "aura-upgrade"
    | "buff-gained"
    | "buff-expired"
    | "milestone"
    | "perspective-updated"
    | "action-used"
    | "goal-progress"
    | "focus-changed";
  label: string;
  detail?: string;
  /** Unix ms. */
  occurredAt: number;
  color?: string;
  emoji?: string;
}
