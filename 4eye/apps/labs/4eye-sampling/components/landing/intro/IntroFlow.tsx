"use client"

/**
 * IntroFlow — composes the IntroFlowProvider, the slide stage, and the
 * always-on DataChipOverlay. Hosts know nothing about individual slides;
 * they only mount this component and supply an `onFinished` callback to
 * reveal the rest of the page chrome.
 */

import { Box } from "@mui/material"
import type { ReactNode } from "react"

import { IntroFlowProvider } from "./IntroFlowContext"
import { DataChipOverlay } from "./DataChipOverlay"
import { Slide1Logo } from "./slides/Slide1Logo"
import { Slide2Progress } from "./slides/Slide2Progress"
import { Slide3Face } from "./slides/Slide3Face"

const SLIDE_COUNT = 3

export interface IntroFlowProps {
  /** Called when the final slide finishes its exit animation. */
  onFinished?: () => void
  /** If true, skip the intro entirely (returning visitors). */
  skip?: boolean
  /** Optional content rendered behind the slides (e.g. background art). */
  background?: ReactNode
}

export function IntroFlow({ onFinished, skip = false, background }: IntroFlowProps) {
  return (
    <IntroFlowProvider slideCount={SLIDE_COUNT} onFinished={onFinished} skip={skip}>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          bgcolor: "background.default",
          // Sit above page content but below modal layers.
          zIndex: 4,
        }}
      >
        {background}
        <Box sx={{ position: "absolute", inset: 0 }}>
          <Slide1Logo index={0} />
          <Slide2Progress index={1} />
          <Slide3Face index={2} />
        </Box>
        <DataChipOverlay />
      </Box>
    </IntroFlowProvider>
  )
}
