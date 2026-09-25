import { Chip, SxProps, Theme, useTheme, alpha } from "@mui/material"
import DescriptionIcon from "@mui/icons-material/Description"
import CodeIcon from "@mui/icons-material/Code"
import SettingsIcon from "@mui/icons-material/Settings"
import { QuestCategory } from "../../types"

/**
 * Get category configuration using MUI theme colors
 * - Planning (Blue): Research, goals, decisions, documentation
 * - Development (Purple): Code, components, APIs, testing
 * - Operations (Green): Deployment, maintenance, analytics
 */
function getCategoryConfig(theme: Theme) {
  return {
    planning: {
      icon: <DescriptionIcon fontSize="small" />,
      emoji: "📋",
      label: "Planning",
      color: theme.palette.info.main,
      bgColor: alpha(theme.palette.info.main, 0.1),
    },
    development: {
      icon: <CodeIcon fontSize="small" />,
      emoji: "💻",
      label: "Development",
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1),
    },
    operations: {
      icon: <SettingsIcon fontSize="small" />,
      emoji: "⚙️",
      label: "Operations",
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
    },
  } as const
}

export interface CategoryBadgeProps {
  category: QuestCategory
  size?: "small" | "medium"
  variant?: "filled" | "outlined"
  showIcon?: boolean
  showEmoji?: boolean
  sx?: SxProps<Theme>
}

/**
 * CategoryBadge - Visual indicator for quest work type
 *
 * Displays a colored chip with icon/emoji and label for:
 * - 📋 Planning (Blue)
 * - 💻 Development (Purple)
 * - ⚙️ Operations (Green)
 *
 * @example
 * <CategoryBadge category="planning" />
 * <CategoryBadge category="development" size="medium" showEmoji />
 * <CategoryBadge category="operations" variant="outlined" />
 */
export function CategoryBadge({
  category,
  size = "small",
  variant = "filled",
  showIcon = true,
  showEmoji = false,
  sx,
}: CategoryBadgeProps) {
  const theme = useTheme()
  const config = getCategoryConfig(theme)[category]

  return (
    <Chip
      icon={
        showIcon && !showEmoji ? (config.icon as React.ReactElement) : undefined
      }
      label={showEmoji ? `${config.emoji} ${config.label}` : config.label}
      size={size}
      sx={{
        bgcolor: variant === "filled" ? config.bgColor : "transparent",
        color: config.color,
        fontWeight: 600,
        borderLeft: `3px solid ${config.color}`,
        border:
          variant === "outlined" ? `1px solid ${config.color}` : undefined,
        "& .MuiChip-icon": {
          color: config.color,
        },
        ...sx,
      }}
    />
  )
}

/**
 * Get the color configuration for a category (for use in other components)
 * Note: This returns a function that takes theme, for use within components
 * that have access to useTheme()
 */
export function getCategoryColorConfig(theme: Theme, category: QuestCategory) {
  return getCategoryConfig(theme)[category]
}
