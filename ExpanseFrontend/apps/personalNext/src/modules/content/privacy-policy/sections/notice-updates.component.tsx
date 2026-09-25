import React from "react"
import { Box, Typography, Link } from "@mui/material"

export function NoticeUpdatesPrivacyPolicySection() {
  return (
    <Box>
      <Typography variant="h4" mb={2} component="h2" id="notice-updates">
        12. DO WE MAKE UPDATES TO THIS NOTICE?
      </Typography>
      <Typography component="p" variant="body1" paragraph>
        In Short: Yes, we will update this notice as necessary to stay compliant
        with relevant laws.
      </Typography>

      <Typography component="p" variant="body1" paragraph>
        We may update this privacy notice from time to time. The updated version
        will be indicated by an updated &quot;Revised&quot; date and the updated
        version will be effective as soon as it is accessible. If we make
        material changes to this privacy notice, we may notify you either by
        prominently posting a notice of such changes or by directly sending you
        a notification. We encourage you to review this privacy notice
        frequently to be informed of how we are protecting your information.
      </Typography>
    </Box>
  )
}
