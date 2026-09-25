/**
 * CorporateVisionCard - Reusable Corporate Vision Component
 * Displays the corporate vision with expandable details
 */
import { useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  alpha,
  Paper,
  Collapse,
  IconButton,
  Divider,
} from "@mui/material"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
// Import from centralized context
import {
  corporateVisionData as visionData,
  legendData,
} from "../contexts/StrategicContext"

const visionColor = "#7C3AED"

const sectionColors = {
  focus: "#EF4444",
  product: "#3B82F6",
  human: "#8B5CF6",
  business: "#10B981",
  differentiator: "#F59E0B",
  future: "#6B7280",
  vision: visionColor,
}

interface CorporateVisionCardProps {
  defaultExpanded?: boolean
}

export function CorporateVisionCard({
  defaultExpanded = true,
}: CorporateVisionCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const { corporateVision } = visionData
  const { legend } = legendData

  return (
    <Card
      sx={{
        mb: 3,
        borderTop: 4,
        borderColor: visionColor,
        bgcolor: alpha(visionColor, 0.02),
      }}
    >
      <CardContent sx={{ pb: expanded ? 2 : "16px !important" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AutoAwesomeIcon sx={{ color: visionColor, fontSize: "1.5rem" }} />
            <Typography variant="h6" fontWeight={700}>
              Corporate Vision: The Legend
            </Typography>
            <Chip
              label="Click to expand"
              size="small"
              sx={{
                ml: 1,
                bgcolor: alpha(visionColor, 0.15),
                color: visionColor,
                fontWeight: 500,
                display: expanded ? "none" : "flex",
              }}
            />
          </Box>
          <IconButton size="small">
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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

        <Collapse in={expanded}>
          <Box sx={{ mt: 3 }}>
            {/* Core Values */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
                Core Values
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {corporateVision.coreValues.map((value, idx) => (
                  <Chip
                    key={idx}
                    label={value}
                    size="small"
                    sx={{
                      bgcolor: alpha(visionColor, 0.1),
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
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
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
                      {corporateVision.strategicObjectives.financialGoals.icon}{" "}
                      {corporateVision.strategicObjectives.financialGoals.title}
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
                        corporateVision.strategicObjectives.marketPositionBrand
                          .icon
                      }{" "}
                      {
                        corporateVision.strategicObjectives.marketPositionBrand
                          .title
                      }
                    </Typography>
                    <Chip
                      label={
                        corporateVision.strategicObjectives.marketPositionBrand
                          .currentFocus
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
                        corporateVision.strategicObjectives.competitivePosition
                          .icon
                      }{" "}
                      {
                        corporateVision.strategicObjectives.competitivePosition
                          .title
                      }
                    </Typography>
                    <Chip
                      label={
                        corporateVision.strategicObjectives.competitivePosition
                          .currentFocus
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
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
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
                        borderColor: visionColor,
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
                              color: visionColor,
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
                <Paper sx={{ p: 2, bgcolor: alpha(sectionColors.human, 0.05) }}>
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
                  {corporateVision.safetySecurityCompliance.map((item, idx) => (
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
                  ))}
                </Paper>
              </Grid>
            </Grid>

            {/* Long-Term Vision */}
            <Paper
              sx={{
                p: 2,
                bgcolor: alpha(visionColor, 0.1),
                border: 1,
                borderColor: alpha(visionColor, 0.3),
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight={600}
                sx={{ mb: 0.5, color: visionColor }}
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
  )
}
