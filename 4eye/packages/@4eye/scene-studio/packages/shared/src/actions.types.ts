import { z } from 'zod';
import { Asset, DisplayInfo, CatalogInfo } from './asset.types.js';

// ════════════════════════════════════════════════════════════
//  ACTION 1: BROWSE — view, label, reorder, tag, organize
// ════════════════════════════════════════════════════════════
export namespace Browse {
  export const UpdateAssetDto = z
    .object({
      display: DisplayInfo.partial().optional(),
      catalog: CatalogInfo.partial().optional(),
    })
    .strict();
  export type UpdateAssetDto = z.infer<typeof UpdateAssetDto>;

  export const ReorderDto = z.object({
    orders: z.record(z.string(), z.number()),
  });
  export type ReorderDto = z.infer<typeof ReorderDto>;

  export const BulkTagDto = z.object({
    assetIds: z.array(z.string()).min(1),
    add: z.array(z.string()).default([]),
    remove: z.array(z.string()).default([]),
  });
  export type BulkTagDto = z.infer<typeof BulkTagDto>;
}

// ════════════════════════════════════════════════════════════
//  ACTION 2: EDIT — AI-edit one image (OpenAI gpt-image-2)
// ════════════════════════════════════════════════════════════
export namespace Edit {
  export const RequestDto = z.object({
    sourceAssetId: z.string(),
    prompt: z.string().min(1),
    maskBase64: z.string().optional(),
    size: z.enum(['1024x1024', '1536x1024', '1024x1536', 'auto']).default('auto'),
    variations: z.number().int().min(1).max(4).default(1),
    model: z.string().optional(),
  });
  export type RequestDto = z.infer<typeof RequestDto>;

  export const Progress = z.object({
    sourceAssetId: z.string(),
    stage: z.enum(['queued', 'generating', 'saving', 'done', 'failed']),
    percent: z.number().min(0).max(1).optional(),
    message: z.string().optional(),
    newAssets: z.array(Asset).optional(),
    error: z.string().optional(),
  });
  export type Progress = z.infer<typeof Progress>;
}

// ════════════════════════════════════════════════════════════
//  ACTION 3: ANIMATE — 1 image → video
// ════════════════════════════════════════════════════════════
export namespace Animate {
  export const RequestDto = z.object({
    startAssetId: z.string(),
    prompt: z.string().min(1),
    durationSec: z.number().min(2).max(10).default(5),
    model: z.string().optional(),
    /** Force a specific provider, overriding ANIMATE_PROVIDER env / auto-selection. */
    provider: z.enum(['veo', 'runway', 'fake']).optional(),
    /**
     * Up to 3 asset IDs used as Veo reference images (style/character lock).
     * Veo 3.1 only — ignored by Runway and fake providers.
     * When provided, Veo will enforce durationSec = 8.
     */
    referenceAssetIds: z.array(z.string()).max(3).optional(),
    /** Video aspect ratio. Default '16:9'. */
    aspectRatio: z.enum(['16:9', '9:16']).optional(),
    /**
     * Output resolution. '1080p' and '4k' require durationSec = 8.
     * Default '720p'.
     */
    resolution: z.enum(['720p', '1080p', '4k']).optional(),
  });
  export type RequestDto = z.infer<typeof RequestDto>;

  export const Progress = z.object({
    jobId: z.string(),
    status: z.enum(['queued', 'running', 'succeeded', 'failed', 'cancelled']),
    percent: z.number().min(0).max(1).optional(),
    message: z.string().optional(),
    asset: Asset.optional(),
    error: z.string().optional(),
  });
  export type Progress = z.infer<typeof Progress>;
}

// ════════════════════════════════════════════════════════════
//  ACTION 4: GENERATE — multi-reference image generation
//  (images + markdown context files → new image, OpenAI gpt-image-*)
// ════════════════════════════════════════════════════════════
export namespace Generate {
  /**
   * A markdown file passed as context. The file body (or a section / concept-row slice)
   * is wrapped in a `[CONTEXT]` block and prepended to the prompt.
   */
  export const FileRefDto = z.object({
    /** Path under PLANS_ROOT (e.g. `00-style-bible.md`, `scenes/scene-1-classroom.md`). */
    selector: z.string().min(1),
    /** Author label (e.g. `style-bible`, `scene-script`, `concept-matrix`). */
    role: z.string().optional(),
    /** Free-text description of why this reference is included. */
    description: z.string().optional(),
    /** Heading-text substring to slice on. */
    section: z.string().optional(),
    /** Matrix concept ids to extract (e.g. ['C03','C24']). */
    concepts: z.array(z.string()).optional(),
  });
  export type FileRefDto = z.infer<typeof FileRefDto>;

  /** Optional image-ref descriptor — lets the caller annotate why each image is included. */
  export const ImageRefDto = z.object({
    assetId: z.string().min(1),
    role: z.string().optional(),
    description: z.string().optional(),
  });
  export type ImageRefDto = z.infer<typeof ImageRefDto>;

  export const RequestDto = z.object({
    prompt: z.string().min(1),
    /** Plain ids — `referenceImages` takes precedence if both are given. */
    referenceAssetIds: z.array(z.string()).default([]),
    /** Annotated image refs. */
    referenceImages: z.array(ImageRefDto).optional(),
    /** Markdown context files. */
    referenceFiles: z.array(FileRefDto).default([]),
    size: z.enum(['1024x1024', '1536x1024', '1024x1536', 'auto']).default('auto'),
    variations: z.number().int().min(1).max(4).default(1),
    model: z.string().optional(),
    /** Optional override for the new asset's display title prefix. */
    title: z.string().optional(),
    /** Optional sceneCode to stamp on the new asset(s). */
    sceneCode: z.string().optional(),
    /** Optional tags applied to outputs (always also includes `generated`). */
    tags: z.array(z.string()).default([]),
    /** If set, each generated asset is appended into the sequence at `position` (or end). */
    insertIntoSequence: z
      .object({
        sequenceId: z.string(),
        position: z.number().int().min(0).optional(),
      })
      .optional(),
    /** Identifies the seed file when triggered via the seed runner. */
    seedId: z.string().optional(),
    /** Git sha at the moment the seed was run (recorded for replay provenance). */
    seedGitSha: z.string().optional(),
  });
  export type RequestDto = z.infer<typeof RequestDto>;

  export const Progress = z.object({
    jobId: z.string(),
    stage: z.enum(['queued', 'composing', 'generating', 'saving', 'done', 'failed']),
    percent: z.number().min(0).max(1).optional(),
    message: z.string().optional(),
    newAssets: z.array(Asset).optional(),
    error: z.string().optional(),
    logId: z.string().optional(),
  });
  export type Progress = z.infer<typeof Progress>;
}
