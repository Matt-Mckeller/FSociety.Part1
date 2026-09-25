/**
 * Progress Tracking Section
 *
 * Displays progress tracking principles and features.
 */

import { Box, Typography, Grid, Card, CardContent, Chip } from "@mui/material"
import { learningScience } from "../../../../data/docs"
import { DocSection } from "../../common"

interface ProgressPrinciple {
  principle: string
  description: string
  implementation: string
}

export default function ProgressTracking() {
  const { progressTracking } = learningScience

  return (
    <DocSection title={`📈 ${progressTracking.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {progressTracking.overview.summary}
      </Typography>

      <Typography variant="h5" gutterBottom>
        Progress Principles
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {(progressTracking.progressPrinciples as ProgressPrinciple[]).map(
          (p, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {p.principle}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {p.description}
                  </Typography>
                  <Chip
                    label={p.implementation}
                    size="small"
                    color="success"
                    variant="outlined"
                  />
                </CardContent>
              </Card>
            </Grid>
          ),
        )}
      </Grid>

      <Typography variant="h5" gutterBottom>
        Expanse Progress Features
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {progressTracking.expanseProgressFeatures.map(
          (f: string, i: number) => (
            <Chip key={i} label={f} color="primary" />
          ),
        )}
      </Box>
    </DocSection>
  )
}
