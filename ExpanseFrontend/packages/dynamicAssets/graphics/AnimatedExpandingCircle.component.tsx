"use client"
import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { useTheme } from "@mui/system"

const PREFIX = "expanse-primary-expanding-ball-"
export function AnimatedExpandingCircle() {
  const Timeline = gsap.timeline({ repeat: -1, yoyo: true, delay: 0 })
  const TimelineRef = useRef(Timeline)
  const svgRef: any | React.MutableRefObject<SVGElement> = useRef()
  const theme = useTheme()

  // const filledCenters = svgSelector(`.${PREFIX}-filled-center`)

  useEffect(() => {
    const svgSelector = gsap.utils.selector(svgRef)
    const rings = svgSelector(`.${PREFIX}-ring`)
    const ringsInReverse = [...rings].reverse()
    TimelineRef.current.timeScale(0.5)

    TimelineRef.current
      .to(rings, {
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        stagger: 0.25,
        ease: "power2",
      })
      .to(ringsInReverse, {
        opacity: 1,
        duration: 0.5,
        delay: 0,
        stagger: 0.25,
        ease: "power2",
      })
  }, [])

  const color = theme.palette.text.primary
  const centerCircleSize = 7.5
  const jumpAmount = 5
  const jumpIncrement = 0
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      ref={svgRef}
    >
      <g>
        <circle
          className={`${PREFIX}-ring`}
          cx="50"
          cy="50"
          r={centerCircleSize + jumpAmount * 3 + jumpIncrement * 2}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="1.432"
        />
        <circle
          className={`${PREFIX}-ring`}
          cx="50"
          cy="50"
          r={centerCircleSize + jumpAmount * 2 + jumpIncrement}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="1.432"
        />
        <circle
          className={`${PREFIX}-ring`}
          cx="50"
          cy="50"
          r={centerCircleSize + jumpAmount}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="1.432"
        />
        <g>
          <circle
            className={`${PREFIX}-filled-center`}
            cx="50"
            cy="50"
            r={centerCircleSize}
            fill={color}
            data-name="Ellipse 224"
          />
        </g>
      </g>
    </svg>
  )
}
