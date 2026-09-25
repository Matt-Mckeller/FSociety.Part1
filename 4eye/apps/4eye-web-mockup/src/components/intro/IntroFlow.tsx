"use client"

/**
 * IntroFlow — composes the IntroFlowProvider and the slide stage.
 * Hosts know nothing about individual slides; they only mount this
 * component and supply an `onFinished` callback.
 *
 * Polish:
 *  - Persists an `intro-seen` flag in localStorage. Returning visitors
 *    skip straight to `phase="finished"` (and `onFinished` fires once).
 *  - Honors `prefers-reduced-motion`: slides receive a `reducedMotion`
 *    flag through the IntroFlow context and short-circuit their GSAP
 *    timelines.
 *  - Hides left rail, right rail, and bottom chrome during the intro.
 *    The topRow (RealmLocationBar) stays visible throughout for realm
 *    and page context.
 *  - Soft radial-gradient background sits behind the slide stage.
 */

import { useEffect, useMemo, useState } from "react"
import { Box, useMediaQuery } from "@mui/material"
import { useRegisterHudChromeHide } from "@expanse/hud"
import type { ReactNode } from "react"

import { IntroFlowProvider } from "@4eye/web/components/intro/IntroFlowContext"
import { Slide1Logo } from "@4eye/web/components/intro/slides/Slide1Logo"
import { Slide2Progress } from "@4eye/web/components/intro/slides/Slide2Progress"
import { SlideWhere } from "@4eye/web/components/intro/slides/SlideWhere"
import { Slide3Face } from "@4eye/web/components/intro/slides/Slide3Face"

const SLIDE_COUNT = 4
const STORAGE_KEY = "4eye:intro-seen:v1"

export interface IntroFlowProps {
  /** Called when the final slide finishes its exit animation. */
  onFinished?: () => void
  /** Force-skip the intro (e.g. in dev or for explicit "Replay"). */
  skip?: boolean
  /** Optional content rendered behind the slides (e.g. background art). */
  background?: ReactNode
  /**
   * If true, persist a "seen" flag on `onFinished` and consume it on
   * mount so returning visitors skip the intro. Defaults to true.
   */
  rememberSeen?: boolean
}

function readSeen(): boolean {
  if (typeof window === "undefined") return false
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1"
  } catch {
    return false
  }
}

function writeSeen() {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, "1")
  } catch {
    /* ignore quota / privacy errors */
  }
}

export function IntroFlow({
  onFinished,
  skip = false,
  background,
  rememberSeen = true,
}: IntroFlowProps) {
  // Hide side rails and bottom chrome during the intro; the topRow
  // (RealmLocationBar) remains visible throughout so users have realm
  // and page context while the presentation plays.
  const [hudRevealed, setHudRevealed] = useState(false)

  useRegisterHudChromeHide({
    id: "intro-flow-hide-chrome",
    hide: hudRevealed ? [] : ["leftRail", "rightRail", "bottomChrome"],
    label: "Hidden during home intro",
  })

  // Reduced-motion preference. Slides read this through context and
  // short-circuit their timelines.
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
    { noSsr: true },
  )

  // Returning-visitor skip. Read once on mount; never updates while the
  // intro is running.
  const [resolvedSkip] = useState(
    () => skip || (rememberSeen && readSeen()),
  )

  const handleFinished = useMemo(() => {
    return () => {
      if (rememberSeen) writeSeen()
      onFinished?.()
    }
  }, [onFinished, rememberSeen])

  // If we're skipping, fire onFinished immediately on mount so the host
  // doesn't have to special-case it.
  useEffect(() => {
    if (!resolvedSkip) return
    handleFinished()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (resolvedSkip) return null

  return (
    <IntroFlowProvider
      slideCount={SLIDE_COUNT}
      onFinished={handleFinished}
      reducedMotion={prefersReducedMotion}
      hudRevealed={hudRevealed}
      onRevealHud={() => setHudRevealed(true)}
    >
      <Box
        sx={{
          // `absolute` (not `fixed`) so we're clipped by the surrounding
          // `TileContainer` / `HudContentArea` and don't paint underneath
          // the bottom HUD chrome. Fixed positioning bypasses ancestor
          // `overflow: hidden` and would leak below the FAB / AI-input bar.
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          // Soft brand-tinted radial gradient behind everything.
          backgroundImage: (theme) =>
            `radial-gradient(circle at 50% 38%, ${theme.palette.primary.main}14 0%, ${theme.palette.background.default} 62%)`,
          bgcolor: "background.default",
          // Sit above sibling tile content but below modal layers.
          zIndex: 50,
        }}
      >
        {background}
        <Box sx={{ position: "absolute", inset: 0 }}>
          <Slide1Logo index={0} />
          <Slide2Progress index={1} />
          <SlideWhere index={2} />
          <Slide3Face index={3} />
        </Box>

      </Box>
    </IntroFlowProvider>
  )
}
