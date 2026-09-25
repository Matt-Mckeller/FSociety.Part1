"use client"
import { useTranslations } from "next-intl"
import { Box, Grid, Typography } from "@mui/material"
import { GlobalThumbsUpBoy } from "expanse.dynamicAssets/lotties/GlobalThumbsUp/GlobalThumbsUpBoy"

export const Audience = () => {
  const t = useTranslations("home.audience")
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
            {t("title")}
          </Typography>

          <Typography variant="body1">{t("body")}</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
