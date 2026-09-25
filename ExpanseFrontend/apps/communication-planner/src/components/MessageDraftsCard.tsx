"use client"

import {
  Box,
  Typography,
  Chip,
  Card,
  CardActionArea,
  CardContent,
  Button,
  Container,
} from "@mui/material"
import { ArrowForward, ViewAgenda, Slideshow } from "@mui/icons-material"
import Link from "next/link"
import { MessageDraft } from "@/types"

interface MessageDraftsCardProps {
  drafts: MessageDraft[]
}

export function MessageDraftsCard({ drafts }: MessageDraftsCardProps) {
  return (
    <Box
      sx={{
        bgcolor: "rgba(98, 24, 144, 0.04)",
        borderBottom: 1,
        borderColor: "divider",
        py: { xs: 4, md: 5 },
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "flex-start", sm: "flex-end" },
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                letterSpacing: 1.4,
                fontWeight: 600,
              }}
            >
              Messages
            </Typography>
            <Typography
              variant="h4"
              sx={{ color: "text.primary", fontWeight: 600, mt: 0.5 }}
            >
              Individual drafts
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 0.75, maxWidth: 520 }}
            >
              Open a single message to read the learning shifts in context.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Button
              component={Link}
              href="/messages"
              size="small"
              startIcon={<ViewAgenda />}
              sx={{
                textTransform: "none",
                color: "text.secondary",
                fontWeight: 500,
              }}
            >
              All combined
            </Button>
            <Button
              component={Link}
              href="/presentation"
              size="small"
              startIcon={<Slideshow />}
              sx={{
                textTransform: "none",
                color: "text.secondary",
                fontWeight: 500,
              }}
            >
              Presentations
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: `repeat(${Math.min(drafts.length, 3)}, 1fr)`,
            },
            gap: 2.5,
          }}
        >
          {drafts.map((draft, index) => (
            <Card
              key={draft.id}
              sx={{
                height: "100%",
                border: 1,
                borderColor: "divider",
                boxShadow: "none",
                bgcolor: "background.paper",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  borderColor: "primary.light",
                  boxShadow: "0 8px 24px rgba(98, 24, 144, 0.08)",
                },
              }}
            >
              <CardActionArea
                component={Link}
                href={`/messages/${draft.id}`}
                sx={{ height: "100%", alignItems: "stretch" }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
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
                      {index + 1}
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
                    sx={{
                      color: "text.primary",
                      mb: 1,
                      lineHeight: 1.35,
                    }}
                  >
                    {draft.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2.5, flex: 1, lineHeight: 1.6 }}
                  >
                    {draft.theme}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      pt: 2,
                      borderTop: 1,
                      borderColor: "divider",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {draft.keyPoints?.length
                        ? `${draft.keyPoints.length} takeaways`
                        : "Open draft"}
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
                      Open
                      <ArrowForward sx={{ fontSize: 16 }} />
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
