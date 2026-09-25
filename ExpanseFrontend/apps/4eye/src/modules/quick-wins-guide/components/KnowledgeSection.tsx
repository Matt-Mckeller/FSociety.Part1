"use client"

import { useState } from "react"
import { Box, Grid, Card, Tabs, Tab, Fade } from "@mui/material"
import { Section } from "./Section"
import { AccordionItem } from "./AccordionItem"
import { knowledgePrinciples, knowledgeQuickWins } from "../data"

export function KnowledgeSection() {
  const [tabValue, setTabValue] = useState(0)

  return (
    <Section id="knowledge" title="Knowledge">
      <Tabs
        value={tabValue}
        onChange={(_, newValue) => setTabValue(newValue)}
        sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
      >
        <Tab label="Core Principles" />
        <Tab label="Quick Wins" />
      </Tabs>

      {tabValue === 0 && (
        <Fade in timeout={300}>
          <Card sx={{ p: 2 }}>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              {knowledgePrinciples.map((item, i) => (
                <li key={i} style={{ marginBottom: "8px" }}>
                  {item}
                </li>
              ))}
            </Box>
          </Card>
        </Fade>
      )}

      {tabValue === 1 && (
        <Fade in timeout={300}>
          <Grid container spacing={2}>
            {knowledgeQuickWins.map((item, i) => (
              <Grid item zero={12} key={i}>
                <AccordionItem title={item.title} detail={item.detail} />
              </Grid>
            ))}
          </Grid>
        </Fade>
      )}
    </Section>
  )
}
