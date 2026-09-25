# Gallery / Animation App — Rebuild & Handoff Spec

> **Purpose of this doc:** a single, self-contained brief so this app can be **paused now and picked back up later** — likely **rebuilt inside the 4eye project**. It captures the *why*, the *what*, the *how it works today*, and the *what to do next*. Read this first; deeper detail lives in [`README.md`](../README.md) and [`docs/`](./).
>
> **Status:** ⏸ Paused — pending rebuild decision.
> **Created:** 2026-06-01
> **Owner:** marketing-video-see production.

---

## 1. What this app is (one paragraph)

A **local-first creative pipeline** that generates, curates, edits, animates, and sequences AI images into the *Classroom of Tomorrow* marketing video for 4eye. It wraps image models (Gemini), video models (Veo), and a SQLite asset catalogue behind a **seed system** (declarative, version-controlled generation recipes) and a **CLI + web UI**. The core value: **repeatable, reviewable, consistent** AI media production — not one-off prompt roulette.

---

## 2. Why it exists — core problems it solves

| Pain without the app | How the app solves it |
|---|---|
| Prompt outputs drift; characters/HUD look different every run | **Seeds** + **character-lock** + **canonical-HUD** references pin identity across shots |
| "Which image is the keeper?" is ambiguous | **Star** concept = one canonical asset per beat; sequences carry order |
| Edits regenerate the whole image | **Edit-via-generate** pattern = surgical single-region edits |
| No record of how an image was made | **Append-only generation log** — every model call captured + replayable |
| Metadata lives separate from files | SQLite DB + JSON export live **inside** the asset folder; git-friendly |
| Manual file shuffling | CLI promote/demote/sequence commands manage folders + canonical state |

---

## 3. Goals

### Primary
- **G1 — Consistency:** the same 4eye, the same HUD, the same style across 21+ shots.
- **G2 — Repeatability:** any frame can be re-generated from a committed seed; any model call replayed from the log.
- **G3 — Reviewability:** generate many takes, star the winner, keep alternates traceable.
- **G4 — Sequence-to-film:** ordered frames → animated clips → assembled video.

### Secondary
- **G5 — Local-first / portable:** assets + metadata travel together; no cloud lock-in.
- **G6 — Quality gating:** AI-graded validation (`asset:test`) before a frame is "locked."

### Explicit non-goals (today)
- Not a playback/editing engine (final cut happens in DaVinci Resolve).
- Not multi-user / hosted.
- Not a general DAM — it's scoped to this video's production.

---

## 4. Core concepts (the vocabulary)

| Concept | Definition | Source of truth |
|---|---|---|
| **Asset** | One image or video + metadata (sceneCode, tags, starred, prompt, parents). | `assets` table |
| **Seed** | A committed TS recipe (`defineSeed`) describing references + prompt + params for one generation. | `apps/api/src/seeds/**/*.seed.ts` |
| **Scene code** | Free-text label (`S1-A`, `S1-C-new5`) marking which moment an asset depicts. Convention only, not validated. | [`scene-codes.md`](./features/scene-codes.md) |
| **Star** | Boolean "this is the canonical keeper" for a subject. Selectors prefer starred. | `assets.starred` |
| **Sequence** | Ordered, named list of asset IDs = playback/narrative order. | `sequences` table |
| **Reference selector** | How a seed points at inputs: `assetId:`, `sceneCode:`, `tag:…:starred`, `slug:`, `file:`. | [`architecture.md § Seed system`](./architecture.md) |
| **Character-lock** | A starred reference sheet (`tag:4eye-reference:starred`) fed as an image input for identity fidelity. | seed-cookbook Shape 3 |
| **Edit-via-generate** | Surgical edits use `kind:'generate'` + single source + "keep everything identical." No `kind:'edit'`. | [`edit.md`](./features/edit.md) |
| **Generation log** | Append-only record of every model call; supports `gen:replay`. | `generation_log` table |

---

## 5. How it works today (architecture at a glance)

```
Seed (.ts recipe) ──▶ ref-resolver ──▶ provider (Gemini/Veo) ──▶ Asset (DB + file)
       │                  │                                          │
   committed in git   resolves            generation_log            star / sequence
                      assetId/tag/file     (replayable)             (canonical + order)
```

- **Backend:** NestJS 10 + TypeORM + SQLite (`apps/api`, port 4000).
- **Frontend:** React + Vite (`apps/web`, port 5173).
- **Shared:** Zod schemas + TS types (`packages/shared`).
- **Storage:** everything under `GALLERY_ROOT/` (numbered folders `00_reference`…`07_generated`, `library.db`, `library.export.json`).
- **Models:** `GEMINI_IMAGE_MODEL` (flash/pro), `VEO_MODEL` (video). **Veo = single image → video; describe the end state in the prompt** (no dual-frame interpolation).
- **Interfaces:** CLI (`pnpm cli …`) for production work; web UI for browse/review/animate.

> Full module map, DB schema, selectors, and WS events: [`architecture.md`](./architecture.md).
> Step-by-step recipes (new keyframe, surgical edit, animate, sequence): [`workflows.md`](./workflows.md).

---

## 6. User stories (what it lets the operator do)

**Production operator (you):**
- *As an operator, I write a seed so I can regenerate any frame deterministically later.*
- *As an operator, I generate N takes and star the winner so the canonical frame is unambiguous.*
- *As an operator, I surgically fix one detail (HUD icon, remove a prop) without re-rolling the whole image.*
- *As an operator, I lock the 4eye character across every shot via a single reference sheet.*
- *As an operator, I arrange starred frames into a named sequence that defines the film's order.*
- *As an operator, I animate two adjacent states into a clip and have it filed with parent links.*
- *As an operator, I inspect or replay any past model call from the generation log.*
- *As an operator, I run a health check (`doctor`) before committing so the catalogue stays consistent.*

**Reviewer:**
- *As a reviewer, I browse the gallery, compare takes, and approve/reject without touching the CLI.*

---

## 7. Where the work stands (production status)

| Area | Status |
|---|---|
| App infra (seeds, CLI, DB, web) | ✅ Working |
| `cli vid:run` headless animate | ✅ Built |
| Veo single-frame animate | ✅ Verified ([test log](./video-gen-test-log.md)) |
| Veo dual-frame (`lastFrame`) | ❌ Not supported — don't use |
| Scene 1 beat sheet | ✅ Drafted ([scene-1-classroom.md](../scenes/scene-1-classroom.md)) |
| Shot 04 (hero HUD reveal), 04b (skill tree) | 📝 Prompt-drafted |
| HUD standardization + S1-G + skill-tree plan | 🚧 Seeds authored, **awaiting generation runs** ([PLAN](../PLAN-s1-hud-standardization-and-skill-tree.md)) |
| Remaining ~17 shots | 💡 Idea stage |
| Lens transitions (stats opportunity) | 💡 TBD |
| Final assembly (DaVinci) | ⬜ Not started |

---

## 8. Open decisions carried into the rebuild

1. **HUD: static vs dynamic** — strategy doc picked *dynamic/morphing*; in-progress PLAN locks a *static 3-icon bar*. Recommended resolution: **static within Scene 1, morph across scenes.** ([details](../animation-ad-quality-options.md#decisions-resolved-2026-05-31))
2. **Statistics content** — no dedicated stats-requirements doc exists; Lens 2 is the placeholder; existing numbers are VAKL 75/60/50/85, Coins 817, Rewards 12. Needs a decision on what stats appear and where.
3. **Style** — ✅ locked: iterate on existing references / style bible. No new look.
4. **Audio** — provisionally AI-generated; emotional arc (tension→intensity→release→satisfaction) to be locked regardless.

---

## 9. Rebuild-into-4eye considerations

> Decision pending. This section is the checklist for *if/when* the app is rebuilt inside the 4eye project.

### Why rebuild
- Consolidate with 4eye's stack/components (coins, HUD, icons already live in `@expanse/brand-core` / 4eye packages).
- Reuse real product UI assets directly instead of re-sourcing SVGs.
- One repo for product + marketing media.

### What MUST carry over (do not lose)
- **The seed system** — declarative recipes are the core IP. Keep `defineSeed`, ref-selectors, edit-via-generate, character-lock.
- **The star + sequence model** — canonical-keeper + ordered-frames semantics.
- **The generation log** — append-only + replay.
- **Local-first asset layout** — DB + export travel with files.
- **Veo prompt discipline** — single image → video, end state in prompt.
- **Style bible + data-embedding matrix** — the creative source of truth.

### What to reconsider on rebuild
- Frontend tech (web UI is flagged as "not great" historically) — could fold into 4eye's existing React/MUI app.
- Scene-code convention is "a mess" (26 ad-hoc codes) — adopt the stricter scheme in [`naming-conventions.md`](./features/naming-conventions.md) before scaling.
- Tag-based commands gap: `cli asset:tag` referenced but **does not exist** — PLAN works around it with `sceneCode:` selectors. Fix or formalize in rebuild.
- Provider abstraction: keep the `provider` DTO override (the env-memoization bug fix) so model routing is explicit.

### Migration checklist (when rebuild starts)
- [ ] Decide repo location inside 4eye + `GALLERY_ROOT` path.
- [ ] Port `packages/shared` Zod schemas first (contract).
- [ ] Port seed system + ref-resolver + generation log.
- [ ] Re-point character-lock/HUD/coin references at real 4eye component exports.
- [ ] Migrate or re-import existing starred keyframes + sequences (preserve IDs/sceneCodes).
- [ ] Re-run `doctor` to validate catalogue integrity post-migration.
- [ ] Resolve the HUD static/dynamic + stats decisions before generating new shots.

---

## 10. Pick-up-where-we-left-off (first actions next session)

1. **Decide:** rebuild into 4eye now, or finish current production first? (This doc supports either.)
2. If **continuing production:** finish the in-flight [HUD/skill-tree PLAN](../PLAN-s1-hud-standardization-and-skill-tree.md) — run the authored generation seeds (nearest milestone).
3. If **rebuilding:** start at § 9 migration checklist; port `packages/shared` → seed system → references.
4. Either way: resolve the **HUD static-vs-dynamic** and **statistics** decisions (§ 8) — they gate new shot generation.

---

## 11. Doc map (where everything lives)

| Topic | File |
|---|---|
| App overview + quick start | [`../README.md`](../README.md) |
| Architecture, DB, seeds, selectors | [`architecture.md`](./architecture.md) |
| Step-by-step recipes | [`workflows.md`](./workflows.md) |
| Seed examples (annotated) | [`seed-cookbook.md`](./seed-cookbook.md) |
| Feature deep-dives | [`features/`](./features/) |
| Scene codes + naming | [`features/scene-codes.md`](./features/scene-codes.md), [`features/naming-conventions.md`](./features/naming-conventions.md) |
| Video gen test results | [`video-gen-test-log.md`](./video-gen-test-log.md) |
| Creative: scene beats | [`../scenes/`](../scenes/) |
| Creative: shot list / timeline | [`../shot-list.md`](../shot-list.md) |
| Creative: style bible | [`../00-style-bible.md`](../00-style-bible.md) |
| Creative: data-embedding matrix | [`../01-data-embedding-matrix.md`](../01-data-embedding-matrix.md) |
| In-flight production plan | [`../PLAN-s1-hud-standardization-and-skill-tree.md`](../PLAN-s1-hud-standardization-and-skill-tree.md) |
| Animation/ad quality strategy | [`../animation-ad-quality-options.md`](../animation-ad-quality-options.md) |
