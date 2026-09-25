"use client"

import { useTheme, Box, ButtonBase } from "@mui/material"
import { lighten } from "@mui/material/styles"
import {
  ReactNode,
  SVGProps,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  forwardRef,
  useMemo,
  Ref,
} from "react"

export type ExpandingBarVisualState = "active" | "inactive" | "hovered"

export type ExpandingBarProps = {
  children: ReactNode
  aspectRatio: number
  /** Visual state affecting appearance. Default: 'active' */
  visualState?: ExpandingBarVisualState
  /** Whether to show ripple effect on click */
  enableRipple?: boolean
  /** Click handler */
  onClick?: () => void
  /** Shadow intensity (0-1) for active/clicked state */
  shadowIntensity?: number
  /** Middle fill opacity (0-1) for GSAP animation - controls the fill between outer stroke and inner content. Default: 1 */
  middleFillOpacity?: number
  /** Middle fill color progress (0-1) for GSAP animation - 0=lighter color, 1=normal color. Default: 1 */
  middleFillColorProgress?: number
}

// Animation timing
const TRANSITION_DURATION = "180ms"
const EASING = "cubic-bezier(0.4, 0, 0.2, 1)"

export const ExpandingBar = forwardRef<HTMLElement, ExpandingBarProps>(
  (
    {
      children,
      aspectRatio,
      visualState = "active",
      enableRipple = false,
      onClick,
      shadowIntensity = 0,
      middleFillOpacity = 1,
      middleFillColorProgress = 1,
    },
    ref,
  ) => {
    const theme = useTheme()
    const svgRef = useRef<SVGSVGElement>(null)

    // Used to keep the foreign object the same size regardless of svg resizing
    const [foreignObjectScaleX, setForeignObjectScaleX] = useState(1)
    const [foreignObjectScaleY, setForeignObjectScaleY] = useState(1)
    const [hasCalculatedScale, setHasCalculatedScale] = useState(false)

    const totalHeight = 100
    const totalWidth = totalHeight * aspectRatio
    const outerStrokeWidth = 6
    const middleFillHeight = outerStrokeWidth * 2
    const outerLayerWidth = totalWidth - outerStrokeWidth * 2
    const outerLayerHeight = totalHeight - outerStrokeWidth * 2
    const innerLayerHeight =
      outerLayerHeight - (outerStrokeWidth + middleFillHeight) * 2
    const innerLayerWidth =
      outerLayerWidth - (outerStrokeWidth + middleFillHeight) * 2
    const outerLayerOffsetXY = outerStrokeWidth

    const innerLayerOffsetXY =
      outerStrokeWidth + middleFillHeight + outerLayerOffsetXY

    useLayoutEffect(() => {
      if (svgRef.current) {
        const currentHeight = svgRef.current.clientHeight
        const currentWidth = svgRef.current.clientWidth
        const xScale = totalWidth / currentWidth
        const yScale = totalHeight / currentHeight
        // console.log({ currentHeight, currentWidth, xScale, yScale })
        setForeignObjectScaleX(xScale)
        setForeignObjectScaleY(yScale)
        setHasCalculatedScale(true)
      }
    }, [svgRef])

    // Visual state styling
    const isInactive = visualState === "inactive"
    const isHovered = visualState === "hovered"

    // Outer border: slightly reduced opacity when inactive (maintains visibility)
    const outerOpacity = isInactive ? 0.7 : 1
    // Reduce saturation when inactive (keeps color hint but muted)
    const saturationFilter = isInactive ? "saturate(0.4)" : "saturate(1)"
    // Inactive: Light inner fill (inverted from dark background to light)
    const innerFillColor = isInactive
      ? theme.palette.background.paper // Light background when inactive
      : theme.palette.primary.main
    // Inactive: Use primary colors but lighter/muted for outer
    // Active: Interpolate from lighter color to primary.light based on colorProgress
    const baseOuterFillColor = theme.palette.primary.light
    const lighterOuterFillColor = lighten(baseOuterFillColor, 0.4) // 40% lighter starting point
    const outerFillColor = useMemo(() => {
      if (isInactive) return theme.palette.primary.light
      // Interpolate: 0 = lighter, 1 = normal
      // We lighten by (1 - progress) * 0.4
      const lightenAmount = (1 - middleFillColorProgress) * 0.4
      return lighten(baseOuterFillColor, lightenAmount)
    }, [isInactive, middleFillColorProgress, baseOuterFillColor])
    const outerStrokeColor = isInactive
      ? theme.palette.primary.main // Primary stroke for definition
      : theme.palette.primary.main

    // Shadow for active/clicked state
    const boxShadow =
      shadowIntensity > 0
        ? `0 ${4 * shadowIntensity}px ${12 * shadowIntensity}px rgba(0,0,0,${0.15 * shadowIntensity})`
        : "none"

    const svgContent = (
      <svg
        ref={svgRef}
        height="100%"
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        preserveAspectRatio={"none"}
        style={{
          filter: saturationFilter,
          transition: `filter ${TRANSITION_DURATION} ${EASING}, opacity ${TRANSITION_DURATION} ${EASING}`,
        }}
      >
        <g
          style={{
            transition: `opacity ${TRANSITION_DURATION} ${EASING}`,
          }}
        >
          <rect
            x={outerLayerOffsetXY}
            y={outerLayerOffsetXY}
            width={outerLayerWidth}
            height={outerLayerHeight}
            fill={outerFillColor}
            strokeWidth={outerStrokeWidth}
            stroke={outerStrokeColor}
            rx={outerLayerHeight / 2}
            style={{
              opacity: outerOpacity,
              fillOpacity: middleFillOpacity,
              transition: `opacity ${TRANSITION_DURATION} ${EASING}, fill-opacity ${TRANSITION_DURATION} ${EASING}, fill ${TRANSITION_DURATION} ${EASING}, stroke ${TRANSITION_DURATION} ${EASING}`,
            }}
          ></rect>
          <rect
            y={innerLayerOffsetXY}
            x={innerLayerOffsetXY}
            width={innerLayerWidth}
            height={innerLayerHeight}
            fill={innerFillColor}
            rx={innerLayerHeight / 2}
            style={{
              transition: `fill ${TRANSITION_DURATION} ${EASING}`,
            }}
          ></rect>
          {hasCalculatedScale ? (
            <foreignObject
              y={innerLayerOffsetXY / foreignObjectScaleX}
              x={innerLayerOffsetXY / foreignObjectScaleY}
              width={innerLayerWidth / foreignObjectScaleX}
              height={innerLayerHeight / foreignObjectScaleY}
              transform={`scale(${foreignObjectScaleX} ${foreignObjectScaleY})`}
            >
              {children}
            </foreignObject>
          ) : null}
        </g>
      </svg>
    )

    // Wrap in ButtonBase for ripple effect if enabled
    if (enableRipple && onClick) {
      return (
        <ButtonBase
          ref={ref as Ref<HTMLButtonElement>}
          onClick={onClick}
          sx={{
            width: "100%",
            height: "100%",
            display: "block",
            borderRadius: `${totalHeight / 2}px`,
            overflow: "visible",
            boxShadow,
            transition: `box-shadow ${TRANSITION_DURATION} ${EASING}`,
          }}
        >
          {svgContent}
        </ButtonBase>
      )
    }

    return (
      <Box
        ref={ref}
        onClick={onClick}
        sx={{
          width: "100%",
          height: "100%",
          cursor: onClick ? "pointer" : "default",
          boxShadow,
          borderRadius: `${totalHeight / 2}px`,
          transition: `box-shadow ${TRANSITION_DURATION} ${EASING}`,
        }}
      >
        {svgContent}
      </Box>
    )
  },
)

ExpandingBar.displayName = "ExpandingBar"
