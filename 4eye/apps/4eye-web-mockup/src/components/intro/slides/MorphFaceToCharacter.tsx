"use client"

/**
 * MorphFaceToCharacter — Slide1 hero element. Renders the full
 * AnimatedCharacter (facingForward pose, no decorations, head circle
 * hidden) with the 4eye `ProfileFrame` overlaid exactly where the
 * head would be.
 *
 * Animation timeline:
 *   0.00s  Face fades + scales in (existing slide entry behavior).
 *   ~0.6s  Body, then legs, then arms "draw in" via stroke-dashoffset.
 *
 * Limbs are rendered with their actual stroke colors and final
 * `limbOpacity` (default 0.5). They start with `stroke-dashoffset =
 * pathLength` so they're invisible, then GSAP animates the offset to
 * 0 to reveal them as if being sketched.
 */

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react"
import { Box } from "@mui/material"
import {
  AnimatedCharacter,
  CHARACTER_DISPLAY,
  POSES,
  ProfilePhoto,
} from "@expanse/character/2d"
import gsap from "gsap"

export interface MorphFaceToCharacterHandle {
  /** Replay just the face entrance + limb draw-in. */
  replay: () => void
}

export interface MorphFaceToCharacterProps {
  /** Total rendered character height in px (head-to-toe + padding).
   *  Default 240. The face circle is sized proportionally so it
   *  matches the head exactly. */
  height?: number
  /** How much larger than the natural head the face starts at.
   *  1 = same size as final head. Default 2.4. */
  bigFaceScale?: number
  /** Seconds the big face holds at full size before shrinking.
   *  Default 1.0. */
  holdSeconds?: number
  /** Honor reduced-motion (skip draw-in, render final state). */
  reducedMotion?: boolean
  /** Limb opacity in final state. Default 0.5 (matches AnimatedCharacter). */
  limbOpacity?: number
  /** Called once the full draw-in completes. */
  onComplete?: () => void
}

const FACING_FORWARD = POSES.facingForward

// Use the full character viewBox so internal coordinates match.
const VIEW_W = CHARACTER_DISPLAY.containerWidth
const VIEW_H = CHARACTER_DISPLAY.containerHeight
const HEAD_LEN = CHARACTER_DISPLAY.headLength

export const MorphFaceToCharacter = forwardRef<
  MorphFaceToCharacterHandle,
  MorphFaceToCharacterProps
>(function MorphFaceToCharacter(
  {
    height = 240,
    bigFaceScale = 2.4,
    holdSeconds = 1.0,
    reducedMotion = false,
    limbOpacity = 0.5,
    onComplete,
  },
  ref,
) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const faceRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  // Where the head sits in the underlying SVG, in viewBox units.
  const headX = FACING_FORWARD.head.x
  const headY = FACING_FORWARD.head.y

  // Size the wrapper by total character height. Face/head and the
  // animated SVG share this scale so the face overlay lands
  // pixel-perfect on the head circle.
  const scale = height / VIEW_H
  const renderedWidth = VIEW_W * scale
  const renderedHeight = height
  const faceSize = HEAD_LEN * scale

  // Face overlay needs to land precisely on the head center.
  const faceLeft = headX * scale - faceSize / 2
  const faceTop = headY * scale - faceSize / 2

  const animationState = useMemo(() => {
    const p = FACING_FORWARD
    return {
      head: p.head,
      body: p.body,
      leftArm: p.leftArm,
      rightArm: p.rightArm,
      leftLeg: p.leftLeg,
      rightLeg: p.rightLeg,
    }
  }, [])

  const playAnimation = (immediate: boolean) => {
    timelineRef.current?.kill()

    const face = faceRef.current
    const svg = svgRef.current
    if (!face || !svg) return

    const limbs = Array.from(
      svg.querySelectorAll<SVGPathElement>("[data-limb]"),
    )

    // Capture each limb's path length so we can dash-stroke it.
    const lengths = limbs.map((el) => {
      try {
        return el.getTotalLength()
      } catch {
        return 0
      }
    })

    if (immediate) {
      gsap.set(face, { opacity: 1, scale: 1, y: 0 })
      limbs.forEach((el, i) => {
        const len = lengths[i]
        if (len > 0) {
          el.style.strokeDasharray = `${len}`
          el.style.strokeDashoffset = "0"
        }
        el.style.opacity = String(limbOpacity)
      })
      onComplete?.()
      return
    }

    // Reset limbs to invisible.
    limbs.forEach((el, i) => {
      const len = lengths[i]
      if (len > 0) {
        el.style.strokeDasharray = `${len}`
        el.style.strokeDashoffset = `${len}`
      }
      // Body uses full opacity, others use limbOpacity. We detect
      // by looking at the limb attribute.
      const part = el.getAttribute("data-limb")
      el.style.opacity = part === "body" ? "1" : String(limbOpacity)
    })

    const tl = gsap.timeline({ onComplete: () => onComplete?.() })
    timelineRef.current = tl

    // 1. Big face entrance — starts oversized, gently lands.
    tl.fromTo(
      face,
      { opacity: 0, scale: bigFaceScale * 0.85, y: 18 },
      {
        opacity: 1,
        scale: bigFaceScale,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.4)",
      },
      0,
    )

    // 2. Hold at the big size so the headline can read alongside it.
    tl.to({}, { duration: holdSeconds })

    // 3. Shrink the face down to its natural head size.
    tl.to(face, {
      scale: 1,
      duration: 0.55,
      ease: "power3.inOut",
    })

    // 4. Limbs draw in, in narrative order: body → legs → arms.
    //    Start a touch before the shrink fully settles so it feels
    //    like the body is bursting out of the shrinking head.
    const drawStart = `-=0.15`
    const drawOrder: string[] = ["body", "leftLeg", "rightLeg", "leftArm", "rightArm"]
    drawOrder.forEach((part, i) => {
      const el = limbs.find((l) => l.getAttribute("data-limb") === part)
      if (!el) return
      const idx = limbs.indexOf(el)
      const len = lengths[idx]
      if (len <= 0) return
      tl.to(
        el,
        {
          strokeDashoffset: 0,
          duration: 0.45,
          ease: "power2.inOut",
        },
        i === 0 ? drawStart : `<+=0.12`,
      )
    })
  }

  useEffect(() => {
    playAnimation(reducedMotion)
    return () => {
      timelineRef.current?.kill()
    }
    // We intentionally re-run only on reducedMotion change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  useImperativeHandle(ref, () => ({
    replay: () => playAnimation(reducedMotion),
  }))

  return (
    <Box
      ref={wrapperRef}
      sx={{
        position: "relative",
        width: renderedWidth,
        height: renderedHeight,
        // Big face starts at >1x scale and would otherwise be clipped.
        overflow: "visible",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          // The SVG inside scales to fill via its own width/height
          // styles. We force it to actually fill the wrapper here.
          "& > svg": {
            width: "100%",
            height: "100%",
          },
        }}
      >
        <AnimatedCharacter
          animationState={animationState}
          svgRef={svgRef}
          hideHead
          showAntenna
          limbOpacity={limbOpacity}
        />
      </Box>

      {/* Face overlay anchored to the head center. */}
      <Box
        ref={faceRef}
        sx={{
          position: "absolute",
          left: faceLeft,
          top: faceTop,
          width: faceSize,
          height: faceSize,
          opacity: 0,
          willChange: "transform, opacity",
          // Spin / rotate origin = center.
          transformOrigin: "50% 50%",
          // Sit above the SVG limbs.
          zIndex: 1,
        }}
      >
        <ProfilePhoto
          size={faceSize}
          variant="friendly"
          zoom="face"
          background="transparent"
          borderWidth={0}
          shadow={false}
        />
      </Box>
    </Box>
  )
})
