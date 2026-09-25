/**
 * FocusCard - Simple view card for a Strategic Focus
 * Shows key information at a glance
 */
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  LinearProgress,
  Tooltip,
  alpha,
} from "@mui/material"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat"
import type { StrategicFocus, Campaign } from "../../types"

export interface FocusCardProps {
  focus: StrategicFocus
  campaigns?: Campaign[]
  onClick?: () => void
}

const factorColors = {
  low: "#10B981",
  medium: "#F59E0B",
  high: "#EF4444",
  critical: "#DC2626",
  favorable: "#10B981",
  neutral: "#6B7280",
  unfavorable: "#EF4444",
}

const factorLabels = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
  favorable: "Favorable",
  neutral: "Neutral",
  unfavorable: "Unfavorable",
}

export function FocusCard({ focus, onClick }: FocusCardProps) {
  // Calculate trend
  const trend = focus.previousWeight
    ? focus.currentWeight > focus.previousWeight
      ? "up"
      : focus.currentWeight < focus.previousWeight
        ? "down"
        : "flat"
    : "flat"

  // Get top problem (highest severity)
  const topProblem = [...focus.problems]
    .filter((p) => p.isActive)
    .sort((a, b) => b.severity - a.severity)[0]

  // Get primary goal (short-term, in-progress or not-started)
  const primaryGoal =
    focus.goals
      .filter((g) => g.timeframe === "short")
      .sort((a, b) => {
        if (a.status === "in-progress") return -1
        if (b.status === "in-progress") return 1
        return 0
      })[0] || focus.goals[0]

  // Get current strategy
  const currentStrategy = focus.strategies.find(
    (s) => s.id === focus.currentStrategyId,
  )

  const TrendIcon =
    trend === "up"
      ? TrendingUpIcon
      : trend === "down"
        ? TrendingDownIcon
        : TrendingFlatIcon
  const trendColor =
    trend === "up" ? "#EF4444" : trend === "down" ? "#10B981" : "#6B7280"

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "0 8px 25px -5px rgb(0 0 0 / 0.15)",
          transform: "translateY(-2px)",
        },
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography sx={{ fontSize: "1.75rem" }}>{focus.icon}</Typography>
            <Typography variant="h6" fontWeight={700} color="text.primary">
              {focus.name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography variant="h5" fontWeight={800} color="text.primary">
              {focus.currentWeight}
            </Typography>
            <Tooltip
              title={`${trend === "up" ? "Increased" : trend === "down" ? "Decreased" : "Unchanged"} from ${focus.previousWeight || focus.currentWeight}`}
            >
              <TrendIcon sx={{ fontSize: 20, color: trendColor }} />
            </Tooltip>
          </Box>
        </Box>

        {/* Weight Bar */}
        <Box sx={{ mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={focus.currentWeight}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: alpha("#6366F1", 0.1),
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                bgcolor:
                  focus.currentWeight > 60
                    ? "#EF4444"
                    : focus.currentWeight > 40
                      ? "#F59E0B"
                      : "#10B981",
              },
            }}
          />
        </Box>

        {/* Factor Badges */}
        <Stack
          direction="row"
          spacing={0.5}
          sx={{ mb: 2, flexWrap: "wrap", gap: 0.5 }}
        >
          <Chip
            label={`Urgency: ${factorLabels[focus.weightFactors.urgency]}`}
            size="small"
            sx={{
              bgcolor: alpha(factorColors[focus.weightFactors.urgency], 0.15),
              color: factorColors[focus.weightFactors.urgency],
              fontWeight: 600,
              fontSize: "0.7rem",
            }}
          />
          <Chip
            label={`Importance: ${factorLabels[focus.weightFactors.importance]}`}
            size="small"
            sx={{
              bgcolor: alpha(
                factorColors[focus.weightFactors.importance],
                0.15,
              ),
              color: factorColors[focus.weightFactors.importance],
              fontWeight: 600,
              fontSize: "0.7rem",
            }}
          />
        </Stack>

        {/* Counts */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {focus.problems.filter((p) => p.isActive).length} problems ·{" "}
          {focus.goals.length} goals · {focus.strategies.length} strategies
        </Typography>

        {/* Top Problem */}
        {topProblem && (
          <Box
            sx={{
              mb: 1.5,
              p: 1.5,
              bgcolor: alpha("#EF4444", 0.05),
              borderRadius: 1,
              borderLeft: 3,
              borderColor: "#EF4444",
            }}
          >
            <Typography variant="caption" color="error.main" fontWeight={600}>
              TOP PROBLEM ({topProblem.severity}/10)
            </Typography>
            <Typography variant="body2" color="text.primary" fontWeight={500}>
              {topProblem.title}
            </Typography>
          </Box>
        )}

        {/* Primary Goal */}
        {primaryGoal && (
          <Box
            sx={{
              mb: 1.5,
              p: 1.5,
              bgcolor: alpha("#10B981", 0.05),
              borderRadius: 1,
              borderLeft: 3,
              borderColor: "#10B981",
            }}
          >
            <Typography variant="caption" color="success.main" fontWeight={600}>
              PRIMARY GOAL ({primaryGoal.timeframe.toUpperCase()})
            </Typography>
            <Typography variant="body2" color="text.primary" fontWeight={500}>
              {primaryGoal.title}
            </Typography>
          </Box>
        )}

        {/* Current Strategy */}
        {(currentStrategy || focus.currentStrategyNotes) && (
          <Box
            sx={{
              mt: "auto",
              p: 1.5,
              bgcolor: alpha("#6366F1", 0.05),
              borderRadius: 1,
              borderLeft: 3,
              borderColor: "#6366F1",
            }}
          >
            <Typography variant="caption" color="primary.main" fontWeight={600}>
              STRATEGY
            </Typography>
            <Typography variant="body2" color="text.primary" fontWeight={500}>
              {focus.currentStrategyNotes || currentStrategy?.title}
            </Typography>
          </Box>
        )}

        {/* Expand Button */}
        {/* TODO: Implement expand functionality
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Tooltip title="Expand details">
            <IconButton size="small" onClick={(e) => { e.stopPropagation(); onExpand(); }}>
              <ExpandMoreIcon />
            </IconButton>
          </Tooltip>
        </Box>
        */}
      </CardContent>
    </Card>
  )
}
