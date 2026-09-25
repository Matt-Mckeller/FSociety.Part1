/**
 * StorylinesView - View and manage Storylines
 * Storylines are products/projects that can span multiple campaigns
 */
import { useState, useMemo } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  alpha,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  useTheme,
  type Theme,
} from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import { SearchInput, FilterBar } from "./common"
import { useGameData } from "../hooks"
import type { Storyline } from "../types"

const ITEMS_PER_PAGE = 3
const CARD_HEIGHT = 520

const statusColors: Record<
  string,
  "default" | "warning" | "success" | "error"
> = {
  "not-started": "default",
  "in-progress": "warning",
  "quest-complete": "success",
  blocked: "error",
  paused: "default",
  cancelled: "error",
  concept: "default",
  todo: "default",
  done: "success",
}

const statusLabels: Record<string, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  "quest-complete": "Quest Complete",
  blocked: "Blocked",
  paused: "Paused",
  cancelled: "Cancelled",
  concept: "Concept",
  todo: "To Do",
  done: "Done",
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

export function StorylinesView() {
  const theme = useTheme()
  // Use context hooks instead of direct imports
  const { storylines, quests, campaigns } = useGameData()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  // Get campaign filter from URL params
  const campaignFilterFromUrl = searchParams.get("campaign") || "all"

  const [search, setSearch] = useState("")
  const [campaignFilter, setCampaignFilter] = useState(campaignFilterFromUrl)
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Update URL when campaign filter changes
  const handleCampaignFilterChange = (value: string) => {
    setCampaignFilter(value)
    if (value === "all") {
      searchParams.delete("campaign")
    } else {
      searchParams.set("campaign", value)
    }
    setSearchParams(searchParams)
  }

  const getStorylineQuests = (storylineId: string) =>
    quests.filter((q) => q.storylineId === storylineId)
  const getCampaign = (campaignId: string) =>
    campaigns.find((c) => c.id === campaignId)

  const getStorylineXP = (storylineId: string) => {
    const storylineQuests = quests.filter((q) => q.storylineId === storylineId)
    const earned = storylineQuests
      .filter((q) => q.status === "quest-complete")
      .reduce((sum, q) => sum + (q.xpReward || 0), 0)
    const total = storylineQuests.reduce((sum, q) => sum + (q.xpReward || 0), 0)
    return { earned, total }
  }

  // Filter storylines
  const filteredStorylines = useMemo(() => {
    let result = [...storylines]

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(searchLower) ||
          s.description.toLowerCase().includes(searchLower),
      )
    }

    // Campaign filter
    if (campaignFilter !== "all") {
      const campaign = campaigns.find((c) => c.id === campaignFilter)
      if (campaign) {
        result = result.filter((s) => campaign.storylineIds?.includes(s.id))
      }
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((s) => s.status === statusFilter)
    }

    return result
  }, [search, campaignFilter, statusFilter])

  // Group filtered storylines
  const activeStorylines = filteredStorylines.filter(
    (s) => s.status === "in-progress",
  )
  const pausedStorylines = filteredStorylines.filter(
    (s) => s.status === "paused",
  )
  const otherStorylines = filteredStorylines.filter(
    (s) => !["in-progress", "paused"].includes(s.status),
  )

  // Navigate to quests filtered by storyline
  const handleViewQuests = (storylineId: string) => {
    navigate(`/missions/quests?storyline=${storylineId}`)
  }

  // Navigate to storyline wiki page
  const handleStorylineClick = (storylineId: string) => {
    navigate(`/missions/storylines/${storylineId}`)
  }

  // Navigate to campaign
  const handleCampaignClick = (_campaignId: string) => {
    navigate(`/missions/campaigns`)
    // In the future, could navigate to specific campaign detail
  }

  const StorylineCard = ({ storyline }: { storyline: Storyline }) => {
    const [questsPage, setQuestsPage] = useState(0)

    const storylineQuests = getStorylineQuests(storyline.id)
    const xp = getStorylineXP(storyline.id)
    const storylineCampaigns =
      storyline.campaignIds?.map(getCampaign).filter(Boolean) || []

    const completedQuests = storylineQuests.filter(
      (q) => q.status === "quest-complete",
    ).length
    const questProgress =
      storylineQuests.length > 0
        ? (completedQuests / storylineQuests.length) * 100
        : 0

    // Pagination
    const questsTotalPages = Math.ceil(storylineQuests.length / ITEMS_PER_PAGE)
    const paginatedQuests = storylineQuests.slice(
      questsPage * ITEMS_PER_PAGE,
      (questsPage + 1) * ITEMS_PER_PAGE,
    )

    return (
      <Card
        onClick={() => handleStorylineClick(storyline.id)}
        sx={{
          height: CARD_HEIGHT,
          display: "flex",
          flexDirection: "column",
          borderTop: 4,
          borderColor: storyline.color,
          opacity: storyline.status === "paused" ? 0.7 : 1,
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0 8px 25px -5px rgb(0 0 0 / 0.15)",
            transform: "translateY(-2px)",
          },
          transition: "all 0.2s ease",
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
              <Typography sx={{ fontSize: "1.5rem" }}>📖</Typography>
              <Typography variant="h5" fontWeight={700} color="text.primary">
                {storyline.name}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Chip
                icon={<AutoStoriesIcon sx={{ fontSize: 16 }} />}
                label="Wiki"
                size="small"
                onClick={(e) => {
                  e.stopPropagation()
                  handleStorylineClick(storyline.id)
                }}
                sx={{
                  fontWeight: 600,
                  bgcolor: alpha(theme.palette.info.main, 0.1),
                  color: theme.palette.info.main,
                  "&:hover": {
                    bgcolor: alpha(theme.palette.info.main, 0.2),
                  },
                  "& .MuiChip-icon": {
                    color: theme.palette.info.main,
                  },
                }}
              />
              <Chip
                label={storyline.priority}
                size="small"
                color={
                  storyline.priority === "P1"
                    ? "error"
                    : storyline.priority === "P2"
                      ? "warning"
                      : "default"
                }
                sx={{ fontWeight: 600 }}
              />
              <Chip
                label={statusLabels[storyline.status]}
                size="small"
                variant="outlined"
                color={statusColors[storyline.status]}
                sx={{ fontWeight: 500 }}
              />
            </Stack>
          </Box>

          <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
            {storyline.description}
          </Typography>

          {/* Campaign Badges - Clickable */}
          {storylineCampaigns.length > 0 && (
            <Stack
              direction="row"
              spacing={1}
              sx={{ mb: 2, flexWrap: "wrap", gap: 0.5 }}
            >
              {storylineCampaigns.map(
                (campaign) =>
                  campaign && (
                    <Chip
                      key={campaign.id}
                      label={campaign.title}
                      size="small"
                      onClick={() => handleCampaignClick(campaign.id)}
                      sx={{
                        bgcolor: alpha(campaign.color, 0.15),
                        color: campaign.color,
                        fontWeight: 600,
                        fontSize: "0.7rem",
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: alpha(campaign.color, 0.25),
                        },
                      }}
                    />
                  ),
              )}
            </Stack>
          )}

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

          {/* Quest Progress */}
          <Box sx={{ mb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Quests
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {completedQuests}/{storylineQuests.length}
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
        </CardContent>

        <Divider />

        {/* Quest List */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1,
              bgcolor: alpha(storyline.color, 0.05),
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle2" fontWeight={600}>
              ⚔️ Quests
            </Typography>
            <Button
              size="small"
              endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
              onClick={() => handleViewQuests(storyline.id)}
              sx={{ textTransform: "none", fontSize: "0.75rem" }}
            >
              View All
            </Button>
          </Box>
          <List dense disablePadding sx={{ flex: 1, overflow: "auto" }}>
            {storylineQuests.length === 0 && (
              <ListItem sx={{ height: 120, justifyContent: "center" }}>
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
            {paginatedQuests.map((quest) => (
              <ListItem
                key={quest.id}
                sx={{
                  py: 1.5,
                  px: 2,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: alpha(storyline.color, 0.05),
                  },
                }}
                onClick={() => navigate(`/missions/quests?quest=${quest.id}`)}
              >
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {quest.status === "quest-complete" ? (
                    <CheckCircleIcon
                      sx={{ fontSize: 20, color: "success.main" }}
                    />
                  ) : quest.status === "in-progress" ? (
                    <RadioButtonUncheckedIcon
                      sx={{ fontSize: 20, color: "warning.main" }}
                    />
                  ) : (
                    <RadioButtonUncheckedIcon
                      sx={{ fontSize: 20, color: "text.disabled" }}
                    />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body2" fontWeight={500}>
                        {quest.title}
                      </Typography>
                      {quest.xpReward && (
                        <Chip
                          label={`+${quest.xpReward} XP`}
                          size="small"
                          sx={{
                            height: 18,
                            fontSize: "0.65rem",
                            bgcolor: alpha(theme.palette.warning.main, 0.1),
                            color: theme.palette.warning.main,
                          }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mt: 0.5 }}
                    >
                      {quest.description}
                    </Typography>
                  }
                />
                <Chip
                  label={statusLabels[quest.status]}
                  size="small"
                  color={statusColors[quest.status]}
                  sx={{ fontSize: "0.65rem", height: 20 }}
                />
              </ListItem>
            ))}
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
      </Card>
    )
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          📖 Storylines
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Products and projects that span across campaigns
        </Typography>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ py: 2, "&:last-child": { pb: 2 } }}>
          <FilterBar>
            <SearchInput
              value={search}
              onValueChange={setSearch}
              placeholder="Search storylines..."
              width="md"
            />

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Campaign</InputLabel>
              <Select
                value={campaignFilter}
                label="Campaign"
                onChange={(e) => handleCampaignFilterChange(e.target.value)}
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
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="in-progress">Active</MenuItem>
                <MenuItem value="paused">Paused</MenuItem>
                <MenuItem value="not-started">Not Started</MenuItem>
              </Select>
            </FormControl>

            {(campaignFilter !== "all" || statusFilter !== "all" || search) && (
              <Button
                size="small"
                onClick={() => {
                  setSearch("")
                  setCampaignFilter("all")
                  setStatusFilter("all")
                  searchParams.delete("campaign")
                  setSearchParams(searchParams)
                }}
                sx={{ textTransform: "none" }}
              >
                Clear Filters
              </Button>
            )}
          </FilterBar>
        </CardContent>
      </Card>

      {/* Active Storylines */}
      {activeStorylines.length > 0 && (
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
            🔥 Active Storylines
            <Chip
              label={activeStorylines.length}
              size="small"
              color="warning"
            />
          </Typography>
          <Grid container spacing={3}>
            {activeStorylines.map((storyline) => (
              <Grid item xs={12} md={6} lg={4} key={storyline.id}>
                <StorylineCard storyline={storyline} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Paused Storylines */}
      {pausedStorylines.length > 0 && (
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
            ⏸️ Paused Storylines
            <Chip label={pausedStorylines.length} size="small" />
          </Typography>
          <Grid container spacing={3}>
            {pausedStorylines.map((storyline) => (
              <Grid item xs={12} md={6} lg={4} key={storyline.id}>
                <StorylineCard storyline={storyline} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Other Storylines */}
      {otherStorylines.length > 0 && (
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
            📋 Other Storylines
            <Chip label={otherStorylines.length} size="small" />
          </Typography>
          <Grid container spacing={3}>
            {otherStorylines.map((storyline) => (
              <Grid item xs={12} md={6} lg={4} key={storyline.id}>
                <StorylineCard storyline={storyline} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* No Results */}
      {filteredStorylines.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography color="text.secondary">
            No storylines match your filters
          </Typography>
        </Box>
      )}
    </Box>
  )
}
