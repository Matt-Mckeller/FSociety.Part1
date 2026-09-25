import type { DisplayMessage } from '../hooks/useStreamedMessages.js';

interface Props {
  message: DisplayMessage;
  isLast: boolean;
  busy: boolean;
}

export function ChatMessage({ message, isLast, busy }: Props) {
  return (
    <div
      className={[
        'rounded p-2 whitespace-pre-wrap',
        message.role === 'user'
          ? 'bg-neutral-900 text-white self-end ml-8'
          : 'bg-neutral-100 text-neutral-900 mr-8',
      ].join(' ')}
    >
      {message.content || (busy && isLast ? '…' : '')}
    </div>
  );
}
