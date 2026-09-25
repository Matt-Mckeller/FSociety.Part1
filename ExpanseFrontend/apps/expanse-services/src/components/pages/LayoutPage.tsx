"use client"
import { Box, Typography } from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"

export function LayoutPage() {
  return (
    <Box sx={{ height: "100%", p: 4, bgcolor: "background.default" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <DashboardIcon sx={{ fontSize: 40, color: "info.main" }} />
        <Typography variant="h3" fontWeight={700}>
          Layout
        </Typography>
      </Box>
      <Typography color="text.secondary">
        Layout components and grid system documentation.
      </Typography>
    </Box>
  )
}
export default LayoutPage
