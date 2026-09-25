import { useState, useMemo } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Alert,
  alpha,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  ButtonGroup,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tabs,
  Tab,
  useTheme,
} from "@mui/material"
import BusinessIcon from "@mui/icons-material/Business"
import PersonIcon from "@mui/icons-material/Person"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ZoomInIcon from "@mui/icons-material/ZoomIn"
import ZoomOutIcon from "@mui/icons-material/ZoomOut"
import TodayIcon from "@mui/icons-material/Today"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import TimelineIcon from "@mui/icons-material/Timeline"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CancelIcon from "@mui/icons-material/Cancel"
import WarningIcon from "@mui/icons-material/Warning"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import LinkIcon from "@mui/icons-material/Link"

// Import data from context (centralized source)
import {
  roadmapData,
  decisionsData,
  businessValueData,
} from "../contexts/RoadmapContext"
import type {
  Roadmap,
  RoadmapMilestoneStatus,
  Decision,
  BusinessValue,
  DecisionCategory,
  RoadmapProject,
} from "../types"

// Import utilities and constants from roadmap module
import {
  type ZoomLevel,
  type CategoryFilter,
  type RoadmapSubView,
  ZOOM_LEVELS,
  categoryColors,
  categoryIcons,
  confidenceColors,
  synergyStrengthColors,
} from "./roadmap/constants"
import {
  getProjectColor,
  getProjectName,
  getStatusColor,
  getStatusLabel,
  getFeatureStatusIcon,
  getPriorityColor,
  getStageInfo,
  getEffortDisplay,
  SynergyArrow,
  getCellWidth,
  generateMonths,
  getMonthIndex,
  getDatePosition,
  generateDays,
} from "./roadmap/utils"

const roadmap = roadmapData as Roadmap
const decisions = decisionsData.decisions as Decision[]
const businessValues = businessValueData.businessValues as BusinessValue[]
const roadmapProjects = (roadmapData as Roadmap).projects || []

// Release Cards Timeline Component
function ReleaseCardsTimeline({
  projects,
  categoryFilter,
}: {
  projects: RoadmapProject[]
  categoryFilter: CategoryFilter
}) {
  const theme = useTheme()
  const [expandedRelease, setExpandedRelease] = useState<string | null>(null)

  // Get all releases from filtered projects
  const allReleases = useMemo(() => {
    const filteredProjects =
      categoryFilter === "all"
        ? projects
        : projects.filter((p) => p.category === categoryFilter)

    return filteredProjects
      .flatMap((project) =>
        project.releases.map((release) => ({
          ...release,
          project,
          features: project.features.filter((f) =>
            release.linkedFeatures?.includes(f.id),
          ),
        })),
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [projects, categoryFilter])

  // Calculate days until release
  const getDaysUntil = (dateStr: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const releaseDate = new Date(dateStr)
    return Math.ceil(
      (releaseDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    )
  }

  // Group releases by time period
  const { upcoming, past } = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return {
      upcoming: allReleases.filter((r) => new Date(r.date) >= today),
      past: allReleases.filter((r) => new Date(r.date) < today),
    }
  }, [allReleases])

  if (allReleases.length === 0) {
    return (
      <Alert severity="info" sx={{ mb: 3 }}>
        No releases found. Add releases to your projects in roadmap.json
      </Alert>
    )
  }

  return (
    <Box sx={{ mb: 4 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Typography variant="h6" fontWeight={600}>
          🚀 Release Timeline
        </Typography>
        <Chip
          label={`${upcoming.length} upcoming`}
          size="small"
          sx={{
            bgcolor: alpha(theme.palette.info.main, 0.1),
            color: theme.palette.info.main,
          }}
        />
        {past.length > 0 && (
          <Chip
            label={`${past.length} launched`}
            size="small"
            sx={{
              bgcolor: alpha(theme.palette.success.main, 0.1),
              color: theme.palette.success.main,
            }}
          />
        )}
      </Box>

      {/* Timeline Track */}
      <Box sx={{ position: "relative", mb: 3 }}>
        {/* Horizontal line */}
        <Box
          sx={{
            position: "absolute",
            top: 80,
            left: 0,
            right: 0,
            height: 4,
            bgcolor: alpha(theme.palette.primary.main, 0.2),
            borderRadius: 2,
            zIndex: 0,
          }}
        />

        {/* Today marker */}
        <Box
          sx={{
            position: "absolute",
            top: 60,
            left: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 5,
          }}
        >
          <Typography variant="caption" fontWeight={700} color="primary">
            TODAY
          </Typography>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: theme.palette.primary.main,
              border: "3px solid #fff",
              boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
              mt: 0.5,
            }}
          />
        </Box>

        {/* Release Cards */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            pl: 8,
            overflowX: "auto",
            pb: 2,
            pt: 1,
          }}
        >
          {upcoming.map((release) => {
            const daysUntil = getDaysUntil(release.date)
            const stageInfo = getStageInfo(release.stage)
            const effortInfo = getEffortDisplay(release.effort)
            const isExpanded = expandedRelease === release.id
            const completedFeatures = release.features.filter(
              (f) => f.status === "completed",
            ).length
            const totalFeatures = release.features.length

            return (
              <Card
                key={release.id}
                sx={{
                  minWidth: isExpanded ? 400 : 280,
                  maxWidth: isExpanded ? 500 : 280,
                  flexShrink: 0,
                  border: "2px solid",
                  borderColor:
                    daysUntil <= 3
                      ? theme.palette.error.main
                      : alpha(release.project.color, 0.3),
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: release.project.color,
                    transform: "translateY(-2px)",
                    boxShadow: 3,
                  },
                }}
                onClick={() =>
                  setExpandedRelease(isExpanded ? null : release.id)
                }
              >
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  {/* Header */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1,
                      mb: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: release.project.color,
                        mt: 0.5,
                        flexShrink: 0,
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={700}>
                        {release.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {release.project.name}
                      </Typography>
                    </Box>
                    <Chip
                      label={
                        daysUntil === 0
                          ? "Today"
                          : daysUntil === 1
                            ? "Tomorrow"
                            : `${daysUntil}d`
                      }
                      size="small"
                      sx={{
                        height: 22,
                        fontWeight: 700,
                        bgcolor:
                          daysUntil <= 3
                            ? theme.palette.error.main
                            : daysUntil <= 7
                              ? theme.palette.warning.main
                              : theme.palette.text.secondary,
                        color: "#fff",
                      }}
                    />
                  </Box>

                  {/* Stage & Progress */}
                  <Box sx={{ mb: 1.5 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 0.5,
                      }}
                    >
                      <Typography variant="caption">
                        {stageInfo.icon} {stageInfo.label}
                      </Typography>
                      {release.stageProgress !== undefined && (
                        <Typography variant="caption" color="text.secondary">
                          ({release.stageProgress}%)
                        </Typography>
                      )}
                      {effortInfo.bars > 0 && (
                        <Box sx={{ display: "flex", gap: 0.25, ml: "auto" }}>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Box
                              key={i}
                              sx={{
                                width: 4,
                                height: 12,
                                bgcolor:
                                  i <= effortInfo.bars
                                    ? release.project.color
                                    : alpha(theme.palette.text.secondary, 0.2),
                                borderRadius: 0.5,
                              }}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                    <Box
                      sx={{
                        height: 6,
                        bgcolor: alpha(stageInfo.color, 0.2),
                        borderRadius: 3,
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          width: `${release.stageProgress || stageInfo.progress}%`,
                          bgcolor: stageInfo.color,
                          borderRadius: 3,
                          transition: "width 0.3s",
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Date & Features count */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      📅{" "}
                      {new Date(release.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                    {totalFeatures > 0 && (
                      <Typography variant="caption" color="text.secondary">
                        {completedFeatures}/{totalFeatures} features
                      </Typography>
                    )}
                  </Box>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <Box
                      sx={{
                        mt: 2,
                        pt: 2,
                        borderTop: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      {/* Focus Area */}
                      {release.focusArea && (
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                          >
                            FOCUS AREA
                          </Typography>
                          <Typography variant="body2">
                            {release.focusArea}
                          </Typography>
                        </Box>
                      )}

                      {/* Value Highlights */}
                      {release.valueHighlights &&
                        release.valueHighlights.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              fontWeight={600}
                            >
                              VALUE FOR USERS
                            </Typography>
                            <Box sx={{ mt: 0.5 }}>
                              {release.valueHighlights.map((highlight, i) => (
                                <Box
                                  key={i}
                                  sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 0.5,
                                    mb: 0.5,
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    sx={{ color: theme.palette.success.main }}
                                  >
                                    ✓
                                  </Typography>
                                  <Typography variant="body2">
                                    {highlight}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                          </Box>
                        )}

                      {/* Rationale */}
                      {release.rationale && (
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                          >
                            WHY NOW?
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontStyle: "italic" }}
                          >
                            {release.rationale}
                          </Typography>
                        </Box>
                      )}

                      {/* Features */}
                      {release.features.length > 0 && (
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                          >
                            FEATURES ({completedFeatures}/{totalFeatures})
                          </Typography>
                          <Box sx={{ mt: 0.5 }}>
                            {release.features.map((feature) => (
                              <Box
                                key={feature.id}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  py: 0.5,
                                }}
                              >
                                {getFeatureStatusIcon(feature.status)}
                                <Typography
                                  variant="body2"
                                  sx={{
                                    flex: 1,
                                    textDecoration:
                                      feature.status === "completed"
                                        ? "line-through"
                                        : "none",
                                    color:
                                      feature.status === "completed"
                                        ? "text.secondary"
                                        : "text.primary",
                                  }}
                                >
                                  {feature.title}
                                </Typography>
                                <Chip
                                  label={feature.priority}
                                  size="small"
                                  sx={{
                                    height: 18,
                                    fontSize: "0.6rem",
                                    bgcolor: getPriorityColor(feature.priority)
                                      .bg,
                                    color: getPriorityColor(feature.priority)
                                      .text,
                                  }}
                                />
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      )}
                    </Box>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </Box>
      </Box>

      {/* Past Releases (Collapsed) */}
      {past.length > 0 && (
        <Accordion sx={{ bgcolor: alpha(theme.palette.success.main, 0.05) }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body2" fontWeight={600}>
              🎉 Past Releases ({past.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {past.map((release) => (
                <Chip
                  key={release.id}
                  label={`${release.title} • ${release.project.name}`}
                  size="small"
                  sx={{
                    bgcolor: alpha(release.project.color, 0.1),
                    color: release.project.color,
                  }}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  )
}

// Sprint View Component
function SprintView({
  roadmapProjects,
  categoryFilter,
  setCategoryFilter,
}: {
  roadmapProjects: RoadmapProject[]
  categoryFilter: CategoryFilter
  setCategoryFilter: (filter: CategoryFilter) => void
}) {
  const theme = useTheme()
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set(
      roadmapProjects.filter((p) => p.category === "business").map((p) => p.id),
    ),
  )
  const days = useMemo(() => generateDays(3), [])

  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) => {
      const next = new Set(prev)
      if (next.has(projectId)) {
        next.delete(projectId)
      } else {
        next.add(projectId)
      }
      return next
    })
  }

  const filteredProjects = useMemo(() => {
    if (categoryFilter === "all") return roadmapProjects
    return roadmapProjects.filter((p) => p.category === categoryFilter)
  }, [roadmapProjects, categoryFilter])

  // Get releases for a specific day
  const getReleasesForDay = (project: RoadmapProject, dayKey: string) => {
    return project.releases.filter((r) => r.date === dayKey)
  }

  const DAY_WIDTH = 90

  // Calculate stats
  const allReleases = filteredProjects.flatMap((p) => p.releases)
  const upcomingReleases = allReleases
    .filter((r) => {
      const releaseDate = new Date(r.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return releaseDate >= today
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const nextRelease = upcomingReleases[0]
  const daysUntilNext = nextRelease
    ? Math.ceil(
        (new Date(nextRelease.date).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : null

  const totalFeatures = filteredProjects.reduce(
    (acc, p) => acc + p.features.length,
    0,
  )
  const completedFeatures = filteredProjects.reduce(
    (acc, p) => acc + p.features.filter((f) => f.status === "completed").length,
    0,
  )
  const inProgressFeatures = filteredProjects.reduce(
    (acc, p) =>
      acc + p.features.filter((f) => f.status === "in-progress").length,
    0,
  )

  return (
    <Box>
      {/* Quick Stats */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        {nextRelease && (
          <Card sx={{ flex: "1 1 200px", minWidth: 200 }}>
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
              <Typography variant="caption" color="text.secondary">
                Next Release
              </Typography>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                🚀 {nextRelease.title}
              </Typography>
              <Typography
                variant="body2"
                color={
                  daysUntilNext && daysUntilNext <= 3
                    ? "error.main"
                    : "text.secondary"
                }
              >
                {daysUntilNext === 0
                  ? "Today!"
                  : daysUntilNext === 1
                    ? "Tomorrow"
                    : `${daysUntilNext} days`}
                {" • "}
                {new Date(nextRelease.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </Typography>
            </CardContent>
          </Card>
        )}
        <Card sx={{ flex: "1 1 150px", minWidth: 150 }}>
          <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
            <Typography variant="caption" color="text.secondary">
              Features
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {completedFeatures}/{totalFeatures}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {inProgressFeatures} in progress
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: "1 1 150px", minWidth: 150 }}>
          <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
            <Typography variant="caption" color="text.secondary">
              Upcoming
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {upcomingReleases.length} releases
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Next 3 weeks
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Category Filter */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Next 3 weeks • {filteredProjects.length} projects •{" "}
          {filteredProjects.reduce((acc, p) => acc + p.releases.length, 0)}{" "}
          releases
        </Typography>
        <ToggleButtonGroup
          value={categoryFilter}
          exclusive
          onChange={(_, value) => value && setCategoryFilter(value)}
          size="small"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="business">
            <BusinessIcon sx={{ mr: 0.5, fontSize: 18 }} />
            Business
          </ToggleButton>
          <ToggleButton value="personal">
            <PersonIcon sx={{ mr: 0.5, fontSize: 18 }} />
            Personal
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Sprint Grid */}
      <Card sx={{ overflow: "auto" }}>
        <CardContent sx={{ p: 0 }}>
          {/* Day Headers */}
          <Box
            sx={{
              display: "flex",
              borderBottom: "2px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              position: "sticky",
              top: 0,
              zIndex: 20,
            }}
          >
            <Box
              sx={{
                width: 200,
                minWidth: 200,
                p: 2,
                fontWeight: 600,
                borderRight: "1px solid",
                borderColor: "divider",
              }}
            >
              Project
            </Box>
            {days.map((day) => (
              <Box
                key={day.key}
                sx={{
                  width: DAY_WIDTH,
                  minWidth: DAY_WIDTH,
                  p: 1,
                  textAlign: "center",
                  borderRight: "1px solid",
                  borderColor: "divider",
                  bgcolor: day.isToday
                    ? alpha(theme.palette.primary.main, 0.2)
                    : day.isWeekend
                      ? alpha(theme.palette.text.secondary, 0.05)
                      : "transparent",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: day.isToday ? 700 : 500,
                    color: day.isToday ? "primary.main" : "text.secondary",
                    display: "block",
                  }}
                >
                  {day.dayOfWeek}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: day.isToday ? 700 : 400,
                    color: day.isToday ? "primary.main" : "text.primary",
                  }}
                >
                  {day.label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Project Rows */}
          {filteredProjects.map((project) => {
            const isExpanded = expandedProjects.has(project.id)
            const completedFeatures = project.features.filter(
              (f) => f.status === "completed",
            ).length
            const totalFeatures = project.features.length
            const progressPercent =
              totalFeatures > 0 ? (completedFeatures / totalFeatures) * 100 : 0

            return (
              <Box key={project.id}>
                {/* Project Header Row */}
                <Box
                  sx={{
                    display: "flex",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    minHeight: 60,
                    cursor: "pointer",
                    "&:hover": { bgcolor: alpha(project.color, 0.05) },
                  }}
                  onClick={() => toggleProject(project.id)}
                >
                  {/* Project Name */}
                  <Box
                    sx={{
                      width: 200,
                      minWidth: 200,
                      p: 1.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      borderRight: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    {isExpanded ? (
                      <ExpandLessIcon
                        sx={{ fontSize: 18, color: "text.secondary" }}
                      />
                    ) : (
                      <ExpandMoreIcon
                        sx={{ fontSize: 18, color: "text.secondary" }}
                      />
                    )}
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            bgcolor: project.color,
                          }}
                        />
                        <Typography variant="body2" fontWeight={600}>
                          {project.name}
                        </Typography>
                      </Box>
                      {totalFeatures > 0 && (
                        <Box sx={{ mt: 0.5 }}>
                          <Box
                            sx={{
                              height: 4,
                              bgcolor: alpha(project.color, 0.2),
                              borderRadius: 2,
                              overflow: "hidden",
                            }}
                          >
                            <Box
                              sx={{
                                height: "100%",
                                width: `${progressPercent}%`,
                                bgcolor: project.color,
                                borderRadius: 2,
                              }}
                            />
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {completedFeatures}/{totalFeatures} features
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>

                  {/* Day cells with releases */}
                  {days.map((day) => {
                    const releases = getReleasesForDay(project, day.key)
                    return (
                      <Box
                        key={day.key}
                        sx={{
                          width: DAY_WIDTH,
                          minWidth: DAY_WIDTH,
                          p: 0.5,
                          borderRight: "1px solid",
                          borderColor: "divider",
                          bgcolor: day.isToday
                            ? alpha(theme.palette.primary.main, 0.1)
                            : day.isWeekend
                              ? alpha(theme.palette.text.secondary, 0.03)
                              : "transparent",
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                        }}
                      >
                        {releases.map((release) => (
                          <Tooltip
                            key={release.id}
                            title={
                              <Box>
                                <Typography variant="body2" fontWeight={600}>
                                  {release.title}
                                </Typography>
                                <Chip
                                  label={release.type}
                                  size="small"
                                  sx={{
                                    height: 18,
                                    fontSize: "0.65rem",
                                    mt: 0.5,
                                    bgcolor:
                                      release.type === "release"
                                        ? alpha(theme.palette.success.main, 0.2)
                                        : alpha(
                                            theme.palette.warning.main,
                                            0.2,
                                          ),
                                    color:
                                      release.type === "release"
                                        ? theme.palette.success.main
                                        : theme.palette.warning.main,
                                  }}
                                />
                                {release.description && (
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    sx={{ mt: 0.5 }}
                                  >
                                    {release.description}
                                  </Typography>
                                )}
                              </Box>
                            }
                            arrow
                          >
                            <Chip
                              label={release.type === "release" ? "🚀" : "📅"}
                              size="small"
                              sx={{
                                height: 24,
                                fontSize: "0.75rem",
                                bgcolor:
                                  release.type === "release"
                                    ? theme.palette.success.main
                                    : theme.palette.warning.main,
                                color: "#fff",
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            />
                          </Tooltip>
                        ))}
                      </Box>
                    )
                  })}
                </Box>

                {/* Expanded Features */}
                {isExpanded && project.features.length > 0 && (
                  <Box sx={{ bgcolor: alpha(project.color, 0.02) }}>
                    {project.features.map((feature) => (
                      <Box
                        key={feature.id}
                        sx={{
                          display: "flex",
                          borderBottom: "1px solid",
                          borderColor: alpha(project.color, 0.1),
                          minHeight: 40,
                        }}
                      >
                        {/* Feature name */}
                        <Box
                          sx={{
                            width: 200,
                            minWidth: 200,
                            pl: 5,
                            pr: 1,
                            py: 0.5,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            borderRight: "1px solid",
                            borderColor: "divider",
                          }}
                        >
                          {getFeatureStatusIcon(feature.status)}
                          <Typography
                            variant="caption"
                            sx={{
                              flex: 1,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              textDecoration:
                                feature.status === "completed"
                                  ? "line-through"
                                  : "none",
                              color:
                                feature.status === "completed"
                                  ? "text.secondary"
                                  : "text.primary",
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Chip
                            label={feature.priority}
                            size="small"
                            sx={{
                              height: 18,
                              fontSize: "0.6rem",
                              bgcolor: getPriorityColor(feature.priority).bg,
                              color: getPriorityColor(feature.priority).text,
                            }}
                          />
                        </Box>

                        {/* Empty day cells for features */}
                        {days.map((day) => (
                          <Box
                            key={day.key}
                            sx={{
                              width: DAY_WIDTH,
                              minWidth: DAY_WIDTH,
                              borderRight: "1px solid",
                              borderColor: "divider",
                              bgcolor: day.isToday
                                ? alpha(theme.palette.primary.main, 0.05)
                                : day.isWeekend
                                  ? alpha(theme.palette.text.secondary, 0.02)
                                  : "transparent",
                            }}
                          />
                        ))}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            )
          })}

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography color="text.secondary">
                No projects found. Add projects to roadmap.json
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export function RoadmapView() {
  const theme = useTheme()
  const [subView, setSubView] = useState<RoadmapSubView>("sprint")
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>(3)
  const [monthOffset, setMonthOffset] = useState(0)
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all")
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set(),
  )
  const [decisionCategoryFilter, setDecisionCategoryFilter] = useState<
    DecisionCategory | "all"
  >("all")

  const CELL_WIDTH = getCellWidth(zoomLevel)
  const ROW_HEIGHT = 80
  const MILESTONE_ROW_HEIGHT = 50

  const months = useMemo(
    () => generateMonths(zoomLevel, monthOffset),
    [zoomLevel, monthOffset],
  )

  // Toggle expanded state for a project
  const toggleProjectExpanded = (projectKey: string) => {
    setExpandedProjects((prev) => {
      const next = new Set(prev)
      if (next.has(projectKey)) {
        next.delete(projectKey)
      } else {
        next.add(projectKey)
      }
      return next
    })
  }

  // Get milestones for a specific phase or standalone personal milestones
  const getMilestonesForProject = (
    projectKey: string,
    category: "business" | "personal",
  ) => {
    if (category !== "personal") return []
    return roadmap.milestones.filter((m) => {
      if (m.category !== "personal") return false
      // If milestone has a phaseId, check if that phase belongs to this project
      if (m.phaseId) {
        const phase = roadmap.phases.find((p) => p.id === m.phaseId)
        return (
          phase?.projectId === projectKey ||
          (projectKey === "other" && !phase?.projectId)
        )
      }
      // Standalone personal milestones go under 'other'
      return projectKey === "other"
    })
  }

  // Zoom controls
  const handleZoomIn = () => {
    const idx = ZOOM_LEVELS.indexOf(zoomLevel)
    if (idx > 0) setZoomLevel(ZOOM_LEVELS[idx - 1])
  }
  const handleZoomOut = () => {
    const idx = ZOOM_LEVELS.indexOf(zoomLevel)
    if (idx < ZOOM_LEVELS.length - 1) setZoomLevel(ZOOM_LEVELS[idx + 1])
  }
  const handleToday = () => setMonthOffset(0)
  const handlePrev = () => setMonthOffset((prev) => prev - 1)
  const handleNext = () => setMonthOffset((prev) => prev + 1)

  // Filter phases by category
  const filteredPhases = useMemo(() => {
    if (categoryFilter === "all") return roadmap.phases
    return roadmap.phases.filter((p) => p.category === categoryFilter)
  }, [categoryFilter])

  // Filter milestones by category
  const filteredMilestones = useMemo(() => {
    if (categoryFilter === "all") return roadmap.milestones
    return roadmap.milestones.filter((m) => m.category === categoryFilter)
  }, [categoryFilter])

  // Group phases by category then by project
  const phasesByCategory = useMemo(() => {
    const result: {
      category: "business" | "personal"
      phases: Map<string, typeof roadmap.phases>
    }[] = []

    const categories: ("business" | "personal")[] =
      categoryFilter === "all"
        ? ["business", "personal"]
        : [categoryFilter as "business" | "personal"]

    categories.forEach((cat) => {
      const catPhases = filteredPhases.filter((p) => p.category === cat)
      const rows: Map<string, typeof roadmap.phases> = new Map()

      catPhases.forEach((phase) => {
        const key = phase.projectId || "other"
        if (!rows.has(key)) {
          rows.set(key, [])
        }
        rows.get(key)!.push(phase)
      })

      if (rows.size > 0) {
        result.push({ category: cat, phases: rows })
      }
    })

    return result
  }, [filteredPhases, categoryFilter])

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          🗺️ Roadmap
        </Typography>
      </Box>

      {/* Sub-view Tabs */}
      <Tabs
        value={subView}
        onChange={(_, v) => setSubView(v)}
        sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
      >
        <Tab value="sprint" label="🏃 Sprint View" />
        <Tab value="timeline" label="📅 Timeline" />
        <Tab value="decisions" label="⚖️ Decisions & Rationale" />
        <Tab value="value" label="💎 Value & Synergies" />
      </Tabs>

      {/* Sprint View - Week by week with expandable projects */}
      {subView === "sprint" && (
        <SprintView
          roadmapProjects={roadmapProjects}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />
      )}

      {/* Timeline View */}
      {subView === "timeline" && (
        <>
          {/* Category Filter */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <ToggleButtonGroup
              value={categoryFilter}
              exclusive
              onChange={(_, value) => value && setCategoryFilter(value)}
              size="small"
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="business">
                <BusinessIcon sx={{ mr: 0.5, fontSize: 18 }} />
                Business
              </ToggleButton>
              <ToggleButton value="personal">
                <PersonIcon sx={{ mr: 0.5, fontSize: 18 }} />
                Personal
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Release Cards Section */}
          <ReleaseCardsTimeline
            projects={roadmapProjects}
            categoryFilter={categoryFilter}
          />

          {/* Disconnected Notice */}
          <Alert severity="warning" sx={{ mb: 3 }} icon={false}>
            ⚠️ This roadmap is for{" "}
            <strong>high-level visualization only</strong> and is not synced
            with project data. Edit via Copilot or directly in{" "}
            <code>roadmap.json</code>.
          </Alert>

          {/* Zoom & Navigation Controls */}
          <Box
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {/* Status Legend */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {(
                [
                  "completed",
                  "on-track",
                  "planned",
                  "needs-replanning",
                ] as RoadmapMilestoneStatus[]
              ).map((status) => (
                <Box
                  key={status}
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      bgcolor: getStatusColor(status),
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {getStatusLabel(status).split(" ")[1]}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Zoom & Nav */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton size="small" onClick={handlePrev} title="Previous">
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleToday}
                title="Today"
                color={monthOffset === 0 ? "primary" : "default"}
              >
                <TodayIcon />
              </IconButton>
              <IconButton size="small" onClick={handleNext} title="Next">
                <ChevronRightIcon />
              </IconButton>
              <Box
                sx={{
                  mx: 1,
                  height: 24,
                  borderLeft: "1px solid",
                  borderColor: "divider",
                }}
              />
              <IconButton
                size="small"
                onClick={handleZoomIn}
                disabled={zoomLevel === 1}
                title="Zoom In"
              >
                <ZoomInIcon />
              </IconButton>
              <ButtonGroup size="small" variant="outlined">
                {ZOOM_LEVELS.map((level) => (
                  <Button
                    key={level}
                    onClick={() => setZoomLevel(level)}
                    variant={zoomLevel === level ? "contained" : "outlined"}
                    sx={{ minWidth: 40 }}
                  >
                    {level}M
                  </Button>
                ))}
              </ButtonGroup>
              <IconButton
                size="small"
                onClick={handleZoomOut}
                disabled={zoomLevel === 12}
                title="Zoom Out"
              >
                <ZoomOutIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Timeline by Category */}
          {phasesByCategory.map(({ category, phases: phaseRows }) => (
            <Card key={category} sx={{ mb: 3 }}>
              <CardContent sx={{ p: 0, overflow: "auto" }}>
                {/* Category Header */}
                <Box
                  sx={{
                    p: 2,
                    bgcolor:
                      category === "business"
                        ? alpha(theme.palette.info.main, 0.1)
                        : alpha(theme.palette.success.main, 0.1),
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {category === "business" ? (
                    <BusinessIcon sx={{ color: theme.palette.info.main }} />
                  ) : (
                    <PersonIcon sx={{ color: theme.palette.success.main }} />
                  )}
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, textTransform: "capitalize" }}
                  >
                    {category} Timeline
                  </Typography>
                </Box>

                {/* Month Headers */}
                <Box
                  sx={{
                    display: "flex",
                    borderBottom: "2px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    position: "sticky",
                    top: 0,
                    zIndex: 20,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  <Box
                    sx={{
                      width: 150,
                      minWidth: 150,
                      p: 2,
                      fontWeight: 600,
                      borderRight: "1px solid",
                      borderColor: "divider",
                      bgcolor: "background.paper",
                    }}
                  >
                    {category === "business" ? "Project" : "Area"}
                  </Box>
                  {months.map((month, idx) => {
                    const isCurrentMonth = idx === 0
                    return (
                      <Box
                        key={month.key}
                        sx={{
                          width: CELL_WIDTH,
                          minWidth: CELL_WIDTH,
                          p: 1.5,
                          textAlign: "center",
                          borderRight: "1px solid",
                          borderColor: "divider",
                          bgcolor: isCurrentMonth
                            ? alpha(theme.palette.primary.main, 0.15)
                            : "background.paper",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: isCurrentMonth ? 700 : 500,
                            color: isCurrentMonth
                              ? "primary.main"
                              : "text.secondary",
                          }}
                        >
                          {month.shortLabel}
                        </Typography>
                      </Box>
                    )
                  })}
                </Box>

                {/* Timeline Body - Rows with Milestone Overlay */}
                <Box sx={{ position: "relative" }}>
                  {/* Project Rows */}
                  {Array.from(phaseRows.entries()).map(
                    ([projectKey, projectPhases]) => {
                      const projectColor = getProjectColor(
                        projectKey === "other" ? undefined : projectKey,
                      )
                      const projectName =
                        projectKey === "other"
                          ? "General"
                          : getProjectName(projectKey)
                      const projectMilestones = getMilestonesForProject(
                        projectKey,
                        category,
                      )
                      const isExpanded = expandedProjects.has(projectKey)
                      const hasExpandableMilestones =
                        category === "personal" && projectMilestones.length > 0

                      return (
                        <Box key={projectKey}>
                          {/* Main Project Row */}
                          <Box
                            sx={{
                              display: "flex",
                              borderBottom: "1px solid",
                              borderColor: "divider",
                              minHeight: ROW_HEIGHT,
                              cursor: hasExpandableMilestones
                                ? "pointer"
                                : "default",
                              "&:hover": {
                                bgcolor: alpha(projectColor, 0.03),
                              },
                            }}
                            onClick={() =>
                              hasExpandableMilestones &&
                              toggleProjectExpanded(projectKey)
                            }
                          >
                            {/* Project Label */}
                            <Box
                              sx={{
                                width: 150,
                                minWidth: 150,
                                p: 2,
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                borderRight: "1px solid",
                                borderColor: "divider",
                              }}
                            >
                              {hasExpandableMilestones &&
                                (isExpanded ? (
                                  <ExpandLessIcon
                                    sx={{
                                      fontSize: 18,
                                      color: "text.secondary",
                                    }}
                                  />
                                ) : (
                                  <ExpandMoreIcon
                                    sx={{
                                      fontSize: 18,
                                      color: "text.secondary",
                                    }}
                                  />
                                ))}
                              <Chip
                                label={projectName || category}
                                size="small"
                                sx={{
                                  bgcolor: alpha(projectColor, 0.15),
                                  color: projectColor,
                                  fontWeight: 600,
                                }}
                              />
                              {hasExpandableMilestones && (
                                <Typography
                                  variant="caption"
                                  sx={{ color: "text.secondary", ml: 0.5 }}
                                >
                                  ({projectMilestones.length})
                                </Typography>
                              )}
                            </Box>

                            {/* Timeline Area */}
                            <Box
                              sx={{
                                display: "flex",
                                position: "relative",
                                flex: 1,
                              }}
                            >
                              {/* Month grid cells */}
                              {months.map((month, idx) => (
                                <Box
                                  key={month.key}
                                  sx={{
                                    width: CELL_WIDTH,
                                    minWidth: CELL_WIDTH,
                                    borderRight: "1px solid",
                                    borderColor: "divider",
                                    position: "relative",
                                    bgcolor:
                                      idx === 0
                                        ? alpha(
                                            theme.palette.primary.main,
                                            0.05,
                                          )
                                        : "transparent",
                                  }}
                                />
                              ))}

                              {/* Phase bars (overlay) */}
                              {projectPhases.map((phase) => {
                                const startIdx = getMonthIndex(
                                  phase.startMonth,
                                  months,
                                )
                                const endIdx = getMonthIndex(
                                  phase.endMonth,
                                  months,
                                )

                                if (startIdx === -1 && endIdx === -1)
                                  return null

                                const clampedStart = Math.max(0, startIdx)
                                const clampedEnd = Math.min(
                                  months.length - 1,
                                  endIdx === -1 ? months.length - 1 : endIdx,
                                )
                                const span = clampedEnd - clampedStart + 1

                                return (
                                  <Tooltip
                                    key={phase.id}
                                    title={phase.name}
                                    arrow
                                  >
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        left: clampedStart * CELL_WIDTH + 4,
                                        top: 12,
                                        width: span * CELL_WIDTH - 8,
                                        height: 24,
                                        bgcolor: alpha(
                                          phase.color || projectColor,
                                          0.7,
                                        ),
                                        borderRadius: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                        "&:hover": {
                                          bgcolor: alpha(
                                            phase.color || projectColor,
                                            0.9,
                                          ),
                                          transform: "scaleY(1.1)",
                                        },
                                      }}
                                    >
                                      <Typography
                                        variant="caption"
                                        sx={{
                                          color: "#fff",
                                          fontWeight: 600,
                                          fontSize: "0.7rem",
                                          textShadow:
                                            "0 1px 2px rgba(0,0,0,0.3)",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          whiteSpace: "nowrap",
                                          px: 1,
                                        }}
                                      >
                                        {phase.name}
                                      </Typography>
                                    </Box>
                                  </Tooltip>
                                )
                              })}
                            </Box>
                          </Box>

                          {/* Expanded Milestone Sub-rows (Personal only) */}
                          {isExpanded &&
                            projectMilestones.map((milestone) => {
                              const position = getDatePosition(
                                milestone.targetDate,
                                months,
                                CELL_WIDTH,
                              )
                              const statusColor = getStatusColor(
                                milestone.status,
                              )

                              return (
                                <Box
                                  key={milestone.id}
                                  sx={{
                                    display: "flex",
                                    borderBottom: "1px solid",
                                    borderColor: alpha(projectColor, 0.2),
                                    minHeight: MILESTONE_ROW_HEIGHT,
                                    bgcolor: alpha(projectColor, 0.02),
                                  }}
                                >
                                  {/* Milestone Label */}
                                  <Box
                                    sx={{
                                      width: 150,
                                      minWidth: 150,
                                      pl: 4,
                                      pr: 1,
                                      py: 1,
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      borderRight: "1px solid",
                                      borderColor: "divider",
                                    }}
                                  >
                                    {/* Connector line */}
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        left: 20,
                                        top: 0,
                                        bottom: "50%",
                                        width: 2,
                                        bgcolor: alpha(projectColor, 0.3),
                                      }}
                                    />
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        left: 20,
                                        top: "50%",
                                        width: 12,
                                        height: 2,
                                        bgcolor: alpha(projectColor, 0.3),
                                      }}
                                    />
                                    <Tooltip
                                      title={milestone.description || ""}
                                      arrow
                                    >
                                      <Typography
                                        variant="caption"
                                        sx={{
                                          color: "text.secondary",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          whiteSpace: "nowrap",
                                          fontSize: "0.7rem",
                                        }}
                                      >
                                        {milestone.title}
                                      </Typography>
                                    </Tooltip>
                                  </Box>

                                  {/* Timeline Area */}
                                  <Box
                                    sx={{
                                      display: "flex",
                                      position: "relative",
                                      flex: 1,
                                    }}
                                  >
                                    {/* Month grid cells */}
                                    {months.map((month) => (
                                      <Box
                                        key={month.key}
                                        sx={{
                                          width: CELL_WIDTH,
                                          minWidth: CELL_WIDTH,
                                          borderRight: "1px solid",
                                          borderColor: "divider",
                                          position: "relative",
                                        }}
                                      />
                                    ))}

                                    {/* Milestone marker */}
                                    {position !== null && (
                                      <Tooltip
                                        title={
                                          <Box>
                                            <Typography
                                              variant="body2"
                                              sx={{ fontWeight: 600 }}
                                            >
                                              {milestone.title}
                                            </Typography>
                                            <Typography
                                              variant="caption"
                                              sx={{ color: statusColor }}
                                            >
                                              {getStatusLabel(milestone.status)}
                                            </Typography>
                                            <Typography
                                              variant="caption"
                                              display="block"
                                            >
                                              {formatDate(milestone.targetDate)}
                                            </Typography>
                                          </Box>
                                        }
                                        arrow
                                      >
                                        <Box
                                          sx={{
                                            position: "absolute",
                                            left: position - 8,
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.5,
                                            cursor: "pointer",
                                          }}
                                        >
                                          {/* Diamond */}
                                          <Box
                                            sx={{
                                              width: 12,
                                              height: 12,
                                              bgcolor: statusColor,
                                              transform: "rotate(45deg)",
                                              borderRadius: 0.5,
                                              boxShadow:
                                                "0 1px 3px rgba(0,0,0,0.2)",
                                            }}
                                          />
                                          {/* Status chip */}
                                          <Chip
                                            label={
                                              getStatusLabel(
                                                milestone.status,
                                              ).split(" ")[1]
                                            }
                                            size="small"
                                            sx={{
                                              height: 18,
                                              fontSize: "0.6rem",
                                              bgcolor: alpha(statusColor, 0.15),
                                              color: statusColor,
                                              fontWeight: 600,
                                              ml: 0.5,
                                            }}
                                          />
                                        </Box>
                                      </Tooltip>
                                    )}
                                  </Box>
                                </Box>
                              )
                            })}
                        </Box>
                      )
                    },
                  )}

                  {/* Milestones Overlay - Full height vertical lines with diamonds (Business only) */}
                  {category === "business" && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 150, // After project label column
                        right: 0,
                        bottom: 0,
                        pointerEvents: "none",
                        zIndex: 10,
                      }}
                    >
                      {filteredMilestones
                        .filter((m) => m.category === category)
                        .map((milestone) => {
                          const position = getDatePosition(
                            milestone.targetDate,
                            months,
                            CELL_WIDTH,
                          )
                          if (position === null) return null

                          const statusColor = getStatusColor(milestone.status)

                          return (
                            <Tooltip
                              key={milestone.id}
                              title={
                                <Box>
                                  <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600 }}
                                  >
                                    {milestone.title}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    sx={{ color: statusColor }}
                                  >
                                    {getStatusLabel(milestone.status)}
                                  </Typography>
                                  <Typography variant="caption" display="block">
                                    {formatDate(milestone.targetDate)}
                                  </Typography>
                                  {milestone.description && (
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      sx={{ mt: 0.5 }}
                                    >
                                      {milestone.description}
                                    </Typography>
                                  )}
                                </Box>
                              }
                              arrow
                              placement="top"
                            >
                              <Box
                                sx={{
                                  position: "absolute",
                                  left: position - 1,
                                  top: 0,
                                  bottom: 0,
                                  width: 2,
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  pointerEvents: "auto",
                                }}
                              >
                                {/* Diamond at top */}
                                <Box
                                  sx={{
                                    width: 14,
                                    height: 14,
                                    bgcolor: statusColor,
                                    transform: "rotate(45deg) translateY(-50%)",
                                    borderRadius: 0.5,
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                                    flexShrink: 0,
                                    mt: "-3px",
                                    zIndex: 2,
                                  }}
                                />
                                {/* Vertical line */}
                                <Box
                                  sx={{
                                    width: 2,
                                    flex: 1,
                                    bgcolor: alpha(statusColor, 0.5),
                                    mt: "-4px",
                                  }}
                                />
                              </Box>
                            </Tooltip>
                          )
                        })}
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}

          {/* Milestone Track - Dedicated row for all milestones */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 0, overflow: "auto" }}>
              {/* Header */}
              <Box
                sx={{
                  p: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <TimelineIcon sx={{ color: theme.palette.primary.main }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Milestone Track
                </Typography>
                <Chip
                  label={`${filteredMilestones.length} milestones`}
                  size="small"
                  sx={{
                    ml: 1,
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                    color: theme.palette.primary.main,
                  }}
                />
              </Box>

              {/* Month Headers */}
              <Box
                sx={{
                  display: "flex",
                  borderBottom: "2px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <Box
                  sx={{
                    width: 150,
                    minWidth: 150,
                    p: 2,
                    fontWeight: 600,
                    borderRight: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                  }}
                >
                  All Milestones
                </Box>
                {months.map((month, idx) => (
                  <Box
                    key={month.key}
                    sx={{
                      width: CELL_WIDTH,
                      minWidth: CELL_WIDTH,
                      p: 1.5,
                      textAlign: "center",
                      borderRight: "1px solid",
                      borderColor: "divider",
                      bgcolor:
                        idx === 0
                          ? alpha(theme.palette.primary.main, 0.15)
                          : "background.paper",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: idx === 0 ? 700 : 500,
                        color: idx === 0 ? "primary.main" : "text.secondary",
                      }}
                    >
                      {month.shortLabel}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Milestone Track Content */}
              <Box
                sx={{
                  display: "flex",
                  minHeight: 120,
                  position: "relative",
                }}
              >
                {/* Label column */}
                <Box
                  sx={{
                    width: 150,
                    minWidth: 150,
                    p: 2,
                    borderRight: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {
                      filteredMilestones.filter((m) => m.status === "completed")
                        .length
                    }{" "}
                    completed
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {
                      filteredMilestones.filter(
                        (m) => m.status === "in-progress",
                      ).length
                    }{" "}
                    in progress
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {
                      filteredMilestones.filter((m) => m.status === "planned")
                        .length
                    }{" "}
                    planned
                  </Typography>
                </Box>

                {/* Timeline track area */}
                <Box sx={{ display: "flex", position: "relative", flex: 1 }}>
                  {/* Month grid cells */}
                  {months.map((month, idx) => (
                    <Box
                      key={month.key}
                      sx={{
                        width: CELL_WIDTH,
                        minWidth: CELL_WIDTH,
                        borderRight: "1px solid",
                        borderColor: "divider",
                        bgcolor:
                          idx === 0
                            ? alpha(theme.palette.primary.main, 0.05)
                            : "transparent",
                      }}
                    />
                  ))}

                  {/* Horizontal track line */}
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: "50%",
                      height: 4,
                      bgcolor: alpha(theme.palette.primary.main, 0.2),
                      borderRadius: 2,
                      transform: "translateY(-50%)",
                    }}
                  />

                  {/* Milestone markers */}
                  {filteredMilestones
                    .sort(
                      (a, b) =>
                        new Date(a.targetDate).getTime() -
                        new Date(b.targetDate).getTime(),
                    )
                    .map((milestone, idx) => {
                      const position = getDatePosition(
                        milestone.targetDate,
                        months,
                        CELL_WIDTH,
                      )
                      if (position === null) return null

                      const statusColor = getStatusColor(milestone.status)
                      const phaseColor = milestone.phaseId
                        ? roadmap.phases.find((p) => p.id === milestone.phaseId)
                            ?.color
                        : undefined
                      const projectId = milestone.phaseId
                        ? roadmap.phases.find((p) => p.id === milestone.phaseId)
                            ?.projectId
                        : undefined

                      // Stagger vertical position to avoid overlap
                      const verticalOffset = (idx % 3) * 30 - 30

                      return (
                        <Tooltip
                          key={milestone.id}
                          title={
                            <Box sx={{ p: 0.5 }}>
                              <Typography
                                variant="body2"
                                sx={{ fontWeight: 600, mb: 0.5 }}
                              >
                                {milestone.title}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 1,
                                  alignItems: "center",
                                  mb: 0.5,
                                }}
                              >
                                <Chip
                                  label={getStatusLabel(milestone.status)}
                                  size="small"
                                  sx={{
                                    height: 20,
                                    fontSize: "0.65rem",
                                    bgcolor: alpha(statusColor, 0.2),
                                    color: statusColor,
                                    fontWeight: 600,
                                  }}
                                />
                                <Chip
                                  label={milestone.category}
                                  size="small"
                                  sx={{
                                    height: 20,
                                    fontSize: "0.65rem",
                                    bgcolor: alpha(
                                      milestone.category === "business"
                                        ? theme.palette.info.main
                                        : theme.palette.success.main,
                                      0.2,
                                    ),
                                    color:
                                      milestone.category === "business"
                                        ? theme.palette.info.main
                                        : theme.palette.success.main,
                                  }}
                                />
                              </Box>
                              <Typography
                                variant="caption"
                                display="block"
                                sx={{ color: "text.secondary" }}
                              >
                                📅 {formatDate(milestone.targetDate)}
                              </Typography>
                              {projectId && (
                                <Typography
                                  variant="caption"
                                  display="block"
                                  sx={{ color: "text.secondary" }}
                                >
                                  📁 {getProjectName(projectId)}
                                </Typography>
                              )}
                              {milestone.description && (
                                <Typography
                                  variant="caption"
                                  display="block"
                                  sx={{ mt: 0.5, opacity: 0.9 }}
                                >
                                  {milestone.description}
                                </Typography>
                              )}
                            </Box>
                          }
                          arrow
                          placement="top"
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              left: position,
                              top: `calc(50% + ${verticalOffset}px)`,
                              transform: "translate(-50%, -50%)",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              cursor: "pointer",
                              zIndex: 10,
                              transition: "all 0.2s",
                              "&:hover": {
                                transform: "translate(-50%, -50%) scale(1.15)",
                                zIndex: 20,
                              },
                            }}
                          >
                            {/* Connector line to track */}
                            <Box
                              sx={{
                                position: "absolute",
                                width: 2,
                                bgcolor: alpha(statusColor, 0.4),
                                top: verticalOffset < 0 ? "100%" : "auto",
                                bottom: verticalOffset >= 0 ? "100%" : "auto",
                                height: Math.abs(verticalOffset) - 10,
                              }}
                            />
                            {/* Main marker circle */}
                            <Box
                              sx={{
                                width: 28,
                                height: 28,
                                borderRadius: "50%",
                                bgcolor: statusColor,
                                border: "3px solid",
                                borderColor:
                                  phaseColor || alpha(statusColor, 0.3),
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                              }}
                            >
                              {milestone.status === "completed" && (
                                <CheckCircleIcon
                                  sx={{ fontSize: 16, color: "#fff" }}
                                />
                              )}
                              {milestone.status === "in-progress" && (
                                <TimelineIcon
                                  sx={{ fontSize: 14, color: "#fff" }}
                                />
                              )}
                              {milestone.status === "planned" && (
                                <Box
                                  sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    bgcolor: "#fff",
                                  }}
                                />
                              )}
                              {milestone.status === "needs-replanning" && (
                                <WarningIcon
                                  sx={{ fontSize: 14, color: "#fff" }}
                                />
                              )}
                              {milestone.status === "missed" && (
                                <CancelIcon
                                  sx={{ fontSize: 14, color: "#fff" }}
                                />
                              )}
                            </Box>
                            {/* Label below */}
                            <Typography
                              variant="caption"
                              sx={{
                                mt: 0.5,
                                fontSize: "0.6rem",
                                fontWeight: 600,
                                color: statusColor,
                                maxWidth: 80,
                                textAlign: "center",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                bgcolor: alpha("#000", 0.6),
                                px: 0.5,
                                borderRadius: 0.5,
                              }}
                            >
                              {milestone.title.length > 12
                                ? milestone.title.substring(0, 12) + "..."
                                : milestone.title}
                            </Typography>
                          </Box>
                        </Tooltip>
                      )
                    })}
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Legend - only show for timeline */}
          {subView === "timeline" && (
            <Box sx={{ mt: 3, display: "flex", gap: 3, flexWrap: "wrap" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 16,
                    bgcolor: alpha(theme.palette.text.secondary, 0.7),
                    borderRadius: 0.5,
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  Phase
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    bgcolor: theme.palette.primary.main,
                    transform: "rotate(45deg)",
                    borderRadius: 0.5,
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  Milestone
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    borderRadius: 0.5,
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  Current Month
                </Typography>
              </Box>
            </Box>
          )}
        </>
      )}

      {/* Decisions View */}
      {subView === "decisions" && (
        <Box>
          {/* Category Filter */}
          <Box sx={{ mb: 3, display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip
              label="All"
              onClick={() => setDecisionCategoryFilter("all")}
              variant={decisionCategoryFilter === "all" ? "filled" : "outlined"}
              color={decisionCategoryFilter === "all" ? "primary" : "default"}
            />
            {(
              [
                "launch-order",
                "company-structure",
                "strategy",
                "scope",
              ] as DecisionCategory[]
            ).map((cat) => (
              <Chip
                key={cat}
                icon={categoryIcons[cat] as React.ReactElement}
                label={cat.replace("-", " ")}
                onClick={() => setDecisionCategoryFilter(cat)}
                variant={decisionCategoryFilter === cat ? "filled" : "outlined"}
                sx={{
                  borderColor:
                    decisionCategoryFilter === cat
                      ? categoryColors[cat]
                      : undefined,
                  bgcolor:
                    decisionCategoryFilter === cat
                      ? `${categoryColors[cat]}20`
                      : undefined,
                }}
              />
            ))}
          </Box>

          {/* Decisions List */}
          <Stack spacing={2}>
            {decisions
              .filter(
                (d) =>
                  decisionCategoryFilter === "all" ||
                  d.category === decisionCategoryFilter,
              )
              .map((decision) => (
                <Card
                  key={decision.id}
                  sx={{
                    borderLeft: `4px solid ${categoryColors[decision.category]}`,
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {categoryIcons[decision.category]}
                          {decision.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {decision.decisionDate}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Tooltip
                          title={`Confidence: ${decision.confidenceLevel}`}
                        >
                          <Chip
                            size="small"
                            label={decision.confidenceLevel}
                            sx={{
                              bgcolor: `${confidenceColors[decision.confidenceLevel]}20`,
                              color: confidenceColors[decision.confidenceLevel],
                              fontWeight: 600,
                            }}
                          />
                        </Tooltip>
                        <Chip
                          size="small"
                          label={decision.status}
                          color={
                            decision.status === "active" ? "success" : "default"
                          }
                          variant="outlined"
                        />
                      </Box>
                    </Box>

                    {/* Decision Statement */}
                    <Alert severity="info" sx={{ mb: 2 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {decision.decision}
                      </Typography>
                    </Alert>

                    {/* Reasoning */}
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      <strong>Why:</strong> {decision.reasoning}
                    </Typography>

                    {/* Impacted Projects */}
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mb: 1, display: "block" }}
                      >
                        Impacted Projects:
                      </Typography>
                      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        {decision.impactedProjects.map((pid) => (
                          <Chip
                            key={pid}
                            size="small"
                            label={getProjectName(pid)}
                            sx={{
                              bgcolor: `${getProjectColor(pid)}20`,
                              color: getProjectColor(pid),
                            }}
                          />
                        ))}
                      </Box>
                    </Box>

                    {/* Implications */}
                    {decision.implications &&
                      decision.implications.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mb: 1, display: "block" }}
                          >
                            Implications:
                          </Typography>
                          <List dense disablePadding>
                            {decision.implications.map((imp, i) => (
                              <ListItem key={i} sx={{ py: 0 }}>
                                <ListItemIcon sx={{ minWidth: 24 }}>
                                  <ArrowForwardIcon
                                    fontSize="small"
                                    color="primary"
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  primary={imp}
                                  primaryTypographyProps={{ variant: "body2" }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}

                    {/* Alternatives Accordion */}
                    {decision.alternatives.length > 0 && (
                      <Accordion sx={{ mt: 2, bgcolor: "background.default" }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Alternatives Considered (
                            {decision.alternatives.length})
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Stack spacing={2}>
                            {decision.alternatives.map((alt, i) => (
                              <Paper key={i} sx={{ p: 2 }}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 1,
                                  }}
                                >
                                  {alt.rejected ? (
                                    <CancelIcon
                                      color="error"
                                      fontSize="small"
                                    />
                                  ) : (
                                    <CheckCircleIcon
                                      color="success"
                                      fontSize="small"
                                    />
                                  )}
                                  <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600 }}
                                  >
                                    {alt.option}
                                  </Typography>
                                </Box>
                                <Grid container spacing={2}>
                                  <Grid item xs={6}>
                                    <Typography
                                      variant="caption"
                                      color="success.main"
                                    >
                                      Pros:
                                    </Typography>
                                    <List dense disablePadding>
                                      {alt.pros.map((pro, j) => (
                                        <ListItem key={j} sx={{ py: 0 }}>
                                          <ListItemText
                                            primary={`• ${pro}`}
                                            primaryTypographyProps={{
                                              variant: "caption",
                                            }}
                                          />
                                        </ListItem>
                                      ))}
                                    </List>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography
                                      variant="caption"
                                      color="error.main"
                                    >
                                      Cons:
                                    </Typography>
                                    <List dense disablePadding>
                                      {alt.cons.map((con, j) => (
                                        <ListItem key={j} sx={{ py: 0 }}>
                                          <ListItemText
                                            primary={`• ${con}`}
                                            primaryTypographyProps={{
                                              variant: "caption",
                                            }}
                                          />
                                        </ListItem>
                                      ))}
                                    </List>
                                  </Grid>
                                </Grid>
                                {alt.reason && (
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ mt: 1, display: "block" }}
                                  >
                                    <strong>Rejected because:</strong>{" "}
                                    {alt.reason}
                                  </Typography>
                                )}
                              </Paper>
                            ))}
                          </Stack>
                        </AccordionDetails>
                      </Accordion>
                    )}
                  </CardContent>
                </Card>
              ))}
          </Stack>
        </Box>
      )}

      {/* Value & Synergies View */}
      {subView === "value" && (
        <Box>
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              How projects create value and share resources.
              <strong> Strong</strong> = high-impact, <strong>Moderate</strong>{" "}
              = helpful, <strong>Weak</strong> = nice-to-have.
            </Typography>
          </Alert>

          <Grid container spacing={3}>
            {businessValues.map((bv) => (
              <Grid item xs={12} md={6} key={bv.projectId}>
                <Card
                  sx={{
                    height: "100%",
                    borderTop: `4px solid ${getProjectColor(bv.projectId)}`,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {getProjectName(bv.projectId)}
                    </Typography>

                    {/* Value Proposition */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {bv.valueProposition}
                    </Typography>

                    {/* Quick Stats */}
                    <Box
                      sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}
                    >
                      <Chip
                        size="small"
                        label={`Revenue: ${bv.revenueModel}`}
                        variant="outlined"
                      />
                      <Chip
                        size="small"
                        label={`Time: ${bv.timeToRevenue}`}
                        variant="outlined"
                      />
                      <Chip
                        size="small"
                        label={`Effort: ${bv.effortEstimate}`}
                        variant="outlined"
                      />
                    </Box>

                    {/* Value Tiers */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Value to:
                      </Typography>
                      <Box sx={{ display: "flex", gap: 0.5, mt: 0.5 }}>
                        {bv.valueTiers.map((tier) => (
                          <Chip
                            key={tier}
                            size="small"
                            label={tier}
                            color="primary"
                            variant="filled"
                          />
                        ))}
                      </Box>
                    </Box>

                    {/* Synergies */}
                    {bv.synergies.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="caption" color="text.secondary">
                          Synergies:
                        </Typography>
                        <Stack spacing={1} sx={{ mt: 1 }}>
                          {bv.synergies.map((syn, i) => (
                            <Paper
                              key={i}
                              sx={{
                                p: 1,
                                bgcolor: `${synergyStrengthColors[syn.strength]}10`,
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  mb: 0.5,
                                }}
                              >
                                <SynergyArrow direction={syn.direction} />
                                <Chip
                                  size="small"
                                  label={getProjectName(syn.targetProjectId)}
                                  sx={{
                                    bgcolor: getProjectColor(
                                      syn.targetProjectId,
                                    ),
                                    color: "white",
                                  }}
                                />
                                <Chip
                                  size="small"
                                  label={syn.strength}
                                  sx={{
                                    bgcolor:
                                      synergyStrengthColors[syn.strength],
                                    color: "white",
                                  }}
                                />
                              </Box>
                              <Typography variant="caption">
                                {syn.benefit}
                              </Typography>
                            </Paper>
                          ))}
                        </Stack>
                      </Box>
                    )}

                    {/* Dependencies */}
                    {bv.dependencies.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="caption" color="text.secondary">
                          Dependencies:
                        </Typography>
                        <List dense disablePadding>
                          {bv.dependencies.map((dep, i) => (
                            <ListItem key={i} sx={{ py: 0 }}>
                              <ListItemIcon sx={{ minWidth: 24 }}>
                                {dep.critical ? (
                                  <WarningIcon fontSize="small" color="error" />
                                ) : (
                                  <LinkIcon fontSize="small" />
                                )}
                              </ListItemIcon>
                              <ListItemText
                                primary={`${getProjectName(dep.sourceProjectId)}: ${dep.requirement}`}
                                primaryTypographyProps={{ variant: "caption" }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}

                    {/* Concerns */}
                    {bv.concerns.length > 0 && (
                      <Accordion sx={{ bgcolor: "background.default", mt: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <WarningIcon fontSize="small" color="warning" />
                            <Typography variant="body2">
                              Concerns ({bv.concerns.length})
                            </Typography>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          <List dense disablePadding>
                            {bv.concerns.map((concern, i) => (
                              <ListItem key={i} sx={{ py: 0 }}>
                                <ListItemText
                                  primary={concern}
                                  primaryTypographyProps={{ variant: "body2" }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </AccordionDetails>
                      </Accordion>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  )
}
