/**
 * Pitches Section
 *
 * Elevator pitches with copy functionality.
 * Migrated from DocsView.tsx renderPitches()
 */

import { useState } from "react"
import {
  Typography,
  Card,
  CardContent,
  Box,
  IconButton,
  Tooltip,
  Chip,
  Divider,
} from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { DocSection, DocGrid, DocTip } from "../../common"
import { pitches } from "../../../../data/docs"
import type { ElevatorPitch } from "../../../../types/docs"

export default function Pitches() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <DocSection title="Elevator Pitches" icon="🎤">
      <DocTip>Click the copy button to copy any pitch to your clipboard.</DocTip>

      <DocGrid columns={{ xs: 1, md: 2 }} spacing={3}>
        {(pitches as ElevatorPitch[]).map((pitch) => (
          <Card key={pitch.id} sx={{ height: "100%" }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 1,
                }}
              >
                <Box>
                  <Typography variant="h6" color="primary">
                    {pitch.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {pitch.duration}
                  </Typography>
                </Box>
                <Tooltip
                  title={copiedId === pitch.id ? "Copied!" : "Copy pitch"}
                >
                  <IconButton
                    onClick={() => handleCopy(pitch.content, pitch.id)}
                    color={copiedId === pitch.id ? "success" : "default"}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1" sx={{ mb: 2, fontStyle: "italic" }}>
                &quot;{pitch.content}&quot;
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                {pitch.audience.map((aud: string) => (
                  <Chip key={aud} label={aud} size="small" variant="outlined" />
                ))}
                {pitch.tags?.map((tag: string) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        ))}
      </DocGrid>
    </DocSection>
  )
}
