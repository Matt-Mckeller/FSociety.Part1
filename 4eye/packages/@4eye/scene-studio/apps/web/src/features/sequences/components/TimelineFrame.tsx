import { useRef, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Asset } from '@4eye/scene-studio-shared';
import { useAppDispatch } from '../../../store/hooks.js';
import { openLightbox } from '../../../store/ui.slice.js';

export interface TimelineFrameProps {
  assetId: string;
  asset: Asset | undefined;
  label: string;
  onRemove: () => void;
}

export function TimelineFrame({ assetId, asset, label, onRemove }: TimelineFrameProps) {
  const dispatch = useAppDispatch();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: assetId });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  const isVideo = asset?.kind === 'video';
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const srcLoadedRef = useRef(false);

  function handleHoverEnter() {
    if (!isVideo || isDragging) return;
    setHovered(true);
    const vid = videoRef.current;
    if (!vid) return;
    if (!srcLoadedRef.current) {
      vid.src = `/api/files/${assetId}`;
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
      ref={setNodeRef}
      style={style}
      className="shrink-0 w-44 bg-[#fafafa] border border-neutral-200 rounded overflow-hidden flex flex-col"
    >
      <div className="px-2 py-1 flex items-center justify-between text-xs font-mono bg-[#f5f5f5] border-b border-neutral-200">
        <span className="cursor-grab text-neutral-700 select-none" {...attributes} {...listeners}>
          {label}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="text-neutral-400 hover:text-red-600 leading-none"
          title="Remove from sequence"
        >
          ×
        </button>
      </div>
      <div
        className="relative aspect-video bg-neutral-100 flex items-center justify-center group"
        onMouseEnter={handleHoverEnter}
        onMouseLeave={handleHoverLeave}
      >
        {/* Expand to lightbox */}
        <button
          type="button"
          onClick={() => asset && dispatch(openLightbox(asset.id))}
          className="absolute top-1 right-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/55 hover:bg-black/80 rounded w-6 h-6 flex items-center justify-center text-white text-[11px] leading-none"
          title="View full screen"
        >
          ⛶
        </button>
        {isVideo ? (
          <>
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              poster={
                asset?.video?.startAssetId
                  ? `/api/thumbs/${asset.video.startAssetId}?w=400`
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
              <div className="bg-black/50 rounded-full w-7 h-7 flex items-center justify-center text-white text-xs leading-none pl-px">
                ▶
              </div>
            </div>
            {asset?.video?.durationSec != null && (
              <span className="absolute bottom-1 left-1 text-[9px] font-mono px-1 py-0.5 rounded bg-black/60 text-white/90 leading-none pointer-events-none">
                {asset.video.durationSec}s
              </span>
            )}
          </>
        ) : asset && !imgError ? (
          <img
            src={`/api/thumbs/${asset.id}?w=600`}
            alt=""
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-xs text-neutral-400">{!asset ? 'missing' : 'No preview'}</span>
        )}
      </div>
      <div className="px-2 py-1 text-xs text-neutral-700 truncate" title={asset?.display.title}>
        {asset?.display.sceneCode && (
          <span className="font-mono text-neutral-500 mr-1">{asset.display.sceneCode}</span>
        )}
        {asset?.display.title ?? '—'}
      </div>
      <div className="px-2 pb-2 flex gap-1">
        {(['Improve', 'Variation', 'Data'] as const).map((action) => (
          <button
            key={action}
            type="button"
            className="flex-1 text-[10px] px-1 py-0.5 rounded border border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-100 hover:border-neutral-400 transition-colors leading-tight"
            title={action}
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}
