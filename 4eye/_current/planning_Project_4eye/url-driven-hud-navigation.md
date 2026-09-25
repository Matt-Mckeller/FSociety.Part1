# Plan — URL-driven HUD Navigation for 4eye-web

**Status:** Proposal · **Date:** 2026-04-24
**Scope:** `packages/@expanse/shell` (additive) + `apps/4eye-web` (new HUD route group)
**Owner:** mm

---

## 1. Goals

1. **Demo keeps working as-is** — `FullHud` Storybook demo continues to swap pages via in-memory state, no URL changes, no real data loads. Cheap to render.
2. **4eye-web becomes URL-driven** — the URL is the single source of truth for HUD position. Navigating via minimap, tile list, keyboard, or browser back/forward all flow through Next's `useRouter` / `usePathname`.
3. **One HUD, two modes** — same `<FullHud>` component powers both. Mode is selected by props, not by forking the component.
4. **No "phantom" page changes in the app** — clicking a minimap tile in 4eye-web triggers a real route change, so each page's data fetch / RSC stream / loading UI runs naturally per page.
5. **Deep linking + refresh + back/forward all work** without HUD-specific glue per page.

## 2. Non-Goals

- We are **not** rewriting `MapGridNavigationProvider`. Position state stays internal; URL is wired in via two thin "bridge" components.
- We are **not** changing the existing `useRouteSync` hook (it does `window.history.replaceState` — fine for non-Next contexts; we leave it as a fallback).
- We are **not** moving `apps/4eye-web` pages off the App Router, and we are not introducing a parallel route or intercepting route system. Route group only.
- No breaking changes to `NavigationProvider`, `FullHud`, `MinimapDock`, or any tile config consumed by existing apps.

## 3. Design Overview

### 3.1 Two consumption modes for `FullHud`

| Mode | Position state | Pages render via | Used by |
|---|---|---|---|
| **Demo (default)** | Internal (`useNavigationState`) | `TilePageRouter` with `pages` map | Storybook |
| **App / Next.js** | Internal, **bidirectionally synced to URL** via Next router | `children` (Next's App Router renders the real route) | `apps/4eye-web` |

Selection is implicit:
- Pass `pages` → demo mode.
- Pass `nextRouter` (or set `routerMode="next"`) → app mode; `pages` is ignored, `children` rendered into `HudContentArea` instead.

### 3.2 Two bridges, one provider, zero core changes

We add **two small bridge components** inside `@expanse/shell/src/spatial/map/bridges/`:

1. **`NextRouterNavigationBridge`** — subscribes to `useNavigation`. When `position` changes due to user input (minimap click, keyboard nav, list-view click), looks up `currentTile.url` and calls `router.push(url)`. **Suppresses pushes that would land on the current pathname** (debounce/echo guard).

2. **`NextPathnameSync`** — subscribes to Next's `usePathname()`. When the pathname changes (back/forward, deep link, programmatic `router.push` from outside the HUD), finds the tile whose `url` matches and calls `navigateTo(x, y)`. Ignores the change if it already matches `currentTile.url` (echo guard).

Both bridges are **client components** living inside `NavigationProvider`'s subtree. They do nothing if their props (router/pathname) are not provided — safe to mount unconditionally.

### 3.3 Echo loop is the entire problem

The naive version is:

```
user click → setPosition → bridge → router.push → pathname change → setPosition (loop)
```

We solve it with a single **`originRef`** in `MapGridNavigationProvider` (or in the bridge layer using a ref-stable comparison):

- When `navigateTo` is called from a bridge in response to a URL change, mark origin as `"url"`.
- `NextRouterNavigationBridge` only pushes when origin is **not** `"url"` AND the resolved URL differs from current pathname.
- `NextPathnameSync` only calls `navigateTo` when the target tile differs from `currentTile`.

This is a 5-line addition to `useNavigationActions` (extend `NavigationMethod` union with `"url"`).

### 3.4 Tiles already carry the route

`TileConfig` already has an optional `url?: string` ([TileConfig.types.ts](packages/@expanse/shell/src/spatial/map/types/TileConfig.types.ts#L51-L62)). We reuse it as the canonical path. **No new field needed.** Tiles without `url` are demo-only / non-routable — bridges skip them.

## 4. Package Changes — `@expanse/shell`

### 4.1 New files

```
packages/@expanse/shell/src/spatial/map/bridges/
  NextRouterNavigationBridge.tsx     // position → router.push
  NextPathnameSync.tsx               // pathname → navigateTo
  index.ts                           // barrel
```

```
packages/@expanse/shell/src/spatial/map/utils/
  tileLookup.ts                      // findTileByUrl(config, pathname)
```

### 4.2 Modified files

#### [`spatial/map/types/Position.types.ts`](packages/@expanse/shell/src/spatial/map/types/Position.types.ts) (or wherever `NavigationMethod` lives)
- Add `"url"` to the `NavigationMethod` union.

#### [`spatial/map/hooks/useNavigationActions.ts`](packages/@expanse/shell/src/spatial/map/hooks/useNavigationActions.ts)
- No behavior change — already accepts `method`. Bridges pass `"url"`.

#### [`spatial/map/index.ts`](packages/@expanse/shell/src/spatial/map/index.ts)
- Re-export the two bridges + `findTileByUrl`.

#### [`hud-components/full-hud/FullHud.tsx`](packages/@expanse/shell/src/hud-components/full-hud/FullHud.tsx)
- Add props:
  - `nextRouter?: AppRouterInstance` (typed via `next/navigation`'s `useRouter` return — kept optional + `unknown`-friendly so the layout package doesn't hard-depend on Next).
  - `pathname?: string`
  - `routerMode?: "demo" | "next"` (defaults: `"next"` if both props present, else `"demo"`).
  - `children?: ReactNode` — already kind of supported via `contentSlot`; formalize as `children` and render it inside `HudContentArea` when `pages` is omitted.
- Internally:
  - Mount `<NextRouterNavigationBridge router={nextRouter} navigationConfig={navigationConfig} />` and `<NextPathnameSync pathname={pathname} navigationConfig={navigationConfig} />` when in next mode.
  - When `pages` is provided → render `<TilePageRouter pages={pages} />`.
  - Else → render `children` (which in Next is the route-tree output).

#### [`hud-components/index.ts`](packages/@expanse/shell/src/hud-components/index.ts)
- No new exports needed beyond what's already there; bridges exported from `spatial/map`.

### 4.3 Bridge contracts (signatures)

```ts
// NextRouterNavigationBridge.tsx
export interface NextRouterNavigationBridgeProps {
  /** Next App Router instance from `useRouter()`. */
  router: { push: (href: string) => void; replace?: (href: string) => void }
  /** Navigation method to push as. Defaults to "push". */
  method?: "push" | "replace"
  /** Current pathname (for echo guard). */
  pathname?: string
}
export function NextRouterNavigationBridge(props): null
```

```ts
// NextPathnameSync.tsx
export interface NextPathnameSyncProps {
  pathname: string
}
export function NextPathnameSync(props): null
```

```ts
// utils/tileLookup.ts
export function findTileByUrl(
  config: MapGridNavigationConfig,
  pathname: string,
): TileConfig | null
```

`findTileByUrl` matches longest prefix first so `/rooms/abc` resolves to the `/rooms` tile when there's no exact match.

### 4.4 Peer dependency

- `@expanse/shell` does **not** add `next` as a runtime dep. Bridges accept `router`/`pathname` as plain props. The 4eye-web app calls `useRouter()` / `usePathname()` and passes them in.
- Optional: a tiny **separate** subpath export `@expanse/shell/next` that does import `next/navigation` and re-exports a thin `<NextHudBridges />` convenience. Day-2 polish.

## 5. App Changes — `apps/4eye-web`

### 5.1 New files

```
apps/4eye-web/lib/hud/
  navigationConfig.ts          // canonical 4eye tile grid (urls match real routes)
  pages.tsx                    // (optional) for storybook-style local demos only

apps/4eye-web/app/(hud)/
  layout.tsx                   // server: passes children into HudShell
  HudShell.tsx                 // client: wraps children in <FullHud nextRouter pathname>
```

### 5.2 Route group migration

Move pages that should live **inside** the HUD chrome into the `(hud)` group. Pages that should NOT show HUD (login, signup, marketing, room-live fullscreen) stay at the top level.

| Current path | Route group | Has HUD? |
|---|---|---|
| `/login`, `/signup`, `/forgot-password`, `/reset-password` | top-level (unchanged) | no |
| `/privacy`, `/terms`, `/join/[code]` | top-level | no |
| `/dashboard`, `/profile`, `/rooms`, `/rooms/create`, `/rooms/[id]` | move under `(hud)/` | yes |
| `/rooms/[id]/live` | top-level (fullscreen, no chrome) | no |
| `/` (root) | leave at top OR add `(hud)/(home)/page.tsx` — TBD | TBD |

### 5.3 `apps/4eye-web/lib/hud/navigationConfig.ts` (sketch)

```ts
import type { MapGridNavigationConfig } from "@expanse/shell"

export const FOUREYE_NAV_CONFIG: MapGridNavigationConfig = {
  dimensions: { width: 3, height: 2, homePosition: { x: 0, y: 0 }, wrapAround: false },
  tiles: [
    { id: "dashboard", position: { x: 0, y: 0 }, url: "/dashboard",
      seo: { title: "Dashboard" },
      display: { label: "Dashboard", category: "primary",
                 colors: { inactive: "rgba(99,102,241,0.4)", active: "#6366f1" } } },
    { id: "rooms", position: { x: 1, y: 0 }, url: "/rooms",
      seo: { title: "Rooms" },
      display: { label: "Rooms", category: "primary",
                 colors: { inactive: "rgba(99,102,241,0.4)", active: "#6366f1" } } },
    { id: "profile", position: { x: 2, y: 0 }, url: "/profile",
      seo: { title: "Profile" },
      display: { label: "Profile", category: "secondary",
                 colors: { inactive: "rgba(34,197,94,0.4)", active: "#22c55e" } } },
    // ...add more as routes come online
  ],
}
```

### 5.4 `apps/4eye-web/app/(hud)/layout.tsx`

```tsx
import { HudShell } from "./HudShell"

export default function HudLayout({ children }: { children: React.ReactNode }) {
  return <HudShell>{children}</HudShell>
}
```

### 5.5 `apps/4eye-web/app/(hud)/HudShell.tsx`

```tsx
"use client"
import { useRouter, usePathname } from "next/navigation"
import { FullHud } from "@expanse/shell"
import { FOUREYE_NAV_CONFIG } from "@/lib/hud/navigationConfig"

export function HudShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <FullHud
      navigationConfig={FOUREYE_NAV_CONFIG}
      nextRouter={router}
      pathname={pathname}
    >
      {children}
    </FullHud>
  )
}
```

That's the full app integration. Each `page.tsx` underneath the group is unchanged and runs Next's normal data flow.

## 6. Echo-Guard Spec (the one tricky bit)

State:
```
position (in NavigationProvider)
pathname (from Next)
```

Rules:
1. **User input** (minimap click, keyboard, list-view) calls `navigateTo(x, y)` with method `"direct"` / `"keyboard"`.
2. `NextRouterNavigationBridge` watches `position`. On change, if `currentTile.url && currentTile.url !== pathname`, call `router.push(currentTile.url)`. Otherwise no-op.
3. Next updates the URL → `pathname` prop changes.
4. `NextPathnameSync` watches `pathname`. On change, find the matching tile. If `tile.position !== position`, call `navigateTo(tile.x, tile.y)` with method `"url"`.
5. The position update from step 4 re-fires bridge in step 2, but `currentTile.url === pathname` now, so it no-ops. Loop terminated.

Edge cases:
- **No matching tile for pathname** (e.g. nested route `/rooms/abc`): `findTileByUrl` returns the longest-prefix match (the `/rooms` tile). HUD highlights `/rooms`. URL stays as `/rooms/abc`.
- **Pathname matches but tile is `disabled` or `external`**: `NextPathnameSync` skips. (User shouldn't have landed there via the HUD anyway.)
- **No `url` on current tile**: bridge no-ops. Tile is demo-only.
- **Initial render** (mount): `NextPathnameSync` runs once and seeds position from URL. This makes deep linking + refresh work.

## 7. Phased Execution

### Phase 1 — Package: bridges + FullHud props (one commit)
- [ ] Add `"url"` to `NavigationMethod` union.
- [ ] Add `utils/tileLookup.ts` with `findTileByUrl`.
- [ ] Add `bridges/NextRouterNavigationBridge.tsx`.
- [ ] Add `bridges/NextPathnameSync.tsx`.
- [ ] Export from `spatial/map/index.ts`.
- [ ] Extend `FullHud.tsx` with `nextRouter`, `pathname`, `routerMode`, `children` props.
- [ ] Mount bridges inside `NavigationProvider`'s subtree when in next mode.
- [ ] Render `children` instead of `TilePageRouter` when `pages` not given.
- [ ] Verify Storybook demo still works unchanged.
- [ ] Commit: `feat(layout): add Next.js router bridges to FullHud`

### Phase 2 — App: route group + HudShell (one commit)
- [ ] Create `apps/4eye-web/lib/hud/navigationConfig.ts` with tiles for current real routes.
- [ ] Create `apps/4eye-web/app/(hud)/layout.tsx` + `HudShell.tsx`.
- [ ] Move `dashboard`, `profile`, `rooms`, `rooms/create`, `rooms/[id]` under `(hud)/`.
- [ ] Verify each page still resolves at the same URL (route groups are URL-invisible).
- [ ] Verify HUD chrome appears, minimap click changes URL, browser back/forward works.
- [ ] Commit: `feat(4eye-web): mount FullHud over (hud) route group`

### Phase 3 — Polish (separate commits)
- [ ] Test deep linking: load `/rooms` directly → minimap shows Rooms active.
- [ ] Test refresh: refresh `/profile` → no flicker, profile tile active.
- [ ] Test rooms/[id] nested: `/rooms/abc` → Rooms tile highlighted (longest-prefix match).
- [ ] Add `nextHudBridges()` convenience export from `@expanse/shell/next` (optional).
- [ ] Document in [readme](packages/@expanse/shell/README.md).

## 8. Validation Checklist

After Phase 2 the following must all pass manually in 4eye-web dev:

| # | Action | Expected |
|---|---|---|
| 1 | Visit `/dashboard` directly | Page loads, dashboard tile active in minimap |
| 2 | Click "Profile" tile in minimap | URL changes to `/profile`, profile data loads, profile tile active |
| 3 | Browser Back | URL returns to `/dashboard`, dashboard tile active |
| 4 | Browser Forward | URL → `/profile`, profile tile active |
| 5 | Refresh on `/profile` | No flicker, profile tile active immediately |
| 6 | Visit `/rooms/abc` (deep nested) | Rooms tile active (longest-prefix) |
| 7 | Press `→` arrow with focus on a tile | URL changes; data fetch triggered for new page |
| 8 | Open Tile List, click "Rooms" | URL changes, list highlights Rooms |
| 9 | Storybook `Layout Systems/HUD/Full Hud` | Demo still uses `pages` map, no URL changes |
| 10 | Storybook `Full Hud — Debug Insets` | Debug rails still render, demo behavior unchanged |

## 9. Open Questions

1. **Root `/` handling** — should the root path map to the `home` tile inside the HUD, or stay as a marketing page outside? *Recommend:* keep marketing `/` outside; have the home tile point to `/dashboard` (or whatever the real signed-in landing page is).
2. **`useRouteSync` legacy** — should we disable the existing `useRouteSync` (which does `replaceState`) when running in next mode to avoid duplicate URL writes? *Recommend:* yes — add `config.routing.syncUrl` default to `false` when `routerMode === "next"`, since the bridge handles it. Easy follow-up.
3. **Loading UI between routes** — Next's per-segment `loading.tsx` will render inside `HudContentArea`. Does that interact with `HudInsetsProvider`? *Expect:* fine — providers live in the parent layout, persist across route transitions. No re-mount of HUD chrome.
4. **Tile category vs. route segment** — should categories influence URL structure (`/primary/dashboard`)? *Recommend:* no, keep flat; categories are purely visual grouping in the list view.

## 10. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Echo loop between bridges | Origin guard via `NavigationMethod === "url"` + pathname equality check. |
| Layout re-mounts on route change in Next | Route groups + a single shared `(hud)/layout.tsx` keep providers stable across transitions. |
| Storybook breakage | Demo path doesn't pass `nextRouter` → bridges no-op → identical to today. |
| Adding `next` as a layout dep | Avoided. Bridges take router/pathname as plain props; app is the only place that imports `next/navigation`. |
| Tile config drift between app and storybook | App uses its own `FOUREYE_NAV_CONFIG`; storybook keeps `sampleConfig`. They're allowed to diverge. |

## 11. Out-of-Scope Followups

- Tile-level prefetch (`router.prefetch(tile.url)` on hover in minimap/list).
- Per-tile `loading.tsx` integration with `HudContentArea` debug rails.
- Persisting last-visited tile across sessions.
- Mobile hardware-back integration.
- Mapping a tile to multiple routes (e.g. `/rooms` + `/rooms/[id]` both highlight Rooms — already handled implicitly by longest-prefix match).

---

**Ready to implement.** Phase 1 first; review; then Phase 2.
