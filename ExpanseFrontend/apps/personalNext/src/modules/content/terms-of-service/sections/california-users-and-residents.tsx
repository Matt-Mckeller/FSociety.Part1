import React from "react"
import { Box, Typography, Link } from "@mui/material"
import { EXPANSE_TERMS_OF_SERVICE_SECTIONS } from "../terms-of-service-sections.enum"

export function CaliforniaUsersAndResidentsSection({
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
        id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.CALIFORNIA_USERS_AND_RESIDENTS}
      >
        {title}
      </Typography>
      <Typography variant="body1" component="p">
        If any complaint with us is not satisfactorily resolved, you can contact
        the Complaint Assistance Unit of the Division of Consumer Services of
        the California Department of Consumer Affairs in writing at 1625 North
        Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone
        at (800) 952-5210 or (916) 445-1254.
      </Typography>
    </Box>
  )
}
