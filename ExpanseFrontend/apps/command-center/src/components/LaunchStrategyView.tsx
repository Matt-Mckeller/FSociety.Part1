/**
 * LaunchStrategyView - Launch Strategy Planning & Analysis
 *
 * Sophisticated planning tool that answers:
 * - "When should I launch?"
 * - "What should I build first?"
 * - "How do features align with goals?"
 *
 * Components:
 * 1. Feature Impact Simulator - Radar chart + feature toggles
 * 2. Goal Assessment Matrix - Sortable heatmap table
 * 3. MVP Builder - Comparison cards with recommendations
 * 4. Marketing Stage Planner - Visual timeline with content planning
 */
import { useState, useMemo, useCallback } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  alpha,
  Paper,
  Tabs,
  Tab,
  Checkbox,
  Tooltip,
  IconButton,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Alert,
  Button,
  Badge,
  Grid,
  useTheme,
} from "@mui/material"
import { Radar } from "react-chartjs-2"
import "../utils/chartConfig" // Register Chart.js components

// Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CompareArrowsIcon from "@mui/icons-material/CompareArrows"
import TuneIcon from "@mui/icons-material/Tune"
import FlagIcon from "@mui/icons-material/Flag"
import TimelineIcon from "@mui/icons-material/Timeline"
import TargetIcon from "@mui/icons-material/TrackChanges"
import LightbulbIcon from "@mui/icons-material/Lightbulb"
import SpeedIcon from "@mui/icons-material/Speed"
import GroupIcon from "@mui/icons-material/Group"

import WarningAmberIcon from "@mui/icons-material/WarningAmber"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

// Import data from context (centralized source)
import {
  missionGoalsData,
  featureImpactData,
  marketingStagesData,
  mvpConfigurationsData,
} from "../contexts/LaunchContext"

// Import types and utilities from launch-strategy module
import type {
  MissionGoals,
  FeatureImpactData,
  MVPConfigurationsData,
  MarketingStagesData,
} from "./launch-strategy/types"
import {
  requirementColors,
  getGoalColor,
  formatPercent,
  calculateCoverage,
} from "./launch-strategy/utils"

// =============================================================================
// DATA CASTING
// =============================================================================

const missionGoals = missionGoalsData as MissionGoals
const featureImpact = featureImpactData as FeatureImpactData
const mvpConfigurations = mvpConfigurationsData as MVPConfigurationsData
const marketingStages = marketingStagesData as MarketingStagesData

// =============================================================================
// TAB PANEL WRAPPER
// =============================================================================

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

// =============================================================================
// RADAR CHART COMPONENT
// =============================================================================

interface GoalRadarChartProps {
  coverage: {
    engagement: number
    "mental-health": number
    learning: number
    "growth-mindset": number
    overall: number
  }
  compareWith?: {
    engagement: number
    "mental-health": number
    learning: number
    "growth-mindset": number
    overall: number
  }
  height?: number
}

function GoalRadarChart({
  coverage,
  compareWith,
  height = 300,
}: GoalRadarChartProps) {
  const theme = useTheme()

  const data = {
    labels: [
      `🎮 Engagement (${formatPercent(coverage.engagement)})`,
      `💚 Mental Health (${formatPercent(coverage["mental-health"])})`,
      `📚 Learning (${formatPercent(coverage.learning)})`,
      `🌱 Growth (${formatPercent(coverage["growth-mindset"])})`,
    ],
    datasets: [
      {
        label: "Current Selection",
        data: [
          coverage.engagement * 100,
          coverage["mental-health"] * 100,
          coverage.learning * 100,
          coverage["growth-mindset"] * 100,
        ],
        backgroundColor: alpha(theme.palette.primary.main, 0.2),
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
        pointBackgroundColor: theme.palette.primary.main,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: theme.palette.primary.main,
      },
      ...(compareWith
        ? [
            {
              label: "Comparison",
              data: [
                compareWith.engagement * 100,
                compareWith["mental-health"] * 100,
                compareWith.learning * 100,
                compareWith["growth-mindset"] * 100,
              ],
              backgroundColor: alpha(theme.palette.secondary.main, 0.1),
              borderColor: theme.palette.secondary.main,
              borderWidth: 2,
              borderDash: [5, 5],
              pointBackgroundColor: theme.palette.secondary.main,
              pointBorderColor: "#fff",
            },
          ]
        : []),
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 25,
          callback: (value: number | string) => `${value}%`,
          font: { size: 10 },
          color: theme.palette.text.secondary,
        },
        pointLabels: {
          font: { size: 11, weight: 500 as const },
          color: theme.palette.text.primary,
        },
        grid: {
          color: alpha(theme.palette.divider, 0.3),
        },
        angleLines: {
          color: alpha(theme.palette.divider, 0.3),
        },
      },
    },
    plugins: {
      legend: {
        display: !!compareWith,
        position: "bottom" as const,
        labels: {
          boxWidth: 12,
          padding: 15,
          font: { size: 11 },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: { dataset: { label?: string }; raw: unknown }) =>
            `${context.dataset.label || ""}: ${(context.raw as number).toFixed(0)}%`,
        },
      },
    },
  }

  return (
    <Box sx={{ height, position: "relative" }}>
      <Radar data={data} options={options} />
    </Box>
  )
}

// =============================================================================
// MISSION GOALS PANEL
// =============================================================================

function MissionGoalsPanel() {
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null)

  return (
    <Stack spacing={3}>
      {/* Mission Statement */}
      <Paper
        sx={{
          p: 3,
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          borderLeft: 4,
          borderColor: "primary.main",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {missionGoals.mission.tagline}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {missionGoals.mission.statement}
        </Typography>
      </Paper>

      {/* Primary Pillars */}
      <Typography variant="h6" fontWeight="bold">
        Primary Pillars
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 2,
        }}
      >
        {missionGoals.primaryPillars.map((pillar) => (
          <Card
            key={pillar.id}
            sx={{
              cursor: "pointer",
              transition: "all 0.2s",
              borderTop: 4,
              borderColor: pillar.color,
              "&:hover": { transform: "translateY(-2px)", boxShadow: 4 },
            }}
            onClick={() =>
              setExpandedPillar(expandedPillar === pillar.id ? null : pillar.id)
            }
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h4">{pillar.icon}</Typography>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {pillar.name}
                    </Typography>
                    <Chip
                      label={`${Math.round(pillar.weight * 100)}% weight`}
                      size="small"
                      sx={{
                        bgcolor: alpha(pillar.color, 0.2),
                        color: pillar.color,
                      }}
                    />
                  </Box>
                </Stack>
                <IconButton size="small">
                  {expandedPillar === pillar.id ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </IconButton>
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {pillar.description}
              </Typography>

              <Collapse in={expandedPillar === pillar.id}>
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight="bold"
                  >
                    Success Indicators:
                  </Typography>
                  <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                    {pillar.successIndicators.map((indicator, i) => (
                      <Typography
                        key={i}
                        variant="caption"
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <CheckCircleIcon
                          sx={{ fontSize: 12, color: pillar.color }}
                        />
                        {indicator}
                      </Typography>
                    ))}
                  </Stack>

                  {pillar.context?.crisis && (
                    <Box sx={{ mt: 2 }}>
                      <Typography
                        variant="caption"
                        color="error"
                        fontWeight="bold"
                      >
                        Crisis Context:
                      </Typography>
                      <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                        {Object.entries(pillar.context.crisis).map(
                          ([key, value]) => (
                            <Typography
                              key={key}
                              variant="caption"
                              color="text.secondary"
                            >
                              • {value}
                            </Typography>
                          ),
                        )}
                      </Stack>
                    </Box>
                  )}
                </Box>
              </Collapse>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Core Themes */}
      <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
        Core Themes
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {missionGoals.coreThemes.map((theme) => (
          <Tooltip key={theme.id} title={theme.description}>
            <Chip
              icon={<span>{theme.icon}</span>}
              label={theme.name}
              variant="outlined"
              sx={{ fontSize: "0.9rem" }}
            />
          </Tooltip>
        ))}
      </Stack>

      {/* Human Impact */}
      <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
        Human Impact
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={2}>
        {Object.values(missionGoals.humanImpact).map((impact) => (
          <Paper key={impact.id} sx={{ p: 2, minWidth: 200, flex: 1 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              {impact.icon}
            </Typography>
            <Typography variant="subtitle2" fontWeight="bold">
              {impact.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {impact.description}
            </Typography>
          </Paper>
        ))}
      </Stack>

      {/* Guiding Principles */}
      <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
        Guiding Principles
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 1,
        }}
      >
        {missionGoals.guidingPrinciples.map((principle) => (
          <Tooltip key={principle.id} title={principle.description}>
            <Chip
              label={principle.name}
              variant="filled"
              sx={{ justifyContent: "flex-start" }}
            />
          </Tooltip>
        ))}
      </Box>
    </Stack>
  )
}

// =============================================================================
// FEATURE IMPACT SIMULATOR (with Radar Chart)
// =============================================================================

function FeatureImpactPanel() {
  const theme = useTheme()
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(() => {
    return new Set(
      featureImpact.aggregations.byLaunchRequirement["must-have"] || [],
    )
  })
  const [filterRequirement, setFilterRequirement] = useState<string>("all")
  const [sortBy, setSortBy] = useState<
    | "requirement"
    | "engagement"
    | "mental-health"
    | "learning"
    | "growth-mindset"
    | "complexity"
  >("requirement")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [showDependencies, setShowDependencies] = useState(false)

  const features = useMemo(() => {
    let list = Object.values(featureImpact.features)

    if (filterRequirement !== "all") {
      list = list.filter((f) => f.launchRequirement === filterRequirement)
    }

    const sortOrder = sortDirection === "desc" ? -1 : 1

    if (sortBy === "requirement") {
      const order = ["must-have", "should-have", "nice-to-have", "future"]
      list.sort(
        (a, b) =>
          (order.indexOf(a.launchRequirement) -
            order.indexOf(b.launchRequirement)) *
          sortOrder,
      )
    } else if (sortBy === "complexity") {
      list.sort((a, b) => (a.complexity - b.complexity) * sortOrder)
    } else {
      list.sort(
        (a, b) =>
          ((b.goalImpact[sortBy] || 0) - (a.goalImpact[sortBy] || 0)) *
          sortOrder,
      )
    }

    return list
  }, [filterRequirement, sortBy, sortDirection])

  const toggleFeature = useCallback((id: string) => {
    setSelectedFeatures((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const selectPreset = useCallback(
    (preset: "must-have" | "should-have" | "all" | "clear") => {
      if (preset === "clear") {
        setSelectedFeatures(new Set())
      } else if (preset === "all") {
        setSelectedFeatures(new Set(Object.keys(featureImpact.features)))
      } else {
        const ids = featureImpact.aggregations.byLaunchRequirement[preset] || []
        setSelectedFeatures((prev) => {
          const next = new Set(prev)
          ids.forEach((id) => next.add(id))
          return next
        })
      }
    },
    [],
  )

  const coverage = useMemo(
    () => calculateCoverage(selectedFeatures, featureImpact.features),
    [selectedFeatures],
  )

  const totalComplexity = useMemo(() => {
    return Array.from(selectedFeatures).reduce((sum, id) => {
      return sum + (featureImpact.features[id]?.complexity || 0)
    }, 0)
  }, [selectedFeatures])

  const estimatedWeeks = useMemo(() => {
    return Array.from(selectedFeatures).reduce((sum, id) => {
      const weeks = parseInt(featureImpact.features[id]?.timeEstimate || "0")
      return sum + (isNaN(weeks) ? 0 : weeks)
    }, 0)
  }, [selectedFeatures])

  const missingMustHaves = useMemo(() => {
    const mustHaves =
      featureImpact.aggregations.byLaunchRequirement["must-have"] || []
    return mustHaves.filter((id) => !selectedFeatures.has(id))
  }, [selectedFeatures])

  const audiencesUnlocked = useMemo(() => {
    const audiences = new Set<string>()
    Array.from(selectedFeatures).forEach((id) => {
      featureImpact.features[id]?.audienceUnlocks.forEach((a) =>
        audiences.add(a),
      )
    })
    return Array.from(audiences)
  }, [selectedFeatures])

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortBy(column)
      setSortDirection("desc")
    }
  }

  return (
    <Grid container spacing={3}>
      {/* Left: Feature Selection */}
      <Grid item xs={12} lg={7}>
        <Stack spacing={2}>
          {/* Quick Actions */}
          <Paper sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap={1}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                <TuneIcon
                  sx={{ mr: 1, verticalAlign: "middle", fontSize: 20 }}
                />
                Feature Selector
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => selectPreset("must-have")}
                >
                  + Must-Haves
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => selectPreset("should-have")}
                >
                  + Should-Haves
                </Button>
                <Button
                  size="small"
                  variant="text"
                  color="inherit"
                  onClick={() => selectPreset("clear")}
                >
                  Clear
                </Button>
              </Stack>
            </Stack>
          </Paper>

          {/* Filters */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            flexWrap="wrap"
          >
            <ToggleButtonGroup
              size="small"
              value={filterRequirement}
              exclusive
              onChange={(_, v) => v && setFilterRequirement(v)}
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="must-have">
                <Badge
                  badgeContent={
                    featureImpact.aggregations.byLaunchRequirement["must-have"]
                      ?.length
                  }
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": { right: -8, top: -2, fontSize: 10 },
                  }}
                >
                  Must
                </Badge>
              </ToggleButton>
              <ToggleButton value="should-have">Should</ToggleButton>
              <ToggleButton value="nice-to-have">Nice</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          {/* Feature Table */}
          <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    padding="checkbox"
                    sx={{ bgcolor: "background.paper" }}
                  ></TableCell>
                  <TableCell sx={{ bgcolor: "background.paper" }}>
                    Feature
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ bgcolor: "background.paper" }}
                  >
                    <TableSortLabel
                      active={sortBy === "requirement"}
                      direction={
                        sortBy === "requirement" ? sortDirection : "asc"
                      }
                      onClick={() => handleSort("requirement")}
                    >
                      Req
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ bgcolor: "background.paper" }}
                  >
                    <TableSortLabel
                      active={sortBy === "engagement"}
                      direction={
                        sortBy === "engagement" ? sortDirection : "desc"
                      }
                      onClick={() => handleSort("engagement")}
                    >
                      🎮
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ bgcolor: "background.paper" }}
                  >
                    <TableSortLabel
                      active={sortBy === "mental-health"}
                      direction={
                        sortBy === "mental-health" ? sortDirection : "desc"
                      }
                      onClick={() => handleSort("mental-health")}
                    >
                      💚
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ bgcolor: "background.paper" }}
                  >
                    <TableSortLabel
                      active={sortBy === "learning"}
                      direction={sortBy === "learning" ? sortDirection : "desc"}
                      onClick={() => handleSort("learning")}
                    >
                      📚
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ bgcolor: "background.paper" }}
                  >
                    <TableSortLabel
                      active={sortBy === "growth-mindset"}
                      direction={
                        sortBy === "growth-mindset" ? sortDirection : "desc"
                      }
                      onClick={() => handleSort("growth-mindset")}
                    >
                      🌱
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ bgcolor: "background.paper" }}
                  >
                    <TableSortLabel
                      active={sortBy === "complexity"}
                      direction={
                        sortBy === "complexity" ? sortDirection : "asc"
                      }
                      onClick={() => handleSort("complexity")}
                    >
                      🔧
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {features.map((feature) => {
                  const isSelected = selectedFeatures.has(feature.storylineId)
                  const hasMissingDeps = feature.dependencies.some(
                    (dep) => !selectedFeatures.has(dep),
                  )

                  return (
                    <TableRow
                      key={feature.storylineId}
                      sx={{
                        bgcolor: isSelected
                          ? alpha(theme.palette.primary.main, 0.08)
                          : "inherit",
                        "&:hover": {
                          bgcolor: isSelected
                            ? alpha(theme.palette.primary.main, 0.12)
                            : alpha(theme.palette.primary.main, 0.04),
                        },
                        opacity: hasMissingDeps && isSelected ? 0.7 : 1,
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => toggleFeature(feature.storylineId)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Stack spacing={0.5}>
                          <Typography
                            variant="body2"
                            fontWeight={isSelected ? "bold" : "normal"}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            {feature.name}
                            {hasMissingDeps && isSelected && (
                              <Tooltip
                                title={`Missing dependencies: ${feature.dependencies.filter((d) => !selectedFeatures.has(d)).join(", ")}`}
                              >
                                <WarningAmberIcon
                                  sx={{ fontSize: 14, color: "warning.main" }}
                                />
                              </Tooltip>
                            )}
                          </Typography>
                          {showDependencies &&
                            feature.dependencies.length > 0 && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Deps: {feature.dependencies.join(", ")}
                              </Typography>
                            )}
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={feature.launchRequirement.split("-")[0]}
                          size="small"
                          sx={{
                            bgcolor: alpha(
                              requirementColors[feature.launchRequirement],
                              0.15,
                            ),
                            color: requirementColors[feature.launchRequirement],
                            fontSize: "0.65rem",
                            height: 20,
                          }}
                        />
                      </TableCell>
                      {(
                        [
                          "engagement",
                          "mental-health",
                          "learning",
                          "growth-mindset",
                        ] as const
                      ).map((goal) => (
                        <TableCell key={goal} align="center">
                          <Box
                            sx={{
                              width: 32,
                              height: 20,
                              borderRadius: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              bgcolor: alpha(
                                getGoalColor(feature.goalImpact[goal]),
                                0.15,
                              ),
                              color: getGoalColor(feature.goalImpact[goal]),
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              mx: "auto",
                            }}
                          >
                            {Math.round(feature.goalImpact[goal] * 100)}
                          </Box>
                        </TableCell>
                      ))}
                      <TableCell align="center">
                        <Typography variant="caption" color="text.secondary">
                          {feature.complexity}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            size="small"
            variant="text"
            onClick={() => setShowDependencies(!showDependencies)}
            sx={{ alignSelf: "flex-start" }}
          >
            {showDependencies ? "Hide" : "Show"} Dependencies
          </Button>
        </Stack>
      </Grid>

      {/* Right: Radar Chart & Stats */}
      <Grid item xs={12} lg={5}>
        <Stack spacing={2} sx={{ position: "sticky", top: 16 }}>
          {/* Radar Chart */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Goal Coverage
            </Typography>
            <GoalRadarChart coverage={coverage} height={280} />

            {/* Overall Score */}
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ color: getGoalColor(coverage.overall) }}
              >
                {formatPercent(coverage.overall)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Overall Goal Alignment
              </Typography>
            </Box>
          </Paper>

          {/* Stats Cards */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 1,
            }}
          >
            <Paper sx={{ p: 1.5 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <SpeedIcon sx={{ color: "primary.main", fontSize: 20 }} />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {selectedFeatures.size}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Features
                  </Typography>
                </Box>
              </Stack>
            </Paper>
            <Paper sx={{ p: 1.5 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <TimelineIcon sx={{ color: "secondary.main", fontSize: 20 }} />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {estimatedWeeks}w
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Est. Time
                  </Typography>
                </Box>
              </Stack>
            </Paper>
            <Paper sx={{ p: 1.5 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <TuneIcon sx={{ color: "warning.main", fontSize: 20 }} />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {totalComplexity}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Complexity
                  </Typography>
                </Box>
              </Stack>
            </Paper>
            <Paper sx={{ p: 1.5 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <GroupIcon sx={{ color: "success.main", fontSize: 20 }} />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {audiencesUnlocked.length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Audiences
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Box>

          {/* Warnings */}
          {missingMustHaves.length > 0 && (
            <Alert severity="warning" icon={<WarningAmberIcon />}>
              <Typography variant="body2" fontWeight="bold">
                Missing {missingMustHaves.length} must-have feature
                {missingMustHaves.length > 1 ? "s" : ""}:
              </Typography>
              <Typography variant="caption">
                {missingMustHaves
                  .map((id) => featureImpact.features[id]?.name)
                  .join(", ")}
              </Typography>
            </Alert>
          )}

          {/* Audiences Unlocked */}
          {audiencesUnlocked.length > 0 && (
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                <GroupIcon
                  sx={{ mr: 0.5, fontSize: 16, verticalAlign: "middle" }}
                />
                Audiences Unlocked
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={0.5}>
                {audiencesUnlocked.map((a) => (
                  <Chip key={a} label={a} size="small" variant="outlined" />
                ))}
              </Stack>
            </Paper>
          )}
        </Stack>
      </Grid>
    </Grid>
  )
}

// =============================================================================
// MVP COMPARISON PANEL (with Cards & Recommendations)
// =============================================================================

function MVPComparisonPanel() {
  const theme = useTheme()
  const [selectedConfigs, setSelectedConfigs] = useState<string[]>([
    "mvp-minimum",
    "mvp-recommended",
  ])
  const [compareMode, setCompareMode] = useState<"table" | "cards">("cards")

  const toggleConfig = (id: string) => {
    setSelectedConfigs((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((c) => c !== id) : prev // Keep at least 1
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id]
      }
      return [...prev, id]
    })
  }

  const configs = mvpConfigurations.configurations

  // Recommendation cards
  const recommendations = [
    {
      id: "minimum-viable",
      icon: <SpeedIcon />,
      title: "Fastest to Market",
      description: "Get to market quickly with core functionality",
      configId: "mvp-minimum",
      color: theme.palette.error.main,
    },
    {
      id: "recommended",
      icon: <AutoAwesomeIcon />,
      title: "Recommended",
      description: "Best balance of features, time, and impact",
      configId: "mvp-recommended",
      color: theme.palette.primary.main,
    },
    {
      id: "audience-optimized",
      icon: <GroupIcon />,
      title: "Audience First",
      description: "Unlock the most user segments",
      configId: "mvp-teacher-focus",
      color: theme.palette.success.main,
    },
    {
      id: "goal-optimized",
      icon: <TargetIcon />,
      title: "Goal Focused",
      description: "Maximize mission alignment",
      configId: "mvp-full-vision",
      color: theme.palette.info.main,
    },
  ]

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold">
          <CompareArrowsIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          MVP Configuration Comparison
        </Typography>
        <ToggleButtonGroup
          size="small"
          value={compareMode}
          exclusive
          onChange={(_, v) => v && setCompareMode(v)}
        >
          <ToggleButton value="cards">Cards</ToggleButton>
          <ToggleButton value="table">Table</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {/* Quick Recommendations */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 2,
        }}
      >
        {recommendations.map((rec) => {
          const config = configs.find((c) => c.id === rec.configId)
          const isSelected = selectedConfigs.includes(rec.configId)

          return (
            <Paper
              key={rec.id}
              onClick={() => toggleConfig(rec.configId)}
              sx={{
                p: 2,
                cursor: "pointer",
                border: 2,
                borderColor: isSelected ? rec.color : "transparent",
                bgcolor: isSelected
                  ? alpha(rec.color, 0.08)
                  : "background.paper",
                transition: "all 0.2s",
                "&:hover": { borderColor: alpha(rec.color, 0.5) },
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <Box sx={{ color: rec.color }}>{rec.icon}</Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {rec.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {rec.description}
                  </Typography>
                  {config && (
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Chip
                        label={`${config.selectedFeatures.length} features`}
                        size="small"
                      />
                      <Chip
                        label={`${config.computed.estimatedTimeWeeks}w`}
                        size="small"
                        variant="outlined"
                      />
                    </Stack>
                  )}
                </Box>
              </Stack>
            </Paper>
          )
        })}
      </Box>

      <Divider />

      {/* Configuration Selection */}
      <Typography variant="subtitle2" color="text.secondary">
        Select up to 3 configurations to compare:
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {configs.map((config) => (
          <Chip
            key={config.id}
            label={config.name}
            onClick={() => toggleConfig(config.id)}
            color={selectedConfigs.includes(config.id) ? "primary" : "default"}
            variant={
              selectedConfigs.includes(config.id) ? "filled" : "outlined"
            }
          />
        ))}
      </Stack>

      {/* Comparison View */}
      {compareMode === "cards" ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(selectedConfigs.length, 3)}, 1fr)`,
            gap: 2,
          }}
        >
          {selectedConfigs.map((id) => {
            const config = configs.find((c) => c.id === id)
            if (!config) return null

            return (
              <Card key={id} sx={{ height: "100%" }}>
                <CardContent>
                  {/* Header */}
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {config.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, minHeight: 40 }}
                  >
                    {config.description}
                  </Typography>

                  {/* Radar Chart */}
                  <GoalRadarChart
                    coverage={config.computed.goalCoverage}
                    height={200}
                  />

                  {/* Stats */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 1,
                        bgcolor: "action.hover",
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold">
                        {config.selectedFeatures.length}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Features
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 1,
                        bgcolor: "action.hover",
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold">
                        {config.computed.estimatedTimeWeeks}w
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Timeline
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 1,
                        bgcolor: "action.hover",
                        borderRadius: 1,
                      }}
                    >
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{
                          color: getGoalColor(
                            config.computed.goalCoverage.overall,
                          ),
                        }}
                      >
                        {formatPercent(config.computed.goalCoverage.overall)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Goal Coverage
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 1,
                        bgcolor: "action.hover",
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold">
                        {config.computed.launchReadinessScore}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Readiness
                      </Typography>
                    </Box>
                  </Box>

                  {/* Features List */}
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="caption"
                      fontWeight="bold"
                      color="text.secondary"
                    >
                      Includes:
                    </Typography>
                    <Stack
                      direction="row"
                      flexWrap="wrap"
                      gap={0.5}
                      sx={{ mt: 0.5 }}
                    >
                      {config.selectedFeatures.slice(0, 5).map((fId) => (
                        <Chip
                          key={fId}
                          label={featureImpact.features[fId]?.name || fId}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                      {config.selectedFeatures.length > 5 && (
                        <Chip
                          label={`+${config.selectedFeatures.length - 5}`}
                          size="small"
                        />
                      )}
                    </Stack>
                  </Box>

                  {/* Risks */}
                  {config.risks && config.risks.length > 0 && (
                    <Alert
                      severity="warning"
                      sx={{ mt: 2, py: 0.5 }}
                      icon={<WarningAmberIcon fontSize="small" />}
                    >
                      <Typography variant="caption">
                        {config.risks[0]}
                      </Typography>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </Box>
      ) : (
        /* Table View */
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Metric</TableCell>
                {selectedConfigs.map((id) => {
                  const config = configs.find((c) => c.id === id)
                  return (
                    <TableCell key={id} align="center">
                      <Typography variant="subtitle2" fontWeight="bold">
                        {config?.name}
                      </Typography>
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { label: "Features", key: "features" },
                { label: "Timeline", key: "weeks" },
                { label: "Complexity", key: "complexity" },
                { label: "🎮 Engagement", key: "engagement" },
                { label: "💚 Mental Health", key: "mental-health" },
                { label: "📚 Learning", key: "learning" },
                { label: "🌱 Growth", key: "growth-mindset" },
                { label: "⭐ Overall", key: "overall", highlight: true },
                { label: "Readiness", key: "readiness" },
              ].map((row) => (
                <TableRow
                  key={row.key}
                  sx={
                    row.highlight
                      ? { bgcolor: alpha(theme.palette.primary.main, 0.08) }
                      : {}
                  }
                >
                  <TableCell sx={row.highlight ? { fontWeight: "bold" } : {}}>
                    {row.label}
                  </TableCell>
                  {selectedConfigs.map((id) => {
                    const config = configs.find((c) => c.id === id)
                    if (!config) return <TableCell key={id} />

                    let value: React.ReactNode = ""
                    let color: string | undefined

                    switch (row.key) {
                      case "features":
                        value = config.selectedFeatures.length
                        break
                      case "weeks":
                        value = `${config.computed.estimatedTimeWeeks}w`
                        break
                      case "complexity":
                        value = config.computed.totalComplexity
                        break
                      case "engagement":
                      case "mental-health":
                      case "learning":
                      case "growth-mindset":
                      case "overall": {
                        const score =
                          config.computed.goalCoverage[
                            row.key as keyof typeof config.computed.goalCoverage
                          ]
                        value = formatPercent(score)
                        color = getGoalColor(score)
                        break
                      }
                      case "readiness":
                        value = (
                          <Chip
                            label={`${config.computed.launchReadinessScore}%`}
                            size="small"
                            color={
                              config.computed.launchReadinessScore >= 80
                                ? "success"
                                : config.computed.launchReadinessScore >= 60
                                  ? "warning"
                                  : "error"
                            }
                          />
                        )
                        break
                    }

                    return (
                      <TableCell
                        key={id}
                        align="center"
                        sx={
                          color
                            ? {
                                color,
                                fontWeight: row.highlight ? "bold" : undefined,
                              }
                            : { fontWeight: row.highlight ? "bold" : undefined }
                        }
                      >
                        {value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  )
}

// =============================================================================
// MARKETING STAGES PANEL (with Visual Timeline)
// =============================================================================

function MarketingStagesPanel() {
  const [activeStage, setActiveStage] = useState<string>("pre-launch")

  const stages = marketingStages.stages
  const currentStageIndex = stages.findIndex((s) => s.id === activeStage)

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Typography variant="h6" fontWeight="bold">
        <TimelineIcon sx={{ mr: 1, verticalAlign: "middle" }} />
        Marketing Stage Planner
      </Typography>

      {/* Visual Timeline */}
      <Paper sx={{ p: 3 }}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ position: "relative" }}
        >
          {stages.map((stage, index) => {
            const isActive = stage.id === activeStage
            const isPast = index < currentStageIndex

            return (
              <Box
                key={stage.id}
                sx={{ flex: 1, position: "relative", textAlign: "center" }}
              >
                {/* Connector Line */}
                {index < stages.length - 1 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 20,
                      left: "50%",
                      right: "-50%",
                      height: 3,
                      bgcolor: isPast ? "primary.main" : "divider",
                      zIndex: 0,
                    }}
                  />
                )}

                {/* Stage Node */}
                <Box
                  onClick={() => setActiveStage(stage.id)}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 1,
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 1,
                    bgcolor: isActive
                      ? "primary.main"
                      : isPast
                        ? "primary.light"
                        : "background.paper",
                    color: isActive || isPast ? "white" : "text.secondary",
                    border: 2,
                    borderColor: isActive
                      ? "primary.main"
                      : isPast
                        ? "primary.light"
                        : "divider",
                    transition: "all 0.2s",
                    "&:hover": {
                      transform: "scale(1.1)",
                      boxShadow: 2,
                    },
                  }}
                >
                  {isPast ? (
                    <CheckCircleIcon sx={{ fontSize: 20 }} />
                  ) : isActive ? (
                    <PlayArrowIcon sx={{ fontSize: 20 }} />
                  ) : (
                    <Typography variant="caption" fontWeight="bold">
                      {stage.phase}
                    </Typography>
                  )}
                </Box>

                {/* Stage Label */}
                <Typography
                  variant="caption"
                  fontWeight={isActive ? "bold" : "normal"}
                  color={isActive ? "primary.main" : "text.secondary"}
                  sx={{ display: "block" }}
                >
                  {stage.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{ fontSize: "0.65rem" }}
                >
                  {stage.duration}
                </Typography>
              </Box>
            )
          })}
        </Stack>
      </Paper>

      {/* Active Stage Details */}
      {(() => {
        const stage = stages.find((s) => s.id === activeStage)
        if (!stage) return null

        return (
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                sx={{ mb: 2 }}
              >
                <Box>
                  <Chip
                    label={`Phase ${stage.phase}`}
                    color="primary"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="h5" fontWeight="bold">
                    {stage.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stage.description}
                  </Typography>
                </Box>
                <Chip label={stage.duration} variant="outlined" />
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Goals */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ mb: 1 }}
                >
                  <TargetIcon
                    sx={{ mr: 0.5, fontSize: 16, verticalAlign: "middle" }}
                  />
                  Stage Goals
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {stage.goals.map((goal, i) => (
                    <Chip
                      key={i}
                      label={goal}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Stack>
              </Box>

              {/* Key Messages */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ mb: 1 }}
                >
                  <FlagIcon
                    sx={{ mr: 0.5, fontSize: 16, verticalAlign: "middle" }}
                  />
                  Key Messages
                </Typography>
                <Stack spacing={1}>
                  {stage.keyMessages.map((msg, i) => (
                    <Paper key={i} sx={{ p: 1.5, bgcolor: "action.hover" }}>
                      <Typography variant="body2">💬 "{msg}"</Typography>
                    </Paper>
                  ))}
                </Stack>
              </Box>

              {/* Target Audiences (if available) */}
              {stage.targetAudiences && stage.targetAudiences.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    sx={{ mb: 1 }}
                  >
                    <GroupIcon
                      sx={{ mr: 0.5, fontSize: 16, verticalAlign: "middle" }}
                    />
                    Target Audiences
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {stage.targetAudiences.map((audience, i) => (
                      <Chip key={i} label={audience} size="small" />
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Content Types (if available) */}
              {stage.contentTypes && stage.contentTypes.length > 0 && (
                <Box>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    sx={{ mb: 1 }}
                  >
                    <LightbulbIcon
                      sx={{ mr: 0.5, fontSize: 16, verticalAlign: "middle" }}
                    />
                    Content Types
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(250px, 1fr))",
                      gap: 1,
                    }}
                  >
                    {stage.contentTypes.map((content, i) => (
                      <Paper key={i} sx={{ p: 1.5 }}>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {content.type}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {content.description}
                        </Typography>
                        {content.channels && (
                          <Stack
                            direction="row"
                            flexWrap="wrap"
                            gap={0.5}
                            sx={{ mt: 1 }}
                          >
                            {content.channels.map((ch, j) => (
                              <Chip
                                key={j}
                                label={ch}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: "0.65rem" }}
                              />
                            ))}
                          </Stack>
                        )}
                      </Paper>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Navigation */}
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: "divider" }}
              >
                <Button
                  disabled={currentStageIndex === 0}
                  onClick={() =>
                    setActiveStage(stages[currentStageIndex - 1]?.id)
                  }
                  startIcon={
                    <ArrowForwardIcon sx={{ transform: "rotate(180deg)" }} />
                  }
                >
                  Previous Stage
                </Button>
                <Button
                  disabled={currentStageIndex === stages.length - 1}
                  onClick={() =>
                    setActiveStage(stages[currentStageIndex + 1]?.id)
                  }
                  endIcon={<ArrowForwardIcon />}
                  variant="contained"
                >
                  Next Stage
                </Button>
              </Stack>
            </CardContent>
          </Card>
        )
      })()}

      {/* Marketing Messages Reference */}
      <Divider />
      <Typography variant="h6" fontWeight="bold">
        <FlagIcon sx={{ mr: 1, verticalAlign: "middle" }} />
        Key Marketing Messages
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 2,
        }}
      >
        <Paper sx={{ p: 2, borderLeft: 4, borderColor: "error.main" }}>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="error"
            gutterBottom
          >
            Fear / Frustration (Problem Awareness)
          </Typography>
          <Stack spacing={0.5}>
            {missionGoals.marketingMessages.fearFrustration.map((msg, i) => (
              <Typography key={i} variant="body2">
                • {msg}
              </Typography>
            ))}
          </Stack>
        </Paper>

        <Paper sx={{ p: 2, borderLeft: 4, borderColor: "success.main" }}>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="success.main"
            gutterBottom
          >
            Hope / Potential (Solution)
          </Typography>
          <Stack spacing={0.5}>
            {missionGoals.marketingMessages.hopePotential.map((msg, i) => (
              <Typography key={i} variant="body2">
                • {msg}
              </Typography>
            ))}
          </Stack>
        </Paper>

        <Paper sx={{ p: 2, borderLeft: 4, borderColor: "primary.main" }}>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Value Propositions
          </Typography>
          <Stack spacing={0.5}>
            {missionGoals.marketingMessages.valuePropositions.map((msg, i) => (
              <Typography key={i} variant="body2">
                • {msg}
              </Typography>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Stack>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function LaunchStrategyView() {
  const [tabValue, setTabValue] = useState(1) // Start on Feature Impact

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        🚀 Launch Strategy
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Plan your launch by analyzing feature impact, comparing MVP
        configurations, and mapping marketing stages.
      </Typography>

      <Tabs
        value={tabValue}
        onChange={(_, v) => setTabValue(v)}
        sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
      >
        <Tab label="🎯 Mission Goals" />
        <Tab label="⚡ Feature Impact" />
        <Tab label="📊 MVP Comparison" />
        <Tab label="📣 Marketing Stages" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <MissionGoalsPanel />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <FeatureImpactPanel />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <MVPComparisonPanel />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <MarketingStagesPanel />
      </TabPanel>
    </Box>
  )
}
