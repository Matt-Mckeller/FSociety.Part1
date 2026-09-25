"use client"

import { useMemo } from "react"
import type { MapGridNavigationConfig } from "@expanse/map"
import type { SimpleBarItem } from "../../hud-components/action-bars"
import {
  resolveNavItems,
  parseNavItemResolverOptions,
  type NavItemResolverInput,
} from "../../hud-components/action-bars"
import type {
  PageRegistry,
  PageMapInput,
} from "@expanse/shell"
import { createPageRegistry, mergeRegistries } from "@expanse/shell"
import type { AutoNavigationMode, AutoNavigationOptions } from "../types/auto-generation"

/**
 * Props for useAutoGeneration hook
 */
export interface UseAutoGenerationOptions {
  /** Map grid navigation config */
  config: MapGridNavigationConfig
  /** Auto-sidebar derivation mode/options (accepts legacy AutoNavigationMode/Options) */
  autoNavigation?: AutoNavigationMode | AutoNavigationOptions | NavItemResolverInput
  /** Auto-pages configuration */
  autoPages?: PageMapInput
  /** Custom page registry to merge with auto-generated */
  customPageRegistry?: PageRegistry
  /** Manual left items (overrides auto-generated) */
  leftItems?: SimpleBarItem[]
  /** Manual right items (overrides auto-generated) */
  rightItems?: SimpleBarItem[]
}

/**
 * Result from useAutoGeneration hook
 */
export interface UseAutoGenerationResult {
  /** Final left navigation items */
  leftItems: SimpleBarItem[]
  /** Final right navigation items */
  rightItems: SimpleBarItem[]
  /** Final page registry (merged auto + custom) */
  pageRegistry: PageRegistry | null
}

/**
 * Hook to handle auto-derivation of sidebar items and page registry
 * 
 * Consolidates the auto-derivation logic that appears in multiple templates:
 * - Sidebar items derived from grid tiles
 * - Page registry created from page components
 * - Merging with custom configurations
 * 
 * @example
 * ```tsx
 * const { leftItems, rightItems, pageRegistry } = useAutoGeneration({
 *   config,
 *   autoNavigation: "from-grid",
 *   autoPages: { home: HomePage, docs: DocsPage },
 *   customPageRegistry: manualPages,
 *   leftItems: manualLeftItems,
 *   rightItems: manualRightItems,
 * })
 * ```
 */
export function useAutoGeneration({
  config,
  autoNavigation,
  autoPages,
  customPageRegistry,
  leftItems,
  rightItems,
}: UseAutoGenerationOptions): UseAutoGenerationResult {
  // Resolve nav items if autoNavigation is enabled
  const resolvedNavItems = useMemo(() => {
    const options = parseNavItemResolverOptions(autoNavigation)
    if (!options) return null
    return resolveNavItems(config, options)
  }, [autoNavigation, config])

  // Use manual items if provided, otherwise use resolved
  const finalLeftItems = useMemo(
    () => leftItems ?? resolvedNavItems?.left ?? [],
    [leftItems, resolvedNavItems]
  )

  const finalRightItems = useMemo(
    () => rightItems ?? resolvedNavItems?.right ?? [],
    [rightItems, resolvedNavItems]
  )

  // Create page registry from autoPages
  const autoRegistry = useMemo(() => {
    return createPageRegistry(autoPages)
  }, [autoPages])

  // Merge auto-generated and custom registries
  const finalPageRegistry = useMemo(() => {
    return mergeRegistries(autoRegistry, customPageRegistry) ?? null
  }, [autoRegistry, customPageRegistry])

  return {
    leftItems: finalLeftItems,
    rightItems: finalRightItems,
    pageRegistry: finalPageRegistry,
  }
}
