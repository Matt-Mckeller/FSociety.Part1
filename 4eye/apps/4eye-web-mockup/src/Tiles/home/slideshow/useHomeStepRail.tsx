"use client";

import { useMemo } from "react";
import { SlideshowHeaderRail, useRegisterCenterContent, type SlideshowHeaderRailStep } from "@expanse/hud"

import { useHudState } from "@4eye/web/components/hud/state";
import { actColor, type ActNumber } from "@4eye/web/lib/theme/actColors";

import { useSlideshow } from "./SlideshowProvider";
import {
  DEFAULT_SLIDE_DURATION_MS,
  SLIDE_DURATIONS_MS,
  STEPS,
} from "./steps";
import { useStepProgress } from "./useStepProgress";

/**
 * useHomeStepRail — registers the top-center HUD step rail for the home
 * slideshow.
 *
 * Side-effect-only hook (returns nothing). Must be called inside
 * `SlideshowProvider`. The rail surfaces:
 *   - one chip per step (from `STEPS`, colored by act group)
 *   - a visual-only progress fill driven by `useStepProgress`
 *   - prev / next / jump callbacks bound to the slideshow dispatch
 *
 * Auto-hidden whenever the user opens the full-screen map view.
 */
export function useHomeStepRail() {
  const { state, goto, next, prev } = useSlideshow();
  const { activeIdx } = state;
  const { isMapViewOpen } = useHudState();

  const stepDurationMs =
    SLIDE_DURATIONS_MS[activeIdx] ?? DEFAULT_SLIDE_DURATION_MS;
  const stepProgress = useStepProgress({
    activeIdx,
    durationMs: stepDurationMs,
    enabled: true,
  });

  const railSteps = useMemo<SlideshowHeaderRailStep[]>(
    () =>
      STEPS.map((step) => ({
        id: step.id,
        label: step.label,
        color: actColor(step.groupId as ActNumber),
      })),
    [],
  );

  const railNode = useMemo(
    () => (
      <SlideshowHeaderRail
        steps={railSteps}
        activeIdx={activeIdx}
        progress={stepProgress}
        onJump={goto}
        onPrev={prev}
        onNext={next}
      />
    ),
    [railSteps, activeIdx, stepProgress, goto, prev, next],
  );

  useRegisterCenterContent({
    id: "home-slideshow-rail",
    priority: 10,
    node: railNode,
    label: "Home slideshow step rail",
    enabled: !isMapViewOpen,
  });
}
