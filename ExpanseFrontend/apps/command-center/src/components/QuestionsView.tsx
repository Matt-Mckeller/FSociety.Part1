import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Chip,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  IconButton,
  Collapse,
  Divider,
  Button,
  Stack,
} from "@mui/material"
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  HelpOutline as HelpIcon,
  Explore as ExploreIcon,
  Schedule as DeferredIcon,
  Add as AddIcon,
} from "@mui/icons-material"
import { SearchInput, FilterBar } from "./common"
import { useQuestions, useProjects } from "../contexts"
import type { QuestionStatus, QuestionCategory } from "../types"

const statusConfig: Record<
  QuestionStatus,
  {
    label: string
    color: "default" | "success" | "warning" | "info"
    icon: React.ReactNode
  }
> = {
  open: {
    label: "Open",
    color: "warning",
    icon: <HelpIcon fontSize="small" />,
  },
  exploring: {
    label: "Exploring",
    color: "info",
    icon: <ExploreIcon fontSize="small" />,
  },
  answered: {
    label: "Answered",
    color: "success",
    icon: <CheckCircleIcon fontSize="small" />,
  },
  deferred: {
    label: "Deferred",
    color: "default",
    icon: <DeferredIcon fontSize="small" />,
  },
}

const categoryColors: Record<QuestionCategory, string> = {
  strategy: "#8B5CF6",
  architecture: "#06B6D4",
  priority: "#F59E0B",
  financial: "#10B981",
  personal: "#EC4899",
  timeline: "#3B82F6",
}

export function QuestionsView() {
  const [filter, setFilter] = useState<QuestionStatus | "all">("all")
  const [categoryFilter, setCategoryFilter] = useState<
    QuestionCategory | "all"
  >("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const { questions } = useQuestions()
  const { projects } = useProjects()

  const filteredQuestions = questions.filter((q) => {
    if (filter !== "all" && q.status !== filter) return false
    if (categoryFilter !== "all" && q.category !== categoryFilter) return false
    if (searchQuery) {
      const search = searchQuery.toLowerCase()
      return (
        q.question.toLowerCase().includes(search) ||
        q.context?.toLowerCase().includes(search) ||
        q.answer?.toLowerCase().includes(search) ||
        q.tags?.some((t) => t.toLowerCase().includes(search))
      )
    }
    return true
  })

  const openCount = questions.filter((q) => q.status === "open").length
  const exploringCount = questions.filter(
    (q) => q.status === "exploring",
  ).length
  const answeredCount = questions.filter((q) => q.status === "answered").length

  const getProjectName = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId)
    return project?.name || projectId
  }

  const getProjectColor = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId)
    return project?.color || "#888"
  }

  return (
    <Box>
      {/* Header Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              bgcolor: "warning.dark",
              color: "white",
            }}
          >
            <Typography variant="h3" fontWeight={700}>
              {openCount}
            </Typography>
            <Typography>Open Questions</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              bgcolor: "info.dark",
              color: "white",
            }}
          >
            <Typography variant="h3" fontWeight={700}>
              {exploringCount}
            </Typography>
            <Typography>Exploring</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              bgcolor: "success.dark",
              color: "white",
            }}
          >
            <Typography variant="h3" fontWeight={700}>
              {answeredCount}
            </Typography>
            <Typography>Answered</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <FilterBar justify="start">
          <SearchInput
            value={searchQuery}
            onValueChange={setSearchQuery}
            placeholder="Search questions..."
            width="md"
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filter}
              label="Status"
              onChange={(e) =>
                setFilter(e.target.value as QuestionStatus | "all")
              }
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="exploring">Exploring</MenuItem>
              <MenuItem value="answered">Answered</MenuItem>
              <MenuItem value="deferred">Deferred</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              label="Category"
              onChange={(e) =>
                setCategoryFilter(e.target.value as QuestionCategory | "all")
              }
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="strategy">Strategy</MenuItem>
              <MenuItem value="architecture">Architecture</MenuItem>
              <MenuItem value="priority">Priority</MenuItem>
              <MenuItem value="financial">Financial</MenuItem>
              <MenuItem value="timeline">Timeline</MenuItem>
              <MenuItem value="personal">Personal</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              /* TODO: Add question modal */
            }}
          >
            Add Question
          </Button>
        </FilterBar>
      </Paper>

      {/* Questions List */}
      <Stack spacing={2}>
        {filteredQuestions.map((question) => {
          const isExpanded = expandedId === question.id
          const statusInfo = statusConfig[question.status]

          return (
            <Card
              key={question.id}
              sx={{
                borderLeft: 4,
                borderColor: categoryColors[question.category],
                "&:hover": { boxShadow: 4 },
              }}
            >
              <CardContent sx={{ pb: isExpanded ? 1 : 2 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Chip
                        size="small"
                        label={statusInfo.label}
                        color={statusInfo.color}
                        icon={statusInfo.icon as React.ReactElement}
                      />
                      <Chip
                        size="small"
                        label={question.category}
                        sx={{
                          bgcolor: categoryColors[question.category] + "20",
                          color: categoryColors[question.category],
                          fontWeight: 600,
                        }}
                      />
                      {question.tags?.map((tag) => (
                        <Chip
                          key={tag}
                          size="small"
                          label={tag}
                          variant="outlined"
                        />
                      ))}
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {question.question}
                    </Typography>

                    {question.context && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {question.context}
                      </Typography>
                    )}

                    {question.projectIds && question.projectIds.length > 0 && (
                      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        {question.projectIds.map((pid) => (
                          <Chip
                            key={pid}
                            size="small"
                            label={getProjectName(pid)}
                            sx={{
                              bgcolor: getProjectColor(pid) + "20",
                              color: getProjectColor(pid),
                              fontWeight: 500,
                              fontSize: "0.7rem",
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  </Box>

                  <IconButton
                    onClick={() =>
                      setExpandedId(isExpanded ? null : question.id)
                    }
                    sx={{
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Box>

                <Collapse in={isExpanded}>
                  <Divider sx={{ my: 2 }} />

                  {question.status === "answered" && question.answer && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle2"
                        color="success.main"
                        gutterBottom
                      >
                        ✅ Answer
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {question.answer}
                      </Typography>

                      {question.reasoning && (
                        <Box
                          sx={{
                            mt: 1,
                            pl: 2,
                            borderLeft: 2,
                            borderColor: "success.light",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            <strong>Reasoning:</strong> {question.reasoning}
                          </Typography>
                        </Box>
                      )}

                      {question.implications &&
                        question.implications.length > 0 && (
                          <Box sx={{ mt: 1 }}>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              Implications:
                            </Typography>
                            <ul style={{ margin: "4px 0", paddingLeft: 20 }}>
                              {question.implications.map((impl, i) => (
                                <li key={i}>
                                  <Typography variant="body2">
                                    {impl}
                                  </Typography>
                                </li>
                              ))}
                            </ul>
                          </Box>
                        )}
                    </Box>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      fontSize: "0.75rem",
                      color: "text.secondary",
                    }}
                  >
                    <span>Created: {question.createdDate}</span>
                    {question.answeredDate && (
                      <span>Answered: {question.answeredDate}</span>
                    )}
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          )
        })}
      </Stack>

      {filteredQuestions.length === 0 && (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography color="text.secondary">
            No questions match the current filters.
          </Typography>
        </Paper>
      )}
    </Box>
  )
}
