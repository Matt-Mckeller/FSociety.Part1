# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Dev commands

```bash
pnpm dev              # api → :4000, web → :7145 (ports from .env)
pnpm build            # build all packages
pnpm typecheck        # typecheck all packages

# Run from repo root via filter, or cd apps/api first
pnpm -F @4eye/scene-studio-api cli <command>
```

`.env` is required — copy `.env.example` and set `GALLERY_ROOT` (absolute path to the images folder) and at minimum one AI key (`GOOGLE_API_KEY`).

## CLI reference (production workflows)

```bash
cli seed:list
cli seed:run <id> [--dry-run] [--variations N] [--model NAME]
cli gen:log [--kind generate] [--status ok|error] [--limit N]
cli gen:replay <logId>
cli seq:list / seq:show <slug> / seq:insert <slug> <assetId>
cli asset:promote <id> --to <folder> [--star]
cli asset:test <id>       # AI-grade against 4eye spec
cli doctor                # integrity check
```

## Architecture

**Monorepo:** `apps/api` (NestJS 10 + TypeORM + SQLite), `apps/web` (React + Vite), `packages/shared` (Zod schemas shared by both).

**Storage:** SQLite DB and JSON export live *inside* `GALLERY_ROOT/` so assets and metadata travel together. Full path = `GALLERY_ROOT/folder/filename`. Numbered folders `00_reference`…`07_generated` define the asset lifecycle — `07_generated` is transient, promote assets out via `asset:promote`.

**Seed system** (`apps/api/src/seeds/`): each `.seed.ts` default-exports `defineSeed({...})`. The seed registry auto-discovers them at runtime. Seeds declare references (image selectors + markdown text blocks) which the ref-resolver expands before calling the provider. Ref selectors: `assetId:<id>`, `sceneCode:<code>`, `slug:<seqSlug>`, `tag:<tag>[:starred]`, `file:<path>` (text ref, relative to `PLANS_ROOT`). Every model call is appended to `generation_log` and can be replayed.

**Edit-via-generate:** there is no `kind:'edit'`. Surgical edits use `kind:'generate'` with a single hard-pinned `assetId:` ref and a prompt saying "keep everything else identical."

**Character-lock pattern:** always include `{ kind:'image', ref:'tag:4eye-reference:starred', role:'character-lock' }` as the first reference in scene-generation seeds to pin 4eye's visual identity.

**Provider selection:** `IMAGE_GENERATE_PROVIDER`, `IMAGE_EDIT_PROVIDER`, `ANIMATE_PROVIDER` in `.env` — each accepts `gemini | openai | fake | auto`. `auto` prefers google → openai/runway → fake based on which keys are present.

**WebSocket:** `WsGateway` broadcasts `library:changed`, `sequence:changed`, `generation:started/done` on every mutation. The web UI subscribes on mount.

**Veo note:** single image → video; prompt should describe the *end state* (no dual-frame interpolation).

## Key types (packages/shared)

- `Asset` — the main DTO; `kind: 'image'|'video'`; `video?: VideoInfo` only present on videos
- `VideoInfo` — `{ durationSec, fps?, posterFilename?, startAssetId }`
- `SeedDefinition` — full type in `apps/api/src/seeds/seed.kit.ts`

## Ports

Configured via `.env`: `API_PORT` (default 4000), `WEB_PORT` (default 7145). Vite proxies `/api` and `/ws` to the API.
