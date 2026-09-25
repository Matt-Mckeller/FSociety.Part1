import { useTheme } from "@mui/material"
import {
  CharacterCelebration1,
  CharacterCelebration2,
  CharacterForwardStanding,
  CharacterLeftStanding,
  CharacterRightPushing,
  CharacterRightStanding,
} from "."
import { CharacterTemp } from "./CharacterTemp.component"

export enum CharacterState {
  forwardStanding = "forwardStanding",
  rightPushing = "pushingRight",
  leftStanding = "leftStanding",
  rightStanding = "rightStanding",
  celebration1 = "celebration1",
  celebration2 = "celebration2",
}
export const StaticCharacter = ({
  state = CharacterState.forwardStanding,
  // containerPaddingX = 0,
  // containerPaddingY = 0,
  // limbOpacity = 1,
  enableTestingBorders,
}: {
  state: CharacterState
  containerPaddingX?: number
  containerPaddingY?: number
  limbOpacity?: number
  enableTestingBorders?: boolean
}): React.ReactElement => {
  const theme = useTheme()
  switch (state) {
    case CharacterState.forwardStanding:
      return (
        <CharacterForwardStanding
          // containerPaddingX={containerPaddingX}
          // containerPaddingY={containerPaddingY}
          // limbOpacity={limbOpacity}
          enableTestingBorders={enableTestingBorders}
        ></CharacterForwardStanding>
      )
    case CharacterState.rightPushing:
      return <CharacterTemp></CharacterTemp>
    case CharacterState.leftStanding:
      return <CharacterLeftStanding></CharacterLeftStanding>
    case CharacterState.rightStanding:
      return <CharacterRightStanding></CharacterRightStanding>
    case CharacterState.celebration1:
      return <CharacterCelebration1></CharacterCelebration1>
    case CharacterState.celebration2:
      return <CharacterCelebration2></CharacterCelebration2>
    default:
      throw new Error(
        "Must provide character state to static character component",
      )
  }
}
