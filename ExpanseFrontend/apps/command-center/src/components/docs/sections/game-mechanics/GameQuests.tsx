/**
 * Game Quests Section
 *
 * Displays quests and achievements systems.
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
  Tooltip,
} from "@mui/material"
import { gameMechanics } from "../../../../data/docs"
import { DocSection } from "../../common"

interface QuestType {
  type: string
  description: string
}

export default function GameQuests() {
  const { quests, achievements } = gameMechanics

  return (
    <DocSection title="🎯 Quests & Achievements">
      {/* Quests Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        {quests.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        {quests.description}
      </Typography>

      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Purposes
      </Typography>
      <Grid container spacing={1} sx={{ mb: 3 }}>
        {quests.purposes.map((purpose: string, i: number) => (
          <Grid item xs={12} sm={6} key={i}>
            <Card sx={{ bgcolor: "action.hover" }}>
              <CardContent sx={{ py: 1 }}>
                <Typography variant="body2">• {purpose}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Quest Types
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {quests.questTypes.map((qt: QuestType, i: number) => (
          <Tooltip key={i} title={qt.description}>
            <Chip label={qt.type} />
          </Tooltip>
        ))}
      </Box>

      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Example Quests
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {Object.entries(quests.exampleQuests).map(([group, questList]) => (
          <Grid item xs={12} md={4} key={group}>
            <Card>
              <CardContent>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  gutterBottom
                  sx={{ textTransform: "capitalize" }}
                >
                  {group}
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2 }}>
                  {(questList as string[]).map((quest, i) => (
                    <li key={i}>
                      <Typography variant="body2">{quest}</Typography>
                    </li>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Achievements Section */}
      <Typography variant="h5" gutterBottom>
        🏆 {achievements.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        {achievements.description}
      </Typography>

      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Example Achievements
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        {achievements.examples.map((example: string, i: number) => (
          <Chip key={i} label={example} size="small" variant="outlined" />
        ))}
      </Box>

      <Alert severity="success">
        <Typography variant="body2">{achievements.value}</Typography>
      </Alert>
    </DocSection>
  )
}
