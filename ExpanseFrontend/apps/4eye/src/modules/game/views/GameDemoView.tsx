"use client"
import { Box } from "@mui/system"
import {
  ProfileDisplay,
  ProgressBarPreview,
  CharacterPreview,
  PushingProgressStaticSample,
  TicketEventSampleDisplay,
  TicketWithCharactersOnTop,
  EventsTempContext,
  ProgressContext,
  ExperienceProgressBar,
} from "expanse.ui/game"
import { Button, Grid, Typography } from "@mui/material"
import { ChestOpening1Animation } from "expanse.dynamicAssets/lotties/ChestOpening1/ChestOpening1Animation"
import { useCallback, useContext, useEffect, useRef } from "react"
import { RewardEventsTable } from "../components"
import { DemoCompleteEventButtons } from "./DemoViews/DemoCompleteEventButtons.component"
import { DemoEdLinkIntegrationView } from "./DemoViews/DemoEdLinkIntegrationView"
import { DemoEdLinkIntegrationStudentView } from "./DemoViews/DemoEdLinkIntegrationStudentView"

export default function GameDemoView() {
  const playOpenChestAnimation = () => {
    console.log("do open chest")
  }
  const { addManualExperience } = useContext(ProgressContext)
  const chestAnimationRef = useRef<any>(null)
  const handlePlayOpenChestAnimation = useCallback(() => {
    if (chestAnimationRef.current) {
      chestAnimationRef.current.playAnimation()
    }
  }, [])

  const handleAnimationComplete = useCallback(() => {
    console.log("Chest Animation Complete")
  }, [])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     addManualExperience(10)
  //   }, 2100)

  //   return () => clearInterval(interval)
  // }, [addManualExperience])

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignSelf="stretch"
    >
      <Grid container spacing={16}>
        <Grid
          item
          zero={6}
          tablet={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <TicketEventSampleDisplay></TicketEventSampleDisplay>
        </Grid>
        <Grid
          item
          zero={6}
          tablet={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {/* <ExperienceProgressBar aspectRatio={6}></ExperienceProgressBar> */}
        </Grid>
        <Grid
          item
          zero={6}
          tablet={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <ProfileDisplay></ProfileDisplay>
        </Grid>
        <Grid
          item
          zero={12}
          tablet={12}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Typography>Backend EdLink Demo Section</Typography>
          {/* <DemoEdLinkIntegrationView /> */}
        </Grid>
        <Grid
          item
          zero={12}
          tablet={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography>Student EdLink Demo Section</Typography>
          <DemoEdLinkIntegrationStudentView />
        </Grid>
        <Grid
          item
          zero={12}
          tablet={12}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <DemoCompleteEventButtons></DemoCompleteEventButtons>
        </Grid>

        <Grid
          item
          zero={12}
          tablet={12}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <RewardEventsTable></RewardEventsTable>
        </Grid>
        <Grid
          item
          zero={12}
          tablet={12}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <ChestOpening1Animation
            ref={chestAnimationRef}
            onComplete={handleAnimationComplete}
            maxWidth="500px"
            width="100%"
          />
          <Button onClick={handlePlayOpenChestAnimation}>Play Animation</Button>
          {/* <ChestOpening1Animation playAnimation={playOpenChestAnimation} /> */}
        </Grid>
        <Grid
          item
          zero={12}
          // tablet={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <ProgressBarPreview></ProgressBarPreview>
        </Grid>
        <Grid
          item
          zero={12}
          // height="250px"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <CharacterPreview />
        </Grid>
        <Grid
          item
          zero={12}
          // height="250px"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <PushingProgressStaticSample />
        </Grid>
        <Grid item zero={12} sx={{ display: "flex", justifyContent: "center" }}>
          <TicketWithCharactersOnTop />
        </Grid>
      </Grid>
    </Box>
  )
}
