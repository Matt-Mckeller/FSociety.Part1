"use client"

import { Box, Typography, alpha, useTheme } from "@mui/material"
import { EmojiObjects } from "@mui/icons-material"
import { ContentBlock } from "@/types"
import { BlockWrapper } from "./BlockWrapper"

interface InsightBlockProps {
  block: ContentBlock
}

export function InsightBlock({ block }: InsightBlockProps) {
  const theme = useTheme()
  const accentColor = theme.palette.primary.light

  // Parse content for formatting
  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br />")
  }

  return (
    <BlockWrapper
      block={block}
      icon={<EmojiObjects fontSize="small" />}
      typeLabel="Insight"
      accentColor={accentColor}
      variant="warm"
    >
      <Box
        sx={{
          position: "relative",
          pl: 2,
          borderLeft: "3px solid",
          borderColor: alpha(accentColor, 0.4),
          bgcolor: alpha(accentColor, 0.03),
          py: 1.5,
          px: 2,
          borderRadius: "0 8px 8px 0",
        }}
      >
        {/* Large lightbulb watermark */}
        <EmojiObjects
          sx={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 48,
            color: alpha(accentColor, 0.08),
          }}
        />

        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.8,
            color: "text.primary",
            position: "relative",
            "& strong": {
              fontWeight: 600,
              color: theme.palette.primary.main,
            },
          }}
          dangerouslySetInnerHTML={{ __html: formatContent(block.content) }}
        />
      </Box>
    </BlockWrapper>
  )
}
