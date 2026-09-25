"use client"

import { Box, Grid, Card, CardContent, Chip, Typography } from "@mui/material"
import { Section } from "./Section"
import { implementationItems } from "../data"

export function ImplementationSection() {
  return (
    <Section id="implementation" title="Implementation Plan">
      <Typography variant="body2" sx={{ mb: 2, color: "#555" }}>
        Prioritized actions with estimated complexity points
      </Typography>
      <Grid container spacing={2}>
        {implementationItems.map((item, i) => (
          <Grid item zero={12} laptop={6} key={i}>
            <Card
              sx={{ height: "100%", borderLeft: "4px solid #4285f4" }}
            >
              <CardContent>
                <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                  <Chip
                    label={`#${item.priority}`}
                    size="small"
                    sx={{ bgcolor: "#4285f4", color: "white" }}
                  />
                  {item.complexity && (
                    <Chip
                      label={`${item.complexity} pt${item.complexity > 1 ? "s" : ""}`}
                      size="small"
                      sx={{
                        bgcolor: "#E3F2FD",
                        color: "#1976D2",
                        fontWeight: 600,
                      }}
                    />
                  )}
                </Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, mb: 0.5 }}
                >
                  {item.task}
                </Typography>
                <Typography variant="body2" sx={{ color: "#555" }}>
                  {item.detail}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Section>
  )
}
