/**
 * Page Registry Utilities
 *
 * Create page registries from simple component mappings.
 */

import React from "react"
import type { PageRegistry } from "../../components/PageContent"
import { PlaceholderPage } from "../../components/PlaceholderPage"

export type PageMap = Record<string, React.ComponentType<any>>

export interface PageWithMeta {
  component: React.ComponentType<any>
  title?: string
  description?: string
}

export type PageMapWithMeta = Record<string, PageWithMeta>
export type PageMapInput = PageMap | PageMapWithMeta

function isPageWithMeta(entry: unknown): entry is PageWithMeta {
  return typeof entry === "object" && entry !== null && "component" in entry
}

function isPageMapWithMeta(pageMap: PageMapInput): pageMap is PageMapWithMeta {
  const firstEntry = Object.values(pageMap)[0]
  return isPageWithMeta(firstEntry)
}

export function createPageRegistry(pageMap: PageMapInput | undefined): PageRegistry | null {
  if (!pageMap || Object.keys(pageMap).length === 0) {
    return null
  }

  const registry: PageRegistry = {}

  if (isPageMapWithMeta(pageMap)) {
    for (const [id, entry] of Object.entries(pageMap)) {
      const Component = entry.component
      registry[id] = () => React.createElement(Component)
    }
  } else {
    for (const [id, Component] of Object.entries(pageMap)) {
      registry[id] = () => React.createElement(Component)
    }
  }

  registry.default = (position, tile) =>
    React.createElement(PlaceholderPage, {
      position,
      tile,
      pattern: "grid" as const,
      description: "This page is registered in the grid and ready for content.",
    })

  return registry
}

export function mergeRegistries(
  ...registries: (PageRegistry | null | undefined)[]
): PageRegistry | undefined {
  const validRegistries = registries.filter(
    (r): r is PageRegistry => r !== null && r !== undefined
  )

  if (validRegistries.length === 0) {
    return undefined
  }

  if (validRegistries.length === 1) {
    return validRegistries[0]
  }

  return Object.assign({}, ...validRegistries)
}
