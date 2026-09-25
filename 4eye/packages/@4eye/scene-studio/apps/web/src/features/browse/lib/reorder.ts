import type { Asset } from '@4eye/scene-studio-shared';

/**
 * Compute new order values for a drag-reorder.
 *
 * Given the *new* visual sequence of assets within a group, assign each
 * a numeric `order` that places it correctly amongst its neighbours in
 * the full library — using midpoint between neighbours so we never have
 * to renumber everything.
 *
 * Returns a sparse map { assetId -> newOrder } containing only those
 * assets whose order actually needs to change.
 */
export function computeReorder(
  sequence: Asset[],
  movedId: string,
  newIndex: number,
): Record<string, number> {
  const before = sequence[newIndex - 1];
  const after = sequence[newIndex + 1];

  let next: number;
  if (!before && after) {
    next = after.catalog.order - 1;
  } else if (before && !after) {
    next = before.catalog.order + 1;
  } else if (before && after) {
    next = (before.catalog.order + after.catalog.order) / 2;
  } else {
    next = 0;
  }

  // Detect collision (no room between neighbours) → fall back to full renumber
  if (
    before && after &&
    Math.abs(before.catalog.order - after.catalog.order) < 0.0001
  ) {
    return renumberAll(sequence);
  }

  return { [movedId]: next };
}

function renumberAll(sequence: Asset[]): Record<string, number> {
  const out: Record<string, number> = {};
  sequence.forEach((a, i) => {
    out[a.id] = i * 100;
  });
  return out;
}
