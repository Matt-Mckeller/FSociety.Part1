"use client"
import { Grid, Icon, Typography, useMediaQuery } from "@mui/material"
import { Box, Theme, useTheme } from "@mui/system"
import { ExpandingCircleContainer } from "expanse.dynamicAssets/shapes"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import DesignServicesIcon from "@mui/icons-material/DesignServices"
import LoopIcon from "@mui/icons-material/Loop"
import processContent from "../processContent.json" // Import the JSON file

interface Process3StepsProps {
  Icon1?: React.ReactElement
  Icon2?: React.ReactElement
  Icon3?: React.ReactElement
}

interface StepItemProps {
  Icon: React.ReactElement
  zero: number
  color: string
}

const GraphicGridItem = ({ Icon, zero, color }: StepItemProps) => {
  const theme = useTheme()
  return (
    <Grid
      item
      zero={zero}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <ExpandingCircleContainer
        // middleCircleColor={theme.palette.background.default}
        // outerCircleColor={theme.palette.text.primary}
        // innerCircleColor={theme.palette.text.primary}
        middleCircleColor={theme.palette.background.default}
        outerCircleColor={color}
        innerCircleColor={color}
        width="100px"
        height="100px"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {Icon}
        </Box>
      </ExpandingCircleContainer>
    </Grid>
  )
}

export const ThreeStepProcess = ({
  Icon1,
  Icon2,
  Icon3,
}: Process3StepsProps) => {
  const threeStepProcessParagraphs =
    processContent.threeStepProcess.descriptionParagraphs // Correctly reference the JSON structure
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("tablet"),
  )
  const { headings, subHeadings } = isMobile
    ? processContent.threeStepProcess.graphicHeadings.mobile
    : processContent.threeStepProcess.graphicHeadings.desktop

  const theme = useTheme()
  const color =
    theme.palette.mode === "dark"
      ? theme.palette.text.primary
      : theme.palette.primary.dark

  Icon1 = Icon1 || <PlaylistAddIcon style={{ color }} />
  Icon2 = Icon2 || <DesignServicesIcon style={{ color }} />
  Icon3 = Icon3 || <LoopIcon style={{ color }} />

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent={"center"}
      alignItems="center"
    >
      <Grid container width="100%" mb={8}>
        <GraphicGridItem Icon={Icon1} zero={4} color={color} />
        <GraphicGridItem Icon={Icon2} zero={4} color={color} />
        <GraphicGridItem Icon={Icon3} zero={4} color={color} />
        {headings.map((heading, index) => (
          <Grid item zero={4} textAlign="center" mt={4} key={index}>
            <Typography variant="h3" fontSize="1.3rem">
              {heading}
            </Typography>
          </Grid>
        ))}
        {subHeadings.map((subHeading, index) => (
          <Grid item zero={4} textAlign="center" key={index}>
            <Typography>{subHeading}</Typography>
          </Grid>
        ))}
      </Grid>
      <Box width="100%">
        {threeStepProcessParagraphs.map((paragraph, index) => (
          <Typography key={index} variant="body1" mb={index === 0 ? 2 : 0}>
            {paragraph}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}
