/**
 * Self-Efficacy Section
 *
 * Self-efficacy principles and instructional practices.
 * Migrated from DocsView.tsx renderSelfEfficacy()
 */

import {
  Typography,
  Card,
  CardContent,
  Alert,
  Grid,
} from "@mui/material"
import { DocSection } from "../../common"
import { psychology } from "../../../../data/docs"

export default function SelfEfficacy() {
  return (
    <DocSection title="Self-Efficacy" icon="💪">
      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Definition:</strong> {psychology.selfEfficacy.definition}
      </Alert>

      <Typography variant="h5" gutterBottom>
        Key Principles
      </Typography>
      <Grid container spacing={1} sx={{ mb: 3 }}>
        {psychology.selfEfficacy.keyPrinciples.map((principle, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Card>
              <CardContent sx={{ py: 1.5 }}>
                <Typography variant="body2">• {principle}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom>
        Instructional Practices
      </Typography>
      <Grid container spacing={1}>
        {psychology.selfEfficacy.instructionalPractices.map((practice, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Card sx={{ bgcolor: "action.hover" }}>
              <CardContent sx={{ py: 1.5 }}>
                <Typography variant="body2">✓ {practice}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 2, display: "block" }}
      >
        Source: {psychology.selfEfficacy.source}
      </Typography>
    </DocSection>
  )
}
