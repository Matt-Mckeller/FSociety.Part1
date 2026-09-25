"use client"

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Box,
  Chip,
  Paper,
} from "@mui/material"
import { Schedule, Description } from "@mui/icons-material"
import { communicationSession } from "@/data/session"
import {
  ProfileCard,
  PsychologicalCard,
  InterestsCard,
  GoalsCard,
  StrategyCard,
  TraumaCard,
  ObservationsCard,
  RelationshipCard,
  MessageDraftsCard,
} from "@/components"

export default function Home() {
  const session = communicationSession
  const {
    metadata,
    goals,
    artifacts,
    recipientProfile,
    strategy,
    relationshipContext,
    messageDrafts,
  } = session

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* App Bar */}
      <AppBar
        position="static"
        sx={{
          bgcolor: "primary.dark",
          borderBottom: 1,
          borderColor: "primary.main",
        }}
        elevation={0}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="h1"
            sx={{ flexGrow: 1, color: "white" }}
          >
            Communication Session: <strong>{recipientProfile.name}</strong>
          </Typography>
          <Chip
            icon={<Schedule fontSize="small" sx={{ color: "primary.light" }} />}
            label={`Updated: ${metadata.lastUpdated}`}
            size="small"
            variant="outlined"
            sx={{
              mr: 1,
              borderColor: "primary.light",
              color: "primary.contrastText",
            }}
          />
          <Chip
            label={metadata.status}
            size="small"
            sx={{
              bgcolor: "primary.light",
              color: "white",
            }}
          />
        </Toolbar>
      </AppBar>

      <MessageDraftsCard drafts={messageDrafts} />

      <Paper
        sx={{
          py: 1.25,
          px: 3,
          borderRadius: 0,
          bgcolor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
        }}
        elevation={0}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Description fontSize="small" sx={{ color: "primary.main" }} />
            <Typography variant="body2" color="text.secondary">
              Session ID: {metadata.sessionId}
            </Typography>
          </Box>
          <Chip
            label={metadata.deliveryMethod}
            size="small"
            variant="outlined"
            sx={{ borderColor: "primary.main", color: "primary.main" }}
          />
          {metadata.relatedProject && (
            <Chip
              label={`Project: ${metadata.relatedProject}`}
              size="small"
              sx={{ bgcolor: "primary.main", color: "white" }}
            />
          )}
        </Box>
      </Paper>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {/* Left Column - Profile */}
          <Grid item xs={12} md={4}>
            <ProfileCard
              name={recipientProfile.name}
              basicInfo={recipientProfile.basicInfo}
              professional={recipientProfile.professional}
            />
            <PsychologicalCard profile={recipientProfile.psychological} />
            <InterestsCard interests={recipientProfile.interests} />
            <TraumaCard traumaHistory={recipientProfile.traumaHistory} />
          </Grid>

          {/* Right Column - Strategy & Messages */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <GoalsCard goals={goals} artifacts={artifacts} />
              </Grid>
              <Grid item xs={12} lg={6}>
                <RelationshipCard context={relationshipContext} />
              </Grid>
            </Grid>
            <StrategyCard strategy={strategy} />
            <ObservationsCard observations={recipientProfile.observations} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
