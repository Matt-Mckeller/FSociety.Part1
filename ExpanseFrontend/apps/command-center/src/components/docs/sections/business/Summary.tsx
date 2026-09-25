/**
 * Summary Section
 *
 * Business summary with copyable sections.
 * Migrated from DocsView.tsx renderSummary()
 */

import { useState } from "react"
import {
  Typography,
  Card,
  CardContent,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { DocSection, DocGrid } from "../../common"
import { summary } from "../../../../data/docs"

const summaryItems = [
  { title: "Introduction", content: summary.intro, icon: "👋" },
  { title: "Why", content: summary.why, icon: "❓" },
  { title: "What", content: summary.what, icon: "🎯" },
  { title: "Who", content: summary.who, icon: "👥" },
  { title: "Education", content: summary.education, icon: "📚" },
]

export default function Summary() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <DocSection title="Business Summary" icon="💼">
      <DocGrid columns={{ xs: 1 }} spacing={3}>
        {summaryItems.map((section) => (
          <Card key={section.title}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Typography variant="h6" gutterBottom color="primary">
                  {section.icon} {section.title}
                </Typography>
                <Tooltip
                  title={copiedId === section.title ? "Copied!" : "Copy"}
                >
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleCopy(section.content || "", section.title)
                    }
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography variant="body1">{section.content}</Typography>
            </CardContent>
          </Card>
        ))}
      </DocGrid>
    </DocSection>
  )
}
