"use client"
import { Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import {
  ExpanseLogo,
  LighteningCloud,
  SpiralBrowserScreen,
  WebAndMobileAppScreens,
} from "expanse.dynamicAssets"
import React from "react"
import { SectionSpacer } from "expanse.ui/theme"
import { ScreenshotWrapper } from "../components/ScreenShotWrapper"

export function LinkedInBanner() {
  const containerWidth = 1584
  const containerHeight = 396
  const contentAreaMargin = containerHeight / 10
  const contentAreaHeight = containerHeight - contentAreaMargin * 2
  const contentAreaWidth = containerWidth - contentAreaMargin * 2
  const contentAreaBorderWidth = 3
  const standingImageHeight = contentAreaHeight - contentAreaMargin
  const standingImageYMargin =
    contentAreaHeight - standingImageHeight - contentAreaBorderWidth * 2 + "px"
  const containerMargin = containerHeight / 10 // Apply 10% Margin, Margin used because html2canvas was ignoring flex
  const graphicHeight = (containerHeight - containerMargin * 2) / 3
  const graphicSpacing = 8
  return (
    <ScreenshotWrapper
      screenshotHeight={containerHeight}
      screenshotWidth={containerWidth}
      fileExtension="jpg"
      assetName="LinkedInBanner"
    >
      <Box
        display="flex"
        sx={{
          border: `${contentAreaBorderWidth}px solid black`,
          borderRadius: "5px",
          m: contentAreaMargin + "px",
          height: contentAreaHeight,
          width: contentAreaWidth,
        }}
      >
        <Box flexGrow={1} display="flex" flexDirection="row">
          <Box name="leftMiddleContainer">left</Box>
          <Box
            flexGrow={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography
              variant="h2"
              textAlign="center"
              // fontWeight="bold"
              fontSize="2.5rem"
              mt={contentAreaMargin / 2 + "px"}
            >
              Matthew Mckeller
            </Typography>
            <SectionSpacer size="xs"></SectionSpacer>
            <Box display="flex">
              <Box flexGrow={1}></Box>
              <Grid container spacing={graphicSpacing}>
                <Grid item>
                  <Box sx={{ height: graphicHeight }}>
                    <WebAndMobileAppScreens></WebAndMobileAppScreens>
                  </Box>
                  <Typography fontWeight="bold" textAlign="center">
                    Web Applications
                  </Typography>
                </Grid>
                <Grid item>
                  <Box sx={{ height: graphicHeight }}>
                    <LighteningCloud />
                  </Box>
                  <Typography fontWeight="bold" textAlign="center">
                    APIs & Integrations
                  </Typography>
                </Grid>
                <Grid item>
                  <Box sx={{ height: graphicHeight }}>
                    <SpiralBrowserScreen />
                  </Box>
                  <Typography fontWeight="bold" textAlign="center">
                    Web Development
                  </Typography>
                </Grid>
              </Grid>
              <Box flexGrow={1}></Box>
            </Box>
            <SectionSpacer size="xs"></SectionSpacer>
            <Box display="flex" flexDirection="column" alignItems={"center"}>
              <Typography variant="h2" fontSize="1.5rem">
                React, GraphQL, Restful APIs, TypeScript
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Box
                  width="27px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <ExpanseLogo></ExpanseLogo>
                </Box>
                <Typography variant="h2" fontSize="1.5rem">
                  www.expanseservices.com
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>right</Box>
        </Box>
        <Box
          sx={{
            marginTop: standingImageYMargin,
          }}
        >
          <Box
            component="img"
            src={"/assets/MattProfileStanding_229x1039.png"}
            sx={{
              // width: profileImageSize,
              // minWidth: profileImageSize,
              // maxWidth: profileImageSize,
              height: standingImageHeight,
              minHeight: standingImageHeight,
              maxHeight: standingImageHeight,
              // borderRadius: "6%",
            }}
          />
        </Box>
      </Box>
      {/* <Typography variant="h2" fontSize="1.5rem">
            Request Quote
          </Typography> */}
    </ScreenshotWrapper>
  )
}
