"use client"

/**
 * MultiplyTrio — three Character4eye instances that perform a small
 * "mitosis" animation: a single character splits into two parents
 * sliding apart, while a smaller baby (no antenna) fades in between
 * them. Used at the end of Slide2Progress to dramatize the
 * "Multiply yourself." beat.
 */

import { useEffect, useRef } from "react"
import { Box } from "@mui/material"
import { Character4eye } from "@expanse/character/2d"
import { CHARACTER_PERSONAS } from "@expanse/character/2d"
import gsap from "gsap"

export interface MultiplyTrioProps {
  /** Called once the split + baby reveal finishes. */
  onComplete?: () => void
  /** Skip animation and snap to final pose. */
  reducedMotion?: boolean
  /** Per-character square size in px. Default 180. */
  charSize?: number
  /** Baby is rendered at this fraction of `charSize`. Default 0.6. */
  babyScale?: number
  /** Horizontal divergence as a fraction of `charSize`. Default 0.55. */
  splitDistance?: number
}

export function MultiplyTrio({
  onComplete,
  reducedMotion,
  // Family layout: bigger characters standing closer together so the
  // silhouettes barely touch at the shoulders (~5% overlap), reading
  // as a posed family portrait rather than three separate figures.
  charSize = 220,
  babyScale = 0.62,
  splitDistance = 0.32,
}: MultiplyTrioProps) {
  const leftRef = useRef<HTMLDivElement | null>(null)
  const rightRef = useRef<HTMLDivElement | null>(null)
  const babyRef = useRef<HTMLDivElement | null>(null)
  const burstWrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const left = leftRef.current
    const right = rightRef.current
    const baby = babyRef.current
    const burstWrap = burstWrapRef.current
    if (!left || !right || !baby) return

    const splitPx = charSize * splitDistance

    if (reducedMotion) {
      gsap.set(left, { opacity: 1, xPercent: -50, x: -splitPx })
      gsap.set(right, { opacity: 1, xPercent: -50, x: splitPx })
      gsap.set(baby, { opacity: 1, xPercent: -50, scale: babyScale })
      onComplete?.()
      return
    }

    // Both parents start stacked at center looking like a single character.
    gsap.set([left, right], { opacity: 1, xPercent: -50, x: 0, scale: 1 })
    gsap.set(baby, { opacity: 0, xPercent: -50, scale: 0, transformOrigin: "50% 50%" })

    const tl = gsap.timeline({ onComplete: () => onComplete?.() })
    let burstTween: gsap.core.Tween | null = null

    // Tiny wind-up "stretch" before the split.
    tl.to([left, right], {
      scaleX: 1.04,
      scaleY: 0.97,
      duration: 0.18,
      ease: "power2.out",
    })
    tl.to([left, right], {
      scaleX: 1,
      scaleY: 1,
      duration: 0.12,
      ease: "power2.in",
    })

    // Split. Parents diverge.
    tl.to(
      left,
      { x: -splitPx, duration: 0.55, ease: "back.out(1.6)" },
      "split",
    )
    tl.to(
      right,
      { x: splitPx, duration: 0.55, ease: "back.out(1.6)" },
      "split",
    )

    // Baby pops in, in front and slightly lower (overlapping the parents).
    tl.to(
      baby,
      {
        opacity: 1,
        scale: babyScale,
        duration: 0.5,
        ease: "back.out(1.8)",
      },
      "split+=0.18",
    )

    // Tiny settle bob on parents.
    tl.to(
      [left, right],
      {
        y: -4,
        duration: 0.25,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      },
      "split+=0.45",
    )

    // Burst rings — migrated from the old standalone CelebrationSlide.
    // Marks the "we just multiplied" beat with three concentric rings
    // that scale outward and fade. Repeats forever (cheap, decorative)
    // so it keeps pulsing while the slide remains on screen.
    if (burstWrap) {
      const rings = burstWrap.querySelectorAll<HTMLElement>(".trio-burst")
      // Start hidden — only fire after the split + baby reveal.
      gsap.set(rings, { opacity: 0, scale: 0.6 })
      // Run the decorative pulse on its own infinite tween so the
      // main split timeline can still complete and fire onComplete.
      tl.call(
        () => {
          burstTween = gsap.to(rings, {
            scale: 1.4,
            opacity: 0,
            duration: 1.4,
            ease: "power1.out",
            stagger: 0.2,
            repeat: -1,
            // Pre-set opacity inside the tween so the first cycle is
            // visible (gsap.set above only handles the initial state).
            startAt: { opacity: 0.5, scale: 0.7 },
          })
        },
        undefined,
        "split+=0.55",
      )
    }

    return () => {
      tl.kill()
      burstTween?.kill()
    }
  }, [babyScale, charSize, onComplete, reducedMotion, splitDistance])

  const slotSx = {
    position: "absolute" as const,
    top: 0,
    left: "50%",
    width: charSize,
    height: charSize,
    opacity: 0,
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: charSize,
        // Keep visual room for the diverged parents + baby.
        minHeight: charSize,
      }}
    >
      {/* Burst rings — sit BEHIND the trio (zIndex: 0). Decorative pulse
          fired by the timeline above after the trio settles, recycled
          from the retired standalone CelebrationSlide. */}
      <Box
        ref={burstWrapRef}
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            className="trio-burst"
            sx={{
              position: "absolute",
              width: charSize * 1.15,
              height: charSize * 1.15,
              borderRadius: "50%",
              border: "2px solid",
              borderColor: "primary.light",
              opacity: 0,
            }}
          />
        ))}
      </Box>
      <Box ref={leftRef} sx={slotSx}>
        <Character4eye {...CHARACTER_PERSONAS.trioLearning} />
      </Box>
      <Box ref={rightRef} sx={slotSx}>
        <Character4eye {...CHARACTER_PERSONAS.trioEngage} />
      </Box>
      <Box
        ref={babyRef}
        sx={{
          ...slotSx,
          // Bring the baby slightly forward + a touch lower so it visually
          // tucks in front of the diverging parents.
          top: charSize * 0.18,
          zIndex: 2,
        }}
      >
        <Character4eye {...CHARACTER_PERSONAS.trioMood} />
      </Box>
    </Box>
  )
}
