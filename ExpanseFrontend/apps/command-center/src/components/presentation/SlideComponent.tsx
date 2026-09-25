/**
 * Slide Component - Renders a single presentation slide
 */
import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Chip,
  alpha,
  Divider,
  IconButton,
  Collapse,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import type { Slide, SlideContent } from "../../data/presentation/types"
import { getSectionForSlide } from "../../data/presentation/sections"
import {
  getPrimaryImage,
  getSlideAssets,
  getSlideAnimations,
  isAnimation,
} from "../../data/presentation/assetMapping"
import { getSlideChart } from "./SlideCharts"

interface SlideComponentProps {
  slide: Slide
  showNotes?: boolean
  compact?: boolean
}

const ContentRenderer = ({ content }: { content: SlideContent }) => {
  switch (content.type) {
    case "text":
      return (
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            fontSize: "1.1rem",
            lineHeight: 1.7,
            color: "text.primary",
          }}
        >
          {content.value as string}
        </Typography>
      )

    case "bullets":
      return (
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          {(content.value as string[]).map((item, idx) => (
            <Typography
              component="li"
              key={idx}
              sx={{
                mb: 1,
                fontSize: "1.05rem",
                lineHeight: 1.6,
                "&::marker": {
                  color: "primary.main",
                },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      )

    case "quote":
      return (
        <Box
          sx={{
            borderLeft: 4,
            borderColor: "primary.main",
            pl: 3,
            py: 2,
            my: 2,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
            borderRadius: "0 8px 8px 0",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontStyle: "italic",
              fontSize: "1.15rem",
              lineHeight: 1.8,
              color: "text.primary",
            }}
          >
            "{content.value as string}"
          </Typography>
        </Box>
      )

    case "statistic":
      return (
        <Box
          sx={{
            textAlign: "center",
            py: 3,
            my: 2,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              mb: 1,
            }}
          >
            {content.value as string}
          </Typography>
        </Box>
      )

    case "image":
      return (
        <Box
          sx={{
            textAlign: "center",
            my: 2,
          }}
        >
          <Box
            component="img"
            src={content.value as string}
            alt={content.label || "Slide image"}
            sx={{
              maxWidth: "100%",
              maxHeight: 400,
              borderRadius: 2,
              boxShadow: 2,
            }}
          />
          {content.label && (
            <Typography
              variant="caption"
              sx={{ mt: 1, display: "block", color: "text.secondary" }}
            >
              {content.label}
            </Typography>
          )}
        </Box>
      )

    default:
      return (
        <Typography variant="body1" sx={{ mb: 2 }}>
          {typeof content.value === "string"
            ? content.value
            : JSON.stringify(content.value)}
        </Typography>
      )
  }
}

// Component for rendering slide images from asset mapping
function SlideImages({
  slideNumber,
  compact,
}: {
  slideNumber: number
  compact: boolean
}) {
  const [showAll, setShowAll] = useState(false)
  const primaryImage = getPrimaryImage(slideNumber)
  const allAssets = getSlideAssets(slideNumber)
  const animations = getSlideAnimations(slideNumber)

  if (!primaryImage && allAssets.length === 0) return null

  const hasMultiple = allAssets.length > 1

  return (
    <Box sx={{ mb: 2 }}>
      {/* Primary image */}
      {primaryImage && (
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Box
            component="img"
            src={primaryImage}
            alt={`Slide ${slideNumber} visual`}
            sx={{
              maxWidth: "100%",
              maxHeight: compact ? 200 : 350,
              borderRadius: 2,
              boxShadow: 2,
              objectFit: "contain",
            }}
            onError={(e) => {
              // Hide broken images
              ;(e.target as HTMLImageElement).style.display = "none"
            }}
          />
        </Box>
      )}

      {/* Animations */}
      {animations.length > 0 && (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            justifyContent: "center",
            mb: 2,
          }}
        >
          {animations.slice(0, showAll ? undefined : 2).map((animUrl, idx) => (
            <Box
              key={idx}
              component="img"
              src={animUrl}
              alt={`Animation ${idx + 1}`}
              sx={{
                maxWidth: compact ? 150 : 200,
                maxHeight: compact ? 150 : 200,
                borderRadius: 2,
                border: "2px solid",
                borderColor: "primary.light",
              }}
              onError={(e) => {
                ;(e.target as HTMLImageElement).style.display = "none"
              }}
            />
          ))}
        </Box>
      )}

      {/* Toggle for more assets */}
      {hasMultiple && allAssets.length > 3 && (
        <Box sx={{ textAlign: "center" }}>
          <IconButton
            size="small"
            onClick={() => setShowAll(!showAll)}
            sx={{ color: "text.secondary" }}
          >
            {showAll ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {showAll ? "Show less" : `+${allAssets.length - 3} more assets`}
          </Typography>
        </Box>
      )}

      {/* All assets in collapsed view */}
      <Collapse in={showAll}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            justifyContent: "center",
            mt: 2,
          }}
        >
          {allAssets.slice(3).map((assetUrl, idx) => (
            <Box
              key={idx}
              component="img"
              src={assetUrl}
              alt={`Asset ${idx + 4}`}
              sx={{
                width: 80,
                height: 80,
                objectFit: "cover",
                borderRadius: 1,
                border: "1px solid",
                borderColor: isAnimation(assetUrl)
                  ? "primary.light"
                  : "grey.300",
              }}
              onError={(e) => {
                ;(e.target as HTMLImageElement).style.display = "none"
              }}
            />
          ))}
        </Box>
      </Collapse>
    </Box>
  )
}

// Special layout for section header slides
function SectionHeaderLayout({
  slide,
  section,
  compact,
}: {
  slide: Slide
  section: ReturnType<typeof getSectionForSlide>
  compact: boolean
}) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: compact ? 4 : 6,
        minHeight: compact ? 300 : 450,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
        background: section
          ? `linear-gradient(135deg, ${alpha(section.color, 0.15)} 0%, ${alpha(section.color, 0.05)} 100%)`
          : undefined,
        "&::before": section
          ? {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 6,
              bgcolor: section.color,
            }
          : undefined,
        "&::after": section
          ? {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 6,
              bgcolor: section.color,
            }
          : undefined,
      }}
    >
      {/* Section Icon */}
      {section && (
        <Typography
          sx={{
            fontSize: compact ? "3rem" : "4rem",
            mb: 2,
          }}
        >
          {section.icon}
        </Typography>
      )}

      {/* Slide number chip */}
      <Chip
        label={`Slide ${slide.slideNumber}`}
        size="small"
        sx={{
          bgcolor: section?.color || "grey.400",
          color: "white",
          fontWeight: 600,
          mb: 3,
        }}
      />

      {/* Title */}
      <Typography
        variant={compact ? "h4" : "h3"}
        sx={{
          fontWeight: 800,
          color: section?.color || "text.primary",
          mb: 2,
          maxWidth: "80%",
        }}
      >
        {slide.title}
      </Typography>

      {/* Subtitle */}
      {slide.subtitle && (
        <Typography
          variant={compact ? "h6" : "h5"}
          sx={{
            color: "text.secondary",
            fontWeight: 400,
            mb: 4,
            maxWidth: "70%",
          }}
        >
          {slide.subtitle}
        </Typography>
      )}

      {/* Content bullets as section overview */}
      <Box sx={{ mt: 2 }}>
        {slide.content.map((content, idx) => {
          if (content.type === "bullets" && Array.isArray(content.value)) {
            return (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                {(content.value as string[]).map((item, i) => (
                  <Chip
                    key={i}
                    label={item}
                    variant="outlined"
                    sx={{
                      borderColor: section?.color || "primary.main",
                      color: section?.color || "primary.main",
                      fontWeight: 500,
                      fontSize: "0.9rem",
                      py: 2,
                    }}
                  />
                ))}
              </Box>
            )
          }
          return <ContentRenderer key={idx} content={content} />
        })}
      </Box>
    </Paper>
  )
}

export function SlideComponent({
  slide,
  showNotes = true,
  compact = false,
}: SlideComponentProps) {
  const section = getSectionForSlide(slide.slideNumber)

  // Use section header layout for section divider slides
  if (slide.layout === "section-header") {
    return (
      <Box>
        <SectionHeaderLayout
          slide={slide}
          section={section}
          compact={compact}
        />
        {/* Notes for section headers */}
        {showNotes && slide.notes && (
          <Box
            sx={{
              mt: 2,
              bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
              borderRadius: 2,
              p: 2,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ color: "info.main", fontWeight: 600, mb: 0.5 }}
            >
              📝 Speaker Notes
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontStyle: "italic" }}
            >
              {slide.notes}
            </Typography>
          </Box>
        )}
      </Box>
    )
  }

  return (
    <Paper
      elevation={2}
      sx={{
        p: compact ? 3 : 4,
        minHeight: compact ? "auto" : 400,
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
        "&::before": section
          ? {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              bgcolor: section.color,
            }
          : undefined,
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Chip
            label={`Slide ${slide.slideNumber}`}
            size="small"
            sx={{
              bgcolor: section?.color || "grey.200",
              color: "white",
              fontWeight: 600,
            }}
          />
          {section && (
            <Chip
              label={`${section.icon} ${section.title}`}
              size="small"
              variant="outlined"
              sx={{ borderColor: section.color, color: section.color }}
            />
          )}
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
              borderColor:
                slide.priority === "critical"
                  ? "error.main"
                  : slide.priority === "important"
                    ? "warning.main"
                    : "grey.400",
              color:
                slide.priority === "critical"
                  ? "error.main"
                  : slide.priority === "important"
                    ? "warning.main"
                    : "grey.600",
            }}
          />
        </Box>

        <Typography
          variant={compact ? "h5" : "h4"}
          sx={{
            fontWeight: 700,
            color: "text.primary",
            mb: slide.subtitle ? 1 : 0,
          }}
        >
          {slide.title}
        </Typography>

        {slide.subtitle && (
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontWeight: 400,
            }}
          >
            {slide.subtitle}
          </Typography>
        )}
      </Box>

      {/* Interactive Chart (if available for this slide) */}
      {(() => {
        const ChartComponent = getSlideChart(slide.slideNumber)
        if (ChartComponent) {
          return (
            <Box sx={{ my: 2, p: 2, bgcolor: "grey.50", borderRadius: 2 }}>
              <ChartComponent />
            </Box>
          )
        }
        return null
      })()}

      {/* Slide Images from PowerPoint */}
      <SlideImages slideNumber={slide.slideNumber} compact={compact} />

      {/* Content */}
      <Box sx={{ flex: 1 }}>
        {slide.content.map((content, idx) => (
          <ContentRenderer key={idx} content={content} />
        ))}
      </Box>

      {/* Notes */}
      {showNotes && slide.notes && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box
            sx={{
              bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
              borderRadius: 2,
              p: 2,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: "info.main",
                fontWeight: 600,
                mb: 0.5,
              }}
            >
              📝 Speaker Notes
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontStyle: "italic",
              }}
            >
              {slide.notes}
            </Typography>
          </Box>
        </>
      )}
    </Paper>
  )
}
