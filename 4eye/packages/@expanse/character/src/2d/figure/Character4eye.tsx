"use client"

import { useEffect, useMemo, useRef } from "react"
import { useTheme } from "@mui/material/styles"
import { getCharacterPathData } from "../geometry/pathHelper"
import { calculateDimensions } from "../geometry"
import { getExpanseCharacterTheme } from "../theming/themeAccess"
import {
  useCharacterReactions,
  type CharacterReactionMood,
} from "../animation/useCharacterReactions"
import { useCharacterAnatomy } from "../anatomy"
import {
  CharacterDefs,
  CharacterEye,
  CharacterStrap,
  Antenna,
  StatusLEDs,
  EarSensors,
  ForeheadMark,
  DataFlow,
  CircuitNodes,
  type CharacterPartContext,
} from "../parts"

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
  | "excited"

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

  // === INTERACTION ===

  /**
   * Interaction behavior. Default `"static"` renders a non-interactive SVG
   * exactly as before — no event listeners, no GSAP, no a11y wrapper. Set
   * to `"reactive"` to opt in to the wave/poke/idle-bob behaviors driven
   * by `useCharacterReactions`. Configure individual behaviors via
   * {@link reactions}.
   */
  interactionMode?: "static" | "reactive"
  /**
   * Configuration for the reactive interaction mode. Ignored when
   * `interactionMode === "static"`. Each reaction defaults to `true` when
   * reactive — pass `{ select: false }` etc. to disable individual
   * behaviors. The three reactions map to the named "4eye" personas:
   *   • Select 4eye   — hover/focus acknowledgement (formerly "wave")
   *   • Anxious 4eye  — startled click reaction (formerly "poke")
   *   • Excited 4eye  — imperative-only celebration (formerly "celebrate")
   */
  reactions?: {
    /** Select 4eye on hover/focus. @default true */
    select?: boolean
    /** Anxious 4eye on click/tap/keypress. @default true */
    anxious?: boolean
    /** Subtle idle bob between interactions. @default true */
    idleBob?: boolean
    /** Honors `prefers-reduced-motion` at the call site. @default false */
    reducedMotion?: boolean
    /**
     * When `true`, the eye glow color follows the live reaction mood
     * (`happy`/`alert`). When `false`, mood drives only the existing
     * variant pulse classes. @default true
     */
    moodDrivesEyeGlow?: boolean
    /** ARIA label applied to the focusable wrapper. */
    ariaLabel?: string
  }
  /**
   * Imperative controls handle. When `interactionMode === "reactive"` the
   * component populates `controlsRef.current` with `{ playSelect,
   * playAnxious, playExcited }` so callers can trigger reactions from
   * outside (e.g. a CTA button hovering elsewhere on the page). `null`
   * when static.
   */
  controlsRef?: React.MutableRefObject<Character4eyeControls | null>
}

/** Imperative reaction controls exposed via {@link Character4eyeProps.controlsRef}. */
export interface Character4eyeControls {
  /** Trigger Select 4eye (friendly hover acknowledgement). */
  playSelect: () => void
  /** Trigger Anxious 4eye (startled click reaction). */
  playAnxious: () => void
  /** Trigger Excited 4eye (V-pose hop celebration with arm-fall gag). */
  playExcited: () => void
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
  showAntenna = true,
  showStatusLEDs = false,
  statusLEDCount = 2,
  statusLEDColors,
  showEarSensors = false,
  showForeheadMark = false,
  secondaryColor,
  apertureBlades = 6,
  showDataFlow = false,
  pulseIntensity = 0,
  // Interaction
  interactionMode = "static",
  reactions: reactionsConfig,
  controlsRef,
}: Character4eyeProps = {}) => {
  const theme = useTheme()
  // The 4eye reads optional brand theme colors from an MUI theme extension
  // (`components.ExpanseCharacter`, registered by @expanse/brand-core's
  // factory). This package stays decoupled from that augmentation by reading
  // it through a local cast and falling back to the standard MUI palette, so
  // the character is correctly colored under ANY theme.
  const ExpanseCharacterThemeVariant = getExpanseCharacterTheme(theme)?.variants
    ?.default

  const ExpanseCharacterThemeProps = {
    headColor:
      ExpanseCharacterThemeVariant?.headColor ??
      theme.palette?.primary?.light ??
      theme.palette?.primary?.main,
    bodyColor:
      ExpanseCharacterThemeVariant?.bodyColor ?? theme.palette?.primary?.main,
    limbColor:
      ExpanseCharacterThemeVariant?.limbColor ??
      theme.palette?.primary?.light ??
      theme.palette?.primary?.main,
  }

  // ------------------------------------------------------------------
  // Reactive interactions (opt-in via interactionMode="reactive")
  // ------------------------------------------------------------------
  const isReactive = interactionMode === "reactive"
  const reactionWrapperRef = useRef<HTMLSpanElement | null>(null)
  // Typed registry of named SVG sub-elements. Populated below via
  // `ref={anatomy.register("head")}` etc., consumed by the reactions
  // hook in place of `querySelector('[name="head"]')`.
  const anatomy = useCharacterAnatomy()
  const {
    mood: reactionMood,
    bind: reactionBind,
    playSelect,
    playAnxious,
    playExcited,
  } = useCharacterReactions({
    rootRef: reactionWrapperRef,
    anatomy,
    enabled: isReactive,
    reducedMotion: reactionsConfig?.reducedMotion ?? false,
    select: reactionsConfig?.select ?? true,
    anxious: reactionsConfig?.anxious ?? true,
    idleBob: reactionsConfig?.idleBob ?? true,
  })

  // Populate the imperative controls handle so external triggers (e.g.
  // a CTA button hover) can fire reactions on this character. We update
  // every render so the latest closures are exposed; cleanup nulls it
  // out on unmount and when interaction mode flips back to static.
  useEffect(() => {
    if (!controlsRef) return
    if (!isReactive) {
      controlsRef.current = null
      return
    }
    controlsRef.current = { playSelect, playAnxious, playExcited }
    return () => {
      if (controlsRef.current) controlsRef.current = null
    }
  }, [controlsRef, isReactive, playSelect, playAnxious, playExcited])
  // When reactive, mood is driven by the live reaction state rather than
  // the static `mood` prop. Map the simpler reaction mood onto the
  // existing Character4eyeMood enum.
  const effectiveMood: Character4eyeMood = isReactive
    ? mapReactionMood(reactionMood)
    : mood

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

  // Calculate positions (facingForward base pose)
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


  // Stable gradient ID prefix — computed once per mount to avoid
  // `<defs>` collisions when multiple characters render on the same page.
  const gradientId = useMemo(
    () => `4eye-${variant}-${Math.random().toString(36).slice(2, 11)}`,
    [variant],
  )

  // Pulse animation intensity styles, applied to "pulsing" elements
  // (eye, antenna). Higher `pulseIntensity` => faster pulse.
  const pulseStyles: React.CSSProperties =
    pulseIntensity > 0
      ? { animation: `pulse ${3 - pulseIntensity}s ease-in-out infinite` }
      : {}

  // ------------------------------------------------------------------
  // Render context — packed once and threaded into every part renderer.
  // ------------------------------------------------------------------
  const partCtx: CharacterPartContext = {
    centerX,
    headCenterY,
    headLength,
    headRadius,
    strapY,
    strapHalfWidth,
    wrapX,
    wrapYOffset,
    config,
    glowColor,
    accent,
    gradientId,
    pulseStyles,
    eyeDesign,
    strapStyle,
    effectiveMood,
    apertureBlades,
    showAntenna,
    showStatusLEDs,
    statusLEDCount,
    statusLEDColors,
    showEarSensors,
    showForeheadMark,
    showDataFlow,
  }


  const svgEl = (
    <svg
      ref={anatomy.register<SVGSVGElement>("svg")}
      style={{
        height: "auto",
        maxHeight: "100%",
        width: "auto",
        maxWidth: "100%",
        // Allow the antenna (and SHOCK / reaction transforms) to render
        // above the viewBox top edge. In compact mode (paddingY=0) the
        // antenna lives at negative Y in viewBox space; without
        // overflow:visible the SVG clips it.
        overflow: "visible",
      }}
      viewBox={`0 0 ${containerWidth} ${containerHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-variant={variant}
      data-eye-design={eyeDesign}
      data-strap-style={strapStyle}
      data-mood={effectiveMood}
    >
      {/* Gradient + filter definitions (extracted to its own file). */}
      <CharacterDefs ctx={partCtx} />

      {/* Antenna (behind head if shown) */}
      <Antenna ctx={partCtx} antennaRef={anatomy.register<SVGGElement>("antenna")} />

      {/* Body */}
      <path
        ref={anatomy.register<SVGPathElement>("body")}
        name="body"
        d={getCharacterPathData(bodyPoints)}
        stroke={ExpanseCharacterThemeProps?.bodyColor}
        strokeWidth={bodyStrokeWidth}
        strokeLinecap="round"
      />

      {/* Legs */}
      <path
        ref={anatomy.register<SVGPathElement>("leftLeg")}
        name="leftLeg"
        d={getCharacterPathData(leftLegPoints)}
        stroke={ExpanseCharacterThemeProps?.limbColor}
        strokeWidth={legStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />
      <path
        ref={anatomy.register<SVGPathElement>("rightLeg")}
        name="rightLeg"
        d={getCharacterPathData(rightLegPoints)}
        stroke={ExpanseCharacterThemeProps?.limbColor}
        strokeWidth={legStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />

      {/* Head (base circle) */}
      <circle
        ref={anatomy.register<SVGCircleElement>("head")}
        name="head"
        cx={centerX}
        cy={headCenterY}
        r={headRadius}
        fill={ExpanseCharacterThemeProps?.headColor}
      />

      {/* Forehead mark (above eye, on head) */}
      <ForeheadMark ctx={partCtx} />

      {/* Strap (using selected style) */}
      <CharacterStrap ctx={partCtx} />

      {/* Circuit nodes on strap (if variant enables them) */}
      <CircuitNodes ctx={partCtx} />

      {/* Ear sensors */}
      <EarSensors ctx={partCtx} />

      {/* Data flow lines */}
      <DataFlow ctx={partCtx} />

      {/* Status LEDs */}
      <StatusLEDs ctx={partCtx} />

      {/* Eye (using selected design) */}
      <CharacterEye ctx={partCtx} />

      {/* Arms (in front) */}
      <path
        ref={anatomy.register<SVGPathElement>("leftArm")}
        name="leftArm"
        d={getCharacterPathData(leftArmPoints)}
        stroke={ExpanseCharacterThemeProps?.limbColor}
        strokeWidth={armStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />
      <path
        ref={anatomy.register<SVGPathElement>("rightArm")}
        name="rightArm"
        d={getCharacterPathData(rightArmPoints)}
        stroke={ExpanseCharacterThemeProps?.limbColor}
        strokeWidth={armStrokeWidth}
        strokeLinecap="round"
        opacity={limbOpacity}
      />
    </svg>
  )

  if (!isReactive) return svgEl

  // Reactive mode: focusable wrapper that hosts pointer/keyboard handlers
  // and provides the rootRef the reactions hook scopes its GSAP context to.
  return (
    <span
      ref={reactionWrapperRef}
      role="button"
      tabIndex={0}
      aria-label={reactionsConfig?.ariaLabel ?? "Character"}
      onPointerEnter={reactionBind.onPointerEnter}
      onFocus={reactionBind.onFocus}
      onClick={reactionBind.onClick}
      onKeyDown={reactionBind.onKeyDown}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        cursor: "pointer",
        userSelect: "none",
        outline: "none",
      }}
    >
      {svgEl}
    </span>
  )
}

/** Map the simpler reaction mood onto the richer Character4eye mood enum. */
function mapReactionMood(m: CharacterReactionMood): Character4eyeMood {
  switch (m) {
    case "happy":
      return "happy"
    case "alert":
      return "alert"
    default:
      return "neutral"
  }
}
