# Plan 01 — 4eye Profile Page Layout

**Target:** `4eye/apps/4eye-web-mockup` → `/appRealm/profile`
**Goal:** Rebuild the app-realm profile page around the "surfacing" layout concept proven in the
integration-layers Human panel. Surfaced content is hard-coded for now but sits behind a selector
seam so it can become real without a second rewrite.

> ## ✅ DONE — 2026-08-04
> All five steps implemented. `next build` succeeds, `/appRealm/profile` prerenders as static,
> and the page was served and inspected — five section bands, all fourteen lenses, all five
> surfaced cards with their "why this is shown" tooltips.
>
> **Regression control.** The repo has **53 pre-existing typecheck errors**, none in the files this
> plan touches. A baseline of error *sites* was captured before starting and diffed after: identical
> at every stage. So `tsc` is unchanged, not merely equal in count.
>
> **The chrome extraction is a genuine no-op for integration-layers** — verified by serving
> `/integration-layers` before and after and confirming the Human Layer header, status pill,
> `Ex~Nut` identity line, Character Profile / Goals / Actions / Surfaced Information / Events bands
> all still render. Bundle went **18.2 kB → 17.8 kB** from deduplicating `IdentityName`.
>
> **The §7 open question was resolved in favour of one rail.** All fourteen lenses now sit in a
> single horizontally-scrolling rail with a group divider, and identity / surfaced band / goals /
> actions / events sit outside it and never change. If the Character/Profile split should return,
> only `LensRail` and `LensBody` need changing — nothing else assumes the merge.
>
> **Deliberately not done:** the `headerless` prop on `CharacterTile` / `ProfilesTile` described in
> Step 2 turned out to be unnecessary. `LensBody` renders the view components directly, so neither
> tile is mounted by the page and neither needed a new prop — both remain untouched and still work
> standalone in Storybook.
>
> **Still open:** the responsive pass (360/768/1280/1920), the keyboard-only walkthrough, and the
> contrast sweep gate — all three need a browser, not a build.

---

## 1. Current state

**Route chain**

```
src/app/(hud)/appRealm/profile/page.tsx      → re-exports ProfilePage
src/Tiles/appRealm/ProfilePage.tsx           → the actual page
```

`ProfilePage.tsx:15-58` is thin: a centered 2-way `ToggleButtonGroup` ("Character" / "Profile")
over a scroll box that renders either `<CharacterTile/>` or `<ProfilesTile/>`, plus a docked
`<ResourceCornerHud/>`.

**What each branch brings**

| Branch | File | Internal nav |
|--------|------|--------------|
| Character | `src/Tiles/character/CharacterTile.tsx` | own 5-tab rail — `today · core · gear · mind · life` (`:63-65`) |
| Profile | `src/Tiles/profiles/ProfilesTile.tsx` | own 9-view switcher — `users · healing · psychology · communication · student · teacher · classroom · professional · parent` (`:30-40`) |

**Problems**

1. **Three stacked navigations.** Toggle (2) → tab rail (5) or view switcher (9). The user picks a
   mode before they can see anything, and the two modes look like unrelated apps.
2. **Nothing is surfaced.** Neither branch answers "what matters right now" above the fold. The
   Character branch buries `CharacterSummaryCard` inside the `today` tab; the Profile branch opens
   on a form-like `UsersView` (`Who Am I` / `Interests` / `Favorite Topics` / `Personality`).
3. **Two competing headers.** `ProfilesTile` renders `ProfileHeader` (avatar, level badge, titles,
   role chips, `HighestValueStrip`, real-name switch); `CharacterTile` renders its own. Switching
   modes swaps identity chrome, which reads as navigating to a different person.
4. **Boxed-in visual.** `ProfilesSurface` is capped at `maxWidth: 720` on a flat `background.paper`
   (`ProfilesTile.tsx:47-54`) — no accent, no depth, no relation to the HUD around it.

---

## 2. The reference concept — integration-layers "Human" panel

`src/Tiles/integration-layers/panels/HumanPanel.tsx` is the layout to integrate. Its composition:

```
PanelShell(layer)                       ← accent wash + watermark schematic + row badge
  ├── StatusBadge + h4 title + tagline     + status pill + title/tagline
  ├── SectionLabel "Character Profile"  → CharacterHeader (logo | divider | IdentityName)
  ├── SectionLabel "Goals"              → GoalsShowcase
  ├── SectionLabel "Actions"            → EquippedActionsBar
  ├── SectionLabel "Surfaced Information — What Matters Now"
  │     └── 2-up Grid: CharacterSummaryCard | DailyFocus
  └── SectionLabel "Events"             → CharacterTimeline
```

**Why it works — the four properties worth porting:**

- **Fixed vertical rhythm.** Every band is `SectionLabel` + content, `mb: 3`. The eye learns the
  cadence in one screen. `SectionLabel` (`components/shared.tsx:99-119`) is a 10.5px uppercase
  label with a fading rule that runs to the right edge — cheap, consistent, and unmistakably a
  band boundary.
- **Surfacing is an explicit, named band.** "Surfaced Information — What Matters Now" is its own
  section with its own grid, not a widget hidden in a tab.
- **Identity is a slot, not a fixed block.** `CharacterHeader` takes `nameSlot` / `badgeSlot`, so
  the panel injects its own treatment (`ExpanseLogoV5` + divider + `IdentityName` with the
  hover-scramble code and emoji badges) without forking the header.
- **Every color is contrast-checked.** `useLayerSurface()` / `useLayerInk()`
  (`components/surfaceTokens.ts`) resolve accent → WCAG-safe ink per light/dark mode. This page
  should be born compliant so Plan 04 never has to touch it.

---

## 3. Target layout

One surface. One identity header. One navigation. Surfaced content above the fold.

```
┌────────────────────────────────────────────────────────────────────┐
│ ProfileShell  — accent wash + watermark, no row badge / status pill │
│                                                                    │
│  IDENTITY (always visible, never swaps)                            │
│  ┌──────┐  Display Name              [Real name ⏻]                 │
│  │avatar│  ⟨titles⟩ ⟨role chips⟩                                   │
│  │  L12 │  HighestValueStrip · evolve/innovate/win/heal/protect    │
│  └──────┘  IdentityName treatment (badges · code · glyphs)         │
│                                                                    │
│  ── WHAT MATTERS NOW ────────────────────────────────────────────  │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐          │
│  │ Summary        │ │ Daily Focus    │ │ Current Goal   │          │
│  │ level·mood·    │ │ habits·timers· │ │ + Next Action  │          │
│  │ attrs·buffs    │ │ feed preview   │ │                │          │
│  └────────────────┘ └────────────────┘ └────────────────┘          │
│                                                                    │
│  ── GOALS ───────────────────────────────────────────────────────  │
│  GoalsShowcase                                                     │
│                                                                    │
│  ── ACTIONS ─────────────────────────────────────────────────────  │
│  EquippedActionsBar                                                │
│                                                                    │
│  ── LENS ────────────────────────────────────────────────────────  │
│  [Today][Core][Gear][Mind][Life] │ [Users][Healing][Psych]…  ←rail  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ active lens content                                          │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ── EVENTS ──────────────────────────────────────────────────────  │
│  CharacterTimeline                                                 │
└────────────────────────────────────────────────────────────────────┘
   ResourceCornerHud (unchanged, docked)
```

### Key decision — collapse three navs into one lens rail

The `ToggleButtonGroup` is removed. The 5 character tabs and 9 profile views become **14 lenses in
one horizontally-scrollable rail**, visually grouped by a divider:

- **Character lenses** — Today, Core, Gear, Mind, Life
- **Profile lenses** — Users, Healing, Psychology, Communication, Student, Teacher, Classroom,
  Professional, Parent

Identity, surfaced band, goals, actions and events are **outside** the rail and never change. Only
the lens body swaps. This is the change that makes the page feel like one person rather than two
apps, and it is the part most worth getting right.

> Non-goal for this pass: showing/hiding lenses by level, membership, or privacy. The rail renders
> all 14. Gating is noted in `profiles-plan.md §2` and stays a later phase.

---

## 4. Implementation

### Step 1 — Promote the panel chrome out of integration-layers

`PanelShell`, `SectionLabel` and `surfaceTokens` are currently owned by the integration-layers
tile and typed against `IntegrationLayer` (`PanelShell` reads `layer.row`, `layer.status`,
`layer.svgId`). The profile page must not fake a layer object to reuse them.

Create `src/components/surface/`:

| File | Contents |
|------|----------|
| `surfaceTokens.ts` | moved verbatim from `Tiles/integration-layers/components/surfaceTokens.ts`; rename `useLayerSurface` → `useSurface`, `useLayerInk` → `useInk` (keep both anchors, `{ color, accentColor }` stays structural, not `IntegrationLayer`) |
| `SectionLabel.tsx` | moved verbatim from `components/shared.tsx:99-119` |
| `SurfaceShell.tsx` | `PanelShell` generalized — props `{ accent, tint, watermark?, header?, children }`. The row badge / status pill / title / tagline block becomes the optional `header` slot instead of being hard-wired |
| `index.ts` | barrel |

Then in `Tiles/integration-layers/components/shared.tsx`, re-export the moved symbols and
reimplement `PanelShell` as a thin `SurfaceShell` wrapper that fills `header` with the existing
badge/status/title/tagline markup. **No integration-layers file changes its imports.** Verify by
diffing a Storybook screenshot of any layer panel before/after.

### Step 2 — Unified identity header

New `src/Tiles/profiles/components/ProfileIdentity.tsx`, replacing `ProfileHeader.tsx` as the
page-level header (keep `ProfileHeader` exported — `ProfilesTile` is used standalone in
`Profiles.stories.tsx`).

Composes, in one row:

- `ProfileFrame` avatar + bottom-left level badge — lift from `ProfileHeader.tsx:44-78` unchanged
  (bottom-left placement is a recorded requirement, `profiles-plan.md §4`).
- Display name + real-name switch + titles + `ProfileRoleChips` + `HighestValueStrip` — lift from
  `ProfileHeader.tsx:80-137`.
- The `IdentityName` treatment from `HumanPanel.tsx:67-112` (emoji badges, dot separators,
  hover-scramble `MorphLabel`, diamond/heartbeat glyphs) — **extract it out of `HumanPanel.tsx`**
  into `src/components/surface/IdentityName.tsx` and import it in both places, so the two pages
  cannot drift.

Delete the duplicate header rendering from the lens bodies: `CharacterTile` and `ProfilesTile`
must render *no* header when hosted inside the profile page. Add an optional
`headerless?: boolean` prop to both, defaulting false so standalone/Storybook use is unaffected.

### Step 3 — The surfacing seam

This is the part that makes "we can and will surface automatically" cheap later.

New `src/Tiles/profiles/model/surfacing.ts`:

```ts
export type SurfacedKind = "summary" | "daily-focus" | "current-goal" | "next-action"
                         | "highest-value" | "reminder" | "relationship";

export interface SurfacedItem {
  id: string;
  kind: SurfacedKind;
  /** 0–100. Drives order and, above a threshold, emphasis. */
  weight: number;
  /** Why this surfaced — shown in the card's tooltip; becomes model output later. */
  reason: string;
}

/** Hard-coded for now. Swap the body for a real selector; the signature holds. */
export function surfaceProfile(_ctx: SurfacingContext): SurfacedItem[] { … }
```

New `src/Tiles/profiles/components/SurfacedBand.tsx` renders `surfaceProfile()` output through a
`Record<SurfacedKind, ComponentType>` registry into a responsive grid
(`size={{ zero: 12, tablet: 6, laptop: 4 }}`). `summary` → `CharacterSummaryCard`,
`daily-focus` → `DailyFocus`; `current-goal` / `next-action` are new small cards built from
`primitives.tsx` + `surfaceTokens`.

**Seed set** (weights chosen so the order is stable and legible, not random):
`summary 90 · daily-focus 85 · current-goal 70 · next-action 55`.

The `reason` string is surfaced in each card's tooltip from day one — it forces the hard-coded
data to already carry the shape that a real ranker would emit, and it makes the eventual switch a
data change rather than a UI change.

### Step 4 — Assemble `ProfilePage.tsx`

```
ProfilePage
└── CharacterProvider ▸ CharacterProfileStore ▸ ProfileProvider
    └── TileContainer mode="fit"
        └── SurfaceShell accent={PROFILE_ACCENT} tint={PROFILE_TINT} watermark="human"
            ├── ProfileIdentity
            ├── SectionLabel "What Matters Now"  ▸ SurfacedBand
            ├── SectionLabel "Goals"             ▸ GoalsShowcase
            ├── SectionLabel "Actions"           ▸ EquippedActionsBar
            ├── SectionLabel "Lens"              ▸ LensRail + lens body
            └── SectionLabel "Events"            ▸ CharacterTimeline
        └── ResourceCornerHud
```

Note the provider order: `ProfilesTile` currently self-wraps `ProfileProvider`
(`ProfilesTile.tsx:69-75`) and `HumanPanel` self-wraps `CharacterProvider`. Hoisting all three to
the page means both tiles must tolerate an already-present provider — make each provider a no-op
when its context is already populated, rather than nesting two stores.

`PROFILE_ACCENT` / `PROFILE_TINT`: reuse the Human layer's pair from
`Tiles/integration-layers/model/layers.ts` (row 1) so the two surfaces read as the same system.

### Step 5 — Lens rail

New `src/Tiles/profiles/components/LensRail.tsx`. One `state.activeLens` in `ProfileProvider`
replacing `ProfilesTile`'s `state.activeView` and `CharacterTile`'s local `tab` state — lift
`CharacterTile`'s tab state up so the rail is the single source of truth.

- Horizontal scroll with fade masks at both edges; no wrapping (14 items wrap badly at tablet).
- Group divider between the Character group and the Profile group.
- Active pill uses `useInk()` for the label so it passes 4.5:1 in both modes.
- Keyboard: arrow keys move within the rail, `Home`/`End` jump to group bounds, roving tabindex.
- Deep-link: `?lens=` search param, mirroring the docs app's `?section=` pattern.

---

## 5. Files touched

**New**

```
src/components/surface/{SurfaceShell.tsx,SectionLabel.tsx,IdentityName.tsx,surfaceTokens.ts,index.ts}
src/Tiles/profiles/components/{ProfileIdentity.tsx,SurfacedBand.tsx,LensRail.tsx}
src/Tiles/profiles/components/surfaced/{CurrentGoalCard.tsx,NextActionCard.tsx}
src/Tiles/profiles/model/surfacing.ts
```

**Modified**

```
src/Tiles/appRealm/ProfilePage.tsx                        rewritten
src/Tiles/profiles/ProfilesTile.tsx                       + headerless, lens from provider
src/Tiles/profiles/store/ProfileProvider.tsx              activeView → activeLens
src/Tiles/character/CharacterTile.tsx                     + headerless, tab state lifted
src/Tiles/integration-layers/components/shared.tsx        PanelShell → SurfaceShell wrapper
src/Tiles/integration-layers/panels/HumanPanel.tsx        IdentityName extracted out
src/Tiles/integration-layers/components/surfaceTokens.ts  → re-export shim
```

**Moved:** `surfaceTokens.ts` (shim left behind).

---

## 6. Verification

1. `pnpm build` in `apps/4eye-web-mockup` — clean.
2. Storybook: `Profiles.stories.tsx` still renders standalone (headerless defaults false).
3. Visual diff every integration-layers panel before/after Step 1 — the chrome extraction must be
   a no-op there.
4. Contrast: run the Plan 04 sweep script against `/appRealm/profile` in both modes; **0 failures
   at 4.5:1** is the merge gate for this page.
5. Responsive: 360 / 768 / 1280 / 1920. The lens rail scrolls rather than wraps; the surfaced grid
   goes 1 / 2 / 3 up.
6. Keyboard-only pass through the lens rail and the real-name switch.
7. `?lens=healing` deep-link restores the correct lens on load.

---

## 7. Open question

**Should the Character lenses and Profile lenses share one rail, or should Character stay a
separate mode?** This plan assumes one rail (§3) because that is what removes the "two apps"
feel. The counter-argument is that Character is a game surface and Profile is an identity
surface, and merging them makes a 14-item rail that is long on mobile. If the split should stay,
the rest of the plan is unaffected — keep the `ToggleButtonGroup`, and the shared identity +
surfaced band still sit above it. Flag before Step 5.
