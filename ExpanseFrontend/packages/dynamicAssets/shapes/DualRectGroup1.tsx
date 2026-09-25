"use client"
import React, { useEffect, useRef, useState } from "react"
import { useTheme } from "@mui/system"
import gsap from "gsap"
import { useDynamicAssets } from "../hooks"

type FillVersionOptions = "white" | "background" | "default"
type StrokeVersionOptions = "white" | "contrastBG" | "default"
interface Props {
  id?: string
  fillVersion?: FillVersionOptions
  strokeVersion?: StrokeVersionOptions
}
export function DualRectGroup1({ id, fillVersion, strokeVersion }: Props) {
  const theme = useTheme()
  const { filledShapeColor: defaultFilledColor } = useDynamicAssets()
  const fillColor =
    fillVersion === "background"
      ? theme.palette.background.default
      : fillVersion === "white"
        ? theme.palette.common.white
        : defaultFilledColor
  const strokeColor =
    strokeVersion === "white"
      ? theme.palette.common.white
      : strokeVersion === "contrastBG"
        ? theme.palette.background.contrastBG
        : theme.palette.background.default
  const lineColor = theme.palette.background.contrastBG
  const ref = useRef()
  const smallDiameter = 7.22
  const bigDiameter = 8.68
  // without shadow may want big rect left smaller rect top right
  // lower left with shadow may want upper right popping out

  const [previousScrollPosition, setPreviousScrollPosition] = useState(0)
  const setPreviousScrollPositionRef: any = useRef()
  const previousScrollPositionRef: any = useRef()
  setPreviousScrollPositionRef.current = setPreviousScrollPosition
  previousScrollPositionRef.current = previousScrollPosition

  const timeline = gsap.timeline()
  const timelineRef: any = useRef()
  timelineRef.current = timeline

  useEffect(() => {
    const upAnimationTween = gsap.to(`#${id}`, {
      x: 5,
      y: -5,
      duration: 1,
    })
    const downAnimationTween = gsap.to(`#${id}`, {
      x: 0,
      y: 0,
      duration: 1,
      delay: 1,
    })
    timeline.add(upAnimationTween)
    timeline.add(downAnimationTween)
    const triggerDownAnimation = () => {
      timeline.reverse()
    }
    const triggerUpAnimation = () => {
      // timeline.play()
      /*
       if(timeline.children().includes(PAUSE))
       DONT ADD
      ELSE ADD
      timeline.addPause(1)
      */
    }
    const onScroll = (event: any) => {
      const scrollPosition = window.scrollY
      const scrollingUp = scrollPosition < previousScrollPositionRef.current
      const scrollingDown = scrollPosition > previousScrollPositionRef.current
      setPreviousScrollPositionRef.current(window.scrollY)
      triggerUpAnimation()
    }
    if (typeof window !== "undefined") {
      document.addEventListener("scroll", onScroll)
    }
    // setInterval(() => {

    // }, 2000)
    return () => window.removeEventListener("resize", onScroll)
  }, [])
  return (
    <g id={id}>
      <rect
        width={bigDiameter}
        height={bigDiameter}
        fill="none"
        stroke={strokeColor}
        strokeWidth="0.5"
      />

      <rect
        width={smallDiameter}
        height={smallDiameter}
        fill={fillColor}
        x={bigDiameter / 2}
        y={-bigDiameter / 3}
      />
    </g>
  )
}
