"use client";

/**
 * Loadout — shared action-bar configuration.
 *
 * One in-memory store, consumed by BOTH the Spellbook tile (where actions are
 * saved to bars and given quality tiers) and the Character tile (where the
 * Primary/Secondary/Tertiary loadout, swipe casts, and custom actions are
 * configured). An "action" is a thin reference: a Spellbook spell, a
 * user-created custom action, or a Profile status target (mood / aura / gear / buff).
 */

import type { SymbolColor } from "@4eye/types";
import type { StatusTargetRef } from "@4eye/web/Tiles/character/model/statusTargets";
import { statusTargetKey } from "@4eye/web/Tiles/character/model/statusTargets";

/* ------------------------------------------------------------- Action bars */

/** The three configurable save-target bars. */
export type ActionBarKind = "planning" | "implementation" | "improvement";

export const ACTION_BAR_KINDS: readonly ActionBarKind[] = [
  "planning",
  "implementation",
  "improvement",
] as const;

export const ACTION_BAR_META: Record<ActionBarKind, { label: string; color: string; hint: string }> = {
  planning: { label: "Planning", color: "#3b82f6", hint: "Shape the work before it starts" },
  implementation: { label: "Implementation", color: "#8b5cf6", hint: "Do the work" },
  improvement: { label: "Improvement", color: "#22c55e", hint: "Make the work better" },
};

/* ----------------------------------------------------------- Quality tiers */

/**
 * Quality tier carried by an action — an optics-grade metaphor (the lens an
 * action is ground to). Rendered as a small badge on the icon; organized
 * orthogonally to the bars.
 */
export type QualityTier = "glass" | "crystal" | "prismatic";

export const QUALITY_TIERS: readonly QualityTier[] = ["glass", "crystal", "prismatic"] as const;

export const QUALITY_TIER_META: Record<QualityTier, { label: string; color: string; rank: number }> = {
  glass: { label: "Glass", color: "#94a3b8", rank: 1 },
  crystal: { label: "Crystal", color: "#38bdf8", rank: 2 },
  prismatic: { label: "Prismatic", color: "#f59e0b", rank: 3 },
};

/* ------------------------------------------------------------- Action refs */

/** A slottable action — spell, custom, or Profile status target. */
export type LoadoutActionRef =
  | { kind: "spell"; spellId: string }
  | { kind: "custom"; customId: string }
  | { kind: "status"; target: StatusTargetRef };

/** Stable map key for a ref ("spell:<id>" | "custom:<id>" | "mood:…" | …). */
export function actionKey(ref: LoadoutActionRef): string {
  if (ref.kind === "spell") return `spell:${ref.spellId}`;
  if (ref.kind === "custom") return `custom:${ref.customId}`;
  return statusTargetKey(ref.target);
}

export function sameAction(a: LoadoutActionRef, b: LoadoutActionRef): boolean {
  return actionKey(a) === actionKey(b);
}

/** A user-created action (lives only in the loadout store). */
export interface CustomAction {
  id: string;
  name: string;
  /** @expanse/lens registry id for the glyph. */
  lensId: string;
  accent: SymbolColor;
  hint?: string;
}

/* --------------------------------------------------- Character loadout pages */

/**
 * The Character loadout is a set of free-form, named **pages** (e.g. "Family",
 * "Learning", "Date night") you switch between. Each page holds one or more
 * **groups**, and each group renders its slots in a chosen keypad-style grid.
 * Pages are laid out consistently for muscle memory; the keypad shapes give the
 * "numpad" familiarity the user asked for.
 *
 * The flexible page → group → slot shape expresses every requested arrangement:
 *  - one 3×3 with Primary/Secondary/Tertiary rows → 3 `tri` groups,
 *  - three separate 3×3 keypads → 3 `keypad` groups (or 3 pages),
 *  - categories-as-rows → 3 `tri` groups labeled by category.
 */

/** Grid shape for a loadout group — drives slot count + columns. */
export type LoadoutGrid = "tri" | "quad" | "keypad" | "row";

export const LOADOUT_GRIDS: readonly LoadoutGrid[] = ["tri", "quad", "keypad", "row"] as const;

export const LOADOUT_GRID_META: Record<
  LoadoutGrid,
  { label: string; slots: number; cols: number }
> = {
  tri:    { label: "Row of 3",  slots: 3, cols: 3 },
  quad:   { label: "Quad 2×2",  slots: 4, cols: 2 },
  keypad: { label: "Keypad 3×3", slots: 9, cols: 3 },
  row:    { label: "Row of 4",  slots: 4, cols: 4 },
};

/** Slot count for a grid shape. */
export const gridSlots = (grid: LoadoutGrid): number => LOADOUT_GRID_META[grid].slots;

/** One labeled grid of slots inside a page. */
export interface LoadoutGroup {
  id: string;
  /** Free-form label (e.g. "Primary", "Family"); omit for an unlabeled grid. */
  label?: string;
  /** Accent hex; defaults to the page color. */
  color?: string;
  grid: LoadoutGrid;
  /** Fixed-length (gridSlots(grid)) array; null = empty slot. */
  slots: (LoadoutActionRef | null)[];
}

/** A named, switchable loadout page. */
export interface LoadoutPage {
  id: string;
  name: string;
  /** Emoji or short glyph shown on the page chip. */
  icon?: string;
  /** Accent hex for the chip + default group color. */
  color?: string;
  groups: LoadoutGroup[];
}

/**
 * Legacy Primary/Secondary/Tertiary tier identity — still used as the default
 * labels/colors when seeding a classic three-row page.
 */
export type LoadoutTier = "primary" | "secondary" | "tertiary";

export const LOADOUT_TIERS: readonly LoadoutTier[] = ["primary", "secondary", "tertiary"] as const;

export const LOADOUT_TIER_META: Record<LoadoutTier, { label: string; color: string }> = {
  primary: { label: "Primary", color: "#3b82f6" },
  secondary: { label: "Secondary", color: "#8b5cf6" },
  tertiary: { label: "Tertiary", color: "#14b8a6" },
};

/** Build a fixed-length slot array for a grid, copying any provided refs. */
export function makeSlots(
  grid: LoadoutGrid,
  refs: (LoadoutActionRef | null)[] = [],
): (LoadoutActionRef | null)[] {
  const n = gridSlots(grid);
  return Array.from({ length: n }, (_, i) => refs[i] ?? null);
}

/** The eight swipe-cast directions, clockwise from up. */
export type SwipeDirection =
  | "up"
  | "up-right"
  | "right"
  | "down-right"
  | "down"
  | "down-left"
  | "left"
  | "up-left";

export const SWIPE_DIRECTIONS: readonly SwipeDirection[] = [
  "up",
  "up-right",
  "right",
  "down-right",
  "down",
  "down-left",
  "left",
  "up-left",
] as const;

/** Label + arrow rotation (degrees, 0 = up) per direction. */
export const SWIPE_DIRECTION_META: Record<SwipeDirection, { label: string; angle: number }> = {
  up: { label: "Up", angle: 0 },
  "up-right": { label: "Up Right", angle: 45 },
  right: { label: "Right", angle: 90 },
  "down-right": { label: "Down Right", angle: 135 },
  down: { label: "Down", angle: 180 },
  "down-left": { label: "Down Left", angle: 225 },
  left: { label: "Left", angle: 270 },
  "up-left": { label: "Up Left", angle: 315 },
};

/** Named binding presets for the swipe rose + paired loadout page. */
export type BindingTemplateId =
  | "primary"
  | "learn"
  | "love"
  | "create"
  | "engage"
  | "influence"
  | "content";

/* -------------------------------------------------------------------- Data */

export interface LoadoutData {
  /** Save-target bars — open-ended ordered lists. */
  bars: Record<ActionBarKind, LoadoutActionRef[]>;
  /** Character loadout — named, switchable keypad pages. */
  pages: LoadoutPage[];
  /** Id of the currently shown page (falls back to the first page). */
  activePageId: string;
  /**
   * Active binding template (Primary / Learn / Love). Drives the swipe rose
   * preset and stays in sync with {@link activePageId} when a template is
   * applied from the Bindings UI.
   */
  activeBindingTemplateId?: BindingTemplateId;
  /** Swipe casts — one optional action per direction. */
  swipe: Record<SwipeDirection, LoadoutActionRef | null>;
  /** Quality tier per action, keyed by {@link actionKey}. */
  quality: Record<string, QualityTier>;
  customActions: CustomAction[];
}

/** An action ref resolved to its display fields. */
export interface ResolvedAction {
  key: string;
  ref: LoadoutActionRef;
  name: string;
  lensId: string;
  /** Accent hex color. */
  color: string;
  hint?: string;
  quality?: QualityTier;
}
