import { useEffect, useRef, useState } from 'react';
import type { Chat } from '@4eye/scene-studio-shared';

export interface DisplayMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ToolEvent {
  callId: string;
  name: string;
  args: unknown;
  status: 'pending' | 'ok' | 'error';
  result?: unknown;
  error?: string;
}

export interface UseStreamedMessages {
  messages: DisplayMessage[];
  tools: ToolEvent[];
  error: string | null;
  busy: boolean;
  scrollRef: React.RefObject<HTMLDivElement>;
  send: (text: string) => Promise<void>;
  cancel: () => void;
  reset: () => void;
}

export function useStreamedMessages(): UseStreamedMessages {
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [tools, setTools] = useState<ToolEvent[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, tools]);

  function handleSseChunk(chunk: string) {
    const dataLine = chunk.split('\n').find((l) => l.startsWith('data:'));
    if (!dataLine) return;
    let evt: Chat.StreamEvent;
    try { evt = JSON.parse(dataLine.slice(5).trim()); } catch { return; }

    if (evt.type === 'text') {
      setMessages((prev) => {
        const copy = [...prev];
        const last = copy[copy.length - 1];
        if (last && last.role === 'assistant') {
          copy[copy.length - 1] = { ...last, content: last.content + evt.delta };
        }
        return copy;
      });
    } else if (evt.type === 'tool_call') {
      setTools((prev) => [
        ...prev,
        { callId: evt.callId, name: evt.name, args: evt.args, status: 'pending' },
      ]);
    } else if (evt.type === 'tool_result') {
      setTools((prev) =>
        prev.map((t) =>
          t.callId === evt.callId
            ? { ...t, status: evt.ok ? 'ok' : 'error', result: evt.result, error: evt.error }
            : t,
        ),
      );
    } else if (evt.type === 'error') {
      setError(evt.error);
    }
  }

  async function send(text: string) {
    if (!text || busy) return;
    const next: DisplayMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setError(null);
    setBusy(true);
    setTools([]);
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const res = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: next.map((m) => ({ role: m.role, content: m.content })) }),
        signal: ac.signal,
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const parts = buf.split('\n\n');
        buf = parts.pop() ?? '';
        for (const part of parts) handleSseChunk(part);
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') setError((err as Error).message);
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  function cancel() { abortRef.current?.abort(); }

  function reset() {
    if (busy) return;
    setMessages([]);
    setTools([]);
    setError(null);
  }

  return { messages, tools, error, busy, scrollRef, send, cancel, reset };
}
