# HUD Controls Reorganization Plan

**Status:** Approved — ready to implement
**Scope:** `packages/@expanse/shell`, `apps/4eye-web-mockup` (AI Chat)
**Date:** 2026-05-13

---

## Goals

1. Move the **Settings** FAB from the left rail to the right rail (below the profile lens).
2. Polish the right-rail **profile lens** so the mascot is centered and not clipped.
3. Move the **Show/Hide Action Bar** toggle off the chat composer and into the **left rail** next to the Game FAB.
4. Make the action-bar visibility a first-class concern of `@expanse/shell` (not realm-specific state).

---

## Current State

### Settings FAB (left rail)
- File: [packages/@expanse/shell/src/hud/rails/HudLeftRail.tsx](packages/@expanse/shell/src/hud/rails/HudLeftRail.tsx)
- Rendered as the second `FabTrigger` in a `FabCluster`, panel = `SettingsActionBar`.

### Profile lens (right rail) — clipping/centering issues
- File: [packages/@expanse/shell/src/hud/rails/HudRightRail.tsx](packages/@expanse/shell/src/hud/rails/HudRightRail.tsx)
- Outer `<Box>` uses `overflow: hidden` + `irisOpen` keyframes → permanent circular clip.
- Inner `<ProfilePhoto zoom="face" />` framing crops the mascot above/below.
- Active-state inner scale of `2.35` may overflow once outer clip is removed.

### Show/Hide Action Bar toggle
- File: [apps/4eye-web-mockup/src/Tiles/appRealm/aiChat/AiChatInputBar.tsx](apps/4eye-web-mockup/src/Tiles/appRealm/aiChat/AiChatInputBar.tsx)
- A small `IconButton` (`MoreHorizRoundedIcon`) glued to the left of the composer.
- State `orbsOpen` lives in [`AiChatDashboard`](apps/4eye-web-mockup/src/Tiles/appRealm/aiChat/AiChatDashboard.tsx), passed as props to `AiChatInputBar` and `AiChatActionBar` (which forwards it as `enabled` into `useRegisterBottomBar`).

### Bottom bar registration
- `AiChatActionBar` calls `useRegisterBottomBar(...)` from `@expanse/shell` — meaning visibility belongs naturally in the layout package.

---

## Target Architecture

### A. Right rail — Profile lens + Settings FAB (below)

`HudRightRail` becomes a 2-FAB cluster:

```
[ Profile lens ]   ← top, panel opens left (inward)
[ Settings    ]   ← below, panel opens left (inward)
```

- New props on `HudRightRail`: `mode`, `onThemeModeChange` (forwarded from `FullHud`).
- Settings `FabTrigger` uses `panelSide="left"` so the slide-out doesn't go off-screen.

### B. Profile lens fix

- Remove outer `overflow: hidden` (or convert to a one-shot mask that auto-clears).
- Replace `irisOpen` outer keyframe with an **inner** `clip-path` animation that finishes at `inset(0)` and is harmless after completion.
- Switch `<ProfilePhoto zoom="face" />` → `zoom="head"` for natural centering.
- Cap active-state `scale` (try `1.4×`); if a true close-up zoom is required, re-introduce a *bounded* circular mask only on the inner box.

### C. Left rail — Game FAB + new Toggle FAB + (no settings)

```
[ Game            ]
[ Show/Hide bars  ]   ← new, no panel; click toggles visibility
```

- Icon: `ViewSidebarIcon` (clearer affordance than the old `MoreHorizRoundedIcon`).
- `FabTrigger` variant without a panel — clicking just calls a toggle from context.
- Active state visually mirrors when bottom bars are visible.

### D. Action-bar visibility lives in `@expanse/shell`

New: `ActionBarVisibilityProvider` + `useActionBarVisibility()` hook.

```ts
// packages/@expanse/shell/src/hud/overlay-state/ActionBarVisibility.tsx
interface ActionBarVisibilityValue {
  visible: boolean;
  toggle: () => void;
  setVisible: (v: boolean) => void;
}
```

- Provider mounted inside `FullHud` (alongside other layout providers).
- `useRegisterBottomBar` consults `useActionBarVisibility()` and skips registration (or wraps with `display: none`) when `visible === false`.
- The new left-rail toggle FAB calls `toggle()`.
- Optional: persist `visible` to `localStorage` (`expanse:hud:bottomBars:visible`).

---

## Implementation Steps

### Step 1 — Layout package: visibility context
- [ ] Create `ActionBarVisibilityProvider` + `useActionBarVisibility` in `packages/@expanse/shell/src/hud/overlay-state/`.
- [ ] Export from `packages/@expanse/shell/src/index.ts`.
- [ ] Mount provider in `FullHud` (above `BottomChromeStack`).

### Step 2 — Wire `useRegisterBottomBar` to honor visibility
- [ ] Inside `useRegisterBottomBar`, read `useActionBarVisibility()`.
- [ ] When `visible === false`, do not register (or register a wrapper with `display: none` so animations remount cleanly).
- [ ] Decide on (and document) the unmount-vs-hide tradeoff. Default: **hide** to preserve focus/state.

### Step 3 — Move Settings FAB to right rail
- [ ] `HudRightRail`: add `mode` + `onThemeModeChange` props; render `SettingsActionBar` panel inside a second `FabTrigger` with `panelSide="left"`.
- [ ] `FullHud`: forward `mode` + `handleModeChange` to `HudRightRail`.
- [ ] `HudLeftRail`: remove the `settings` `FabTrigger` and its `mode` plumbing (or keep prop optional for backward-compat).

### Step 4 — Add toggle FAB to left rail
- [ ] Allow `FabTrigger` to render without a `panel` (panel-less click handler) — verify existing API; add support if missing.
- [ ] In `HudLeftRail`, render a third `FabTrigger` (icon `ViewSidebarIcon`) that calls `useActionBarVisibility().toggle()`.
- [ ] Reflect `visible` state via the trigger's active styling.

### Step 5 — Fix `ProfileLensIcon`
- [ ] Remove outer `overflow: hidden` + iris keyframe.
- [ ] Add inner one-shot `clip-path` keyframe that ends fully open.
- [ ] Switch `ProfilePhoto` to `zoom="head"`.
- [ ] Adjust active scale (start with `1.4`); verify visually.

### Step 6 — Strip realm-side toggle
- [ ] `AiChatInputBar`: delete the toggle `IconButton`, remove `orbsOpen` and `onToggleOrbs` props.
- [ ] `AiChatDashboard`: delete `orbsOpen` state and prop pass-through; drop the `enabled` prop on `AiChatActionBar`.
- [ ] `AiChatActionBar`: remove the `enabled` prop (or keep as a manual override that AND-s with context visibility).

### Step 7 — Verify
- [ ] Type-check both workspaces.
- [ ] Run the mockup dev server, check:
  - Settings panel opens from right rail (no off-screen).
  - Mascot is centered, no clipping, hover zoom looks right.
  - Toggle FAB shows/hides the AI Chat orb bar.
  - No remaining references to `orbsOpen` / `onToggleOrbs`.

---

## Open Questions / Deferred

- **Persistence**: Persist `visible` to `localStorage`? (Recommended: yes, key `expanse:hud:bottomBars:visible`.)
- **Keyboard shortcut**: Bind `⌘.` (or similar) to toggle? Not required for v1.
- **Multiple bottom bars**: If other realms also register bars, do they all hide together? Default: **yes** (single global flag). Per-bar control can come later.
- **Backward-compat**: Keep `HudLeftRail`'s `mode` / `onThemeModeChange` props as optional no-ops, or break the API? (Internal package — likely fine to break.)

---

## Files Touched (expected)

**Modify**
- `packages/@expanse/shell/src/hud/rails/HudLeftRail.tsx`
- `packages/@expanse/shell/src/hud/rails/HudRightRail.tsx`
- `packages/@expanse/shell/src/hud/full-hud/FullHud.tsx`
- `packages/@expanse/shell/src/hud/registrations/` (the `useRegisterBottomBar` source)
- `packages/@expanse/shell/src/index.ts`
- `apps/4eye-web-mockup/src/Tiles/appRealm/aiChat/AiChatDashboard.tsx`
- `apps/4eye-web-mockup/src/Tiles/appRealm/aiChat/AiChatInputBar.tsx`
- `apps/4eye-web-mockup/src/Tiles/appRealm/aiChat/AiChatActionBar.tsx`

**Add**
- `packages/@expanse/shell/src/hud/overlay-state/ActionBarVisibility.tsx`
