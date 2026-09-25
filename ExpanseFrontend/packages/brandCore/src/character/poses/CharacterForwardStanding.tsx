import { useTheme } from "@mui/system"
import { getCharacterPathData } from "../characterPathHelper"
import {
  calculateDimensions,
  calculateShoulderPoint,
  calculateHipPoint,
} from "../config"

export interface CharacterForwardStandingProps {
  /** Extra padding around the character (default: 0) */
  containerPaddingX?: number
  /** Extra padding around the character (default: 0) */
  containerPaddingY?: number
  /** Opacity for limbs - arms and legs (default: 0.5) */
  limbOpacity?: number
  /** Show debug borders around container and character bounds */
  enableTestingBorders?: boolean
}

/**
 * CharacterForwardStanding - Static forward-facing character pose
 *
 * ## Proportions (all derived from headSize = 33)
 *
 * | Part   | Formula              | Value |
 * |--------|----------------------|-------|
 * | Head   | headSize             | 33    |
 * | Body   | headSize × 3         | 99    |
 * | Arms   | headSize × 2         | 66    |
 * | Legs   | headSize × 3         | 99    |
 * | Neck   | headSize × 0.15      | ~5    |
 *
 * ## Attachment Points
 *
 * - Shoulders: Attach at body top with slight overlap (armXOverlap)
 * - Hips: Attach at body bottom with gap correction (0.1px)
 */
export const CharacterForwardStanding = ({
  containerPaddingX = 0,
  containerPaddingY = 0,
  limbOpacity = 0.5,
  enableTestingBorders = false,
}: CharacterForwardStandingProps) => {
  const theme = useTheme()
  const ExpanseCharacterThemeProps =
    theme.components?.ExpanseCharacter.variants?.default

  // Get dimensions from central config
  const dims = calculateDimensions({
    containerPaddingX,
    containerPaddingY,
  })

  const {
    headLength,
    armLength,
    bodyLength,
    legLength,
    neckGap,
    bodyStrokeWidth,
    armStrokeWidth,
    legStrokeWidth,
    legGapCorrection,
    characterWidth,
    characterHeight,
    containerWidth,
    containerHeight,
    centerX,
  } = dims

  const headStartX = centerX
  const headStartY = containerPaddingY

  // Body points - vertical line from shoulder to hip
  const bodyPoints = [
    { x: centerX, y: headStartY + headLength + neckGap + bodyStrokeWidth / 2 },
    {
      x: centerX,
      y:
        headStartY +
        headLength +
        neckGap +
        bodyStrokeWidth / 2 +
        bodyLength / 2,
    },
    {
      x: centerX,
      y: headStartY + headLength + neckGap + bodyStrokeWidth / 2 + bodyLength,
    },
  ]

  // Calculate attachment points using config functions
  const rightShoulder = calculateShoulderPoint(bodyPoints[0], "right", dims)
  const leftShoulder = calculateShoulderPoint(bodyPoints[0], "left", dims)

  // Right Arm Points - straight down from shoulder
  const rightArmPoints = [
    rightShoulder,
    { x: rightShoulder.x, y: rightShoulder.y + armLength / 2 },
    { x: rightShoulder.x, y: rightShoulder.y + armLength },
  ]

  // Left Arm Points - straight down from shoulder
  const leftArmPoints = [
    leftShoulder,
    { x: leftShoulder.x, y: leftShoulder.y + armLength / 2 },
    { x: leftShoulder.x, y: leftShoulder.y + armLength },
  ]

  // Hip attachment points
  const leftHip = calculateHipPoint(bodyPoints[0], "left", dims)
  const rightHip = calculateHipPoint(bodyPoints[0], "right", dims)

  // Left Leg Points - straight down from hip
  const leftLegPoints = [
    leftHip,
    { x: leftHip.x, y: leftHip.y + legLength / 2 },
    { x: leftHip.x, y: leftHip.y + legLength },
  ]

  // Right Leg Points - straight down from hip
  const rightLegPoints = [
    rightHip,
    { x: rightHip.x, y: rightHip.y + legLength / 2 },
    { x: rightHip.x, y: rightHip.y + legLength },
  ]

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
      {/* For testing */}
      {enableTestingBorders && (
        <>
          <rect
            name="container border"
            strokeWidth="1"
            stroke="#010203"
            height={containerHeight}
            width={containerWidth}
          ></rect>
          <rect
            name="character border"
            strokeWidth="1"
            stroke="blue"
            x={containerPaddingX}
            y={containerPaddingY}
            height={characterHeight}
            width={characterWidth}
          ></rect>
        </>
      )}
      <circle
        name="head"
        cx={headStartX}
        cy={headLength / 2 + headStartY}
        r={headLength / 2}
        fill={ExpanseCharacterThemeProps.headColor}
      />
      <path
        name="body"
        d={getCharacterPathData(bodyPoints)}
        stroke={ExpanseCharacterThemeProps.bodyColor}
        strokeWidth={bodyStrokeWidth}
        strokeLinecap="round"
      />
      <path
        name="leftArm"
        d={getCharacterPathData(leftArmPoints)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={armStrokeWidth}
        opacity={limbOpacity}
        strokeLinecap="round"
      />
      <path
        name="rightArm"
        d={getCharacterPathData(rightArmPoints)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={armStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />
      <path
        name="leftLeg"
        d={getCharacterPathData(leftLegPoints)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={legStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />
      <path
        name="rightLeg"
        d={getCharacterPathData(rightLegPoints)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={legStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />
      {/* <path
        d="M19 49V85.5V122"
        stroke={theme.palette.primary.main}
        strokeWidth="26"
        strokeLinecap="round"
      />
      <path
        d="M5 43V71.5V100"
        stroke={theme.palette.primary.light}
        strokeWidth="8.67"
        strokeLinecap="round"
      />
      <path
        d="M33 43V71.5V100"
        stroke={theme.palette.primary.light}
        strokeWidth="8.67"
        strokeLinecap="round"
      />
      <path
        d="M12.5 122V165V208"
        stroke={theme.palette.primary.light}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M25.5 122V165V208"
        stroke={theme.palette.primary.light}
        strokeWidth="13"
        strokeLinecap="round"
      /> */}
    </svg>
  )
}
