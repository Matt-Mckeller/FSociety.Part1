/**
 * Integrations Section
 *
 * Third-party integrations.
 * Migrated from DocsView.tsx renderIntegrations()
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
import { technology } from "../../../../data/docs"
import type { Integration } from "../../../../types/docs"

export default function Integrations() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <DocSection title="Integrations" icon="🔗">
      <DocGrid columns={{ xs: 1, md: 2 }} spacing={3}>
        {(technology.integrations as Integration[]).map((integration) => (
          <Card key={integration.name} sx={{ height: "100%" }}>
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
                  {integration.name}
                </Typography>
                <Chip
                  label={integration.priority}
                  size="small"
                  color={integration.priority === "core" ? "success" : "default"}
                />
              </Box>
              <Chip label={integration.category} size="small" sx={{ mb: 1 }} />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                {integration.description}
              </Typography>
              {integration.url && (
                <Box sx={{ mt: 2 }}>
                  <Tooltip
                    title={
                      copiedId === integration.name ? "Copied!" : "Copy URL"
                    }
                  >
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleCopy(integration.url || "", integration.name)
                      }
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </DocGrid>
    </DocSection>
  )
}
