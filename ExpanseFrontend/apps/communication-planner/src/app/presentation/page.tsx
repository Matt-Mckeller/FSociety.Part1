"use client"

import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Chip,
  Button,
} from "@mui/material"
import Link from "next/link"
import { ArrowBack, Slideshow } from "@mui/icons-material"
import { communicationSession } from "@/data/session"
import { countPresentationSlides } from "@/components/presentation"

export default function PresentationSelectorPage() {
  const session = communicationSession
  const profile = session.recipientProfile
  const preferences =
    profile.psychological.communicationPreferences.respondsWellTo

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
            Profile
          </Button>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
            Demonstration
          </Typography>
          <Chip
            label={profile.name}
            size="small"
            sx={{ bgcolor: "primary.light", color: "white" }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, maxWidth: 640 }}>
          <Typography
            variant="h4"
            sx={{ color: "text.primary", fontWeight: 600, mb: 1 }}
          >
            Choose a demonstration
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Built for {profile.name}. Prefers {preferences.join(", ").toLowerCase()}.
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {session.messageDrafts.map((draft, idx) => {
            const slides = countPresentationSlides(draft)
            return (
              <Grid item xs={12} md={4} key={draft.id}>
                <Card
                  sx={{
                    height: "100%",
                    border: 1,
                    borderColor: "divider",
                    boxShadow: "none",
                  }}
                >
                  <CardActionArea
                    component={Link}
                    href={`/presentation/${draft.id}/primary`}
                    sx={{ height: "100%" }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            bgcolor: "primary.main",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 13,
                            fontWeight: 700,
                          }}
                        >
                          {idx + 1}
                        </Box>
                        <Chip
                          label={draft.status}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: "grey.400",
                            color: "text.secondary",
                            textTransform: "capitalize",
                          }}
                        />
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{ color: "text.primary", mb: 0.75, lineHeight: 1.35 }}
                      >
                        {draft.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2.5, minHeight: 40 }}
                      >
                        {draft.theme}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          {slides} slides
                          {draft.keyPoints
                            ? ` · ${draft.keyPoints.length} takeaways`
                            : ""}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            color: "primary.main",
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        >
                          <Slideshow sx={{ fontSize: 16 }} />
                          Present
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}
