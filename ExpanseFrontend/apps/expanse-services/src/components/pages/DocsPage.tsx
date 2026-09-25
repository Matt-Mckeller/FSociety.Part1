"use client"
import { Box, Typography } from "@mui/material"
import DescriptionIcon from "@mui/icons-material/Description"

export function DocsPage() {
  return (
    <Box sx={{ height: "100%", p: 4, bgcolor: "background.default" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <DescriptionIcon sx={{ fontSize: 40, color: "primary.main" }} />
        <Typography variant="h3" fontWeight={700}>
          Documentation
        </Typography>
      </Box>
      <Typography color="text.secondary">
        API documentation and developer guides.
      </Typography>
    </Box>
  )
}
export default DocsPage
