import type { ReactNode } from "react"
import type { SxProps, Theme } from "@mui/material"

import type { MapGridNavigationConfig } from "@expanse/map"
import type { NextRouterLike } from "@expanse/map"
import type { ContextBarContext } from "../../hud-components/context-bar"
import type { ActionDockPosition } from "../docks"
import type { PlayerStatusValue } from "@expanse/brand-core"
import type { CurrentLocationCenterButtonOverride } from "../../hud-components/current-location-bar/CurrentLocationActionBar"

// =============================================================================
// Bottom-bar order slots — moved to hud/slots/slot-orders.ts.
// Re-exported here for backward compatibility with the full-hud barrel.
// =============================================================================

export { DEFAULT_BOTTOM_BAR_ORDER } from "../slots/slot-orders"

// =============================================================================
// Public props
// =============================================================================
//
// `FullHudProps` is composed from a handful of focused, individually-exported
// interfaces (content, router, theme-mode, minimap, rails, player status,
// center override). The composed shape stays flat for call-site ergonomics —
// consumers pass every prop directly — while each group can be referenced and
// extended in isolation.

/** Content + page-routing props: what renders inside the safe content area. */
export interface HudContentProps {
  /** Navigation grid + tile config powering the minimap, list view, and TilePageRouter. */
  navigationConfig: MapGridNavigationConfig
  /**
   * Map of `tile.id` -> page node. Rendered in the safe content area via
   * `TilePageRouter`. If omitted, `children` (or `contentSlot`) is rendered.
   *
   * Demo mode — use this in Storybook / prototypes. No router required.
   */
  pages?: Record<string, ReactNode>
  /**
   * Children rendered in the safe content area when `pages` is not provided.
   *
   * **Next.js app mode:** pass the route tree `{children}` from your
   * `(hud)/layout.tsx` here. Every tile navigation triggers a real route
   * change via `nextRouter`; Next handles data fetching per page.
   */
  children?: ReactNode
  /**
   * @deprecated Use `children` instead. Kept for backward compat.
   * Ignored when `pages` or `children` is provided.
   */
  contentSlot?: ReactNode
}

/** Next.js App Router integration props. */
export interface HudRouterProps {
  /**
   * Next.js App Router instance from `useRouter()`.
   *
   * When provided, `NextRouterNavigationBridge` is mounted inside the
   * NavigationProvider. HUD position changes call `router.push(tile.url)`.
   *
   * **Important:** each tile in `navigationConfig` must have a `url` field
   * matching the corresponding Next.js route path (e.g. `"/dashboard"`).
   */
  nextRouter?: NextRouterLike
  /**
   * Current pathname from Next's `usePathname()`.
   *
   * When provided, `NextPathnameSync` is mounted to keep the HUD grid position
   * in sync with the URL — enabling back/forward, refresh, and deep linking.
   */
  pathname?: string
  /**
   * Whether the router push should replace the current history entry rather
   * than adding a new one.
   * @default "push"
   */
  routerMethod?: "push" | "replace"
}

/** Theme-mode toggle state for the left rail. */
export interface HudThemeModeProps {
  /** Theme-mode toggle state for the left rail. Defaults to internal state. */
  themeMode?: "light" | "dark"
  onThemeModeChange?: (mode: "light" | "dark") => void
}

/** Minimap panel / dock behaviour props. */
export interface HudMinimapProps {
  /**
   * When set, the minimap panel header shows a control that calls this
   * (e.g. open a full-screen map). Omit to hide the control.
   */
  onMinimapFullScreenRequest?: () => void
  /**
   * When true, the minimap dock's full-screen-request button morphs into
   * a close (frame → plus) button and routes its click to
   * {@link HudMinimapProps.onMinimapFullScreenClose}. Pair this with
   * {@link HudMinimapProps.onMinimapFullScreenRequest} so hosts can use the dock
   * button as the canonical return affordance while a host-owned full-screen
   * map overlay is mounted.
   * @default false
   */
  isMinimapFullScreenOpen?: boolean
  /** Click handler for the morphed close button. */
  onMinimapFullScreenClose?: () => void
  /**
   * Reserve space for the minimap on the right edge of the content area.
   * Off by default — content flows under the frosted minimap panel.
   * @default false
   */
  reserveMinimap?: boolean
  /**
   * Whether the minimap dock starts expanded on first render.
   * Defaults to **collapsed** (false) so the map button is visible but the
   * panel does not cover content until the user opens it.
   * @default false
   */
  defaultMinimapOpen?: boolean
}

/** Override for the center page-icon button in the top HUD row. */
export interface HudCenterOverrideProps {
  /**
   * Override the center page-icon button in the top HUD row. Used by
   * hosts to repurpose it (e.g. as a "return" affordance while a
   * full-screen overlay like the map view is open).
   */
  centerLocationOverride?: CurrentLocationCenterButtonOverride
}

/** Player status data forwarded to `PlayerStatusProvider`. */
export interface HudPlayerStatusProps {
  /**
   * Player status data passed to `PlayerStatusProvider`. Defaults to a small
   * placeholder so the status bar renders something visible.
   */
  playerStatus?: Partial<PlayerStatusValue>
}

/** Rail (left/right FAB dock) placement + slot props. */
export interface HudRailProps {
  /**
   * Override where the left rail (game / settings FABs) docks.
   * @default "left-center"
   */
  leftRailPosition?: ActionDockPosition
  /**
   * Override where the right rail (profile FAB) docks. Pass
   * `"left-center"` together with `leftRailPosition="right-center"`
   * to mirror the rails.
   * @default "right-center"
   */
  rightRailPosition?: ActionDockPosition
  /**
   * Override the panel rendered when the rail's gamepad trigger is active.
   * Forwarded to `HudLeftRail.gamePanel`. Use this to wire `onClick`
   * handlers onto specific game-bar items (e.g. Quests) from the host app.
   */
  gamePanel?: ReactNode
  /**
   * Seed the rail label toggle as on (visible) on first render.
   * The user can still toggle it off via the settings panel.
   * @default false
   */
  initialLabelsVisible?: boolean
}

/**
 * Deprecated context-bar props. The context bar was removed from the HUD
 * center; these are retained only for backward compatibility and ignored.
 */
export interface HudDeprecatedContextProps {
  /**
   * @deprecated Context bar was removed from the HUD center. It will only
   * appear on the full map surface when that UI lands. Prop ignored for now.
   */
  context?: ContextBarContext
  /** @deprecated See `context`. Ignored for now. */
  onContextChange?: (ctx: ContextBarContext) => void
}

export interface FullHudProps
  extends HudContentProps,
    HudRouterProps,
    HudThemeModeProps,
    HudMinimapProps,
    HudCenterOverrideProps,
    HudPlayerStatusProps,
    HudRailProps,
    HudDeprecatedContextProps {
  /**
   * Show the HUD inset debug overlay (labelled rails on each edge + entry list).
   * @default false
   */
  debugInsets?: boolean

  /**
   * Wrap children in `NavigationProvider` + `HudInsetsProvider` + `HudHintsProvider`.
   * Set to false if you're already mounting these higher in the tree.
   * @default true
   */
  wrapWithProviders?: boolean

  /** Extra styles applied to the outer stage Box. */
  sx?: SxProps<Theme>
}
