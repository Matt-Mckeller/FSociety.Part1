"use client";

/**
 * Spellbook lanes — display organisation on top of category ids.
 *
 * Categories stay as seed storage (`heal`, `assess`, …). Lanes are what the
 * human sees when browsing All / For you: Learn · Primary · Create · Love ·
 * Play · Power · Utility. Subgroups mirror the Learn compress/depth pattern
 * for every other lane so the book never dumps into a flat wall.
 */

import type { Spell, SpellCategory } from "./types";

export type SpellLane =
  | "learn"
  | "primary"
  | "create"
  | "love"
  | "play"
  | "power"
  | "utility";

export const SPELL_LANE_ORDER: SpellLane[] = [
  "primary",
  "learn",
  "love",
  "play",
  "power",
  "create",
  "utility",
];

export interface SpellLaneMeta {
  id: SpellLane;
  label: string;
  /** One line under the lane header. */
  blurb: string;
  color: string;
}

export const SPELL_LANE_META: Record<SpellLane, SpellLaneMeta> = {
  primary: {
    id: "primary",
    label: "Primary",
    blurb: "Plan · Act · Improve · Quality · Communicate",
    color: "#15803d",
  },
  learn: {
    id: "learn",
    label: "Learn",
    blurb: "Compress · deepen · anchor · challenge",
    color: "#2563eb",
  },
  love: {
    id: "love",
    label: "Love",
    blurb: "Bond · care · regulate · recover",
    color: "#be123c",
  },
  play: {
    id: "play",
    label: "Play",
    blurb: "Play · compete · celebrate",
    color: "#c2410c",
  },
  power: {
    id: "power",
    label: "Power",
    blurb: "Amplify · Unlock · Comprehend",
    color: "#475569",
  },
  create: {
    id: "create",
    label: "Create",
    blurb: "Draft · ship · capture",
    color: "#d97706",
  },
  utility: {
    id: "utility",
    label: "Utility",
    blurb: "Transform · find · report",
    color: "#0369a1",
  },
};

/** Subgroup within a lane (learn keeps its existing LearnGroup ids). */
export type LaneSubgroup =
  | "compress"
  | "depth"
  | "anchor"
  | "challenge"
  | "plan"
  | "act"
  | "craft"
  | "communicate"
  | "draft"
  | "ship"
  | "capture"
  | "bond"
  | "regulate"
  | "lift"
  | "play"
  | "compete"
  | "mark"
  | "amplify"
  | "unlock"
  | "comprehend"
  | "transform"
  | "find"
  | "report"
  | "engage"
  | "broadcast"
  | "other";

export interface LaneSubgroupMeta {
  id: LaneSubgroup;
  label: string;
}

export const LANE_SUBGROUP_META: Record<LaneSubgroup, LaneSubgroupMeta> = {
  compress: { id: "compress", label: "Compress & Clarify" },
  depth: { id: "depth", label: "Go Deeper" },
  anchor: { id: "anchor", label: "Make It Stick" },
  challenge: { id: "challenge", label: "Test & Challenge" },
  plan: { id: "plan", label: "Plan" },
  act: { id: "act", label: "Act" },
  craft: { id: "craft", label: "Craft" },
  communicate: { id: "communicate", label: "Communicate" },
  draft: { id: "draft", label: "Draft" },
  ship: { id: "ship", label: "Ship" },
  capture: { id: "capture", label: "Capture" },
  bond: { id: "bond", label: "Bond" },
  regulate: { id: "regulate", label: "Regulate" },
  lift: { id: "lift", label: "Lift" },
  play: { id: "play", label: "Play" },
  compete: { id: "compete", label: "Compete" },
  mark: { id: "mark", label: "Mark" },
  amplify: { id: "amplify", label: "Amplify" },
  unlock: { id: "unlock", label: "Unlock" },
  comprehend: { id: "comprehend", label: "Comprehend" },
  transform: { id: "transform", label: "Transform" },
  find: { id: "find", label: "Find" },
  report: { id: "report", label: "Report" },
  engage: { id: "engage", label: "Hook & Invite" },
  broadcast: { id: "broadcast", label: "Broadcast" },
  other: { id: "other", label: "More" },
};

/** Subgroup order per lane. */
export const LANE_SUBGROUP_ORDER: Record<SpellLane, LaneSubgroup[]> = {
  learn: ["compress", "depth", "anchor", "challenge", "other"],
  primary: ["plan", "act", "craft", "communicate", "other"],
  create: ["draft", "ship", "capture", "engage", "other"],
  love: ["bond", "regulate", "lift", "other"],
  play: ["play", "compete", "mark", "other"],
  power: ["amplify", "unlock", "comprehend", "broadcast", "other"],
  utility: ["transform", "find", "report", "other"],
};

/** Everyday Primary commons — also seed the For you home. */
export const PRIMARY_SPELL_IDS = new Set([
  "SPELL_PLAN",
  "SPELL_ACT",
  "SPELL_SHIP",
  "SPELL_PUSH",
  "SPELL_IMPROVE",
  "SPELL_QUALITY",
  "SPELL_CUT",
  "SPELL_COMMUNICATE",
  "SPELL_TEACH",
  "SPELL_RECORD",
  "SPELL_BUILD",
  "SPELL_VISUALIZE",
  "SPELL_NAVIGATE_PATH",
]);

/** Study ↔ life pairs — one-line framing, both kept. */
export const SPELL_PAIRS: Record<string, { peerId: string; note: string }> = {
  SPELL_OUTLINE: { peerId: "SPELL_PLAN", note: "Study structure · Plan is intent for the day" },
  SPELL_PLAN: { peerId: "SPELL_OUTLINE", note: "Life cast · Outline structures content" },
  SPELL_APPLY: { peerId: "SPELL_ACT", note: "Use the lesson · Act does the work" },
  SPELL_ACT: { peerId: "SPELL_APPLY", note: "Do the work · Apply uses the lesson" },
  SPELL_CRITIQUE: { peerId: "SPELL_IMPROVE", note: "Study feedback · Improve raises the live draft" },
  SPELL_IMPROVE: { peerId: "SPELL_CRITIQUE", note: "Ship craft · Critique is study feedback" },
  SPELL_FACTCHECK: { peerId: "SPELL_QUALITY", note: "Verify claims · Quality is the ship gate" },
  SPELL_QUALITY: { peerId: "SPELL_FACTCHECK", note: "Ship gate · Fact-check verifies claims" },
  SPELL_MILESTONE: { peerId: "SPELL_CELEBRATE", note: "Checkpoint · Celebrate is the felt win" },
  SPELL_CELEBRATE: { peerId: "SPELL_MILESTONE", note: "Felt win · Milestone marks the checkpoint" },
};

/** Explicit placement overrides — id → lane + subgroup. */
const SPELL_PLACEMENT: Record<string, { lane: SpellLane; subgroup: LaneSubgroup; weight: number }> = {
  // Primary commons
  SPELL_PLAN: { lane: "primary", subgroup: "plan", weight: 100 },
  SPELL_VISUALIZE: { lane: "primary", subgroup: "plan", weight: 72 },
  SPELL_NAVIGATE_PATH: { lane: "primary", subgroup: "plan", weight: 70 },
  SPELL_OUTLINE: { lane: "learn", subgroup: "compress", weight: 60 },
  SPELL_ACT: { lane: "primary", subgroup: "act", weight: 98 },
  SPELL_SHIP: { lane: "primary", subgroup: "act", weight: 94 },
  SPELL_PUSH: { lane: "primary", subgroup: "act", weight: 78 },
  SPELL_BUILD: { lane: "primary", subgroup: "act", weight: 88 },
  SPELL_STEP_FORWARD: { lane: "primary", subgroup: "act", weight: 68 },
  SPELL_APPLY: { lane: "learn", subgroup: "anchor", weight: 62 },
  SPELL_DRAFT: { lane: "create", subgroup: "draft", weight: 74 },
  SPELL_IMPROVE: { lane: "primary", subgroup: "craft", weight: 96 },
  SPELL_QUALITY: { lane: "primary", subgroup: "craft", weight: 95 },
  SPELL_CUT: { lane: "primary", subgroup: "craft", weight: 82 },
  SPELL_CRITIQUE: { lane: "utility", subgroup: "transform", weight: 58 },
  SPELL_FACTCHECK: { lane: "utility", subgroup: "transform", weight: 56 },
  SPELL_CONCISE: { lane: "learn", subgroup: "compress", weight: 64 },
  SPELL_COMMUNICATE: { lane: "primary", subgroup: "communicate", weight: 97 },
  SPELL_TEACH: { lane: "primary", subgroup: "communicate", weight: 90 },
  SPELL_RECORD: { lane: "create", subgroup: "capture", weight: 86 },
  SPELL_EXPLAIN: { lane: "learn", subgroup: "compress", weight: 66 },
  SPELL_SUMMARIZE: { lane: "utility", subgroup: "transform", weight: 54 },
  SPELL_CONNECT: { lane: "love", subgroup: "bond", weight: 60 },
  // Create
  SPELL_STORYBOARD: { lane: "create", subgroup: "draft", weight: 52 },
  // Love
  SPELL_BOND: { lane: "love", subgroup: "bond", weight: 92 },
  SPELL_FISH: { lane: "love", subgroup: "bond", weight: 90 },
  SPELL_CHECK_IN: { lane: "love", subgroup: "bond", weight: 80 },
  SPELL_ENCOURAGE: { lane: "love", subgroup: "lift", weight: 76 },
  SPELL_GROUND: { lane: "love", subgroup: "regulate", weight: 74 },
  SPELL_RECOVER: { lane: "love", subgroup: "regulate", weight: 88 },
  SPELL_NAME_IT: { lane: "love", subgroup: "regulate", weight: 72 },
  SPELL_LIFT: { lane: "love", subgroup: "lift", weight: 78 },
  SPELL_SHIFT_STATE: { lane: "love", subgroup: "regulate", weight: 58 },
  SPELL_TRACK_MOOD: { lane: "love", subgroup: "regulate", weight: 50 },
  // Play
  SPELL_PLAY: { lane: "play", subgroup: "play", weight: 90 },
  SPELL_COMPETE: { lane: "play", subgroup: "compete", weight: 88 },
  SPELL_CELEBRATE: { lane: "play", subgroup: "mark", weight: 86 },
  SPELL_MILESTONE: { lane: "play", subgroup: "mark", weight: 62 },
  // Power
  SPELL_AMPLIFY: { lane: "power", subgroup: "amplify", weight: 92 },
  SPELL_UNLOCK: { lane: "power", subgroup: "unlock", weight: 90 },
  SPELL_COMPREHEND: { lane: "power", subgroup: "comprehend", weight: 90 },
  // Engine — Create
  SPELL_STACK: { lane: "create", subgroup: "capture", weight: 84 },
  // Engine — Engage
  SPELL_HOOK: { lane: "create", subgroup: "engage", weight: 92 },
  SPELL_INVITE: { lane: "create", subgroup: "engage", weight: 90 },
  SPELL_REPLY: { lane: "create", subgroup: "engage", weight: 86 },
  SPELL_SPARK: { lane: "create", subgroup: "engage", weight: 84 },
  // Engine — Influence
  SPELL_BROADCAST: { lane: "power", subgroup: "broadcast", weight: 88 },
  SPELL_RALLY: { lane: "power", subgroup: "broadcast", weight: 86 },
};

const CATEGORY_DEFAULT_LANE: Record<SpellCategory, { lane: SpellLane; subgroup: LaneSubgroup; weight: number }> = {
  learn: { lane: "learn", subgroup: "other", weight: 40 },
  movement: { lane: "primary", subgroup: "act", weight: 45 },
  create: { lane: "create", subgroup: "draft", weight: 45 },
  assess: { lane: "primary", subgroup: "craft", weight: 45 },
  navigate: { lane: "utility", subgroup: "find", weight: 35 },
  heal: { lane: "love", subgroup: "bond", weight: 50 },
  mood: { lane: "love", subgroup: "regulate", weight: 40 },
  status: { lane: "utility", subgroup: "report", weight: 35 },
  transform: { lane: "utility", subgroup: "transform", weight: 35 },
  play: { lane: "play", subgroup: "play", weight: 55 },
  power: { lane: "power", subgroup: "amplify", weight: 55 },
};

export interface SpellPlacement {
  lane: SpellLane;
  subgroup: LaneSubgroup;
  weight: number;
}

export function spellPlacement(spell: Spell): SpellPlacement {
  const explicit = SPELL_PLACEMENT[spell.id];
  if (explicit) {
    if (spell.learnGroup && explicit.lane === "learn") {
      return { ...explicit, subgroup: spell.learnGroup };
    }
    return explicit;
  }
  const base = CATEGORY_DEFAULT_LANE[spell.category];
  if (spell.category === "learn" && spell.learnGroup) {
    return { lane: "learn", subgroup: spell.learnGroup, weight: base.weight };
  }
  // Navigate communicate slice
  if (spell.category === "navigate" && (spell.id === "SPELL_CONNECT" || spell.name.includes("Communicat"))) {
    return { lane: "primary", subgroup: "communicate", weight: 70 };
  }
  if (spell.category === "status") {
    if (spell.id === "SPELL_MILESTONE") return { lane: "play", subgroup: "mark", weight: 62 };
    return { lane: "utility", subgroup: "report", weight: base.weight };
  }
  if (spell.category === "create") {
    if (spell.id === "SPELL_SHIP" || spell.id === "SPELL_BUILD") {
      return { lane: "primary", subgroup: "act", weight: 88 };
    }
    if (spell.id === "SPELL_RECORD") return { lane: "create", subgroup: "capture", weight: 86 };
  }
  return base;
}

export function spellLane(spell: Spell): SpellLane {
  return spellPlacement(spell).lane;
}

export function spellWeight(spell: Spell): number {
  return spellPlacement(spell).weight;
}

/** Virtual home preset — equipped ∪ Primary ∪ favorites (computed at filter time). */
export const FOR_YOU_PRESET_ID = "PRESET_FOR_YOU";

/** Mode presets shown first (sync with Bindings where noted). */
export const MODE_PRESET_IDS = [
  FOR_YOU_PRESET_ID,
  "PRESET_PRIMARY",
  "PRESET_LEARNING",
  "PRESET_LOVE",
  "PRESET_PLAY",
  "PRESET_CREATE",
  "PRESET_ENGAGE",
  "PRESET_INFLUENCE",
  "PRESET_CONTENT",
] as const;

/** Secondary chips under More. */
export const SECONDARY_PRESET_IDS = [
  "PRESET_POWER",
  "PRESET_QUICK_STUDY",
  "PRESET_WRITING",
  "PRESET_LIFE",
] as const;

/** Spellbook preset → binding template id. */
export const PRESET_TO_BINDING: Record<string, BindingTemplateIdLike> = {
  PRESET_PRIMARY: "primary",
  PRESET_LEARNING: "learn",
  PRESET_QUICK_STUDY: "learn",
  PRESET_LOVE: "love",
  PRESET_CREATE: "create",
  PRESET_ENGAGE: "engage",
  PRESET_INFLUENCE: "influence",
  PRESET_CONTENT: "content",
};

type BindingTemplateIdLike =
  | "primary"
  | "learn"
  | "love"
  | "create"
  | "engage"
  | "influence"
  | "content";

/** Binding template → spellbook preset. */
export const BINDING_TO_PRESET: Record<string, string> = {
  primary: "PRESET_PRIMARY",
  learn: "PRESET_LEARNING",
  love: "PRESET_LOVE",
  create: "PRESET_CREATE",
  engage: "PRESET_ENGAGE",
  influence: "PRESET_INFLUENCE",
  content: "PRESET_CONTENT",
};
