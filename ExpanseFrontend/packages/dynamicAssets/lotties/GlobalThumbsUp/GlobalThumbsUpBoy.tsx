"use client"
import { Box } from "@mui/system"
import { getLottie } from "../lottieDynamicLoader"
import AnimationData from "./GlobalThumbsUp.json"
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react"

export const GlobalThumbsUpBoy = forwardRef(
  (
    {
      maxWidth,
      width,
      onComplete,
    }: {
      maxWidth?: string | number
      width?: string | number
      onComplete?: () => void
    },
    ref,
  ) => {
    const containerRef = useRef<Element>(null)
    const animationInstance = useRef<any>(null)

    useEffect(() => {
      let mounted = true

      getLottie().then((lottie) => {
        if (!mounted || !containerRef.current || !lottie) return

        animationInstance.current = lottie.loadAnimation({
          container: containerRef.current as Element,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: AnimationData,
          // initialSegment: [1, 237],
        })

        if (onComplete) {
          animationInstance.current.addEventListener("complete", onComplete)
        }
      })

      return () => {
        mounted = false
        if (animationInstance.current) {
          if (onComplete) {
            animationInstance.current.removeEventListener("complete", onComplete)
          }
          animationInstance.current.destroy()
        }
      }
    }, [onComplete])

    useImperativeHandle(ref, () => ({
      playAnimation: () => {
        console.log("play animation")
        animationInstance.current.goToAndPlay(0, true)
      },
    }))

    return (
      <Box
        className="essence-animation-container"
        ref={containerRef}
        sx={{ maxWidth, width }}
      ></Box>
    )
  },
)

GlobalThumbsUpBoy.displayName = "GlobalThumbsUpBoy"
