"use client"

/**
 * FourEyeMascot — thin wrapper around the {@link Character4eye} figure in
 * its `reactive` interaction mode.
 *
 * The wave / poke / idle-bob behaviors and a11y wrapper live in the figure
 * itself (`Character4eye` + `useCharacterReactions`), so this component only
 * sets the mascot's default size, variant, and ARIA label for landing
 * experiences.
 */

import { forwardRef, useImperativeHandle, useRef } from "react"
import { Box, type BoxProps } from "@mui/material"
import {
  Character4eye,
  type Character4eyeProps,
  type Character4eyeControls,
} from ".."

export interface FourEyeMascotHandle {
  /** Underlying wrapper element, for parent GSAP entrance/exit tweens. */
  el: HTMLDivElement | null
  /** Imperative reaction triggers — fire reactions from outside the mascot. */
  /** Trigger Select 4eye (friendly hover acknowledgement). */
  playSelect: () => void
  /** Trigger Anxious 4eye (startled click reaction). */
  playAnxious: () => void
  /** Trigger Excited 4eye (V-pose hop celebration with arm-fall gag). */
  playExcited: () => void
}

export interface FourEyeMascotProps {
  /** Visual size of the character SVG. */
  size?: string | number
  /** Forwarded to {@link Character4eye}. */
  variant?: Character4eyeProps["variant"]
  /** Forwarded to {@link Character4eye}. */
  eyeDesign?: Character4eyeProps["eyeDesign"]
  /** Forwarded to {@link Character4eye}. */
  strapStyle?: Character4eyeProps["strapStyle"]
  /** Forwarded to {@link Character4eye}. */
  mood?: Character4eyeProps["mood"]
  /** Forwarded to {@link Character4eye}. */
  showAntenna?: Character4eyeProps["showAntenna"]
  /** Forwarded to {@link Character4eye}. */
  showStatusLEDs?: Character4eyeProps["showStatusLEDs"]
  /** Forwarded to {@link Character4eye}. */
  statusLEDCount?: Character4eyeProps["statusLEDCount"]
  /** Forwarded to {@link Character4eye}. */
  showEarSensors?: Character4eyeProps["showEarSensors"]
  /** Forwarded to {@link Character4eye}. */
  showForeheadMark?: Character4eyeProps["showForeheadMark"]
  /** Forwarded to {@link Character4eye}. */
  showDataFlow?: Character4eyeProps["showDataFlow"]
  /** Forwarded to {@link Character4eye}. Default 1. */
  pulseIntensity?: Character4eyeProps["pulseIntensity"]
  /** Honors prefers-reduced-motion at the call site. */
  reducedMotion?: boolean
  /** Override the ARIA label on the focusable wrapper. */
  ariaLabel?: string
  /** Optional extra MUI sx for the outer Box. */
  sx?: BoxProps["sx"]
}

export const FourEyeMascot = forwardRef<FourEyeMascotHandle, FourEyeMascotProps>(
  function FourEyeMascot(
    {
      size = "clamp(180px, 26vw, 320px)",
      variant = "minimal",
      eyeDesign = "orb",
      strapStyle,
      mood,
      showAntenna,
      showStatusLEDs,
      statusLEDCount,
      showEarSensors,
      showForeheadMark,
      showDataFlow,
      pulseIntensity = 1,
      reducedMotion = false,
      ariaLabel = "4Eye mascot — hover for Select 4eye, click for Anxious 4eye",
      sx,
    },
    ref,
  ) {
    const elRef = useRef<HTMLDivElement | null>(null)
    const controlsRef = useRef<Character4eyeControls | null>(null)

    useImperativeHandle(
      ref,
      () => ({
        el: elRef.current,
        playSelect: () => controlsRef.current?.playSelect(),
        playAnxious: () => controlsRef.current?.playAnxious(),
        playExcited: () => controlsRef.current?.playExcited(),
      }),
      [],
    )

    return (
      <Box
        ref={elRef}
        sx={[
          {
            width: size,
            height: size,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Character4eye
          variant={variant}
          eyeDesign={eyeDesign}
          strapStyle={strapStyle}
          mood={mood}
          showAntenna={showAntenna}
          showStatusLEDs={showStatusLEDs}
          statusLEDCount={statusLEDCount}
          showEarSensors={showEarSensors}
          showForeheadMark={showForeheadMark}
          showDataFlow={showDataFlow}
          pulseIntensity={pulseIntensity}
          interactionMode="reactive"
          reactions={{ ariaLabel, reducedMotion }}
          controlsRef={controlsRef}
        />
      </Box>
    )
  },
)
