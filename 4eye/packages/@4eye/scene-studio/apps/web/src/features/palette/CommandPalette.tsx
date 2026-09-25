import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks.js';
import { openModal, setRightPanel } from '../../store/ui.slice.js';
import { clearSelection } from '../../store/selection.slice.js';

interface Command {
  id: string;
  label: string;
  hint?: string;
  run: () => void;
  enabled?: boolean;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();
  const selectionCount = useAppSelector((s) => s.selection.selectedIds.length);
  const rightPanel = useAppSelector((s) => s.ui.rightPanel);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const commands: Command[] = useMemo(
    () => [
      {
        id: 'edit',
        label: 'Edit selected image',
        hint: '1 selected',
        enabled: selectionCount === 1,
        run: () => dispatch(openModal('edit')),
      },
      {
        id: 'animate',
        label: 'Animate selection',
        hint: '1 or 2 selected',
        enabled: selectionCount >= 1 && selectionCount <= 2,
        run: () => dispatch(openModal('animate')),
      },
      {
        id: 'detail',
        label: rightPanel === 'detail' ? 'Hide Detail panel' : 'Show Detail panel',
        run: () => dispatch(setRightPanel(rightPanel === 'detail' ? null : 'detail')),
      },
      {
        id: 'chat',
        label: rightPanel === 'chat' ? 'Hide Chat panel' : 'Show Chat panel',
        run: () => dispatch(setRightPanel(rightPanel === 'chat' ? null : 'chat')),
      },
      {
        id: 'clear',
        label: 'Clear selection',
        hint: selectionCount > 0 ? `${selectionCount} selected` : 'nothing selected',
        enabled: selectionCount > 0,
        run: () => dispatch(clearSelection()),
      },
    ],
    [dispatch, rightPanel, selectionCount],
  );

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()),
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 flex items-start justify-center pt-32"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-white rounded-lg shadow-xl border border-neutral-200 w-[480px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a command…"
          className="w-full px-4 py-3 text-sm border-b border-neutral-200 focus:outline-none"
        />
        <ul className="max-h-80 overflow-auto">
          {filtered.length === 0 ? (
            <li className="px-4 py-3 text-sm text-neutral-400">No matching commands.</li>
          ) : (
            filtered.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  disabled={c.enabled === false}
                  onClick={() => {
                    c.run();
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm flex justify-between items-center hover:bg-neutral-100 disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  <span>{c.label}</span>
                  {c.hint && <span className="text-xs text-neutral-400">{c.hint}</span>}
                </button>
              </li>
            ))
          )}
        </ul>
        <div className="px-4 py-2 text-[11px] text-neutral-400 border-t border-neutral-100">
          ⌘K to toggle · Esc to close
        </div>
      </div>
    </div>
  );
}
