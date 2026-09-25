import type { Asset } from '@4eye/scene-studio-shared';
import { useUpdateAssetMutation } from '../../../store/api.js';

/** Returns a `patch` helper that applies partial display/catalog updates to the given asset. */
export function useAssetPatch(active: Asset | null) {
  const [updateAsset] = useUpdateAssetMutation();

  return (
    display?: Partial<Asset['display']>,
    catalog?: Partial<Asset['catalog']>,
  ) => {
    if (!active) return;
    updateAsset({
      id: active.id,
      patch: {
        ...(display ? { display } : {}),
        ...(catalog ? { catalog } : {}),
      },
    });
  };
}
