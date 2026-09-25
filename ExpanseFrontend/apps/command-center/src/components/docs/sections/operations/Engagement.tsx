/**
 * Engagement Section
 *
 * Student engagement metrics and analysis.
 * Migrated from DocsView.tsx renderEngagement()
 */

import {
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Alert,
  Divider,
  Grid,
} from "@mui/material"
import { DocSection } from "../../common"
import { businessOperations } from "../../../../data/docs"
import type { EngagementStat, AttentionSpanCause } from "../../../../types/docs"

export default function Engagement() {
  return (
    <DocSection title="Student Engagement" icon="📈">
      <Alert severity="warning" sx={{ mb: 3 }}>
        {businessOperations.engagement.stakeholderDemand}
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current State
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Engagement Levels:</strong>{" "}
                {businessOperations.engagement.currentState.engagementLevels}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Trend:</strong>{" "}
                {businessOperations.engagement.currentState.trend}
              </Typography>
              <Typography variant="body2">
                <strong>Elementary vs High School:</strong>{" "}
                {
                  businessOperations.engagement.currentState
                    .elementaryVsHighSchool
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ⏱️ Attention Span
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {businessOperations.engagement.attentionSpan.trend}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {businessOperations.engagement.attentionSpan.comparison}
              </Typography>
              <Typography variant="caption">
                Source: {businessOperations.engagement.attentionSpan.source}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        📊 Key Statistics
      </Typography>
      <Grid container spacing={2}>
        {businessOperations.engagement.keyStats.map(
          (stat: EngagementStat, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body1" fontWeight={600}>
                    {stat.stat}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {stat.source}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        📉 Factors Behind Declining Engagement
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {businessOperations.engagement.decliningFactors.map((factor, i) => (
          <Chip key={i} label={factor} variant="outlined" size="small" />
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        🧠 Causes of Reduced Attention
      </Typography>
      <Grid container spacing={2}>
        {businessOperations.engagement.reducedAttentionCauses.map(
          (cause: AttentionSpanCause, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Card sx={{ bgcolor: "action.hover" }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {cause.cause}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cause.detail}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Card sx={{ bgcolor: "success.light" }}>
        <CardContent>
          <Typography variant="h6">🎯 Autonomy Effect</Typography>
          <Typography variant="body1">
            {businessOperations.engagement.autonomyEffect}
          </Typography>
        </CardContent>
      </Card>
    </DocSection>
  )
}
