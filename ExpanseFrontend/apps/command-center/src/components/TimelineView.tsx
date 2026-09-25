import { useState, useMemo } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  alpha,
  LinearProgress,
  Divider,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material"
import { useTimeline, useProjects } from "../contexts"
import type { JourneyEvent } from "../types"
import { SearchInput, FilterBar } from "./common"

// Helper functions for time calculations
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

const getTimeGroup = (date: Date, today: Date): string => {
  const days = getDaysDiff(today, date)
  if (days < 0) return "Overdue"
  if (days === 0) return "Today"
  if (days <= 7) return "This Week"
  if (days <= 14) return "Next Week"
  if (days <= 30) return "This Month"
  return "Later"
}

export function TimelineView() {
  const theme = useTheme()
  const { events: timeline } = useTimeline()
  const { projects } = useProjects()
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const filteredTimeline = useMemo(() => {
    let result = [...timeline]

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(searchLower) ||
          event.description?.toLowerCase().includes(searchLower),
      )
    }

    // Type filter
    if (typeFilter !== "all") {
      result = result.filter((event) => event.type === typeFilter)
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((event) => event.status === statusFilter)
    }

    return result
  }, [timeline, search, typeFilter, statusFilter])

  const sortedTimeline = filteredTimeline.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  )

  // Group events by time period
  const groupedEvents = sortedTimeline.reduce(
    (acc, event) => {
      const eventDate = new Date(event.date)
      const group =
        event.status === "completed"
          ? "Completed"
          : getTimeGroup(eventDate, today)
      if (!acc[group]) acc[group] = []
      acc[group].push(event)
      return acc
    },
    {} as Record<string, JourneyEvent[]>,
  )

  const groupOrder = [
    "Overdue",
    "Today",
    "This Week",
    "Next Week",
    "This Month",
    "Later",
    "Completed",
  ]
  const groupColors: Record<string, string> = {
    Overdue: theme.palette.error.main,
    Today: theme.palette.warning.main,
    "This Week": theme.palette.secondary.main,
    "Next Week": theme.palette.primary.main,
    "This Month": theme.palette.success.main,
    Later: theme.palette.text.secondary,
    Completed: theme.palette.success.main,
  }

  const getStatusColor = (event: JourneyEvent) => {
    if (event.status === "completed") return "success"
    if (event.status === "in-progress") return "warning"
    const eventDate = new Date(event.date)
    if (eventDate < today) return "error"
    return "info"
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "milestone":
        return "🎯"
      case "deadline":
        return "⏰"
      case "goal":
        return "🌟"
      default:
        return "📌"
    }
  }

  return (
    <Box>
      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ py: 2, "&:last-child": { pb: 2 } }}>
          <FilterBar>
            <SearchInput
              value={search}
              onValueChange={setSearch}
              placeholder="Search events..."
              width="md"
            />

            <ToggleButtonGroup
              value={typeFilter}
              exclusive
              onChange={(_, v) => v && setTypeFilter(v)}
              size="small"
            >
              <ToggleButton value="all">All Types</ToggleButton>
              <ToggleButton value="milestone">🎯 Milestone</ToggleButton>
              <ToggleButton value="deadline">⏰ Deadline</ToggleButton>
              <ToggleButton value="goal">🌟 Goal</ToggleButton>
            </ToggleButtonGroup>

            <ToggleButtonGroup
              value={statusFilter}
              exclusive
              onChange={(_, v) => v && setStatusFilter(v)}
              size="small"
            >
              <ToggleButton value="all">All Status</ToggleButton>
              <ToggleButton value="pending">Pending</ToggleButton>
              <ToggleButton value="in-progress">In Progress</ToggleButton>
              <ToggleButton value="completed">Completed</ToggleButton>
            </ToggleButtonGroup>
          </FilterBar>
        </CardContent>
      </Card>

      {/* Current Date Header */}
      <Card
        sx={{
          mb: 3,
          bgcolor: alpha(theme.palette.primary.main, 0.08),
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
                Current Date
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
                  {groupedEvents["This Week"]?.length || 0}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  This Week
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ textAlign: "center", px: 2 }}>
                <Typography variant="h3" color="error.main" fontWeight={700}>
                  {groupedEvents["Overdue"]?.length || 0}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Overdue
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ textAlign: "center", px: 2 }}>
                <Typography variant="h3" color="success.main" fontWeight={700}>
                  {groupedEvents["Completed"]?.length || 0}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Completed
                </Typography>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {/* Grouped Timeline */}
      {groupOrder.map((groupName) => {
        const events = groupedEvents[groupName]
        if (!events || events.length === 0) return null

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
                label={`${events.length} item${events.length > 1 ? "s" : ""}`}
                size="small"
                sx={{
                  bgcolor: alpha(groupColors[groupName], 0.15),
                  color: groupColors[groupName],
                  fontWeight: 600,
                }}
              />
            </Box>

            <Stack spacing={2}>
              {events.map((event, index) => {
                const project = projects.find((p) => p.id === event.projectId)
                const eventDate = new Date(event.date)
                const daysUntil = getDaysDiff(today, eventDate)
                const isPast = eventDate < today
                const isToday =
                  eventDate.toDateString() === today.toDateString()

                // Calculate gap to next event
                const nextEvent = events[index + 1]
                const gapToNext = nextEvent
                  ? getDaysDiff(eventDate, new Date(nextEvent.date))
                  : null

                return (
                  <Box key={event.id}>
                    <Card
                      sx={{
                        opacity: event.status === "completed" ? 0.7 : 1,
                        borderLeft: 4,
                        borderColor: project?.color || groupColors[groupName],
                        bgcolor:
                          event.status === "completed"
                            ? alpha(theme.palette.success.main, 0.02)
                            : event.status === "in-progress"
                              ? alpha(theme.palette.warning.main, 0.02)
                              : isPast
                                ? alpha(theme.palette.error.main, 0.02)
                                : "background.paper",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        },
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: 2,
                          }}
                        >
                          {/* Left: Title and details */}
                          <Box sx={{ flex: 1 }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 1,
                              }}
                            >
                              <Typography
                                variant="h6"
                                fontWeight={600}
                                color="text.primary"
                              >
                                {getTypeIcon(event.type)} {event.title}
                              </Typography>
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                flexWrap: "wrap",
                                mb: 1,
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: isToday ? 700 : 500,
                                  color: "text.secondary",
                                }}
                              >
                                📆{" "}
                                {eventDate.toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </Typography>
                              <Chip
                                label={event.status}
                                size="small"
                                color={getStatusColor(event)}
                                sx={{ fontWeight: 600 }}
                              />
                              <Chip
                                label={event.type}
                                size="small"
                                variant="outlined"
                                sx={{ fontWeight: 500 }}
                              />
                              {project && (
                                <Chip
                                  label={project.name}
                                  size="small"
                                  sx={{
                                    bgcolor: project.color,
                                    color: "white",
                                    fontWeight: 600,
                                  }}
                                />
                              )}
                            </Box>

                            {event.description && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ lineHeight: 1.6 }}
                              >
                                {event.description}
                              </Typography>
                            )}
                          </Box>

                          {/* Right: Days countdown */}
                          <Box
                            sx={{
                              minWidth: 100,
                              textAlign: "center",
                              p: 1.5,
                              borderRadius: 2,
                              bgcolor: alpha(
                                isPast && event.status !== "completed"
                                  ? theme.palette.error.main
                                  : isToday
                                    ? theme.palette.warning.main
                                    : daysUntil <= 7
                                      ? theme.palette.secondary.main
                                      : theme.palette.text.secondary,
                                0.1,
                              ),
                            }}
                          >
                            <Typography
                              variant="h4"
                              fontWeight={700}
                              color={
                                isPast && event.status !== "completed"
                                  ? "error.main"
                                  : isToday
                                    ? "warning.main"
                                    : daysUntil <= 7
                                      ? "info.main"
                                      : "text.secondary"
                              }
                            >
                              {event.status === "completed"
                                ? "✓"
                                : isToday
                                  ? "!"
                                  : Math.abs(daysUntil)}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              fontWeight={500}
                            >
                              {event.status === "completed"
                                ? "Done"
                                : formatDaysUntil(daysUntil)}
                            </Typography>

                            {/* Time progress bar for upcoming events */}
                            {event.status !== "completed" &&
                              !isPast &&
                              daysUntil > 0 &&
                              daysUntil <= 30 && (
                                <Box sx={{ mt: 1 }}>
                                  <LinearProgress
                                    variant="determinate"
                                    value={Math.max(
                                      0,
                                      100 - (daysUntil / 30) * 100,
                                    )}
                                    color={
                                      daysUntil <= 3
                                        ? "error"
                                        : daysUntil <= 7
                                          ? "warning"
                                          : "info"
                                    }
                                    sx={{ height: 4, borderRadius: 2 }}
                                  />
                                </Box>
                              )}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>

                    {/* Gap indicator to next event */}
                    {gapToNext !== null && gapToNext > 0 && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          py: 1,
                          opacity: 0.6,
                        }}
                      >
                        <Box sx={{ flex: 1, height: 1, bgcolor: "divider" }} />
                        <Typography
                          variant="caption"
                          sx={{
                            px: 2,
                            color: "text.secondary",
                            fontWeight: 500,
                          }}
                        >
                          {gapToNext === 1
                            ? "1 day later"
                            : `${gapToNext} days later`}
                        </Typography>
                        <Box sx={{ flex: 1, height: 1, bgcolor: "divider" }} />
                      </Box>
                    )}
                  </Box>
                )
              })}
            </Stack>
          </Box>
        )
      })}
    </Box>
  )
}
