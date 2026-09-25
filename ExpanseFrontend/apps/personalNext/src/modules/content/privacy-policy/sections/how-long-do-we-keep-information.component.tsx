import React from "react"
import { Box, Typography, Link } from "@mui/material"

export function HowLongDoWeKeepInformationPrivacyPolicySection() {
  return (
    <Box>
      <Typography
        variant="h4"
        component="h2"
        mb={2}
        id="how-long-do-we-keep-information"
      >
        6. HOW LONG DO WE KEEP YOUR INFORMATION?
      </Typography>
      <Typography component="p" variant="body1" paragraph>
        In Short: We keep your information for as long as necessary to fulfill
        the purposes outlined in this privacy notice unless otherwise required
        by law.
      </Typography>

      <Typography component="p" variant="body1" paragraph>
        We will only keep your personal information for as long as it is
        necessary for the purposes set out in this privacy notice, unless a
        longer retention period is required or permitted by law (such as tax,
        accounting or other legal requirements). No purpose in this notice will
        require us to keep your personal information for longer than the period
        of time in which users have an account with us.
      </Typography>

      <Typography component="p" variant="body1" paragraph>
        When we have no ongoing legitimate business need to process your
        personal information, we will either delete or anonymize such
        information, or, if this is not possible (for example, because your
        personal information has been stored in backup archives), then we will
        securely store your personal information and isolate it from any further
        processing until deletion is possible.
      </Typography>
    </Box>
  )
}
