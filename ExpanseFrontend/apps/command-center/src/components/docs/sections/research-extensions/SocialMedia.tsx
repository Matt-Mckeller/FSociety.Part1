/**
 * Social Media Section
 *
 * Displays social media research and findings.
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

export default function SocialMedia() {
  const { socialMediaResearch } = researchExtensions

  return (
    <DocSection title={`📱 ${socialMediaResearch.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {socialMediaResearch.overview.summary}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Key Findings
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {socialMediaResearch.keyFindings.map(
          (finding: SocialFinding, i: number) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {finding.finding}
                  </Typography>
                  {finding.stat && (
                    <Chip label={finding.stat} color="primary" sx={{ mb: 1 }} />
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
          ),
        )}
      </Grid>

      <Alert severity="success">
        <Typography variant="body2" fontWeight={600}>
          Expanse Approach
        </Typography>
        <Typography variant="body2">
          {socialMediaResearch.expanseApproach}
        </Typography>
      </Alert>
    </DocSection>
  )
}
