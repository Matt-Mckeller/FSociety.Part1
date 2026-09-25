"use client"

import { useTheme } from "@mui/material"
import {
  ReactNode,
  SVGProps,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

export const ExpandingBar = ({
  children,
  aspectRatio,
}: {
  children: ReactNode
  aspectRatio: number
}) => {
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
      console.log({ currentHeight, currentWidth, xScale, yScale })
      setForeignObjectScaleX(xScale)
      setForeignObjectScaleY(yScale)
      setHasCalculatedScale(true)
    }
  }, [svgRef])

  return (
    <svg
      ref={svgRef}
      height="100%"
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      preserveAspectRatio={"none"}
    >
      <g>
        <rect
          x={outerLayerOffsetXY}
          y={outerLayerOffsetXY}
          width={outerLayerWidth}
          height={outerLayerHeight}
          fill={theme.palette.primary.light}
          strokeWidth={outerStrokeWidth}
          stroke={theme.palette.primary.main}
          rx={outerLayerHeight / 2}
        ></rect>
        <rect
          y={innerLayerOffsetXY}
          x={innerLayerOffsetXY}
          width={innerLayerWidth}
          height={innerLayerHeight}
          fill={theme.palette.primary.main}
          rx={innerLayerHeight / 2}
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
}
