"use client"

import { useEffect, useRef } from "react"
import { useNavigation } from "../contexts/NavigationContext"
import { findTileByUrl } from "../utils/tileLookup"

export interface NextPathnameSyncProps {
  /**
   * The current pathname from Next's `usePathname()`.
   * When this changes (browser back/forward, deep link, programmatic push),
   * the HUD grid position is updated to match the corresponding tile.
   */
  pathname: string
}

/**
 * `NextPathnameSync`
 *
 * Mount this **inside** `NavigationProvider` in your Next.js app layout.
 * It watches `pathname` and calls `navigateTo(x, y)` with method `"url"`
 * when the URL changes to a pathname that maps to a different tile.
 *
 * This enables:
 * - Browser back/forward buttons updating the minimap.
 * - Hard refresh resolving the correct tile from the URL.
 * - Programmatic `router.push()` from outside the HUD.
 *
 * Echo-loop prevention:
 * - Skips if the resolved tile is already the current position.
 * - Passes method `"url"` so `NextRouterNavigationBridge` ignores the
 *   resulting position change and does not push a redundant URL.
 *
 * Renders nothing — purely a side-effect component.
 */
export function NextPathnameSync({ pathname }: NextPathnameSyncProps) {
  const { position, navigateTo, config } = useNavigation()

  // Track the last pathname we processed to avoid re-running on unrelated renders.
  const lastPathnameRef = useRef<string | null>(null)

  useEffect(() => {
    if (pathname === lastPathnameRef.current) return
    lastPathnameRef.current = pathname

    const tile = findTileByUrl(config, pathname)
    if (!tile) return

    // Already at this position.
    if (tile.position.x === position.x && tile.position.y === position.y) return

    // Navigate using method "url" so the bridge doesn't echo back.
    navigateTo(tile.position.x, tile.position.y)
  }, [pathname, config, position, navigateTo])

  return null
}
