/**
 * QuestlinesView - View and manage Questlines (formerly Projects)
 * Browse thematic groupings of quests
 */
import { useState } from "react"
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  LinearProgress,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  alpha,
  useTheme,
  type Theme,
} from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import WarningIcon from "@mui/icons-material/Warning"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { useGameData } from "../hooks"
import type { Questline } from "../types"

const ITEMS_PER_PAGE = 3
const CARD_HEIGHT = 480

const statusColors: Record<
  string,
  "default" | "warning" | "success" | "error"
> = {
  "not-started": "default",
  "in-progress": "warning",
  "quest-complete": "success",
  blocked: "error",
  paused: "default",
  todo: "default",
  done: "success",
}

const statusLabels: Record<string, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  "quest-complete": "Quest Complete",
  blocked: "Blocked",
  paused: "Paused",
  todo: "To Do",
  done: "Done",
}

const getDaysUntil = (dateStr: string | null): number => {
  if (!dateStr) return 999
  const target = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  target.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

/**
 * Get progress color from theme based on percentage
 */
function getThemeProgressColor(theme: Theme, percent: number): string {
  if (percent >= 75) return theme.palette.success.main
  if (percent >= 50) return theme.palette.warning.main
  if (percent >= 25) return theme.palette.warning.dark
  return theme.palette.error.main
}

export function QuestlinesView() {
  const theme = useTheme()
  const { storylines: questlines, quests, objectives } = useGameData()
  const businessQuestlines = questlines.filter((q) => q.category === "business")
  const personalQuestlines = questlines.filter((q) => q.category === "personal")

  const getQuestlineQuests = (questlineId: string) =>
    quests.filter((q) => q.questlineId === questlineId)
  const getQuestlineObjectives = (questlineId: string) =>
    objectives.filter((o) => o.questlineId === questlineId)

  const getQuestProgress = (questId: string) => {
    const questObjectives = objectives.filter((o) => o.questId === questId)
    const completed = questObjectives.filter((o) => o.status === "done").length
    return questObjectives.length > 0
      ? Math.round((completed / questObjectives.length) * 100)
      : 0
  }

  const getQuestlineXP = (questlineId: string) => {
    const questlineObjs = objectives.filter(
      (o) => o.questlineId === questlineId,
    )
    const earned = questlineObjs
      .filter((o) => o.status === "done")
      .reduce((sum, o) => sum + (o.xpReward || 0), 0)
    const total = questlineObjs.reduce((sum, o) => sum + (o.xpReward || 0), 0)
    return { earned, total }
  }

  const QuestlineCard = ({ questline }: { questline: Questline }) => {
    const [tab, setTab] = useState(0)
    const [questsPage, setQuestsPage] = useState(0)
    const [objectivesPage, setObjectivesPage] = useState(0)

    const questlineQuests = getQuestlineQuests(questline.id)
    const questlineObjectives = getQuestlineObjectives(questline.id)
    const xp = getQuestlineXP(questline.id)

    const completedObjectives = questlineObjectives.filter(
      (o) => o.status === "done",
    ).length
    const objectiveProgress =
      questlineObjectives.length > 0
        ? (completedObjectives / questlineObjectives.length) * 100
        : 0

    const completedQuests = questlineQuests.filter(
      (q) => q.status === "quest-complete",
    ).length
    const questProgress =
      questlineQuests.length > 0
        ? (completedQuests / questlineQuests.length) * 100
        : 0

    // Pagination
    const questsTotalPages = Math.ceil(questlineQuests.length / ITEMS_PER_PAGE)
    const objectivesTotalPages = Math.ceil(
      questlineObjectives.length / ITEMS_PER_PAGE,
    )
    const paginatedQuests = questlineQuests.slice(
      questsPage * ITEMS_PER_PAGE,
      (questsPage + 1) * ITEMS_PER_PAGE,
    )
    const paginatedObjectives = questlineObjectives.slice(
      objectivesPage * ITEMS_PER_PAGE,
      (objectivesPage + 1) * ITEMS_PER_PAGE,
    )

    const handleTabChange = (_: unknown, newTab: number) => {
      setTab(newTab)
      setQuestsPage(0)
      setObjectivesPage(0)
    }

    return (
      <Card
        sx={{
          height: CARD_HEIGHT,
          display: "flex",
          flexDirection: "column",
          borderTop: 4,
          borderColor: questline.color,
          "&:hover": { boxShadow: "0 8px 25px -5px rgb(0 0 0 / 0.15)" },
          transition: "box-shadow 0.2s ease",
        }}
      >
        <CardContent sx={{ pb: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography sx={{ fontSize: "1.5rem" }}>🗺️</Typography>
              <Typography variant="h5" fontWeight={700} color="text.primary">
                {questline.name}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Chip
                label={questline.priority}
                size="small"
                color={
                  questline.priority === "P1"
                    ? "error"
                    : questline.priority === "P2"
                      ? "warning"
                      : "default"
                }
                sx={{ fontWeight: 600 }}
              />
              <Chip
                label={statusLabels[questline.status]}
                size="small"
                variant="outlined"
                color={statusColors[questline.status]}
                sx={{ fontWeight: 500 }}
              />
            </Stack>
          </Box>

          <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
            {questline.description}
          </Typography>

          {/* XP Progress */}
          <Box
            sx={{
              mb: 2,
              p: 1.5,
              bgcolor: alpha(theme.palette.warning.main, 0.1),
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 0.5,
              }}
            >
              <Typography
                variant="caption"
                fontWeight={600}
                color={theme.palette.warning.main}
              >
                ✨ XP Progress
              </Typography>
              <Typography
                variant="caption"
                fontWeight={700}
                color={theme.palette.warning.main}
              >
                {xp.earned} / {xp.total} XP
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={xp.total > 0 ? (xp.earned / xp.total) * 100 : 0}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: alpha(theme.palette.warning.main, 0.2),
                "& .MuiLinearProgress-bar": {
                  bgcolor: theme.palette.warning.main,
                },
              }}
            />
          </Box>

          {/* Summary Stats */}
          <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Quests
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" fontWeight={600}>
                  {completedQuests}/{questlineQuests.length}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={questProgress}
                  sx={{
                    flex: 1,
                    height: 4,
                    borderRadius: 2,
                    bgcolor: "grey.200",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: getThemeProgressColor(theme, questProgress),
                    },
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Objectives
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" fontWeight={600}>
                  {completedObjectives}/{questlineObjectives.length}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={objectiveProgress}
                  sx={{
                    flex: 1,
                    height: 4,
                    borderRadius: 2,
                    bgcolor: "grey.200",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: getThemeProgressColor(theme, objectiveProgress),
                    },
                  }}
                />
              </Box>
            </Box>
          </Stack>
        </CardContent>

        <Divider />

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            minHeight: 40,
            "& .MuiTab-root": { minHeight: 40, py: 0, fontSize: "0.8rem" },
          }}
        >
          <Tab label={`⚔️ Quests (${questlineQuests.length})`} />
          <Tab label={`🎯 Objectives (${questlineObjectives.length})`} />
        </Tabs>

        <Divider />

        {/* Tab Content */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Quests Tab */}
          {tab === 0 && (
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <List dense disablePadding sx={{ flex: 1, overflow: "auto" }}>
                {questlineQuests.length === 0 && (
                  <ListItem sx={{ height: 180, justifyContent: "center" }}>
                    <ListItemText
                      primary="No quests yet"
                      primaryTypographyProps={{
                        color: "text.secondary",
                        variant: "body2",
                        textAlign: "center",
                      }}
                    />
                  </ListItem>
                )}
                {paginatedQuests.map((quest) => {
                  const progress = getQuestProgress(quest.id)
                  const daysUntil = getDaysUntil(quest.targetDate)
                  const isOverdue =
                    daysUntil < 0 && quest.status !== "quest-complete"

                  return (
                    <ListItem
                      key={quest.id}
                      sx={{
                        py: 1.5,
                        px: 2,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        bgcolor: isOverdue
                          ? alpha(theme.palette.error.main, 0.05)
                          : "transparent",
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        {quest.status === "quest-complete" ? (
                          <CheckCircleIcon
                            sx={{ fontSize: 20, color: "success.main" }}
                          />
                        ) : (
                          <RadioButtonUncheckedIcon
                            sx={{ fontSize: 20, color: "text.disabled" }}
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
                            <Typography variant="body2" fontWeight={500}>
                              {quest.title}
                            </Typography>
                            {isOverdue && (
                              <WarningIcon
                                sx={{ fontSize: 14, color: "error.main" }}
                              />
                            )}
                            {quest.xpReward && (
                              <Chip
                                label={`+${quest.xpReward} XP`}
                                size="small"
                                sx={{
                                  height: 18,
                                  fontSize: "0.65rem",
                                  bgcolor: alpha(
                                    theme.palette.warning.main,
                                    0.1,
                                  ),
                                  color: theme.palette.warning.main,
                                }}
                              />
                            )}
                          </Box>
                        }
                        secondary={
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
                              sx={{
                                flex: 1,
                                height: 3,
                                borderRadius: 2,
                                maxWidth: 100,
                              }}
                            />
                            <Typography variant="caption">
                              {progress}%
                            </Typography>
                          </Box>
                        }
                      />
                      <Chip
                        label={statusLabels[quest.status]}
                        size="small"
                        color={statusColors[quest.status]}
                        sx={{ fontSize: "0.65rem", height: 20 }}
                      />
                    </ListItem>
                  )
                })}
              </List>
              {questsTotalPages > 1 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 1,
                    borderTop: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <IconButton
                    size="small"
                    disabled={questsPage === 0}
                    onClick={() => setQuestsPage((p) => p - 1)}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                  <Typography variant="caption" sx={{ mx: 1 }}>
                    {questsPage + 1} / {questsTotalPages}
                  </Typography>
                  <IconButton
                    size="small"
                    disabled={questsPage >= questsTotalPages - 1}
                    onClick={() => setQuestsPage((p) => p + 1)}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          )}

          {/* Objectives Tab */}
          {tab === 1 && (
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <List dense disablePadding sx={{ flex: 1, overflow: "auto" }}>
                {questlineObjectives.length === 0 && (
                  <ListItem sx={{ height: 180, justifyContent: "center" }}>
                    <ListItemText
                      primary="No objectives yet"
                      primaryTypographyProps={{
                        color: "text.secondary",
                        variant: "body2",
                        textAlign: "center",
                      }}
                    />
                  </ListItem>
                )}
                {paginatedObjectives.map((objective) => (
                  <ListItem
                    key={objective.id}
                    sx={{
                      py: 1,
                      px: 2,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {objective.status === "done" ? (
                        <CheckCircleIcon
                          sx={{ fontSize: 20, color: "success.main" }}
                        />
                      ) : (
                        <RadioButtonUncheckedIcon
                          sx={{ fontSize: 20, color: "text.disabled" }}
                        />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
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
                              color={theme.palette.warning.main}
                            >
                              +{objective.xpReward} XP
                            </Typography>
                          )}
                        </Box>
                      }
                    />
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
                      sx={{ fontSize: "0.65rem", height: 20 }}
                    />
                  </ListItem>
                ))}
              </List>
              {objectivesTotalPages > 1 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 1,
                    borderTop: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <IconButton
                    size="small"
                    disabled={objectivesPage === 0}
                    onClick={() => setObjectivesPage((p) => p - 1)}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                  <Typography variant="caption" sx={{ mx: 1 }}>
                    {objectivesPage + 1} / {objectivesTotalPages}
                  </Typography>
                  <IconButton
                    size="small"
                    disabled={objectivesPage >= objectivesTotalPages - 1}
                    onClick={() => setObjectivesPage((p) => p + 1)}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Card>
    )
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          🗺️ Questlines
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your thematic groupings of quests - major areas of focus
        </Typography>
      </Box>

      {/* Business Questlines */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          💼 Business Questlines
          <Chip label={businessQuestlines.length} size="small" />
        </Typography>
        <Grid container spacing={3}>
          {businessQuestlines.map((questline) => (
            <Grid item xs={12} md={6} lg={4} key={questline.id}>
              <QuestlineCard questline={questline} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Personal Questlines */}
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          🧘 Personal Questlines
          <Chip label={personalQuestlines.length} size="small" />
        </Typography>
        <Grid container spacing={3}>
          {personalQuestlines.map((questline) => (
            <Grid item xs={12} md={6} lg={4} key={questline.id}>
              <QuestlineCard questline={questline} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
