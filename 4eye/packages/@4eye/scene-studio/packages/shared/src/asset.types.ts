import { z } from 'zod';

// ────────────────────────────────────────────────────────────
//  ASSET — the one thing that lives in the library
// ────────────────────────────────────────────────────────────

export const AssetKind = z.enum(['image', 'video']);
export type AssetKind = z.infer<typeof AssetKind>;

export const AssetSource = z.enum(['imported', 'edit', 'animation', 'generate', 'frame-extract']);
export type AssetSource = z.infer<typeof AssetSource>;

// ── 1. FILE — bytes on disk
export const FileInfo = z.object({
  folder: z.string(),
  filename: z.string(),
  mimeType: z.string(),
  sizeBytes: z.number().int().nonnegative().optional(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});
export type FileInfo = z.infer<typeof FileInfo>;

// ── 2. DISPLAY — what the user sees
export const DisplayInfo = z.object({
  title: z.string(),
  description: z.string().default(''),
  sceneCode: z.string().optional(),
});
export type DisplayInfo = z.infer<typeof DisplayInfo>;

// ── 3. CATALOG — how it's organized
export const CatalogInfo = z.object({
  order: z.number(),
  tags: z.array(z.string()).default([]),
  starred: z.boolean().default(false),
});
export type CatalogInfo = z.infer<typeof CatalogInfo>;

// ── 4. ORIGIN — where it came from
export const OriginInfo = z.object({
  source: AssetSource,
  parentIds: z.array(z.string()).default([]),
  prompt: z.string().optional(),
  model: z.string().optional(),
  jobId: z.string().optional(),
});
export type OriginInfo = z.infer<typeof OriginInfo>;

// ── 5. VIDEO-ONLY EXTRA (only present when kind === 'video')
export const VideoInfo = z.object({
  durationSec: z.number().positive(),
  fps: z.number().positive().optional(),
  posterFilename: z.string().optional(),
  startAssetId: z.string(),
});
export type VideoInfo = z.infer<typeof VideoInfo>;

// ── 6. HISTORY — one entry per revision of this asset
export const AssetHistoryEntry = z.object({
  filename: z.string(),
  prompt: z.string().optional(),
  model: z.string().optional(),
  createdAt: z.string().datetime(),
});
export type AssetHistoryEntry = z.infer<typeof AssetHistoryEntry>;

// ── ASSET (composed)
export const Asset = z.object({
  id: z.string(),
  kind: AssetKind,
  file: FileInfo,
  display: DisplayInfo,
  catalog: CatalogInfo,
  origin: OriginInfo,
  video: VideoInfo.optional(),
  history: z.array(AssetHistoryEntry).default([]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Asset = z.infer<typeof Asset>;
