import { useEffect, useRef, useState } from 'react';

interface Props {
  value: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  multiline?: boolean;
  onCommit: (next: string) => void;
}

/**
 * Click-to-edit text. Renders as plain text until clicked; then becomes
 * an input/textarea. Commits on blur or Enter. Esc cancels.
 */
export function InlineText({
  value, placeholder, className, inputClassName, multiline, onCommit,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select?.();
    }
  }, [editing]);

  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  const commit = () => {
    setEditing(false);
    if (draft !== value) onCommit(draft);
  };

  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  if (!editing) {
    return (
      <span
        className={`${className ?? ''} cursor-text hover:bg-neutral-100 rounded px-0.5 ${value ? '' : 'text-neutral-400 italic'}`}
        onClick={(e) => { e.stopPropagation(); setEditing(true); }}
      >
        {value || placeholder || '—'}
      </span>
    );
  }

  const common = {
    value: draft,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setDraft(e.target.value),
    onBlur: commit,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); cancel(); }
      if (e.key === 'Enter' && !multiline) { e.preventDefault(); commit(); }
      if (e.key === 'Enter' && multiline && (e.metaKey || e.ctrlKey)) {
        e.preventDefault(); commit();
      }
    },
    onClick: (e: React.MouseEvent) => e.stopPropagation(),
    className: `${inputClassName ?? ''} bg-white border border-blue-400 rounded px-1 py-0.5 outline-none w-full`,
  };

  return multiline
    ? <textarea ref={inputRef as React.RefObject<HTMLTextAreaElement>} rows={2} {...common} />
    : <input ref={inputRef as React.RefObject<HTMLInputElement>} type="text" {...common} />;
}
