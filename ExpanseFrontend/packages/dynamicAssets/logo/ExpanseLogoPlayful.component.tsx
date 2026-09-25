/**
 * ExpanseLogoPlayful - Playful animated version of the Expanse Logo
 *
 * This component wraps ExpanseLogoV3_3D with GSAP-powered animations:
 * - Arc Y-formation (arcs rotate to form "Y" shape at 6 o'clock)
 * - Ring alignment (orbital rings meet at 6 o'clock)
 * - Pupil tracking (follows moon, then aligns with rings)
 * - Moon absorption (18 particles spiral into sphere)
 * - Opacity climax (all arcs reach full opacity)
 * - Auto-reverse after delay
 *
 * Triggered by both hover and click.
 */

"use client"
import React, { useRef, useEffect, useState, useCallback, useMemo } from "react"
import { useTheme } from "@mui/system"
import { gsap } from "gsap"
import {
  positionFromAngle,
  lightAngleToGradientPosition,
  PUPIL_GAZE_DIRECTIONS,
} from "./utils/geometry"
import {
  RING_EXTENT_PRESETS,
  type RingExtent,
  type ExpanseLogoV3Props,
} from "./ExpanseLogoV3.component"

export interface ExpanseLogoPlayfulProps extends ExpanseLogoV3Props {
  /**
   * Enable GSAP animations on hover/click
   * Default: true
   */
  enableAnimation?: boolean
  /**
   * Number of particles for moon absorption animation
   * Default: 18
   */
  particleCount?: number
  /**
   * Forward animation duration in seconds
   * Default: 1.0
   */
  animationDuration?: number
  /**
   * Hold duration at climax in seconds
   * Default: 0.8
   */
  holdDuration?: number
  /**
   * Reverse animation duration in seconds
   * Default: 0.7
   */
  reverseDuration?: number
}

interface Particle {
  id: number
  startX: number
  startY: number
  angle: number
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
  const radians = (angle - 90) * (Math.PI / 180)
  return {
    x: centerX + Math.cos(radians) * radius,
    y: centerY + Math.sin(radians) * radius,
  }
}

export function ExpanseLogoPlayful({
  id = "company-logo-playful",
  fill,
  ringFill,
  orbitalFill,
  height = "100%",
  maxWidth = "100%",
  maxHeight = "100%",
  orbitalOpacity = 1,
  innerRingOpacity,
  middleRingOpacity,
  outerRingOpacity,
  backRingOpacity = 0.3,
  showArcSegments = true,
  showMoon = true,
  ringExtent = "innerArc",
  orbitalRx: manualRx = 130,
  orbitalRy: manualRy = 32.5,
  orbitalRotation = -33,
  mirroredRings = false, // Hidden by default, appears on interaction
  showPrimaryRings = false, // Hidden by default, appears on interaction
  ringSpacing = "proportional",
  fixedGap1 = 8,
  fixedGap2 = 8,
  ringStrokeWidth = 4,
  circular = false,
  // Lighting
  lightDirection = 45,
  highlightIntensity = 0.15,
  // Eye mode
  eyeMode = true,
  pupilDirection = PUPIL_GAZE_DIRECTIONS.moon,
  pupilOffset = 0.12,
  interactivePupilOffset = 0.33,
  pupilSize = 0.28,
  pupilContrast = 0.71,
  pupilColor = "#1a1a1a",
  pupilInnerColor = "#f5f5f5",
  pupilInnerSize = 0.6,
  // Arc segment colors (arc3 darkest, appears on interaction)
  arc1Color,
  arc2Color,
  arc3Color,
  // Arc segment opacities (arc3 hidden by default, appears on interaction)
  arc1Opacity = 0.21,
  arc2Opacity = 0.33,
  arc3Opacity = 0,
  // Interactivity
  interactive = true,
  interactiveArcOpacity = 0.33,
  initialPupilScale = 0.65,
  mergeRingsOnInteraction = false,
  // Moon controls
  moonSizePercent = 33,
  moonOffsetX = 0,
  moonOffsetY = 0,
  // Animation props
  enableAnimation = true,
  particleCount = 18,
  animationDuration = 1.0,
  holdDuration = 0.8,
  reverseDuration = 0.7,
}: ExpanseLogoPlayfulProps) {
  const theme = useTheme()
  const _fill = fill || theme.palette?.text?.primary || "#1a1a2e"
  const _ringFill = ringFill || theme.palette?.text?.primary || "#1a1a2e"
  const _orbitalFill = orbitalFill || _ringFill

  // Animation state
  const [isAnimating, setIsAnimating] = useState(false)
  const [phase, setPhase] = useState<"idle" | "forward" | "hold" | "reverse">(
    "idle",
  )

  // Refs for GSAP
  const svgRef = useRef<SVGSVGElement>(null)
  const arc1Ref = useRef<SVGPathElement>(null)
  const arc2Ref = useRef<SVGPathElement>(null)
  const arc3Ref = useRef<SVGPathElement>(null)
  const primaryRingsBackRef = useRef<SVGGElement>(null)
  const primaryRingsFrontRef = useRef<SVGGElement>(null)
  const mirroredRingsBackRef = useRef<SVGGElement>(null)
  const mirroredRingsFrontRef = useRef<SVGGElement>(null)
  const pupilIrisRef = useRef<SVGCircleElement>(null)
  const pupilCoreRef = useRef<SVGCircleElement>(null)
  const moonRef = useRef<SVGCircleElement>(null)
  const moonHighlightRef = useRef<SVGEllipseElement>(null)
  const particlesRef = useRef<SVGGElement>(null)

  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const reverseTimelineRef = useRef<gsap.core.Timeline | null>(null)

  // Constants
  const orbitalCenterX = 165
  const orbitalCenterY = 165
  const mainCircleRadius = 99
  const strokeWidth = ringStrokeWidth

  // Calculate moon dimensions
  const moonRadius = Math.round((mainCircleRadius * moonSizePercent) / 100)
  const moonX = 49.5 + moonOffsetX
  const moonY = 365.05188 + moonOffsetY

  // Ring colors
  const ring1Fill = arc1Color || _ringFill
  const ring2Fill = arc2Color || _ringFill
  const ring3Fill = arc3Color || _ringFill

  // Unique IDs
  const sphereGradientId = `${id}-sphere-gradient`
  const orbitGradientId = `${id}-orbit-gradient`
  const maskId = `${id}-sphere-mask`
  const frontClipId = `${id}-front-clip`
  const pupilGradientId = `${id}-pupil-gradient`

  // Determine outer ring size
  const preset = ringExtent ? RING_EXTENT_PRESETS[ringExtent] : null
  const outerRx = preset ? preset.rx : manualRx
  const outerRy = circular ? outerRx : preset ? preset.ry : manualRy

  // Calculate inner/middle rings
  const extension = outerRx - mainCircleRadius
  const innerRx = mainCircleRadius + (extension * 1) / 3
  const mainRx = mainCircleRadius + (extension * 2) / 3
  const innerRy = circular
    ? innerRx
    : outerRy * (1 / 3) + ((outerRy * 2) / 3) * 0.5
  const mainRy = circular
    ? mainRx
    : outerRy * (2 / 3) + ((outerRy * 1) / 3) * 0.7

  // Ring opacities
  const innerOpacityVal = innerRingOpacity ?? orbitalOpacity * (1 / 3)
  const mainOpacityVal = middleRingOpacity ?? orbitalOpacity * (2 / 3)
  const outerOpacityVal = outerRingOpacity ?? orbitalOpacity * 1

  // Dynamic clip bounds
  const clipPadding = strokeWidth + 10
  const clipX = orbitalCenterX - outerRx - clipPadding
  const clipY = orbitalCenterY + 15
  const clipWidth = (outerRx + clipPadding) * 2
  const clipHeight = 250 + outerRy

  // Lighting calculations
  const gradientPos = lightAngleToGradientPosition(lightDirection)
  const highlightDistance = mainCircleRadius * 0.35
  const highlightPos = positionFromAngle(
    orbitalCenterX,
    orbitalCenterY,
    lightDirection,
    highlightDistance,
  )

  // Pupil position
  const pupilDistance = mainCircleRadius * pupilOffset
  const basePupilPos = positionFromAngle(
    orbitalCenterX,
    orbitalCenterY,
    pupilDirection,
    pupilDistance,
  )
  const basePupilRadius = mainCircleRadius * pupilSize * initialPupilScale

  // Generate particles
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const angle = (360 / particleCount) * i
      const pos = positionOnCircle(moonX, moonY, angle, moonRadius * 0.6)
      return {
        id: i,
        startX: pos.x,
        startY: pos.y,
        angle,
      }
    })
  }, [particleCount, moonX, moonY, moonRadius])

  // Build reverse animation
  const buildReverseTimeline = useCallback(() => {
    const tl = gsap.timeline({
      paused: true,
      onStart: () => setPhase("reverse"),
      onComplete: () => {
        setPhase("idle")
        setIsAnimating(false)
      },
    })

    // Fade out arcs to original opacities
    if (arc1Ref.current) {
      tl.to(
        arc1Ref.current,
        {
          opacity: arc1Opacity,
          rotation: 0,
          scale: 1,
          transformOrigin: "center center",
          duration: reverseDuration,
          ease: "power2.out",
        },
        0,
      )
    }
    if (arc2Ref.current) {
      tl.to(
        arc2Ref.current,
        {
          opacity: arc2Opacity,
          rotation: 0,
          scale: 1,
          transformOrigin: "center center",
          duration: reverseDuration,
          ease: "power2.out",
        },
        0,
      )
    }
    if (arc3Ref.current) {
      tl.to(
        arc3Ref.current,
        {
          opacity: arc3Opacity,
          rotation: 0,
          scale: 1,
          transformOrigin: "center center",
          duration: reverseDuration,
          ease: "power2.out",
        },
        0,
      )
    }

    // Reverse ring rotations + fade out
    const ringTargets = [
      primaryRingsBackRef.current,
      primaryRingsFrontRef.current,
    ].filter(Boolean)
    if (ringTargets.length > 0) {
      tl.to(
        ringTargets,
        {
          opacity: 0,
          rotation: orbitalRotation,
          transformOrigin: `${orbitalCenterX}px ${orbitalCenterY}px`,
          duration: reverseDuration,
          ease: "power2.out",
        },
        0,
      )
    }

    const mirroredTargets = [
      mirroredRingsBackRef.current,
      mirroredRingsFrontRef.current,
    ].filter(Boolean)
    if (mirroredTargets.length > 0) {
      tl.to(
        mirroredTargets,
        {
          opacity: 0,
          rotation: -orbitalRotation,
          transformOrigin: `${orbitalCenterX}px ${orbitalCenterY}px`,
          duration: reverseDuration,
          ease: "power2.out",
        },
        0,
      )
    }

    // Reverse pupil
    if (pupilIrisRef.current) {
      tl.to(
        pupilIrisRef.current,
        {
          attr: { cx: basePupilPos.x, cy: basePupilPos.y, r: basePupilRadius },
          duration: reverseDuration,
          ease: "power2.out",
        },
        0,
      )
    }
    if (pupilCoreRef.current) {
      tl.to(
        pupilCoreRef.current,
        {
          attr: {
            cx: basePupilPos.x,
            cy: basePupilPos.y,
            r: basePupilRadius * pupilInnerSize,
          },
          duration: reverseDuration,
          ease: "power2.out",
        },
        0,
      )
    }

    // Fade in moon
    if (moonRef.current) {
      tl.to(
        moonRef.current,
        {
          opacity: 1,
          duration: reverseDuration * 0.7,
          ease: "power2.out",
        },
        0,
      )
    }
    if (moonHighlightRef.current) {
      tl.to(
        moonHighlightRef.current,
        {
          opacity: 0.2,
          duration: reverseDuration * 0.7,
          ease: "power2.out",
        },
        0,
      )
    }

    // Hide particles
    if (particlesRef.current) {
      tl.to(
        particlesRef.current,
        {
          opacity: 0,
          duration: 0.1,
        },
        0,
      )
    }

    return tl
  }, [
    arc1Opacity,
    arc2Opacity,
    arc3Opacity,
    orbitalRotation,
    reverseDuration,
    basePupilPos,
    basePupilRadius,
    pupilInnerSize,
    orbitalCenterX,
    orbitalCenterY,
  ])

  // Build forward animation
  const buildForwardTimeline = useCallback(() => {
    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        setPhase("forward")
        setIsAnimating(true)
      },
      onComplete: () => {
        setPhase("hold")
        gsap.delayedCall(holdDuration, () => {
          reverseTimelineRef.current = buildReverseTimeline()
          reverseTimelineRef.current.play()
        })
      },
    })

    // ========== ARC ANIMATIONS ==========

    // Arc 1: Rotate to bottom (6 o'clock) - already visible
    if (arc1Ref.current) {
      tl.to(
        arc1Ref.current,
        {
          rotation: -90,
          transformOrigin: "center center",
          duration: animationDuration,
          ease: "power2.inOut",
        },
        0,
      )
    }

    // Arc 2: Scale up + rotate gap right - already visible
    if (arc2Ref.current) {
      tl.to(
        arc2Ref.current,
        {
          scale: 1.18,
          rotation: 25,
          transformOrigin: "center center",
          duration: animationDuration,
          ease: "power2.inOut",
        },
        0,
      )
    }

    // Arc 3: Fade in + scale down + rotate gap right (hidden by default)
    if (arc3Ref.current) {
      tl.to(
        arc3Ref.current,
        {
          opacity: interactiveArcOpacity,
          scale: 0.82,
          rotation: 25,
          transformOrigin: "center center",
          duration: animationDuration,
          ease: "power2.inOut",
        },
        0,
      )
    }

    // Arc opacity climax
    const climaxStart = animationDuration * 0.7
    const climaxDuration = animationDuration * 0.3
    const arcRefs = [arc1Ref.current, arc2Ref.current, arc3Ref.current].filter(
      Boolean,
    )
    if (arcRefs.length > 0) {
      tl.to(
        arcRefs,
        {
          opacity: 1,
          duration: climaxDuration,
          ease: "power2.in",
        },
        climaxStart,
      )
    }

    // ========== RING ANIMATIONS ==========
    // Rings are hidden by default, fade in + rotate during animation

    // Primary rings: fade in + rotate to 0°
    const primaryTargets = [
      primaryRingsBackRef.current,
      primaryRingsFrontRef.current,
    ].filter(Boolean)
    if (primaryTargets.length > 0) {
      tl.to(
        primaryTargets,
        {
          opacity: 1,
          rotation: 0,
          transformOrigin: `${orbitalCenterX}px ${orbitalCenterY}px`,
          duration: animationDuration,
          ease: "power2.inOut",
        },
        0,
      )
    }

    // Mirrored rings: fade in + rotate to 0°
    const mirroredTargets = [
      mirroredRingsBackRef.current,
      mirroredRingsFrontRef.current,
    ].filter(Boolean)
    if (mirroredTargets.length > 0) {
      tl.to(
        mirroredTargets,
        {
          opacity: 1,
          rotation: 0,
          transformOrigin: `${orbitalCenterX}px ${orbitalCenterY}px`,
          duration: animationDuration,
          ease: "power2.inOut",
        },
        0,
      )
    }

    // ========== PUPIL TRACKING ==========

    const endPupilDistance = mainCircleRadius * interactivePupilOffset
    const endPupilPos = positionFromAngle(
      orbitalCenterX,
      orbitalCenterY,
      270, // 6 o'clock
      endPupilDistance,
    )
    const endPupilRadius = mainCircleRadius * pupilSize // Full size

    if (pupilIrisRef.current) {
      tl.to(
        pupilIrisRef.current,
        {
          attr: { cx: endPupilPos.x, cy: endPupilPos.y, r: endPupilRadius },
          duration: animationDuration,
          ease: "power2.inOut",
        },
        0,
      )
    }
    if (pupilCoreRef.current) {
      tl.to(
        pupilCoreRef.current,
        {
          attr: {
            cx: endPupilPos.x,
            cy: endPupilPos.y,
            r: endPupilRadius * pupilInnerSize,
          },
          duration: animationDuration,
          ease: "power2.inOut",
        },
        0,
      )
    }

    // ========== MOON ABSORPTION ==========

    // Hide moon
    if (moonRef.current) {
      tl.to(
        moonRef.current,
        {
          opacity: 0,
          duration: animationDuration * 0.4,
          ease: "power2.in",
        },
        animationDuration * 0.3,
      )
    }
    if (moonHighlightRef.current) {
      tl.to(
        moonHighlightRef.current,
        {
          opacity: 0,
          duration: animationDuration * 0.4,
          ease: "power2.in",
        },
        animationDuration * 0.3,
      )
    }

    // Show and animate particles
    if (particlesRef.current) {
      // Show particles when moon starts to fade
      tl.set(particlesRef.current, { opacity: 1 }, animationDuration * 0.3)

      // Animate each particle to sphere center with acceleration
      const particleElements = particlesRef.current.querySelectorAll("circle")
      particleElements.forEach((particle, i) => {
        const delay = animationDuration * 0.3 + i * 0.025
        const duration = Math.max(0.25, animationDuration * 0.7 - i * 0.02)

        tl.to(
          particle,
          {
            attr: {
              cx: orbitalCenterX,
              cy: orbitalCenterY,
            },
            scale: 0.1,
            opacity: 0,
            duration,
            ease: "power2.in",
          },
          delay,
        )
      })
    }

    return tl
  }, [
    animationDuration,
    holdDuration,
    interactiveArcOpacity,
    orbitalCenterX,
    orbitalCenterY,
    interactivePupilOffset,
    pupilSize,
    pupilInnerSize,
    mainCircleRadius,
    buildReverseTimeline,
  ])

  // Handle interaction
  const handleInteraction = useCallback(() => {
    if (!enableAnimation || isAnimating || phase !== "idle") {
      return
    }

    // Kill any existing timelines
    if (timelineRef.current) {
      timelineRef.current.kill()
    }
    if (reverseTimelineRef.current) {
      reverseTimelineRef.current.kill()
    }

    // Build and play forward animation
    timelineRef.current = buildForwardTimeline()
    timelineRef.current.play()
  }, [enableAnimation, isAnimating, phase, buildForwardTimeline])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
      if (reverseTimelineRef.current) {
        reverseTimelineRef.current.kill()
      }
    }
  }, [])

  // Ring transform
  const primaryRingTransform = `rotate(${orbitalRotation}, ${orbitalCenterX}, ${orbitalCenterY})`
  const mirroredRingTransform = `rotate(${-orbitalRotation}, ${orbitalCenterX}, ${orbitalCenterY})`

  // Render rings helper
  const renderRings = (transform: string, suffix: string = "") => (
    <>
      <ellipse
        cx={orbitalCenterX}
        cy={orbitalCenterY}
        rx={outerRx}
        ry={outerRy}
        fill="none"
        transform={transform}
        stroke={`url(#${orbitGradientId})`}
        strokeWidth={strokeWidth}
        opacity={outerOpacityVal}
        name={`ring-outer${suffix}`}
      />
      <ellipse
        cx={orbitalCenterX}
        cy={orbitalCenterY}
        rx={mainRx}
        ry={mainRy}
        fill="none"
        transform={transform}
        stroke={`url(#${orbitGradientId})`}
        strokeWidth={strokeWidth}
        opacity={mainOpacityVal}
        name={`ring-middle${suffix}`}
      />
      <ellipse
        cx={orbitalCenterX}
        cy={orbitalCenterY}
        rx={innerRx}
        ry={innerRy}
        fill="none"
        transform={transform}
        stroke={`url(#${orbitGradientId})`}
        strokeWidth={strokeWidth}
        opacity={innerOpacityVal}
        name={`ring-inner${suffix}`}
      />
    </>
  )

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        height,
        maxWidth,
        maxHeight,
        cursor: interactive ? "pointer" : undefined,
      }}
      className="App-logo"
      viewBox="0 0 409 409"
      height={height}
      id={id || ""}
      onMouseEnter={interactive ? handleInteraction : undefined}
      onClick={interactive ? handleInteraction : undefined}
    >
      <defs>
        {/* Radial gradient for 3D sphere effect */}
        <radialGradient
          id={sphereGradientId}
          cx={gradientPos.cx}
          cy={gradientPos.cy}
          r="60%"
          fx={gradientPos.fx}
          fy={gradientPos.fy}
        >
          <stop offset="0%" stopColor={_fill} stopOpacity="1" />
          <stop offset="70%" stopColor={_fill} stopOpacity="0.85" />
          <stop offset="100%" stopColor={_fill} stopOpacity="0.6" />
        </radialGradient>

        {/* Gradient for orbital rings */}
        <linearGradient
          id={orbitGradientId}
          gradientUnits="userSpaceOnUse"
          x1={orbitalCenterX - outerRx - 20}
          y1={orbitalCenterY}
          x2={orbitalCenterX + outerRx + 20}
          y2={orbitalCenterY}
          gradientTransform={`rotate(${orbitalRotation}, ${orbitalCenterX}, ${orbitalCenterY})`}
        >
          <stop offset="0%" stopColor={_orbitalFill} stopOpacity="0.85" />
          <stop offset="25%" stopColor={_orbitalFill} stopOpacity="0.12" />
          <stop offset="50%" stopColor={_orbitalFill} stopOpacity="0.04" />
          <stop offset="75%" stopColor={_orbitalFill} stopOpacity="0.12" />
          <stop offset="100%" stopColor={_orbitalFill} stopOpacity="0.85" />
        </linearGradient>

        {/* Shadow filter */}
        <filter
          id={`${id}-shadow`}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feDropShadow dx="4" dy="4" stdDeviation="10" floodOpacity="0.25" />
        </filter>

        {/* Mask for back rings - reduced radius to show more ring ends */}
        <mask id={maskId}>
          <rect x="0" y="0" width="409" height="409" fill="white" />
          <circle r="95" cx="204.509173" cy="170.4736727" fill="black" />
        </mask>

        {/* Clip for front rings */}
        <clipPath id={frontClipId}>
          <rect x={clipX} y={clipY} width={clipWidth} height={clipHeight} />
        </clipPath>

        {/* Pupil gradient */}
        <radialGradient
          id={pupilGradientId}
          gradientUnits="objectBoundingBox"
          cx="0.5"
          cy="0.5"
          r="0.5"
          fx="0.5"
          fy="0.5"
        >
          <stop
            offset={`${pupilInnerSize * 100}%`}
            stopColor={pupilInnerColor}
          />
          <stop offset="100%" stopColor={pupilColor} />
        </radialGradient>
      </defs>

      <g strokeWidth="1" id="g43e" transform="translate(39.509173,5.4736727)">
        {/* Back rings (behind sphere) - always render for animation, start hidden */}
        <g mask={`url(#${maskId})`} opacity={backRingOpacity}>
          <g
            ref={primaryRingsBackRef}
            style={{
              transformOrigin: `${orbitalCenterX}px ${orbitalCenterY}px`,
              opacity: showPrimaryRings ? 1 : 0,
            }}
          >
            {renderRings(primaryRingTransform)}
          </g>
          <g
            ref={mirroredRingsBackRef}
            style={{
              transformOrigin: `${orbitalCenterX}px ${orbitalCenterY}px`,
              opacity: mirroredRings ? 1 : 0,
            }}
          >
            {renderRings(mirroredRingTransform, "-mirrored")}
          </g>
        </g>

        {/* Main sphere */}
        <circle
          name="sphere"
          r="99"
          cx="165"
          cy="165"
          fill={`url(#${sphereGradientId})`}
          filter={`url(#${id}-shadow)`}
        />

        {/* Sphere highlight */}
        <ellipse
          cx={highlightPos.x}
          cy={highlightPos.y}
          rx="25"
          ry="20"
          fill={_fill}
          opacity={highlightIntensity}
          transform={`rotate(${lightDirection - 90}, ${highlightPos.x}, ${highlightPos.y})`}
        />

        {/* Front rings (in front of sphere) - always render for animation, start hidden */}
        <g clipPath={`url(#${frontClipId})`}>
          <g
            ref={primaryRingsFrontRef}
            style={{
              transformOrigin: `${orbitalCenterX}px ${orbitalCenterY}px`,
              opacity: showPrimaryRings ? 1 : 0,
            }}
          >
            {renderRings(primaryRingTransform)}
          </g>
          <g
            ref={mirroredRingsFrontRef}
            style={{
              transformOrigin: `${orbitalCenterX}px ${orbitalCenterY}px`,
              opacity: mirroredRings ? 1 : 0,
            }}
          >
            {renderRings(mirroredRingTransform, "-mirrored")}
          </g>
        </g>

        {/* Moon */}
        {showMoon && (
          <>
            <circle
              ref={moonRef}
              name="moon"
              r={moonRadius}
              cx={moonX}
              cy={moonY}
              fill={_fill}
            />
            <ellipse
              ref={moonHighlightRef}
              cx={40 + moonOffsetX}
              cy={355 + moonOffsetY}
              rx={Math.round(moonRadius * 0.24)}
              ry={Math.round(moonRadius * 0.18)}
              fill={_fill}
              opacity="0.2"
              transform={`rotate(-30, ${40 + moonOffsetX}, ${355 + moonOffsetY})`}
            />
          </>
        )}

        {/* Particles (hidden initially) */}
        <g ref={particlesRef} opacity={0}>
          {particles.map((p) => (
            <circle
              key={p.id}
              cx={p.startX}
              cy={p.startY}
              r={moonRadius / 6}
              fill={_fill}
              opacity={0.8}
            />
          ))}
        </g>

        {/* Arc segments */}
        {showArcSegments && (
          <>
            <path
              ref={arc1Ref}
              d="m 98.953121,14.520816 c 0,0 6.301509,-3.491682 13.134599,-5.8067429 1.08679,-0.3637399 2.17484,-0.7237098 3.2678,-1.068531 1.09412,-0.3410173 2.18945,-0.6782387 3.28935,-1.0002127 1.10099,-0.3181465 2.2031,-0.632473 3.30947,-0.9314601 1.10739,-0.2951375 2.21581,-0.5864327 3.32817,-0.8623029 1.11329,-0.2720005 2.22754,-0.5401379 3.34541,-0.7927715 1.11871,-0.2487454 2.23831,-0.4936085 3.3612,-0.7228959 1.12365,-0.2253823 2.24811,-0.4468648 3.37553,-0.6527064 1.12811,-0.2019212 2.25693,-0.399927 3.3884,-0.5822335 1.13207,-0.1783726 2.26477,-0.3528156 3.39979,-0.5115077 1.13555,-0.1547466 2.27164,-0.3055512 3.40972,-0.4405601 1.13852,-0.1310532 2.27751,-0.25815395 3.41815,-0.36942098 1.141,-0.10730305 2.28239,-0.21064469 3.42511,-0.29812157 1.14299,-0.0835063 2.28629,-0.16304397 3.43058,-0.22669271 1.14448,-0.0596732 2.28918,-0.11537245 3.43455,-0.15516543 1.14548,-0.03581431 2.2911,-0.06765083 3.43704,-0.08357077 1.14598,-0.01193983 2.29201,-0.01989985 3.43804,-0.01193983 1.14598,0.01193983 2.29192,0.02785977 3.43754,0.05969629 1.14548,0.03581431 2.29085,0.07560729 3.43555,0.13130649 1.14448,0.0596732 2.28877,0.12332199 3.43207,0.20285968 1.14299,0.0835063 2.28571,0.17098316 3.4271,0.2743248 1.141,0.10730305 2.28164,0.21857008 3.42063,0.34567083 1.13852,0.1310532 2.2766,0.2660621 3.41269,0.4168667 1.13555,0.1547466 2.27057,0.3134387 3.40327,0.4878817 1.13207,0.1783726 2.26354,0.3606791 3.39236,0.5586849 1.12811,0.2019212 2.25553,0.4077628 3.37999,0.6292453 1.12365,0.2253823 2.24654,0.4546697 3.36614,0.6995328 1.11871,0.2487454 2.23658,0.501379 3.35083,0.7695164 1.11329,0.2720005 2.22565,0.5478707 3.33407,0.8391659 1.10739,0.2951375 2.21376,0.5941246 3.31587,0.9084511 1.10099,0.3181465 2.20089,0.6401205 3.29622,0.9773419 1.09412,0.3410173 2.18708,0.6858385 3.27513,1.0458084 1.08679,0.3637399 7.91988,2.6788008 14.22139,6.1704828 l -16.5,28.578838 c 0,0 -3.47485,-1.86061 -7.21706,-3.128395 -0.86942,-0.290992 -1.73987,-0.578968 -2.61423,-0.854825 -0.8753,-0.272814 -1.75156,-0.542591 -2.63148,-0.800171 -0.8808,-0.254517 -1.76249,-0.505978 -2.64758,-0.745168 -0.88591,-0.23611 -1.77265,-0.469146 -2.66254,-0.689842 -0.89063,-0.2176 -1.78203,-0.43211 -2.67632,-0.634217 -0.89498,-0.198996 -1.79065,-0.394887 -2.68896,-0.578317 -0.89893,-0.180306 -1.79849,-0.357492 -2.70043,-0.522165 -0.90249,-0.161537 -1.80555,-0.319942 -2.71072,-0.465787 -0.90566,-0.142698 -1.81182,-0.282252 -2.71983,-0.409206 -0.90844,-0.123797 -1.81731,-0.244441 -2.72778,-0.352448 -0.91081,-0.104843 -1.822,-0.206523 -2.73452,-0.295537 -0.9128,-0.08584 -1.82591,-0.168515 -2.74009,-0.238497 -0.91439,-0.0668 -1.82902,-0.130435 -2.74446,-0.181354 -0.91558,-0.04774 -1.83135,-0.0923 -2.74764,-0.124133 -0.91638,-0.02865 -1.83288,-0.05412 -2.74963,-0.06686 -0.91679,-0.0096 -1.83361,-0.01592 -2.75043,-0.0096 -0.91679,0.0096 -1.83354,0.02229 -2.75004,0.04776 -0.91638,0.02865 -1.83267,0.06049 -2.74844,0.105045 -0.91558,0.04774 -1.83102,0.09866 -2.74565,0.162288 -0.91439,0.0668 -1.82857,0.136787 -2.74168,0.21946 -0.9128,0.08584 -1.82532,0.174856 -2.73651,0.276536 -0.91081,0.104843 -1.82128,0.21285 -2.73015,0.333494 -0.90844,0.123797 -1.81645,0.250751 -2.72261,0.390305 -0.90566,0.142698 -1.81083,0.288543 -2.71389,0.446948 -0.90249,0.161537 -1.80443,0.32621 -2.70399,0.503396 -0.89893,0.180306 -1.79724,0.363736 -2.69291,0.559627 -0.89498,0.198996 -1.78927,0.401103 -2.68067,0.615613 -0.89063,0.2176 -1.78052,0.438296 -2.66726,0.671332 -0.88591,0.23611 -1.771,0.4753 -2.65269,0.726761 -0.8808,0.254517 -1.76072,0.512097 -2.63698,0.781874 -0.8753,0.272814 -1.74966,0.548671 -2.62011,0.836647 -0.86942,0.290992 -4.61163,1.558777 -8.08648,3.419387 z"
              fill={ring1Fill}
              opacity={arc1Opacity}
              style={{ transformOrigin: "center center" }}
              name="arc-1"
            />
            <path
              ref={arc2Ref}
              d="m 67.704643,297.43787 c 0,0 -7.596119,-4.75568 -14.220351,-10.82682 -2.126728,-1.98498 -4.236117,-3.98886 -6.273553,-6.06586 -2.018808,-2.09464 -4.019303,-4.20725 -5.94408,-6.38906 -1.905242,-2.19844 -3.791247,-4.41386 -5.59798,-6.69438 -1.786347,-2.2961 -3.552586,-4.60813 -5.236222,-6.98099 -1.662456,-2.38733 -3.303989,-4.7895 -4.859819,-7.24805 -1.533913,-2.47189 -3.046149,-4.95749 -4.46982,-7.49486 -1.401081,-2.54952 -2.779789,-5.1116 -4.06732,-7.72069 -1.264329,-2.62003 -2.505653,-5.25141 -3.653442,-7.92492 -1.124041,-2.68322 -2.224509,-5.37655 -3.229346,-8.10701 C 9.1721014,219.24635 8.2155678,216.4986 7.3564943,213.71884 6.5220604,210.93194 5.7121366,208.13746 5.0012291,205.31617 4.3153044,202.48905 3.6542559,199.65566 3.093503,196.80073 2.5580061,193.9413 2.0476819,191.07692 1.638652,188.19634 1.2550807,185.31259 0.89690837,182.42524 0.64074562,179.52706 0.41017283,176.62707 0.20515416,173.72482 0.10257509,170.81715 0.02564577,167.90903 -0.02564577,165 0.02564577,162.09097 c 0.07692932,-2.90812 0.17950839,-5.81579 0.38452706,-8.71804 0.23057279,-2.89999 0.48673554,-5.79817 0.84490787,-8.68552 0.3835713,-2.88375 0.7926012,-5.76433 1.3029254,-8.62871 0.5354969,-2.85943 1.0962498,-5.71436 1.7572983,-8.54775 0.6859247,-2.82712 1.3968322,-5.64841 2.206756,-8.44289 0.8344339,-2.7869 1.6935074,-5.56666 2.650041,-8.31441 0.9806086,-2.73888 1.9854456,-5.46934 3.0859136,-8.16267 1.124041,-2.683215 2.27183,-5.356725 3.513154,-7.988111 1.264329,-2.620033 2.55186,-5.229121 3.930568,-7.791198 1.401081,-2.549525 2.824752,-5.086893 4.336988,-7.572495 1.533913,-2.471884 3.089743,-4.930435 4.731276,-7.33261 1.662456,-2.38733 3.346092,-4.760186 5.112331,-7.072214 1.786347,-2.296098 3.59308,-4.576623 5.479085,-6.792037 1.905242,-2.198444 3.830019,-4.380258 5.830514,-6.492862 2.018808,-2.094639 4.056244,-4.17164 6.165633,-6.175524 2.126728,-1.984977 8.75096,-8.056121 16.347079,-12.811796 l 16.5,28.578838 c 0,0 -4.461774,2.944705 -8.417209,6.570191 -1.701382,1.587981 -3.388894,3.191089 -5.018843,4.852689 -1.615046,1.675712 -3.215442,3.365795 -4.755263,5.111246 -1.524195,1.758755 -3.032998,3.531087 -4.478385,5.355506 -1.429078,1.836878 -2.842069,3.686501 -4.188978,5.584786 -1.329964,1.909864 -2.643191,3.831604 -3.887854,5.798444 -1.227131,1.977508 -2.436919,3.96599 -3.575857,5.995887 -1.120864,2.03962 -2.223831,4.08928 -3.253855,6.17655 -1.011464,2.09603 -2.004523,4.20113 -2.922754,6.33994 -0.899233,2.14657 -1.779607,4.30124 -2.583477,6.4856 -0.784487,2.19111 -1.549714,4.38931 -2.236973,6.61312 -0.667547,2.22952 -1.315486,4.4651 -1.884212,6.72214 -0.548739,2.26169 -1.077578,4.5284 -1.526181,6.81235 -0.428397,2.28754 -0.836656,4.57904 -1.16388,6.88351 -0.306857,2.307 -0.593395,4.61688 -0.798326,6.93542 -0.184458,2.31999 -0.348473,4.64179 -0.430536,6.96793 -0.06154,2.3265 -0.102577,4.65372 -0.06154,6.98094 0.06154,2.3265 0.143606,4.65264 0.307621,6.97444 0.184458,2.31999 0.389389,4.63853 0.675927,6.94841 0.306857,2.307 0.634081,4.61147 1.04234,6.90297 0.428397,2.28754 0.877,4.57149 1.405839,6.8382 0.548739,2.26169 1.117465,4.51873 1.765404,6.75431 0.667547,2.22952 1.354806,4.45333 2.120033,6.65153 0.784487,2.19111 1.588357,4.37547 2.468731,6.53014 0.899233,2.14657 1.817464,4.28538 2.810523,6.39048 1.011464,2.09603 2.041488,4.1833 3.144455,6.23296 1.120864,2.03962 2.259802,4.06952 3.46959,6.058 1.227131,1.97751 2.471794,3.94435 3.785021,5.86609 1.329964,1.90986 2.676873,3.80815 4.089864,5.65777 1.429078,1.83688 2.874465,3.6613 4.383268,5.43363 1.524195,1.75875 3.064016,3.5042 4.664412,5.19429 1.615046,1.67571 3.244995,3.33731 4.932507,4.94042 1.701382,1.58798 5.656817,5.21346 10.118591,8.15817 z"
              fill={ring2Fill}
              opacity={arc2Opacity}
              style={{ transformOrigin: "center center" }}
              name="arc-2"
            />
            <path
              ref={arc3Ref}
              d="m 262.29536,32.562133 c 0,0 9.01917,5.801239 16.79368,13.237653 3.32921,3.278024 6.61265,6.603873 9.7026,10.11021 3.03907,3.548683 6.02847,7.141135 8.80978,10.897007 2.727,3.793748 5.40081,7.626893 7.8534,11.605211 2.39527,4.011452 4.7342,8.057643 6.84038,12.229715 2.04628,4.200222 4.03345,8.430278 5.77805,12.766011 1.6825,4.3587 3.30359,8.74211 4.67401,13.21024 1.30661,4.48574 2.54993,8.99089 3.53629,13.55919 0.92129,4.58042 1.77786,9.17482 2.37305,13.81033 0.52932,4.64209 0.99297,9.2926 1.1927,13.96189 0.13353,4.67026 0.20092,9.34334 0.004,14.01274 -0.26321,4.66474 -0.59257,9.32669 -1.18523,13.96252 -0.65807,4.62559 -1.3818,9.24278 -2.36568,13.81161 -1.04817,4.55307 -2.16105,9.0922 -3.52904,13.56107 -1.43071,4.44771 -2.92473,8.87605 -4.66696,13.21273 -1.80294,4.31028 -3.66731,8.59588 -5.77122,12.7691 -2.16216,4.14176 -4.38343,8.25371 -6.83385,12.23337 -2.50579,3.94337 -5.06795,7.85202 -7.8472,11.60941 -2.83134,3.71653 -5.71591,7.39369 -8.80395,10.90171 -3.13647,3.46289 -6.32264,6.88204 -9.6972,10.11539 -3.41899,3.18428 -6.88378,6.32075 -10.52051,9.25612 -3.67684,2.88269 -7.39526,5.71387 -11.26795,8.33008 -3.90817,2.56032 -7.85341,5.06578 -11.93411,7.34396 -4.11132,2.21949 -8.25491,4.38117 -12.5142,6.30488 -4.28482,1.86264 -8.59689,3.66495 -13.00404,5.22033 -4.42741,1.49236 -8.87685,2.92229 -13.40008,4.09812 -4.53807,1.11132 -9.0928,2.15856 -13.69949,2.94636 -4.61599,0.72226 -9.24315,1.37926 -13.90007,1.77335 -4.66064,0.32798 -9.32685,0.59001 -14.00042,0.58754 -4.67165,-0.0686 -9.34327,-0.20349 -13.99978,-0.6025 -4.64898,-0.46479 -9.29231,-0.99553 -13.89817,-1.7882 -4.59278,-0.85757 -9.17434,-1.78038 -13.69632,-2.961 -4.50346,-1.24417 -14.83084,-4.25889 -24.364449,-9.1691 l 16.499999,-28.57883 c 0,0 6.08846,2.92311 12.59817,4.82294 3.60276,0.99534 7.22035,1.93983 10.8856,2.67808 3.67422,0.68605 7.35891,1.32019 11.07357,1.74478 3.71919,0.37183 7.44439,0.69104 11.18169,0.79892 3.73732,0.0549 7.47618,0.0569 11.20915,-0.15273 3.72851,-0.26239 7.45404,-0.57766 11.15577,-1.10326 3.6928,-0.57781 7.37815,-1.20805 11.02193,-2.04584 3.63045,-0.88905 7.24904,-1.82972 10.80859,-2.97366 3.54193,-1.19389 7.06765,-2.4382 10.51731,-3.88004 3.42785,-1.49011 6.83528,-3.02909 10.15015,-4.75843 3.28906,-1.77559 6.55362,-3.59813 9.70981,-5.6025 3.12654,-2.04826 6.22469,-4.14123 9.19943,-6.40617 2.94147,-2.30616 5.85086,-4.65445 8.62269,-7.16363 2.73519,-2.54742 5.43484,-5.1341 7.98377,-7.86942 2.50918,-2.77031 4.97961,-5.57673 7.28726,-8.51846 2.26508,-2.97322 4.48848,-5.97913 6.53821,-9.10605 2.00463,-3.1547 3.96496,-6.33842 5.74198,-9.62798 1.72973,-3.31341 3.41286,-6.65199 4.90435,-10.08047 1.44235,-3.44822 2.83614,-6.91757 4.03135,-10.46023 1.14457,-3.55817 2.23896,-7.13327 3.12927,-10.76458 0.83854,-3.64245 1.62563,-7.29752 2.20462,-10.99127 0.52645,-3.70047 1.00058,-7.40914 1.26407,-11.13869 0.21057,-3.7318 0.36832,-7.46732 0.31441,-11.20578 -0.10683,-3.73621 -0.26661,-7.47164 -0.63753,-11.19205 -0.42346,-3.71367 -0.89961,-7.42208 -1.58487,-11.09759 -0.73703,-3.66435 -1.52612,-7.31898 -2.52077,-10.9231 -1.04529,-3.5886 -2.14163,-7.1631 -3.4385,-10.66983 -1.346,-3.48696 -2.74168,-6.95554 -4.33142,-10.33959 -1.63702,-3.36018 -3.32197,-6.69783 -5.19311,-9.934787 -1.91622,-3.209162 -3.87829,-6.391817 -6.01733,-9.458332 -2.18161,-3.034999 -4.40665,-6.039696 -6.79817,-8.913658 -2.43126,-2.838946 -4.90322,-5.644016 -7.52997,-8.304695 -2.66337,-2.622419 -7.56352,-7.31008 -13.13924,-11.121277 z"
              fill={ring3Fill}
              opacity={arc3Opacity}
              style={{ transformOrigin: "center center" }}
              name="arc-3"
            />
          </>
        )}

        {/* Pupil */}
        {eyeMode && (
          <>
            <circle
              ref={pupilIrisRef}
              name="pupil-iris"
              cx={basePupilPos.x}
              cy={basePupilPos.y}
              r={basePupilRadius}
              fill={`url(#${pupilGradientId})`}
              opacity={pupilContrast}
            />
            <circle
              ref={pupilCoreRef}
              name="pupil-core"
              cx={basePupilPos.x}
              cy={basePupilPos.y}
              r={basePupilRadius * pupilInnerSize}
              fill={pupilInnerColor}
              opacity={pupilContrast}
            />
          </>
        )}
      </g>
    </svg>
  )
}

export default ExpanseLogoAnimated
