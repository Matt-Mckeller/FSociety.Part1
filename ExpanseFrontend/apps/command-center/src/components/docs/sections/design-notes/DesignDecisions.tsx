/**
 * Design Decisions Section
 *
 * Displays key design decisions and their rationale.
 */

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  Paper,
} from "@mui/material"
import { designNotes } from "../../../../data/docs"
import { DocSection } from "../../common"

export default function DesignDecisions() {
  const { designDecisions } = designNotes

  return (
    <DocSection title={`🎨 ${designDecisions.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {designDecisions.overview.summary}
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Customer Satisfaction (TQM)
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {designDecisions.customerSatisfaction.concept}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {designDecisions.customerSatisfaction.description}
              </Typography>
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  {designDecisions.customerSatisfaction.application}
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Trust
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {designDecisions.trust.principle}
              </Typography>
              <Alert severity="success">
                <Typography variant="body2">
                  {designDecisions.trust.application}
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Purpose Ideas
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            {designDecisions.purpose.ideas.map((idea: string, i: number) => (
              <li key={i}>
                <Typography variant="body2">{idea}</Typography>
              </li>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Avoid Control
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {designDecisions.avoidControl.principle}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Evidence: {designDecisions.avoidControl.evidence}
          </Typography>
          <Alert severity="success">
            <Typography variant="body2">
              {designDecisions.avoidControl.solution}
            </Typography>
          </Alert>
        </CardContent>
      </Card>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Teamwork
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mb: 1 }}
              >
                {designDecisions.teamwork.reference}
              </Typography>
              <Typography variant="body2">
                {designDecisions.teamwork.argument}
              </Typography>
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  {designDecisions.teamwork.application}
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Company-Wide Rewards
              </Typography>
              <Typography variant="body2">
                {designDecisions.companyWideRewards.concept}
              </Typography>
              <Alert severity="success" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  {designDecisions.companyWideRewards.application}
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Important Considerations
      </Typography>
      <Paper sx={{ p: 2, mb: 3, bgcolor: "action.hover" }}>
        <Box component="ul" sx={{ m: 0, pl: 2 }}>
          {designDecisions.importantConsiderations.map(
            (c: string, i: number) => (
              <li key={i}>
                <Typography variant="body2">{c}</Typography>
              </li>
            )
          )}
        </Box>
      </Paper>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Customization Features
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {designDecisions.customization.features.map(
              (f: string, i: number) => (
                <Chip key={i} label={f} size="small" variant="outlined" />
              )
            )}
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            UI Design Inspiration
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {designDecisions.uiDesignInspiration.idea}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {designDecisions.uiDesignInspiration.rationale}
          </Typography>
        </CardContent>
      </Card>
    </DocSection>
  )
}
