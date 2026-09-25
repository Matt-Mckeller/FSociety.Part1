"use client"
import { Box, Grid, Typography } from "@mui/material"
import { HomeContent } from "./HomeContent"
import { GlobalThumbsUpBoy } from "expanse.dynamicAssets/lotties/GlobalThumbsUp/GlobalThumbsUpBoy"

export const Audience = () => {
  const content = HomeContent.en.audience
  return (
    <Box display="flex" flexDirection={"column"} alignItems={"center"}>
      <Grid container>
        <Grid item zero={12} tablet={3} display="flex" justifyContent="center">
          <Box width="100%" maxWidth="200px" mt={4}>
            <GlobalThumbsUpBoy />
          </Box>
        </Grid>
        <Grid
          item
          zero={12}
          tablet={9}
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          <Typography variant="h2" mb={4}>
            {content.title}
          </Typography>

          <Typography variant="body1">{content.body}</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
