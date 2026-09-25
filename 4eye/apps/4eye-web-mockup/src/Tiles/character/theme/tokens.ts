/**
 * Character surface design tokens.
 *
 * Single source for the accent hexes that were previously hardcoded and
 * duplicated across the character components (the tab-rail indigo, rarity
 * colors, feed-event colors, tier accents). Keeping them here means a theme
 * pass only has to touch one file, and every panel reads the same values.
 */

/** Primary accent for the character surface (active tab, milestones, focus). */
export const CHARACTER_ACCENT = "#4F46E5";

/** Semantic status colors shared across feed events, badges, and meters. */
export const CHARACTER_COLORS = {
  accent: CHARACTER_ACCENT,
  success: "#16a34a",
  info: "#2563eb",
  arcane: "#7c3aed",
  warning: "#d97706",
  danger: "#dc2626",
  neutral: "#64748b",
} as const;

/** Rarity → foreground/background pair, used by achievements + equipment. */
export const RARITY_COLORS: Record<string, { color: string; bg: string }> = {
  common: { color: "#64748b", bg: "#f1f5f9" },
  uncommon: { color: "#16a34a", bg: "#f0fdf4" },
  rare: { color: "#2563eb", bg: "#eff6ff" },
  epic: { color: "#7c3aed", bg: "#f5f3ff" },
  legendary: { color: "#d97706", bg: "#fffbeb" },
};

export type CharacterColorKey = keyof typeof CHARACTER_COLORS;
