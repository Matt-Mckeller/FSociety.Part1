/**
 * Game Expansions Section (Standalone)
 *
 * Displays expansions, seasons, and LMS integration.
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
} from "@mui/material"
import { gameMechanics } from "../../../../data/docs"
import { DocSection } from "../../common"

export default function GameExpansions() {
  const { expansions, lmsIntegration, configuration } = gameMechanics

  return (
    <DocSection title={`🌍 ${expansions.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {expansions.description}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Seasons
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {expansions.seasons.description}
              </Typography>
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="caption">
                  Purpose: {expansions.seasons.purpose}
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Seasonal Rewards
              </Typography>
              <Typography variant="body2">
                {expansions.seasonalRewards}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom fontWeight={600}>
        LMS Integration
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {lmsIntegration.description}
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Process Flow
          </Typography>
          <Box component="ol" sx={{ m: 0, pl: 2 }}>
            {lmsIntegration.process.map((step: string, i: number) => (
              <li key={i}>
                <Typography variant="body2">{step}</Typography>
              </li>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        Configuration
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {configuration.description}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {configuration.levels.map((level: string, i: number) => (
          <Chip key={i} label={level} color="secondary" variant="outlined" />
        ))}
      </Box>
    </DocSection>
  )
}
