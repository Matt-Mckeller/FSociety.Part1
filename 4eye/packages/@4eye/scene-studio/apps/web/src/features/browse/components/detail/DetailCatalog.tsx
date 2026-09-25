import type { Asset } from '@4eye/scene-studio-shared';
import { TagChips } from '../TagChips.js';
import { Section, Field } from './layout.js';

interface Props {
  asset: Asset;
  patch: (display?: Partial<Asset['display']>, catalog?: Partial<Asset['catalog']>) => void;
}

export function DetailCatalog({ asset, patch }: Props) {
  return (
    <Section title="Catalog">
      <Field label="Tags">
        <TagChips
          tags={asset.catalog.tags}
          onAdd={(t) => patch(undefined, { tags: [...asset.catalog.tags, t] })}
          onRemove={(t) =>
            patch(undefined, { tags: asset.catalog.tags.filter((x) => x !== t) })
          }
        />
      </Field>
      <Field label="Starred">
        <button
          type="button"
          onClick={() => patch(undefined, { starred: !asset.catalog.starred })}
          className={asset.catalog.starred ? 'text-yellow-500' : 'text-neutral-400'}
        >
          {asset.catalog.starred ? '★ Starred' : '☆ Star'}
        </button>
      </Field>
      <Field label="Order">{asset.catalog.order.toFixed(2)}</Field>
    </Section>
  );
}
