# Plan 07 — Profile Information Architecture, Nav Variants, and the Layers Fix

**Target:** `4eye/apps/4eye-web-mockup`, `packages/@4eye/icons`
**Depends on:** [Plan 06](./06-profile-page-refinement.md) (done)
**Status:** §§1–5 built 2026-08-05. §6 (layers fix) still needs a screenshot.

> ## ✅ BUILT — 2026-08-05
> Decisions taken: **game components stay** (Gear remains a lens, not a sub-panel);
> **Domains defined but disabled** — `LENS_GROUPS[].enabled = false`, so turning it on is a config
> change rather than a rebuild; **Attributes and nav shape ship as live in-app toggles** instead of
> Storybook variants, so they can be compared in place at real widths.
>
> Build clean; tsc error-site diff **identical** to the 53-error baseline. Served with an explicit
> bind check (see plan 06's note) and inspected: Core ring renders
> `Surfaced · Today · Core · Brain · Body · Gear · Life` then the `Facets` group; three control
> pills (`grouped` / `bars` / `comfortable`) and the `More` overflow all present; the three
> disclosures sit under the nav with their counts; the Attributes card renders the top six with
> names and numbers on the surface; 57 brand-icon SVGs.

---

## 1. The information-architecture question

Fifteen lenses in one flat rail is already at the limit, and the ask adds Brain, Body and a Domains
section — which would make it eighteen or more. Flat ordering stops working; the grouping has to
carry meaning rather than just chunk the list.

**Proposal: three concentric rings.** The organising question is *how far from the person is this?*

| Ring | Question it answers | Lenses |
|------|---------------------|--------|
| **CORE** — what I am | The person themselves | Surfaced · Today · Core · **Brain** · **Body** · Life |
| **FACETS** — how I show up | Contextual identities, each a role or mode | Users · Communication · Healing · Student · Teacher · Parent · Professional · Classroom |
| **DOMAINS** — where I act | The integration layers: the outer shells the self operates through | Human · Computer · Robot · Store · Neural · Glasses · Brainwave · AION |

**Why this shape:**

- It gives the "outside layer group" a principled home. The integration layers are already modelled
  as a stack of realities the person acts through — that is literally the outermost ring, so
  Domains isn't a new concept, it's the existing one finally connected to the profile.
- It explains Brain and Body without inventing categories. Core currently holds Character-tile
  content (today/core/gear/mind/life); Brain and Body split what "Mind" was doing too broadly.
- Each ring has a natural default: Surfaced for Core, Users for Facets, Human for Domains.
- Gear stops being a peer of Mind and Life. Equipment is not a facet of a person — it moves under
  Core as a sub-panel, or stays a lens; see the open question.

### Brain / Body / Mood — the mapping

| Now | Becomes | Contents |
|-----|---------|----------|
| `mind` (character lens) | folded into **Brain** | perspectives, relationships, timeline |
| `psychology` (profile view) | folded into **Brain** | organising thoughts, trauma awareness, coping |
| `healing` (profile view) | **Body** | health, nutrition, energy, recovery, habits |
| — | **Mood** | *only if wanted as its own lens* — otherwise mood stays a Brain sub-section |

This is a **merge, not an addition**: 15 lenses → 6 Core + 8 Facets + 8 Domains, but Domains are
new surface rather than new profile content. Net profile lenses go 15 → 14.

> Recommendation: **Psychology → Brain, Healing → Body**, and mood stays a section *inside* Brain
> rather than a fourteenth lens. "Mood" is a state, not a lens — it changes hourly, and lenses
> should be stable places.

---

## 2. Nav shape — build variants, don't guess

Rather than pick one, build all three in Storybook against the real lens set and compare:

```
src/Tiles/profiles/components/LensRail.stories.tsx
  · GroupedAccordion   — 3 groups open at a time, expanding a 4th collapses the LRU
  · GroupedRailOverflow — one row, inline group labels, "More ▾" for the tail
  · TwoTier            — group row + lens row
```

Each story renders at 360 / 768 / 1280 so overflow behaviour is visible, and with all three rings
populated (22 destinations) so none of them looks deceptively comfortable.

**Ship whichever survives the 360px case.** That is the real constraint; at 1280 all three work.

---

## 3. Layout changes

### 3.1 Goals / Actions / Events move up, and stop being everywhere

- Move the three disclosures **above** the lens body, directly under the nav.
- Show them on **Surfaced, Core and Gear only.** They are character-state sections; on Student or
  Classroom they are noise.
- **Separate collapse state per component**, not one shared key. Already keyed by `id` in
  `SectionDisclosure`; the fix is to stop reusing an id across lenses and to scope the storage key
  to `lens + section` where the same section appears on more than one lens.

### 3.2 Daily Focus becomes an icon toggle

Collapse the compact card to a **single icon button**. Clicking expands it into a horizontal row
(habits · mood · buffs) rather than a vertical card. Its own persisted state, independent of the
disclosures.

### 3.3 Attributes on the surfaced band

Attributes already render inside `CharacterSummaryCard` as mini-bars. What's missing is the
**numbers and the icons** — the bars are unlabelled, so they read as decoration.

- Add the numeric value beside each attribute bar.
- Add a per-attribute brand glyph (new `attributes.tsx` in `@4eye/icons`).
- Consider promoting Attributes to its own surfaced card rather than living inside Summary, so it
  gets its own span and header. **Open question below.**

### 3.4 SwipeRose onto the profile page

`src/Tiles/character/components/SwipeRose.tsx` — the 8-direction compass-rose swipe-cast config —
goes on the profile page. Natural home: the **Actions** disclosure, beside `EquippedActionsBar`, so
"what I can do" is one section: the bar for equipped actions, the rose for directional casting.

### 3.5 Parent goals — re-aim at children and family

Current parent data is administrative (`linkedStudents`, `approvals`, "Reviews weekly progress").
Replace the goals with ones aligned to the Expanse EDU / 4eye mission — a parent's goals expressed
as outcomes *for their children*, not as compliance tasks:

- *"Help my child find something they're excited to learn"*
- *"Turn screen time into progress they're proud of"*
- *"Notice when they're struggling before the report card does"*
- *"Build a habit we do together, not one I enforce"*

Use the **same `GoalsShowcase` graphics** — same rows, same meters, same value symbols — so it reads
as one system. Differentiate by background treatment only.

### 3.6 Surface treatment

- Parent (and the Facets ring generally) gets a **near-white background** rather than the accent
  wash — `#ffffff` in light mode, and the lightest neutral surface in dark rather than a literal
  white, which would glare.
- **Stronger borders** to compensate for the flatter background: 1px at higher alpha, and a subtle
  inner ring on cards so they still separate without the gradient doing the work.

---

## 4. Files

**New:** `packages/@4eye/icons/src/attributes.tsx`, `src/Tiles/profiles/components/LensRail.stories.tsx`,
`src/Tiles/profiles/components/LensGroups.ts`, `src/Tiles/profiles/components/DailyFocusToggle.tsx`

**Modified:** `LensRail.tsx`, `LensBody.tsx`, `ProfilePage.tsx`, `SectionDisclosure.tsx`,
`SurfacedBand.tsx`, `surfacing.ts`, `CharacterSummaryCard.tsx`, `seed-data.ts`, `goalsData.ts`,
`@4eye/icons/src/index.ts`

---

## 5. Open questions

1. **Does Gear stay a lens or become a panel under Core?** It is equipment, not a facet of self.
2. **Attributes: own surfaced card, or numbers+icons inside Summary?** Own card is cleaner but adds
   a sixth card to a band that is already five wide.
3. **Do Domains actually belong in the profile nav**, or should the profile *link out* to
   `/integration-layers` instead? Embedding 8 more lenses is a big surface increase.
4. **Mood as its own lens, or a section inside Brain?** Recommendation is section.

---

## 6. The integration-layers break

### What I verified

- The route builds and **all 8 layers render server-side** — every label present, panel switch
  exhaustive, left column and its hint present.
- `LayerDetailRouter` dropped its `default:` fallback, but **all 8 `panel` values match a case**, so
  nothing falls through. Not the cause.
- The `PanelShell` → `SurfaceShell` refactor from Plan 01 is **not** the cause: `/integration-layers`
  was rendered before and after and is unchanged.

### The likely cause

There is substantial **uncommitted, mid-flight work** on this tile — a light/dark refactor:

- `PanelThemeScope` flipped from **`initialThemeMode="dark"` to `"light"`**, and a new
  `ThemeModeToggle` was added (untracked).
- `LayerColumn`, `ChipsRow`, `MediaStage`, and four panels are partway through migrating from
  hardcoded `SOFT_TEXT` to surface tokens.
- `NeuralinkPanel` deleted, `BrainWavePanel` added (untracked); `neuralink` → `brainwave` rename.

The panels were designed against dark backgrounds. Flipping the default to light while the token
migration is only partly done is the most probable source of a visual break — dark-tuned accents on
a light surface, and any component not yet migrated still reading the old constants.

### What I need to proceed

**A screenshot, or a description of what's wrong** — "layers are somewhere else" is positional, but
everything renders in the DOM, so I can't tell whether it's a stacking, sizing, or contrast problem.
Specifically: is the left column empty/misplaced, is the right panel blank, or is it all there but
unreadable?

### Also worth knowing

`/integration-layers` **is not in any navigation config and never has been** — reachable only by
typing the URL. Seven other routes are equally orphaned: `/appRealm/character`, `/inventory`,
`/learning`, `/recaps`, `/sequences`, `/sample`, `/marketing-content`.
