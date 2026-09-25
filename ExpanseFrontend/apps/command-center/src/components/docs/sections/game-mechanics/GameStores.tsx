/**
 * Game Stores Section
 *
 * Displays store types and reward systems.
 */

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
} from "@mui/material"
import { gameMechanics } from "../../../../data/docs"
import { DocSection } from "../../common"

interface StoreType {
  type: string
  owner: string
}

export default function GameStores() {
  const { stores, rewards } = gameMechanics

  return (
    <DocSection title={`🏪 ${stores.title}`}>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {stores.description}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Store Types
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stores.storeTypes.map((store: StoreType, i: number) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ textAlign: "center" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  {store.type}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Owner: {store.owner}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Rewards System
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {rewards.description}
      </Typography>
      <Typography variant="body2" color="primary" sx={{ mb: 2 }}>
        Loot Boxes: {rewards.lootBoxes}
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Reward Mediums
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {rewards.rewardMediums.map((medium: string, i: number) => (
                  <Chip key={i} label={medium} size="small" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Distribution Types
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {rewards.distributionTypes.map((type: string, i: number) => (
                  <Chip key={i} label={type} size="small" variant="outlined" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Reward Categories
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(rewards.rewardCategories)
          .slice(0, 6)
          .map(([category, items]) => (
            <Grid item xs={12} sm={6} md={4} key={category}>
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
                  <Box
                    component="ul"
                    sx={{ m: 0, pl: 2, maxHeight: 150, overflow: "auto" }}
                  >
                    {(items as string[]).slice(0, 5).map((item, i) => (
                      <li key={i}>
                        <Typography variant="caption">{item}</Typography>
                      </li>
                    ))}
                    {(items as string[]).length > 5 && (
                      <Typography variant="caption" color="text.secondary">
                        +{(items as string[]).length - 5} more
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      {stores.ideas.length > 0 && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>
            Ideas
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            {stores.ideas.map((idea: string, i: number) => (
              <li key={i}>
                <Typography variant="body2">{idea}</Typography>
              </li>
            ))}
          </Box>
        </>
      )}
    </DocSection>
  )
}
