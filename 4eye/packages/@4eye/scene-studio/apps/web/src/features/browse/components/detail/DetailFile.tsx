import type { Asset } from '@4eye/scene-studio-shared';
import { Section, Field } from './layout.js';

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export function DetailFile({ asset }: { asset: Asset }) {
  return (
    <Section title="File">
      <Field label="Folder">{asset.file.folder}</Field>
      <Field label="Filename">
        <span className="text-xs font-mono break-all">{asset.file.filename}</span>
      </Field>
      <Field label="Dimensions">
        {asset.file.width}×{asset.file.height}
      </Field>
      {asset.file.sizeBytes != null && (
        <Field label="Size">{formatBytes(asset.file.sizeBytes)}</Field>
      )}
      <Field label="MIME">{asset.file.mimeType}</Field>
    </Section>
  );
}
