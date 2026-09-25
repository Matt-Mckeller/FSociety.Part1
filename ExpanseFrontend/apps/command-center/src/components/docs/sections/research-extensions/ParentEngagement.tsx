/**
 * Parent Engagement Section
 *
 * Displays research on parent engagement in education.
 */

import { Typography, Card, CardContent, Alert, Paper } from "@mui/material"
import { researchExtensions } from "../../../../data/docs"
import { DocSection } from "../../common"

interface KeyInsight {
  insight: string
  quote: string
  source: string
}

export default function ParentEngagement() {
  const { parentEngagement } = researchExtensions

  return (
    <DocSection title={`👨‍👩‍👧 ${parentEngagement.title}`}>
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          {parentEngagement.overview.summary}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          sx={{ mt: 1 }}
        >
          Source: {parentEngagement.overview.source}
        </Typography>
      </Alert>

      <Typography variant="h6" gutterBottom>
        Key Insights
      </Typography>
      {parentEngagement.keyInsights.map((insight: KeyInsight, i: number) => (
        <Card key={i} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              {insight.insight}
            </Typography>
            <Paper sx={{ p: 2, bgcolor: "action.hover", mb: 1 }}>
              <Typography variant="body2" fontStyle="italic">
                "{insight.quote}"
              </Typography>
            </Paper>
            <Typography variant="caption" color="text.secondary">
              — {insight.source}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Alert severity="success" sx={{ mt: 3 }}>
        <Typography variant="body2" fontWeight={600}>
          Expanse Opportunity
        </Typography>
        <Typography variant="body2">
          {parentEngagement.expanseOpportunity}
        </Typography>
      </Alert>
    </DocSection>
  )
}
