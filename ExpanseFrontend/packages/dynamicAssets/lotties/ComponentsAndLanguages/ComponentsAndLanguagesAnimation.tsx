"use client"
import { Box, useTheme } from "@mui/system"
import { getLottie } from "../lottieDynamicLoader"
// Get the absolute path to the JSON file
import ComponentsAndLanguagesData from "./ComponentsAndLanguages.json"
import { useEffect, useRef } from "react"

// todo should this be client or server
export const ComponentsAndLanguagesAnimation = ({
  maxWidth,
  width,
}: {
  maxWidth?: string | number
  width?: string | number
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
        animationData: ComponentsAndLanguagesData,
        rendererSettings: {},
      })
    })

    return () => {
      mounted = false
      if (instance) {
        instance.destroy()
      }
    }
  }, [isDarkMode])
  return (
    <Box
      className="sprint-velocity-animation-container"
      ref={ContainerRef}
      sx={{ maxWidth, width }}
    ></Box>
  )
}
