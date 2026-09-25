/**
 * Funding Rounds Section
 *
 * Funding rounds detail and asking range.
 * Migrated from DocsView.tsx renderFundingRoundsDetail()
 */

import {
  Typography,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Box,
} from "@mui/material"
import { DocSection } from "../../common"
import { businessOperations } from "../../../../data/docs"
import type { FundingRound } from "../../../../types/docs"

export default function FundingRounds() {
  return (
    <DocSection title="Funding Rounds" icon="💵">
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {businessOperations.fundingRounds.philosophy}
      </Typography>

      <Grid container spacing={2}>
        {businessOperations.fundingRounds.rounds.map((round: FundingRound) => (
          <Grid item xs={12} md={6} key={round.id}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {round.name}
                </Typography>
                {round.range && (
                  <Chip label={round.range} color="primary" sx={{ mb: 2 }} />
                )}
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Goal:</strong> {round.goal}
                </Typography>
                {round.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {round.description}
                  </Typography>
                )}
                {round.milestones && (
                  <>
                    <Typography variant="subtitle2" gutterBottom>
                      Milestones:
                    </Typography>
                    <Box
                      sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}
                    >
                      {round.milestones.map((m, i) => (
                        <Chip
                          key={i}
                          label={m}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </>
                )}
                {round.team && (
                  <>
                    <Typography variant="subtitle2" gutterBottom>
                      Team:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {Array.isArray(round.team)
                        ? round.team.join(", ")
                        : round.team}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Card sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            💰 Asking Range
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="body2">Minimum</Typography>
              <Typography variant="h5">
                {businessOperations.fundingRounds.askingRange.minimum}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">Ideal</Typography>
              <Typography variant="h5">
                {businessOperations.fundingRounds.askingRange.ideal}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">Stretch</Typography>
              <Typography variant="h5">
                {businessOperations.fundingRounds.askingRange.stretch}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {businessOperations.fundingRounds.askingRange.note}
          </Typography>
        </CardContent>
      </Card>
    </DocSection>
  )
}
