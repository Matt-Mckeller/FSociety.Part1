/**
 * Ideation Category Section
 *
 * Reusable component for displaying features in a specific ideation category.
 */

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
} from "@mui/material"
import { ideation } from "../../../../data/docs"
import { DocSection } from "../../common"

interface IdeationCategoryProps {
  categoryId: string
  categoryTitle: string
  icon?: string
}

export default function IdeationCategory({
  categoryId,
  categoryTitle,
  icon = "💡",
}: IdeationCategoryProps) {
  const categoryFeatures = ideation.features.filter(
    (f) => f.category === categoryId,
  )

  const categoryDescription = ideation.overview.categories.find(
    (c) => c.id === categoryId,
  )?.description

  return (
    <DocSection title={`${icon} ${categoryTitle}`}>
      {categoryDescription && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {categoryDescription}
        </Typography>
      )}

      {categoryFeatures.length === 0 ? (
        <Alert severity="info">No features in this category yet.</Alert>
      ) : (
        <Grid container spacing={3}>
          {categoryFeatures.map((feature) => (
            <Grid item xs={12} key={feature.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h5" fontWeight={600}>
                      {feature.name}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                      <Chip
                        label={`Priority: ${feature.priority}`}
                        size="small"
                        color={
                          feature.priority === "high"
                            ? "error"
                            : feature.priority === "medium"
                              ? "warning"
                              : "default"
                        }
                      />
                      <Chip
                        label={`Status: ${feature.status}`}
                        size="small"
                        color={
                          feature.status === "planned"
                            ? "success"
                            : feature.status === "exploration"
                              ? "info"
                              : "default"
                        }
                      />
                      <Chip
                        label={`Complexity: ${feature.complexity}`}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </Box>

                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {feature.description}
                  </Typography>

                  {feature.valueProposition && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      <Typography variant="body2">
                        <strong>Value Proposition:</strong>{" "}
                        {feature.valueProposition}
                      </Typography>
                    </Alert>
                  )}

                  {feature.keyPoints && feature.keyPoints.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        gutterBottom
                      >
                        Key Points
                      </Typography>
                      <Box component="ul" sx={{ m: 0, pl: 2 }}>
                        {feature.keyPoints.map((point, i) => (
                          <Typography component="li" variant="body2" key={i}>
                            {point}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  )}

                  {feature.features && feature.features.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        gutterBottom
                      >
                        Features
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {feature.features.map((f, i) => (
                          <Chip
                            key={i}
                            label={f}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {feature.implementation &&
                    feature.implementation.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          gutterBottom
                        >
                          Implementation
                        </Typography>
                        <Box component="ul" sx={{ m: 0, pl: 2 }}>
                          {feature.implementation.map((impl, i) => (
                            <Typography component="li" variant="body2" key={i}>
                              {impl}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                    )}

                  {feature.implementationOptions &&
                    feature.implementationOptions.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          gutterBottom
                        >
                          Implementation Options
                        </Typography>
                        <Grid container spacing={1}>
                          {feature.implementationOptions.map((opt, i) => (
                            <Grid item xs={12} sm={6} key={i}>
                              <Card variant="outlined">
                                <CardContent
                                  sx={{ py: 1, "&:last-child": { pb: 1 } }}
                                >
                                  <Typography variant="subtitle2">
                                    {opt.option}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {opt.description}
                                  </Typography>
                                  <Chip
                                    label={opt.difficulty}
                                    size="small"
                                    sx={{ mt: 0.5 }}
                                  />
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )}

                  {feature.concerns && feature.concerns.length > 0 && (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Concerns & Considerations
                      </Typography>
                      <Box component="ul" sx={{ m: 0, pl: 2 }}>
                        {feature.concerns.map((concern, i) => (
                          <Typography component="li" variant="body2" key={i}>
                            {concern}
                          </Typography>
                        ))}
                      </Box>
                    </Alert>
                  )}

                  {feature.risks && feature.risks.length > 0 && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Risks
                      </Typography>
                      <Box component="ul" sx={{ m: 0, pl: 2 }}>
                        {feature.risks.map((risk, i) => (
                          <Typography component="li" variant="body2" key={i}>
                            {risk}
                          </Typography>
                        ))}
                      </Box>
                    </Alert>
                  )}

                  {feature.notes && (
                    <Alert severity="info">
                      <Typography variant="body2">{feature.notes}</Typography>
                    </Alert>
                  )}

                  {feature.insight && (
                    <Alert severity="info">
                      <Typography variant="body2">
                        <strong>Insight:</strong> {feature.insight}
                      </Typography>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </DocSection>
  )
}

// ============================================
// Category-specific wrapper components
// ============================================

export function IdeationSecurity() {
  return (
    <IdeationCategory
      categoryId="security-safety"
      categoryTitle="Security & Safety"
      icon="🔐"
    />
  )
}

export function IdeationEconomy() {
  return (
    <IdeationCategory
      categoryId="economy-financial"
      categoryTitle="Economy & Financial"
      icon="💰"
    />
  )
}

export function IdeationRewards() {
  return (
    <IdeationCategory
      categoryId="rewards-engagement"
      categoryTitle="Rewards & Engagement"
      icon="🎁"
    />
  )
}

export function IdeationSocial() {
  return (
    <IdeationCategory
      categoryId="social-community"
      categoryTitle="Social & Community"
      icon="👥"
    />
  )
}

export function IdeationEducation() {
  return (
    <IdeationCategory
      categoryId="education-career"
      categoryTitle="Education & Career"
      icon="📚"
    />
  )
}

export function IdeationPlatform() {
  return (
    <IdeationCategory
      categoryId="platform-integration"
      categoryTitle="Platform & Integration"
      icon="🔌"
    />
  )
}

export function IdeationAnalytics() {
  return (
    <IdeationCategory
      categoryId="analytics-observability"
      categoryTitle="Analytics & Observability"
      icon="📊"
    />
  )
}

export function IdeationLearning() {
  return (
    <IdeationCategory
      categoryId="learning-content"
      categoryTitle="Learning & Content"
      icon="📚"
    />
  )
}
