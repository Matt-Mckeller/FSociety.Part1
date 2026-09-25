/**
 * Reward System Examples Section
 *
 * Displays companies and games to study for reward systems.
 */

import { Box, Typography, Card, CardContent, Chip, Alert } from "@mui/material"
import { designNotes } from "../../../../data/docs"
import { DocSection } from "../../common"

export default function RewardExamples() {
  const { rewardSystemExamples } = designNotes

  return (
    <DocSection title={`🎯 ${rewardSystemExamples.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {rewardSystemExamples.description}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Companies to Study
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {rewardSystemExamples.companies.map((company: string, i: number) => (
          <Chip key={i} label={company} color="primary" />
        ))}
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Games Study
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {rewardSystemExamples.gamesStudy.description}
          </Typography>
          <Alert severity="info">
            <Typography variant="body2">
              {rewardSystemExamples.gamesStudy.insight}
            </Typography>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {rewardSystemExamples.unlearningConcept.title}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mb: 1 }}
          >
            Source: {rewardSystemExamples.unlearningConcept.source}
          </Typography>
          <Typography variant="body2">
            {rewardSystemExamples.unlearningConcept.relevance}
          </Typography>
        </CardContent>
      </Card>
    </DocSection>
  )
}
