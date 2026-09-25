"use client"

import {
  Box,
  Grid,
  Card,
  Typography,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Section } from "./Section"
import { MermaidChart } from "./MermaidChart"
import { aiGuidanceTips, promptTemplates, inboundChart } from "../data"

export function AIGuidanceSection() {
  return (
    <Section id="ai-guidance" title="AI Guidance">
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Instructional & Process
        </Typography>
        <Grid container spacing={2}>
          {aiGuidanceTips.map((item, i) => (
            <Grid item zero={6} tablet={4} laptop={2} key={i}>
              <Tooltip title={item.tip} arrow>
                <Card
                  sx={{
                    p: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "#e3f2fd",
                      transform: "translateY(-4px)",
                      boxShadow: 3,
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "#4285f4" }}
                  >
                    {item.label}
                  </Typography>
                </Card>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Accordion sx={{ mt: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Sample Prompt Templates</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {promptTemplates.map((template, i) => (
            <Card key={i} sx={{ mb: 2, p: 2, bgcolor: "#E3F2FD" }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, mb: 1 }}
              >
                {template.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}
              >
                {template.prompt}
              </Typography>
            </Card>
          ))}
        </AccordionDetails>
      </Accordion>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Example Visual Creatable By AI: Inbound Call Flow
      </Typography>
      <Card sx={{ p: 2 }}>
        <Box sx={{ maxWidth: "100%", "& svg": { maxHeight: "400px" } }}>
          <MermaidChart chart={inboundChart} />
        </Box>
      </Card>
    </Section>
  )
}
