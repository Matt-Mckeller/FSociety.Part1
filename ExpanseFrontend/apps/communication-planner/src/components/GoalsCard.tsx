"use client"

import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
} from "@mui/material"
import {
  Flag,
  CheckCircleOutline,
  RadioButtonUnchecked,
} from "@mui/icons-material"
import { Goal, Artifact } from "@/types"

interface GoalsCardProps {
  goals: Goal[]
  artifacts: Artifact[]
}

export function GoalsCard({ goals, artifacts }: GoalsCardProps) {
  const primaryGoals = goals
    .filter((g) => g.priority === "primary")
    .sort((a, b) => a.order - b.order)
  const secondaryGoals = goals
    .filter((g) => g.priority === "secondary")
    .sort((a, b) => a.order - b.order)

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Flag sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" sx={{ color: "text.primary" }}>
            Communication Goals
          </Typography>
        </Box>

        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Primary Goals
        </Typography>
        <List dense>
          {primaryGoals.map((goal) => (
            <ListItem key={goal.id} sx={{ py: 0 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Chip
                  label={goal.order}
                  size="small"
                  sx={{
                    width: 24,
                    height: 24,
                    fontSize: "0.75rem",
                    bgcolor: "primary.main",
                    color: "white",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={goal.title}
                secondary={goal.description}
                primaryTypographyProps={{
                  fontWeight: 500,
                  color: "text.primary",
                }}
              />
            </ListItem>
          ))}
        </List>

        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ mt: 2, mb: 1 }}
        >
          Secondary Goals
        </Typography>
        <List dense>
          {secondaryGoals.map((goal) => (
            <ListItem key={goal.id} sx={{ py: 0 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Chip
                  label={goal.order}
                  size="small"
                  variant="outlined"
                  sx={{
                    width: 24,
                    height: 24,
                    fontSize: "0.75rem",
                    borderColor: "primary.main",
                    color: "primary.main",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={goal.title} secondary={goal.description} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Desired Artifacts
        </Typography>
        <List dense>
          {artifacts.map((artifact) => (
            <ListItem key={artifact.id} sx={{ py: 0 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                {artifact.completed ? (
                  <CheckCircleOutline
                    sx={{ color: "primary.main" }}
                    fontSize="small"
                  />
                ) : (
                  <RadioButtonUnchecked
                    sx={{ color: "grey.400" }}
                    fontSize="small"
                  />
                )}
              </ListItemIcon>
              <ListItemText
                primary={artifact.title}
                sx={{
                  textDecoration: artifact.completed ? "line-through" : "none",
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
