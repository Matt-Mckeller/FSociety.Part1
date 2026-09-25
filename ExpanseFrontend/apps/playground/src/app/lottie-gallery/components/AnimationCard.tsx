/**
 * Animation Card Component
 * Displays individual Lottie animation with controls and info
 */

"use client"

import { useEffect } from "react"
import { Box, Paper, Typography, Button, Chip, Stack } from "@mui/material"
import { useLottieAnimation } from "../hooks/useLottieAnimation"
import {
  getSkipLayersForAnimation,
  type Animation,
} from "../utils/animationRegistry"
import styles from "../styles/gallery.module.css"

interface AnimationCardProps {
  animation: Animation
  themeColor: string
  index: number
}

export function AnimationCard({
  animation,
  themeColor,
  index,
}: AnimationCardProps) {
  console.log("[AnimationCard] Mounting:", animation.name, "index:", index)

  const skipLayers = getSkipLayersForAnimation(animation.name)
  const { containerRef, isLoading, error, animationInfo, controls } =
    useLottieAnimation({
      animation,
      themeColor,
      skipLayers,
      autoplay: true,
      loop: true,
    })

  // Log unmount
  useEffect(() => {
    return () => {
      console.log(
        "[AnimationCard] Unmounting:",
        animation.name,
        "index:",
        index,
      )
    }
  }, [])

  const statusColor =
    animation.status === "optimized"
      ? "success"
      : animation.status === "original"
        ? "info"
        : "default"

  return (
    <Paper
      elevation={2}
      className={styles.card}
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100%",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
          {animation.displayName || animation.name}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label={animation.status} color={statusColor} size="small" />
          {animation.isPending && (
            <Chip label="pending" color="warning" size="small" />
          )}
          {animation.hasTheming && (
            <Chip label="🎨 Themed" color="secondary" size="small" />
          )}
        </Stack>
      </Box>

      {/* Animation Container */}
      <Box
        className={styles.animationContainer}
        sx={{
          flexGrow: 1,
          minHeight: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          borderRadius: 1,
          position: "relative",
        }}
      >
        {/* Lottie container - React hands off, no children */}
        <Box
          ref={containerRef}
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          // Prevent React from managing children
          suppressHydrationWarning
        />
        {/* UI overlay - React manages this separately */}
        {(isLoading || error) && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.default",
              zIndex: 1,
            }}
          >
            {isLoading && (
              <Typography color="text.secondary">
                Loading animation...
              </Typography>
            )}
            {error && (
              <Typography color="error" variant="body2">
                Failed to load: {error}
                <br />
                <Typography variant="caption" color="text.secondary">
                  {animation.path}
                </Typography>
              </Typography>
            )}
          </Box>
        )}
      </Box>

      {/* Animation Info */}
      {animationInfo && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
            p: 1,
            bgcolor: "background.default",
            borderRadius: 1,
          }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary">
              Duration
            </Typography>
            <Typography variant="body2">{animationInfo.duration}s</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Frame Rate
            </Typography>
            <Typography variant="body2">{animationInfo.fps} fps</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Layers
            </Typography>
            <Typography variant="body2">{animationInfo.layers}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Category
            </Typography>
            <Typography variant="body2">{animation.category}</Typography>
          </Box>
        </Box>
      )}

      {/* Description */}
      {animation.description && (
        <Typography variant="body2" color="text.secondary">
          {animation.description}
        </Typography>
      )}

      {/* Controls */}
      <Stack direction="row" spacing={1}>
        <Button
          size="small"
          variant="outlined"
          onClick={controls.play}
          disabled={isLoading || !!error}
        >
          ▶️ Play
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={controls.pause}
          disabled={isLoading || !!error}
        >
          ⏸️ Pause
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={controls.reload}
          disabled={isLoading || !!error}
        >
          🔄 Reload
        </Button>
      </Stack>
    </Paper>
  )
}
