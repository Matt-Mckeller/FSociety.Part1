"use client"
import { Box, Typography } from "@mui/material"
import ApiIcon from "@mui/icons-material/Api"

export function ApiPage() {
  return (
    <Box sx={{ height: "100%", p: 4, bgcolor: "background.default" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <ApiIcon sx={{ fontSize: 40, color: "success.main" }} />
        <Typography variant="h3" fontWeight={700}>
          API Explorer
        </Typography>
      </Box>
      <Typography color="text.secondary">
        GraphQL and REST API exploration tools.
      </Typography>
    </Box>
  )
}
export default ApiPage
