/**
 * Channels Section
 *
 * Marketing channels display.
 * Migrated from DocsView.tsx renderChannels()
 */

import { Typography, Card, CardContent, Box, Chip, Alert } from "@mui/material"
import { DocSection, DocGrid } from "../../common"
import { channels } from "../../../../data/docs"
import type { MarketingChannel } from "../../../../types/docs"

export default function Channels() {
  return (
    <DocSection title="Marketing Channels" icon="📣">
      <Alert severity="info" sx={{ mb: 3 }}>
        Goal: Product spreads organically, people come to us
      </Alert>

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        🎯 Big Wins (Dream Targets)
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 4 }}>
        {channels.bigWins.map((win) => (
          <Chip
            key={win.name}
            label={`${win.name} (${win.type})`}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>

      <Typography variant="h5" gutterBottom>
        📢 Channel Strategy
      </Typography>
      <DocGrid columns={{ xs: 1, md: 2 }} spacing={2}>
        {(channels.channels as MarketingChannel[]).map((channel) => (
          <Card key={channel.id} sx={{ height: "100%" }}>
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
                  {channel.name}
                </Typography>
                <Chip
                  label={`P${channel.priority}`}
                  size="small"
                  color={
                    channel.priority === 1
                      ? "success"
                      : channel.priority === 2
                        ? "warning"
                        : "default"
                  }
                />
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                {channel.description}
              </Typography>
              {channel.targets && channel.targets.length > 0 && (
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2">Targets:</Typography>
                  <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {channel.targets.slice(0, 5).map((target: string) => (
                      <Chip
                        key={target}
                        label={target}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              )}
              {channel.platforms && channel.platforms.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Platforms:
                  </Typography>
                  {channel.platforms.map((p) => (
                    <Box
                      key={p.name}
                      sx={{
                        mb: 1,
                        pl: 1,
                        borderLeft: 2,
                        borderColor: "primary.main",
                      }}
                    >
                      <Typography variant="body2" fontWeight={600}>
                        {p.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {p.audience} • {p.content}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </DocGrid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        🎯 Focus Areas
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {channels.focusAreas.map((area: string) => (
          <Chip key={area} label={area} variant="outlined" />
        ))}
      </Box>
    </DocSection>
  )
}
