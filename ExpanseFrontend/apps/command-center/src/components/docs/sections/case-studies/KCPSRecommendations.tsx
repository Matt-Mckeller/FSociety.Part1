/**
 * KCPS Recommendations Section
 *
 * Improvement recommendations organized by budget tier.
 */

import {
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { alpha } from "@mui/material/styles"
import { DocSection } from "../../common"
import { caseStudies } from "../../../../data/docs"
import type { ImprovementRecommendation } from "../../../../types/docs"
import { SAD_SAGE, SAD_FOG, SAD_OCHRE, SAD_BRICK, SAD_GREY } from "./kcpsPalette"

const budgetTierConfig: Record<
  string,
  { label: string; description: string; color: string }
> = {
  $: {
    label: "$",
    description: "Low Cost / Quick Wins",
    color: SAD_SAGE,
  },
  $$: {
    label: "$$",
    description: "Moderate Investment",
    color: SAD_FOG,
  },
  $$$: {
    label: "$$$",
    description: "Significant Investment",
    color: SAD_OCHRE,
  },
  $$$$: {
    label: "$$$$",
    description: "Major Investment",
    color: SAD_BRICK,
  },
  unknown: {
    label: "?",
    description: "Cost TBD",
    color: SAD_GREY,
  },
}

const categoryLabels: Record<string, string> = {
  security: "🛡️ Security",
  rewards: "🏆 Rewards",
  it: "💻 IT",
  leadership: "👔 Leadership",
  environment: "🏫 Environment",
  training: "📚 Training",
}

export default function KCPSRecommendations() {
  const recommendations = (caseStudies.improvementRecommendations ||
    []) as ImprovementRecommendation[]

  const budgetTiers = ["$", "$$", "$$$", "$$$$", "unknown"]

  const getByBudget = (tier: string) =>
    recommendations.filter((r) => r.budgetTier === tier)

  const getByCategory = (category: string) =>
    recommendations.filter((r) => r.category === category)

  const categories = [...new Set(recommendations.map((r) => r.category))]

  return (
    <DocSection title="Improvement Recommendations" icon="📋">
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Actionable recommendations organized by budget tier and category.
      </Typography>

      {/* By Budget Tier */}
      <Typography variant="h5" gutterBottom>
        By Budget Tier
      </Typography>

      {budgetTiers.map((tier) => {
        const items = getByBudget(tier)
        if (items.length === 0) return null

        return (
          <Accordion key={tier} defaultExpanded={tier === "$"}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Chip
                  label={budgetTierConfig[tier].label}
                  size="small"
                  sx={{
                    bgcolor: budgetTierConfig[tier].color,
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
                <Typography variant="subtitle1">
                  {budgetTierConfig[tier].description} ({items.length})
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {items.map((rec) => (
                  <Grid item xs={12} md={6} key={rec.id}>
                    <Card
                      variant="outlined"
                      sx={{
                        height: "100%",
                        borderLeft: 4,
                        borderColor:
                          rec.priority === "high"
                            ? SAD_BRICK
                            : rec.priority === "medium"
                              ? SAD_OCHRE
                              : SAD_GREY,
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            mb: 1,
                          }}
                        >
                          <Typography variant="subtitle1">
                            {rec.title}
                          </Typography>
                          <Box sx={{ display: "flex", gap: 0.5 }}>
                            <Chip
                              label={rec.priority}
                              size="small"
                              sx={{
                                bgcolor: alpha(
                                  rec.priority === "high"
                                    ? SAD_BRICK
                                    : rec.priority === "medium"
                                      ? SAD_OCHRE
                                      : SAD_GREY,
                                  0.14,
                                ),
                                color:
                                  rec.priority === "high"
                                    ? SAD_BRICK
                                    : rec.priority === "medium"
                                      ? SAD_OCHRE
                                      : SAD_GREY,
                                fontWeight: 600,
                              }}
                            />
                          </Box>
                        </Box>

                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {rec.description}
                        </Typography>

                        <Chip
                          label={categoryLabels[rec.category]}
                          size="small"
                          variant="outlined"
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        )
      })}

      {/* By Category */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        By Category
      </Typography>

      <Grid container spacing={2}>
        {categories.map((category) => {
          const items = getByCategory(category)
          return (
            <Grid item xs={12} sm={6} md={4} key={category}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {categoryLabels[category]}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {items.length} recommendation{items.length !== 1 ? "s" : ""}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {items.map((item) => (
                      <Chip
                        key={item.id}
                        label={item.title}
                        size="small"
                        sx={{ m: 0.25 }}
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </DocSection>
  )
}
