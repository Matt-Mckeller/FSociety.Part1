"use client"

import { useEffect, useRef } from "react"
import { useNavigation } from "../contexts/NavigationContext"

/**
 * A minimal router interface compatible with Next.js `useRouter()`.
 * Kept narrow so `@expanse/shell` doesn't hard-depend on `next`.
 */
export interface NextRouterLike {
  push: (href: string) => void
  replace?: (href: string) => void
  /**
   * Optional warm-up hint. When supplied, the bridge will call
   * `prefetch(url)` for the four neighbour tiles after every position
   * change so the next arrow press finds the route's JS chunk + RSC
   * payload already cached. Falls back to a no-op if absent.
   */
  prefetch?: (href: string) => void
}

export interface NextRouterNavigationBridgeProps {
  /**
   * The Next.js router instance obtained via `useRouter()` in the app.
   */
  router: NextRouterLike
  /**
   * Whether to push or replace the URL when position changes.
   * @default "push"
   */
  method?: "push" | "replace"
  /**
   * Current pathname (from `usePathname()`) used as the echo guard.
   * The bridge will not push a URL that already matches this value.
   */
  pathname?: string
}

/**
 * `NextRouterNavigationBridge`
 *
 * Mount this **inside** `NavigationProvider` in your Next.js app layout.
 * It watches the current HUD position and calls `router.push(tile.url)`
 * whenever the user navigates (minimap click, keyboard, list view, etc.)
 * and the destination URL differs from the current pathname.
 *
 * Echo-loop prevention:
 * - Skips the push when `currentTile.url === pathname` (already there).
 * - Skips the push when the navigation method was `"url"` (initiated by
 *   `NextPathnameSync` in response to a URL change — not a user action).
 *
 * Renders nothing — purely a side-effect component.
 */
export function NextRouterNavigationBridge({
  router,
  method = "push",
  pathname,
}: NextRouterNavigationBridgeProps) {
  const { position, currentTile, config, gridSize, getTileAt } = useNavigation()

  // Track the tile url we last pushed so we don't double-push on re-renders.
  const lastPushedUrl = useRef<string | null>(null)

  // StrictMode-safe mount guard. The old isMountedRef pattern breaks because
  // React 18 StrictMode runs effects twice on mount — the ref is set to true
  // on the first run, so the second run bypasses the guard and pushes the
  // homePosition URL (e.g. redirecting from an unmapped sub-page to the home tile).
  //
  // Instead: capture the initial position at mount time. Skip the push while
  // the position hasn't changed AND the user hasn't navigated away yet.
  // hasMovedRef ensures that navigating back to the initial position still
  // triggers a push (once the user has moved, the guard is permanently lifted).
  const initialPositionRef = useRef({ x: position.x, y: position.y })
  const hasMovedRef = useRef(false)

  // Stable ref for the router so the effect doesn't re-run when router identity changes.
  const routerRef = useRef(router)
  routerRef.current = router

  useEffect(() => {
    // Mount guard: skip until the user navigates away from the initial position.
    // NextPathnameSync handles seeding the correct position from the URL.
    if (
      pathname &&
      !hasMovedRef.current &&
      position.x === initialPositionRef.current.x &&
      position.y === initialPositionRef.current.y
    ) {
      return
    }
    hasMovedRef.current = true

    const tileUrl = currentTile?.url
    if (!tileUrl) return

    // Already on this pathname — router already there.
    if (pathname && tileUrl === pathname) return

    // We already pushed this url — don't re-push on unrelated re-renders.
    if (tileUrl === lastPushedUrl.current) return

    lastPushedUrl.current = tileUrl
    const nav = routerRef.current
    if (method === "replace" && nav.replace) {
      nav.replace(tileUrl)
    } else {
      nav.push(tileUrl)
    }
  }, [position, currentTile, pathname, method])

  // Prefetch the four neighbour tiles whenever position changes.
  //
  // Each HUD cell is its own Next.js route, so an unprefetched arrow press
  // means a cold page module load + render. Warming the four reachable
  // neighbours brings the perceived transition cost down to a client-side
  // cache hit. We use the route-config's wrapAround flag to mirror the
  // actual movement rules in `useNavigationActions`.
  useEffect(() => {
    const prefetch = routerRef.current.prefetch
    if (!prefetch) return

    const wrap = config.dimensions.wrapAround
    const { width, height } = gridSize
    const wrapAxis = (v: number, max: number) =>
      wrap ? ((v % max) + max) % max : v

    const candidates: Array<{ x: number; y: number }> = [
      { x: position.x, y: wrapAxis(position.y - 1, height) }, // up
      { x: position.x, y: wrapAxis(position.y + 1, height) }, // down
      { x: wrapAxis(position.x - 1, width), y: position.y }, // left
      { x: wrapAxis(position.x + 1, width), y: position.y }, // right
    ]

    const seen = new Set<string>()
    for (const { x, y } of candidates) {
      if (x < 0 || y < 0 || x >= width || y >= height) continue
      const tile = getTileAt(x, y)
      const url = tile?.url
      if (!url || url === pathname || seen.has(url)) continue
      seen.add(url)
      try {
        prefetch(url)
      } catch {
        // Prefetch is a hint — never let a router quirk break navigation.
      }
    }
  }, [position.x, position.y, gridSize.width, gridSize.height, config.dimensions.wrapAround, getTileAt, pathname])

  // Warm all route tiles in the active grid shortly after mount/update.
  // This cuts first-click latency when users jump to non-neighbour cells.
  useEffect(() => {
    const prefetch = routerRef.current.prefetch
    if (!prefetch) return

    const urls = Array.from(
      new Set(
        config.tiles
          .map((tile) => tile.url)
          .filter((url): url is string => Boolean(url) && url !== pathname)
      )
    )

    if (urls.length === 0) return

    let cancelled = false
    const run = () => {
      if (cancelled) return
      for (const url of urls) {
        try {
          prefetch(url)
        } catch {
          // Prefetch is a hint — never throw from bridge effects.
        }
      }
    }

    const idleWindow = window as Window & {
      requestIdleCallback?: (cb: () => void) => number
      cancelIdleCallback?: (id: number) => void
    }

    if (typeof idleWindow.requestIdleCallback === "function") {
      const id = idleWindow.requestIdleCallback(run)
      return () => {
        cancelled = true
        if (typeof idleWindow.cancelIdleCallback === "function") {
          idleWindow.cancelIdleCallback(id)
        }
      }
    }

    const timeoutId = window.setTimeout(run, 120)
    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [config.tiles, pathname])

  return null
}
