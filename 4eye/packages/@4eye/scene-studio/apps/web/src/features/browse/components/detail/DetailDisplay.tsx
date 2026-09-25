import type { Asset } from '@4eye/scene-studio-shared';
import { InlineText } from '../InlineText.js';
import { Section, Field } from './layout.js';

interface Props {
  asset: Asset;
  patch: (display?: Partial<Asset['display']>, catalog?: Partial<Asset['catalog']>) => void;
}

export function DetailDisplay({ asset, patch }: Props) {
  return (
    <Section title="Display">
      <Field label="Title">
        <InlineText
          value={asset.display.title}
          placeholder="Untitled"
          onCommit={(title) => patch({ title })}
        />
      </Field>
      <Field label="Description">
        <InlineText
          value={asset.display.description}
          placeholder="Add description…"
          multiline
          onCommit={(description) => patch({ description })}
        />
      </Field>
      {asset.display.sceneCode && (
        <Field label="Scene">
          <span className="font-mono">{asset.display.sceneCode}</span>
        </Field>
      )}
    </Section>
  );
}
