"use client"

/**
 * AnimatedCharacter - SVG character component powered by useCharacterAnimation hook.
 *
 * Use this component when you need smooth animated transitions between poses.
 * For static character display, use StaticCharacter instead.
 *
 * Optionally renders the same goggles / strap / antenna / etc. decorations
 * as `Character4eye` by passing variant + design props. Decorations are
 * geometrically anchored to the animated head position, so they track the
 * head through every pose (push lean, jump, walk).
 */

import { useMemo } from "react"
import { useTheme } from "@mui/system"
import { CHARACTER_DISPLAY } from "./poseRegistry"
import type { CharacterAnimationState } from "./types"
import type { LegPoints } from "../geometry/points"
import {
  buildPartContext,
  CharacterDefs,
  CharacterEye,
  CharacterStrap,
  Antenna,
  StatusLEDs,
  EarSensors,
  ForeheadMark,
  DataFlow,
  CircuitNodes,
} from "../parts"
import type {
  Character4eyeMood,
  Character4eyeVariant,
  EyeDesign,
  StrapStyle,
} from "../figure/Character4eye"
import { getExpanseCharacterTheme } from "../theming/themeAccess"

interface AnimatedCharacterProps {
  /** Animation state from useCharacterAnimation hook */
  animationState: CharacterAnimationState
  /** Opacity for limbs (arms and legs) */
  limbOpacity?: number

  /** Optional ref to the underlying `<svg>` element — useful for
   *  external GSAP timelines (e.g. stroke draw-in animations). */
  svgRef?: React.Ref<SVGSVGElement>
  /** When true, the bare head circle is omitted (useful when an
   *  external face/portrait is overlaid on top). */
  hideHead?: boolean

  // -------- Optional Character4eye-style decorations --------
  /** Variant — selects sizing + flag config for decorations. */
  variant?: Character4eyeVariant
  /** Eye design renderer key. */
  eyeDesign?: EyeDesign
  /** Strap (goggles band) style. `"none"` skips it entirely. */
  strapStyle?: StrapStyle
  /** Effective mood passed to renderers. */
  mood?: Character4eyeMood
  /** Number of aperture blades (only used by the aperture eye). */
  apertureBlades?: number
  /** Override the eye glow color. Defaults to theme.palette.info.main. */
  eyeGlowColor?: string
  /** Pulse intensity (0–3). 0 disables. */
  pulseIntensity?: number

  /** Show the antenna on top of the head. */
  showAntenna?: boolean
  showStatusLEDs?: boolean
  statusLEDCount?: number
  statusLEDColors?: string[]
  showEarSensors?: boolean
  showForeheadMark?: boolean
  showDataFlow?: boolean
}

/**
 * Renders the character SVG based on interpolated animation state
 */
export function AnimatedCharacter({
  animationState,
  limbOpacity = 0.5,
  svgRef,
  hideHead = false,
  variant,
  eyeDesign = "default",
  strapStyle = "default",
  mood = "neutral",
  apertureBlades = 6,
  eyeGlowColor,
  pulseIntensity = 0,
  showAntenna = false,
  showStatusLEDs = false,
  statusLEDCount = 2,
  statusLEDColors,
  showEarSensors = false,
  showForeheadMark = false,
  showDataFlow = false,
}: AnimatedCharacterProps) {
  const theme = useTheme()
  const ExpanseCharacterThemeProps = getExpanseCharacterTheme(theme)
    ?.variants?.default ?? {
    headColor: theme.palette.primary.main,
    bodyColor: theme.palette.primary.main,
    limbColor: theme.palette.primary.light,
  }

  const {
    containerWidth,
    containerHeight,
    headLength,
    bodyStrokeWidth,
    armStrokeWidth,
    legStrokeWidth,
  } = CHARACTER_DISPLAY

  const { head, body, leftArm, rightArm, leftLeg, rightLeg } = animationState

  // -------------------------------------------------------------------
  // Head lean angle — derived from the body's tilt so the head + all
  // decorations (goggles, eyes, antenna) rotate together as the torso
  // leans forward (e.g. pushing) or backward. Body[0] is the shoulder,
  // body[2] is the hip. The angle of that segment relative to vertical
  // is the lean. Positive = leaning to the character's right (their
  // head tips forward toward the bar in pushing poses).
  // -------------------------------------------------------------------
  const headLeanDeg = useMemo(() => {
    const shoulder = body[0]
    const hip = body[2]
    const dx = shoulder.x - hip.x
    const dy = shoulder.y - hip.y
    // atan2(dx, -dy): when shoulder is straight above hip (dx=0, dy<0)
    // the result is 0. Tilting shoulder to the right gives a positive
    // angle in degrees.
    return (Math.atan2(dx, -dy) * 180) / Math.PI
  }, [body])

  // -------------------------------------------------------------------
  // Decoration context — only built when a variant is requested. The
  // gradient ID is stable per variant per mount so SVG `<defs>` ids
  // don't collide when multiple animated characters render together.
  // -------------------------------------------------------------------
  const decorationsRequested = variant != null
  const glowColor = eyeGlowColor || theme.palette?.info?.main || "#00d4ff"
  const gradientId = useMemo(
    () =>
      `anim4eye-${variant ?? "none"}-${Math.random().toString(36).slice(2, 11)}`,
    [variant],
  )
  const pulseStyles: React.CSSProperties =
    pulseIntensity > 0
      ? { animation: `pulse ${3 - pulseIntensity}s ease-in-out infinite` }
      : {}

  const partCtx = decorationsRequested
    ? buildPartContext({
        centerX: head.x,
        headCenterY: head.y,
        headLength,
        variant,
        eyeDesign,
        strapStyle,
        effectiveMood: mood,
        apertureBlades,
        glowColor,
        gradientId,
        pulseStyles,
        showAntenna,
        showStatusLEDs,
        statusLEDCount,
        statusLEDColors,
        showEarSensors,
        showForeheadMark,
        showDataFlow,
      })
    : null

  /**
   * Build SVG path data from points array
   */
  const buildPathData = (points: { x: number; y: number }[]): string => {
    return points
      .map(({ x, y }, index) => (index === 0 ? `M${x} ${y}` : `L${x} ${y}`))
      .join(" ")
  }

  /**
   * Build SVG arc path data for legs
   * Uses line commands when arcRadius is 0 or undefined, arc commands otherwise
   */
  const buildLegPathData = (points: LegPoints): string => {
    const [start, mid, end] = points

    // Use line commands when arcRadius is 0 or undefined, arc commands otherwise
    const midCmd =
      mid.arcRadius && mid.arcRadius > 0
        ? `A${mid.arcRadius} ${mid.arcRadius} 0 ${mid.arcLargeFlag ?? 0} ${mid.arcSweepFlag ?? 0} ${mid.x} ${mid.y}`
        : `L${mid.x} ${mid.y}`

    const endCmd =
      end.arcRadius && end.arcRadius > 0
        ? `A${end.arcRadius} ${end.arcRadius} 0 ${end.arcLargeFlag ?? 0} ${end.arcSweepFlag ?? 0} ${end.x} ${end.y}`
        : `L${end.x} ${end.y}`

    return `M${start.x} ${start.y} ${midCmd} ${endCmd}`
  }

  return (
    <svg
      ref={svgRef}
      style={{
        height: "auto",
        maxHeight: "100%",
        width: "auto",
        maxWidth: "100%",
      }}
      viewBox={`0 0 ${containerWidth} ${containerHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Decoration `<defs>` (gradients) — only when a variant is set */}
      {partCtx && <CharacterDefs ctx={partCtx} />}

      {/* Head + decorations rotate as a single rigid group around the
          head center. The rotation angle is derived from the body's
          lean (body[0] is shoulder, body[2] is hip — the angle between
          that line and vertical is how far the torso has tilted). This
          keeps goggles, eyes, antenna, etc. visually attached to the
          head through every animated pose (push lean, jump, walk).
          External GSAP rotation tweens (e.g. celebrate head-cock) can
          target [data-part="headGroup"] and stack on top of this. */}
      <g
        data-part="headGroup"
        transform={`rotate(${headLeanDeg} ${head.x} ${head.y})`}
      >
        {/* Antenna behind the head */}
        {partCtx && <Antenna ctx={partCtx} antennaRef={null} />}

        {/* Head */}
        {!hideHead && (
          <circle
            data-part="head"
            cx={head.x}
            cy={head.y}
            r={headLength / 2}
            fill={ExpanseCharacterThemeProps.headColor}
          />
        )}

        {/* Decorations layered on top of the head, in the same order as
            Character4eye so they composite identically. */}
        {partCtx && (
          <>
            <ForeheadMark ctx={partCtx} />
            <CharacterStrap ctx={partCtx} />
            <CircuitNodes ctx={partCtx} />
            <EarSensors ctx={partCtx} />
            <DataFlow ctx={partCtx} />
            <StatusLEDs ctx={partCtx} />
            <CharacterEye ctx={partCtx} />
          </>
        )}
      </g>

      {/* Body */}
      <path
        data-limb="body"
        d={buildPathData(body)}
        stroke={ExpanseCharacterThemeProps.bodyColor}
        strokeWidth={bodyStrokeWidth}
        strokeLinecap="round"
      />

      {/* Left Arm */}
      <path
        data-limb="leftArm"
        d={buildPathData(leftArm)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={armStrokeWidth}
        opacity={limbOpacity}
        strokeLinecap="round"
      />

      {/* Right Arm */}
      <path
        data-limb="rightArm"
        d={buildPathData(rightArm)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={armStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />

      {/* Left Leg */}
      <path
        data-limb="leftLeg"
        d={buildLegPathData(leftLeg)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={legStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
        fill="none"
      />

      {/* Right Leg */}
      <path
        data-limb="rightLeg"
        d={buildLegPathData(rightLeg)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={legStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
        fill="none"
      />
    </svg>
  )
}
