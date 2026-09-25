# Command Center — Priorities Cleanup

**Status:** phases 1–3 + unused persona cleanup done (2026-08-09)  
**Date:** 2026-08-09  
**Scope:** Command Center tile naming + seed misuse; Character Direction priorities as the single source of truth; remove River / RedRing / Ring Scout

---

## Problem

"Priorities" means different things in different places, and the wrong one won in Command Center.

| Place | What it actually is | What it is called |
|-------|---------------------|-------------------|
| Character → Direction | Matthew's life codes: `Money.AmplifyMe()`, `Power.Unlock()`, `Power.Comprehend()`, `Love.Perfectly()` | **Priorities** (correct) |
| CC nav view `priorities` | Work ranked by `weight` (triage / focus set for Cadence) | **Priorities** (wrong noun) |
| ECS `type: "priority"` | Value / craft / marketing **lenses** | type name `"priority"` (wrong) |
| Dashboard "Top Priorities" | Top-weight work items | **Priorities** (wrong) |
| Goals P0/P1/P2 | Strategic goal severity | `Priority` type (ok as PM jargon, but crowded) |
| Crew `goal.priority` | low / medium / high urgency | field named `priority` (ok-ish) |
| Crew Matthew goals | Personal codes pasted as **goal titles** | conflates Direction priorities with crew goals |

DirectionPanel already states the intent:

> Matthew's priority codes — sit under Direction, not mixed into Command Center.

The CC "Priorities" view is the Cadence twin of weight triage — same mistake that led Sprint → **Cadence** (id kept, label fixed).

---

## Canonical concept (keep)

Personal priorities live under Character → Direction. Four stable codes with glyphs:

| id | code | color |
|----|------|-------|
| `pri-amplify` | `Money.AmplifyMe()` | green |
| `pri-unlock` | `Power.Unlock()` | purple |
| `pri-comprehend` | `Power.Comprehend()` | blue |
| `pri-love` | `Love.Perfectly()` | red |

Today they are hardcoded in `DirectionPanel.tsx` only. Wants / spells / equipped goals already *echo* the language; they should point at one shared model.

**These are not work items.** They are identity north-stars. Work *aligns to* them; it does not *become* them.

---

## Goals

1. Reserve the word **Priorities** for the Character Direction codes.
2. Rename the CC weight-triage surface so its label matches its job (Cadence precedent).
3. Stop using personal codes as crew goal titles; optionally link goals → priority ids.
4. Extract one shared priorities model so Character (and any light CC alignment UI) read the same list.
5. Leave deeper ECS rename (`"priority"` → `"lens"`) as a follow-up unless we touch that path anyway.

---

## Plan

### Phase 1 — Vocabulary cleanup (Command Center)

Mirror the Cadence rename: keep stable `id`s where persisted state depends on them; fix user-facing labels.

| Surface | Today | Proposed |
|---------|-------|----------|
| Nav view | label `Priorities`, id `priorities` | label **Weight** (or **Triage**), id stays `priorities` for lane state |
| Nav description | "Work items ranked by weight…" | Keep mechanic-honest copy; drop the word "priority" |
| `PrioritiesView` title / header | "Priorities" | Match new label |
| Planning glyph export | `PriorityGlyph` (bars) | Rename to `WeightGlyph` / `TriageGlyph` to stop colliding with Character `PriorityGlyph` |
| Dashboard section | "Top Priorities" | **Heaviest work** or **Top by weight** |
| Inline UI copy | "Priority: {weight}", "low-priority campaign" | "Weight: {n}", "low-weight campaign" |

**Recommended label: Weight** — matches the trait (`WeightTrait`), the meters already on screen, and Cadence's plain-language move. Alternative **Triage** if we want the *job* over the *mechanic*.

Do **not** put `Money.AmplifyMe()` etc. into this view as rows. That would re-mix the concepts.

### Phase 2 — Shared personal-priorities model

1. Add `character/model/priorities.ts` (or `packages/@yen/content` if wants already live there) exporting:
   - `PersonalPriority` type
   - `PERSONAL_PRIORITIES` const (the four codes)
   - helpers: `priorityById`, `priorityByCode`
2. `DirectionPanel` imports from the model (no local duplicate).
3. `PriorityGlyphs.tsx` keeps glyph map keyed by those ids.
4. Update want links / spellbook seed comments to reference the model ids where easy.

### Phase 3 — Crew / seed hygiene

In `command-center/store/crew.ts` for Matthew's profile:

- Replace goal titles that *are* the codes (`Love.Perfectly() · Heart.Evolve()`, `Money.AmplifyMe()`) with human goal titles that *serve* those priorities.
- Add optional `alignsToPriorityId?: string` (or `links: { kind: "priority", id }`) so the connection stays explicit without stealing the noun.
- Crew UI: if `alignsToPriorityId` is set, show the small Character `PriorityGlyph` + code as a chip — not as the goal title.

Leave `GoalPriority` = low|medium|high as **urgency** (consider renaming the *label* in Crew form to "Urgency" while keeping the field key for now).

### Phase 4 — Light CC alignment (optional, after 1–3)

If Direction should still be *visible* from planning without owning a CC "Priorities" view:

- Dashboard or Compass: a compact **Direction** strip (same four glyphs as Character) + "open Character → Direction".
- Work inspector: optional "Aligns to" picker against `PERSONAL_PRIORITIES` (soft link, not required).

This is the only place CC "uses those priorities" — as alignment targets, not as triage rows.

### Phase 5 — Follow-up (separate PR)

- Rename ECS `EntityType` `"priority"` → `"lens"` in `@4eye/types` + seed-data + LensesView consumers.
- Goals `Priority` P0|P1|P2 → keep or rename to `GoalSeverity` if the word still confuses.
- Update `_current/plans/command-center/README.md` §3.2–3.3: Priorities view → Weight/Triage; note Character owns Priorities.

---

## Out of scope

- Rewriting weight/depth triage UX (list/grid, dual bars) — keep behavior; rename only.
- Merging Cadence and Weight into one view.
- Changing Strategic Focus / Compass data.
- Backend persistence.

---

## Acceptance

- [x] CC nav no longer labels the weight view "Priorities" (now **Weight**).
- [x] Dashboard no longer says "Top Priorities" for weight-sorted work.
- [x] Character Direction still shows the four codes with glyphs; data comes from shared model (`@yen/content/character/priorities`).
- [x] Matthew crew goals do not use the four codes as titles; alignment is optional metadata + chip.
- [x] Character `PriorityGlyph` and CC bars glyph no longer share the same export name (`WeightGlyph`).
- [x] River / RedRing / Ring Scout removed from profiles, crew goals, relationships, intents, yen preview.
- [ ] `pnpm typecheck` clean for touched packages (pre-existing unrelated errors remain in the mockup).

## Done (2026-08-09)

Phases 1–3 shipped. Unused early personas removed.

**Follow-up (2026-08-10):** Current focus priorities (`PERSONAL_PRIORITIES`) now lead Compass → Strategic Focus. Compass group header navigates to Strategic Focus. Work triage stays labeled **Weight**. Phase 5 (ECS `priority` → `lens`) still open.
