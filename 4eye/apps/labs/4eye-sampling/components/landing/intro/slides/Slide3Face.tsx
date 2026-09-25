"use client"

/**
 * Slide3Face — final slide. The 4eye face (ProfileFrame) flies in,
 * pauses centered, then animates toward the top-right area of the
 * viewport where the persistent HudRightRail's profile FAB lives.
 * On exit-complete the orchestrator finishes and the host page
 * reveals the rest of the HUD chrome (including the right rail),
 * giving the illusion of a hand-off.
 */

import { useRef } from "react"
import { Box, Stack, Typography } from "@mui/material"
import { ProfileFrame } from "@expanse/character/2d"
import gsap from "gsap"

import { IntroSlide } from "../IntroSlide"

const TAGLINE_FONT = "clamp(1.25rem, 2vw, 1.5rem)"

export interface Slide3FaceProps {
  index: number
}

export function Slide3Face({ index }: Slide3FaceProps) {
  const faceRef = useRef<HTMLDivElement | null>(null)
  const taglineRef = useRef<HTMLParagraphElement | null>(null)

  return (
    <IntroSlide
      index={index}
      // Hold the face on screen briefly before flying it to the right rail.
      settleMs={1200}
      onEnter={({ enterComplete }) => {
        const tl = gsap.timeline({ onComplete: enterComplete })
        if (faceRef.current) {
          tl.fromTo(
            faceRef.current,
            { opacity: 0, scale: 0.5, y: 30 },
            { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.4)" },
            0,
          )
        }
        if (taglineRef.current) {
          tl.fromTo(
            taglineRef.current,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
            0.5,
          )
        }
      }}
      onExit={({ exitComplete }) => {
        const tl = gsap.timeline({ onComplete: exitComplete })

        if (taglineRef.current) {
          tl.to(taglineRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          }, 0)
        }

        // Fly the face toward the top-right where the HudRightRail lives.
        if (faceRef.current) {
          const rect = faceRef.current.getBoundingClientRect()
          // Target ≈ top-right; the right rail sits at right-center, but
          // the visual hand-off looks better landing near the action-bar
          // band's right edge.
          const targetX = window.innerWidth - 64 - rect.left - rect.width / 2
          const targetY =
            window.innerHeight / 2 - rect.top - rect.height / 2

          tl.to(
            faceRef.current,
            {
              x: targetX,
              y: targetY,
              scale: 0.28,
              duration: 0.75,
              ease: "power3.inOut",
            },
            0,
          ).to(
            faceRef.current,
            { opacity: 0, duration: 0.25, ease: "power2.in" },
            "-=0.2",
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
