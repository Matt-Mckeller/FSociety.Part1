import type { Asset } from '@4eye/scene-studio-shared';
import { Section, Field } from './layout.js';

export function DetailOrigin({ asset }: { asset: Asset }) {
  return (
    <Section title="Origin">
      <Field label="Source">{asset.origin.source}</Field>
      {asset.origin.model && <Field label="Model">{asset.origin.model}</Field>}
      {asset.origin.prompt && (
        <Field label="Prompt">
          <span className="text-xs whitespace-pre-wrap">{asset.origin.prompt}</span>
        </Field>
      )}
      {asset.origin.parentIds.length > 0 && (
        <Field label="Parents">
          <span className="text-xs font-mono">{asset.origin.parentIds.join(', ')}</span>
        </Field>
      )}
    </Section>
  );
}
