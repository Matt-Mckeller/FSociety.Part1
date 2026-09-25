/**
 * Shared utilities for building deterministic asset filenames.
 *
 * Pattern: <sceneCode>_<titleSlug>_<YYYYMMDD-HHMMSS>[_<variant>]_<hash8>.<ext>
 */

/** Build a YYYYMMDD-HHMMSS timestamp string from the given Date (default: now). */
export function buildTimestampString(date: Date = new Date()): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}${p(date.getMonth() + 1)}${p(date.getDate())}-${p(date.getHours())}${p(date.getMinutes())}${p(date.getSeconds())}`;
}

export interface AssetFilenameOpts {
  /** Human-readable title used to build the slug (e.g. asset.display.title). */
  title: string;
  /** Optional scene-code prefix (e.g. asset.display.sceneCode). */
  sceneCode?: string | null;
  /** File extension WITHOUT leading dot, e.g. 'png', 'mp4', 'jpg'. */
  extension: string;
  /** Pre-computed content hash (8 hex chars). */
  contentHash: string;
  /** Optional timestamp string (YYYYMMDD-HHMMSS). Defaults to buildTimestampString(). */
  tsStr?: string;
  /** Optional variant suffix such as 'v2'. Prepended before contentHash if provided. */
  variant?: string;
}

/**
 * Build a readable, deterministic filename for a generated asset.
 *
 * Example: `s1_my-title_20241201-143022_v2_a1b2c3d4.png`
 */
export function buildAssetFilename(opts: AssetFilenameOpts): string {
  const { title, sceneCode, extension, contentHash, variant } = opts;
  const tsStr = opts.tsStr ?? buildTimestampString();

  const scPrefix = (sceneCode ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 8);

  const titleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50) || 'generated';

  const readableBase = scPrefix ? `${scPrefix}_${titleSlug}` : titleSlug;
  const variantSuffix = variant ? `_${variant}` : '';

  return `${readableBase}_${tsStr}${variantSuffix}_${contentHash}.${extension}`;
}
