import { useMemo } from 'react';
import type { Asset } from '@4eye/scene-studio-shared';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.js';
import {
  clearSelection,
  select,
  setStartFrame,
} from '../../../store/selection.slice.js';
import { useGetLibraryQuery } from '../../../store/api.js';

export function SelectionTray() {
  const dispatch = useAppDispatch();
  const { selectedIds, startFrameId } = useAppSelector(
    (s) => s.selection,
  );
  const { data } = useGetLibraryQuery();

  const selectedAssets: Asset[] = useMemo(() => {
    if (!data) return [];
    const byId = new Map(data.assets.map((a) => [a.id, a]));
    return selectedIds
      .map((id) => byId.get(id))
      .filter((a): a is Asset => Boolean(a));
  }, [data, selectedIds]);

  if (selectedAssets.length === 0) return null;

  return (
    <div className="border-t border-neutral-200 bg-white px-6 py-2 flex items-center gap-3 overflow-x-auto">
      <span className="text-xs text-neutral-500 shrink-0 font-medium">
        Selection · {selectedAssets.length}
      </span>
      <div className="flex gap-2 shrink-0">
        {selectedAssets.map((a) => {
          const isStart = startFrameId === a.id;
          return (
            <div
              key={a.id}
              className="relative w-20 h-12 rounded overflow-hidden border border-neutral-200 shrink-0 group"
              title={a.display.title}
            >
              <img
                src={
                  a.kind === 'video' && a.video?.startAssetId
                    ? `/api/thumbs/${a.video.startAssetId}?w=160`
                    : `/api/thumbs/${a.id}?w=160`
                }
                alt={a.display.title}
                className="w-full h-full object-cover"
              />
              {isStart && (
                <span className="absolute top-0 left-0 text-[10px] px-1 bg-emerald-500 text-white">
                  START
                </span>
              )}
              <button
                type="button"
                onClick={() => dispatch(select({ id: a.id, mode: 'toggle' }))}
                className="absolute bottom-0 right-0 text-[10px] px-1 bg-black/60 text-white opacity-0 group-hover:opacity-100"
                aria-label="Remove from selection"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex-1" />
      <button
        type="button"
        onClick={() => dispatch(clearSelection())}
        className="text-xs text-neutral-500 hover:text-neutral-800 px-2 py-1 rounded hover:bg-neutral-100 shrink-0"
      >
        Clear
      </button>
    </div>
  );
}
