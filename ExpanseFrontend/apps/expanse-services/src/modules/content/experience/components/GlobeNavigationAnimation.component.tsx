"use client"
import { Box } from "@mui/system"
import Lottie from "lottie-web"
// Get the absolute path to the JSON file
import GlobeNavigation from "../assets/GlobeNavigation.json"
import { useLayoutEffect, useRef } from "react"

// todo should this be client or server
export const GlobeNavigationAnimation = ({
  maxWidth,
  height,
}: {
  maxWidth: string | number
  height: string | number
}) => {
  const ContainerRef = useRef<Element>(null)

  useLayoutEffect(() => {
    const renderer = "svg"
    const instance = Lottie.loadAnimation({
      container: ContainerRef.current as Element, // the dom element that will contain the animation
      renderer,
      loop: true,
      autoplay: true,
      animationData: GlobeNavigation,
    })

    // const animationElement = ContainerRef.current?.querySelector(renderer)

    // // Transform gets rid of the extra white space around the animation to make a smoother fit for the container
    // if (animationElement) {
    //   animationElement.style.transform = "scale(1.26)"
    //   animationElement.style.transformOrigin = "50%"
    // }
    return () => instance.destroy()
  }, [])
  return (
    <Box
      className="globe-navigation-container-box"
      ref={ContainerRef}
      sx={{
        maxWidth,
        height,
        overflow: "hidden",
      }}
    ></Box>
  )
}
