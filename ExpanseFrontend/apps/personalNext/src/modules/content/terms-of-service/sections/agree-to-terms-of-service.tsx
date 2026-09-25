import React from "react"
import { Box, Typography, Link } from "@mui/material"
import { EXPANSE_TERMS_OF_SERVICE_SECTIONS } from "../terms-of-service-sections.enum"

export function AgreeToTermsSection({
  id,
  title,
  BusinessName,
}: {
  id: string
  title: string
  BusinessName: string
}) {
  return (
    <Box>
      <Typography variant="h4" component="h2" mb={2} id={id}>
        {title}
      </Typography>
      <Typography variant="body1" component="p" paragraph>
        These Terms of Use constitute a legally binding agreement made between
        you, whether personally or on behalf of an entity (“you”) and{" "}
        {BusinessName} ("Company," “we," “us," or “our”), concerning your access
        to and use of the https://www.expanseservices.com website. As well as
        any other media form, media channel, mobile website or mobile
        application related, linked, or otherwise connected thereto
        (collectively, the “Site”). We are registered in Missouri, United
        States.
      </Typography>
      <Typography variant="body1" component="p" paragraph>
        You agree that by accessing the Site, you have read, understood, and
        agreed to be bound by all of these Terms of Use. IF YOU DO NOT AGREE
        WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM
        USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
      </Typography>
      <Typography variant="body1" component="p" paragraph>
        Supplemental terms and conditions or documents that may be posted on the
        Site from time to time are hereby expressly incorporated herein by
        reference. We reserve the right, in our sole discretion, to make changes
        or modifications to these Terms of Use from time to time. We will alert
        you about any changes by updating the “Last updated” date of these Terms
        of Use, and you waive any right to receive specific notice of each such
        change. Please ensure that you check the applicable Terms every time you
        use our Site so that you understand which Terms apply. You will be
        subject to, and will be deemed to have been made aware of and to have
        accepted, the changes in any revised Terms of Use by your continued use
        of the Site after the date such revised Terms of Use are posted.
      </Typography>
      <Typography variant="body1" component="p" paragraph>
        The information provided on the Site is not intended for distribution to
        or use by any person or entity in any jurisdiction or country where such
        distribution or use would be contrary to law or regulation or which
        would subject us to any registration requirement within such
        jurisdiction or country. Accordingly, those persons who choose to access
        the Site from other locations do so on their own initiative and are
        solely responsible for compliance with local laws, if and to the extent
        local laws are applicable.
      </Typography>
      <Typography variant="body1" component="p" paragraph>
        The Site is not tailored to comply with industry-specific regulations
        (Health Insurance Portability and Accountability Act (HIPAA), Federal
        Information Security Management Act (FISMA), etc.), so if your
        interactions would be subjected to such laws, you may not use this Site.
        You may not use the Site in a way that would violate the
        Gramm-Leach-Bliley Act (GLBA).
      </Typography>
      <Typography variant="body1" component="p" paragraph>
        The Site is intended for users who are at least 18 years old. Persons
        under the age of 18 are not permitted to use or register for the Site.
      </Typography>
    </Box>
  )
}
