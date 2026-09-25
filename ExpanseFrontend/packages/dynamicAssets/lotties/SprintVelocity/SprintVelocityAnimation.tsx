"use client"
import { Box, useTheme } from "@mui/system"
import { getLottie } from "../lottieDynamicLoader"
import SprintVelocityLight from "./SprintVelocity.json"
import { useEffect, useRef } from "react"

// todo should this be client or server
export const SprintVelocityAnimation = ({
  width,
  height,
}: {
  width: string | number
  height?: string | number
}) => {
  const ContainerRef = useRef<Element>(null)
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === "dark"

  useEffect(() => {
    let mounted = true
    let instance: ReturnType<typeof import("lottie-web").default.loadAnimation> | null = null

    if (!ContainerRef.current) return undefined

    getLottie().then((lottie) => {
      if (!mounted || !ContainerRef.current || !lottie) return

      instance = lottie.loadAnimation({
        container: ContainerRef.current as Element, // the dom element that will contain the animation
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: SprintVelocityLight,
        rendererSettings: {},
      })
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
      sx={
        isDarkMode
          ? {
              width,
              height,
              backgroundColor: "white",
              borderRadius: 5,
            }
          : {
              width,
              height,
            }
      }
      ref={ContainerRef}
      // sx={{ maxWidth, height }}
    ></Box>
  )
}
