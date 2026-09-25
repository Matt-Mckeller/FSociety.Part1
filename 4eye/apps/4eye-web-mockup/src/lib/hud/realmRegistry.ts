/**
 * Realm registry — the single source of truth that ties together a realm's
 * key, human label, route prefix, and HUD map navigation config.
 *
 * Why this exists: realm → config mapping used to be hardcoded in three
 * places (`FullScreenMapView`, the legacy `MinimapFullViewOverlay`, and the
 * realm `layout.tsx` files), and `realmForPathname()` was duplicated verbatim
 * in two files. Centralizing here means:
 *   - Adding a realm = one entry in {@link REALMS} + one route folder.
 *   - `realmForPathname` is defined once.
 *   - The coupling between a realm key and the nav config it gates is visible
 *     in one module (humans and AI can navigate it).
 *
 * Ownership: this is **app-owned** data — the nav configs are 4eye marketing
 * content, not reusable infra. The generic `ActiveMapProvider<TKey>` in the
 * HUD package is parameterized with {@link RealmKey}.
 */

import { route } from "../routes";
import type { MapGridNavigationConfig } from "@expanse/map";

import { APP_HUD_NAV_CONFIG } from "./appNavigationConfig";
import { WEBSITE_HUD_NAV_CONFIG } from "./websiteNavigationConfig";
import { TECHNICAL_HUD_NAV_CONFIG } from "./technicalNavigationConfig";

/** The realms the HUD map can switch between. */
export type RealmKey = "website" | "app" | "technical";

/** Per-realm tile-sizing tune for the full-screen map grid. Explicit props on `MinimapFullView` still win; omitted fields fall back to `FullScreenMapView`'s defaults. */
export interface RealmMapSizing {
  minTileSize?: number;
  maxTileSize?: number;
  tileSize?: number | "responsive";
}

export interface RealmDefinition {
  /** Stable key, also used as the `ActiveMapProvider` map id. */
  key: RealmKey;
  /** Human label shown in the realm switcher + placeholder map. */
  label: string;
  /**
   * Route prefix that identifies this realm. `"/"` is the implicit
   * fallback (website) and is never matched by prefix — see
   * {@link realmForPathname}.
   */
  routePrefix: string;
  /**
   * The map grid nav config for this realm, or `null` when the realm has
   * no grid yet (renders a `PlaceholderMapView`).
   */
  navConfig: MapGridNavigationConfig | null;
  /**
   * Optional tile-sizing override for this realm's full-screen map grid.
   * Lets sparser/denser grids (e.g. `website`'s 3×4 grid with several
   * empty cells) get their own tile scale instead of the uniform default.
   */
  mapSizing?: RealmMapSizing;
}

export const REALMS: Record<RealmKey, RealmDefinition> = {
  website: {
    key: "website",
    label: "Website",
    routePrefix: "/",
    navConfig: WEBSITE_HUD_NAV_CONFIG,
    // Sparser 3x4 grid (7/12 tiles populated) — a slightly larger tile
    // floor makes the populated tiles read as intentionally sized rather
    // than lost in the grid, without shrinking the container itself.
    mapSizing: { minTileSize: 64, maxTileSize: 120 },
  },
  app: {
    key: "app",
    label: "App",
    routePrefix: route("/appRealm"),
    navConfig: APP_HUD_NAV_CONFIG,
  },
  technical: {
    key: "technical",
    label: "Technical",
    routePrefix: route("/technical"),
    navConfig: TECHNICAL_HUD_NAV_CONFIG,
  },
};

/** Display / iteration order for the realm switcher. */
export const REALM_ORDER: RealmKey[] = ["website", "app", "technical"];

/**
 * Returns the realm key that matches the current route, so the map defaults
 * to the realm the user is already navigating. `"website"` is the fallback
 * for the root and any unrecognized path.
 */
export function realmForPathname(pathname: string | null): RealmKey {
  const hit = REALM_ORDER.find(
    (k) => REALMS[k].routePrefix !== "/" && pathname?.startsWith(REALMS[k].routePrefix),
  );
  return hit ?? "website";
}

/** The nav config for a realm, or `null` for placeholder-only realms. */
export function navConfigForRealm(key: RealmKey): MapGridNavigationConfig | null {
  return REALMS[key].navConfig;
}
