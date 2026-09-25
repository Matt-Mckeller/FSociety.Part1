/**
 * KCPS Classroom Management Section
 *
 * Classroom management tips and strategies from the KCPS case study.
 */

import {
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { useState } from "react"
import { alpha } from "@mui/material/styles"
import { DocSection } from "../../common"
import { caseStudies } from "../../../../data/docs"
import type { ClassroomManagementTip } from "../../../../types/docs"
import { SAD_SAGE, SAD_OCHRE, SAD_GREY } from "./kcpsPalette"

const effectivenessColors: Record<string, string> = {
  high: SAD_SAGE,
  medium: SAD_OCHRE,
  low: SAD_GREY,
}

const schoolLevelLabels: Record<string, string> = {
  elementary: "Elementary",
  middle: "Middle",
  high: "High School",
}

export default function KCPSClassroomManagement() {
  const tips = (caseStudies.classroomManagement || []) as ClassroomManagementTip[]
  const [filter, setFilter] = useState<string>("all")

  const filteredTips =
    filter === "all"
      ? tips
      : tips.filter((t) => t.schoolLevel.includes(filter as any))

  return (
    <DocSection title="Classroom Management Strategies" icon="🎯">
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Practical classroom management techniques observed and tested across
        different school levels.
      </Typography>

      <Box sx={{ mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter by School Level</InputLabel>
          <Select
            value={filter}
            label="Filter by School Level"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="all">All Levels</MenuItem>
            <MenuItem value="elementary">Elementary</MenuItem>
            <MenuItem value="middle">Middle School</MenuItem>
            <MenuItem value="high">High School</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2}>
        {filteredTips.map((tip) => (
          <Grid item xs={12} md={6} key={tip.id}>
            <Card
              sx={{
                height: "100%",
                borderLeft: 4,
                borderColor:
                  tip.effectiveness === "high"
                    ? SAD_SAGE
                    : tip.effectiveness === "medium"
                      ? SAD_OCHRE
                      : SAD_GREY,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 1,
                  }}
                >
                  <Typography variant="h6">{tip.strategy}</Typography>
                  {tip.effectiveness && (
                    <Chip
                      label={tip.effectiveness}
                      size="small"
                      sx={{
                        bgcolor: alpha(effectivenessColors[tip.effectiveness], 0.14),
                        color: effectivenessColors[tip.effectiveness],
                        fontWeight: 600,
                      }}
                    />
                  )}
                </Box>

                <Typography variant="body2" sx={{ mb: 2 }}>
                  {tip.description}
                </Typography>

                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                  {tip.schoolLevel.map((level) => (
                    <Chip
                      key={level}
                      label={schoolLevelLabels[level]}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredTips.length === 0 && (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          No strategies found for the selected filter.
        </Typography>
      )}
    </DocSection>
  )
}
