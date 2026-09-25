/**
 * NarrativeCrossfade - scroll-triggered dark -> light crossfade panel.
 *
 * Renders two layers ("before"/"after") stacked in the same box and fades
 * from one to the other once the panel scrolls into view. Takes ReactNode
 * for both layers so it works with the hand-built SVG art in ./narrative-art
 * today, or a real <img>/<video> later - the crossfade mechanism itself
 * doesn't care what's inside.
 *
 * Respects prefers-reduced-motion by skipping the animated transition and
 * showing the resolved ("after") state immediately.
 */
import { Box, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"

export interface NarrativeCrossfadeProps {
  before: React.ReactNode
  after: React.ReactNode
  height?: number | string
  beforeLabel?: string
  afterLabel?: string
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])
  return reduced
}

export function NarrativeCrossfade({
  before,
  after,
  height = 220,
  beforeLabel,
  afterLabel,
}: NarrativeCrossfadeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [revealed, setRevealed] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) {
      setRevealed(true)
      return
    }
    const node = containerRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
            setRevealed(true)
            observer.disconnect()
          }
        }
      },
      { threshold: [0, 0.45, 1] },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reducedMotion])

  const transition = reducedMotion ? "none" : "opacity 1.6s ease"

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        height,
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, opacity: revealed ? 0 : 1, transition }}>{before}</Box>
      <Box sx={{ position: "absolute", inset: 0, opacity: revealed ? 1 : 0, transition }}>{after}</Box>

      {(beforeLabel || afterLabel) && (
        <Box
          sx={{
            position: "absolute",
            left: 12,
            right: 12,
            bottom: 10,
            display: "flex",
            justifyContent: "space-between",
            pointerEvents: "none",
          }}
        >
          {beforeLabel && (
            <Typography
              variant="caption"
              sx={{
                color: "rgba(255,255,255,0.85)",
                fontWeight: 700,
                letterSpacing: 0.4,
                textTransform: "uppercase",
                opacity: revealed ? 0 : 1,
                transition,
              }}
            >
              {beforeLabel}
            </Typography>
          )}
          {afterLabel && (
            <Typography
              variant="caption"
              sx={{
                color: "rgba(20,30,25,0.85)",
                fontWeight: 700,
                letterSpacing: 0.4,
                textTransform: "uppercase",
                ml: "auto",
                opacity: revealed ? 1 : 0,
                transition,
              }}
            >
              {afterLabel}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  )
}

export default NarrativeCrossfade
