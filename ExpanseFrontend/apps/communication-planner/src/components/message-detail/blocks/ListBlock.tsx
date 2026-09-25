"use client"

import { Box, Typography, alpha, useTheme } from "@mui/material"
import { FormatListNumbered } from "@mui/icons-material"
import { ContentBlock } from "@/types"
import { BlockWrapper } from "./BlockWrapper"

interface ListBlockProps {
  block: ContentBlock
}

interface ListItem {
  number: number
  text: string
}

export function ListBlock({ block }: ListBlockProps) {
  const theme = useTheme()
  const accentColor = theme.palette.primary.main

  // Parse numbered list from content
  const parseListItems = (content: string): ListItem[] => {
    const items: ListItem[] = []
    const lines = content.split("\n")

    for (const line of lines) {
      // Match patterns like "1)" or "1." or "1:"
      const match = line.match(/^(\d+)[).:\-]\s*(.+)/)
      if (match) {
        items.push({
          number: parseInt(match[1]),
          text: match[2].trim(),
        })
      }
    }

    return items
  }

  const listItems = parseListItems(block.content)

  // Format text with markdown-like syntax
  const formatText = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
  }

  return (
    <BlockWrapper
      block={block}
      icon={<FormatListNumbered fontSize="small" />}
      typeLabel="Assessment"
      accentColor={accentColor}
    >
      {listItems.length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {listItems.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
              }}
            >
              {/* Number circle */}
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  bgcolor: alpha(accentColor, 0.1),
                  color: accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  flexShrink: 0,
                  mt: 0.25,
                  border: "2px solid",
                  borderColor: alpha(accentColor, 0.3),
                }}
              >
                {item.number}
              </Box>

              {/* Item content */}
              <Box
                sx={{
                  flex: 1,
                  py: 0.5,
                  borderBottom: idx < listItems.length - 1 ? "1px solid" : "none",
                  borderColor: "grey.100",
                  pb: idx < listItems.length - 1 ? 1.5 : 0.5,
                }}
              >
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
            </Box>
          ))}
        </Box>
      ) : (
        // Fallback to plain text
        <Typography
          variant="body2"
          sx={{
            whiteSpace: "pre-wrap",
            lineHeight: 1.7,
            color: "text.primary",
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
