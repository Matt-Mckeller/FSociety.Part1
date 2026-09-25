import React from "react"
import { Box, Typography, Link } from "@mui/material"
import { EXPANSE_TERMS_OF_SERVICE_SECTIONS } from "../terms-of-service-sections.enum"

export function UserDataSection({ id, title }: { id: string; title: string }) {
  return (
    <Box>
      <Typography variant="h4" component="h2" mb={2} id={id}>
        {title}
      </Typography>
      <Typography variant="body1" component="p">
        We will maintain certain data that you transmit to the Site for the
        purpose of managing the performance of the Site, as well as data
        relating to your use of the Site. You are solely responsible for all
        data that you transmit or that relates to any activity you have
        undertaken using the Site. You agree that we shall have no liability to
        you for any loss or corruption of any such data, and you hereby waive
        any right of action against us arising from any such loss or corruption
        of such data.
      </Typography>
    </Box>
  )
}
