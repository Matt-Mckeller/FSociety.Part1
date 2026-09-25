"use client"

import { Box, Typography, Chip } from "@mui/material"
import { MessageDraft } from "@/types"

interface MessageHeaderProps {
  draft: MessageDraft
}

export function MessageHeader({ draft }: MessageHeaderProps) {
  return (
    <Box
      sx={{
        mb: 4,
        pb: 3,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Chip
        label={draft.status}
        size="small"
        variant="outlined"
        sx={{
          mb: 1.5,
          borderColor: "grey.400",
          color: "text.secondary",
          textTransform: "capitalize",
        }}
      />
      <Typography
        variant="h4"
        component="h1"
        sx={{ color: "text.primary", fontWeight: 600, mb: 1, lineHeight: 1.25 }}
      >
        {draft.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720 }}>
        {draft.theme}
      </Typography>
    </Box>
  )
}
