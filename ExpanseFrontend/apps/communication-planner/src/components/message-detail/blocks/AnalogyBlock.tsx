"use client"

import { Box, Typography, alpha, useTheme } from "@mui/material"
import { SportsEsports, CompareArrows } from "@mui/icons-material"
import { ContentBlock } from "@/types"
import { BlockWrapper } from "./BlockWrapper"

interface AnalogyBlockProps {
  block: ContentBlock
}

export function AnalogyBlock({ block }: AnalogyBlockProps) {
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
      icon={<SportsEsports fontSize="small" />}
      typeLabel="Analogy"
      accentColor={accentColor}
      variant="default"
    >
      <Box
        sx={{
          position: "relative",
          p: 2,
          bgcolor: alpha(accentColor, 0.03),
          borderRadius: 2,
          border: "1px solid",
          borderColor: alpha(accentColor, 0.15),
        }}
      >
        {/* Game-style corner decorations */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 12,
            height: 12,
            borderTop: "2px solid",
            borderLeft: "2px solid",
            borderColor: alpha(accentColor, 0.3),
            borderRadius: "4px 0 0 0",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 12,
            height: 12,
            borderTop: "2px solid",
            borderRight: "2px solid",
            borderColor: alpha(accentColor, 0.3),
            borderRadius: "0 4px 0 0",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 12,
            height: 12,
            borderBottom: "2px solid",
            borderLeft: "2px solid",
            borderColor: alpha(accentColor, 0.3),
            borderRadius: "0 0 0 4px",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 12,
            height: 12,
            borderBottom: "2px solid",
            borderRight: "2px solid",
            borderColor: alpha(accentColor, 0.3),
            borderRadius: "0 0 4px 0",
          }}
        />

        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.8,
            color: "text.primary",
            px: 1,
            "& strong": {
              fontWeight: 600,
              color: accentColor,
            },
          }}
          dangerouslySetInnerHTML={{ __html: formatContent(block.content) }}
        />
      </Box>

      {/* Analogy indicator */}
      <Box
        sx={{
          mt: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <CompareArrows sx={{ fontSize: 14, color: alpha(accentColor, 0.6) }} />
        <Typography variant="caption" color="text.secondary">
          Comparison for understanding
        </Typography>
      </Box>
    </BlockWrapper>
  )
}
