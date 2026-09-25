/**
 * Slides Overview - Grid view of all slides
 */
import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  FormControlLabel,
  Switch,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { slides } from "../../data/presentation/slides"
import {
  presentationSections,
  getSectionForSlide,
} from "../../data/presentation/sections"
import type { SectionType, PriorityLevel } from "../../data/presentation/types"

interface SlidesOverviewProps {
  onSlideSelect?: (slideNumber: number) => void
}

export function SlidesOverview({ onSlideSelect }: SlidesOverviewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sectionFilter, setSectionFilter] = useState<SectionType | "all">("all")
  const [priorityFilter, setPriorityFilter] = useState<PriorityLevel | "all">(
    "all",
  )
  const [hideSensitive, setHideSensitive] = useState(false)

  // Filter slides
  const filteredSlides = slides.filter((slide) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesTitle = slide.title.toLowerCase().includes(query)
      const matchesSubtitle = slide.subtitle?.toLowerCase().includes(query)
      const matchesContent = slide.content.some((c) =>
        typeof c.value === "string"
          ? c.value.toLowerCase().includes(query)
          : (c.value as string[]).some((v) => v.toLowerCase().includes(query)),
      )
      const matchesNotes = slide.notes?.toLowerCase().includes(query)
      if (
        !matchesTitle &&
        !matchesSubtitle &&
        !matchesContent &&
        !matchesNotes
      ) {
        return false
      }
    }

    // Section filter
    if (sectionFilter !== "all" && slide.section !== sectionFilter) {
      return false
    }

    // Priority filter
    if (priorityFilter !== "all" && slide.priority !== priorityFilter) {
      return false
    }

    // Sensitive filter
    if (hideSensitive && slide.sensitive) {
      return false
    }

    return true
  })

  return (
    <Box sx={{ py: 3 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            📑 Slides Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {slides.length} total slides across {presentationSections.length}{" "}
            sections
          </Typography>
        </Box>

        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search slides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <ToggleButtonGroup
                value={sectionFilter}
                exclusive
                onChange={(_, v) => v && setSectionFilter(v)}
                size="small"
                sx={{ flexWrap: "wrap" }}
              >
                <ToggleButton value="all">All</ToggleButton>
                {presentationSections.slice(0, 5).map((section) => (
                  <ToggleButton key={section.id} value={section.id}>
                    {section.icon}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>

            <Grid item xs={12} md={2}>
              <ToggleButtonGroup
                value={priorityFilter}
                exclusive
                onChange={(_, v) => v && setPriorityFilter(v)}
                size="small"
              >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="critical">🔴</ToggleButton>
                <ToggleButton value="important">🟡</ToggleButton>
              </ToggleButtonGroup>
            </Grid>

            <Grid item xs={12} md={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={hideSensitive}
                    onChange={(e) => setHideSensitive(e.target.checked)}
                    size="small"
                  />
                }
                label="Hide Sensitive"
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Results count */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Showing {filteredSlides.length} of {slides.length} slides
        </Typography>

        {/* Slides Grid */}
        <Grid container spacing={2}>
          {filteredSlides.map((slide) => {
            const section = getSectionForSlide(slide.slideNumber)

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={slide.id}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    height: "100%",
                    cursor: onSlideSelect ? "pointer" : "default",
                    transition: "all 0.2s",
                    borderTop: 3,
                    borderColor: section?.color || "grey.300",
                    "&:hover": onSlideSelect
                      ? {
                          transform: "translateY(-2px)",
                          boxShadow: 4,
                        }
                      : {},
                  }}
                  onClick={() => onSlideSelect?.(slide.slideNumber)}
                >
                  <Box
                    sx={{ display: "flex", gap: 0.5, mb: 1, flexWrap: "wrap" }}
                  >
                    <Chip
                      label={`#${slide.slideNumber}`}
                      size="small"
                      sx={{
                        bgcolor: section?.color || "grey.300",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.7rem",
                      }}
                    />
                    {slide.sensitive && (
                      <Chip
                        label="🔒"
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.7rem" }}
                      />
                    )}
                    <Chip
                      label={
                        slide.priority === "critical"
                          ? "🔴"
                          : slide.priority === "important"
                            ? "🟡"
                            : slide.priority === "supporting"
                              ? "⚪"
                              : "📎"
                      }
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: "0.7rem", ml: "auto" }}
                    />
                  </Box>

                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      mb: 0.5,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {slide.title}
                  </Typography>

                  {slide.subtitle && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {slide.subtitle}
                    </Typography>
                  )}
                </Paper>
              </Grid>
            )
          })}
        </Grid>

        {filteredSlides.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No slides match your filters
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  )
}
