import React from "react"
import { Box, Typography, Link } from "@mui/material"
import { EXPANSE_TERMS_OF_SERVICE_SECTIONS } from "../terms-of-service-sections.enum"

export function GoverningLawSection({
  id,
  title,
}: {
  id: string
  title: string
}) {
  return (
    <Box>
      <Typography variant="h4" mb={2} component="h2" id={id}>
        {title}
      </Typography>
      <Typography variant="body1" component="p">
        These Terms of Use and your use of the Site are governed by and
        construed in accordance with the laws of the State of Missouri
        applicable to agreements made and to be entirely performed within the
        State of Missouri, without regard to its conflict of law principles.
      </Typography>
    </Box>
  )
}
