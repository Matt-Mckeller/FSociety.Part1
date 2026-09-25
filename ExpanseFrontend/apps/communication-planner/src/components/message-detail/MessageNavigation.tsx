"use client"

import { Box, Button } from "@mui/material"
import { ArrowBack, ArrowForward } from "@mui/icons-material"
import Link from "next/link"
import { MessageDraft } from "@/types"

interface MessageNavigationProps {
  allDrafts: MessageDraft[]
  currentId: string
}

export function MessageNavigation({
  allDrafts,
  currentId,
}: MessageNavigationProps) {
  const currentIndex = allDrafts.findIndex((d) => d.id === currentId)
  const prevDraft = currentIndex > 0 ? allDrafts[currentIndex - 1] : null
  const nextDraft =
    currentIndex < allDrafts.length - 1 ? allDrafts[currentIndex + 1] : null

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mt: 5,
        pt: 3,
        borderTop: 1,
        borderColor: "divider",
        gap: 2,
      }}
    >
      {prevDraft ? (
        <Button
          component={Link}
          href={`/messages/${prevDraft.id}`}
          startIcon={<ArrowBack />}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderColor: "grey.400",
            color: "text.primary",
            px: 2,
          }}
        >
          {prevDraft.title}
        </Button>
      ) : (
        <Box />
      )}
      {nextDraft ? (
        <Button
          component={Link}
          href={`/messages/${nextDraft.id}`}
          endIcon={<ArrowForward />}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderColor: "primary.main",
            color: "primary.main",
            px: 2,
          }}
        >
          {nextDraft.title}
        </Button>
      ) : (
        <Box />
      )}
    </Box>
  )
}
