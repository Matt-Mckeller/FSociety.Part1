/**
 * useLogoAnimation - GSAP animation hook for Expanse Logo
 *
 * Handles the complex animation sequence:
 * 1. Arc Y-formation (arcs rotate to form "Y" shape)
 * 2. Ring alignment (orbital rings meet at 6 o'clock)
 * 3. Pupil tracking (follows moon, then aligns with rings)
 * 4. Moon absorption (18 particles spiral into sphere)
 * 5. Opacity climax (all arcs reach full opacity)
 * 6. Reverse animation (returns to default state)
 */

import { useRef, useEffect, useCallback, useState } from "react"
import { gsap } from "gsap"

export interface LogoAnimationRefs {
  // Arc elements
  arc1: SVGPathElement | null
  arc2: SVGPathElement | null
  arc3: SVGPathElement | null
  // Ring groups
  primaryRings: SVGGElement | null
  mirroredRings: SVGGElement | null
  // Pupil elements
  pupilIris: SVGCircleElement | null
  pupilCore: SVGCircleElement | null
  // Moon elements
  moon: SVGCircleElement | null
  moonHighlight: SVGEllipseElement | null
  particlesGroup: SVGGElement | null
}

export interface LogoAnimationConfig {
  /** Forward animation duration in seconds */
  forwardDuration?: number
  /** Hold duration at climax in seconds */
  holdDuration?: number
  /** Reverse animation duration in seconds */
  reverseDuration?: number
  /** Starting orbital rotation (primary rings) */
  primaryRotation?: number
  /** Starting orbital rotation (mirrored rings) */
  mirroredRotation?: number
  /** Target rotation for aligned rings (typically 0) */
  alignedRotation?: number
  /** Pupil starting direction in degrees */
  pupilStartDirection?: number
  /** Pupil target direction in degrees (6 o'clock = 270) */
  pupilEndDirection?: number
  /** Number of particles for moon absorption */
  particleCount?: number
  /** Sphere center coordinates */
  sphereCenter?: { x: number; y: number }
  /** Moon position */
  moonPosition?: { x: number; y: number }
  /** Moon radius */
  moonRadius?: number
  /** Arc 1 starting opacity */
  arc1StartOpacity?: number
  /** Arc 1 end opacity (during animation) */
  arc1EndOpacity?: number
  /** Arc 2 starting opacity */
  arc2StartOpacity?: number
  /** Arc 3 starting opacity */
  arc3StartOpacity?: number
  /** Final opacity for all arcs at climax */
  climaxOpacity?: number
  /** Arc 2 scale multiplier during animation */
  arc2ScaleMultiplier?: number
  /** Arc 3 scale multiplier during animation */
  arc3ScaleMultiplier?: number
  /** Arc rotation amount (degrees) */
  arcRotationAmount?: number
  /** Callback when animation completes */
  onAnimationComplete?: () => void
  /** Callback when reverse animation completes */
  onReverseComplete?: () => void
}

export interface Particle {
  id: number
  element: SVGCircleElement | null
  startAngle: number
  startX: number
  startY: number
}

export interface UseLogoAnimationReturn {
  /** Start the forward animation */
  startAnimation: () => void
  /** Whether animation is currently playing */
  isAnimating: boolean
  /** Current animation phase */
  phase: "idle" | "forward" | "hold" | "reverse"
  /** Generate particles for moon absorption */
  generateParticles: () => Particle[]
  /** Set refs for animated elements */
  setRefs: (refs: Partial<LogoAnimationRefs>) => void
  /** Master timeline reference */
  timeline: React.MutableRefObject<gsap.core.Timeline | null>
}

const DEFAULT_CONFIG: Required<LogoAnimationConfig> = {
  forwardDuration: 1.0,
  holdDuration: 0.8,
  reverseDuration: 0.7,
  primaryRotation: -33,
  mirroredRotation: 33,
  alignedRotation: 0,
  pupilStartDirection: 240,
  pupilEndDirection: 270,
  particleCount: 18,
  sphereCenter: { x: 165, y: 165 },
  moonPosition: { x: 49.5, y: 365.05188 },
  moonRadius: 33,
  arc1StartOpacity: 0,
  arc1EndOpacity: 0.33,
  arc2StartOpacity: 0.33,
  arc3StartOpacity: 0.21,
  climaxOpacity: 1.0,
  arc2ScaleMultiplier: 1.18,
  arc3ScaleMultiplier: 0.82,
  arcRotationAmount: 25,
  onAnimationComplete: () => {},
  onReverseComplete: () => {},
}

/**
 * Calculate position on a circle given angle and radius
 */
function positionOnCircle(
  centerX: number,
  centerY: number,
  angle: number,
  radius: number,
): { x: number; y: number } {
  const radians = (angle - 90) * (Math.PI / 180) // -90 to start from top
  return {
    x: centerX + Math.cos(radians) * radius,
    y: centerY + Math.sin(radians) * radius,
  }
}

export function useLogoAnimation(
  config: LogoAnimationConfig = {},
): UseLogoAnimationReturn {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config }
  const {
    forwardDuration,
    holdDuration,
    reverseDuration,
    primaryRotation,
    mirroredRotation,
    alignedRotation,
    pupilStartDirection,
    pupilEndDirection,
    particleCount,
    sphereCenter,
    moonPosition,
    moonRadius,
    arc1StartOpacity,
    arc1EndOpacity,
    arc2StartOpacity,
    arc3StartOpacity,
    climaxOpacity,
    arc2ScaleMultiplier,
    arc3ScaleMultiplier,
    arcRotationAmount,
    onAnimationComplete,
    onReverseComplete,
  } = mergedConfig

  // State
  const [isAnimating, setIsAnimating] = useState(false)
  const [phase, setPhase] = useState<"idle" | "forward" | "hold" | "reverse">(
    "idle",
  )

  // Refs
  const refsStore = useRef<LogoAnimationRefs>({
    arc1: null,
    arc2: null,
    arc3: null,
    primaryRings: null,
    mirroredRings: null,
    pupilIris: null,
    pupilCore: null,
    moon: null,
    moonHighlight: null,
    particlesGroup: null,
  })

  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const reverseTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const particles = useRef<Particle[]>([])

  // Set refs
  const setRefs = useCallback((refs: Partial<LogoAnimationRefs>) => {
    refsStore.current = { ...refsStore.current, ...refs }
  }, [])

  // Generate particle data for moon absorption
  const generateParticles = useCallback((): Particle[] => {
    const newParticles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      const angle = (360 / particleCount) * i
      const pos = positionOnCircle(
        moonPosition.x,
        moonPosition.y,
        angle,
        moonRadius * 0.8,
      )
      newParticles.push({
        id: i,
        element: null,
        startAngle: angle,
        startX: pos.x,
        startY: pos.y,
      })
    }
    particles.current = newParticles
    return newParticles
  }, [particleCount, moonPosition, moonRadius])

  // Calculate pupil position from direction
  const getPupilPosition = useCallback(
    (direction: number, offset: number) => {
      const distance = 99 * offset // 99 is sphere radius
      return positionOnCircle(
        sphereCenter.x,
        sphereCenter.y,
        direction,
        distance,
      )
    },
    [sphereCenter],
  )

  // Build the reverse timeline
  const buildReverseTimeline = useCallback(() => {
    const refs = refsStore.current
    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        setPhase("reverse")
      },
      onComplete: () => {
        setPhase("idle")
        setIsAnimating(false)
        onReverseComplete()
      },
    })

    // Reverse arc animations
    if (refs.arc1) {
      tl.to(
        refs.arc1,
        {
          opacity: arc1StartOpacity,
          rotation: 0,
          scale: 1,
          transformOrigin: "center center",
          duration: reverseDuration,
          ease: "power2.out",
        },
        0,
      )
    }

    if (refs.arc2) {
      tl.to(
        refs.arc2,
        {
          scale: 1,
          rotation: 0,
          transformOrigin: "center center",
          opacity: arc2StartOpacity,
          duration: reverseDuration,
          ease: "power2.out",
        },
        0,
      )
    }

    if (refs.arc3) {
      tl.to(
        refs.arc3,
        {
          scale: 1,
          rotation: 0,
          transformOrigin: "center center",
          opacity: arc3StartOpacity,
          duration: reverseDuration,
          ease: "power2.out",
        },
        0,
      )
    }

    // Reverse ring rotations
    if (refs.primaryRings) {
      tl.to(
        refs.primaryRings,
        {
          rotation: primaryRotation,
          transformOrigin: "165px 165px",
          duration: reverseDuration,
          ease: "power2.out",
        },
        0,
      )
    }

    if (refs.mirroredRings) {
      tl.to(
        refs.mirroredRings,
        {
          rotation: mirroredRotation,
          transformOrigin: "165px 165px",
          duration: reverseDuration,
          ease: "power2.out",
        },
        0,
      )
    }

    // Reverse pupil position
    const startPupilPos = getPupilPosition(pupilStartDirection, 0.12)
    if (refs.pupilIris) {
      tl.to(
        refs.pupilIris,
        {
          attr: { cx: startPupilPos.x, cy: startPupilPos.y },
          duration: reverseDuration,
          ease: "power2.out",
        },
        0,
      )
    }
    if (refs.pupilCore) {
      tl.to(
        refs.pupilCore,
        {
          attr: { cx: startPupilPos.x, cy: startPupilPos.y },
          duration: reverseDuration,
          ease: "power2.out",
        },
        0,
      )
    }

    // Moon fade in
    if (refs.moon) {
      tl.to(
        refs.moon,
        {
          opacity: 1,
          duration: reverseDuration * 0.6,
          ease: "power2.out",
        },
        0,
      )
    }
    if (refs.moonHighlight) {
      tl.to(
        refs.moonHighlight,
        {
          opacity: 0.2,
          duration: reverseDuration * 0.6,
          ease: "power2.out",
        },
        0,
      )
    }

    // Hide particles
    if (refs.particlesGroup) {
      tl.to(
        refs.particlesGroup,
        {
          opacity: 0,
          duration: 0.1,
        },
        0,
      )
    }

    return tl
  }, [
    arc1StartOpacity,
    arc2StartOpacity,
    arc3StartOpacity,
    primaryRotation,
    mirroredRotation,
    reverseDuration,
    pupilStartDirection,
    getPupilPosition,
    onReverseComplete,
  ])

  // Build the forward animation timeline
  const buildForwardTimeline = useCallback(() => {
    const refs = refsStore.current
    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        setPhase("forward")
        setIsAnimating(true)
      },
      onComplete: () => {
        setPhase("hold")
        onAnimationComplete()

        // After hold duration, start reverse
        gsap.delayedCall(holdDuration, () => {
          reverseTimelineRef.current = buildReverseTimeline()
          reverseTimelineRef.current.play()
        })
      },
    })

    // ========== ARC ANIMATIONS ==========

    // Arc 1 (smallest): Fade in + rotate to 6 o'clock
    if (refs.arc1) {
      tl.to(
        refs.arc1,
        {
          opacity: arc1EndOpacity,
          rotation: -90, // Rotate to bottom
          transformOrigin: "center center",
          duration: forwardDuration,
          ease: "power2.inOut",
        },
        0,
      )
    }

    // Arc 2 (largest): Scale up + rotate gap right
    if (refs.arc2) {
      tl.to(
        refs.arc2,
        {
          scale: arc2ScaleMultiplier,
          rotation: arcRotationAmount,
          transformOrigin: "center center",
          duration: forwardDuration,
          ease: "power2.inOut",
        },
        0,
      )
    }

    // Arc 3 (medium): Scale down + rotate gap right
    if (refs.arc3) {
      tl.to(
        refs.arc3,
        {
          scale: arc3ScaleMultiplier,
          rotation: arcRotationAmount,
          transformOrigin: "center center",
          duration: forwardDuration,
          ease: "power2.inOut",
        },
        0,
      )
    }

    // Arc opacity climax (near end)
    const climaxStart = forwardDuration * 0.7
    const climaxDuration = forwardDuration * 0.3
    if (refs.arc1) {
      tl.to(
        refs.arc1,
        {
          opacity: climaxOpacity,
          duration: climaxDuration,
          ease: "power2.in",
        },
        climaxStart,
      )
    }
    if (refs.arc2) {
      tl.to(
        refs.arc2,
        {
          opacity: climaxOpacity,
          duration: climaxDuration,
          ease: "power2.in",
        },
        climaxStart,
      )
    }
    if (refs.arc3) {
      tl.to(
        refs.arc3,
        {
          opacity: climaxOpacity,
          duration: climaxDuration,
          ease: "power2.in",
        },
        climaxStart,
      )
    }

    // ========== RING ANIMATIONS ==========

    // Primary rings: rotate from -33° to 0°
    if (refs.primaryRings) {
      tl.to(
        refs.primaryRings,
        {
          rotation: alignedRotation,
          transformOrigin: "165px 165px",
          duration: forwardDuration,
          ease: "power2.inOut",
        },
        0,
      )
    }

    // Mirrored rings: rotate from +33° to 0°
    if (refs.mirroredRings) {
      tl.to(
        refs.mirroredRings,
        {
          rotation: alignedRotation,
          transformOrigin: "165px 165px",
          duration: forwardDuration,
          ease: "power2.inOut",
        },
        0,
      )
    }

    // ========== PUPIL TRACKING ==========

    const endPupilPos = getPupilPosition(pupilEndDirection, 0.33)
    if (refs.pupilIris) {
      tl.to(
        refs.pupilIris,
        {
          attr: { cx: endPupilPos.x, cy: endPupilPos.y },
          duration: forwardDuration,
          ease: "power2.inOut",
        },
        0,
      )
    }
    if (refs.pupilCore) {
      tl.to(
        refs.pupilCore,
        {
          attr: { cx: endPupilPos.x, cy: endPupilPos.y },
          duration: forwardDuration,
          ease: "power2.inOut",
        },
        0,
      )
    }

    // ========== MOON ABSORPTION ==========

    // Hide moon
    if (refs.moon) {
      tl.to(
        refs.moon,
        {
          opacity: 0,
          duration: forwardDuration * 0.3,
          ease: "power2.in",
        },
        forwardDuration * 0.3,
      )
    }
    if (refs.moonHighlight) {
      tl.to(
        refs.moonHighlight,
        {
          opacity: 0,
          duration: forwardDuration * 0.3,
          ease: "power2.in",
        },
        forwardDuration * 0.3,
      )
    }

    // Particle animation
    if (refs.particlesGroup) {
      // First show particles
      tl.set(refs.particlesGroup, { opacity: 1 }, forwardDuration * 0.3)

      // Then animate each particle to sphere center
      const particleElements = refs.particlesGroup.querySelectorAll("circle")
      particleElements.forEach((particle, i) => {
        // Calculate spiral path using custom ease
        const delay = forwardDuration * 0.3 + i * 0.02 // Staggered start
        const duration = forwardDuration * 0.7 * (1 - i * 0.02) // Later particles faster

        tl.to(
          particle,
          {
            attr: {
              cx: sphereCenter.x,
              cy: sphereCenter.y,
            },
            scale: 0.1,
            opacity: 0,
            duration: Math.max(0.2, duration),
            ease: "power2.in",
          },
          delay,
        )
      })
    }

    return tl
  }, [
    forwardDuration,
    holdDuration,
    alignedRotation,
    pupilEndDirection,
    sphereCenter,
    arc1EndOpacity,
    arc2ScaleMultiplier,
    arc3ScaleMultiplier,
    arcRotationAmount,
    climaxOpacity,
    getPupilPosition,
    onAnimationComplete,
    buildReverseTimeline,
  ])

  // Start animation
  const startAnimation = useCallback(() => {
    // Don't start if already animating
    if (isAnimating || phase !== "idle") {
      return
    }

    // Kill any existing timelines
    if (timelineRef.current) {
      timelineRef.current.kill()
    }
    if (reverseTimelineRef.current) {
      reverseTimelineRef.current.kill()
    }

    // Build and play forward timeline
    timelineRef.current = buildForwardTimeline()
    timelineRef.current.play()
  }, [isAnimating, phase, buildForwardTimeline])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
      if (reverseTimelineRef.current) {
        reverseTimelineRef.current.kill()
      }
      gsap.killTweensOf("*")
    }
  }, [])

  return {
    startAnimation,
    isAnimating,
    phase,
    generateParticles,
    setRefs,
    timeline: timelineRef,
  }
}

export default useLogoAnimation
