/**
 * Statistics Section
 *
 * Key statistics display.
 * Migrated from DocsView.tsx renderStatistics()
 */

import { Typography, Card, CardContent, Divider, Grid } from "@mui/material"
import { DocSection } from "../../common"
import { research } from "../../../../data/docs"
import type { ResearchStatistic } from "../../../../types/docs"

export default function Statistics() {
  return (
    <DocSection title="Key Statistics" icon="📊">
      <Grid container spacing={3}>
        {(research.statistics as ResearchStatistic[]).map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: "100%", textAlign: "center" }}>
              <CardContent>
                <Typography variant="h3" color="primary" fontWeight={700}>
                  {stat.stat}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {stat.description}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {stat.context}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DocSection>
  )
}
