/**
 * Generic Lottie Theme Loader
 *
 * Centralized theme loading system that works for all animations.
 * Replaces per-component theme loaders with a unified approach.
 *
 * Supports two file formats:
 * 1. Consolidated: {AnimationName}.theme-configs.ts (preferred)
 * 2. Individual: themes/{variant}/{theme}.ts (legacy fallback)
 */

import type { LottieThemeConfig } from "./lottieColorMapping"
import { isThemeAvailable, getAvailableVariants } from "./lottieThemeRegistry"

// Cache for loaded themes to avoid repeated file system access
const themeCache = new Map<string, LottieThemeConfig>()

// Cache for consolidated theme modules to avoid repeated imports
const consolidatedModuleCache = new Map<
  string,
  Record<string, LottieThemeConfig> | null
>()

/**
 * Folder mapping for animations where folder name differs from animation name
 * Key: animation name, Value: folder name
 */
const ANIMATION_FOLDER_MAP: Record<string, string> = {
  VersusClash: "Vs",
}

/**
 * Get the folder path for an animation
 */
function getAnimationFolder(animationName: string): string {
  return ANIMATION_FOLDER_MAP[animationName] || animationName
}

/**
 * Try to load theme from consolidated .theme-configs.ts file
 */
async function tryLoadFromConsolidated(
  animationName: string,
  variant: string,
  theme: string,
): Promise<LottieThemeConfig | null> {
  // Check if we've already tried to load this animation's consolidated file
  if (consolidatedModuleCache.has(animationName)) {
    const themesById = consolidatedModuleCache.get(animationName)
    if (themesById) {
      const themeId = `${variant}-${theme}`
      return themesById[themeId] || null
    }
    return null
  }

  const folderName = getAnimationFolder(animationName)

  try {
    // Try to import consolidated theme file
    const consolidated = await import(
      `../lotties/${folderName}/${animationName}.theme-configs.ts`
    )

    if (consolidated.themesById) {
      // Cache the themesById lookup for future use
      consolidatedModuleCache.set(animationName, consolidated.themesById)

      const themeId = `${variant}-${theme}`
      return consolidated.themesById[themeId] || null
    }
  } catch {
    // Consolidated file doesn't exist, mark as null to skip future attempts
    consolidatedModuleCache.set(animationName, null)
  }

  return null
}

/**
 * Generic theme loader that works for any animation
 *
 * @param animationName - Name of the animation (e.g., "RocketLaunch", "AngelWingsHalo")
 * @param variant - Theme variant (e.g., "default", "up", "halo-only")
 * @param theme - Theme name (e.g., "purple-light", "blue-dark")
 * @returns Promise<LottieThemeConfig> - Loaded theme configuration
 */
export async function loadTheme(
  animationName: string,
  variant: string,
  theme: string,
): Promise<LottieThemeConfig> {
  const cacheKey = `${animationName}:${variant}:${theme}`

  // Return cached theme if available
  if (themeCache.has(cacheKey)) {
    return themeCache.get(cacheKey)!
  }

  // Validate theme availability
  if (!isThemeAvailable(animationName, theme)) {
    throw new Error(
      `Theme "${theme}" is not available for animation "${animationName}"`,
    )
  }

  // Validate variant
  const availableVariants = getAvailableVariants(animationName)
  if (!availableVariants.includes(variant)) {
    throw new Error(
      `Variant "${variant}" is not available for animation "${animationName}". Available: ${availableVariants.join(", ")}`,
    )
  }

  // Try consolidated file first (new format)
  const consolidatedTheme = await tryLoadFromConsolidated(
    animationName,
    variant,
    theme,
  )
  if (consolidatedTheme) {
    // Validate and cache
    validateThemeConfig(consolidatedTheme, theme)
    themeCache.set(cacheKey, consolidatedTheme)
    return consolidatedTheme
  }

  // Fallback to individual files (legacy format)
  const folderName = getAnimationFolder(animationName)
  try {
    const themeModule = await import(
      `../lotties/${folderName}/themes/${variant}/${theme}.ts`
    )

    const themeConfig: LottieThemeConfig = themeModule.default || themeModule

    validateThemeConfig(themeConfig, theme)

    // Cache the loaded theme
    themeCache.set(cacheKey, themeConfig)

    return themeConfig
  } catch (error) {
    console.error(
      `[GenericThemeLoader] Failed to load theme ${theme} for ${animationName} (variant: ${variant}):`,
      error,
    )
    throw new Error(
      `Failed to load theme "${theme}" for animation "${animationName}": ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}

/**
 * Validate theme configuration structure
 */
function validateThemeConfig(
  themeConfig: LottieThemeConfig,
  themeName: string,
): void {
  if (!themeConfig.colors || typeof themeConfig.colors !== "object") {
    throw new Error(
      `Invalid theme structure for ${themeName}: missing colors object`,
    )
  }

  if (!Array.isArray(themeConfig.skippedElements)) {
    throw new Error(
      `Invalid theme structure for ${themeName}: missing skippedElements array`,
    )
  }

  if (
    !themeConfig.themeId ||
    !themeConfig.name ||
    !themeConfig.baseColor ||
    !themeConfig.mode
  ) {
    throw new Error(
      `Invalid theme structure for ${themeName}: missing required fields (themeId, name, baseColor, mode)`,
    )
  }
}

/**
 * Preload multiple themes for faster switching
 *
 * @param animationName - Name of the animation
 * @param themeVariants - Array of [variant, theme] pairs to preload
 */
export async function preloadThemes(
  animationName: string,
  themeVariants: Array<[string, string]>,
): Promise<void> {
  const preloadPromises = themeVariants.map(([variant, theme]) =>
    loadTheme(animationName, variant, theme).catch((error) => {
      console.warn(
        `[GenericThemeLoader] Failed to preload theme ${theme} (variant: ${variant}):`,
        error,
      )
    }),
  )

  await Promise.all(preloadPromises)
}

/**
 * Clear theme cache (useful for testing or memory management)
 */
export function clearThemeCache(): void {
  themeCache.clear()
  consolidatedModuleCache.clear()
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return {
    cachedThemes: themeCache.size,
    cacheKeys: Array.from(themeCache.keys()),
  }
}

/**
 * Check if a theme is cached
 */
export function isThemeCached(
  animationName: string,
  variant: string,
  theme: string,
): boolean {
  const cacheKey = `${animationName}:${variant}:${theme}`
  return themeCache.has(cacheKey)
}
