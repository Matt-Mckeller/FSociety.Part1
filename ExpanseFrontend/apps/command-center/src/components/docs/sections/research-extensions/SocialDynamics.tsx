/**
 * Social Dynamics Section
 *
 * Displays social dynamics research findings.
 */

import { Typography, Grid, Card, CardContent, Chip, Alert } from "@mui/material"
import { researchExtensions } from "../../../../data/docs"
import { DocSection } from "../../common"

interface SocialFinding {
  finding: string
  stat?: string
  detail?: string
  insight?: string
  implication?: string
  source?: string
}

export default function SocialDynamics() {
  const { socialDynamics } = researchExtensions

  return (
    <DocSection title={`🤝 ${socialDynamics.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {socialDynamics.overview.summary}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Key Findings
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {socialDynamics.keyFindings.map((finding: SocialFinding, i: number) => (
          <Grid item xs={12} md={6} key={i}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {finding.finding}
                </Typography>
                {finding.stat && (
                  <Chip label={finding.stat} color="warning" sx={{ mb: 1 }} />
                )}
                {finding.detail && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {finding.detail}
                  </Typography>
                )}
                {finding.insight && (
                  <Typography variant="body2" color="text.secondary">
                    {finding.insight}
                  </Typography>
                )}
                {finding.implication && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, fontStyle: "italic" }}
                  >
                    Implication: {finding.implication}
                  </Typography>
                )}
                {finding.source && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    sx={{ mt: 1 }}
                  >
                    Source: {finding.source}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Alert severity="success">
        <Typography variant="body2" fontWeight={600}>
          Expanse Relevance
        </Typography>
        <Typography variant="body2">
          {socialDynamics.expanseRelevance}
        </Typography>
      </Alert>
    </DocSection>
  )
}
