"use client"

import { Box, Grid, Typography } from "@mui/material"
import { ProgressBar } from "expanse.ui/theme"
import { useCallback, useEffect, useRef, useState } from "react"

export const ProgressBarPreview = () => {
  const [animatedPercent, setAnimatedPercent] = useState(0)
  useEffect(() => {
    const timeoutDuration = animatedPercent === 100 ? 1000 : 100
    const timeoutId = setTimeout(() => {
      setAnimatedPercent(animatedPercent === 100 ? 0 : animatedPercent + 1)
    }, timeoutDuration)

    // Cleanup function to clear the timeout on unmount or state change
    return () => clearTimeout(timeoutId)
  }, [animatedPercent]) // Trigger effect on count change

  return (
    <Grid container>
      <Grid
        zero={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography>0%</Typography>
        <Box sx={{ maxHeight: "50px" }}>
          <ProgressBar aspectRatio={4} percentFilled={0}></ProgressBar>
        </Box>
      </Grid>
      <Grid
        zero={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography>33%</Typography>
        <Box sx={{ maxHeight: "50px" }}>
          <ProgressBar aspectRatio={4} percentFilled={0.33}></ProgressBar>
        </Box>
      </Grid>
      <Grid
        zero={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography>50%</Typography>
        <Box sx={{ maxHeight: "50px" }}>
          <ProgressBar aspectRatio={4} percentFilled={0.5}></ProgressBar>
        </Box>
      </Grid>
      <Grid
        zero={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography>75%</Typography>
        <Box sx={{ maxHeight: "50px" }}>
          <ProgressBar aspectRatio={4} percentFilled={0.75}></ProgressBar>
        </Box>
      </Grid>
      <Grid
        zero={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography>100%</Typography>
        <Box sx={{ maxHeight: "50px" }}>
          <ProgressBar aspectRatio={4} percentFilled={1}></ProgressBar>
        </Box>
      </Grid>
      <Grid
        zero={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography>{animatedPercent}%</Typography>
        <Box sx={{ maxHeight: "50px" }}>
          <ProgressBar
            aspectRatio={4}
            percentFilled={animatedPercent / 100}
          ></ProgressBar>
        </Box>
      </Grid>
    </Grid>
  )
}
