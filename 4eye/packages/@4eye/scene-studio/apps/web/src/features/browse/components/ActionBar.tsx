import { useAppDispatch, useAppSelector } from '../../../store/hooks.js';
import { clearSelection } from '../../../store/selection.slice.js';
import { openModal, setRightPanel } from '../../../store/ui.slice.js';

export function ActionBar() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((s) => s.selection.selectedIds.length);

  const canEdit = count === 1;
  const canAnimate = count >= 1 && count <= 2;

  return (
    <footer className="border-t border-neutral-200 px-6 py-3 text-sm flex items-center gap-2 bg-neutral-50">
      <Action
        icon="📚"
        label="BROWSE"
        active
        hint="default"
        onClick={() => dispatch(setRightPanel('detail'))}
      />
      <Divider />
      <Action
        icon="✨"
        label="EDIT"
        active={canEdit}
        hint={canEdit ? 'edit selected image' : 'select 1 image'}
        onClick={() => canEdit && dispatch(openModal('edit'))}
      />
      <Divider />
      <Action
        icon="🎬"
        label="ANIMATE"
        active={canAnimate}
        hint={
          count === 0
            ? 'select 1–2 frames'
            : count === 1
              ? 'image → video (single frame)'
              : count === 2
                ? 'start → end (interpolate)'
                : `too many selected (${count})`
        }
        onClick={() => canAnimate && dispatch(openModal('animate'))}
      />
      <div className="flex-1" />
      {count > 0 && (
        <button
          onClick={() => dispatch(clearSelection())}
          className="text-xs text-neutral-500 hover:text-neutral-800 px-2 py-1 rounded hover:bg-neutral-200"
        >
          Clear selection ({count})
        </button>
      )}
    </footer>
  );
}

function Action({
  icon,
  label,
  hint,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  hint: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={!active}
      onClick={onClick}
      className={[
        'flex items-baseline gap-2 px-3 py-1.5 rounded transition',
        active
          ? 'text-neutral-900 hover:bg-neutral-200 cursor-pointer'
          : 'text-neutral-400 cursor-not-allowed',
      ].join(' ')}
    >
      <span>{icon}</span>
      <span className="font-medium">{label}</span>
      <span className="text-xs">— {hint}</span>
    </button>
  );
}

function Divider() {
  return <span className="text-neutral-300">·</span>;
}
