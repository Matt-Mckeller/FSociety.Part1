# Architecture

## Module map

```
AppModule
├── ConfigModule          env vars → AppConfig (loadConfig())
├── TypeOrmModule         SQLite via GALLERY_ROOT/library.db
├── LibraryModule         AssetEntity CRUD, Library export/import
├── SequencesModule       SequenceEntity CRUD, frame management
├── GenerateModule        Image generation (Gemini / OpenAI / fake provider)
├── GenerationLogModule   Append-only generation log (GenerationLogEntity)
├── SeedsModule           Seed registry, ref-resolver, seed runner
├── ActionsModule         Orchestrated multi-step actions (animate, edit, chat)
├── ValidateModule        AI-graded asset quality tests (asset:test CLI)
├── MarkdownModule        markdown-loader used by ref-resolver for file: refs
├── FilesModule           File-serving middleware (thumbnails, originals)
├── PromptsModule         Saved prompt templates
├── HealthModule          /api/health/* endpoints incl. model validation
└── WsModule              WebSocket gateway for live library/sequence events
```

HTTP ports: api=4000, web=5173 (configurable via `API_PORT` / `WEB_PORT`).

---

## Database schema (SQLite — `GALLERY_ROOT/library.db`)

### `assets`

| Column         | Type    | Notes                                              |
| -------------- | ------- | -------------------------------------------------- |
| `id`           | TEXT PK | 16-char lowercase hex                              |
| `kind`         | TEXT    | `'image'` or `'video'`                             |
| `folder`       | TEXT    | Relative to `GALLERY_ROOT` (e.g. `01_scene_keyframes`) |
| `filename`     | TEXT    |                                                    |
| `mimeType`     | TEXT    |                                                    |
| `sizeBytes`    | INT?    |                                                    |
| `width`        | INT     |                                                    |
| `height`       | INT     |                                                    |
| `title`        | TEXT    |                                                    |
| `description`  | TEXT    |                                                    |
| `sceneCode`    | TEXT?   | e.g. `S1-A`, `S1-C-old1`                          |
| `order`        | REAL    | Sort order in browse view                          |
| `tagsJson`     | TEXT    | JSON `string[]`                                    |
| `starred`      | BOOL    | `1` = canonical/promoted; `0` = alternate/demoted |
| `source`       | TEXT    | `'generated'`, `'uploaded'`, `'imported'`          |
| `parentIdsJson`| TEXT    | JSON `string[]` — source asset IDs                 |
| `prompt`       | TEXT?   |                                                    |
| `model`        | TEXT?   |                                                    |
| `jobId`        | TEXT?   |                                                    |
| `videoJson`    | TEXT?   | JSON `VideoInfo` (null for images)                 |
| `createdAt`    | DATE    |                                                    |
| `updatedAt`    | DATE    |                                                    |

Full path on disk: `GALLERY_ROOT / folder / filename`.

### `sequences`

| Column          | Type    | Notes                          |
| --------------- | ------- | ------------------------------ |
| `id`            | TEXT PK | UUID                           |
| `name`          | TEXT    | Human name                     |
| `slug`          | TEXT    | Unique kebab-case identifier   |
| `sceneCode`     | TEXT    | e.g. `S1`                      |
| `description`   | TEXT    |                                |
| `frameIdsJson`  | TEXT    | JSON `string[]` of asset IDs   |
| `createdAt`     | DATE    |                                |
| `updatedAt`     | DATE    |                                |

Use `cli seq:insert` / `cli seq:replace` for safe frame edits — never hand-edit `frameIdsJson` in SQL directly.

### `asset_history`

Records the filename chain when an asset's file is replaced in-place (rename / promote). One asset → many history rows.

### `generation_log`

Append-only log of every model call. Columns include: `id` (UUID), `kind`, `status`, `sceneCode`, `seedId`, `model`, `prompt`, `promptBody`, `references` (JSON), `outputAssetIds` (JSON), `params` (JSON), `rawRequest` (JSON), `createdAt`.

Use `cli gen:log` and `cli gen:replay` to inspect and re-run.

---

## Seed system

Seeds are TypeScript files under `apps/api/src/seeds/**/*.seed.ts`. Each file default-exports the result of `defineSeed({ ... })`.

### Seed folders

| Folder        | Purpose                                              |
| ------------- | ---------------------------------------------------- |
| `scenes/`     | New keyframe generation (uses multiple anchors)      |
| `edits/`      | Surgical single-image edits (edit-via-generate)      |
| `references/` | Reference-sheet generation (character, pose grids)   |
| `smoke/`      | Smoke-test / development seeds                       |

### SeedDefinition fields

```ts
{
  id: string;          // stable kebab-case, used in CLI + gen logs
  description: string; // shown in seed:list
  kind: 'generate';    // only supported kind
  sceneCode?: string;  // stamped on output assets
  title?: string;      // output asset title prefix
  tags?: string[];     // added to all outputs
  references: SeedRef[];
  preconditions?: SeedPrecondition[];
  prompt: string;
  params?: { size?, variations?, model? };
  insertIntoSequence?: { slug?, sequenceId?, position? };
}
```

### Reference selectors

Image refs (resolve to a single asset ID):

| Selector                     | Resolution                                      |
| ---------------------------- | ----------------------------------------------- |
| `assetId:<id>`               | Hard-pinned to one specific asset               |
| `sceneCode:<code>`           | First asset with that sceneCode (starred first) |
| `slug:<seqSlug>`             | First frame of the named sequence               |
| `tag:<tag>`                  | Must match exactly one asset                    |
| `tag:<tag>:starred`          | Must match exactly one starred asset            |

Text refs (resolve to markdown content, prepended as `[CONTEXT]` blocks):

| Selector                     | Resolution                                      |
| ---------------------------- | ----------------------------------------------- |
| `file:<path>`                | Markdown file relative to `PLANS_ROOT`          |

Text refs support `section:` (heading slice) and `concepts:` (matrix row extraction) options.

### Edit-via-generate pattern

Surgical edits (change one thing in an existing image) use `kind: 'generate'` with a **single image ref** pinned via `assetId:` and a prompt that says "keep everything else identical". This reliably produces local edits while preserving the rest of the scene. There is no separate `kind: 'edit'`.

### Character-lock pattern

```ts
references: [
  { kind: 'image', ref: 'tag:4eye-reference:starred', role: 'character-lock', required: true },
  { kind: 'image', ref: 'assetId:<source>', role: 'edit-source', required: true },
]
```

The `tag:4eye-reference:starred` selector resolves to the single starred asset tagged `4eye-reference`. The runner passes it as a first image input so the model uses it for visual fidelity, not as content to be reproduced verbatim.

---

## Provider selection

| Env var                    | Values                          | Default  |
| -------------------------- | ------------------------------- | -------- |
| `IMAGE_GENERATE_PROVIDER`  | `gemini`, `openai`, `fake`, `auto` | `auto` |
| `IMAGE_EDIT_PROVIDER`      | `gemini`, `openai`, `fake`, `auto` | `auto` |
| `ANIMATE_PROVIDER`         | `veo`, `runway`, `fake`, `auto`    | `auto` |

`auto` = prefer google > openai/runway > fake (whichever key is present).

---

## WebSocket events

The API broadcasts via `WsGateway` on every library/sequence mutation:

| Event                | Payload              |
| -------------------- | -------------------- |
| `library:changed`    | `{ assetIds: string[] }` |
| `sequence:changed`   | `{ sequence: Sequence }` |
| `sequence:removed`   | `{ id: string }` |
| `generation:started` | `{ logId, seedId? }` |
| `generation:done`    | `{ logId, assetIds }` |
