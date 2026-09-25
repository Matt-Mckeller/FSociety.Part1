import { useMemo } from 'react';
import type { Asset } from '@4eye/scene-studio-shared';
import { useGetLibraryQuery } from '../../../store/api.js';

/** Wraps useGetLibraryQuery and provides a memoized assetById Map for O(1) lookups. */
export function useAssetLibrary() {
  const query = useGetLibraryQuery();

  const assetById = useMemo(() => {
    const m = new Map<string, Asset>();
    for (const a of query.data?.assets ?? []) m.set(a.id, a);
    return m;
  }, [query.data]);

  return { ...query, assetById };
}
