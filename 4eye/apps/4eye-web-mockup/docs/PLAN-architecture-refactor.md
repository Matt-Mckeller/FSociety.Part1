# Architecture Refactor Plan — HUD / Map / Layout Split, Provider Cleanup, Typing & Docs

Status: **Proposed** · Owner: TBD · Created: 2026-05-31

Goal: split the overgrown `@expanse/shell` package along clean seams, fix the
cross-realm navigation duplication, plan a typing overhaul for HUD + Map, and
schedule documentation cleanup — without breaking the running apps.

---

## 0. Guiding principles

- **Move in small, verifiable steps.** Every phase must leave `pnpm typecheck`
  and Storybook green before the next begins.
- **No behavior changes during a move.** Package splits are pure relocations +
  re-export shims first; semantic changes come after.
- **Registry over branches.** Replace hardcoded realm `if/else` with a single
  typed registry — one source of truth.
- **Barrels are grouped + commented.** Every package `index.ts` groups exports
  by domain with section headers so humans and AI can navigate them.
- **Backward-compat shims** stay until all imports are migrated, then deleted in
  a dedicated cleanup commit.

---

## 1. Package split — what goes where

Today `@expanse/shell` is a mega-package (~15 top-level areas). The proposed
split, in dependency order (lowest → highest):

```
@expanse/shell        ← pure, generic layout primitives ONLY
   ▲
@expanse/map           ← navigation engine + tiles + minimap + history
   ▲
@expanse/hud           ← HUD chrome (slots, rails, docks, renderers, FullHud) + widgets
```

Dependency rule: **hud → map → layout** (strictly one direction). No cycles.

### 1.1 `@expanse/shell` (what's LEFT after the split)

This is the key question — "what does layout do once HUD and Map leave?"
It becomes a small, genuinely reusable, **domain-free** primitives package:

| Keep | From today's path | Why it stays |
|---|---|---|
| `primitives/` | `primitives/` (SectionSpacer, ExpanseLoadingSpinner, DemoSurface) | Generic, no domain |
| `CollapsibleSidebar` | `components/basic-web-layout/` | Generic responsive shell |
| `PageContent`, `PlaceholderPage`, `SkipLinks`, `LiveAnnouncer`, `CountBadge` | `components/` | Generic page scaffolding + a11y |
| `Z_INDEX` + helpers | `constants/zIndex.ts` | Shared z-layer token system (consumed by map + hud) |
| `styles/` | `styles/` (gradients, glassEffect, elevation, duskHorizon) | Pure style utils |
| `utils/` | `utils/` (renderIcon, mergeSx, validation, accessibility) | Pure helpers |
| `theme/` | `theme/` (MUI augmentation + factories) | Shared theme augmentation |
| `LayoutProvider`, `LayoutConfigProvider` | `core/providers/` | Generic drawer/loading/config state |
| `SettingsPage`, `LayoutConfigurationPage` | `views/` | Generic full-page views (candidate to move to an app later) |

So `@expanse/shell` keeps being meaningful: it's the **design-system / layout
primitives layer** — tokens, style utils, theme augmentation, generic page
scaffolding, and app-agnostic providers. Both `@expanse/map` and `@expanse/hud`
depend on it for `Z_INDEX`, `styles`, `theme`, `utils`.

> Note: `templates/` (FullScreenLayout, MinimalLayout, DocumentationLayout, etc.)
> is a **kept gallery** of example/inspiration screens. **Decision (§6): keep them
> working and visible in Storybook.** They live wherever their dependencies pull
> them: templates that use HUD/map pieces move to `@expanse/hud`; any purely
> generic ones stay in `@expanse/shell`. Their stories must continue to render.

### 1.2 `@expanse/map` (new)

The navigation engine and everything that knows about a tile grid:

| Move | From today's path |
|---|---|
| Navigation engine | `map-and-navigation/navigation/` (Provider, Context, hooks, types, bridges) |
| Tiles | `map-and-navigation/tiles/` |
| Minimap (compact) | `map-and-navigation/minimap/` |
| Minimap (full) | `map-and-navigation/minimap-full/` (incl. `MinimapFullView`, `MinimapFullViewShell`) |
| Infinite grid | `map-and-navigation/infinite-grid/` |
| History | `map-and-navigation/history/` |
| Map layout provider | `map-and-navigation/layout-provider/MapLayoutProvider` |
| `PlaceholderMapView` | wherever it currently lives in map-and-navigation |

Depends on: `@expanse/shell` (Z_INDEX, styles, utils, theme).
Depends on: **nothing in hud** (verified — navigation is standalone today).

### 1.3 `@expanse/hud` (new)

HUD chrome infrastructure + the leaf widgets that live inside it:

| Move | From today's path |
|---|---|
| Slot system | `hud/slots/` (all 7 providers) |
| Registrations | `hud/registrations/` |
| Renderers | `hud/renderers/` (BottomChromeStack, HudTopRow, ChromeGate, ResponsiveHudStatus) |
| Docks | `hud/docks/ActionDock` |
| Rails | `hud/rails/` (HudLeftRail, HudRightRail) |
| HUD tiles/content | `hud/tiles/` (HudContentArea, TileContainer, TilePageRouter, useHudSafeArea) |
| Full orchestrator | `hud/full-hud/FullHud` + providers + Next bridges |
| Overlay state | `hud/overlay-state/` (ActionBarVisibilityProvider, **ActiveMapProvider**) |
| HUD constants | `hud/constants.ts` |
| All HUD widgets | `hud-components/*` (action bars, orbs, fab clusters, AI bars, NBA card, context bar, etc.) |

Depends on: `@expanse/map` (HudTopRow renders MinimapDock; HudContentArea uses
`useNavigation`; FullHud mounts NavigationProvider) and `@expanse/shell`.

> `ActiveMapProvider` currently lives in `hud/overlay-state/` but is generic
> (`<TKey extends string>`). It's used by the map overlay. Decision (§6): keep in
> `hud` (it's overlay state) — leaning yes, since it tracks HUD overlay focus.

### 1.4 Cross-package dependency summary

```
@expanse/hud   ──▶  @expanse/map   ──▶  @expanse/shell
     │                                        ▲
     └────────────────────────────────────────┘
   (hud also depends directly on layout for tokens/styles/theme)
```

This is acyclic — the split is clean. The only thing to watch: anything in
`hud/` that imports map types should import from `@expanse/map`, not reach back.

---

## 2. Cross-realm navigation — what's wrong & the fix

### 2.1 Current problems (3 duplication points)

1. **Realm → config mapping is hardcoded** in 3 places:
   - `FullScreenMapView.tsx` (`activeMap === "app" ? APP : WEBSITE`)
   - `MinimapFullViewOverlay.tsx` (legacy shim — being retired)
   - realm `layout.tsx` files (pass config to `HudShell`)
2. **`realmForPathname()` is duplicated** verbatim in two files.
3. **`ActiveMapKey` lives in the app** (`mapContent/types.ts`), decoupled from the
   configs it gates — an AI editing either side can't see the coupling.
4. **State drift risk:** the inner cross-realm `NavigationProvider` shadows the
   outer one. Closing the overlay leaves the outer position untouched (fine), but
   the relationship is implicit and undocumented at the type level.

### 2.2 The fix — a typed Realm Registry (single source of truth)

Create one registry that ties together: realm key, nav config, route prefix,
label, and (optionally) map availability.

```ts
// apps/4eye-website/src/lib/hud/realmRegistry.ts  (app-owned: configs are app data)
export interface RealmDefinition {
  key: RealmKey;                 // "website" | "app" | "technical"
  label: string;                 // "Website" | "App" | "Technical"
  routePrefix: string;           // "/", "/appRealm", "/technical"
  navConfig: MapGridNavigationConfig | null; // null = placeholder map (technical)
}

export const REALMS: Record<RealmKey, RealmDefinition> = { /* … */ };

export const REALM_ORDER: RealmKey[] = ["website", "app", "technical"];

export function realmForPathname(pathname: string | null): RealmKey {
  const hit = REALM_ORDER.find(
    (k) => REALMS[k].routePrefix !== "/" && pathname?.startsWith(REALMS[k].routePrefix),
  );
  return hit ?? "website";
}

export function navConfigForRealm(key: RealmKey): MapGridNavigationConfig | null {
  return REALMS[key].navConfig;
}
```

Then `FullScreenMapView` collapses its 3-branch `RealmMapContent` to:

```tsx
const navConfig = navConfigForRealm(activeMap);
if (navConfig === null) return <PlaceholderMapView mapKey={activeMap} label={REALMS[activeMap].label} />;
const reuseOuter = activeMap === currentRealm;
return reuseOuter
  ? <MapGrid {...mapProps} />                       // reuse outer NavigationProvider
  : <RealmNavScope config={navConfig}>{<MapGrid {...mapProps} />}</RealmNavScope>;
```

Where `RealmNavScope` is a tiny, **named, documented** component (replacing the
inline cross-realm wrapper) that encapsulates the "spin up an isolated nav tree"
intent:

```tsx
/** Mounts an isolated NavigationProvider for a realm that is NOT the current
 *  route. Bridges to the router and closes the overlay on navigate. Document
 *  the shadowing relationship here so the next reader (or AI) understands it. */
function RealmNavScope({ config, onNavigate, router, pathname, children }) { … }
```

### 2.3 Where the registry lives

- `RealmKey` type + `REALMS` registry: **app-owned** (configs are app marketing
  data). Put in `apps/4eye-website/src/lib/hud/realmRegistry.ts`.
- `ActiveMapProvider` generic stays in `@expanse/hud`; the app parameterizes it
  with `RealmKey`.
- Replace the app-local `ActiveMapKey` alias with `RealmKey` from the registry
  module (one name, one place).

### 2.4 Outcome

- Adding a 4th realm = one entry in `REALMS` + one route folder. No overlay edits.
- `realmForPathname` defined once.
- The shadowing relationship is documented in `RealmNavScope`'s doc comment.

---

## 3. Typing overhaul (HUD → Map → Layout, in that order)

Sequenced so the lowest-risk, highest-leverage types land first.

### 3.1 HUD typing

- **Slot registries:** give each registry a precise payload type and a branded
  registration id (avoid `string` ids colliding). Export the payload types from
  the barrel so consumers don't re-declare shapes.
- **`FullHud` props:** today it takes many loosely-typed props
  (`playerStatus`, `gamePanel`, `centerLocationOverride`, etc.). Group into a few
  well-named interfaces (`HudPlayerStatus`, `HudCenterOverride`, `HudSlotsProps`).
- **Discriminated unions** for chrome visibility / center-content variants instead
  of optional-everything bags.

### 3.2 Map typing

- **`MapGridNavigationConfig`:** tighten `category` to a union
  (`"primary" | "secondary" | "tertiary"`) shared with the legend; export a
  `TileCategory` type. Make `tiles` a `readonly TileConfig[]`.
- **Position/Direction:** ensure a single canonical `Position` and `Direction`
  type, re-exported, not re-declared per-module.
- **Generic `NavigationProvider<TConfig>`** so app configs can carry stricter tile
  id unions if desired (optional, nice-to-have).
- **`PlayerBlipVariant`, `CardSkin*`** — already unions; just ensure they're
  exported from `@expanse/map` / `@expanse/hud` barrels cleanly post-split.

### 3.3 Layout typing

- **`sx` helpers (`mergeSx`)**: ensure generics preserve `Theme`.
- **Theme augmentation**: verify the `Components` augmentation still resolves once
  the package is split (module augmentation must be imported by consumers).

### 3.4 Pre-existing type errors (gate)

`pnpm typecheck` currently reports ~20+ errors in unrelated files
(`VisionWatchCharacter` redeclare, `js-cookie` missing types, implicit `any`s in
intro slides, `GuestExplorerPanel` MUI overload mismatches). These are **not**
from this refactor but they hide regressions. Plan:

1. Triage into: (a) trivial (`js-cookie` types, add `@types/js-cookie`), (b)
   real bugs (`VisionWatchCharacter` double export), (c) MUI overload noise
   (often a wrong `component` prop or `sx` typing).
2. Fix to zero **before** the package split lands, so typecheck becomes a
   reliable green/red gate for the split.

---

## 4. Documentation rewrites & cleanup

After the structural work (docs describing the old shape would otherwise be
written twice):

- **Rewrite** `docs/technical/MONOREPO_STRUCTURE.md`, `PACKAGE_ARCHITECTURE.md`,
  `REPOSITORY_STRUCTURE.md` to reflect `@expanse/shell` + `@expanse/map` +
  `@expanse/hud` and the renamed apps.
- **New** `docs/technical/HUD_ARCHITECTURE.md` and `MAP_NAVIGATION.md` — short,
  diagram-first (Mermaid), with the realm registry + provider stack documented.
- **Archive** superseded docs to `docs/archive/` (don't delete — keep history).
- **Per-package `README.md`** for `layout`, `map`, `hud` describing scope, public
  API surface, and the dependency direction rule.
- **Grouped barrels:** ensure each `index.ts` has commented sections; this doubles
  as machine-readable documentation for AI assistance.

---

## 5. App renames

Two renames requested. Do these as **isolated commits** (rename = noisy diff):

1. `apps/4eye-web-mockup` → `apps/4eye-website`
2. `apps/4eye-web` → `apps/4eye-web-lab`

Per-rename checklist:
- `git mv` the folder (preserve history).
- Update `package.json` `name` field in each app.
- Update `pnpm-workspace.yaml` if it lists apps explicitly (it uses globs — verify).
- Update `tsconfig` path references, `docker/*.Dockerfile` build contexts,
  `docker-compose.yml` service paths, CI workflow paths.
- Update Storybook config paths, `next.config` references, and any
  `@/`-alias base that hardcodes the folder name.
- Grep the whole repo for the old folder string (docs, scripts, READMEs).
- Run dev + Storybook + typecheck after each rename independently.

> Naming: `4eye-web-lab` (confirmed).

---

## 6. Decisions

1. **`templates/`** (example/inspiration gallery): ✅ **KEEP working + visible in
   Storybook.** Relocate alongside their dependencies (HUD-using templates →
   `@expanse/hud`, generic ones → `@expanse/shell`). Stories must keep rendering;
   add them to the package-mirrored Storybook groups (§7). Do **not** delete.
2. **`views/`** (SettingsPage, LayoutConfigurationPage): keep in `layout` for now,
   revisit. (Open — low priority.)
3. **`ActiveMapProvider`** home: ✅ `@expanse/hud` (overlay state).
4. **App name:** ✅ `4eye-web-lab`.
5. **Registry ownership:** ✅ `REALMS` is **app-owned** (nav configs are app
   marketing data, not infra).

---

## 7. Suggested additional improvements (while in here)

- **Collapse the provider tower.** `FullScreenMapView` nests
  `RoleSelectionProvider → ActiveMapProvider → MapDirectionFocusProvider →
  MapViewBody`. Compose into one `<MapSessionProviders>` wrapper component to cut
  visual noise and give a single import point. (You already liked this idea.)
- **Single `useRealm()` hook** that returns
  `{ currentRealm, activeMap, setActiveMap, realmDef, navConfig }` so components
  stop assembling realm state piecemeal.
- **Lint rule / dependency-cruiser** to enforce the `hud → map → layout`
  direction and fail CI on a back-edge. Cheap insurance against future cycles.
- **`exports` field** in each package's `package.json` to lock the public API and
  prevent deep imports (`@expanse/hud/src/...`) from leaking.
- **Storybook reorg** to mirror packages: `Layout/*`, `Map/*`, `HUD/*` top-level
  groups (matches your existing `HUD / Map / …` titles).
- **Token consolidation:** confirm `Z_INDEX` is the only place layering is
  decided; grep for stray hardcoded `zIndex:` values in map/hud and route themi
  through the token.
- **Test the seams:** add a thin contract test per package (`import { } from
  "@expanse/map"`) that fails if a public export disappears — catches accidental
  barrel breakage during the split.

---

## 8. Execution order (phases — each ends green)

| Phase | Work | Gate |
|---|---|---|
| **P0** | Fix pre-existing type errors to zero (§3.4) | `pnpm typecheck` clean |
| **P1** | App renames (§5), two isolated commits | dev + storybook + typecheck |
| **P2** | Realm registry + `realmForPathname` dedupe + `RealmNavScope` (§2) | overlay works, stories green |
| **P3** | Collapse provider tower + `useRealm()` (§7) | no behavior change |
| **P4** | Extract `@expanse/map` (relocate + shims + grouped barrel) (§1.2) | typecheck + storybook |
| **P5** | Extract `@expanse/hud` (relocate + shims + grouped barrel) (§1.3) | typecheck + storybook + **template stories render** |
| **P6** | Slim `@expanse/shell`, add `exports` fields + dep-cruiser rule (§7) | CI dep-direction passes |
| **P7** | Typing overhaul HUD → Map → Layout (§3.1–3.3) | typecheck clean |
| **P8** | Remove back-compat shims (MinimapFullViewOverlay, old barrels) | no remaining old imports |
| **P9** | Documentation rewrites + per-package READMEs (§4) | docs reflect new shape |

Each phase is independently revertible. P0 and P1 can start immediately and in
parallel-ish (P0 first if renames touch typed files).

---

## 9. Risk register

| Risk | Mitigation |
|---|---|
| Package split breaks deep imports | Add `exports` field + shims; grep for `@expanse/shell/src` deep imports first |
| Theme module augmentation stops resolving post-split | Ensure consumers import the augmentation entry; add a smoke story |
| Rename breaks Docker/CI paths | Per-rename checklist (§5); run full build once after each |
| Cross-realm provider regressions | P2 has story coverage; keep `RealmNavScope` behavior identical to inline version |
| Hidden cycles hud↔map | dependency-cruiser gate (P6) |
| Template gallery stories break during relocation | Move templates with their deps; smoke-render every template story after P5 before proceeding |
