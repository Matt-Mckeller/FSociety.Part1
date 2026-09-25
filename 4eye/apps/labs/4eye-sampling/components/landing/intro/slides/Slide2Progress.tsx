"use client"

/**
 * Slide2Progress — PushingProgressCharacter (dramatic) followed by a
 * celebration headline.
 *
 *   • PushingProgressCharacter mounts, runs `dramatic` preset once.
 *   • When `onComplete` fires, the celebration headline
 *     "Unlock your potential. Multiply yourself." fades in.
 *   • After settle, slide exits (everything fades).
 *
 * Note: PushingProgressCharacter handles its own internal animation via
 * GSAP. We do not wrap it in a useGsapTimeline — we simply listen for
 * `onComplete` to know when to reveal the celebration line.
 */

import { useRef } from "react"
import { Box, Stack, Typography } from "@mui/material"
import { PushingProgressCharacter } from "@expanse/character/2d"
import gsap from "gsap"

import { IntroSlide } from "../IntroSlide"

const PART_B_TEXT = "Multiply yourself."
const MS_PER_CHAR = 0.05  // ~50ms per character

const CELEBRATION_FONT = "clamp(1.75rem, 3.2vw, 2.5rem)"

export interface Slide2ProgressProps {
  index: number
}

export function Slide2Progress({ index }: Slide2ProgressProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const partARef = useRef<HTMLSpanElement | null>(null)
  const partBRef = useRef<HTMLSpanElement | null>(null)
  const caretRef = useRef<HTMLSpanElement | null>(null)
  const enterCompleteRef = useRef<(() => void) | null>(null)

  return (
    <IntroSlide
      index={index}
      // Celebration text holds for ~1.8s before exit.
      settleMs={1800}
      onEnter={({ enterComplete }) => {
        // Hold "enterComplete" until the dramatic push finishes + the
        // celebration headline has revealed.
        enterCompleteRef.current = enterComplete

        // Fade the whole stage in immediately.
        if (containerRef.current) {
          gsap.fromTo(
            containerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, ease: "power2.out" },
          )
        }
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
        <Box sx={{ width: "min(560px, 90vw)" }}>
          <PushingProgressCharacter
            preset="dramatic"
            loop={false}
            fromProgress={0}
            toProgress={100}
            onComplete={() => {
              // Part A fades in first, then Part B types in.
              if (partARef.current) {
                gsap.fromTo(
                  partARef.current,
                  { opacity: 0, y: 8 },
                  { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                )
              }
              gsap.delayedCall(0.5, () => {
                const el = partBRef.current
                if (!el) {
                  enterCompleteRef.current?.()
                  enterCompleteRef.current = null
                  return
                }
                el.style.width = "auto"
                const targetW = el.scrollWidth
                el.style.width = "0px"
                gsap.set(el, { opacity: 1 })
                const charCount = PART_B_TEXT.length
                const duration = charCount * MS_PER_CHAR
                gsap.to(el, {
                  width: targetW,
                  duration,
                  ease: `steps(${charCount})`,
                  onComplete: () => {
                    el.style.width = "auto"
                    if (caretRef.current) {
                      gsap.to(caretRef.current, {
                        opacity: 0,
                        duration: 0.3,
                        delay: 0.4,
                        ease: "power2.out",
                      })
                    }
                    enterCompleteRef.current?.()
                    enterCompleteRef.current = null
                  },
                })
              })
            }}
          />
        </Box>

        <Typography
          component="h2"
          sx={{
            fontSize: CELEBRATION_FONT,
            fontWeight: 700,
            letterSpacing: "-0.01em",
            textAlign: "center",
            whiteSpace: "nowrap",
            "& strong": { color: "primary.main" },
            "@keyframes celebrationCaretBlink": {
              "0%, 49%":  { opacity: 1 },
              "50%, 100%": { opacity: 0 },
            },
          }}
        >
          <span ref={partARef} style={{ opacity: 0 }}>
            Unlock your potential.{" "}
          </span>
          <strong>
            <Box
              component="span"
              ref={partBRef}
              sx={{
                display: "inline-block",
                overflow: "hidden",
                whiteSpace: "nowrap",
                verticalAlign: "bottom",
                width: 0,
                opacity: 0,
              }}
            >
              {PART_B_TEXT}
            </Box>
          </strong>
          <Box
            component="span"
            ref={caretRef}
            aria-hidden
            sx={{
              display: "inline-block",
              ml: "2px",
              color: "primary.main",
              animation: "celebrationCaretBlink 1s steps(1) infinite",
            }}
          >
            |
          </Box>
        </Typography>
      </Stack>
    </IntroSlide>
  );
}
