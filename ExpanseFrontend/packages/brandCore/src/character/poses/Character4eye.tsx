import { useTheme } from "@mui/system"
import { getCharacterPathData } from "../characterPathHelper"
import { calculateDimensions } from "../config"

/** Visual style variants for the 4eye face design */
export type Character4eyeVariant = "minimal" | "tech" | "friendly" | "sleek"

/** Eye design styles */
export type EyeDesign =
  | "default"
  | "aperture"
  | "camera"
  | "orb"
  | "scanner"
  | "ring"

/** Strap/visor styles */
export type StrapStyle =
  | "default"
  | "smooth"
  | "angular"
  | "floating"
  | "organic"
  | "none"

/** Character mood/state for animations */
export type Character4eyeMood =
  | "neutral"
  | "alert"
  | "processing"
  | "happy"
  | "scanning"

export interface Character4eyeProps {
  /** Opacity for limbs - arms and legs (default: 0.5) */
  limbOpacity?: number
  /** Eye glow color (default: uses theme accent) */
  eyeGlowColor?: string
  /** Visual style variant (default: 'friendly') */
  variant?: Character4eyeVariant
  /** Use compact viewBox (0 padding) instead of animation-ready viewBox (100px padding) */
  compact?: boolean
  /** Extra horizontal padding around the character (default: 100 for animation, 0 for compact) */
  containerPaddingX?: number
  /** Extra vertical padding around the character (default: 100 for animation, 0 for compact) */
  containerPaddingY?: number

  // === NEW ENHANCED PROPS ===

  /** Eye design style (default: 'default') */
  eyeDesign?: EyeDesign
  /** Strap/visor style (default: 'default') */
  strapStyle?: StrapStyle
  /** Character mood/state (default: 'neutral') */
  mood?: Character4eyeMood
  /** Show small antenna on top of head */
  showAntenna?: boolean
  /** Show status LED indicators near the eye */
  showStatusLEDs?: boolean
  /** Number of status LEDs to show (1-3, default: 2) */
  statusLEDCount?: 1 | 2 | 3
  /** Status LED colors (defaults to glow color variations) */
  statusLEDColors?: string[]
  /** Show ear sensors on strap sides */
  showEarSensors?: boolean
  /** Show forehead tech mark */
  showForeheadMark?: boolean
  /** Secondary accent color for details */
  secondaryColor?: string
  /** Number of aperture blades for 'aperture' eye design (default: 6) */
  apertureBlades?: number
  /** Show data flow lines on strap */
  showDataFlow?: boolean
  /** Pulse animation intensity (0 = none, 1 = subtle, 2 = moderate, 3 = strong) */
  pulseIntensity?: 0 | 1 | 2 | 3
}

/**
 * Character4eye - AI mascot variant with single-eye robotic design
 *
 * ## Design Concept
 *
 * A friendly AI companion character with:
 * - Compact dual-layer eye (camera lens aesthetic)
 * - Wrap-around strap/visor that goes around the head
 * - Same body proportions as the base character
 * - Futuristic but approachable aesthetic
 *
 * ## Variants
 *
 * - **minimal**: Clean, simple visor band with subtle eye
 * - **tech**: Circuit nodes, detailed technical look
 * - **friendly**: Warm glow, larger eye, approachable feel
 * - **sleek**: Thin band, modern minimalist
 *
 * ## Eye Designs
 *
 * - **default**: Basic concentric circles
 * - **aperture**: Camera aperture with blades
 * - **camera**: Detailed camera lens with rings
 * - **orb**: Glowing magical orb
 * - **scanner**: Horizontal scan line
 * - **ring**: Thin ring with dot pupil
 *
 * ## Strap Styles
 *
 * - **default**: Standard wrap-around band
 * - **smooth**: Organic curves, softer feel
 * - **angular**: Sharp edges, futuristic
 * - **floating**: Detached segments
 * - **organic**: Flowing, living feel
 * - **none**: No strap (just eye on head)
 *
 * ## Visual Elements
 *
 * - **Eye**: Multiple design options
 * - **Strap**: Multiple style options
 * - **Antenna**: Optional top antenna
 * - **Status LEDs**: 1-3 indicator lights
 * - **Ear Sensors**: Side sensors on strap
 * - **Forehead Mark**: Tech pattern above eye
 * - **Data Flow**: Animated lines on strap
 */
export const Character4eye = ({
  limbOpacity = 0.5,
  eyeGlowColor,
  variant = "friendly",
  compact = false,
  containerPaddingX,
  containerPaddingY,
  // New enhanced props
  eyeDesign = "default",
  strapStyle = "default",
  mood = "neutral",
  showAntenna = false,
  showStatusLEDs = false,
  statusLEDCount = 2,
  statusLEDColors,
  showEarSensors = false,
  showForeheadMark = false,
  secondaryColor,
  apertureBlades = 6,
  showDataFlow = false,
  pulseIntensity = 0,
}: Character4eyeProps = {}) => {
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
    armLength,
    bodyLength,
    legLength,
    neckGap,
    bodyStrokeWidth,
    armStrokeWidth,
    legStrokeWidth,
    containerWidth,
    containerHeight,
    centerX,
  } = dims

  // Calculate positions (same as CharacterForwardStanding)
  const headStartY = paddingY
  const headCenterY = headLength / 2 + headStartY
  const headRadius = headLength / 2

  // Body position
  const bodyStartY =
    headCenterY + headLength / 2 + neckGap + bodyStrokeWidth / 2
  const bodyEndY = bodyStartY + bodyLength

  const bodyPoints = [
    { x: centerX, y: bodyStartY },
    { x: centerX, y: bodyStartY + bodyLength / 2 },
    { x: centerX, y: bodyEndY },
  ]

  // Shoulder position (where arms attach)
  const shoulderY = bodyStartY - bodyStrokeWidth / 2 + armStrokeWidth
  const armXOverlap = 0.1

  // Left arm
  const leftArmPoints = [
    { x: centerX - bodyStrokeWidth / 2 - armXOverlap, y: shoulderY },
    {
      x: centerX - bodyStrokeWidth / 2 - armXOverlap,
      y: shoulderY + armLength / 2,
    },
    {
      x: centerX - bodyStrokeWidth / 2 - armXOverlap,
      y: shoulderY + armLength,
    },
  ]

  // Right arm
  const rightArmPoints = [
    { x: centerX + bodyStrokeWidth / 2 + armXOverlap, y: shoulderY },
    {
      x: centerX + bodyStrokeWidth / 2 + armXOverlap,
      y: shoulderY + armLength / 2,
    },
    {
      x: centerX + bodyStrokeWidth / 2 + armXOverlap,
      y: shoulderY + armLength,
    },
  ]

  // Legs
  const legGapCorrection = 0.1
  const leftLegPoints = [
    { x: centerX - legStrokeWidth / 2 + legGapCorrection, y: bodyEndY },
    {
      x: centerX - legStrokeWidth / 2 + legGapCorrection,
      y: bodyEndY + legLength / 2,
    },
    {
      x: centerX - legStrokeWidth / 2 + legGapCorrection,
      y: bodyEndY + legLength,
    },
  ]

  const rightLegPoints = [
    { x: centerX + legStrokeWidth / 2 - legGapCorrection, y: bodyEndY },
    {
      x: centerX + legStrokeWidth / 2 - legGapCorrection,
      y: bodyEndY + legLength / 2,
    },
    {
      x: centerX + legStrokeWidth / 2 - legGapCorrection,
      y: bodyEndY + legLength,
    },
  ]

  // Get glow color
  const glowColor = eyeGlowColor || theme.palette?.info?.main || "#00d4ff"

  // Variant-specific configurations
  const variantConfig = {
    minimal: {
      eyeOuterRadius: headLength * 0.12,
      eyeInnerRadius: headLength * 0.06,
      strapWidth: headLength * 0.08,
      strapExtend: headLength * 0.15,
      showNodes: false,
      glowIntensity: 0.4,
    },
    tech: {
      eyeOuterRadius: headLength * 0.14,
      eyeInnerRadius: headLength * 0.07,
      strapWidth: headLength * 0.1,
      strapExtend: headLength * 0.2,
      showNodes: true,
      glowIntensity: 0.6,
    },
    friendly: {
      eyeOuterRadius: headLength * 0.16,
      eyeInnerRadius: headLength * 0.09,
      strapWidth: headLength * 0.12,
      strapExtend: headLength * 0.18,
      showNodes: true,
      glowIntensity: 0.7,
    },
    sleek: {
      eyeOuterRadius: headLength * 0.11,
      eyeInnerRadius: headLength * 0.055,
      strapWidth: headLength * 0.05,
      strapExtend: headLength * 0.12,
      showNodes: false,
      glowIntensity: 0.5,
    },
  }

  const config = variantConfig[variant]

  // Strap wrap-around path (curves around the head like a visor)
  const strapY = headCenterY
  const strapHalfWidth = config.strapWidth / 2

  // Calculate strap end points (where it wraps around the head)
  const strapWrapAngle = 25 // degrees from horizontal
  const strapWrapRad = (strapWrapAngle * Math.PI) / 180
  const wrapX = headRadius * Math.cos(strapWrapRad)
  const wrapYOffset = headRadius * Math.sin(strapWrapRad)

  // Secondary color defaults to a shifted version of glow color
  const accent = secondaryColor || glowColor

  // Mood-based animations classes
  const getMoodClass = () => {
    switch (mood) {
      case "alert":
        return "animate-pulse"
      case "processing":
        return "animate-spin-slow"
      case "scanning":
        return "animate-scan"
      default:
        return ""
    }
  }

  // Pulse animation intensity styles
  const pulseStyles =
    pulseIntensity > 0
      ? {
          animation: `pulse ${3 - pulseIntensity}s ease-in-out infinite`,
        }
      : {}

  // ============================================================
  // EYE DESIGN RENDERERS
  // ============================================================

  /** Default eye - basic concentric circles */
  const renderDefaultEye = () => (
    <>
      {/* Eye - outer glow effect */}
      <circle
        name="eyeGlow"
        cx={centerX}
        cy={headCenterY}
        r={config.eyeOuterRadius + 2}
        fill={`url(#${gradientId}-eyeGlow)`}
      />
      {/* Eye - outer ring (layer 1) */}
      <circle
        name="eyeOuter"
        cx={centerX}
        cy={headCenterY}
        r={config.eyeOuterRadius}
        fill="#1a1a2e"
        stroke={glowColor}
        strokeWidth={1}
      />
      {/* Eye - inner core (layer 2) */}
      <circle
        name="eyeInner"
        cx={centerX}
        cy={headCenterY}
        r={config.eyeInnerRadius}
        fill={glowColor}
        opacity={0.8}
      />
      {/* Eye - center highlight */}
      <circle
        cx={centerX}
        cy={headCenterY}
        r={config.eyeInnerRadius * 0.4}
        fill="#fff"
        opacity={0.9}
      />
      {/* Eye - reflection dot */}
      <circle
        cx={centerX - config.eyeOuterRadius * 0.25}
        cy={headCenterY - config.eyeOuterRadius * 0.25}
        r={config.eyeInnerRadius * 0.2}
        fill="#fff"
        opacity={0.5}
      />
    </>
  )

  /** Aperture eye - camera iris with blades */
  const renderApertureEye = () => {
    const bladeAngle = (2 * Math.PI) / apertureBlades
    const outerR = config.eyeOuterRadius
    const innerR = config.eyeInnerRadius * 1.2

    return (
      <>
        {/* Background glow */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={outerR + 3}
          fill={`url(#${gradientId}-eyeGlow)`}
        />
        {/* Outer housing */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={outerR}
          fill="#0a0a15"
          stroke={glowColor}
          strokeWidth={1.5}
        />
        {/* Aperture blades */}
        {Array.from({ length: apertureBlades }).map((_, i) => {
          const angle = bladeAngle * i - Math.PI / 2
          const nextAngle = angle + bladeAngle
          const midAngle = angle + bladeAngle / 2

          const x1 = centerX + Math.cos(angle) * innerR
          const y1 = headCenterY + Math.sin(angle) * innerR
          const x2 = centerX + Math.cos(nextAngle) * innerR
          const y2 = headCenterY + Math.sin(nextAngle) * innerR
          const xMid = centerX + Math.cos(midAngle) * (outerR - 1)
          const yMid = headCenterY + Math.sin(midAngle) * (outerR - 1)

          return (
            <path
              key={i}
              d={`M ${x1} ${y1} Q ${xMid} ${yMid} ${x2} ${y2} L ${centerX} ${headCenterY} Z`}
              fill={i % 2 === 0 ? "#1a1a2e" : "#2a2a4e"}
              stroke={glowColor}
              strokeWidth={0.3}
              opacity={0.9}
            />
          )
        })}
        {/* Center lens */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={config.eyeInnerRadius * 0.7}
          fill={glowColor}
          opacity={0.9}
        />
        {/* Lens highlight */}
        <circle
          cx={centerX - innerR * 0.15}
          cy={headCenterY - innerR * 0.15}
          r={config.eyeInnerRadius * 0.25}
          fill="#fff"
          opacity={0.7}
        />
      </>
    )
  }

  /** Camera eye - detailed lens rings */
  const renderCameraEye = () => {
    const outerR = config.eyeOuterRadius
    return (
      <>
        {/* Outer glow */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={outerR + 4}
          fill={`url(#${gradientId}-eyeGlow)`}
        />
        {/* Outer housing */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={outerR}
          fill="#0f0f1a"
          stroke={glowColor}
          strokeWidth={2}
        />
        {/* Ring 1 */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={outerR * 0.85}
          fill="none"
          stroke={glowColor}
          strokeWidth={0.5}
          opacity={0.4}
        />
        {/* Ring 2 */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={outerR * 0.7}
          fill="#1a1a2e"
          stroke={glowColor}
          strokeWidth={0.8}
          opacity={0.6}
        />
        {/* Ring 3 */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={outerR * 0.55}
          fill="none"
          stroke={glowColor}
          strokeWidth={0.5}
          opacity={0.5}
        />
        {/* Inner lens */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={outerR * 0.4}
          fill={glowColor}
        />
        {/* Lens center */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={outerR * 0.2}
          fill="#fff"
          opacity={0.8}
        />
        {/* Highlight */}
        <circle
          cx={centerX - outerR * 0.2}
          cy={headCenterY - outerR * 0.2}
          r={outerR * 0.12}
          fill="#fff"
          opacity={0.5}
        />
        {/* Small detail dots around outer ring */}
        {[0, 90, 180, 270].map((deg) => {
          const rad = (deg * Math.PI) / 180
          return (
            <circle
              key={deg}
              cx={centerX + Math.cos(rad) * outerR * 0.92}
              cy={headCenterY + Math.sin(rad) * outerR * 0.92}
              r={0.8}
              fill={glowColor}
              opacity={0.6}
            />
          )
        })}
      </>
    )
  }

  /** Orb eye - glowing magical sphere */
  const renderOrbEye = () => {
    const outerR = config.eyeOuterRadius
    return (
      <>
        {/* Large outer glow */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={outerR + 6}
          fill={`url(#${gradientId}-eyeGlow)`}
          style={pulseStyles}
        />
        {/* Secondary glow */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={outerR + 2}
          fill={glowColor}
          opacity={0.3}
        />
        {/* Main orb */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={outerR}
          fill={`url(#${gradientId}-orbGradient)`}
        />
        {/* Inner energy */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={outerR * 0.6}
          fill={glowColor}
          opacity={0.5}
        />
        {/* Core */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={outerR * 0.25}
          fill="#fff"
          opacity={0.9}
        />
        {/* Sparkle highlights */}
        <circle
          cx={centerX - outerR * 0.3}
          cy={headCenterY - outerR * 0.25}
          r={outerR * 0.1}
          fill="#fff"
        />
        <circle
          cx={centerX + outerR * 0.35}
          cy={headCenterY - outerR * 0.15}
          r={outerR * 0.06}
          fill="#fff"
          opacity={0.7}
        />
      </>
    )
  }

  /** Scanner eye - horizontal scan aesthetic */
  const renderScannerEye = () => {
    const outerR = config.eyeOuterRadius
    const scanning = mood === "scanning"
    return (
      <>
        {/* Outer glow */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={outerR + 3}
          fill={`url(#${gradientId}-eyeGlow)`}
        />
        {/* Outer ring */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={outerR}
          fill="#0a0a12"
          stroke={glowColor}
          strokeWidth={1.5}
        />
        {/* Horizontal lines */}
        {[-0.6, -0.3, 0, 0.3, 0.6].map((offset, i) => (
          <line
            key={i}
            x1={centerX - outerR * 0.8}
            y1={headCenterY + outerR * offset}
            x2={centerX + outerR * 0.8}
            y2={headCenterY + outerR * offset}
            stroke={glowColor}
            strokeWidth={i === 2 ? 2 : 0.5}
            opacity={i === 2 ? 1 : 0.4}
          />
        ))}
        {/* Scan bar (animated position based on mood) */}
        <rect
          x={centerX - outerR * 0.8}
          y={headCenterY - 1}
          width={outerR * 1.6}
          height={2}
          fill={glowColor}
          opacity={0.8}
          className={scanning ? "animate-scan-line" : ""}
        >
          {scanning && (
            <animate
              attributeName="y"
              values={`${headCenterY - outerR * 0.7};${headCenterY + outerR * 0.7};${headCenterY - outerR * 0.7}`}
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </rect>
        {/* Center dot */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={outerR * 0.15}
          fill={glowColor}
        />
      </>
    )
  }

  /** Ring eye - thin ring with dot pupil */
  const renderRingEye = () => {
    const outerR = config.eyeOuterRadius
    return (
      <>
        {/* Glow */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={outerR + 2}
          fill={`url(#${gradientId}-eyeGlow)`}
        />
        {/* Outer thin ring */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={outerR}
          fill="none"
          stroke={glowColor}
          strokeWidth={2}
        />
        {/* Inner thin ring */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={outerR * 0.6}
          fill="none"
          stroke={glowColor}
          strokeWidth={1}
          opacity={0.6}
        />
        {/* Center pupil */}
        <circle
          cx={centerX}
          cy={headCenterY}
          r={outerR * 0.25}
          fill={glowColor}
        />
        {/* Highlight */}
        <circle
          cx={centerX - outerR * 0.08}
          cy={headCenterY - outerR * 0.08}
          r={outerR * 0.1}
          fill="#fff"
          opacity={0.8}
        />
      </>
    )
  }

  /** Select eye renderer based on design prop */
  const renderEye = () => {
    switch (eyeDesign) {
      case "aperture":
        return renderApertureEye()
      case "camera":
        return renderCameraEye()
      case "orb":
        return renderOrbEye()
      case "scanner":
        return renderScannerEye()
      case "ring":
        return renderRingEye()
      default:
        return renderDefaultEye()
    }
  }

  // ============================================================
  // STRAP STYLE RENDERERS
  // ============================================================

  /** Default strap - standard wrap-around */
  const renderDefaultStrap = () => (
    <>
      {/* Left wrap-around extension */}
      <path
        name="strapWrapLeft"
        d={`
          M ${centerX - wrapX} ${strapY - strapHalfWidth}
          Q ${centerX - headRadius - config.strapExtend} ${strapY - strapHalfWidth * 0.5}
            ${centerX - headRadius - config.strapExtend} ${strapY + wrapYOffset}
          L ${centerX - headRadius - config.strapExtend} ${strapY + wrapYOffset + strapHalfWidth}
          Q ${centerX - headRadius - config.strapExtend + 2} ${strapY + strapHalfWidth * 0.8}
            ${centerX - wrapX} ${strapY + strapHalfWidth}
          Z
        `}
        fill={`url(#${gradientId}-strap)`}
      />
      {/* Right wrap-around extension */}
      <path
        name="strapWrapRight"
        d={`
          M ${centerX + wrapX} ${strapY - strapHalfWidth}
          Q ${centerX + headRadius + config.strapExtend} ${strapY - strapHalfWidth * 0.5}
            ${centerX + headRadius + config.strapExtend} ${strapY + wrapYOffset}
          L ${centerX + headRadius + config.strapExtend} ${strapY + wrapYOffset + strapHalfWidth}
          Q ${centerX + headRadius + config.strapExtend - 2} ${strapY + strapHalfWidth * 0.8}
            ${centerX + wrapX} ${strapY + strapHalfWidth}
          Z
        `}
        fill={`url(#${gradientId}-strap)`}
      />
      {/* Main strap band across face */}
      <rect
        name="strapMain"
        x={centerX - wrapX}
        y={strapY - strapHalfWidth}
        width={wrapX * 2}
        height={config.strapWidth}
        fill={`url(#${gradientId}-strap)`}
        rx={config.strapWidth / 4}
      />
      {/* Strap edge glow lines */}
      <line
        x1={centerX - wrapX + 2}
        y1={strapY - strapHalfWidth + 1}
        x2={centerX + wrapX - 2}
        y2={strapY - strapHalfWidth + 1}
        stroke={glowColor}
        strokeWidth={0.5}
        opacity={0.4}
      />
      <line
        x1={centerX - wrapX + 2}
        y1={strapY + strapHalfWidth - 1}
        x2={centerX + wrapX - 2}
        y2={strapY + strapHalfWidth - 1}
        stroke={glowColor}
        strokeWidth={0.5}
        opacity={0.4}
      />
    </>
  )

  /** Smooth strap - organic flowing curves */
  const renderSmoothStrap = () => {
    const sw = config.strapWidth
    const extend = config.strapExtend * 1.2
    return (
      <>
        {/* Main flowing band */}
        <path
          d={`
            M ${centerX - headRadius - extend} ${strapY}
            C ${centerX - headRadius * 0.8} ${strapY - sw * 0.3}
              ${centerX - headRadius * 0.3} ${strapY - sw * 0.5}
              ${centerX} ${strapY - sw * 0.5}
            C ${centerX + headRadius * 0.3} ${strapY - sw * 0.5}
              ${centerX + headRadius * 0.8} ${strapY - sw * 0.3}
              ${centerX + headRadius + extend} ${strapY}
            C ${centerX + headRadius * 0.8} ${strapY + sw * 0.3}
              ${centerX + headRadius * 0.3} ${strapY + sw * 0.5}
              ${centerX} ${strapY + sw * 0.5}
            C ${centerX - headRadius * 0.3} ${strapY + sw * 0.5}
              ${centerX - headRadius * 0.8} ${strapY + sw * 0.3}
              ${centerX - headRadius - extend} ${strapY}
            Z
          `}
          fill={`url(#${gradientId}-strap)`}
        />
        {/* Soft glow outline */}
        <path
          d={`
            M ${centerX - headRadius - extend} ${strapY}
            C ${centerX - headRadius * 0.8} ${strapY - sw * 0.3}
              ${centerX - headRadius * 0.3} ${strapY - sw * 0.5}
              ${centerX} ${strapY - sw * 0.5}
            C ${centerX + headRadius * 0.3} ${strapY - sw * 0.5}
              ${centerX + headRadius * 0.8} ${strapY - sw * 0.3}
              ${centerX + headRadius + extend} ${strapY}
          `}
          fill="none"
          stroke={glowColor}
          strokeWidth={0.5}
          opacity={0.5}
        />
      </>
    )
  }

  /** Angular strap - sharp geometric edges */
  const renderAngularStrap = () => {
    const sw = config.strapWidth
    const extend = config.strapExtend
    return (
      <>
        {/* Angular main band */}
        <path
          d={`
            M ${centerX - headRadius - extend} ${strapY - sw * 0.3}
            L ${centerX - headRadius - extend + 3} ${strapY - sw * 0.5}
            L ${centerX - wrapX} ${strapY - sw * 0.5}
            L ${centerX + wrapX} ${strapY - sw * 0.5}
            L ${centerX + headRadius + extend - 3} ${strapY - sw * 0.5}
            L ${centerX + headRadius + extend} ${strapY - sw * 0.3}
            L ${centerX + headRadius + extend} ${strapY + sw * 0.3}
            L ${centerX + headRadius + extend - 3} ${strapY + sw * 0.5}
            L ${centerX + wrapX} ${strapY + sw * 0.5}
            L ${centerX - wrapX} ${strapY + sw * 0.5}
            L ${centerX - headRadius - extend + 3} ${strapY + sw * 0.5}
            L ${centerX - headRadius - extend} ${strapY + sw * 0.3}
            Z
          `}
          fill={`url(#${gradientId}-strap)`}
        />
        {/* Angular accent lines */}
        <line
          x1={centerX - wrapX}
          y1={strapY - sw * 0.5}
          x2={centerX + wrapX}
          y2={strapY - sw * 0.5}
          stroke={glowColor}
          strokeWidth={1}
          opacity={0.6}
        />
        <line
          x1={centerX - wrapX}
          y1={strapY + sw * 0.5}
          x2={centerX + wrapX}
          y2={strapY + sw * 0.5}
          stroke={glowColor}
          strokeWidth={1}
          opacity={0.6}
        />
        {/* Corner accents */}
        {[centerX - headRadius - extend, centerX + headRadius + extend].map(
          (x, i) => (
            <polygon
              key={i}
              points={`${x},${strapY - sw * 0.3} ${x + (i === 0 ? 3 : -3)},${strapY - sw * 0.5} ${x + (i === 0 ? 3 : -3)},${strapY + sw * 0.5} ${x},${strapY + sw * 0.3}`}
              fill={glowColor}
              opacity={0.3}
            />
          ),
        )}
      </>
    )
  }

  /** Floating strap - detached segments */
  const renderFloatingStrap = () => {
    const sw = config.strapWidth * 0.8
    const gap = headLength * 0.08
    return (
      <>
        {/* Left floating segment */}
        <rect
          x={centerX - headRadius - config.strapExtend}
          y={strapY - sw / 2}
          width={headRadius * 0.5}
          height={sw}
          rx={sw / 4}
          fill={`url(#${gradientId}-strap)`}
        />
        {/* Center-left segment */}
        <rect
          x={centerX - headRadius * 0.4}
          y={strapY - sw / 2}
          width={headRadius * 0.3}
          height={sw}
          rx={sw / 4}
          fill={`url(#${gradientId}-strap)`}
        />
        {/* Center-right segment */}
        <rect
          x={centerX + headRadius * 0.1}
          y={strapY - sw / 2}
          width={headRadius * 0.3}
          height={sw}
          rx={sw / 4}
          fill={`url(#${gradientId}-strap)`}
        />
        {/* Right floating segment */}
        <rect
          x={centerX + headRadius * 0.5 + config.strapExtend * 0.3}
          y={strapY - sw / 2}
          width={headRadius * 0.5}
          height={sw}
          rx={sw / 4}
          fill={`url(#${gradientId}-strap)`}
        />
        {/* Connecting glow lines */}
        <line
          x1={
            centerX - headRadius - config.strapExtend + headRadius * 0.5 + gap
          }
          y1={strapY}
          x2={centerX - headRadius * 0.4 - gap}
          y2={strapY}
          stroke={glowColor}
          strokeWidth={0.5}
          strokeDasharray="2,2"
          opacity={0.5}
        />
        <line
          x1={centerX - headRadius * 0.1 + gap}
          y1={strapY}
          x2={centerX + headRadius * 0.1 - gap}
          y2={strapY}
          stroke={glowColor}
          strokeWidth={0.5}
          strokeDasharray="2,2"
          opacity={0.5}
        />
        <line
          x1={centerX + headRadius * 0.4 + gap}
          y1={strapY}
          x2={centerX + headRadius * 0.5 + config.strapExtend * 0.3 - gap}
          y2={strapY}
          stroke={glowColor}
          strokeWidth={0.5}
          strokeDasharray="2,2"
          opacity={0.5}
        />
      </>
    )
  }

  /** Organic strap - flowing living curves */
  const renderOrganicStrap = () => {
    const sw = config.strapWidth
    return (
      <>
        {/* Organic flowing shape */}
        <path
          d={`
            M ${centerX - headRadius - config.strapExtend * 0.8} ${strapY}
            Q ${centerX - headRadius - config.strapExtend * 0.5} ${strapY - sw * 0.8}
              ${centerX - headRadius * 0.5} ${strapY - sw * 0.4}
            T ${centerX} ${strapY - sw * 0.6}
            T ${centerX + headRadius * 0.5} ${strapY - sw * 0.4}
            Q ${centerX + headRadius + config.strapExtend * 0.5} ${strapY - sw * 0.8}
              ${centerX + headRadius + config.strapExtend * 0.8} ${strapY}
            Q ${centerX + headRadius + config.strapExtend * 0.5} ${strapY + sw * 0.8}
              ${centerX + headRadius * 0.5} ${strapY + sw * 0.4}
            T ${centerX} ${strapY + sw * 0.6}
            T ${centerX - headRadius * 0.5} ${strapY + sw * 0.4}
            Q ${centerX - headRadius - config.strapExtend * 0.5} ${strapY + sw * 0.8}
              ${centerX - headRadius - config.strapExtend * 0.8} ${strapY}
            Z
          `}
          fill={`url(#${gradientId}-strap)`}
          opacity={0.9}
        />
        {/* Inner flowing accent */}
        <path
          d={`
            M ${centerX - headRadius * 0.6} ${strapY}
            Q ${centerX - headRadius * 0.3} ${strapY - sw * 0.2}
              ${centerX} ${strapY - sw * 0.3}
            Q ${centerX + headRadius * 0.3} ${strapY - sw * 0.2}
              ${centerX + headRadius * 0.6} ${strapY}
          `}
          fill="none"
          stroke={glowColor}
          strokeWidth={0.8}
          opacity={0.5}
        />
      </>
    )
  }

  /** Select strap renderer based on style prop */
  const renderStrap = () => {
    if (strapStyle === "none") return null
    switch (strapStyle) {
      case "smooth":
        return renderSmoothStrap()
      case "angular":
        return renderAngularStrap()
      case "floating":
        return renderFloatingStrap()
      case "organic":
        return renderOrganicStrap()
      default:
        return renderDefaultStrap()
    }
  }

  // ============================================================
  // VISUAL ELEMENT RENDERERS
  // ============================================================

  /** Antenna on top of head */
  const renderAntenna = () => {
    if (!showAntenna) return null
    const antennaHeight = headLength * 0.2
    const baseY = headCenterY - headRadius
    return (
      <g name="antenna">
        {/* Base */}
        <circle
          cx={centerX}
          cy={baseY}
          r={headLength * 0.04}
          fill="#2d2d44"
          stroke={glowColor}
          strokeWidth={0.5}
        />
        {/* Stem */}
        <line
          x1={centerX}
          y1={baseY}
          x2={centerX}
          y2={baseY - antennaHeight}
          stroke="#2d2d44"
          strokeWidth={1.5}
        />
        {/* Top bulb */}
        <circle
          cx={centerX}
          cy={baseY - antennaHeight}
          r={headLength * 0.035}
          fill={glowColor}
          style={pulseStyles}
        />
        {/* Glow */}
        <circle
          cx={centerX}
          cy={baseY - antennaHeight}
          r={headLength * 0.06}
          fill={glowColor}
          opacity={0.3}
        />
      </g>
    )
  }

  /** Status LED indicators */
  const renderStatusLEDs = () => {
    if (!showStatusLEDs) return null
    const ledRadius = headLength * 0.02
    const ledY = strapY - config.strapWidth / 2 - ledRadius * 2.5
    const ledSpacing = ledRadius * 3
    const startX = centerX - ((statusLEDCount - 1) * ledSpacing) / 2

    const defaultColors = [glowColor, accent, "#00ff88"]
    const colors = statusLEDColors || defaultColors

    return (
      <g name="statusLEDs">
        {Array.from({ length: statusLEDCount }).map((_, i) => (
          <g key={i}>
            {/* LED glow */}
            <circle
              cx={startX + i * ledSpacing}
              cy={ledY}
              r={ledRadius * 1.5}
              fill={colors[i] || glowColor}
              opacity={0.3}
            />
            {/* LED body */}
            <circle
              cx={startX + i * ledSpacing}
              cy={ledY}
              r={ledRadius}
              fill={colors[i] || glowColor}
              opacity={0.9}
            />
          </g>
        ))}
      </g>
    )
  }

  /** Ear sensors on strap sides */
  const renderEarSensors = () => {
    if (!showEarSensors) return null
    const sensorRadius = config.strapWidth * 0.25
    const leftX = centerX - headRadius - config.strapExtend * 0.7
    const rightX = centerX + headRadius + config.strapExtend * 0.7

    return (
      <g name="earSensors">
        {/* Left sensor */}
        <circle
          cx={leftX}
          cy={strapY}
          r={sensorRadius + 1}
          fill={glowColor}
          opacity={0.2}
        />
        <circle
          cx={leftX}
          cy={strapY}
          r={sensorRadius}
          fill="#1a1a2e"
          stroke={glowColor}
          strokeWidth={0.5}
        />
        <circle
          cx={leftX}
          cy={strapY}
          r={sensorRadius * 0.4}
          fill={glowColor}
          opacity={0.8}
        />
        {/* Right sensor */}
        <circle
          cx={rightX}
          cy={strapY}
          r={sensorRadius + 1}
          fill={glowColor}
          opacity={0.2}
        />
        <circle
          cx={rightX}
          cy={strapY}
          r={sensorRadius}
          fill="#1a1a2e"
          stroke={glowColor}
          strokeWidth={0.5}
        />
        <circle
          cx={rightX}
          cy={strapY}
          r={sensorRadius * 0.4}
          fill={glowColor}
          opacity={0.8}
        />
      </g>
    )
  }

  /** Forehead tech mark */
  const renderForeheadMark = () => {
    if (!showForeheadMark) return null
    const markY = headCenterY - headRadius * 0.5
    const markSize = headLength * 0.08

    return (
      <g name="foreheadMark">
        {/* Diamond shape */}
        <polygon
          points={`
            ${centerX},${markY - markSize}
            ${centerX + markSize * 0.6},${markY}
            ${centerX},${markY + markSize}
            ${centerX - markSize * 0.6},${markY}
          `}
          fill="none"
          stroke={glowColor}
          strokeWidth={0.8}
          opacity={0.6}
        />
        {/* Center dot */}
        <circle
          cx={centerX}
          cy={markY}
          r={markSize * 0.2}
          fill={glowColor}
          opacity={0.8}
        />
      </g>
    )
  }

  /** Data flow lines on strap */
  const renderDataFlow = () => {
    if (!showDataFlow || strapStyle === "none") return null
    const flowY = strapY
    const flowLength = wrapX * 0.3

    return (
      <g name="dataFlow" opacity={0.4}>
        {/* Left flow lines */}
        <line
          x1={centerX - wrapX + 5}
          y1={flowY - config.strapWidth * 0.2}
          x2={centerX - wrapX + 5 + flowLength}
          y2={flowY - config.strapWidth * 0.2}
          stroke={glowColor}
          strokeWidth={0.5}
          strokeDasharray="3,2"
        />
        <line
          x1={centerX - wrapX + 5}
          y1={flowY + config.strapWidth * 0.2}
          x2={centerX - wrapX + 5 + flowLength}
          y2={flowY + config.strapWidth * 0.2}
          stroke={glowColor}
          strokeWidth={0.5}
          strokeDasharray="3,2"
        />
        {/* Right flow lines */}
        <line
          x1={centerX + wrapX - 5 - flowLength}
          y1={flowY - config.strapWidth * 0.2}
          x2={centerX + wrapX - 5}
          y2={flowY - config.strapWidth * 0.2}
          stroke={glowColor}
          strokeWidth={0.5}
          strokeDasharray="3,2"
        />
        <line
          x1={centerX + wrapX - 5 - flowLength}
          y1={flowY + config.strapWidth * 0.2}
          x2={centerX + wrapX - 5}
          y2={flowY + config.strapWidth * 0.2}
          stroke={glowColor}
          strokeWidth={0.5}
          strokeDasharray="3,2"
        />
      </g>
    )
  }

  /** Circuit nodes (from original) */
  const renderCircuitNodes = () => {
    if (!config.showNodes) return null
    return (
      <>
        {/* Left node */}
        <circle
          cx={centerX - headLength * 0.22}
          cy={strapY}
          r={config.strapWidth * 0.18}
          fill={glowColor}
          opacity={0.3}
        />
        <circle
          cx={centerX - headLength * 0.22}
          cy={strapY}
          r={config.strapWidth * 0.1}
          fill={glowColor}
          opacity={0.7}
        />
        {/* Right node */}
        <circle
          cx={centerX + headLength * 0.22}
          cy={strapY}
          r={config.strapWidth * 0.18}
          fill={glowColor}
          opacity={0.3}
        />
        <circle
          cx={centerX + headLength * 0.22}
          cy={strapY}
          r={config.strapWidth * 0.1}
          fill={glowColor}
          opacity={0.7}
        />
      </>
    )
  }

  // Unique ID for gradients (to avoid conflicts when multiple instances)
  const gradientId = `4eye-${variant}-${Math.random().toString(36).substr(2, 9)}`

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
      data-variant={variant}
      data-eye-design={eyeDesign}
      data-strap-style={strapStyle}
      data-mood={mood}
    >
      {/* Definitions for gradients and filters */}
      <defs>
        {/* Eye glow gradient */}
        <radialGradient id={`${gradientId}-eyeGlow`} cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            stopColor={glowColor}
            stopOpacity={config.glowIntensity}
          />
          <stop
            offset="60%"
            stopColor={glowColor}
            stopOpacity={config.glowIntensity * 0.4}
          />
          <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
        </radialGradient>

        {/* Orb gradient for orb eye design */}
        <radialGradient
          id={`${gradientId}-orbGradient`}
          cx="30%"
          cy="30%"
          r="70%"
        >
          <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
          <stop offset="40%" stopColor={glowColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={glowColor} stopOpacity="1" />
        </radialGradient>

        {/* Strap gradient (darker at edges for depth) */}
        <linearGradient
          id={`${gradientId}-strap`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#1a1a2e" stopOpacity="0.95" />
          <stop offset="15%" stopColor="#2d2d44" stopOpacity="1" />
          <stop offset="50%" stopColor="#2d2d44" stopOpacity="1" />
          <stop offset="85%" stopColor="#2d2d44" stopOpacity="1" />
          <stop offset="100%" stopColor="#1a1a2e" stopOpacity="0.95" />
        </linearGradient>

        {/* Strap edge highlight */}
        <linearGradient
          id={`${gradientId}-strapEdge`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor={glowColor} stopOpacity="0.3" />
          <stop offset="50%" stopColor={glowColor} stopOpacity="0.1" />
          <stop offset="100%" stopColor={glowColor} stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Antenna (behind head if shown) */}
      {renderAntenna()}

      {/* Body */}
      <path
        name="body"
        d={getCharacterPathData(bodyPoints)}
        stroke={ExpanseCharacterThemeProps?.bodyColor}
        strokeWidth={bodyStrokeWidth}
        strokeLinecap="round"
      />

      {/* Legs */}
      <path
        name="leftLeg"
        d={getCharacterPathData(leftLegPoints)}
        stroke={ExpanseCharacterThemeProps?.limbColor}
        strokeWidth={legStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />
      <path
        name="rightLeg"
        d={getCharacterPathData(rightLegPoints)}
        stroke={ExpanseCharacterThemeProps?.limbColor}
        strokeWidth={legStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />

      {/* Head (base circle) */}
      <circle
        name="head"
        cx={centerX}
        cy={headCenterY}
        r={headRadius}
        fill={ExpanseCharacterThemeProps?.headColor}
      />

      {/* Forehead mark (above eye, on head) */}
      {renderForeheadMark()}

      {/* Strap (using selected style) */}
      {renderStrap()}

      {/* Circuit nodes on strap (if variant enables them) */}
      {renderCircuitNodes()}

      {/* Ear sensors */}
      {renderEarSensors()}

      {/* Data flow lines */}
      {renderDataFlow()}

      {/* Status LEDs */}
      {renderStatusLEDs()}

      {/* Eye (using selected design) */}
      {renderEye()}

      {/* Arms (in front) */}
      <path
        name="leftArm"
        d={getCharacterPathData(leftArmPoints)}
        stroke={ExpanseCharacterThemeProps?.limbColor}
        strokeWidth={armStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />
      <path
        name="rightArm"
        d={getCharacterPathData(rightArmPoints)}
        stroke={ExpanseCharacterThemeProps?.limbColor}
        strokeWidth={armStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />
    </svg>
  )
}
