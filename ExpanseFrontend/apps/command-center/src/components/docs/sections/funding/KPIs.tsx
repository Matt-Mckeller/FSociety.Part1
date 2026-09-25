/**
 * KPIs Section
 *
 * Key Performance Indicators and goals for 2026.
 * Migrated from DocsView.tsx renderKPIs()
 */

import { Typography, Card, CardContent, Box } from "@mui/material"
import { DocSection, DocGrid, DocList } from "../../common"
import { funding } from "../../../../data/docs"
import type { KPIGoals } from "../../../../types/docs"

const kpiCategories = [
  { key: "finance", label: "Finance", icon: "💰" },
  { key: "validation", label: "Validation", icon: "✅" },
  { key: "product", label: "Product", icon: "🚀" },
  { key: "people", label: "People", icon: "👥" },
] as const

export default function KPIs() {
  const kpis = funding.kpiGoals2026 as KPIGoals

  return (
    <DocSection title="KPI Goals 2026" icon="📊">
      <DocGrid columns={{ xs: 1, sm: 2 }} spacing={2}>
        {kpiCategories.map(({ key, label, icon }) => (
          <Card key={key} sx={{ height: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Typography variant="h5">{icon}</Typography>
                <Typography variant="h6" color="primary">
                  {label}
                </Typography>
              </Box>
              <DocList
                items={(kpis[key] as string[]).map((goal) => ({
                  primary: goal,
                }))}
                dense
              />
            </CardContent>
          </Card>
        ))}
      </DocGrid>
    </DocSection>
  )
}
