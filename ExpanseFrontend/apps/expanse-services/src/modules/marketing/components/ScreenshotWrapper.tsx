"use client"
import { Button } from "@mui/material"
import { Box } from "@mui/system"
import React, {
  useRef,
  useEffect,
  useState,
  ReactNode,
  MutableRefObject,
} from "react"
import { useDownloadScreenshot } from "../hooks/useDownloadScreenshot"

export type ScreenshotWrapperProps = {
  screenshotWidth: number
  screenshotHeight: number
  assetName: string
  fileExtension: "jpg" | "png"
  children: ReactNode
  scale?: number
  showImageBorder?: boolean
  // containerRef: MutableRefObject<ReactNode>
}
// Notes: Scale doesnt always work as expected, sometimes flex layout doesnt work
export function ScreenshotWrapper({
  screenshotWidth,
  screenshotHeight,
  assetName,
  fileExtension,
  children,
  // containerRef,
  scale = 1,
  showImageBorder = false,
}: ScreenshotWrapperProps) {
  const outerContainerRef = useRef<ReactNode>(null)
  const innerContainerRef = useRef<ReactNode>(null)
  const { downloadScreenshot } = useDownloadScreenshot()
  const [manualContentHeight, setManualContentHeight] = useState<number>(null)
  const fileName = `${assetName}_${screenshotHeight * scale}x${screenshotWidth * scale}.${fileExtension}`

  // Used for manually centering the content in the container
  // flex for html2canvas wasn't working properly
  // const centeredInnerContainerStyle = manualContentHeight
  //   ? {
  //       // Position the element centered with margin
  //       height: manualContentHeight,
  //       marginTop: (screenshotHeight - manualContentHeight) / 2 + "px",
  //       marginBottom: (screenshotHeight - manualContentHeight) / 2 + "px",
  //     }
  //   : {}

  const takeScreenshot = () => {
    // Take after height is updated
    const container = innerContainerRef.current
    downloadScreenshot({
      container,
      fileName,
      imageType: `image/${fileExtension}`,
      scale,
    })
  }

  useEffect(() => {
    if (innerContainerRef?.current) {
      setManualContentHeight(innerContainerRef?.current?.clientHeight)
    }
  }, [])

  return (
    <Box>
      <Box
        id="screenshot-wrapper-outer-container"
        ref={outerContainerRef}
        sx={{
          width: screenshotWidth + (showImageBorder ? 2 : 0),
          height: screenshotHeight + (showImageBorder ? 2 : 0),
          overflow: "hidden",
        }}
      >
        <Box
          data-id="screenshot-wrapper-border-container"
          sx={{
            width: screenshotWidth + (showImageBorder ? 2 : 0),
            height: screenshotHeight + (showImageBorder ? 2 : 0),
            border: showImageBorder ? "1px solid black" : null,
            boxSizing: "border-box",
          }}
        >
          <Box
            id="screenshot-wrapper-inner-container"
            display="flex"
            flexDirection="column"
            ref={innerContainerRef}
            sx={{
              overflow: "hidden",
              height: "100%",
              width: "100%",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>

      <Button onClick={takeScreenshot}>Download Screenshot</Button>
    </Box>
  )
}
