# Plan 06 — Profile Page Refinement

**Target:** `4eye/apps/4eye-web-mockup` → `/appRealm/profile`, plus `packages/@4eye/icons`
**Depends on:** [Plan 01](./01-4eye-profile-page-layout.md) (done — the surfacing layout this refines)

**Goal:** Same information, better organised. Lens navigation moves to the top with Surfaced first;
the space under "What Matters Now" gets used but stays light; Daily Focus shrinks; everything gets
custom brand icons instead of emoji; and depth is reached through disclosure rather than scroll.

> ## ✅ DONE — 2026-08-04
> All of §3 implemented. `next build` clean, tsc error-site diff **identical** to the 53-error
> baseline, page served and inspected: rail renders `Surfaced · Today · Core · Gear · Mind · Life ┊
> Users … Parent` in order, three disclosures collapsed with their counts, density toggle present,
> **69 brand-icon SVGs and zero emoji in the rail**, `role="tab"×15`, `aria-expanded×3`.
>
> `/integration-layers` still renders the full `DailyFocus` (its `RECENT ACTIVITY` block is present)
> while the profile page's compact copy correctly drops it — so the new prop defaults off, as required.
>
> **A verification trap worth recording.** The first check of this work reported the rail missing,
> emoji still present, and no disclosures. All three were false: `next start` had failed with
> `EADDRINUSE` because the previous server was still bound, so curl was reading a **stale build**,
> and I was reading the old process's log. Two of the greps were also wrong on their own terms —
> `textTransform: uppercase` is CSS, so the HTML carries `Goals`, not `GOALS`. Restarting on a clean
> port and fixing the greps showed everything present. **Always confirm the server actually bound
> before trusting a page fetch.**

---

## 1. What's wrong with the current page

Plan 01 fixed the navigation and added surfacing. What it left:

| Problem | Detail |
|---|---|
| **Lens is buried** | It sits fifth, under Identity → What Matters Now → Goals → Actions. The main navigation is a scroll away. |
| **Surfacing isn't a destination** | "What Matters Now" is a fixed band, so it can't be *returned to* — it's always there, which also means it's always taking space. |
| **Daily Focus is oversized** | It renders the full habit checklist, consumable timers, mood, top buff and a 3-event feed preview at half-width. It dominates the band. |
| **Dead space below the band** | On laptop and wider, the band ends and Goals starts, leaving an awkward gap. |
| **Everything is always expanded** | Goals, Actions and Events all render in full whichever lens you're in. Nothing is hidden, so the page is long and undifferentiated. |
| **Emoji as iconography** | The five character lenses use 🌅 ✦ ⚔️ 🧠 🌱. They render differently per platform, don't tint with the accent, and don't match the brand. The nine profile lenses have no icon at all. |

---

## 2. Target structure

```
┌──────────────────────────────────────────────────────────────────────┐
│ IDENTITY — avatar · level · coded name · titles · roles · values     │
├──────────────────────────────────────────────────────────────────────┤
│ ◆ Surfaced │ ☀ Today │ ✦ Core │ ⚔ Gear │ ◑ Mind │ ❋ Life ┊ ⬡ Users…│ ← rail, TOP
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ── WHAT MATTERS NOW ───────────────────────── [density] [collapse]  │
│  ┌────────────────┐┌──────────┐┌────────────────┐                    │
│  │ Summary     ×5 ││ Focus ×3 ││ Current Goal ×4│   ← 12-col spans   │
│  └────────────────┘└──────────┘└────────────────┘                    │
│  ┌──────────┐┌──────────────────────────────┐                        │
│  │ Next  ×4 ││ Highest Value             ×8 │                        │
│  └──────────┘└──────────────────────────────┘                        │
│                                                                      │
│  ── the light strip: collapsed by default ───────────────────────────│
│  ▸ ◎ Goals              3 equipped                                   │
│  ▸ ⚡ Actions            5 equipped                                   │
│  ▸ ⏱ Events             12 recent                                    │
└──────────────────────────────────────────────────────────────────────┘
```

Only the **Surfaced** lens shows the band. Every other lens shows its own body, with the same three
disclosures underneath, so the page shape is constant no matter which lens you're in.

---

## 3. Changes

### 3.1 Lens rail to the top, Surfaced first

`Surfaced` becomes lens #1 and the default. The rail moves directly under `ProfileIdentity`, above
everything else, and gets a sticky offset so it stays reachable while the body scrolls.

`Lens` union gains `"surfaced"`; `LensBody` renders `SurfacedBand` for it. `ALL_LENSES` order becomes
`surfaced · today · core · gear · mind · life ┊ users · healing · … · parent` — 15 items.

### 3.2 Use the space below the band, lightly

Three `SectionDisclosure` rows — **Goals, Actions, Events** — collapsed by default, each showing a
count in its header so the information is legible without expanding. This is the "keep it light"
requirement: the content is all still there, one click away, instead of occupying three full-height
sections on every lens.

State persists to `localStorage` per section so a user who always wants Goals open gets it open.

### 3.3 Daily Focus gets a compact variant

Add `compact?: boolean` to `DailyFocus`. Compact drops the feed preview and the consumable detail
rows, keeping the habit checklist (capped at 3 with a "+N more" affordance), mood, and the top buff.
Full behaviour is unchanged when the prop is absent, so the `today` lens and `HumanPanel` keep the
rich version.

### 3.4 Explicit grid spans

The surfaced registry gains a `span` per kind, on a 12-column grid, so the band composes
deliberately instead of every card being half-width:

| Kind | Span | Why |
|---|---:|---|
| `summary` | 5 | Densest content — attribute bars and orbs need width |
| `daily-focus` | 3 | Compact now; a checklist reads fine narrow |
| `current-goal` | 4 | One line of text |
| `next-action` | 4 | One line of text |
| `highest-value` | 8 | The value strip is horizontal |

Collapses to 12 (single column) below tablet.

### 3.5 Information hiding

- **`SectionDisclosure`** — brand chevron, header with count badge, animated height, persisted state.
- **Density toggle** — `comfortable` / `compact` on the band header; compact tightens padding and
  drops secondary lines. Persisted.
- **Tooltips everywhere** — each lens button gets its `PROFILE_VIEW_META.description`; the surfaced
  cards already carry their `reason`; the density and collapse controls get labels.
- **Collapse-all** on the band header, so the whole surfaced section can be folded away.

### 3.6 Custom brand icons — no emoji

Extend `packages/@4eye/icons` following its existing conventions exactly: one named export per
glyph, drawn on `BrandIcon`'s 24×24 viewBox, painted with `currentColor` so each tints with the lens
accent, `opacity` for secondary strokes.

New file `src/lenses.tsx` — 15 lens glyphs:

`SurfacedIcon · TodayIcon · CoreIcon · GearIcon · MindIcon · LifeIcon · UsersIcon · HealingIcon ·
PsychologyIcon · CommunicationIcon · StudentIcon · TeacherIcon · ClassroomIcon · ProfessionalIcon ·
ParentIcon`

New file `src/sections.tsx` — 8 section/card glyphs:

`GoalsIcon · ActionsIcon · EventsIcon · SummaryIcon · FocusIcon · CurrentGoalIcon · NextActionIcon ·
HighestValueIcon`

Plus `ChevronIcon` and `DensityIcon` for the disclosure and density controls, and a `LENS_ICON`
record keyed by lens id so the rail never branches on emoji.

**Design constraints so they read as one family:** 24×24 viewBox, ~2px optical stroke weight, no
outline/fill mixing within a glyph, secondary detail at `opacity 0.85`, geometry built from the
brand's circle-and-ring vocabulary (the Expanse mark is an eye/orbit) rather than literal objects
where a symbol will do.

---

## 4. Files

**New**

```
packages/@4eye/icons/src/lenses.tsx
packages/@4eye/icons/src/sections.tsx
src/components/surface/SectionDisclosure.tsx
src/Tiles/profiles/components/SurfacedControls.tsx
```

**Modified**

```
packages/@4eye/icons/src/index.ts              + re-exports, LENS_ICON record
src/Tiles/appRealm/ProfilePage.tsx             rail to top; disclosures; band only on surfaced
src/Tiles/profiles/components/LensRail.tsx     + surfaced lens, icons, tooltips, sticky
src/Tiles/profiles/components/LensBody.tsx     + surfaced case
src/Tiles/profiles/components/SurfacedBand.tsx + spans, density, icons, collapse
src/Tiles/profiles/model/surfacing.ts          + span per kind
src/Tiles/character/components/DailyFocus.tsx  + compact variant
```

---

## 5. Verification

1. `next build` clean; `/appRealm/profile` still prerenders static.
2. **tsc error-site diff against the 53-error baseline must be identical** — the same regression
   control Plan 01 used.
3. `/integration-layers` unchanged — `DailyFocus` is shared with `HumanPanel`, so the compact prop
   must default off and that page must be byte-comparable in its rendered markers.
4. Serve and inspect: rail is first, `Surfaced` is default and first, three disclosures render
   collapsed with counts, no emoji anywhere in the rail or band.
5. Every lens reachable by keyboard; disclosures toggle on Enter/Space; `?lens=` still restores.
6. Contrast: lens icons inherit `currentColor` from a `useSurface().ink()` colour, so they pass with
   their label. Verify at the 4.5:1 floor in both modes.

---

## 6. Explicit non-goals

- Not gating lenses by level/membership/privacy — still all 15.
- Not making surfacing real. `surfaceProfile()` stays hard-coded; only `span` is added.
- Not touching `CharacterTile` / `ProfilesTile`. Both remain standalone-capable and untouched.
