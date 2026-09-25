"use client"
import React, { useEffect, useState } from "react"
import { useTheme } from "@mui/material"
import gsap from "gsap"

interface CircleProps {
  size: number
  color?: string
  text: string
  textColor?: string
}

interface ExpandingCirclesProps {
  leftCircle?: CircleProps
  rightCircle?: CircleProps
  mainCircle?: CircleProps
  spacing?: number
  initialFontSize?: number
  combinedFontSize?: number
  moveDuration?: number
  textArray?: string[]
}
/*
  Notes:
  future improvement / variation option: Update sizes to be small on left large on right larger when coming together
  future possibility: update to success color for center circle background
*/
export const ExpandingCirclesAnimation = ({
  leftCircle = {
    size: 150,
    color: "",
    text: "Business",
    textColor: "",
  },
  rightCircle = {
    size: 150,
    color: "",
    text: "Technology",
    textColor: "",
  },
  mainCircle = {
    size: 200,
    color: "",
    text: "Innovation",
    textColor: "",
  },
  spacing = 50,
  initialFontSize = 24,
  combinedFontSize = 24,
  moveDuration = 2,
  textArray = [],
}: ExpandingCirclesProps) => {
  const theme = useTheme()

  // Update colors to be grabbed from the theme if not provided
  leftCircle.color =
    leftCircle.color ||
    (theme.palette.mode === "dark"
      ? theme.palette.background.light
      : theme.palette.primary.dark)
  leftCircle.textColor =
    leftCircle.textColor ||
    (theme.palette.mode === "dark"
      ? theme.palette.common.black
      : theme.palette.primary.contrastText)
  rightCircle.color = rightCircle.color || theme.palette.primary.light
  rightCircle.textColor =
    theme.palette.mode === "dark"
      ? theme.palette.common.black
      : theme.palette.primary.contrastText
  mainCircle.color = mainCircle.color || theme.palette.primary.main
  mainCircle.textColor =
    mainCircle.textColor || theme.palette.primary.contrastText

  const moveAmount = spacing / 2 + leftCircle.size
  const [mainTextX, setMainTextX] = useState(0)
  const [mainTextIndex, setMainTextIndex] = useState(0)

  // Center the main text dynamically
  const centerMainText = () => {
    if (typeof window !== "undefined") {
      const text = document.getElementById("mainText")
      const textWidth = text.getBBox().width
      const centeredX = leftCircle.size + moveAmount - textWidth / 2
      setMainTextX(centeredX)
    }
  }

  useEffect(() => {
    // Center the text initially
    if (textArray.length > 0) {
      centerMainText()
    }
  }, [textArray, leftCircle.size, moveAmount])

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 }) // Infinite loop with delay between cycles

    // Fade in both circles and text
    tl.fromTo(
      [".leftCircle", ".leftText", ".rightCircle", ".rightText"],
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
    )

      // Then start moving
      .to(
        [
          ".leftCircle",
          ".leftText",
          ".rightCircle",
          ".rightText",
          ".mainCircle",
        ],
        {
          duration: moveDuration,
          x: (index, target) => {
            if (
              target.classList.contains("leftCircle") ||
              target.classList.contains("leftText") ||
              target.classList.contains("mainCircle")
            ) {
              return moveAmount
            }
            return -moveAmount
          },
          ease: "sine.inOut",
          onStart: () => {
            centerMainText()
          },
        },
      )

      // Hide the left and right circles
      .to(
        [".leftCircle", ".rightCircle"],
        {
          opacity: 0,
          duration: 0,
        },
        "-=0.2",
      )

      // Show the main text
      .to(
        [".mainText"],
        {
          opacity: 1,
          duration: 0.5,
          ease: "sine.inOut",
        },
        "-=0.2",
      )
      .to([".mainCircle", ".circleClipPath", ".mainText"], {
        attr: {
          r: (index, target) => {
            if (target.classList.contains("mainText")) {
              return null
            }
            return mainCircle.size
          },
        },
        scale: (index, target) => {
          if (target.classList.contains("mainText")) {
            return 1.5
          }
          return 1
        },
        transformOrigin: "center",
        duration: 1,
        ease: "sine.inOut",
      })
      // Change the main text with fading
      .to(".mainText", {
        repeat: textArray.length > 0 ? textArray.length - 1 : 0,
        repeatDelay: 1,
        onRepeat: function () {
          if (textArray.length === 0) return
          setMainTextIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % textArray.length
            return nextIndex
          })
          gsap.delayedCall(0, () => {
            centerMainText()
            gsap.fromTo(
              ".mainText",
              { opacity: 0 },
              { opacity: 1, duration: 0.5, ease: "sine.inOut" },
            )
          })
        },
        onComplete: function () {
          // resetting the text
          gsap.delayedCall(1, () => {
            setMainTextIndex(0)
          })
        },
      })

    return () => {
      tl.kill()
    }
  }, [moveAmount, moveDuration, textArray])

  return (
    <svg
      id="demo"
      xmlns="http://www.w3.org/2000/svg"
      width={(leftCircle.size + rightCircle.size) * 2 + spacing}
      height={mainCircle.size * 2}
      viewBox={`0 0 ${(leftCircle.size + rightCircle.size) * 2 + spacing} ${
        mainCircle.size * 2
      }`}
    >
      <defs>
        <clipPath id="theClipPath">
          <circle
            className="rightCircle circleClipPath"
            r={rightCircle.size}
            fill={mainCircle.color}
            cx={leftCircle.size + spacing + 2 * leftCircle.size}
            cy={mainCircle.size}
          />
        </clipPath>
      </defs>

      {/* Right Circle */}
      <circle
        className="rightCircle"
        r={rightCircle.size}
        fill={rightCircle.color}
        cx={leftCircle.size + spacing + 2 * leftCircle.size}
        cy={mainCircle.size}
      />
      <text
        className="rightText"
        x={leftCircle.size + spacing + 2 * leftCircle.size}
        y={mainCircle.size}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill={rightCircle.textColor}
        fontSize={initialFontSize}
        fontWeight="bold"
      >
        {rightCircle.text}
      </text>

      {/* Left Circle */}
      <circle
        className="leftCircle"
        r={leftCircle.size}
        fill={leftCircle.color}
        cx={leftCircle.size}
        cy={mainCircle.size}
      />
      <text
        className="leftText"
        x={leftCircle.size}
        y={mainCircle.size}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill={leftCircle.textColor}
        fontSize={initialFontSize}
        fontWeight="bold"
      >
        {leftCircle.text}
      </text>

      {/* This is the final big circle */}
      <g clipPath="url(#theClipPath)">
        <circle
          className="mainCircle"
          r={leftCircle.size}
          fill={mainCircle.color}
          cx={leftCircle.size}
          cy={mainCircle.size}
        />
      </g>

      {/* Main final text */}
      <text
        id="mainText"
        className="mainText"
        x={mainTextX}
        y={mainCircle.size}
        alignmentBaseline="middle"
        fill={mainCircle.textColor}
        fontSize={combinedFontSize}
        style={{ opacity: 0 }} // Initially hidden
        fontWeight="bold"
      >
        {textArray[mainTextIndex] || mainCircle.text}
      </text>
    </svg>
  )
}

export default ExpandingCirclesAnimation
