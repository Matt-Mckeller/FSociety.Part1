import { useEffect, useRef, useState } from 'react';
import type { Asset, Animate } from '@4eye/scene-studio-shared';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.js';
import { closeModal } from '../../../store/ui.slice.js';
import { useGetLibraryQuery } from '../../../store/api.js';

type Status = Animate.Progress['status'];

interface ProgressState {
  status: Status | 'idle';
  percent?: number;
  message?: string;
  error?: string;
  asset?: Asset;
}

export function AnimateModal() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((s) => s.ui.modal === 'animate');
  const selectedIds = useAppSelector((s) => s.selection.selectedIds);
  const startFrameId = useAppSelector((s) => s.selection.startFrameId);
  const { data } = useGetLibraryQuery();

  const selected: Asset[] = (data?.assets ?? []).filter((a) =>
    selectedIds.includes(a.id),
  );

  // Use the explicitly marked start frame, or the first selected asset
  const start: Asset | null =
    selected.find((a) => a.id === startFrameId) ?? selected[0] ?? null;

  const [prompt, setPrompt] = useState('');
  const [durationSec, setDurationSec] = useState(5);
  const [progress, setProgress] = useState<ProgressState>({ status: 'idle' });
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => () => { esRef.current?.close(); }, []);
  useEffect(() => {
    if (!open) {
      setProgress({ status: 'idle' });
      esRef.current?.close();
      esRef.current = null;
    }
  }, [open]);

  if (!open) return null;

  const busy = progress.status === 'queued' || progress.status === 'running';

  const onGenerate = async () => {
    if (!start) return;
    setProgress({ status: 'queued', percent: 0 });
    try {
      const body: Animate.RequestDto = {
        startAssetId: start.id,
        prompt,
        durationSec,
      };
      const res = await fetch('/api/animate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`POST /api/animate ${res.status}: ${await res.text()}`);
      const { jobId } = (await res.json()) as { jobId: string };
      const es = new EventSource(`/api/animate/${jobId}/stream`);
      esRef.current = es;
      es.onmessage = (evt) => {
        try {
          const p = JSON.parse(evt.data) as Animate.Progress;
          setProgress({
            status: p.status,
            percent: p.percent,
            message: p.message,
            error: p.error,
            asset: p.asset,
          });
          if (
            p.status === 'succeeded' ||
            p.status === 'failed' ||
            p.status === 'cancelled'
          ) {
            es.close();
            esRef.current = null;
          }
        } catch (err) {
          console.error('Bad SSE payload', err);
        }
      };
      es.onerror = () => {
        if (progress.status !== 'succeeded') es.close();
      };
    } catch (err) {
      setProgress({ status: 'failed', error: (err as Error).message });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-6"
      onClick={() => !busy && dispatch(closeModal())}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between px-5 py-3 border-b border-neutral-200">
          <h2 className="font-semibold">🎬 Animate</h2>
          <button
            type="button"
            onClick={() => dispatch(closeModal())}
            disabled={busy}
            className="text-neutral-500 hover:text-neutral-900 text-xl disabled:opacity-30"
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <div className="p-5 space-y-4">
          {!start ? (
            <div className="text-sm text-neutral-500">
              Select a frame first.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-3">
                <FramePreview label="FRAME" asset={start} />
              </div>

              <label className="block">
                <span className="text-xs uppercase tracking-wide text-neutral-500 font-semibold">
                  Prompt
                </span>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. slow camera push-in, students lean forward, soft sun rays moving"
                  rows={4}
                  className="mt-1 w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
                  disabled={busy}
                />
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-wide text-neutral-500 font-semibold">
                  Duration · {durationSec}s
                </span>
                <input
                  type="range"
                  min={2}
                  max={10}
                  step={1}
                  value={durationSec}
                  onChange={(e) => setDurationSec(Number(e.target.value))}
                  disabled={busy}
                  className="mt-1 w-full"
                />
              </label>

              {progress.status !== 'idle' && (
                <div className="bg-neutral-50 border border-neutral-200 rounded p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium capitalize">{progress.status}</span>
                    {typeof progress.percent === 'number' && (
                      <span className="text-xs text-neutral-500">
                        {Math.round(progress.percent * 100)}%
                      </span>
                    )}
                  </div>
                  {progress.message && (
                    <div className="text-xs text-neutral-600 mt-1">{progress.message}</div>
                  )}
                  {progress.error && (
                    <div className="text-xs text-red-600 mt-1">{progress.error}</div>
                  )}
                  {typeof progress.percent === 'number' && (
                    <div className="h-1 bg-neutral-200 rounded mt-2 overflow-hidden">
                      <div
                        className="h-full bg-neutral-900 transition-all"
                        style={{ width: `${Math.round(progress.percent * 100)}%` }}
                      />
                    </div>
                  )}
                  {progress.asset && (
                    <div className="mt-3 text-xs">
                      ✓ New video asset:{' '}
                      <span className="font-mono">{progress.asset.file.filename}</span>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <footer className="flex items-center justify-end gap-2 px-5 py-3 border-t border-neutral-200 bg-neutral-50">
          <button
            type="button"
            onClick={() => dispatch(closeModal())}
            disabled={busy}
            className="text-sm px-3 py-1.5 rounded border border-neutral-300 bg-white hover:bg-neutral-100 disabled:opacity-50"
          >
            {progress.status === 'succeeded' ? 'Close' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={onGenerate}
            disabled={!start || !prompt.trim() || busy}
            className="text-sm px-4 py-1.5 rounded bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {busy ? 'Rendering…' : 'Animate'}
          </button>
        </footer>
      </div>
    </div>
  );
}

function FramePreview({ label, asset }: { label: string; asset: Asset }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-neutral-500 font-semibold mb-1">
        {label}
      </div>
      <div className="relative">
        <img
          src={`/api/thumbs/${asset.id}?w=400`}
          alt={asset.display.title}
          className="w-full aspect-[16/9] object-cover rounded border border-neutral-200"
        />
        <div className="text-xs text-neutral-600 mt-1 truncate">
          {asset.display.title}
        </div>
      </div>
    </div>
  );
}
