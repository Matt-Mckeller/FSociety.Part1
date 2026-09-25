"use client"
import {
  Box,
  Button,
  MobileStepper,
  Paper,
  StepButton,
  StepConnector,
  Typography,
} from "@mui/material"
import { HomeContent } from "./HomeContent"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import { height, textAlign, useMediaQuery, useTheme } from "@mui/system"
import React from "react"
import { formatContentMarkdown } from "expanse.ui/application"

/*

In a world of instant gratification, the rewards of education can seem distant and abstract. We are competing with the allure of immediate pleasure, the dopamine rush of likes and modern entertainment. We must make learning an experience that is equally engaging, equally rewarding, and equally relevant to their lives, or we risk losing them to the siren call of instant entertainment.
Expanse gives you the tools to fight back.

A mind clouded by doubt cannot soar. Negative beliefs about oneself, clip the wings of potential. We must nurture self-belief and empower our students to see the incredible possibilities that lie within them.
Expanse helps student’s understand and recognize their growth and potential.

Empty desks tell a story of unmet needs. When students struggle to focus, lack a sense of purpose, or face challenges with their mental, emotional, or physical well-being school becomes a battleground, not a place of learning. Their absence is a cry for help – a signal that we must do more to support them and prevent them from falling through the cracks.
Expanse empowers students to focus their attention, discover their purpose, and believe in their ability to succeed.

*/
export const ProblemSolutionStorySlider = () => {
  const content = HomeContent.en.problemSolutionStory
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = content.length

  // const mobileSmall = useMediaQuery(theme.breakpoints.down("mobileL"))
  // const mobile = useMediaQuery(theme.breakpoints.down("tablet"))
  // const tablet = useMediaQuery(theme.breakpoints.up("tablet"))
  // const laptop = useMediaQuery(theme.breakpoints.up("laptop"))
  // const textAlign = mobile ? "left" : "center"

  // const height = laptop
  //   ? 300
  //   : tablet && !laptop
  //     ? 350
  //     : mobile && !mobileSmall
  //       ? 450
  //       : mobileSmall
  //         ? 550
  // : 550

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <Box
      sx={{
        width: "100%",
        // background:
        //   theme.palette.mode === "light"
        //     ? theme.palette.background.light
        //     : null,
        // backgroundImage:
        //   theme.palette.mode === "dark"
        //     ? "linear-gradient(rgba(255,255,255, 0.05), rgba(255,255,255, 0.05))"
        //     : null,
        // height,
        background:
          theme.palette.mode === "light"
            ? theme.palette.background.light
            : null,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        borderRadius: "21px",
        pt: 8,
        pl: 8,
        pr: 8,
      }}
    >
      <Box display="flex" flexGrow={1} flexDirection="column">
        <Typography variant="h2" mb={4}>
          {content[activeStep].title}
        </Typography>
      </Box>
      <Box display="flex" flexGrow={1} flexDirection="column">
        <Box
          pb={2}
          textAlign={"left"}
          flexBasis="40%"
          display="flex"
          flexDirection="column"
          // alignItems="center"
        >
          {content[activeStep].paragraphs.map((paragraph, index) => (
            <Typography key={index} variant="body1" mt={index > 0 ? 4 : 0}>
              {formatContentMarkdown(paragraph, 600)}
            </Typography>
          ))}
        </Box>
      </Box>
      <MobileStepper
        // variant="text"
        sx={{
          // background:
          //   theme.palette.mode === "light"
          //     ? theme.palette.background.light
          //     : null,
          // backgroundImage:
          //   theme.palette.mode === "dark"
          //     ? "linear-gradient(rgba(255,255,255, 0.05), rgba(255,255,255, 0.05))"
          //     : null,
          background:
            theme.palette.mode === "light"
              ? theme.palette.background.light
              : null,
          borderBottomRightRadius: 21,
          borderBottomLeftRadius: 21,
        }}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  )
}
