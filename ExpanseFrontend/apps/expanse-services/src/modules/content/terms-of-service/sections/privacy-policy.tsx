import React from "react"
import { Box, Typography, Link } from "@mui/material"
import { EXPANSE_TERMS_OF_SERVICE_SECTIONS } from "../terms-of-service-sections.enum"

export function PrivacyPolicySection({
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
      <Typography component="p" variant="body1">
        We care about data privacy and security. Please review our Privacy
        Policy:{" "}
        <Link href="https://www.expanseservices.com/privacy-policy.html">
          https://www.expanseservices.com/privacy-policy
        </Link>
        . By using the Site, you agree to be bound by our Privacy Policy, which
        is incorporated into these Terms of Use. Please be advised the Site is
        hosted in the United States. If you access the Site from any other
        region of the world with laws or other requirements governing personal
        data collection, use, or disclosure that differ from applicable laws in
        the United States, then through your continued use of the Site, you are
        transferring your data to the United States, and you agree to have your
        data transferred to and processed in the United States.
      </Typography>
    </Box>
  )
}
