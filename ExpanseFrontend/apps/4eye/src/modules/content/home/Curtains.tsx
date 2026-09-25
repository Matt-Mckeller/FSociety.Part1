"use client"
import { useTranslations } from "next-intl"
import { Box, Typography } from "@mui/material"
import { Crown } from "expanse.dynamicAssets/lotties/Crown/Crown"
import { useEffect, useRef } from "react"
import { Curtains as CurtainsSVG } from "expanse.dynamicAssets/graphics/Curtains"

export const Curtains = () => {
  const t = useTranslations("home.curtains")
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
      <Typography variant="h3">{t("title")}</Typography>
      <Typography variant="body1">{t("body")}</Typography>
    </Box>
  )
}
