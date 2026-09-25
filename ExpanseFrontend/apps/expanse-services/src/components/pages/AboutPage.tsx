"use client"
import { Box, Typography } from "@mui/material"
import InfoIcon from "@mui/icons-material/Info"

export function AboutPage() {
  return (
    <Box sx={{ height: "100%", p: 4, bgcolor: "background.default" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <InfoIcon sx={{ fontSize: 40, color: "info.main" }} />
        <Typography variant="h3" fontWeight={700}>
          About
        </Typography>
      </Box>
      <Typography color="text.secondary">
        Learn more about Expanse Services and our mission.
      </Typography>
    </Box>
  )
}
export default AboutPage
