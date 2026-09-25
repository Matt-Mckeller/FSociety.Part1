import React from "react"
import { Box, Typography, Link } from "@mui/material"

export function SocialLoginsPrivacyPolicySection() {
  return (
    <Box>
      <Typography variant="h4" component="h2" mb={2} id="social-logins">
        5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
      </Typography>
      <Typography component="p" variant="body1" paragraph>
        In Short: If you choose to register or log in to our services using a
        social media account, we may have access to certain information about
        you.
      </Typography>
      <Typography component="p" variant="body1" paragraph>
        Our Website offers you the ability to register and login using your
        third-party social media account details (like your Facebook or Twitter
        logins). Where you choose to do this, we will receive certain profile
        information about you from your social media provider. The profile
        information we receive may vary depending on the social media provider
        concerned, but will often include your name, email address, friends
        list, profile picture as well as other information you choose to make
        public on such social media platforms. We will use the information we
        receive only for the purposes that are described in this privacy notice
        or that are otherwise made clear to you on the relevant Website.
      </Typography>
      <Typography component="p" variant="body1" paragraph>
        Please note that we do not control, and are not responsible for, other
        uses of your personal information by your third-party social media
        provider. We recommend that you review their privacy notice to
        understand how they collect, use and share your personal information,
        and how you can set your privacy preferences on their sites and apps.
      </Typography>
    </Box>
  )
}
