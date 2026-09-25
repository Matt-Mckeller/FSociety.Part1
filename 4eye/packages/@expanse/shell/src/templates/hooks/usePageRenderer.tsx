"use client"

import { useMemo, type ReactNode } from "react"
import type { Position, TileConfig } from "@expanse/map"
import type { PageRegistry } from "../../components/PageContent"
import { PageContent } from "../../components/PageContent"

/**
 * Props for usePageRenderer hook
 */
export interface UsePageRendererOptions {
  /** Current grid position */
  position: Position
  /** Current tile configuration */
  currentTile: TileConfig | null
  /** Children (either static or function) */
  children?: ReactNode | ((position: Position, tile: TileConfig | null) => ReactNode)
  /** Page registry for dynamic rendering */
  pageRegistry?: PageRegistry | null
}

/**
 * Hook to render page content based on children or page registry
 * 
 * Handles the common pattern in templates where content can be provided
 * as children (static or function) or via a page registry.
 * 
 * Priority:
 * 1. Children (if provided)
 * 2. Page registry (if provided)
 * 3. null
 * 
 * @example
 * ```tsx
 * const content = usePageRenderer({
 *   position,
 *   currentTile,
 *   children,
 *   pageRegistry,
 * })
 * 
 * return <Box>{content}</Box>
 * ```
 */
export function usePageRenderer({
  position,
  currentTile,
  children,
  pageRegistry,
}: UsePageRendererOptions): ReactNode {
  return useMemo(() => {
    // If children provided, use them
    if (children !== undefined) {
      return typeof children === "function"
        ? children(position, currentTile)
        : children
    }

    // If page registry provided, use it
    if (pageRegistry) {
      return (
        <PageContent
          position={position}
          tile={currentTile}
          registry={pageRegistry}
        />
      )
    }

    // Otherwise, return null
    return null
  }, [children, position, currentTile, pageRegistry])
}
