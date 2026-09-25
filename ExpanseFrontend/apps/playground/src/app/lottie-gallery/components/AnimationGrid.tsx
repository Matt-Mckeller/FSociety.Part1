/**
 * Animation Grid Component
 * Displays grid of animation cards
 */

"use client"

import { useEffect } from "react"
import { Box } from "@mui/material"
import { AnimationCard } from "./AnimationCard"
import type { Animation } from "../utils/animationRegistry"

interface AnimationGridProps {
  animations: Animation[]
  themeColor: string
}

export function AnimationGrid({ animations, themeColor }: AnimationGridProps) {
  console.log(
    "🔷 [AnimationGrid] === RENDERING ===",
    animations.length,
    "animations",
  )

  useEffect(() => {
    console.log(
      "🔷 [AnimationGrid] ✅ MOUNTED with",
      animations.length,
      "animations",
    )
    return () => {
      console.log("🔷 [AnimationGrid] ❌ UNMOUNTING")
    }
  }, [])

  useEffect(() => {
    console.log(
      "🔷 [AnimationGrid] 🔄 Animations array changed:",
      animations.length,
      "animations",
    )
  }, [animations])
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 3,
      }}
    >
      {animations.map((animation, index) => (
        <AnimationCard
          key={`${animation.name}-${index}`}
          animation={animation}
          themeColor={themeColor}
          index={index}
        />
      ))}
    </Box>
  )
}
