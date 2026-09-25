/**
 * Social Development Section
 *
 * Social development insights and validation.
 * Migrated from DocsView.tsx renderSocialDevelopment()
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
import type { SocialDevelopmentInsight } from "../../../../types/docs"

export default function SocialDevelopment() {
  return (
    <DocSection title="Social Development" icon="🤝">
      <Alert severity="info" sx={{ mb: 3 }}>
        {psychology.socialDevelopment.socialValidation}
      </Alert>

      <Typography variant="h5" gutterBottom>
        Key Insights
      </Typography>
      <Grid container spacing={2}>
        {(
          psychology.socialDevelopment.insights as SocialDevelopmentInsight[]
        ).map((insight, i) => (
          <Grid item xs={12} key={i}>
            <Card>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  {insight.finding}
                </Typography>
                <Chip label={`Source: ${insight.source}`} size="small" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DocSection>
  )
}
