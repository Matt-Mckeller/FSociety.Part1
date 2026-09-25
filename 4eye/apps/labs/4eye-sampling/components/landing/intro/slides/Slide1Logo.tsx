"use client"

/**
 * Slide1Logo — opening slide of the home-page intro flow.
 *
 *   • FourUpLogo fades + scales in
 *   • Headline "4Eye, The Human AI" types in
 *   • Three sub-lines reveal sequentially:
 *       0.9s  +Learn More
 *       1.5s  +Earn  More
 *       2.1s  +Enjoy More
 *   • On exit: logo morphs down toward where Slide 2 will mount
 *     PushingProgress; headline + sublines fade out together.
 */

import { useRef } from "react"
import { Box, Chip, Stack, Typography, useTheme } from "@mui/material"
import { FourUpLogo } from "@expanse/brand-core"
import gsap from "gsap"

import { IntroSlide } from "../IntroSlide"

const HEADLINE_FONT = "clamp(2rem, 4vw, 3.25rem)"

const SUBLINES = [
  { text: "+Learn More", delay: 0.9 },
  { text: "+Earn More",  delay: 1.5 },
  { text: "+Enjoy More", delay: 2.1 },
] as const

export interface Slide1LogoProps {
  index: number
}

export function Slide1Logo({ index }: Slide1LogoProps) {
  const theme = useTheme()
  const logoRef = useRef<HTMLDivElement | null>(null)
  const headlineRef = useRef<HTMLHeadingElement | null>(null)
  const sublineRefs = useRef<Array<HTMLDivElement | null>>([])

  return (
    <IntroSlide
      index={index}
      // Headline + 3 sublines unfold over ~2.4s, then settle ~1.5s.
      settleMs={1500}
      onEnter={({ enterComplete }) => {
        const tl = gsap.timeline({ onComplete: enterComplete })

        // Logo: fade + scale in.
        if (logoRef.current) {
          tl.fromTo(
            logoRef.current,
            { opacity: 0, scale: 0.6, y: 12 },
            { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "power2.out" },
            0,
          )
        }

        // Headline.
        if (headlineRef.current) {
          tl.fromTo(
            headlineRef.current,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            0.35,
          )
        }

        // Sublines.
        SUBLINES.forEach((line, i) => {
          const el = sublineRefs.current[i]
          if (!el) return
          tl.fromTo(
            el,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            line.delay,
          )
        })
      }}
      onExit={({ exitComplete }) => {
        const tl = gsap.timeline({ onComplete: exitComplete })

        // Logo morphs down + shrinks (handing off to PushingProgress slot).
        if (logoRef.current) {
          tl.to(
            logoRef.current,
            {
              y: 80,
              scale: 0.55,
              opacity: 0,
              duration: 0.55,
              ease: "power2.inOut",
            },
            0,
          )
        }

        if (headlineRef.current) {
          tl.to(
            headlineRef.current,
            { opacity: 0, y: -8, duration: 0.4, ease: "power2.in" },
            0,
          )
        }

        sublineRefs.current.forEach((el) => {
          if (!el) return
          tl.to(
            el,
            { opacity: 0, y: -6, duration: 0.35, ease: "power2.in" },
            0,
          )
        })
      }}
    >
      <Stack spacing={4} sx={{ textAlign: "center", px: 3, alignItems: "center" }}>
        <Box
          ref={logoRef}
          sx={{
            display: "inline-flex",
            opacity: 0,
            "& > svg": {
              width: "clamp(120px, 22vw, 240px)",
              height: "auto",
            },
          }}
        >
          <FourUpLogo
            size={240}
            config={{
              fillColor: theme.palette.primary.main,
              waveColor: theme.palette.primary.dark,
            }}
            title="4Eye logo"
            desc="Two overlapping circles representing the human and AI working together"
          />
        </Box>

        <Typography
          ref={headlineRef}
          component="h1"
          sx={{
            fontSize: HEADLINE_FONT,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            opacity: 0,
            maxWidth: "28ch",
            textWrap: "balance",
            "& strong": { color: "primary.main" },
          }}
        >
          <strong>4Eye</strong>, The Human AI
        </Typography>

        <Stack
          direction={{ zero: "column", tablet: "row" }}
          spacing={{ zero: 0.75, tablet: 1.25 }}
          sx={{ alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}
        >
          {SUBLINES.map((line, i) => (
            <Box
              key={line.text}
              ref={(el: HTMLDivElement | null) => {
                sublineRefs.current[i] = el
              }}
              sx={{ opacity: 0 }}
            >
              <Chip
                label={line.text}
                variant="outlined"
                color="primary"
              />
            </Box>
          ))}
        </Stack>
      </Stack>
    </IntroSlide>
  )
}
