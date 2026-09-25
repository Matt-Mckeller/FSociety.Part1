/**
 * Game Progression Section
 *
 * Displays progression systems, user types, and design considerations.
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

interface ProgressionType {
  type: string
  description: string
  concerns?: string
}

export default function GameProgression() {
  const { progression } = gameMechanics

  return (
    <DocSection title={`📈 ${progression.title}`}>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {progression.description}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Progression Types
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {progression.progressionTypes.map((pt: ProgressionType, i: number) => (
          <Grid item xs={12} sm={6} key={i}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  {pt.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {pt.description}
                </Typography>
                {pt.concerns && (
                  <Alert severity="warning" sx={{ mt: 1 }}>
                    <Typography variant="caption">
                      Concern: {pt.concerns}
                    </Typography>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        User Types
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {progression.userTypes.map((type: string, i: number) => (
          <Chip key={i} label={type} color="primary" variant="outlined" />
        ))}
      </Box>

      <Alert severity="info" sx={{ mb: 2 }}>
        <Typography variant="body2">{progression.groupProgression}</Typography>
      </Alert>

      <Typography variant="h6" gutterBottom>
        Design Notes
      </Typography>
      <Box component="ul" sx={{ m: 0, pl: 2 }}>
        {progression.designNotes.map((note: string, i: number) => (
          <li key={i}>
            <Typography variant="body2">{note}</Typography>
          </li>
        ))}
      </Box>

      {progression.risks.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Risks
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            {progression.risks.map((risk: string, i: number) => (
              <li key={i}>
                <Typography variant="body2" color="warning.main">
                  {risk}
                </Typography>
              </li>
            ))}
          </Box>
        </>
      )}
    </DocSection>
  )
}
