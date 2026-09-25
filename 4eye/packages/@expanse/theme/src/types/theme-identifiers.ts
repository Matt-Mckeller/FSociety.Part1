/**
 * Theme Identifiers and Metadata
 * 
 * Defines available themes, their tiers, and metadata for UI organization.
 */

/**
 * Theme tier classification
 * - primary: Core business themes - polished, tested, ready for production
 * - secondary: Broader appeal themes - good quality, may need refinement
 * - tertiary: Exploration/fun themes - experimental, lower priority
 */
export type ThemeTier = "primary" | "secondary" | "tertiary"

/**
 * Metadata for each theme
 */
export interface ThemeMetadata {
  /** Theme identifier (matches ExpanseTheme) */
  id: ExpanseTheme
  /** Display name for UI */
  displayName: string
  /** Short description of the theme's purpose/vibe */
  description: string
  /** Priority tier for development focus */
  tier: ThemeTier
  /** Optional: Market/audience this theme appeals to */
  targetAudience?: string
}

/**
 * Theme color selection type
 * Supports 9 color themes × 2 modes = 18 variations
 * 
 * Tiers:
 * - PRIMARY: blue, red, neon (active development focus — blue is #1)
 * - SECONDARY: orange, mono, purple (purple deprecated, kept for compatibility)
 * - TERTIARY: green, teal, gamified, gamified-desaturated (exploration)
 *
 * AI FOCUS: blue theme is the primary development target. Build and test
 * components against blue first. Red and Neon are secondary priorities.
 * Do not spend effort on purple — it is deprecated.
 */
export type ExpanseTheme = 
  | "purple"
  | "blue" 
  | "green" 
  | "orange" 
  | "red" 
  | "teal"
  | "gamified"
  | "gamified-desaturated"
  | "neon"
  | "mono"

/**
 * Theme metadata organized by tier for AI development prioritization
 * and UI organization (e.g., storybook dropdowns)
 */
export const THEME_METADATA: Record<ExpanseTheme, ThemeMetadata> = {
  // PRIMARY TIER - Active development focus
  // AI: blue is #1 priority. Build and verify all components against blue first.
  blue: {
    id: "blue",
    displayName: "Blue",
    description: "Professional, trustworthy - ideal for business applications",
    tier: "primary",
    targetAudience: "Education 1",
  },
  red: {
    id: "red",
    displayName: "Red",
    description: "Energy, action, urgency - great for alerts and CTAs",
    tier: "primary",
    targetAudience: "Education 2, Business, Services",
  },
  neon: {
    id: "neon",
    displayName: "Neon",
    description: "Electric cyan/mint - edgy, modern, tech-forward",
    tier: "primary",
    targetAudience: "Tech-savvy, younger users, gamers",
  },

  // SECONDARY TIER - Broader market appeal
  // NOTE: purple is deprecated — kept for compatibility but not actively developed
  orange: {
    id: "orange",
    displayName: "Orange",
    description: "Warm, friendly, creative - appeals to younger demographics",
    tier: "secondary",
    targetAudience: "China",
  },
  purple: {
    id: "purple",
    displayName: "Purple (deprecated)",
    description: "Legacy brand color — deprecated, retained for compatibility only",
    tier: "secondary",
    targetAudience: "Legacy",
  },
  mono: {
    id: "mono",
    displayName: "Mono",
    description: "Elegant grayscale - calming, minimalist, mental health focus",
    tier: "secondary",
    targetAudience: "Mental health, wellness, minimalist users",
  },

  // TERTIARY TIER - Exploration and fun
  green: {
    id: "green",
    displayName: "Green",
    description: "Nature, growth, calm - wellness and eco themes",
    tier: "tertiary",
    targetAudience: "Health, sustainability focused",
  },
  teal: {
    id: "teal",
    displayName: "Teal",
    description: "Unique, creative - distinctive alternative",
    tier: "tertiary",
    targetAudience: "Creative professionals",
  },
  gamified: {
    id: "gamified",
    displayName: "Gamified",
    description: "Vibrant game abilities - playful, energetic",
    tier: "tertiary",
    targetAudience: "Gamers, younger users",
  },
  "gamified-desaturated": {
    id: "gamified-desaturated",
    displayName: "Soft",
    description: "Japan-inspired soft palette - calming, sophisticated",
    tier: "tertiary",
    targetAudience: "Asian markets, users preferring subtle aesthetics",
  },
}

/**
 * Get themes filtered by tier
 */
export function getThemesByTier(tier: ThemeTier): ExpanseTheme[] {
  return Object.values(THEME_METADATA)
    .filter(m => m.tier === tier)
    .map(m => m.id)
}

/**
 * All themes organized by tier
 */
export const THEMES_BY_TIER = {
  primary: getThemesByTier("primary"),
  secondary: getThemesByTier("secondary"),
  tertiary: getThemesByTier("tertiary"),
} as const

/**
 * All available theme colors
 */
export const EXPANSE_THEMES: ExpanseTheme[] = [
  // Primary tier (blue = #1 focus)
  "blue",
  "red",
  "neon",
  // Secondary tier
  "orange",
  "neon",
  "mono",
  // Tertiary tier
  "green", 
  "teal",
  "gamified",
  "gamified-desaturated",
]
