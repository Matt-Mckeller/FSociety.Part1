import { useState } from 'react';

interface Props {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
}

export function TagChips({ tags, onAdd, onRemove }: Props) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState('');

  const commit = () => {
    const t = draft.trim().toLowerCase();
    if (t && !tags.includes(t)) onAdd(t);
    setDraft('');
    setAdding(false);
  };

  return (
    <div className="flex flex-wrap gap-1 items-center">
      {tags.map((t) => (
        <span
          key={t}
          className="group inline-flex items-center gap-1 text-[10px] uppercase tracking-wide bg-neutral-200 text-neutral-700 rounded px-1.5 py-0.5"
        >
          {t}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onRemove(t); }}
            className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-red-600"
            aria-label={`Remove tag ${t}`}
          >
            ×
          </button>
        </span>
      ))}
      {adding ? (
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { e.preventDefault(); commit(); }
            if (e.key === 'Escape') { setDraft(''); setAdding(false); }
          }}
          className="text-[10px] w-20 border border-blue-400 rounded px-1 py-0.5 outline-none"
          placeholder="tag…"
        />
      ) : (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setAdding(true); }}
          className="text-[10px] text-neutral-400 hover:text-neutral-700"
        >
          + tag
        </button>
      )}
    </div>
  );
}
