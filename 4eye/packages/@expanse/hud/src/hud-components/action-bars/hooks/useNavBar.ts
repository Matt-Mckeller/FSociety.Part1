"use client"

import { useMemo, useCallback } from "react"
import { useNavigation } from '@expanse/map/navigation/contexts/NavigationContext'
import type { NavItem } from "../types/ActionBarPosition.types"
import type { NavBarConfig } from "../types/NavBar.types"

/**
 * Hook return type
 */
export interface UseNavBarReturn {
  /** Resolved nav items */
  items: NavItem[]
  
  /** Current position */
  currentPosition: { x: number; y: number }
  
  /** Navigate to an item */
  onNavigate: (item: NavItem) => void
  
  /** Check if item is active */
  isItemActive: (item: NavItem) => boolean
}

/**
 * Hook to use NavBar with navigation context
 * 
 * Automatically resolves nav items from grid config and provides
 * navigation handlers.
 * 
 * @example
 * ```tsx
 * function MyNavBar() {
 *   const { items, currentPosition, onNavigate } = useNavBar({
 *     id: "main-nav",
 *     position: "bottom-center",
 *     autoResolve: "from-grid",
 *   })
 *   
 *   return (
 *     <NavBar
 *       items={items}
 *       currentPosition={currentPosition}
 *       onNavigate={onNavigate}
 *     />
 *   )
 * }
 * ```
 */
export function useNavBar(config?: Partial<NavBarConfig>): UseNavBarReturn {
  const navigation = useNavigation()
  
  // Resolve items from grid config
  const items = useMemo<NavItem[]>(() => {
    // If manual items provided, use them
    if (config?.items && config.items.length > 0) {
      return config.items
    }
    
    // Auto-resolve from grid
    if (config?.autoResolve === "from-grid" || !config?.autoResolve) {
      const gridConfig = config?.sourceConfig ?? navigation.config
      
      return gridConfig.tiles
        .filter(tile => tile.behavior?.hidden !== true)
        .slice(0, config?.maxItems ?? 10)
        .map(tile => ({
          id: `nav-${tile.position.x}-${tile.position.y}`,
          type: "nav" as const,
          label: tile.display?.label ?? tile.seo?.title ?? `(${tile.position.x}, ${tile.position.y})`,
          position: tile.position,
          route: tile.url,
        }))
    }
    
    return []
  }, [config?.items, config?.autoResolve, config?.sourceConfig, config?.maxItems, navigation.config])
  
  // Current position
  const currentPosition = navigation.position
  
  // Navigate handler
  const onNavigate = useCallback((item: NavItem) => {
    navigation.navigateTo(item.position.x, item.position.y)
  }, [navigation])
  
  // Check if item is active
  const isItemActive = useCallback((item: NavItem): boolean => {
    return item.position.x === currentPosition.x && item.position.y === currentPosition.y
  }, [currentPosition])
  
  return {
    items,
    currentPosition,
    onNavigate,
    isItemActive,
  }
}
