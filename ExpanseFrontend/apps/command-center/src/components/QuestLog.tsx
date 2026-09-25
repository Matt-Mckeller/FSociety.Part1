/**
 * QuestLog - View and manage Quests (formerly Goals)
 * Track major deliverables and their progress
 */
import { useState, useMemo, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  LinearProgress,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Button,
  alpha,
} from "@mui/material"
import GridViewIcon from "@mui/icons-material/GridView"
import ViewKanbanIcon from "@mui/icons-material/ViewKanban"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import FlagIcon from "@mui/icons-material/Flag"
import WarningIcon from "@mui/icons-material/Warning"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"

import { useGameData } from "../hooks"
import type { Quest, QuestStatus } from "../types"

// Import from quest-log module
import { getDaysUntil } from "./quest-log"

// Import shared UI components
import { SearchInput, FilterBar } from "./common"

// Import shared game constants
import {
  questStatusChipColors as statusColors,
  questStatusLabels as statusLabels,
  objectiveStatusChipColors as objectiveStatusColors,
  objectiveStatusLabels,
  getProgressColor,
} from "./shared/game-constants"

export function QuestLog() {
  // Use context hooks instead of direct imports
  const { quests, objectives, storylines, campaigns } = useGameData()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  // Get filters from URL params
  const storylineFromUrl = searchParams.get("storyline") || "all"
  const questFromUrl = searchParams.get("quest")

  const [search, setSearch] = useState("")
  const [campaignFilter, setCampaignFilter] = useState<string>("all")
  const [storylineFilter, setStorylineFilter] =
    useState<string>(storylineFromUrl)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("targetDate")
  const [viewMode, setViewMode] = useState<"grid" | "kanban">("grid")
  const [expandedQuests, setExpandedQuests] = useState<Set<string>>(new Set())

  // Auto-expand quest if specified in URL
  useEffect(() => {
    if (questFromUrl) {
      setExpandedQuests(new Set([questFromUrl]))
    }
  }, [questFromUrl])

  // Helper: Calculate quest progress
  const getQuestProgress = (questId: string) => {
    const questObjectives = objectives.filter((o) => o.questId === questId)
    const completed = questObjectives.filter((o) => o.status === "done").length
    const total = questObjectives.length

    return {
      completed,
      total,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0,
      isComplete: completed === total && total > 0,
    }
  }

  // Update URL when storyline filter changes
  const handleStorylineFilterChange = (value: string) => {
    setStorylineFilter(value)
    if (value === "all") {
      searchParams.delete("storyline")
    } else {
      searchParams.set("storyline", value)
    }
    searchParams.delete("quest")
    setSearchParams(searchParams)
  }

  const toggleExpanded = (questId: string) => {
    setExpandedQuests((prev) => {
      const next = new Set(prev)
      if (next.has(questId)) {
        next.delete(questId)
      } else {
        next.add(questId)
      }
      return next
    })
  }

  // Navigate to objectives filtered by quest
  const handleViewObjectives = (questId: string) => {
    navigate(`/missions/objectives?quest=${questId}`)
  }

  // Navigate to storyline
  const handleStorylineClick = (_storylineId: string) => {
    navigate(`/missions/storylines`)
  }

  const filteredQuests = useMemo(() => {
    let result = [...quests]

    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (q) =>
          q.title.toLowerCase().includes(searchLower) ||
          q.description.toLowerCase().includes(searchLower),
      )
    }

    if (campaignFilter !== "all") {
      // Filter by storylines that belong to this campaign
      const campaign = campaigns.find((c) => c.id === campaignFilter)
      if (campaign) {
        result = result.filter((q) =>
          campaign.storylineIds?.includes(q.storylineId),
        )
      }
    }

    if (storylineFilter !== "all") {
      result = result.filter((q) => q.storylineId === storylineFilter)
    }

    if (statusFilter !== "all") {
      result = result.filter((q) => q.status === statusFilter)
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "targetDate":
          return (
            new Date(a.targetDate || "9999-12-31").getTime() -
            new Date(b.targetDate || "9999-12-31").getTime()
          )
        case "progress": {
          const progressA = getQuestProgress(a.id).percent
          const progressB = getQuestProgress(b.id).percent
          return progressA - progressB
        }
        case "xp":
          return (b.xpReward || 0) - (a.xpReward || 0)
        default:
          return 0
      }
    })

    return result
  }, [search, campaignFilter, storylineFilter, statusFilter, sortBy])

  const getStoryline = (storylineId: string) =>
    storylines.find((s) => s.id === storylineId)
  const getQuestObjectives = (questId: string) =>
    objectives.filter((o) => o.questId === questId)

  const renderQuestCard = (quest: Quest) => {
    const storyline = getStoryline(quest.storylineId)
    const progress = getQuestProgress(quest.id)
    const daysUntil = getDaysUntil(quest.targetDate)
    const isExpanded = expandedQuests.has(quest.id)
    const questObjectives = getQuestObjectives(quest.id)
    const isOverdue = daysUntil < 0 && quest.status !== "quest-complete"
    const isAtRisk =
      daysUntil <= 7 &&
      daysUntil >= 0 &&
      progress.percent < 50 &&
      quest.status !== "quest-complete"

    return (
      <Card
        key={quest.id}
        sx={{
          height: "auto",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.2s ease",
          border: isOverdue
            ? "2px solid #EF4444"
            : isAtRisk
              ? "2px solid #F59E0B"
              : undefined,
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px -5px rgb(0 0 0 / 0.15)",
          },
        }}
      >
        <CardContent
          sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 1,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 0.5, lineHeight: 1.3 }}
              >
                {quest.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.5 }}
              >
                {quest.description}
              </Typography>
            </Box>
            <Chip
              label={statusLabels[quest.status]}
              size="small"
              color={statusColors[quest.status]}
              sx={{ fontWeight: 500 }}
            />
          </Box>

          {/* Badges */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {storyline && (
              <Chip
                label={`📖 ${storyline.name}`}
                size="small"
                onClick={() => handleStorylineClick(storyline.id)}
                sx={{
                  bgcolor: alpha(storyline.color, 0.15),
                  color: storyline.color,
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: alpha(storyline.color, 0.25),
                  },
                }}
              />
            )}
            {quest.xpReward && (
              <Chip
                label={`✨ ${quest.xpReward} XP`}
                size="small"
                sx={{
                  bgcolor: "#FEF3C7",
                  color: "#D97706",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                }}
              />
            )}
          </Box>

          {/* Progress Bar */}
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 0.5,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Progress: {progress.completed}/{progress.total} objectives
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  color: getProgressColor(progress.percent),
                }}
              >
                {progress.percent}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress.percent}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: "grey.200",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                  bgcolor: getProgressColor(progress.percent),
                },
              }}
            />
          </Box>

          {/* Target Date */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FlagIcon sx={{ fontSize: 18, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              Target:{" "}
              {quest.targetDate
                ? new Date(quest.targetDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "No date set"}
            </Typography>
            {isOverdue && (
              <Chip
                icon={<WarningIcon sx={{ fontSize: 14 }} />}
                label={`${Math.abs(daysUntil)} days overdue`}
                size="small"
                sx={{
                  bgcolor: "#FEE2E2",
                  color: "#DC2626",
                  fontWeight: 500,
                  fontSize: "0.7rem",
                }}
              />
            )}
            {!isOverdue &&
              daysUntil <= 7 &&
              quest.status !== "quest-complete" && (
                <Chip
                  label={
                    daysUntil === 0 ? "Due today!" : `${daysUntil} days left`
                  }
                  size="small"
                  sx={{
                    bgcolor: daysUntil <= 3 ? "#FEF3C7" : "#DBEAFE",
                    color: daysUntil <= 3 ? "#D97706" : "#2563EB",
                    fontWeight: 500,
                    fontSize: "0.7rem",
                  }}
                />
              )}
            {isAtRisk && (
              <Chip
                icon={<WarningIcon sx={{ fontSize: 14 }} />}
                label="At Risk"
                size="small"
                sx={{
                  bgcolor: "#FEF3C7",
                  color: "#D97706",
                  fontWeight: 500,
                  fontSize: "0.7rem",
                }}
              />
            )}
          </Box>

          {/* Expand/Collapse */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton size="small" onClick={() => toggleExpanded(quest.id)}>
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>

          {/* Expanded Content */}
          <Collapse in={isExpanded}>
            <Divider sx={{ my: 1 }} />

            {/* Success Criteria */}
            {quest.successCriteria && quest.successCriteria.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mb: 1, color: "text.secondary" }}
                >
                  Success Criteria
                </Typography>
                <List dense disablePadding>
                  {quest.successCriteria.map((criteria, idx) => (
                    <ListItem key={idx} disablePadding sx={{ py: 0.25 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <RadioButtonUncheckedIcon
                          sx={{ fontSize: 16, color: "text.disabled" }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={criteria}
                        primaryTypographyProps={{ variant: "body2" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* Linked Objectives */}
            {questObjectives.length > 0 && (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, color: "text.secondary" }}
                  >
                    Objectives ({questObjectives.length})
                  </Typography>
                  <Button
                    size="small"
                    endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
                    onClick={() => handleViewObjectives(quest.id)}
                    sx={{ textTransform: "none", fontSize: "0.75rem" }}
                  >
                    View All
                  </Button>
                </Box>
                <List dense disablePadding>
                  {questObjectives.slice(0, 5).map((objective) => (
                    <ListItem
                      key={objective.id}
                      disablePadding
                      sx={{
                        py: 0.5,
                        cursor: "pointer",
                        borderRadius: 1,
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                      }}
                      onClick={() =>
                        navigate(
                          `/missions/objectives?objective=${objective.id}`,
                        )
                      }
                    >
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        {objective.status === "done" ? (
                          <CheckCircleIcon
                            sx={{ fontSize: 16, color: "success.main" }}
                          />
                        ) : (
                          <RadioButtonUncheckedIcon
                            sx={{ fontSize: 16, color: "text.disabled" }}
                          />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                textDecoration:
                                  objective.status === "done"
                                    ? "line-through"
                                    : "none",
                                color:
                                  objective.status === "done"
                                    ? "text.disabled"
                                    : "text.primary",
                              }}
                            >
                              {objective.title}
                            </Typography>
                            {objective.xpReward && (
                              <Typography
                                variant="caption"
                                sx={{ color: "#D97706" }}
                              >
                                +{objective.xpReward} XP
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                      <Chip
                        label={objectiveStatusLabels[objective.status]}
                        size="small"
                        color={objectiveStatusColors[objective.status]}
                        sx={{ fontSize: "0.65rem", height: 20 }}
                      />
                    </ListItem>
                  ))}
                  {questObjectives.length > 5 && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ pl: 3.5, display: "block", mt: 1 }}
                    >
                      +{questObjectives.length - 5} more objectives...
                    </Typography>
                  )}
                </List>
              </Box>
            )}
          </Collapse>
        </CardContent>
      </Card>
    )
  }

  const renderKanbanView = () => {
    const columns: QuestStatus[] = [
      "not-started",
      "in-progress",
      "blocked",
      "quest-complete",
    ]
    const columnLabels: Record<string, string> = {
      "not-started": "📋 Not Started",
      "in-progress": "⚔️ In Progress",
      blocked: "🚫 Blocked",
      "quest-complete": "🏆 Quest Complete",
    }

    return (
      <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 2 }}>
        {columns.map((status) => {
          const columnQuests = filteredQuests.filter((q) => q.status === status)
          return (
            <Paper
              key={status}
              elevation={0}
              sx={{
                minWidth: 320,
                maxWidth: 320,
                bgcolor: "grey.50",
                borderRadius: 2,
                p: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {columnLabels[status]}
                </Typography>
                <Chip label={columnQuests.length} size="small" />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {columnQuests.map((quest) => renderQuestCard(quest))}
                {columnQuests.length === 0 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: "center", py: 4 }}
                  >
                    No quests
                  </Typography>
                )}
              </Box>
            </Paper>
          )
        })}
      </Box>
    )
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          ⚔️ Quest Log
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your active quests and their progress toward completion
        </Typography>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <FilterBar>
            <SearchInput
              value={search}
              onValueChange={setSearch}
              placeholder="Search quests..."
            />

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Campaign</InputLabel>
              <Select
                value={campaignFilter}
                label="Campaign"
                onChange={(e) => setCampaignFilter(e.target.value)}
              >
                <MenuItem value="all">All Campaigns</MenuItem>
                {campaigns.map((campaign) => (
                  <MenuItem key={campaign.id} value={campaign.id}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor: campaign.color,
                        }}
                      />
                      {campaign.title}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Storyline</InputLabel>
              <Select
                value={storylineFilter}
                label="Storyline"
                onChange={(e) => handleStorylineFilterChange(e.target.value)}
              >
                <MenuItem value="all">All Storylines</MenuItem>
                {storylines.map((storyline) => (
                  <MenuItem key={storyline.id} value={storyline.id}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor: storyline.color,
                        }}
                      />
                      {storyline.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="not-started">Not Started</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="quest-complete">Quest Complete</MenuItem>
                <MenuItem value="blocked">Blocked</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortBy}
                label="Sort by"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="targetDate">Target Date</MenuItem>
                <MenuItem value="progress">Progress</MenuItem>
                <MenuItem value="xp">XP Reward</MenuItem>
              </Select>
            </FormControl>

            <Box
              sx={{ ml: "auto", display: "flex", gap: 1, alignItems: "center" }}
            >
              {(campaignFilter !== "all" ||
                storylineFilter !== "all" ||
                statusFilter !== "all" ||
                search) && (
                <Button
                  size="small"
                  onClick={() => {
                    setSearch("")
                    setCampaignFilter("all")
                    setStorylineFilter("all")
                    setStatusFilter("all")
                    searchParams.delete("storyline")
                    searchParams.delete("quest")
                    setSearchParams(searchParams)
                  }}
                  sx={{ textTransform: "none" }}
                >
                  Clear Filters
                </Button>
              )}
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(_, v) => v && setViewMode(v)}
                size="small"
              >
                <ToggleButton value="grid">
                  <GridViewIcon sx={{ fontSize: 20 }} />
                </ToggleButton>
                <ToggleButton value="kanban">
                  <ViewKanbanIcon sx={{ fontSize: 20 }} />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </FilterBar>
        </CardContent>
      </Card>

      {/* XP Summary */}
      <Box sx={{ mb: 2, display: "flex", gap: 2, alignItems: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredQuests.length} of {quests.length} quests
        </Typography>
        <Chip
          label={`✨ ${filteredQuests.reduce((sum, q) => sum + (q.xpReward || 0), 0)} total XP available`}
          size="small"
          sx={{ bgcolor: "#FEF3C7", color: "#D97706", fontWeight: 600 }}
        />
      </Box>

      {/* Content */}
      {viewMode === "grid" ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {filteredQuests.map((quest) => renderQuestCard(quest))}
        </Box>
      ) : (
        renderKanbanView()
      )}

      {filteredQuests.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No quests match your filters
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filter criteria
          </Typography>
        </Box>
      )}
    </Box>
  )
}
