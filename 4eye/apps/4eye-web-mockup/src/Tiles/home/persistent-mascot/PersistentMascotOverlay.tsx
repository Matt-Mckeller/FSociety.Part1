"use client";

import { Box } from "@mui/material";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import {
  FourEyeMascot,
  type FourEyeMascotHandle,
  CHARACTER_PERSONAS,
} from "@expanse/character/2d";
import { AmplifyAura } from "./AmplifyAura";
import { useSlideshow } from "@4eye/web/Tiles/home/slideshow/SlideshowProvider";
import type { SlideId } from "@4eye/web/Tiles/home/slideshow/steps";
import {
  useMascotControlsRegistry,
  useMascotRegistry,
} from "@4eye/web/Tiles/home/persistent-mascot/PersistentMascotProvider";
import {
  MASCOT_TOP_NUDGE_PX,
  useResponsiveMascotSize,
} from "@4eye/web/Tiles/home/persistent-mascot/useResponsiveMascotSize";

interface PersistentMascotOverlayProps {
  /**
   * Reference to the slideshow stage element. Used as the coordinate
   * origin for mascot positioning so the overlay's `top`/`left` are
   * stage-local (not viewport-relative).
   */
  stageRef: RefObject<HTMLElement>;
  /**
   * The slides on which the persistent mascot is visible. The overlay
   * fades out on any other slide.
   *
   * Defaults to just `["learn"]` to mirror current behavior.
   */
  visibleOn?: ReadonlyArray<SlideId>;
}

interface MascotRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * Persistent mascot overlay (FLIP-positioned).
 *
 * Why not React `createPortal`? Reparenting a portal between containers
 * unmounts the children from the old DOM container and remounts them in
 * the new one — destroying the SVG nodes that GSAP timelines target,
 * which restarts every animation. Verified empirically.
 *
 * Instead, we render a single `<FourEyeMascot />` once, in an
 * absolutely-positioned overlay inside the stage. Each slide that wants
 * to host the mascot renders a `<MascotSlotForSlide>` placeholder; we
 * measure the active slot's bounding rect and animate the overlay
 * (top/left/size) to match. The mascot's React component, DOM, and GSAP
 * context all remain stable across slide changes — so the celebrate
 * timeline kicked off on slide 1 keeps playing seamlessly through
 * subsequent slides.
 */
export function PersistentMascotOverlay({
  stageRef,
  visibleOn = ["learn"],
}: PersistentMascotOverlayProps) {
  const { activeId } = useSlideshow();
  const { getElement, registrationToken } = useMascotRegistry();
  const { handleRef: publishedHandleRef } = useMascotControlsRegistry();
  const localHandleRef = useRef<FourEyeMascotHandle | null>(null);
  const { size: mascotSizePx } = useResponsiveMascotSize();

  // Publish/clear our handle on the shared controls context so any
  // descendant (per-slide action bars, slide CTAs) can call play* via
  // `usePersistentMascot()` without prop-threading.
  const setMascotRef = useCallback(
    (h: FourEyeMascotHandle | null) => {
      localHandleRef.current = h;
      publishedHandleRef.current = h;
    },
    [publishedHandleRef],
  );
  useEffect(
    () => () => {
      // On unmount, drop the published handle so stale calls no-op.
      if (publishedHandleRef.current === localHandleRef.current) {
        publishedHandleRef.current = null;
      }
    },
    [publishedHandleRef],
  );

  const slotEl = visibleOn.includes(activeId) ? getElement(activeId) : null;

  // Lock the mascot's vertical position to a single value across all
  // participating slides. The first slot we measure defines the
  // canonical Y. Keeps the character at the same height between
  // screens — only horizontal position and size animate per-slide.
  const lockedTopRef = useRef<number | null>(null);
  const [rect, setRect] = useState<MascotRect | null>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!slotEl || !stage) return;
    const measure = () => {
      const slotR = slotEl.getBoundingClientRect();
      const stageR = stage.getBoundingClientRect();
      // Compute the slot's CENTER, then derive top/left from the
      // canonical mascot size. We deliberately ignore `slotR.width/height`
      // because GSAP entrance tweens on the slide can leave the slot
      // ancestor with a transient transform scale, which would shrink
      // `getBoundingClientRect()` and pull the overlay's measured size
      // along with it. Anchoring on center + a fixed size keeps the
      // mascot dimensionally stable across slides and animation phases.
      const slotCenterX = slotR.left + slotR.width / 2 - stageR.left;
      const slotCenterY = slotR.top + slotR.height / 2 - stageR.top;
      const measuredTop = slotCenterY - mascotSizePx / 2;
      if (lockedTopRef.current == null) {
        lockedTopRef.current = measuredTop;
      }
      setRect({
        top: lockedTopRef.current - MASCOT_TOP_NUDGE_PX,
        left: slotCenterX - mascotSizePx / 2,
        width: mascotSizePx,
        height: mascotSizePx,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(slotEl);
    ro.observe(stage);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
    // `registrationToken` re-runs the effect when a slot's element
    // (re-)registers — handles slide remounts.
  }, [slotEl, stageRef, mascotSizePx, registrationToken]);

  const visible = slotEl != null && rect != null;

  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        top: rect?.top ?? 0,
        left: rect?.left ?? 0,
        width: rect?.width ?? 0,
        height: rect?.height ?? 0,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        zIndex: 5,
        transition:
          "top 500ms ease, left 500ms ease, width 500ms ease, height 500ms ease, opacity 300ms ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AmplifyAura active={activeId === "learn"} />
      <FourEyeMascot ref={setMascotRef} {...CHARACTER_PERSONAS.hero} size="100%" />
    </Box>
  );
}
