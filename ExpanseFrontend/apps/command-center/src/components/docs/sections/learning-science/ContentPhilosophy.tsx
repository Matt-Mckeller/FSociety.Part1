/**
 * Content Philosophy Section
 *
 * Displays core beliefs and educational insights.
 */

import { Typography, Grid, Card, CardContent, Alert } from "@mui/material"
import { learningScience } from "../../../../data/docs"
import { DocSection } from "../../common"

interface CoreBelief {
  id: string
  title: string
  insight: string
  application: string
}

export default function ContentPhilosophy() {
  const contentPhilosophy = (learningScience as any).contentPhilosophy

  if (!contentPhilosophy) {
    return (
      <DocSection title="📖 Content Philosophy & Educational Insights">
        <Typography variant="body1" color="text.secondary">
          Content philosophy data not available.
        </Typography>
      </DocSection>
    )
  }

  return (
    <DocSection title="📖 Content Philosophy & Educational Insights">
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Core beliefs and insights that guide content creation and educational
        approach.
      </Typography>

      <Grid container spacing={2}>
        {contentPhilosophy.coreBeliefs?.map((belief: CoreBelief) => (
          <Grid item xs={12} md={6} key={belief.id}>
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-2px)" },
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {belief.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {belief.insight}
                </Typography>
                <Alert severity="info" sx={{ mt: 1 }}>
                  <Typography variant="body2">
                    <strong>Application:</strong> {belief.application}
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DocSection>
  )
}
