import React from "react"
import { Box, Typography, Link } from "@mui/material"
import { EXPANSE_TERMS_OF_SERVICE_SECTIONS } from "../terms-of-service-sections.enum"

export function TermsAndTerminationSection({
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
        These Terms of Use shall remain in full force and effect while you use
        the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF USE, WE
        RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR
        LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING
        CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON,
        INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY,
        OR COVENANT CONTAINED IN THESE TERMS OF USE OR OF ANY APPLICABLE LAW OR
        REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SITE OR
        DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT
        ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
      </Typography>
      <Typography variant="body1" component="p" paragraph>
        If we terminate or suspend your account for any reason, you are
        prohibited from registering and creating a new account under your name,
        a fake or borrowed name, or the name of any third party, even if you may
        be acting on behalf of the third party. In addition to terminating or
        suspending your account, we reserve the right to take appropriate legal
        action, including without limitation pursuing civil, criminal, and
        injunctive redress.
      </Typography>
    </Box>
  )
}
