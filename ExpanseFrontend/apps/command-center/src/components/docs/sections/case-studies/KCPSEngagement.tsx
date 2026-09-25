/**
 * KCPS Engagement Section
 *
 * Engagement insights from the KCPS case study.
 */

import {
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Grid,
  Tabs,
  Tab,
} from "@mui/material"
import { useState } from "react"
import { DocSection } from "../../common"
import { caseStudies } from "../../../../data/docs"
import type { EngagementInsight } from "../../../../types/docs"
import { SAD_SAGE, SAD_BRICK, SAD_FOG, SAD_OCHRE } from "./kcpsPalette"

interface TabPanelProps {
  children?: React.ReactNode
  value: number
  index: number
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  )
}

const categoryConfig: Record<
  string,
  { label: string; icon: string; color: string }
> = {
  enablers: { label: "Enablers", icon: "✅", color: SAD_SAGE },
  barriers: { label: "Barriers", icon: "🚧", color: SAD_BRICK },
  interests: { label: "Student Interests", icon: "🎮", color: SAD_FOG },
  resets: { label: "Energy Resets", icon: "🔄", color: SAD_OCHRE },
}

export default function KCPSEngagement() {
  const insights = (caseStudies.engagementInsights || []) as EngagementInsight[]
  const [tab, setTab] = useState(0)

  const categories = ["enablers", "barriers", "interests", "resets"]

  const getInsightsByCategory = (category: string) =>
    insights.filter((i) => i.category === category)

  return (
    <DocSection title="Engagement Insights" icon="📊">
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        What enables and blocks student engagement, based on field observations.
      </Typography>

      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        {categories.map((cat) => (
          <Tab
            key={cat}
            label={`${categoryConfig[cat].icon} ${categoryConfig[cat].label} (${getInsightsByCategory(cat).length})`}
          />
        ))}
      </Tabs>

      {categories.map((category, index) => (
        <TabPanel key={category} value={tab} index={index}>
          <Grid container spacing={2}>
            {getInsightsByCategory(category).map((insight) => (
              <Grid item xs={12} md={6} key={insight.id}>
                <Card
                  sx={{
                    height: "100%",
                    borderTop: 3,
                    borderColor: categoryConfig[category].color,
                  }}
                >
                  <CardContent>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      {insight.insight}
                    </Typography>

                    {insight.evidence && (
                      <Box
                        sx={{
                          bgcolor: "action.hover",
                          p: 1,
                          borderRadius: 1,
                          mt: 1,
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          fontStyle="italic"
                        >
                          📝 Evidence: {insight.evidence}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      ))}

      {/* Summary Stats */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Summary
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={`${categoryConfig[cat].label}: ${getInsightsByCategory(cat).length}`}
              sx={{
                borderLeft: 4,
                borderColor: categoryConfig[cat].color,
                borderRadius: 1,
              }}
            />
          ))}
        </Box>
      </Box>
    </DocSection>
  )
}
