import type { MapGridNavigationConfig, Position } from "../types"
import { DEFAULT_ROUTING_CONFIG } from "../types"

/**
 * Parse position from URL based on routing configuration
 */
export function getPositionFromURL(config: MapGridNavigationConfig): Position | null {
  if (typeof window === "undefined") return null

  const routing = { ...DEFAULT_ROUTING_CONFIG, ...config.routing }

  if (routing.mode === "query" || routing.mode === "hybrid") {
    const params = new URLSearchParams(window.location.search)
    const x = params.get("x")
    const y = params.get("y")
    if (x !== null && y !== null) {
      const position = { x: parseInt(x, 10), y: parseInt(y, 10) }
      if (!isNaN(position.x) && !isNaN(position.y)) {
        return position
      }
    }
  }

  if (routing.mode === "path" || routing.mode === "hybrid") {
    // Try path-based routing: /grid/x/y
    const basePath = routing.basePath || "/grid"
    const path = window.location.pathname
    const regex = new RegExp(`^${basePath}/(\\d+)/(\\d+)/?$`)
    const match = path.match(regex)
    if (match) {
      return { x: parseInt(match[1], 10), y: parseInt(match[2], 10) }
    }

    // For hybrid mode, also check if current path matches a tile URL
    if (routing.mode === "hybrid") {
      for (const tile of config.tiles) {
        if (tile.url && path === tile.url) {
          return tile.position
        }
      }
    }
  }

  return null
}

/**
 * Build URL for a given position based on routing configuration
 */
export function buildPositionURL(
  position: Position,
  tileUrl: string | undefined,
  routing: {
    mode?: "query" | "path" | "hybrid" | "none"
    basePath?: string
  }
): string {
  if (typeof window === "undefined") return ""

  // Use tile's custom URL in hybrid mode
  if (routing.mode === "hybrid" && tileUrl) {
    return tileUrl
  }

  // Path-based: /grid/x/y
  if (routing.mode === "path") {
    return `${routing.basePath || "/grid"}/${position.x}/${position.y}`
  }

  // Query-based: ?x=1&y=2
  const params = new URLSearchParams(window.location.search)
  params.set("x", String(position.x))
  params.set("y", String(position.y))
  return `${window.location.pathname}?${params.toString()}`
}
