"use client"
import { Box, Grid, Typography } from "@mui/material"
import { HomeContent } from "./HomeContent"
import { AngelWingsHalo } from "expanse.dynamicAssets/lotties/AngelWingsHalo/AngelWingsHalo"
import { RocketLaunch } from "expanse.dynamicAssets/lotties/RocketLaunch/RocketLaunch"

export const Goals = () => {
  const content = HomeContent.en.additionalGoals
  return (
    <Box display="flex" flexDirection={"column"} alignItems={"center"}>
      <Grid container>
        <Grid item zero={12} tablet={12} display="flex" justifyContent="center">
          <Box maxWidth="150px">
            {/* <AngelWingsHalo /> */}
            <RocketLaunch />
          </Box>
        </Grid>
        <Grid item zero={12} tablet={12} display="flex" justifyContent="center">
          <Typography variant="h2" mb={4}>
            {content.title}
          </Typography>
        </Grid>
        <Grid item zero={12} pb={4}>
          <Box component="ul" sx={{ paddingLeft: 5 }}>
            {content.details.map((goal, index) => (
              <Box component="li" key={index} sx={{ marginBottom: 1 }}>
                <Typography variant="body1" fontWeight="600">
                  {goal.label}:{" "}
                  <Typography variant="body1" component="span">
                    {goal.body}
                  </Typography>
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
