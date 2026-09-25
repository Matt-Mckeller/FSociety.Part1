"use client"
import { Box } from "@mui/system"
import { getLottie } from "../lottieDynamicLoader"
import EssenceAnimationData from "./animationData/Essence/EssenceOptimized.json"
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react"

// todo should this be client or server
export const Essence = forwardRef(
  (
    {
      maxWidth,
      width,
      onComplete,
      staticZoom = false,
      beginFullSize = true,
    }: {
      maxWidth?: string | number
      width?: string | number
      onComplete?: () => void
      staticZoom?: boolean // should we zoom in on the component to better fit the container if its not going to be used as an animation, temporary?
      beginFullSize?: boolean // for this animation currently it starts out hidden, likely will want to change how the animation works
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
          loop: false,
          autoplay: true,
          animationData: EssenceAnimationData,
          initialSegment: [10, 10], // static
        })

        // animationInstance.current.currentFrame = 10

        if (onComplete) {
          animationInstance.current.addEventListener("complete", onComplete)
        }

        if (staticZoom) {
          const animationElement = containerRef.current?.querySelector("svg")

          // // Transform gets rid of the extra white space around the animation to make a smoother fit for the container
          if (animationElement) {
            animationElement.style.transform = "scale(1.2)"
            // animationElement.style.transformOrigin = "50%"
            // todo, maybe update translateY(-50px) and viewbox for better alignment
          }
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
    }, [onComplete, staticZoom])

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

Essence.displayName = "Essence"
