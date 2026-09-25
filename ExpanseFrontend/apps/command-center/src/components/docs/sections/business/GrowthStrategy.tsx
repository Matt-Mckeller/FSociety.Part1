/**
 * Growth Strategy Section
 *
 * Business growth plans, partnerships, and expansion opportunities.
 * Migrated from DocsView.tsx renderGrowthStrategy()
 */

import { Typography, Card, CardContent, Box, Chip } from "@mui/material"
import { DocSection, DocGrid, DocAccordion } from "../../common"
import { business } from "../../../../data/docs"

// Type assertion helper for the business data
const growthData = (business as Record<string, unknown>).growthStrategy as {
  teamBuilding?: {
    goal: string
    strategy: string
    priority: string
  }
  governmentOpportunities?: Array<{
    id: string
    description: string
    status: string
    potential?: string
  }>
  partnershipOpportunities?: Array<{
    partner: string
    opportunity: string
    status: string
  }>
  productExpansion?: Array<{
    id: string
    description: string
    status: string
    timeline?: string
  }>
  studentPipeline?: {
    concept: string
    value: string
    destinations?: string[]
  }
}

export default function GrowthStrategy() {
  return (
    <DocSection
      title="Growth Strategy"
      icon="📈"
      description="Business growth plans, partnerships, and expansion opportunities."
    >
      {/* Team Building */}
      <DocAccordion title="👥 Team Building" defaultExpanded>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600}>
              Goal
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {growthData?.teamBuilding?.goal}
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              Strategy
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {growthData?.teamBuilding?.strategy}
            </Typography>
            <Chip
              label={`Priority: ${growthData?.teamBuilding?.priority}`}
              color="error"
            />
          </CardContent>
        </Card>
      </DocAccordion>

      {/* Government Opportunities */}
      <DocAccordion title="🏛️ Government Opportunities" defaultExpanded>
        <DocGrid columns={{ xs: 1, md: 2 }} spacing={2}>
          {growthData?.governmentOpportunities?.map((opp) => (
            <Card key={opp.id} sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="body1">{opp.description}</Typography>
                <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                  <Chip label={`Status: ${opp.status}`} size="small" />
                  {opp.potential && (
                    <Chip
                      label={`Potential: ${opp.potential}`}
                      size="small"
                      color="success"
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </DocGrid>
      </DocAccordion>

      {/* Partnership Opportunities */}
      <DocAccordion title="🤝 Partnership Opportunities" defaultExpanded>
        <DocGrid columns={{ xs: 1, md: 2 }} spacing={2}>
          {growthData?.partnershipOpportunities?.map((opp, i) => (
            <Card key={i} sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  {opp.partner}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {opp.opportunity}
                </Typography>
                <Chip label={`Status: ${opp.status}`} size="small" />
              </CardContent>
            </Card>
          ))}
        </DocGrid>
      </DocAccordion>

      {/* Product Expansion */}
      <DocAccordion title="🚀 Product Expansion" defaultExpanded>
        <DocGrid columns={{ xs: 1, md: 2 }} spacing={2}>
          {growthData?.productExpansion?.map((exp) => (
            <Card key={exp.id} sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {exp.description}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Chip label={`Status: ${exp.status}`} size="small" />
                  {exp.timeline && (
                    <Chip
                      label={`Timeline: ${exp.timeline}`}
                      size="small"
                      color="info"
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </DocGrid>
      </DocAccordion>

      {/* Student Pipeline */}
      <DocAccordion title="🎓 Student Pipeline" defaultExpanded>
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600}>
              Concept
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {growthData?.studentPipeline?.concept}
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              Value
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {growthData?.studentPipeline?.value}
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              Destinations
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {growthData?.studentPipeline?.destinations?.map(
                (dest: string, i: number) => (
                  <Chip key={i} label={dest} color="primary" />
                )
              )}
            </Box>
          </CardContent>
        </Card>
      </DocAccordion>
    </DocSection>
  )
}
