"use client"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ExpanseLogo, WebAndMobileAppScreens } from "expanse.dynamicAssets"
import html2canvas from "html2canvas"
import React, {
  useRef,
  useEffect,
  useState,
  ReactElement,
  ReactNode,
} from "react"
import { SectionSpacer } from "expanse.ui/theme"

export function ReactAdV2Google() {
  const outerContainerRef = useRef<ReactNode>(null)
  const innerContainerRef = useRef<ReactNode>(null)
  const fileName = "SeniorReactJS_Ad_v1_KC_1000x1000"

  const takeScreenshot = () => {
    const container = outerContainerRef.current
    if (container) {
      html2canvas(container).then((canvas) => {
        if (typeof window !== "undefined") {
          const dataURL = canvas.toDataURL("image/jpg")

          const link = document.createElement("a")
          link.href = dataURL
          link.download = fileName

          link.click()
        }
      })
    }
  }

  const containerWidth = 750
  const containerHeight = 750
  const containerMargin = containerHeight / 10
  const graphicHeight = (containerHeight - containerMargin * 2) / 3
  const profileImageSize = "100px"
  const [manualContentHeight, setManualContentHeight] = useState(null)

  useEffect(() => {
    console.log({ innerContainer: innerContainerRef?.current })

    if (innerContainerRef?.current) {
      console.log("yes")
      console.log(
        "inner container ref client height",
        innerContainerRef?.current?.clientHeight,
      )
      setManualContentHeight(innerContainerRef?.current?.clientHeight)
    }
  }, [])

  return (
    <Box sx={{ border: "1px solid black" }}>
      <Box
        ref={outerContainerRef}
        sx={{
          width: containerWidth,
          height: containerHeight,
          overflow: "hidden",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          ref={innerContainerRef}
          sx={{
            height: manualContentHeight,
            marginTop: (containerHeight - manualContentHeight) / 2 + "px",
            marginBottom: (containerHeight - manualContentHeight) / 2 + "px",
          }}
        >
          <Typography
            variant="h1"
            textAlign="center"
            fontWeight="bold"
            fontSize="2.5rem"
          >
            Software Development Expert
          </Typography>
          <Typography variant="h3" textAlign="center">
            Web Applications, APIs, and Integrations
          </Typography>
          <SectionSpacer size="xs"></SectionSpacer>
          <Box sx={{ height: graphicHeight }}>
            <WebAndMobileAppScreens></WebAndMobileAppScreens>
          </Box>
          <SectionSpacer size="xs"></SectionSpacer>
          <Box display="flex" flexDirection="column" alignItems={"center"}>
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
                  <strong>Location:</strong> Remote, US
                </Typography>
                <Typography variant="body1" fontSize="1.2rem">
                  Software Development Consultant
                </Typography>
              </Box>
            </Box>
            <SectionSpacer size="xs"></SectionSpacer>
            <Typography variant="h2" fontSize="1.5rem">
              Contract, Freelance, Project Leadership, C2C
            </Typography>
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
          {/* <Typography variant="h2" fontSize="1.5rem">
            Request Quote
          </Typography> */}
        </Box>
      </Box>

      <button onClick={takeScreenshot}>Take Screenshot</button>
    </Box>
  )
}
