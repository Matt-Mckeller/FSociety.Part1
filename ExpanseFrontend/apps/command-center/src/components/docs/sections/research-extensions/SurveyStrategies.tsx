/**
 * Survey Strategies Section
 *
 * Displays survey types and data collection strategies.
 */

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Paper,
} from "@mui/material"
import { researchExtensions } from "../../../../data/docs"
import { DocSection } from "../../common"

interface SurveyType {
  type: string
  purpose: string
  metrics?: string[]
}

export default function SurveyStrategies() {
  const { surveyStrategies } = researchExtensions

  return (
    <DocSection title={`📋 ${surveyStrategies.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {surveyStrategies.overview.summary}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Survey Types
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {surveyStrategies.surveyTypes.map((type: SurveyType, i: number) => (
          <Grid item xs={12} md={6} key={i}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {type.type}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {type.purpose}
                </Typography>
                {type.metrics && (
                  <Box
                    sx={{
                      mt: 1,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                    }}
                  >
                    {type.metrics.map((m: string, j: number) => (
                      <Chip key={j} label={m} size="small" variant="outlined" />
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" gutterBottom>
        Sample Questions
      </Typography>
      <Paper sx={{ p: 2, mb: 3, bgcolor: "action.hover" }}>
        <Box component="ul" sx={{ m: 0, pl: 2 }}>
          {surveyStrategies.sampleQuestions.map((q: string, i: number) => (
            <li key={i}>
              <Typography variant="body2">{q}</Typography>
            </li>
          ))}
        </Box>
      </Paper>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600}>
                Suggestion Boxes
              </Typography>
              <Typography variant="body2">
                {surveyStrategies.suggestionBoxes.purpose}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600}>
                Incentives
              </Typography>
              <Typography variant="body2">
                {surveyStrategies.incentives.approach}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mt: 1 }}
              >
                {surveyStrategies.incentives.rationale}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DocSection>
  )
}
