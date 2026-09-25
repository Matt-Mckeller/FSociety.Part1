import React from "react"
import { Box, Typography, Link } from "@mui/material"

export function CookiesAndTrackingPrivacyPolicySection() {
  return (
    <Box>
      <Typography variant="h4" component="h2" mb={2} id="cookies-and-tracking">
        4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
      </Typography>
      <Typography variant="body1" component="p">
        In Short: We may use cookies and other tracking technologies to collect
        and store your information.
      </Typography>
      <Typography variant="body1" component="p">
        We may use cookies and similar tracking technologies (like web beacons
        and pixels) to access or store information. Specific information about
        how we use such technologies and how you can refuse certain cookies is
        set out in our Cookie Notice.
      </Typography>
    </Box>
  )
}
