"use client"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ExpanseLogo } from "expanse.dynamicAssets"
import React from "react"
import { ScreenshotWrapper } from "../components/ScreenShotWrapper"
import { ExpandingBorderBox } from "../../../../../../packages/ui/theme/components/ExpandingBorderBox.component"

export function BusinessCardBackV1() {
  const containerWidth = 3500 / 4
  const containerHeight = 2000 / 4
  const largestBorderSize = 9
  const extraPaddingForContainer = largestBorderSize

  return (
    <ScreenshotWrapper
      screenshotHeight={containerHeight}
      screenshotWidth={containerWidth}
      fileExtension="jpg"
      assetName="BusinessCardBackV1"
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
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            minWidth="100%"
          >
            <Box
              height="50%"
              width="50%"
              display="flex"
              justifyContent="center"
              mb={8}
            >
              <ExpanseLogo></ExpanseLogo>
            </Box>
            <Box
              textAlign="center"
              display="flex"
              justifyContent="center"
              mb={4}
            >
              <Typography variant="h2" fontWeight="bold">
                Expanse Services
              </Typography>
            </Box>
            <Box textAlign="center" display="flex" justifyContent="center">
              <Typography variant="h3" fontWeight="bold">
                Unlock your digitial potential.
              </Typography>
            </Box>
          </Box>
        </ExpandingBorderBox>
      </Box>
    </ScreenshotWrapper>
  )
}
