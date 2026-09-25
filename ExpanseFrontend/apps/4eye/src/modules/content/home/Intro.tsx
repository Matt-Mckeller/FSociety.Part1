"use client"
import { useTranslations } from "next-intl"
import { Box, Grid, Typography } from "@mui/material"
import { ExpanseLogo } from "expanse.dynamicAssets/logo"
import { CharacterPushingBar, WalkingCharacter } from "expanse.ui/game"
import {
  StaticCharacter,
  CharacterState,
  SectionSpacer,
  CharacterPositionProvider,
} from "expanse.ui/theme"

export const Intro = () => {
  const t = useTranslations("home.intro")
  return (
    <Box display="flex" flexDirection={"column"} alignItems={"center"}>
      {/* <SectionSpacer size="large" />
      <SectionSpacer size="large" />
      <CharacterPositionProvider>
        <WalkingCharacter />
      </CharacterPositionProvider>
      <SectionSpacer size="large" /> */}
      <Grid container width={"300px"}>
        <Grid
          item
          zero={3}
          height="100px"
          display={"flex"}
          justifyContent={"flex-start"}
        >
          <StaticCharacter
            state={CharacterState.forwardStanding}
            containerPaddingX={0}
            containerPaddingY={0}
            limbOpacity={0.95}
          />
        </Grid>
        <Grid
          item
          zero={6}
          height="100px"
          display={"flex"}
          justifyContent={"center"}
          sx={{ transform: "scale(1.05)" }}
        >
          <CharacterPushingBar />
        </Grid>
        <Grid
          item
          zero={3}
          height="100px"
          display={"flex"}
          justifyContent={"flex-end"}
          sx={{ transform: "scale(1.05)" }}
        >
          <StaticCharacter
            state={CharacterState.celebration2}
            containerPaddingX={0}
            containerPaddingY={0}
            limbOpacity={0.95}
          />
        </Grid>
      </Grid>
      <Box mt={4}>
        <Typography
          fontWeight="bold"
          variant="h4"
          align="center"
          sx={{ fontSize: { zero: "1rem", tablet: "1.5rem" } }}
        >
          {t("title")}
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ fontSize: { zero: "1rem", tablet: "1.5rem" } }}
        >
          {t("body")}
        </Typography>
      </Box>
    </Box>
  )
}

export default Intro
