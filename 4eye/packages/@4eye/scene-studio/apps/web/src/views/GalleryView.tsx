import { useMemo } from 'react';
import type { Asset } from '@4eye/scene-studio-shared';
import { useGetLibraryQuery } from '../store/api.js';
import { GallerySection } from '../features/browse/components/GallerySection.js';

export function GalleryView() {
  const { data, isLoading, error } = useGetLibraryQuery();

  const groups = useMemo(() => groupByFolder(data?.assets ?? []), [data]);

  if (isLoading) {
    return <div className="p-8 text-neutral-500">Loading library…</div>;
  }
  if (error) {
    return (
      <div className="p-8 text-red-600">
        Failed to load library. Run <code className="bg-neutral-100 px-1">pnpm migrate</code> first?
      </div>
    );
  }
  if (!data || data.assets.length === 0) {
    return (
      <div className="p-8 text-neutral-500">
        No assets yet. Run <code className="bg-neutral-100 px-1">pnpm migrate</code> to import.
      </div>
    );
  }

  return (
    <div className="px-6 py-4 space-y-8">
      {groups.map(([folder, assets]) => (
        <GallerySection key={folder} folder={folder} assets={assets} />
      ))}
    </div>
  );
}

function groupByFolder(assets: Asset[]): Array<[string, Asset[]]> {
  const map = new Map<string, Asset[]>();
  for (const a of [...assets].sort((x, y) => x.catalog.order - y.catalog.order)) {
    const arr = map.get(a.file.folder) ?? [];
    arr.push(a);
    map.set(a.file.folder, arr);
  }
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
}
