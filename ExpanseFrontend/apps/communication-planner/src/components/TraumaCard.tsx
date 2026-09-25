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
import { Warning } from "@mui/icons-material"
import { TraumaEvent } from "@/types"

interface TraumaCardProps {
  traumaHistory: TraumaEvent[]
}

export function TraumaCard({ traumaHistory }: TraumaCardProps) {
  const sortedByImpact = [...traumaHistory].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2, unknown: 3 }
    return (order[a.impact] ?? 3) - (order[b.impact] ?? 3)
  })

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Warning sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" sx={{ color: "text.primary" }}>
            Emotional/Trauma History
          </Typography>
        </Box>

        <List dense>
          {sortedByImpact.map((event) => (
            <ListItem
              key={event.event}
              sx={{
                py: 0.5,
                borderLeft: 3,
                borderColor:
                  event.impact === "high"
                    ? "primary.dark"
                    : event.impact === "medium"
                      ? "primary.main"
                      : "primary.light",
                pl: 2,
                mb: 1,
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      sx={{ color: "text.primary" }}
                    >
                      {event.event}
                    </Typography>
                    <Chip
                      label={event.impact}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: "0.65rem",
                        bgcolor:
                          event.impact === "high"
                            ? "primary.dark"
                            : event.impact === "medium"
                              ? "primary.main"
                              : "primary.light",
                        color: "white",
                      }}
                    />
                  </Box>
                }
                secondary={event.details}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
