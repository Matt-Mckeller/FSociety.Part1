import { useTheme } from "@mui/system"
import { getCharacterPathData } from "../characterPathHelper"
import { DEFAULT_DIMENSIONS } from "../config"

export interface CharacterSideStandingProps {
  /** Opacity for limbs - arms and legs (default: 0.5) */
  limbOpacity?: number
}

/**
 * CharacterRightStanding - Side view of character facing right
 *
 * ## Side View Proportions
 *
 * In side view, the character is narrower (headSize width) and all limbs
 * are rendered at the same X position, creating a silhouette effect.
 *
 * Note: Currently identical to CharacterLeftStanding since the basic
 * stick figure is symmetrical. Direction becomes relevant when adding
 * facial features or asymmetric poses.
 */
export const CharacterRightStanding = ({
  limbOpacity = 0.5,
}: CharacterSideStandingProps = {}) => {
  const theme = useTheme()
  const ExpanseCharacterThemeProps =
    theme.components?.ExpanseCharacter?.variants?.default

  const {
    headLength,
    armLength,
    bodyLength,
    legLength,
    neckGap,
    bodyStrokeWidth,
    armStrokeWidth,
    legStrokeWidth,
    characterHeight,
  } = DEFAULT_DIMENSIONS

  // Side view: character is headSize wide
  const containerWidth = headLength
  const containerHeight = characterHeight
  const centerX = headLength / 2

  // Head position
  const headCenterY = headLength / 2

  // Body position (side view - single vertical line)
  const bodyStartY = headLength + neckGap + bodyStrokeWidth / 2
  const bodyEndY = bodyStartY + bodyLength

  const bodyPoints = [
    { x: centerX, y: bodyStartY },
    { x: centerX, y: bodyStartY + bodyLength / 2 },
    { x: centerX, y: bodyEndY },
  ]

  // Arms position (same X, overlapping in side view)
  const armStartY = bodyStartY - bodyStrokeWidth / 2 + armStrokeWidth
  const armEndY = armStartY + armLength

  const armPoints = [
    { x: centerX, y: armStartY },
    { x: centerX, y: armStartY + armLength / 2 },
    { x: centerX, y: armEndY },
  ]

  // Legs position (same X, overlapping in side view)
  const legStartY = bodyEndY
  const legEndY = legStartY + legLength

  const legPoints = [
    { x: centerX, y: legStartY },
    { x: centerX, y: legStartY + legLength / 2 },
    { x: centerX, y: legEndY },
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
      {/* Arms behind body in side view */}
      <path
        name="arms"
        d={getCharacterPathData(armPoints)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={armStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />
      {/* Body */}
      <path
        name="body"
        d={getCharacterPathData(bodyPoints)}
        stroke={ExpanseCharacterThemeProps.bodyColor}
        strokeWidth={bodyStrokeWidth}
        strokeLinecap="round"
      />
      {/* Legs */}
      <path
        name="legs"
        d={getCharacterPathData(legPoints)}
        stroke={ExpanseCharacterThemeProps.limbColor}
        strokeWidth={legStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />
      {/* Head */}
      <circle
        name="head"
        cx={centerX}
        cy={headCenterY}
        r={headLength / 2}
        fill={ExpanseCharacterThemeProps.headColor}
      />
    </svg>
  )
}
