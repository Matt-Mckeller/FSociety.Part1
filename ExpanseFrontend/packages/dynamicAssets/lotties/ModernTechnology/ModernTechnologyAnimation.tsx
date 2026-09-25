"use client"
import { Box, useTheme } from "@mui/system"
import { getLottie } from "../lottieDynamicLoader"
// Get the absolute path to the JSON file
import ModernTechnology from "./ModernTechnology.json"
// Dark mode does not actually look better
// import ModernTechnologyDarkMode from "./ModernTechnologyDarkMode_optimized.json"
import { useEffect, useRef } from "react"

// todo should this be client or server
export const ModernTechnologyAnimation = ({
  width,
  maxWidth = "100%",
  height,
}: {
  width: string | number
  maxWidth?: string | number
  height?: string | number
}) => {
  const ContainerRef = useRef<Element>(null)
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === "dark"

  useEffect(() => {
    let mounted = true
    let instance: ReturnType<typeof import("lottie-web").default.loadAnimation> | null = null

    getLottie().then((lottie) => {
      if (!mounted || !ContainerRef.current || !lottie) return

      instance = lottie.loadAnimation({
        container: ContainerRef.current as Element, // the dom element that will contain the animation
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: ModernTechnology,
        rendererSettings: {},
      })

      const animationElement = ContainerRef.current?.querySelector("svg")

      // // Transform gets rid of the extra white space around the animation to make a smoother fit for the container
      if (animationElement) {
        animationElement.style.transform = "scale(1.26)"
        animationElement.style.transformOrigin = "50%"
        // todo, maybe update translateY(-50px) and viewbox for better alignment
      }
    })

    return () => {
      mounted = false
      if (instance) {
        instance.destroy()
      }
    }
  }, [])
  return (
    <Box
      className="sprint-velocity-animation-container"
      ref={ContainerRef}
      sx={{ maxWidth, height, width }}
    ></Box>
  )
}
