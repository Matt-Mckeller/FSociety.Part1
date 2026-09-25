/**
 * Features Section
 *
 * Product features organized by category.
 * Migrated from DocsView.tsx renderFeatures()
 */

import { Typography, Card, CardContent, Box, Chip, Alert } from "@mui/material"
import { DocSection, DocGrid } from "../../common"
import { features } from "../../../../data/docs"
import type { Feature } from "../../../../types/docs"

const featureCategories = [
  "core",
  "engagement",
  "rewards",
  "communication",
  "partnerships",
]

const categoryLabels: Record<string, { label: string; icon: string }> = {
  core: { label: "Core Features", icon: "⚡" },
  engagement: { label: "Engagement", icon: "🎮" },
  rewards: { label: "Rewards", icon: "🎁" },
  communication: { label: "Communication", icon: "💬" },
  partnerships: { label: "Partnerships", icon: "🤝" },
}

const priorityColors: Record<string, "success" | "warning" | "info"> = {
  core: "success",
  important: "warning",
  "nice-to-have": "info",
}

export default function Features() {
  return (
    <DocSection title="Product Features" icon="📦">
      <Alert severity="info" sx={{ mb: 3 }}>
        {(features as Feature[]).length} features documented across{" "}
        {featureCategories.length} categories
      </Alert>

      {featureCategories.map((category) => {
        const categoryFeatures = (features as Feature[]).filter(
          (f) => f.category === category
        )
        if (categoryFeatures.length === 0) return null
        const catInfo = categoryLabels[category]

        return (
          <Box key={category} sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
              {catInfo.icon} {catInfo.label}
            </Typography>
            <DocGrid columns={{ xs: 1, md: 2 }} spacing={2}>
              {categoryFeatures.map((feature) => (
                <Card key={feature.id} sx={{ height: "100%" }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 1,
                      }}
                    >
                      <Typography variant="h6" color="primary">
                        {feature.name}
                      </Typography>
                      <Chip
                        label={feature.priority}
                        size="small"
                        color={priorityColors[feature.priority] || "default"}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {feature.description}
                    </Typography>
                    {feature.valueProposition && (
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="subtitle2">Value:</Typography>
                        <Typography variant="body2">
                          {feature.valueProposition}
                        </Typography>
                      </Box>
                    )}
                    {feature.userBenefit && (
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="subtitle2">
                          User Benefit:
                        </Typography>
                        <Typography variant="body2">
                          {feature.userBenefit}
                        </Typography>
                      </Box>
                    )}
                    {feature.details && feature.details.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Details:
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, m: 0 }}>
                          {feature.details
                            .slice(0, 4)
                            .map((detail: string, i: number) => (
                              <Typography component="li" key={i} variant="body2">
                                {detail}
                              </Typography>
                            ))}
                        </Box>
                      </Box>
                    )}
                    <Box sx={{ mt: 2 }}>
                      <Chip
                        label={feature.status}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </DocGrid>
          </Box>
        )
      })}
    </DocSection>
  )
}
