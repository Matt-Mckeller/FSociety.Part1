# Character Tab — Improvement Plan

Scope: the **Character** tab of the appRealm profile page (`src/Tiles/character/`).
Focus areas (per request): **Visual polish**, **Code/structure**, **Interactivity**.

Entry point: `CharacterTile.tsx` (526 lines) → `CharacterSurface` → `CharacterProfileSections`
(5 tabs: today / core / gear / mind / life).

---

## Guiding read of the current state

The tab is feature-rich but has three structural drags that make every future change
harder and the surface feel inconsistent:

1. **Two parallel state stores + four panels that ignore them.** `CharacterProvider`
   (roles/spellbook) and `CharacterProfileStore` (the real "live" layer) coexist, and
   `AurasGrid`, `EquipmentPanel`, `HabitsPanel`, `PerspectivesPanel` each keep their own
   local `useState` that duplicates — and can diverge from — the store. There are literally
   **two Influence economies** (`AurasGrid` spends a local `balance=1000`; `Traits` spends
   `state.influenceBalance=1200`).
2. **Copy-paste UI primitives.** `InfluencePill`, `TierPips`, the detail-`Dialog` shell,
   the glyph/`BrandIcon` registries, and relative-time helpers are each re-implemented in
   3–6 files.
3. **Interactivity is half-wired.** Many elements look actionable (action bar buttons,
   goal/work slots, skill/perk cards) but have no handler or write only to throwaway
   local state.

The plan below is ordered so the **structural cleanup (Phase 1)** unblocks the
**interactivity (Phase 2)** and **polish (Phase 3)** work, rather than layering new
features on a shaky base. Each phase is independently shippable.

---

## Phase 1 — Code / Structure (foundation)

Goal: one source of truth, shared primitives, smaller files. No visible behavior change
except the Influence economies merging.

### 1.1 Consolidate state onto `CharacterProfileStore`
- Delete the local `useState` in `AurasGrid`, `EquipmentPanel`, `HabitsPanel`,
  `PerspectivesPanel`; read/write through the store's existing reducers
  (`equip-item`/`unequip-item`, `upgrade-aura`, `mark-habit-done`, etc.).
- Add the one missing reducer: `set-perspective-weight` (Perspectives currently writes to
  local `weightOverrides` and only emits a feed event).
- Collapse the **two Influence balances** into `state.influenceBalance`; have `AurasGrid`
  spend from and reflect the same pool as `Traits`.
- Persist `AurasGrid`'s localStorage-applied auras through the store instead of a bespoke
  side channel (or lift a generic `persist` concern into the store).

### 1.2 Extract shared primitives (`components/shared/`)
- `DetailDialog` — the repeated `Dialog` shell (icon box + title + close IconButton +
  section body). Refactor `SkillDetail`, `PerkDetailDialog`, `ConsumableDetail`,
  `RelationshipDetail`, `PerspectiveDetail`, `ItemDetail` onto it.
- `InfluencePill` and `TierPips` — single implementation, delete the Auras/Traits copies.
- `glyphs/` module — move the inline `BrandIcon` SVG registries out of `Attributes.tsx`,
  `Perks.tsx`, `Traits.tsx`, `Auras.tsx`, `Consumables.tsx` into one keyed registry
  (this alone shrinks Auras 769→~300, Perks 422→~200, etc.).
- `lib/time.ts` — one `relativeTime`/`daysSince`/`timeLeftLabel`/`formatDate`; delete the
  5 re-implementations (CharacterFeed, CharacterTimeline, Relationships, DailyFocus, StatusRAM).

### 1.3 Slim `CharacterTile.tsx`
- Extract the three inline sub-panels — `AchievementsSection`, `HighestValueGrid`,
  `InterestsEngagementGrid` — into `components/`.
- Remove the stray scaffolding caption `"imports system foundations."` and any dead
  imports (`Attributes.tsx` unused `ATTRIBUTE_PROGRESS_SEED`/`effectiveValue`,
  `CharacterProfileStore` unused `effectiveValue`).
- Fix the `CharacterSummaryCard` top-3 vs top-5 attribute-average inconsistency.

### 1.4 Design tokens
- Replace scattered raw hex (`#4F46E5`, `#16a34a`, `#7c3aed`, `#64748b`, …) with a small
  `characterTokens` map (or theme palette extension). The repeated active-tab indigo
  `#4F46E5` becomes one token. This is the prerequisite for real theming/dark-mode polish.

**Exit check:** typecheck + existing stories render; using a consumable still buffs
attributes and posts a feed event; a single Influence number drives both Auras and Traits.

---

## Phase 2 — Interactivity (close the "looks clickable, isn't" gaps)

Ordered by impact ÷ effort.

### 2.1 Wire the dead action-bar buttons (highest impact, low effort)
`EquippedActionsBar`: only "Cast" works. Give Inspect / Chat / Note handlers — minimally
open a `DetailDialog` or post a feed event; ideally Note appends a `CharacterFeed` entry
and Inspect opens the summary. Removes the most obvious "nothing happens" moment.

### 2.2 Make equipped Goals & Work actionable
`EquippedGoals` / `EquippedWorkList` are display-only slots. Add, via the store:
- tap a slot → `DetailDialog` (title, progress, weight, linked notes);
- complete / advance progress;
- unequip. (Add/reorder can be a fast-follow.)

### 2.3 Progression actions on Skills / Perks / Traits
- `SkillsTree`: add an **Unlock** button in `SkillDetail` for "available" nodes (spend
  Influence / mark unlocked in store), so the tier visual language pays off.
- `Perks`: same for "LOCKED" perks with met requirements.
- `Traits` already spends Influence — align it with the shared flow once 1.1 lands.

### 2.4 Relationships & Perspectives editing
- `Relationships`: add "Log interaction" (bumps recency/strength, posts feed event) to
  `RelationshipDetail`.
- `Perspectives`: the edit Slider now writes to the store (from 1.1) — surface a subtle
  saved/undo affordance.

### 2.5 Summary card as navigation
`CharacterSummaryCard` orbs/bars (currently `cursor: default`) become tap-to-jump to the
relevant tab/section (mood→today, attributes→gear, auras→core).

---

## Phase 3 — Visual polish

### 3.1 Responsive layout
- The surface is a fixed `maxWidth: 720` single column with **no breakpoints** — it reads
  as phone/tablet width even on desktop. Introduce breakpoints so wide viewports use a
  **two-column** arrangement for the tab body (e.g. summary/orbs rail + detail grids).
- Normalize the per-component grid `minmax` values (currently 150–220px, seven different
  numbers) to a shared scale for consistent card rhythm.

### 3.2 Tab rail & hierarchy
- Rebuild the sticky tab rail on the design tokens from 1.4 (drop hardcoded `#4F46E5`),
  add active-tab motion (underline/segment slide) and clearer inactive/hover states.
- Tighten section spacing/dividers; the "Actions/Loadout/Swipe/Action Bars/Spells/Work/
  Goals" stack above the tabs is dense — consider grouping or collapsing.

### 3.3 Motion & feedback
- Add lightweight transitions on card hover, dialog open, progress-bar fills, and
  Influence-spend feedback (the store already drives these values).
- Give the Mind/Body resource orbs (now 100%) a subtle "full" state so maxed reads as
  intentional, not stuck.

### 3.4 Dark-mode / theme pass
- Once tokens exist, audit contrast in both themes; the raw hexes currently won't adapt.

---

## Suggested sequencing

- **PR 1:** 1.2 + 1.3 + 1.4 (shared primitives, slim tile, tokens) — mechanical, low risk.
- **PR 2:** 1.1 (state consolidation + merged Influence) — the one behavior-visible refactor.
- **PR 3:** 2.1 + 2.2 (action bar + goals/work) — most-felt interactivity.
- **PR 4:** 2.3–2.5 (progression + relationships + nav).
- **PR 5:** 3.x polish, now cheap because tokens/primitives exist.

## Explicitly out of scope
- Backend/persistence (state remains client-only mock; call out that reloads reset).
- The Profile tab (`ProfilesTile`) and the shared `ProfilePage` shell.
- New model domains beyond what seed data already defines.
