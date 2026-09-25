"use client"
import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { Box } from "@mui/system"
import { Backdrop, CircularProgress } from "@mui/material"

/**
 * Props for ExpanseLoadingSpinner component.
 * Accepts an optional logo element to display instead of the default CircularProgress.
 * The logo must accept an `id` prop (string) for GSAP animation targeting.
 */
export interface ExpanseLoadingSpinnerProps {
  /** Optional custom logo element. Receives an `id` prop for animation targeting. */
  logo?: React.ReactElement<{ id?: string }>
}

/**
 * Animated loading spinner. When a `logo` prop is provided, it spins the logo
 * using a GSAP rotation animation. Falls back to MUI CircularProgress if no
 * logo is provided.
 *
 * @example
 * // With injectable logo
 * <ExpanseLoadingSpinner logo={<MyLogo id="loading-logo" />} />
 *
 * // Without logo (uses CircularProgress)
 * <ExpanseLoadingSpinner />
 */
export function ExpanseLoadingSpinner({ logo }: ExpanseLoadingSpinnerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const logoID = "loading-spinner-logo"

  useEffect(() => {
    if (!logo) return

    const q = gsap.utils.selector(containerRef)
    const loadingSpinnerLogo = q(`#${logoID}`)

    animationTimelineRef.current = gsap.timeline()
    animationTimelineRef.current.to(
      loadingSpinnerLogo,
      {
        rotate: "+=360",
        duration: 2,
        delay: 0,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 42%",
      },
      0,
    )

    return () => {
      animationTimelineRef.current?.kill()
    }
  }, [logo])

  if (!logo) {
    return <CircularProgress />
  }

  return (
    <Box ref={containerRef}>
      <Box
        id="loading-spinner-size-wrapper"
        sx={{
          width: "200px",
          height: "200px",
          overflow: "visible"
        }}>
        {React.cloneElement(logo, { id: logoID })}
      </Box>
    </Box>
  );
}

/**
 * Full-screen backdrop with centered loading spinner.
 * Uses MUI Backdrop with theme zIndex so it layers correctly above drawers.
 *
 * @example
 * <CenteredExpanseLoadingSpinner logo={<MyLogo />} />
 */
export function CenteredExpanseLoadingSpinner({ logo }: ExpanseLoadingSpinnerProps) {
  return (
    <Backdrop
      sx={{
        color: "background.backdrop",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={true}
    >
      <ExpanseLoadingSpinner logo={logo} />
    </Backdrop>
  )
}
