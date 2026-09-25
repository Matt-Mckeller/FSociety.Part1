"use client"

/**
 * Slide3Face — final slide. The 4eye face (ProfileFrame) flies in,
 * pauses centered, then animates toward the persistent HudRightRail's
 * profile FAB at right-center. We measure the *actual* FAB DOM rect
 * (`[data-fab-id="profile"]`) so the hand-off lands pixel-perfect even
 * after the chrome layout settles.
 *
 * Note: while the intro is running the right rail is hidden via
 * `useRegisterHudChromeHide`. The HudRightRail is registered (and so
 * present in the DOM tree) only AFTER `onFinished` fires. We therefore
 * try the live FAB rect first and fall back to a viewport-relative
 * estimate if the rail isn't mounted yet.
 */

import { useRef } from "react"
import { Box, Stack, Typography } from "@mui/material"
import { ProfileFrame } from "@expanse/character/2d"
import gsap from "gsap"

import { IntroSlide } from "@4eye/web/components/intro/IntroSlide"

const TAGLINE_FONT = "clamp(1.25rem, 2vw, 1.5rem)"

export interface Slide3FaceProps {
  index: number
}

/**
 * Locate the right-rail profile FAB and return its center point.
 * Falls back to a viewport-relative estimate (right edge, vertical
 * center) when the rail isn't mounted yet — typical when the intro is
 * still running and the rail is hidden via the chrome-visibility registry.
 */
function getRightRailFabCenter(): { x: number; y: number } {
  if (typeof document !== "undefined") {
    const fab = document.querySelector<HTMLElement>('[data-fab-id="profile"]')
    if (fab) {
      const r = fab.getBoundingClientRect()
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
    }
  }
  if (typeof window !== "undefined") {
    return {
      x: window.innerWidth - 56,
      y: window.innerHeight / 2,
    }
  }
  return { x: 0, y: 0 }
}

export function Slide3Face({ index }: Slide3FaceProps) {
  const faceRef = useRef<HTMLDivElement | null>(null)
  const taglineRef = useRef<HTMLParagraphElement | null>(null)

  return (
    <IntroSlide
      index={index}
      // Hold the face on screen briefly before flying it to the right rail.
      settleMs={1000}
      onEnter={({ enterComplete }) => {
        const tl = gsap.timeline({ onComplete: enterComplete })
        if (faceRef.current) {
          tl.fromTo(
            faceRef.current,
            { opacity: 0, scale: 0.5, y: 30 },
            { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.4)" },
            0,
          )
        }
        if (taglineRef.current) {
          tl.fromTo(
            taglineRef.current,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            0.45,
          )
        }
      }}
      onExit={({ exitComplete }) => {
        const tl = gsap.timeline({ onComplete: exitComplete })

        if (taglineRef.current) {
          tl.to(taglineRef.current, {
            opacity: 0,
            duration: 0.25,
            ease: "power2.in",
          }, 0)
        }

        if (faceRef.current) {
          const rect = faceRef.current.getBoundingClientRect()
          const target = getRightRailFabCenter()
          const targetX = target.x - (rect.left + rect.width / 2)
          const targetY = target.y - (rect.top + rect.height / 2)

          tl.to(
            faceRef.current,
            {
              x: targetX,
              y: targetY,
              scale: 0.18,
              duration: 0.7,
              ease: "power3.inOut",
            },
            0,
          ).to(
            faceRef.current,
            { opacity: 0, duration: 0.2, ease: "power2.in" },
            "-=0.15",
          )
        }
      }}
    >
      <Stack
        spacing={4}
        sx={{
          alignItems: "center",
          textAlign: "center",
          px: 3
        }}>
        <Box
          ref={faceRef}
          sx={{
            display: "inline-flex",
            opacity: 0,
            willChange: "transform, opacity",
          }}
        >
          <ProfileFrame
            tier={1}
            showBadge={false}
            size={220}
            shape="circle"
            variant="friendly"
            zoom="face"
          />
        </Box>

        <Typography
          ref={taglineRef}
          component="p"
          variant="h5"
          sx={{
            fontSize: TAGLINE_FONT,
            fontWeight: 600,
            opacity: 0,
            color: "text.secondary",
          }}
        >
          Meet your 4eye.
        </Typography>
      </Stack>
    </IntroSlide>
  );
}
