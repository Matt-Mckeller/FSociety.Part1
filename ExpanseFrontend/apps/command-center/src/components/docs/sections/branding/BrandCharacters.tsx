/**
 * Brand Characters Section
 *
 * Displays character and brand relatability strategy.
 */

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Paper,
} from "@mui/material"
import { expanseEduDocs } from "../../../../data/docs"
import { DocSection, DocAccordion } from "../../common"

interface CharacterExample {
  brand: string
  character: string
  lesson: string
}

export default function BrandCharacters() {
  const branding = (expanseEduDocs as any).branding

  if (!branding?.characterStrategy) {
    return (
      <DocSection title="🎭 Character Strategy">
        <Typography variant="body1" color="text.secondary">
          Character strategy data not available.
        </Typography>
      </DocSection>
    )
  }

  return (
    <DocSection title="🎭 Character Strategy">
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Character and brand relatability strategy.
      </Typography>

      <Paper
        sx={{
          p: 3,
          mb: 3,
          bgcolor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Typography variant="body1" fontSize="1.1rem">
          "{branding.characterStrategy.overview}"
        </Typography>
      </Paper>

      <DocAccordion title="🎮 Examples" defaultExpanded>
        <Grid container spacing={2}>
          {branding.characterStrategy.examples?.map(
            (example: CharacterExample, i: number) => (
              <Grid item xs={12} md={6} key={i}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600}>
                      {example.brand} - {example.character}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {example.lesson}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ),
          )}
        </Grid>
      </DocAccordion>

      <DocAccordion title="✅ Application to Expanse" defaultExpanded>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {branding.characterStrategy.applicationToExpanse?.map(
            (app: string, i: number) => (
              <Chip key={i} label={app} color="success" />
            ),
          )}
        </Box>
      </DocAccordion>
    </DocSection>
  )
}
