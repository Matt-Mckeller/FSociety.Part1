"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Paper,
  Collapse,
  IconButton,
  alpha,
  useTheme,
} from "@mui/material"
import { Image, ExpandMore, ExpandLess } from "@mui/icons-material"
import { ContentBlock } from "@/types"

const hookIcons: Record<string, string> = {
  gaming: "🎮",
  anime: "📺",
  visual: "🖼️",
  story: "📖",
}

interface BlockWrapperProps {
  block: ContentBlock
  icon: React.ReactNode
  typeLabel: string
  accentColor: string
  variant?: "default" | "muted" | "elevated" | "warm"
  collapsible?: boolean
  defaultCollapsed?: boolean
  showTypeChip?: boolean
  children: React.ReactNode
}

export function BlockWrapper({
  block,
  icon,
  typeLabel,
  accentColor,
  variant = "default",
  collapsible = false,
  defaultCollapsed = false,
  showTypeChip = true,
  children,
}: BlockWrapperProps) {
  const theme = useTheme()
  const [expanded, setExpanded] = useState(!defaultCollapsed)

  const getVariantStyles = () => {
    switch (variant) {
      case "muted":
        return {
          bgcolor: alpha(theme.palette.grey[100], 0.6),
          border: "1px dashed",
          borderColor: theme.palette.grey[300],
        }
      case "elevated":
        return {
          bgcolor: alpha(accentColor, 0.03),
          border: "1px solid",
          borderColor: alpha(accentColor, 0.18),
        }
      case "warm":
        return {
          bgcolor: alpha(accentColor, 0.03),
          borderLeft: "3px solid",
          borderColor: accentColor,
        }
      default:
        return {
          borderLeft: "3px solid",
          borderColor: accentColor,
        }
    }
  }

  return (
    <Card
      sx={{
        mb: 2.5,
        boxShadow: "none",
        border: 1,
        borderColor: "divider",
        ...getVariantStyles(),
      }}
    >
      <CardContent sx={{ p: collapsible && !expanded ? 2 : 3 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            mb: expanded ? 2.25 : 0,
            flexWrap: "wrap",
            cursor: collapsible ? "pointer" : "default",
          }}
          onClick={collapsible ? () => setExpanded(!expanded) : undefined}
        >
          {showTypeChip && (
            <Chip
              icon={icon as React.ReactElement}
              label={typeLabel}
              size="small"
              sx={{
                bgcolor: alpha(accentColor, 0.1),
                color: accentColor,
                fontWeight: 600,
                border: "none",
                "& .MuiChip-icon": { color: accentColor },
              }}
            />
          )}
          <Typography
            variant="subtitle2"
            sx={{
              flexGrow: 1,
              color: "text.primary",
              fontWeight: 500,
            }}
          >
            {block.label}
          </Typography>

          {/* Engagement hooks */}
          {block.engagementHooks?.map((hook) => (
            <Chip
              key={hook}
              label={`${hookIcons[hook]} ${hook}`}
              size="small"
              variant="outlined"
              sx={{
                fontSize: "0.7rem",
                borderColor: alpha(accentColor, 0.4),
                color: accentColor,
              }}
            />
          ))}

          {/* Tags */}
          {block.tags?.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                fontSize: "0.65rem",
                bgcolor: alpha(theme.palette.grey[500], 0.1),
                color: "text.secondary",
              }}
            />
          ))}

          {collapsible && (
            <IconButton size="small" sx={{ ml: "auto" }}>
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )}
        </Box>

        {/* Content */}
        <Collapse in={expanded}>
          <Box>{children}</Box>

          {/* Image Placeholder */}
          {block.imagePlaceholder && (
            <Paper
              variant="outlined"
              sx={{
                mt: 2,
                p: 2,
                bgcolor: alpha(accentColor, 0.04),
                border: "2px dashed",
                borderColor: alpha(accentColor, 0.3),
                textAlign: "center",
              }}
            >
              <Image sx={{ fontSize: 32, color: accentColor, mb: 0.5 }} />
              <Typography
                variant="caption"
                sx={{ color: accentColor }}
                display="block"
              >
                <strong>Visual:</strong> {block.imagePlaceholder.suggestedType}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {block.imagePlaceholder.description}
              </Typography>
            </Paper>
          )}

          {/* Psych Steps */}
          {block.psychApproachSteps && block.psychApproachSteps.length > 0 && (
            <Box
              sx={{
                mt: 2,
                pt: 1.5,
                borderTop: "1px solid",
                borderColor: "grey.200",
                display: "flex",
                gap: 0.5,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Addresses:
              </Typography>
              {block.psychApproachSteps.map((step) => (
                <Chip
                  key={step}
                  label={`Step ${step}`}
                  size="small"
                  variant="outlined"
                  sx={{
                    height: 18,
                    fontSize: "0.65rem",
                    borderColor: alpha(accentColor, 0.5),
                    color: accentColor,
                  }}
                />
              ))}
            </Box>
          )}
        </Collapse>
      </CardContent>
    </Card>
  )
}
