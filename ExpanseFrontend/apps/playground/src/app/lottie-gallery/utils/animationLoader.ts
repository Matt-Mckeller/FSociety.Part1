/**
 * Animation Loader Utility
 * Dynamically loads animation JSON files from API
 */

import type { Animation } from "./animationRegistry"

// Cache for loaded animation data
const animationCache: Record<string, any> = {}

/**
 * Load animation data by fetching from API
 * @param animation - Animation object with path (API endpoint)
 * @returns Promise resolving to animation JSON data
 */
export async function loadAnimationData(animation: Animation): Promise<any> {
  // Check cache first
  if (animationCache[animation.path]) {
    return animationCache[animation.path]
  }

  try {
    // Fetch from the API path provided by the scan endpoint
    const response = await fetch(animation.path)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    // Cache the data
    animationCache[animation.path] = data

    return data
  } catch (error) {
    throw new Error(
      `Failed to load animation "${animation.name}": ${error instanceof Error ? error.message : "Unknown error"}`,
    )
  }
}

/**
 * Check if animation data is available (always true now since we fetch dynamically)
 */
export function hasAnimationData(animation: Animation): boolean {
  return !!animation.path
}

/**
 * Clear the animation cache
 */
export function clearAnimationCache(): void {
  Object.keys(animationCache).forEach((key) => delete animationCache[key])
}
