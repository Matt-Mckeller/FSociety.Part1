import React from "react"
import { Box, Typography, Link } from "@mui/material"
import { EXPANSE_TERMS_OF_SERVICE_SECTIONS } from "../terms-of-service-sections.enum"

export function ModificationsAndInterruptions({
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
      <Typography variant="body1" component="p" paragraph>
        We reserve the right to change, modify, or remove the contents of the
        Site at any time or for any reason at our sole discretion without
        notice. However, we have no obligation to update any information on our
        Site. We also reserve the right to modify or discontinue all or part of
        the Site without notice at any time. We will not be liable to you or any
        third party for any modification, price change, suspension, or
        discontinuance of the Site.
      </Typography>
      <Typography variant="body1" component="p" paragraph>
        We cannot guarantee the Site will be available at all times. We may
        experience hardware, software, or other problems or need to perform
        maintenance related to the Site, resulting in interruptions, delays, or
        errors. We reserve the right to change, revise, update, suspend,
        discontinue, or otherwise modify the Site at any time or for any reason
        without notice to you. You agree that we have no liability whatsoever
        for any loss, damage, or inconvenience caused by your inability to
        access or use the Site during any downtime or discontinuance of the
        Site. Nothing in these Terms of Use will be construed to obligate us to
        maintain and support the Site or to supply any corrections, updates, or
        releases in connection therewith.
      </Typography>
    </Box>
  )
}
