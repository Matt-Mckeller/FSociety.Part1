import React from "react"
import { Box, Typography } from "@mui/material"

export function ContactUsSection({ id, title }) {
  return (
    <Box>
      <Typography variant="h4" component="h2" mb={2} id={id}>
        {title}
      </Typography>
      <Typography variant="body1" component="p" paragraph>
        In order to resolve a complaint regarding the Site or to receive further
        information regarding use of the Site, please contact us at:
      </Typography>
      <Typography variant="body1" component="p">
        Expanse Services LLC
        <br />
        United States
        <br />
        Phone: +1 816-739-9473
        <br />
        Email: info@expanseservices.com
      </Typography>
    </Box>
  )
}
