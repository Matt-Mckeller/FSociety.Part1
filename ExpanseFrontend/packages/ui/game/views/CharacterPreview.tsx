"use client"

import { CharacterState, StaticCharacter } from "expanse.ui/theme"
import { Grid } from "@mui/material"

export const CharacterPreview = () => {
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
        zero={3}
        sx={{ display: "flex", justifyContent: "center", maxHeight: "250px" }}
      >
        <StaticCharacter
          state={CharacterState.forwardStanding}
          containerPaddingX={5}
          containerPaddingY={5}
          limbOpacity={0.95}
          enableTestingBorders={true}
        />
      </Grid>
      <Grid
        zero={3}
        // tablet={6}
        sx={{ display: "flex", justifyContent: "center", maxHeight: "250px" }}
      >
        <StaticCharacter
          state={CharacterState.leftStanding}
          containerPaddingX={0}
          containerPaddingY={0}
          limbOpacity={0.95}
        />
      </Grid>
      <Grid
        zero={3}
        sx={{ display: "flex", justifyContent: "center", maxHeight: "250px" }}
      >
        <StaticCharacter
          state={CharacterState.rightStanding}
          containerPaddingX={0}
          containerPaddingY={0}
          limbOpacity={0.95}
        />
      </Grid>
      <Grid
        zero={3}
        // tablet={6}
        sx={{ display: "flex", justifyContent: "center", maxHeight: "250px" }}
      >
        <StaticCharacter
          state={CharacterState.rightPushing}
          containerPaddingX={5}
          containerPaddingY={5}
          limbOpacity={0.95}
        />
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
        />
      </Grid>
      <Grid
        zero={3}
        sx={{ display: "flex", justifyContent: "center", maxHeight: "250px" }}
      >
        <StaticCharacter
          state={CharacterState.celebration2}
          containerPaddingX={5}
          containerPaddingY={5}
          limbOpacity={0.95}
        />
      </Grid>
    </Grid>
  )
}
