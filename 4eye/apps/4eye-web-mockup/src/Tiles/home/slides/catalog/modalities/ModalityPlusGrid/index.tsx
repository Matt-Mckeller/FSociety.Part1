"use client";

import { ModalityProvider, type ModalityProviderProps } from "../ModalityContext";
import { ModalityGrid } from "./ModalityGrid";

export type ModalityPlusGridProps = Pick<
  ModalityProviderProps,
  "modalities" | "layout"
>;

/**
 * Modality plus/cross grid. Renders the configured {@link MODALITY_GRID_LAYOUT}
 * as a CSS grid of {@link ActionOrb}s, sized by each modality's tier.
 */
export function ModalityPlusGrid(props: ModalityPlusGridProps) {
  return (
    <ModalityProvider {...props}>
      <ModalityGrid />
    </ModalityProvider>
  );
}

export default ModalityPlusGrid;
