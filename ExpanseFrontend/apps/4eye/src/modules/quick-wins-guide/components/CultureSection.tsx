"use client"

import { Grid, Card, Typography } from "@mui/material"
import { Section } from "./Section"
import { AccordionItem } from "./AccordionItem"
import { cultureItems } from "../data"

export function CultureSection() {
  return (
    <Section id="culture" title="Culture">
      <Card sx={{ mb: 2, p: 2 }}>
        <Typography variant="body1">
          Culture shapes how teams communicate, collaborate, and feel at work.
          A positive culture drives engagement, retention, and performance by
          creating psychological safety, recognition, and belonging—especially
          vital in remote environments.
        </Typography>
      </Card>

      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
        Culture Quick Wins
      </Typography>
      <Grid container spacing={2}>
        {cultureItems.map((item, i) => (
          <Grid item zero={12} key={i}>
            <AccordionItem title={item.title} detail={item.detail} />
          </Grid>
        ))}
      </Grid>
    </Section>
  )
}
