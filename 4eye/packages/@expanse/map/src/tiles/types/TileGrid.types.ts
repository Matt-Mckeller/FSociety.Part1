import { MapGridNavigationConfig } from "../../navigation/types/MapGridNavigation.types"
import { Position } from "../../navigation/types/Position.types"

/**
 * Page registry for mapping positions to page components
 */
export interface PageRegistry {
  [key: string]: React.ComponentType<any>
}

/**
 * Variant for TileGrid rendering
 */
export type TileGridVariant = "single" | "with-neighbors" | "overview"

/**
 * Props for TileGrid container component
 */
export interface TileGridProps {
  /** Map grid navigation configuration */
  config: MapGridNavigationConfig
  
  /** Registry of page components */
  registry: PageRegistry
  
  /** Current active position */
  currentPosition: Position
  
  /** Rendering variant */
  variant?: TileGridVariant
  
  /** Tile click handler */
  onTileClick?: (position: Position) => void
}
