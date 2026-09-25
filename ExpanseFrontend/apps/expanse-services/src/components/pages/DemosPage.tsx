"use client"

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
} from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import AnimationIcon from "@mui/icons-material/Animation"
import ColorLensIcon from "@mui/icons-material/ColorLens"
import TouchAppIcon from "@mui/icons-material/TouchApp"

const DEMOS = [
  {
    title: "Animations",
    icon: AnimationIcon,
    description: "Lottie and motion demos",
  },
  { title: "Themes", icon: ColorLensIcon, description: "Theme customization" },
  {
    title: "Interactions",
    icon: TouchAppIcon,
    description: "Touch and gesture demos",
  },
]

export function DemosPage() {
  return (
    <Box sx={{ height: "100%", p: 4, bgcolor: "background.default" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <PlayArrowIcon sx={{ fontSize: 40, color: "primary.main" }} />
        <Typography variant="h3" fontWeight={700}>
          Demos
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {DEMOS.map((demo) => (
          <Grid item xs={12} sm={6} md={4} key={demo.title}>
            <Card sx={{ bgcolor: "background.paper" }}>
              <CardActionArea sx={{ p: 2 }}>
                <CardContent>
                  <demo.icon
                    sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {demo.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {demo.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default DemosPage
