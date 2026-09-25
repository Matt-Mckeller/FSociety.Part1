import { useMemo, useRef, useState } from 'react';
import type { Asset } from '@4eye/scene-studio-shared';
import { useAppDispatch } from '../../../store/hooks.js';
import { openLightbox } from '../../../store/ui.slice.js';

interface FramePickerProps {
  library: Asset[];
  excluded: string[];
  onPick: (assetId: string) => void;
}

// Human-readable short labels for known folders
function folderLabel(folder: string): string {
  const known: Record<string, string> = {
    '00_reference/': 'Refs',
    '01_scene_keyframes/': 'Keyframes',
    '03_alternates_and_iterations/': 'Alternates',
    '07_generated/': 'Generated',
  };
  return known[folder] ?? folder.replace(/\/$/, '').replace(/^\d+_/, '');
}

function chip(active: boolean) {
  return [
    'text-xs px-2 py-0.5 rounded-full border transition-colors whitespace-nowrap',
    active
      ? 'bg-neutral-900 text-white border-neutral-900'
      : 'bg-white text-neutral-600 border-neutral-300 hover:border-neutral-600',
  ].join(' ');
}

// 4-step thumb sizes: sm=100, md=150, lg=200, xl=260
const THUMB_SIZES = [100, 150, 200, 260] as const;

export function FramePicker({ library, excluded, onPick }: FramePickerProps) {
  const [query, setQuery] = useState('');
  const [folderFilter, setFolderFilter] = useState<string | null>(null);
  const [starredOnly, setStarredOnly] = useState(false);
  const [kindFilter, setKindFilter] = useState<'all' | 'image' | 'video'>('all');
  const [sizeStep, setSizeStep] = useState(2); // 1-4

  const excludedSet = useMemo(() => new Set(excluded), [excluded]);

  // All unique folders present in un-excluded assets
  const folders = useMemo(() => {
    const set = new Set<string>();
    for (const a of library) {
      if (!excludedSet.has(a.id)) set.add(a.file.folder);
    }
    return [...set].sort();
  }, [library, excludedSet]);

  const candidates = useMemo(() => {
    const q = query.trim().toLowerCase();
    return library
      .filter((a) => !excludedSet.has(a.id))
      .filter((a) => !folderFilter || a.file.folder === folderFilter)
      .filter((a) => !starredOnly || a.catalog.starred)
      .filter((a) => kindFilter === 'all' || a.kind === kindFilter)
      .filter((a) => {
        if (!q) return true;
        return (
          a.display.title.toLowerCase().includes(q) ||
          (a.display.sceneCode?.toLowerCase().includes(q) ?? false) ||
          a.file.folder.toLowerCase().includes(q)
        );
      });
  }, [library, excludedSet, folderFilter, starredOnly, kindFilter, query]);

  const gridMinPx = THUMB_SIZES[sizeStep - 1];

  return (
    <div className="border-t border-neutral-200 pt-3 space-y-2">
      {/* Header row: title + search + size slider */}
      <div className="flex items-center gap-2">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-600 shrink-0">
          Add Frame
        </h3>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title, scene code, folder…"
          className="text-sm border border-neutral-300 rounded px-2 py-1 flex-1 min-w-0"
        />
        {/* Thumbnail size control */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-neutral-400 text-sm leading-none">⊞</span>
          <input
            type="range"
            min={1}
            max={4}
            step={1}
            value={sizeStep}
            onChange={(e) => setSizeStep(Number(e.target.value))}
            className="w-20 accent-neutral-900 cursor-pointer"
            title="Thumbnail size"
          />
        </div>
      </div>

      {/* Filter chips row */}
      <div className="flex flex-wrap items-center gap-1.5">
        {/* Starred toggle */}
        <button type="button" onClick={() => setStarredOnly((v) => !v)} className={chip(starredOnly)}>
          ★ Starred
        </button>

        {/* Kind filters */}
        {(['all', 'image', 'video'] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKindFilter(k)}
            className={chip(kindFilter === k)}
          >
            {k === 'all' ? 'All' : k === 'image' ? 'Images' : 'Videos'}
          </button>
        ))}

        {/* Folder filters — only shown when more than one folder exists */}
        {folders.length > 1 && (
          <>
            <span className="text-neutral-300 text-xs select-none">|</span>
            {folders.map((f) => (
              <button
                key={f}
                type="button"
                title={f}
                onClick={() => setFolderFilter((cur) => (cur === f ? null : f))}
                className={chip(folderFilter === f)}
              >
                {folderLabel(f)}
              </button>
            ))}
          </>
        )}

        {/* Result count */}
        <span className="ml-auto text-xs text-neutral-400 shrink-0">
          {candidates.length} {candidates.length === 1 ? 'asset' : 'assets'}
        </span>
      </div>

      {/* Asset grid */}
      <div
        className="grid gap-2 overflow-y-auto pr-1"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(${gridMinPx}px, 1fr))`,
          maxHeight: '480px',
        }}
      >
        {candidates.map((a) => (
          <FramePickerItem key={a.id} asset={a} onPick={onPick} />
        ))}
        {candidates.length === 0 && (
          <div className="text-xs text-neutral-500 py-4 col-span-full text-center">
            No matching assets.
          </div>
        )}
      </div>
    </div>
  );
}

interface FramePickerItemProps {
  asset: Asset;
  onPick: (assetId: string) => void;
}

function FramePickerItem({ asset, onPick }: FramePickerItemProps) {
  const dispatch = useAppDispatch();
  const isVideo = asset.kind === 'video';
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const srcLoadedRef = useRef(false);

  function handleHoverEnter() {
    if (!isVideo) return;
    setHovered(true);
    const vid = videoRef.current;
    if (!vid) return;
    if (!srcLoadedRef.current) {
      vid.src = `/api/files/${asset.id}`;
      srcLoadedRef.current = true;
    }
    vid.play().catch(() => {});
  }

  function handleHoverLeave() {
    if (!isVideo) return;
    setHovered(false);
    const vid = videoRef.current;
    if (!vid) return;
    vid.pause();
    vid.currentTime = 0;
  }

  return (
    <div
      className="group relative bg-[#fafafa] border border-neutral-200 rounded overflow-hidden hover:border-neutral-700 transition-colors"
      onMouseEnter={handleHoverEnter}
      onMouseLeave={handleHoverLeave}
    >
      {/* Expand to lightbox — top-right overlay */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); dispatch(openLightbox(asset.id)); }}
        className="absolute top-1 right-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/55 hover:bg-black/80 rounded w-6 h-6 flex items-center justify-center text-white text-[11px] leading-none"
        title="View full screen"
      >
        ⛶
      </button>

      <button
        type="button"
        onClick={() => onPick(asset.id)}
        className="block w-full text-left"
      >
        <div className="relative aspect-video bg-neutral-100">
          {isVideo ? (
            <>
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="none"
                poster={
                  asset.video?.startAssetId
                    ? `/api/thumbs/${asset.video.startAssetId}?w=480`
                    : undefined
                }
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className={[
                  'absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-150',
                  hovered ? 'opacity-0' : 'opacity-100',
                ].join(' ')}
              >
                <div className="bg-black/50 rounded-full w-6 h-6 flex items-center justify-center text-white text-[10px] leading-none pl-px">
                  ▶
                </div>
              </div>
              {asset.video?.durationSec != null && (
                <span className="absolute bottom-1 left-1 text-[9px] font-mono px-1 py-0.5 rounded bg-black/60 text-white/90 leading-none pointer-events-none">
                  {asset.video.durationSec}s
                </span>
              )}
            </>
          ) : imgError ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs text-neutral-400">No preview</span>
            </div>
          ) : (
            <img
              src={`/api/thumbs/${asset.id}?w=480`}
              alt=""
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          )}
        </div>
        <div className="px-2 py-1 text-xs truncate" title={asset.display.title}>
          {asset.display.sceneCode && (
            <span className="font-mono text-neutral-500 mr-1">{asset.display.sceneCode}</span>
          )}
          {asset.display.title}
        </div>
      </button>
    </div>
  );
}
