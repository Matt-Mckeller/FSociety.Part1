"use client"

import { useEffect } from "react"
import type { Position, RoutingConfig, TileConfig } from "../types"
import { DEFAULT_ROUTING_CONFIG } from "../types"
import { buildPositionURL } from "../utils/urlUtils"

export interface RouteSyncConfig {
  position: Position
  currentTile: TileConfig | null
  routing?: RoutingConfig
}

/**
 * URL synchronization hook
 *
 * Updates browser URL to reflect current grid position.
 * Supports query params, path-based, and hybrid routing modes.
 */
export function useRouteSync({
  position,
  currentTile,
  routing: routingProp,
}: RouteSyncConfig): void {
  const routing = { ...DEFAULT_ROUTING_CONFIG, ...routingProp }

  useEffect(() => {
    if (!routing.syncUrl) return
    if (typeof window === "undefined") return

    const url = buildPositionURL(position, currentTile?.url, routing)

    // Update URL without reload
    window.history.replaceState(null, "", url)
  }, [position, routing, currentTile])
}

export interface SEOSyncConfig {
  currentTile: TileConfig | null
}

/**
 * SEO metadata synchronization hook
 *
 * Updates document title and meta tags based on current tile.
 */
export function useSEOSync({ currentTile }: SEOSyncConfig): void {
  useEffect(() => {
    if (typeof document === "undefined") return
    if (!currentTile?.seo) return

    // Update title
    document.title = currentTile.seo.title

    // Update meta tags
    const updateMeta = (name: string, content: string | undefined) => {
      if (!content) return
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
      if (!meta) {
        meta = document.createElement("meta")
        meta.name = name
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    const updateOGMeta = (property: string, content: string | undefined) => {
      if (!content) return
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
      if (!meta) {
        meta = document.createElement("meta")
        meta.setAttribute("property", property)
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    updateMeta("description", currentTile.seo.description)
    updateMeta("keywords", currentTile.seo.keywords?.join(", "))
    updateOGMeta("og:title", currentTile.seo.title)
    updateOGMeta("og:description", currentTile.seo.description)
    updateOGMeta("og:image", currentTile.seo.ogImage)
  }, [currentTile])
}
