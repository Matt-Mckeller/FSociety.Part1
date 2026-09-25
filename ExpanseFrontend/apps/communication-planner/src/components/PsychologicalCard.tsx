"use client"

import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from "@mui/material"
import { ExpandMore, Psychology } from "@mui/icons-material"
import { PsychologicalProfile } from "@/types"

interface PsychologicalCardProps {
  profile: PsychologicalProfile
}

const levelToProgress = (level: "high" | "medium" | "low"): number => {
  switch (level) {
    case "high":
      return 85
    case "medium":
      return 50
    case "low":
      return 25
    default:
      return 50
  }
}

export function PsychologicalCard({ profile }: PsychologicalCardProps) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Psychology sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" sx={{ color: "text.primary" }}>
            Psychological Profile
          </Typography>
        </Box>

        {/* Mental State */}
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Mental State
        </Typography>
        {profile.mentalState.map((state) => (
          <Box key={state.factor} sx={{ mb: 1.5 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
            >
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                {state.factor}
              </Typography>
              <Chip
                label={state.level}
                size="small"
                sx={{
                  height: 20,
                  fontSize: "0.7rem",
                  bgcolor:
                    state.level === "high"
                      ? "primary.dark"
                      : state.level === "medium"
                        ? "primary.main"
                        : "primary.light",
                  color: "white",
                }}
              />
            </Box>
            <LinearProgress
              variant="determinate"
              value={levelToProgress(state.level)}
              sx={{
                height: 6,
                borderRadius: 1,
                bgcolor: "grey.200",
                "& .MuiLinearProgress-bar": {
                  bgcolor:
                    state.level === "high"
                      ? "primary.dark"
                      : state.level === "medium"
                        ? "primary.main"
                        : "primary.light",
                },
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {state.description}
            </Typography>
          </Box>
        ))}

        {/* Defense Patterns */}
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ mt: 2, mb: 1 }}
        >
          Defense Patterns
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {profile.defensePatterns.map((pattern) => (
            <Chip
              key={pattern}
              label={pattern}
              size="small"
              variant="outlined"
              sx={{ borderColor: "primary.main", color: "primary.main" }}
            />
          ))}
        </Box>

        {/* Expandable sections */}
        <Accordion sx={{ mt: 2, bgcolor: "transparent", boxShadow: 0 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2">Cognitive Style</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              <ListItem>
                <ListItemText
                  primary="Strengths"
                  secondary={profile.cognitiveStyle.strengths.join(", ")}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Processing"
                  secondary={profile.cognitiveStyle.processing}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Memory"
                  secondary={profile.cognitiveStyle.memory}
                />
              </ListItem>
              {profile.cognitiveStyle.possibleConditions.length > 0 && (
                <ListItem>
                  <ListItemText
                    primary="Possible Conditions"
                    secondary={profile.cognitiveStyle.possibleConditions.join(
                      ", ",
                    )}
                  />
                </ListItem>
              )}
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ bgcolor: "transparent", boxShadow: 0 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2">
              Communication Preferences
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Responds well to:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
              {profile.communicationPreferences.respondsWellTo.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  size="small"
                  sx={{ bgcolor: "primary.main", color: "white" }}
                />
              ))}
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Struggles with:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
              {profile.communicationPreferences.strugglesWith.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  size="small"
                  sx={{ bgcolor: "primary.light", color: "white" }}
                />
              ))}
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Optimal format:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {profile.communicationPreferences.optimalFormat.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: "primary.main", color: "primary.main" }}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  )
}
