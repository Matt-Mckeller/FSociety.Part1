/**
 * Model registry — single source of truth for the model names we use.
 *
 * `@google/genai` and `openai` deliberately take plain strings because catalogs
 * change weekly. We layer typed enums + a small "known good" set on top so:
 *   - seeds get IDE autocomplete instead of magic strings
 *   - typos are caught at compile time (when using the enum) or at runtime
 *     warn-only via `assertKnownModel` (when passing a string at the boundary,
 *     e.g. from `--model NAME` on the CLI)
 *   - `listLiveModels()` wraps `ai.models.list()` with on-disk caching for the
 *     `model:list` CLI + future startup validation
 *
 * NOTE: enums are intentionally OPEN — provider/seed fields accept
 * `ImageModel | string` so any new preview model can be passed without a code
 * change. The enum just gives ergonomics + a guard rail.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { loadConfig } from '../../config/config.service.js';
import { getGeminiClient } from './gemini-image-client.js';

// ── enums ──────────────────────────────────────────────────────────────────

/** Image generation / editing models. Use bare string for any not listed. */
export enum ImageModel {
  /** Gemini 3 Pro image preview — highest quality scene/character work. */
  GeminiProImagePreview = 'gemini-3-pro-image-preview',
  /** Gemini 3.1 Flash image preview — cheaper/faster, good default. */
  GeminiFlashImagePreview = 'gemini-3.1-flash-image-preview',
  /** Gemini 2.5 Flash image — stable Nano-Banana, cheapest. */
  GeminiFlashImageStable = 'gemini-2.5-flash-image',
  /** Imagen 4 standard — single-prompt only, no multi-ref editing. */
  ImagenGenerate = 'imagen-4.0-generate-001',
  /** Imagen 4 ultra — best quality single-prompt, slowest. */
  ImagenUltraGenerate = 'imagen-4.0-ultra-generate-001',
  /** Imagen 4 fast — quickest Imagen tier. */
  ImagenFastGenerate = 'imagen-4.0-fast-generate-001',
  /** OpenAI image model (provider default). */
  OpenAiImage = 'gpt-image-2',
  /** Test fixture — fake provider. */
  Fake = 'fake-image-model',
}

/** Text generation models. */
export enum TextModel {
  /** Gemini 3 Pro preview — long-context reasoning + planning. */
  GeminiProPreview = 'gemini-3-pro-preview',
  /** Gemini 3.1 Pro preview — newest pro tier. */
  Gemini31ProPreview = 'gemini-3.1-pro-preview',
  /** Gemini 3 Flash preview — fast tier. */
  GeminiFlashPreview = 'gemini-3-flash-preview',
  /** Gemini 3.5 Flash — stable fast tier. */
  Gemini35Flash = 'gemini-3.5-flash',
  /** Gemini 2.5 Pro — stable pro tier. */
  Gemini25Pro = 'gemini-2.5-pro',
  /** Gemini 2.5 Flash — stable fast tier. */
  Gemini25Flash = 'gemini-2.5-flash',
  /** OpenAI chat model (provider default). */
  OpenAiChat = 'gpt-5.5-pro',
}

/** Video generation models. */
export enum VideoModel {
  /** Veo 3.1 preview — image-to-video, multi-ref. */
  Veo31GeneratePreview = 'veo-3.1-generate-preview',
  /** Runway Gen-4 Turbo — fast image-to-video. */
  RunwayGen4Turbo = 'gen4_turbo',
}

// ── grouped known set ──────────────────────────────────────────────────────

export type ModelKind = 'image' | 'text' | 'video';

export interface KnownModelEntry {
  name: string;
  kind: ModelKind;
  provider: 'gemini' | 'openai' | 'runway' | 'fake';
}

/** Flat list of every known good model id. Order is purely cosmetic. */
export const KNOWN_MODELS: readonly KnownModelEntry[] = [
  // image — gemini
  { name: ImageModel.GeminiProImagePreview, kind: 'image', provider: 'gemini' },
  { name: ImageModel.GeminiFlashImagePreview, kind: 'image', provider: 'gemini' },
  { name: ImageModel.GeminiFlashImageStable, kind: 'image', provider: 'gemini' },
  { name: ImageModel.ImagenGenerate, kind: 'image', provider: 'gemini' },
  { name: ImageModel.ImagenUltraGenerate, kind: 'image', provider: 'gemini' },
  { name: ImageModel.ImagenFastGenerate, kind: 'image', provider: 'gemini' },
  // image — openai
  { name: ImageModel.OpenAiImage, kind: 'image', provider: 'openai' },
  // image — fake
  { name: ImageModel.Fake, kind: 'image', provider: 'fake' },
  // text — gemini
  { name: TextModel.GeminiProPreview, kind: 'text', provider: 'gemini' },
  { name: TextModel.Gemini31ProPreview, kind: 'text', provider: 'gemini' },
  { name: TextModel.GeminiFlashPreview, kind: 'text', provider: 'gemini' },
  { name: TextModel.Gemini35Flash, kind: 'text', provider: 'gemini' },
  { name: TextModel.Gemini25Pro, kind: 'text', provider: 'gemini' },
  { name: TextModel.Gemini25Flash, kind: 'text', provider: 'gemini' },
  // text — openai
  { name: TextModel.OpenAiChat, kind: 'text', provider: 'openai' },
  // video
  { name: VideoModel.Veo31GeneratePreview, kind: 'video', provider: 'gemini' },
  { name: VideoModel.RunwayGen4Turbo, kind: 'video', provider: 'runway' },
] as const;

/** Return true if `name` matches a model in `KNOWN_MODELS` (optionally filtered by kind). */
export function isKnownModel(name: string, kind?: ModelKind): boolean {
  return KNOWN_MODELS.some((m) => m.name === name && (!kind || m.kind === kind));
}

/**
 * Warn-only validator. Emits a console warning when `name` isn't in the known
 * set. Use this at boundaries that accept arbitrary strings (CLI `--model`,
 * seed `params.model`, replay overrides). Does NOT throw — new preview models
 * appear constantly and we don't want a typo'd-but-real model to block a run.
 */
export function assertKnownModel(name: string, kind?: ModelKind): void {
  if (isKnownModel(name, kind)) return;
  const kindLabel = kind ? `${kind} ` : '';
  // eslint-disable-next-line no-console
  console.warn(
    `[model-registry] Unknown ${kindLabel}model "${name}". ` +
      `If this is a real new model, add it to KNOWN_MODELS. ` +
      `If it's a typo, run \`pnpm cli model:list\` to see live names.`,
  );
}

// ── live catalog (cached) ──────────────────────────────────────────────────

export interface LiveModel {
  name: string;
  displayName?: string;
  supportedActions?: string[];
}

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h
let memCache: { fetchedAt: number; models: LiveModel[] } | null = null;

function cacheFilePath(): string {
  return join(loadConfig().galleryRoot, '.cache', 'models.json');
}

function readDiskCache(): { fetchedAt: number; models: LiveModel[] } | null {
  try {
    const p = cacheFilePath();
    if (!existsSync(p)) return null;
    const raw = JSON.parse(readFileSync(p, 'utf8')) as { fetchedAt: number; models: LiveModel[] };
    return raw;
  } catch {
    return null;
  }
}

function writeDiskCache(payload: { fetchedAt: number; models: LiveModel[] }): void {
  const p = cacheFilePath();
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, JSON.stringify(payload, null, 2));
}

/**
 * Fetch the live Gemini model catalog (cached on disk for 24h). Pass
 * `{ refresh: true }` to force a refetch.
 */
export async function listLiveModels(opts: { refresh?: boolean } = {}): Promise<LiveModel[]> {
  if (!opts.refresh) {
    if (memCache && Date.now() - memCache.fetchedAt < CACHE_TTL_MS) return memCache.models;
    const disk = readDiskCache();
    if (disk && Date.now() - disk.fetchedAt < CACHE_TTL_MS) {
      memCache = disk;
      return disk.models;
    }
  }

  const ai = getGeminiClient();
  const pager = await ai.models.list();
  const models: LiveModel[] = [];
  for await (const m of pager) {
    if (!m.name) continue;
    models.push({
      name: m.name.replace(/^models\//, ''),
      displayName: m.displayName,
      supportedActions: m.supportedActions,
    });
  }
  const payload = { fetchedAt: Date.now(), models };
  memCache = payload;
  try {
    writeDiskCache(payload);
  } catch {
    /* cache write is best-effort */
  }
  return models;
}
