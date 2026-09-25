/**
 * Differentiators Section
 *
 * Key advantages over competitors.
 * Migrated from DocsView.tsx renderDifferentiators()
 */

import { Typography, Card, CardContent } from "@mui/material"
import { DocSection, DocGrid } from "../../common"
import { competition } from "../../../../data/docs"

export default function Differentiators() {
  return (
    <DocSection
      title="Differentiators"
      icon="✨"
      description="Key advantages that set Expanse EDU apart from competitors"
    >
      <DocGrid columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        {competition.differentiators.map((diff, i) => (
          <Card key={i} sx={{ height: "100%", bgcolor: "success.dark" }}>
            <CardContent>
              <Typography variant="body1" fontWeight={600} color="white">
                ✓ {diff}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </DocGrid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        💬 Teacher Feedback on Competitors
      </Typography>
      <DocGrid columns={{ xs: 1, md: 2 }} spacing={2}>
        {competition.teacherFeedback.map((feedback, i) => (
          <Card key={i}>
            <CardContent>
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                &quot;{feedback}&quot;
              </Typography>
            </CardContent>
          </Card>
        ))}
      </DocGrid>
    </DocSection>
  )
}
