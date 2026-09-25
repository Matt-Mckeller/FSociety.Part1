import React from "react"
import { Box, Typography, Link } from "@mui/material"
import { EXPANSE_TERMS_OF_SERVICE_SECTIONS } from "../terms-of-service-sections.enum"

export function UserGeneratedContributionsSection({
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
        CONTENT
      </Typography>
    </Box>
  )
}
