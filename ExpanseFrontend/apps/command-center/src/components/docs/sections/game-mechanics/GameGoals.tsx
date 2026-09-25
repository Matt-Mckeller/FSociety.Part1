/**
 * Game Goals Section (Standalone)
 *
 * Displays the goals system.
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

export default function GameGoals() {
  const { goals } = gameMechanics

  return (
    <DocSection title={`🎯 ${goals.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {goals.description}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Goal Types
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {goals.goalTypes.map((type: string, i: number) => (
                  <Chip key={i} label={type} size="small" color="primary" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Visualization Methods
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

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Examples
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            {goals.examples.map((ex: string, i: number) => (
              <li key={i}>
                <Typography variant="body2">{ex}</Typography>
              </li>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Alert severity="info">
        <Typography variant="body2">{goals.notes}</Typography>
      </Alert>
    </DocSection>
  )
}
