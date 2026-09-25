# HUD folder reorganization — Phase 7

> Status: **planning** (about to execute)
> Owner: layout package
> Predecessors:
> - Phase 5: `hud-components/shared/` → role-based subfolders (committed)
> - Phase 6: 5 slot providers + built-in registrations → `src/hud/{slots,registrations}/` (committed `026e362` + follow-up)

---

## Goal

Finish migrating the remaining HUD orchestration files out of
`hud-components/full-hud/` and into the dedicated `src/hud/` tree,
so that `hud/` owns the **entire HUD system end-to-end** while
`hud-components/` becomes purely visual atoms (rails, ai-input-bar,
orb-bar, content-area, fab-cluster, etc.).

After this phase, app code reads naturally:

```ts
// Default HUD
import { FullHud } from "@expanse/shell"

// Custom HUD on top of the same slot system
import {
  HudInsetsProvider,         // from hud/slots/
  useRegisterBottomBar,
  RegisterDefaultBottomBars, // from hud/registrations/
  BottomChromeStack,         // from hud/renderers/
  HudTopRow,
  ChromeGate,
} from "@expanse/shell"
```

---

## Scope

**In scope:** moving 11 files out of
`packages/@expanse/shell/src/hud-components/full-hud/`, splitting them by
role across the `src/hud/` tree, updating all internal imports, dropping
the old `full-hud/` folder cleanly (no shims).

**Explicitly out of scope (deferred to Phase 8):** renaming the "Chrome"
token across the slot registry / renderers / registrations. That rename
is non-trivial and meaning-dependent per piece — it deserves its own
file-by-file review pass. See [Phase 8 — Chrome rename](#phase-8--chrome-token-rename-deferred) below.

---

## Final directory tree

```
packages/@expanse/shell/src/
├── hud/
│   ├── slots/                          # unchanged from Phase 6
│   │   ├── BottomBarsProvider.tsx
│   │   ├── CenterContentProvider.tsx
│   │   ├── HudChromeVisibilityProvider.tsx
│   │   ├── HudHintsProvider.tsx
│   │   ├── HudInsetsProvider.tsx
│   │   ├── slot-orders.ts
│   │   └── index.ts
│   │
│   ├── registrations/                  # unchanged from Phase 6
│   │   ├── RegisterDefaultBottomBars.tsx
│   │   ├── inset-registrars.tsx
│   │   └── index.ts
│   │
│   ├── renderers/                      # NEW: slot consumers
│   │   ├── BottomChromeStack.tsx       (was hud-components/full-hud/)
│   │   ├── HudTopRow.tsx               (was hud-components/full-hud/)
│   │   ├── ChromeGate.tsx              (was hud-components/full-hud/)
│   │   ├── ResponsiveHudStatus.tsx     (was hud-components/full-hud/)
│   │   └── index.ts
│   │
│   ├── full-hud/                       # NEW: composition root
│   │   ├── FullHud.tsx                 (was hud-components/full-hud/)
│   │   ├── FullHudProviders.tsx        (was hud-components/full-hud/)
│   │   ├── resolveHudContent.tsx       (was hud-components/full-hud/)
│   │   ├── types.ts                    (was hud-components/full-hud/)
│   │   ├── bridges/
│   │   │   ├── NextRouterBridges.tsx   (was hud-components/full-hud/)
│   │   │   └── index.ts
│   │   ├── stories/
│   │   │   ├── FullHud.stories.tsx     (was hud-components/full-hud/)
│   │   │   └── HudOverview.stories.tsx (was hud-components/full-hud/)
│   │   └── index.ts
│   │
│   └── index.ts                        # barrel: slots + registrations + renderers + full-hud
│
└── hud-components/
    └── full-hud/                       # ❌ DELETED (rmdir, no leftovers)
```

---

## File-by-file plan

### Move set

| From | To | Type | Notes |
|---|---|---|---|
| `hud-components/full-hud/FullHud.tsx` | `hud/full-hud/FullHud.tsx` | composition | Rewrite imports |
| `hud-components/full-hud/FullHudProviders.tsx` | `hud/full-hud/FullHudProviders.tsx` | composition | Rewrite imports |
| `hud-components/full-hud/types.ts` | `hud/full-hud/types.ts` | composition | Rewrite imports |
| `hud-components/full-hud/resolveHudContent.tsx` | `hud/full-hud/resolveHudContent.tsx` | composition | Rewrite imports |
| `hud-components/full-hud/index.ts` | `hud/full-hud/index.ts` | composition | Same exports, new internal paths |
| `hud-components/full-hud/NextRouterBridges.tsx` | `hud/full-hud/bridges/NextRouterBridges.tsx` | bridges | Rewrite imports |
| `hud-components/full-hud/FullHud.stories.tsx` | `hud/full-hud/stories/FullHud.stories.tsx` | stories | Rewrite imports |
| `hud-components/full-hud/HudOverview.stories.tsx` | `hud/full-hud/stories/HudOverview.stories.tsx` | stories | Rewrite imports |
| `hud-components/full-hud/BottomChromeStack.tsx` | `hud/renderers/BottomChromeStack.tsx` | renderer | Rewrite imports |
| `hud-components/full-hud/HudTopRow.tsx` | `hud/renderers/HudTopRow.tsx` | renderer | Rewrite imports |
| `hud-components/full-hud/ChromeGate.tsx` | `hud/renderers/ChromeGate.tsx` | renderer | Rewrite imports |
| `hud-components/full-hud/ResponsiveHudStatus.tsx` | `hud/renderers/ResponsiveHudStatus.tsx` | renderer | Only used by `HudTopRow` |

### New barrel files

- `hud/renderers/index.ts` — `export { BottomChromeStack, HudTopRow, ChromeGate, ResponsiveHudStatus } from "./*"`
- `hud/full-hud/bridges/index.ts` — `export * from "./NextRouterBridges"`
- `hud/full-hud/index.ts` — `export { FullHud } from "./FullHud"; export { DEFAULT_BOTTOM_BAR_ORDER, DEFAULT_INSET_SIZES, type FullHudInsetSizes, type FullHudProps } from "./types"`
- `hud/index.ts` — extend to include `export * from "./renderers"; export * from "./full-hud"`

### Files modified (import rewrites)

External re-exports:
- `src/hud-components/index.ts` — drop `export * from './full-hud'`
- `src/index.ts` — drop `export * from "./hud-components/full-hud"` (already covered by `export * from "./hud"`)

Internal references to anything moved:
- Any file currently doing `from "./full-hud"` or
  `from "../full-hud"` inside `hud-components/`
- Stories that import sibling fixtures relative to themselves
  (likely none, but verify)

---

## Stepwise execution

1. **Audit**: grep for every importer of files in `hud-components/full-hud/`.
   Capture exact paths so we can rewrite them after the moves.
2. **Create new dirs**:
   - `hud/renderers/`
   - `hud/full-hud/bridges/`
   - `hud/full-hud/stories/`
3. **`git mv`** every file per the table above (preserves history).
4. **Rewrite imports** inside the moved files (relative paths shift):
   - composition root: `"../fab-cluster-bar"`, `"../content-area/HudContentArea"`, `"../rails/*"` become `"../../hud-components/*"`
   - `FullHud.tsx`: `from "../../hud/registrations"` → `from "../registrations"`
   - `FullHud.tsx`: imports of moved siblings (`./BottomChromeStack`, `./ChromeGate`, etc.) → `"../renderers"`
   - `FullHudProviders.tsx`: `from "../../hud/slots"` → `from "../slots"`
   - `BottomChromeStack`/`HudTopRow`/`ChromeGate`: `from "../../hud/slots"` → `from "../slots"`; references to `../content-area`, `../rails`, etc. become `../../hud-components/...`
5. **Update barrels**:
   - Create `hud/renderers/index.ts`
   - Create `hud/full-hud/bridges/index.ts`
   - Update `hud/full-hud/index.ts`
   - Update `hud/index.ts` to re-export `./renderers` and `./full-hud`
6. **Drop old surface**:
   - Remove `hud-components/full-hud/` line from `src/hud-components/index.ts`
   - Remove the `export * from "./hud-components/full-hud"` line from `src/index.ts` (since `./hud` already covers it)
   - `rmdir packages/@expanse/shell/src/hud-components/full-hud` — must be empty, no shim files
7. **Backward-compat note**: `DEFAULT_BOTTOM_BAR_ORDER` is currently re-exported
   from the old `full-hud/types.ts` for compat — that re-export disappears
   when `types.ts` moves; all consumers already point at the new home or
   the package barrel.
8. **Verify**:
   - `pnpm --filter @expanse/shell build` — error count must equal pre-refactor baseline (currently 18 pre-existing)
   - `pnpm --filter @expanse/shell test --run` — 184/184 passing (1 unrelated suite already fails on baseline)
   - `apps/4eye-web-mockup` `tsc --noEmit` — error count must equal baseline (206)
9. **Commit** as a single refactor commit:
   `refactor(layout): move FullHud composition + renderers into src/hud/`

---

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Story snapshot tests reference moved file paths | Grep stories' `*.snap` and `__tests__` — none expected; verify in audit step. |
| External monorepo packages import `hud-components/full-hud/*` deep paths | Quick grep across the monorepo before moving — the public surface is the package barrel, deep imports should be rare. |
| `DEFAULT_BOTTOM_BAR_ORDER` compat re-export disappears | Already verified: only consumer uses the package barrel or `hud/slots/slot-orders.ts` directly. |
| Storybook discovery globs reference the old path | Check `.storybook/main.ts` — likely uses `**/*.stories.tsx` so the move is transparent. Verify in audit. |
| Story `meta.title` strings encode the old path | Stories use `title:` strings which are independent of file location. Safe. |

---

## Verification matrix

| Check | Command | Expected |
|---|---|---|
| Layout package build | `pnpm --filter @expanse/shell build` | 18 errors (baseline, all pre-existing) |
| Layout package tests | `pnpm --filter @expanse/shell test --run` | 184/184 pass; 1 suite pre-existing fail |
| Consumer typecheck | `cd apps/4eye-web-mockup && pnpm exec tsc --noEmit \| grep "error TS" \| wc -l` | 206 (baseline) |
| Old folder gone | `ls packages/@expanse/shell/src/hud-components/full-hud 2>&1` | "No such file or directory" |
| No leftover deep imports | `grep -r "hud-components/full-hud" packages/@expanse/shell/src` | 0 matches |
| Public API preserved | `grep -E "FullHud\|DEFAULT_BOTTOM_BAR_ORDER\|DEFAULT_INSET_SIZES" packages/@expanse/shell/dist/index.d.ts` | same exports as before |

---

## Phase 8 — "Chrome" token rename (DEFERRED)

The word **"Chrome"** appears in 20+ identifiers, type names, comments,
and string literals across the slot registry, registrations, and
renderers. Concrete inventory below.

### Identifiers using "Chrome"

| Symbol | File | Role |
|---|---|---|
| `HudChromeVisibilityProvider` | `hud/slots/HudChromeVisibilityProvider.tsx` | Provider |
| `useHudChromeVisibility` | `hud/slots/HudChromeVisibilityProvider.tsx` | Reader hook |
| `useRegisterHudChromeHide` | `hud/slots/HudChromeVisibilityProvider.tsx` | Producer hook |
| `HudChromeId` | `hud/slots/HudChromeVisibilityProvider.tsx` | Type — union of frame regions |
| `HudChromeHideEntry` | `hud/slots/HudChromeVisibilityProvider.tsx` | Type |
| `HudChromeHidden` | `hud/slots/HudChromeVisibilityProvider.tsx` | Type |
| `HudChromeVisibilityProviderProps` | `hud/slots/HudChromeVisibilityProvider.tsx` | Type |
| `RegisterTopChromeInset` | `hud/registrations/inset-registrars.tsx` | Built-in registrar |
| `RegisterRightChromeInset` | `hud/registrations/inset-registrars.tsx` | Built-in registrar |
| `BottomChromeStack` | `hud/renderers/BottomChromeStack.tsx` | Renderer (literally a stack of bars) |
| `ChromeGate` | `hud/renderers/ChromeGate.tsx` | Renderer (visibility gate) |
| String literal `"bottomChrome"` | union member of `HudChromeId` | One of the union values |

### Naming candidates considered

| Token | Pros | Cons |
|---|---|---|
| **Frame** | Clear, neutral, instantly readable. Strong "surrounding furniture" connotation. | Mild overload with HTML `<frame>` (irrelevant in TSX HUD). |
| **Shell** | Common in app-shell parlance. | Overload with shell command terminology. |
| **Surface** | Clean. | Collision with MUI "surface"/`<Paper>`. |
| **Bezel** | Evocative of game/console HUDs. | Niche. |
| **Edge** | — | ❌ already used by `useRegisterHudInset({ edge })`. |
| **Rail** | — | ❌ already used by `HudLeftRail` / `HudRightRail`. |
| **Furniture** | Newspaper-design term. | Niche, cute. |
| **Scaffold** | Flutter-ish. | Implies structure more than visibility. |
| Drop the noun entirely | Shortest, often most accurate (`BottomBarStack` vs `BottomChromeStack`). | Loses frame-vs-content distinction in identifiers. |

### Why deferred + per-file

> The chrome terminology probably matters per piece. lets do this after
> this initial cleanup. We will need to go through 1 by 1.

Each occurrence has its own best fit. For example:

- `BottomChromeStack` is literally a stack of bars → strong case for `BottomBarStack`.
- `HudChromeVisibilityProvider` is a generic visibility registry → strong case for `HudVisibilityProvider`.
- `HudChromeId` is a discriminator union over frame regions → strong case for `HudFrameId`.
- `RegisterTopChromeInset` is "the inset claimed by the top frame region" → `RegisterTopFrameInset` or `RegisterTopInset`.
- `ChromeGate` reads/respects visibility → `HudGate` or `HudFrameGate`.

Phase 8 will walk the symbols above one at a time, agree on the new
name per piece, and apply via `vscode_renameSymbol` to keep references
in sync. No structural changes; pure rename + comment cleanup.

---

## Out-of-scope follow-ups (Phase 9+)

- Audit `core/providers/index.ts` for any non-HUD providers that could
  also benefit from a more specific home.
- Co-locate the few orphan tests in `__tests__/` that reference
  HUD-specific concerns (e.g. `stories.smoke.test.tsx` once the broken
  `ActionButton.stories` import is fixed).
- Reconsider `hud-components/` naming once it contains only visual
  atoms — possibly `hud-components/` → `hud/components/` to nest the
  whole HUD vocabulary under one top-level folder. Discuss separately.
