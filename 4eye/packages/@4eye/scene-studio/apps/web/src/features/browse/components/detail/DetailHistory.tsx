import type { Asset } from '@4eye/scene-studio-shared';
import { Section } from './layout.js';

export function DetailHistory({ asset }: { asset: Asset }) {
  if (asset.history.length === 0) return null;
  return (
    <Section title={`History (${asset.history.length})`}>
      <ul className="text-xs space-y-2">
        {asset.history.map((h, i) => (
          <li key={i} className="border-l-2 border-neutral-200 pl-2">
            <div className="font-mono text-neutral-600">{h.filename}</div>
            <div className="text-neutral-400">
              {new Date(h.createdAt).toLocaleString()}
              {h.model && ` · ${h.model}`}
            </div>
            {h.prompt && (
              <div className="text-neutral-500 mt-1 whitespace-pre-wrap">{h.prompt}</div>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
