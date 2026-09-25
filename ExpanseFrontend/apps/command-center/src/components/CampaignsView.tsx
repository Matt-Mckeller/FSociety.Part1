/**
 * CampaignsView - View and manage Campaigns
 * Strategic initiatives spanning your business portfolio
 */
import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  LinearProgress,
  Collapse,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  alpha,
  Button,
  Divider,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  useTheme,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import FlagIcon from "@mui/icons-material/Flag"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import SortIcon from "@mui/icons-material/Sort"

import { SearchInput, FilterBar } from "./common"
import { useGameData } from "../hooks"
import type {
  Campaign,
  CampaignGoal,
  Storyline,
  Quest,
  Objective,
  Checkpoint,
  QuestStatus,
} from "../types"

// Import types from campaigns module
import type {
  StatusFilter,
  CategoryFilter,
  CampaignSortOption,
  ResourceChartSortOption,
} from "./campaigns/types"

// Import shared game constants
import {
  questStatusChipColors as statusColors,
  questStatusLabelsShort as statusLabels,
  priorityColors,
} from "./shared/game-constants"

const VISIBLE_COUNT = 5 // Number of campaigns to show before "Show more"

/**
 * Resource Allocation Chart - Horizontal bar chart with sorting and expand/collapse
 */
function ResourceAllocationChart({ campaigns }: { campaigns: Campaign[] }) {
  const theme = useTheme()
  const [expanded, setExpanded] = useState(false)
  const [sortBy, setSortBy] = useState<ResourceChartSortOption>("allocation")

  const totalAllocation = campaigns.reduce(
    (sum, c) => sum + (c.targetAllocation || 0),
    0,
  )

  // Sort campaigns based on selected option
  const sortedCampaigns = useMemo(() => {
    const sorted = [...campaigns]
    switch (sortBy) {
      case "allocation":
        return sorted.sort(
          (a, b) => (b.targetAllocation || 0) - (a.targetAllocation || 0),
        )
      case "priority":
        return sorted.sort((a, b) => a.priority.localeCompare(b.priority))
      case "alpha":
        return sorted.sort((a, b) => a.title.localeCompare(b.title))
      case "status":
        const statusOrder = [
          "in-progress",
          "not-started",
          "paused",
          "concept",
          "cancelled",
        ]
        return sorted.sort(
          (a, b) =>
            statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status),
        )
      default:
        return sorted
    }
  }, [campaigns, sortBy])

  const visibleCampaigns = expanded
    ? sortedCampaigns
    : sortedCampaigns.slice(0, VISIBLE_COUNT)
  const hiddenCount = sortedCampaigns.length - VISIBLE_COUNT

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Resource Allocation (Target)
            </Typography>
            <Tooltip
              title={
                <Box sx={{ p: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    📊 About Resource Allocation
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ display: "block", mb: 1 }}
                  >
                    These percentages represent target focus areas. In practice,
                    work often overlaps across campaigns.
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ display: "block", mb: 1 }}
                  >
                    Most projects serve as enablers for the core businesses
                    (4Eye, 1Game) while also having potential to become
                    standalone products.
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Example: CommandCenter improves planning for all projects.
                    Lottie components enhance 4Eye and other apps.
                  </Typography>
                </Box>
              }
              arrow
              placement="right"
            >
              <InfoOutlinedIcon
                sx={{ fontSize: 16, color: "text.secondary", cursor: "help" }}
              />
            </Tooltip>
          </Box>
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as ResourceChartSortOption)
              }
              displayEmpty
              sx={{
                fontSize: "0.75rem",
                "& .MuiSelect-select": { py: 0.5, px: 1 },
              }}
              startAdornment={
                <SortIcon
                  sx={{ fontSize: 14, mr: 0.5, color: "text.secondary" }}
                />
              }
            >
              <MenuItem value="allocation">By Allocation</MenuItem>
              <MenuItem value="priority">By Priority</MenuItem>
              <MenuItem value="status">By Status</MenuItem>
              <MenuItem value="alpha">Alphabetical</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Stack spacing={1.5} sx={{ mt: 2 }}>
          {visibleCampaigns.map((campaign) => {
            const allocation = campaign.targetAllocation || 0
            return (
              <Box key={campaign.id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 0.5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {campaign.title}
                    </Typography>
                    {campaign.status === "cancelled" && (
                      <Chip
                        label="Cancelled"
                        size="small"
                        color="error"
                        sx={{ height: 16, fontSize: "0.65rem" }}
                      />
                    )}
                    {campaign.status === "concept" && (
                      <Chip
                        label="Concept"
                        size="small"
                        sx={{ height: 16, fontSize: "0.65rem" }}
                      />
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {allocation}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(allocation / Math.max(totalAllocation, 100)) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: alpha(campaign.color, 0.15),
                    "& .MuiLinearProgress-bar": {
                      bgcolor:
                        campaign.status === "cancelled"
                          ? theme.palette.text.disabled
                          : campaign.color,
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            )
          })}
        </Stack>

        {hiddenCount > 0 && (
          <Button
            size="small"
            onClick={() => setExpanded(!expanded)}
            startIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{ mt: 2, textTransform: "none", color: "text.secondary" }}
          >
            {expanded ? "Show less" : `Show ${hiddenCount} more`}
          </Button>
        )}

        <Box
          sx={{ mt: 2, pt: 1, borderTop: "1px solid", borderColor: "divider" }}
        >
          <Typography variant="caption" color="text.secondary">
            Total: {totalAllocation}%
            {totalAllocation !== 100 && (
              <Typography
                component="span"
                variant="caption"
                color="warning.main"
                sx={{ ml: 1 }}
              >
                (target: 100%)
              </Typography>
            )}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

/**
 * Priority Distribution Chart
 */
function PriorityDistributionChart({ campaigns }: { campaigns: Campaign[] }) {
  const priorityCounts = campaigns.reduce(
    (acc, c) => {
      acc[c.priority] = (acc[c.priority] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const maxCount = Math.max(...Object.values(priorityCounts), 1)

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Priority Distribution
        </Typography>
        <Stack spacing={1.5} sx={{ mt: 2 }}>
          {["P1", "P2", "P3"].map((priority) => {
            const count = priorityCounts[priority] || 0
            return (
              <Box key={priority}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 0.5,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {priority}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {count} campaign{count !== 1 ? "s" : ""}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(count / maxCount) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: alpha(priorityColors[priority], 0.15),
                    "& .MuiLinearProgress-bar": {
                      bgcolor: priorityColors[priority],
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            )
          })}
        </Stack>
      </CardContent>
    </Card>
  )
}

/**
 * Goal Item Component - displays a single goal with status indicator
 */
function GoalItem({
  goal,
  color,
  storylines,
}: {
  goal: CampaignGoal
  color: string
  storylines: Storyline[]
}) {
  const theme = useTheme()
  const statusIcon =
    goal.status === "achieved" ? (
      <CheckCircleIcon
        sx={{ fontSize: 16, color: theme.palette.success.main }}
      />
    ) : goal.status === "in-progress" ? (
      <RadioButtonUncheckedIcon sx={{ fontSize: 16, color }} />
    ) : (
      <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
    )

  // Get linked storyline names if any
  const linkedStorylines = goal.storylineIds
    ? storylines
        .filter((s) => goal.storylineIds?.includes(s.id))
        .map((s) => s.name)
    : []

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1,
        p: 1,
        bgcolor: "background.paper",
        borderRadius: 1,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {statusIcon}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="body2"
          sx={{
            textDecoration:
              goal.status === "achieved" ? "line-through" : "none",
            color:
              goal.status === "achieved" ? "text.secondary" : "text.primary",
          }}
        >
          {goal.description}
        </Typography>
        {linkedStorylines.length > 0 && (
          <Typography variant="caption" color="text.secondary">
            → {linkedStorylines.join(", ")}
          </Typography>
        )}
      </Box>
      {goal.status === "in-progress" && (
        <Chip
          label="Active"
          size="small"
          sx={{
            height: 18,
            fontSize: "0.65rem",
            bgcolor: alpha(color, 0.15),
            color: color,
          }}
        />
      )}
    </Box>
  )
}

/**
 * Campaign Card Component
 */
function CampaignCard({
  campaign,
  onStorylineClick,
  storylines,
  quests,
  objectives,
  checkpoints,
}: {
  campaign: Campaign
  onStorylineClick: (id: string) => void
  storylines: Storyline[]
  quests: Quest[]
  objectives: Objective[]
  checkpoints: Checkpoint[]
}) {
  const theme = useTheme()
  const [expanded, setExpanded] = useState(false)

  // Get storylines for this campaign
  const campaignStorylines = storylines.filter((s) =>
    campaign.storylineIds?.includes(s.id),
  )

  // Get all quests for this campaign's storylines
  const campaignQuests = quests.filter((q) =>
    campaignStorylines.some((s) => s.id === q.storylineId),
  )

  // Get all objectives for this campaign
  const campaignObjectives = objectives.filter((o) =>
    campaignQuests.some((q) => q.id === o.questId),
  )

  // Get checkpoints for this campaign
  const campaignCheckpoints = checkpoints.filter((cp) =>
    campaignStorylines.some((s) => s.id === cp.storylineId),
  )

  // Calculate progress
  const completedQuests = campaignQuests.filter(
    (q) => q.status === "quest-complete",
  ).length
  const questProgress =
    campaignQuests.length > 0
      ? (completedQuests / campaignQuests.length) * 100
      : 0

  // Calculate XP
  const earnedXP = campaignQuests
    .filter((q) => q.status === "quest-complete")
    .reduce((sum, q) => sum + (q.xpReward || 0), 0)
  const totalXP = campaignQuests.reduce((sum, q) => sum + (q.xpReward || 0), 0)

  // Find top priority quest (in-progress P1 first, then not-started P1, etc.)
  const topPriorityQuest = [...campaignQuests]
    .sort((a, b) => {
      const statusOrder: Record<QuestStatus, number> = {
        "in-progress": 0,
        "not-started": 1,
        blocked: 2,
        paused: 3,
        "quest-complete": 4,
        cancelled: 5,
        concept: 6,
      }
      const priorityOrder = { P1: 0, P2: 1, P3: 2 }
      return (
        statusOrder[a.status] - statusOrder[b.status] ||
        priorityOrder[a.priority] - priorityOrder[b.priority]
      )
    })
    .find((q) => q.status !== "quest-complete")

  // Upcoming checkpoints
  const upcomingCheckpoints = campaignCheckpoints
    .filter((cp) => cp.status === "upcoming")
    .slice(0, 3)

  return (
    <Card
      sx={{
        borderLeft: 6,
        borderColor: campaign.color,
        opacity: campaign.status === "paused" ? 0.75 : 1,
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "0 8px 25px -5px rgb(0 0 0 / 0.15)",
        },
      }}
    >
      <CardContent>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {campaign.category === "business" ? "🎯" : "🌟"}{" "}
                {campaign.title}
              </Typography>
            </Box>
            <Typography color="text.secondary" variant="body2">
              {campaign.description}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Chip
              label={campaign.priority}
              size="small"
              sx={{
                bgcolor: alpha(priorityColors[campaign.priority], 0.15),
                color: priorityColors[campaign.priority],
                fontWeight: 700,
              }}
            />
            <Chip
              label={statusLabels[campaign.status]}
              size="small"
              color={statusColors[campaign.status]}
              variant="outlined"
              sx={{ fontWeight: 500 }}
            />
          </Stack>
        </Box>

        {/* Current Status Description */}
        {campaign.currentStatusDescription && (
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              mb: 2,
              p: 1.5,
              bgcolor: alpha(campaign.color, 0.05),
              borderRadius: 1,
              borderLeft: 3,
              borderColor: campaign.color,
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "text.secondary" }}
            >
              📍 {campaign.currentStatusDescription}
            </Typography>
          </Box>
        )}

        {/* Storyline Chips */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mb: 0.5 }}
          >
            Storylines
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {campaignStorylines.map((storyline) => (
              <Chip
                key={storyline.id}
                label={storyline.name}
                size="small"
                onClick={() => onStorylineClick(storyline.id)}
                sx={{
                  bgcolor: alpha(storyline.color, 0.15),
                  color: storyline.color,
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: alpha(storyline.color, 0.25),
                  },
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Top Priority */}
        {topPriorityQuest && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 1.5,
              bgcolor: alpha(campaign.color, 0.08),
              borderRadius: 2,
              mb: 2,
            }}
          >
            <FlagIcon
              sx={{
                color: priorityColors[topPriorityQuest.priority],
                fontSize: 18,
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Top Priority:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              "{topPriorityQuest.title}" -{" "}
              {statusLabels[topPriorityQuest.status]}
            </Typography>
          </Box>
        )}

        {/* Progress Bar */}
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="body2" color="text.secondary">
              Quest Progress
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {Math.round(questProgress)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={questProgress}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: alpha(campaign.color, 0.15),
              "& .MuiLinearProgress-bar": {
                bgcolor: campaign.color,
                borderRadius: 4,
              },
            }}
          />
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}
          >
            <Typography variant="caption" color="text.secondary">
              {completedQuests} / {campaignQuests.length} quests
            </Typography>
            <Typography variant="caption" color="text.secondary">
              XP: {earnedXP.toLocaleString()} / {totalXP.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        {/* Date Info */}
        <Typography variant="caption" color="text.secondary">
          Started: {new Date(campaign.startDate).toLocaleDateString()} | Target:{" "}
          {campaign.targetDate
            ? new Date(campaign.targetDate).toLocaleDateString()
            : "Ongoing"}
        </Typography>

        {/* Expand Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <Button
            size="small"
            onClick={() => setExpanded(!expanded)}
            endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{ textTransform: "none" }}
          >
            {expanded ? "Collapse" : "Expand"}
          </Button>
        </Box>
      </CardContent>

      {/* Expanded Content */}
      <Collapse in={expanded}>
        <Divider />
        <CardContent sx={{ bgcolor: alpha(campaign.color, 0.02) }}>
          {/* Campaign Goals Section */}
          {campaign.goals && campaign.goals.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
                🎯 Campaign Goals
              </Typography>
              <Stack spacing={2}>
                {/* Short-term goals */}
                {campaign.goals.filter((g) => g.timeframe === "short").length >
                  0 && (
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.success.main,
                        display: "block",
                        mb: 0.5,
                      }}
                    >
                      Short-term (This Quarter)
                    </Typography>
                    <Stack spacing={0.5}>
                      {campaign.goals
                        .filter((g) => g.timeframe === "short")
                        .map((goal) => (
                          <GoalItem
                            key={goal.id}
                            goal={goal}
                            color={theme.palette.success.main}
                            storylines={storylines}
                          />
                        ))}
                    </Stack>
                  </Box>
                )}
                {/* Medium-term goals */}
                {campaign.goals.filter((g) => g.timeframe === "medium").length >
                  0 && (
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.info.main,
                        display: "block",
                        mb: 0.5,
                      }}
                    >
                      Medium-term (This Year)
                    </Typography>
                    <Stack spacing={0.5}>
                      {campaign.goals
                        .filter((g) => g.timeframe === "medium")
                        .map((goal) => (
                          <GoalItem
                            key={goal.id}
                            goal={goal}
                            color={theme.palette.info.main}
                            storylines={storylines}
                          />
                        ))}
                    </Stack>
                  </Box>
                )}
                {/* Long-term goals */}
                {campaign.goals.filter((g) => g.timeframe === "long").length >
                  0 && (
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        display: "block",
                        mb: 0.5,
                      }}
                    >
                      Long-term Vision
                    </Typography>
                    <Stack spacing={0.5}>
                      {campaign.goals
                        .filter((g) => g.timeframe === "long")
                        .map((goal) => (
                          <GoalItem
                            key={goal.id}
                            goal={goal}
                            color={theme.palette.primary.main}
                            storylines={storylines}
                          />
                        ))}
                    </Stack>
                  </Box>
                )}
              </Stack>
            </Box>
          )}

          {/* Storylines Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
              📖 Storylines
            </Typography>
            <Grid container spacing={2}>
              {campaignStorylines.map((storyline) => {
                const storylineQuests = campaignQuests.filter(
                  (q) => q.storylineId === storyline.id,
                )
                return (
                  <Grid item xs={12} sm={6} md={4} key={storyline.id}>
                    <Card
                      variant="outlined"
                      onClick={() => onStorylineClick(storyline.id)}
                      sx={{
                        borderTop: 3,
                        borderColor: storyline.color,
                        cursor: "pointer",
                        transition: "all 0.15s",
                        "&:hover": {
                          boxShadow: 2,
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <CardContent
                        sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600 }}
                        >
                          {storyline.name}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                          <Chip
                            label={statusLabels[storyline.status]}
                            size="small"
                            color={statusColors[storyline.status]}
                            sx={{ fontSize: "0.65rem", height: 20 }}
                          />
                          <Chip
                            label={storyline.priority}
                            size="small"
                            sx={{
                              fontSize: "0.65rem",
                              height: 20,
                              bgcolor: alpha(
                                priorityColors[storyline.priority],
                                0.15,
                              ),
                              color: priorityColors[storyline.priority],
                            }}
                          />
                        </Stack>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block", mt: 0.5 }}
                        >
                          {storylineQuests.length} quest
                          {storylineQuests.length !== 1 ? "s" : ""}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          </Box>

          {/* Key Objectives Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
              🎯 Key Objectives
            </Typography>
            {campaignQuests.filter((q) => q.status === "in-progress").length >
            0 ? (
              <Stack spacing={1}>
                {campaignQuests
                  .filter((q) => q.status === "in-progress")
                  .slice(0, 3)
                  .map((quest) => {
                    const questObjs = campaignObjectives.filter(
                      (o) => o.questId === quest.id,
                    )
                    const remaining = questObjs.filter(
                      (o) => o.status !== "done",
                    ).length
                    return (
                      <Box
                        key={quest.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          p: 1,
                          bgcolor: "background.paper",
                          borderRadius: 1,
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <RadioButtonUncheckedIcon
                          sx={{ fontSize: 18, color: "text.disabled" }}
                        />
                        <Typography variant="body2">{quest.title}</Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ ml: "auto" }}
                        >
                          {remaining} objective{remaining !== 1 ? "s" : ""}{" "}
                          remaining
                        </Typography>
                      </Box>
                    )
                  })}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No active quests
              </Typography>
            )}
          </Box>

          {/* Upcoming Checkpoints */}
          {upcomingCheckpoints.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
                📅 Upcoming Checkpoints
              </Typography>
              <Stack spacing={1}>
                {upcomingCheckpoints.map((checkpoint) => (
                  <Box
                    key={checkpoint.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      p: 1,
                      bgcolor: "background.paper",
                      borderRadius: 1,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <CheckCircleIcon
                      sx={{ fontSize: 18, color: "text.disabled" }}
                    />
                    <Typography variant="body2">{checkpoint.title}</Typography>
                    {checkpoint.targetDate && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ ml: "auto" }}
                      >
                        {new Date(checkpoint.targetDate).toLocaleDateString()}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          {/* View Documentation Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              size="small"
              endIcon={<OpenInNewIcon />}
              disabled
              sx={{ textTransform: "none" }}
            >
              View Full Documentation
            </Button>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  )
}

/**
 * Main CampaignsView Component
 */
export function CampaignsView() {
  // Use context hooks instead of direct imports
  const { campaigns, storylines, quests, objectives, checkpoints } =
    useGameData()
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all")
  const [sortBy, setSortBy] = useState<CampaignSortOption>("priority")

  const filteredCampaigns = useMemo(() => {
    let result = [...campaigns]

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(searchLower) ||
          c.description.toLowerCase().includes(searchLower),
      )
    }

    // Status filter
    if (statusFilter === "active") {
      result = result.filter((c) => c.status === "in-progress")
    } else if (statusFilter === "paused") {
      result = result.filter(
        (c) => c.status === "paused" || c.status === "not-started",
      )
    }

    // Category filter
    if (categoryFilter !== "all") {
      result = result.filter((c) => c.category === categoryFilter)
    }

    // Sort based on selected option
    const statusOrder: Record<string, number> = {
      "in-progress": 0,
      "not-started": 1,
      blocked: 2,
      paused: 3,
      concept: 4,
      "quest-complete": 5,
      cancelled: 6,
    }
    const priorityOrder: Record<string, number> = { P1: 0, P2: 1, P3: 2, P4: 3 }

    switch (sortBy) {
      case "priority":
        result.sort(
          (a, b) =>
            priorityOrder[a.priority] - priorityOrder[b.priority] ||
            statusOrder[a.status] - statusOrder[b.status],
        )
        break
      case "status":
        result.sort(
          (a, b) =>
            statusOrder[a.status] - statusOrder[b.status] ||
            priorityOrder[a.priority] - priorityOrder[b.priority],
        )
        break
      case "allocation":
        result.sort(
          (a, b) => (b.targetAllocation || 0) - (a.targetAllocation || 0),
        )
        break
      case "alpha":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "progress":
        // Calculate progress for each campaign
        result.sort((a, b) => {
          const getProgress = (campaign: Campaign) => {
            const campaignStorylines = storylines.filter((s) =>
              campaign.storylineIds?.includes(s.id),
            )
            const campaignQuests = quests.filter((q) =>
              campaignStorylines.some((s) => s.id === q.storylineId),
            )
            if (campaignQuests.length === 0) return 0
            const completed = campaignQuests.filter(
              (q) => q.status === "quest-complete",
            ).length
            return (completed / campaignQuests.length) * 100
          }
          return getProgress(b) - getProgress(a)
        })
        break
    }

    return result
  }, [search, statusFilter, categoryFilter, sortBy])

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          ⚔️ Campaigns
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Strategic initiatives spanning your business portfolio
        </Typography>
      </Box>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <ResourceAllocationChart campaigns={campaigns} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PriorityDistributionChart campaigns={campaigns} />
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ py: 2, "&:last-child": { pb: 2 } }}>
          <FilterBar>
            <SearchInput
              value={search}
              onValueChange={setSearch}
              placeholder="Search campaigns..."
              width="md"
            />

            <ToggleButtonGroup
              value={statusFilter}
              exclusive
              onChange={(_, v) => v && setStatusFilter(v)}
              size="small"
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="active">Active</ToggleButton>
              <ToggleButton value="paused">Paused</ToggleButton>
            </ToggleButtonGroup>

            <ToggleButtonGroup
              value={categoryFilter}
              exclusive
              onChange={(_, v) => v && setCategoryFilter(v)}
              size="small"
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="business">Business</ToggleButton>
              <ToggleButton value="personal">Personal</ToggleButton>
            </ToggleButtonGroup>

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as CampaignSortOption)
                }
                displayEmpty
                sx={{
                  fontSize: "0.875rem",
                  "& .MuiSelect-select": {
                    py: 0.75,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  },
                }}
                startAdornment={
                  <SortIcon
                    sx={{ fontSize: 18, mr: 0.5, color: "text.secondary" }}
                  />
                }
              >
                <MenuItem value="priority">Priority</MenuItem>
                <MenuItem value="status">Status</MenuItem>
                <MenuItem value="allocation">Allocation</MenuItem>
                <MenuItem value="progress">Progress</MenuItem>
                <MenuItem value="alpha">A-Z</MenuItem>
              </Select>
            </FormControl>
          </FilterBar>
        </CardContent>
      </Card>

      {/* Campaign Cards */}
      <Stack spacing={3}>
        {filteredCampaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onStorylineClick={(id) => navigate(`/missions/storylines/${id}`)}
            storylines={storylines}
            quests={quests}
            objectives={objectives}
            checkpoints={checkpoints}
          />
        ))}
        {filteredCampaigns.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography color="text.secondary">
              No campaigns match your filters
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  )
}
