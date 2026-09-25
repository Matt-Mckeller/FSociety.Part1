/**
 * Reward System Research Section
 *
 * Displays reward system research and key resources.
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
import { designNotes } from "../../../../data/docs"
import { DocSection } from "../../common"

interface RewardResource {
  title: string
  concept?: string
  scope?: string
  keyInsight?: string
  link?: string
}

export default function RewardResearch() {
  const { rewardSystemResearch } = designNotes

  return (
    <DocSection title={`🏆 ${rewardSystemResearch.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {rewardSystemResearch.overview.summary}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Key Resources
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {rewardSystemResearch.keyResources.map(
          (resource: RewardResource, i: number) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {resource.title}
                  </Typography>
                  {resource.concept && (
                    <Typography variant="body2">{resource.concept}</Typography>
                  )}
                  {resource.scope && (
                    <Typography variant="body2" color="text.secondary">
                      {resource.scope}
                    </Typography>
                  )}
                  {resource.keyInsight && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        {resource.keyInsight}
                      </Typography>
                    </Alert>
                  )}
                  {resource.link && (
                    <Typography
                      variant="caption"
                      color="primary"
                      display="block"
                      sx={{ mt: 1 }}
                    >
                      {resource.link}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            CARS Research
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {rewardSystemResearch.carsResearch.description}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Key Findings:
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            {rewardSystemResearch.carsResearch.findings.map(
              (f: string, i: number) => (
                <li key={i}>
                  <Typography variant="body2">{f}</Typography>
                </li>
              )
            )}
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Win-Win Philosophy
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {rewardSystemResearch.winWinPhilosophy.principle}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {rewardSystemResearch.winWinPhilosophy.clarification}
          </Typography>
          <Paper sx={{ p: 2, bgcolor: "action.hover" }}>
            <Typography variant="body2" fontStyle="italic">
              "{rewardSystemResearch.winWinPhilosophy.quote.text}"
            </Typography>
            <Typography variant="caption" color="text.secondary">
              — {rewardSystemResearch.winWinPhilosophy.quote.author}
            </Typography>
          </Paper>
        </CardContent>
      </Card>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Frequent Rewards
              </Typography>
              <Typography variant="body2">
                {rewardSystemResearch.frequentRewards.insight}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Approach Motivation
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {rewardSystemResearch.approachMotivation.definition}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {rewardSystemResearch.approachMotivation.mechanism}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Mood & Rewards
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            {rewardSystemResearch.moodAndRewards.insights.map(
              (insight: string, i: number) => (
                <li key={i}>
                  <Typography variant="body2">{insight}</Typography>
                </li>
              )
            )}
          </Box>
          {rewardSystemResearch.moodAndRewards.todo && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              <Typography variant="body2">
                TODO: {rewardSystemResearch.moodAndRewards.todo}
              </Typography>
            </Alert>
          )}
        </CardContent>
      </Card>
    </DocSection>
  )
}
