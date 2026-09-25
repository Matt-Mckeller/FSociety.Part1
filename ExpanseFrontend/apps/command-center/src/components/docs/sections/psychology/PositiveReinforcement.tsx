/**
 * Positive Reinforcement Section
 *
 * Positive reinforcement psychology and PBIS evidence.
 * Migrated from DocsView.tsx renderPositiveReinforcement()
 */

import {
  Typography,
  Card,
  CardContent,
  Chip,
  Alert,
  Grid,
} from "@mui/material"
import { DocSection } from "../../common"
import { psychology } from "../../../../data/docs"
import type { PsychologyBenefit } from "../../../../types/docs"

export default function PositiveReinforcement() {
  return (
    <DocSection title="Positive Reinforcement" icon="✨">
      <Alert severity="success" sx={{ mb: 3 }}>
        {psychology.positiveReinforcement.description}
      </Alert>

      <Typography variant="h5" gutterBottom>
        Benefits
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {(psychology.positiveReinforcement.benefits as PsychologyBenefit[]).map(
          (b, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" color="success.main" gutterBottom>
                    {b.benefit}
                  </Typography>
                  <Typography variant="body2">{b.detail}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      <Typography variant="h5" gutterBottom>
        PBIS Evidence
      </Typography>
      <Card sx={{ mb: 3, bgcolor: "success.dark" }}>
        <CardContent>
          <Typography variant="h4" color="white">
            {psychology.positiveReinforcement.pbisEvidence.stat}
          </Typography>
          <Typography variant="body1" color="white">
            {psychology.positiveReinforcement.pbisEvidence.impact}
          </Typography>
          <Chip
            label={psychology.positiveReinforcement.pbisEvidence.source}
            size="small"
            sx={{ mt: 1 }}
          />
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom>
        Addressing Disparities
      </Typography>
      <Card>
        <CardContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            {psychology.positiveReinforcement.disparityData.issue}
          </Alert>
          <Typography variant="body2">
            <strong>Expanse Role:</strong>{" "}
            {psychology.positiveReinforcement.disparityData.expanseRole}
          </Typography>
          <Chip
            label={`Source: ${psychology.positiveReinforcement.disparityData.source}`}
            size="small"
            sx={{ mt: 1 }}
          />
        </CardContent>
      </Card>
    </DocSection>
  )
}
