/**
 * Communication Overview Section
 *
 * Displays communication channels overview.
 */

import { Typography, Grid, Card, CardContent } from "@mui/material"
import { communication } from "../../../../data/docs"
import { DocSection } from "../../common"

interface Channel {
  channel: string
  audience: string
}

export default function CommOverview() {
  const { overview } = communication

  return (
    <DocSection title={`📱 ${overview.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {overview.description}
      </Typography>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        Communication Channels
      </Typography>
      <Grid container spacing={2}>
        {overview.channels.map((ch: Channel, i: number) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  {ch.channel}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {ch.audience}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DocSection>
  )
}
