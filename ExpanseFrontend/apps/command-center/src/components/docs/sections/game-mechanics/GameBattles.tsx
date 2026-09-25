/**
 * Game Battles Section
 *
 * Displays battle system, combat mechanics, and tournament details.
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

interface BattleType {
  type: string
  description: string
  optional?: boolean
  default?: boolean
  basis?: string
}

export default function GameBattles() {
  const { battles } = gameMechanics

  return (
    <DocSection title={`⚔️ ${battles.title}`}>
      <Alert severity="info" sx={{ mb: 2 }}>
        <Typography variant="body2" fontStyle="italic">
          "{battles.philosophy}"
        </Typography>
      </Alert>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {battles.vision}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Battle Types
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {battles.battleTypes.map((bt: BattleType, i: number) => (
          <Grid item xs={12} sm={6} key={i}>
            <Card>
              <CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    {bt.type}
                  </Typography>
                  {bt.optional && (
                    <Chip label="Optional" size="small" color="info" />
                  )}
                  {bt.default && (
                    <Chip label="Default" size="small" color="success" />
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {bt.description}
                </Typography>
                {bt.basis && (
                  <Typography
                    variant="caption"
                    color="primary"
                    sx={{ mt: 1, display: "block" }}
                  >
                    Basis: {bt.basis}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Combat Mechanics
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" fontWeight={600}>
                DPS (Damage Per Second)
              </Typography>
              <Typography variant="body2">
                {battles.combatMechanics.dps}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" fontWeight={600}>
                AI Combat
              </Typography>
              <Typography variant="body2">
                {battles.combatMechanics.aiCombat}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" fontWeight={600}>
                Combat Factors
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
                {battles.combatMechanics.factors.map(
                  (factor: string, i: number) => (
                    <Chip key={i} label={factor} size="small" />
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" fontWeight={600}>
                Power-Ups & Replays
              </Typography>
              <Typography variant="body2">
                {battles.combatMechanics.powerUps}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {battles.combatMechanics.replays}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Timing Options
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {battles.timing.map((time: string, i: number) => (
          <Chip key={i} label={time} variant="outlined" />
        ))}
      </Box>

      <Typography variant="h6" gutterBottom>
        Tournaments
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="body2">
            {battles.tournaments.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Format: {battles.tournaments.format}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>
        Mental Health Considerations
      </Typography>
      <Box component="ul" sx={{ m: 0, pl: 2, mb: 3 }}>
        {battles.mentalHealthConsiderations.map(
          (consideration: string, i: number) => (
            <li key={i}>
              <Typography variant="body2" color="success.main">
                {consideration}
              </Typography>
            </li>
          )
        )}
      </Box>

      <Typography variant="h6" gutterBottom>
        Risks
      </Typography>
      <Box component="ul" sx={{ m: 0, pl: 2 }}>
        {battles.risks.map((risk: string, i: number) => (
          <li key={i}>
            <Typography variant="body2" color="warning.main">
              {risk}
            </Typography>
          </li>
        ))}
      </Box>
    </DocSection>
  )
}
