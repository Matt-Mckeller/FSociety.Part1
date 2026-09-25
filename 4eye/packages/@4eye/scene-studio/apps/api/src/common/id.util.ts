import { createHash } from 'node:crypto';

/** Stable, deterministic id derived from the original filename. */
export function assetIdFromFilename(filename: string): string {
  return createHash('sha1').update(filename).digest('hex').slice(0, 16);
}
