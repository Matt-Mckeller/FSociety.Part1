/**
 * PriorityBadge - Standardized priority indicator
 *
 * Provides consistent priority display across all views.
 * Uses MUI theme colors for priority mapping.
 */
import {
  Box,
  Typography,
  Tooltip,
  alpha,
  useTheme,
  type SxProps,
  type Theme,
} from "@mui/material"
import FlagIcon from "@mui/icons-material/Flag"
import { priorityLabels } from "../shared/game-constants"

/**
 * Get priority color from theme
 * Maps priority levels to semantic theme colors
 */
function getThemePriorityColor(theme: Theme, priority: string): string {
  const colorMap: Record<string, string> = {
    P1: theme.palette.error.main,
    P2: theme.palette.warning.main,
    P3: theme.palette.text.secondary,
    P4: theme.palette.text.disabled,
    critical: theme.palette.error.main,
    high: theme.palette.warning.main,
    medium: theme.palette.info.main,
    low: theme.palette.success.main,
  }
  return colorMap[priority] ?? theme.palette.text.secondary
}

export interface PriorityBadgeProps {
  /** Priority value (P1, P2, P3, P4 or critical, high, medium, low) */
  priority: string
  /** Display variant */
  variant?: "chip" | "dot" | "icon" | "text"
  /** Show tooltip with full label */
  showTooltip?: boolean
  /** Custom styles */
  sx?: SxProps<Theme>
}

export function PriorityBadge({
  priority,
  variant = "chip",
  showTooltip = true,
  sx,
}: PriorityBadgeProps) {
  const theme = useTheme()
  const color = getThemePriorityColor(theme, priority)
  const label = priorityLabels[priority] ?? priority

  const content = (() => {
    switch (variant) {
      case "dot":
        return (
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: color,
              ...sx,
            }}
          />
        )

      case "icon":
        return (
          <FlagIcon
            sx={{
              fontSize: 16,
              color,
              ...sx,
            }}
          />
        )

      case "text":
        return (
          <Typography
            variant="caption"
            sx={{
              color,
              fontWeight: 600,
              ...sx,
            }}
          >
            {priority}
          </Typography>
        )

      case "chip":
      default:
        return (
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              px: 1,
              py: 0.25,
              borderRadius: 1,
              bgcolor: alpha(color, 0.15),
              color,
              fontSize: "0.75rem",
              fontWeight: 600,
              ...sx,
            }}
          >
            <FlagIcon sx={{ fontSize: 12 }} />
            {priority}
          </Box>
        )
    }
  })()

  if (showTooltip) {
    return <Tooltip title={label}>{content}</Tooltip>
  }

  return content
}
