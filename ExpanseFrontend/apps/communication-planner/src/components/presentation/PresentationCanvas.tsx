"use client"

import { Box, IconButton, Typography, LinearProgress, Tooltip, alpha } from "@mui/material"
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Close,
  Fullscreen,
  FullscreenExit,
  Notes,
  OpenInFull,
  CloseFullscreen,
  PlayArrow,
} from "@mui/icons-material"
import { useState, useCallback, useEffect, useMemo } from "react"
import { ThemeProvider } from "@mui/material/styles"
import { gamingTheme, gamingColors } from "./themes/gamingTheme"
import {
  TitleSlide,
  ContentSlide,
  TransformationSlide,
  SummarySlide,
} from "./slides"
import { useSlideNavigation, Slide } from "./hooks"
import { SlideOrbBar, SlideOrb } from "./SlideOrbBar"
import { hasMoreText } from "./briefText"

interface PresentationCanvasProps {
  slides: Slide[]
  onExit?: () => void
  showPresenterNotes?: boolean
}

export function PresentationCanvas({
  slides,
  onExit,
  showPresenterNotes = false,
}: PresentationCanvasProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showNotes, setShowNotes] = useState(showPresenterNotes)
  const [expanded, setExpanded] = useState(false)

  const {
    currentSlide,
    goToSlide,
    nextSlide,
    prevSlide,
    isFirstSlide,
    isLastSlide,
    progress,
  } = useSlideNavigation({
    totalSlides: slides.length,
  })

  const currentSlideData = slides[currentSlide]

  useEffect(() => {
    setExpanded(false)
  }, [currentSlide])

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      await document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.fullscreenElement) {
        onExit?.()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onExit])

  const orbs = useMemo<SlideOrb[]>(() => {
    if (!currentSlideData) return []

    if (currentSlideData.type === "title") {
      return [
        {
          id: "start",
          icon: <PlayArrow />,
          label: "Start",
          onClick: nextSlide,
        },
      ]
    }

    const canExpand =
      currentSlideData.type === "transformation" ||
      (currentSlideData.keyPoints?.length ?? 0) > 3 ||
      (currentSlideData.related?.length ?? 0) > 0 ||
      Boolean(currentSlideData.imageKey || currentSlideData.imagePlaceholder) ||
      hasMoreText(currentSlideData.content || "")

    return [
      {
        id: "more",
        icon: expanded ? <CloseFullscreen /> : <OpenInFull />,
        label: expanded ? "Less" : "More",
        active: expanded,
        disabled: !canExpand && !expanded,
        onClick: () => setExpanded((value) => !value),
      },
    ]
  }, [currentSlideData, expanded, nextSlide])

  useEffect(() => {
    const handleOrbHotkey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName
        if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) {
          return
        }
      }
      const index = Number(e.key) - 1
      if (index >= 0 && index < orbs.length && !orbs[index].disabled) {
        e.preventDefault()
        orbs[index].onClick()
      }
    }
    window.addEventListener("keydown", handleOrbHotkey)
    return () => window.removeEventListener("keydown", handleOrbHotkey)
  }, [orbs])

  if (!currentSlideData) {
    return null
  }

  const renderSlide = () => {
    switch (currentSlideData.type) {
      case "title":
        return (
          <TitleSlide
            title={currentSlideData.title}
            theme={currentSlideData.theme}
            audienceName={currentSlideData.audienceName}
          />
        )
      case "transformation":
        if (currentSlideData.transformation) {
          return (
            <TransformationSlide
              title={currentSlideData.title}
              content={currentSlideData.content || ""}
              transformation={currentSlideData.transformation}
              related={currentSlideData.related}
              expanded={expanded}
            />
          )
        }
        return (
          <ContentSlide
            title={currentSlideData.title}
            content={currentSlideData.content || ""}
            blockType={currentSlideData.blockType || "context"}
            imagePlaceholder={currentSlideData.imagePlaceholder}
            imageKey={currentSlideData.imageKey}
            related={currentSlideData.related}
            expanded={expanded}
          />
        )
      case "summary":
        return (
          <SummarySlide
            title={currentSlideData.title}
            keyPoints={currentSlideData.keyPoints || []}
            expanded={expanded}
          />
        )
      case "content":
      default:
        return (
          <ContentSlide
            title={currentSlideData.title}
            content={currentSlideData.content || ""}
            blockType={currentSlideData.blockType || "context"}
            imagePlaceholder={currentSlideData.imagePlaceholder}
            imageKey={currentSlideData.imageKey}
            related={currentSlideData.related}
            expanded={expanded}
          />
        )
    }
  }

  return (
    <ThemeProvider theme={gamingTheme}>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          bgcolor: gamingColors.darkBg,
          display: "flex",
          flexDirection: "column",
          zIndex: 9999,
        }}
      >
        <Box
          sx={{
            height: 48,
            px: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: gamingColors.cardBg,
            borderBottom: `1px solid ${alpha(gamingColors.textMuted, 0.25)}`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title="Exit (Esc)">
              <IconButton
                onClick={onExit}
                size="small"
                sx={{ color: gamingColors.textSecondary }}
              >
                <Close />
              </IconButton>
            </Tooltip>
            <Typography variant="body2" sx={{ color: gamingColors.textMuted }}>
              Exit
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ color: gamingColors.textSecondary }}>
            {currentSlide + 1} / {slides.length}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title={showNotes ? "Hide notes" : "Show notes"}>
              <IconButton
                onClick={() => setShowNotes(!showNotes)}
                size="small"
                sx={{
                  color: showNotes
                    ? gamingColors.neonCyan
                    : gamingColors.textSecondary,
                }}
              >
                <Notes />
              </IconButton>
            </Tooltip>
            <Tooltip title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
              <IconButton
                onClick={toggleFullscreen}
                size="small"
                sx={{ color: gamingColors.textSecondary }}
              >
                {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 2,
            bgcolor: alpha(gamingColors.neonPurple, 0.2),
            "& .MuiLinearProgress-bar": {
              bgcolor: gamingColors.neonCyan,
            },
          }}
        />

        <Box
          sx={{
            flex: 1,
            display: "flex",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              flex: 1,
              position: "relative",
              transition: "all 0.3s ease",
            }}
          >
            <Box sx={{ position: "absolute", inset: 0, pb: 11 }}>
              {renderSlide()}
            </Box>
          </Box>

          {showNotes && currentSlideData.psychApproachSteps && (
            <Box
              sx={{
                width: 300,
                bgcolor: gamingColors.cardBg,
                borderLeft: `1px solid ${alpha(gamingColors.textMuted, 0.25)}`,
                p: 2,
                overflow: "auto",
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: gamingColors.neonCyan, mb: 2, display: "block" }}
              >
                Presenter Notes
              </Typography>

              {currentSlideData.psychApproachSteps.length > 0 && (
                <>
                  <Typography
                    variant="caption"
                    sx={{ color: gamingColors.textMuted }}
                  >
                    Psychological Approach Steps:
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {currentSlideData.psychApproachSteps.map((step) => (
                      <Typography
                        key={step}
                        variant="body2"
                        sx={{ color: gamingColors.textSecondary, mb: 0.5 }}
                      >
                        • Step {step}
                      </Typography>
                    ))}
                  </Box>
                </>
              )}

              {currentSlideData.engagementHooks && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: gamingColors.textMuted }}
                  >
                    Engagement Hooks:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: gamingColors.textSecondary }}
                  >
                    {currentSlideData.engagementHooks.join(", ")}
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 16,
              display: "flex",
              justifyContent: "center",
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            <Box sx={{ pointerEvents: "auto" }}>
              <SlideOrbBar items={orbs} />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            height: 56,
            px: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: gamingColors.cardBg,
            borderTop: `1px solid ${alpha(gamingColors.textMuted, 0.25)}`,
          }}
        >
          <IconButton
            onClick={prevSlide}
            disabled={isFirstSlide}
            sx={{
              color: isFirstSlide
                ? gamingColors.textMuted
                : gamingColors.neonCyan,
              "&:disabled": {
                color: gamingColors.textMuted,
              },
            }}
          >
            <ArrowBackIosNew />
          </IconButton>

          <Box sx={{ display: "flex", gap: 0.5 }}>
            {slides.map((slide, idx) => (
              <Box
                key={slide.id}
                onClick={() => goToSlide(idx)}
                sx={{
                  width: idx === currentSlide ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  bgcolor:
                    idx === currentSlide
                      ? gamingColors.neonCyan
                      : slide.type === "transformation"
                        ? alpha(gamingColors.neonPurple, 0.55)
                        : alpha(gamingColors.neonCyan, 0.3),
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor:
                      idx === currentSlide
                        ? gamingColors.neonCyan
                        : alpha(gamingColors.neonCyan, 0.5),
                  },
                }}
              />
            ))}
          </Box>

          <IconButton
            onClick={nextSlide}
            disabled={isLastSlide}
            sx={{
              color: isLastSlide
                ? gamingColors.textMuted
                : gamingColors.neonCyan,
              "&:disabled": {
                color: gamingColors.textMuted,
              },
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
