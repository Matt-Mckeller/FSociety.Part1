"use client";

import { forwardRef, useCallback } from "react";
import { MascotSlot } from "@expanse/character/2d";
import type { SlideId } from "@4eye/web/Tiles/home/slideshow/steps";
import { useMascotRegistry } from "@4eye/web/Tiles/home/persistent-mascot/PersistentMascotProvider";
import { useResponsiveMascotSize } from "@4eye/web/Tiles/home/persistent-mascot/useResponsiveMascotSize";

interface MascotSlotForSlideProps {
  slideId: SlideId;
}

/**
 * Drop-in replacement for the bare `<MascotSlot>` that auto-registers
 * itself with the persistent-mascot registry AND keeps the slot's
 * footprint in sync with the persistent overlay.
 *
 * Critical: the FLIP overlay sizes itself via {@link useResponsiveMascotSize}
 * (which clamps width tiers by viewport-height ratio), but the layout
 * slot defaults to a fixed-pixel `HOME_MASCOT_SIZE` per breakpoint.
 * On short viewports those drift apart — the slot reserves ~320px,
 * the mascot renders at ~220px, the slide overflows. Driving the slot
 * with the same hook keeps them lock-step so the slide always fits.
 *
 *   <MascotSlotForSlide slideId="learn" />
 */
export const MascotSlotForSlide = forwardRef<HTMLDivElement, MascotSlotForSlideProps>(
  function MascotSlotForSlide({ slideId }, externalRef) {
    const { register } = useMascotRegistry();
    const { size } = useResponsiveMascotSize();
    // Compose the registry callback with any external ref the parent
    // passed in. Re-register whenever `slideId` changes (rare).
    const setRef = useCallback(
      (el: HTMLDivElement | null) => {
        register(slideId, el);
        if (typeof externalRef === "function") externalRef(el);
        else if (externalRef) externalRef.current = el;
      },
      [register, slideId, externalRef],
    );
    return <MascotSlot ref={setRef} size={size} />;
  },
);
