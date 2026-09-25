"use client"

/**
 * Slide1Logo — opening slide of the home-page intro flow.
 *
 *   • 4eye ProfileFrame (face) fades + scales in
 *   • Headline "4eye, the Human AI" reveals ("the Human AI" in primary blue)
 *   • Three pill-style sub-lines reveal sequentially:
 *       0.45s  +Learn More   →  School icon
 *       0.85s  +Earn More    →  Monetization icon
 *       1.25s  +Enjoy More   →  Celebration icon
 *     Each pill enters as a labeled chip, then after all three are
 *     revealed the labels crossfade into circular icon badges.
 *   • On exit: face morphs down + scales toward where Slide 2 will mount
 *     PushingProgress; headline + badges fade out together.
 */

import { useRef } from "react"
import { Box, Stack, Typography, useTheme } from "@mui/material"
import SchoolIcon from "@mui/icons-material/School"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import CelebrationIcon from "@mui/icons-material/Celebration"
import gsap from "gsap"

import { IntroSlide } from "@4eye/web/components/intro/IntroSlide"
import { useIntroFlow } from "@4eye/web/components/intro/IntroFlowContext"
import {
  MorphFaceToCharacter,
  type MorphFaceToCharacterHandle,
} from "@4eye/web/components/intro/slides/MorphFaceToCharacter"

const HEADLINE_FONT = "clamp(2rem, 4vw, 3.25rem)"

// MorphFaceToCharacter timeline (with defaults bigFaceScale=2.4,
// holdSeconds=1.0):
//   0.0–0.6s  face fades in big
//   0.6–1.6s  big face holds ("4eye" headline lands here, centered
//             below the face like the closing logo lockup)
//   1.6–2.15s shrink + body grow begins — wordmark slides to the
//             right of the face, subtitle reveals beside it
//   2.0–2.95s body → legs → arms draw in
// Chips appear AFTER the figure is fully drawn.
const HEADLINE_AT = 0.5
// Beat where the wordmark slides from below-face to right-of-face
// and the subtitle reveals. Synced with the body draw-in start.
const SHIFT_AT = 1.65
const SUBTITLE_AT = 1.95
// HUD reveals just after the subtitle so the chrome appears once the
// "the Human AI" promise has been read.
const HUD_REVEAL_AT = SUBTITLE_AT + 0.4
const CHIPS_START_AT = 3.2
const CHIP_STAGGER = 0.35
// Beat after the last chip lands before chips morph to icon badges.
const MORPH_DELAY_AFTER_LAST_CHIP = 0.7

const SUBLINES = [
  { text: "+Learn More", Icon: SchoolIcon },
  { text: "+Earn More",  Icon: MonetizationOnIcon },
  { text: "+Enjoy More", Icon: CelebrationIcon },
] as const

export interface Slide1LogoProps {
  index: number
}

export function Slide1Logo({ index }: Slide1LogoProps) {
  const theme = useTheme()
  const { revealHud } = useIntroFlow()
  const logoRef = useRef<HTMLDivElement | null>(null)
  const morphRef = useRef<MorphFaceToCharacterHandle | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const faceWrapRef = useRef<HTMLDivElement | null>(null)
  const textColRef = useRef<HTMLDivElement | null>(null)
  const headlineRef = useRef<HTMLHeadingElement | null>(null)
  const subtitleRef = useRef<HTMLDivElement | null>(null)
  const sublineRefs = useRef<Array<HTMLDivElement | null>>([])
  const labelRefs = useRef<Array<HTMLSpanElement | null>>([])
  const iconRefs = useRef<Array<HTMLSpanElement | null>>([])

  return (
    <IntroSlide
      index={index}
      // Big face + hold + shrink + limb draw-in run ~3s, then chips
      // reveal (~3.2–4.3s), then morph to icon badges (~5s). Settle
      // for ~1.5s so users can register the icon badges before Slide
      // 2 takes over.
      settleMs={1500}
      onEnter={({ enterComplete, reducedMotion }) => {
        const tl = gsap.timeline({ onComplete: enterComplete })

        // The MorphFaceToCharacter component runs its own face entry
        // + limb draw-in. We just need to make sure the wrapper is
        // visible — a soft fade keeps it in sync with the rest of
        // the slide elements.
        if (logoRef.current) {
          tl.fromTo(
            logoRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: "power2.out" },
            0,
          )
        }
        morphRef.current?.replay()

        // ----------------------------------------------------------------
        // Vertical → side-by-side choreography:
        //   • The wordmark "4eye" lives in the right-hand text column
        //     in its FINAL position. We measure where its center is
        //     relative to the face center and translate it to sit
        //     directly below the face for the initial reveal.
        //   • At SHIFT_AT we tween the translation back to 0 so the
        //     wordmark slides into its right-of-face home as the body
        //     starts drawing in.
        // ----------------------------------------------------------------
        let initialDx = 0
        let initialDy = 0
        if (faceWrapRef.current && headlineRef.current && heroRef.current) {
          // Clear any inline transform left behind by a previous run
          // (React 18 strict mode double-invokes effects, so the
          // headline may already be translated when we measure).
          gsap.set(headlineRef.current, { clearProps: "transform" })
          const faceRect = faceWrapRef.current.getBoundingClientRect()
          const wordRect = headlineRef.current.getBoundingClientRect()
          const faceCx = faceRect.left + faceRect.width / 2
          const wordCx = wordRect.left + wordRect.width / 2
          // Place wordmark center under face center (x), and below the
          // face's bottom edge with a small gap (y).
          initialDx = faceCx - wordCx
          initialDy = faceRect.bottom - wordRect.top + 12
        }

        if (headlineRef.current) {
          gsap.set(headlineRef.current, {
            x: initialDx,
            y: initialDy,
            opacity: 0,
          })
          tl.to(
            headlineRef.current,
            { opacity: 1, duration: 0.45, ease: "power2.out" },
            HEADLINE_AT,
          )
          // Slide back to its final right-of-face position when the
          // body starts drawing in.
          tl.to(
            headlineRef.current,
            { x: 0, y: 0, duration: 0.55, ease: "power3.inOut" },
            SHIFT_AT,
          )
        }

        if (subtitleRef.current) {
          tl.fromTo(
            subtitleRef.current,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            SUBTITLE_AT,
          )
        }

        // HUD reveal — moved here from Slide2 so the chrome appears
        // right after the "Human AI" promise lands.
        tl.call(() => revealHud(), undefined, HUD_REVEAL_AT)

        SUBLINES.forEach((_, i) => {
          const wrap = sublineRefs.current[i]
          if (!wrap) return
          tl.fromTo(
            wrap,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
            CHIPS_START_AT + i * CHIP_STAGGER,
          )
        })

        if (reducedMotion) {
          // Skip morph animation; show icons in final state immediately.
          if (headlineRef.current) {
            gsap.set(headlineRef.current, { x: 0, y: 0, opacity: 1 })
          }
          labelRefs.current.forEach((el) => el && gsap.set(el, { opacity: 0 }))
          iconRefs.current.forEach((el) => el && gsap.set(el, { opacity: 1, scale: 1 }))
          revealHud()
          return
        }

        // After all chips have arrived (last chip lands at
        // CHIPS_START_AT + 2*CHIP_STAGGER + 0.35 duration), give the
        // user a beat to read them, then morph each pill into a
        // circular icon badge.
        const morphAt =
          CHIPS_START_AT + 2 * CHIP_STAGGER + 0.35 + MORPH_DELAY_AFTER_LAST_CHIP
        SUBLINES.forEach((_, i) => {
          const label = labelRefs.current[i]
          const icon = iconRefs.current[i]
          if (!label || !icon) return
          const at = morphAt + i * 0.18
          tl.to(label, {
            opacity: 0,
            scale: 0.7,
            duration: 0.3,
            ease: "power2.in",
          }, at)
          tl.fromTo(
            icon,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2)" },
            at + 0.12,
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
              duration: 0.5,
              ease: "power2.inOut",
            },
            0,
          )
        }

        if (headlineRef.current) {
          tl.to(
            headlineRef.current,
            { opacity: 0, y: -8, duration: 0.35, ease: "power2.in" },
            0,
          )
        }

        if (subtitleRef.current) {
          tl.to(
            subtitleRef.current,
            { opacity: 0, y: -6, duration: 0.3, ease: "power2.in" },
            0,
          )
        }

        sublineRefs.current.forEach((el) => {
          if (!el) return
          tl.to(
            el,
            { opacity: 0, y: -6, duration: 0.3, ease: "power2.in" },
            0,
          )
        })
      }}
    >
      <Stack
        spacing={5}
        sx={{
          alignItems: "center",
          textAlign: "center",
          px: 3
        }}>
        {/* Hero row: face on the left, wordmark + subtitle on the right.
            (Stack `direction={{xs,sm}}` object form isn't generating media
            queries in this build, so we hardcode row + flexWrap and let the
            children wrap on narrow viewports.) */}
        <Box
          ref={heroRef}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            columnGap: 5,
            rowGap: 3,
            width: "100%",
          }}
        >
          <Box
            ref={(el: HTMLDivElement | null) => {
              logoRef.current = el
              faceWrapRef.current = el
            }}
            sx={{
              display: "inline-flex",
              opacity: 0,
              willChange: "opacity",
              flex: "0 0 auto",
            }}
          >
            <MorphFaceToCharacter
              ref={morphRef}
              height={300}
              bigFaceScale={3.2}
            />
          </Box>

          <Stack
            ref={textColRef}
            spacing={1}
            sx={{
              alignItems: "flex-start",
              textAlign: "left"
            }}>
            <Typography
              ref={headlineRef}
              component="h1"
              variant="h1"
              sx={{
                fontSize: HEADLINE_FONT,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                opacity: 0,
                willChange: "transform, opacity",
              }}
            >
              4eye
            </Typography>
            <Typography
              ref={subtitleRef}
              component="p"
              variant="h4"
              sx={{
                fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
                fontWeight: 600,
                color: "primary.main",
                letterSpacing: "0.01em",
                lineHeight: 1.1,
                opacity: 0,
              }}
            >
              the Human AI
            </Typography>
          </Stack>
        </Box>

        <Stack
          direction="row"
          spacing={{ xs: 1.5, sm: 2 }}
          useFlexGap
          sx={{
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
          {SUBLINES.map((line, i) => {
            const Icon = line.Icon
            return (
              <Box
                key={line.text}
                ref={(el: HTMLDivElement | null) => {
                  sublineRefs.current[i] = el
                }}
                aria-label={line.text.replace(/^\+/, "")}
                sx={{
                  opacity: 0,
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // Pill that ends up looking like a circular icon badge.
                  // Width is auto so the label can occupy it; once the
                  // label collapses to scale 0.7 + opacity 0 the icon
                  // (absolute) sits centered in the residual circle.
                  minWidth: 44,
                  height: 44,
                  px: 2,
                  borderRadius: 999,
                  border: 1,
                  borderColor: "primary.main",
                  color: "primary.main",
                  bgcolor: "transparent",
                }}
              >
                <Box
                  component="span"
                  ref={(el: HTMLSpanElement | null) => {
                    labelRefs.current[i] = el
                  }}
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {line.text}
                </Box>
                <Box
                  component="span"
                  ref={(el: HTMLSpanElement | null) => {
                    iconRefs.current[i] = el
                  }}
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transform: "scale(0)",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <Icon fontSize="small" />
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </IntroSlide>
  );
}
