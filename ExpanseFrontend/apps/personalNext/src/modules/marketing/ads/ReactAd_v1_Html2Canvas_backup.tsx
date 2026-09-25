"use client"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ExpanseLogo, WebAndMobileAppScreens } from "expanse.dynamicAssets"
import html2canvas from "html2canvas"
import React, { useRef, useEffect, useState } from "react"
import { SectionSpacer } from "expanse.ui/theme"

export function ReactAdV1Html2Canvas() {
  const containerRef = useRef(null)
  const fileName = "SeniorReactJS_Ad_v1_KC_1000x1000"

  const takeScreenshot = () => {
    const container = containerRef.current
    if (container) {
      html2canvas(container).then((canvas) => {
        const dataURL = canvas.toDataURL("image/png")

        if (typeof window !== "undefined") {
          const link = document.createElement("a")
          link.href = dataURL
          link.download = fileName

          link.click()
        }
      })
    }
  }

  const containerWidth = 1000
  const containerHeight = 1000
  const containerMargin = containerHeight / 10
  const graphicHeight = (containerHeight - containerMargin * 2) / 3
  const profileImageSize = "100px"
  const manualContentHeight = 587

  return (
    <Box sx={{ border: "1px solid black" }}>
      <Box
        ref={containerRef}
        sx={{
          width: containerWidth,
          height: containerHeight,
          // display: "flex",
          // flexDirection: "column",
          // alignItems: "center",
          // padding: containerMargin + "px",
          overflow: "hidden",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          sx={{
            height: manualContentHeight,
            marginTop: (containerHeight - manualContentHeight) / 2 + "px",
          }}
        >
          <Typography variant="h1" textAlign="center" fontWeight="bold">
            Senior React JS Developer
          </Typography>
          <Typography variant="h3" textAlign="center">
            Web Applications, APIs, and Integrations
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
                    Immediate
                  </Typography>
                </Box>
                <Typography variant="body1" fontSize="1.2rem">
                  <strong>Location:</strong> Kansas City, MO
                </Typography>
                <Typography variant="body1" fontSize="1.2rem">
                  Software Development Consultant
                </Typography>
              </Box>
            </Box>
            <SectionSpacer size="xs"></SectionSpacer>
            <Typography variant="h2" fontSize="1.5rem">
              <strong>Engagements:</strong> Contract, Freelance, Project
              Leadership, C2C
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
          {/* <Typography variant="h2" fontSize="1.5rem">
            Request Quote
          </Typography> */}
        </Box>
      </Box>

      <button onClick={takeScreenshot}>Take Screenshot</button>
    </Box>
  )
}
