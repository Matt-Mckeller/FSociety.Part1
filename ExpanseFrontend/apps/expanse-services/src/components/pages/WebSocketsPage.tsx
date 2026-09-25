"use client"
import { Box, Typography } from "@mui/material"
import CableIcon from "@mui/icons-material/Cable"

export function WebSocketsPage() {
  return (
    <Box sx={{ height: "100%", p: 4, bgcolor: "background.default" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <CableIcon sx={{ fontSize: 40, color: "error.main" }} />
        <Typography variant="h3" fontWeight={700}>
          WebSockets
        </Typography>
      </Box>
      <Typography color="text.secondary">
        Real-time WebSocket connection demos.
      </Typography>
    </Box>
  )
}
export default WebSocketsPage
