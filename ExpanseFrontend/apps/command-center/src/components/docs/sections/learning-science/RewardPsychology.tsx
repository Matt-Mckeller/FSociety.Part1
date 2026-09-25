/**
 * Reward Psychology Section
 *
 * Displays reward psychology and habit formation research.
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
  Divider,
} from "@mui/material"
import { learningScience } from "../../../../data/docs"
import { DocSection } from "../../common"

interface HabitExample {
  habit: string
  reward: string
  outcome: string
}

export default function RewardPsychology() {
  const { rewardPsychology } = learningScience

  return (
    <DocSection title={`🎁 ${rewardPsychology.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {rewardPsychology.overview.summary}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {rewardPsychology.brainAndRewards.title}
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {rewardPsychology.brainAndRewards.description}
          </Typography>
          <Alert severity="info">
            <Typography variant="body2">
              {rewardPsychology.brainAndRewards.insight}
            </Typography>
          </Alert>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom>
        {rewardPsychology.habitFormation.title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {rewardPsychology.habitFormation.description}
      </Typography>
      <Paper sx={{ p: 3, mb: 3, bgcolor: "action.hover" }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" color="primary">
              Step 1
            </Typography>
            <Typography variant="body2">
              {rewardPsychology.habitFormation.technique.step1}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" color="primary">
              Step 2
            </Typography>
            <Typography variant="body2">
              {rewardPsychology.habitFormation.technique.step2}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" color="primary">
              Step 3
            </Typography>
            <Typography variant="body2">
              {rewardPsychology.habitFormation.technique.step3}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" color="primary">
              Step 4
            </Typography>
            <Typography variant="body2">
              {rewardPsychology.habitFormation.technique.step4}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Alert severity="success">
          <Typography variant="body2">
            <strong>Result:</strong>{" "}
            {rewardPsychology.habitFormation.technique.result}
          </Typography>
        </Alert>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Practical Examples
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {(rewardPsychology.practicalExamples as HabitExample[]).map((ex, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  🎯 {ex.habit}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Reward:</strong> {ex.reward}
                </Typography>
                <Typography variant="body2" color="success.main">
                  {ex.outcome}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom>
        {rewardPsychology.expanseApproach.title}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {rewardPsychology.expanseApproach.methods.map(
          (m: string, i: number) => (
            <Chip key={i} label={m} color="primary" />
          ),
        )}
      </Box>
    </DocSection>
  )
}
