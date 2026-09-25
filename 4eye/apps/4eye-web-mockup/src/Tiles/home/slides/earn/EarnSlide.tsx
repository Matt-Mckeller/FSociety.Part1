"use client"

/**
 * EarnSlide — single-page "you made it" slide.
 *
 * Renders the inline Quests panel with the Claim Rewards CTA. The
 * post-claim coin-fly animation is handled inside QuestsPanelCard;
 * this slide has no further pages.
 *
 * The full nav map (formerly page 2 here) now lives in the HUD overlay
 * (`MinimapFullViewOverlay`) and is opened from the HUD's MinimapDock,
 * not from this slide.
 *
 * Architecture:
 *   - State machine     → `state/earn-slide.reducer.ts` (just an
 *                         `hasEntered` flag, gates the entrance fade)
 *   - Context + hook    → `state/EarnSlideContext.tsx`
 *   - Custom hooks      → `hooks/useEntranceObserver.ts`
 *   - Page components   → `components/EarnQuestsPage.tsx`
 */

import { useRef } from "react"
import { Box, Fade } from "@mui/material"

import { SlideShell } from "@4eye/web/Tiles/home/slides/shared"
import { SlideHeader } from "@4eye/web/Tiles/home/shared/SlideHeader"
import {
  useAwardOnce,
  useMarketingProgress,
} from "@4eye/web/components/marketing-progress"
import { useOpenMapView } from "@4eye/web/components/hud/state"

import { EarnSlideProvider, useEarnSlide } from "./state"
import { useEntranceObserver } from "./hooks"
import { EarnQuestsPage } from "./components"
import { EarnActionBar } from "./EarnActionBar"

export default function EarnSlide() {
  return (
    <EarnSlideProvider>
      <EarnSlideBody />
    </EarnSlideProvider>
  )
}

/**
 * Inner body — separated so it can call `useEarnSlide()` (which
 * requires a `EarnSlideProvider` ancestor). Keeping the provider
 * mount and the consumer inside the same module is a deliberate
 * trade-off: nothing else in the tree needs the slide's state, so
 * the public component stays a single default export.
 */
function EarnSlideBody() {
  const rootRef = useRef<HTMLDivElement>(null)
  const { state, dispatch } = useEarnSlide()
  const { addCoins, addXp } = useMarketingProgress()
  const openMapView = useOpenMapView()

  // Award once per session — drives the HUD coin/XP counter to tick.
  useAwardOnce("home-reward-coins", () => addCoins(12))
  useAwardOnce("home-reward-xp", () => addXp(50))

  // Slides in this deck mount eagerly, so the body fades in only
  // once the user actually scrolls/advances to the slide.
  useEntranceObserver(rootRef, {
    threshold: 0.4,
    onEnter: () => dispatch({ type: "ENTER" }),
  })

  // After the user claims their rewards, hand off to the full-screen
  // map experience. Small delay lets the coin-fly animation play out.
  const handleAllClaimed = () => {
    window.setTimeout(() => openMapView(), 900)
  }

  return (
    <SlideShell tone="accent" maxWidth="md" id="reward">
      <EarnActionBar />
      <Box ref={rootRef} sx={{ width: "100%" }}>
        <SlideHeader eyebrow="Won, you have." title="Welcome to 4eye." />
        {/* Quests panel fades in once the slide enters; quest cards
            inside stagger their own further reveal. */}
        <Fade in={state.hasEntered} timeout={600}>
          <Box sx={{ width: "100%" }}>
            <EarnQuestsPage
              entered={state.hasEntered}
              onAllClaimed={handleAllClaimed}
            />
          </Box>
        </Fade>
      </Box>
    </SlideShell>
  )
}
