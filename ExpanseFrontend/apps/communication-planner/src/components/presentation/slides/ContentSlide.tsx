"use client"

import { Box, Typography, Chip, alpha } from "@mui/material"
import {
  Refresh,
  EmojiObjects,
  AutoStories,
  Psychology,
  Info,
  Favorite,
  WorkspacePremium,
  TipsAndUpdates,
  RocketLaunch,
  FormatListBulleted,
  Campaign,
} from "@mui/icons-material"
import { ContentBlock } from "@/types"
import { slideStyles, gamingColors } from "../themes/gamingTheme"
import { briefText } from "../briefText"
import { RelatedBlocks } from "./RelatedBlocks"
import {
  SteppingStonesTimeline,
  TrappedVsFreedom,
  SharedInterestsBond,
  MarketRarityChart,
  PathComparison,
  FertilityTimeline,
} from "../images"

interface ContentSlideProps {
  title: string
  content: string
  blockType: ContentBlock["type"]
  imagePlaceholder?: ContentBlock["imagePlaceholder"]
  imageKey?: ContentBlock["imageKey"]
  related?: ContentBlock[]
  expanded?: boolean
}

const imageComponents: Record<
  NonNullable<ContentBlock["imageKey"]>,
  React.ComponentType<{ width?: number | string; height?: number | string }>
> = {
  steppingStonesTimeline: SteppingStonesTimeline,
  trappedVsFreedom: TrappedVsFreedom,
  sharedInterestsBond: SharedInterestsBond,
  marketRarityChart: MarketRarityChart,
  pathComparison: PathComparison,
  fertilityTimeline: FertilityTimeline,
}

const blockTypeConfig: Record<
  ContentBlock["type"],
  { icon: React.ReactNode; label: string; gradient: string; color: string }
> = {
  reframe: {
    icon: <Refresh />,
    label: "Perspective Shift",
    gradient: slideStyles.gradients.reframe,
    color: gamingColors.neonPurple,
  },
  story: {
    icon: <AutoStories />,
    label: "Story",
    gradient: slideStyles.gradients.story,
    color: gamingColors.textSecondary,
  },
  analogy: {
    icon: <Psychology />,
    label: "Analogy",
    gradient: slideStyles.gradients.insight,
    color: gamingColors.neonCyan,
  },
  context: {
    icon: <Info />,
    label: "Context",
    gradient: slideStyles.gradients.title,
    color: gamingColors.textSecondary,
  },
  implementation: {
    icon: <RocketLaunch />,
    label: "Implementation",
    gradient: slideStyles.gradients.story,
    color: gamingColors.textSecondary,
  },
  callout: {
    icon: <Campaign />,
    label: "Important",
    gradient: slideStyles.gradients.insight,
    color: gamingColors.neonPurple,
  },
  list: {
    icon: <FormatListBulleted />,
    label: "Key Points",
    gradient: slideStyles.gradients.title,
    color: gamingColors.neonCyan,
  },
  transformation: {
    icon: <TipsAndUpdates />,
    label: "Transformation",
    gradient: slideStyles.gradients.transformation,
    color: gamingColors.neonPurple,
  },
  insight: {
    icon: <EmojiObjects />,
    label: "Insight",
    gradient: slideStyles.gradients.insight,
    color: gamingColors.neonCyan,
  },
  meta: {
    icon: <Info />,
    label: "Note",
    gradient: slideStyles.gradients.title,
    color: gamingColors.textMuted,
  },
  credentials: {
    icon: <WorkspacePremium />,
    label: "Credentials",
    gradient: slideStyles.gradients.insight,
    color: gamingColors.textSecondary,
  },
  vulnerability: {
    icon: <Favorite />,
    label: "Shared Experience",
    gradient: slideStyles.gradients.transformation,
    color: gamingColors.neonCyan,
  },
  ambition: {
    icon: <RocketLaunch />,
    label: "Vision",
    gradient: slideStyles.gradients.reframe,
    color: gamingColors.neonPurple,
  },
}

function formatContent(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br />")
}

export function ContentSlide({
  title,
  content,
  blockType,
  imagePlaceholder,
  imageKey,
  related = [],
  expanded = false,
}: ContentSlideProps) {
  const config = blockTypeConfig[blockType] || blockTypeConfig.context
  const ImageComponent = imageKey ? imageComponents[imageKey] : null
  const hasVisual = Boolean(ImageComponent || imagePlaceholder)
  const displayVisual = hasVisual && expanded
  const displayText = expanded ? content : briefText(content)

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: expanded ? "flex-start" : "center",
        background: config.gradient,
        px: { xs: 4, md: 8 },
        py: expanded ? 5 : 6,
        position: "relative",
        overflow: expanded ? "auto" : "hidden",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
        <Chip
          icon={config.icon as React.ReactElement}
          label={config.label}
          sx={{
            bgcolor: alpha(config.color, 0.15),
            color: config.color,
            border: `1px solid ${alpha(config.color, 0.3)}`,
            "& .MuiChip-icon": {
              color: config.color,
            },
          }}
        />
      </Box>

      <Typography
        variant={expanded ? "h2" : "h3"}
        sx={{
          color: gamingColors.textPrimary,
          mb: 2.5,
          maxWidth: 880,
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          flex: expanded ? 1 : "none",
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 4,
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            flex: 1,
            maxWidth: displayVisual ? "60%" : 720,
          }}
        >
          {expanded ? (
            <Typography
              component="div"
              sx={{
                fontSize: "1.25rem",
                lineHeight: 1.7,
                color: gamingColors.textPrimary,
                "& strong": {
                  color: config.color,
                  fontWeight: 600,
                },
                "& p": {
                  mb: 2,
                },
              }}
              dangerouslySetInnerHTML={{
                __html: `<p>${formatContent(content)}</p>`,
              }}
            />
          ) : (
            <Typography
              sx={{
                fontSize: "1.35rem",
                lineHeight: 1.6,
                color: gamingColors.textPrimary,
                maxWidth: 720,
              }}
            >
              {displayText}
            </Typography>
          )}
        </Box>

        {displayVisual && (
          <Box
            sx={{
              width: { xs: "100%", lg: "35%" },
              minHeight: 160,
              borderRadius: 3,
              border: ImageComponent
                ? `1px solid ${alpha(config.color, 0.2)}`
                : `2px dashed ${alpha(config.color, 0.3)}`,
              bgcolor: alpha(config.color, 0.05),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: ImageComponent ? 1 : 3,
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            {ImageComponent ? (
              <ImageComponent width="100%" height="auto" />
            ) : imagePlaceholder ? (
              <>
                <Typography
                  variant="caption"
                  sx={{
                    color: alpha(gamingColors.textSecondary, 0.7),
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    mb: 1,
                  }}
                >
                  {imagePlaceholder.suggestedType}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: gamingColors.textSecondary }}
                >
                  {imagePlaceholder.description}
                </Typography>
              </>
            ) : null}
          </Box>
        )}
      </Box>

      {expanded && <RelatedBlocks blocks={related} />}
    </Box>
  )
}
