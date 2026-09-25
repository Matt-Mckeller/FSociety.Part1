/**
 * Mental Health Stats Section
 *
 * Mental health statistics and key findings.
 * Migrated from DocsView.tsx renderMentalHealthStats()
 */

import {
  Typography,
  Card,
  CardContent,
  Chip,
  Alert,
  Grid,
} from "@mui/material"
import { DocSection } from "../../common"
import { mentalHealth } from "../../../../data/docs"
import type { MentalHealthStat, MentalHealthFinding } from "../../../../types/docs"

export default function MentalHealthStats() {
  return (
    <DocSection title="Mental Health Statistics" icon="💚">
      <Alert severity="warning" sx={{ mb: 3 }}>
        {mentalHealth.overview.keyMessage}
      </Alert>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {(mentalHealth.statistics as MentalHealthStat[]).map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat.id}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography
                  variant="h3"
                  color={
                    stat.severity === "critical"
                      ? "error.main"
                      : stat.severity === "high"
                        ? "warning.main"
                        : "info.main"
                  }
                >
                  {stat.stat}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {stat.description}
                </Typography>
                <Chip
                  label={stat.source}
                  size="small"
                  color={
                    stat.severity === "critical"
                      ? "error"
                      : stat.severity === "high"
                        ? "warning"
                        : "default"
                  }
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom>
        Key Findings
      </Typography>
      {(mentalHealth.keyFindings as MentalHealthFinding[]).map((finding, i) => (
        <Card key={i} sx={{ mb: 1 }}>
          <CardContent sx={{ py: 1.5 }}>
            <Typography variant="body2">{finding.finding}</Typography>
            <Chip label={finding.source} size="small" sx={{ mt: 1 }} />
          </CardContent>
        </Card>
      ))}
    </DocSection>
  )
}
