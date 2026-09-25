"use client"

/**
 * IntroSlide — wrapper that coordinates one slide with the orchestrator.
 *
 * Each slide:
 *  1. Builds its `enter` GSAP timeline on mount; calls `enterComplete()`
 *     when the timeline finishes.
 *  2. Sits idle in `phase="settled"` for `settleMs`. The wrapper then
 *     calls `advance()` to move the orchestrator into `phase="exiting"`.
 *  3. Builds its `exit` GSAP timeline; calls `exitComplete()` when done.
 *
 * The slide content is provided via `render({ phase })` so callers can
 * render different content per phase if they want, but most slides just
 * render the same DOM for all phases and let the GSAP timelines animate it.
 */

import { useEffect } from "react"
import { Box, type BoxProps } from "@mui/material"

import { useIntroFlow, type IntroPhase } from "./IntroFlowContext"

export interface IntroSlideRenderProps {
  phase: IntroPhase
  /** True when this slide is the active one in the orchestrator. */
  isActive: boolean
}

export interface IntroSlideProps {
  /** 0-indexed slide id; must match position in the orchestrator. */
  index: number
  /** How long to remain in `phase="settled"` before requesting exit. */
  settleMs?: number
  /** Slide content. */
  children:
    | React.ReactNode
    | ((props: IntroSlideRenderProps) => React.ReactNode)
  /**
   * Called when the slide enters `phase="entering"`. Use this to play any
   * imperative GSAP timelines on refs. Must call `enterComplete()` from the
   * second argument when the visual entry has finished.
   */
  onEnter?: (api: SlideApi) => void
  /**
   * Called when the slide enters `phase="exiting"`. Mirrors `onEnter`.
   * Must call `exitComplete()` when finished.
   */
  onExit?: (api: SlideApi) => void
  /** Outer wrapper sx (positioning, layering). */
  sx?: BoxProps["sx"]
}

export interface SlideApi {
  enterComplete: () => void
  exitComplete: () => void
}

export function IntroSlide({
  index,
  settleMs = 1500,
  children,
  onEnter,
  onExit,
  sx,
}: IntroSlideProps) {
  const flow = useIntroFlow()
  const isActive = flow.slide === index

  // Drive enter / exit timelines off phase changes.
  useEffect(() => {
    if (!isActive) return
    if (flow.phase === "entering") {
      const api: SlideApi = {
        enterComplete: flow.enterComplete,
        exitComplete: flow.exitComplete,
      }
      if (onEnter) {
        onEnter(api)
      } else {
        // No-op slide — immediately complete.
        flow.enterComplete()
      }
    }
    if (flow.phase === "exiting") {
      const api: SlideApi = {
        enterComplete: flow.enterComplete,
        exitComplete: flow.exitComplete,
      }
      if (onExit) {
        onExit(api)
      } else {
        flow.exitComplete()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, flow.phase])

  // Auto-advance once we settle.
  useEffect(() => {
    if (!isActive) return
    if (flow.phase !== "settled") return
    const t = window.setTimeout(() => {
      flow.advance()
    }, settleMs)
    return () => window.clearTimeout(t)
  }, [isActive, flow.phase, settleMs, flow])

  if (!isActive) return null

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
    >
      {typeof children === "function"
        ? children({ phase: flow.phase, isActive })
        : children}
    </Box>
  )
}
