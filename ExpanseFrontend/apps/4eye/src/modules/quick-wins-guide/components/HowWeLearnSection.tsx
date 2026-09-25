"use client"

import { Box, Grid, Card, Typography } from "@mui/material"
import { Section } from "./Section"
import { AccordionItem } from "./AccordionItem"
import { learningItems } from "../data"

export function HowWeLearnSection() {
  return (
    <Section id="how-we-learn" title="How We Learn">
      <Card sx={{ mb: 2, p: 2 }}>
        <Typography variant="body1">
          Understanding how people learn helps design better training and
          support. These principles are backed by cognitive science and
          practical experience.
        </Typography>
      </Card>

      <Grid container spacing={2}>
        {learningItems.map((item, i) => (
          <Grid item zero={12} key={i}>
            <AccordionItem title={item.title} detail={item.detail} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", fontWeight: 700 }}
        >
          &quot;Tell me and I forget, teach me and I may remember, involve me
          and I learn.&quot;
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic", mt: 0.5 }}>
          — Chinese Proverb
        </Typography>
      </Box>
    </Section>
  )
}
