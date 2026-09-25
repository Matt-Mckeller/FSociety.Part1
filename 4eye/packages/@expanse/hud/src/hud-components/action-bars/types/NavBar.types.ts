import type { SxProps, Theme } from "@mui/material"
import type { ReactNode } from "react"
import type { Position } from '@expanse/map/navigation/types/Position.types'
import type { MapGridNavigationConfig } from '@expanse/map/navigation/types/MapGridNavigation.types'
import type {
  ActionBarPosition,
  ActionBarPreset,
  ActionBarSkin,
  ActionBarSize,
  NavItem,
} from "./ActionBarPosition.types"

// =============================================================================
// NavBar Configuration
// =============================================================================

/**
 * Auto-resolve strategy for nav items
 */
export type NavItemResolveStrategy =
  | "from-grid"        // Derive from MapGridNavigationConfig tiles
  | "from-current"     // Derive from current position neighbors
  | "manual"           // Items provided directly (no auto-resolve)

/**
 * NavBar configuration (extends ActionBar)
 */
export interface NavBarConfig {
  /** Unique identifier */
  id: string
  
  /** Position (preset or full config) */
  position: ActionBarPosition | ActionBarPreset
  
  /** Bar size */
  size?: ActionBarSize
  
  /** Visual skin */
  skin?: ActionBarSkin
  
  /** Manual items (used when autoResolve is "manual" or to supplement) */
  items?: NavItem[]
  
  /** Auto-resolve strategy */
  autoResolve?: NavItemResolveStrategy
  
  /** Source map grid config (required for "from-grid" strategy) */
  sourceConfig?: MapGridNavigationConfig
  
  /** Maximum items to display */
  maxItems?: number
  
  /** Show active indicator on current item */
  showActiveIndicator?: boolean
  
  /** Which edges to resolve items from (for "from-current" strategy) */
  resolveEdges?: ("left" | "right" | "top" | "bottom")[]
  
  /** Visible state */
  visible?: boolean
}

// =============================================================================
// NavBar Props
// =============================================================================

/**
 * NavBar component props
 */
export interface NavBarProps {
  /** NavItems to display */
  items: NavItem[]
  
  /** Current position (for active state) */
  currentPosition?: Position
  
  /** Position configuration */
  position?: ActionBarPosition | ActionBarPreset
  
  /** Bar size */
  size?: ActionBarSize
  
  /** Visual skin */
  skin?: ActionBarSkin
  
  /** Show active indicator */
  showActiveIndicator?: boolean
  
  /** Click handler for nav items */
  onNavigate?: (item: NavItem) => void
  
  /** Custom styles */
  sx?: SxProps<Theme>
}

// =============================================================================
// NavBar Item Props
// =============================================================================

/**
 * Individual nav item props
 */
export interface NavItemProps {
  /** The nav item */
  item: NavItem
  
  /** Whether this item is currently active */
  isActive?: boolean
  
  /** Show active indicator */
  showActiveIndicator?: boolean
  
  /** Orientation (horizontal or vertical) */
  orientation?: "horizontal" | "vertical"
  
  /** Click handler */
  onClick?: () => void
  
  /** Custom styles */
  sx?: SxProps<Theme>
}
