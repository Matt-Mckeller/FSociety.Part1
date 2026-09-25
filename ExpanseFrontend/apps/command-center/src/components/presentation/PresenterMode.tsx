/**
 * Presenter Mode - Dual-view presentation interface for live presenting
 *
 * Features:
 * - Current slide large display
 * - Next slide preview
 * - Timer/clock
 * - Speaker notes prominently displayed
 * - Section progress indicator
 * - Keyboard navigation
 */
import { useState, useCallback, useEffect, useRef } from "react"
import {
  Box,
  Typography,
  IconButton,
  Paper,
  alpha,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Tooltip,
} from "@mui/material"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit"
import CloseIcon from "@mui/icons-material/Close"
import { presentationSections } from "../../data/presentation/sections"
import {
  presentationVariants,
  getSlidesForVariant,
} from "../../data/presentation/variants"
import { SlideComponent } from "./SlideComponent"
import type { AudienceType } from "../../data/presentation/types"

interface PresenterModeProps {
  onClose?: () => void
}

// Format seconds to MM:SS
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

// Timer Component
function PresentationTimer({
  isRunning,
  onToggle,
  onReset,
}: {
  isRunning: boolean
  onToggle: () => void
  onReset: () => void
}) {
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1)
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning])

  const handleReset = () => {
    setElapsed(0)
    onReset()
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        bgcolor: "grey.900",
        borderRadius: 2,
        px: 2,
        py: 1,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          color: isRunning ? "success.light" : "grey.400",
          minWidth: 100,
        }}
      >
        {formatTime(elapsed)}
      </Typography>
      <Tooltip title={isRunning ? "Pause" : "Start"}>
        <IconButton
          onClick={onToggle}
          size="small"
          sx={{ color: isRunning ? "warning.light" : "success.light" }}
        >
          {isRunning ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Reset">
        <IconButton
          onClick={handleReset}
          size="small"
          sx={{ color: "grey.400" }}
        >
          <RestartAltIcon />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

// Section Progress Bar
function SectionProgress({
  sections,
  currentSlideNumber,
  visibleSlides,
}: {
  sections: typeof presentationSections
  currentSlideNumber: number
  visibleSlides: { slideNumber: number }[]
}) {
  const activeSections = sections.filter((section) =>
    visibleSlides.some(
      (s) =>
        s.slideNumber >= section.slideRange[0] &&
        s.slideNumber <= section.slideRange[1],
    ),
  )

  const currentSectionIndex = activeSections.findIndex(
    (s) =>
      currentSlideNumber >= s.slideRange[0] &&
      currentSlideNumber <= s.slideRange[1],
  )

  return (
    <Box sx={{ display: "flex", gap: 0.5, width: "100%" }}>
      {activeSections.map((section, idx) => {
        const isComplete = idx < currentSectionIndex
        const isCurrent = idx === currentSectionIndex

        return (
          <Tooltip key={section.id} title={section.title}>
            <Box
              sx={{
                flex: 1,
                height: 6,
                borderRadius: 1,
                bgcolor: isComplete
                  ? section.color
                  : isCurrent
                    ? alpha(section.color, 0.6)
                    : "grey.700",
                transition: "all 0.3s ease",
              }}
            />
          </Tooltip>
        )
      })}
    </Box>
  )
}

export function PresenterMode({ onClose }: PresenterModeProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState("full")
  const [selectedAudience, _setSelectedAudience] = useState<
    AudienceType | "all"
  >("all")
  const [hideSensitive, _setHideSensitive] = useState(false)
  const [timerRunning, setTimerRunning] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Get slides for selected variant
  const variantSlides = getSlidesForVariant(selectedVariant)

  // Filter slides based on settings
  let filteredSlides = variantSlides

  if (selectedAudience !== "all") {
    filteredSlides = filteredSlides.filter(
      (s) =>
        s.audiences.includes(selectedAudience) ||
        s.audiences.includes("general"),
    )
  }

  const visibleSlides = hideSensitive
    ? filteredSlides.filter((s) => !s.sensitive)
    : filteredSlides

  const currentSlide = visibleSlides[currentSlideIndex]
  const nextSlide = visibleSlides[currentSlideIndex + 1]

  const currentSection = presentationSections.find(
    (s) =>
      currentSlide?.slideNumber >= s.slideRange[0] &&
      currentSlide?.slideNumber <= s.slideRange[1],
  )

  const goNext = useCallback(() => {
    if (currentSlideIndex < visibleSlides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1)
    }
  }, [currentSlideIndex, visibleSlides.length])

  const goPrevious = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1)
    }
  }, [currentSlideIndex])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        goNext()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        goPrevious()
      } else if (e.key === "Escape") {
        if (isFullscreen) {
          document.exitFullscreen()
          setIsFullscreen(false)
        } else if (onClose) {
          onClose()
        }
      } else if (e.key === "f") {
        toggleFullscreen()
      } else if (e.key === "t") {
        setTimerRunning((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goNext, goPrevious, isFullscreen, toggleFullscreen, onClose])

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  if (!currentSlide) {
    return <Typography>No slides available</Typography>
  }

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "grey.900",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 2,
          py: 1,
          borderBottom: 1,
          borderColor: "grey.800",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          🎭 Presenter Mode
        </Typography>

        {/* Variant Selector */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="presenter-variant-label" sx={{ color: "grey.400" }}>
            Presentation
          </InputLabel>
          <Select
            labelId="presenter-variant-label"
            value={selectedVariant}
            label="Presentation"
            onChange={(e) => {
              setSelectedVariant(e.target.value)
              setCurrentSlideIndex(0)
            }}
            sx={{
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "grey.700" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "grey.500",
              },
              "& .MuiSvgIcon-root": { color: "grey.400" },
            }}
          >
            {presentationVariants.map((variant) => (
              <MenuItem key={variant.id} value={variant.id}>
                {variant.name} ({variant.slideNumbers.length})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {currentSection && (
          <Chip
            label={`${currentSection.icon} ${currentSection.title}`}
            size="small"
            sx={{
              bgcolor: alpha(currentSection.color, 0.2),
              color: currentSection.color,
              fontWeight: 600,
            }}
          />
        )}

        <Box sx={{ flex: 1 }} />

        {/* Timer */}
        <PresentationTimer
          isRunning={timerRunning}
          onToggle={() => setTimerRunning((prev) => !prev)}
          onReset={() => {}}
        />

        {/* Clock */}
        <Typography
          variant="h5"
          sx={{ fontFamily: "monospace", color: "grey.400" }}
        >
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>

        <Tooltip title="Fullscreen (F)">
          <IconButton onClick={toggleFullscreen} sx={{ color: "grey.400" }}>
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Tooltip>

        {onClose && (
          <Tooltip title="Exit Presenter Mode (Esc)">
            <IconButton onClick={onClose} sx={{ color: "grey.400" }}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Section Progress */}
      <Box sx={{ px: 2, py: 1 }}>
        <SectionProgress
          sections={presentationSections}
          currentSlideNumber={currentSlide.slideNumber}
          visibleSlides={visibleSlides}
        />
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: "flex", overflow: "hidden", p: 2, gap: 2 }}>
        {/* Left: Current Slide (Large) */}
        <Box
          sx={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              flex: 1,
              overflow: "auto",
              bgcolor: "white",
              color: "text.primary",
              borderRadius: 2,
              p: 3,
            }}
          >
            <SlideComponent slide={currentSlide} showNotes={false} />
          </Paper>

          {/* Navigation Controls */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <IconButton
              onClick={goPrevious}
              disabled={currentSlideIndex === 0}
              sx={{
                bgcolor: "grey.800",
                color: "white",
                "&:hover": { bgcolor: "grey.700" },
                "&.Mui-disabled": { bgcolor: "grey.900", color: "grey.700" },
              }}
              size="large"
            >
              <NavigateBeforeIcon fontSize="large" />
            </IconButton>

            <Typography
              variant="h5"
              sx={{ fontWeight: 600, minWidth: 120, textAlign: "center" }}
            >
              {currentSlideIndex + 1} / {visibleSlides.length}
            </Typography>

            <IconButton
              onClick={goNext}
              disabled={currentSlideIndex === visibleSlides.length - 1}
              sx={{
                bgcolor: "grey.800",
                color: "white",
                "&:hover": { bgcolor: "grey.700" },
                "&.Mui-disabled": { bgcolor: "grey.900", color: "grey.700" },
              }}
              size="large"
            >
              <NavigateNextIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>

        {/* Right: Preview + Notes */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Next Slide Preview */}
          <Paper
            elevation={2}
            sx={{
              height: 200,
              overflow: "hidden",
              bgcolor: "grey.100",
              borderRadius: 2,
              position: "relative",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                top: 8,
                left: 12,
                color: "grey.600",
                fontWeight: 600,
                zIndex: 1,
              }}
            >
              NEXT SLIDE
            </Typography>
            {nextSlide ? (
              <Box
                sx={{
                  transform: "scale(0.35)",
                  transformOrigin: "top left",
                  width: "286%",
                  height: "286%",
                  p: 3,
                  pt: 4,
                }}
              >
                <SlideComponent slide={nextSlide} showNotes={false} compact />
              </Box>
            ) : (
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography color="text.secondary" sx={{ fontStyle: "italic" }}>
                  End of presentation
                </Typography>
              </Box>
            )}
          </Paper>

          {/* Speaker Notes */}
          <Paper
            elevation={2}
            sx={{
              flex: 1,
              overflow: "auto",
              bgcolor: "grey.800",
              borderRadius: 2,
              p: 2,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "grey.500",
                fontWeight: 600,
                display: "block",
                mb: 1,
              }}
            >
              SPEAKER NOTES
            </Typography>
            <Divider sx={{ borderColor: "grey.700", mb: 2 }} />
            {currentSlide.notes ? (
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  color: "grey.100",
                  whiteSpace: "pre-wrap",
                }}
              >
                {currentSlide.notes}
              </Typography>
            ) : (
              <Typography sx={{ fontStyle: "italic", color: "grey.500" }}>
                No notes for this slide
              </Typography>
            )}
          </Paper>

          {/* Slide Info */}
          <Paper
            elevation={2}
            sx={{
              bgcolor: "grey.800",
              borderRadius: 2,
              p: 2,
            }}
          >
            <Typography variant="subtitle2" color="grey.400" gutterBottom>
              Slide {currentSlide.slideNumber} • {currentSlide.title}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Chip
                label={currentSlide.priority}
                size="small"
                color={
                  currentSlide.priority === "critical"
                    ? "error"
                    : currentSlide.priority === "important"
                      ? "warning"
                      : "default"
                }
                variant="outlined"
              />
              {currentSlide.estimatedTime && (
                <Chip
                  label={`~${currentSlide.estimatedTime}s`}
                  size="small"
                  variant="outlined"
                  sx={{ color: "grey.400", borderColor: "grey.600" }}
                />
              )}
              {currentSlide.sensitive && (
                <Chip
                  label="Sensitive"
                  size="small"
                  color="error"
                  variant="outlined"
                />
              )}
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Footer with Keyboard Shortcuts */}
      <Box
        sx={{
          px: 2,
          py: 1,
          borderTop: 1,
          borderColor: "grey.800",
          display: "flex",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Typography variant="caption" color="grey.500">
          ← → Navigate
        </Typography>
        <Typography variant="caption" color="grey.500">
          Space Next
        </Typography>
        <Typography variant="caption" color="grey.500">
          T Timer
        </Typography>
        <Typography variant="caption" color="grey.500">
          F Fullscreen
        </Typography>
        <Typography variant="caption" color="grey.500">
          Esc Exit
        </Typography>
      </Box>
    </Box>
  )
}
