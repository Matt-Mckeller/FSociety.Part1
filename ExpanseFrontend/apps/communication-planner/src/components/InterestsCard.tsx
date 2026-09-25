"use client"

import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Tooltip,
} from "@mui/material"
import { Interests } from "@mui/icons-material"
import { Interest } from "@/types"

interface InterestsCardProps {
  interests: Interest[]
}

export function InterestsCard({ interests }: InterestsCardProps) {
  const highEngagement = interests.filter((i) => i.engagementLevel === "high")
  const mediumEngagement = interests.filter(
    (i) => i.engagementLevel === "medium",
  )
  const lowEngagement = interests.filter((i) => i.engagementLevel === "low")

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Interests sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" sx={{ color: "text.primary" }}>
            Interests & Engagement Hooks
          </Typography>
        </Box>

        {highEngagement.length > 0 && (
          <>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "primary.dark",
                  mr: 1,
                }}
              />
              <Typography variant="subtitle2" color="text.secondary">
                High Engagement
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
              {highEngagement.map((interest) =>
                interest.items.map((item) => (
                  <Tooltip
                    key={`${interest.category}-${item}`}
                    title={`${interest.category}${interest.notes ? ` - ${interest.notes}` : ""}`}
                  >
                    <Chip
                      label={item}
                      size="small"
                      sx={{ bgcolor: "primary.main", color: "white" }}
                    />
                  </Tooltip>
                )),
              )}
            </Box>
          </>
        )}

        {mediumEngagement.length > 0 && (
          <>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "primary.light",
                  mr: 1,
                }}
              />
              <Typography variant="subtitle2" color="text.secondary">
                Medium Engagement
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
              {mediumEngagement.map((interest) =>
                interest.items.map((item) => (
                  <Tooltip
                    key={`${interest.category}-${item}`}
                    title={interest.category}
                  >
                    <Chip
                      label={item}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: "primary.main",
                        color: "primary.main",
                      }}
                    />
                  </Tooltip>
                )),
              )}
            </Box>
          </>
        )}

        {lowEngagement.length > 0 && (
          <>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "primary.light",
                  mr: 1,
                  opacity: 0.5,
                }}
              />
              <Typography variant="subtitle2" color="text.secondary">
                Low Engagement
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {lowEngagement.map((interest) =>
                interest.items.map((item) => (
                  <Chip
                    key={`${interest.category}-${item}`}
                    label={item}
                    size="small"
                    variant="outlined"
                    sx={{ borderColor: "grey.400" }}
                  />
                )),
              )}
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  )
}
