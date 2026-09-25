/**
 * Lottie Registry - Manages available Lottie animations
 */

export interface LottieRegistryItem {
  id: string
  name: string
  displayName: string
  path: string
  filePath?: string // Full path to the JSON file
  directoryPath?: string // Full path to the lottie directory
  category: string
  description?: string
  tags?: string[]
  thumbnail?: string
}

/**
 * Get all available Lottie animations from the dynamicAssets package
 * Uses API route to scan filesystem dynamically
 */
export async function getAvailableLotties(): Promise<LottieRegistryItem[]> {
  try {
    const response = await fetch("/api/lotties/scan")
    const data = await response.json()

    if (data.success) {
      return data.lotties
    } else {
      console.error("Failed to scan lotties:", data.error)
      return []
    }
  } catch (error) {
    console.error("Error fetching lotties:", error)
    return []
  }
}

/**
 * Search lotties by name or tags
 */
export function searchLotties(
  lotties: LottieRegistryItem[],
  query: string,
): LottieRegistryItem[] {
  const lowerQuery = query.toLowerCase()
  return lotties.filter(
    (lottie) =>
      lottie.name.toLowerCase().includes(lowerQuery) ||
      lottie.displayName.toLowerCase().includes(lowerQuery) ||
      lottie.category.toLowerCase().includes(lowerQuery) ||
      lottie.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  )
}

/**
 * Get lottie by ID
 */
export function getLottieById(
  lotties: LottieRegistryItem[],
  id: string,
): LottieRegistryItem | undefined {
  return lotties.find((lottie) => lottie.id === id)
}

/**
 * Get lotties by category
 */
export function getLottiesByCategory(
  lotties: LottieRegistryItem[],
  category: string,
): LottieRegistryItem[] {
  return lotties.filter((lottie) => lottie.category === category)
}

/**
 * Get all categories
 */
export function getCategories(lotties: LottieRegistryItem[]): string[] {
  return Array.from(new Set(lotties.map((lottie) => lottie.category))).sort()
}

/**
 * Load lottie data from registry item
 * Uses dynamic fetch to load JSON files from the filesystem
 */
export async function loadLottieData(
  item: LottieRegistryItem,
): Promise<any | null> {
  try {
    // Use the path from the registry item
    const jsonPath = item.path

    console.log(`Loading animation data for ${item.name} from ${jsonPath}`)

    // Fetch the JSON file
    const response = await fetch(jsonPath)
    if (!response.ok) {
      console.error(
        `Failed to fetch ${item.name}: ${response.status} ${response.statusText}`,
      )
      return null
    }

    const data = await response.json()
    console.log(`Successfully loaded animation data for ${item.name}`)
    return data
  } catch (error) {
    console.error(`Error loading Lottie data for ${item.name}:`, error)
    return null
  }
}
