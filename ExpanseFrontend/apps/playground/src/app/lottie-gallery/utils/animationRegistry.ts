/**
 * Lottie Animation Gallery Data
 * TypeScript registry of all animations with metadata
 */

export interface Animation {
  name: string
  path: string
  displayName?: string
  description?: string
  status: "optimized" | "original" | "unknown"
  category: string
  hasTheming: boolean
  isPending?: boolean
  useCases?: string[]
  complexity?: "low" | "medium" | "high"
  variant?: string
}

// Featured animations for AI theming system
export const FEATURED_ANIMATIONS: Animation[] = [
  // Rocket Launch - Action, momentum, progress
  {
    name: "RocketLaunch(Optimized)",
    path: "packages/dynamicAssets/lotties/animationData/RocketLaunchPadUpAndRight/RocketLaunchOptimized.json",
    displayName: "Rocket Launch",
    description: "Action, momentum, progress",
    status: "optimized",
    hasTheming: true,
    category: "Action",
    useCases: ["Loading states", "Launch announcements", "Progress indicators"],
    complexity: "high",
    isPending: false,
  },

  // Homework - Achievement, completion, success
  {
    name: "Homework (Optimized)",
    path: "packages/dynamicAssets/lotties/animationData/Homework/Homework Optimized.json",
    displayName: "Homework",
    description: "Achievement, completion, success",
    status: "optimized",
    hasTheming: true,
    category: "Achievement",
    useCases: ["Task completion", "Success messages", "Goal achievement"],
    complexity: "medium",
    isPending: false,
  },

  // Angel Wings Halo - Premium, celebration, excellence
  {
    name: "AngelWingsHalo(Optimized)",
    path: "packages/dynamicAssets/lotties/animationData/AngelWingsHalo/AngelWingsHaloOptimized.json",
    displayName: "Angel Wings Halo",
    description: "Premium, celebration, excellence",
    status: "optimized",
    hasTheming: true,
    category: "Celebration",
    useCases: ["Premium unlocks", "Achievements", "Milestone celebrations"],
    complexity: "low",
    isPending: false,
  },

  // Sprint Velocity (Light) - Speed, agility, performance
  {
    name: "(Light)SprintVelocity",
    path: "packages/dynamicAssets/lotties/animationData/LightModeSprintVelocity.json",
    displayName: "Sprint Velocity",
    description: "Speed, agility, performance",
    status: "original",
    hasTheming: true,
    category: "Speed",
    variant: "light",
    useCases: ["Performance metrics", "Speed indicators", "Fast actions"],
    complexity: "medium",
    isPending: false,
  },
]

/**
 * Skip Layers Configuration
 * Maps animation names to layers that should not be themed
 */
export const SKIP_LAYERS_CONFIG: Record<string, string[]> = {
  "Homework (Optimized)": ["SparkleEffect"],
  "RocketLaunch(Optimized)": [], // Theme everything
  "AngelWingsHalo(Optimized)": [
    // Skip all wing feather layers to preserve white/light wings
    // Only theme the HaloContainer gradient
    "LeftWingOuterFeather",
    "LeftWingUpperFeather",
    "LeftWingMidUpperFeather",
    "LeftWingMidLowerFeather",
    "LeftWingInnerFeather",
    "RightWingInnerFeather",
    "RightWingMidLowerFeather",
    "RightWingMidUpperFeather",
    "RightWingUpperFeather",
    "RightWingOuterFeather",
    // HaloContainer will be themed with primary colors
  ],
}

/**
 * Get skip layers for a specific animation
 */
export function getSkipLayersForAnimation(animName: string): string[] {
  return SKIP_LAYERS_CONFIG[animName] || []
}

// Primary list for gallery display
export const ANIMATIONS = FEATURED_ANIMATIONS

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const categories = new Set<string>()
  ANIMATIONS.forEach((anim) => categories.add(anim.category))
  return Array.from(categories).sort()
}

/**
 * Filter animations by criteria
 */
export interface FilterOptions {
  category?: string
  showPending?: boolean
}

export function filterAnimations(filters: FilterOptions = {}): Animation[] {
  const { category = "all", showPending = false } = filters

  return ANIMATIONS.filter((anim) => {
    if (category !== "all" && anim.category !== category) return false
    if (!showPending && anim.isPending) return false
    return true
  })
}

/**
 * Sort animations
 */
export type SortBy = "name" | "category"

export function sortAnimations(
  animations: Animation[],
  sortBy: SortBy = "name",
): Animation[] {
  const sorted = [...animations]

  if (sortBy === "name") {
    sorted.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy === "category") {
    sorted.sort((a, b) => {
      const catCompare = a.category.localeCompare(b.category)
      return catCompare !== 0 ? catCompare : a.name.localeCompare(b.name)
    })
  }

  return sorted
}
