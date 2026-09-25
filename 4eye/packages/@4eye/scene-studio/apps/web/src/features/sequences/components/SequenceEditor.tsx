import { useEffect, useState } from 'react';
import type { Sequence, CreateSequenceDto } from '@4eye/scene-studio-shared';
import {
  useCreateSequenceMutation,
  useUpdateSequenceMutation,
} from '../../../store/api.js';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.js';
import { closeModal, setSelectedSequenceId } from '../../../store/ui.slice.js';

interface Props {
  editing: Sequence | null;
}

export function SequenceEditor({ editing }: Props) {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((s) => s.ui.modal);
  const [create, createState] = useCreateSequenceMutation();
  const [update, updateState] = useUpdateSequenceMutation();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [sceneCode, setSceneCode] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (modal !== 'sequence-editor') return;
    setError(null);
    if (editing) {
      setName(editing.name);
      setSlug(editing.slug);
      setSceneCode(editing.sceneCode);
      setDescription(editing.description);
    } else {
      setName('');
      setSlug('');
      setSceneCode('');
      setDescription('');
    }
  }, [modal, editing]);

  if (modal !== 'sequence-editor') return null;

  const busy = createState.isLoading || updateState.isLoading;

  const close = () => dispatch(closeModal());

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !slug.trim() || !sceneCode.trim()) {
      setError('Name, slug, and sceneCode are required.');
      return;
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      setError('Slug must be lowercase letters, numbers, and dashes only.');
      return;
    }
    try {
      if (editing) {
        await update({
          id: editing.id,
          patch: { name, slug, sceneCode, description },
        }).unwrap();
      } else {
        const dto: CreateSequenceDto = {
          name,
          slug,
          sceneCode,
          description,
          frameIds: [],
          autoStar: false,
        };
        const created = await create(dto).unwrap();
        dispatch(setSelectedSequenceId(created.id));
      }
      close();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String((err as { data?: { message?: string } })?.data?.message ?? err);
      setError(msg);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={close}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-[480px] max-w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">
          {editing ? 'Edit Sequence' : 'New Sequence'}
        </h2>
        <form onSubmit={submit} className="space-y-3">
          <Field label="Name">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-neutral-300 rounded px-2 py-1 text-sm"
              autoFocus
            />
          </Field>
          <Field label="Slug" hint="lowercase-with-dashes">
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full border border-neutral-300 rounded px-2 py-1 text-sm font-mono"
            />
          </Field>
          <Field label="Scene Code" hint='e.g. "S1-C" → frames labeled S1-C1, S1-C2…'>
            <input
              type="text"
              value={sceneCode}
              onChange={(e) => setSceneCode(e.target.value)}
              className="w-full border border-neutral-300 rounded px-2 py-1 text-sm font-mono"
            />
          </Field>
          <Field label="Description">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border border-neutral-300 rounded px-2 py-1 text-sm"
            />
          </Field>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={close}
              className="text-sm px-3 py-1 rounded border border-neutral-300 bg-white hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="text-sm px-3 py-1 rounded bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50"
            >
              {editing ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

function Field({ label, hint, children }: FieldProps) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
          {label}
        </span>
        {hint && <span className="text-xs text-neutral-400">{hint}</span>}
      </div>
      {children}
    </label>
  );
}
