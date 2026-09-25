/**
 * Monetization Overview Section
 *
 * Displays core monetization principles and revenue streams.
 */

import { Box, Typography, Grid, Card, CardContent } from "@mui/material"
import { monetization } from "../../../../data/docs"
import { DocSection } from "../../common"

interface RevenueStream {
  stream: string
  description: string
}

export default function MonetizationOverview() {
  const { overview } = monetization

  return (
    <DocSection title={`💰 ${overview.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {overview.description}
      </Typography>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        Core Principles
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            {overview.principles.map((principle: string, i: number) => (
              <li key={i}>
                <Typography variant="body2">{principle}</Typography>
              </li>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        Revenue Streams
      </Typography>
      <Grid container spacing={2}>
        {overview.revenueStreams.map((stream: RevenueStream, i: number) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  {stream.stream}
                </Typography>
                <Typography variant="body2">{stream.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DocSection>
  )
}
