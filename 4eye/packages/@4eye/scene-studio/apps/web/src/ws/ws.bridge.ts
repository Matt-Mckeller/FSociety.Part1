import type { WSEvent } from '@4eye/scene-studio-shared';
import { api } from '../store/api.js';
import type { store as Store } from '../store/store.js';

/**
 * Open the WebSocket and dispatch RTK Query cache patches when the
 * server broadcasts library updates. Auto-reconnects with backoff.
 */
export function startWsBridge(store: typeof Store): void {
  let ws: WebSocket | null = null;
  let backoff = 500;

  const connect = () => {
    const url = `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/ws`;
    ws = new WebSocket(url);

    ws.onopen = () => {
      backoff = 500;
      // refetch on (re)connect to be sure we're in sync
      store.dispatch(api.util.invalidateTags(['Library']));
    };

    ws.onmessage = (msg) => {
      let event: WSEvent;
      try {
        event = JSON.parse(msg.data);
      } catch {
        return;
      }
      switch (event.type) {
        case 'library:updated':
          store.dispatch(
            api.util.upsertQueryData('getLibrary', undefined, event.library),
          );
          break;
        case 'sequence:changed': {
          const changed = event.sequence;
          store.dispatch(
            api.util.updateQueryData('listSequences', undefined, (draft) => {
              const i = draft.findIndex((s) => s.id === changed.id);
              if (i >= 0) draft[i] = changed;
              else draft.push(changed);
            }),
          );
          break;
        }
        case 'sequence:removed': {
          const removedId = event.id;
          store.dispatch(
            api.util.updateQueryData('listSequences', undefined, (draft) => {
              const i = draft.findIndex((s) => s.id === removedId);
              if (i >= 0) draft.splice(i, 1);
            }),
          );
          break;
        }
        // edit:progress / animate:progress / asset:added / asset:removed
        // are handled by feature-local subscribers (added in later milestones)
        default:
          break;
      }
    };

    ws.onclose = () => {
      ws = null;
      setTimeout(connect, backoff);
      backoff = Math.min(backoff * 2, 15_000);
    };

    ws.onerror = () => {
      ws?.close();
    };
  };

  connect();
}
