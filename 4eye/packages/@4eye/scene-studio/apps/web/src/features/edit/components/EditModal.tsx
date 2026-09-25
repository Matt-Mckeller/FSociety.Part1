import { useEffect, useRef, useState } from 'react';
import type { Asset, Edit } from '@4eye/scene-studio-shared';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.js';
import { closeModal } from '../../../store/ui.slice.js';
import { useGetLibraryQuery } from '../../../store/api.js';

type Stage = Edit.Progress['stage'];

interface ProgressState {
  stage: Stage | 'idle';
  percent?: number;
  message?: string;
  error?: string;
  newAssets?: Asset[];
}

export function EditModal() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((s) => s.ui.modal === 'edit');
  const selectedIds = useAppSelector((s) => s.selection.selectedIds);
  const { data } = useGetLibraryQuery();

  const source = selectedIds[0]
    ? data?.assets.find((a) => a.id === selectedIds[0]) ?? null
    : null;

  const [prompt, setPrompt] = useState('');
  const [variations, setVariations] = useState(1);
  const [size, setSize] = useState<Edit.RequestDto['size']>('auto');
  const [progress, setProgress] = useState<ProgressState>({ stage: 'idle' });
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    return () => {
      esRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setProgress({ stage: 'idle' });
      esRef.current?.close();
      esRef.current = null;
    }
  }, [open]);

  if (!open) return null;

  const busy =
    progress.stage !== 'idle' &&
    progress.stage !== 'done' &&
    progress.stage !== 'failed';

  const onGenerate = async () => {
    if (!source) return;
    setProgress({ stage: 'queued', percent: 0 });
    try {
      const res = await fetch('/api/edit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          sourceAssetId: source.id,
          prompt,
          variations,
          size,
        } satisfies Edit.RequestDto),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`POST /api/edit ${res.status}: ${text}`);
      }
      const { jobId } = (await res.json()) as { jobId: string };
      const es = new EventSource(`/api/edit/${jobId}/stream`);
      esRef.current = es;
      es.onmessage = (evt) => {
        try {
          const p = JSON.parse(evt.data) as Edit.Progress;
          setProgress({
            stage: p.stage,
            percent: p.percent,
            message: p.message,
            error: p.error,
            newAssets: p.newAssets,
          });
          if (p.stage === 'done' || p.stage === 'failed') {
            es.close();
            esRef.current = null;
          }
        } catch (err) {
          console.error('Bad SSE payload', err);
        }
      };
      es.onerror = () => {
        // server closes the stream when complete; treat as terminal only if not already done
        if (progress.stage !== 'done') {
          es.close();
        }
      };
    } catch (err) {
      setProgress({ stage: 'failed', error: (err as Error).message });
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
          <h2 className="font-semibold">✨ Edit image</h2>
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
          {!source ? (
            <div className="text-sm text-neutral-500">
              Select exactly one image first.
            </div>
          ) : (
            <>
              <div className="flex gap-4 items-start">
                <img
                  src={`/api/thumbs/${source.id}?w=320`}
                  alt={source.display.title}
                  className="w-40 aspect-[16/9] object-cover rounded border border-neutral-200"
                />
                <div className="text-sm min-w-0">
                  <div className="font-medium truncate">{source.display.title}</div>
                  <div className="text-xs text-neutral-500 font-mono break-all">
                    {source.file.folder}/{source.file.filename}
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    {source.file.width}×{source.file.height}
                  </div>
                </div>
              </div>

              <label className="block">
                <span className="text-xs uppercase tracking-wide text-neutral-500 font-semibold">
                  Prompt
                </span>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. warmer lighting, students smiling, soft morning sun…"
                  rows={4}
                  className="mt-1 w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
                  disabled={busy}
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs uppercase tracking-wide text-neutral-500 font-semibold">
                    Variations
                  </span>
                  <select
                    value={variations}
                    onChange={(e) => setVariations(Number(e.target.value))}
                    disabled={busy}
                    className="mt-1 w-full border border-neutral-300 rounded px-2 py-1.5 text-sm"
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-wide text-neutral-500 font-semibold">
                    Size
                  </span>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value as Edit.RequestDto['size'])}
                    disabled={busy}
                    className="mt-1 w-full border border-neutral-300 rounded px-2 py-1.5 text-sm"
                  >
                    <option value="auto">auto</option>
                    <option value="1024x1024">1024×1024</option>
                    <option value="1536x1024">1536×1024 (wide)</option>
                    <option value="1024x1536">1024×1536 (tall)</option>
                  </select>
                </label>
              </div>

              {progress.stage !== 'idle' && (
                <div className="bg-neutral-50 border border-neutral-200 rounded p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium capitalize">{progress.stage}</span>
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
                  {progress.newAssets && progress.newAssets.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {progress.newAssets.map((a) => (
                        <img
                          key={a.id}
                          src={`/api/thumbs/${a.id}?w=200`}
                          alt={a.display.title}
                          className="w-28 aspect-[16/9] object-cover rounded border border-neutral-200"
                        />
                      ))}
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
            {progress.stage === 'done' ? 'Close' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={onGenerate}
            disabled={!source || !prompt.trim() || busy}
            className="text-sm px-4 py-1.5 rounded bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {busy ? 'Generating…' : 'Generate'}
          </button>
        </footer>
      </div>
    </div>
  );
}
