/**
 * Goals Section
 *
 * Goals & Mission organized by category.
 * Migrated from DocsView.tsx renderGoals()
 */

import { Typography, Card, CardContent, Box, Chip } from "@mui/material"
import { DocSection, DocGrid } from "../../common"
import { goals } from "../../../../data/docs"
import type { Goal } from "../../../../types/docs"

const categoryLabels: Record<string, string> = {
  primary: "🎯 Primary Goals",
  secondary: "📌 Secondary Goals",
  future: "🔮 Future Goals",
}

const categories = ["primary", "secondary", "future"]

export default function Goals() {
  return (
    <DocSection title="Goals & Mission" icon="🚀">
      {categories.map((category) => {
        const categoryGoals = (goals as Goal[]).filter(
          (g) => g.category === category
        )
        if (categoryGoals.length === 0) return null

        return (
          <Box key={category} sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
              {categoryLabels[category]}
            </Typography>
            <DocGrid columns={{ xs: 1, md: 2 }} spacing={2}>
              {categoryGoals.map((goal) => (
                <Card key={goal.id} sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {goal.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {goal.description}
                    </Typography>
                    {goal.subGoals && goal.subGoals.length > 0 && (
                      <>
                        <Typography variant="subtitle2" gutterBottom>
                          Sub-Goals:
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, m: 0, mb: 2 }}>
                          {goal.subGoals.map((sg: string, i: number) => (
                            <Typography component="li" key={i} variant="body2">
                              {sg}
                            </Typography>
                          ))}
                        </Box>
                      </>
                    )}
                    {goal.features && goal.features.length > 0 && (
                      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        {goal.features.map((feature: string) => (
                          <Chip
                            key={feature}
                            label={feature}
                            size="small"
                            variant="outlined"
                            color="info"
                          />
                        ))}
                      </Box>
                    )}
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
