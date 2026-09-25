/**
 * Today's pin — the one thing that is #1 *right now*, plus the actions and
 * subjects that pin is made of.
 *
 * Live copies live on CharacterProfileStore. This file is the seed and the
 * revision contract: one append-only log for goal / plan / next-action / daily-1.
 */

import type { EquippedWorkItem } from "@yen/content/character/types";

export interface TodayPin {
  rank: 1;
  label: string;
  /** One line of why this is the pin, not a second goal. */
  detail: string;
}

export interface TodayAction {
  id: string;
  label: string;
  detail: string;
}

export interface TodaySubject {
  id: string;
  label: string;
  detail: string;
}

export type FocusSlot = "goal" | "plan" | "next-action" | "daily-1";

export const FOCUS_SLOT_LABEL: Record<FocusSlot, string> = {
  goal: "Current Goal",
  plan: "Plan",
  "next-action": "Next Action",
  "daily-1": "Today · #1",
};

export interface FocusRevision {
  id: string;
  at: number;
  slot: FocusSlot;
  from: string;
  to: string;
  reason?: string;
  /** Plan or action id when the change is about a list item. */
  itemId?: string;
}

export interface FocusSnapshot {
  todayPin: TodayPin;
  todayActions: TodayAction[];
  todaySubjects: TodaySubject[];
  currentGoal: string;
  focusedGoalIds: string[];
  plans: EquippedWorkItem[];
  focusRevisions: FocusRevision[];
}

export const FOCUS_STORAGE_KEY = "4eye.profile.focusStack";

export const CURRENT_GOAL_SEED =
  "*🦄^🦄*";

/** Up to three goal ids in focus on the profile — unicorn + money + one vision. */
export const FOCUSED_GOAL_IDS_SEED: readonly string[] = ["unicorn", "gain-money", "value"];

export const TODAY_PIN: TodayPin = {
  rank: 1,
  label: "Playing 1Game",
  detail: "The live play is 1Game — treat the session as the product.",
};

/**
 * Ordered moves under the pin. Prepare and record first; shorts and vision
 * content are what the take becomes; audience is who it is for.
 */
export const TODAY_ACTIONS: TodayAction[] = [
  {
    id: "prepare",
    label: "Optimally prepare",
    detail: "Set the run so recording does not have to invent the plan.",
  },
  {
    id: "record",
    label: "Record perfectly",
    detail: "One clean take of the vision — as if the recording is the product.",
  },
  {
    id: "shorts",
    label: "Create phenomenal shorts",
    detail: "Cut the vision into clips that stand alone.",
  },
  {
    id: "vision-content",
    label: "Content for vision",
    detail: "Save · Value · Command King — the material the demo is of.",
  },
  {
    id: "audience",
    label: "Optimize audience",
    detail: "All users, humans first. Niches still included — not the whole frame.",
  },
];

/** What today's work is of — the three things being demoed and recorded. */
export const TODAY_SUBJECTS: TodaySubject[] = [
  {
    id: "edu",
    label: "EDU",
    detail: "Expanse EDU — teach from the demo, not only about it.",
  },
  {
    id: "4eye",
    label: "4eye",
    detail: "The product the vision lives in.",
  },
  {
    id: "recording-app",
    label: "Recording App",
    detail: "The capture surface — prepare and record on the thing being shown.",
  },
];

const hr = 3_600_000;

export function makeRevision(
  slot: FocusSlot,
  from: string,
  to: string,
  reason?: string,
  itemId?: string,
): FocusRevision {
  return {
    id: `rev-${slot}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    at: Date.now(),
    slot,
    from,
    to,
    reason,
    itemId,
  };
}

export function FOCUS_REVISIONS_SEED(now = Date.now()): FocusRevision[] {
  return [
    {
      id: "rev-seed-daily",
      at: now - 4 * hr,
      slot: "daily-1",
      from: CURRENT_GOAL_SEED,
      to: TODAY_PIN.label,
      reason: "Today's #1",
    },
    {
      id: "rev-seed-action",
      at: now - 3 * hr,
      slot: "next-action",
      from: "Continue the current goal",
      to: TODAY_ACTIONS[0].label,
      reason: "Lead move for the demo",
      itemId: TODAY_ACTIONS[0].id,
    },
    {
      id: "rev-seed-4eye",
      at: now - 2 * hr,
      slot: "plan",
      from: "",
      to: "4eye",
      reason: "In flight",
      itemId: "work-4eye",
    },
    {
      id: "rev-seed-edu",
      at: now - 2 * hr,
      slot: "plan",
      from: "",
      to: "EDU",
      reason: "In flight",
      itemId: "work-edu",
    },
    {
      id: "rev-seed-rec",
      at: now - 2 * hr,
      slot: "plan",
      from: "",
      to: "Recording App",
      reason: "In flight",
      itemId: "work-recording-app",
    },
  ];
}

export function revisionsFor(
  revisions: readonly FocusRevision[],
  slot: FocusSlot,
  itemId?: string,
): FocusRevision[] {
  return revisions.filter((r) => r.slot === slot && (itemId == null || r.itemId === itemId));
}

export function readFocusSnapshot(): FocusSnapshot | null {
  try {
    const raw = window.localStorage.getItem(FOCUS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<FocusSnapshot>;
    if (!parsed?.todayPin || !Array.isArray(parsed.todayActions) || !Array.isArray(parsed.plans)) {
      return null;
    }
    return {
      todayPin: parsed.todayPin,
      todayActions: parsed.todayActions,
      todaySubjects: Array.isArray(parsed.todaySubjects) ? parsed.todaySubjects : TODAY_SUBJECTS,
      currentGoal: typeof parsed.currentGoal === "string" ? parsed.currentGoal : CURRENT_GOAL_SEED,
      focusedGoalIds: Array.isArray(parsed.focusedGoalIds)
        ? parsed.focusedGoalIds.filter((v): v is string => typeof v === "string").slice(0, 3)
        : [...FOCUSED_GOAL_IDS_SEED],
      plans: parsed.plans,
      focusRevisions: Array.isArray(parsed.focusRevisions) ? parsed.focusRevisions : [],
    };
  } catch {
    return null;
  }
}

export function writeFocusSnapshot(snapshot: FocusSnapshot) {
  try {
    window.localStorage.setItem(FOCUS_STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    /* private mode / quota — history still lives in memory for the session */
  }
}
