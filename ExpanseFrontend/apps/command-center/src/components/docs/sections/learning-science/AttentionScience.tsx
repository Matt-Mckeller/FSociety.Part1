/**
 * Attention Science Section
 *
 * Displays attention science research and practical takeaways.
 */

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Alert,
  Paper,
} from "@mui/material"
import { learningScience } from "../../../../data/docs"
import { DocSection } from "../../common"

interface AttentionFactor {
  factor: string
  effect: string
}

interface AttentionPrinciple {
  principle: string
  description: string
}

interface AttentionTechnique {
  technique: string
  description: string
}

export default function AttentionScience() {
  const { attentionScience } = learningScience

  return (
    <DocSection title={`🧠 ${attentionScience.title}`}>
      <Paper
        sx={{
          p: 3,
          mb: 3,
          bgcolor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Key Insight
        </Typography>
        <Typography variant="body1">
          {attentionScience.overview.keyInsight}
        </Typography>
      </Paper>

      <Typography variant="body1" sx={{ mb: 3 }}>
        {attentionScience.overview.summary}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {attentionScience.resourcePoolModel.title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {attentionScience.resourcePoolModel.description}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{ height: "100%", borderLeft: 4, borderColor: "error.main" }}
          >
            <CardContent>
              <Typography variant="h6" color="error.main" gutterBottom>
                ⚠️ {attentionScience.resourcePoolModel.depleting.title}
              </Typography>
              {(
                attentionScience.resourcePoolModel.depleting
                  .factors as AttentionFactor[]
              ).map((f, i) => (
                <Box key={i} sx={{ mb: 1 }}>
                  <Typography variant="subtitle2">{f.factor}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {f.effect}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{ height: "100%", borderLeft: 4, borderColor: "success.main" }}
          >
            <CardContent>
              <Typography variant="h6" color="success.main" gutterBottom>
                ✨ {attentionScience.resourcePoolModel.replenishing.title}
              </Typography>
              {(
                attentionScience.resourcePoolModel.replenishing
                  .factors as AttentionFactor[]
              ).map((f, i) => (
                <Box key={i} sx={{ mb: 1 }}>
                  <Typography variant="subtitle2">{f.factor}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {f.effect}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom>
        {attentionScience.moodConnection.title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {attentionScience.moodConnection.description}
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {(
          attentionScience.moodConnection.principles as AttentionPrinciple[]
        ).map((p, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {p.principle}
                </Typography>
                <Typography variant="body2">{p.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom>
        {attentionScience.learningConnection.title}
      </Typography>
      <Paper sx={{ p: 2, mb: 2, bgcolor: "action.hover" }}>
        <Typography variant="body1" fontStyle="italic">
          "{attentionScience.learningConnection.keyFinding}"
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Source: {attentionScience.learningConnection.source}
        </Typography>
      </Paper>
      <Typography variant="h6" gutterBottom>
        Implications
      </Typography>
      <Box component="ul" sx={{ m: 0, pl: 3, mb: 2 }}>
        {attentionScience.learningConnection.implications.map(
          (imp: string, i: number) => (
            <li key={i}>
              <Typography variant="body2">{imp}</Typography>
            </li>
          ),
        )}
      </Box>
      <Alert severity="success" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Expanse Application:</strong>{" "}
          {attentionScience.learningConnection.expanseApplication}
        </Typography>
      </Alert>

      <Typography variant="h5" gutterBottom>
        {attentionScience.practicalTakeaways.title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {attentionScience.practicalTakeaways.description}
      </Typography>
      <Grid container spacing={2}>
        {(
          attentionScience.practicalTakeaways.techniques as AttentionTechnique[]
        ).map((t, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  {t.technique}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DocSection>
  )
}
