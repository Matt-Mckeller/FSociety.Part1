"use client"
import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"

interface CircleMergeAnimationProps {
  leftCircleText: string
  rightCircleText: string
  finalCircleText: string[]
  animationDurations?: {
    mergeDuration: number
    expandDuration: number
    textFadeDuration: number
  }
  circleColors?: {
    leftCircle: string
    rightCircle: string
    finalCircle: string
  }
}

const CircleMergeAnimation: React.FC<CircleMergeAnimationProps> = ({
  leftCircleText,
  rightCircleText,
  finalCircleText,
  animationDurations = {
    mergeDuration: 12,
    expandDuration: 12,
    textFadeDuration: 4,
  },
  circleColors = {
    leftCircle: "blue",
    rightCircle: "red",
    finalCircle: "purple",
  },
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const finalTextRef = useRef<SVGTextElement | null>(null)
  const leftTextRef = useRef<SVGTextElement | null>(null)
  const rightTextRef = useRef<SVGTextElement | null>(null)

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 })

    // Merge animation
    tl.to("#leftCircle", {
      x: 75,
      duration: animationDurations.mergeDuration,
      ease: "power2.out",
    })
      .to(
        "#rightCircle",
        {
          x: -75,
          duration: animationDurations.mergeDuration,
          ease: "power2.out",
        },
        `-=${animationDurations.mergeDuration}`,
      )
      .to(
        "#overlapMask",
        {
          opacity: 1,
          duration: animationDurations.mergeDuration / 2,
          ease: "power2.out",
        },
        `-=${animationDurations.mergeDuration / 2}`,
      )
      .to(
        "#leftText",
        {
          x: "+=75",
          duration: animationDurations.mergeDuration,
          ease: "power2.out",
        },
        `-=${animationDurations.mergeDuration}`,
      )
      .to(
        "#rightText",
        {
          x: "-=75",
          duration: animationDurations.mergeDuration,
          ease: "power2.out",
        },
        `-=${animationDurations.mergeDuration}`,
      )
      // Expand to single circle
      .to(
        "#leftCircle, #rightCircle",
        {
          attr: { r: 75 },
          duration: animationDurations.expandDuration,
          ease: "power2.out",
          onComplete: () => {
            gsap.set("#rightCircle", { display: "none" })
            gsap.set("#overlapMask", { display: "none" })
            gsap.set(leftTextRef.current, { opacity: 0 })
            gsap.set(rightTextRef.current, { opacity: 0 })
          },
        },
        `-=${animationDurations.expandDuration}`,
      )
      // Text transition loop for final circle
      .to(
        finalTextRef.current,
        {
          opacity: 1,
          duration: animationDurations.textFadeDuration,
          repeat: finalCircleText.length - 1,
          repeatDelay: 0.5,
          yoyo: true,
          ease: "power1.inOut",
          onUpdate: function () {
            const currentIndex = Math.floor(
              (tl.time() / (animationDurations.textFadeDuration + 0.5)) %
                finalCircleText.length,
            )
            if (finalTextRef.current) {
              finalTextRef.current.textContent = finalCircleText[currentIndex]
            }
          },
        },
        `-=${animationDurations.textFadeDuration}`,
      )
  }, [animationDurations, finalCircleText])

  return (
    <svg
      ref={svgRef}
      width="300"
      height="150"
      viewBox="0 0 300 150"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <mask id="overlapMask">
          <rect x="0" y="0" width="300" height="150" fill="white" />
          <circle cx="150" cy="75" r="50" fill="black" />
        </mask>
      </defs>
      <circle
        id="leftCircle"
        cx="75"
        cy="75"
        r="50"
        fill={circleColors.leftCircle}
      />
      <text
        ref={leftTextRef}
        id="leftText"
        x="75"
        y="80"
        textAnchor="middle"
        fill="white"
        fontSize="14"
      >
        {leftCircleText}
      </text>
      <circle
        id="rightCircle"
        cx="225"
        cy="75"
        r="50"
        fill={circleColors.rightCircle}
      />
      <text
        ref={rightTextRef}
        id="rightText"
        x="225"
        y="80"
        textAnchor="middle"
        fill="white"
        fontSize="14"
      >
        {rightCircleText}
      </text>
      <circle
        id="overlapMask"
        cx="150"
        cy="75"
        r="50"
        fill="white"
        opacity="0"
        mask="url(#overlapMask)"
      />
      <text
        ref={finalTextRef}
        x="150"
        y="80"
        textAnchor="middle"
        fill="white"
        fontSize="20"
        opacity="0"
      />
    </svg>
  )
}

export default CircleMergeAnimation
