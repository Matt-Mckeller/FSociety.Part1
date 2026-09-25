"use client"

import { Grid, Card, CardContent, Typography } from "@mui/material"
import { Section } from "./Section"
import { kpiItems } from "../data"

export function KPIsSection() {
  return (
    <Section id="kpis" title="Measurement & KPIs">
      <Grid container spacing={2}>
        {kpiItems.map((kpi) => (
          <Grid item zero={12} tablet={6} key={kpi.category}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary">
                  {kpi.category}
                </Typography>
                <Typography variant="body2">{kpi.metrics}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Section>
  )
}
