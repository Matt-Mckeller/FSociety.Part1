"use client"

import React from "react"
import {
  Box,
  Typography,
  LinearProgress,
  CircularProgress,
  Tooltip,
  useTheme,
  Chip,
} from "@mui/material"
import {
  CheckCircle,
  RadioButtonUnchecked,
  EmojiEvents,
  Star,
} from "@mui/icons-material"

export interface ProfileCompletenessItem {
  /** Unique identifier */
  id: string
  /** Display label */
  label: string
  /** Whether this item is complete */
  completed: boolean
  /** Points/weight for this item */
  points?: number
}

export interface ProfileCompletenessProps {
  /** List of completeness items */
  items: ProfileCompletenessItem[]
  /** Visual variant */
  variant?: "linear" | "circular" | "detailed"
  /** Show individual item checklist */
  showChecklist?: boolean
  /** Size variant */
  size?: "small" | "medium" | "large"
  /** Show trophy/achievement when complete */
  showAchievement?: boolean
  /** Custom label */
  label?: string
  /** Show percentage text */
  showPercentage?: boolean
}

/**
 * Calculate completion percentage from items
 */
function calculateCompletion(items: ProfileCompletenessItem[]): number {
  if (items.length === 0) return 0
  
  const totalPoints = items.reduce((sum, item) => sum + (item.points || 1), 0)
  const completedPoints = items
    .filter((item) => item.completed)
    .reduce((sum, item) => sum + (item.points || 1), 0)
  
  return Math.round((completedPoints / totalPoints) * 100)
}

/**
 * Get progress color based on percentage
 */
function getProgressColor(percentage: number, theme: any): string {
  if (percentage === 100) return theme.palette.success.main
  if (percentage >= 75) return theme.palette.primary.main
  if (percentage >= 50) return theme.palette.info.main
  if (percentage >= 25) return theme.palette.warning.main
  return theme.palette.error.main
}

/**
 * ProfileCompleteness component for displaying profile completion progress.
 * Includes gamification elements like achievements and visual progress tracking.
 * 
 * Supports multiple visual variants and can show a detailed checklist of items.
 */
export function ProfileCompleteness({
  items,
  variant = "linear",
  showChecklist = false,
  size = "medium",
  showAchievement = true,
  label = "Profile Completeness",
  showPercentage = true,
}: ProfileCompletenessProps) {
  const theme = useTheme()
  const percentage = calculateCompletion(items)
  const isComplete = percentage === 100
  const progressColor = getProgressColor(percentage, theme)

  // Size mappings
  const sizeConfig = {
    small: { circularSize: 60, thickness: 4, fontSize: "0.75rem" },
    medium: { circularSize: 100, thickness: 5, fontSize: "1rem" },
    large: { circularSize: 140, thickness: 6, fontSize: "1.25rem" },
  }
  const config = sizeConfig[size]

  // Linear progress variant
  const LinearVariant = () => (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, color: theme.palette.text.primary }}
        >
          {label}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {showPercentage && (
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: progressColor,
              }}
            >
              {percentage}%
            </Typography>
          )}
          {showAchievement && isComplete && (
            <Tooltip title="Profile Complete! 🎉">
              <EmojiEvents
                sx={{
                  color: theme.palette.warning.main || "#FFD700",
                  fontSize: 20,
                }}
              />
            </Tooltip>
          )}
        </Box>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: size === "small" ? 6 : size === "medium" ? 8 : 12,
          borderRadius: 4,
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: progressColor,
            borderRadius: 4,
            transition: "transform 0.5s ease-in-out",
          },
        }}
      />
    </Box>
  )

  // Circular progress variant
  const CircularVariant = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        {/* Background circle */}
        <CircularProgress
          variant="determinate"
          value={100}
          size={config.circularSize}
          thickness={config.thickness}
          sx={{
            color:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
          }}
        />
        {/* Progress circle */}
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={config.circularSize}
          thickness={config.thickness}
          sx={{
            color: progressColor,
            position: "absolute",
            left: 0,
            transition: "all 0.5s ease-in-out",
          }}
        />
        {/* Center content */}
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isComplete && showAchievement ? (
            <EmojiEvents
              sx={{
                color: theme.palette.warning.main || "#FFD700",
                fontSize: config.circularSize * 0.4,
              }}
            />
          ) : (
            <>
              {showPercentage && (
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: config.fontSize,
                    color: progressColor,
                    lineHeight: 1,
                  }}
                >
                  {percentage}%
                </Typography>
              )}
            </>
          )}
        </Box>
      </Box>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          color: theme.palette.text.secondary,
          textAlign: "center",
        }}
      >
        {label}
      </Typography>
    </Box>
  )

  // Detailed variant with checklist
  const DetailedVariant = () => (
    <Box>
      <LinearVariant />
      {showChecklist && (
        <Box sx={{ mt: 2 }}>
          {items.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                py: 1,
                borderBottom: `1px solid ${theme.palette.divider}`,
                "&:last-child": {
                  borderBottom: "none",
                },
              }}
            >
              {item.completed ? (
                <CheckCircle
                  sx={{
                    color: theme.palette.success.main,
                    fontSize: 20,
                  }}
                />
              ) : (
                <RadioButtonUnchecked
                  sx={{
                    color: theme.palette.text.disabled,
                    fontSize: 20,
                  }}
                />
              )}
              <Typography
                variant="body2"
                sx={{
                  flex: 1,
                  color: item.completed
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                  textDecoration: item.completed ? "none" : "none",
                }}
              >
                {item.label}
              </Typography>
              {item.points && item.points > 1 && (
                <Chip
                  size="small"
                  label={`+${item.points} pts`}
                  sx={{
                    height: 20,
                    fontSize: "0.7rem",
                    backgroundColor: item.completed
                      ? theme.palette.success.light
                      : theme.palette.action.disabledBackground,
                    color: item.completed
                      ? theme.palette.success.dark
                      : theme.palette.text.disabled,
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )

  // Render based on variant
  switch (variant) {
    case "circular":
      return <CircularVariant />
    case "detailed":
      return <DetailedVariant />
    default:
      return <LinearVariant />
  }
}

export default ProfileCompleteness
