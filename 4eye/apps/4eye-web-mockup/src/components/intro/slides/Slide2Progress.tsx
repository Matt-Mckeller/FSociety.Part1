"use client"

/**
 * Slide2Progress — PushingProgressCharacter (dramatic) with mid-push
 * text reveals, HUD fade-in, and a post-celebration promise reveal.
 *
 * Timeline:
 *   0.00s  Stage fades in. Character starts pushing (0→100, quick preset).
 *   0.40s  Part A "Unlock your potential." fades in (centered).
 *          HUD chrome is revealed (IntroFlow drops its chrome-hide registration).
 *   1.70s  Part B "Multiply yourself." fades in.
 *   ~3-4s  PushingProgressCharacter fires onComplete (push + celebration done).
 *          Promises "Learn More · Earn More · Enjoy More" stagger in below.
 *          enterComplete() is called → settle timer starts (1.4s) → exit.
 */

import { useEffect, useRef, useState } from "react"
import { Box, Stack, Typography } from "@mui/material"
import { Portal } from "@expanse/brand-core"
import { PushingProgressCharacter } from "@expanse/character/2d"
import gsap from "gsap"

import { IntroSlide } from "@4eye/web/components/intro/IntroSlide"
import { MultiplyTrio } from "@4eye/web/components/intro/slides/MultiplyTrio"
import {
  LiquidMorphFilter,
  useLiquidMorphFilterId,
} from "@4eye/web/components/intro/slides/LiquidMorphFilter"

// Tweak these if the dramatic preset timing changes.
const PART_A_AT = 0.4   // seconds after slide enters
const PART_B_AT = 1.7   // seconds after slide enters

// Portal + liquid emerge timeline (runs before the push starts).
const PORTAL_OPEN_DUR = 0.5
const EMERGE_DUR = 0.9
const EMERGE_TRAVEL_PX = 90
// Stage height reserved for the push area; ground line sits at
// (height - GROUND_OFFSET) and the portal is centered on it.
const STAGE_HEIGHT = 240
const GROUND_OFFSET = 28
const PORTAL_WIDTH = 220

const PROMISES = ["+Learning", "+Mood", "+Engagement"]

const CELEBRATION_FONT = "clamp(1.75rem, 3.2vw, 2.5rem)"
const PROMISE_FONT = "clamp(0.95rem, 1.6vw, 1.2rem)"

export interface Slide2ProgressProps {
  index: number
}

export function Slide2Progress({ index }: Slide2ProgressProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const partARef = useRef<HTMLSpanElement | null>(null)
  const partBRef = useRef<HTMLSpanElement | null>(null)
  const promisesRef = useRef<HTMLDivElement | null>(null)
  const pushWrapRef = useRef<HTMLDivElement | null>(null)
  const trioWrapRef = useRef<HTMLDivElement | null>(null)
  const portalRef = useRef<HTMLDivElement | null>(null)
  const liquidMapRef = useRef<SVGFEDisplacementMapElement | null>(null)
  const enterCompleteRef = useRef<(() => void) | null>(null)
  const reducedMotionRef = useRef(false)
  const [showTrio, setShowTrio] = useState(false)
  const [pusherMounted, setPusherMounted] = useState(false)
  const liquidFilterId = useLiquidMorphFilterId("slide2-emerge")

  const staggerPromises = () => {
    const els = promisesRef.current
      ? Array.from(promisesRef.current.querySelectorAll<HTMLElement>(".intro-promise"))
      : []
    if (els.length) {
      gsap.fromTo(
        els,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.12,
          ease: "power2.out",
          onComplete: () => {
            enterCompleteRef.current?.()
            enterCompleteRef.current = null
          },
        },
      )
    } else {
      enterCompleteRef.current?.()
      enterCompleteRef.current = null
    }
  }

  // Fade trio in once it mounts (after the push wrapper has faded out).
  useEffect(() => {
    if (!showTrio) return
    const el = trioWrapRef.current
    if (!el) return
    if (reducedMotionRef.current) {
      gsap.set(el, { opacity: 1 })
      return
    }
    gsap.fromTo(
      el,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" },
    )
  }, [showTrio])

  // When the pusher mounts (after portal has opened), animate it
  // emerging upward through the portal: translate from below ground
  // to its final position while the liquid-morph filter scale decays
  // from heavy distortion down to 0 (calm surface).
  useEffect(() => {
    if (!pusherMounted) return
    if (reducedMotionRef.current) return
    const wrap = pushWrapRef.current
    const map = liquidMapRef.current
    if (!wrap) return
    gsap.fromTo(
      wrap,
      { y: EMERGE_TRAVEL_PX },
      { y: 0, duration: EMERGE_DUR, ease: "power3.out" },
    )
    if (map) {
      gsap.fromTo(
        map,
        { attr: { scale: 22 } },
        {
          attr: { scale: 0 },
          duration: EMERGE_DUR,
          ease: "power2.out",
        },
      )
    }
  }, [pusherMounted])

  return (
    <IntroSlide
      index={index}
      // Both text parts are on-screen well before onComplete; hold briefly
      // after the character's celebration finishes.
      settleMs={1400}
      onEnter={({ enterComplete, reducedMotion }) => {
        enterCompleteRef.current = enterComplete
        reducedMotionRef.current = reducedMotion

        // Fade the whole stage in.
        if (containerRef.current) {
          gsap.fromTo(
            containerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, ease: "power2.out" },
          )
        }

        if (reducedMotion) {
          // Skip timed reveals; show everything immediately.
          if (partARef.current) gsap.set(partARef.current, { opacity: 1 })
          if (partBRef.current) gsap.set(partBRef.current, { opacity: 1 })
          if (promisesRef.current) gsap.set(promisesRef.current, { opacity: 1 })
          // Skip portal/emerge — mount the pusher straight away.
          setPusherMounted(true)
          return
        }

        // Portal opens, then character emerges through it.
        if (portalRef.current) {
          gsap.fromTo(
            portalRef.current,
            { opacity: 0, scale: 0.4 },
            {
              opacity: 1,
              scale: 1,
              duration: PORTAL_OPEN_DUR,
              ease: "back.out(2)",
              transformOrigin: "50% 50%",
            },
          )
        }
        // Mount pusher right after portal opens; the emerge effect
        // (translateY + liquid filter decay) is wired in the
        // pusherMounted effect below.
        gsap.delayedCall(PORTAL_OPEN_DUR + 0.05, () => {
          setPusherMounted(true)
        })

        // Part A reveal at PART_A_AT seconds. (HUD reveal moved to
        // Slide1 — it now appears right after the "Human AI" subtitle.)
        gsap.delayedCall(PART_A_AT, () => {
          if (partARef.current) {
            gsap.fromTo(
              partARef.current,
              { opacity: 0, y: 8 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            )
          }
        })

        // Part B fade-in at PART_B_AT seconds.
        gsap.delayedCall(PART_B_AT, () => {
          if (partBRef.current) {
            gsap.fromTo(
              partBRef.current,
              { opacity: 0, y: 8 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            )
          }
        })
      }}
      onExit={({ exitComplete }) => {
        const tl = gsap.timeline({ onComplete: exitComplete })
        if (containerRef.current) {
          tl.to(containerRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.45,
            ease: "power2.in",
          })
        } else {
          exitComplete()
        }
      }}
    >
      <Stack
        ref={containerRef}
        spacing={4}
        sx={{
          alignItems: "center",
          textAlign: "center",
          px: 3,
          opacity: 0
        }}>
        <Box
          sx={{
            width: "min(560px, 90vw)",
            position: "relative",
            // Reserve enough vertical room so the swap from progress
            // character (200 + bar) to trio (~180) doesn't reflow.
            minHeight: STAGE_HEIGHT,
            // Hide the character below the ground line until it's
            // emerged through the portal (clips the part of the
            // PushingProgressCharacter SVG that's still under ground).
            overflow: "hidden",
          }}
        >
          {/* Liquid distortion filter — referenced via CSS filter url()
              by the emerging pushWrap. The displacement scale is
              GSAP-tweened from heavy → 0 in the pusherMounted effect. */}
          <LiquidMorphFilter ref={liquidMapRef} id={liquidFilterId} scale={22} />

          {/* Ground portal — sits on the ground line at the bottom of
              the stage. The character emerges UP through this.
              Outer box handles centering (never touched by GSAP so
              the CSS translate is preserved). Inner box is the one
              GSAP animates (scale + opacity), avoiding the well-known
              GSAP-overrides-CSS-transform conflict. */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              bottom: GROUND_OFFSET,
              transform: "translate(-50%, 50%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <Box
              ref={portalRef}
              sx={{
                opacity: 0,
                willChange: "transform, opacity",
              }}
            >
              <Portal
                variant="ground"
                width={PORTAL_WIDTH}
                depth={0.35}
                rings={4}
                showVortex
                animated
                animationSpeed={0.8}
              />
            </Box>
          </Box>

          <Box
            ref={pushWrapRef}
            sx={{
              position: showTrio ? "absolute" : "relative",
              inset: 0,
              zIndex: 1,
              // Apply the liquid morph filter to the entire pushing
              // wrapper while the character is emerging. GSAP decays
              // the filter's displacement scale to 0 as it surfaces.
              filter: `url(#${liquidFilterId})`,
              willChange: "transform",
            }}
          >
            {pusherMounted && (
              <PushingProgressCharacter
                preset="quick"
                loop={false}
                fromProgress={0}
                toProgress={100}
                variant="friendly"
                showAntenna
                onComplete={() => {
                // Push + celebration done. Crossfade to MultiplyTrio,
                // play split-and-baby, then stagger in the promises.
                const reduced = reducedMotionRef.current
                if (reduced) {
                  setShowTrio(true)
                  staggerPromises()
                  return
                }
                if (pushWrapRef.current) {
                  gsap.to(pushWrapRef.current, {
                    opacity: 0,
                    duration: 0.35,
                    ease: "power2.in",
                    onComplete: () => setShowTrio(true),
                  })
                } else {
                  setShowTrio(true)
                }
              }}
            />
            )}
          </Box>

          {showTrio && (
            <Box
              ref={trioWrapRef}
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
              }}
            >
              <MultiplyTrio
                reducedMotion={reducedMotionRef.current}
                onComplete={staggerPromises}
              />
            </Box>
          )}
        </Box>

        <Typography
          component="h2"
          variant="h2"
          sx={{
            fontSize: CELEBRATION_FONT,
            fontWeight: 700,
            letterSpacing: "-0.01em",
            textAlign: "center",
            "& strong": { color: "primary.main" },
          }}
        >
          <span ref={partARef} style={{ opacity: 0 }}>
            Unlock your potential.{" "}
          </span>
          <strong>
            <span ref={partBRef} style={{ opacity: 0, display: "inline-block" }}>
              Multiply yourself.
            </span>
          </strong>
        </Typography>

        {/* Trio chips — appear after the split completes. Each chip
            represents a value-add unlocked by multiplying yourself:
            Learning · Mood · Engagement. */}
        <Stack
          ref={promisesRef}
          direction="row"
          sx={{
            justifyContent: "center",
            flexWrap: "wrap",
            columnGap: { xs: 1.5, sm: 2 },
            rowGap: 1
          }}>
          {PROMISES.map((p) => (
            <Box
              key={p}
              className="intro-promise"
              sx={{
                fontSize: PROMISE_FONT,
                fontWeight: 700,
                color: "primary.main",
                opacity: 0,
                letterSpacing: "0.04em",
                px: 2,
                py: 0.75,
                borderRadius: 999,
                bgcolor: "rgba(66,133,244,0.08)",
                border: "1px solid",
                borderColor: "rgba(66,133,244,0.35)",
                lineHeight: 1.2,
              }}
            >
              {p}
            </Box>
          ))}
        </Stack>
      </Stack>
    </IntroSlide>
  );
}
