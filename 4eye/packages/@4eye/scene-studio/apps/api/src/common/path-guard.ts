import { resolve, sep } from 'node:path';

/**
 * Resolve `relative` against `root` and refuse anything outside `root`.
 * Returns the absolute resolved path on success, throws on traversal attempts.
 */
export function safeResolve(root: string, relative: string): string {
  const rootAbs = resolve(root) + sep;
  const target = resolve(root, relative);
  if (!(target + sep).startsWith(rootAbs) && target + sep !== rootAbs) {
    throw new Error(`Path traversal blocked: ${relative}`);
  }
  return target;
}
