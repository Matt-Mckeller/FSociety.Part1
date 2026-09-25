"use client"

import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material"
import Link from "next/link"
import { ArrowBack } from "@mui/icons-material"
import { communicationSession } from "@/data/session"
import { communicationQuiz } from "@/data/quiz"
import {
  KeyPointsChecklist,
  PsychApproachProgress,
  ContentBlockRenderer,
  RequirementsFulfilled,
} from "@/components/message-detail"
import { QuizSection } from "@/components/quiz"

export default function AllMessagesPage() {
  const session = communicationSession

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
            All messages
          </Typography>
          <Chip
            label={`${session.messageDrafts.length} drafts`}
            size="small"
            sx={{ bgcolor: "primary.light", color: "white" }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{ color: "text.primary", fontWeight: 600, mb: 1 }}
          >
            {session.recipientProfile.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Combined drafts for this session.
          </Typography>
        </Box>

        {/* Psychological Approach Overview */}
        <Card
          sx={{
            mb: 4,
            boxShadow: "none",
            border: 1,
            borderColor: "divider",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "text.primary" }}
            >
              Psychological Approach Framework
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              The following approach steps are addressed across all message
              drafts:
            </Typography>
            <Grid container spacing={2}>
              {session.strategy.psychologicalApproach.map((step) => (
                <Grid item xs={12} sm={6} md={3} key={step.step}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      height: "100%",
                      borderColor: "primary.light",
                      bgcolor: "rgba(98, 24, 144, 0.04)",
                    }}
                  >
                    <Typography variant="caption" color="primary.main">
                      Step {step.step}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "text.primary", fontWeight: 600 }}
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {step.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* All Message Drafts */}
        {session.messageDrafts.map((draft, index) => (
          <Card
            key={draft.id}
            sx={{
              mb: 4,
              boxShadow: "none",
              border: 1,
              borderColor: "divider",
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
              <Box sx={{ mb: 3.5 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
                >
                  <Chip
                    label={`Draft ${index + 1} of ${session.messageDrafts.length}`}
                    size="small"
                    sx={{ bgcolor: "primary.main", color: "white" }}
                  />
                  <Chip
                    label={draft.status}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor:
                        draft.status === "draft"
                          ? "primary.light"
                          : "primary.main",
                      color: "primary.main",
                    }}
                  />
                </Box>

                <Typography
                  variant="h5"
                  sx={{ color: "text.primary", fontWeight: 600 }}
                >
                  {draft.title}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {draft.theme}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Psych Approach Progress for this draft */}
              <Box sx={{ mb: 3 }}>
                <PsychApproachProgress
                  allSteps={session.strategy.psychologicalApproach}
                  addressedSteps={draft.addressedPsychSteps || []}
                />
              </Box>

              {/* Key Points */}
              {draft.keyPoints && draft.keyPoints.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <KeyPointsChecklist keyPoints={draft.keyPoints} />
                </Box>
              )}

              {/* Content Blocks */}
              {draft.contentBlocks && draft.contentBlocks.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <ContentBlockRenderer blocks={draft.contentBlocks} />
                </Box>
              )}

              {/* Requirements Fulfilled */}
              <RequirementsFulfilled
                allRequirements={session.strategy.contentRequirements}
                addressedIds={draft.addressedRequirements || []}
              />
            </CardContent>
          </Card>
        ))}

        {/* Quiz Section */}
        <QuizSection quiz={communicationQuiz} />

        {/* Footer */}
        <Paper sx={{ p: 2, textAlign: "center", mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Session ID: {session.metadata.sessionId} | Project:{" "}
            {session.metadata.relatedProject}
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}
