"use client"

import { Box, Typography, alpha, useTheme } from "@mui/material"
import { Campaign, CheckCircle } from "@mui/icons-material"
import { ContentBlock } from "@/types"
import { BlockWrapper } from "./BlockWrapper"

interface CalloutBlockProps {
  block: ContentBlock
}

interface CalloutItem {
  number: number
  text: string
}

export function CalloutBlock({ block }: CalloutBlockProps) {
  const theme = useTheme()
  const accentColor = theme.palette.primary.main

  // Parse content - extract header and list items
  const parseCallout = (
    content: string
  ): { header: string | null; items: CalloutItem[] } => {
    const lines = content.split("\n").filter((l) => l.trim())
    let header: string | null = null
    const items: CalloutItem[] = []

    for (const line of lines) {
      // Check if it's a header (starts with **)
      const headerMatch = line.match(/^\*\*(.+?)\*\*:?$/)
      if (headerMatch && items.length === 0) {
        header = headerMatch[1]
        continue
      }

      // Check if it's a numbered item
      const listMatch = line.match(/^(\d+)[).:\-]\s*(.+)/)
      if (listMatch) {
        items.push({
          number: parseInt(listMatch[1]),
          text: listMatch[2].trim(),
        })
      }
    }

    return { header, items }
  }

  const { header, items } = parseCallout(block.content)
  const formatText = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
  }

  return (
    <BlockWrapper
      block={block}
      icon={<Campaign fontSize="small" />}
      typeLabel="Important"
      accentColor={accentColor}
      variant="elevated"
    >
      <Box
        sx={{
          bgcolor: alpha(accentColor, 0.03),
          borderRadius: 2,
          p: 2.5,
          border: "1px solid",
          borderColor: alpha(accentColor, 0.15),
          position: "relative",
        }}
      >
        {/* Accent corner */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 40,
            height: 40,
            background: `linear-gradient(135deg, ${alpha(accentColor, 0.15)} 50%, transparent 50%)`,
            borderRadius: "8px 0 0 0",
          }}
        />

        {/* Header if present */}
        {header && (
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: accentColor,
              mb: 2,
              pl: 1,
            }}
          >
            {header}
          </Typography>
        )}

        {/* List items as checkmarks */}
        {items.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {items.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.5,
                  p: 1.5,
                  bgcolor: "white",
                  borderRadius: 1.5,
                  border: "1px solid",
                  borderColor: alpha(accentColor, 0.1),
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: alpha(accentColor, 0.3),
                    bgcolor: alpha(accentColor, 0.02),
                  },
                }}
              >
                <CheckCircle
                  sx={{
                    color: accentColor,
                    fontSize: 20,
                    mt: 0.25,
                    flexShrink: 0,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1.7,
                    color: "text.primary",
                    "& strong": { fontWeight: 600 },
                  }}
                  dangerouslySetInnerHTML={{ __html: formatText(item.text) }}
                />
              </Box>
            ))}
          </Box>
        ) : (
          // Fallback to plain formatted text
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "pre-wrap",
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
      </Box>
    </BlockWrapper>
  )
}
