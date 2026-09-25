"use client"
import { Grid, Typography } from "@mui/material"
import { Box, border, useTheme } from "@mui/system"
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
import { ExpandingBorderBox } from "../../../../../../packages/ui/theme/components/ExpandingBorderBox.component"

export function BusinessCardFront() {
  const containerWidth = 3500 / 4
  const containerHeight = 2000 / 4

  const largestBorderSize = 9
  const extraPaddingForContainer = largestBorderSize
  const profileImageSize = containerHeight / 3

  return (
    <ScreenshotWrapper
      screenshotHeight={containerHeight}
      screenshotWidth={containerWidth}
      fileExtension="jpg"
      assetName="BusinessCardFront"
      scale={4}
    >
      <Box
        id="extra-padding-container"
        sx={{
          height: "100%",
          width: "100%",
          maxWidth: "100%",
          minHeight: "100%",
          p: extraPaddingForContainer + "px",
        }}
      >
        <ExpandingBorderBox largestBorderSize={largestBorderSize}>
          <Box
            position="absolute"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bottom={16}
            width={"100%"}
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
                  border: "1px solid black",
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
          </Box>
        </ExpandingBorderBox>
      </Box>
    </ScreenshotWrapper>
  )
}
