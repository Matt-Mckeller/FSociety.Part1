"use client"
import { Box } from "@mui/system"
import Lottie from "lottie-web"
// Get the absolute path to the JSON file
import BackendAnimationJson from "../assets/BackendDevelopmentPurpV1.json"
import { useLayoutEffect, useRef } from "react"

// todo should this be client or server
export const BackendAnimation = ({
  width,
  height,
}: {
  width: string
  height: string
}) => {
  const ContainerRef = useRef<Element>(null)

  useLayoutEffect(() => {
    const instance = Lottie.loadAnimation({
      container: ContainerRef.current as Element, // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: BackendAnimationJson,
      rendererSettings: {},
    })
    const svg = ContainerRef.current?.querySelector("svg")
    svg?.setAttribute("width", width)
    svg?.setAttribute("height", height)

    return () => instance.destroy()
  }, [])
  return (
    <Box
      className="backend-animation-container-box"
      ref={ContainerRef}
      // sx={{ maxWidth, height }}
    ></Box>
  )
}
