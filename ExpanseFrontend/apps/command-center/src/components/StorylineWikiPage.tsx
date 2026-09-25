/**
 * StorylineWikiPage - Detailed wiki-style page for a storyline
 * V2: Unified container design with collapsible sections
 * Organized into Planning | Development | Operations tabs
 */
import { useState, useEffect, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Box,
  Card,
  Typography,
  Chip,
  Stack,
  IconButton,
  alpha,
  Button,
  Grid,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  Tabs,
  Tab,
  useTheme,
} from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import CodeIcon from "@mui/icons-material/Code"
import WidgetsIcon from "@mui/icons-material/Widgets"
import FlagIcon from "@mui/icons-material/Flag"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline"
import CloseIcon from "@mui/icons-material/Close"
import DescriptionIcon from "@mui/icons-material/Description"
import SettingsIcon from "@mui/icons-material/Settings"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import CircularProgress from "@mui/material/CircularProgress"

import { useGameData } from "../hooks"
import type {
  Quest,
  StorylineWiki,
  CampaignGoal,
  QuestCategory,
  StorylineSection,
} from "../types"
import { getCategoryColorConfig } from "./common/CategoryBadge"
import { CollapsibleSection } from "./common/CollapsibleSection"
import { StorylineChat } from "./StorylineChat"

// Import from storyline module
import { referenceItems, loadWiki } from "./storyline"

// Import shared game constants (extended status for storylines)
import {
  extendedStatusColors as statusColors,
  extendedStatusLabels as statusLabels,
} from "./shared/game-constants"

export function StorylineWikiPage() {
  const theme = useTheme()
  const { storylineId } = useParams<{ storylineId: string }>()
  const navigate = useNavigate()
  const { storylines, campaigns, quests } = useGameData()

  const [wiki, setWiki] = useState<StorylineWiki | null>(null)
  const [_loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<number>(0)
  const [storybookModal, setStorybookModal] = useState<{
    open: boolean
    url: string
    name: string
  }>({
    open: false,
    url: "",
    name: "",
  })

  // Find storyline data
  const storyline = useMemo(
    () => storylines.find((s) => s.id === storylineId),
    [storylineId],
  )

  // Find parent campaigns
  const parentCampaigns = useMemo(
    () =>
      campaigns.filter(
        (c) =>
          storyline?.campaignIds?.includes(c.id) ||
          c.storylineIds?.includes(storylineId || ""),
      ),
    [storyline, storylineId],
  )

  // Find quests for this storyline
  const storylineQuests = useMemo(
    () => quests.filter((q) => q.storylineId === storylineId),
    [storylineId],
  )

  // Count quests by category
  const questsByCategory = useMemo(() => {
    const counts: Record<QuestCategory, Quest[]> = {
      planning: [],
      development: [],
      operations: [],
    }
    storylineQuests.forEach((q) => {
      if (q.category && counts[q.category]) counts[q.category].push(q)
    })
    return counts
  }, [storylineQuests])

  // Get campaign goals that link to this storyline
  const linkedCampaignGoals = useMemo(() => {
    const goals: Array<
      CampaignGoal & { campaignTitle: string; campaignColor: string }
    > = []
    parentCampaigns.forEach((campaign) => {
      campaign.goals?.forEach((goal) => {
        if (goal.storylineIds?.includes(storylineId || "")) {
          goals.push({
            ...goal,
            campaignTitle: campaign.title,
            campaignColor: campaign.color,
          })
        }
      })
    })
    return goals
  }, [parentCampaigns, storylineId])

  // Calculate progress
  const completedQuests = storylineQuests.filter(
    (q) => q.status === "quest-complete",
  ).length
  const totalQuests = storylineQuests.length
  const progress =
    totalQuests > 0 ? Math.round((completedQuests / totalQuests) * 100) : 0

  // Goals count
  const totalGoals = (wiki?.goals?.length || 0) + linkedCampaignGoals.length
  const completedGoals =
    linkedCampaignGoals.filter((g) => g.status === "achieved").length +
    (wiki?.goals?.filter((g) => g.status === "complete").length || 0)

  // Load wiki data
  useEffect(() => {
    if (storylineId) {
      setLoading(true)
      loadWiki(storylineId).then((data) => {
        setWiki(data)
        setLoading(false)
      })
    }
  }, [storylineId])

  if (!storyline) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          Storyline not found
        </Typography>
        <Button onClick={() => navigate("/missions/storylines")} sx={{ mt: 2 }}>
          Back to Storylines
        </Button>
      </Box>
    )
  }

  const handleOpenStorybook = (url: string, name: string) => {
    setStorybookModal({ open: true, url, name })
  }

  // Get current tab's quests
  const currentQuests =
    activeTab === 0
      ? questsByCategory.planning
      : activeTab === 1
        ? questsByCategory.development
        : activeTab === 2
          ? questsByCategory.operations
          : storylineQuests

  return (
    <Box>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/missions/storylines")}
        sx={{ mb: 1.5, color: "text.secondary", fontSize: "0.85rem" }}
      >
        Back to Storylines
      </Button>

      {/* ═══════════════════════════════════════════════════════════════════
          UNIFIED MAIN CONTAINER
          ═══════════════════════════════════════════════════════════════════ */}
      <Card sx={{ borderTop: 4, borderColor: storyline.color }}>
        {/* ─────────────────────────────────────────────────────────────────
            HEADER SECTION (inside card)
            ───────────────────────────────────────────────────────────────── */}
        <Box
          sx={{ px: 2, pt: 2, pb: 1.5, bgcolor: alpha(storyline.color, 0.02) }}
        >
          {/* Title Row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flex: 1,
                minWidth: 0,
              }}
            >
              <Typography variant="h5" fontWeight={700} noWrap>
                {storyline.name}
              </Typography>
              <Chip
                label={storyline.priority}
                size="small"
                sx={{
                  bgcolor:
                    storyline.priority === "P1"
                      ? "#EF4444"
                      : storyline.priority === "P2"
                        ? "#F59E0B"
                        : "#6B7280",
                  color: "white",
                  fontWeight: 600,
                  height: 20,
                  fontSize: "0.65rem",
                }}
              />
              <Chip
                label={statusLabels[storyline.status] || storyline.status}
                size="small"
                sx={{
                  bgcolor: alpha(
                    statusColors[storyline.status] || "#6B7280",
                    0.15,
                  ),
                  color: statusColors[storyline.status] || "#6B7280",
                  fontWeight: 600,
                  height: 20,
                  fontSize: "0.65rem",
                }}
              />
            </Box>
            {/* Progress Circle */}
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress
                variant="determinate"
                value={progress}
                size={42}
                thickness={4}
                sx={{
                  color: storyline.color,
                  "& .MuiCircularProgress-circle": { strokeLinecap: "round" },
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="caption"
                  fontWeight={700}
                  sx={{ fontSize: "0.65rem" }}
                >
                  {progress}%
                </Typography>
              </Box>
              <CircularProgress
                variant="determinate"
                value={100}
                size={42}
                thickness={4}
                sx={{
                  color: alpha(storyline.color, 0.15),
                  position: "absolute",
                  left: 0,
                  zIndex: -1,
                }}
              />
            </Box>
          </Box>

          {/* Quick Info Row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              flexWrap: "wrap",
            }}
          >
            {parentCampaigns.map((campaign) => (
              <Chip
                key={campaign.id}
                label={campaign.title}
                size="small"
                onClick={() => navigate(`/missions/campaigns`)}
                sx={{
                  bgcolor: campaign.color,
                  color: "white",
                  fontWeight: 600,
                  cursor: "pointer",
                  height: 20,
                  fontSize: "0.65rem",
                  "&:hover": { opacity: 0.8 },
                }}
              />
            ))}
            <Box sx={{ width: 1, height: 14, bgcolor: "divider", mx: 0.25 }} />
            <Chip
              label={`${totalQuests} Quests`}
              size="small"
              sx={{
                bgcolor: alpha(storyline.color, 0.1),
                color: storyline.color,
                fontWeight: 600,
                height: 20,
                fontSize: "0.65rem",
              }}
            />
            <Chip
              label={`${totalGoals} Goals`}
              size="small"
              sx={{
                bgcolor: alpha("#10B981", 0.1),
                color: "#10B981",
                fontWeight: 600,
                height: 20,
                fontSize: "0.65rem",
              }}
            />
          </Box>

          {/* Description - single line with ellipsis */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              fontSize: "0.8rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {storyline.description}
          </Typography>
        </Box>

        {/* ─────────────────────────────────────────────────────────────────
            TABS (inside card)
            ───────────────────────────────────────────────────────────────── */}
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{
            minHeight: 40,
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: alpha(storyline.color, 0.01),
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              minHeight: 40,
              py: 0.5,
              fontSize: "0.85rem",
            },
            "& .MuiTabs-indicator": { bgcolor: storyline.color },
          }}
        >
          <Tab
            icon={<DescriptionIcon sx={{ fontSize: 16 }} />}
            iconPosition="start"
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                Planning
                <Chip
                  label={questsByCategory.planning.length}
                  size="small"
                  sx={{
                    height: 16,
                    fontSize: "0.6rem",
                    bgcolor: getCategoryColorConfig(theme, "planning").bgColor,
                    color: getCategoryColorConfig(theme, "planning").color,
                    "& .MuiChip-label": { px: 0.5 },
                  }}
                />
              </Box>
            }
          />
          <Tab
            icon={<CodeIcon sx={{ fontSize: 16 }} />}
            iconPosition="start"
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                Development
                <Chip
                  label={questsByCategory.development.length}
                  size="small"
                  sx={{
                    height: 16,
                    fontSize: "0.6rem",
                    bgcolor: getCategoryColorConfig(theme, "development")
                      .bgColor,
                    color: getCategoryColorConfig(theme, "development").color,
                    "& .MuiChip-label": { px: 0.5 },
                  }}
                />
              </Box>
            }
          />
          <Tab
            icon={<SettingsIcon sx={{ fontSize: 16 }} />}
            iconPosition="start"
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                Operations
                <Chip
                  label={questsByCategory.operations.length}
                  size="small"
                  sx={{
                    height: 16,
                    fontSize: "0.6rem",
                    bgcolor: getCategoryColorConfig(theme, "operations")
                      .bgColor,
                    color: getCategoryColorConfig(theme, "operations").color,
                    "& .MuiChip-label": { px: 0.5 },
                  }}
                />
              </Box>
            }
          />
          <Tab
            icon={<SmartToyIcon sx={{ fontSize: 16 }} />}
            iconPosition="start"
            label="AI Chat"
          />
        </Tabs>

        {/* ─────────────────────────────────────────────────────────────────
            CONTENT AREA - Collapsible Sections
            ───────────────────────────────────────────────────────────────── */}

        {/* AI CHAT TAB - Full height chat */}
        {activeTab === 3 && (
          <Box sx={{ p: 2 }}>
            <StorylineChat
              storylineId={storylineId || ""}
              storylineTitle={storyline.name}
            />
          </Box>
        )}

        {/* P/D/O TABS - Unified sections */}
        {activeTab !== 3 && (
          <>
            {/* ═══ GOALS SECTION (Pinned - visible on all P/D/O tabs) ═══ */}
            <CollapsibleSection
              title="Goals"
              icon={<FlagIcon sx={{ fontSize: 18 }} />}
              badge={`${completedGoals}/${totalGoals}`}
              badgeColor="#10B981"
              pinned
              noDivider
              collapsedSummary={
                totalGoals > 0 ? (
                  <>
                    {linkedCampaignGoals.filter(
                      (g) => g.status === "in-progress",
                    ).length > 0 && (
                      <Chip
                        label={`${linkedCampaignGoals.filter((g) => g.status === "in-progress").length} Active`}
                        size="small"
                        sx={{
                          height: 16,
                          fontSize: "0.6rem",
                          bgcolor: alpha("#F59E0B", 0.15),
                          color: "#F59E0B",
                          "& .MuiChip-label": { px: 0.5 },
                        }}
                      />
                    )}
                  </>
                ) : undefined
              }
            >
              {totalGoals === 0 ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ py: 1, textAlign: "center" }}
                >
                  No goals defined yet
                </Typography>
              ) : (
                <Stack spacing={0.75}>
                  {/* Campaign Goals */}
                  {linkedCampaignGoals.map((goal) => (
                    <Box
                      key={goal.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        py: 0.5,
                      }}
                    >
                      {goal.status === "achieved" ? (
                        <CheckCircleIcon
                          sx={{ color: "#10B981", fontSize: 16 }}
                        />
                      ) : goal.status === "in-progress" ? (
                        <RadioButtonUncheckedIcon
                          sx={{ color: "#F59E0B", fontSize: 16 }}
                        />
                      ) : (
                        <RadioButtonUncheckedIcon
                          sx={{ color: "#6B7280", fontSize: 16 }}
                        />
                      )}
                      <Typography
                        variant="body2"
                        sx={{ flex: 1, fontSize: "0.8rem" }}
                      >
                        {goal.description}
                      </Typography>
                      <Chip
                        label={goal.timeframe}
                        size="small"
                        variant="outlined"
                        sx={{ height: 18, fontSize: "0.6rem" }}
                      />
                    </Box>
                  ))}
                  {/* Storyline Goals */}
                  {wiki?.goals?.map((goal) => (
                    <Box
                      key={goal.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        py: 0.5,
                      }}
                    >
                      {goal.status === "complete" ? (
                        <CheckCircleIcon
                          sx={{ color: "#10B981", fontSize: 16 }}
                        />
                      ) : goal.status === "in-progress" ? (
                        <RadioButtonUncheckedIcon
                          sx={{ color: "#F59E0B", fontSize: 16 }}
                        />
                      ) : (
                        <RadioButtonUncheckedIcon
                          sx={{ color: "#6B7280", fontSize: 16 }}
                        />
                      )}
                      <Typography
                        variant="body2"
                        sx={{ flex: 1, fontSize: "0.8rem" }}
                      >
                        {goal.title}
                      </Typography>
                      <Chip
                        label={goal.timeframe}
                        size="small"
                        variant="outlined"
                        sx={{ height: 18, fontSize: "0.6rem" }}
                      />
                    </Box>
                  ))}
                </Stack>
              )}
            </CollapsibleSection>

            {/* ═══ PLANNING TAB CONTENT ═══ */}
            {activeTab === 0 && (
              <>
                {/* Overview */}
                <CollapsibleSection
                  title="Overview"
                  icon={<DescriptionIcon sx={{ fontSize: 18 }} />}
                  badgeColor="#3B82F6"
                  defaultOpen={false}
                >
                  {wiki?.overview?.html ? (
                    <Box
                      dangerouslySetInnerHTML={{ __html: wiki.overview.html }}
                      sx={{
                        "& h2, & h3": { mt: 0, mb: 1, fontSize: "0.95rem" },
                        "& p": {
                          color: "text.secondary",
                          fontSize: "0.85rem",
                          mb: 1,
                        },
                        "& ul": { pl: 2, mb: 1 },
                        "& li": { fontSize: "0.85rem" },
                      }}
                    />
                  ) : (
                    <Box sx={{ py: 2, textAlign: "center" }}>
                      <Typography variant="body2" color="text.secondary">
                        No overview content yet
                      </Typography>
                      <Button
                        size="small"
                        startIcon={<AutoAwesomeIcon />}
                        disabled
                        sx={{ mt: 1, opacity: 0.6 }}
                      >
                        Generate with AI
                      </Button>
                    </Box>
                  )}
                </CollapsibleSection>

                {/* Documentation Reference */}
                <CollapsibleSection
                  title="Documentation"
                  icon={<InfoOutlinedIcon sx={{ fontSize: 18 }} />}
                  badgeColor="#6366F1"
                  defaultOpen={false}
                >
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                    {referenceItems.map((item) => (
                      <Tooltip
                        key={item.label}
                        title={item.tooltip}
                        arrow
                        placement="top"
                      >
                        <Chip
                          icon={
                            <span style={{ fontSize: "0.75rem" }}>
                              {item.icon}
                            </span>
                          }
                          label={item.label}
                          size="small"
                          variant="outlined"
                          sx={{
                            cursor: "help",
                            height: 24,
                            fontSize: "0.7rem",
                            "&:hover": {
                              bgcolor: alpha("#6366F1", 0.05),
                              borderColor: "#6366F1",
                            },
                          }}
                        />
                      </Tooltip>
                    ))}
                  </Box>
                </CollapsibleSection>

                {/* Planning Sections from Wiki */}
                {wiki?.planningSections
                  ?.sort(
                    (a: StorylineSection, b: StorylineSection) =>
                      a.order - b.order,
                  )
                  .map((section: StorylineSection) => (
                    <CollapsibleSection
                      key={section.id}
                      title={section.title}
                      icon={<DescriptionIcon sx={{ fontSize: 18 }} />}
                      badgeColor="#3B82F6"
                      defaultOpen={false}
                    >
                      <Box
                        dangerouslySetInnerHTML={{ __html: section.html }}
                        sx={{
                          "& h4": { mt: 0, mb: 1, fontSize: "0.9rem" },
                          "& p": {
                            color: "text.secondary",
                            fontSize: "0.85rem",
                            lineHeight: 1.6,
                          },
                          "& ul, & ol": { pl: 2 },
                          "& li": { fontSize: "0.85rem", mb: 0.25 },
                        }}
                      />
                    </CollapsibleSection>
                  ))}
              </>
            )}

            {/* ═══ DEVELOPMENT TAB CONTENT ═══ */}
            {activeTab === 1 && (
              <>
                {/* Components */}
                <CollapsibleSection
                  title="Components"
                  icon={<WidgetsIcon sx={{ fontSize: 18 }} />}
                  badge={wiki?.components?.length || 0}
                  badgeColor="#8B5CF6"
                  defaultOpen={false}
                >
                  {wiki?.components && wiki.components.length > 0 ? (
                    <Grid container spacing={1.5}>
                      {wiki.components.map((component) => (
                        <Grid item xs={12} sm={6} md={4} key={component.id}>
                          <Paper
                            variant="outlined"
                            sx={{
                              p: 1.5,
                              transition: "all 0.15s",
                              "&:hover": {
                                boxShadow: 1,
                                borderColor: "#8B5CF6",
                              },
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
                              <Typography
                                variant="subtitle2"
                                sx={{ flex: 1, fontSize: "0.8rem" }}
                              >
                                {component.name}
                              </Typography>
                              <Chip
                                label={component.status}
                                size="small"
                                sx={{
                                  bgcolor: alpha(
                                    statusColors[component.status] || "#6B7280",
                                    0.15,
                                  ),
                                  color:
                                    statusColors[component.status] || "#6B7280",
                                  height: 18,
                                  fontSize: "0.6rem",
                                }}
                              />
                            </Box>
                            {component.description && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: "0.7rem" }}
                              >
                                {component.description}
                              </Typography>
                            )}
                            {component.storybookUrl && (
                              <Button
                                size="small"
                                startIcon={
                                  <PlayCircleOutlineIcon
                                    sx={{ fontSize: 14 }}
                                  />
                                }
                                onClick={() =>
                                  handleOpenStorybook(
                                    component.storybookUrl!,
                                    component.name,
                                  )
                                }
                                sx={{ mt: 1, fontSize: "0.7rem", py: 0.25 }}
                              >
                                View Story
                              </Button>
                            )}
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ py: 1, textAlign: "center" }}
                    >
                      No components documented yet
                    </Typography>
                  )}
                </CollapsibleSection>

                {/* Development Sections from Wiki */}
                {wiki?.developmentSections
                  ?.sort(
                    (a: StorylineSection, b: StorylineSection) =>
                      a.order - b.order,
                  )
                  .map((section: StorylineSection) => (
                    <CollapsibleSection
                      key={section.id}
                      title={section.title}
                      icon={<CodeIcon sx={{ fontSize: 18 }} />}
                      badgeColor="#8B5CF6"
                      defaultOpen={false}
                    >
                      <Box
                        dangerouslySetInnerHTML={{ __html: section.html }}
                        sx={{
                          "& h4": { mt: 0, mb: 1, fontSize: "0.9rem" },
                          "& p": {
                            color: "text.secondary",
                            fontSize: "0.85rem",
                            lineHeight: 1.6,
                          },
                          "& pre": {
                            bgcolor: "action.hover",
                            p: 1.5,
                            borderRadius: 1,
                            overflow: "auto",
                            fontSize: "0.8rem",
                          },
                          "& code": {
                            bgcolor: "action.hover",
                            px: 0.5,
                            borderRadius: 0.5,
                            fontSize: "0.8rem",
                          },
                        }}
                      />
                    </CollapsibleSection>
                  ))}

                {/* Custom Sections */}
                {wiki?.customSections
                  ?.sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <CollapsibleSection
                      key={section.id}
                      title={section.title}
                      badgeColor="#8B5CF6"
                      defaultOpen={false}
                    >
                      <Box
                        dangerouslySetInnerHTML={{ __html: section.html }}
                        sx={{ "& p": { fontSize: "0.85rem" } }}
                      />
                    </CollapsibleSection>
                  ))}
              </>
            )}

            {/* ═══ OPERATIONS TAB CONTENT ═══ */}
            {activeTab === 2 && (
              <>
                {wiki?.operationsSections &&
                wiki.operationsSections.length > 0 ? (
                  wiki.operationsSections
                    .sort(
                      (a: StorylineSection, b: StorylineSection) =>
                        a.order - b.order,
                    )
                    .map((section: StorylineSection) => (
                      <CollapsibleSection
                        key={section.id}
                        title={section.title}
                        icon={<SettingsIcon sx={{ fontSize: 18 }} />}
                        badgeColor="#10B981"
                        defaultOpen={false}
                      >
                        <Box
                          dangerouslySetInnerHTML={{ __html: section.html }}
                          sx={{
                            "& h4": { mt: 0, mb: 1, fontSize: "0.9rem" },
                            "& p": {
                              color: "text.secondary",
                              fontSize: "0.85rem",
                              lineHeight: 1.6,
                            },
                            "& code": {
                              bgcolor: "action.hover",
                              px: 0.5,
                              borderRadius: 0.5,
                              fontSize: "0.8rem",
                            },
                          }}
                        />
                      </CollapsibleSection>
                    ))
                ) : (
                  <Box sx={{ py: 4, textAlign: "center" }}>
                    <SettingsIcon
                      sx={{ fontSize: 48, color: "text.disabled", mb: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Operations content coming soon
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 0.5,
                        mt: 1.5,
                      }}
                    >
                      <Chip
                        icon={<span>🚀</span>}
                        label="Deployment"
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        icon={<span>🔧</span>}
                        label="Maintenance"
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        icon={<span>📊</span>}
                        label="Analytics"
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                )}
              </>
            )}

            {/* ═══ QUESTS SECTION (Always visible on P/D/O tabs) ═══ */}
            <CollapsibleSection
              title="Quests"
              icon={<CheckCircleIcon sx={{ fontSize: 18 }} />}
              badge={`${completedQuests}/${totalQuests}`}
              badgeColor={storyline.color}
              progress={progress}
              defaultOpen={false}
              collapsedSummary={
                <Chip
                  label={
                    activeTab === 0
                      ? "📋 Planning"
                      : activeTab === 1
                        ? "💻 Dev"
                        : "⚙️ Ops"
                  }
                  size="small"
                  variant="outlined"
                  sx={{
                    height: 16,
                    fontSize: "0.55rem",
                    borderColor: getCategoryColorConfig(
                      theme,
                      activeTab === 0
                        ? "planning"
                        : activeTab === 1
                          ? "development"
                          : "operations",
                    ).color,
                    color: getCategoryColorConfig(
                      theme,
                      activeTab === 0
                        ? "planning"
                        : activeTab === 1
                          ? "development"
                          : "operations",
                    ).color,
                  }}
                />
              }
            >
              {currentQuests.length === 0 ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ py: 1, textAlign: "center" }}
                >
                  No{" "}
                  {activeTab === 0
                    ? "planning"
                    : activeTab === 1
                      ? "development"
                      : "operations"}{" "}
                  quests yet
                </Typography>
              ) : (
                <Stack spacing={0.5}>
                  {currentQuests.slice(0, 6).map((quest) => (
                    <Box
                      key={quest.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        py: 0.5,
                        px: 1,
                        borderRadius: 0.5,
                        bgcolor: alpha(
                          quest.category
                            ? getCategoryColorConfig(theme, quest.category)
                                .color
                            : storyline.color,
                          0.03,
                        ),
                        borderLeft: 2,
                        borderColor: quest.category
                          ? getCategoryColorConfig(theme, quest.category).color
                          : storyline.color,
                        transition: "all 0.15s",
                        "&:hover": {
                          bgcolor: alpha(
                            quest.category
                              ? getCategoryColorConfig(theme, quest.category)
                                  .color
                              : storyline.color,
                            0.08,
                          ),
                          transform: "translateX(2px)",
                        },
                      }}
                    >
                      {quest.status === "quest-complete" ? (
                        <CheckCircleIcon
                          sx={{ color: "#10B981", fontSize: 16 }}
                        />
                      ) : quest.status === "in-progress" ? (
                        <RadioButtonUncheckedIcon
                          sx={{ color: "#F59E0B", fontSize: 16 }}
                        />
                      ) : (
                        <RadioButtonUncheckedIcon
                          sx={{ color: "#6B7280", fontSize: 16 }}
                        />
                      )}
                      <Typography
                        variant="body2"
                        sx={{ flex: 1, fontSize: "0.8rem" }}
                      >
                        {quest.title}
                      </Typography>
                      <Chip
                        label={quest.priority}
                        size="small"
                        sx={{
                          bgcolor:
                            quest.priority === "P1"
                              ? "#EF4444"
                              : quest.priority === "P2"
                                ? "#F59E0B"
                                : "#6B7280",
                          color: "white",
                          height: 16,
                          fontSize: "0.55rem",
                          "& .MuiChip-label": { px: 0.5 },
                        }}
                      />
                    </Box>
                  ))}
                  {currentQuests.length > 6 && (
                    <Button
                      size="small"
                      endIcon={<OpenInNewIcon sx={{ fontSize: 12 }} />}
                      onClick={() =>
                        navigate(`/missions/quests?storyline=${storylineId}`)
                      }
                      sx={{
                        alignSelf: "flex-start",
                        fontSize: "0.7rem",
                        mt: 0.5,
                      }}
                    >
                      +{currentQuests.length - 6} more
                    </Button>
                  )}
                </Stack>
              )}
            </CollapsibleSection>
          </>
        )}

        {/* Notes Footer */}
        {wiki?.notes && activeTab !== 3 && (
          <Box
            sx={{
              px: 2,
              py: 1,
              bgcolor: alpha("#F59E0B", 0.03),
              borderTop: 1,
              borderColor: "divider",
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              📝 <span style={{ fontWeight: 600 }}>Note:</span> {wiki.notes}
            </Typography>
          </Box>
        )}
      </Card>

      {/* Storybook Modal */}
      <Dialog
        open={storybookModal.open}
        onClose={() => setStorybookModal({ open: false, url: "", name: "" })}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 1.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WidgetsIcon sx={{ fontSize: 20 }} />
            <Typography variant="subtitle1">{storybookModal.name}</Typography>
          </Box>
          <Box>
            <Button
              size="small"
              startIcon={<OpenInNewIcon />}
              href={storybookModal.url}
              target="_blank"
              sx={{ mr: 1 }}
            >
              Open
            </Button>
            <IconButton
              size="small"
              onClick={() =>
                setStorybookModal({ open: false, url: "", name: "" })
              }
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 0, height: "70vh" }}>
          <iframe
            src={storybookModal.url}
            style={{ width: "100%", height: "100%", border: "none" }}
            title={`Storybook: ${storybookModal.name}`}
          />
        </DialogContent>
      </Dialog>
    </Box>
  )
}
