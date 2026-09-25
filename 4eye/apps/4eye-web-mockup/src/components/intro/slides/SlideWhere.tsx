"use client"

/**
 * SlideWhere — IntroFlow slide #3 (between Slide2Progress and Slide3Face).
 *
 * Shows the "Wherever you are." headline with six location chips
 * (In Schools / At Work / At Home / On the Go / In Therapy / In Community).
 * Visually anchors the abstract promise from Slide2 in concrete daily
 * settings before the final personal hand-off in Slide3 ("Meet your 4eye").
 *
 * Reuses the shared `WherePill` + `PLACES` data so the home-deck
 * `WhereSlide` and this intro slide stay in lockstep.
 */

import { useRef, type ComponentType, type SVGProps } from "react"
import { Box, Stack, Typography } from "@mui/material"
import gsap from "gsap"

import { IntroSlide } from "@4eye/web/components/intro/IntroSlide"
import {
  WherePill,
  PLACES,
  WhenPill,
  WHENS,
} from "@4eye/web/Tiles/home/slides/domains/primitives"

const HEADLINE_FONT = "clamp(1.75rem, 4vw, 3rem)"

export interface SlideWhereProps {
  index: number
}

export function SlideWhere({ index }: SlideWhereProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const eyebrowRef = useRef<HTMLSpanElement | null>(null)
  const headlineRef = useRef<HTMLHeadingElement | null>(null)
  const gridRef = useRef<HTMLDivElement | null>(null)
  const whenGridRef = useRef<HTMLDivElement | null>(null)
  const whenHeadlineRef = useRef<HTMLHeadingElement | null>(null)
  const whenEyebrowRef = useRef<HTMLSpanElement | null>(null)

  return (
    <IntroSlide
      index={index}
      // Headline-only read: enough to register "Wherever you are." and see the
      // chips fly in, but not enough to read each one. The full read happens
      // on the home-deck WhereSlide, which expands the chips into cards.
      settleMs={900}
      onEnter={({ enterComplete }) => {
        const tl = gsap.timeline({ onComplete: enterComplete })
        // When-band: pills first, then headline, then eyebrow.
        if (whenGridRef.current) {
          const whenPills = Array.from(
            whenGridRef.current.querySelectorAll<HTMLElement>(".when-pill"),
          )
          if (whenPills.length) {
            tl.fromTo(
              whenPills,
              { opacity: 0, y: -12, scale: 0.92 },
              { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: "back.out(1.4)" },
              0,
            )
          }
        }
        if (whenHeadlineRef.current) {
          tl.fromTo(
            whenHeadlineRef.current,
            { opacity: 0, y: -8 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
            0.25,
          )
        }
        if (whenEyebrowRef.current) {
          tl.fromTo(
            whenEyebrowRef.current,
            { opacity: 0, y: -6 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
            0.4,
          )
        }
        if (eyebrowRef.current) {
          tl.fromTo(
            eyebrowRef.current,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
            0,
          )
        }
        if (headlineRef.current) {
          tl.fromTo(
            headlineRef.current,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
            0.05,
          )
        }
        if (gridRef.current) {
          const pills = Array.from(
            gridRef.current.querySelectorAll<HTMLElement>(".where-pill"),
          )
          if (pills.length) {
            tl.fromTo(
              pills,
              { opacity: 0, y: 16, scale: 0.85 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.45,
                stagger: 0.07,
                ease: "back.out(1.4)",
              },
              0.35,
            )
          }
        }
      }}
      onExit={({ exitComplete }) => {
        const tl = gsap.timeline({ onComplete: exitComplete })
        const targets: HTMLElement[] = []
        if (whenEyebrowRef.current) targets.push(whenEyebrowRef.current)
        if (whenHeadlineRef.current) targets.push(whenHeadlineRef.current)
        if (whenGridRef.current) {
          targets.push(
            ...Array.from(
              whenGridRef.current.querySelectorAll<HTMLElement>(".when-pill"),
            ),
          )
        }
        if (eyebrowRef.current) targets.push(eyebrowRef.current)
        if (headlineRef.current) targets.push(headlineRef.current)
        if (gridRef.current) {
          targets.push(
            ...Array.from(
              gridRef.current.querySelectorAll<HTMLElement>(".where-pill"),
            ),
          )
        }
        if (targets.length) {
          tl.to(targets, {
            opacity: 0,
            y: -8,
            duration: 0.3,
            ease: "power2.in",
          })
        }
      }}
    >
      <Box
        ref={containerRef}
        sx={{ width: "100%", maxWidth: 960, mx: "auto", px: 3 }}
      >
        <Stack
          spacing={{ zero: 5, tablet: 7 }}
          sx={{
            alignItems: "center",
            textAlign: "center"
          }}>
          {/* When band — natural reading order: eyebrow → headline → pills. */}
          <Stack
            spacing={{ zero: 2.5, tablet: 3.5 }}
            sx={{
              alignItems: "center",
              width: "100%"
            }}>
            <Stack spacing={1} sx={{
              alignItems: "center"
            }}>
              <Typography
                ref={whenEyebrowRef}
                component="span"
                variant="overline"
                color="primary"
                sx={{ letterSpacing: "0.2em", fontWeight: 600, opacity: 0 }}
              >
                When
              </Typography>
              <Typography
                ref={whenHeadlineRef}
                component="h2"
                variant="h1"
                sx={{
                  fontSize: HEADLINE_FONT,
                  fontWeight: 800,
                  lineHeight: 1.1,
                  opacity: 0,
                }}
              >
                Whenever you are.
              </Typography>
            </Stack>
            <Box
              ref={whenGridRef}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  zero: "repeat(1, minmax(0, 200px))",
                  tablet: "repeat(2, minmax(0, 220px))",
                },
                justifyContent: "center",
                gap: { zero: 1.5, tablet: 2.5 },
                width: "100%",
              }}
            >
              {WHENS.map(({ key, label, Icon, color }) => (
                <Box key={key} sx={{ minWidth: 0 }}>
                  <WhenPill
                    label={label}
                    Icon={Icon as ComponentType<SVGProps<SVGSVGElement>>}
                    hex={color}
                  />
                </Box>
              ))}
            </Box>
          </Stack>

          <Stack spacing={1} sx={{
            alignItems: "center"
          }}>
            <Typography
              ref={eyebrowRef}
              component="span"
              variant="overline"
              color="primary"
              sx={{ letterSpacing: "0.2em", fontWeight: 600, opacity: 0 }}
            >
              Where
            </Typography>
            <Typography
              ref={headlineRef}
              component="h2"
              variant="h1"
              sx={{
                fontSize: HEADLINE_FONT,
                fontWeight: 800,
                lineHeight: 1.1,
                opacity: 0,
              }}
            >
              Wherever you are.
            </Typography>
          </Stack>

          <Box
            ref={gridRef}
            sx={{
              display: "grid",
              gridTemplateColumns: {
                zero: "repeat(1, minmax(0, 220px))",
                tablet: "repeat(3, minmax(0, 220px))",
              },
              justifyContent: "center",
              gap: { zero: 1.5, tablet: 2.5 },
              width: "100%",
            }}
          >
            {PLACES.map(({ key, label, Icon, color }) => (
              <Box key={key} sx={{ minWidth: 0 }}>
                <WherePill
                  label={label}
                  Icon={Icon as ComponentType<SVGProps<SVGSVGElement>>}
                  hex={color}
                />
              </Box>
            ))}
          </Box>
        </Stack>
      </Box>
    </IntroSlide>
  );
}
