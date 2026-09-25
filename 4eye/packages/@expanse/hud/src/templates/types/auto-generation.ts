/**
 * Auto-Generation Types
 * 
 * Types for automatic navigation and page registration
 */

import type { SimpleBarItem } from "../../hud-components/action-bars"

// =============================================================================
// Auto-Navigation
// =============================================================================

/**
 * How to automatically generate navigation items
 */
export type AutoNavigationMode = 
  | "from-grid"      // Generate from grid tile metadata
  | "from-pages"     // Generate from page registry
  | "none"          // Manual configuration required
  | false           // Disabled

/**
 * Auto-navigation generation options
 */
export interface AutoNavigationOptions {
  /** Generation mode */
  mode: AutoNavigationMode
  /** Include tiles by category */
  includeCategories?: string[]
  /** Exclude tiles by category */
  excludeCategories?: string[]
  /** Maximum items per side */
  maxItemsPerSide?: number
  /** Group items by category */
  groupByCategory?: boolean
  /** Custom sort function */
  sortFn?: (a: SimpleBarItem, b: SimpleBarItem) => number
}

// =============================================================================
// Page Auto-Registration
// =============================================================================

/**
 * Simple page component mapping
 */
export type AutoPageMap = Record<string, React.ComponentType<any>>

/**
 * Page component with metadata
 */
export interface PageComponentWithMeta {
  /** Component to render */
  component: React.ComponentType<any>
  /** Optional title override */
  title?: string
  /** Optional description */
  description?: string
}

/**
 * Enhanced page mapping with metadata
 */
export type AutoPageMapWithMeta = Record<string, PageComponentWithMeta>
