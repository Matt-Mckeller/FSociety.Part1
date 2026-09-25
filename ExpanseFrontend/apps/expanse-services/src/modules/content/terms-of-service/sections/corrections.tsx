import React from "react"
import { Box, Typography, Link } from "@mui/material"
import { EXPANSE_TERMS_OF_SERVICE_SECTIONS } from "../terms-of-service-sections.enum"

export function CorrectionsSection({
  id,
  title,
}: {
  id: string
  title: string
}) {
  return (
    <Box>
      <Typography variant="h4" component="h2" mb={2} id={id}>
        {title}
      </Typography>
      <Typography variant="body1" component="p">
        There may be information on the Site that contains typographical errors,
        inaccuracies, or omissions, including descriptions, pricing,
        availability, and various other information. We reserve the right to
        correct any errors, inaccuracies, or omissions and to change or update
        the information on the Site at any time, without prior notice.
      </Typography>
    </Box>
  )
}
