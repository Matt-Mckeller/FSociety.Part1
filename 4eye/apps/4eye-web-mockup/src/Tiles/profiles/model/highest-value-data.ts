/**
 * Highest-Value Data — the brand's high-value embedded value themes, surfaced
 * per individual on their profile.
 *
 * Source of truth: `Planning/strategy/brand-and-design-system/CORPORATE_PURPOSE_DATA.md`
 * (Core Themes) + `4ear` brand guidelines. Each individual carries a weighted
 * alignment to these five themes plus a few of their own highest-value words
 * (the terms that rank highest for them within / around that theme).
 *
 * This is a fixed registry (the five core themes). A profile only fills the
 * themes it aligns to; weight (0–100) drives the shared WeightMeter colour ramp.
 */

import type { SymbolColor } from "@4eye/types";

/** The five brand core value themes. */
export type ValueTheme = "evolve" | "innovate" | "win" | "heal" | "protect";

export const VALUE_THEMES: ValueTheme[] = [
  "evolve",
  "innovate",
  "win",
  "heal",
  "protect",
];

export interface ValueThemeMeta {
  id: ValueTheme;
  label: string;
  /** One-line meaning of the theme. */
  blurb: string;
  /** Brand accent colour key for the theme chip/strip. */
  accent: SymbolColor;
  /** Canonical example terms for this theme (the brand vocabulary). */
  terms: string[];
  /** User-facing connector words — 3 terms cycled in the scramble animation. */
  userConnectors: string[];
}

export const VALUE_THEME_META: Record<ValueTheme, ValueThemeMeta> = {
  evolve: {
    id: "evolve",
    label: "Evolve",
    blurb: "Learning, progression, continuous evolution.",
    accent: "blue",
    terms: ["Learning", "Progression", "Growth", "Resilience"],
    userConnectors: ["Evolve", "Adapt", "Elevate"],
  },
  innovate: {
    id: "innovate",
    label: "Innovate",
    blurb: "Engagement and gamification.",
    accent: "purple",
    terms: ["Engagement", "Gamification", "Creativity", "Play"],
    userConnectors: ["Innovate", "Create", "Merge"],
  },
  win: {
    id: "win",
    label: "Win",
    blurb: "Currency, score, and rankings.",
    accent: "amber",
    terms: ["Currency", "Score", "Rankings", "Achievement"],
    userConnectors: ["Win", "Share", "Potential"],
  },
  heal: {
    id: "heal",
    label: "Heal",
    blurb: "Positivity, optimism, healing, teaching.",
    accent: "green",
    terms: ["Positivity", "Optimism", "Healing", "Empathy"],
    userConnectors: ["Heal", "Nourish", "Tree"],
  },
  protect: {
    id: "protect",
    label: "Protect",
    blurb: "Security, safety, protection, stability.",
    accent: "teal",
    terms: ["Security", "Safety", "Protection", "Stability"],
    userConnectors: ["Protect", "Shield", "Information"],
  },
};

/**
 * One individual's alignment to a value theme. `weight` (0–100) is how strongly
 * the person ranks/aligns to that theme; `words` are the individual's own
 * highest-value words within it (defaults to the theme's canonical terms).
 */
export interface ValueThemeAlignment {
  theme: ValueTheme;
  weight: number;
  /** This person's highest-value words for the theme. */
  words: string[];
  /**
   * Optional display override for the chip/row label (defaults to the theme's
   * brand label). Used when an individual's ranking of a theme is named
   * differently — e.g. Win surfaces as Love.
   */
  label?: string;
  /** Optional accent override (defaults to the theme's brand accent). */
  accent?: SymbolColor;
}

/** Sort alignments by descending weight (highest-value first). */
export function rankValueAlignments(
  alignments: ValueThemeAlignment[],
): ValueThemeAlignment[] {
  return [...alignments].sort((a, b) => b.weight - a.weight);
}
