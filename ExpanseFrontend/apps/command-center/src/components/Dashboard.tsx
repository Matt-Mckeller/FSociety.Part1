/**
 * Dashboard - Game-Themed Command Center
 * Your mission control for the entrepreneurial journey
 */
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
  Stack,
} from "@mui/material"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import FlagIcon from "@mui/icons-material/Flag"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
import MapIcon from "@mui/icons-material/Map"
import { HierarchyExplainer } from "./HierarchyExplainer"
import { CorporateVisionCard } from "./CorporateVisionCard"
import { statCardStyles } from "../theme"
import {
  useGameData,
  useXPCalculations,
  useUpcomingCheckpoints,
  useQuestProgress,
} from "../hooks"

export function Dashboard() {
  // Use context hooks instead of direct imports
  const { storylines, quests, getStorylineById } = useGameData()
  const xpData = useXPCalculations()
  const upcomingCheckpoints = useUpcomingCheckpoints(5)

  const activeStorylines = storylines.filter((q) => q.status === "in-progress")
  const activeQuests = quests.filter((q) => q.status === "in-progress")

  // Calculate current quest progress
  const currentQuest = activeQuests[0]
  const currentQuestProgress = useQuestProgress(currentQuest?.id || "")
  const questProgress = currentQuest ? currentQuestProgress.progress : 0

  const StatCard = ({
    label,
    value,
    color,
    subtitle,
  }: {
    label: string
    value: number | string
    color: "primary" | "warning" | "info" | "success"
    subtitle?: string
  }) => {
    const styles = statCardStyles[color]
    return (
      <Card sx={{ bgcolor: styles.bg, border: `1px solid ${styles.accent}20` }}>
        <CardContent>
          <Typography
            variant="overline"
            sx={{ color: styles.text, fontWeight: 600, letterSpacing: 1 }}
          >
            {label}
          </Typography>
          <Typography variant="h2" sx={{ color: styles.accent, mt: 0.5 }}>
            {value}
          </Typography>
          {subtitle && (
            <Typography
              variant="caption"
              sx={{ color: styles.text, opacity: 0.8 }}
            >
              {subtitle}
            </Typography>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Box>
      {/* Corporate Vision Card */}
      <CorporateVisionCard defaultExpanded={false} />

      {/* Quest Hierarchy Guide */}
      <HierarchyExplainer />

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Active Storylines"
            value={activeStorylines.length}
            color="primary"
            subtitle={`${storylines.length} total`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Upcoming Checkpoints"
            value={upcomingCheckpoints.length}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="XP Earned"
            value={xpData.totalXP}
            color="info"
            subtitle={`of ${xpData.potentialXP} possible`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Quest Progress"
            value={`${Math.round(questProgress)}%`}
            color="success"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Current Focus */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <SportsEsportsIcon sx={{ color: "primary.main" }} />
                Current Focus
              </Typography>
              <Typography variant="h5" sx={{ mb: 1, color: "text.primary" }}>
                Fundraising Preparation
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Documenting and preparing primary content, feature descriptions,
                and pitch materials for speaking engagements and funding
                discussions.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip
                  label="Feb 2026 → Mar 2026"
                  size="small"
                  sx={{ bgcolor: "#6B21A820", color: "#6B21A8" }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Checkpoints (formerly Timeline) */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <FlagIcon sx={{ color: "warning.main" }} />
                Upcoming Checkpoints
              </Typography>
              <Stack spacing={2}>
                {upcomingCheckpoints.map((checkpoint) => {
                  const storyline = getStorylineById(
                    checkpoint.storylineId || "",
                  )
                  return (
                    <Box
                      key={checkpoint.id}
                      sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}
                    >
                      <Box
                        sx={{
                          minWidth: 54,
                          textAlign: "center",
                          bgcolor: "primary.main",
                          color: "white",
                          py: 1,
                          px: 1.5,
                          borderRadius: 2,
                        }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          sx={{ fontWeight: 600, opacity: 0.9 }}
                        >
                          {checkpoint.targetDate
                            ? new Date(checkpoint.targetDate)
                                .toLocaleDateString("en-US", { month: "short" })
                                .toUpperCase()
                            : "TBD"}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 700, lineHeight: 1 }}
                        >
                          {checkpoint.targetDate
                            ? new Date(checkpoint.targetDate).getDate()
                            : "--"}
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body1"
                          fontWeight={500}
                          color="text.primary"
                        >
                          {checkpoint.title}
                        </Typography>
                        {storyline && (
                          <Chip
                            label={storyline.name}
                            size="small"
                            sx={{
                              bgcolor: storyline.color,
                              color: "white",
                              mt: 0.5,
                              fontWeight: 600,
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  )
                })}
                {upcomingCheckpoints.length === 0 && (
                  <Typography color="text.secondary">
                    No upcoming checkpoints
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Current Quest */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <TrackChangesIcon sx={{ color: "error.main" }} />
                Current Quest
              </Typography>
              {currentQuest ? (
                <>
                  <Typography
                    variant="h5"
                    sx={{ mb: 1, color: "text.primary" }}
                  >
                    {currentQuest.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {currentQuest.description}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                    <Chip
                      label={`${currentQuest.xpReward} XP`}
                      size="small"
                      color="warning"
                    />
                    {currentQuest.targetDate && (
                      <Chip
                        label={`Due: ${new Date(currentQuest.targetDate).toLocaleDateString()}`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={questProgress}
                    color="primary"
                    sx={{ height: 10, borderRadius: 5, mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {currentQuestProgress.completed} of{" "}
                    {currentQuestProgress.total} objectives complete
                  </Typography>
                </>
              ) : (
                <Typography color="text.secondary">No active quest</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Active Storylines */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <MapIcon sx={{ color: "info.main" }} />
                Active Storylines
              </Typography>
              <Stack spacing={1.5}>
                {activeStorylines.map((storyline) => {
                  const storylineQuests = quests.filter(
                    (q) => q.storylineId === storyline.id,
                  )
                  const completed = storylineQuests.filter(
                    (q) => q.status === "quest-complete",
                  ).length
                  const progress =
                    storylineQuests.length > 0
                      ? (completed / storylineQuests.length) * 100
                      : 0

                  return (
                    <Box
                      key={storyline.id}
                      sx={{
                        p: 2,
                        bgcolor: "#F8FAFC",
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        border: "1px solid #E2E8F0",
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 48,
                          bgcolor: storyline.color || "#6B21A8",
                          borderRadius: 1,
                          flexShrink: 0,
                        }}
                      />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="body1"
                          fontWeight={600}
                          color="text.primary"
                        >
                          {storyline.name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mt: 0.5,
                          }}
                        >
                          <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{ flex: 1, height: 4, borderRadius: 2 }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {Math.round(progress)}%
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label={storyline.priority || "Medium"}
                        size="small"
                        color={
                          storyline.priority === "P1" ? "error" : "default"
                        }
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                  )
                })}
                {activeStorylines.length === 0 && (
                  <Typography color="text.secondary">
                    No active storylines
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
