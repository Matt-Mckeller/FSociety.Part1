/**
 * Centralized Lottie Theme Registry
 *
 * Single source of truth for all animation themes and variants.
 * Uses folder-based auto-discovery from ./animations/ folder.
 */

import { ALL_ANIMATION_THEMES } from "./animations"

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ThemeDefinition {
  /** Theme identifier (e.g., "purple-light", "blue-dark") */
  id: string
  /** Human-readable theme name */
  name: string
  /** Theme description */
  description: string
  /** Base color name (purple, blue, green, etc.) */
  baseColor: string
  /** Light or dark mode */
  mode: "light" | "dark"
  /** Whether this theme is available for all animations */
  universal: boolean
  /** Specific animations this theme supports (if not universal) */
  supportedAnimations?: string[]
}

export interface VariantThemeSupport {
  /** Variant name (e.g., "default", "up", "halo-only") */
  variant: string
  /** Themes available for this specific variant */
  themes: string[]
}

export interface AnimationThemeSupport {
  /** Animation name */
  animationName: string
  /** Available variants with their specific theme support */
  variantThemes: VariantThemeSupport[]
  /** Legacy: All supported themes (union of all variant themes) */
  get supportedThemes(): string[]
  /** Legacy: All variant names */
  get variants(): string[]
}

// Helper to create animation support with computed properties
function createAnimationSupport(
  animationName: string,
  variantThemes: VariantThemeSupport[],
): AnimationThemeSupport {
  return {
    animationName,
    variantThemes,
    get supportedThemes() {
      const allThemes = new Set<string>()
      this.variantThemes.forEach((v) =>
        v.themes.forEach((t) => allThemes.add(t)),
      )
      return Array.from(allThemes).sort()
    },
    get variants() {
      return this.variantThemes.map((v) => v.variant)
    },
  }
}

// Type aliases for backwards compatibility
export type ThemeVariant = string
export type ThemeName = string

/**
 * Centralized registry of all available themes
 */
export const THEME_REGISTRY: ThemeDefinition[] = [
  // Purple themes
  {
    id: "purple-light",
    name: "Purple Light",
    description: "Light purple theme with bright accents",
    baseColor: "purple",
    mode: "light",
    universal: true,
  },
  {
    id: "purple-dark",
    name: "Purple Dark",
    description: "Dark purple theme with deep tones",
    baseColor: "purple",
    mode: "dark",
    universal: true,
  },

  // Blue themes
  {
    id: "blue-light",
    name: "Blue Light",
    description: "Light blue theme with sky blue accents",
    baseColor: "blue",
    mode: "light",
    universal: true,
  },
  {
    id: "blue-dark",
    name: "Blue Dark",
    description: "Dark blue theme with navy tones",
    baseColor: "blue",
    mode: "dark",
    universal: true,
  },

  // Green themes
  {
    id: "green-light",
    name: "Green Light",
    description: "Light green theme with nature tones",
    baseColor: "green",
    mode: "light",
    universal: true,
  },
  {
    id: "green-dark",
    name: "Green Dark",
    description: "Dark green theme with forest tones",
    baseColor: "green",
    mode: "dark",
    universal: true,
  },

  // Orange themes
  {
    id: "orange-light",
    name: "Orange Light",
    description: "Light orange theme with warm tones",
    baseColor: "orange",
    mode: "light",
    universal: true,
  },
  {
    id: "orange-dark",
    name: "Orange Dark",
    description: "Dark orange theme with sunset tones",
    baseColor: "orange",
    mode: "dark",
    universal: true,
  },

  // Red themes
  {
    id: "red-light",
    name: "Red Light",
    description: "Light red theme with bright accents",
    baseColor: "red",
    mode: "light",
    universal: true,
  },
  {
    id: "red-dark",
    name: "Red Dark",
    description: "Dark red theme with deep tones",
    baseColor: "red",
    mode: "dark",
    universal: true,
  },

  // Teal themes
  {
    id: "teal-light",
    name: "Teal Light",
    description: "Light teal theme with ocean tones",
    baseColor: "teal",
    mode: "light",
    universal: true,
  },
  {
    id: "teal-dark",
    name: "Teal Dark",
    description: "Dark teal theme with deep ocean tones",
    baseColor: "teal",
    mode: "dark",
    universal: true,
  },
]

// Universal themes list (computed once) - exported for use in animation theme files
export const UNIVERSAL_THEMES = THEME_REGISTRY.filter((t) => t.universal).map(
  (t) => t.id,
)

// ============================================================================
// ANIMATION THEME SUPPORT (Auto-discovered from ./animations/ folder)
// ============================================================================

/**
 * Animation-specific theme support
 * Auto-discovered from ./animations/*.themes.ts files
 *
 * To add a new animation:
 * 1. Create a {AnimationName}.themes.ts file in ./animations/
 * 2. Export animationName and variantThemes
 * 3. Add export to ./animations/index.ts
 */
export const ANIMATION_THEME_SUPPORT: AnimationThemeSupport[] =
  ALL_ANIMATION_THEMES.map((animation) =>
    createAnimationSupport(animation.animationName, animation.variantThemes),
  )

// ============================================================================
// SYNC FUNCTIONS (used by theme loader)
// ============================================================================

/**
 * Get all available themes for a specific animation
 */
export function getAvailableThemes(animationName: string): string[] {
  const support = ANIMATION_THEME_SUPPORT.find(
    (s) => s.animationName === animationName,
  )
  return support?.supportedThemes || []
}

/**
 * Get all available variants for a specific animation
 */
export function getAvailableVariants(animationName: string): string[] {
  const support = ANIMATION_THEME_SUPPORT.find(
    (s) => s.animationName === animationName,
  )
  return support?.variants || []
}

/**
 * Check if a theme is available for a specific animation
 */
export function isThemeAvailable(
  animationName: string,
  theme: string,
): boolean {
  const availableThemes = getAvailableThemes(animationName)
  return availableThemes.includes(theme)
}

/**
 * Get theme definition by ID
 */
export function getThemeDefinition(
  themeId: string,
): ThemeDefinition | undefined {
  return THEME_REGISTRY.find((theme) => theme.id === themeId)
}

/**
 * Get all themes by base color
 */
export function getThemesByColor(baseColor: string): ThemeDefinition[] {
  return THEME_REGISTRY.filter((theme) => theme.baseColor === baseColor)
}

/**
 * Get all themes by mode
 */
export function getThemesByMode(mode: "light" | "dark"): ThemeDefinition[] {
  return THEME_REGISTRY.filter((theme) => theme.mode === mode)
}

// ============================================================================
// ASYNC FUNCTIONS (for UI components - backwards compatible with lottieThemeDiscovery)
// ============================================================================

/**
 * Get themes for a specific animation variant
 * This is the key function that returns variant-specific theme lists
 */
export async function getThemesForVariant(
  animationName: string,
  variant: string = "default",
): Promise<ThemeName[]> {
  const support = ANIMATION_THEME_SUPPORT.find(
    (s) => s.animationName === animationName,
  )
  if (!support) return []

  const variantSupport = support.variantThemes.find(
    (v) => v.variant === variant,
  )
  return variantSupport?.themes || []
}

/**
 * Get all available variants for a specific animation (async version)
 */
export async function getAllVariants(
  animationName: string,
): Promise<ThemeVariant[]> {
  return getAvailableVariants(animationName)
}

/**
 * Get all available themes for an animation across all variants
 */
export async function getAllThemes(
  animationName: string,
): Promise<ThemeName[]> {
  return getAvailableThemes(animationName)
}

/**
 * Check if a specific theme exists for an animation and variant
 */
export async function themeExists(
  animationName: string,
  variant: string,
  theme: string,
): Promise<boolean> {
  const themes = await getThemesForVariant(animationName, variant)
  return themes.includes(theme)
}
