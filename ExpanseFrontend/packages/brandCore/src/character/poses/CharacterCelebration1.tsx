import { useTheme } from "@mui/system"
import { getCharacterPathData } from "../characterPathHelper"
import { calculatePositions } from "../calculatePositions"
import { calculateDimensions } from "../config"

export interface CharacterCelebrationProps {
  /** Opacity for limbs - arms and legs (default: 0.5) */
  limbOpacity?: number
  /** Use compact viewBox (0 padding) instead of animation-ready viewBox (100px padding) */
  compact?: boolean
  /** Extra horizontal padding around the character (default: 100 for animation, 0 for compact) */
  containerPaddingX?: number
  /** Extra vertical padding around the character (default: 100 for animation, 0 for compact) */
  containerPaddingY?: number
}

/**
 * CharacterCelebration1 - Victory pose with both arms raised
 *
 * ## Pose Description
 *
 * - Right arm: Raised high, angled up-right (victory pump)
 * - Left arm: Extended down-left (counter balance)
 * - Legs: Spread apart in dynamic stance
 *
 * This creates an asymmetric celebration pose suggesting
 * excited, energetic victory.
 *
 * Uses calculated pose data from calculatePositions for consistency
 * with the animation system.
 *
 * ## ViewBox Options
 *
 * - Default: Animation-ready viewBox (100px padding)
 * - compact: Tight-fitting viewBox (0 padding)
 * - Custom: Specify containerPaddingX/Y for precise control
 */
export const CharacterCelebration1 = ({
  limbOpacity = 0.5,
  compact = false,
  containerPaddingX,
  containerPaddingY,
}: CharacterCelebrationProps = {}) => {
  const theme = useTheme()
  const ExpanseCharacterThemeProps =
    theme.components?.ExpanseCharacter.variants?.default

  // Determine padding based on props
  const paddingX = containerPaddingX ?? (compact ? 0 : 100)
  const paddingY = containerPaddingY ?? (compact ? 0 : 100)

  // Get dimensions with specified padding
  const dims = calculateDimensions({
    containerPaddingX: paddingX,
    containerPaddingY: paddingY,
  })

  const {
    headLength,
    bodyStrokeWidth,
    armStrokeWidth,
    legStrokeWidth,
    containerWidth,
    containerHeight,
  } = dims

  // Calculate positions - these are relative to centerX and include padding
  const positions = calculatePositions()
  const { celebration1: baseCelebration } = positions

  // When using custom padding, we need to adjust positions to match
  // The base positions are calculated with DEFAULT_DIMENSIONS (100px padding)
  const offsetX = paddingX - 100
  const offsetY = paddingY - 100

  // Adjust all positions by the offset
  const celebration1 = {
    head: {
      x: baseCelebration.head.x + offsetX,
      y: baseCelebration.head.y + offsetY,
    },
    body: baseCelebration.body.map((p) => ({
      x: p.x + offsetX,
      y: p.y + offsetY,
    })),
    leftArm: baseCelebration.leftArm.map((p) => ({
      x: p.x + offsetX,
      y: p.y + offsetY,
    })),
    rightArm: baseCelebration.rightArm.map((p) => ({
      x: p.x + offsetX,
      y: p.y + offsetY,
    })),
    leftLeg: baseCelebration.leftLeg.map((p) => ({
      x: p.x + offsetX,
      y: p.y + offsetY,
    })),
    rightLeg: baseCelebration.rightLeg.map((p) => ({
      x: p.x + offsetX,
      y: p.y + offsetY,
    })),
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
      {/* Body */}
      <path
        name="body"
        d={getCharacterPathData(celebration1.body)}
        stroke={ExpanseCharacterThemeProps.bodyColor}
        strokeWidth={bodyStrokeWidth}
        strokeLinecap="round"
      />
      {/* Left Leg */}
      <path
        name="leftLeg"
        d={getCharacterPathData(celebration1.leftLeg)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={legStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />
      {/* Right Leg */}
      <path
        name="rightLeg"
        d={getCharacterPathData(celebration1.rightLeg)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={legStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />
      {/* Head */}
      <circle
        name="head"
        cx={celebration1.head.x}
        cy={celebration1.head.y}
        r={headLength / 2}
        fill={ExpanseCharacterThemeProps.headColor}
      />
      {/* Right Arm - in front */}
      <path
        name="rightArm"
        d={getCharacterPathData(celebration1.rightArm)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={armStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />
      {/* Left Arm */}
      <path
        name="leftArm"
        d={getCharacterPathData(celebration1.leftArm)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={armStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />
    </svg>
  )
}
