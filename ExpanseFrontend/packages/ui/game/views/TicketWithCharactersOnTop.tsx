"use client"
import { TicketCard } from "expanse.ui/points"
import { Grid } from "@mui/material"
import { CharacterState, StaticCharacter } from "expanse.ui/theme"
import { CharacterPushingBar } from "./CharacterPushingBar"

export const TicketWithCharactersOnTop = () => {
  return (
    <Grid container width={"300px"}>
      <Grid
        item
        zero={3}
        height="100px"
        display={"flex"}
        justifyContent={"flex-start"}
        // alignItems={""}
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
          state={CharacterState.celebration1}
          containerPaddingX={0}
          containerPaddingY={0}
          limbOpacity={0.95}
        />
      </Grid>
      <Grid item zero={12}>
        <TicketCard />
      </Grid>
    </Grid>
  )
}
