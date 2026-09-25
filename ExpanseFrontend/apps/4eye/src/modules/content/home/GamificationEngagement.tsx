"use client"
import { useTranslations } from "next-intl"
import { Box, Typography } from "@mui/material"
import { ExpandingCirclesAnimation } from "expanse.dynamicAssets/shapes"

export const GamificationEngagement = () => {
  const t = useTranslations("home.gamificationEngagement")
  const animation = t.raw("animation") as {
    left: string
    right: string
    center: string[]
  }

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
            text: animation.left,
            textColor: "",
          }}
          rightCircle={{
            size: 150,
            color: "",
            text: animation.right,
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
          textArray={animation.center}
        />
      </Box>
      <Typography variant="h3" mb={2}>
        {t("title")}
      </Typography>
      <Typography variant="body1">{t("body")}</Typography>
    </Box>
  )
}
