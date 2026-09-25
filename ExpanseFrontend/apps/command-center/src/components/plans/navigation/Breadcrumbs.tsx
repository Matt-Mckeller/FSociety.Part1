import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from "@mui/material"
import { Link as RouterLink, useLocation } from "react-router-dom"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import HomeIcon from "@mui/icons-material/Home"
import { PLANS_BASE_PATH } from "../../../constants"

/**
 * Labels for path segments
 */
const pathLabels: Record<string, string> = {
  "future-ideas": "Future Ideas",
  generation: "Generation Module",
  overview: "Overview",
  "create-content": "Create Content",
  "process-flow": "Process Flow",
  "content-type-flows": "Content Type Flows",
  "ux-ui": "UX/UI",
  "review-process": "Review Process",
  scheduling: "Scheduling",
  internationalization: "Internationalization",
  "content-library": "Content Library",
  configuration: "Configuration",
  questions: "Questions",
  screens: "Screens",
  "design-mockups": "Design Mockups",
  pipelines: "Pipelines & Review",
  "data-stacking": "Data Stacking",
  "audience-reviews": "Audience Reviews",
  "cultural-alignment": "Cultural Alignment",
  "perspective-balancing": "Perspective Balancing",
  "design-review": "Design Review",
  examples: "Examples",
  "business-profile": "Business Profile",
  "personal-profile": "Personal Profile",
  "brand-voice": "Brand Voice",
  "company-goals": "Company Goals",
  "company-purpose": "Company Purpose",
  "custom-instructions": "Custom Instructions",
  "prompt-examples": "Prompt Examples",
  assets: "Assets",
  "few-shot-examples": "Few Shot Examples",
  audience: "Audience",
  marketing: "Marketing",
  learning: "Learning",
}

/**
 * Segments that should NOT be clickable (no valid route)
 */
const nonClickableSegments = new Set(["docs", "plans", "modules"])

export function Breadcrumbs() {
  const location = useLocation()

  // Get segments after /docs/plans (skip first 2)
  const allSegments = location.pathname.split("/").filter(Boolean)
  const relevantSegments = allSegments.slice(2) // Skip 'docs' and 'plans'

  // If we're at the dashboard, don't show extra breadcrumbs
  if (relevantSegments.length === 0) {
    return null
  }

  return (
    <MuiBreadcrumbs
      separator={
        <NavigateNextIcon sx={{ fontSize: 16, color: "text.disabled" }} />
      }
      sx={{
        mb: 2.5,
        "& .MuiBreadcrumbs-ol": {
          flexWrap: "nowrap",
        },
      }}
    >
      <Link
        component={RouterLink}
        to={PLANS_BASE_PATH}
        color="inherit"
        underline="hover"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          color: "text.secondary",
          fontSize: "0.875rem",
          transition: "color 0.15s ease",
          "&:hover": {
            color: "primary.main",
          },
        }}
      >
        <HomeIcon sx={{ fontSize: 18 }} />
        Plans
      </Link>
      {relevantSegments.map((segment, index) => {
        // Build path from base + relevant segments up to this point
        const path = `${PLANS_BASE_PATH}/${relevantSegments.slice(0, index + 1).join("/")}`
        const isLast = index === relevantSegments.length - 1
        const label = pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
        const isClickable = !nonClickableSegments.has(segment)

        return isLast || !isClickable ? (
          <Typography
            key={path}
            sx={{
              color: isLast ? "text.primary" : "text.secondary",
              fontWeight: isLast ? 500 : 400,
              fontSize: "0.875rem",
            }}
          >
            {label}
          </Typography>
        ) : (
          <Link
            key={path}
            component={RouterLink}
            to={path}
            color="inherit"
            underline="hover"
            sx={{
              color: "text.secondary",
              fontSize: "0.875rem",
              transition: "color 0.15s ease",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            {label}
          </Link>
        )
      })}
    </MuiBreadcrumbs>
  )
}
