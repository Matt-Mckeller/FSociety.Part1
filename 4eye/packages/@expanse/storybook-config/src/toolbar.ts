/**
 * Storybook Toolbar Items
 *
 * Dropdown items for theme selection, organized by tier.
 */

import type { ExpanseTheme, ThemeMode } from "@expanse/theme"

/**
 * Default theme color
 *
 * ACTIVE PRIMARY THEME — blue is the focus theme for all development.
 * All stories default to blue. Purple is deprecated (retained for compatibility).
 */
export const DEFAULT_COLOR: ExpanseTheme = "blue"

/**
 * Default theme mode
 * 
 * Set to "light" to match white background preference.
 * Users can switch to dark via toolbar.
 */
export const DEFAULT_MODE: ThemeMode = "light"

/**
 * Theme mode dropdown items
 */
export const themeModeItems = [
  { value: "light", title: "☀️ Light" },
  { value: "dark", title: "🌙 Dark" },
]

/**
 * Theme color dropdown items with tier grouping
 * Dividers help users understand theme categories
 */
export const themeColorItems = [
  // PRIMARY TIER - Core development themes (Blue is focus)
  { value: "divider-primary", title: "─── PRIMARY ───", disabled: true },
  { value: "blue", title: "💙 Blue" },
  { value: "red", title: "❤️ Red" },
  { value: "neon", title: "⚡ Neon" },

  // SECONDARY TIER - Broader appeal
  { value: "divider-secondary", title: "─── SECONDARY ───", disabled: true },
  { value: "orange", title: "🧡 Orange" },
  { value: "mono", title: "⬛ Mono" },
  { value: "purple", title: "💜 Purple (deprecated)" },

  // TERTIARY TIER - Exploration & fun
  { value: "divider-tertiary", title: "─── TERTIARY ───", disabled: true },
  { value: "green", title: "💚 Green" },
  { value: "teal", title: "🩵 Teal" },
  { value: "gamified", title: "🎮 Gamified" },
  { value: "gamified-desaturated", title: "🌸 Soft" },
]

/**
 * Theme color items without dividers (flat list)
 * For packages that want a simpler dropdown
 */
export const themeColorItemsFlat = [
  { value: "blue", title: "💙 Blue" },
  { value: "red", title: "❤️ Red" },
  { value: "neon", title: "⚡ Neon" },
  { value: "orange", title: "🧡 Orange" },
  { value: "mono", title: "⬛ Mono" },
  { value: "purple", title: "💜 Purple (deprecated)" },
  { value: "green", title: "💚 Green" },
  { value: "teal", title: "🩵 Teal" },
  { value: "gamified", title: "🎮 Gamified" },
  { value: "gamified-desaturated", title: "🌸 Soft" },
]

/**
 * Primary tier themes only
 */
export const primaryThemeItems = [
  { value: "blue", title: "💙 Blue" },
  { value: "red", title: "❤️ Red" },
  { value: "neon", title: "⚡ Neon" },
]
