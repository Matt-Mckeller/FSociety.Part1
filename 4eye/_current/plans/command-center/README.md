# Command Center Rebuild — 4eye Tile

> Canonical plan to rebuild the Command Center as a **single tile** inside `4eye-web-mockup`,
> on the shared ECS Entity model, integrated with Seeding goals/work.
> **Status:** Plan-only (another chat is actively working this area — coordinate before coding).

**Build surface:** `4eye/apps/4eye-web-mockup` — `src/Tiles/command-center/` (mirror the `seeding` tile pattern).
**State:** React Context + `useReducer` (no Redux/zustand). **Storybook:** port 6311.

> **Naming note:** the PM↔narrative skin is called **ViewMode** (`pm | narrative`), NOT "Lens" —
> `@expanse/lens` already exists and is the *animated symbol-language* package (unrelated).

---

## 0. Why rebuild (context)

Per [_current.md §4.1](../../_current.md): the existing `ExpanseFrontend/apps/command-center` has *lots of good* —
strong docs, a game-themed hierarchy, rich JSON data — but it's a standalone React-Router app. 4eye is
much cleaner, so we rebuild here (refined) rather than working out of the old project. Migrate **piece by
piece**; Command Center + Report are the **starter** migrations.

The June-1 AI feedback in [_current.md](../../_current.md) already prescribes the architecture: a thin ECS
`Entity` base + composable traits, **one** polymorphic Relationship edge table, the PM hierarchy as a
**Lens** over a generic Work entity, and an **Inspector/Focus** modal. This plan applies that directly.

---

## 1. Existing Command Center inventory (source of data + views)

**App:** `ExpanseFrontend/apps/command-center/`

### Game-themed hierarchy (from `src/types/index.ts`)
`Legend → Campaign ↔ Storyline → Quest → Objective → Action`, with `Checkpoint` (milestone) and
`Artifact` (deliverable). Status enums, `ComplexityPoints` (Fibonacci 1/2/3/5/9/18/81),
`QuestCategory` (planning/development/operations).

### Existing views (`src/components/`, `src/pages/`)
Dashboard · CampaignsView · StorylinesView · StorylineWikiPage · QuestLog · ObjectivesView ·
RoadmapView · TimelineView · FinancialsView · StrategicCompassView · StrategicFocusPage ·
JourneyMap · JournalView · QuestionsView · PlansView · PresentationView · DocsView.

### Existing data (`src/data/*.json`)
legend/campaigns/storylines/questlines/objectives/tasks/projects, strategicFocus, strategicCompass,
corporateVision, globalSwot, businessValue, objectives, decisions, financials, journal, questions,
timeline, marketingStages, mvpConfigurations, storylines/wiki/*, docs/*.

> **Decision:** adopt the ECS model now and **re-author this data as seed fixtures** in the new shape.
> While migrating, **improve each entity's description/terminology for clarity** (the old game labels are
> evocative but ambiguous — see §3.4).

---

## 1.5 Directory & Architecture decisions (RESOLVED)

Grounded in what already exists in the repo:
- `@4eye/types` (pure types, zod, no React; `main: src/index.ts`) already holds `entities/`, **`goals/` (`goal.ts` + `project.ts`)**, `domain/`, `targeting/`, `symbols/`, `context/`. The mockup already depends on it (`workspace:*`).
- `@expanse/lens` is the **animated symbol-language** package (shells/registry/components) — **do not** reuse its name for the PM concept.
- `seeding` keeps a **self-contained copy** of `Entity`/`Goal`/`GoalLink` in `src/Tiles/seeding/model/`, explicitly "shaped to drop onto the shared base later."

**Decisions:**

| Topic | Decision |
|-------|----------|
| **Shared pure types** | Live in **`@4eye/types/src/planning/`** — `Entity` base, `Trait` union, `Relationship` edge, `EntityTypeConfig`, `WorkEntity`, `GoalLink`, `ChangeEvent`. (Option A.) |
| **Logic / store / resolver** | Live in the mockup at **`src/model/`** (not pure types) — StubStore, reducer helpers, inheritance resolver. Both tiles import. (Option C for logic.) |
| **Components** | **Tile-local first** (`Tiles/command-center/components/`); promote `Inspector`, `WeightControl`, `DepthControl`, `BrandIcon` to `@expanse/ui` / `@expanse/hud` once stable. |
| **ViewMode** | The PM↔narrative skin (renamed from "Lens"). |
| **Goal** | **Unified to ONE `Goal`** (identity only) in `@4eye/types`. Reconciles the existing life-goal `Goal` with seeding's work-goal — see §2.7. |
| **GoalLink** | The **primary** relationship type; carries `weight` (broad) + **optional** `depth` (only where complexity is meaningful). |
| **Seeding model** | **Do NOT touch `seeding/model/*`** until the active chat signs off; plan the migration, execute later (§7). |

---

## 2. Target architecture — ECS Entity model

**ECS = Entity-Component-System.** Instead of subclassing (`Campaign extends Entity extends …`), every
planning thing is one `Entity` that *composes* **traits** (capabilities/data slices). A per-type
**registry** declares what each type looks like and can do. This is the "config settings for what types
can do" from [_current.md](../../_current.md), and it lets all entities **inherit `depth` + `weight`** (and
history, symbol, etc.) uniformly — directly satisfying "all of these would be entities that inherit the
depth and other things."

### 2.1 Entity base (shared with Seeding — same shape)
```ts
interface Entity {
  id: string;                 // UUID v4
  slug: string;               // readable handle
  type: EntityType;           // 'legend' | 'campaign' | 'storyline' | 'quest' | 'objective' | 'action' | 'goal' | ...
  glyph?: GlyphName;          // brand symbol (see §4) — preferred over emoji
  symbol?: string;            // emoji/icon fallback
  imageUrl?: string;
  version?: number;
  history?: ChangeEvent[];    // audit log (reuse seeding ChangeEvent)
  traits: Trait[];            // composable capabilities (below)
  meta?: Record<string, unknown>;
}
```

### 2.2 Shared traits (the "depth and other things" everything inherits)
| Trait | Carries | Notes |
|-------|---------|-------|
| `DepthTrait` | `depth: 1-7` | Tier/complexity — the seeding **depth** concept (`DepthDots` 1-7, light→dark). |
| `WeightTrait` | `weight: 0-100` | Importance/priority weight (`WeightMeter`, gray→amber→blue→green). |
| `StatusTrait` | `status`, transitions | Maps old QuestStatus/ObjectiveStatus to one enum (see §3.4). |
| `ScheduleTrait` | `startDate?`, `targetDate?`, `checkpoints?` | Roadmap/Timeline + Sprint windows. |
| `EstimateTrait` | `complexityPoints` (Fibonacci) | Sprint capacity / burn. |
| `GoalDirectedTrait` | linked `goalId`s via GoalLink | Shared with Seeding (§5). |
| `OwnerTrait` | `assignee?`, `actor` | Who's working it (sprint board). |

Existing rating fields (`confidenceRating` 1-10, `importanceRating` 1-10, `frequencyScore`,
`strength`) fold into `WeightTrait`/`DepthTrait.meta` rather than living as ad-hoc columns
(consistent with [marketing-video-sequences.md](../marketing-video-sequences.md) §Goal weight/depth).

### 2.3 Entity registry (type → config)
```ts
EntityTypeConfig {
  type; glyph; label; description;        // §3.4 clarified copy
  requiredTraits: TraitKind[];            // e.g. quest requires Status+Depth+Weight+Estimate
  screens: ViewId[];                      // which sub-views show it
  actions: ActionId[];                    // inspect, promote, link-goal, add-to-sprint…
  defaultLens: LensId;                    // pm | narrative
}
```

### 2.4 One Relationship edge table (not per-type tables)
```ts
Relationship { id; fromId; fromType; toId; toType; relationType; meta }
```
- Hierarchy links (`campaign→storyline`, `quest→objective`, `objective→action`) are edges.
- `relationType` enum; `meta` carries edge data (e.g. `weight`, `depth`, `order`).
- **Hybrid rule** (from [marketing-video-sequences.md](../marketing-video-sequences.md) D-S6): keep plain
  embedded ID arrays where there's no edge metadata; use the **edge table specifically for
  `Goal↔X`** (and any link needing weight/depth). Goal weight/depth **inherits down** the hierarchy with
  per-entity override (sequence→scene pattern, applied to campaign→…→action).

### 2.5 PM hierarchy = one Work model + ViewMode
Keep `Legend/Campaign/Storyline/Quest/Objective/Action` as a **narrative ViewMode skin** over a generic
hierarchical **Work** entity. The same data renders as PM (epic/story/task) or as the game hierarchy.
`ViewMode = 'pm' | 'narrative'`. Leaf Work entities carry a `category` (Component / Module / Page) — fits
"quest type + name + chips". (Renamed from "Lens" to avoid the `@expanse/lens` collision.)

### 2.7 Unified Goal + GoalLink (reconciliation)
Two `Goal` types exist today and are a **noun collision**, not the same concept:
- `@4eye/types/goals/goal.ts` — a **life/learning goal** (`word`, `symbol`, `category`, `domain`); injected into chat context.
- `seeding/model` — a **production goal** that pulls a scene, via `GoalLink` carrying `weight`/`depth`.

**Unify to ONE `Goal` (identity only); the edge carries the strength:**
```ts
// @4eye/types — identity only (NO weight/depth on the Goal)
interface Goal {
  id; word;                 // word == title
  symbol; symbolColor?;
  category?: GoalCategory;   // OPTIONAL — life-goals set it, work-goals leave blank
  domain?: DomainType;       // OPTIONAL
  description?: string;
}

// GoalLink — the PRIMARY relationship type (one row per goal → target)
interface GoalLink {
  id; goalId;
  targetId; targetType;      // scene | sequence | quest | objective | action | sprint-item | …
  weight: number;            // 0-100 — applies broadly
  depth?: number;            // 1-7 — OPTIONAL; only where target complexity is meaningful
  meta?: Record<string, unknown>;
}
```
The same `Goal` can link to a scene, a quest, and a sprint item with different weights. `GoalLink` is the
`relationType: "goal"` specialization of the single Relationship edge table (§2.4). **`depth` is optional**
— not every relationship has a meaningful tier.

### 2.6 Shared Inspector/Focus modal
One reusable full-screen **Inspector** (triggered by **Inspect/Analyze**) renders any entity from its
registry config. Reuse across Command Center, Seeding, and later Report (the "reusable full-screen entity
modal" from [_current.md §3.4](../../_current.md)).

---

## 3. The Command Center tile

### 3.1 One tile, brand-glyph view switcher
Single tile `command-center` with a **brand-symbol** view switcher (custom planning glyphs, not emoji —
extend `seeding/components/brand-glyphs.ts` + `BrandIcon`). Fixed-height HUD dashboard like
`SeedingTile` (no page scroll; panes scroll independently). Reuse `visuals.tsx`
(`WeightMeter`, `DepthDots`, `StatusBadge`, `weightColor()`) everywhere.

### 3.2 Sub-views (inside the one tile)
| View | Glyph | Purpose | Source / notes |
|------|-------|---------|----------------|
| **Dashboard** | overview | At-a-glance: active campaigns, top-weight quests, alignment, blockers | old Dashboard, refined |
| **Quests** | quest | The hierarchy browser (QuestLog) — Campaign→Storyline→Quest→Objective→Action via the edge table; PM/narrative Lens toggle | old QuestLog/Objectives/Storylines merged |
| **Sprint** | sprint | **NEW** — sprint board: pick a window, pull Work items (incl. **seeding tasks**, §5), columns by Status, capacity by `complexityPoints` | new screen |
| **Priorities** | priority | **NEW** — priority selection: rank/triage by `weight`+`depth`; eisenhower-style or weighted list; sets the active focus set feeding Sprint | new screen (ties to Planning priority-matrix) |
| **Roadmap / Timeline** | timeline | Schedule view across checkpoints; **surfaces seeding sequences/scenes** (§5) | old Roadmap/Timeline + seeding |
| **Compass** | compass | Strategic Focus / Strategic Compass / Vision / SWOT | old StrategicFocus/Compass/Vision |
| **Docs / Wiki** | codex | Storyline wiki + docs (P/D/O tabs) | old Docs/StorylineWiki — secondary |

> Dashboard / Quests / Sprint / Priorities / Roadmap are **primary**; Compass / Docs are secondary
> (ship after the core loop). Each entity row offers **Inspect** (→ Inspector modal) and a single
> **"Send to 4eye chat"** action (per [_current.md §4.1](../../_current.md) — no per-screen chat).

### 3.3 Sprint & Priorities detail
- **Priorities view:** triage surface. Inputs = all open Work items + Goals. User assigns/edits `weight`
  (0-100) and `depth` (1-7) inline (reuse `GoalLinkRow`-style control). Output = a ranked **focus set**.
  Connects conceptually to `Planning/alignment/priority-matrix.md`.
- **Sprint view:** choose a window (`ScheduleTrait`), pull the focus set + any seeding work items, lay out
  as a board (columns = Status) with a capacity meter (sum of `complexityPoints` vs target). Drag = status
  change (UI only now). No backend — stub store + fixtures.

### 3.4 Terminology clarity pass (improve existing descriptions)
Old game labels stay as the **Lens display names** but each registry entry gets a **plain-language
description** so it's obvious what it is:
| Game term | Plain meaning (new description) |
|-----------|--------------------------------|
| Legend | North-star vision (one) |
| Campaign | Multi-quarter strategic initiative / business line |
| Storyline | A product or project (e.g. 4eye) that can span campaigns |
| Quest | Major deliverable / epic with a clear outcome |
| Objective | A concrete task within a quest |
| Action | Atomic step within an objective |
| Checkpoint | Milestone / gate |
| Artifact | Tangible deliverable produced |

### 3.5 Projects surfacing — Website Projects page ↔ App Planning tile (NEW)
Projects (the `Storyline`/project-level `WorkEntity`) are surfaced in **two places that share the same
components + data** via the Entity Tile system (see [../entity-system/README.md §4](../entity-system/README.md)):

- **Website:** the **Projects page** — the page **to the left of Home** — lists/accesses projects, rendered
  from entity data through `<TileRenderer>` (not a bespoke page).
- **App:** a **Planning tile** on the app page renders the **same** project components + data in-HUD.

Both are consumers of the one component registry; they differ only by layout container. Single data source
(the entity store) feeds both — no duplicated project data or UI.

> **Open question:** confirm the exact website route for the Projects page (left of Home) during execution.

---

## 4. Brand planning glyphs

Extend `seeding/components/brand-glyphs.ts` with planning symbols: `legend`, `campaign`, `storyline`,
`quest`, `objective`, `action`, `sprint`, `priority`, `timeline`, `compass`, `codex`, `overview`.
Render via `BrandIcon`. Keep within the Expanse visual language (darkness→light, small→large 1:2:3 growth,
connecting dots/chain — per brand guidelines). Provide a Storybook story showcasing the glyph set.

---

## 5. Seeding integration (confirmed)

1. **Shared Goal + GoalLink.** Command Center and Seeding use the **same unified `Goal` entity** (§2.7)
   and the **same `GoalLink` edge** (`weight` always, `depth` optional; inherits down with override).
   The shared types live in **`@4eye/types/src/planning/`**; seeding's local copies are replaced by
   imports **once the active chat signs off** (§7).
2. **Roadmap/Timeline surfaces seeding** sequences/scenes as schedule items (read-only cross-tile view).
3. **Sprint pulls seeding work** — seeding scenes/seeds with open status appear as Work items in the
   sprint board, so animation work and PM work share one queue.
4. Cross-link by ID elsewhere; don't duplicate seeding data.

---

## 6. Implementation plan (when coding starts — after coordinating with the active chat)

Follow the `seeding/` tile layout. **Shared pure types go in `@4eye/types/src/planning/`; shared logic/store
in the mockup's `src/model/`; components stay tile-local until stable.**
```
@4eye/types/src/planning/        # SHARED PURE TYPES (no React)
├── entity.ts                # Entity base, Trait union, EntityType, ChangeEvent
├── traits.ts                # Depth/Weight/Status/Schedule/Estimate/GoalDirected/Owner
├── relationship.ts          # Relationship edge + GoalLink specialization
├── registry.ts              # EntityTypeConfig shape (data only)
├── work.ts                  # WorkEntity + ViewMode ('pm' | 'narrative')
└── index.ts
# (Goal stays in @4eye/types/src/goals, unified per §2.7)

4eye-web-mockup/src/model/       # SHARED LOGIC (not pure types)
├── registry.ts              # concrete EntityTypeConfig map (glyph/label/description/screens/actions)
├── resolver.ts              # inherited weight/depth resolution (read-time)
└── store.ts                 # StubStore base reused by tiles

4eye-web-mockup/src/Tiles/command-center/
├── store/
│   ├── seed-data.ts         # existing CC data re-authored into ECS fixtures
│   └── CommandCenterProvider.tsx  # Context + useReducer (activeView, selection, viewMode, sprintWindow, focusSet)
├── components/
│   ├── brand-glyphs.ts (extend)  BrandIcon (reuse)
│   ├── ViewSwitcher.tsx
│   ├── views/
│   │   ├── DashboardView.tsx
│   │   ├── QuestsView.tsx        # hierarchy browser + ViewMode toggle
│   │   ├── SprintView.tsx
│   │   ├── PrioritiesView.tsx
│   │   ├── RoadmapView.tsx       # + seeding sequences
│   │   ├── CompassView.tsx
│   │   └── DocsView.tsx
│   ├── EntityRow.tsx / EntityCard.tsx
│   ├── Inspector.tsx            # shared full-screen modal (promote to @expanse/hud later)
│   └── shared/ (WeightControl, DepthControl, CapacityMeter…)
├── CommandCenterTile.tsx
└── CommandCenter.stories.tsx
```

### Build order (mirrors [_current.md](../../_current.md) §AI Feedback #6)
1. `Entity` base + traits + single `Relationship` edge table + registry.
2. Re-author existing CC JSON → `seed-data.ts` (with clarified descriptions).
3. Shared **Entity viewer** + **Inspector** modal.
4. `CommandCenterProvider` (Context + useReducer).
5. **Quests view** (hierarchy + lens) → **Dashboard**.
6. **Priorities** → **Sprint** (with seeding work items).
7. **Roadmap/Timeline** (with seeding sequences).
8. Brand glyph set + `ViewSwitcher`; wire tile into `appRealm`.
9. *Defer:* Compass, Docs/Wiki, drag-and-drop persistence, custom panel system, Tinder-swipe input.
10. Storybook variants per view; `pnpm typecheck` clean for new files.

### Storybook variants (acceptance)
One story per view; empty vs populated; PM lens vs narrative lens; sprint empty/mid/over-capacity;
priorities pre/post-triage; Inspector open for each entity type; mobile width; brand-glyph showcase.

---

## 7. Open questions (resolve before/with the active chat)

*(Directory home, Goal reconciliation, ViewMode naming, and components home are RESOLVED — see §1.5 / §2.7.)*

1. **Collision with the active chat** — it appears to be in `seeding/model/*` + map/HUD. **Confirm ownership
   of `seeding/model/*` before** (a) adding `@4eye/types/src/planning/` and (b) replacing seeding's local
   `Entity`/`Goal`/`GoalLink` with imports. Migration is planned but **not executed** until sign-off.
2. **Sprint semantics** — fixed-length sprints vs rolling "now/next/later"? (affects `ScheduleTrait`).
3. **Financials/Journal/Questions/JourneyMap** — port into the CC tile, split to their own tiles, or drop for now?
4. **`@4eye/types` build** — it's consumed as source (`main: src/index.ts`), so adding `planning/` needs no
   build step, but confirm the barrel export + that the mockup's `tsc` picks it up.

---

## 8. Out of scope (now)

Backend/persistence, real auth, AI chat wiring, drag-to-persist, dockview/react-mosaic panel system,
Report entity migration (separate starter), Tinder-swipe input. UI shells + re-authored fixtures only.
