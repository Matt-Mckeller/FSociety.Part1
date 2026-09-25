import { useRef, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDispatch, useSelector } from 'react-redux';
import type { Asset } from '@4eye/scene-studio-shared';
import { select } from '../../../store/selection.slice.js';
import type { RootState } from '../../../store/store.js';
import { useUpdateAssetMutation } from '../../../store/api.js';
import { openLightbox } from '../../../store/ui.slice.js';
import { InlineText } from './InlineText.js';
import { TagChips } from './TagChips.js';

interface Props {
  asset: Asset;
}

export function GalleryTile({ asset }: Props) {
  const dispatch = useDispatch();
  const selected = useSelector((s: RootState) =>
    s.selection.selectedIds.includes(asset.id),
  );
  const [updateAsset] = useUpdateAssetMutation();
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const srcLoadedRef = useRef(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: asset.id });

  const isVideo = asset.kind === 'video';
  const isGenerated = asset.origin.source !== 'imported';

  const handleSelect = (e: React.MouseEvent) => {
    dispatch(select({
      id: asset.id,
      mode: e.shiftKey || e.metaKey || e.ctrlKey ? 'toggle' : 'replace',
    }));
  };

  const patch = (display?: Partial<Asset['display']>, catalog?: Partial<Asset['catalog']>) =>
    updateAsset({
      id: asset.id,
      patch: {
        ...(display ? { display } : {}),
        ...(catalog ? { catalog } : {}),
      },
    });

  function handleVideoHoverEnter() {
    if (!isVideo || isDragging) return;
    setHovered(true);
    const vid = videoRef.current;
    if (!vid) return;
    if (!srcLoadedRef.current) {
      vid.src = `/api/files/${asset.id}`;
      srcLoadedRef.current = true;
    }
    vid.play().catch(() => { /* autoplay blocked */ });
  }

  function handleVideoHoverLeave() {
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
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
      }}
      onClick={handleSelect}
      className={[
        'group bg-surface-card rounded-lg overflow-hidden border-2 transition',
        selected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent hover:border-neutral-300',
      ].join(' ')}
    >
      {/* image area is the drag handle */}
      <div
        className="relative aspect-[16/9] bg-neutral-100 cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
        onMouseEnter={handleVideoHoverEnter}
        onMouseLeave={handleVideoHoverLeave}
      >
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
                  ? `/api/thumbs/${asset.video.startAssetId}?w=512`
                  : undefined
              }
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Center play overlay — visible at rest, hidden while playing */}
            <div
              className={[
                'absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-150',
                hovered ? 'opacity-0' : 'opacity-100',
              ].join(' ')}
            >
              <div className="bg-black/50 rounded-full w-10 h-10 flex items-center justify-center text-white text-base leading-none pl-0.5">
                ▶
              </div>
            </div>

            {/* Duration badge — always visible */}
            {asset.video?.durationSec != null && (
              <span className="absolute bottom-2 left-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-white/90 leading-none pointer-events-none">
                {asset.video.durationSec}s
              </span>
            )}

            {/* Fullscreen button — visible on hover, sits above the star */}
            <button
              type="button"
              title="Open fullscreen"
              onClick={(e) => { e.stopPropagation(); dispatch(openLightbox(asset.id)); }}
              onPointerDown={(e) => e.stopPropagation()}
              className={[
                'absolute bottom-8 right-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60',
                'rounded px-1.5 py-0.5 text-xs leading-none transition-opacity',
                hovered ? 'opacity-100' : 'opacity-0',
              ].join(' ')}
              aria-label="Open fullscreen"
            >
              ⛶
            </button>
          </>
        ) : (
          <img
            src={`/api/thumbs/${asset.id}?w=512`}
            alt={asset.display.title}
            loading="lazy"
            draggable={false}
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        )}
        {isGenerated && (
          <span
            title={`${asset.origin.source} · ${asset.origin.model ?? 'AI'}`}
            className="absolute top-2 right-2 text-xs px-1.5 py-0.5 rounded bg-gradient-to-br from-purple-500 to-pink-500 text-white"
          >
            ✨
          </span>
        )}
        {selected && (
          <span className="absolute top-2 left-2 text-xs px-1.5 py-0.5 rounded bg-blue-500 text-white">
            ✓
          </span>
        )}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); patch(undefined, { starred: !asset.catalog.starred }); }}
          onPointerDown={(e) => e.stopPropagation()}
          className={[
            'absolute bottom-2 right-2 text-base leading-none p-1 rounded bg-black/30',
            asset.catalog.starred
              ? 'text-yellow-400'
              : 'text-white/60 opacity-0 group-hover:opacity-100 hover:text-yellow-300',
          ].join(' ')}
          aria-label={asset.catalog.starred ? 'Unstar' : 'Star'}
        >
          ★
        </button>
      </div>

      <div className="px-3 py-2 space-y-1.5">
        <div className="flex items-baseline gap-2 min-w-0">
          {asset.display.sceneCode && (
            <span className="text-xs font-mono text-neutral-500 shrink-0">
              {asset.display.sceneCode}
            </span>
          )}
          <span className="text-sm font-medium truncate min-w-0 flex-1">
            <InlineText
              value={asset.display.title}
              placeholder="Untitled"
              onCommit={(title) => patch({ title })}
            />
          </span>
        </div>

        <div className="text-xs text-neutral-500">
          <InlineText
            value={asset.display.description}
            placeholder="Add description…"
            multiline
            onCommit={(description) => patch({ description })}
          />
        </div>

        <TagChips
          tags={asset.catalog.tags}
          onAdd={(t) => patch(undefined, { tags: [...asset.catalog.tags, t] })}
          onRemove={(t) =>
            patch(undefined, { tags: asset.catalog.tags.filter((x) => x !== t) })
          }
        />
      </div>
    </div>
  );
}
