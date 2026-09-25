"use client"
import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { Box } from "@mui/system"
import { ExpanseLogo } from "expanse.dynamicAssets/logo/ExpanseLogo.component"
import { BackdropContainer } from "./backdrop-container.compnent"
import { Backdrop } from "@mui/material"

export function ExpanseLoadingSpinner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const logoID = "loading-spinner-logo"

  useEffect(() => {
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
  }, [])

  return (
    <Box ref={containerRef}>
      <Box
        id="loading-spinner-size-wrapper"
        width="200px"
        height="200px"
        overflow="visible"
      >
        <ExpanseLogo id={logoID} />
      </Box>
    </Box>
  )
}

export function CenteredExpanseLoadingSpinner() {
  return (
    // Switched to mui backdrop without testing, may have a problem with needing fixed position or something
    <Backdrop
      sx={{
        color: "background.backdrop",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={true}
      // onClick={handleClose}
    >
      <ExpanseLoadingSpinner />
    </Backdrop>
  )
}
