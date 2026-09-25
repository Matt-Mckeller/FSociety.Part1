# Map View Improvements — Plan

Scope: `MinimapFullViewOverlay` and dependencies in `@expanse/shell`.
Goal: minimap is easy to use and understand; navigation makes sense; eyes are
guided to the right place; info is found easily; users know how to use it.

## Files at a glance

- Overlay shell — [apps/4eye-web-mockup/src/components/hud/MinimapFullViewOverlay.tsx](apps/4eye-web-mockup/src/components/hud/MinimapFullViewOverlay.tsx)
- Marketing nav config (tile colors) — [apps/4eye-web-mockup/src/lib/hud/websiteNavigationConfig.ts](apps/4eye-web-mockup/src/lib/hud/websiteNavigationConfig.ts)
- Right rail (NBA + context) — [apps/4eye-web-mockup/src/components/hud/MapContextPanel.tsx](apps/4eye-web-mockup/src/components/hud/MapContextPanel.tsx)
- NBA content / direction labels — [apps/4eye-web-mockup/src/components/hud/mapContent/locationContent.ts](apps/4eye-web-mockup/src/components/hud/mapContent/locationContent.ts)
- Chevron rendering — [packages/@expanse/shell/src/map-and-navigation/minimap/components/minimap-tile/primitives/TileChevrons.tsx](packages/@expanse/shell/src/map-and-navigation/minimap/components/minimap-tile/primitives/TileChevrons.tsx)
- Minimap tile (chip + chevrons composition) — [packages/@expanse/shell/src/map-and-navigation/minimap/components/minimap-tile/MinimapTile.tsx](packages/@expanse/shell/src/map-and-navigation/minimap/components/minimap-tile/MinimapTile.tsx)
- WASD widget (to remove) — [packages/@expanse/shell/src/hud-components/map-overlay/MapKeyboardHints.tsx](packages/@expanse/shell/src/hud-components/map-overlay/MapKeyboardHints.tsx) (registration site: `MinimapFullViewOverlay.tsx` last line)
- Existing app loader — [apps/4eye-web-mockup/src/app/(hud)/loading.tsx](apps/4eye-web-mockup/src/app/(hud)/loading.tsx)
- Storybook config — [apps/4eye-web-mockup/.storybook/main.ts](apps/4eye-web-mockup/.storybook/main.ts)

---

## Phase 1 — Quick visual wins (tiles, background, WASD, Play CTA)

### 1.1 Tile color updates (websiteNavigationConfig.ts)
- **Gamification → PURPLE** (was green). New tokens:
  `PURPLE = { inactive: "rgba(168,85,247,0.4)", active: "#a855f7" }` (matches APP_HUD_NAV_CONFIG).
- **Why → BLUE** (was orange). Reuse existing `BLUE`.
- **Content (marketing-content)** — per spec, "not a tile yet". Two options:
  a. **Remove** the tile from the grid entirely (preferred — declutters minimap).
  b. Hide it via a `hidden` flag if `MinimapTile` supports it (it does not today; would require layout package change).
  Going with (a) unless told otherwise.
- Recategorize `why` and `gamification` group assignments accordingly; update doc comment header at top of file.

### 1.2 Remove WASD/NavigationPad widget
- In `MinimapFullViewOverlay.tsx` delete the `<MapKeyboardHints />` mount at the bottom and the import.
- Keep `MapGridNavigationProvider` (the actual keyboard listener) untouched — arrow keys still navigate.
- Verify: arrow keys still change `emphasisDirection` / move active tile / update minimap before page loads. (No code change needed in the layout package — the listener is independent of the hints UI.)

### 1.3 Background contrast
- Current bg: `#E8F4FF` (frost blue). Spec: "Remove blue bg; keep white with diamond borders. Explore light blue variant."
- Refactor the bg color into a `mapSurface` variant prop (or local constant) with three presets so we can A/B in story:
  - `paper`: `#FFFFFF` (default per spec)
  - `frost`: `#F2F8FF` (subtle blue tint — the "light blue variant")
  - `cloud`: `#E8F4FF` (current)
- Keep `CornerBracketFrame` diamond borders + `WaterBackground` regardless.
- Tune inset shadows: on white, drop the blue cast and use `rgba(15,23,42,0.06)` for a soft recess.

### 1.4 Play button (Sign Up CTA)
- Add a primary CTA in the right column header, above `MapNextBestActions`.
- Component: a labeled orb-style button — `<ActionOrb icon={<PlayArrowIcon/>} label="Play the demo" variant="float" color="success" vibrant size="lg" />`.
- Wire `onClick → router.push("/appRealm/dashboard")` then `close()`.
- Place inside the right column container in `MinimapFullViewOverlay.tsx` (~line 308 area), with `px:3, pt:3, pb:1`.

---

## Phase 2 — Arrows (TileChevrons) overhaul

Live in `@expanse/shell` — shared package change, audited.

### 2.1 Stop overlapping tile text/symbols
Currently chevrons are positioned with negative offsets (`-dirOffset`) relative to the tile chip, but the chip can sit close to label/symbol content inside the tile. Move chevrons to sit **halfway between adjacent tiles** rather than hugging the active tile's edge.
- Calculate offset = `tileGap/2` instead of `-chevronSize * 0.30`.
- Read `tileGap` from `MinimapTileContext` (add it if missing).
- Z-order: chevrons above tile chip, but ensure tile content (label/icon) is padded inward by `chevronSize/2 + tileGap/4` to avoid visual collision.

### 2.2 Dual-chevron concept (multi-color)
For each direction render TWO chevrons side-by-side (e.g. `»` glyph or two `KeyboardArrowRight` stacked with small offset). Inspired by D-pad / video game cues.
- **Color rule:**
  - Outer chevron (the one pointing into the neighbor) takes the **adjacent tile's color** — pulled from `MapGridNavigationProvider` via a new `neighborColor(direction)` helper that reads neighbor tile's `display.colors.active`.
  - Inner chevron stays **white** (over the current tile's halo).
- This previews destination color, reinforcing tile color identity.

### 2.3 Animation
- Keep the existing pulse for `emphasisDirection`.
- Add a subtle continuous "drift" (translateX/Y ±2px, 2s ease-in-out) on all four chevrons so they read as inviting affordances.
- Reduced-motion guard: skip animations when `prefers-reduced-motion: reduce`.

### 2.4 New props on `MinimapTile` / context
- Add `neighborColors?: { up?: string; down?: string; left?: string; right?: string }` to `MinimapTileContext`.
- Compute these in `MinimapTileGrid.tsx` by looking up neighbor positions.

---

## Phase 3 — Orb Action Bar update

### 3.1 Add directional arrows wired to spatial navigation
- In a new `MapActionBar` component (sibling to `DomainsActionBar`), render:
  - Left orb (◀) → `navigate("left")`
  - Down orb (▼) → `navigate("down")`
  - Up orb (▲) → `navigate("up")`
  - Right orb (▶) → `navigate("right")`
  - Hotkeys: arrow keys; show as badges.
- Flat single-row layout: `<ActionBar variant="orbs" orientation="horizontal" thickness="auto" padding={6}>`.
- Disable any orb whose direction is unavailable (`!canMove*` from `useNavigation()`).

### 3.2 Label = current page title from NBA
- Pull current tile from `useNavigation()` → `activeTile.display.label`, or read from `DEFAULT_NEXT_BEST_ACTIONS` / `locationContent` if a page-specific title is defined.
- Center label between left and right arrow groups inside the action bar.

### 3.3 Mount
- Register via `useRegisterBottomBar({ id: "map-action-bar", order: 30, node })` inside `MinimapFullViewOverlay`, replacing the removed `MapKeyboardHints` slot.

---

## Phase 4 — Why/What card variants + slide-into-story

### 4.1 Extract card variants
- `NextBestActionCard` is imported from `@expanse/shell`. Wrap it in an app-local `MapDirectionCard` that exposes a `variant` prop:
  - `solid` (current): tinted background per chip color.
  - `outline`: white bg, colored border + colored title.
  - `ghost`: minimal, color only on the icon.
  - `vivid`: stronger gradient using direction color + accent.
- Lives at `src/components/hud/mapContent/MapDirectionCard.tsx`.

### 4.2 Entire-screen variants
- Add an `overlayVariant: "default" | "white-bg" | "frost-bg" | "high-contrast" | "minimal"` prop to `MinimapFullViewOverlay` (or wrap in a `MapOverlayVariantProvider`).
- Each variant is a small style object applied to the surface `Box` and the right rail. Default keeps current behavior.

### 4.3 Story: `MinimapFullViewOverlay.stories.tsx`
- New file at `src/components/hud/MinimapFullViewOverlay.stories.tsx`.
- Stories: `Default`, `WhiteBackground`, `FrostBackground`, `DualChevrons`, `PlayCTA`, `HighContrast`, `CardVariant_Outline`, `CardVariant_Ghost`, `CardVariant_Vivid`.
- Use white background per repo storybook prefs:
  ```ts
  parameters: { backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] }, layout: "fullscreen" }
  ```
- Mock providers (`NavigationProvider` with `WEBSITE_HUD_NAV_CONFIG`, plus the role/active-map/direction-focus providers).

### 4.4 Per-slide stories
- For each slide directory under `src/Tiles/home/slides/<name>/`, ensure a `*.stories.tsx` exists driven from its `variants.ts` so variants are browsable. Today only `ControlSlide.stories.tsx` exists — add stories for `domains`, `purpose`, etc. (separate task list; scope clarification needed).

### 4.5 Tile state indicators — visited, progress, recommended
**Goal:** Show exploration progress + guide users to the recommended next tile.

#### Visit/Progress indicator
- **Icon system** on each tile (top-right corner or centered overlay) showing:
  - Not visited: empty circle or subtle outline
  - Partially explored (0–99%): segmented ring or progress arc
  - Fully explored (100%): checkmark or filled badge
- **Tooltip on hover** shows exact progress: "Visited · 35% explored" or "Not yet visited"
- **Implementation**: new `TileProgressBadge` component in `MinimapTile`, wired to a `useTileProgress(tileId)` hook (backed by localStorage or session state)
- **Styling**: subtle, low-opacity when not active; brighter on hover/active

#### Recommended tile treatment
- **4-corner bracket frame** — thin animated corner marks (like `CornerBracketFrame` but miniaturized) that fan inward from each corner, creating a "spotlight" frame around the recommended tile
- **Blink animation** — slow pulse (2.5s loop) with scale + glow + opacity shift (0.85 → 1 → 0.85)
- **Color**: amber/gold accent (`#FFC857` or theme warning.main) to differentiate from tile's own active color
- **Hook integration**: `useRecommendedTile()` returns the tile id; `MinimapTile` applies the frame + blink when `isRecommended={true}`
- **Accessibility**: `aria-label="Recommended next tile"` + reduced-motion guard (static frame, no blink)

#### Architecture
- `packages/@expanse/shell/src/map-and-navigation/minimap/components/minimap-tile/primitives/TileProgressBadge.tsx` — new badge primitive
- `packages/@expanse/shell/src/map-and-navigation/minimap/components/minimap-tile/primitives/TileRecommendedFrame.tsx` — new corner-bracket mini-frame
- `MinimapTile` props: `progressPercent?: number`, `isRecommended?: boolean`, `onProgressHover?: (tileId) => void`
- `MinimapTileGrid` computes `isRecommended` from config or provider, passes `progressPercent` from `useTileProgress` lookup

---

## Phase 5 — Contrast, focus colors, & tile state coordination

## Phase 5 — Contrast, focus colors, & tile state coordination

### 5.1 Audit current contrast
- Body text on `#E8F4FF`: WCAG fail-risk for secondary text (#64748B). Move to white or `#F2F8FF` per Phase 1.3.
- Active-tile glow uses tile's color at full saturation — fine on white, can wash out on frost-blue.
- **New**: recommended-tile amber glow must contrast against all tile accent colors (blue, purple, orange, etc.)

### 5.2 Focus-color variants to try (delivered as overlayVariant stories)
- **Amber focus** (current NBA glow accent): warm gold on white → strong eye-magnet for the active tile.
- **Cyan focus**: `#06B6D4` — keeps cool palette but separates from tile-color blues.
- **Tile-color focus** (current): focus inherits tile color → consistent but less distinct.
- **Two-tone**: ring = tile color, halo = amber → combines identity + attention pull.
- Render side-by-side in a `FocusColorMatrix` story.
- **Coordination with recommended tile**: ensure the focus ring (active tile) visually separates from the recommended-tile corner brackets when they overlap (e.g. active tile is also recommended).

### 5.3 Diamond border emphasis
- Increase `CornerBracketFrame` `thickness` from 3 → 4 on white bg so the diamond reads cleanly without the frost tint to back it.

### 5.4 Tile indicator color palette
- **Progress badge**: use neutral gray-blue (`#64748B` at 60% opacity) for unfilled, success green (`#10B981`) for complete
- **Recommended frame**: amber/gold (`#FFC857` or `#F59E0B`) — must stand out from tile accent colors
- **Test matrix**: show recommended + visited + active combinations in story to verify all states are distinguishable

---

## Phase 6 — Page loader architecture

Current `loading.tsx` is a Skeleton-only fallback. Spec: "Include a page loading animation for the app as a whole. Plan architecture."

### 6.1 Architecture
- **`AppLoaderProvider`** at the root layout exposes `useAppLoading()` (counter-based: `begin()`/`end()` pairs).
- **`AppLoader` UI** — a thin top progress bar (NProgress-style) **plus** a brand glyph fade-in (uses `WaterBackground` + `CornerBracketFrame` mark) for cold starts. Lives at `src/components/loader/AppLoader.tsx`.
- **Triggers:**
  - Next.js route transitions → wire via `useRouter` events (`router.events` in pages router, or `useLinkStatus` / Suspense boundary in app router) — for app router, use `<Suspense fallback={<AppLoader />}>` inside `(hud)/loading.tsx` plus a custom `useRoutePending()` hook reading `useLinkStatus()` from Next 15.
  - In-flight queries → `useAppLoading()` from data layer hooks.
  - Map overlay opens → tied to `isMapViewOpen` only if data isn't ready yet.
- **Performance:** loader visible only after `200ms` debounce (avoid flash on fast navigations).
- **A11y:** `role="status" aria-live="polite"`, announces "Loading 4eye" once.

### 6.2 Phasing
- v1: top progress bar + Skeleton (replace current loading.tsx body).
- v2: brand glyph cold-start screen for first load (detected via `sessionStorage.firstLoad`).
- v3: per-route progress hints (NBA card skeletons in right rail while map data loads).

---

## Implementation order (recommended)

1. **Phase 1** — colors + remove WASD + Play CTA + white-bg variant (low risk, visible win) ✅
2. **Phase 4.3** — overlay story scaffold (gives a place to A/B everything else) ✅
3. **Phase 2** — chevron overhaul (highest UX leverage on "easy to use & understand") ✅
4. **Phase 3** — action bar with directional orbs + page label ✅
5. **Phase 4.5** — tile state indicators (visited/progress badges + recommended frame)
6. **Phase 5** — focus-color variants + tile indicator color coordination (now visible in story matrix)
7. **Phase 4.1/4.2** — card + overlay variants (optional polish once core nav is solid)
8. **Phase 6** — page loader (largest architectural piece; can run in parallel)

---

## Open questions

- Does "Content not a tile yet" mean **remove** marketing-content from the grid, or **demote** it (e.g. small subdued tile)?
- Play CTA destination: confirm `/appRealm/dashboard` is the correct demo entry.
- Per-slide stories (Phase 4.4) — do you want all slides covered now, or just one as a pattern reference?
