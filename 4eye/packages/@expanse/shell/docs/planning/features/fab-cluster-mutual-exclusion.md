# FAB Cluster — Mutual Exclusion Plan

**Status:** Proposed
**Owner:** HUD / Layout
**Scope:** `packages/@expanse/shell/src/hud-components/full-hud/FullHud.stories.tsx`
(prototype lives in the story; promotion to a real module is a follow-up)
**Related commits:** `09a7da2` (FAB cluster), `9eebe64` (non-interactive tooltip)

---

## 1. Goal

Guarantee that **at most one** FAB slideout panel in the left HUD rail is
active at any moment. When the user moves from the Game FAB to the Settings
FAB (or vice versa), the previously visible panel must disappear before — or at
least not overlap with — the next panel becoming visible.

Today the **state** already enforces this (`activePanel: PanelId | null`), but
the **render** allows a brief crossfade where two panels overlap visually for
~180ms during a swap.

---

## 2. Current architecture (recap)

Location: [FullHud.stories.tsx](../../../src/hud-components/full-hud/FullHud.stories.tsx)

| Piece | Role |
|---|---|
| `FabClusterContext` | Shares `{ activePanel, open, close }` between siblings |
| `FabCluster` | Provider + bordered visual container; holds the single `activePanel` state and the close-debounce timer (140ms) |
| `FabTrigger` | One circular 40×40 FAB. Opens its panel on hover/focus, closes on blur/leave. Renders **its own panel** as an absolutely positioned sibling. |
| `GameMenuPanel` / `SettingsMenuPanel` | Pure panel content |
| `LeftFabRail` | Composition root; mounts the cluster inside `ActionDock position="left-center"` |

Mutual-exclusion-relevant facts:

- `activePanel` is a single value (`"game" \| "settings" \| null`), so two
  panels cannot be simultaneously **active** in state.
- Each `FabTrigger` always renders its panel `<Box>`, but toggles
  `opacity` / `transform` / `pointerEvents` based on `isActive`.
- `open(id)` cancels any pending `close()` and sets the new id immediately, so
  the swap path itself is atomic in state.

---

## 3. Failure modes today

| # | Symptom | Root cause |
|---|---|---|
| F1 | During a Game→Settings swap both panels are partially painted for ~180ms (crossfade) | Both panels are mounted; opacity transitions overlap |
| F2 | A non-active panel still occupies layout space / can be inspected in DOM | Panels are always rendered, just visually hidden |
| F3 | If a third FAB is added later, exclusion still holds in state but visual overlap multiplies | Render is per-trigger, not centralized |
| F4 | No `Escape` key dismissal | Only blur/mouseleave drive close |
| F5 | Theoretical: a future code path that bypasses `open()` could leave a stale active panel | `setActivePanel` is closed over but exclusion is not enforced by structure |

---

## 4. Decision matrix

### 4.1 Transition policy when swapping panels

| Option | Behavior | Pros | Cons |
|---|---|---|---|
| **A. Hard swap** (recommended) | Only the active panel is rendered (`isActive ? <panel/> : null`). | No overlap frame, snappiest, smallest diff | Loses outgoing fade |
| B. Sequenced fade | Outgoing fully fades out (180ms) before incoming fades in | Cleanest visual | Visible gap; needs orchestration |
| C. Keep crossfade | Status quo | No work | Both panels paint together |

### 4.2 Where the panel lives

| Option | Behavior | Pros | Cons |
|---|---|---|---|
| **(i) Per-trigger panel** (recommended) | Each `FabTrigger` owns its panel; hard swap (4.1A) makes the inactive trigger render `null` | Minimal refactor, locality of concerns | Trigger knows about layout |
| (ii) Single panel slot in cluster | `FabCluster` renders exactly **one** panel sibling, anchored to the active trigger via a refs registry | Exclusion is **structurally unrepresentable** otherwise | More wiring (refs, anchor measurement, resize observer) |

We choose **(i)** for now and leave **(ii)** as a follow-up if/when a 3rd FAB
is added or the pattern is promoted out of the story.

### 4.3 Keyboard / focus

- Keep current hover+focus open and blur+leave close.
- **Add:** `Escape` while any panel is open → `close()` immediately
  (skip the 140ms debounce).
- **Add:** when `Escape` closes, return focus to the trigger that owned the
  active panel (a11y: focus trap exit).

### 4.4 Interaction mode

Out of scope: click-to-pin, drag-to-detach, multi-open. Hover/focus only.

---

## 5. Chosen design (summary)

> **4.1 A** + **4.2 (i)** + **4.3 (Esc + focus return)**.

Smallest viable change that:

1. Eliminates the visible overlap frame (F1).
2. Removes hidden panels from the DOM (F2).
3. Adds standard Esc dismissal (F4).
4. Leaves room for a later promotion to **4.2 (ii)** without re-thinking state.

---

## 6. Implementation plan

All edits in [FullHud.stories.tsx](../../../src/hud-components/full-hud/FullHud.stories.tsx).

### 6.1 `FabClusterContext` — extend value

```ts
interface FabClusterContextValue {
  activePanel: PanelId | null
  open: (id: PanelId) => void
  close: (opts?: { immediate?: boolean }) => void
}
```

- `close({ immediate: true })` clears the debounce timer and sets state to
  `null` synchronously. Used by the Esc handler.

### 6.2 `FabCluster` — Esc handler + focus return

- Track `lastTriggerEl: HTMLElement | null` via a ref the triggers register
  themselves with on focus.
- `useEffect` mounts a `keydown` listener on `window`:
  - if `event.key === "Escape"` and `activePanel != null`:
    - `close({ immediate: true })`
    - `lastTriggerEl?.focus()` then clear the ref

### 6.3 `FabTrigger` — hard swap, register self

- Replace the always-rendered panel `<Box>` with:

  ```tsx
  {isActive && (
    <Box sx={{ /* anchor styles, no opacity/transform fade-out */ }}>
      {panel}
    </Box>
  )}
  ```

- Keep entry animation only (transform/opacity from `0 → 1` on mount via a CSS
  keyframe, not on a sibling element). Acceptable to drop entry animation
  entirely for v1 — it stays snappy.
- On `onFocusCapture`, also write the trigger's button DOM node to the
  cluster's `lastTriggerEl` ref (for Esc focus return).

### 6.4 No changes required in

- `GameMenuPanel`, `SettingsMenuPanel`, `LeftFabRail`, `ActionButton`.

---

## 7. Edge cases & how the design handles them

| Case | Handling |
|---|---|
| Hover Game then quickly hover Settings | `open("settings")` cancels close timer; `activePanel` flips; Game's panel unmounts (hard swap); Settings mounts. No overlap frame. |
| Hover Game, leave to empty area, return within 140ms | `close()` schedules; `open("game")` cancels it. Panel never unmounts. |
| Hover Game, leave for >140ms | Panel unmounts cleanly. |
| Tab from Game FAB to Settings FAB | `onBlurCapture` on Game schedules close; `onFocusCapture` on Settings cancels and opens settings; ends with Settings active only. |
| Esc while Settings open | `close({immediate:true})`; focus returns to Settings FAB. |
| Mouse hover + keyboard focus on different FABs | `open` is last-write-wins; whichever event fires last wins. Acceptable. |
| Cluster unmounts mid-debounce | Existing cleanup `useEffect` clears the timer. Add the same for the Esc listener. |
| Future 3rd FAB | Works without changes; if visual coupling is desired later, migrate to **4.2 (ii)**. |

---

## 8. Risks

- **R1.** Dropping the outgoing fade may feel abrupt. *Mitigation:* keep a
  short (120ms) fade-in on the incoming panel via a CSS class on mount.
- **R2.** Window-level `keydown` listener could clash with other Esc handlers
  (modals, dropdowns). *Mitigation:* only handle when `activePanel != null`
  and call `event.stopPropagation()` is **not** added (we don't want to break
  upstream handlers — we just consume our own state).
- **R3.** Hard-swap unmount cancels in-progress focus inside the panel.
  *Mitigation:* irrelevant for current panels (no internal focus state). If a
  panel later holds form state, lift it out or switch to **4.2 (ii)**.

---

## 9. Validation checklist

Run after implementation:

- [ ] Hover Game → only Game panel in DOM; Settings panel absent.
- [ ] Hover Settings → only Settings panel in DOM; Game panel absent.
- [ ] Rapid Game ↔ Settings swap shows no frame with both panels visible
      (verify via DevTools "paint flashing" or screenshot at 60fps).
- [ ] Tab into Game FAB → panel opens; Tab out → panel closes after 140ms.
- [ ] Esc while a panel is open → panel closes immediately, focus returns to
      the owning FAB.
- [ ] No TypeScript errors in
      [FullHud.stories.tsx](../../../src/hud-components/full-hud/FullHud.stories.tsx).
- [ ] Storybook story `Layout Systems/HUD/Full Hud — Default` renders without
      console warnings.
- [ ] Tooltip on FAB still appears (no regression from `9eebe64`).
- [ ] Existing FAB cluster styling unchanged (40×40 FABs, 6px gap, 4px
      padding, bordered group, panel offset `calc(100% + 8px)`).

---

## 10. Out of scope (follow-ups)

- Promote `FabCluster` / `FabTrigger` from the story file to a real module at
  `packages/@expanse/shell/src/hud-components/fab-cluster/`.
- Switch to **4.2 (ii)** single panel slot when a 3rd FAB is added or when a
  shared transition (e.g. height animation) becomes desirable.
- Click-to-pin behavior.
- Mobile/touch interaction (long-press to open, tap-outside to close).

---

## 11. Rollout

1. Land the implementation in a single commit on `main`:
   `feat(layout/hud): enforce single-active panel in FAB cluster`.
2. Visually verify in Storybook (port 6006).
3. No package version bump required — story-only change today.
