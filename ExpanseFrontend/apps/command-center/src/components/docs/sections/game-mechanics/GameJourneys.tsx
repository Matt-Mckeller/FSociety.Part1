/**
 * Game Journeys Section
 *
 * Displays user journeys, onboarding flows, and LMS integration.
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

export default function GameJourneys() {
  const { userJourneys, goals, expansions, lmsIntegration, configuration } =
    gameMechanics

  return (
    <DocSection title={`🚀 ${userJourneys.title}`}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {userJourneys.coreFlow.title}
          </Typography>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            High Level
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            {userJourneys.coreFlow.highLevel.map((step: string, i: number) => (
              <Chip key={i} label={`${i + 1}. ${step}`} color="primary" />
            ))}
          </Box>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Details
          </Typography>
          <Box component="ol" sx={{ m: 0, pl: 2 }}>
            {userJourneys.coreFlow.details.map((detail: string, i: number) => (
              <li key={i}>
                <Typography variant="body2">{detail}</Typography>
              </li>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>
        Parent Onboarding Flow
      </Typography>
      <Grid container spacing={1} sx={{ mb: 3 }}>
        {userJourneys.parentOnboarding.map((step: string, i: number) => (
          <Grid item xs={12} sm={6} key={i}>
            <Card sx={{ bgcolor: "action.hover" }}>
              <CardContent sx={{ py: 1 }}>
                <Typography variant="body2">
                  <strong>{i + 1}.</strong> {step}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" gutterBottom>
        Other Journeys
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {userJourneys.otherJourneys.map((journey: string, i: number) => (
          <Chip key={i} label={journey} variant="outlined" />
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Goals System
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {goals.description}
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Goal Types
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {goals.goalTypes.map((type: string, i: number) => (
                  <Chip key={i} label={type} size="small" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Visualization
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {goals.visualization.map((viz: string, i: number) => (
                  <Chip key={i} label={viz} size="small" variant="outlined" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">{goals.notes}</Typography>
      </Alert>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Expansions & Seasons
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {expansions.description}
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" fontWeight={600}>
            Seasons
          </Typography>
          <Typography variant="body2">
            {expansions.seasons.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Purpose: {expansions.seasons.purpose}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>
        LMS Integration
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {lmsIntegration.description}
      </Typography>
      <Box component="ol" sx={{ m: 0, pl: 2, mb: 3 }}>
        {lmsIntegration.process.map((step: string, i: number) => (
          <li key={i}>
            <Typography variant="body2">{step}</Typography>
          </li>
        ))}
      </Box>

      <Typography variant="h6" gutterBottom>
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
