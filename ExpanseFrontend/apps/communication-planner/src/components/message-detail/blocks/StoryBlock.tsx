"use client"

import { Box, Typography, alpha, useTheme, Paper } from "@mui/material"
import { AutoStories, FormatQuote } from "@mui/icons-material"
import { ContentBlock } from "@/types"
import { BlockWrapper } from "./BlockWrapper"

interface StoryBlockProps {
  block: ContentBlock
}

export function StoryBlock({ block }: StoryBlockProps) {
  const theme = useTheme()
  const accentColor = theme.palette.primary.main

  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br />")
  }

  return (
    <BlockWrapper
      block={block}
      icon={<AutoStories fontSize="small" />}
      typeLabel="Story"
      accentColor={accentColor}
      variant="warm"
    >
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          p: 3,
          bgcolor: alpha(theme.palette.grey[50], 0.8),
          border: "1px solid",
          borderColor: theme.palette.grey[200],
          borderRadius: 2,
          // Book spine effect
          borderLeft: "6px solid",
          borderLeftColor: accentColor,
          // Subtle paper texture feel
          backgroundImage: `linear-gradient(90deg, ${alpha(accentColor, 0.02)} 0%, transparent 10%)`,
        }}
      >
        {/* Opening quote mark */}
        <FormatQuote
          sx={{
            position: "absolute",
            left: 12,
            top: 8,
            fontSize: 40,
            color: alpha(accentColor, 0.15),
            transform: "rotate(180deg)",
          }}
        />

        {/* Story content with slightly different typography */}
        <Typography
          variant="body2"
          sx={{
            lineHeight: 2,
            color: "text.primary",
            pl: 4,
            pr: 2,
            // Slightly more readable story font
            fontSize: "0.9rem",
            "& strong": {
              fontWeight: 600,
              color: accentColor,
            },
          }}
          dangerouslySetInnerHTML={{ __html: formatContent(block.content) }}
        />

        {/* Closing quote mark */}
        <FormatQuote
          sx={{
            position: "absolute",
            right: 12,
            bottom: 8,
            fontSize: 40,
            color: alpha(accentColor, 0.15),
          }}
        />
      </Paper>

      {/* Story purpose hint */}
      <Box
        sx={{
          mt: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <AutoStories sx={{ fontSize: 14, color: alpha(accentColor, 0.6) }} />
        <Typography variant="caption" color="text.secondary">
          Narrative for visualization & retention
        </Typography>
      </Box>
    </BlockWrapper>
  )
}
