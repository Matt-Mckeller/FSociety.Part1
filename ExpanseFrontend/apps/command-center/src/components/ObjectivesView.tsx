/**
 * ObjectivesView - Manage Objectives (formerly Tasks)
 * Track specific work items with XP rewards
 */
import { useState, useMemo, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  alpha,
  LinearProgress,
  Button,
} from "@mui/material"
import { useGameData } from "../hooks"
import type { Objective, ObjectiveStatus } from "../types"

// Import shared UI components
import { SearchInput, FilterBar } from "./common"

type SortOption = "priority" | "dueDate" | "storyline" | "status" | "xp"
type ViewMode = "list" | "hierarchy"

const getDaysDiff = (date1: Date, date2: Date): number => {
  const diffTime = date2.getTime() - date1.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const priorityOrder = { P1: 1, P2: 2, P3: 3 }
const statusOrder: Record<ObjectiveStatus, number> = {
  "in-progress": 1,
  todo: 2,
  blocked: 3,
  done: 4,
}

const statusColors: Record<
  ObjectiveStatus,
  "default" | "warning" | "success" | "error"
> = {
  todo: "default",
  "in-progress": "warning",
  done: "success",
  blocked: "error",
}

const statusLabels: Record<ObjectiveStatus, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Complete",
  blocked: "Blocked",
}

export function ObjectivesView() {
  // Use context hooks instead of direct imports
  const { objectives, quests, storylines } = useGameData()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  // Get filters from URL params
  const questFromUrl = searchParams.get("quest") || "all"
  const objectiveFromUrl = searchParams.get("objective")

  const [filterStoryline, setFilterStoryline] = useState<string>("all")
  const [filterQuest, setFilterQuest] = useState<string>(questFromUrl)
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [sortBy, setSortBy] = useState<SortOption>("priority")
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [highlightedObjective, setHighlightedObjective] = useState<
    string | null
  >(objectiveFromUrl)

  // Update filter when URL changes
  useEffect(() => {
    if (questFromUrl !== "all") {
      setFilterQuest(questFromUrl)
    }
  }, [questFromUrl])

  // Clear highlight after a short time
  useEffect(() => {
    if (highlightedObjective) {
      const timer = setTimeout(() => setHighlightedObjective(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [highlightedObjective])

  // Update URL when quest filter changes
  const handleQuestFilterChange = (value: string) => {
    setFilterQuest(value)
    if (value === "all") {
      searchParams.delete("quest")
    } else {
      searchParams.set("quest", value)
    }
    searchParams.delete("objective")
    setSearchParams(searchParams)
  }

  // Navigate to quest
  const handleQuestClick = (questId: string) => {
    navigate(`/missions/quests?quest=${questId}`)
  }

  // Navigate to storyline
  const handleStorylineClick = (_storylineId: string) => {
    navigate(`/missions/storylines`)
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const filteredObjectives = useMemo(() => {
    let result = [...objectives]

    if (filterStoryline !== "all") {
      result = result.filter((o) => o.questlineId === filterStoryline)
    }
    if (filterQuest !== "all") {
      result = result.filter((o) => o.questId === filterQuest)
    }
    if (filterPriority !== "all") {
      result = result.filter((o) => o.priority === filterPriority)
    }
    if (filterStatus !== "all") {
      result = result.filter((o) => o.status === filterStatus)
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (o) =>
          o.title.toLowerCase().includes(query) ||
          o.description?.toLowerCase().includes(query) ||
          o.tags?.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "priority":
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        case "status":
          return statusOrder[a.status] - statusOrder[b.status]
        case "dueDate":
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        case "storyline":
          return (a.questlineId || "").localeCompare(b.questlineId || "")
        case "xp":
          return (b.xpReward || 0) - (a.xpReward || 0)
        default:
          return 0
      }
    })

    return result
  }, [
    filterStoryline,
    filterQuest,
    filterPriority,
    filterStatus,
    sortBy,
    searchQuery,
  ])

  // Check if any filters are active
  const hasActiveFilters =
    filterStoryline !== "all" ||
    filterQuest !== "all" ||
    filterPriority !== "all" ||
    filterStatus !== "all" ||
    searchQuery !== ""

  // Clear all filters
  const clearFilters = () => {
    setFilterStoryline("all")
    setFilterQuest("all")
    setFilterPriority("all")
    setFilterStatus("all")
    setSearchQuery("")
    setSearchParams({})
  }

  // Calculate XP stats
  const completedXP = filteredObjectives
    .filter((o) => o.status === "done")
    .reduce((sum, o) => sum + (o.xpReward || 0), 0)
  const totalXP = filteredObjectives.reduce(
    (sum, o) => sum + (o.xpReward || 0),
    0,
  )

  const ObjectiveCard = ({
    objective,
    isHighlighted,
  }: {
    objective: Objective
    isHighlighted?: boolean
  }) => {
    const storyline = storylines.find((s) => s.id === objective.questlineId)
    const quest = quests.find((q) => q.id === objective.questId)
    const dueDate = objective.dueDate ? new Date(objective.dueDate) : null
    const daysUntil = dueDate ? getDaysDiff(today, dueDate) : null
    const isOverdue = dueDate && dueDate < today && objective.status !== "done"

    return (
      <Card
        sx={{
          borderLeft: 4,
          borderColor: storyline?.color || "primary.main",
          opacity: objective.status === "done" ? 0.6 : 1,
          bgcolor:
            objective.status === "blocked"
              ? alpha("#DC2626", 0.03)
              : isOverdue
                ? alpha("#DC2626", 0.02)
                : "background.paper",
          ...(isHighlighted && {
            boxShadow: "0 0 0 2px #3B82F6",
            animation: "pulse 1s ease-in-out 3",
          }),
        }}
      >
        <CardContent sx={{ py: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Typography
                  variant="body1"
                  fontWeight={600}
                  sx={{
                    textDecoration:
                      objective.status === "done" ? "line-through" : "none",
                    color:
                      objective.status === "done"
                        ? "text.secondary"
                        : "text.primary",
                  }}
                >
                  {objective.title}
                </Typography>
              </Box>

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                sx={{ mb: 1 }}
              >
                <Chip
                  label={objective.priority}
                  size="small"
                  color={
                    objective.priority === "P1"
                      ? "error"
                      : objective.priority === "P2"
                        ? "warning"
                        : "default"
                  }
                  sx={{ fontWeight: 700, minWidth: 36 }}
                />
                <Chip
                  label={statusLabels[objective.status]}
                  size="small"
                  color={statusColors[objective.status]}
                  sx={{ fontWeight: 500 }}
                />
                {objective.xpReward && (
                  <Chip
                    label={`✨ ${objective.xpReward} XP`}
                    size="small"
                    sx={{
                      bgcolor: "#FEF3C7",
                      color: "#D97706",
                      fontWeight: 600,
                    }}
                  />
                )}
                {objective.complexity && (
                  <Chip
                    label={`⚡ ${objective.complexity} pts`}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 500 }}
                  />
                )}
              </Stack>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {storyline && (
                  <Chip
                    label={`🗺️ ${storyline.name}`}
                    size="small"
                    clickable
                    onClick={() => handleStorylineClick(storyline.id)}
                    sx={{
                      bgcolor: `${storyline.color}15`,
                      color: storyline.color,
                      fontWeight: 500,
                      "&:hover": { bgcolor: `${storyline.color}25` },
                    }}
                  />
                )}
                {quest && (
                  <Chip
                    label={`⚔️ ${quest.title}`}
                    size="small"
                    variant="outlined"
                    clickable
                    onClick={() => handleQuestClick(quest.id)}
                    sx={{
                      fontWeight: 500,
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  />
                )}
              </Stack>
            </Box>

            <Box sx={{ textAlign: "right", minWidth: 90 }}>
              {dueDate && (
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: isOverdue
                      ? alpha("#DC2626", 0.1)
                      : daysUntil !== null && daysUntil <= 3
                        ? alpha("#F59E0B", 0.1)
                        : "grey.100",
                  }}
                >
                  <Typography
                    variant="caption"
                    fontWeight={600}
                    sx={{
                      color: isOverdue
                        ? "error.main"
                        : daysUntil !== null && daysUntil <= 3
                          ? "warning.dark"
                          : "text.secondary",
                    }}
                  >
                    {daysUntil === 0
                      ? "TODAY"
                      : daysUntil === 1
                        ? "Tomorrow"
                        : isOverdue
                          ? `${Math.abs(daysUntil!)} days ago`
                          : `${daysUntil} days`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {dueDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {objective.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {objective.description}
            </Typography>
          )}

          {objective.tags && objective.tags.length > 0 && (
            <Stack
              direction="row"
              spacing={0.5}
              sx={{ mt: 1 }}
              flexWrap="wrap"
              useFlexGap
            >
              {objective.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: "0.7rem", height: 20 }}
                />
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>
    )
  }

  const renderHierarchyView = () => {
    // Group by storyline
    const grouped = storylines
      .map((storyline) => ({
        storyline,
        objectives: filteredObjectives.filter(
          (o) => o.questlineId === storyline.id,
        ),
      }))
      .filter((g) => g.objectives.length > 0)

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {grouped.map(({ storyline, objectives: storylineObjectives }) => {
          const completed = storylineObjectives.filter(
            (o) => o.status === "done",
          ).length
          const progress = (completed / storylineObjectives.length) * 100

          return (
            <Box key={storyline.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                  pb: 1,
                  borderBottom: 2,
                  borderColor: storyline.color,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ cursor: "pointer", "&:hover": { opacity: 0.8 } }}
                  onClick={() => handleStorylineClick(storyline.id)}
                >
                  🗺️ {storyline.name}
                </Typography>
                <Chip
                  label={`${storylineObjectives.length} objectives`}
                  size="small"
                />
                <Box sx={{ flex: 1, ml: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: alpha(storyline.color, 0.2),
                      "& .MuiLinearProgress-bar": { bgcolor: storyline.color },
                    }}
                  />
                </Box>
                <Typography variant="body2" fontWeight={600}>
                  {Math.round(progress)}%
                </Typography>
              </Box>
              <Grid container spacing={2}>
                {storylineObjectives.map((objective) => (
                  <Grid item xs={12} md={6} lg={4} key={objective.id}>
                    <ObjectiveCard
                      objective={objective}
                      isHighlighted={objective.id === highlightedObjective}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
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
          🎯 Objectives
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your objectives and earn XP as you complete them
        </Typography>
      </Box>

      {/* XP Summary */}
      <Card
        sx={{
          mb: 3,
          bgcolor: alpha("#FEF3C7", 0.3),
          border: "1px solid #FCD34D",
        }}
      >
        <CardContent sx={{ py: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Typography sx={{ fontSize: "2rem" }}>✨</Typography>
            <Box>
              <Typography variant="overline" color="text.secondary">
                XP Earned
              </Typography>
              <Typography variant="h4" fontWeight={700} color="#D97706">
                {completedXP}{" "}
                <Typography
                  component="span"
                  variant="body1"
                  color="text.secondary"
                >
                  / {totalXP} XP
                </Typography>
              </Typography>
            </Box>
            <Box sx={{ flex: 1, ml: 2 }}>
              <LinearProgress
                variant="determinate"
                value={totalXP > 0 ? (completedXP / totalXP) * 100 : 0}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  bgcolor: alpha("#D97706", 0.2),
                  "& .MuiLinearProgress-bar": {
                    bgcolor: "#D97706",
                    borderRadius: 6,
                  },
                }}
              />
            </Box>
            <Typography variant="h5" fontWeight={700} color="#D97706">
              {totalXP > 0 ? Math.round((completedXP / totalXP) * 100) : 0}%
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <FilterBar>
            <SearchInput
              value={searchQuery}
              onValueChange={setSearchQuery}
              placeholder="Search objectives..."
            />

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Storyline</InputLabel>
              <Select
                value={filterStoryline}
                label="Storyline"
                onChange={(e) => setFilterStoryline(e.target.value)}
              >
                <MenuItem value="all">All Storylines</MenuItem>
                {storylines.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor: s.color,
                        }}
                      />
                      {s.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Quest</InputLabel>
              <Select
                value={filterQuest}
                label="Quest"
                onChange={(e) => handleQuestFilterChange(e.target.value)}
              >
                <MenuItem value="all">All Quests</MenuItem>
                {quests.map((q) => (
                  <MenuItem key={q.id} value={q.id}>
                    {q.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={filterPriority}
                label="Priority"
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="P1">P1</MenuItem>
                <MenuItem value="P2">P2</MenuItem>
                <MenuItem value="P3">P3</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="done">Done</MenuItem>
                <MenuItem value="blocked">Blocked</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Sort</InputLabel>
              <Select
                value={sortBy}
                label="Sort"
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <MenuItem value="priority">Priority</MenuItem>
                <MenuItem value="dueDate">Due Date</MenuItem>
                <MenuItem value="status">Status</MenuItem>
                <MenuItem value="xp">XP Reward</MenuItem>
              </Select>
            </FormControl>

            {hasActiveFilters && (
              <Button
                variant="outlined"
                size="small"
                onClick={clearFilters}
                sx={{ minWidth: 100 }}
              >
                Clear Filters
              </Button>
            )}

            <Box sx={{ ml: "auto" }}>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(_, v) => v && setViewMode(v)}
                size="small"
              >
                <ToggleButton value="list">List</ToggleButton>
                <ToggleButton value="hierarchy">Hierarchy</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </FilterBar>
        </CardContent>
      </Card>

      {/* Results count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing {filteredObjectives.length} of {objectives.length} objectives
      </Typography>

      {/* Content */}
      {viewMode === "list" ? (
        <Grid container spacing={2}>
          {filteredObjectives.map((objective) => (
            <Grid item xs={12} md={6} lg={4} key={objective.id}>
              <ObjectiveCard
                objective={objective}
                isHighlighted={objective.id === highlightedObjective}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        renderHierarchyView()
      )}

      {filteredObjectives.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No objectives match your filters
          </Typography>
        </Box>
      )}
    </Box>
  )
}
