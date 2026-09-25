import React from "react"
import { Box, Typography, Link } from "@mui/material"
import { EXPANSE_TERMS_OF_SERVICE_SECTIONS } from "../terms-of-service-sections.enum"

export function UserRegistrationSection({
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
        You may be required to register with the Site. You agree to keep your
        password confidential and will be responsible for all use of your
        account and password. We reserve the right to remove, reclaim, or change
        a username you select if we determine, in our sole discretion, that such
        username is inappropriate, obscene, or otherwise objectionable.
      </Typography>
    </Box>
  )
}
