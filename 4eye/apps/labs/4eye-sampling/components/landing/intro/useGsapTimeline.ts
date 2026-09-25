"use client"

/**
 * useGsapTimeline — minimal reusable wrapper around `gsap.timeline()`.
 *
 * Creates a paused timeline once per dep change, hands it to the caller's
 * `build` function so the caller can declaratively chain tweens, then
 * starts it. Cleanly kills the timeline on unmount or dep change.
 *
 * Returns the timeline ref so the caller can inspect / control it
 * (e.g. `tl.current?.progress(1)` to instant-complete in tests).
 */

import gsap from "gsap"
import { useEffect, useRef } from "react"

export function useGsapTimeline(
  build: (tl: gsap.core.Timeline) => void,
  deps: ReadonlyArray<unknown> = [],
) {
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const tl = gsap.timeline({ paused: true })
    tlRef.current = tl
    build(tl)
    tl.play()
    return () => {
      tl.kill()
      tlRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return tlRef
}
