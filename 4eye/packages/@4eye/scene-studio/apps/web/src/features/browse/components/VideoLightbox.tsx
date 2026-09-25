import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.js';
import { closeLightbox } from '../../../store/ui.slice.js';
import { useGetLibraryQuery } from '../../../store/api.js';

export function VideoLightbox() {
  const dispatch = useAppDispatch();
  const assetId = useAppSelector((s) => s.ui.lightboxAssetId);
  const { data } = useGetLibraryQuery();

  const asset = assetId ? (data?.assets.find((a) => a.id === assetId) ?? null) : null;

  useEffect(() => {
    if (!assetId) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(closeLightbox());
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [assetId, dispatch]);

  if (!assetId || !asset) return null;

  const isVideo = asset.kind === 'video';

  const posterSrc = asset.video?.startAssetId
    ? `/api/thumbs/${asset.video.startAssetId}?w=1280`
    : undefined;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/93 flex flex-col items-center justify-center"
      onClick={() => dispatch(closeLightbox())}
    >
      <div
        className="relative w-full px-4 flex flex-col items-center"
        style={{ maxWidth: '1280px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media */}
        {isVideo ? (
          <video
            key={assetId}
            controls
            autoPlay
            loop
            muted={false}
            preload="auto"
            src={`/api/files/${assetId}`}
            poster={posterSrc}
            className="w-full max-h-[82vh] rounded-lg object-contain"
          />
        ) : (
          <img
            key={assetId}
            src={`/api/files/${assetId}`}
            alt={asset.display.title}
            className="max-h-[82vh] max-w-full rounded-lg object-contain"
            style={{ imageRendering: 'high-quality' }}
          />
        )}

        {/* Footer bar */}
        <div className="mt-3 flex items-center justify-between w-full text-white/80 px-1">
          <div className="flex items-center gap-2 min-w-0">
            {asset.display.sceneCode && (
              <span className="font-mono text-sm text-white/45 shrink-0">
                {asset.display.sceneCode}
              </span>
            )}
            <span className="font-medium text-white truncate">{asset.display.title}</span>
            {isVideo && asset.video?.durationSec != null && (
              <span className="text-xs font-mono text-white/40 shrink-0">
                {asset.video.durationSec}s
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Download */}
            <a
              href={`/api/files/${assetId}`}
              download={asset.file.filename}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded border border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              title="Download full resolution"
            >
              <span className="text-base leading-none">↓</span>
              Download
            </a>
            <button
              type="button"
              onClick={() => dispatch(closeLightbox())}
              className="text-2xl leading-none text-white/50 hover:text-white transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        <p className="text-center text-white/25 text-xs mt-2">
          Press Esc or click outside to close
        </p>
      </div>
    </div>,
    document.body,
  );
}
