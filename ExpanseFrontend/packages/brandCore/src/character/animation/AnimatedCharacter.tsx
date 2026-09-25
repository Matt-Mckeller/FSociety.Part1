"use client"

/**
 * AnimatedCharacter - SVG character component powered by useCharacterAnimation hook.
 *
 * Use this component when you need smooth animated transitions between poses.
 * For static character display, use StaticCharacter instead.
 */

import { useTheme } from "@mui/system"
import { CHARACTER_DISPLAY } from "./poseRegistry"
import type { CharacterAnimationState, LegPoints } from "./types"

interface AnimatedCharacterProps {
  /** Animation state from useCharacterAnimation hook */
  animationState: CharacterAnimationState
  /** Opacity for limbs (arms and legs) */
  limbOpacity?: number
}

/**
 * Renders the character SVG based on interpolated animation state
 */
export function AnimatedCharacter({
  animationState,
  limbOpacity = 0.5,
}: AnimatedCharacterProps) {
  const theme = useTheme()
  const ExpanseCharacterThemeProps = theme.components?.ExpanseCharacter
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
      {/* Head */}
      <circle
        name="head"
        cx={head.x}
        cy={head.y}
        r={headLength / 2}
        fill={ExpanseCharacterThemeProps.headColor}
      />

      {/* Body */}
      <path
        name="body"
        d={buildPathData(body)}
        stroke={ExpanseCharacterThemeProps.bodyColor}
        strokeWidth={bodyStrokeWidth}
        strokeLinecap="round"
      />

      {/* Left Arm */}
      <path
        name="leftArm"
        d={buildPathData(leftArm)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={armStrokeWidth}
        opacity={limbOpacity}
        strokeLinecap="round"
      />

      {/* Right Arm */}
      <path
        name="rightArm"
        d={buildPathData(rightArm)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={armStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />

      {/* Left Leg */}
      <path
        name="leftLeg"
        d={buildLegPathData(leftLeg)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={legStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
        fill="none"
      />

      {/* Right Leg */}
      <path
        name="rightLeg"
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
