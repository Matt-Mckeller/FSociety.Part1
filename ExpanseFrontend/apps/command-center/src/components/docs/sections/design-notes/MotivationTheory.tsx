/**
 * Motivation Theory Section
 *
 * Displays intrinsic vs extrinsic motivation research.
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

export default function MotivationTheory() {
  const { motivationTheory } = designNotes

  return (
    <DocSection title={`💡 ${motivationTheory.title}`}>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", bgcolor: "success.dark" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Intrinsic Motivation
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {motivationTheory.intrinsicMotivation.description}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Three Elements:
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2, mb: 2 }}>
                <li>
                  <Typography variant="body2">
                    <strong>Autonomy:</strong>{" "}
                    {motivationTheory.intrinsicMotivation.threeElements.autonomy}
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    <strong>Purpose:</strong>{" "}
                    {motivationTheory.intrinsicMotivation.threeElements.purpose}
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    <strong>Mastery:</strong>{" "}
                    {motivationTheory.intrinsicMotivation.threeElements.mastery}
                  </Typography>
                </li>
              </Box>
              <Typography variant="subtitle2" gutterBottom>
                Benefits:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                {motivationTheory.intrinsicMotivation.benefits.map(
                  (b: string, i: number) => (
                    <Chip key={i} label={b} size="small" />
                  )
                )}
              </Box>
              <Paper sx={{ p: 2, bgcolor: "background.paper" }}>
                <Typography variant="body2" fontStyle="italic">
                  "{motivationTheory.intrinsicMotivation.quote.text}"
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  — {motivationTheory.intrinsicMotivation.quote.author}
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", bgcolor: "warning.dark" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Extrinsic Motivation
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {motivationTheory.extrinsicMotivation.description}
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  {motivationTheory.extrinsicMotivation.nuance}
                </Typography>
              </Alert>
              <Paper sx={{ p: 2, bgcolor: "background.paper" }}>
                <Typography variant="body2" fontStyle="italic">
                  "{motivationTheory.extrinsicMotivation.quote.text}"
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  — {motivationTheory.extrinsicMotivation.quote.author}
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Competence-Based Rewards
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {motivationTheory.competenceBasedRewards.description}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Research:</strong>{" "}
            {motivationTheory.competenceBasedRewards.research}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mb: 1 }}
          >
            Researcher: {motivationTheory.competenceBasedRewards.researcher}
          </Typography>
          <Alert severity="success">
            <Typography variant="body2">
              {motivationTheory.competenceBasedRewards.connection}
            </Typography>
          </Alert>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Money & Ambition
          </Typography>
          <Paper sx={{ p: 2, bgcolor: "action.hover", mb: 2 }}>
            <Typography variant="body2" fontStyle="italic">
              "{motivationTheory.moneyAndAmbition.quote.text}"
            </Typography>
            <Typography variant="caption" color="text.secondary">
              — {motivationTheory.moneyAndAmbition.quote.author}
            </Typography>
          </Paper>
          <Typography variant="body2">
            {motivationTheory.moneyAndAmbition.insight}
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Goals & Setting
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {motivationTheory.goalsAndSetting.insight}
          </Typography>
          <Alert severity="info" sx={{ mb: 1 }}>
            <Typography variant="body2">
              {motivationTheory.goalsAndSetting.alternatives}
            </Typography>
          </Alert>
          <Typography variant="caption" color="text.secondary">
            Source: {motivationTheory.goalsAndSetting.source}
          </Typography>
        </CardContent>
      </Card>
    </DocSection>
  )
}
