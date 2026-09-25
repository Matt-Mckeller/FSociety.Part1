import { GalleryView } from './views/GalleryView.js';
import { ActionBar } from './features/browse/components/ActionBar.js';
import { SelectionTray } from './features/browse/components/SelectionTray.js';
import { DetailPanel } from './features/browse/components/DetailPanel.js';
import { VideoLightbox } from './features/browse/components/VideoLightbox.js';
import { EditModal } from './features/edit/components/EditModal.js';
import { AnimateModal } from './features/animate/components/AnimateModal.js';
import { ChatPanel } from './features/chat/components/ChatPanel.js';
import { CommandPalette } from './features/palette/CommandPalette.js';
import { SequencesView } from './features/sequences/components/SequencesView.js';
import { useAppDispatch, useAppSelector } from './store/hooks.js';
import { setRightPanel, setView, type RightPanel, type View } from './store/ui.slice.js';

export function App() {
  const dispatch = useAppDispatch();
  const rightPanel = useAppSelector((s) => s.ui.rightPanel);
  const view = useAppSelector((s) => s.ui.view);

  function toggle(target: Exclude<RightPanel, null>) {
    dispatch(setRightPanel(rightPanel === target ? null : target));
  }

  function btnCls(active: boolean): string {
    return [
      'text-sm px-3 py-1 rounded border',
      active
        ? 'bg-neutral-900 text-white border-neutral-900'
        : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50',
    ].join(' ');
  }

  function viewBtn(target: View, label: string) {
    return (
      <button
        type="button"
        onClick={() => dispatch(setView(target))}
        className={btnCls(view === target)}
      >
        {label}
      </button>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white text-neutral-900">
      <header className="flex items-center justify-between px-6 py-3 border-b border-neutral-200 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Classroom of Tomorrow · Gallery</h1>
          <nav className="flex items-center gap-1">
            {viewBtn('gallery', 'Gallery')}
            {viewBtn('sequences', 'Sequences')}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 mr-2">⌘K</span>
          <button
            type="button"
            onClick={() => toggle('detail')}
            className={btnCls(rightPanel === 'detail')}
          >
            Detail
          </button>
          <button
            type="button"
            onClick={() => toggle('chat')}
            className={btnCls(rightPanel === 'chat')}
          >
            Chat
          </button>
        </div>
      </header>

      <div className="flex-1 flex min-h-0">
        <main className="flex-1 overflow-auto min-w-0">
          {view === 'gallery' && <GalleryView />}
          {view === 'sequences' && <SequencesView />}
        </main>
        {rightPanel === 'detail' && <DetailPanel />}
        {rightPanel === 'chat' && <ChatPanel />}
      </div>

      <SelectionTray />
      <ActionBar />
      <EditModal />
      <AnimateModal />
      <CommandPalette />
      <VideoLightbox />
    </div>
  );
}
