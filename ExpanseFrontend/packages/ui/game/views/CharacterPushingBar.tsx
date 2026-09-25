import { Box } from "@mui/system"
import { StaticCharacter, CharacterState, ProgressBar } from "../../theme"

export const CharacterPushingBar = () => {
  // Need to figure out the best way to handle sizing for this component
  // For now I plan on utilizing transform: scale(#) to handle the sizing
  const totalHeight = 100
  const totalWidth = 100
  const barHeight = 20

  return (
    <Box
      width={totalWidth}
      height={totalHeight}
      position="relative"
      display="flex"
      justifyContent="center"
    >
      <Box
        sx={{
          position: "absolute",
          width: totalWidth,
          height: totalHeight,
        }}
      >
        <Box
          sx={{
            height: barHeight,
            transform: "translateY(25px)",
          }}
        >
          <ProgressBar
            aspectRatio={5}
            percentFilled={0.66}
            displayPercentFilled={false}
          />
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          height: totalHeight,
          width: totalWidth,
          left: 10,
        }}
      >
        <StaticCharacter
          state={CharacterState.rightPushing}
          containerPaddingX={5}
          containerPaddingY={5}
          limbOpacity={0.95}
          enableTestingBorders={true}
        />
      </Box>
    </Box>
  )
}
