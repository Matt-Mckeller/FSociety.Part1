"use client"
import { Box, Typography } from "@mui/material"
import { Crown } from "expanse.dynamicAssets/lotties/Crown/Crown"
import { useEffect, useRef } from "react"
import { HomeContent } from "./HomeContent"
import { Curtains as CurtainsSVG } from "expanse.dynamicAssets/graphics/Curtains"

export const Curtains = () => {
  const content = HomeContent.en.curtains
  return (
    <Box display="flex" flexDirection={"column"} alignItems={"center"}>
      <Box width="300px" position="relative">
        <Box
          position="absolute"
          top={-117}
          left={20}
          sx={{ transform: "scale(0.5)" }}
        >
          <Crown />
        </Box>
        <Box>
          <CurtainsSVG />
        </Box>
      </Box>
      <Typography variant="h3">{content.title}</Typography>
      <Typography variant="body1">{content.body}</Typography>
    </Box>
  )
}
