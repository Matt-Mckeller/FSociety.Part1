"use client";

import { Box } from "@mui/material";
import { useCallback, useMemo, useRef, type ReactNode } from "react";

import { useHudState } from "@4eye/web/components/hud/state";
import { IntroFlow } from "@4eye/web/components/intro";
import { useIntroGateContext } from "@4eye/web/components/intro/IntroGateProvider";
import { HomeIntroLoading } from "./HomeIntroLoading";
import SlideshowTimeline, {
  useSlideshowTimelineHeight,
} from "@4eye/web/components/timeline";
import { TileContainer, useRegisterHudChromeHide } from "@expanse/hud"

import { MascotSlotForSlide } from "./persistent-mascot/MascotSlotForSlide";
import { PersistentMascotOverlay } from "./persistent-mascot/PersistentMascotOverlay";
import { PersistentMascotProvider } from "./persistent-mascot/PersistentMascotProvider";
import { BrandWordplayProvider } from "./shared/BrandWordplay";

import { CatalogSlide } from "./slides/catalog";
import { ControlSlide } from "./slides/control";
import { DomainsSlide } from "./slides/domains";
import { EarnSlide } from "./slides/earn";
import { LearnSlide } from "./slides/learn";
import { SeeSlide } from "./slides/see";
import { VideoSlide } from "./slides/video";

import { ReplayIntroProvider } from "./slideshow/ReplayIntroProvider";
import { SlideshowProvider, useSlideshow } from "./slideshow/SlideshowProvider";
import { SlideStage } from "./slideshow/SlideStage";
import { GROUPS, STEPS } from "./slideshow/steps";
import { useArrowKeyAdvance } from "./slideshow/useArrowKeyAdvance";
import { useHomeHudChrome } from "./slideshow/useHomeHudChrome";
import { useHomeStepRail } from "./slideshow/useHomeStepRail";
import { useWheelAdvance } from "./slideshow/useWheelAdvance";

/**
 * HomeTile — the home tile's two-path entry point.
 *
 *   1. Intro flow (first visit, or after Replay): a short narrative
 *      animation gated by `useIntroGate`. Replays via the Replay Intro
 *      orb installed by each slide's action bar.
 *
 *   2. Tile presentation (after intro): a fade-mode slideshow of the
 *      seven brand pillars — Video / Learn / Control / See / Catalog /
 *      Domains / Earn — driven by `SlideshowProvider`.
 *
 * View-only composition. State, side effects, and HUD chrome wiring
 * live in dedicated hooks/providers:
 *
 *   - `useWheelAdvance`, `useArrowKeyAdvance` — navigation inputs
 *   - `useHomeStepRail`                       — top-center HUD step rail
 *   - `useHomeHudChrome`                      — hides default OrbBar
 *   - `ReplayIntroProvider`                   — publishes `replayIntro()`
 *                                                to per-slide action bars
 *   - `useIntroGate`                          — intro gating + replay
 *   - `PersistentMascotProvider`              — persistent FLIP mascot
 *                                                (also publishes the mascot's
 *                                                imperative handle so any
 *                                                slide can fire animations
 *                                                via `usePersistentMascot()`)
 *
 * Per-slide HUD action bars live in each slide's folder (e.g.
 * `slides/learn/LearnActionBar.tsx`) and own their own registration via
 * `useRegisterBottomBar` with `enabled: isActiveSlide`. HomeTile knows
 * nothing about them.
 *
 * Lives apart from `(hud)/page.tsx` so the page file stays a server
 * component and can export `metadata`.
 */
export default function HomeTile() {
  const { introDone, gateResolved, introRunKey, finishIntro, replayIntro } =
    useIntroGateContext();

  // Path 0: gate unresolved. Render a neutral loading state until
  // localStorage has been read post-hydration. This is identical on the
  // server and the first client render, so hydration matches and we never
  // flash the wrong path (intro vs slideshow). See `useIntroGate`.
  if (!gateResolved) {
    return (
      <TileContainer mode="fit">
        <HomeIntroLoading />
      </TileContainer>
    );
  }

  // Path 1: intro. Owns its own HUD chrome registrations.
  if (!introDone) {
    return (
      <TileContainer mode="fit">
        <IntroFlow key={introRunKey} onFinished={finishIntro} />
      </TileContainer>
    );
  }

  // Path 2: tile presentation. Providers wrap the body so it can use
  // `useSlideshow()`, `useMascotRegistry()`, `usePersistentMascot()`,
  // and `useReplayIntro()` directly.
  return (
    <TileContainer mode="fit">
      <SlideshowProvider total={STEPS.length}>
        <PersistentMascotProvider>
          <ReplayIntroProvider replayIntro={replayIntro}>
            <BrandWordplayProvider>
              <HomeTileBody />
            </BrandWordplayProvider>
          </ReplayIntroProvider>
        </PersistentMascotProvider>
      </SlideshowProvider>
    </TileContainer>
  );
}

interface HomeTileBodyProps {}

function HomeTileBody(_props: HomeTileBodyProps = {}) {
  const stageRef = useRef<HTMLDivElement>(null);

  const { state, isFinalStep, goto, setHovered, setPlaying } = useSlideshow();
  const { activeIdx } = state;

  const { isMapViewOpen } = useHudState();
  const timelineHeight = useSlideshowTimelineHeight();

  // Manual nav inputs (wheel + arrow keys). Auto-advance is gone — the
  // header rail's progress fill is now purely visual; the user always
  // drives the actual slide change.
  useWheelAdvance(stageRef);
  useArrowKeyAdvance({ enabled: true });

  // HUD chrome. Top-center step rail + cross-slide bottom-bar hide.
  // Per-slide action bars install themselves from inside their own slide
  // components (e.g. `<LearnActionBar />` rendered by `LearnSlide`).
  useHomeStepRail();
  useHomeHudChrome();

  // Hide the shared bottom AI input bar until the user reaches the final
  // (Reward / Earn) step. When `hide: []` the registration is a no-op
  // and the bar reappears.
  useRegisterHudChromeHide({
    id: "home-slideshow-hide-ai",
    hide: isFinalStep ? [] : ["aiInputBar"],
    label: "Hidden during home slideshow (steps 1\u20135)",
  });

  // Learn → Control navigation. The Learn Play button also triggers the
  // hero→orb FLIP morph via class names preserved on the button itself
  // (see `useHeroToOrbMorph` + `LearnSlide`'s `.hero-action` class).
  const handleLearnPlay = useCallback(() => {
    goto(2);
    setPlaying(true);
  }, [goto, setPlaying]);

  // Each slide is a memoized React element. `lensResetKey` on See
  // re-centers the lens whenever the user enters or re-enters the slide.
  // Mascot animations (e.g. Excited 4eye on Learn) are fired by each
  // slide via `usePersistentMascot()` — no callbacks are threaded here.
  const slides = useMemo<ReactNode[]>(
    () => [
      <VideoSlide />,
      <LearnSlide
        onPlay={handleLearnPlay}
        mascot={<MascotSlotForSlide slideId="learn" />}
      />,
      <ControlSlide />,
      <SeeSlide
        lensResetKey={activeIdx === 3 ? `see-${activeIdx}` : "see-idle"}
      />,
      <CatalogSlide />,
      <DomainsSlide />,
      <EarnSlide />,
    ],
    [activeIdx, handleLearnPlay],
  );

  return (
    <Box
      ref={stageRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: "relative",
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {!isMapViewOpen && (
        <SlideshowTimeline
          steps={[...STEPS]}
          activeIdx={activeIdx}
          onStepClick={goto}
          groups={GROUPS}
          // Auto-advance is removed; the header rail owns the per-slide
          // progress affordance. Pass null so the timeline does not try
          // to render a competing fill.
          autoplayDurationMs={null}
          autoplayKey={STEPS[activeIdx]?.id ?? `${activeIdx}`}
        />
      )}

      <SlideStage slides={slides} timelineHeightPx={timelineHeight} />

      <PersistentMascotOverlay
        stageRef={stageRef}
        visibleOn={["learn"]}
      />
    </Box>
  );
}
