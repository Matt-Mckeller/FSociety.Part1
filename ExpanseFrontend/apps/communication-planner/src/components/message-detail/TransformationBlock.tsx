"use client"

import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  Chip,
  useTheme,
  alpha,
} from "@mui/material"
import {
  CheckCircleOutline,
  HighlightOff,
  ArrowDownward,
  AutoAwesome,
  EmojiObjects,
  TrendingUp,
} from "@mui/icons-material"
import { ContentBlock } from "@/types"

interface TransformationBlockProps {
  block: ContentBlock
}

export function TransformationBlock({ block }: TransformationBlockProps) {
  const theme = useTheme()
  const { transformation } = block

  if (!transformation) return null

  const { before, after, catalyst, steps } = transformation

  // Muted color palette
  const afterColor = theme.palette.primary.main
  const lightBg = theme.palette.grey[50]

  return (
    <Card
      sx={{
        mb: 2.5,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        boxShadow: "none",
        overflow: "hidden",
      }}
    >
      {/* Accent top border */}
      <Box
        sx={{
          height: 3,
          background: `linear-gradient(90deg, ${theme.palette.grey[400]} 0%, ${afterColor} 100%)`,
        }}
      />
      <CardContent sx={{ p: 3 }}>
        {/* 1. HEADER - What is this transformation about? */}
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 3 }}>
          <AutoAwesome
            sx={{
              color: afterColor,
              fontSize: 24,
              mt: 0.25,
              opacity: 0.8,
            }}
          />
          <Box>
            <Typography
              variant="h6"
              fontWeight={600}
              color="text.primary"
              sx={{ mb: 0.5, lineHeight: 1.3 }}
            >
              {block.label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {block.content}
            </Typography>
          </Box>
        </Box>

        {/* 2. BEFORE STATE - Where are we starting from? */}
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            bgcolor: alpha(theme.palette.grey[100], 0.7),
            border: "1px solid",
            borderColor: "grey.300",
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                bgcolor: "grey.400",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                fontWeight: 700,
              }}
            >
              1
            </Box>
            <Typography
              variant="overline"
              sx={{ color: "grey.600", letterSpacing: 1.2, fontWeight: 600 }}
            >
              {before.title}
            </Typography>
          </Box>

          <Typography
            variant="subtitle1"
            fontWeight={600}
            color="text.primary"
            sx={{ mb: 2 }}
          >
            {before.mindset}
          </Typography>

          {/* Beliefs */}
          <Box sx={{ mb: 2 }}>
            {before.beliefs.map((belief, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                  mb: 0.75,
                }}
              >
                <HighlightOff
                  sx={{ color: "grey.500", fontSize: 16, mt: 0.25 }}
                />
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ lineHeight: 1.5 }}
                >
                  {belief}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Emotions */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
            {before.emotions.map((emotion) => (
              <Chip
                key={emotion}
                label={emotion}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: "grey.400",
                  color: "grey.700",
                  fontSize: "0.7rem",
                  height: 24,
                }}
              />
            ))}
          </Box>

          {/* Outcome */}
          <Box
            sx={{
              p: 1.5,
              bgcolor: "white",
              borderRadius: 1,
              border: "1px solid",
              borderColor: "grey.300",
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              If unchanged →
            </Typography>
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ mt: 0.25 }}
            >
              {before.outcome}
            </Typography>
          </Box>
        </Paper>

        {/* Vertical connector */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 1.5,
          }}
        >
          <Box sx={{ width: 2, height: 16, bgcolor: "grey.300" }} />
          <ArrowDownward sx={{ color: "grey.400", fontSize: 20 }} />
        </Box>

        {/* 3. CATALYST - What insight triggers change? */}
        <Box
          sx={{
            p: 2,
            bgcolor: alpha(afterColor, 0.04),
            borderRadius: 2,
            display: "flex",
            alignItems: "flex-start",
            gap: 1.5,
            border: "1px solid",
            borderColor: alpha(afterColor, 0.15),
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              bgcolor: alpha(afterColor, 0.15),
              color: afterColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            2
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <EmojiObjects sx={{ color: afterColor, fontSize: 18, opacity: 0.8 }} />
              <Typography
                variant="overline"
                fontWeight={600}
                sx={{ color: afterColor, letterSpacing: 0.5 }}
              >
                The Catalyst
              </Typography>
            </Box>
            <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.6 }}>
              {catalyst}
            </Typography>
          </Box>
        </Box>

        {/* Vertical connector */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 1.5,
          }}
        >
          <Box sx={{ width: 2, height: 16, bgcolor: alpha(afterColor, 0.3) }} />
          <ArrowDownward sx={{ color: alpha(afterColor, 0.5), fontSize: 20 }} />
        </Box>

        {/* 4. JOURNEY STEPS - How do we get there? */}
        {steps && steps.length > 0 && (
          <>
            <Box
              sx={{
                p: 2,
                bgcolor: lightBg,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "grey.200",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: alpha(afterColor, 0.3),
                    color: afterColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  3
                </Box>
                <Typography
                  variant="overline"
                  fontWeight={600}
                  color="text.secondary"
                  sx={{ letterSpacing: 0.5 }}
                >
                  The Journey
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {steps.map((step, index) => {
                  const progress = steps.length > 1 ? index / (steps.length - 1) : 1
                  const stepColor = alpha(afterColor, 0.4 + progress * 0.6)
                  const isLast = index === steps.length - 1

                  return (
                    <Box
                      key={step.label}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          bgcolor: isLast ? afterColor : stepColor,
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          flexShrink: 0,
                          mt: 0.25,
                        }}
                      >
                        {String.fromCharCode(97 + index)}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight={600} color="text.primary">
                          {step.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4 }}>
                          {step.description}
                        </Typography>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            </Box>

            {/* Vertical connector */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 1.5,
              }}
            >
              <Box sx={{ width: 2, height: 16, bgcolor: alpha(afterColor, 0.5) }} />
              <ArrowDownward sx={{ color: afterColor, fontSize: 20 }} />
            </Box>
          </>
        )}

        {/* 5. AFTER STATE - What's the destination/outcome? */}
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            bgcolor: alpha(afterColor, 0.04),
            border: "1px solid",
            borderColor: alpha(afterColor, 0.2),
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                bgcolor: afterColor,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                fontWeight: 700,
              }}
            >
              {steps && steps.length > 0 ? 4 : 3}
            </Box>
            <Typography
              variant="overline"
              sx={{ color: afterColor, letterSpacing: 1.2, fontWeight: 600 }}
            >
              {after.title}
            </Typography>
            <TrendingUp sx={{ color: afterColor, fontSize: 18, ml: "auto", opacity: 0.7 }} />
          </Box>

          <Typography
            variant="subtitle1"
            fontWeight={600}
            color="text.primary"
            sx={{ mb: 2 }}
          >
            {after.mindset}
          </Typography>

          {/* Beliefs */}
          <Box sx={{ mb: 2 }}>
            {after.beliefs.map((belief, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                  mb: 0.75,
                }}
              >
                <CheckCircleOutline
                  sx={{ color: afterColor, fontSize: 16, mt: 0.25 }}
                />
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ lineHeight: 1.5 }}
                >
                  {belief}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Emotions */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
            {after.emotions.map((emotion) => (
              <Chip
                key={emotion}
                label={emotion}
                size="small"
                sx={{
                  bgcolor: alpha(afterColor, 0.12),
                  color: afterColor,
                  border: "none",
                  fontSize: "0.7rem",
                  height: 24,
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>

          {/* Outcome */}
          <Box
            sx={{
              p: 1.5,
              bgcolor: alpha(afterColor, 0.08),
              borderRadius: 1,
              borderLeft: "3px solid",
              borderColor: afterColor,
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: afterColor, fontWeight: 600 }}
            >
              Expected Outcome
            </Typography>
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ mt: 0.25 }}
            >
              {after.outcome}
            </Typography>
          </Box>
        </Paper>

        {/* 6. PSYCH STEPS BADGE - Technical footer */}
        {block.psychApproachSteps && block.psychApproachSteps.length > 0 && (
          <Box
            sx={{
              mt: 2.5,
              pt: 2,
              borderTop: "1px solid",
              borderColor: "grey.200",
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Addresses:
            </Typography>
            {block.psychApproachSteps.map((step) => (
              <Chip
                key={step}
                label={`Step ${step}`}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: "grey.300",
                  color: "text.secondary",
                  height: 20,
                  fontSize: "0.65rem",
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
