import type { ContentType, ContentVariation, Layer } from '../AIGuidedEditorV6/types';

/** Drop emoji icons from layer data so V6 pipeline chips render label-only. */
export function sanitizeLayers(layers: Layer[]): Layer[] {
  return layers.map((l) => ({ ...l, icon: '' }));
}

export function sanitizeContentType<T extends Pick<ContentType, 'icon'>>(type: T): T {
  return { ...type, icon: '' };
}

export function sanitizeVariations(variations: ContentVariation[]): ContentVariation[] {
  return variations.map((v) => ({ ...v, icon: '' }));
}
