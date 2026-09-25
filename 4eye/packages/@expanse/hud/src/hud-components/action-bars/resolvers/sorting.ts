/**
 * Nav Item Sorting
 * 
 * Sort nav items by proximity to grid center and position.
 */

import type { Position } from "@expanse/map"
import type { SimpleBarItem } from "../components/SimpleBar"
import { distanceFromCenter } from "./position"

/**
 * Sort nav items by proximity to grid center.
 * 
 * Default sorting:
 * 1. Items closer to center come first
 * 2. Items at same distance sorted by vertical position (top first)
 * 
 * @param items - Nav items to sort
 * @param center - Grid center position for distance calculation
 * @param customSortFn - Optional custom sort function
 * @returns New sorted array (original unchanged)
 */
export function sortByProximity(
  items: SimpleBarItem[],
  center: Position,
  customSortFn?: (a: SimpleBarItem, b: SimpleBarItem) => number
): SimpleBarItem[] {
  if (customSortFn) {
    return [...items].sort(customSortFn)
  }

  return [...items].sort((a, b) => {
    const distA = distanceFromCenter(a.position, center)
    const distB = distanceFromCenter(b.position, center)
    
    // If distances are significantly different, sort by distance
    if (Math.abs(distA - distB) > 0.5) {
      return distA - distB
    }
    
    // Otherwise sort by vertical position (top first)
    return a.position.y - b.position.y
  })
}

/**
 * Limit the number of items in an array.
 * 
 * @param items - Items to limit
 * @param maxItems - Maximum number to keep
 * @returns Sliced array or original if no limit
 */
export function limitItems<T>(items: T[], maxItems?: number): T[] {
  if (!maxItems || maxItems <= 0) {
    return items
  }
  return items.slice(0, maxItems)
}
