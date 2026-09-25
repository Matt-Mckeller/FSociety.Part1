/**
 * LearningChatHighlightedText Component
 *
 * Renders text with highlighted search matches
 */

"use client"

import React from "react"
import { Box } from "@mui/material"

export interface HighlightRange {
  start: number
  end: number
}

export interface LearningChatHighlightedTextProps {
  /** The text content to display */
  text: string
  /** Ranges to highlight (start/end indices) */
  highlights: HighlightRange[]
  /** Whether this is the current/active match */
  isCurrentMatch?: boolean
  /** Custom highlight color */
  highlightColor?: string
  /** Custom current match color */
  currentMatchColor?: string
}

export const LearningChatHighlightedText: React.FC<
  LearningChatHighlightedTextProps
> = ({
  text,
  highlights,
  isCurrentMatch = false,
  highlightColor = "rgba(255, 235, 59, 0.5)",
  currentMatchColor = "rgba(255, 152, 0, 0.7)",
}) => {
  if (!highlights || highlights.length === 0) {
    return <>{text}</>
  }

  // Sort highlights by start position
  const sortedHighlights = [...highlights].sort((a, b) => a.start - b.start)

  // Build segments
  const segments: Array<{ text: string; isHighlight: boolean }> = []
  let lastEnd = 0

  sortedHighlights.forEach((highlight) => {
    // Add non-highlighted segment before this match
    if (highlight.start > lastEnd) {
      segments.push({
        text: text.slice(lastEnd, highlight.start),
        isHighlight: false,
      })
    }

    // Add highlighted segment
    segments.push({
      text: text.slice(highlight.start, highlight.end),
      isHighlight: true,
    })

    lastEnd = highlight.end
  })

  // Add remaining non-highlighted text
  if (lastEnd < text.length) {
    segments.push({
      text: text.slice(lastEnd),
      isHighlight: false,
    })
  }

  return (
    <>
      {segments.map((segment, index) =>
        segment.isHighlight ? (
          <Box
            key={index}
            component="mark"
            sx={{
              bgcolor: isCurrentMatch ? currentMatchColor : highlightColor,
              color: "inherit",
              borderRadius: 0.5,
              px: 0.25,
              mx: -0.25,
              transition: "background-color 0.2s ease",
            }}
          >
            {segment.text}
          </Box>
        ) : (
          <React.Fragment key={index}>{segment.text}</React.Fragment>
        ),
      )}
    </>
  )
}

export default LearningChatHighlightedText
