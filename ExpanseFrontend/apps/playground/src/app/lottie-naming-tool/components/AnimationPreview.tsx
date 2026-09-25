"use client"

/**
 * Animation Preview Component
 */

import { useEffect, useRef, useState } from "react"
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Switch,
  FormControlLabel,
  Button,
  Chip,
} from "@mui/material"
import { PlayArrow, Pause, Stop, CameraAlt } from "@mui/icons-material"
import type { AnimationItem } from "lottie-web"
import { LottieData, AnimationContext, CapturedFrame } from "../types/types"

interface AnimationPreviewProps {
  lottieData: LottieData
  animationContext?: AnimationContext
  visionMode: boolean
  onVisionModeChange: (enabled: boolean) => void
  onFramesCaptured: (frames: CapturedFrame[]) => void
  onError: (error: string) => void
}
export default function AnimationPreview({
  lottieData,
  animationContext,
  visionMode,
  onVisionModeChange,
  onFramesCaptured,
  onError,
}: AnimationPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationItem | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const [lottieLoaded, setLottieLoaded] = useState(false)

  // Initialize Lottie animation
  useEffect(() => {
    if (!containerRef.current) return undefined

    // Dynamically import lottie-web to avoid SSR issues
    let isMounted = true

    import("lottie-web")
      .then((lottieModule) => {
        if (!isMounted || !containerRef.current) return

        try {
          const animation = lottieModule.default.loadAnimation({
            container: containerRef.current,
            renderer: "svg",
            loop: true,
            autoplay: false,
            animationData: lottieData,
          })

          animationRef.current = animation
          setLottieLoaded(true)

          animation.addEventListener("complete", () => {
            setIsPlaying(false)
          })
        } catch (error) {
          onError("Failed to load Lottie animation")
        }
      })
      .catch(() => {
        onError("Failed to load Lottie library")
      })

    return () => {
      isMounted = false
      if (animationRef.current) {
        animationRef.current.destroy()
        animationRef.current = null
      }
    }
  }, [lottieData, onError])

  const handlePlay = () => {
    if (animationRef.current) {
      animationRef.current.play()
      setIsPlaying(true)
    }
  }

  const handlePause = () => {
    if (animationRef.current) {
      animationRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleStop = () => {
    if (animationRef.current) {
      animationRef.current.stop()
      setIsPlaying(false)
    }
  }

  const captureFrame = async (): Promise<CapturedFrame> => {
    if (!containerRef.current || !animationRef.current) {
      throw new Error("Animation not ready")
    }

    const canvas = document.createElement("canvas")
    const svg = containerRef.current.querySelector("svg")

    if (!svg) {
      throw new Error("SVG not found")
    }

    canvas.width = lottieData.w
    canvas.height = lottieData.h

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      throw new Error("Canvas context not available")
    }

    // Convert SVG to image
    const svgData = new XMLSerializer().serializeToString(svg)
    const img = new Image()
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(svgBlob)

    return new Promise((resolve, reject) => {
      img.onload = () => {
        ctx.drawImage(img, 0, 0)
        URL.revokeObjectURL(url)

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Failed to create blob"))
            return
          }

          const currentFrame = Math.floor(animationRef.current!.currentFrame)
          const time = currentFrame / (animationContext?.frameRate || 30)

          canvas.toDataURL("image/png")
          resolve({
            index: currentFrame,
            time,
            base64: canvas.toDataURL("image/png"),
            blob,
          })
        }, "image/png")
      }

      img.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error("Failed to load image"))
      }

      img.src = url
    })
  }

  const handleCaptureFrames = async () => {
    if (!animationRef.current || !animationContext) return

    setIsCapturing(true)
    const frames: CapturedFrame[] = []

    try {
      // Smart frame selection (5 frames)
      const totalFrames = animationContext.totalFrames
      const frameIndices = [
        0, // Start
        Math.floor(totalFrames * 0.25), // 25%
        Math.floor(totalFrames * 0.5), // 50%
        Math.floor(totalFrames * 0.75), // 75%
        totalFrames - 1, // End
      ]

      for (const frameIndex of frameIndices) {
        animationRef.current.goToAndStop(frameIndex, true)

        // Wait for render
        await new Promise((resolve) => setTimeout(resolve, 100))

        const frame = await captureFrame()
        frames.push(frame)
      }

      onFramesCaptured(frames)
    } catch (error) {
      onError(
        error instanceof Error
          ? `Failed to capture frames: ${error.message}`
          : "Failed to capture frames",
      )
    } finally {
      setIsCapturing(false)
    }
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">
          {animationContext?.name || "Animation"}
        </Typography>

        {animationContext && (
          <Chip
            label={`${animationContext.totalFrames} frames @ ${animationContext.frameRate}fps`}
            size="small"
            variant="outlined"
          />
        )}
      </Box>

      {/* Animation Container */}
      <Box
        ref={containerRef}
        sx={{
          width: "100%",
          height: 400,
          bgcolor: "grey.100",
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      />

      {/* Controls */}
      <Stack spacing={2}>
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
          {!isPlaying ? (
            <IconButton onClick={handlePlay} color="primary">
              <PlayArrow />
            </IconButton>
          ) : (
            <IconButton onClick={handlePause} color="primary">
              <Pause />
            </IconButton>
          )}
          <IconButton onClick={handleStop}>
            <Stop />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={visionMode}
                onChange={(e) => onVisionModeChange(e.target.checked)}
              />
            }
            label="Vision Mode"
          />

          {visionMode && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<CameraAlt />}
              onClick={handleCaptureFrames}
              disabled={isCapturing}
            >
              {isCapturing ? "Capturing..." : "Capture Frames"}
            </Button>
          )}
        </Box>

        {animationContext?.description && (
          <Typography variant="body2" color="text.secondary">
            {animationContext.description}
          </Typography>
        )}
      </Stack>
    </Box>
  )
}
