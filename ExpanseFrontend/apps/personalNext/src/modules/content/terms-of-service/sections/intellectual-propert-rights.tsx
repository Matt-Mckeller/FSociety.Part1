import React from "react"
import { Box, Typography, Link } from "@mui/material"
import { EXPANSE_TERMS_OF_SERVICE_SECTIONS } from "../terms-of-service-sections.enum"

export function IntellectualPropertyRightsSection({
  id,
  title,
}: {
  id: string
  title: string
}) {
  return (
    <Box>
      <Typography
        variant="h4"
        component="h2"
        mb={2}
        id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.INTELLECTUAL_PROPERTY_RIGHTS}
      >
        {title}
      </Typography>
      <Typography component="p" variant="body1">
        Unless otherwise indicated, the Site is our proprietary property and all
        source code, databases, functionality, software, website designs, audio,
        video, text, photographs, and graphics on the Site (collectively, the
        “Content”) and the trademarks, service marks, and logos contained
        therein (the “Marks”) are owned or controlled by us or licensed to us,
        and are protected by copyright and trademark laws and various other
        intellectual property rights and unfair competition laws of the United
        States, international copyright laws, and international conventions. The
        Content and the Marks are provided on the Site “AS IS” for your
        information and personal use only. Except as expressly provided in these
        Terms of Use, no part of the Site and no Content or Marks may be copied,
        reproduced, aggregated, republished, uploaded, posted, publicly
        displayed, encoded, translated, transmitted, distributed, sold,
        licensed, or otherwise exploited for any commercial purpose whatsoever,
        without our express prior written permission.
      </Typography>
      <Typography variant="body1" component="p">
        Provided that you are eligible to use the Site, you are granted a
        limited license to access and use the Site and to download or print a
        copy of any portion of the Content to which you have properly gained
        access solely for your personal, non-commercial use. We reserve all
        rights not expressly granted to you in and to the Site, the Content and
        the Marks.
      </Typography>
    </Box>
  )
}
