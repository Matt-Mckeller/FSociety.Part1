"use client"

import { Box, Card, Typography } from "@mui/material"

const priorityActions = [
  "Upgrade training materials and processes using AI; bring in light external help if needed",
  "Streamline training with AI: reviews, summaries, role-specific variants, quizzes",
  "Use targeted prompts to make documentation clear, concise, and optimized for learning",
  "Organize operations into pods (3–5 members) to improve support, speed, and accountability",
  "Refresh public image to attract/retain talent (modern site, authentic reviews, employee stories)",
]

export function PriorityActions() {
  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ pl: 2, m: 0 }}>
        {priorityActions.map((item, i) => (
          <Box
            key={i}
            sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
          >
            <Typography sx={{ color: "#4285f4", mr: 1, fontSize: "1.2rem" }}>
              ✓
            </Typography>
            <Typography variant="body1">{item}</Typography>
          </Box>
        ))}
      </Box>
    </Card>
  )
}
