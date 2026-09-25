# Classroom Gallery

Local-first app to **generate**, **browse**, **AI-edit**, and **animate** the *Classroom of Tomorrow* scene images.

> ⏸ **Paused / picking this back up?** Start with **[docs/REBUILD-AND-HANDOFF.md](docs/REBUILD-AND-HANDOFF.md)** — core concepts, goals, status, and the plan to rebuild into the 4eye project.

## Quick start

```bash
cp .env.example .env
# Set GALLERY_ROOT and GOOGLE_API_KEY at minimum

pnpm install
pnpm dev              # api → :4000, web → :5173
```

Open <http://127.0.0.1:5173>.

## Primary workflows

1. **Browse** — view, star, tag, and reorder the gallery
2. **Generate** — run seed files to produce new images via Gemini
3. **Edit** — AI-edit any existing image (single-image surgical edits via the `generate` seed pattern)
4. **Animate** — pick 2 images → generate video (Veo or Runway)
5. **Sequence** — arrange frames into ordered named sequences

📖 See **[docs/features/](docs/features/)** for what each capability does and how it's wired (including the **[star / auto-star concept](docs/features/sequences.md#the-star-concept)** and [scene codes](docs/features/scene-codes.md)). See [docs/workflows.md](docs/workflows.md) for step-by-step recipes.

## Monorepo layout

```
gallery-app/
├── apps/
│   ├── api/              NestJS 10 + TypeORM backend  (port 4000)
│   │   └── src/
│   │       ├── seeds/    *.seed.ts generation definitions
│   │       ├── cli/      CLI entry-point (see CLI reference below)
│   │       ├── generate/ Gemini / OpenAI image generation service
│   │       ├── library/  Asset CRUD + SQLite persistence
│   │       ├── sequences/Sequence CRUD
│   │       ├── validate/ AI-graded asset quality checks
│   │       ├── actions/  HTTP endpoints (browse, edit, animate, chat)
│   │       └── ...
│   └── web/              React + Vite frontend  (port 5173)
└── packages/
    └── shared/           Zod schemas + TypeScript types (api ↔ web)
```

The SQLite database (`library.db`) and JSON export (`library.export.json`) live **inside the gallery folder** (`GALLERY_ROOT`) so metadata travels with the assets and is git-friendly.

## Asset folder layout (`GALLERY_ROOT/`)

```
00_reference/           Character and style reference sheets
01_scene_keyframes/     Canonical accepted keyframes   (starred = true)
02_s1c_gift_sequence/   Gift-beat specific sequence frames
03_alternates_and_iterations/  Kept but demoted variations (starred = false)
04_gallery/             Misc curated exports
05_videos/              Generated videos
06_edits/               Saved edit outputs
07_generated/           Raw model output awaiting triage (transient)
.thumbs/                Generated thumbnails (auto, not in git)
library.db              SQLite asset catalogue
library.export.json     JSON mirror of the catalogue
```

**Rule:** promote from `07_generated/` to a permanent folder using `asset:promote`; never commit starred assets in `07_generated/`.

## Models

| Env var               | Default                               | Used for          |
| --------------------- | ------------------------------------- | ----------------- |
| `GEMINI_IMAGE_MODEL`  | `gemini-3.1-flash-image-preview`      | Default image gen |
| `GEMINI_IMAGE_MODEL`  | `gemini-3.1-pro-image-preview` (Pro)  | Override per seed |
| `VEO_MODEL`           | `veo-3.1-generate-preview`            | Video             |
| `OPENAI_IMAGE_MODEL`  | `gpt-image-2`                         | Fallback image    |
| `RUNWAY_VIDEO_MODEL`  | `gen4_turbo`                          | Fallback video    |

Pro model tip: use `--variations 1` to avoid timeouts (`--variations 2` is the safe max).

`GET /api/health/models` validates all configured model strings on boot.

## CLI reference

All commands run via:

```bash
pnpm -F @4eye/scene-studio-api cli <command> [args] [flags]
# or from apps/api/:
pnpm cli <command>
```

### Seed commands

```bash
cli seed:list
cli seed:show <id>
cli seed:run <id> [--dry-run] [--variations N] [--model NAME] [--verbose]
```

### Generation log

```bash
cli gen:log [--kind generate] [--status ok|error] [--scene S1-C] [--seed <id>] [--limit N]
cli gen:show <logId>
cli gen:replay <logId> [--variations N] [--model NAME]
```

### Sequence management

```bash
cli seq:list
cli seq:show <slug|id>
cli seq:insert <slug> <assetId> [--at N]      # default: append
cli seq:replace <slug> <oldAssetId> <newAssetId>
```

### Asset management

```bash
cli asset:promote <id> --to <folder> [--star] [--scene-code CODE]
cli asset:demote  <id> --to <folder> [--unstar] [--scene-code CODE]
cli asset:test    <id> [--verbose]            # AI-grade against 4eye spec
```

### Models

```bash
cli model:list [--kind image|text|video] [--filter SUBSTR] [--refresh]
```

### Health

```bash
cli doctor        # checks: file existence, starred-in-07_generated, dup sceneCode, sequence integrity
```

See [docs/architecture.md](docs/architecture.md) for DB schema, module map, and seed reference system.
See [docs/seed-cookbook.md](docs/seed-cookbook.md) for seed authoring examples.
