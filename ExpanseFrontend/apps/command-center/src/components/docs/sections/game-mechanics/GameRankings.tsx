/**
 * Game Rankings Section (Standalone)
 *
 * Displays leaderboards and ranking systems.
 */

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
} from "@mui/material"
import { gameMechanics } from "../../../../data/docs"
import { DocSection } from "../../common"

export default function GameRankings() {
  const { rankings } = gameMechanics

  return (
    <DocSection title={`📊 ${rankings.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {rankings.description}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Comparison Variables
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {rankings.comparisonVariables.map(
                  (variable: string, i: number) => (
                    <Chip key={i} label={variable} size="small" />
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                User Types
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {rankings.userTypes.map((type: string, i: number) => (
                  <Chip
                    key={i}
                    label={type}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Display Types
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {rankings.displayTypes.map((type: string, i: number) => (
                  <Chip key={i} label={type} size="small" variant="outlined" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Leaderboards
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {rankings.leaderboards.description}
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {rankings.leaderboards.features.map(
                  (feat: string, i: number) => (
                    <li key={i}>
                      <Typography variant="caption">{feat}</Typography>
                    </li>
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Alert severity="warning">
        <Typography variant="body2" fontWeight={600}>
          Concern
        </Typography>
        <Typography variant="body2">{rankings.concerns}</Typography>
      </Alert>
    </DocSection>
  )
}
