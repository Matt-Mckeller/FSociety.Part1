import type { ToolEvent } from '../hooks/useStreamedMessages.js';

function summarizeArgs(args: unknown): string {
  try {
    const s = JSON.stringify(args);
    return s.length > 80 ? s.slice(0, 77) + '…' : s;
  } catch {
    return '';
  }
}

export function ToolCallItem({ tool }: { tool: ToolEvent }) {
  return (
    <div className="text-[11px] font-mono text-neutral-600">
      <span
        className={
          tool.status === 'pending'
            ? 'text-amber-600'
            : tool.status === 'ok'
              ? 'text-green-700'
              : 'text-red-600'
        }
      >
        {tool.status === 'pending' ? '⋯' : tool.status === 'ok' ? '✓' : '✗'}
      </span>{' '}
      {tool.name}({summarizeArgs(tool.args)})
      {tool.error && <span className="text-red-600"> — {tool.error}</span>}
    </div>
  );
}
