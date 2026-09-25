/**
 * GTM Branding Section
 *
 * Branding and themes.
 * Migrated from DocsView.tsx renderGTMBranding()
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
import { goToMarket } from "../../../../data/docs"

export default function GTMBranding() {
  return (
    <DocSection title="Branding & Themes" icon="🎨">
      <Typography variant="h5" gutterBottom>
        Primary Themes
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
        {goToMarket.branding.primaryThemes.map((t, i) => (
          <Chip key={i} label={t} color="primary" />
        ))}
      </Box>

      <Typography variant="h5" gutterBottom>
        🎮 Game Themes
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
        {goToMarket.branding.gameThemes.map((t, i) => (
          <Chip key={i} label={t} variant="outlined" />
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        📚 Marketing Topics
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Primary
              </Typography>
              {goToMarket.marketingTopics.primary.map((t, i) => (
                <Chip key={i} label={t} size="small" sx={{ m: 0.25 }} />
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Psychology
              </Typography>
              {goToMarket.marketingTopics.psychology.map((t, i) => (
                <Chip
                  key={i}
                  label={t}
                  size="small"
                  variant="outlined"
                  sx={{ m: 0.25 }}
                />
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Classroom
              </Typography>
              {goToMarket.marketingTopics.classroom.map((t, i) => (
                <Chip
                  key={i}
                  label={t}
                  size="small"
                  color="secondary"
                  sx={{ m: 0.25 }}
                />
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DocSection>
  )
}
