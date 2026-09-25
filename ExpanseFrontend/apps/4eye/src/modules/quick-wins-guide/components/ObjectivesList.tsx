"use client"

import { Box, Card, Icon, Typography } from "@mui/material"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
import BoltIcon from "@mui/icons-material/Bolt"

const objectives = [
  {
    icon: <TrendingUpIcon />,
    text: "Improve operations, culture, learning, and employee motivation",
  },
  {
    icon: <SmartToyIcon />,
    text: "Use AI to accelerate training, documentation, and support",
  },
  {
    icon: <TrackChangesIcon />,
    text: "Address non-software drivers of performance (process, communication, norms)",
  },
  {
    icon: <BoltIcon />,
    text: "Prioritize highest-value, quickest wins",
  },
]

export function ObjectivesList() {
  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ pl: 2, m: 0 }}>
        {objectives.map((item, i) => (
          <Box
            key={i}
            sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
          >
            <Box
              sx={{
                mr: 1.5,
                color: "#4285f4",
                fontSize: "1.75rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              {item.icon}
            </Box>
            <Typography variant="body1" sx={{ lineHeight: 1.75 }}>
              {item.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  )
}
