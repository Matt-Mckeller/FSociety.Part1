# `@expanse/shell` · `src/hud/`

The HUD ("Heads-Up Display") system. A composable shell of edge-anchored
chrome (top bar, side rails, bottom bars, minimap) that surrounds an
inset-aware content area where tile pages render.

```
hud/
├── slots/          – context registries (state)
├── registrations/  – built-in default registrations (config)
├── renderers/      – consumers that paint pixels (view)
├── docks/          – ActionDock: floating positioner
├── rails/          – HudLeftRail / HudRightRail: vertical edge chrome
├── tiles/          – HudContentArea + TileContainer + useHudSafeArea
└── full-hud/       – pre-composed FullHud orchestrator
```

Single import surface for app code:

```ts
import {
  FullHud,
  TileContainer,
  useHudSafeArea,
  useRegisterBottomBar,
} from "@expanse/shell"
```

---

## Mental model

The HUD is a **registry-driven shell**. Each piece of chrome registers
what it claims; consumers read the aggregated state and lay out
accordingly.

```
┌─────────────────────────────────────────────┐
│ top chrome (status, location, minimap)     │  ← claims `top`
├──┬──────────────────────────────────────┬──┤
│  │                                      │  │
│  │      <HudContentArea> safe area       │  │  ← inset-aware
│  │      ┌──────────────────────────┐    │  │
│  │ left │   <TileContainer mode="">│    │ R│
│  │ rail │       <YourTilePage/>    │    │ail
│  │      └──────────────────────────┘    │  │
│  │                                      │  │
├──┴──────────────────────────────────────┴──┤
│ bottom chrome (FAB cluster, AI input bar)  │  ← measures self,
└─────────────────────────────────────────────┘     claims `bottom`
```

Adding/hiding chrome — or expanding a panel — re-registers the inset
and the safe area resizes automatically. Tiles never need to know.

---

## `slots/` — state registries

Five React contexts. Each provider holds a `Map<id, entry>`; child
components add/remove entries via `useRegister*` hooks; consumers read
the aggregated value.

| Provider                     | What it tracks                                          |
| ---------------------------- | ------------------------------------------------------- |
| `HudInsetsProvider`          | Per-edge pixel claims. Aggregated as **max** per edge.  |
| `HudChromeVisibilityProvider`| Hide-keys (e.g. `aiInputBar`) for per-bar visibility.   |
| `BottomBarsProvider`         | Stack of bottom bars (FAB, AI input, slide bars).       |
| `CenterContentProvider`      | Top-center content (e.g. slideshow timeline).           |
| `HudHintsProvider`           | Transient overlays / hints.                             |

Hooks (most important):
- `useRegisterHudInset({ id, edge, size, label? })`
- `useHudInsets()` → `{ insets, entries }`
- `useRegisterHudChromeHide({ id, hide: ["aiInputBar"] })`
- `useRegisterBottomBar({ id, node, order, hideKey? })`

## `registrations/` — built-in defaults

Null-renderer components mounted by `FullHud` that wire up the standard
HUD shell into the slot registries.

- `RegisterTopChromeInset`, `RegisterLeftRailInset`,
  `RegisterRightChromeInset`, `RegisterMinimapInset` — declare default
  edge claims on mount.
- `RegisterDefaultBottomBars` — registers the OrbBar + AI input bar
  into `BottomBarsProvider` so they appear in `BottomChromeStack`.

## `renderers/` — slot consumers

The pieces that actually render pixels by reading from a registry.

- `BottomChromeStack` — single fixed flex column at the bottom edge that
  stacks every registered bottom bar (sorted by `order`). Self-measures
  with `ResizeObserver` and re-registers `fullhud-bottom` so the safe
  area updates when chrome height changes (chat opening, bars hiding).
- `HudTopRow` — top status / current-location / minimap row.
- `ChromeGate` — visibility gate that reads `useHudChromeVisibility`.
- `ResponsiveHudStatus` — adaptive status bar.

## `docks/` — `ActionDock`

Pure screen-positioning wrapper. Nine anchor positions
(`top-left`, `top-center`, ..., `bottom-right`, `center`) + a numeric
`offset`. Owns no visual styling — drop an `ActionBar` inside.

```tsx
<ActionDock position="bottom-right" offset={24}>
  <ActionBar><ActionButton .../></ActionBar>
</ActionDock>
```

## `rails/` — left & right rails

`HudLeftRail` and `HudRightRail` compose `ActionDock` + `FabCluster` to
render the vertical edge chrome (theme toggle, settings, game panel,
right-side FAB cluster). They register their own left/right inset.

## `full-hud/` — `FullHud`

The pre-composed orchestrator. Mounts:

1. `FullHudProviders` — Theme, Navigation, HudInsets, ChromeVisibility,
   BottomBars, CenterContent, Hints.
2. `RegisterDefault*Inset` — baseline claims so first paint is correct.
3. `HudContentArea` — inset-aware safe-area `<main>`.
4. `HudTopRow`, `HudLeftRail`, `HudRightRail`, `BottomChromeStack`.
5. `RegisterDefaultBottomBars` — OrbBar + AI input.

Pass `pages={{ [tileId]: <Page/> }}` for demo / Storybook routing, or
`children` for Next.js app-router mode (route tree under `(hud)/`).

---

## Tile content area (`tiles/`)

Three collaborators, **not duplicates**:

| Component        | Concern                                             |
| ---------------- | --------------------------------------------------- |
| `HudContentArea` | Pure positioning. Top/left/right insets, `bottom: 0`, no overflow rule. |
| `TilePageRouter` | Looks up `currentTile.id` and renders the matching page. Demo routing. |
| `TileContainer`  | Per-tile overflow strategy. `mode="fit"` (no scroll, bounds bottom at chrome) or `mode="scroll"` (flows under chrome, auto bottom-padding). |

Plus `useHudSafeArea()` — hook returning live `{ top, bottom, left, right, minimap }` pixel insets for any custom widget that needs to position relative to the safe area.

```tsx
// Tile owns the container choice
export default function HomeTile() {
  return (
    <TileContainer mode="fit">
      <Slideshow />
    </TileContainer>
  )
}
```

---

## Adding new HUD chrome

1. **Render a bar at the bottom**: register it via `useRegisterBottomBar`. `BottomChromeStack` picks it up. Inset auto-updates.
2. **Reserve space on an edge**: call `useRegisterHudInset({ edge, size })`. The safe area shrinks. Unregister on unmount; safe area grows back.
3. **Hide an existing bar conditionally**: `useRegisterHudChromeHide({ id, hide: ["aiInputBar"] })`.
4. **Float a custom button cluster at a corner**: wrap in `<ActionDock position="..."><ActionBar>…</ActionBar></ActionDock>`. ActionDock does not register an inset by itself — if your float overlaps content, also register an inset.
