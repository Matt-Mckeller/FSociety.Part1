/**
 * ExpanseLogoV5 Component
 *
 * Main logo component that composes Shape, OrbitalRings, BorderArcs,
 * and other sub-components into a cohesive, customizable logo.
 */

"use client"

import React, { useState, useCallback, useMemo, forwardRef } from "react"
import { useTheme } from "@mui/system"
import type {
  ExpanseLogoV5Props,
  ShapeType,
  VariantConfig,
} from "./ExpanseLogoV5.types"
import {
  DEFAULTS,
  LOGO_VARIANTS,
  RING_EXTENT_PRESETS,
  PUPIL_GAZE_DIRECTIONS,
} from "./ExpanseLogoV5.variants"
import { LogoCanvas, DEFAULT_GRADIENTS } from "./components/LogoCanvas"
import { Shape, getShapeMask } from "./components/Shape"
import { DualOrbitalRings } from "./components/OrbitalRings"
import { BorderArcs } from "./components/BorderArcs"
import {
  positionFromAngle,
  calculateTrianglePoints,
  lightAngleToGradientPosition,
  generateCometPath,
} from "./utils/geometry"

// ============================================================
// CONSTANTS
// ============================================================

const VIEWBOX_WIDTH = 409
const VIEWBOX_HEIGHT = 409
const TRANSFORM_OFFSET_X = 39.509173
const TRANSFORM_OFFSET_Y = 5.4736727

// ============================================================
// SECONDARY SHAPE (MOON)
// ============================================================

interface SecondaryShapeProps {
  shape: ShapeType
  primaryRadius: number
  sizePercent: number
  offsetX: number
  offsetY: number
  fill: string
  squareCornerRadius?: number
  triangleCornerRadius?: number
}

function SecondaryShape({
  shape,
  primaryRadius,
  sizePercent,
  offsetX,
  offsetY,
  fill,
  squareCornerRadius,
  triangleCornerRadius,
}: SecondaryShapeProps) {
  // Calculate secondary shape size from percentage
  const secondaryRadius = Math.round((primaryRadius * sizePercent) / 100)

  // Base position (moon position from V4)
  const baseCx = 49.5
  const baseCy = 365.05188

  // Apply offsets
  const cx = baseCx + offsetX
  const cy = baseCy + offsetY

  return (
    <Shape
      name="secondary"
      shape={shape}
      centerX={cx}
      centerY={cy}
      radius={secondaryRadius}
      fill={fill}
      squareCornerRadius={squareCornerRadius}
      triangleCornerRadius={triangleCornerRadius}
    />
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export const ExpanseLogoV5 = forwardRef<SVGSVGElement, ExpanseLogoV5Props>(
  function ExpanseLogoV5(props, ref) {
    const {
      id = "company-logo-v5",
      variant = "default",

      // Sizing
      height = "100%",
      maxWidth = "100%",
      maxHeight = "100%",

      // Colors
      fill,
      ringFill,
      orbitalFill,

      // Shape
      shape: shapeProp,
      horizontalMirror = false,
      squareCornerRadius = DEFAULTS.squareCornerRadius,
      triangleCornerRadius = DEFAULTS.triangleCornerRadius,
      triangleOrientation = "left",

      // 2D/3D Mode
      is3D = false,
      lightDirection = DEFAULTS.lightAngle,
      highlightIntensity = 0.7,

      // Orbital Rings
      showOrbitalRings: showOrbitalRingsProp,
      showPrimaryRings = false,
      mirroredRings = true,
      ringExtent = "arcEdge",
      orbitalRotation = DEFAULTS.orbitalRotation,
      ringStrokeWidth = DEFAULTS.ringStrokeWidth,
      ringStyle = "ellipse",
      cometHeadWidth,
      cometTailWidth,
      cometStartAngle = 60,
      cometArcSpan = 280,
      cometSweepDirection = "cw",
      cometTaper = "easeOut",
      orbitalOpacity = DEFAULTS.orbitalOpacity,
      orbitalOpacityScale,
      innerRingOpacity,
      middleRingOpacity,
      outerRingOpacity,
      backRingOpacity = DEFAULTS.backRingOpacity,
      ringSpacing = "proportional",
      fixedGap1 = 8,
      fixedGap2 = 8,
      circular = false,

      // Secondary Shape (Moon)
      showSecondaryShape: showSecondaryShapeProp = true,
      secondaryShapeSizePercent = 33,
      secondaryShapeOffsetX = 0,
      secondaryShapeOffsetY = 0,

      // Border Arcs
      showBorderArcs: showBorderArcsProp,
      arcStyle = "filled",
      arcStrokeWidth = 8,
      arc1Color,
      arc2Color,
      arc3Color,
      arc1Opacity = 0.33,
      arc2Opacity = 0.33,
      arc3Opacity = 0,

      // Eye/Pupil Mode
      eyeMode = true,
      pupilDirection = PUPIL_GAZE_DIRECTIONS.moon,
      pupilOffset = 0,
      interactivePupilOffset = 0.33,
      pupilSize = 0.28,
      pupilColor = "#1a1a1a",
      pupilInnerColor = "#f5f5f5",
      pupilInnerSize = 0.6,
      pupilContrast,
      initialPupilScale = 0.65,
      pupilStrokeColor,
      pupilStrokeWidth = 0,

      // Interactivity
      interactive = true,
      interactiveArcOpacity = 0.33,
      mergeRingsOnInteraction = false,
      hoverScale,
      hoverCornerRadiusDelta,

      // Animation
      animated = false,
      animationConfig,

      // Callbacks
      onHoverChange,
      onActiveChange,
    } = props

    // Get MUI theme for default colors
    const theme = useTheme()
    const _fill = fill || theme?.palette?.text?.primary || "#ffffff"
    const _ringFill = ringFill || theme?.palette?.text?.primary || "#ffffff"
    const _orbitalFill = orbitalFill || _ringFill

    // Apply variant configuration
    const variantConfig: VariantConfig | undefined = LOGO_VARIANTS[variant]
    const shape = shapeProp ?? variantConfig?.shape ?? "circle"
    const showOrbitalRings =
      showOrbitalRingsProp ?? variantConfig?.showOrbitalRings ?? true
    const showSecondaryShape =
      showSecondaryShapeProp ?? variantConfig?.showSecondaryShape ?? true
    const showBorderArcs =
      showBorderArcsProp ?? variantConfig?.showBorderArcs ?? true

    // Interactivity state
    const [isHovered, setIsHovered] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const isInteracting = interactive && (isHovered || isActive)

    // Event handlers
    const handleMouseEnter = useCallback(() => {
      if (interactive) {
        setIsHovered(true)
        onHoverChange?.(true)
      }
    }, [interactive, onHoverChange])

    const handleMouseLeave = useCallback(() => {
      if (interactive) {
        setIsHovered(false)
        onHoverChange?.(false)
      }
    }, [interactive, onHoverChange])

    const handleClick = useCallback(() => {
      if (interactive) {
        setIsActive((prev) => !prev)
        onActiveChange?.(!isActive)
      }
    }, [interactive, isActive, onActiveChange])

    // Calculate ring extent from preset
    const preset = RING_EXTENT_PRESETS[ringExtent]
    const outerRx = preset?.rx ?? 123
    const baseOuterRy = preset?.ry ?? 30.75
    const outerRy = circular ? outerRx : baseOuterRy

    // Calculate ring sizes based on spacing mode
    const ringConfig = useMemo(() => {
      let innerRx: number
      let mainRx: number
      let innerRy: number
      let mainRy: number

      if (ringSpacing === "fixed") {
        mainRx = outerRx - fixedGap2
        innerRx = mainRx - fixedGap1
        if (circular) {
          innerRy = innerRx
          mainRy = mainRx
        } else {
          const ryRatio = outerRy / outerRx
          mainRy = outerRy - fixedGap2 * ryRatio
          innerRy = mainRy - fixedGap1 * ryRatio
        }
      } else {
        const extension = outerRx - DEFAULTS.primaryRadius
        innerRx = DEFAULTS.primaryRadius + (extension * 1) / 3
        mainRx = DEFAULTS.primaryRadius + (extension * 2) / 3
        if (circular) {
          innerRy = innerRx
          mainRy = mainRx
        } else {
          innerRy = outerRy * (1 / 3) + ((outerRy * 2) / 3) * 0.5
          mainRy = outerRy * (2 / 3) + ((outerRy * 1) / 3) * 0.7
        }
      }

      return { innerRx, mainRx, outerRx, innerRy, mainRy, outerRy }
    }, [ringSpacing, fixedGap1, fixedGap2, outerRx, outerRy, circular])

    // Unique IDs
    const maskId = `${id}-mask`
    const clipId = `${id}-clip`

    // Calculate clip path bounds
    const clipPadding = ringStrokeWidth + 10
    const clipX = DEFAULTS.centerX - ringConfig.outerRx - clipPadding
    const clipY = DEFAULTS.centerY + 15
    const clipWidth = (ringConfig.outerRx + clipPadding) * 2
    const clipHeight = 250 + ringConfig.outerRy

    // Pupil calculations
    const computedPupilOffset = isInteracting
      ? interactivePupilOffset
      : pupilOffset
    const computedPupilScale = isInteracting ? 1.0 : initialPupilScale
    const actualPupilSize = pupilSize * computedPupilScale
    const adjustedPupilDirection = horizontalMirror
      ? 180 - pupilDirection
      : pupilDirection

    // Gradient position for subtle sphere shading (V4-style depth)
    const gradPos = lightAngleToGradientPosition(lightDirection)

    // Pupil center depends on shape type (matches Shape component geometry)
    const pupilCenter = useMemo(() => {
      if (shape === "triangle") {
        const pts = calculateTrianglePoints(
          DEFAULTS.centerX,
          DEFAULTS.centerY,
          DEFAULTS.primaryRadius,
          triangleOrientation,
        )
        return {
          x: (pts[0][0] + pts[1][0] + pts[2][0]) / 3,
          y: (pts[0][1] + pts[1][1] + pts[2][1]) / 3,
        }
      }
      return { x: DEFAULTS.centerX, y: DEFAULTS.centerY }
    }, [shape, triangleOrientation])

    // Pupil world-space position — computed here so it renders above rings
    const pupilWorldPos = positionFromAngle(
      pupilCenter.x,
      pupilCenter.y,
      adjustedPupilDirection,
      DEFAULTS.primaryRadius * computedPupilOffset,
    )
    const pupilWorldRadius = DEFAULTS.primaryRadius * actualPupilSize

    // Mirror transform
    const mirrorTransform = horizontalMirror
      ? `translate(${VIEWBOX_WIDTH}, 0) scale(-1, 1)`
      : undefined

    // Ring transforms
    const ringTransform = `rotate(${orbitalRotation}, ${DEFAULTS.centerX}, ${DEFAULTS.centerY})`
    const mirroredRingTransform = `rotate(${-orbitalRotation}, ${DEFAULTS.centerX}, ${DEFAULTS.centerY})`

    // Render orbital rings
    const renderOrbitalRings = (transform: string, nameSuffix: string = "") => {
      if (ringStyle === "comet") {
        const headW = cometHeadWidth ?? ringStrokeWidth * 4
        const tailW = cometTailWidth ?? ringStrokeWidth * 0.6
        const endAngle =
          cometSweepDirection === "cw"
            ? cometStartAngle - cometArcSpan
            : cometStartAngle + cometArcSpan

        const trails: Array<{
          rx: number
          ry: number
          opacity: number
          widthScale: number
          name: string
        }> = [
          {
            rx: ringConfig.outerRx,
            ry: ringConfig.outerRy,
            opacity:
              (outerRingOpacity ?? orbitalOpacity) *
              (orbitalOpacityScale ?? 1),
            widthScale: 1,
            name: `comet-outer${nameSuffix}`,
          },
          {
            rx: ringConfig.mainRx,
            ry: ringConfig.mainRy,
            opacity:
              (middleRingOpacity ?? orbitalOpacity * (2 / 3)) *
              (orbitalOpacityScale ?? 1),
            widthScale: 0.78,
            name: `comet-middle${nameSuffix}`,
          },
          {
            rx: ringConfig.innerRx,
            ry: ringConfig.innerRy,
            opacity:
              (innerRingOpacity ?? orbitalOpacity * (1 / 3)) *
              (orbitalOpacityScale ?? 1),
            widthScale: 0.6,
            name: `comet-inner${nameSuffix}`,
          },
        ]

        return (
          <g transform={transform}>
            {trails.map((t) => (
              <path
                key={t.name}
                name={t.name}
                d={generateCometPath({
                  cx: DEFAULTS.centerX,
                  cy: DEFAULTS.centerY,
                  rx: t.rx,
                  ry: t.ry,
                  startAngle: cometStartAngle,
                  endAngle,
                  headWidth: headW * t.widthScale,
                  tailWidth: tailW * t.widthScale,
                  direction: cometSweepDirection,
                  taper: cometTaper,
                })}
                fill={_orbitalFill}
                opacity={t.opacity}
              />
            ))}
          </g>
        )
      }

      return (
      <g transform={transform}>
        <ellipse
          cx={DEFAULTS.centerX}
          cy={DEFAULTS.centerY}
          rx={ringConfig.outerRx}
          ry={ringConfig.outerRy}
          fill="none"
          stroke={_orbitalFill}
          strokeWidth={ringStrokeWidth}
          opacity={
            (outerRingOpacity ?? orbitalOpacity) * (orbitalOpacityScale ?? 1)
          }
          name={`ring-outer${nameSuffix}`}
        />
        <ellipse
          cx={DEFAULTS.centerX}
          cy={DEFAULTS.centerY}
          rx={ringConfig.mainRx}
          ry={ringConfig.mainRy}
          fill="none"
          stroke={_orbitalFill}
          strokeWidth={ringStrokeWidth}
          opacity={
            (middleRingOpacity ?? orbitalOpacity * (2 / 3)) *
            (orbitalOpacityScale ?? 1)
          }
          name={`ring-middle${nameSuffix}`}
        />
        <ellipse
          cx={DEFAULTS.centerX}
          cy={DEFAULTS.centerY}
          rx={ringConfig.innerRx}
          ry={ringConfig.innerRy}
          fill="none"
          stroke={_orbitalFill}
          strokeWidth={ringStrokeWidth}
          opacity={
            (innerRingOpacity ?? orbitalOpacity * (1 / 3)) *
            (orbitalOpacityScale ?? 1)
          }
          name={`ring-inner${nameSuffix}`}
        />
      </g>
      )
    }

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        id={id}
        style={{
          height,
          maxWidth,
          maxHeight,
          cursor: interactive ? "pointer" : undefined,
        }}
        className="expanse-logo-v5"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <defs>
          {/* Mask to cut out main shape area */}
          <mask id={maskId}>
            <rect
              x="0"
              y="0"
              width={VIEWBOX_WIDTH}
              height={VIEWBOX_HEIGHT}
              fill="white"
            />
            <g
              transform={`translate(${TRANSFORM_OFFSET_X},${TRANSFORM_OFFSET_Y})`}
            >
              {getShapeMask(
                shape,
                DEFAULTS.centerX,
                DEFAULTS.centerY,
                DEFAULTS.primaryRadius,
                {
                  squareCornerRadius,
                  triangleCornerRadius,
                  triangleOrientation,
                },
              )}
            </g>
          </mask>

          {/* Clip path for front portion of ring */}
          <clipPath id={clipId}>
            <rect x={clipX} y={clipY} width={clipWidth} height={clipHeight} />
          </clipPath>

          {/* Sphere gradient — always on for subtle V4-style depth */}
          <radialGradient
            id={`${id}-sphere-gradient`}
            cx={gradPos.cx}
            cy={gradPos.cy}
            r="60%"
            fx={gradPos.fx}
            fy={gradPos.fy}
          >
            <stop offset="0%" stopColor={_fill} stopOpacity="1" />
            <stop offset="70%" stopColor={_fill} stopOpacity="0.87" />
            <stop offset="100%" stopColor={_fill} stopOpacity="0.65" />
          </radialGradient>

          {/* Shadow + catch-light overlay for enhanced 3D mode */}
          {is3D && (
            <>
              <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="4" dy="4" stdDeviation="10" floodOpacity="0.25" />
              </filter>
              <radialGradient id={`${id}-highlight`} cx="25%" cy="25%" r="50%">
                <stop
                  offset="0%"
                  stopColor="#ffffff"
                  stopOpacity={highlightIntensity}
                />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </>
          )}
        </defs>

        {/* Apply horizontal mirror if enabled */}
        <g transform={mirrorTransform}>
          <g
            fill={_fill}
            strokeWidth="1"
            transform={`translate(${TRANSFORM_OFFSET_X},${TRANSFORM_OFFSET_Y})`}
          >
            {/* Orbital rings - BACK portion (behind shape) */}
            {showOrbitalRings && (
              <g mask={`url(#${maskId})`} opacity={backRingOpacity}>
                {showPrimaryRings && renderOrbitalRings(ringTransform)}
                {mirroredRings &&
                  renderOrbitalRings(mirroredRingTransform, "-mirrored")}
              </g>
            )}

            {/* Primary Shape */}
            <Shape
              name="primary"
              shape={shape}
              centerX={DEFAULTS.centerX}
              centerY={DEFAULTS.centerY}
              radius={DEFAULTS.primaryRadius}
              fill={`url(#${id}-sphere-gradient)`}
              squareCornerRadius={squareCornerRadius}
              triangleCornerRadius={triangleCornerRadius}
              triangleOrientation={triangleOrientation}
              showPupil={false}
              pupilDirection={adjustedPupilDirection}
              pupilOffset={computedPupilOffset}
              pupilSize={actualPupilSize}
              pupilColor={pupilColor}
              pupilInnerColor={pupilInnerColor}
              pupilInnerSize={pupilInnerSize}
              show3DHighlight={is3D}
              lightDirection={lightDirection}
              highlightIntensity={highlightIntensity}
            />

            {/* Orbital rings - FRONT portion (in front of shape) */}
            {showOrbitalRings && (
              <g clipPath={`url(#${clipId})`}>
                {showPrimaryRings && renderOrbitalRings(ringTransform)}
                {mirroredRings &&
                  renderOrbitalRings(mirroredRingTransform, "-mirrored")}
              </g>
            )}

            {/* Secondary Shape (Moon) */}
            {showSecondaryShape && (
              <SecondaryShape
                shape={shape}
                primaryRadius={DEFAULTS.primaryRadius}
                sizePercent={secondaryShapeSizePercent}
                offsetX={secondaryShapeOffsetX}
                offsetY={secondaryShapeOffsetY}
                fill={_fill}
                squareCornerRadius={squareCornerRadius}
                triangleCornerRadius={triangleCornerRadius}
              />
            )}

            {/* Border Arcs */}
            {showBorderArcs && (
              <BorderArcs
                centerX={DEFAULTS.centerX}
                centerY={DEFAULTS.centerY}
                radius={DEFAULTS.primaryRadius}
                style={arcStyle}
                strokeWidth={arcStrokeWidth}
                defaultColor={arc1Color || _ringFill}
                defaultOpacity={arc1Opacity}
                interactiveOpacity={interactiveArcOpacity}
                isInteracting={isInteracting}
              />
            )}

            {/* Pupil — rendered last so it floats above rings and arcs */}
            {eyeMode && (
              <>
                <circle
                  name="pupil-outer"
                  cx={pupilWorldPos.x}
                  cy={pupilWorldPos.y}
                  r={pupilWorldRadius}
                  fill={pupilColor}
                  stroke={pupilStrokeColor}
                  strokeWidth={pupilStrokeColor ? pupilStrokeWidth : undefined}
                  style={{ transition: "cx 0.2s ease-in-out, cy 0.2s ease-in-out, r 0.3s ease-out" }}
                />
                <circle
                  name="pupil-inner"
                  cx={pupilWorldPos.x}
                  cy={pupilWorldPos.y}
                  r={pupilWorldRadius * pupilInnerSize}
                  fill={pupilInnerColor}
                  style={{ transition: "cx 0.2s ease-in-out, cy 0.2s ease-in-out, r 0.3s ease-out" }}
                />
              </>
            )}
          </g>
        </g>
      </svg>
    )
  },
)

export default ExpanseLogoV5
