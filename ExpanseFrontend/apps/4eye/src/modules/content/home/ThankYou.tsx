"use client"
import { useTranslations } from "next-intl"
import { Box, Typography } from "@mui/material"
import { SmilingFace } from "expanse.dynamicAssets/lotties/SmilingFace/SmilingFace"

export const ThankYou = () => {
  const t = useTranslations("home.thankYou")

  return (
    <Box display="flex" flexDirection={"column"} alignItems={"center"}>
      <Box width="200px">
        <SmilingFace />
      </Box>
      <Typography variant="h6">{t("text")}</Typography>
    </Box>
  )
}
