/**
 * Merge catalog defaults with persisted entities by id.
 *
 * - Catalog order is preserved for known ids.
 * - Saved edits to a known id win over the catalog row.
 * - User-created entities (ids not in defaults) are appended.
 * - Missing catalog rows are filled in so expanding defaults
 *   reaches returning sessions without wiping custom data.
 */
export function mergeEntitiesById<T extends { id: string }>(
  defaults: T[],
  saved: T[],
): T[] {
  if (!saved.length) return defaults;

  const savedById = new Map(saved.map((entity) => [entity.id, entity]));
  const defaultIds = new Set(defaults.map((entity) => entity.id));

  const merged = defaults.map((entity) => savedById.get(entity.id) ?? entity);
  const extras = saved.filter((entity) => !defaultIds.has(entity.id));

  return [...merged, ...extras];
}
