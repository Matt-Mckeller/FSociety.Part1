import { z } from 'zod';
import { Asset } from './asset.types.js';

/**
 * Unified log of every generation event (edit / generate / animate / seed run).
 *
 * Persisted in SQLite. Captures everything needed to:
 *   • audit what produced an asset
 *   • debug failed runs
 *   • replay a run with the exact same inputs
 */
export namespace Generation {
  export const Kind = z.enum(['edit', 'generate', 'animate']);
  export type Kind = z.infer<typeof Kind>;

  export const Status = z.enum(['running', 'succeeded', 'failed']);
  export type Status = z.infer<typeof Status>;

  /** Identifier for a single reference passed into the generation. */
  export const ReferenceResolved = z.object({
    /** Original ref selector as authored (e.g. `sceneCode:S1-A`, `file:00-style-bible.md`). */
    selector: z.string(),
    /** image = passed as image input. text = extracted markdown context block. */
    kind: z.enum(['image', 'text']),
    /** Author-supplied role label (e.g. `room-style`, `character`, `style-bible`). */
    role: z.string().optional(),
    /** Author-supplied description of what this reference is for. */
    description: z.string().optional(),
    /** For image refs: resolved asset id. */
    assetId: z.string().optional(),
    /** For text refs: resolved absolute file path. */
    filePath: z.string().optional(),
    /** For text refs: extracted section anchor, if any. */
    section: z.string().optional(),
    /** For text refs: character count of the extracted block. */
    charCount: z.number().int().nonnegative().optional(),
  });
  export type ReferenceResolved = z.infer<typeof ReferenceResolved>;

  export const Cost = z.object({
    estimatedUsd: z.number().optional(),
    inputTokens: z.number().int().optional(),
    outputImages: z.number().int().optional(),
    inputImages: z.number().int().optional(),
  });
  export type Cost = z.infer<typeof Cost>;

  export const Log = z.object({
    id: z.string(),
    createdAt: z.string().datetime(),
    finishedAt: z.string().datetime().nullable(),
    durationMs: z.number().int().nonnegative().nullable(),

    kind: Kind,
    status: Status,
    provider: z.string(),
    model: z.string(),

    /** Final composed prompt actually sent to the provider (after template + context block assembly). */
    prompt: z.string(),
    /** Original prompt body (before context-block prepending), if different. */
    promptBody: z.string().nullable(),

    /** Resolved references (assets + text files) used as inputs. */
    references: z.array(ReferenceResolved),

    /** Direct asset inputs (single source for edit, [start,end?] for animate). Empty for pure generate. */
    inputAssetIds: z.array(z.string()),

    /** Asset ids produced by this run. */
    outputAssetIds: z.array(z.string()),

    /** If the run targeted a sequence, the sequence id + frame ids appended. */
    targetSequenceId: z.string().nullable(),
    targetSequenceFrameIds: z.array(z.string()),

    /** Params used (size, variations, durationSec, etc.). */
    params: z.record(z.unknown()),

    /** Optional seed identification (when run via a seed file). */
    seedId: z.string().nullable(),
    seedGitSha: z.string().nullable(),
    /** Scene code copied from the input asset / seed for filtering. */
    sceneCode: z.string().nullable(),

    cost: Cost.nullable(),

    /** Provider job id (OpenAI doesn't expose one for image edit; Runway does). */
    providerJobId: z.string().nullable(),

    errorMessage: z.string().nullable(),

    /** Full request snapshot (sans binary payloads). For replay. */
    rawRequest: z.record(z.unknown()),
    /** Provider response metadata (sans binary). */
    rawResponseMeta: z.record(z.unknown()).nullable(),
  });
  export type Log = z.infer<typeof Log>;

  export const ListQueryDto = z.object({
    kind: Kind.optional(),
    status: Status.optional(),
    sceneCode: z.string().optional(),
    seedId: z.string().optional(),
    since: z.string().datetime().optional(),
    limit: z.coerce.number().int().min(1).max(500).default(50),
    offset: z.coerce.number().int().min(0).default(0),
  });
  export type ListQueryDto = z.infer<typeof ListQueryDto>;
}

/** Loose alias for downstream code. */
export type GenerationLog = Generation.Log;
export type GenerationReferenceResolved = Generation.ReferenceResolved;
