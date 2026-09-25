/**
 * Value Propositions Section
 *
 * Tiered value propositions display.
 * Migrated from DocsView.tsx renderValuePropositions()
 */

import { Typography, Card, CardContent, Box, Chip } from "@mui/material"
import { DocSection, DocGrid } from "../../common"
import { valuePropositions } from "../../../../data/docs"
import type { ValueProposition } from "../../../../types/docs"

const tierLabels: Record<number, string> = {
  1: "Tier 1 (Core)",
  2: "Tier 2 (Important)",
  3: "Tier 3 (Supporting)",
}

export default function ValuePropositions() {
  const tiers = [1, 2, 3]

  return (
    <DocSection title="Value Propositions" icon="💎">
      {tiers.map((tier) => {
        const tierProps = (valuePropositions as ValueProposition[]).filter(
          (vp) => vp.tier === tier
        )
        if (tierProps.length === 0) return null

        return (
          <Box key={tier} sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
              {tierLabels[tier]}
            </Typography>
            <DocGrid columns={{ xs: 1, md: 2, lg: 3 }} spacing={2}>
              {tierProps.map((vp) => (
                <Card key={vp.id} sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {vp.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {vp.description}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Benefits:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {vp.benefits.map((benefit: string, i: number) => (
                        <Typography component="li" key={i} variant="body2">
                          {benefit}
                        </Typography>
                      ))}
                    </Box>
                    <Box
                      sx={{ mt: 2, display: "flex", gap: 0.5, flexWrap: "wrap" }}
                    >
                      {vp.audience.map((aud: string) => (
                        <Chip
                          key={aud}
                          label={aud}
                          size="small"
                          color="secondary"
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </DocGrid>
          </Box>
        )
      })}
    </DocSection>
  )
}
