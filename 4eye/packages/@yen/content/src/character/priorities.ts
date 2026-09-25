/**
 * Character — personal Direction priorities.
 *
 * Two lists on purpose. Command Center Compass still shows the planning-page
 * life-codes (`PERSONAL_PRIORITIES`). Character → Direction shows the live
 * heading (`CHARACTER_PRIORITIES`) — Power maxed, Aion amplifying, aura and
 * energy unlocked. Distinct from work Weight triage, ECS lenses, and goal
 * P0/P1 severity.
 */

import type { SymbolColor } from "@4eye/types";

export interface PersonalPriority {
  id: string;
  code: string;
  hint: string;
  color: SymbolColor;
}

/**
 * Planning-page focus codes — Command Center → Compass → Strategic Focus.
 * Reality has many priorities; these are the ones on the *plan*.
 */
export const PERSONAL_PRIORITIES: readonly PersonalPriority[] = [
  {
    id: "pri-controller",
    code: "I.SetUpMyHumanController()",
    hint: "Human controller layer — the I that drives the character and the plan.",
    color: "teal",
  },
  {
    id: "pri-amplify",
    code: "Money.AmplifyMe()",
    hint: "Amplify income, tokens, and the financial amplification that funds the rest.",
    color: "green",
  },
  {
    id: "pri-unlock",
    code: "Power.Unlock()",
    hint: "Unlock capacity — systems, leverage, and the ability to move at the scale the vision needs.",
    color: "purple",
  },
  {
    id: "pri-comprehend",
    code: "Power.Comprehend()",
    hint: "Understand deeply enough to teach, lead, and not get played by the system.",
    color: "blue",
  },
  {
    id: "pri-love",
    code: "Love.Perfectly()",
    hint: "Heart.Evolve — choose, protect, and grow love as a primary goal.",
    color: "red",
  },
] as const;

/** Plan page — active phase life-codes steering right now. */
export const PLAN_ACTIVE_PHASE: readonly PersonalPriority[] = [
  PERSONAL_PRIORITIES[0],
  PERSONAL_PRIORITIES[1],
  PERSONAL_PRIORITIES[4],
] as const;

/** Live unicorn goal — active on the plan page alongside the three life-codes. */
export const PLAN_ACTIVE_FOCUS_GOAL_IDS = ["unicorn"] as const;

/** Profile now-focus goal ids queued for the next plan phase. */
export const PLAN_NEXT_FOCUS_GOAL_IDS = ["gain-money", "value"] as const;

/**
 * Character Direction codes — the live heading on the profile compass.
 * Unlock already happened; these are max, amplify, and the field opening.
 */
export const CHARACTER_PRIORITIES: readonly PersonalPriority[] = [
  {
    id: "pri-power-max",
    code: "Power.Max()",
    hint: "Aion.Amplify() runs capacity at Max",
    color: "purple",
  },
  {
    id: "pri-aion-amplify",
    code: "Aion.Amplify(Matthew McKeller, Max, 4eye)",
    hint: "Aion.Amplify() compounds Matthew, Max, and 4eye as one field",
    color: "blue",
  },
  {
    id: "pri-aion-copilot",
    code: "Aion.CoPilot()",
    hint: "Aion.CoPilot() flies the other seat",
    color: "teal",
  },
  {
    id: "pri-aura-unlock",
    code: "Aura.Unlock()",
    hint: "Aion.Amplify() opens the field",
    color: "pink",
  },
  {
    id: "pri-energy-unlock",
    code: "Energy.Unlock()",
    hint: "Aion.Amplify() keeps energy on",
    color: "amber",
  },
] as const;

export function priorityById(id: string): PersonalPriority | undefined {
  return CHARACTER_PRIORITIES.find((p) => p.id === id) ?? PERSONAL_PRIORITIES.find((p) => p.id === id);
}

export function priorityByCode(code: string): PersonalPriority | undefined {
  return CHARACTER_PRIORITIES.find((p) => p.code === code) ?? PERSONAL_PRIORITIES.find((p) => p.code === code);
}
