/**
 * StrategicCompassView - Strategic Compass
 * Guiding decisions by keeping high-value pieces in mind
 */
import { useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Stack,
  alpha,
  Paper,
  Collapse,
  IconButton,
  Divider,
  Tooltip,
  useTheme,
} from "@mui/material"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
// Import from centralized contexts
import {
  corporateVisionData as visionData,
  legendData,
  strategicCompassData as compassData,
  operatingPrinciplesData,
} from "../contexts/StrategicContext"
import { roadmapData } from "../contexts/RoadmapContext"
import type { NavigationalVariable, Roadmap } from "../types"

// Import from strategic-compass module
import type { OperatingPrinciple } from "./strategic-compass/types"
import {
  navTypeConfig,
  principleTypeConfig,
  sectionColors,
  projectColors,
  referenceTooltipText,
} from "./strategic-compass/constants"
import {
  groupNavsByType,
  groupPrinciplesByType,
} from "./strategic-compass/utils"

const operatingPrinciples =
  operatingPrinciplesData.operatingPrinciples as OperatingPrinciple[]

const roadmap = roadmapData as Roadmap
const navigationalVariables = roadmap.navigationalVariables || []

// Group nav variables and principles by type using utilities
const navsByType = groupNavsByType(navigationalVariables)
const principlesByType = groupPrinciplesByType(operatingPrinciples)

export function StrategicCompassView() {
  const theme = useTheme()
  const [visionExpanded, setVisionExpanded] = useState(true)
  const { corporateVision } = visionData
  const { legend } = legendData
  const {
    currentFocusAreas,
    productValueOfferings,
    humanImpact,
    businessMarketValue,
    differentiators,
    futureOnDeck,
  } = compassData

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
        <Box component="span" sx={{ fontSize: "1.5rem" }}>
          🧭
        </Box>
        <Typography variant="h4" color="text.primary">
          Strategic Compass
        </Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Guiding decisions by keeping high-value pieces in mind
      </Typography>

      {/* Corporate Vision - Expandable Card */}
      <Card
        sx={{
          mb: 3,
          borderTop: 4,
          borderColor: sectionColors.vision,
          bgcolor: alpha(sectionColors.vision, 0.02),
        }}
      >
        <CardContent sx={{ pb: visionExpanded ? 2 : "16px !important" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
            onClick={() => setVisionExpanded(!visionExpanded)}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AutoAwesomeIcon
                sx={{ color: sectionColors.vision, fontSize: "1.5rem" }}
              />
              <Typography variant="h6" fontWeight={700}>
                Corporate Vision: The Legend
              </Typography>
              <Chip
                label="Click to expand"
                size="small"
                sx={{
                  ml: 1,
                  bgcolor: alpha(sectionColors.vision, 0.15),
                  color: sectionColors.vision,
                  fontWeight: 500,
                  display: visionExpanded ? "none" : "flex",
                }}
              />
            </Box>
            <IconButton size="small">
              {visionExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5, fontStyle: "italic" }}
          >
            {corporateVision.sectionDescription}
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
            {corporateVision.missionStatement}
          </Typography>

          {/* Legend Description - The Ultimate Vision */}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {legend.description}
          </Typography>

          <Collapse in={visionExpanded}>
            <Box sx={{ mt: 3 }}>
              {/* Core Values */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  sx={{ mb: 1.5 }}
                >
                  Core Values
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {corporateVision.coreValues.map((value, idx) => (
                    <Chip
                      key={idx}
                      label={value}
                      size="small"
                      sx={{
                        bgcolor: alpha(sectionColors.vision, 0.1),
                        color: "text.primary",
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Strategic Timeline */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                  Strategic Timeline
                </Typography>
                {Object.entries(corporateVision.strategicTimeline).map(
                  ([year, goal]) => (
                    <Box
                      key={year}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Chip label={year} size="small" color="primary" />
                      <Typography variant="body2" color="text.secondary">
                        {goal}
                      </Typography>
                    </Box>
                  ),
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Strategic Objectives */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  sx={{ mb: 1.5 }}
                >
                  Strategic Objectives
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Paper
                      sx={{
                        p: 2,
                        bgcolor: alpha(sectionColors.business, 0.05),
                        height: "100%",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        sx={{ mb: 0.5, color: sectionColors.business }}
                      >
                        {
                          corporateVision.strategicObjectives.financialGoals
                            .icon
                        }{" "}
                        {
                          corporateVision.strategicObjectives.financialGoals
                            .title
                        }
                      </Typography>
                      <Chip
                        label={
                          corporateVision.strategicObjectives.financialGoals
                            .currentFocus
                        }
                        size="small"
                        sx={{
                          mb: 1.5,
                          bgcolor: alpha(sectionColors.business, 0.15),
                          color: sectionColors.business,
                          fontWeight: 500,
                        }}
                      />
                      {corporateVision.strategicObjectives.financialGoals.items.map(
                        (goal, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 1,
                              mb: 0.5,
                            }}
                          >
                            <FiberManualRecordIcon
                              sx={{
                                fontSize: 6,
                                mt: 0.8,
                                color: sectionColors.business,
                              }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {goal}
                            </Typography>
                          </Box>
                        ),
                      )}
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper
                      sx={{
                        p: 2,
                        bgcolor: alpha(sectionColors.differentiator, 0.05),
                        height: "100%",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        sx={{ mb: 0.5, color: sectionColors.differentiator }}
                      >
                        {
                          corporateVision.strategicObjectives
                            .marketPositionBrand.icon
                        }{" "}
                        {
                          corporateVision.strategicObjectives
                            .marketPositionBrand.title
                        }
                      </Typography>
                      <Chip
                        label={
                          corporateVision.strategicObjectives
                            .marketPositionBrand.currentFocus
                        }
                        size="small"
                        sx={{
                          mb: 1.5,
                          bgcolor: alpha(sectionColors.differentiator, 0.15),
                          color: sectionColors.differentiator,
                          fontWeight: 500,
                        }}
                      />
                      {corporateVision.strategicObjectives.marketPositionBrand.items.map(
                        (goal, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 1,
                              mb: 0.5,
                            }}
                          >
                            <FiberManualRecordIcon
                              sx={{
                                fontSize: 6,
                                mt: 0.8,
                                color: sectionColors.differentiator,
                              }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {goal}
                            </Typography>
                          </Box>
                        ),
                      )}
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper
                      sx={{
                        p: 2,
                        bgcolor: alpha(sectionColors.focus, 0.05),
                        height: "100%",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        sx={{ mb: 0.5, color: sectionColors.focus }}
                      >
                        {
                          corporateVision.strategicObjectives
                            .competitivePosition.icon
                        }{" "}
                        {
                          corporateVision.strategicObjectives
                            .competitivePosition.title
                        }
                      </Typography>
                      <Chip
                        label={
                          corporateVision.strategicObjectives
                            .competitivePosition.currentFocus
                        }
                        size="small"
                        sx={{
                          mb: 1.5,
                          bgcolor: alpha(sectionColors.focus, 0.15),
                          color: sectionColors.focus,
                          fontWeight: 500,
                        }}
                      />
                      {corporateVision.strategicObjectives.competitivePosition.items.map(
                        (goal, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 1,
                              mb: 0.5,
                            }}
                          >
                            <FiberManualRecordIcon
                              sx={{
                                fontSize: 6,
                                mt: 0.8,
                                color: sectionColors.focus,
                              }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {goal}
                            </Typography>
                          </Box>
                        ),
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Strategic Pillars */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  sx={{ mb: 1.5 }}
                >
                  Strategic Pillars
                </Typography>
                <Grid container spacing={2}>
                  {corporateVision.strategicPillars.map((pillar) => (
                    <Grid item xs={12} md={6} key={pillar.id}>
                      <Paper
                        sx={{
                          p: 2,
                          height: "100%",
                          borderLeft: 4,
                          borderColor: sectionColors.vision,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <Box component="span" sx={{ fontSize: "1.25rem" }}>
                            {pillar.icon}
                          </Box>
                          <Typography variant="subtitle2" fontWeight={700}>
                            {pillar.title}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1.5 }}
                        >
                          {pillar.description}
                        </Typography>
                        {pillar.items.map((item, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 1,
                              mb: 0.5,
                            }}
                          >
                            <FiberManualRecordIcon
                              sx={{
                                fontSize: 6,
                                mt: 0.8,
                                color: sectionColors.vision,
                              }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {item}
                            </Typography>
                          </Box>
                        ))}
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Leadership & Culture + Safety */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <Paper
                    sx={{ p: 2, bgcolor: alpha(sectionColors.human, 0.05) }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      sx={{ mb: 1, color: sectionColors.human }}
                    >
                      👤 Leadership & Culture
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1.5, fontStyle: "italic" }}
                    >
                      "{corporateVision.leadershipCulture.founderVision}"
                    </Typography>
                    {corporateVision.leadershipCulture.organizationalValues.map(
                      (value, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1,
                            mb: 0.5,
                          }}
                        >
                          <FiberManualRecordIcon
                            sx={{
                              fontSize: 6,
                              mt: 0.8,
                              color: sectionColors.human,
                            }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {value}
                          </Typography>
                        </Box>
                      ),
                    )}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper
                    sx={{ p: 2, bgcolor: alpha(sectionColors.future, 0.05) }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      sx={{ mb: 1, color: sectionColors.future }}
                    >
                      🔒 Safety, Security & Compliance
                    </Typography>
                    {corporateVision.safetySecurityCompliance.map(
                      (item, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1,
                            mb: 0.5,
                          }}
                        >
                          <FiberManualRecordIcon
                            sx={{
                              fontSize: 6,
                              mt: 0.8,
                              color: sectionColors.future,
                            }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {item}
                          </Typography>
                        </Box>
                      ),
                    )}
                  </Paper>
                </Grid>
              </Grid>

              {/* Long-Term Vision */}
              <Paper
                sx={{
                  p: 2,
                  bgcolor: alpha(sectionColors.vision, 0.1),
                  border: 1,
                  borderColor: alpha(sectionColors.vision, 0.3),
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  sx={{ mb: 0.5, color: sectionColors.vision }}
                >
                  🌟 Long-Term Vision
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {corporateVision.longTermVision}
                </Typography>
              </Paper>
            </Box>
          </Collapse>
        </CardContent>
      </Card>

      {/* Current Focus Areas - Full Width */}
      <Card
        sx={{
          mb: 3,
          borderTop: 4,
          borderColor: sectionColors.focus,
          bgcolor: alpha(sectionColors.focus, 0.02),
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Box component="span" sx={{ fontSize: "1.25rem" }}>
              🔥
            </Box>
            <Typography variant="h6" fontWeight={700}>
              Current Focus Areas
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            What we're actively driving toward right now
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            {currentFocusAreas.map((focus) => (
              <Paper
                key={focus.id}
                sx={{
                  p: 2,
                  minWidth: 240,
                  flex: "1 1 240px",
                  maxWidth: 360,
                  borderLeft: 4,
                  borderColor: projectColors[focus.linkedProjectId] || "#888",
                  bgcolor: "background.paper",
                }}
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  {focus.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {focus.description}
                </Typography>
                {focus.linkedProjectId && (
                  <Chip
                    label={focus.linkedProjectId}
                    size="small"
                    sx={{
                      bgcolor: alpha(
                        projectColors[focus.linkedProjectId] || "#888",
                        0.15,
                      ),
                      color: projectColors[focus.linkedProjectId] || "#888",
                      fontWeight: 600,
                    }}
                  />
                )}
              </Paper>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Product Value Offerings & Human Impact - Side by Side */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Product Value Offerings */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "100%",
              borderTop: 4,
              borderColor: sectionColors.product,
              bgcolor: alpha(sectionColors.product, 0.02),
            }}
          >
            <CardContent>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Box component="span" sx={{ fontSize: "1.25rem" }}>
                  💎
                </Box>
                <Typography variant="h6" fontWeight={700}>
                  Product Value Offerings
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Features & capabilities that deliver value
              </Typography>

              <Stack spacing={2}>
                {Object.entries(productValueOfferings).map(
                  ([key, category]) => (
                    <Box key={key}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Box component="span" sx={{ fontSize: "1rem" }}>
                          {category.icon}
                        </Box>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          color="text.primary"
                        >
                          {category.label}
                        </Typography>
                      </Box>
                      <Box sx={{ pl: 3 }}>
                        {category.items.map((item, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              py: 0.25,
                            }}
                          >
                            <FiberManualRecordIcon
                              sx={{ fontSize: 6, color: sectionColors.product }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {item}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  ),
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Human Impact / Mission */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "100%",
              borderTop: 4,
              borderColor: sectionColors.human,
              bgcolor: alpha(sectionColors.human, 0.02),
            }}
          >
            <CardContent>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Box component="span" sx={{ fontSize: "1.25rem" }}>
                  🌟
                </Box>
                <Typography variant="h6" fontWeight={700}>
                  Human Impact / Mission
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Transformative outcomes we're creating
              </Typography>

              <Stack spacing={2}>
                {Object.entries(humanImpact).map(([key, category]) => (
                  <Box key={key}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Box component="span" sx={{ fontSize: "1rem" }}>
                        {category.icon}
                      </Box>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        color="text.primary"
                      >
                        {category.label}
                      </Typography>
                    </Box>
                    <Box sx={{ pl: 3 }}>
                      {category.items.map((item, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            py: 0.25,
                          }}
                        >
                          <FiberManualRecordIcon
                            sx={{ fontSize: 6, color: sectionColors.human }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Business/Market Value & Differentiators - Side by Side */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Business/Market Value */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "100%",
              borderTop: 4,
              borderColor: sectionColors.business,
              bgcolor: alpha(sectionColors.business, 0.02),
            }}
          >
            <CardContent>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Box component="span" sx={{ fontSize: "1.25rem" }}>
                  📈
                </Box>
                <Typography variant="h6" fontWeight={700}>
                  Business / Market Value
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                What makes this viable & scalable
              </Typography>

              <Box sx={{ pl: 1 }}>
                {businessMarketValue.map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      py: 0.5,
                    }}
                  >
                    <FiberManualRecordIcon
                      sx={{ fontSize: 8, color: sectionColors.business }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Differentiators */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "100%",
              borderTop: 4,
              borderColor: sectionColors.differentiator,
              bgcolor: alpha(sectionColors.differentiator, 0.02),
            }}
          >
            <CardContent>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Box component="span" sx={{ fontSize: "1.25rem" }}>
                  ✨
                </Box>
                <Typography variant="h6" fontWeight={700}>
                  Differentiators
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                What sets us apart from competition
              </Typography>

              <Stack spacing={1.5}>
                {differentiators.map((diff) => (
                  <Box key={diff.id}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="text.primary"
                    >
                      {diff.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {diff.description}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Navigational Variables */}
      <Card
        sx={{
          mt: 3,
          borderTop: 4,
          borderColor: theme.palette.secondary.main,
          bgcolor: alpha(theme.palette.secondary.main, 0.02),
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
            <Box component="span" sx={{ fontSize: "1.25rem" }}>
              🧭
            </Box>
            <Typography variant="h6" fontWeight={700}>
              Navigational Variables
            </Typography>
            <Chip
              label={`${navigationalVariables.length} items`}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.secondary.main, 0.15),
                color: theme.palette.secondary.main,
              }}
            />
            <Tooltip title={referenceTooltipText} arrow placement="top">
              <InfoOutlinedIcon
                sx={{ fontSize: 18, color: "text.disabled", cursor: "help" }}
              />
            </Tooltip>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Strategic considerations for decision-making — advantages,
            opportunities, strategies, and insights
          </Typography>

          {/* Type Legend */}
          <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
            {(
              Object.entries(navTypeConfig) as [
                NavigationalVariable["type"],
                typeof navTypeConfig.advantage,
              ][]
            ).map(([type, config]) => {
              const count = navsByType[type]?.length || 0
              return (
                <Box
                  key={type}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.75,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: alpha(config.color, 0.1),
                    border: 1,
                    borderColor: alpha(config.color, 0.3),
                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>
                    {config.icon}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: config.color }}
                  >
                    {config.label}
                  </Typography>
                  <Chip
                    label={count}
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: "0.65rem",
                      bgcolor: config.color,
                      color: "white",
                    }}
                  />
                </Box>
              )
            })}
          </Box>

          {/* Variables Grid */}
          <Grid container spacing={2}>
            {navigationalVariables.map((nav) => {
              const config = navTypeConfig[nav.type]
              return (
                <Grid item xs={12} sm={6} md={4} key={nav.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: "100%",
                      borderLeft: 4,
                      borderColor: config.color,
                      bgcolor: alpha(config.color, 0.02),
                      transition: "all 0.15s",
                      "&:hover": {
                        bgcolor: alpha(config.color, 0.06),
                        boxShadow: `0 2px 8px ${alpha(config.color, 0.15)}`,
                      },
                    }}
                  >
                    <CardContent sx={{ py: 1.5 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: 1,
                            bgcolor: alpha(config.color, 0.15),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.1rem",
                            flexShrink: 0,
                          }}
                        >
                          {config.icon}
                        </Box>
                        <Box sx={{ flex: 1 }}>
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
                              sx={{ fontWeight: 600, flex: 1 }}
                            >
                              {nav.title}
                            </Typography>
                            <Chip
                              label={config.label}
                              size="small"
                              sx={{
                                height: 18,
                                fontSize: "0.6rem",
                                bgcolor: alpha(config.color, 0.15),
                                color: config.color,
                                fontWeight: 600,
                              }}
                            />
                          </Box>
                          {nav.description && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ lineHeight: 1.4, fontSize: "0.8rem" }}
                            >
                              {nav.description}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </CardContent>
      </Card>

      {/* Operating Principles */}
      <Card
        sx={{
          mt: 3,
          borderTop: 4,
          borderColor: theme.palette.primary.main,
          bgcolor: alpha(theme.palette.primary.main, 0.02),
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
            <Box component="span" sx={{ fontSize: "1.25rem" }}>
              ⚙️
            </Box>
            <Typography variant="h6" fontWeight={700}>
              Operating Principles
            </Typography>
            <Chip
              label={`${operatingPrinciples.length} items`}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.15),
                color: theme.palette.primary.main,
              }}
            />
            <Tooltip title={referenceTooltipText} arrow placement="top">
              <InfoOutlinedIcon
                sx={{ fontSize: 18, color: "text.disabled", cursor: "help" }}
              />
            </Tooltip>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Rules, habits, and guiding principles for decision-making and
            operations
          </Typography>

          {/* Type Legend */}
          <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
            {(
              Object.entries(principleTypeConfig) as [
                OperatingPrinciple["type"],
                typeof principleTypeConfig.rule,
              ][]
            ).map(([type, config]) => {
              const count = principlesByType[type]?.length || 0
              return (
                <Box
                  key={type}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.75,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: alpha(config.color, 0.1),
                    border: 1,
                    borderColor: alpha(config.color, 0.3),
                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>
                    {config.dot}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: config.color }}
                  >
                    {config.label}
                  </Typography>
                  <Chip
                    label={count}
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: "0.65rem",
                      bgcolor: config.color,
                      color: "white",
                    }}
                  />
                </Box>
              )
            })}
          </Box>

          {/* Principles Grid */}
          <Grid container spacing={2}>
            {operatingPrinciples.map((principle) => {
              const config = principleTypeConfig[principle.type]
              return (
                <Grid item xs={12} sm={6} md={4} key={principle.id}>
                  <Tooltip title={principle.description} arrow placement="top">
                    <Card
                      variant="outlined"
                      sx={{
                        height: "100%",
                        borderLeft: 4,
                        borderColor: config.color,
                        bgcolor: alpha(config.color, 0.02),
                        cursor: "help",
                        transition: "all 0.15s",
                        "&:hover": {
                          bgcolor: alpha(config.color, 0.06),
                          boxShadow: `0 2px 8px ${alpha(config.color, 0.15)}`,
                        },
                      }}
                    >
                      <CardContent sx={{ py: 1.5 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: 1,
                              bgcolor: alpha(config.color, 0.15),
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "1.1rem",
                              flexShrink: 0,
                            }}
                          >
                            {principle.icon}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 600, flex: 1 }}
                              >
                                {principle.title}
                              </Typography>
                              <Chip
                                label={principle.weight}
                                size="small"
                                sx={{
                                  height: 18,
                                  fontSize: "0.6rem",
                                  bgcolor: alpha(config.color, 0.15),
                                  color: config.color,
                                  fontWeight: 600,
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Tooltip>
                </Grid>
              )
            })}
          </Grid>
        </CardContent>
      </Card>

      {/* Strategic Notes */}
      <Card
        sx={{
          mt: 3,
          borderTop: 4,
          borderColor: theme.palette.warning.main,
          bgcolor: alpha(theme.palette.warning.main, 0.02),
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
            <Box component="span" sx={{ fontSize: "1.25rem" }}>
              📝
            </Box>
            <Typography variant="h6" fontWeight={700}>
              Strategic Notes
            </Typography>
            <Chip
              label={`${visionData.corporateVision.strategicNotes.length} items`}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.warning.main, 0.15),
                color: theme.palette.warning.main,
              }}
            />
            <Tooltip title={referenceTooltipText} arrow placement="top">
              <InfoOutlinedIcon
                sx={{ fontSize: 18, color: "text.disabled", cursor: "help" }}
              />
            </Tooltip>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Key considerations for partnerships, funding, and opportunities
          </Typography>

          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            {visionData.corporateVision.strategicNotes.map((note) => (
              <Card
                key={note.id}
                variant="outlined"
                sx={{
                  minWidth: 250,
                  flex: "1 1 250px",
                  maxWidth: 350,
                  borderLeft: 4,
                  borderColor: theme.palette.warning.main,
                  bgcolor: alpha(theme.palette.warning.main, 0.02),
                  transition: "all 0.15s",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.warning.main, 0.06),
                    boxShadow: `0 2px 8px ${alpha(theme.palette.warning.main, 0.15)}`,
                  },
                }}
              >
                <CardContent sx={{ py: 1.5 }}>
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
                      fontWeight={600}
                      sx={{ flex: 1 }}
                    >
                      {note.title}
                    </Typography>
                    <Chip
                      label={note.category}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: "0.6rem",
                        bgcolor: alpha(theme.palette.warning.main, 0.15),
                        color: theme.palette.warning.main,
                        fontWeight: 600,
                        textTransform: "capitalize",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.4, fontSize: "0.8rem" }}
                  >
                    {note.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Future / On Deck - Full Width */}
      <Card
        sx={{
          mt: 3,
          borderTop: 4,
          borderColor: sectionColors.future,
          bgcolor: alpha(sectionColors.future, 0.02),
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Box component="span" sx={{ fontSize: "1.25rem" }}>
              💤
            </Box>
            <Typography variant="h6" fontWeight={700}>
              Future / On Deck
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Parked for later - important but not now
          </Typography>

          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            {futureOnDeck.map((item) => (
              <Paper
                key={item.id}
                sx={{
                  p: 2,
                  minWidth: 200,
                  bgcolor: alpha(sectionColors.future, 0.05),
                  border: 1,
                  borderColor: alpha(sectionColors.future, 0.2),
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  color="text.secondary"
                >
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.disabled">
                  {item.description}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
