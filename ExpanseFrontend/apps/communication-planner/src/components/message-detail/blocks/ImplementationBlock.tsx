"use client"

import { Box, Typography, alpha, useTheme } from "@mui/material"
import { Build, ArrowForward } from "@mui/icons-material"
import { ContentBlock } from "@/types"
import { BlockWrapper } from "./BlockWrapper"

interface ImplementationBlockProps {
  block: ContentBlock
}

export function ImplementationBlock({ block }: ImplementationBlockProps) {
  const theme = useTheme()
  const accentColor = theme.palette.primary.main

  // Parse bullet points from content
  const parseContent = (content: string) => {
    const lines = content.split("\n")
    const header: string[] = []
    const bullets: string[] = []

    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
        bullets.push(trimmed.substring(2))
      } else if (trimmed) {
        if (bullets.length === 0) {
          header.push(trimmed)
        }
      }
    }

    return { header: header.join("\n"), bullets }
  }

  const { header, bullets } = parseContent(block.content)

  const formatText = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
  }

  return (
    <BlockWrapper
      block={block}
      icon={<Build fontSize="small" />}
      typeLabel="Action"
      accentColor={accentColor}
      variant="warm"
    >
      {/* Header text */}
      {header && (
        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.8,
            color: "text.primary",
            mb: bullets.length > 0 ? 2 : 0,
            "& strong": {
              fontWeight: 600,
              color: accentColor,
            },
          }}
          dangerouslySetInnerHTML={{ __html: formatText(header) }}
        />
      )}

      {/* Bullet points */}
      {bullets.length > 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {bullets.map((bullet, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                p: 1.5,
                bgcolor: alpha(accentColor, 0.04),
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: alpha(accentColor, 0.1),
              }}
            >
              <ArrowForward
                sx={{
                  color: accentColor,
                  fontSize: 16,
                  mt: 0.25,
                  flexShrink: 0,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  lineHeight: 1.6,
                  color: "text.primary",
                  "& strong": { fontWeight: 600 },
                }}
                dangerouslySetInnerHTML={{ __html: formatText(bullet) }}
              />
            </Box>
          ))}
        </Box>
      )}

      {/* If no bullets, show as plain text */}
      {bullets.length === 0 && !header && (
        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.8,
            color: "text.primary",
            "& strong": { fontWeight: 600 },
          }}
          dangerouslySetInnerHTML={{
            __html: block.content
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              .replace(/\n/g, "<br />"),
          }}
        />
      )}
    </BlockWrapper>
  )
}
