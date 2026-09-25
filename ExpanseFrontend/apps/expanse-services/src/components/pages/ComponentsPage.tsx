"use client"

import { Box, Typography, Card, CardContent, Grid } from "@mui/material"
import WidgetsIcon from "@mui/icons-material/Widgets"
import ButtonIcon from "@mui/icons-material/SmartButton"
import InputIcon from "@mui/icons-material/Input"
import ListIcon from "@mui/icons-material/List"

const COMPONENTS = [
  { title: "Buttons", icon: ButtonIcon, count: 12 },
  { title: "Inputs", icon: InputIcon, count: 8 },
  { title: "Lists", icon: ListIcon, count: 5 },
]

export function ComponentsPage() {
  return (
    <Box sx={{ height: "100%", p: 4, bgcolor: "background.default" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <WidgetsIcon sx={{ fontSize: 40, color: "secondary.main" }} />
        <Typography variant="h3" fontWeight={700}>
          Components
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {COMPONENTS.map((comp) => (
          <Grid item xs={12} sm={6} md={4} key={comp.title}>
            <Card sx={{ bgcolor: "background.paper" }}>
              <CardContent>
                <comp.icon
                  sx={{ fontSize: 48, color: "secondary.main", mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  {comp.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {comp.count} components
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ComponentsPage
