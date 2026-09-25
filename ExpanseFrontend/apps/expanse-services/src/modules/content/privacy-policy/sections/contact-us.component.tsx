import React from "react"
import { Box, Typography, Link } from "@mui/material"

export function ContactUsPrivacyPolicySection({
  BusinessName,
}: {
  BusinessName: string
}) {
  return (
    <Box>
      <Typography variant="h4" mb={2} component="h2" id="contact-us">
        13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
      </Typography>
      {/* <Typography><span>If you have questions or comments about this notice, you may email us at info@expanseservices.com or by post to:</span></Typography> */}
      <Typography variant="body1" component="p">
        If you have questions or comments about this notice, you may email us at
        info@expanseservices.com
      </Typography>
      <br />
      <Typography m={0} component="p">
        {BusinessName}
      </Typography>
      <Typography m={0} component="p">
        United States
      </Typography>
    </Box>
  )
}
