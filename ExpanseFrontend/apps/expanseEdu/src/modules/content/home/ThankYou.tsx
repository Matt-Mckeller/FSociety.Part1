"use client"
import { Box } from "@mui/material"
import { SmilingFace } from "expanse.dynamicAssets/lotties/SmilingFace/SmilingFace"

import { useState, useEffect } from "react"
import { Typography } from "@mui/material"
import { HomeContent } from "./HomeContent"

export const ThankYou = () => {
  const content = HomeContent.en.thankYou

  return (
    <Box display="flex" flexDirection={"column"} alignItems={"center"}>
      <Box width="200px">
        <SmilingFace />
      </Box>
      <Typography variant="h6">{content.text}</Typography>
    </Box>
  )
}
