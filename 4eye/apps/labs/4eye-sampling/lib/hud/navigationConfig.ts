import type { MapGridNavigationConfig } from "@expanse/map"

/**
 * 4eye HUD navigation grid config.
 *
 * Each tile's `url` is the canonical Next.js route path.  The `(hud)` route
 * group layout reads this config so the minimap, tile list, and URL bridges
 * all use the same source of truth.
 *
 * Grid layout (4 × 2):
 *
 *   [0,0] Dashboard  [1,0] Rooms     [2,0] Profile   [3,0] —
 *   [0,1] —          [1,1] —         [2,1] —         [3,1] —
 *
 * Add new tiles here as new HUD-visible routes come online.
 */
export const FOUREYE_HUD_NAV_CONFIG: MapGridNavigationConfig = {
  dimensions: {
    width: 4,
    height: 2,
    homePosition: { x: 0, y: 0 },
    wrapAround: false,
  },
  tiles: [
    {
      id: "dashboard",
      position: { x: 0, y: 0 },
      url: "/dashboard",
      seo: { title: "Dashboard — 4eye" },
      display: {
        label: "Dashboard",
        category: "primary",
        colors: {
          inactive: "rgba(99,102,241,0.4)",
          active: "#6366f1",
        },
      },
    },
    {
      id: "rooms",
      position: { x: 1, y: 0 },
      url: "/rooms",
      seo: { title: "Rooms — 4eye" },
      display: {
        label: "Rooms",
        category: "primary",
        colors: {
          inactive: "rgba(99,102,241,0.4)",
          active: "#6366f1",
        },
      },
    },
    {
      id: "profile",
      position: { x: 2, y: 0 },
      url: "/profile",
      seo: { title: "Profile — 4eye" },
      display: {
        label: "Profile",
        category: "secondary",
        colors: {
          inactive: "rgba(34,197,94,0.4)",
          active: "#22c55e",
        },
      },
    },
  ],
}
