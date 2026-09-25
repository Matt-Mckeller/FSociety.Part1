"use client"

import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material"
import { Visibility } from "@mui/icons-material"
import { Observation } from "@/types"

interface ObservationsCardProps {
  observations: Observation[]
}

export function ObservationsCard({ observations }: ObservationsCardProps) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Visibility sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" sx={{ color: "text.primary" }}>
            Observed Behaviors
          </Typography>
        </Box>

        <List dense>
          {observations.map((obs, index) => (
            <ListItem
              key={index}
              sx={{
                py: 1,
                flexDirection: "column",
                alignItems: "flex-start",
                borderBottom: 1,
                borderColor: "divider",
                "&:last-child": { borderBottom: 0 },
              }}
            >
              <ListItemText
                primary={obs.observation}
                primaryTypographyProps={{
                  variant: "body2",
                  color: "text.primary",
                }}
              />
              {obs.tags && obs.tags.length > 0 && (
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}
                >
                  {obs.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{
                        height: 20,
                        fontSize: "0.65rem",
                        borderColor: "primary.main",
                        color: "primary.main",
                      }}
                    />
                  ))}
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
