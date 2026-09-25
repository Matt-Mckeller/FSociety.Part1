import { useMemo } from 'react';
import type { Asset } from '@4eye/scene-studio-shared';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.js';
import { setRightPanel, openLightbox } from '../../../store/ui.slice.js';
import { useGetLibraryQuery } from '../../../store/api.js';
import { useAssetPatch } from '../hooks/useAssetPatch.js';
import { DetailDisplay } from './detail/DetailDisplay.js';
import { DetailCatalog } from './detail/DetailCatalog.js';
import { DetailOrigin } from './detail/DetailOrigin.js';
import { DetailFile } from './detail/DetailFile.js';
import { DetailHistory } from './detail/DetailHistory.js';

export function DetailPanel() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((s) => s.ui.rightPanel === 'detail');
  const selectedIds = useAppSelector((s) => s.selection.selectedIds);
  const { data } = useGetLibraryQuery();

  const active: Asset | null = useMemo(() => {
    if (!data || selectedIds.length === 0) return null;
    const id = selectedIds[selectedIds.length - 1];
    return data.assets.find((a) => a.id === id) ?? null;
  }, [data, selectedIds]);

  const patch = useAssetPatch(active);

  if (!open) return null;

  return (
    <aside className="w-96 shrink-0 border-l border-neutral-200 bg-white overflow-y-auto">
      <header className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 sticky top-0 bg-white z-10">
        <h2 className="font-semibold text-sm">Detail</h2>
        <button
          type="button"
          onClick={() => dispatch(setRightPanel(null))}
          className="text-neutral-500 hover:text-neutral-900 text-lg leading-none"
          aria-label="Close detail panel"
        >
          ×
        </button>
      </header>

      {!active ? (
        <div className="p-6 text-sm text-neutral-500">Select an asset to view details.</div>
      ) : (
        <div className="p-4 space-y-5">
          <div className="relative aspect-[16/9] bg-neutral-100 rounded overflow-hidden">
            {active.kind === 'video' ? (
              <>
                <video
                  key={active.id}
                  controls
                  preload="metadata"
                  src={`/api/files/${active.id}`}
                  poster={
                    active.video?.startAssetId
                      ? `/api/thumbs/${active.video.startAssetId}?w=1024`
                      : undefined
                  }
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  title="Open fullscreen"
                  onClick={() => dispatch(openLightbox(active.id))}
                  className="absolute top-2 right-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded px-1.5 py-0.5 text-xs leading-none"
                  aria-label="Open fullscreen"
                >
                  ⛶
                </button>
              </>
            ) : (
              <img
                src={`/api/thumbs/${active.id}?w=1024`}
                alt={active.display.title}
                className="w-full h-full object-contain"
              />
            )}
          </div>

          <DetailDisplay asset={active} patch={patch} />
          <DetailCatalog asset={active} patch={patch} />
          <DetailOrigin asset={active} />
          <DetailFile asset={active} />
          <DetailHistory asset={active} />

          <div className="text-[10px] text-neutral-400 font-mono">id: {active.id}</div>
        </div>
      )}
    </aside>
  );
}
