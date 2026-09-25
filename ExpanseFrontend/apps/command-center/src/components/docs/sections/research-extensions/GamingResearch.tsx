/**
 * Gaming Research Section
 *
 * Displays gaming trends and gamification research.
 */

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  Paper,
} from "@mui/material"
import { researchExtensions } from "../../../../data/docs"
import { DocSection } from "../../common"

interface GamingTrend {
  trend: string
  detail?: string
  insight?: string
  source?: string
}

export default function GamingResearch() {
  const { gamingResearch } = researchExtensions

  return (
    <DocSection title={`🎮 ${gamingResearch.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {gamingResearch.overview.summary}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Trends
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {gamingResearch.trends.map((trend: GamingTrend, i: number) => (
          <Grid item xs={12} md={6} key={i}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {trend.trend}
                </Typography>
                {trend.detail && (
                  <Typography variant="body2">{trend.detail}</Typography>
                )}
                {trend.insight && (
                  <Typography variant="body2" color="text.secondary">
                    {trend.insight}
                  </Typography>
                )}
                {trend.source && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    sx={{ mt: 1 }}
                  >
                    Source: {trend.source}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Platforms
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {gamingResearch.platforms.map((p: string, i: number) => (
                  <Chip key={i} label={p} size="small" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Game Types
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {gamingResearch.gameTypes.map((t: string, i: number) => (
                  <Chip key={i} label={t} size="small" variant="outlined" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Gamification Elements
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {gamingResearch.gamificationElements.map(
                  (e: string, i: number) => (
                    <Chip key={i} label={e} size="small" color="primary" />
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Microsoft Example
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {gamingResearch.microsoftExample.description}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Strategy:</strong> {gamingResearch.microsoftExample.strategy}
          </Typography>
          <Alert severity="info">
            <Typography variant="body2">
              {gamingResearch.microsoftExample.insight}
            </Typography>
          </Alert>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>
        Research Questions
      </Typography>
      <Paper sx={{ p: 2, bgcolor: "action.hover" }}>
        <Box component="ul" sx={{ m: 0, pl: 2 }}>
          {gamingResearch.researchQuestions.map((q: string, i: number) => (
            <li key={i}>
              <Typography variant="body2">{q}</Typography>
            </li>
          ))}
        </Box>
      </Paper>
    </DocSection>
  )
}
