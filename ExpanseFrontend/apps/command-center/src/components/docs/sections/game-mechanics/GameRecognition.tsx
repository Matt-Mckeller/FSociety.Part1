/**
 * Game Recognition Section (Standalone)
 *
 * Displays recognition and certificate systems.
 */

import { Box, Typography, Grid, Card, CardContent, Chip, Alert } from "@mui/material"
import { gameMechanics } from "../../../../data/docs"
import { DocSection } from "../../common"

interface RecognitionType {
  type: string
  description: string
  feature?: string
}

export default function GameRecognition() {
  const { recognition } = gameMechanics

  return (
    <DocSection title={`🌟 ${recognition.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {recognition.description}
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {recognition.recognitionTypes.map((recType: RecognitionType, i: number) => (
          <Grid item xs={12} md={6} key={i}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {recType.type}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {recType.description}
                </Typography>
                {recType.feature && (
                  <Chip
                    label={recType.feature}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Certificates
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            {recognition.certificates.map((cert: string, i: number) => (
              <li key={i}>
                <Typography variant="body2">{cert}</Typography>
              </li>
            ))}
          </Box>
        </CardContent>
      </Card>

      {recognition.futureIdeas && recognition.futureIdeas.length > 0 && (
        <Alert severity="info">
          <Typography variant="body2" fontWeight={600}>
            Future Ideas
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            {recognition.futureIdeas.map((idea: string, i: number) => (
              <li key={i}>
                <Typography variant="body2">{idea}</Typography>
              </li>
            ))}
          </Box>
        </Alert>
      )}
    </DocSection>
  )
}
