/**
 * JourneyMap - View Checkpoints (formerly Timeline/Milestones)
 * Track progress markers and gates on your journey
 */
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  alpha,
  Divider,
} from "@mui/material"
import { useGameData } from "../hooks"
import type { Checkpoint, CheckpointStatus } from "../types"

const getDaysDiff = (date1: Date, date2: Date): number => {
  const diffTime = date2.getTime() - date1.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const formatDaysUntil = (days: number): string => {
  if (days === 0) return "Today!"
  if (days === 1) return "Tomorrow"
  if (days === -1) return "1 day ago"
  if (days < 0) return `${Math.abs(days)} days ago`
  if (days <= 7) return `${days} days`
  if (days <= 14) return `${Math.ceil(days / 7)} week${days > 7 ? "s" : ""}`
  if (days <= 60) return `${Math.ceil(days / 7)} weeks`
  return `${Math.ceil(days / 30)} months`
}

const getTimeGroup = (
  date: Date,
  today: Date,
  status: CheckpointStatus,
): string => {
  if (status === "reached") return "Reached ✅"
  if (status === "missed") return "Missed ❌"
  const days = getDaysDiff(today, date)
  if (days < 0) return "Overdue"
  if (days === 0) return "Today"
  if (days <= 7) return "This Week"
  if (days <= 14) return "Next Week"
  if (days <= 30) return "This Month"
  return "Later"
}

const statusEmoji: Record<CheckpointStatus, string> = {
  upcoming: "🏁",
  reached: "✅",
  missed: "❌",
}

export function JourneyMap() {
  // Use context hooks instead of direct imports
  const { checkpoints, storylines, campaigns } = useGameData()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const sortedCheckpoints = [...checkpoints]
    .filter((cp) => cp.targetDate) // Filter out checkpoints without dates
    .sort(
      (a, b) =>
        new Date(a.targetDate!).getTime() - new Date(b.targetDate!).getTime(),
    )

  // Group checkpoints by time period
  const groupedCheckpoints = sortedCheckpoints.reduce(
    (acc, checkpoint) => {
      if (!checkpoint.targetDate) return acc // Skip checkpoints without dates
      const checkpointDate = new Date(checkpoint.targetDate)
      const group = getTimeGroup(checkpointDate, today, checkpoint.status)
      if (!acc[group]) acc[group] = []
      acc[group].push(checkpoint)
      return acc
    },
    {} as Record<string, Checkpoint[]>,
  )

  const groupOrder = [
    "Overdue",
    "Today",
    "This Week",
    "Next Week",
    "This Month",
    "Later",
    "Reached ✅",
    "Missed ❌",
  ]
  const groupColors: Record<string, string> = {
    Overdue: "#DC2626",
    Today: "#D97706",
    "This Week": "#0284C7",
    "Next Week": "#6B21A8",
    "This Month": "#059669",
    Later: "#64748B",
    "Reached ✅": "#10B981",
    "Missed ❌": "#EF4444",
  }

  const getStoryline = (id?: string) => storylines.find((s) => s.id === id)
  const getCampaign = (id?: string) => campaigns.find((c) => c.id === id)

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          🗺️ Journey Map
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your checkpoints and progress markers along the journey
        </Typography>
      </Box>

      {/* Current Date Header */}
      <Card
        sx={{
          mb: 3,
          bgcolor: alpha("#6B21A8", 0.08),
          border: "2px solid",
          borderColor: "primary.main",
        }}
      >
        <CardContent sx={{ py: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="overline"
                color="primary.main"
                fontWeight={700}
              >
                Current Position
              </Typography>
              <Typography variant="h4" color="text.primary" fontWeight={700}>
                📅{" "}
                {today.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Box sx={{ textAlign: "center", px: 2 }}>
                <Typography variant="h3" color="primary.main" fontWeight={700}>
                  {groupedCheckpoints["This Week"]?.length || 0}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  This Week
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ textAlign: "center", px: 2 }}>
                <Typography variant="h3" color="error.main" fontWeight={700}>
                  {groupedCheckpoints["Overdue"]?.length || 0}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Overdue
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ textAlign: "center", px: 2 }}>
                <Typography variant="h3" color="success.main" fontWeight={700}>
                  {groupedCheckpoints["Reached ✅"]?.length || 0}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Reached
                </Typography>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {/* Grouped Checkpoints */}
      {groupOrder.map((groupName) => {
        const groupCheckpoints = groupedCheckpoints[groupName]
        if (!groupCheckpoints || groupCheckpoints.length === 0) return null

        return (
          <Box key={groupName} sx={{ mb: 4 }}>
            {/* Group Header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2,
                pb: 1,
                borderBottom: 2,
                borderColor: groupColors[groupName],
              }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: groupColors[groupName],
                }}
              />
              <Typography variant="h5" fontWeight={700} color="text.primary">
                {groupName}
              </Typography>
              <Chip
                label={`${groupCheckpoints.length} checkpoint${groupCheckpoints.length > 1 ? "s" : ""}`}
                size="small"
                sx={{
                  bgcolor: alpha(groupColors[groupName], 0.15),
                  color: groupColors[groupName],
                  fontWeight: 600,
                }}
              />
            </Box>

            {/* Checkpoint Cards */}
            <Stack spacing={2}>
              {groupCheckpoints.map((checkpoint) => {
                if (!checkpoint.targetDate) return null // Skip if no date
                const storyline = getStoryline(checkpoint.storylineId)
                const campaign = getCampaign(checkpoint.campaignId)
                const checkpointDate = new Date(checkpoint.targetDate)
                const daysUntil = getDaysDiff(today, checkpointDate)

                return (
                  <Card
                    key={checkpoint.id}
                    sx={{
                      display: "flex",
                      overflow: "hidden",
                      border:
                        checkpoint.status === "reached"
                          ? "2px solid #10B981"
                          : daysUntil < 0 && checkpoint.status === "upcoming"
                            ? "2px solid #DC2626"
                            : undefined,
                      opacity: checkpoint.status === "reached" ? 0.8 : 1,
                    }}
                  >
                    {/* Date Badge */}
                    <Box
                      sx={{
                        minWidth: 80,
                        bgcolor: alpha(groupColors[groupName], 0.1),
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        py: 2,
                      }}
                    >
                      <Typography
                        variant="overline"
                        sx={{ color: groupColors[groupName], fontWeight: 700 }}
                      >
                        {checkpointDate
                          .toLocaleDateString("en-US", { month: "short" })
                          .toUpperCase()}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          color: groupColors[groupName],
                          fontWeight: 700,
                          lineHeight: 1,
                        }}
                      >
                        {checkpointDate.getDate()}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        {formatDaysUntil(daysUntil)}
                      </Typography>
                    </Box>

                    {/* Content */}
                    <CardContent sx={{ flex: 1, py: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 1,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography sx={{ fontSize: "1.25rem" }}>
                            {statusEmoji[checkpoint.status]}
                          </Typography>
                          <Typography variant="h6" fontWeight={600}>
                            {checkpoint.title}
                          </Typography>
                        </Box>
                        <Chip
                          label={checkpoint.status}
                          size="small"
                          color={
                            checkpoint.status === "reached"
                              ? "success"
                              : checkpoint.status === "missed"
                                ? "error"
                                : "default"
                          }
                          sx={{ fontWeight: 500 }}
                        />
                      </Box>

                      {checkpoint.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1.5 }}
                        >
                          {checkpoint.description}
                        </Typography>
                      )}

                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {storyline && (
                          <Chip
                            label={`🗺️ ${storyline.name}`}
                            size="small"
                            sx={{
                              bgcolor: `${storyline.color}15`,
                              color: storyline.color,
                              fontWeight: 500,
                            }}
                          />
                        )}
                        {campaign && (
                          <Chip
                            label={`⚔️ ${campaign.title}`}
                            size="small"
                            sx={{
                              bgcolor: `${campaign.color}15`,
                              color: campaign.color,
                              fontWeight: 500,
                            }}
                          />
                        )}
                        {checkpoint.category && (
                          <Chip
                            label={checkpoint.category}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                )
              })}
            </Stack>
          </Box>
        )
      })}

      {checkpoints.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No checkpoints yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Checkpoints help you track progress milestones on your journey
          </Typography>
        </Box>
      )}
    </Box>
  )
}
