# Plan Consolidation — Meta-Plan

> **Purpose:** Review, improve, and centralize **every plan across `~/Projects`** into one well‑organized home so they are concise, understandable, expandable, and importable into the future Planning System.
> **Status:** Active (planning only — no files moved yet).
> **Decided:** Central home = `Planning/roadmap/2026/plans/_current/plans/`. Old originals = **archive‑pending‑review** (never hard‑delete until you sign off). Taxonomy = **by system/domain**.

---

## 1. The Problem

Plans are scattered across 4 repos: **224 plan `.md` files** + ~730 supporting docs.

| Source | What lives there |
| --- | --- |
| `Planning/roadmap/2026/plans/_current/plans/` | **Canonical home** — command-center, profiles-and-inventory, marketing-video-see, project-* files |
| `4eye/docs/planning/plans/` | Largest set — `app-features/`, `core/`, `website/`, `projects/`, `layout/`, `infrastructure/`, `setup/`, `verticals/`, `packages/`, `testing/` |
| `4eye/docs/planning/{Plan,MasterPlan,ExpandedPlan}.md` | High-level master plans |
| `ExpanseFrontend/plans/` | `lottie-plan.md`, `LottieAnimationProductPlan.md` |
| `Planning/privacy/business/products/plans/` | Privacy/product plans |

**Consequences:** duplication (3+ entity data-model docs, multiple profile plans), no single source of truth, hard to know what's current vs stale, can't cleanly import into a rebuilt Planning System.

---

## 2. Target Structure (canonical taxonomy — by system/domain)

All under `Planning/roadmap/2026/plans/_current/plans/`:

```
plans/
├─ _consolidation/        ← this meta-plan + migration tracker
├─ entity-system/         ← Entity/ECS base, traits, relationships, lenses, data model
├─ ai-chat/               ← AI Chat frontend + sub-views (Learning/Create/Heal/Plan) + PM-in-chat
├─ command-center/        ← PM rebuild (ECS, ViewMode, Goal/GoalLink)  [EXISTS]
├─ profiles-and-inventory/← Profiles tile + Inventory + Equipment/Gear  [EXISTS — extend]
├─ marketing/             ← video-see, video-sequences, content/video strategy  [partial]
├─ infra/                 ← data model, auth, graphql, realtime, db, ai-provider layer
└─ reference/             ← cross-cutting notes kept for context, not active work
```

> **Folder conventions:** leading `_` = meta/non-initiative. Each initiative folder has a `README.md` index + focused child plans + a `_archive-pending-review/` for its migrated originals.

---

## 3. Plan File Conventions (so every plan is concise + understandable)

Each plan file uses this skeleton (keep it short — link out, don't inline everything):

```md
# <Plan Name>
> One-sentence purpose. Status: <draft|active|blocked|done>. Owner-priority: <1-5>.

## Goal            — what "done" looks like (bullets)
## Scope           — in / out
## Existing assets — code/packages/OSS to reuse FIRST (paths + links)
## Approach        — the chosen path (short)
## Implementation  — phased checklist
## Open questions  — explicit unknowns
## Source map      — originals this consolidated from (archive paths)
```

**Rules:** concise > exhaustive; one source of truth per topic; cross-link instead of copy; check OSS/existing code before "build from scratch"; TS/JS-first.

---

## 4. Migration Map (source → canonical target)

| Source plan(s) | → Target folder |
| --- | --- |
| `4eye/docs/planning/plans/core/data-model-overview.md`, `4eye/docs/planning/plans/app-features/*` (entity bits), `_current.md` §1–2 | `entity-system/` |
| `app-features/chat-interactivity.md`, `learning-modes.md`, `recaps.md`, `summaries.md`, `positive-speech-transform.md`, `ai-actions-plan.md`, `quick-actions-plan.md` | `ai-chat/` |
| `core/ai-provider-layer.md`, `typed-ai-responses.md`, `graphql-api.md`, `realtime-infrastructure.md`, `database-setup.md`, `content-management.md`, `auth-plan/` | `infra/` |
| existing `command-center/` | `command-center/` (already canonical) |
| existing `profiles-and-inventory/` + new Equipment/Gear | `profiles-and-inventory/` (extend) |
| `marketing-video-see*`, `marketing-video-sequences.md`, `Planning/marketing/*` | `marketing/` |
| `ExpanseFrontend/plans/lottie*` | `marketing/` or `reference/` (decide on review) |
| `4eye/docs/planning/{Plan,MasterPlan,ExpandedPlan}.md` | split into the above; archive originals |
| `layout/`, `packages/`, `setup/`, `testing/`, `storybook-*`, `verticals/`, `website/`, `projects/` | `reference/` unless tied to a priority initiative |

> Full per-file disposition is tracked in [migration-tracker.md](./migration-tracker.md) (built during execution).

---

## 5. Priority Order (maps user's stated focus → plan folders)

| # | Focus area | Lands in | Status today |
| --- | --- | --- | --- |
| 1 | **AI Chat complete + perfect (frontend)** | `ai-chat/` | ❌ not yet written |
| 2 | **PM system inside AI Chat** (Command-Center style + ECS/ViewMode/GoalLink) | `ai-chat/` + `command-center/` | ◐ architecture done in command-center/README |
| 3 | **Entity System — Epics per Entity** | `entity-system/` | ◐ Home created; Tile→JSON→component system + Epics-per-Entity + cross-surface reuse drafted |
| 4 | **AI Chat sub-views** — Learning / Create / Heal / Plan | `ai-chat/` | ❌ not yet written |
| 5 | **Profiles, Inventory, Equipment, Gear** | `profiles-and-inventory/` | ◐ profiles+inventory done; Equipment/Gear NEW |

---

## 6. Execution Phases (when you green-light moving files)

- **P0 — Scaffold:** create `entity-system/`, `ai-chat/`, `infra/`, `reference/`, `marketing/` with README stubs. Build `migration-tracker.md`.
- **P1 — Priority plans first:** author/migrate in the order in §5. For each: write canonical plan to convention, then archive originals to that folder's `_archive-pending-review/` with a status banner.
- **P2 — Sweep the rest:** classify remaining 4eye/ExpanseFrontend/Privacy plans into targets; archive originals.
- **P3 — De-dup + cross-link:** collapse the 3 entity data-model docs into one; reconcile profile plans; add a top-level `plans/README.md` index.
- **P4 — Import-ready:** confirm each plan follows §3; tag with status/priority front-matter for the future Planning System.

**Archive rule (every step):** move original → `<target>/_archive-pending-review/`, prepend a banner (`> ARCHIVED <date> — superseded by <canonical link>. Verdict: <delete | review>.`). You delete after review.

---

## 7. Open Questions

- Keep `profiles-and-inventory/` combined, or split into `profiles/` + `inventory-gear/` per taxonomy? (Recommend: keep combined, add Equipment/Gear inside.)
- Do `lottie*` plans belong to an active initiative or `reference/`?
- Should `infra/` live here at all, or stay in `4eye/docs/planning/core/` and just be **linked** (code-adjacent)? (Lean: link, don't move infra.)
- Front-matter schema for the future Planning System import (status, priority, owner, links)?

---

## 8. Companion Doc

Recent work + full project status: [../status-recap.md](../status-recap.md).
