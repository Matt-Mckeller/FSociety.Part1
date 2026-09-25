/**
 * Sales Insights Section
 *
 * Marketing and sales strategies for different audiences and cultures.
 * Migrated from DocsView.tsx renderSalesInsights()
 */

import { Typography, Card, CardContent, Alert } from "@mui/material"
import { DocSection, DocGrid, DocAccordion } from "../../common"
import { marketing } from "../../../../data/docs"

// Type assertion helper
const salesData = (marketing as Record<string, unknown>).salesInsights as {
  highValueTargets?: Array<{
    id: string
    name: string
    description: string
    application: string
  }>
  highValueTopics?: Array<{
    topic: string
    relevance: string
    application: string
  }>
  culturalConsiderations?: Array<{
    insight: string
    description: string
    application: string
  }>
}

export default function SalesInsights() {
  return (
    <DocSection
      title="Sales Insights"
      icon="💰"
      description="Marketing and sales strategies for different audiences and cultures."
    >
      {/* High Value Targets */}
      <DocAccordion title="🎯 High Value Targets" defaultExpanded>
        <DocGrid columns={{ xs: 1, md: 2 }} spacing={2}>
          {salesData?.highValueTargets?.map((target) => (
            <Card key={target.id} sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  {target.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {target.description}
                </Typography>
                <Alert severity="success">
                  <Typography variant="body2">
                    <strong>Application:</strong> {target.application}
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          ))}
        </DocGrid>
      </DocAccordion>

      {/* High Value Topics */}
      <DocAccordion title="💬 High Value Topics" defaultExpanded>
        <DocGrid columns={{ xs: 1, md: 2 }} spacing={2}>
          {salesData?.highValueTopics?.map((topic, i) => (
            <Card key={i} sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  {topic.topic}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {topic.relevance}
                </Typography>
                <Alert severity="info">
                  <Typography variant="body2">
                    <strong>Application:</strong> {topic.application}
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          ))}
        </DocGrid>
      </DocAccordion>

      {/* Cultural Considerations */}
      <DocAccordion title="🌍 Cultural Considerations" defaultExpanded>
        <DocGrid columns={{ xs: 1 }} spacing={2}>
          {salesData?.culturalConsiderations?.map((item, i) => (
            <Card key={i}>
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  {item.insight}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {item.description}
                </Typography>
                <Alert severity="warning">
                  <Typography variant="body2">
                    <strong>Application:</strong> {item.application}
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          ))}
        </DocGrid>
      </DocAccordion>
    </DocSection>
  )
}
