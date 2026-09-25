/**
 * LearningChatTypingIndicator Component
 *
 * Animated indicator showing AI is generating a response
 */

"use client"

import React from "react"
import { Box, Typography, Avatar, keyframes } from "@mui/material"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import type { LearningChatTypingIndicatorProps } from "../types"

const bounce = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-4px);
  }
`

export const LearningChatTypingIndicator: React.FC<
  LearningChatTypingIndicatorProps
> = ({ size = 6, color = "text.secondary", sx }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        bgcolor: "action.hover",
        borderRadius: 2,
        px: 2,
        py: 1.5,
        width: "fit-content",
        ml: 5.5, // Align with message content (avatar + gap)
        ...sx,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Thinking
      </Typography>
      <Box sx={{ display: "flex", gap: 0.5 }}>
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: size,
              height: size,
              borderRadius: "50%",
              bgcolor: color,
              animation: `${bounce} 1.4s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

/** @deprecated Use LearningChatTypingIndicator instead */
export const TypingIndicator = LearningChatTypingIndicator

export default LearningChatTypingIndicator
