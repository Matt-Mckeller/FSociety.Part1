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
  rectSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import type { Asset } from '@4eye/scene-studio-shared';
import { GalleryTile } from './GalleryTile.js';
import { api, useReorderMutation } from '../../../store/api.js';
import { useAppDispatch } from '../../../store/hooks.js';
import { computeReorder } from '../lib/reorder.js';

interface Props {
  folder: string;
  assets: Asset[];
}

export function GallerySection({ folder, assets }: Props) {
  const dispatch = useAppDispatch();
  const [reorder] = useReorderMutation();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = assets.findIndex((a) => a.id === active.id);
    const newIndex = assets.findIndex((a) => a.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const next = arrayMove(assets, oldIndex, newIndex);
    const orders = computeReorder(next, String(active.id), newIndex);

    // optimistic patch in the cache
    const undo = dispatch(
      api.util.updateQueryData('getLibrary', undefined, (draft) => {
        for (const [id, order] of Object.entries(orders)) {
          const a = draft.assets.find((x) => x.id === id);
          if (a) a.catalog.order = order;
        }
      }),
    );

    try {
      await reorder({ orders }).unwrap();
    } catch {
      undo.undo();
    }
  };

  return (
    <section>
      <header className="flex items-baseline gap-3 mb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-700">
          {prettify(folder)}
        </h2>
        <span className="text-xs text-neutral-400">{assets.length}</span>
      </header>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={assets.map((a) => a.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
            {assets.map((a) => (
              <GalleryTile key={a.id} asset={a} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </section>
  );
}

function prettify(folder: string): string {
  return folder
    .replace(/^\d+_/, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
