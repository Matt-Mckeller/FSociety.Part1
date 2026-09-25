"use client"
import { Box, Typography } from "@mui/material"
import MailIcon from "@mui/icons-material/Mail"

export function ContactPage() {
  return (
    <Box sx={{ height: "100%", p: 4, bgcolor: "background.default" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <MailIcon sx={{ fontSize: 40, color: "secondary.main" }} />
        <Typography variant="h3" fontWeight={700}>
          Contact
        </Typography>
      </Box>
      <Typography color="text.secondary">
        Get in touch with the Expanse team.
      </Typography>
    </Box>
  )
}
export default ContactPage
