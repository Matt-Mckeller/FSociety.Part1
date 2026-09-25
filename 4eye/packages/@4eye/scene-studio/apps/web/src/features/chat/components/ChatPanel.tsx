import { useState } from 'react';
import { useStreamedMessages } from '../hooks/useStreamedMessages.js';
import { ChatMessage } from './ChatMessage.js';
import { ToolCallItem } from './ToolCallItem.js';

export function ChatPanel() {
  const { messages, tools, error, busy, scrollRef, send, cancel, reset } = useStreamedMessages();
  const [input, setInput] = useState('');

  async function handleSend() {
    const text = input.trim();
    if (!text) return;
    setInput('');
    await send(text);
  }

  return (
    <aside className="w-96 shrink-0 border-l border-neutral-200 bg-white flex flex-col min-h-0">
      <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between shrink-0">
        <div className="text-sm font-semibold text-neutral-700">Chat</div>
        <button
          type="button"
          onClick={reset}
          disabled={busy}
          className="text-xs px-2 py-1 rounded border border-neutral-300 hover:bg-neutral-50 disabled:opacity-40"
        >
          New
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-auto p-3 space-y-3 text-sm">
        {messages.length === 0 && (
          <div className="text-neutral-400 text-xs">
            Try: "List the assets", "Tag all character images as cast", "Reorder scene 1 by
            filename", or "Edit asset abc123 with prompt: make the lighting warmer".
          </div>
        )}
        {messages.map((m, i) => (
          <ChatMessage
            key={i}
            message={m}
            isLast={i === messages.length - 1}
            busy={busy}
          />
        ))}
        {tools.length > 0 && (
          <div className="border-t border-neutral-200 pt-2 space-y-1">
            {tools.map((t) => <ToolCallItem key={t.callId} tool={t} />)}
          </div>
        )}
        {error && (
          <div className="text-xs text-red-600 border border-red-200 rounded p-2 bg-red-50">
            {error}
          </div>
        )}
      </div>

      <div className="border-t border-neutral-200 p-3 shrink-0">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              void handleSend();
            }
          }}
          rows={3}
          placeholder="Ask the assistant… (⌘↵ to send)"
          disabled={busy}
          className="w-full text-sm border border-neutral-300 rounded p-2 resize-none focus:outline-none focus:border-neutral-500"
        />
        <div className="flex justify-end gap-2 mt-2">
          {busy ? (
            <button
              type="button"
              onClick={cancel}
              className="text-xs px-3 py-1 rounded border border-neutral-300 hover:bg-neutral-50"
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={!input.trim()}
              className="text-xs px-3 py-1 rounded bg-neutral-900 text-white disabled:opacity-40"
            >
              Send
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
