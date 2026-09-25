/**
 * SectionCard - Reusable collapsible card for wiki sections
 * Features: collapsible content, category icons, progress indicators
 * Uses MUI theme colors for consistency.
 */
import { useState, ReactNode } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  alpha,
  Chip,
  Collapse,
  LinearProgress,
  Button,
  Tooltip,
  useTheme,
  type Theme,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import DescriptionIcon from "@mui/icons-material/Description"
import CodeIcon from "@mui/icons-material/Code"
import SettingsIcon from "@mui/icons-material/Settings"

type SectionCategory = "planning" | "development" | "operations" | "default"

interface SectionCardProps {
  title: string
  category?: SectionCategory
  children: ReactNode
  defaultExpanded?: boolean
  isEmpty?: boolean
  emptyMessage?: string
  emptyIcon?: ReactNode
  showAiGenerate?: boolean
  progress?: number
  badge?: string | number
  onAiGenerate?: () => void
}

/**
 * Get category configuration using MUI theme colors
 */
function getCategoryConfig(theme: Theme) {
  return {
    planning: {
      icon: <DescriptionIcon />,
      color: theme.palette.info.main,
      bgColor: alpha(theme.palette.info.main, 0.1),
    },
    development: {
      icon: <CodeIcon />,
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1),
    },
    operations: {
      icon: <SettingsIcon />,
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
    },
    default: {
      icon: <DescriptionIcon />,
      color: theme.palette.text.secondary,
      bgColor: alpha(theme.palette.text.secondary, 0.1),
    },
  } as const
}

export function SectionCard({
  title,
  category = "default",
  children,
  defaultExpanded = true,
  isEmpty = false,
  emptyMessage = "No content yet",
  emptyIcon,
  showAiGenerate = false,
  progress,
  badge,
  onAiGenerate,
}: SectionCardProps) {
  const theme = useTheme()
  const [expanded, setExpanded] = useState(defaultExpanded)
  const config = getCategoryConfig(theme)[category]

  return (
    <Card
      sx={{
        mb: 2,
        borderLeft: 3,
        borderColor: config.color,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 2,
        },
      }}
    >
      {/* Header - Always visible */}
      <Box
        onClick={() => setExpanded(!expanded)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1.5,
          cursor: "pointer",
          bgcolor: expanded ? "transparent" : alpha(config.color, 0.02),
          "&:hover": {
            bgcolor: alpha(config.color, 0.04),
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{ color: config.color, display: "flex", alignItems: "center" }}
          >
            {config.icon}
          </Box>
          <Typography variant="subtitle1" fontWeight={600}>
            {title}
          </Typography>
          {badge !== undefined && (
            <Chip
              label={badge}
              size="small"
              sx={{
                height: 20,
                fontSize: "0.7rem",
                bgcolor: config.bgColor,
                color: config.color,
                fontWeight: 600,
              }}
            />
          )}
          {progress !== undefined && (
            <Chip
              label={`${progress}%`}
              size="small"
              sx={{
                height: 20,
                fontSize: "0.7rem",
                bgcolor:
                  progress === 100
                    ? alpha(theme.palette.success.main, 0.1)
                    : config.bgColor,
                color:
                  progress === 100 ? theme.palette.success.main : config.color,
                fontWeight: 600,
              }}
            />
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {showAiGenerate && isEmpty && (
            <Tooltip title="Generate content with AI (coming soon)">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation()
                  onAiGenerate?.()
                }}
                disabled={!onAiGenerate}
                sx={{
                  color: theme.palette.primary.main,
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                <AutoAwesomeIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          )}
          <IconButton size="small" sx={{ p: 0.5 }}>
            {expanded ? (
              <ExpandLessIcon sx={{ fontSize: 20, color: "text.secondary" }} />
            ) : (
              <ExpandMoreIcon sx={{ fontSize: 20, color: "text.secondary" }} />
            )}
          </IconButton>
        </Box>
      </Box>

      {/* Progress Bar */}
      {progress !== undefined && expanded && (
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 3,
            bgcolor: alpha(config.color, 0.1),
            "& .MuiLinearProgress-bar": {
              bgcolor:
                progress === 100 ? theme.palette.success.main : config.color,
            },
          }}
        />
      )}

      {/* Collapsible Content */}
      <Collapse in={expanded} timeout="auto">
        <CardContent
          sx={{ pt: progress !== undefined ? 1.5 : 0, pb: "12px !important" }}
        >
          {isEmpty ? (
            <Box
              sx={{
                py: 3,
                textAlign: "center",
                bgcolor: alpha(config.color, 0.02),
                borderRadius: 1,
                border: "2px dashed",
                borderColor: alpha(config.color, 0.2),
              }}
            >
              {emptyIcon && (
                <Box sx={{ color: "text.disabled", mb: 1 }}>{emptyIcon}</Box>
              )}
              <Typography variant="body2" color="text.secondary">
                {emptyMessage}
              </Typography>
              {showAiGenerate && (
                <Button
                  size="small"
                  startIcon={<AutoAwesomeIcon />}
                  disabled={!onAiGenerate}
                  sx={{ mt: 1.5, opacity: onAiGenerate ? 1 : 0.6 }}
                >
                  Generate with AI
                </Button>
              )}
            </Box>
          ) : (
            children
          )}
        </CardContent>
      </Collapse>
    </Card>
  )
}
