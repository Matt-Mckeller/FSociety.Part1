/**
 * Communication Parent Section
 *
 * Displays parent-teacher communication features.
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
import { communication } from "../../../../data/docs"
import { DocSection } from "../../common"

interface MessageType {
  type: string
  examples: string[]
}

export default function CommParent() {
  const { parentCommunication } = communication

  return (
    <DocSection title={`👨‍👩‍👧 ${parentCommunication.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {parentCommunication.description}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Teacher Features
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {parentCommunication.features.map((feat: string, i: number) => (
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
                Parent Features
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {parentCommunication.parentFeatures.map(
                  (feat: string, i: number) => (
                    <li key={i}>
                      <Typography variant="body2">{feat}</Typography>
                    </li>
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        Message Types
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {parentCommunication.messageTypes.map((msg: MessageType, i: number) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="subtitle2" fontWeight={600}>
                  {msg.type}
                </Typography>
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}
                >
                  {msg.examples.map((ex: string, j: number) => (
                    <Chip key={j} label={ex} size="small" variant="outlined" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Alert severity="warning">
        <Typography variant="body2" fontWeight={600}>
          Risks & Mitigations
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="caption" fontWeight={600}>
              Risks:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2 }}>
              {parentCommunication.risks.map((risk: string, i: number) => (
                <li key={i}>
                  <Typography variant="caption">{risk}</Typography>
                </li>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="caption" fontWeight={600}>
              Mitigations:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2 }}>
              {parentCommunication.mitigations.map(
                (mit: string, i: number) => (
                  <li key={i}>
                    <Typography variant="caption">{mit}</Typography>
                  </li>
                )
              )}
            </Box>
          </Grid>
        </Grid>
      </Alert>
    </DocSection>
  )
}
