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
import { Email, LocationOn, Person3, Phone, Work } from "@mui/icons-material"

export function BusinessCardFront() {
  const containerWidth = 3500 / 4
  const containerHeight = 2000 / 4
  const contentAreaMargin = containerHeight / 10
  const contentAreaHeight = containerHeight - contentAreaMargin * 2
  const contentAreaWidth = containerWidth - contentAreaMargin * 2
  const contentAreaBorderWidth = 3
  const profileImageSize = containerHeight / 3
  const standingImageHeight = contentAreaHeight - contentAreaMargin
  const standingImageYMargin =
    contentAreaHeight - standingImageHeight - contentAreaBorderWidth * 2 + "px"
  const containerMargin = containerHeight / 10 // Apply 10% Margin, Margin used because html2canvas was ignoring flex
  const graphicHeight = (containerHeight - containerMargin * 2) / 6
  const graphicSpacing = 8
  return (
    <ScreenshotWrapper
      screenshotHeight={containerHeight}
      screenshotWidth={containerWidth}
      fileExtension="jpg"
      assetName="LinkedInBanner"
    >
      <Box
        sx={
          {
            // border: `${contentAreaBorderWidth * 2}px solid black`,
            // borderRadius: "5px",
            // // m: contentAreaBorderWidth * 2 + "px",
            // height: contentAreaHeight + contentAreaBorderWidth * 3,
            // width: contentAreaWidth + contentAreaBorderWidth * 3,
          }
        }
      >
        <Box
          display="flex"
          sx={{
            border: `${contentAreaBorderWidth}px solid black`,
            borderRadius: "5px",
            m: contentAreaMargin + "px",
            height: contentAreaHeight,
            width: contentAreaWidth,
            position: "relative",
          }}
        >
          <Box
            position="absolute"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bottom={3}
            width={contentAreaWidth}
          >
            <Box
              width="27px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              pt={2}
              mr={1}
            >
              <ExpanseLogo></ExpanseLogo>
            </Box>
            <Typography variant="h2" fontSize="1.5rem">
              www.expanseservices.com
            </Typography>
          </Box>
          <Box flexGrow={1} display="flex" flexDirection="row">
            <Box
              height={1}
              flexBasis="40%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                component="img"
                // src="/assets/matt-profile-photo.jpg"
                // src={MattProfilePicture2.src}
                src={"/assets/MattsProfilePhoto2_SplitAndGrayscale.jpg"}
                sx={{
                  width: profileImageSize,
                  minWidth: profileImageSize,
                  maxWidth: profileImageSize,
                  height: profileImageSize,
                  minHeight: profileImageSize,
                  maxHeight: profileImageSize,
                  borderRadius: "6%",
                  mr: 3,
                }}
              />
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              flexBasis="60%"
            >
              <Typography variant="h2" mb={2}>
                Matthew Mckeller
              </Typography>

              <svg
                width="100%"
                height="3px"
                viewBox="0 0 100 3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <rect
                  width="10"
                  height="3"
                  rx="1"
                  // transform="matrix(-1 0 0 1 10 0)"
                  fill="black"
                />
                <rect
                  width="20"
                  height="3"
                  rx="1"
                  transform="matrix(-1 0 0 1 35 0)"
                  fill="black"
                />
                <rect
                  width="30"
                  height="3"
                  rx="1"
                  transform="matrix(-1 0 0 1 70 0)"
                  fill="black"
                />
              </svg>
              <Box mb={4}></Box>
              <Box display="flex" alignItems="center">
                <Work sx={{ mr: 2, height: "1.2rem", width: "1.2rem" }} />
                <Typography variant="body1" fontSize="1.2rem">
                  Software Development Consultant
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Email sx={{ mr: 2, height: "1.2rem", width: "1.2rem" }} />
                <Typography variant="body1" fontSize="1.2rem">
                  matt@expanseservices.com
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <LocationOn
                  sx={{ mr: 2, height: "1.2rem", width: "1.2rem" }}
                ></LocationOn>
                <Typography variant="body1" fontSize="1.2rem">
                  Kansas City, MO
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Phone sx={{ mr: 2, height: "1.2rem", width: "1.2rem" }} />
                <Typography variant="body1" fontSize="1.2rem">
                  (816) 739-9473
                </Typography>
              </Box>
            </Box>

            {/* <Box display="flex" flexDirection="column" alignItems="center">
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
          </Box> */}
          </Box>
        </Box>
      </Box>
      {/* <Typography variant="h2" fontSize="1.5rem">
            Request Quote
          </Typography> */}
    </ScreenshotWrapper>
  )
}
