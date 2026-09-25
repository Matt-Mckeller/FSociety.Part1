"use client"

import { Box, Typography, alpha, useTheme, Collapse, IconButton } from "@mui/material"
import { Settings, ExpandMore, ExpandLess } from "@mui/icons-material"
import { ContentBlock } from "@/types"
import { useState } from "react"

interface MetaBlockProps {
  block: ContentBlock
}

export function MetaBlock({ block }: MetaBlockProps) {
  const theme = useTheme()
  const [expanded, setExpanded] = useState(false)
  const accentColor = theme.palette.grey[500]

  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br />")
  }

  return (
    <Box
      sx={{
        mb: 2,
        border: "1px dashed",
        borderColor: theme.palette.grey[300],
        borderRadius: 2,
        bgcolor: alpha(theme.palette.grey[100], 0.3),
        opacity: 0.75,
        transition: "all 0.2s ease",
        "&:hover": {
          opacity: 1,
          borderColor: theme.palette.grey[400],
        },
      }}
    >
      {/* Collapsed header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 1.5,
          cursor: "pointer",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Settings
          sx={{
            fontSize: 16,
            color: accentColor,
          }}
        />
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          Internal Note
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "text.disabled",
            mx: 1,
          }}
        >
          •
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            flexGrow: 1,
          }}
        >
          {block.label}
        </Typography>

        {/* Tags */}
        {block.tags?.map((tag) => (
          <Typography
            key={tag}
            variant="caption"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 500,
              fontSize: "0.65rem",
            }}
          >
            {tag}
          </Typography>
        ))}

        <IconButton size="small" sx={{ p: 0.5 }}>
          {expanded ? (
            <ExpandLess sx={{ fontSize: 18 }} />
          ) : (
            <ExpandMore sx={{ fontSize: 18 }} />
          )}
        </IconButton>
      </Box>

      {/* Expanded content */}
      <Collapse in={expanded}>
        <Box
          sx={{
            px: 2,
            pb: 2,
            pt: 0,
            borderTop: "1px dashed",
            borderColor: theme.palette.grey[200],
          }}
        >
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: "text.secondary",
              fontSize: "0.85rem",
              fontStyle: "italic",
              "& strong": { fontWeight: 600, fontStyle: "normal" },
            }}
            dangerouslySetInnerHTML={{ __html: formatContent(block.content) }}
          />

          {/* Psych steps if any */}
          {block.psychApproachSteps && block.psychApproachSteps.length > 0 && (
            <Box sx={{ mt: 1, display: "flex", gap: 0.5 }}>
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ fontSize: "0.65rem" }}
              >
                Steps: {block.psychApproachSteps.join(", ")}
              </Typography>
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  )
}
