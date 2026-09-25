/**
 * Personas Section
 *
 * User personas display.
 * Migrated from DocsView.tsx renderPersonas()
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
import { DocSection, DocGrid } from "../../common"
import { personas } from "../../../../data/docs"
import type { UserPersona } from "../../../../types/docs"

export default function Personas() {
  return (
    <DocSection title="User Personas" icon="🎭">
      <DocGrid columns={{ xs: 1, lg: 2 }} spacing={3}>
        {(personas as UserPersona[]).map((persona) => (
          <Card key={persona.id}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="h5" color="primary">
                    {persona.name}
                  </Typography>
                  <Chip label={persona.role} size="small" sx={{ mt: 0.5 }} />
                </Box>
                <Chip
                  label={`Tech: ${persona.techSavviness}`}
                  size="small"
                  variant="outlined"
                  color={
                    persona.techSavviness === "high" ? "success" : "warning"
                  }
                />
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                {persona.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography
                    variant="subtitle2"
                    color="success.main"
                    gutterBottom
                  >
                    🎯 Goals
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {persona.goals.map((goal: string, i: number) => (
                      <Typography component="li" key={i} variant="body2">
                        {goal}
                      </Typography>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    variant="subtitle2"
                    color="error.main"
                    gutterBottom
                  >
                    😫 Pain Points
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {persona.painPoints.map((pain: string, i: number) => (
                      <Typography component="li" key={i} variant="body2">
                        {pain}
                      </Typography>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    variant="subtitle2"
                    color="primary.main"
                    gutterBottom
                  >
                    💪 Motivations
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {persona.motivations.map((mot: string, i: number) => (
                      <Typography component="li" key={i} variant="body2">
                        {mot}
                      </Typography>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </DocGrid>
    </DocSection>
  )
}
