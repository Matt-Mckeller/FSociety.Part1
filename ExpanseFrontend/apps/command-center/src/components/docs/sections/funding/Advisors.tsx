/**
 * Advisors Section
 *
 * Advisor goals, attributes, and ideal advisors.
 * Migrated from DocsView.tsx renderAdvisors()
 */

import { Typography, Card, CardContent, Box, Chip } from "@mui/material"
import { DocSection, DocGrid, DocList } from "../../common"
import { funding } from "../../../../data/docs"
import type { IdealAdvisor } from "../../../../types/docs"

export default function Advisors() {
  return (
    <DocSection title="Advisors & Mentors" icon="🧠">
      {/* Advisor Goals */}
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Advisory Goals
      </Typography>
      <DocList
        items={(funding.advisorGoals as string[]).map((goal) => ({
          primary: goal,
        }))}
      />

      {/* Desired Attributes */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Desired Attributes
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {(funding.advisorAttributes as string[]).map((attr, i) => (
          <Chip key={i} label={attr} variant="outlined" />
        ))}
      </Box>

      {/* Ideal Advisors */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Ideal Advisors
      </Typography>
      <DocGrid columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        {(funding.idealAdvisors as IdealAdvisor[]).map((advisor, i) => (
          <Card key={i} sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" color="primary">
                {advisor.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {advisor.reason}
              </Typography>
              <Chip
                label={advisor.priority}
                size="small"
                color={advisor.priority === "ideal" ? "success" : "default"}
              />
            </CardContent>
          </Card>
        ))}
      </DocGrid>
    </DocSection>
  )
}
