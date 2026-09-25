"use client"

import { useEffect, useRef, useState } from "react"
import lottie, { AnimationItem } from "lottie-web"
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Stack,
  Slider,
  Tooltip,
} from "@mui/material"
import { PlayArrow, Pause, Replay, Speed } from "@mui/icons-material"
import type { LottieAnimation } from "../types"

interface AnimationPreviewProps {
  animationData: LottieAnimation | null
  width?: number
  height?: number
}

export default function AnimationPreview({
  animationData,
  width = 400,
  height = 400,
}: AnimationPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationItem | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [speed, setSpeed] = useState(1)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [totalFrames, setTotalFrames] = useState(0)

  useEffect(() => {
    if (!animationData || !containerRef.current) return undefined

    // Clear previous animation
    if (animationRef.current) {
      animationRef.current.destroy()
    }

    // Load new animation
    try {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData,
      })

      setIsPlaying(true)
      setTotalFrames(animationRef.current.totalFrames)

      // Track frame updates
      animationRef.current.addEventListener("enterFrame", () => {
        if (animationRef.current) {
          setCurrentFrame(Math.floor(animationRef.current.currentFrame))
        }
      })
    } catch (error) {
      console.error("Failed to load animation:", error)
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy()
      }
    }
  }, [animationData])

  const togglePlayPause = () => {
    if (!animationRef.current) return

    if (isPlaying) {
      animationRef.current.pause()
    } else {
      animationRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const restart = () => {
    if (!animationRef.current) return
    animationRef.current.goToAndPlay(0)
    setIsPlaying(true)
  }

  const handleSpeedChange = (_event: Event, newValue: number | number[]) => {
    const newSpeed = newValue as number
    setSpeed(newSpeed)
    if (animationRef.current) {
      animationRef.current.setSpeed(newSpeed)
    }
  }

  if (!animationData) {
    return (
      <Paper
        variant="outlined"
        sx={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "grey.50",
          border: "2px dashed",
          borderColor: "grey.300",
        }}
      >
        <Typography color="text.secondary">No animation to preview</Typography>
      </Paper>
    )
  }

  return (
    <Stack spacing={2}>
      <Paper
        variant="outlined"
        sx={{
          width,
          height,
          mx: "auto",
          bgcolor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          ref={containerRef}
          data-testid="lottie-animation-container"
          style={{ width: "100%", height: "100%" }}
        />
      </Paper>

      {/* Animation Info */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="caption" color="text.secondary">
            Frame: {currentFrame} / {totalFrames} | Speed: {speed}x
          </Typography>

          {/* Playback Controls */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <Tooltip title={isPlaying ? "Pause" : "Play"}>
              <IconButton onClick={togglePlayPause} color="primary">
                {isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Restart">
              <IconButton onClick={restart}>
                <Replay />
              </IconButton>
            </Tooltip>
          </Stack>

          {/* Speed Control */}
          <Box sx={{ px: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Speed fontSize="small" />
              <Slider
                value={speed}
                onChange={handleSpeedChange}
                min={0.25}
                max={2}
                step={0.25}
                marks
                valueLabelDisplay="auto"
                size="small"
              />
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  )
}
