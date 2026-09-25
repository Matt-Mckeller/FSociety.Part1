"use client";

/**
 * Spellbook tile — domain model (V1 mockup).
 *
 * Implements the V1 frontend-mockup contract from
 * `4eye/_current/plans/project-controller.md` §Spellbook: a data-driven
 * keypad of "spells" (actions the user can cast). Browse, learn, favorite, and
 * cast (no-op in V1). Preset page configurations curate spells for a mode.
 *
 * No real execution, no live context filtering, no action-bar drag (those are
 * V2 in the controller plan). Data-driven via seed (JSON-style) so new spells
 * need no layout changes.
 *
 * Category colour is a *group label* only — glyph + thin edge — not a rainbow
 * card fill. Learn stays first-class; play / power carry the human and ambition
 * lanes that sit beside study.
 */

/** Spell categories — drive iconography grouping + filtering. */
export type SpellCategory =
  | "learn"
  | "transform"
  | "assess"
  | "navigate"
  | "heal"
  | "create"
  | "movement"
  | "mood"
  | "status"
  | "play"
  | "power";

export const SPELL_CATEGORIES: SpellCategory[] = [
  "learn",
  "movement",
  "create",
  "assess",
  "transform",
  "navigate",
  "heal",
  "mood",
  "status",
  "play",
  "power",
];

/** Sub-group within the learn category, for grouped display in the spellbook. */
export type LearnGroup = "compress" | "depth" | "anchor" | "challenge";

export const LEARN_GROUP_ORDER: LearnGroup[] = ["compress", "depth", "anchor", "challenge"];

export interface LearnGroupMeta {
  id: LearnGroup;
  label: string;
  color: string;
}

/** Calmer inks — category mark only, not a wash on every card. */
export const LEARN_GROUP_META: Record<LearnGroup, LearnGroupMeta> = {
  compress: { id: "compress", label: "Compress & Clarify", color: "#2563eb" },
  depth: { id: "depth", label: "Go Deeper", color: "#6d28d9" },
  anchor: { id: "anchor", label: "Make It Stick", color: "#15803d" },
  challenge: { id: "challenge", label: "Test & Challenge", color: "#b45309" },
};

export interface SpellCategoryMeta {
  id: SpellCategory;
  label: string;
  /** MUI icon key (resolved in components, kept data-only here). */
  icon: string;
  /** Accent colour for the category — glyph / edge only. */
  color: string;
}

export const SPELL_CATEGORY_META: Record<SpellCategory, SpellCategoryMeta> = {
  learn: { id: "learn", label: "Learn", icon: "SchoolRounded", color: "#2563eb" },
  movement: { id: "movement", label: "Act", icon: "DirectionsRunRounded", color: "#6d28d9" },
  create: { id: "create", label: "Create", icon: "BrushRounded", color: "#d97706" },
  assess: { id: "assess", label: "Craft", icon: "FactCheckRounded", color: "#1d4ed8" },
  transform: { id: "transform", label: "Transform", icon: "AutoFixHighRounded", color: "#7c3aed" },
  navigate: { id: "navigate", label: "Relate", icon: "ExploreRounded", color: "#0f766e" },
  heal: { id: "heal", label: "Love", icon: "FavoriteRounded", color: "#be123c" },
  mood: { id: "mood", label: "Mood", icon: "MoodRounded", color: "#a21caf" },
  status: { id: "status", label: "Status", icon: "TrackChangesRounded", color: "#0369a1" },
  play: { id: "play", label: "Play", icon: "SportsEsportsRounded", color: "#c2410c" },
  power: { id: "power", label: "Power", icon: "BoltRounded", color: "#475569" },
};

export interface Spell {
  id: string;
  name: string;
  /** @expanse/lens registry id — resolves to an animated lens glyph (fallback). */
  lensId: string;
  category: SpellCategory;
  /** One-line description shown on the card face. */
  shortDescription: string;
  /** Longer "Learn" body — what it does and when to use it. */
  details: string;
  /**
   * Whether this spell is always available (vs. surfaced only by context).
   * Drives the optional "always vs contextual" split layout variant.
   */
  alwaysAvailable: boolean;
  /** Sub-group for learn-category spells. Used for grouped display. */
  learnGroup?: LearnGroup;
  favorite?: boolean;
}

/** A curated set of spells for a mode (e.g. "Learning Mode"). */
export interface SpellPreset {
  id: string;
  label: string;
  description: string;
  spellIds: string[];
}

export interface SpellbookData {
  spells: Spell[];
  presets: SpellPreset[];
}

export type SpellSort = "recommended" | "name" | "category" | "lane";
