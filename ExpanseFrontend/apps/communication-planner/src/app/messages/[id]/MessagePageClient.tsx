"use client"

import { notFound } from "next/navigation"
import {
  AppBar,
  Toolbar,
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  Chip,
  Button,
} from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import Link from "next/link"
import { communicationSession } from "@/data/session"
import {
  MessageHeader,
  RecipientContextSidebar,
  KeyPointsChecklist,
  PsychApproachProgress,
  ContentBlockRenderer,
  RequirementsFulfilled,
  MessageNavigation,
} from "@/components/message-detail"

interface MessagePageClientProps {
  params: { id: string }
}

export function MessagePageClient({ params }: MessagePageClientProps) {
  const { id } = params
  const session = communicationSession

  const draft = session.messageDrafts.find((d) => d.id === id)
  if (!draft) {
    notFound()
  }

  const currentIndex = session.messageDrafts.findIndex((d) => d.id === id)

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "primary.dark",
          borderBottom: 1,
          borderColor: "primary.main",
        }}
      >
        <Toolbar>
          <Button
            component={Link}
            href="/"
            startIcon={<ArrowBack />}
            sx={{
              color: "white",
              textTransform: "none",
              mr: 2,
              "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
            }}
          >
            Session
          </Button>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
            {session.recipientProfile.name}
          </Typography>
          <Chip
            label={`${currentIndex + 1} of ${session.messageDrafts.length}`}
            size="small"
            sx={{ bgcolor: "primary.light", color: "white" }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <MessageHeader draft={draft} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={9}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                mb: 3,
                border: 1,
                borderColor: "divider",
              }}
            >
              <PsychApproachProgress
                allSteps={session.strategy.psychologicalApproach}
                addressedSteps={draft.addressedPsychSteps || []}
              />
            </Paper>

            {draft.keyPoints && draft.keyPoints.length > 0 && (
              <KeyPointsChecklist keyPoints={draft.keyPoints} />
            )}

            {draft.contentBlocks && draft.contentBlocks.length > 0 && (
              <ContentBlockRenderer blocks={draft.contentBlocks} />
            )}

            <RequirementsFulfilled
              allRequirements={session.strategy.contentRequirements}
              addressedIds={draft.addressedRequirements || []}
            />

            <MessageNavigation
              allDrafts={session.messageDrafts}
              currentId={id}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <RecipientContextSidebar
              profile={session.recipientProfile}
              strategy={session.strategy}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
