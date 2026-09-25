import { useEffect, useMemo } from 'react';
import { frameLabel } from '@4eye/scene-studio-shared';
import {
  useDeleteSequenceMutation,
  useListSequencesQuery,
} from '../../../store/api.js';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.js';
import { openModal, setSelectedSequenceId } from '../../../store/ui.slice.js';
import { SequenceTimeline } from './SequenceTimeline.js';
import { SequenceEditor } from './SequenceEditor.js';

export function SequencesView() {
  const dispatch = useAppDispatch();
  const { data: sequences, isLoading, error } = useListSequencesQuery();
  const selectedId = useAppSelector((s) => s.ui.selectedSequenceId);
  const [deleteSequence] = useDeleteSequenceMutation();

  const list = useMemo(() => sequences ?? [], [sequences]);
  const selected = useMemo(
    () => list.find((s) => s.id === selectedId) ?? null,
    [list, selectedId],
  );

  // Auto-select first sequence on load if none selected
  useEffect(() => {
    if (!selectedId && list.length > 0) {
      dispatch(setSelectedSequenceId(list[0]!.id));
    }
    if (selectedId && !list.some((s) => s.id === selectedId)) {
      dispatch(setSelectedSequenceId(list[0]?.id ?? null));
    }
  }, [list, selectedId, dispatch]);

  if (isLoading) return <div className="p-8 text-neutral-500">Loading sequences…</div>;
  if (error) return <div className="p-8 text-red-600">Failed to load sequences.</div>;

  return (
    <div className="flex h-full min-h-0">
      <aside className="w-64 shrink-0 border-r border-neutral-200 overflow-y-auto p-3 space-y-1 bg-[#fafafa]">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
            Sequences
          </h2>
          <button
            type="button"
            onClick={() => {
              dispatch(setSelectedSequenceId(null));
              dispatch(openModal('sequence-editor'));
            }}
            className="text-xs px-2 py-0.5 rounded bg-neutral-900 text-white hover:bg-neutral-800"
            title="New sequence"
          >
            + New
          </button>
        </div>
        {list.length === 0 && (
          <div className="text-xs text-neutral-500 py-2">No sequences yet.</div>
        )}
        {list.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => dispatch(setSelectedSequenceId(s.id))}
            className={[
              'w-full text-left px-2 py-1.5 rounded text-sm',
              s.id === selectedId
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-800 hover:bg-neutral-200/60',
            ].join(' ')}
          >
            <div className="font-medium truncate">{s.name}</div>
            <div
              className={[
                'text-xs font-mono truncate',
                s.id === selectedId ? 'text-neutral-300' : 'text-neutral-500',
              ].join(' ')}
            >
              {s.sceneCode} · {s.frameIds.length} frame{s.frameIds.length === 1 ? '' : 's'}
            </div>
          </button>
        ))}
      </aside>

      <section className="flex-1 min-w-0 overflow-y-auto p-6 space-y-5">
        {selected ? (
          <>
            {/* ── Sequence header card ── */}
            <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
              {/* Brand accent bar: gradient from dark to transparent */}
              <div className="h-1 w-full bg-gradient-to-r from-neutral-900 via-neutral-500 to-transparent" />
              <div className="flex items-start justify-between px-5 py-4 gap-4">
                <div className="min-w-0">
                  <div className="flex items-baseline gap-3 min-w-0 flex-wrap">
                    <h1 className="text-xl font-semibold truncate min-w-0">{selected.name}</h1>
                    <span className="text-sm font-mono text-neutral-400 shrink-0 bg-neutral-100 px-2 py-0.5 rounded">
                      {selected.sceneCode}
                    </span>
                  </div>
                  {selected.description && (
                    <p className="text-sm text-neutral-500 mt-1.5">{selected.description}</p>
                  )}
                  {selected.frameIds.length > 0 && (
                    <p className="text-xs text-neutral-400 mt-1.5 font-mono tracking-wide">
                      {frameLabel(selected.sceneCode, 0)}
                      {' — '}
                      {frameLabel(selected.sceneCode, selected.frameIds.length - 1)}
                      <span className="ml-2 text-neutral-300">·</span>
                      <span className="ml-2">{selected.frameIds.length} frames</span>
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => dispatch(openModal('sequence-editor'))}
                    className="text-sm px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      if (!confirm(`Delete sequence "${selected.name}"?`)) return;
                      await deleteSequence(selected.id).unwrap().catch(() => {});
                    }}
                    className="text-sm px-3 py-1.5 rounded-lg border border-red-200 text-red-600 bg-white hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <SequenceTimeline sequence={selected} />
          </>
        ) : (
          <div className="text-neutral-500 text-sm">
            Select a sequence or create a new one.
          </div>
        )}
      </section>

      <SequenceEditor editing={selected} />
    </div>
  );
}
