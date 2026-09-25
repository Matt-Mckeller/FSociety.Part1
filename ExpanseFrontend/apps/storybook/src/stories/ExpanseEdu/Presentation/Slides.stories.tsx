/**
 * Expanse EDU Presentation Slides Stories
 * Showcases the presentation slide components
 */
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Grid, Paper, Chip, alpha } from "@mui/material"

// Since the presentation components are in command-center, we'll create simplified versions
// for Storybook demonstration

const mockSlides = [
  {
    id: "slide-001",
    slideNumber: 1,
    title: "Expanse EDU",
    subtitle: "Game Changing Engagement Solution For K-12 & Higher Education",
    section: "introduction",
    priority: "critical",
  },
  {
    id: "slide-009",
    slideNumber: 9,
    title: "Target 1: Engagement",
    subtitle: "Untapped Potential",
    content:
      "Our classrooms are filled with untapped potential, but too many students are disengaged, their minds wandering in a landscape of boredom.",
    section: "problem",
    priority: "critical",
  },
  {
    id: "slide-012",
    slideNumber: 12,
    title: "Target 1: Engagement",
    subtitle: "The Data",
    content: "45-50% of students report being engaged in school",
    section: "problem",
    priority: "critical",
  },
  {
    id: "slide-018",
    slideNumber: 18,
    title: "Goal: Increase Engagement and Motivation",
    content:
      "Expanse's solution is designed to boost intrinsic motivation, enable extrinsic motivation, and foster healthy competition.",
    section: "goals",
    priority: "critical",
  },
  {
    id: "slide-036",
    slideNumber: 36,
    title: "Scale: Student Counts",
    content: "75 million students in US (Fall 2022)",
    section: "market",
    priority: "critical",
    sensitive: true,
  },
]

const sectionColors: Record<string, string> = {
  introduction: "#3B82F6",
  problem: "#EF4444",
  goals: "#10B981",
  ux: "#8B5CF6",
  market: "#F59E0B",
  growth: "#06B6D4",
  product: "#EC4899",
  features: "#6366F1",
  extensions: "#14B8A6",
  closing: "#64748B",
}

const sectionIcons: Record<string, string> = {
  introduction: "👋",
  problem: "🎯",
  goals: "🏆",
  ux: "✨",
  market: "📊",
  growth: "🚀",
  product: "🎮",
  features: "⚡",
  extensions: "🔮",
  closing: "📝",
}

interface SlideCardProps {
  slide: (typeof mockSlides)[0]
  showNotes?: boolean
}

const SlideCard = ({ slide, showNotes = false }: SlideCardProps) => {
  const color = sectionColors[slide.section] || "#64748B"
  const icon = sectionIcons[slide.section] || "📄"

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        minHeight: 300,
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          bgcolor: color,
        },
      }}
    >
      <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
        <Chip
          label={`Slide ${slide.slideNumber}`}
          size="small"
          sx={{ bgcolor: color, color: "white", fontWeight: 600 }}
        />
        <Chip
          label={`${icon} ${slide.section}`}
          size="small"
          variant="outlined"
          sx={{ borderColor: color, color: color }}
        />
        {slide.sensitive && (
          <Chip
            label="🔒 Sensitive"
            size="small"
            color="warning"
            variant="outlined"
          />
        )}
        <Chip
          label={slide.priority}
          size="small"
          variant="outlined"
          sx={{
            ml: "auto",
            borderColor: slide.priority === "critical" ? "#EF4444" : "#F59E0B",
            color: slide.priority === "critical" ? "#EF4444" : "#F59E0B",
          }}
        />
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        {slide.title}
      </Typography>

      {slide.subtitle && (
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ fontWeight: 400, mb: 2 }}
        >
          {slide.subtitle}
        </Typography>
      )}

      {"content" in slide && slide.content && (
        <Box
          sx={{
            borderLeft: 4,
            borderColor: color,
            pl: 2,
            py: 1,
            bgcolor: alpha(color, 0.05),
            borderRadius: "0 8px 8px 0",
          }}
        >
          <Typography variant="body1" sx={{ fontStyle: "italic" }}>
            {slide.content}
          </Typography>
        </Box>
      )}
    </Paper>
  )
}

const meta: Meta = {
  title: "ExpanseEdu/Presentation/Slides",
  parameters: {
    layout: "padded",
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const TitleSlide: Story = {
  render: () => <SlideCard slide={mockSlides[0]} />,
}

export const ProblemSlide: Story = {
  render: () => <SlideCard slide={mockSlides[1]} />,
}

export const StatisticSlide: Story = {
  render: () => <SlideCard slide={mockSlides[2]} />,
}

export const GoalSlide: Story = {
  render: () => <SlideCard slide={mockSlides[3]} />,
}

export const SensitiveSlide: Story = {
  render: () => <SlideCard slide={mockSlides[4]} />,
}

export const SlidesGrid: Story = {
  render: () => (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        📑 Presentation Overview
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        112 slides across 10 sections • Full Expanse EDU Pitch Deck
      </Typography>
      <Grid container spacing={2}>
        {mockSlides.map((slide) => (
          <Grid item xs={12} md={6} lg={4} key={slide.id}>
            <SlideCard slide={slide} />
          </Grid>
        ))}
      </Grid>
    </Box>
  ),
}

export const SectionOverview: Story = {
  render: () => (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        📊 Sections
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(sectionColors).map(([section, color]) => (
          <Grid item xs={6} sm={4} md={3} key={section}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                borderTop: 4,
                borderColor: color,
              }}
            >
              <Typography variant="h4" sx={{ mb: 1 }}>
                {sectionIcons[section]}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, textTransform: "capitalize" }}
              >
                {section}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  ),
}
