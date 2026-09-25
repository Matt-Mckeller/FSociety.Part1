/**
 * Game Profiles Section
 *
 * Displays user and school profile systems.
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

export default function GameProfiles() {
  const { profiles } = gameMechanics

  return (
    <DocSection title={`👤 ${profiles.title}`}>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {profiles.description}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                User Profiles
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {profiles.userProfiles.description}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Implementation
                </Typography>
                <Chip
                  label={`Difficulty: ${profiles.userProfiles.implementationDifficulty}`}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Chip
                  label={profiles.userProfiles.value}
                  size="small"
                  variant="outlined"
                />
              </Box>

              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Default Aspects
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                {profiles.userProfiles.defaultAspects.map(
                  (aspect: string, i: number) => (
                    <Chip
                      key={i}
                      label={aspect}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  )
                )}
              </Box>

              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Game Aspects
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                {profiles.userProfiles.gameAspects.map(
                  (aspect: string, i: number) => (
                    <Chip
                      key={i}
                      label={aspect}
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                  )
                )}
              </Box>

              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Customization Options
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {profiles.userProfiles.customization.map(
                  (option: string, i: number) => (
                    <Typography component="li" variant="body2" key={i}>
                      {option}
                    </Typography>
                  )
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                User Types
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                {profiles.userProfiles.userTypes.map(
                  (type: string, i: number) => (
                    <Chip key={i} label={type} size="small" />
                  )
                )}
              </Box>

              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Profit Model:</strong> {profiles.userProfiles.profit}
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                School Profiles
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {profiles.schoolProfiles.description}
              </Typography>

              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Features
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {profiles.schoolProfiles.features.map(
                  (feature: string, i: number) => (
                    <Typography component="li" variant="body2" key={i}>
                      {feature}
                    </Typography>
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Future Ideas
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {profiles.userProfiles.ideas.map((idea: string, i: number) => (
          <Chip key={i} label={idea} color="info" variant="outlined" />
        ))}
      </Box>
    </DocSection>
  )
}
