"use client"

/**
 * Markdown Renderer Component
 * Renders markdown with syntax highlighting and better formatting
 */

import { Box, Typography } from "@mui/material"
import { ReactNode } from "react"

interface MarkdownRendererProps {
  content: string
  compact?: boolean
}

export default function MarkdownRenderer({
  content,
  compact = false,
}: MarkdownRendererProps) {
  // Simple markdown parser for common patterns
  const parseMarkdown = (text: string): ReactNode[] => {
    const lines = text.split("\n")
    const elements: ReactNode[] = []
    let inCodeBlock = false
    let codeBlockContent = ""
    let codeBlockLang = ""

    lines.forEach((line, index) => {
      // Code blocks
      if (line.startsWith("```")) {
        if (!inCodeBlock) {
          inCodeBlock = true
          codeBlockLang = line.slice(3).trim()
          codeBlockContent = ""
        } else {
          elements.push(
            <Box
              key={`code-${index}`}
              component="pre"
              sx={{
                p: 2,
                bgcolor: "grey.900",
                color: "grey.100",
                borderRadius: 1,
                overflow: "auto",
                fontFamily: "monospace",
                fontSize: "0.875rem",
                my: compact ? 1 : 2,
              }}
            >
              <code>{codeBlockContent}</code>
            </Box>,
          )
          inCodeBlock = false
          codeBlockContent = ""
        }
        return
      }

      if (inCodeBlock) {
        codeBlockContent += line + "\n"
        return
      }

      // Headings
      if (line.startsWith("### ")) {
        elements.push(
          <Typography
            key={`h3-${index}`}
            variant="h6"
            sx={{ mt: compact ? 1 : 2, mb: 1, fontWeight: 600 }}
          >
            {line.slice(4)}
          </Typography>,
        )
        return
      }

      if (line.startsWith("## ")) {
        elements.push(
          <Typography
            key={`h2-${index}`}
            variant="h5"
            sx={{ mt: compact ? 1.5 : 3, mb: 1, fontWeight: 600 }}
          >
            {line.slice(3)}
          </Typography>,
        )
        return
      }

      if (line.startsWith("# ")) {
        elements.push(
          <Typography
            key={`h1-${index}`}
            variant="h4"
            sx={{ mt: compact ? 2 : 3, mb: 1.5, fontWeight: 600 }}
          >
            {line.slice(2)}
          </Typography>,
        )
        return
      }

      // Lists
      if (line.match(/^[\*\-]\s/)) {
        elements.push(
          <Box
            key={`li-${index}`}
            component="li"
            sx={{ ml: 2, my: compact ? 0.25 : 0.5 }}
          >
            <Typography variant="body2" component="span">
              {line.slice(2)}
            </Typography>
          </Box>,
        )
        return
      }

      // Numbered lists
      if (line.match(/^\d+\.\s/)) {
        elements.push(
          <Box
            key={`oli-${index}`}
            component="li"
            sx={{ ml: 2, my: compact ? 0.25 : 0.5 }}
          >
            <Typography variant="body2" component="span">
              {line.replace(/^\d+\.\s/, "")}
            </Typography>
          </Box>,
        )
        return
      }

      // Inline code
      const codeRegex = /`([^`]+)`/g
      if (codeRegex.test(line)) {
        const parts = line.split(codeRegex)
        elements.push(
          <Typography key={`p-${index}`} variant="body2" sx={{ my: 0.5 }}>
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <Box
                  key={i}
                  component="code"
                  sx={{
                    px: 0.5,
                    py: 0.25,
                    bgcolor: "grey.200",
                    borderRadius: 0.5,
                    fontFamily: "monospace",
                    fontSize: "0.85em",
                  }}
                >
                  {part}
                </Box>
              ) : (
                part
              ),
            )}
          </Typography>,
        )
        return
      }

      // Bold text
      const boldRegex = /\*\*([^*]+)\*\*/g
      if (boldRegex.test(line)) {
        const parts = line.split(boldRegex)
        elements.push(
          <Typography key={`p-${index}`} variant="body2" sx={{ my: 0.5 }}>
            {parts.map((part, i) =>
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
            )}
          </Typography>,
        )
        return
      }

      // Empty lines
      if (line.trim() === "") {
        elements.push(<Box key={`br-${index}`} sx={{ height: 8 }} />)
        return
      }

      // Regular paragraphs
      elements.push(
        <Typography key={`p-${index}`} variant="body2" sx={{ my: 0.5 }}>
          {line}
        </Typography>,
      )
    })

    return elements
  }

  return <Box>{parseMarkdown(content)}</Box>
}
