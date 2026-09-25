"use client"
import { Typography } from "@mui/material"
import { Box, useTheme } from "@mui/system"
import { ExpanseLogo, WebAndMobileAppScreens } from "expanse.dynamicAssets"
import React, { useRef } from "react"
import { SectionSpacer } from "expanse.ui/theme"
import { ScreenshotWrapper } from "../components/ScreenShotWrapper"
import { ExpandingBorderBox } from "../../../../../../packages/ui/theme/components/ExpandingBorderBox.component"

export type SquareImageAdLayoutContent = {
  title: string
  subtitle: string
  profileImage: string
  availability: string
  location: string
  role: string
  engagements: string
  website: string
}

function OptionalExpandingBorderBox({
  includeBorder = true,
  children,
  largestBorderSize,
}: {
  includeBorder?: boolean
  largestBorderSize: number
  children: React.ReactNode
}) {
  if (includeBorder) {
    return (
      <ExpandingBorderBox largestBorderSize={6}>{children}</ExpandingBorderBox>
    )
  }
  return <>{children}</>
}

export function SquareImageAdLayout_V1({
  assetName,
  content,
  includeBorder = true,
}: {
  assetName: string
  content?: Partial<SquareImageAdLayoutContent>
  includeBorder?: boolean
}) {
  const theme = useTheme()
  const borderSize = 6
  const borderComponentGapSize = (borderSize * 3) / 4
  const borderComponentBorderHeight =
    borderSize + borderSize / 2 + borderSize / 4
  const containerWidth = 1000
  const containerHeight = 1000
  const containerMargin = containerHeight / 10
  const graphicHeight = (containerHeight - containerMargin * 2) / 3
  const profileImageSize = "100px"
  const manualContentHeight = 587
  // borderSpacingY is the Y Margin Above the Border that keeps the border showing in both desktop
  // and mobile versions of linkedin ads, which have different aspect ratios apparently
  const borderSpacingY = containerHeight * 0.15 + "px"
  const manualContentMarginTop =
    (containerHeight - manualContentHeight) / 2 -
    (includeBorder
      ? parseInt(borderSpacingY) +
        borderSize +
        borderComponentBorderHeight +
        borderComponentGapSize * 2
      : 0) +
    "px"
  console.log({ manualContentMarginTop })

  content = {
    title: "Senior React JS Developer",
    subtitle: "Web Applications, APIs, and Integrations",
    profileImage: "/assets/MattsProfilePhoto2_SplitAndGrayscale.jpg",
    availability: "Immediate",
    location: "Kansas City, MO",
    role: "Software Development Consultant",
    engagements: "Contract, Freelance, Project Leadership, C2C",
    website: "www.expanseservices.com",
    ...content, // Merge with provided content to override defaults
  }

  console.log({ content })

  return (
    <ScreenshotWrapper
      screenshotHeight={containerHeight}
      screenshotWidth={containerWidth}
      fileExtension="jpg"
      assetName={assetName}
      showImageBorder={false}
    >
      <Box px={2} py={borderSpacingY} width={1} height={1} flexGrow={1}>
        <OptionalExpandingBorderBox
          includeBorder={includeBorder}
          largestBorderSize={borderSize}
        >
          <Box
            display="flex"
            flexDirection="column"
            sx={{
              height: manualContentHeight,
              marginTop: manualContentMarginTop,
              flexGrow: 1,
            }}
          >
            {/* <Box width={1} display="flex" justifyContent="center">
              <Box height="60px" width="60px">
                <ExpanseLogo></ExpanseLogo>
              </Box>
            </Box> */}
            <Typography variant="h1" textAlign="center" fontWeight="bold">
              {content.title}
            </Typography>
            <Typography variant="h3" textAlign="center">
              {content.subtitle}
            </Typography>
            <SectionSpacer size="xs"></SectionSpacer>
            <Box sx={{ height: graphicHeight }}>
              <WebAndMobileAppScreens></WebAndMobileAppScreens>
            </Box>
            <SectionSpacer size="xs"></SectionSpacer>
            <Box
              display="flex"
              flexGrow={1}
              flexDirection="column"
              alignItems={"center"}
            >
              <Box display="flex">
                <Box width={100} display="flex" mr={4}>
                  <Box
                    component="img"
                    src={content.profileImage}
                    sx={{
                      width: profileImageSize,
                      minWidth: profileImageSize,
                      maxWidth: profileImageSize,
                      height: profileImageSize,
                      minHeight: profileImageSize,
                      maxHeight: profileImageSize,
                      borderRadius: "6%",
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Box display="flex" alignItems="center">
                    <Typography variant="body1" fontSize="1.2rem">
                      <strong>Availability:</strong>
                    </Typography>
                    <Box
                      component="div"
                      borderRadius={100}
                      width={10}
                      height={10}
                      sx={{ backgroundColor: "green" }}
                      mx={2}
                    />
                    <Typography variant="body1" fontSize="1.2rem">
                      {content.availability}
                    </Typography>
                  </Box>
                  <Typography variant="body1" fontSize="1.2rem">
                    <strong>Location:</strong> {content.location}
                  </Typography>
                  <Typography variant="body1" fontSize="1.2rem">
                    {content.role}
                  </Typography>
                </Box>
              </Box>
              <SectionSpacer size="xs"></SectionSpacer>
              <Typography variant="h2" fontSize="1.5rem">
                <strong>Engagements:</strong> {content.engagements}
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
                  {content.website}
                </Typography>
              </Box>
            </Box>
          </Box>
        </OptionalExpandingBorderBox>
      </Box>
    </ScreenshotWrapper>
  )
}
