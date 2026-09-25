"use client"
import { useLayoutEffect, useRef, useState } from "react"

export const OneTwoThreeLine = ({
  width,
  height,
  gapToSmallestLineRatio = 16, // determines the gap between the lines relative to the smallest line's size
}: {
  width?: string | number
  height?: number | string
  gapToSmallestLineRatio?: number
}) => {
  const svgRef = useRef<SVGSVGElement>(null)

  const viewHeight = 3
  const [manualWidth, setManualWidth] = useState<number | null>(null)
  const [manualHeight, setManualHeight] = useState<number | null>(null)
  // This is required to keep the edges round and looking good during scaling
  // Why does this work? Why is this how I have to do it? Why can't I just use viewHeight?
  const rectRx = manualHeight ? manualHeight / 2 : viewHeight / 2

  const widthForCalculation = manualWidth ? manualWidth : 60
  const smallestLineGoalLength = (1 / 6) * widthForCalculation
  const middleLineGoalLength = (2 / 6) * widthForCalculation
  const longestLineGoalLength = (3 / 6) * widthForCalculation
  const spacingInbetween = smallestLineGoalLength / gapToSmallestLineRatio

  const viewWidth = widthForCalculation + spacingInbetween * 2

  const lineOneStartX = 0
  const lineTwoStartX =
    lineOneStartX + smallestLineGoalLength + spacingInbetween
  const lineThreeStartX =
    lineTwoStartX + middleLineGoalLength + spacingInbetween

  useLayoutEffect(() => {
    if (svgRef.current) {
      const currentHeight = svgRef.current.clientHeight
      const currentWidth = svgRef.current.clientWidth
      console.log({ currentWidth, currentHeight })
      setManualWidth(currentWidth)
      setManualHeight(currentHeight)
    }
  }, [svgRef])

  return (
    <svg
      width={width ? width : "100%"}
      height={height ? height : "100%"}
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
    >
      <rect
        width={smallestLineGoalLength}
        height={viewHeight}
        rx={rectRx}
        x={lineOneStartX}
        y={0}
        fill="black"
      />
      <rect
        width={middleLineGoalLength}
        height={viewHeight}
        rx={rectRx}
        x={lineTwoStartX}
        y={0}
        fill="black"
      />
      <rect
        width={longestLineGoalLength}
        height={viewHeight}
        rx={rectRx}
        x={lineThreeStartX}
        y={0}
        fill="black"
      />
    </svg>
  )
}
