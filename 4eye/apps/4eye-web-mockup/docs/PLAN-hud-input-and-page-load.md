# Plan: HUD Input Stack + HUD Navigation Page-Load Performance

Two related goals in `apps/4eye-web-mockup`:

1. **HUD-integrated input control** — let the slideshow (and future surfaces) "take over" arrow keys without a window listener, by pushing handlers onto the HUD's nav provider.
2. **Fast HUD page transitions** — make arrow-key grid navigation between routes (`/`, `/strategy`, `/culture`, etc.) feel instant.

Optional/related: auto-play of the intro slideshow on `/` (covered briefly at the end).

---

## Current State (verified)

### Input
- Single keyboard listener: `useKeyboardNavigation` inside `MapGridNavigationProvider` (`@expanse/shell`). Maps arrows / WASD → `navigate(direction)`.
- `navigate(direction)` → `useNavigationActions.navigateToInternal()` → `setPosition(newPos)` (provider context state).
- Position change is observed by `NextRouterNavigationBridge`, which calls `router.push(tile.url)`. Echo-loop guard skips push when pathname already matches or the change came from a URL event.
- `routing: { mode: 'hybrid', syncUrl: false, initialFromUrl: true }` in `MARKETING_HUD_NAV_CONFIG`.
- No command/intent abstraction; ActionOrbs and other UI call context hooks directly.

### Routes (each grid cell = its own Next.js route)
```
src/app/(hud)/
  layout.tsx                  → HudShell → FullHud (client)
  page.tsx                    /                (Home, 7-slide IntroFlow)
  strategy/page.tsx           /strategy
  culture/page.tsx            /culture
  future/page.tsx             /future
  edu-features/page.tsx       /edu-features
  home-highlights/page.tsx    /home-highlights
  projects/page.tsx           /projects
  marketing-content/page.tsx  /marketing-content
  value-offerings/page.tsx    /value-offerings
```
Next 14.2, App Router. No `loading.tsx`, no `Suspense` boundaries, no `next/dynamic`. Every page statically imports its slide components. GSAP + framer-motion + MUI in every route bundle.

---

## Goal 1 — HUD Input Stack (Option A)

Make the HUD's nav provider the single source of truth for keyboard input, and let any surface push a handler that gets first crack at events. No `useKeyboardNav()` hook on slide components, no extra `window.keydown` listeners.

### 1a. Add an input-handler stack to `MapGridNavigationProvider`

In `@expanse/shell/src/spatial/map/providers/MapGridNavigationProvider.tsx`:

```ts
type HudInputEvent =
  | { kind: 'direction'; direction: 'up' | 'down' | 'left' | 'right' }
  | { kind: 'action'; action: 'home' | 'back' | 'confirm' | 'cancel' };

type HudInputHandler = {
  id: string;
  // return true → consumed, fall-through stops
  // return false / undefined → continue to next handler, eventually default grid nav
  handle: (event: HudInputEvent) => boolean | void;
};

type HudInputContextValue = {
  push: (h: HudInputHandler) => () => void; // returns unregister
  // exposed for the keyboard hook only:
  dispatch: (event: HudInputEvent) => boolean; // true = consumed, false = use default
};
```

- Provider keeps the stack in a `useRef<HudInputHandler[]>([])` (no re-renders on push/pop).
- `dispatch` walks the stack from top to bottom; first handler returning `true` wins.
- Public hook `useRegisterHudInput(handler)`:
  ```ts
  export function useRegisterHudInput(handler: HudInputHandler) {
    const ctx = useContext(HudInputContext);
    useEffect(() => ctx.push(handler), [handler.id]); // stable id required
  }
  ```
  Pattern matches the existing `useRegisterHudChromeHide`.

### 1b. Refactor `useKeyboardNavigation` to consult the stack

Single keyboard listener stays where it is. Translate the key to a `HudInputEvent` and call `dispatch(event)`. If it returns `false`, fall through to the existing `navigate(direction)` / `goHome()` / `goBack()` defaults.

```ts
const handleKeyDown = (e: KeyboardEvent) => {
  if (isEditableTarget(e.target)) return;
  const event = mapKeyToEvent(e); // returns HudInputEvent | null
  if (!event) return;
  e.preventDefault();
  const consumed = dispatch(event);
  if (consumed) return;
  // default grid behavior
  if (event.kind === 'direction') navigate(event.direction);
  else if (event.action === 'home') goHome();
  else if (event.action === 'back') goBack();
};
```

### 1c. Slide deck registers a handler on `/`

In `HomeContent.tsx`:

```ts
useRegisterHudInput({
  id: 'home-slideshow',
  handle: (e) => {
    if (e.kind !== 'direction') return false;
    if (e.direction === 'right' || e.direction === 'down') { advance(); return true; }
    if (e.direction === 'left'  || e.direction === 'up')   { retreat(); return true; }
    return false;
  },
});
```
- While `HomeContent` is mounted, arrows drive slides.
- When the user navigates away from `/`, the handler unmounts and the grid takes over again automatically.
- `home`/`back` actions intentionally **not** consumed — users can always escape to map view.
- The same `advance()` is also called by wheel, timeline clicks, swipes (future), and the chrome's Next/Play/Prev orbs (1d).

### 1d. Make HUD `ActionOrb`s the visible bindings

While the slideshow is mounted, register Prev / Play-Pause / Next as `ActionOrb`s in `BottomChromeStack`. `ActionOrb` already accepts `hotkey` for display purposes. Each orb's `onClick` calls the same `advance()/retreat()/togglePlay()` that the input handler calls — keyboard and click share one funnel.

This is the "discoverability" half of Option A: the binding shows up as a tangible HUD control rather than as a hidden behavior.

### 1e. Tests / sanity
- Storybook story for `useRegisterHudInput` with two stacked handlers (verify top wins, fall-through works).
- Manual: navigate to `/strategy`, arrow keys move the grid → arrow back to `/`, arrow keys advance slides → press `H` (home action), grid goes home regardless of slideshow handler.

---

## Goal 2 — Speed up HUD page transitions

The bottleneck on arrow-key page navigation is **Next.js route transition cost**, not anything inside the HUD itself. Each cell is a real route; `router.push` triggers compile-on-demand in dev, full page module load in prod, and a synchronous render of all slides on the new page (no Suspense, no lazy imports).

### 2a. Prefetch adjacent tiles in `NextRouterNavigationBridge`

Biggest single win. The grid knows the user's position and the 3×5 layout; it can prefetch the four neighbours on every position change.

```ts
// inside NextRouterNavigationBridge, after current position changes:
useEffect(() => {
  const neighbors = getNeighborTiles(config, currentPosition); // up/down/left/right
  for (const tile of neighbors) {
    if (tile?.url && tile.url !== pathname) router.prefetch(tile.url);
  }
}, [currentPosition.x, currentPosition.y]);
```

In dev this triggers compilation; in prod it warms the route's JS chunk + RSC payload. Arrow press → `router.push` is then a near-instant client transition.

### 2b. Add `loading.tsx` files (or a single shared one)

Add one `loading.tsx` per route group so Next streams the shell while the page module is still parsing:

```
src/app/(hud)/loading.tsx   // shared fallback for all hud routes
```
Render the HUD chrome with a faint placeholder where `HudContentArea` content will appear. With Suspense + `loading.tsx`, `router.push` returns immediately and the user sees the chrome stay put — no white flash.

### 2c. Keep the HUD chrome stable across routes

Because `app/(hud)/layout.tsx` already wraps every cell with `HudShell`, layout *should* persist. Verify nothing inside `HudShell` / `FullHud` is keyed on pathname in a way that forces remount. Any `key={pathname}` would re-create the entire HUD on every navigation — kill it if found.

### 2d. Lazy-load heavy slide components

Pages currently do:
```ts
import HeroSlide from "@/components/deck/HeroSlide";
import ListSlide from "@/components/deck/ListSlide";
// ...
```
Switch slides that aren't needed for first paint to `next/dynamic`:
```ts
const QuoteSlide = dynamic(() => import('@/components/deck/QuoteSlide'));
```
Only the first visible slide of a deck needs to be eager. Same for GSAP-using slides — wrap them so GSAP loads after the route is on screen.

### 2e. Move GSAP off the critical path

`gsap` is currently imported at module top of `RewardSlide`/`CelebrationSlide`. Two options:
- Lazy-import inside an effect: `useEffect(() => { import('gsap').then(...); }, [])`. GSAP becomes its own chunk, shared across slides via Next's deduping.
- Or replace these specific timelines with framer-motion (already in the bundle) and drop `gsap` entirely if it's only used in two places.

A bundle-analyzer pass (`@next/bundle-analyzer`) on a `next build` will tell us which approach is worth more.

### 2f. Avoid HUD context churn on route change

Confirm `MarketingProgressProvider` state isn't recreated per route (it lives in `HudShell`, in the persistent layout, so it shouldn't be — but worth a guard). If `HudShell` is a client component that runs `'use client'` once at the layout level, persistence is automatic.

### 2g. Measurement

Before/after, capture:
- Production build: `next build && next start`, then time arrow-press → first paint of new route via DevTools Performance + `performance.mark` around `router.push`.
- React DevTools Profiler: confirm the HUD chrome doesn't unmount on route change.
- Bundle analyzer: per-route initial JS, look for >150KB outliers.

Targets:
- Arrow-press → next route paint: **< 150ms** in prod (from a warm prefetch).
- HUD chrome must not flash / re-mount.
- Per-route first-load JS: **< 250KB** gzipped.

### 2h. Long-term: "soft" mode for adjacent decks

Several routes are basically the same `SlideDeck` with different content. A future option: keep one client `SlideDeck` mounted in `HudContentArea`, swap its `slides` prop based on pathname, and skip `router.push` entirely for those — turn page navigation into a content swap. Defer until 2a–2c are in and we know whether it's still needed.

---

## Sequencing

**Phase 1 — input stack (small, isolated PR in `@expanse/shell` + `HomeContent`)**
1. `useRegisterHudInput` + handler stack in `MapGridNavigationProvider` (1a).
2. Refactor `useKeyboardNavigation` to dispatch through the stack (1b).
3. Wire `HomeContent` to register a slideshow handler (1c).
4. (Optional in same PR) Add Prev/Next/Play `ActionOrb`s to chrome while slideshow is mounted (1d).

**Phase 2 — page-load wins (biggest UX impact for the smallest changes)**
5. Prefetch adjacent tiles in `NextRouterNavigationBridge` (2a).
6. Add `app/(hud)/loading.tsx` (2b).
7. Audit for accidental remounts of `HudShell` / `FullHud` (2c).

**Phase 3 — bundle diet**
8. Bundle analyzer pass.
9. `next/dynamic` for non-first slides + GSAP-using slides (2d, 2e).
10. Decide on shared-deck approach (2h) only if measurements still show pain.

**Phase 4 — auto-play (depends on Phase 1)**
11. `isPlaying` + `setTimeout`-driven advance in `HomeContent`.
12. Auto-pause on any registered input event, `visibilitychange`, modal open.
13. Slim CSS progress bar above the slide stage. Play/Pause orb in chrome.

---

## Phase 4 — Auto-Play: Detailed Design

**Status:** Not implemented. Single `setTimeout` in `HomeContent` today is the 700ms wheel-lock debounce, nothing related to auto-advance.

### Decisions (defaults if not called out)
- **Duration:** `8000ms` constant per slide. Per-slide override deferred.
- **End behavior:** Stop at last slide (don't loop). Play button becomes Replay → resets to slide 0 and resumes playing. Looping is wrong for a marketing demo — users need a clear "watch it again?" cue.
- **Default state:** Paused. User opts in explicitly via the play button. (Matches "we wanted a play button to auto-play this".)
- **Mobile:** Control hidden (`xs`/`sm`). Per user spec ("for desktop"). Touch users navigate via timeline / future swipe.
- **Keyboard shortcut:** Out of scope for this slice. Default `MapGridNavigationProvider` bindings don't include a "confirm" key; adding `Space` → toggle play would require extending the bindings. Defer to follow-up.

### State (lives in `HomeContent`)
```ts
const SLIDE_DURATION_MS = 8000;
const [isPlaying, setIsPlaying] = useState(false);
const isAtEnd = activeIdx === total - 1;
```

### Auto-advance effect
```ts
useEffect(() => {
  if (!introDone || !isPlaying) return;
  if (activeIdx >= total - 1) {
    setIsPlaying(false); // reached end — stop
    return;
  }
  const t = window.setTimeout(() => {
    setActiveIdx((p) => Math.min(total - 1, p + 1));
  }, SLIDE_DURATION_MS);
  return () => window.clearTimeout(t);
}, [introDone, isPlaying, activeIdx, total]);
```
Cleanup-on-`activeIdx`-change means every slide change (manual or auto) restarts the clock cleanly. Reaching the last slide flips `isPlaying` off — no extra effect needed.

### Manual interaction → auto-pause
Centralize the rule: any user-driven slide change pauses. Wrap the three existing call sites:

| Site | Today | Change |
|---|---|---|
| Wheel handler (line ~158) | `setActiveIdx(prev + delta)` | `setIsPlaying(false); setActiveIdx(...)` |
| HUD input handler (Phase 1) | `setActiveIdx(prev ± 1)` | `setIsPlaying(false); setActiveIdx(...)` |
| `goto(i)` (timeline click, Hero "Begin", Celebration "Continue") | `setActiveIdx(i)` | `setIsPlaying(false); setActiveIdx(i)` |

The play button manipulates `isPlaying` directly, never `goto`, so it's exempt.

### Tab-hidden auto-pause
```ts
useEffect(() => {
  if (!isPlaying) return;
  const onVis = () => { if (document.hidden) setIsPlaying(false); };
  document.addEventListener("visibilitychange", onVis);
  return () => document.removeEventListener("visibilitychange", onVis);
}, [isPlaying]);
```

### `togglePlay`
```ts
const togglePlay = useCallback(() => {
  if (isAtEnd) {
    // Replay: rewind + start
    setActiveIdx(0);
    setIsPlaying(true);
    return;
  }
  setIsPlaying((p) => !p);
}, [isAtEnd]);
```

### UI: PlayPauseControl
- Reuse `ActionOrb` (already used throughout the mockup chrome — visual consistency).
- `size="md"`, `shape="circle"`, `color="primary"`.
- `variant="pulse"` while playing (free visual cue that the timer is running), `variant="glass"` otherwise.
- Icon switches: `<Pause/>` while playing, `<PlayArrow/>` when paused-not-at-end, `<Replay/>` when paused-at-end.
- Position on the stage:
  ```ts
  sx={{
    position: "absolute",
    bottom: 16,
    right: 24,             // "a bit offset" — desktop only
    zIndex: 5,
    display: { xs: "none", md: "flex" },
  }}
  ```
- Sits OUTSIDE the slide content `<Box>` (sibling, not child) so click events don't propagate into slide CTAs and so it stays visible across all 7 slides.

### What we're NOT doing in this slice
- Per-slide progress bar (the SlideshowTimeline already shows progress; redundant noise).
- Per-slide custom durations.
- Looping.
- Mobile play control.
- Space-bar shortcut.
- Pause when a CastModal is open. The cast modal has its own backdrop; clicking it doesn't currently trigger our pause rule. If users complain that auto-advance preempts their reading of the modal, the simplest fix is for `CastModal` to call a `useAutoPlay().pause()` from a future minimal context. Keep it deferred until we hit the issue.

### Surface area
- ~40 LOC added to `HomeContent.tsx`.
- 1 small `PlayPauseControl` component (could be inline JSX or a tiny sibling file in `components/home/`).
- 0 new contexts, 0 changes to `@expanse/shell`.

### Verification
- Click play → slides advance every 8s.
- Click pause → counter freezes; click play → resumes from same slide with full 8s.
- Reach final slide via auto-play → button becomes Replay; click → back to slide 0 + playing.
- Mid auto-play, click timeline / scroll wheel / press arrow → pauses immediately.
- Switch tab away with auto-play on → returns paused.
- Mobile viewport → control hidden; manual nav unaffected.

---

## Open questions

1. Should the slideshow handler also intercept `home`/`back`? Default: no — keep escape-to-map always available.
2. Is `useRegisterHudInput` going into `@expanse/shell` directly, or do you want it to live in the app first and graduate later? Recommendation: put it directly in `@expanse/shell` since the keyboard listener that has to call into it already lives there.
3. For prefetching: prefetch only the four 4-direction neighbours, or all 8 surrounding cells? Recommendation: 4 neighbours — matches what arrow keys can actually reach next.
4. Auto-play presence: only on `/`, or does any future deck route get a play orb?
