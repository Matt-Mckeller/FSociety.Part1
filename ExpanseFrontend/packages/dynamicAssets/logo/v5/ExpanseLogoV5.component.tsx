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

    // Mirror transform
    const mirrorTransform = horizontalMirror
      ? `translate(${VIEWBOX_WIDTH}, 0) scale(-1, 1)`
      : undefined

    // Ring transforms
    const ringTransform = `rotate(${orbitalRotation}, ${DEFAULTS.centerX}, ${DEFAULTS.centerY})`
    const mirroredRingTransform = `rotate(${-orbitalRotation}, ${DEFAULTS.centerX}, ${DEFAULTS.centerY})`

    // Render orbital rings
    const renderOrbitalRings = (transform: string, nameSuffix: string = "") => (
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

          {/* 3D mode gradients */}
          {is3D && (
            <>
              <radialGradient
                id={`${id}-primary-gradient`}
                cx="30%"
                cy="30%"
                r="70%"
              >
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor={_fill} />
              </radialGradient>
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
              fill={is3D ? `url(#${id}-primary-gradient)` : _fill}
              squareCornerRadius={squareCornerRadius}
              triangleCornerRadius={triangleCornerRadius}
              triangleOrientation={triangleOrientation}
              showPupil={eyeMode}
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
          </g>
        </g>
      </svg>
    )
  },
)

export default ExpanseLogoV5
