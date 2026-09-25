/**
 * Presentation View - Main presentation viewer component
 */
import { useState, useCallback, useEffect, useRef } from "react"
import {
  Box,
  Container,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Chip,
  Paper,
  alpha,
  Tooltip,
  Switch,
  FormControlLabel,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import MenuIcon from "@mui/icons-material/Menu"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import NotesIcon from "@mui/icons-material/Notes"
import PresentToAllIcon from "@mui/icons-material/PresentToAll"
import { motion, AnimatePresence } from "framer-motion"
import { slides } from "../../data/presentation/slides"
import { presentationSections } from "../../data/presentation/sections"
import {
  presentationVariants,
  getSlidesForVariant,
} from "../../data/presentation/variants"
import { SlideComponent } from "./SlideComponent"
import { PresenterMode } from "./PresenterMode"
import type { AudienceType, SectionType } from "../../data/presentation/types"

// Slide transition variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
}

// Section Progress Timeline Component
function SectionProgressTimeline({
  sections,
  currentSlideNumber,
  visibleSlides,
  onSectionClick,
}: {
  sections: typeof presentationSections
  currentSlideNumber: number
  visibleSlides: { slideNumber: number; section: SectionType }[]
  onSectionClick: (sectionId: string) => void
}) {
  // Calculate which sections are represented in the current variant
  const activeSections = sections.filter((section) =>
    visibleSlides.some(
      (s) =>
        s.slideNumber >= section.slideRange[0] &&
        s.slideNumber <= section.slideRange[1],
    ),
  )

  // Find current section
  const currentSection = sections.find(
    (s) =>
      currentSlideNumber >= s.slideRange[0] &&
      currentSlideNumber <= s.slideRange[1],
  )

  return (
    <Box
      sx={{
        display: "flex",
        gap: 0.5,
        px: 2,
        py: 1,
        bgcolor: "grey.100",
        borderBottom: 1,
        borderColor: "divider",
        overflowX: "auto",
        "&::-webkit-scrollbar": { height: 4 },
        "&::-webkit-scrollbar-thumb": { bgcolor: "grey.400", borderRadius: 2 },
      }}
    >
      {activeSections.map((section) => {
        const isActive = currentSection?.id === section.id
        const isPast =
          sections.indexOf(section) <
          sections.indexOf(currentSection || sections[0])
        const slidesInSection = visibleSlides.filter(
          (s) =>
            s.slideNumber >= section.slideRange[0] &&
            s.slideNumber <= section.slideRange[1],
        ).length

        return (
          <Tooltip
            key={section.id}
            title={`${section.title} (${slidesInSection} slides)`}
            arrow
          >
            <Box
              onClick={() => onSectionClick(section.id)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                px: 1.5,
                py: 0.75,
                borderRadius: 2,
                cursor: "pointer",
                transition: "all 0.2s ease",
                bgcolor: isActive
                  ? alpha(section.color, 0.2)
                  : isPast
                    ? alpha(section.color, 0.08)
                    : "transparent",
                border: 2,
                borderColor: isActive ? section.color : "transparent",
                "&:hover": {
                  bgcolor: alpha(section.color, 0.15),
                },
              }}
            >
              <Typography sx={{ fontSize: "1rem" }}>{section.icon}</Typography>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: isActive ? 700 : 500,
                  color: isActive
                    ? section.color
                    : isPast
                      ? "text.secondary"
                      : "text.primary",
                  whiteSpace: "nowrap",
                }}
              >
                {section.title}
              </Typography>
              {isActive && (
                <Box
                  component={motion.div}
                  layoutId="activeIndicator"
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor: section.color,
                  }}
                />
              )}
            </Box>
          </Tooltip>
        )
      })}
    </Box>
  )
}

// Thumbnail Navigator Component
function ThumbnailNavigator({
  slides,
  currentIndex,
  onSlideClick,
  sections,
}: {
  slides: {
    id: string
    slideNumber: number
    title: string
    section: SectionType
  }[]
  currentIndex: number
  onSlideClick: (index: number) => void
  sections: typeof presentationSections
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to keep current slide visible
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current
      const activeThumb = container.querySelector(
        `[data-index="${currentIndex}"]`,
      ) as HTMLElement
      if (activeThumb) {
        const containerRect = container.getBoundingClientRect()
        const thumbRect = activeThumb.getBoundingClientRect()

        if (
          thumbRect.left < containerRect.left ||
          thumbRect.right > containerRect.right
        ) {
          activeThumb.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          })
        }
      }
    }
  }, [currentIndex])

  return (
    <Box
      ref={containerRef}
      sx={{
        display: "flex",
        gap: 1,
        overflowX: "auto",
        py: 1,
        px: 2,
        bgcolor: "grey.100",
        borderTop: 1,
        borderColor: "divider",
        "&::-webkit-scrollbar": { height: 6 },
        "&::-webkit-scrollbar-thumb": { bgcolor: "grey.400", borderRadius: 3 },
      }}
    >
      {slides.map((slide, idx) => {
        const section = sections.find(
          (s) =>
            slide.slideNumber >= s.slideRange[0] &&
            slide.slideNumber <= s.slideRange[1],
        )
        const isActive = idx === currentIndex

        return (
          <Tooltip key={slide.id} title={slide.title} arrow placement="top">
            <Box
              data-index={idx}
              onClick={() => onSlideClick(idx)}
              sx={{
                minWidth: 80,
                maxWidth: 80,
                height: 50,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                cursor: "pointer",
                transition: "all 0.2s ease",
                bgcolor: isActive
                  ? alpha(section?.color || "#666", 0.2)
                  : "white",
                border: 2,
                borderColor: isActive
                  ? section?.color || "primary.main"
                  : "grey.300",
                boxShadow: isActive ? 2 : 0,
                transform: isActive ? "scale(1.05)" : "scale(1)",
                "&:hover": {
                  borderColor: section?.color || "primary.main",
                  bgcolor: alpha(section?.color || "#666", 0.1),
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? section?.color : "text.secondary",
                  fontSize: "0.65rem",
                }}
              >
                {slide.slideNumber}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.55rem",
                  color: "text.secondary",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "90%",
                  textAlign: "center",
                }}
              >
                {slide.title.length > 12
                  ? slide.title.substring(0, 12) + "..."
                  : slide.title}
              </Typography>
            </Box>
          </Tooltip>
        )
      })}
    </Box>
  )
}

const AUDIENCE_OPTIONS: {
  value: AudienceType | "all"
  label: string
  icon: string
}[] = [
  { value: "all", label: "All Audiences", icon: "👥" },
  { value: "investor", label: "Investors", icon: "💰" },
  { value: "educator", label: "Educators", icon: "📚" },
  { value: "administrator", label: "Administrators", icon: "🏛️" },
  { value: "technical", label: "Technical", icon: "⚙️" },
  { value: "general", label: "General", icon: "🌐" },
]

export function PresentationView() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState(0) // -1 for prev, 1 for next
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showNotes, setShowNotes] = useState(true)
  const [hideSensitive, setHideSensitive] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState("full")
  const [selectedAudience, setSelectedAudience] = useState<
    AudienceType | "all"
  >("all")
  const [presenterMode, setPresenterMode] = useState(false)

  // If presenter mode is active, render it instead
  if (presenterMode) {
    return <PresenterMode onClose={() => setPresenterMode(false)} />
  }

  // Get slides for selected variant
  const variantSlides = getSlidesForVariant(selectedVariant)

  // Filter slides based on settings
  let filteredSlides = variantSlides

  // Filter by audience
  if (selectedAudience !== "all") {
    filteredSlides = filteredSlides.filter(
      (s) =>
        s.audiences.includes(selectedAudience) ||
        s.audiences.includes("general"),
    )
  }

  // Filter sensitive
  const visibleSlides = hideSensitive
    ? filteredSlides.filter((s) => !s.sensitive)
    : filteredSlides

  const currentSlide = visibleSlides[currentSlideIndex]

  const goToSlide = useCallback(
    (index: number, direction?: number) => {
      if (index >= 0 && index < visibleSlides.length) {
        setSlideDirection(direction ?? (index > currentSlideIndex ? 1 : -1))
        setCurrentSlideIndex(index)
      }
    },
    [visibleSlides.length, currentSlideIndex],
  )

  const goNext = useCallback(() => {
    if (currentSlideIndex < visibleSlides.length - 1) {
      setSlideDirection(1)
      setCurrentSlideIndex(currentSlideIndex + 1)
    }
  }, [currentSlideIndex, visibleSlides.length])

  const goPrevious = useCallback(() => {
    if (currentSlideIndex > 0) {
      setSlideDirection(-1)
      setCurrentSlideIndex(currentSlideIndex - 1)
    }
  }, [currentSlideIndex])

  const goToSection = (sectionId: string) => {
    const section = presentationSections.find((s) => s.id === sectionId)
    if (section) {
      const slideIndex = visibleSlides.findIndex(
        (s) =>
          s.slideNumber >= section.slideRange[0] &&
          s.slideNumber <= section.slideRange[1],
      )
      if (slideIndex >= 0) {
        setSlideDirection(slideIndex > currentSlideIndex ? 1 : -1)
        setCurrentSlideIndex(slideIndex)
        setDrawerOpen(false)
      }
    }
  }

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
        }
      } else if (e.key === "f") {
        toggleFullscreen()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goNext, goPrevious, isFullscreen, toggleFullscreen])

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

  const currentSection = presentationSections.find(
    (s) =>
      currentSlide.slideNumber >= s.slideRange[0] &&
      currentSlide.slideNumber <= s.slideRange[1],
  )

  const currentVariant = presentationVariants.find(
    (v) => v.id === selectedVariant,
  )

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          px: 2,
          py: 1,
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <IconButton onClick={() => setDrawerOpen(true)} size="small">
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Expanse EDU Pitch
        </Typography>

        {/* Variant Selector */}
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="variant-select-label">Presentation</InputLabel>
          <Select
            labelId="variant-select-label"
            value={selectedVariant}
            label="Presentation"
            onChange={(e) => {
              setSelectedVariant(e.target.value)
              setCurrentSlideIndex(0)
            }}
          >
            {presentationVariants.map((variant) => (
              <MenuItem key={variant.id} value={variant.id}>
                {variant.name} ({variant.slideNumbers.length})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Audience Filter */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="audience-select-label">Audience</InputLabel>
          <Select
            labelId="audience-select-label"
            value={selectedAudience}
            label="Audience"
            onChange={(e) => {
              setSelectedAudience(e.target.value as AudienceType | "all")
              setCurrentSlideIndex(0)
            }}
          >
            {AUDIENCE_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.icon} {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {currentSection && (
          <Chip
            label={`${currentSection.icon} ${currentSection.title}`}
            size="small"
            sx={{
              bgcolor: alpha(currentSection.color, 0.1),
              color: currentSection.color,
              fontWeight: 600,
            }}
          />
        )}

        <Box sx={{ flex: 1 }} />

        <FormControlLabel
          control={
            <Switch
              checked={showNotes}
              onChange={(e) => setShowNotes(e.target.checked)}
              size="small"
            />
          }
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <NotesIcon fontSize="small" /> Notes
            </Box>
          }
          sx={{ mr: 1 }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={hideSensitive}
              onChange={(e) => {
                setHideSensitive(e.target.checked)
                setCurrentSlideIndex(0)
              }}
              size="small"
            />
          }
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <VisibilityOffIcon fontSize="small" /> Hide Sensitive
            </Box>
          }
          sx={{ mr: 1 }}
        />

        <Tooltip title="Presenter Mode">
          <IconButton
            onClick={() => setPresenterMode(true)}
            size="small"
            sx={{
              bgcolor: "primary.main",
              color: "white",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            <PresentToAllIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Fullscreen (F)">
          <IconButton onClick={toggleFullscreen} size="small">
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Tooltip>
      </Paper>

      {/* Section Progress Timeline */}
      <SectionProgressTimeline
        sections={presentationSections}
        currentSlideNumber={currentSlide.slideNumber}
        visibleSlides={visibleSlides}
        onSectionClick={goToSection}
      />

      {/* Main Content with Animated Transitions */}
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          bgcolor: "grey.50",
          position: "relative",
        }}
      >
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={currentSlide.id}
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "auto",
            }}
          >
            <Container maxWidth="lg">
              <SlideComponent slide={currentSlide} showNotes={showNotes} />
            </Container>
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Navigation Footer */}
      <Paper
        elevation={0}
        sx={{
          px: 3,
          py: 2,
          borderTop: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <IconButton
          onClick={goPrevious}
          disabled={currentSlideIndex === 0}
          sx={{
            bgcolor: "grey.100",
            "&:hover": { bgcolor: "grey.200" },
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>

        <Typography
          variant="body1"
          sx={{ fontWeight: 500, minWidth: 100, textAlign: "center" }}
        >
          {currentSlideIndex + 1} / {visibleSlides.length}
        </Typography>

        <IconButton
          onClick={goNext}
          disabled={currentSlideIndex === visibleSlides.length - 1}
          sx={{
            bgcolor: "grey.100",
            "&:hover": { bgcolor: "grey.200" },
          }}
        >
          <NavigateNextIcon />
        </IconButton>

        <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
          Use ← → arrow keys to navigate, F for fullscreen
        </Typography>
      </Paper>

      {/* Thumbnail Navigator */}
      <ThumbnailNavigator
        slides={visibleSlides}
        currentIndex={currentSlideIndex}
        onSlideClick={(idx) => goToSlide(idx)}
        sections={presentationSections}
      />

      {/* Section Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 320, pt: 2 }}>
          <Typography variant="h6" sx={{ px: 2, pb: 2, fontWeight: 600 }}>
            📑 Presentation Sections
          </Typography>
          <Divider />

          {/* Variant Info */}
          {currentVariant && (
            <Box sx={{ px: 2, py: 1.5, bgcolor: "grey.50" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {currentVariant.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {currentVariant.description}
              </Typography>
              <Chip
                label={currentVariant.duration}
                size="small"
                sx={{ mt: 1 }}
                color="primary"
                variant="outlined"
              />
            </Box>
          )}

          <Divider />
          <List>
            {presentationSections.map((section) => {
              const sectionSlides = visibleSlides.filter(
                (s) =>
                  s.slideNumber >= section.slideRange[0] &&
                  s.slideNumber <= section.slideRange[1],
              )
              // Only show sections that have slides in the current variant
              if (sectionSlides.length === 0) return null

              const isActive =
                currentSlide.slideNumber >= section.slideRange[0] &&
                currentSlide.slideNumber <= section.slideRange[1]

              return (
                <ListItem key={section.id} disablePadding>
                  <ListItemButton
                    onClick={() => goToSection(section.id)}
                    selected={isActive}
                    sx={{
                      borderLeft: 4,
                      borderColor: isActive ? section.color : "transparent",
                      "&.Mui-selected": {
                        bgcolor: alpha(section.color, 0.1),
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, fontSize: "1.5rem" }}>
                      {section.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={section.title}
                      secondary={`${sectionSlides.length} slides`}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? section.color : "text.primary",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ px: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Quick Stats
            </Typography>
            <Typography variant="body2">
              Total Slides: {visibleSlides.length}
            </Typography>
            <Typography variant="body2">
              Critical:{" "}
              {visibleSlides.filter((s) => s.priority === "critical").length}
            </Typography>
            <Typography variant="body2">
              Sensitive: {slides.filter((s) => s.sensitive).length}
              {hideSensitive && " (hidden)"}
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </Box>
  )
}
