/**
 * ProgressBar - Standardized progress indicator with color coding
 *
 * Provides consistent progress display with automatic color transitions
 * using MUI theme palette colors.
 */
import {
  Box,
  LinearProgress,
  Typography,
  useTheme,
  type SxProps,
  type Theme,
} from "@mui/material"

/**
 * Get progress color from theme based on percentage
 * Uses MUI theme palette for consistency
 */
function getThemeProgressColor(theme: Theme, percent: number): string {
  if (percent >= 75) return theme.palette.success.main
  if (percent >= 50) return theme.palette.warning.main
  if (percent >= 25) return theme.palette.warning.dark
  return theme.palette.error.main
}

export interface ProgressBarProps {
  /** Progress value (0-100) */
  value: number
  /** Show percentage label */
  showLabel?: boolean
  /** Label position */
  labelPosition?: "inline" | "above" | "below"
  /** Height of the progress bar */
  height?: number
  /** Custom color (overrides automatic color) */
  color?: string
  /** Custom styles for container */
  sx?: SxProps<Theme>
}

export function ProgressBar({
  value,
  showLabel = false,
  labelPosition = "inline",
  height = 8,
  color,
  sx,
}: ProgressBarProps) {
  const theme = useTheme()
  const progressColor = color ?? getThemeProgressColor(theme, value)
  const clampedValue = Math.min(100, Math.max(0, value))

  const progressBar = (
    <LinearProgress
      variant="determinate"
      value={clampedValue}
      sx={{
        height,
        borderRadius: height / 2,
        bgcolor: "action.hover",
        "& .MuiLinearProgress-bar": {
          bgcolor: progressColor,
          borderRadius: height / 2,
        },
      }}
    />
  )

  const label = (
    <Typography
      variant="caption"
      sx={{
        fontWeight: 600,
        color: progressColor,
        minWidth: 36,
        textAlign: "right",
      }}
    >
      {Math.round(clampedValue)}%
    </Typography>
  )

  if (!showLabel) {
    return <Box sx={sx}>{progressBar}</Box>
  }

  switch (labelPosition) {
    case "above":
      return (
        <Box sx={sx}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 0.5 }}>
            {label}
          </Box>
          {progressBar}
        </Box>
      )

    case "below":
      return (
        <Box sx={sx}>
          {progressBar}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 0.5 }}>
            {label}
          </Box>
        </Box>
      )

    case "inline":
    default:
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            ...sx,
          }}
        >
          <Box sx={{ flex: 1 }}>{progressBar}</Box>
          {label}
        </Box>
      )
  }
}

/**
 * Compact progress indicator with fraction display (e.g., "7/10")
 */
export interface CompactProgressProps {
  /** Number of completed items */
  completed: number
  /** Total number of items */
  total: number
  /** Show as percentage instead of fraction */
  showPercent?: boolean
  /** Custom styles */
  sx?: SxProps<Theme>
}

export function CompactProgress({
  completed,
  total,
  showPercent = false,
  sx,
}: CompactProgressProps) {
  const theme = useTheme()
  const percent = total > 0 ? (completed / total) * 100 : 0
  const color = getThemeProgressColor(theme, percent)

  return (
    <Typography
      variant="caption"
      sx={{
        fontWeight: 600,
        color,
        ...sx,
      }}
    >
      {showPercent ? `${Math.round(percent)}%` : `${completed}/${total}`}
    </Typography>
  )
}
