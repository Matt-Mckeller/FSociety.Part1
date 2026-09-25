/**
 * Purpose & Motivation Section
 *
 * Displays research on purpose and motivation in education.
 */

import { Typography, Grid, Card, CardContent, Chip, Alert } from "@mui/material"
import { researchExtensions } from "../../../../data/docs"
import { DocSection } from "../../common"

interface KeyFinding {
  finding: string
  stat?: string
  source?: string
  cause?: string
  insight?: string
  implication?: string
}

export default function PurposeMotivation() {
  const { purposeAndMotivation } = researchExtensions

  return (
    <DocSection title={`🎯 ${purposeAndMotivation.title}`}>
      <Alert severity="warning" sx={{ mb: 3 }}>
        <Typography variant="body2">
          {purposeAndMotivation.overview.summary}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          sx={{ mt: 1 }}
        >
          Source: {purposeAndMotivation.overview.source}
        </Typography>
      </Alert>

      <Typography variant="h6" gutterBottom>
        Key Findings
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {purposeAndMotivation.keyFindings.map((item: KeyFinding, i: number) => (
          <Grid item xs={12} md={6} key={i}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {item.finding}
                </Typography>
                {item.stat && (
                  <Chip
                    label={item.stat}
                    size="small"
                    color="error"
                    sx={{ mb: 1 }}
                  />
                )}
                {item.source && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    Source: {item.source}
                  </Typography>
                )}
                {item.cause && (
                  <Typography variant="body2" color="text.secondary">
                    Cause: {item.cause}
                  </Typography>
                )}
                {item.insight && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {item.insight}
                  </Typography>
                )}
                {item.implication && (
                  <Alert severity="info" sx={{ mt: 1 }}>
                    <Typography variant="body2">{item.implication}</Typography>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Alert severity="success">
        <Typography variant="body2" fontWeight={600}>
          Expanse Approach
        </Typography>
        <Typography variant="body2">
          {purposeAndMotivation.expanseApproach}
        </Typography>
      </Alert>
    </DocSection>
  )
}
