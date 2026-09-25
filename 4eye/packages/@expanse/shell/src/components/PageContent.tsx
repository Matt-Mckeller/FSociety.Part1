"use client"

import { useMemo } from "react"
import { Box, type SxProps, type Theme } from "@mui/material"
import type { Position, TileConfig } from "@expanse/map"
import { PlaceholderPage } from "./PlaceholderPage"

// =============================================================================
// Types
// =============================================================================

/**
 * Function that renders page content for a position.
 */
export type PageRenderer = (
  position: Position,
  tile: TileConfig | null
) => React.ReactNode

/**
 * Registry mapping tile types/IDs to page renderers.
 * 
 * Keys can be:
 * - Tile ID (e.g., "home", "settings")
 * - Position string (e.g., "0,0", "-1,2")
 * - "default" for fallback
 */
export interface PageRegistry {
  [key: string]: PageRenderer | undefined
}

export interface PageContentProps {
  /** Current grid position */
  position: Position
  /** Tile configuration for current position (null if undefined) */
  tile: TileConfig | null
  /** Map of tile IDs/positions to page renderers */
  registry: PageRegistry
  /** Custom fallback renderer (overrides registry.default) */
  fallback?: PageRenderer
  /** Custom styles */
  sx?: SxProps<Theme>
}

// =============================================================================
// Utilities
// =============================================================================

/**
 * Get position string key for registry lookup.
 */
function getPositionKey(position: Position): string {
  return `${position.x},${position.y}`
}

/**
 * Default fallback renderer - shows PlaceholderPage.
 */
const defaultFallback: PageRenderer = (position, tile) => (
  <PlaceholderPage position={position} tile={tile} />
)

// =============================================================================
// PageContent Component
// =============================================================================

/**
 * Dynamic page content renderer for grid navigation.
 * 
 * Looks up the appropriate renderer from the registry in order:
 * 1. By tile ID (if tile exists)
 * 2. By position string (e.g., "0,0")
 * 3. Registry default
 * 4. Props fallback
 * 5. Built-in PlaceholderPage
 * 
 * @example
 * ```tsx
 * const registry: PageRegistry = {
 *   home: () => <HomePage />,
 *   settings: () => <SettingsPage />,
 *   "0,0": () => <CenterPage />,
 *   default: (pos, tile) => <PlaceholderPage position={pos} tile={tile} />,
 * };
 * 
 * <PageContent
 *   position={position}
 *   tile={currentTile}
 *   registry={registry}
 * />
 * ```
 */
export function PageContent({
  position,
  tile,
  registry,
  fallback,
  sx,
}: PageContentProps) {
  const content = useMemo(() => {
    // Try tile ID first (e.g., "home", "settings")
    if (tile?.id && registry[tile.id]) {
      const renderer = registry[tile.id]
      if (renderer) return renderer(position, tile)
    }

    // Try position string (e.g., "0,0", "-1,2")
    const posKey = getPositionKey(position)
    const posRenderer = registry[posKey]
    if (posRenderer) {
      return posRenderer(position, tile)
    }

    // Try registry default
    const defaultRenderer = registry["default"]
    if (defaultRenderer) {
      return defaultRenderer(position, tile)
    }

    // Try props fallback
    if (fallback) {
      return fallback(position, tile)
    }

    // Built-in fallback
    return defaultFallback(position, tile)
  }, [position, tile, registry, fallback])

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        ...sx,
      }}
    >
      {content}
    </Box>
  )
}

export default PageContent
