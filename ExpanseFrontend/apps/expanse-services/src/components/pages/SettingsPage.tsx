"use client"
import { Box, Typography } from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"

export function SettingsPage() {
  return (
    <Box sx={{ height: "100%", p: 4, bgcolor: "background.default" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <SettingsIcon sx={{ fontSize: 40, color: "text.secondary" }} />
        <Typography variant="h3" fontWeight={700}>
          Settings
        </Typography>
      </Box>
      <Typography color="text.secondary">
        Application settings and preferences.
      </Typography>
    </Box>
  )
}
export default SettingsPage
