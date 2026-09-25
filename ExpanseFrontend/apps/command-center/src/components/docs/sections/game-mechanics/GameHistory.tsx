/**
 * Game History Section
 *
 * Displays history and reflection features.
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

interface VisualizationType {
  type: string
  description: string
}

export default function GameHistory() {
  const { historyReflection } = gameMechanics

  return (
    <DocSection title={`📊 ${historyReflection.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {historyReflection.description}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Features
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {historyReflection.features.map((feat: string, i: number) => (
                  <li key={i}>
                    <Typography variant="body2">{feat}</Typography>
                  </li>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Reflection Types
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {historyReflection.reflectionTypes.map(
                  (type: string, i: number) => (
                    <Chip
                      key={i}
                      label={type}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        Visualization Methods
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {historyReflection.visualizations.map(
          (viz: VisualizationType, i: number) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {viz.type}
                  </Typography>
                  <Typography variant="caption">{viz.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      <Alert severity="success" sx={{ mb: 2 }}>
        <Typography variant="body2">
          <strong>Value:</strong> {historyReflection.value}
        </Typography>
      </Alert>

      <Alert severity="info">
        <Typography variant="body2">
          <strong>Privacy Note:</strong> {historyReflection.privacyNote}
        </Typography>
      </Alert>
    </DocSection>
  )
}
