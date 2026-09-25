"use client";

/**
 * LearnSlide — the home slideshow's opening hero ("Amplify your learning.").
 *
 * Self-contained: owns the copy, the entry timeline, the soft pulsing
 * halo, the Play CTA, and its own bottom action bar (`LearnActionBar`).
 *
 * Props:
 *   - `onPlay` → fires when the Play button is clicked. Expected to
 *                run the hero→orb morph and advance the slideshow to
 *                the next step.
 *   - `mascot` → React node rendered above the eyebrow, used to host
 *                the persistent mascot slot.
 *
 * Mascot animations (Excited 4eye on Play hover/focus/click) are
 * fired imperatively via `usePersistentMascot()` — no callback prop
 * is needed because the persistent mascot publishes its handle into
 * `PersistentMascotProvider`.
 *
 * Animation hooks:
 *   - `.hero-action` and `.hero-halo` class names are intentionally
 *     preserved because `useHeroToOrbMorph` (in
 *     `src/hooks/animation/useHeroToOrbMorph.ts`) selects
 *     `.hero-action` to perform the FLIP morph from this button into
 *     the bottom play orb. Renaming would break that handoff.
 *   - The entry timeline used to live in a generic `HeroPage`
 *     primitive. It was inlined here so the home slideshow can iterate
 *     on its hero independently of the generic `Hero` block at
 *     `@4eye/web/components/layout/Hero`.
 */

import { Box, Button, Stack, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";

import { useGsap } from "@4eye/web/hooks/animation";
import { SlideShell } from "@4eye/web/Tiles/home/slides/shared";
import { usePersistentMascot } from "@4eye/web/Tiles/home/persistent-mascot/PersistentMascotProvider";
import { LearnActionBar } from "./LearnActionBar";

export interface LearnSlideProps {
  /** Fires when the user clicks the Play CTA. */
  onPlay: () => void;
  /** Persistent-mascot slot, rendered above the eyebrow. */
  mascot?: ReactNode;
}

export default function LearnSlide({ onPlay, mascot }: LearnSlideProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { playExcited } = usePersistentMascot();

  // Halo pulse — infinite ambient loop. Lives in its own gsap.context so
  // it stays running independently of the one-shot entry timeline.
  useGsap(ref, () => {
    gsap.to(".hero-halo", {
      scale: 1.08,
      opacity: 0.55,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });

  // Entry timeline — one-shot stagger of halo / mascot / eyebrow /
  // title / action. Built inside its own gsap.context so cleanup
  // reverts any inline `from` styles GSAP applied.
  useGsap(ref, () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-halo", {
      scale: 0.6,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
    })
      .from(
        ".hero-mascot",
        { y: -16, opacity: 0, scale: 0.6, duration: 0.55, ease: "back.out(1.6)" },
        "-=0.7",
      )
      .from(".hero-eyebrow", { y: -12, opacity: 0, duration: 0.5 }, "-=0.4")
      .from(
        ".hero-title",
        { y: 24, opacity: 0, scale: 0.94, duration: 0.7 },
        "-=0.3",
      )
      .from(
        ".hero-action",
        { y: 12, opacity: 0, scale: 0.9, duration: 0.5, ease: "back.out(1.6)" },
        "-=0.25",
      );
  });

  return (
    <SlideShell tone="accent" id="learn">
      <LearnActionBar />
      <Box ref={ref} sx={{ width: "100%", position: "relative" }}>
        {/* Soft pulsing accent halo behind the title. */}
        <Box
          className="hero-halo"
          aria-hidden
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 320, md: 520 },
            height: { xs: 320, md: 520 },
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(25,118,210,0.18) 0%, rgba(25,118,210,0) 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <Stack
          spacing="clamp(4px, 1.2vh, 16px)"
          sx={{
            alignItems: "center",
            position: "relative",
            zIndex: 1
          }}>
          {mascot && (
            <Box className="hero-mascot" sx={{ display: "inline-flex", mb: -1 }}>
              {mascot}
            </Box>
          )}
          <Typography
            className="hero-eyebrow"
            variant="overline"
            color="primary"
            sx={{ letterSpacing: "0.2em", fontWeight: 600 }}
          >
            4eye
          </Typography>
          <Typography
            className="hero-title"
            variant="h1"
            sx={{
              textAlign: "center",
              // Vh-aware so the title shrinks on short viewports instead
              // of pushing the PLAY button into the orb bar. The clamp
              // keeps it at least readable (1.75rem) and tops out at the
              // desktop hero scale (3.75rem) when there's vertical room.
              fontSize: "clamp(1.75rem, 6vh, 3.75rem)",
              lineHeight: 1.05,
            }}
          >
            Amplify your learning.
          </Typography>
          <Button
            className="hero-action"
            onClick={() => {
              playExcited();
              onPlay();
            }}
            onMouseEnter={playExcited}
            onFocus={playExcited}
            variant="contained"
            size="large"
            startIcon={<PlayArrowIcon />}
            sx={{ mt: "clamp(4px, 1vh, 16px)", px: 4 }}
          >
            Play
          </Button>
        </Stack>
      </Box>
    </SlideShell>
  );
}
