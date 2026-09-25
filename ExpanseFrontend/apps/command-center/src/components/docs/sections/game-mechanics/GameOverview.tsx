/**
 * Game Overview Section
 *
 * Displays the core game philosophy and key pillars.
 */

import { Typography, Grid, Card, CardContent, Alert } from "@mui/material"
import { gameMechanics } from "../../../../data/docs"
import { DocSection } from "../../common"

interface GamePillar {
  name: string
  description: string
}

export default function GameOverview() {
  const { overview } = gameMechanics

  return (
    <DocSection title={`🎮 ${overview.title}`}>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {overview.description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2" fontStyle="italic">
          "{overview.corePhilosophy}"
        </Typography>
      </Alert>

      <Typography variant="h6" gutterBottom>
        Key Pillars
      </Typography>
      <Grid container spacing={2}>
        {overview.keyPillars.map((pillar: GamePillar, i: number) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {pillar.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {pillar.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DocSection>
  )
}
