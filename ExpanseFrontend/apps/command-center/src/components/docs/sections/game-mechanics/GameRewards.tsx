/**
 * Game Rewards Section (Standalone)
 *
 * Displays the complete rewards system.
 */

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  Divider,
} from "@mui/material"
import { gameMechanics } from "../../../../data/docs"
import { DocSection } from "../../common"

export default function GameRewards() {
  const { rewards } = gameMechanics

  return (
    <DocSection title={`🎁 ${rewards.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {rewards.description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2" fontWeight={600}>
          Loot Boxes
        </Typography>
        <Typography variant="body2">{rewards.lootBoxes}</Typography>
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Reward Mediums
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {rewards.rewardMediums.map((medium: string, i: number) => (
                  <li key={i}>
                    <Typography variant="body2">{medium}</Typography>
                  </li>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Distribution Types
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {rewards.distributionTypes.map((type: string, i: number) => (
                  <Chip
                    key={i}
                    label={type}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom fontWeight={600}>
        Reward Categories
      </Typography>

      <Grid container spacing={2}>
        {Object.entries(rewards.rewardCategories).map(
          ([category, rewardList]) => (
            <Grid item xs={12} md={6} lg={4} key={category}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    gutterBottom
                    sx={{ textTransform: "capitalize" }}
                  >
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </Typography>
                  <Box component="ul" sx={{ m: 0, pl: 2, "& li": { mb: 0.5 } }}>
                    {(rewardList as string[]).slice(0, 5).map((reward, i) => (
                      <li key={i}>
                        <Typography variant="caption">{reward}</Typography>
                      </li>
                    ))}
                    {(rewardList as string[]).length > 5 && (
                      <Typography variant="caption" color="text.secondary">
                        +{(rewardList as string[]).length - 5} more
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom fontWeight={600}>
        Visual Stimulation
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {rewards.visualStimulation.map((stim: string, i: number) => (
          <Chip key={i} label={stim} variant="outlined" color="secondary" />
        ))}
      </Box>
    </DocSection>
  )
}
