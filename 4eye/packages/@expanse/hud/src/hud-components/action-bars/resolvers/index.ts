/**
 * Nav Item Resolvers
 * 
 * Resolve nav items from grid tile configurations.
 * 
 * @example
 * ```tsx
 * import { resolveNavItems, parseNavItemResolverOptions } from "./resolvers"
 * 
 * const options = parseNavItemResolverOptions("from-grid")
 * if (options) {
 *   const { left, right } = resolveNavItems(gridConfig, options)
 * }
 * ```
 */

// Main resolution function
export { resolveNavItems, parseNavItemResolverOptions } from "./resolveNavItems"

// Types
export type {
  NavItemGroups,
  NavItemResolverOptions,
  NavItemResolverMode,
  NavItemResolverInput,
} from "./NavItemResolver.types"

// Utilities (for advanced usage)
export { isLeftOfCenter, isRightOfCenter, distanceFromCenter, getGridCenter } from "./position"
export { filterValidTiles } from "./filters"
export { convertTileToNavItem, convertTilesToNavItems } from "./converters"
export { sortByProximity, limitItems } from "./sorting"
