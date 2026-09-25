/**
 * AI Usage Section
 *
 * Displays AI development and product use cases.
 */

import { Box, Typography, Grid, Card, CardContent, Chip } from "@mui/material"
import { designNotes } from "../../../../data/docs"
import { DocSection } from "../../common"

interface AIUseCase {
  category: string
  uses: string[]
  reference?: string
}

export default function AIUsage() {
  const { aiUsage } = designNotes

  return (
    <DocSection title={`🤖 ${aiUsage.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {aiUsage.overview.summary}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Development Use Cases
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {aiUsage.developmentUseCases.map((useCase: AIUseCase, i: number) => (
          <Grid item xs={12} md={6} key={i}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {useCase.category}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {useCase.uses.map((use: string, j: number) => (
                    <Chip
                      key={j}
                      label={use}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
                {useCase.reference && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    sx={{ mt: 1 }}
                  >
                    {useCase.reference}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" gutterBottom>
        Product Use Cases
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {aiUsage.productUseCases.map((useCase: AIUseCase, i: number) => (
          <Grid item xs={12} md={6} key={i}>
            <Card sx={{ height: "100%", bgcolor: "success.dark" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {useCase.category}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {useCase.uses.map((use: string, j: number) => (
                    <Chip key={j} label={use} size="small" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" gutterBottom>
        Potential Future Uses
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {aiUsage.potentialFutureUses.map((use: string, i: number) => (
          <Chip key={i} label={use} variant="outlined" />
        ))}
      </Box>
    </DocSection>
  )
}
