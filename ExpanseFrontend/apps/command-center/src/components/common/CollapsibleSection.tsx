/**
 * CollapsibleSection - Lightweight collapsible section for unified container layouts
 * Uses divider lines instead of card borders, supports pinned state
 * Uses MUI theme colors for consistency.
 */
import { useState, ReactNode } from "react"
import {
  Box,
  Typography,
  alpha,
  Chip,
  Collapse,
  LinearProgress,
  useTheme,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"

interface CollapsibleSectionProps {
  title: string
  icon?: ReactNode
  badge?: string | number
  badgeColor?: string
  progress?: number
  defaultOpen?: boolean
  pinned?: boolean
  noDivider?: boolean
  children: ReactNode
  /** Compact chips to show in header when collapsed */
  collapsedSummary?: ReactNode
}

export function CollapsibleSection({
  title,
  icon,
  badge,
  badgeColor,
  progress,
  defaultOpen = true,
  pinned = false,
  noDivider = false,
  children,
  collapsedSummary,
}: CollapsibleSectionProps) {
  const theme = useTheme()
  const defaultBadgeColor = badgeColor ?? theme.palette.text.secondary
  const [expanded, setExpanded] = useState(defaultOpen)

  return (
    <Box>
      {/* Strong Divider line with gradient fade */}
      {!noDivider && (
        <Box
          sx={{
            height: 1,
            background: `linear-gradient(90deg, ${alpha(defaultBadgeColor, 0.4)} 0%, ${alpha(defaultBadgeColor, 0.15)} 30%, rgba(0,0,0,0.08) 100%)`,
          }}
        />
      )}

      {/* Header Row */}
      <Box
        onClick={() => setExpanded(!expanded)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 1,
          px: 2,
          cursor: "pointer",
          bgcolor: expanded
            ? pinned
              ? alpha(defaultBadgeColor, 0.06)
              : alpha(defaultBadgeColor, 0.03)
            : pinned
              ? alpha(defaultBadgeColor, 0.04)
              : "transparent",
          borderLeft: 3,
          borderColor: expanded ? defaultBadgeColor : "transparent",
          transition: "all 0.2s ease",
          "&:hover": {
            bgcolor: alpha(defaultBadgeColor, 0.08),
            borderColor: defaultBadgeColor,
          },
        }}
      >
        {/* Expand/Collapse Arrow - LEFT side for visibility */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 20,
            height: 20,
            borderRadius: 0.5,
            bgcolor: expanded
              ? alpha(defaultBadgeColor, 0.12)
              : alpha(theme.palette.text.secondary, 0.08),
            mr: 1,
            transition: "all 0.2s ease",
          }}
        >
          {expanded ? (
            <ExpandMoreIcon sx={{ fontSize: 16, color: defaultBadgeColor }} />
          ) : (
            <KeyboardArrowRightIcon
              sx={{ fontSize: 16, color: "text.secondary" }}
            />
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            minWidth: 0,
            flex: 1,
          }}
        >
          {icon && (
            <Box
              sx={{
                color: defaultBadgeColor,
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
                opacity: expanded ? 1 : 0.7,
              }}
            >
              {icon}
            </Box>
          )}
          <Typography
            variant="subtitle2"
            fontWeight={expanded ? 700 : 600}
            sx={{
              color: expanded ? defaultBadgeColor : "text.primary",
              transition: "all 0.15s ease",
            }}
          >
            {title}
          </Typography>
          {badge !== undefined && (
            <Chip
              label={badge}
              size="small"
              sx={{
                height: 18,
                fontSize: "0.65rem",
                bgcolor: expanded
                  ? alpha(defaultBadgeColor, 0.15)
                  : alpha(defaultBadgeColor, 0.08),
                color: defaultBadgeColor,
                fontWeight: 600,
                "& .MuiChip-label": { px: 0.75 },
              }}
            />
          )}
          {/* Collapsed summary chips */}
          {!expanded && collapsedSummary && (
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, ml: 1 }}
            >
              {collapsedSummary}
            </Box>
          )}
        </Box>

        {/* Expand indicator text on right */}
        <Typography
          variant="caption"
          sx={{
            color: "text.disabled",
            fontSize: "0.6rem",
            opacity: expanded ? 0 : 0.7,
            transition: "opacity 0.15s ease",
          }}
        >
          click to expand
        </Typography>
      </Box>

      {/* Progress Bar (optional) */}
      {progress !== undefined && expanded && (
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 3,
            bgcolor: alpha(defaultBadgeColor, 0.1),
            "& .MuiLinearProgress-bar": {
              bgcolor:
                progress === 100
                  ? theme.palette.success.main
                  : defaultBadgeColor,
            },
          }}
        />
      )}

      {/* Collapsible Content */}
      <Collapse in={expanded} timeout={200}>
        <Box
          sx={{
            px: 2,
            pb: 1.5,
            pt: 1,
            ml: 0.375, // Align with left border
            borderLeft: 2,
            borderColor: alpha(defaultBadgeColor, 0.15),
          }}
        >
          {children}
        </Box>
      </Collapse>
    </Box>
  )
}
