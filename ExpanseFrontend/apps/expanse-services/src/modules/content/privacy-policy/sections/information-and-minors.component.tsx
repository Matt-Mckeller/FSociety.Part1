import React from "react"
import { Box, Typography, Link } from "@mui/material"

export function InformationAndMinorsPrivacyPolicySection() {
  return (
    <Box>
      <Typography
        variant="h4"
        component="h2"
        mb={2}
        id="information-and-minors"
      >
        8. DO WE COLLECT INFORMATION FROM MINORS?
      </Typography>
      <Typography component="p" variant="body1" paragraph>
        In Short: We do not knowingly collect data from or market to children
        under 18 years of age.
      </Typography>

      <Typography component="p" variant="body1" paragraph>
        We do not knowingly solicit data from or market to children under 18
        years of age. By using the Website, you represent that you are at least
        18 or that you are the parent or guardian of such a minor and consent to
        such minor dependent’s use of the Website.
      </Typography>
      <br />
      <Typography component="p" variant="body1" paragraph>
        If we learn that personal information from users less than 18 years of
        age has been collected, we will deactivate the account and take
        reasonable measures to promptly delete such data from our records. If
        you become aware of any data we may have collected from children under
        age 18, please contact us at{" "}
        <Link href="mailto:info@expanseservices.com">
          info@expanseservices.com
        </Link>
      </Typography>
    </Box>
  )
}
