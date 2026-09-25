"use client"

import { Box, Typography, alpha, useTheme } from "@mui/material"
import { RocketLaunch, TrendingUp } from "@mui/icons-material"
import { ContentBlock } from "@/types"
import { BlockWrapper } from "./BlockWrapper"

interface AmbitionBlockProps {
  block: ContentBlock
}

export function AmbitionBlock({ block }: AmbitionBlockProps) {
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
      icon={<RocketLaunch fontSize="small" />}
      typeLabel="Vision"
      accentColor={accentColor}
      variant="elevated"
    >
      <Box
        sx={{
          position: "relative",
          p: 2.5,
          background: `linear-gradient(135deg, ${alpha(accentColor, 0.03)} 0%, ${alpha(accentColor, 0.08)} 100%)`,
          borderRadius: 2,
          border: "1px solid",
          borderColor: alpha(accentColor, 0.15),
          overflow: "hidden",
        }}
      >
        {/* Upward trending decoration */}
        <TrendingUp
          sx={{
            position: "absolute",
            right: -10,
            bottom: -10,
            fontSize: 100,
            color: alpha(accentColor, 0.05),
            transform: "rotate(-15deg)",
          }}
        />

        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.9,
            color: "text.primary",
            position: "relative",
            fontSize: "0.95rem",
            "& strong": {
              fontWeight: 700,
              color: accentColor,
            },
          }}
          dangerouslySetInnerHTML={{ __html: formatContent(block.content) }}
        />
      </Box>

      {/* Vision indicator */}
      <Box
        sx={{
          mt: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <RocketLaunch sx={{ fontSize: 14, color: alpha(accentColor, 0.6) }} />
        <Typography variant="caption" color="text.secondary">
          Goals & aspirations
        </Typography>
      </Box>
    </BlockWrapper>
  )
}
