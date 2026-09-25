"use client"
import { Box, useTheme } from "@mui/system"
import { getLottie } from "../lottieDynamicLoader"
import AnimationData from "./SmilingFace.json"
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react"

const updateColorsToMatchTheme = (theme) => {
  const faceLayer = AnimationData.assets[0].layers.find(
    (layer: any) => layer.nm === "Face",
  )
  const tongueLayer = AnimationData.assets[0].layers.find(
    (layer: any) => layer.nm === "Tongue",
  )

  const hexToRgbPercentage = (hex: string) => {
    const bigint = parseInt(hex.slice(1), 16)
    const r = ((bigint >> 16) & 255) / 255
    const g = ((bigint >> 8) & 255) / 255
    const b = (bigint & 255) / 255
    return [r, g, b, 1]
  }

  // @ts-expect-error should be there
  const faceShape = faceLayer.shapes.find((shape) => shape.nm === "FaceShape")
  // @ts-expect-error should be there
  const tongueShape = tongueLayer.shapes.find(
    (shape) => shape.nm === "TongueShape",
  )

  const faceFill = faceShape?.it.find((entry) => entry.ty === "fl")
  if (faceFill && faceFill.c) {
    console.log(hexToRgbPercentage(theme.palette.primary.main))
    faceFill.c.k = hexToRgbPercentage(theme.palette.primary.main)
  }
  const tongueFill = tongueShape?.it.find((entry) => entry.ty === "fl")
  if (tongueFill && tongueFill.c) {
    tongueFill.c.k = hexToRgbPercentage(theme.palette.primary.light)
  }
}
export const SmilingFace = forwardRef(
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
    const theme = useTheme()

    updateColorsToMatchTheme(theme)

    useEffect(() => {
      let mounted = true

      getLottie().then((lottie) => {
        if (!mounted || !containerRef.current || !lottie) return

        animationInstance.current = lottie.loadAnimation({
          container: containerRef.current as Element,
          renderer: "svg",
          loop: false,
          autoplay: true,
          animationData: AnimationData,
          // initialSegment: [38, 38],
        })

        if (onComplete) {
          animationInstance.current.addEventListener("complete", onComplete)
        }

        // animationInstance.current.setSpeed(0.5)

        const animationElement = containerRef.current?.querySelector("svg")

        animationInstance.current.addEventListener("complete", function () {
          setTimeout(function () {
            if (animationInstance.current) {
              animationInstance.current.goToAndPlay(0)
            }
          }, 2000)
        })

        if (animationElement) {
          animationElement.style.transform = "scale(1.2)"
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

SmilingFace.displayName = "SmilingFace"
