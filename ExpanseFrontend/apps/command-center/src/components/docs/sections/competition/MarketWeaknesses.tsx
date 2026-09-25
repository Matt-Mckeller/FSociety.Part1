/**
 * Market Weaknesses Section
 *
 * Areas where competitors fall short.
 * Migrated from DocsView.tsx renderMarketWeaknesses()
 */

import { Typography, Card, CardContent } from "@mui/material"
import { DocSection, DocGrid } from "../../common"
import { competition } from "../../../../data/docs"
import type { CompetitorWeakness } from "../../../../types/docs"

export default function MarketWeaknesses() {
  return (
    <DocSection
      title="Market Weaknesses"
      icon="🎯"
      description="Areas where existing solutions fall short - opportunities for Expanse EDU"
    >
      <DocGrid columns={{ xs: 1, md: 2 }} spacing={3}>
        {(competition.competitorWeaknesses as CompetitorWeakness[]).map(
          (weakness, i) => (
            <Card key={i} sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" color="warning.main" gutterBottom>
                  {weakness.area}
                </Typography>
                <Typography variant="body2">{weakness.issue}</Typography>
              </CardContent>
            </Card>
          )
        )}
      </DocGrid>
    </DocSection>
  )
}
