/**
 * Game Games Section
 *
 * Displays mini-games and future game types.
 */

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
} from "@mui/material"
import { gameMechanics } from "../../../../data/docs"
import { DocSection } from "../../common"

interface GameType {
  type: string
  description: string
  status: string
}

export default function GameGames() {
  const { games } = gameMechanics

  return (
    <DocSection title={`🎮 ${games.title}`}>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {games.description}
      </Typography>

      <Chip label={games.status} color="warning" sx={{ mb: 3 }} />

      <Typography variant="h6" gutterBottom fontWeight={600}>
        Game Types
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {games.gameTypes.map((game: GameType, i: number) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  {game.type}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {game.description}
                </Typography>
                <Chip label={game.status} size="small" variant="outlined" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        Future Vision
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            {games.futureVision.map((vision: string, i: number) => (
              <li key={i}>
                <Typography variant="body2">{vision}</Typography>
              </li>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Alert severity="info">
        <Typography variant="body2">
          <strong>Value:</strong> {games.value}
        </Typography>
      </Alert>
    </DocSection>
  )
}
