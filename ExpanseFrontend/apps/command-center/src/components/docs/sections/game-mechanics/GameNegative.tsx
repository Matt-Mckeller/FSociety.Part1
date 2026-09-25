/**
 * Game Negative Reinforcement Section
 *
 * Displays consequences and negative reinforcement systems.
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

interface ConsequenceType {
  type: string
  description: string
  severity: string
}

export default function GameNegative() {
  const { negativeReinforcement } = gameMechanics

  return (
    <DocSection title={`⚖️ ${negativeReinforcement.title}`}>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {negativeReinforcement.description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Philosophy:</strong> {negativeReinforcement.philosophy}
        </Typography>
      </Alert>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        Consequence Types
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {negativeReinforcement.consequenceTypes.map(
          (cons: ConsequenceType, i: number) => (
            <Grid item xs={12} md={6} lg={4} key={i}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={600}>
                      {cons.type}
                    </Typography>
                    <Chip
                      label={cons.severity}
                      size="small"
                      color={
                        cons.severity === "High"
                          ? "error"
                          : cons.severity === "Medium"
                            ? "warning"
                            : "success"
                      }
                    />
                  </Box>
                  <Typography variant="body2">{cons.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        Implementation Guidelines
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            {negativeReinforcement.implementation.map(
              (item: string, i: number) => (
                <li key={i}>
                  <Typography variant="body2">{item}</Typography>
                </li>
              )
            )}
          </Box>
        </CardContent>
      </Card>

      <Alert severity="warning">
        <Typography variant="body2" fontWeight={600}>
          Risks to Consider
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2, mt: 1 }}>
          {negativeReinforcement.risks.map((risk: string, i: number) => (
            <li key={i}>
              <Typography variant="body2">{risk}</Typography>
            </li>
          ))}
        </Box>
      </Alert>
    </DocSection>
  )
}
