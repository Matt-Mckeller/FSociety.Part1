import type { MapGridNavigationConfig, TileConfig } from "../types"

/**
 * Find a tile whose url matches the given pathname.
 *
 * Matching strategy (in order):
 * 1. Exact match: tile.url === pathname
 * 2. Longest-prefix match: tile.url is a prefix of pathname
 *    (e.g. tile.url = "/rooms" matches pathname = "/rooms/abc")
 *
 * Returns null when no tile has a url or nothing matches.
 */
export function findTileByUrl(
  config: MapGridNavigationConfig,
  pathname: string,
): TileConfig | null {
  const tilesWithUrl = config.tiles.filter((t) => !!t.url)
  if (tilesWithUrl.length === 0) return null

  // Exact match first
  const exact = tilesWithUrl.find((t) => t.url === pathname)
  if (exact) return exact

  // Longest prefix match
  let best: TileConfig | null = null
  let bestLen = 0
  for (const tile of tilesWithUrl) {
    const tileUrl = tile.url!
    // Prefix must end at a segment boundary to avoid "/room" matching "/rooms"
    const isPrefix =
      pathname.startsWith(tileUrl) &&
      (tileUrl === "/" || pathname[tileUrl.length] === "/" || pathname[tileUrl.length] === "?" || pathname[tileUrl.length] === undefined)
    if (isPrefix && tileUrl.length > bestLen) {
      best = tile
      bestLen = tileUrl.length
    }
  }
  return best
}
