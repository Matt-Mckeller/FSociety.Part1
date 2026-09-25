"use client"

import { Box, Typography, alpha, useTheme } from "@mui/material"
import { Refresh, ArrowForward } from "@mui/icons-material"
import { ContentBlock } from "@/types"
import { BlockWrapper } from "./BlockWrapper"

interface ReframeBlockProps {
  block: ContentBlock
}

export function ReframeBlock({ block }: ReframeBlockProps) {
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
      icon={<Refresh fontSize="small" />}
      typeLabel="Reframe"
      accentColor={accentColor}
      variant="default"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          gap: 1,
        }}
      >
        {/* Left indicator bar showing transformation */}
        <Box
          sx={{
            width: 4,
            borderRadius: 2,
            background: `linear-gradient(to bottom, ${theme.palette.grey[400]} 0%, ${accentColor} 100%)`,
            flexShrink: 0,
          }}
        />

        {/* Content */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.8,
              color: "text.primary",
              "& strong": {
                fontWeight: 600,
                color: accentColor,
              },
            }}
            dangerouslySetInnerHTML={{ __html: formatContent(block.content) }}
          />
        </Box>
      </Box>

      {/* Visual hint of transformation */}
      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
          opacity: 0.6,
        }}
      >
        <Refresh sx={{ fontSize: 14, color: "text.secondary" }} />
        <Typography variant="caption" color="text.secondary">
          Perspective shift
        </Typography>
        <ArrowForward sx={{ fontSize: 12, color: "text.secondary" }} />
        <Typography variant="caption" sx={{ color: accentColor, fontWeight: 500 }}>
          New understanding
        </Typography>
      </Box>
    </BlockWrapper>
  )
}
