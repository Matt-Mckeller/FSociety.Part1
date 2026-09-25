/**
 * Gamification Section
 *
 * Gamification strategy and platform research.
 * Migrated from DocsView.tsx renderGamification()
 */

import {
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Divider,
  Grid,
} from "@mui/material"
import { DocSection } from "../../common"
import { businessOperations } from "../../../../data/docs"

export default function Gamification() {
  return (
    <DocSection title="Gamification Strategy" icon="🎮">
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {businessOperations.gamification.overview}
      </Typography>

      <Typography variant="h5" gutterBottom>
        🎯 Gamification Elements
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
        {businessOperations.gamification.elements.map((el, i) => (
          <Chip key={i} label={el} color="primary" variant="outlined" />
        ))}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📊 Gaming Trends
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Weekly Gaming Time:</strong>{" "}
                {businessOperations.gamification.gamingTrends.weeklyGamingTime}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Trend:</strong>{" "}
                {businessOperations.gamification.gamingTrends.trend}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Source: {businessOperations.gamification.gamingTrends.source}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                💡 Microsoft Example
              </Typography>
              <Typography variant="body2">
                {businessOperations.gamification.microsoftExample}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        🎯 Game Platforms
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
        {businessOperations.gamification.platformResearch.map((p, i) => (
          <Chip key={i} label={p} variant="outlined" />
        ))}
      </Box>

      <Typography variant="h5" gutterBottom>
        🎲 Game Genres
      </Typography>
      <Grid container spacing={1}>
        {businessOperations.gamification.genreTypes.map((genre, i) => (
          <Grid item xs={6} sm={4} md={3} key={i}>
            <Card variant="outlined">
              <CardContent sx={{ py: 1, textAlign: "center" }}>
                <Typography variant="body2">{genre}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DocSection>
  )
}
