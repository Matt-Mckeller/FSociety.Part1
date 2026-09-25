/**
 * Feedback Systems Section
 *
 * Displays feedback systems and error opportunity research.
 */

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Paper,
} from "@mui/material"
import { learningScience } from "../../../../data/docs"
import { DocSection } from "../../common"

interface FeedbackType {
  type: string
  purpose: string
  example: string
}

export default function FeedbackSystems() {
  const { feedbackSystems } = learningScience

  return (
    <DocSection title={`📣 ${feedbackSystems.title}`}>
      <Paper
        sx={{ p: 3, mb: 3, bgcolor: "info.main", color: "info.contrastText" }}
      >
        <Typography variant="h6" gutterBottom>
          Key Insight
        </Typography>
        <Typography variant="body1">
          {feedbackSystems.overview.keyInsight}
        </Typography>
      </Paper>

      <Typography variant="body1" sx={{ mb: 3 }}>
        {feedbackSystems.overview.summary}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {feedbackSystems.roleInLearning.title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {feedbackSystems.roleInLearning.description}
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {(feedbackSystems.roleInLearning.types as FeedbackType[]).map(
          (t, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {t.type}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Purpose:</strong> {t.purpose}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Example:</strong> {t.example}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ),
        )}
      </Grid>

      <Typography variant="h5" gutterBottom>
        {feedbackSystems.errorOpportunity.title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {feedbackSystems.errorOpportunity.description}
      </Typography>
      <Paper sx={{ p: 2, mb: 3, bgcolor: "action.hover" }}>
        <Box component="ul" sx={{ m: 0, pl: 2 }}>
          {feedbackSystems.errorOpportunity.principles.map(
            (p: string, i: number) => (
              <li key={i}>
                <Typography variant="body2">{p}</Typography>
              </li>
            ),
          )}
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom>
        {feedbackSystems.expanseApproach.title}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {feedbackSystems.expanseApproach.principles.map(
          (p: string, i: number) => (
            <Chip key={i} label={p} color="success" variant="outlined" />
          ),
        )}
      </Box>
    </DocSection>
  )
}
