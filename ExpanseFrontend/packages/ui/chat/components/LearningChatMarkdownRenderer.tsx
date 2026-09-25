/**
 * LearningChatMarkdownRenderer Component
 *
 * Renders markdown content with syntax highlighting for code blocks
 */

"use client"

import React, { useState } from "react"
import { Box, Typography, IconButton, Tooltip, Paper } from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import CheckIcon from "@mui/icons-material/Check"
import type { LearningChatMarkdownRendererProps } from "../types"

interface CodeBlockProps {
  code: string
  language?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        my: 2,
        borderRadius: 1,
        overflow: "hidden",
        bgcolor: "grey.900",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 0.5,
          bgcolor: "grey.800",
          borderBottom: 1,
          borderColor: "grey.700",
        }}
      >
        <Typography variant="caption" sx={{ color: "grey.400" }}>
          {language || "code"}
        </Typography>
        <Tooltip title={copied ? "Copied!" : "Copy code"}>
          <IconButton
            size="small"
            onClick={handleCopy}
            sx={{ color: "grey.400" }}
          >
            {copied ? (
              <CheckIcon sx={{ fontSize: 14 }} />
            ) : (
              <ContentCopyIcon sx={{ fontSize: 14 }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      {/* Code */}
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 2,
          overflow: "auto",
          fontFamily: "monospace",
          fontSize: "0.875rem",
          lineHeight: 1.5,
          color: "grey.100",
        }}
      >
        <code>{code}</code>
      </Box>
    </Paper>
  )
}

// Simple markdown parser - in production you'd use react-markdown
const parseMarkdown = (content: string): React.ReactNode[] => {
  const elements: React.ReactNode[] = []
  const lines = content.split("\n")
  let inCodeBlock = false
  let codeBlockContent = ""
  let codeBlockLanguage = ""
  let key = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Code block start/end
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        // End code block
        elements.push(
          <CodeBlock
            key={`code-${key++}`}
            code={codeBlockContent.trim()}
            language={codeBlockLanguage}
          />,
        )
        codeBlockContent = ""
        codeBlockLanguage = ""
        inCodeBlock = false
      } else {
        // Start code block
        inCodeBlock = true
        codeBlockLanguage = line.slice(3).trim()
      }
      continue
    }

    if (inCodeBlock) {
      codeBlockContent += line + "\n"
      continue
    }

    // Headers
    if (line.startsWith("### ")) {
      elements.push(
        <Typography
          key={`h3-${key++}`}
          variant="subtitle1"
          fontWeight="bold"
          mt={2}
          mb={1}
        >
          {line.slice(4)}
        </Typography>,
      )
      continue
    }
    if (line.startsWith("## ")) {
      elements.push(
        <Typography
          key={`h2-${key++}`}
          variant="h6"
          fontWeight="bold"
          mt={2}
          mb={1}
        >
          {line.slice(3)}
        </Typography>,
      )
      continue
    }
    if (line.startsWith("# ")) {
      elements.push(
        <Typography
          key={`h1-${key++}`}
          variant="h5"
          fontWeight="bold"
          mt={2}
          mb={1}
        >
          {line.slice(2)}
        </Typography>,
      )
      continue
    }

    // Lists
    if (line.match(/^[-*]\s/)) {
      elements.push(
        <Typography
          key={`li-${key++}`}
          variant="body1"
          component="li"
          sx={{ ml: 2, listStyleType: "disc" }}
        >
          {parseInlineMarkdown(line.slice(2))}
        </Typography>,
      )
      continue
    }

    // Numbered lists
    if (line.match(/^\d+\.\s/)) {
      const text = line.replace(/^\d+\.\s/, "")
      elements.push(
        <Typography
          key={`oli-${key++}`}
          variant="body1"
          component="li"
          sx={{ ml: 2, listStyleType: "decimal" }}
        >
          {parseInlineMarkdown(text)}
        </Typography>,
      )
      continue
    }

    // Empty line
    if (line.trim() === "") {
      elements.push(<Box key={`br-${key++}`} sx={{ height: 8 }} />)
      continue
    }

    // Regular paragraph
    elements.push(
      <Typography key={`p-${key++}`} variant="body1" paragraph sx={{ mb: 1 }}>
        {parseInlineMarkdown(line)}
      </Typography>,
    )
  }

  // Handle unclosed code block (streaming)
  if (inCodeBlock && codeBlockContent) {
    elements.push(
      <CodeBlock
        key={`code-${key++}`}
        code={codeBlockContent.trim()}
        language={codeBlockLanguage}
      />,
    )
  }

  return elements
}

// Parse inline markdown (bold, italic, code, links)
const parseInlineMarkdown = (text: string): React.ReactNode => {
  // Simple implementation - handles **bold**, *italic*, `code`, [links](url)
  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    // Bold
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
    // Italic
    const italicMatch = remaining.match(/\*(.+?)\*/)
    // Inline code
    const codeMatch = remaining.match(/`(.+?)`/)
    // Link
    const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/)

    // Find the earliest match
    const matches = [
      boldMatch && { type: "bold", match: boldMatch },
      italicMatch && { type: "italic", match: italicMatch },
      codeMatch && { type: "code", match: codeMatch },
      linkMatch && { type: "link", match: linkMatch },
    ]
      .filter(Boolean)
      .sort((a, b) => (a!.match.index || 0) - (b!.match.index || 0))

    if (matches.length === 0 || matches[0]!.match.index === undefined) {
      parts.push(remaining)
      break
    }

    const earliest = matches[0]!
    const { type, match } = earliest
    const index = match.index!

    // Add text before match
    if (index > 0) {
      parts.push(remaining.slice(0, index))
    }

    // Add matched element
    switch (type) {
      case "bold":
        parts.push(
          <Box
            component="strong"
            key={`b-${key++}`}
            sx={{ fontWeight: "bold" }}
          >
            {match[1]}
          </Box>,
        )
        break
      case "italic":
        parts.push(
          <Box component="em" key={`i-${key++}`} sx={{ fontStyle: "italic" }}>
            {match[1]}
          </Box>,
        )
        break
      case "code":
        parts.push(
          <Box
            component="code"
            key={`c-${key++}`}
            sx={{
              px: 0.5,
              py: 0.25,
              borderRadius: 0.5,
              bgcolor: "action.selected",
              fontFamily: "monospace",
              fontSize: "0.875em",
            }}
          >
            {match[1]}
          </Box>,
        )
        break
      case "link":
        parts.push(
          <Box
            component="a"
            key={`a-${key++}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "primary.main",
              textDecoration: "underline",
              "&:hover": { textDecoration: "none" },
            }}
          >
            {match[1]}
          </Box>,
        )
        break
    }

    remaining = remaining.slice(index + match[0].length)
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>
}

export const LearningChatMarkdownRenderer: React.FC<
  LearningChatMarkdownRendererProps & { isStreaming?: boolean }
> = ({ content, isStreaming = false }) => {
  return (
    <Box
      sx={{ "& > *:first-of-type": { mt: 0 }, "& > *:last-child": { mb: 0 } }}
    >
      {parseMarkdown(content)}
      {isStreaming && (
        <Box
          component="span"
          sx={{
            display: "inline-block",
            width: 8,
            height: 16,
            bgcolor: "text.primary",
            ml: 0.5,
            animation: "blink 1s infinite",
            "@keyframes blink": {
              "0%, 50%": { opacity: 1 },
              "51%, 100%": { opacity: 0 },
            },
          }}
        />
      )}
    </Box>
  )
}

/** @deprecated Use LearningChatMarkdownRenderer instead */
export const MarkdownRenderer = LearningChatMarkdownRenderer

export default LearningChatMarkdownRenderer
