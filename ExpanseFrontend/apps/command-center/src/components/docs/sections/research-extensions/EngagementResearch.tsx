/**
 * Engagement Research Section
 *
 * Displays engagement research and attention span studies.
 */

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  Divider,
  Paper,
} from "@mui/material"
import { researchExtensions } from "../../../../data/docs"
import { DocSection } from "../../common"

interface EngagementStatistic {
  stat: string
  trend?: string
  implication?: string
  source?: string
}

interface AttentionCause {
  cause: string
  detail: string
}

export default function EngagementResearch() {
  const { engagementResearch } = researchExtensions

  return (
    <DocSection title={`📈 ${engagementResearch.title}`}>
      <Alert severity="warning" sx={{ mb: 3 }}>
        <Typography variant="body2">
          {engagementResearch.overview.summary}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>Solution:</strong> {engagementResearch.overview.solution}
        </Typography>
      </Alert>

      <Typography variant="h6" gutterBottom>
        Key Statistics
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {engagementResearch.keyStatistics.map(
          (stat: EngagementStatistic, i: number) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Chip label={stat.stat} color="warning" sx={{ mb: 1 }} />
                  {stat.trend && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {stat.trend}
                    </Typography>
                  )}
                  {stat.implication && (
                    <Typography variant="body2">{stat.implication}</Typography>
                  )}
                  {stat.source && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      sx={{ mt: 1 }}
                    >
                      Source: {stat.source}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      <Typography variant="h6" gutterBottom>
        Declining Factors
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Primary Factors
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {engagementResearch.decliningFactors.primary.map(
                  (f: string, i: number) => (
                    <Chip key={i} label={f} size="small" color="error" />
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Additional Factors
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {engagementResearch.decliningFactors.additional.map(
                  (f: string, i: number) => (
                    <Chip key={i} label={f} size="small" variant="outlined" />
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
            Attention Span Research
          </Typography>
          <Chip
            label={engagementResearch.attentionSpan.trend}
            color="error"
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" sx={{ mb: 2 }}>
            {engagementResearch.attentionSpan.comparison}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Causes:
          </Typography>
          <Grid container spacing={1}>
            {engagementResearch.attentionSpan.causes.map(
              (cause: AttentionCause, i: number) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Paper sx={{ p: 1, bgcolor: "action.hover" }}>
                    <Typography variant="subtitle2">{cause.cause}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {cause.detail}
                    </Typography>
                  </Paper>
                </Grid>
              )
            )}
          </Grid>
        </CardContent>
      </Card>

      <Alert severity="success" sx={{ mb: 3 }}>
        <Typography variant="body2" fontWeight={600}>
          Autonomy Effect
        </Typography>
        <Typography variant="body2">
          {engagementResearch.autonomyEffect}
        </Typography>
      </Alert>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Mental Health Connection
          </Typography>
          <Typography variant="body2">
            {engagementResearch.mentalHealthConnection.finding}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mt: 1 }}
          >
            Source: {engagementResearch.mentalHealthConnection.source}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2">
            <strong>Johns Hopkins:</strong>{" "}
            {engagementResearch.mentalHealthConnection.johnsHopkins}
          </Typography>
        </CardContent>
      </Card>
    </DocSection>
  )
}
