import React from "react"
import { Box, Typography, Link } from "@mui/material"

export function HowWeUseInformationPrivacyPolicySection() {
  return (
    <Box>
      <Typography
        variant="h4"
        component="h2"
        mb={2}
        id="how-we-use-information"
      >
        2. HOW DO WE USE YOUR INFORMATION?
      </Typography>
      <Typography component="p" variant="body1" paragraph>
        We collect user information for the purpose of authentication and
        authorization. This information is essential to verify user identities,
        ensuring secure access to our platform and personalized services.
      </Typography>

      <Typography component="p" variant="body1" paragraph>
        Additionally, the collected data plays a crucial role in analyzing user
        interactions and improving the overall user experience. By examining
        user patterns and behaviors, we can enhance our services, tailor
        content, and optimize the functionality of our platform.
      </Typography>

      <Typography component="p" variant="body1" paragraph>
        It&apos;s important to note that the utilization of this information is
        primarily focused on authentication, authorization, and user experience
        enhancement. We are committed to maintaining the privacy and anonymity
        of individual users while leveraging the collected data for these
        specific purposes.
      </Typography>

      <Typography component="p" variant="body1" paragraph>
        Our practices are aligned with legal requirements and privacy
        regulations to ensure the secure and transparent handling of user
        information. We continuously strive to enhance our services and user
        interactions while upholding high standards of data protection.
      </Typography>
    </Box>
  )
}
