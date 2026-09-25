"use client";

/**
 * CatalogSlideContext — supplies the Catalog slide's static copy plus
 * runtime state (active flag + reveal flag) to its content tree.
 *
 * Mirrors the structure of {@link DomainsSlideContext}: the slide-level
 * `<CatalogSlide />` shell is responsible for composition, while everything
 * presentational reads from this context.
 */

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

export interface CatalogSlideValue {
  /** Eyebrow shown above the BrandWordplay headline. */
  eyebrow: string;
  /** True while this slide is the active step in the slideshow. */
  isActive: boolean;
  /** True once the BrandWordplay reveal has reached its final stage. */
  pillsVisible: boolean;
  /** Mark the reveal as complete (typically wired to BrandWordplay's `onFinalStageReached`). */
  markFinalStageReached: () => void;
}

const CatalogSlideContext = createContext<CatalogSlideValue | null>(null);

export interface CatalogSlideProviderProps {
  isActive: boolean;
  pillsVisible: boolean;
  markFinalStageReached: () => void;
  children: ReactNode;
}

export function CatalogSlideProvider({
  isActive,
  pillsVisible,
  markFinalStageReached,
  children,
}: CatalogSlideProviderProps) {
  const value = useMemo<CatalogSlideValue>(
    () => ({
      eyebrow: "Our Offerings",
      isActive,
      pillsVisible,
      markFinalStageReached,
    }),
    [isActive, pillsVisible, markFinalStageReached],
  );

  return (
    <CatalogSlideContext.Provider value={value}>
      {children}
    </CatalogSlideContext.Provider>
  );
}

export function useCatalogSlideContext(): CatalogSlideValue {
  const ctx = useContext(CatalogSlideContext);
  if (!ctx) {
    throw new Error(
      "useCatalogSlideContext must be used inside <CatalogSlideProvider>",
    );
  }
  return ctx;
}

export { CatalogSlideContext };
