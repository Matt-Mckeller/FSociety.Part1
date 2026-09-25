"use client"

import { Box, Typography, Paper, Chip, alpha } from "@mui/material"
import {
  ArrowForward,
  CheckCircle,
  Cancel,
  AutoAwesome,
} from "@mui/icons-material"
import { ContentBlock } from "@/types"
import { slideStyles, gamingColors } from "../themes/gamingTheme"
import { RelatedBlocks } from "./RelatedBlocks"

interface TransformationSlideProps {
  title: string
  content: string
  transformation: NonNullable<ContentBlock["transformation"]>
  related?: ContentBlock[]
  expanded?: boolean
}

export function TransformationSlide({
  title,
  content,
  transformation,
  related = [],
  expanded = false,
}: TransformationSlideProps) {
  const { before, after, catalyst, steps } = transformation
  const showDetails = expanded
  const showSteps = expanded && Boolean(steps?.length)

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: expanded ? "flex-start" : "center",
        background: slideStyles.gradients.transformation,
        px: { xs: 3, md: 6 },
        py: expanded ? 4 : 6,
        position: "relative",
        overflow: expanded ? "auto" : "hidden",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Chip
          icon={<AutoAwesome />}
          label="Learning shift"
          sx={{
            bgcolor: alpha(gamingColors.neonPurple, 0.18),
            color: gamingColors.neonCyan,
            border: `1px solid ${alpha(gamingColors.neonPurple, 0.35)}`,
            "& .MuiChip-icon": {
              color: gamingColors.neonCyan,
            },
          }}
        />
      </Box>

      <Typography
        variant={expanded ? "h3" : "h4"}
        sx={{
          color: gamingColors.textPrimary,
          mb: showDetails ? 1 : 3,
        }}
      >
        {title}
      </Typography>

      {showDetails && content && (
        <Typography
          variant="body1"
          sx={{ color: gamingColors.textSecondary, mb: 3 }}
        >
          {content}
        </Typography>
      )}

      <Box
        sx={{
          flex: expanded ? 1 : "none",
          display: "flex",
          gap: 3,
          alignItems: "stretch",
          position: "relative",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            p: expanded ? 3 : 2.5,
            bgcolor: alpha(gamingColors.textMuted, 0.1),
            border: `1px solid ${alpha(gamingColors.textMuted, 0.3)}`,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
            <Cancel sx={{ color: gamingColors.textMuted, fontSize: 20 }} />
            <Typography
              variant="overline"
              sx={{ color: gamingColors.textMuted, letterSpacing: 1.5 }}
            >
              {before.title}
            </Typography>
          </Box>

          <Typography
            variant={expanded ? "h5" : "h6"}
            sx={{ color: gamingColors.textSecondary, mb: showDetails ? 2 : 0 }}
          >
            {before.mindset}
          </Typography>

          {showDetails && (
            <>
              <Box sx={{ mb: 2 }}>
                {before.beliefs.slice(0, 4).map((belief, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: gamingColors.textMuted }}
                    >
                      •
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: gamingColors.textSecondary }}
                    >
                      {belief}
                    </Typography>
                  </Box>
                ))}
              </Box>

            </>
          )}
        </Paper>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: 1,
          }}
        >
          <ArrowForward
            sx={{
              fontSize: 36,
              color: gamingColors.neonCyan,
            }}
          />
          {showDetails && catalyst && (
            <Typography
              variant="caption"
              sx={{
                color: gamingColors.textSecondary,
                textAlign: "center",
                maxWidth: 120,
                mt: 1,
              }}
            >
              {catalyst.length > 50 ? `${catalyst.slice(0, 50)}...` : catalyst}
            </Typography>
          )}
        </Box>

        <Paper
          elevation={0}
          sx={{
            flex: 1,
            p: expanded ? 3 : 2.5,
            bgcolor: alpha(gamingColors.neonPurple, 0.1),
            border: `1px solid ${alpha(gamingColors.neonPurple, 0.35)}`,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
            <CheckCircle sx={{ color: gamingColors.neonCyan, fontSize: 20 }} />
            <Typography
              variant="overline"
              sx={{ color: gamingColors.neonCyan, letterSpacing: 1.5 }}
            >
              {after.title}
            </Typography>
          </Box>

          <Typography
            variant={expanded ? "h5" : "h6"}
            sx={{ color: gamingColors.textPrimary, mb: showDetails ? 2 : 0 }}
          >
            {after.mindset}
          </Typography>

          {showDetails && (
            <>
              <Box sx={{ mb: 2 }}>
                {after.beliefs.slice(0, 4).map((belief, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <CheckCircle
                      sx={{
                        color: gamingColors.neonCyan,
                        fontSize: 14,
                        mt: 0.25,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: gamingColors.textPrimary }}
                    >
                      {belief}
                    </Typography>
                  </Box>
                ))}
              </Box>

            </>
          )}
        </Paper>
      </Box>

      {showSteps && steps && (
        <Box
          sx={{
            mt: 3,
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {steps.map((step, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  bgcolor: gamingColors.neonCyan,
                  color: gamingColors.darkBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                }}
              >
                {idx + 1}
              </Box>
              <Typography
                variant="body2"
                sx={{ color: gamingColors.textSecondary }}
              >
                {step.label}
              </Typography>
              {idx < steps.length - 1 && (
                <ArrowForward
                  sx={{
                    fontSize: 14,
                    color: gamingColors.textMuted,
                    ml: 1,
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      )}

      {expanded && <RelatedBlocks blocks={related} />}
    </Box>
  )
}
