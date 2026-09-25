"use client"

import { Box, Typography, alpha } from "@mui/material"
import { ContentBlock } from "@/types"
import { gamingColors } from "../themes/gamingTheme"

interface RelatedBlocksProps {
  blocks: ContentBlock[]
}

export function RelatedBlocks({ blocks }: RelatedBlocksProps) {
  if (blocks.length === 0) return null

  return (
    <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      {blocks.map((block) => (
        <Box
          key={block.id}
          sx={{
            p: 2,
            borderRadius: 1,
            bgcolor: alpha(gamingColors.neonPurple, 0.08),
            border: `1px solid ${alpha(gamingColors.neonPurple, 0.2)}`,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ color: gamingColors.neonCyan, mb: 0.75 }}
          >
            {block.label}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: gamingColors.textPrimary, lineHeight: 1.55, whiteSpace: "pre-wrap" }}
          >
            {block.content.replace(/\*\*(.*?)\*\*/g, "$1")}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
