# Minimap Full View — Feature Plan

Status: Phases 1–4 shipped + visual-polish round. Phase 5 (real chat integration) blocked on host chat surface.
Owner: `@expanse/shell` (shell + reusable pieces) + host app (slot content + routing).
Related code: `src/spatial/minimap/`, `src/spatial/minimap-full/`, `src/spatial/map/`, `src/hud-components/full-hud/`.

## 1. Why

Today the minimap is a small corner overlay. The corner panel already knows how to
render the grid, click tiles, run keyboard nav, and show the legend — **functionality
parity is not the point**. The full view exists for two reasons:

1. **A better navigation experience when the user wants a fuller view of where they are
  and where they can go.** The corner panel is glance-sized; the full view is a
   deliberate, focused surface for orienting and deciding. Bigger tiles with icon +
   label, a calmer layout, room for chat and per-page actions next to the grid.
2. **Introducing the user to the map.** It’s the bridge between the home flow’s
  guided “easy path” and the open-ended decision-making the rest of the app requires.
   After the home/onboarding sequence, the user lands here to see the fuller picture
   before they start navigating freely.

Important framing: the full view should **feel like a separate part of the app, not a
page**. It is a mode change — closer to a workspace or “entering the map” — not a route
the user navigates between alongside other pages. Visually it owns the viewport;
behaviorally it can be entered, left, and re-entered without disturbing the rest of the
app’s state.

The HUD’s `CurrentLocationActionBar` is **identity** (where am I); the full view is
**deliberation** (where do I go, what does this place mean, what can I do here).

## 2. Locked decisions


| #   | Decision                                                                                                                                                                         | Source  |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| 1   | Full view occupies the **primary viewport** under HUD chrome (use `100dvh` minus measured insets via `HudInsetsProvider`).                                                       | thread  |
| 2   | **Chat slot** is a first-class `ReactNode` slot. v1 ships with a placeholder; real 4eye chat plugs in later without API changes.                                                 | thread  |
| 3   | Two **app-supplied action regions**: (A) **Navigation actions** (history, list view, return), (B) **Role / view actions** (page-specific). Layout owns structure + spacing only. | thread  |
| 4   | **List view stays available** in full map mode (toggle, like the dock).                                                                                                          | thread  |
| 5   | **Center HUD** is now `CurrentLocationActionBar` (icon + back/forward, always visible). `ContextBar` **leaves the HUD** and only appears on the full map surface.                | shipped |
| 6   | **Legend stays** (color → category mapping is still needed).                                                                                                                     | thread  |
| 7   | Full view is **collapsible** and exposes an explicit **return / exit** control (don’t trap the user).                                                                            | thread  |
| 8   | Full screen is opened via the **minimap panel header** (`onFullScreenRequest`) — already wired through `MinimapDock` + `FullHud.onMinimapFullScreenRequest`.                     | shipped |
| 9   | **Forward history** mirrors back history; `goForward` / `canGoForward` are part of `NavigationHook`.                                                                             | shipped |


## 3. Non-goals (v1)

- Multi-floor / multi-grid maps (single grid only).
- Pan / zoom / mini-map-of-mini-map; the grid is fully on-screen.
- Drag-to-reorder tiles or in-map authoring.
- Realtime collaboration cursors.
- Persisted layout per user (host can pass `defaultListViewOpen` etc., but no built-in storage).

## 4. Status snapshot

### Phase 1 — HUD reshuffle  ✅ Shipped

- `CurrentLocationActionBar` (icon + back/forward, tooltips, disabled states).
- `ContextBar` removed from `FullHud` center; props deprecated, ignored.
- `NavigationHook` extended with `goForward`, `canGoBack`, `canGoForward` (forward stack
in `useNavigationState` / `useNavigationActions`).
- `MinimapPanel.onFullScreenRequest` + `FullHud.onMinimapFullScreenRequest` plumbed
through `MinimapDock`.
- `useRegisterHudInset` label updated to `Top chrome (status + location)`.

Touched:
`useNavigationState.ts`, `useNavigationActions.ts`, `NavigationHook.types.ts`,
`MapGridNavigationProvider.tsx`, `CurrentLocationActionBar.tsx` (new),
`FullHud.tsx`, `MinimapPanel.tsx`, `hud-components/index.ts`.

### Phase 2 — `MinimapFullView` shell  ✅ Shipped

- `src/spatial/minimap-full/` scaffolded with shell, hooks, barrel, stories.
- `MinimapFullViewShell` (header + context-bar slot + body + legend + footer +
  inset-aware padding via `topChromeInset` / `leftChromeInset` /
  `rightChromeInset` / `bottomChromeInset`).
- `useFullMapEscape`, `useFullMapEntrance` (`from-top-right` default,
  reduced-motion aware).

### Phase 3 — Tile-in-cell rendering  ✅ Shipped

- Shared `MinimapTileGrid`, `MinimapCategoryLegend`, `useMinimapLegendItems`
  extracted; consumed by both `MinimapPanel` and `MinimapFullGrid` /
  `MinimapFullLegend`.
- `MinimapTile` gained `content` prop (`iconOnly | iconAndLabel`) +
  first-letter chip fallback when no icon.
- `MinimapFullGrid` is responsive (`tileSize="responsive"`,
  `min/maxTileSize`).
- Storybook rewritten with `NavigationProvider` so stories render the real grid.

### Phase 4 — Host integration  ✅ Shipped

- `HudStateProvider` + `useOpenMapView` / `useCloseMapView` in
  `apps/4eye-web-mockup/src/components/hud/state/`.
- `MinimapFullViewOverlay` mounted at `HudShell` level inside the FullHud's
  `NavigationProvider` + `HudInsetsProvider`. Reads `useHudInsets()` so the
  surface stays inside the safe rect under HUD chrome.
- `FullHud.centerLocationOverride` lets the host repurpose the HUD top-center
  page-icon button as the "return to app" control while the overlay is open
  (no separate Return button on the surface).
- `Z_INDEX.FULL_MAP_VIEW` (1150) and `Z_INDEX.AI_CHAT_PANEL_EXPANDED` (1450)
  added between ACTION_BARS and CHROME so the overlay sits below persistent
  chrome (status bar, rails, AI input bar) but above page content.
- Inline embed: the marketing reward slide renders `<MinimapFullView
  preset="hero" tileContent="iconOnly" flat={false} entrance="from-top-right"
  />` in a responsive aspect-ratio cell (4/3 mobile, 5/3 desktop), beside
  `ViewingByRolePlaceholder` on desktop. The closing-beat overlay open is no
  longer auto-dispatched.

### Phase 4 — Visual polish  ✅ Shipped (05-05)

**Tile polish:**
- `MinimapTile`: navigational chevrons on active tile — boundary-aware
  (suppressed at grid edges), absolutely positioned N/S/E/W with staggered
  CSS pulse animation (`minimap-chevron-{up|down|left|right}`, 1.6s, 4px
  translate, 0/0.4/0.8/1.2s delays). Props: `showNavigationChevrons`,
  `canMoveUp/Down/Left/Right`.
- `MinimapTile` labels: switched to single-line ellipsis + MUI `Tooltip` on
  truncation; min-width 112px; `text.primary` color with `opacity: isActive ?
  1 : 0.85` (was `text.secondary`); active weight 700, inactive 600.

**Preset system:**
- `MinimapFullView` gains a `preset` prop with 5 named configs:
  `hero` (48–200, comfortable), `large` (56–120, comfortable),
  `medium` (40–88, compact), `small` (28–56, compact),
  `thumbnail` (20–40, compact, iconOnly).
  Explicit props always win over preset defaults.
- 6 new Storybook stories: `PresetHero`, `PresetLarge`, `PresetMedium`,
  `PresetSmall`, `PresetThumbnail`, `NavigationChevrons`.

**Grid layout refactor:**
- `MinimapTileGrid`: replaced nested flex rows with a single CSS Grid
  container (`display: "grid"`, `gridTemplateColumns/Rows`,
  `columnGap`/`rowGap`). Guarantees column alignment regardless of label
  length. Axis labels bumped to `text.primary` + `opacity: 0.75`, 0.7rem,
  weight 600.

**Contrast fixes:**
- `MinimapFullViewShell`: was setting `color: primary.contrastText` (white in
  the brand palette), making child Typography invisible on white card
  surfaces. Fixed to `text.primary`. Card mode now uses `background.paper`.
  Header refactored to 3-section flex layout `[spacer][title][actions]`;
  title optically centered without absolute positioning. Legend strip gets a
  `borderTop: divider` so it reads as chrome.
- `MinimapCategoryLegend` captions: `text.primary` + `opacity: 0.85`
  (was `text.secondary`), 0.75rem, weight 600.

**`ViewingByRolePlaceholder`** (new file):
- Right-column companion on the reward slide.
- Card matching map card style. Header with role-theme framing. 5 role chips
  with icons (Student, Teacher, Parent, Professional, Organization). 3 muted
  preview rows.

### Phase 5 — Real chat integration  🟡 Deferred

Blocked on the host's real chat surface landing. Slot API is already
chat-shaped; expecting no shell-side changes when it ships.

## 5. Architecture

### 5.1 Component split

Separate **public** component, **shared** internals — not a giant `variant` on
`MinimapPanel`.

```
@expanse/shell
├── spatial/
│   ├── map/              ← Navigation source of truth (existing)
│   │   ├── providers/MapGridNavigationProvider
│   │   └── hooks/useNavigation, useNavigationActions, useNavigationState
│   ├── minimap/          ← HUD-corner experience (existing)
│   │   ├── MinimapPanel  ← keep API stable
│   │   └── MinimapDock
│   └── minimap-full/     ← NEW: full-viewport experience
│       ├── MinimapFullView.tsx
│       ├── MinimapFullViewShell.tsx
│       ├── MinimapFullGrid.tsx       ← extends/shares MinimapTile
│       ├── MinimapFullLegend.tsx
│       ├── hooks/
│       │   ├── useFullMapEntrance.ts ← top-right origin, reduced-motion aware
│       │   └── useFullMapEscape.ts   ← Esc → close, focus return
│       └── index.ts
└── hud-components/
    ├── shared/CurrentLocationActionBar.tsx ✅
    └── context-bar/ContextBar.tsx          ← used inside MinimapFullView only
```

**Reuse strategy** (must, not should):

- All movement goes through `useNavigation()` — never duplicate keyboard or click logic.
- Tile cell should be the **same `MinimapTile`** with two display modes
(`content="iconOnly" | "iconAndLabel"`), not a fork.
- Legend extracted from `MinimapPanel` into `MinimapFullLegend` (shared module) so the
panel and full view stay visually consistent.

### 5.2 Public API sketch

```tsx
export interface MinimapFullViewProps {
  // ── lifecycle ─────────────────────────────────────────────
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Called when the user invokes Return / Esc. Defaults to onOpenChange(false). */
  onExit?: () => void

  // ── chrome ────────────────────────────────────────────────
  title?: ReactNode               // default: "Map"
  /** Force flat surface tokens; default true (no border, no shadow). */
  flat?: boolean
  /** App-injected nav actions (history, list-view toggle, return, etc.). */
  navigationActions?: ReactNode
  /** App-injected role/page actions. */
  roleActions?: ReactNode
  /** Optional ContextBar slot (workspace switcher); rendered inside this surface only. */
  contextBar?: ReactNode

  // ── content slots ─────────────────────────────────────────
  chat?: ReactNode                // 4eye chat — placeholder card if undefined
  footer?: ReactNode

  // ── grid behavior ─────────────────────────────────────────
  tileContent?: "iconOnly" | "iconAndLabel"   // default "iconAndLabel"
  tileSize?: number | "responsive"            // default "responsive"
  showLegend?: boolean                        // default true
  showListView?: boolean                      // default true
  defaultListViewOpen?: boolean
  listViewOpen?: boolean
  onListViewOpenChange?: (open: boolean) => void

  // ── motion ────────────────────────────────────────────────
  /** Entrance animation. Default: "from-top-right". Honors prefers-reduced-motion. */
  entrance?: "none" | "from-top-right" | "fade"

  // ── styling escape hatches ────────────────────────────────
  sx?: SxProps<Theme>
  className?: string
}
```

State ownership: **all controlled** (`open`, `listViewOpen`). The host owns routing
and persistence; the shell only renders.

### 5.3 Layout regions

```
┌─────────────────────────────────────────────────────────────┐
│  [icon] Map                  [navigationActions] [roleActions] [Return] │   ← header
├─────────────────────────────────────────────────────────────┤
│  [ContextBar (optional)]                                     │   ← workspace strip
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────────────────────┐   ┌──────────────────────┐ │
│   │                             │   │  Chat slot           │ │
│   │       MinimapFullGrid       │   │  (placeholder v1)    │ │
│   │   (icon + label per cell)   │   │                      │ │
│   │                             │   │                      │ │
│   └─────────────────────────────┘   └──────────────────────┘ │
│                                                              │
│   Legend ▢ Category A   ▢ Category B   ▢ ...                 │
└─────────────────────────────────────────────────────────────┘
                                                  [footer slot]
```

Breakpoints:

- `>= md`: two columns (grid 2/3, chat 1/3).
- `< md`: stacked (grid → chat → legend).
- `xs`: chat collapses to a button that opens a sheet.

## 6. Behavior contracts

### 6.1 Navigation

- Click tile, arrow keys, programmatic — **identical to `MinimapPanel`** (same hook).
- Active cell pulses (existing behavior).
- Hover preview chip is **not** rendered (each cell already shows label).

### 6.2 Keyboard


| Key         | Action                                     |
| ----------- | ------------------------------------------ |
| `Arrow*`    | Move on grid (existing)                    |
| `Enter`     | Activate hovered tile                      |
| `Esc`       | Call `onExit` (defaults to close)          |
| `Tab`       | Header → ContextBar → Grid → Chat → Footer |
| `Shift+Tab` | Reverse                                    |


### 6.3 Accessibility

- Surface uses `role="region"` with `aria-label="Map view"`.
- When opened as a modal route/dialog (host choice), wrap in a focus trap and restore
focus to the invoking control on exit (the minimap fullscreen button).
- All interactive controls have visible labels or `aria-label`.
- Color is never the only signal: legend swatches always pair with text.

### 6.4 Motion

- Default `entrance="from-top-right"`: scale 0.92 → 1, opacity 0 → 1, transform-origin
top-right, 220ms ease-out.
- `prefers-reduced-motion: reduce` → fall back to `fade`.

### 6.5 Theme tokens (flat surface)


| Token                | Value                                                |
| -------------------- | ---------------------------------------------------- |
| `surface.background` | `theme.palette.background.default`                   |
| `surface.border`     | `none`                                               |
| `surface.shadow`     | `none`                                               |
| `surface.padding`    | `theme.spacing(3)` (md+), `theme.spacing(2)` (xs/sm) |
| `cell.gap`           | `theme.spacing(1)`                                   |
| `cell.label.font`    | `theme.typography.caption`                           |


## 7. Integration points

### 7.1 HUD ↔ Full view

- Open: `MinimapPanel` header → `onFullScreenRequest` → host opens full view.
  - Already wired: `FullHud.onMinimapFullScreenRequest` → `MinimapDock` →
  `MinimapPanel.onFullScreenRequest`.
- While full view is open, host should set `HudChromeVisibility` to **hide the dock**
(avoid a second minimap on screen).
- `CurrentLocationActionBar` stays visible (per Decision 5 — it’s identity, not chrome).

### 7.2 Routing strategy (host responsibility)

Per the framing in §1 (“a separate part of the app, not a page”), the **default
recommendation is an app-level overlay/mode**, not a sibling route to other pages:

1. **Overlay / mode** (default recommendation):
  App-level state (`useMapView()` hook or context) controls `open`. Renders **above**
   the rest of the HUD chrome, owning the viewport. Underlying page state, scroll
   position, and any in-flight work are preserved when the user exits.
  - Wins: matches the “mode change, not navigation” mental model; intro flow can open
  it without changing the route; exit returns the user exactly where they were.
  - Trade-off: not deep-linkable by default — add a hash (`#map`) or shallow query
  (`?map=1`) if shareability matters.
2. **Route-mirrored overlay** (use when deep links matter):
  Same overlay component, but a route segment (`/map`) toggles the mode via the same
   hook. Browser back closes the overlay. Avoid making `/map` its own page tree — keep
   the underlying app state intact.
3. **Route-driven page** (avoid unless an app explicitly wants this):
  Treats the map as a sibling page. Loses the “separate mode” feel and discards
   underlying state on entry/exit. Listed only for completeness.

In all cases, `onOpenChange(false)` is the single exit path used by Esc, the Return
control, and any host-level back/route handler.

### 7.3 Intro / onboarding role

The full view is the **handoff surface** between the home/intro flow and free
navigation. Concretely:

- The home flow can call `openMapView({ reason: "intro" })` (or equivalent host hook)
to mount the surface as the closing beat of onboarding.
- v1 ships **no built-in tour overlay or coach marks**. The shell itself is the
introduction: a calm, well-lit map with the user’s current location obvious and
every tile labeled. Decision quality comes from clarity, not annotations.
- The host may pass intro-specific copy via slots:
  - `title` (e.g. “This is your map.”)
  - `footer` (e.g. a single primary CTA like “Start exploring”).
- Exit copy is host-controlled via the `Return` control (rendered through
`navigationActions`). First entry can read “Continue”; subsequent entries can read
“Close map”.
- Persistence (e.g. “user has seen the intro”) is **out of scope** for the shell. The
host owns it.

### 7.4 ContextBar relocation

- v1: `ContextBar` is **only mounted inside `MinimapFullView`** via the `contextBar`
slot. Hosts do not render it elsewhere.
- v2 (future): if a host wants a workspace switcher outside the map, expose
`<ContextBar />` directly — the shape is unchanged.

## 8. Phased delivery

Each phase ends in a green type-check, working Storybook story, and a small PR.

### Phase 2 — Shell foundation

- New folder `src/spatial/minimap-full/`.
- `MinimapFullViewShell` (header + layout regions, no grid yet — uses placeholders).
- `useFullMapEscape`, `useFullMapEntrance`.
- Storybook: shell with mock slots.
- DoD: open/close, slots render, Esc closes, reduced-motion path works.

### Phase 3 — Grid + legend

- Extract `MinimapGrid` and `MinimapLegend` from `MinimapPanel` into shared modules
used by both `MinimapPanel` and `MinimapFullView`.
- Add `MinimapTile` `content` prop (`iconOnly | iconAndLabel`) with truncation rules.
- Wire `useNavigation` (already the source of truth — just re-render at hero size).
- Storybook: grid story with sample 5×5 tile registry.
- DoD: click + arrows + active state + legend match `MinimapPanel` parity.

### Phase 4 — Host integration

- Add example route in `apps/4eye-web-mockup` (e.g. `/map`).
- Wire `FullHud.onMinimapFullScreenRequest` to navigate to it.
- Hide the corner `MinimapDock` while on `/map` via `useRegisterHudChromeHide`.
- Mount `<ContextBar />` inside the surface’s `contextBar` slot.
- Inject placeholder chat card and a couple of role/navigation action buttons.

### Phase 5 — Chat (post-v1)

- Replace placeholder with real 4eye chat shell when it exists.
- Slot API is already chat-shaped; no shell changes expected.

## 9. File map

New:

- `packages/@expanse/shell/src/spatial/minimap-full/MinimapFullView.tsx`
- `packages/@expanse/shell/src/spatial/minimap-full/MinimapFullViewShell.tsx`
- `packages/@expanse/shell/src/spatial/minimap-full/MinimapFullGrid.tsx`
- `packages/@expanse/shell/src/spatial/minimap-full/MinimapFullLegend.tsx`
- `packages/@expanse/shell/src/spatial/minimap-full/hooks/useFullMapEntrance.ts`
- `packages/@expanse/shell/src/spatial/minimap-full/hooks/useFullMapEscape.ts`
- `packages/@expanse/shell/src/spatial/minimap-full/index.ts`
- `packages/@expanse/shell/src/spatial/minimap-full/MinimapFullView.stories.tsx`

Touched (extract shared internals):

- `packages/@expanse/shell/src/spatial/minimap/components/MinimapPanel.tsx`
(consume new shared `MinimapGrid` / `MinimapLegend`)
- `packages/@expanse/shell/src/spatial/minimap/components/MinimapTile.tsx`
(add `content` prop)
- `packages/@expanse/shell/src/index.ts` (re-export `MinimapFullView` types)

App wiring:

- `apps/4eye-web-mockup/src/app/map/page.tsx` (or equivalent route).
- `apps/4eye-web-mockup/src/components/hud/HudShell.tsx` — pass
`onMinimapFullScreenRequest` and hide dock on `/map`.

## 10. Risks & mitigations


| Risk                                                               | Mitigation                                                                                                                                         |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MinimapPanel` and full view drift in look/behavior.               | Extract shared `MinimapGrid` + `MinimapLegend` once at Phase 3; both consume them.                                                                 |
| Two minimaps visible (corner + full).                              | Hide `MinimapDock` while full view is mounted via chrome visibility provider.                                                                      |
| `goForward` regressions in existing consumers of `NavigationHook`. | Only **additive** props on the hook; runtime behavior of normal nav unchanged outside the new forward stack. Add unit tests for back→forward→back. |
| Tile labels overflow at small sizes.                               | Cap to two lines with ellipsis; tooltip on truncated; minimum cell width enforced.                                                                 |
| Routing variance across apps.                                      | Don’t bake routing into the shell — host owns `open` state. Document both routing patterns.                                                        |
| Accessibility regressions when full view becomes a modal.          | Phase 2 ships with focus trap + return-focus utilities baked into `MinimapFullViewShell`.                                                          |
| Reduced motion users get a jarring entrance.                       | `useFullMapEntrance` checks `prefers-reduced-motion` and falls back to `fade`.                                                                     |


## 11. Open questions — resolutions

1. **Overlay vs route-mirrored overlay.** → **Plain overlay.** `HudStateProvider`
   owns `isMapViewOpen`; no URL hash. Revisit if deep-linking is needed.
2. **Intro entry trigger.** → **Neither.** The reward slide renders
   `MinimapFullView` inline (Phase 4); the overlay is a user-initiated mode,
   not part of the home flow.
3. **Intro vs returning copy.** → **Host-driven slots.** No `mode` prop on the
   shell.
4. **Chat placeholder copy.** → **Defer.** Reward slide uses real `RoleChat`
   beside the inline view; full-screen overlay has no chat slot rendered yet.
5. **Minimum action set.** → **None on the surface.** The HUD top-center
   button (`centerLocationOverride`) is the sole return; surface ships
   without `roleActions` / `navigationActions` populated.
6. **Per-app tile icons.** → **Fallback shipped.** `MinimapTile` renders a
   first-letter chip when `display.icon` is null.
7. **List view in full view.** → **Out of v1.** `showListView` props remain on
   `MinimapFullView` for API stability but render nothing.
8. **Re-entry feel.** → **Re-plays every open** today. Will revisit if it
   reads heavy after real-world use.

## 12. Definition of done (whole feature)

- `MinimapFullView` ships from `@expanse/shell` with stable, documented props.
- `MinimapPanel` and `MinimapFullView` share a single `MinimapGrid` and `MinimapLegend`.
- Opening the full view from the minimap panel works end-to-end in the mockup app.
- Keyboard, focus management, and reduced motion all pass manual a11y review.
- Storybook coverage: shell, grid, legend, full composition, mobile breakpoint.
- `pnpm --filter @expanse/shell type-check` is green for files in this feature
(existing unrelated errors out of scope).

## 13. Change log


| Date       | Change                                                                                                                                                                                                                       |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-05-03 | Phase 1 shipped (HUD reshuffle, forward history, fullscreen plumb). Plan recorded.                                                                                                                                           |
| 2026-05-03 | Phases 2–4 shipped. Phase 2: `MinimapFullViewShell` + entrance/escape hooks. Phase 3: shared `MinimapTileGrid` / `MinimapCategoryLegend`, responsive `MinimapFullGrid`, `MinimapTile.content` + first-letter fallback. Phase 4: `HudStateProvider`, `MinimapFullViewOverlay` mounted in `HudShell`, `FullHud.centerLocationOverride` powers HUD-button return, `Z_INDEX.FULL_MAP_VIEW` / `AI_CHAT_PANEL_EXPANDED` added.                                                                                |
| 2026-05-04 | Polish + inline embed. Title centered above body; `ContextBar` gains `labelDisplay` / `labelSize`. Overlay padded by `useHudInsets()` (top/left/right/bottom). Shell gains `density: "comfortable" \| "compact"` + `topChromeInset` / `leftChromeInset` / `rightChromeInset`. `MinimapFullView` exposes `density` + `maxTileSize` passthroughs. Reward slide swapped from `MinimapPanel` + auto-open overlay to inline `MinimapFullView` (responsive aspect-ratio cell, beside `RoleChat`). Open questions resolved (§11). |
| 2026-05-03 | Clarified intent: full view is a **mode**, not a page; introduces the user to the map after the home flow. Routing recommendation flipped from “route by default” to “overlay by default”. Added §7.3 intro/onboarding role. |


