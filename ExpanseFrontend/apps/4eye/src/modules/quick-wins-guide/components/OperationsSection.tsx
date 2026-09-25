"use client"

import { Box, Grid, Card, Typography } from "@mui/material"
import { MermaidChart } from "./MermaidChart"
import { podsChart } from "../data"

const podsBullets = [
  "Create pod group chats with a top performer in each",
  "Run a daily 15-min standup for issues, questions, and support",
  "Have top performers teach alongside managers",
  "Review top-performer scripts/recordings and document examples for staff and future AI training",
  "Motivate with team-based rewards (e.g., Top Golf, food) tied to clear performance criteria",
]

const chatIntegrationBullets = [
  "Pilot chat for appropriate interaction types (simple questions, status updates, non-urgent requests).",
  "Ensure the platform supports efficient multi-chat workflows without overwhelming agents.",
  "Train agents on chat-specific communication skills (tone, brevity, emoji use).",
  "Create conversation scripts and examples for different scenarios (greetings, escalations, common issues).",
  "Maintain an organized repository of scripts with examples from top-performing agents.",
  "Monitor workload and quality to find the right balance of concurrent chats.",
  "Use chat transcripts to improve training materials and AI knowledge bases.",
]

export function OperationsSection() {
  return (
    <Box id="operations" sx={{ mb: 4, scrollMarginTop: "80px" }}>
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          pb: 1,
          fontWeight: 600,
          borderBottom: "2px solid #e0e0e0",
        }}
      >
        Operations: Pods (3–5 members)
      </Typography>

      <Grid container spacing={3} alignItems="stretch">
        <Grid item zero={12} laptop={7}>
          <Card sx={{ p: 2, height: "100%" }}>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              {podsBullets.map((item, i) => (
                <li key={i} style={{ marginBottom: "8px" }}>
                  {item}
                </li>
              ))}
            </Box>
          </Card>
        </Grid>
        <Grid item zero={12} laptop={5}>
          <Card
            sx={{
              p: 2,
              height: "100%",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ width: "100%", "& svg": { maxHeight: "350px" } }}>
              <MermaidChart chart={podsChart} />
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
        Chat and Script-Enabled Operations
      </Typography>
      <Card sx={{ p: 2 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Leverage chat channels alongside voice calls to increase efficiency
          and agent capacity. When software supports it, chat enables agents to
          handle multiple conversations concurrently, reducing wait times and
          improving throughput. Key considerations:
        </Typography>
        <Box component="ul" sx={{ pl: 2, m: 0 }}>
          {chatIntegrationBullets.map((item, i) => (
            <li key={i} style={{ marginBottom: "8px" }}>
              {item}
            </li>
          ))}
        </Box>
      </Card>
    </Box>
  )
}
