/**
 * Interventions Section
 *
 * Positive interventions and research evidence.
 * Migrated from DocsView.tsx renderInterventions()
 */

import { Typography, Card, CardContent, Grid } from "@mui/material"
import { DocSection } from "../../common"
import { mentalHealth } from "../../../../data/docs"

export default function Interventions() {
  return (
    <DocSection title="Positive Interventions" icon="🌟">
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%", bgcolor: "primary.dark" }}>
            <CardContent>
              <Typography variant="h6" color="white" gutterBottom>
                🎨 Art Therapy
              </Typography>
              <Typography variant="body2" color="white" sx={{ mb: 1 }}>
                {mentalHealth.positiveInterventions.art.finding}
              </Typography>
              <Typography variant="caption" color="white">
                Mechanism: {mentalHealth.positiveInterventions.art.mechanism}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%", bgcolor: "success.dark" }}>
            <CardContent>
              <Typography variant="h6" color="white" gutterBottom>
                ✅ PBIS
              </Typography>
              <Typography variant="body2" color="white" sx={{ mb: 1 }}>
                {mentalHealth.positiveInterventions.pbis.finding}
              </Typography>
              <Typography variant="caption" color="white">
                Mechanism: {mentalHealth.positiveInterventions.pbis.mechanism}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%", bgcolor: "info.dark" }}>
            <CardContent>
              <Typography variant="h6" color="white" gutterBottom>
                🌈 Positive Reinforcement
              </Typography>
              <Typography variant="body2" color="white" sx={{ mb: 1 }}>
                {
                  mentalHealth.positiveInterventions.positiveReinforcement
                    .finding
                }
              </Typography>
              <Typography variant="caption" color="white">
                Impact:{" "}
                {
                  mentalHealth.positiveInterventions.positiveReinforcement
                    .impact
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom>
        Research Evidence
      </Typography>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            Ghana Study
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Finding:</strong>{" "}
            {mentalHealth.researchEvidence.ghanaStudy.finding}
          </Typography>
          <Typography variant="h5" color="success.main" sx={{ mb: 1 }}>
            {mentalHealth.researchEvidence.ghanaStudy.result}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {mentalHealth.researchEvidence.ghanaStudy.factors}
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            Classroom Environment
          </Typography>
          <Typography variant="body2">
            {mentalHealth.researchEvidence.classroomEnvironment.finding}
          </Typography>
        </CardContent>
      </Card>
    </DocSection>
  )
}
