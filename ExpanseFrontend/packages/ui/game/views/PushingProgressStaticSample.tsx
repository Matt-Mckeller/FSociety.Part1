"use client"

import { CharacterState, ProgressBar, StaticCharacter } from "expanse.ui/theme"
import { Box, Grid } from "@mui/material"
import { CharacterPushingBar } from "./CharacterPushingBar"

export const PushingProgressStaticSample = () => {
  return (
    <Grid container>
      <Grid
        zero={3}
        sx={{ display: "flex", justifyContent: "center", maxHeight: "250px" }}
      >
        <StaticCharacter
          state={CharacterState.forwardStanding}
          containerPaddingX={0}
          containerPaddingY={0}
          limbOpacity={0.95}
        />
      </Grid>
      <Grid
        zero={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: "250px",
          position: "relative",
          transform: "scale(2.5)",
        }}
      >
        <CharacterPushingBar />
      </Grid>
      <Grid
        zero={3}
        sx={{ display: "flex", justifyContent: "center", maxHeight: "250px" }}
      >
        <StaticCharacter
          state={CharacterState.celebration1}
          containerPaddingX={5}
          containerPaddingY={5}
          limbOpacity={0.95}
          enableTestingBorders={true}
        />
      </Grid>
    </Grid>
  )
}
