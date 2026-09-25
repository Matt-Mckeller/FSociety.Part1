"use client"
import { Box, Typography } from "@mui/material"
import GridViewIcon from "@mui/icons-material/GridView"

export function NavigationPage() {
  return (
    <Box sx={{ height: "100%", p: 4, bgcolor: "background.default" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <GridViewIcon sx={{ fontSize: 40, color: "info.main" }} />
        <Typography variant="h3" fontWeight={700}>
          Navigation
        </Typography>
      </Box>
      <Typography color="text.secondary">
        Grid navigation system demos and documentation.
      </Typography>
    </Box>
  )
}
export default NavigationPage
