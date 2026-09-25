"use client";

import { SlideShell } from "@4eye/web/Tiles/home/slides/shared";
import { useSlideshow } from "@4eye/web/Tiles/home/slideshow/SlideshowProvider";
import { STEPS } from "@4eye/web/Tiles/home/slideshow/steps";
import { CatalogSlideProvider } from "./state/CatalogSlideContext";
import { CatalogSlideContent } from "./components/CatalogSlideContent";
import { useCatalogReveal } from "./hooks/useCatalogReveal";
import { CatalogActionBar } from "./CatalogActionBar";

const CATALOG_IDX = STEPS.findIndex((s) => s.id === "catalog");

export default function CatalogSlide() {
  const {
    state: { activeIdx },
  } = useSlideshow();

  const isActive = activeIdx === CATALOG_IDX;
  const { pillsVisible, markFinalStageReached } = useCatalogReveal(isActive);

  return (
    <SlideShell tone="default" maxWidth="lg" id="catalog">
      <CatalogActionBar />
      <CatalogSlideProvider
        isActive={isActive}
        pillsVisible={pillsVisible}
        markFinalStageReached={markFinalStageReached}
      >
        <CatalogSlideContent />
      </CatalogSlideProvider>
    </SlideShell>
  );
}
