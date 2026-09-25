# Status Recap — Full Project Snapshot

> Generated from the active plan files and recent planning work. (Session history store was empty/un-indexed, so this is reconstructed from the plans themselves, not telemetry.)
> Scope: everything across `~/Projects` (Planning, 4eye, ExpanseFrontend, report).
> Companion: [plans/_consolidation/README.md](./plans/_consolidation/README.md).

---

## 1. Recent Work (this planning cycle)

| Area | What happened | State |
| --- | --- | --- |
| **Profiles & Inventory plan** | Consolidated 7 scattered originals → 1 README + `inventory-plan.md` + `profiles-plan.md` (8 sub-views). Originals archived w/ verdicts. | ✅ Plan done |
| **Command Center rebuild plan** | Full architecture: ECS Entity model, `ViewMode` (pm↔narrative), unified `Goal` + `GoalLink` (weight always, depth optional), one-tile view-switcher, directory decisions. | ✅ Plan done |
| **Plan consolidation (meta)** | This initiative — central home + taxonomy + migration map decided. | ◐ Meta-plan written |
| **Status recap** | This document. | ✅ |
| **Entity System direction** | `entity-system/` plan created — Entity Tile system (Tile→JSON→component pipeline, prompt-generated tiles, variants), Epics-per-Entity, website Projects page ↔ app Planning tile reuse. | ◐ Plan drafted |
| **Seeding tile / model** | Reference HUD tile fully built (visuals, GoalLink cards, brand glyphs). **Owned by another chat — do not touch `seeding/model/*` until sign-off.** | ✅ Built (locked) |
| **Map / HUD work** | Minimap + full-view overlay work in the other chat. | ◐ In progress (other chat) |

---

## 2. Architecture Decisions Locked

- **ECS, not subclassing:** thin `Entity` base (id, slug, type, glyph, traits[], history, meta) + composable `Trait[]` + per-type registry.
- **Shared traits:** DepthTrait (1–7), WeightTrait (0–100), StatusTrait, ScheduleTrait, EstimateTrait (Fibonacci), GoalDirectedTrait, OwnerTrait.
- **One polymorphic `Relationship` edge table** (single reusable system, not per-type tables).
- **`ViewMode = 'pm' | 'narrative'`** — renamed from "Lens" to avoid `@expanse/lens` collision. Narrative skin: Legend/Campaign/Storyline/Quest/Objective/Action.
- **Unified `Goal`** = identity only; **`GoalLink`** edge carries `weight` always + `depth` optional (depth doesn't apply to every relationship). GoalLink is the most-used type.
- **State:** React Context + useReducer (no Redux/zustand). Tile pattern mirrors `seeding/`.
- **Shared pure types** → `@4eye/types/src/planning/`; logic/store/resolver → mockup `src/model/`; components tile-local first, promote later.

---

## 3. System-by-System Status

### 4eye (product)
- **App:** `4eye-web-mockup` (Next.js, dev 3311; Storybook 6311). Tiles architecture established; `seeding` is the reference tile.
- **Planning docs:** large set under `4eye/docs/planning/plans/` (app-features, core/infra, layout, website, verticals) — **needs consolidation** (see meta-plan §4).
- **Priority gap:** AI Chat frontend + PM-in-chat not yet planned in canonical form.

### ExpanseFrontend (monorepo)
- ~18 apps incl. `command-center`, `playground`, `presentationApp`, `lottie-studio`, `symbol-grid`, `expanseEdu`, `web4`.
- **command-center** (React Router): existing rich app w/ ~18 views + JSON data — being **rebuilt** per the new ECS plan.
- `ExpanseFrontend/plans/` holds only the lottie plans.

### Planning (this repo)
- Central plan home now formalized at `roadmap/2026/plans/_current/plans/`.
- `_current.md` = working brain dump (North Star: unify animation/video + PM + Report under one Entity model in the 4eye chat).
- Daily journal / roadmap / alignment systems exist via scripts.

### report ("Expanse 72")
- React + D3 data-viz app (port 5173) for investigation data: events/people/locations/items/orgs/theories/symbols/communications/connections + perspectives.
- Feeds the **Report (life documentation) entities** that seed animation/video (`_current.md` §2.2): Symbols, Connections, Communications, Interpretations.

---

## 4. Priority Roadmap (next planning targets, in order)

1. **AI Chat (frontend) — complete + perfect** → new `ai-chat/` plan folder. ❌
2. **PM inside AI Chat** (Command-Center style + ECS/ViewMode/GoalLink) → `ai-chat/` + `command-center/`. ◐ architecture ready.
3. **Entity System — Epics per Entity** → `entity-system/` plan folder. ◐ drafted (Tile system + Epics + cross-surface reuse).
4. **AI Chat sub-views** — Learning / Create / Heal / Plan → `ai-chat/`. ❌
5. **Profiles / Inventory / Equipment / Gear** → extend `profiles-and-inventory/` (Equipment + Gear are NEW). ◐

---

## 5. Risks / Watch-outs

- **Locked code:** `seeding/model/*` + map/HUD owned by another chat — coordinate before touching.
- **Duplication debt:** 3 entity data-model docs + multiple profile plans still un-merged (meta-plan P3).
- **Equipment/Gear** is net-new scope beyond the current inventory plan.
- **Naming collisions** resolved (`Lens`→`ViewMode`; two `Goal` types→unified) — keep enforced.

---

## 6. Immediate Next Steps

- Green-light meta-plan **P0** (scaffold `entity-system/`, `ai-chat/`, `infra/`, `reference/`).
- Author **priority #1 AI Chat plan** to the §3 convention.
- Build `migration-tracker.md` and start archiving originals as each canonical plan lands.
