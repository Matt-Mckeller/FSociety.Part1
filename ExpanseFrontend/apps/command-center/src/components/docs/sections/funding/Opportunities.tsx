/**
 * Opportunities Section
 *
 * Funding opportunities.
 * Migrated from DocsView.tsx renderOpportunities()
 */

import { useState } from "react"
import {
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Tooltip,
  IconButton,
} from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { DocSection, DocGrid } from "../../common"
import { funding } from "../../../../data/docs"
import type { FundingOpportunity } from "../../../../types/docs"

export default function Opportunities() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <DocSection title="Funding Opportunities" icon="🎯">
      <DocGrid columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        {(funding.fundingOpportunities as FundingOpportunity[]).map(
          (opp, i) => (
            <Card key={i} sx={{ height: "100%" }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="h6" color="primary">
                    {opp.name}
                  </Typography>
                  <Chip
                    label={opp.priority}
                    size="small"
                    color={
                      opp.priority === "high"
                        ? "success"
                        : opp.priority === "medium"
                          ? "warning"
                          : "default"
                    }
                  />
                </Box>
                <Chip label={opp.category} size="small" sx={{ mb: 1 }} />
                {opp.notes && (
                  <Typography variant="body2" color="text.secondary">
                    {opp.notes}
                  </Typography>
                )}
                {opp.url && (
                  <Box sx={{ mt: 1 }}>
                    <Tooltip
                      title={copiedId === opp.name ? "Copied!" : "Copy URL"}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleCopy(opp.url || "", opp.name)}
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              </CardContent>
            </Card>
          )
        )}
      </DocGrid>
    </DocSection>
  )
}
