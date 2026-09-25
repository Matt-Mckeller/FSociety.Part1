"use client"
import { Box } from "@mui/system"
import { Grid } from "@mui/material"
import { DemoEdLinkIntegrationStudentView } from "./DemoViews/DemoEdLinkIntegrationStudentView"

export const StudentLandingPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignSelf="stretch"
    >
      <Grid container spacing={16}>
        <Grid
          item
          zero={12}
          tablet={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <DemoEdLinkIntegrationStudentView />
        </Grid>
      </Grid>
    </Box>
  )
}
