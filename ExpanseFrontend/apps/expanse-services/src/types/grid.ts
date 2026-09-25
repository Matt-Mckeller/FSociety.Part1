/**
 * Grid Navigation Types
 *
 * Position-based page routing for the grid navigation system.
 * Based on symbol-grid architecture.
 */

// =============================================================================
// Core Types
// =============================================================================

/**
 * Grid position coordinates (0-indexed)
 */
export interface Position {
  x: number
  y: number
}

/**
 * Navigation direction
 */
export type Direction = "up" | "down" | "left" | "right"

/**
 * Page type identifiers
 */
export type PageType =
  | "home"
  | "demos"
  | "components"
  | "navigation"
  | "layout"
  | "auth"
  | "api"
  | "websockets"
  | "settings"
  | "docs"
  | "about"
  | "contact"
  | "placeholder"

// =============================================================================
// Page Configuration
// =============================================================================

/**
 * Configuration for a special page at a specific position
 */
export interface PageTypeConfig {
  type: PageType
  position: Position
  title: string
  description?: string
  icon: string
  category?: string
}

/**
 * Grid configuration
 */
export const GRID_SIZE = 9
export const CENTER = { x: 4, y: 4 }

/**
 * Special pages registry
 * Maps grid positions to specific page types
 */
export const SPECIAL_PAGES: PageTypeConfig[] = [
  // Center - Home
  {
    type: "home",
    position: { x: 4, y: 4 },
    title: "Home",
    description: "Expanse Services Dashboard",
    icon: "Home",
    category: "core",
  },

  // Row 4 (center row) - Main features
  {
    type: "demos",
    position: { x: 3, y: 4 },
    title: "Demos",
    description: "Interactive component demos",
    icon: "PlayArrow",
    category: "features",
  },
  {
    type: "components",
    position: { x: 5, y: 4 },
    title: "Components",
    description: "UI component library",
    icon: "Widgets",
    category: "features",
  },

  // Row 3 - Navigation & Layout
  {
    type: "navigation",
    position: { x: 4, y: 3 },
    title: "Navigation",
    description: "Grid navigation system",
    icon: "GridView",
    category: "layout",
  },
  {
    type: "layout",
    position: { x: 3, y: 3 },
    title: "Layout",
    description: "Layout components",
    icon: "Dashboard",
    category: "layout",
  },

  // Row 5 - Services
  {
    type: "auth",
    position: { x: 4, y: 5 },
    title: "Auth",
    description: "Authentication demos",
    icon: "Lock",
    category: "services",
  },
  {
    type: "api",
    position: { x: 3, y: 5 },
    title: "API",
    description: "API explorer",
    icon: "Api",
    category: "services",
  },
  {
    type: "websockets",
    position: { x: 5, y: 5 },
    title: "WebSockets",
    description: "Real-time connections",
    icon: "Cable",
    category: "services",
  },

  // Corners - Settings & Info
  {
    type: "settings",
    position: { x: 0, y: 0 },
    title: "Settings",
    description: "App settings",
    icon: "Settings",
    category: "system",
  },
  {
    type: "docs",
    position: { x: 8, y: 0 },
    title: "Docs",
    description: "Documentation",
    icon: "Description",
    category: "system",
  },
  {
    type: "about",
    position: { x: 0, y: 8 },
    title: "About",
    description: "About Expanse",
    icon: "Info",
    category: "info",
  },
  {
    type: "contact",
    position: { x: 8, y: 8 },
    title: "Contact",
    description: "Contact us",
    icon: "Mail",
    category: "info",
  },
]

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Get page type from grid position
 */
export function getPageTypeFromPosition(position: Position): PageType {
  const specialPage = SPECIAL_PAGES.find(
    (p) => p.position.x === position.x && p.position.y === position.y,
  )
  return specialPage?.type ?? "placeholder"
}

/**
 * Get page config from position
 */
export function getPageConfigFromPosition(
  position: Position,
): PageTypeConfig | null {
  return (
    SPECIAL_PAGES.find(
      (p) => p.position.x === position.x && p.position.y === position.y,
    ) ?? null
  )
}

/**
 * Get page config by type
 */
export function getPageConfigByType(type: PageType): PageTypeConfig | null {
  return SPECIAL_PAGES.find((p) => p.type === type) ?? null
}

/**
 * Check if position is valid within grid
 */
export function isValidPosition(position: Position): boolean {
  return (
    position.x >= 0 &&
    position.x < GRID_SIZE &&
    position.y >= 0 &&
    position.y < GRID_SIZE
  )
}

/**
 * Get position key for React keys
 */
export function getPositionKey(position: Position): string {
  return `${position.x}-${position.y}`
}

/**
 * Calculate next position given direction
 */
export function getNextPosition(
  position: Position,
  direction: Direction,
): Position {
  switch (direction) {
    case "up":
      return { x: position.x, y: position.y - 1 }
    case "down":
      return { x: position.x, y: position.y + 1 }
    case "left":
      return { x: position.x - 1, y: position.y }
    case "right":
      return { x: position.x + 1, y: position.y }
    default:
      return position
  }
}
