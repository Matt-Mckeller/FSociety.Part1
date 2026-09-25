/**
 * Dopamine Section
 *
 * Dopamine and motivation psychology.
 * Migrated from DocsView.tsx renderDopamine()
 */

import {
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Alert,
  Grid,
} from "@mui/material"
import { DocSection } from "../../common"
import { psychology } from "../../../../data/docs"
import type { DopamineInsight } from "../../../../types/docs"

export default function Dopamine() {
  return (
    <DocSection title="Dopamine & Motivation" icon="🧠">
      <Alert severity="info" sx={{ mb: 3 }}>
        {psychology.dopamine.description}
      </Alert>

      <Typography variant="h5" gutterBottom>
        Key Insights
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {(psychology.dopamine.keyInsights as DopamineInsight[]).map(
          (insight, i) => (
            <Grid item xs={12} key={i}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {insight.insight}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Application:</strong> {insight.application}
                  </Typography>
                  <Chip label={`Source: ${insight.source}`} size="small" />
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      <Typography variant="h5" gutterBottom>
        Reward Variance
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            <strong>{psychology.dopamine.rewardVariance.concept}</strong>
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {psychology.dopamine.rewardVariance.application}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {psychology.dopamine.rewardVariance.examples.map((ex, i) => (
              <Chip key={i} label={ex} size="small" variant="outlined" />
            ))}
          </Box>
        </CardContent>
      </Card>
    </DocSection>
  )
}
