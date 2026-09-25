"use client";

import { SlideShell } from "@4eye/web/Tiles/home/slides/shared";
import { DomainsSlideProvider } from "./state/DomainsSlideContext";
import { DomainsSlideContent } from "./components/DomainsSlideContent";
import { DomainsActionBar } from "./components/DomainsActionBar";

/**
 * DomainsSlide — merges When and Where into a single slide.
 *
 * Composition-only shell. Animation choreography and data are delegated to:
 * - DomainsSlideProvider (context)
 * - useDomainsTimeline (hook)
 * - WhenBand / WhereBand (presentational components)
 * - DomainsActionBar (registers a slide-scoped HUD orb bar)
 */
export default function DomainsSlide() {
  return (
    <SlideShell tone="default" id="reach">
      <DomainsSlideProvider>
        <DomainsActionBar />
        <DomainsSlideContent />
      </DomainsSlideProvider>
    </SlideShell>
  );
}
