/**
 * Game Currencies Section
 *
 * Displays in-game currency types, their purposes, and how they're earned/spent.
 */

import { Box, Typography, Grid, Card, CardContent, Chip } from "@mui/material"
import { gameMechanics } from "../../../../data/docs"
import { DocSection } from "../../common"

interface CurrencyType {
  name: string
  purpose: string
  earnedFrom?: string[]
  uses?: string[]
  notes?: string
}

export default function GameCurrencies() {
  const { currencies } = gameMechanics

  return (
    <DocSection title={`💰 ${currencies.title}`}>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {currencies.description}
      </Typography>

      <Grid container spacing={2}>
        {currencies.types.map((currency: CurrencyType, i: number) => (
          <Grid item xs={12} md={4} key={i}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {currency.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {currency.purpose}
                </Typography>
                {currency.earnedFrom && (
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Earned from:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        mt: 0.5,
                      }}
                    >
                      {currency.earnedFrom.map((source, j) => (
                        <Chip key={j} label={source} size="small" />
                      ))}
                    </Box>
                  </Box>
                )}
                {currency.uses && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Uses:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        mt: 0.5,
                      }}
                    >
                      {currency.uses.map((use, j) => (
                        <Chip
                          key={j}
                          label={use}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                )}
                {currency.notes && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, display: "block" }}
                  >
                    Note: {currency.notes}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DocSection>
  )
}
