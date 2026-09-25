# Entity System — Core Architecture

> **Purpose:** The shared ECS Entity model that everything (PM, animation/video, Report, profiles, inventory) is built on — plus the **Tile system** that turns any entity into JSON and renders it through reusable display components.
> **Status:** Plan-only. Priority #3 (Entity System — Epics per Entity).
> **Build surface:** shared pure types in `@4eye/types/src/planning/`; logic/store in `4eye/apps/4eye-web-mockup/src/model/`; tiles in `src/Tiles/`.

> **Relationship to other plans:** the ECS base, traits, registry, and single Relationship edge are specified in [../command-center/README.md §2](../command-center/README.md). This doc owns the **Entity Tile system** and the **Epics-per-Entity** model; command-center applies them to PM.

---

## 1. Goal

- One thin `Entity` base + composable `Trait[]` + per-type registry (see command-center §2).
- **Every entity is renderable as a Tile** through a single serialize→display pipeline.
- **Epics per Entity:** any entity can own a hierarchy of work (epics → tasks) without bespoke types.
- Tiles + data are **reused across surfaces** — the website Projects page and the in-app planning tile render the *same* entity components from the *same* data.

---

## 2. Entity Tile System (NEW)

The core idea: a **Tile is a view over an Entity**, produced by a transform, not a hand-built one-off.

### 2.1 Pipeline — Entity → JSON → Component
```
Entity (+ traits)  →  toTileJSON(entity, viewMode)  →  TileSpec (JSON)  →  <TileRenderer>  →  one of N display components
```
- **`TileSpec` (JSON):** a serializable description of what to show — `type`, `entityId`, `layout`, `slots` (fields/sections), `actions`, `viewMode`. Pure data, no React.
- **`<TileRenderer>`:** reads a `TileSpec` and dispatches to a **registry of display components** keyed by `TileSpec.type`/entity type. Adding a new look = register a new component, not new plumbing.
- **Why JSON in the middle:** tiles become storable, AI-generatable, server-sendable, and swappable between display components without changing the entity.

### 2.2 Tile Types (the "many components" the spec feeds)
A registry maps a tile `type` → a display component. Initial set (extend over time):

| Tile type | Renders as | Notes |
| --- | --- | --- |
| `summary` | compact HUD card (seeding-style) | default for most entities |
| `detail` | full Inspector/Focus modal body | reuses the reusable full-screen modal |
| `metric` | WeightMeter / DepthDots / StatusBadge | from seeding `components/visuals.tsx` |
| `list` | child-entity list (epics, tasks) | for Epics-per-Entity |
| `graph` | relationship/timeline view | react-flow / Cytoscape over the edge table |
| **`generated`** | **prompt-generated component** | see §2.3 |
| `variant:*` | registered variants of the above | per entity type / viewMode |

### 2.3 Prompt-Generated Tile (NEW)
A tile type that **builds itself from a prompt**.
- The prompt → an **AI step** → emits a `TileSpec` (JSON) **and/or** a small component body.
- That output is injected into a **reusable template TypeScript component** (a sandboxed `GeneratedTile` wrapper) which is then placed on the page like any other tile.
- **Constraints (security):** generated output is **data-first** (a `TileSpec`), not arbitrary executed code, wherever possible. If a code body is generated, it renders inside a constrained template with an allow-listed component/prop set — **no `eval`, no raw HTML injection**. Treat all generated content as untrusted input.
- **Reuse:** ties directly into the AI Chat **Create** sub-view (see [../ai-chat/](../ai-chat/README.md) once authored) — "create a tile to show X" produces a `TileSpec`.

### 2.4 Variants
Other tile types are **variants** of the base components above — same `TileSpec` shape, different display component selected by `type`/`viewMode`/entity-type. Variants register into the same component registry; no new pipeline.

---

## 3. Epics per Entity

- Any entity can carry a **work hierarchy** via the `GoalDirectedTrait` + child `WorkEntity` relationships (single Relationship edge, `relationType: 'epic-of' | 'task-of'`).
- An "Epic" is not a new class — it's a `WorkEntity` whose children are tasks, attached to a parent entity of any type.
- Rendered through the `list` tile type; deep-dives open the `detail` tile (Inspector).

---

## 4. Cross-Surface Reuse (Website ↔ App)

The same entity components + data render in **two surfaces**:

| Surface | Where | What shows |
| --- | --- | --- |
| **Website** | the **Projects page** (the page to the **left of Home**) | Projects rendered from entity data via the Tile system |
| **App** | a **Planning tile** on the app page | same components + same data, in-HUD |

- Single data source (entity store) → both surfaces import the same Tile components.
- The website Projects page and the app planning tile are **two consumers of one `<TileRenderer>` + registry**, differing only by layout container.
- See command-center plan §3.5 for the PM/projects specifics.

> **Open question:** confirm the exact website route "left of Home" (Projects). Capture the real path during execution.

---

## 5. Implementation Order

1. Define `TileSpec` JSON shape in `@4eye/types/src/planning/tile.ts`.
2. `toTileJSON(entity, viewMode)` serializer in `src/model/`.
3. `<TileRenderer>` + component registry (start with `summary`, `detail`, `metric`, `list`).
4. Add `graph` (react-flow) and `generated` tiles.
5. Wire the **website Projects page** + **app Planning tile** to the same registry.
6. Connect `generated` tile to AI Chat **Create** sub-view.

---

## 6. Open Questions

- `generated` tile: data-only `TileSpec` vs allowing a constrained code body? (Lean: data-only first.)
- Where does the component registry live — `@expanse/hud`, `@expanse/ui`, or tile-local until stable? (Lean: tile-local, promote later — matches command-center §1.5.)
- Confirm the website Projects route + the app page that hosts the Planning tile.

---

## 7. Source Map

- ECS base / traits / registry / Relationship edge → [../command-center/README.md §2](../command-center/README.md)
- Entity vision + lenses + click-actions → [../../_current.md §1–2](../../_current.md)
