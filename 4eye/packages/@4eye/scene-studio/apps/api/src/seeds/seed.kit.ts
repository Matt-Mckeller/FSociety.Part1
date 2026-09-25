/**
 * Seed kit — author-facing API for declaring reproducible image generations.
 *
 * Each `.seed.ts` file under `apps/api/src/seeds/**` should default-export the result
 * of `defineSeed(...)`. The seed registry discovers these files at runtime; the seed
 * runner resolves their references and feeds them to `GenerateService`.
 */

import type { ImageModel, VideoModel } from '../common/providers/model-registry.js';

/** Re-exported so seeds can `import { ImageModel, VideoModel } from '../seed.kit.js'`. */
export { ImageModel, VideoModel } from '../common/providers/model-registry.js';

/** What kind of operation this seed runs. */
export type SeedKind = 'generate' | 'animate';

/**
 * A reference selector.
 *
 * Image refs (used as visual inputs to the model):
 *   - `assetId:<id>`         — hard pin to one asset
 *   - `sceneCode:<code>`     — first asset matching display.sceneCode (starred first)
 *   - `slug:<seqSlug>`       — first frame of the named sequence
 *   - `tag:<tag>`            — must match exactly one asset (or starred only with `:starred`)
 *
 * Text refs (markdown context blocks prepended to the prompt):
 *   - `file:<path>`          — markdown file path under PLANS_ROOT (or relative to seed dir)
 */
export type SeedRefSelector = string;

export interface SeedImageRef {
  kind: 'image';
  ref: SeedRefSelector;
  /** Author label (e.g. `room-style`, `character`). */
  role?: string;
  /** Free-text explanation of why this image is included. */
  description?: string;
  /** If true and the ref cannot be resolved, the seed run fails fast. Default true. */
  required?: boolean;
}

export interface SeedTextRef {
  kind: 'text';
  ref: SeedRefSelector;
  role?: string;
  description?: string;
  /** Heading-text substring to slice the markdown on. */
  section?: string;
  /** Concept ids to extract from a matrix table. */
  concepts?: string[];
  required?: boolean;
}

export type SeedRef = SeedImageRef | SeedTextRef;

export interface SeedPrecondition {
  /** A selector that must resolve. */
  ref: SeedRefSelector;
  /** When true, requires resolution to succeed; when false, requires it to fail. Default true. */
  exists?: boolean;
}

export interface SeedParams {
  size?: '1024x1024' | '1536x1024' | '1024x1536' | 'auto';
  variations?: number;
  /**
   * Model id. Prefer values from the `ImageModel` enum (re-exported above)
   * for IDE autocomplete + typo protection. Arbitrary strings are still
   * accepted so brand-new preview models can be passed without a code change;
   * the seed runner will emit a warn-only log via `assertKnownModel` when an
   * unrecognised string is used.
   */
  model?: ImageModel | string;
}

export interface SeedSequenceInsert {
  /** Sequence slug (preferred) or id. The runner resolves slug → id. */
  slug?: string;
  sequenceId?: string;
  /** 0-based insert position. Omit to append. */
  position?: number;
}

export interface SeedDefinition {
  /** Stable, unique id — used for log filtering, CLI invocation, and replays. */
  id: string;
  /** Human description shown in `seed:list` / UI. */
  description: string;
  kind: SeedKind;
  /** Scene code stamped on outputs (e.g. `S1-C`). */
  sceneCode?: string;
  /** Optional title prefix applied to generated assets. */
  title?: string;
  /** Tags added to every output (in addition to the default `generated`). */
  tags?: string[];
  /** Image + text references the seed depends on. Image refs become model inputs;
   *  text refs become `[CONTEXT]` blocks prepended to the prompt. */
  references: SeedRef[];
  /** Optional preconditions checked before the run (e.g. "the 4eye reference must exist"). */
  preconditions?: SeedPrecondition[];
  /** Prompt body (will be assembled with context blocks by the runner). */
  prompt: string;
  /** Generation params. */
  params?: SeedParams;
  /** If set, generated assets are appended into the sequence at `position`. */
  insertIntoSequence?: SeedSequenceInsert;
  /**
   * Optional prompt-template slug for tracking / UI display. Not used for prompt
   * assembly — the `prompt` field is the source of truth.
   */
  promptTemplateSlug?: string;
}

/**
 * A loaded seed = the author's definition + filesystem provenance the registry attaches.
 */
export interface LoadedSeed extends SeedDefinition {
  /** Absolute path to the `.seed.ts` file. */
  filePath: string;
  /** Relative path under apps/api/src/seeds. */
  relativePath: string;
}

/** Author-facing helper. Identity function with type narrowing for IDE help. */
export function defineSeed(def: SeedDefinition): SeedDefinition {
  return def;
}

// ── Animate seeds ─────────────────────────────────────────────────────────────

export interface AnimateSeedDefinition {
  /** Stable unique id — used for CLI invocation and log filtering. */
  id: string;
  /** Human description shown in `seed:list`. */
  description: string;
  kind: 'animate';
  sceneCode?: string;
  /** Ref selector for the start frame (e.g. `assetId:<id>` or `sceneCode:<code>`). */
  startRef: SeedRefSelector;
  /** Motion/transition prompt sent to the video provider. */
  prompt: string;
  /** Clip length in seconds. Provider-valid values: 4 / 6 / 8. Default 5 (rounded to 4).
   *  NOTE: forced to 8 automatically when referenceImages or resolution above 720p are set. */
  durationSec?: number;
  /**
   * Video model. Prefer values from the `VideoModel` enum (re-exported above)
   * for IDE autocomplete + typo protection. Arbitrary strings are still
   * accepted so brand-new preview models can be passed without a code change;
   * the CLI will emit a warn-only log via `assertKnownModel` when an
   * unrecognised string is used.
   */
  model?: VideoModel | string;
  /**
   * Reference images for Veo's character/style lock (up to 3).
   * These are sent alongside the start frame to preserve subject identity across frames.
   * Accepts the same ref selectors as image seeds (e.g. `tag:4eye-reference:starred`).
   * Veo 3.1 only — ignored by other providers.
   * When set, durationSec is automatically forced to 8.
   */
  references?: SeedImageRef[];
  /** Video aspect ratio. Default '16:9'. */
  aspectRatio?: '16:9' | '9:16';
  /**
   * Output resolution. '1080p' and '4k' require durationSec = 8.
   * Default '720p'.
   */
  resolution?: '720p' | '1080p' | '4k';
  /** If set, insert the generated video into this sequence. */
  insertIntoSequence?: SeedSequenceInsert;
}

/** Author-facing helper for animate seeds. */
export function defineAnimateSeed(def: AnimateSeedDefinition): AnimateSeedDefinition {
  return def;
}
