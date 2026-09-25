import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useMemo } from 'react';
import type { Asset, Sequence } from '@4eye/scene-studio-shared';
import { frameLabel } from '@4eye/scene-studio-shared';
import {
  useGetLibraryQuery,
  useRemoveSequenceFrameMutation,
  useReorderSequenceFramesMutation,
  useAddSequenceFrameMutation,
} from '../../../store/api.js';
import { TimelineFrame } from './TimelineFrame.js';
import { FramePicker } from './FramePicker.js';

interface Props {
  sequence: Sequence;
}

/** Brand-styled horizontal rule with a diamond accent */
function BrandDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flex-1 h-px bg-gradient-to-r from-neutral-200 via-neutral-300 to-transparent" />
      <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-neutral-400 select-none">
        <span className="inline-block w-1.5 h-1.5 rotate-45 bg-neutral-300 shrink-0" />
        {label}
        <span className="inline-block w-1.5 h-1.5 rotate-45 bg-neutral-300 shrink-0" />
      </span>
      <div className="flex-1 h-px bg-gradient-to-l from-neutral-200 via-neutral-300 to-transparent" />
    </div>
  );
}

export function SequenceTimeline({ sequence }: Props) {
  const { data: library } = useGetLibraryQuery();
  const [reorder] = useReorderSequenceFramesMutation();
  const [removeFrame] = useRemoveSequenceFrameMutation();
  const [addFrame] = useAddSequenceFrameMutation();

  const assetById = useMemo(() => {
    const m = new Map<string, Asset>();
    for (const a of library?.assets ?? []) m.set(a.id, a);
    return m;
  }, [library]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = sequence.frameIds.indexOf(String(active.id));
    const newIdx = sequence.frameIds.indexOf(String(over.id));
    if (oldIdx === -1 || newIdx === -1) return;
    const next = arrayMove(sequence.frameIds, oldIdx, newIdx);
    await reorder({ id: sequence.id, frameIds: next }).unwrap().catch(() => {});
  };

  const handleRemove = async (assetId: string) => {
    await removeFrame({ id: sequence.id, assetId }).unwrap().catch(() => {});
  };

  return (
    <div className="space-y-4">
      {/* ── Storyboard card ── */}
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
        {/* Card header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#f5f5f5] border-b border-neutral-200">
          <div className="flex items-center gap-2">
            {/* Brand triangle accent */}
            <span
              className="inline-block shrink-0"
              style={{
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderBottom: '8px solid #171717',
              }}
            />
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
              Storyboard
            </span>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            {sequence.frameIds.length} {sequence.frameIds.length === 1 ? 'frame' : 'frames'}
          </span>
        </div>

        {/* Timeline strip */}
        <div className="px-3 py-3">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={sequence.frameIds} strategy={horizontalListSortingStrategy}>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {sequence.frameIds.length === 0 && (
                  <div className="text-sm text-neutral-400 py-8 px-4 border border-dashed border-neutral-200 rounded-lg w-full text-center bg-[#fafafa]">
                    No frames yet — add one below.
                  </div>
                )}
                {sequence.frameIds.map((id, i) => (
                  <TimelineFrame
                    key={id}
                    assetId={id}
                    asset={assetById.get(id)}
                    label={frameLabel(sequence.sceneCode, i)}
                    onRemove={() => handleRemove(id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>

      <BrandDivider label="Add Frame" />

      {/* ── Frame picker ── */}
      <FramePicker
        library={library?.assets ?? []}
        excluded={sequence.frameIds}
        onPick={(assetId) =>
          addFrame({ id: sequence.id, body: { assetId } }).unwrap().catch(() => {})
        }
      />
    </div>
  );
}
