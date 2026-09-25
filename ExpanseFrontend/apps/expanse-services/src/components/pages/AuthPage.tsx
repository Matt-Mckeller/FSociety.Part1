"use client"
import { Box, Typography } from "@mui/material"
import LockIcon from "@mui/icons-material/Lock"

export function AuthPage() {
  return (
    <Box sx={{ height: "100%", p: 4, bgcolor: "background.default" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <LockIcon sx={{ fontSize: 40, color: "warning.main" }} />
        <Typography variant="h3" fontWeight={700}>
          Authentication
        </Typography>
      </Box>
      <Typography color="text.secondary">
        Authentication demos and OAuth flows.
      </Typography>
    </Box>
  )
}
export default AuthPage
