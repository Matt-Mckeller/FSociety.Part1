"use client"
import { Box, Typography } from "@mui/material"
import { HomeContent } from "./HomeContent"
import { ExpandingCirclesAnimation } from "expanse.dynamicAssets/shapes"

export const GamificationEngagement = () => {
  const content = HomeContent.en.gamificationEngagement
  return (
    <Box display="flex" flexDirection={"column"} alignItems={"center"}>
      <Box
        width="300px"
        height="200px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <ExpandingCirclesAnimation
          leftCircle={{
            size: 150,
            color: "",
            text: content.animation.left,
            textColor: "",
          }}
          rightCircle={{
            size: 150,
            color: "",
            text: content.animation.right,
            textColor: "",
          }}
          mainCircle={{
            size: 200,
            color: "",
            text: "",
            textColor: "",
          }}
          spacing={50}
          initialFontSize={24}
          combinedFontSize={21}
          moveDuration={2}
          textArray={content.animation.center}
        />
      </Box>
      <Typography variant="h3" mb={2}>
        {content.title}
      </Typography>
      <Typography variant="body1">{content.body}</Typography>
    </Box>
  )
}
