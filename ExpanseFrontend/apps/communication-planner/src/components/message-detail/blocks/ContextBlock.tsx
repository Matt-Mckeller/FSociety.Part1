"use client"

import { Box, Typography, alpha, useTheme } from "@mui/material"
import { Info } from "@mui/icons-material"
import { ContentBlock } from "@/types"
import { BlockWrapper } from "./BlockWrapper"

interface ContextBlockProps {
  block: ContentBlock
}

export function ContextBlock({ block }: ContextBlockProps) {
  const theme = useTheme()
  const accentColor = theme.palette.grey[600]

  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br />")
  }

  return (
    <BlockWrapper
      block={block}
      icon={<Info fontSize="small" />}
      typeLabel="Context"
      accentColor={accentColor}
      variant="default"
    >
      <Box
        sx={{
          pl: 2,
          borderLeft: "2px solid",
          borderColor: theme.palette.grey[300],
        }}
      >
        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.8,
            color: "text.secondary",
            "& strong": {
              fontWeight: 600,
              color: "text.primary",
            },
          }}
          dangerouslySetInnerHTML={{ __html: formatContent(block.content) }}
        />
      </Box>

      {/* Context hint */}
      <Box
        sx={{
          mt: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          opacity: 0.7,
        }}
      >
        <Info sx={{ fontSize: 12, color: "text.disabled" }} />
        <Typography variant="caption" color="text.disabled">
          Supporting context
        </Typography>
      </Box>
    </BlockWrapper>
  )
}
