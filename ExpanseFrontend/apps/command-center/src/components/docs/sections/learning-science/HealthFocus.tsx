/**
 * Health & Focus Section
 *
 * Displays how health and environment impact learning.
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
import { learningScience } from "../../../../data/docs"
import { DocSection } from "../../common"

interface HealthInsight {
  id: string
  title: string
  insight: string
  recommendations?: string[]
  application: string
}

export default function HealthFocus() {
  const healthAndFocus = (learningScience as any).healthAndFocus

  if (!healthAndFocus) {
    return (
      <DocSection title="🏥 Health, Diet & Focus Connection">
        <Typography variant="body1" color="text.secondary">
          Health and focus data not available.
        </Typography>
      </DocSection>
    )
  }

  return (
    <DocSection title="🏥 Health, Diet & Focus Connection">
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        How physical health and environment impact learning and focus.
      </Typography>

      <Grid container spacing={3}>
        {healthAndFocus.insights?.map((insight: HealthInsight) => (
          <Grid item xs={12} md={6} key={insight.id}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  {insight.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {insight.insight}
                </Typography>
                {insight.recommendations && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Recommendations:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        mt: 1,
                      }}
                    >
                      {insight.recommendations.map((rec: string, i: number) => (
                        <Chip
                          key={i}
                          label={rec}
                          size="small"
                          color="success"
                        />
                      ))}
                    </Box>
                  </Box>
                )}
                <Alert severity="info">
                  <Typography variant="body2">
                    <strong>Application:</strong> {insight.application}
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DocSection>
  )
}
