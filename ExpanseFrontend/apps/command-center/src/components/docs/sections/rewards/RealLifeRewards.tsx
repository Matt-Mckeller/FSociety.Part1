/**
 * Real Life Rewards Section
 *
 * Real-world rewards categorized by type.
 */
import PublicRounded from "@mui/icons-material/PublicRounded"
import { Typography, Box } from "@mui/material"
import { alpha } from "@mui/material/styles"
import { DocSection, DocGrid, DocCard, RewardHero, IconBadge } from "../../common"
import { rewards } from "../../../../data/docs"
import { realLifeCategoryMeta, humanizeKey } from "./rewardMeta"

export default function RealLifeRewards() {
  const categories = Object.entries(rewards.realLifeRewards)
  const totalRewards = categories.reduce(
    (sum, [, items]) => sum + (items as string[]).length,
    0
  )

  return (
    <DocSection title="Real Life Rewards" icon="🌍">
      <RewardHero
        icon={<PublicRounded />}
        title="Real Life Rewards"
        subtitle="Real-world incentives - scholarships, experiences, recognition, and more - that give students something tangible to work toward outside the app."
        gradient={["#0891B2", "#0E7490"]}
        stats={[
          { label: "categories", value: categories.length },
          { label: "reward ideas", value: totalRewards },
        ]}
      />

      {categories.map(([category, items]) => {
        const meta = realLifeCategoryMeta[category]
        const label = meta?.label ?? humanizeKey(category)
        const color = meta?.color ?? "#64748B"

        return (
          <Box key={category} sx={{ mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 1.5,
              }}
            >
              <IconBadge icon={meta?.icon ?? "🎁"} color={color} size="sm" />
              <Typography variant="h6" fontWeight={700} sx={{ color }}>
                {label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {(items as string[]).length} ideas
              </Typography>
            </Box>
            <DocGrid columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
              {(items as string[]).map((item, i) => (
                <DocCard
                  key={i}
                  title={item}
                  icon={<IconBadge icon={meta?.icon ?? "🎁"} color={color} size="sm" />}
                  accentColor={color}
                  compact
                  sx={{
                    bgcolor: alpha(color, 0.04),
                  }}
                />
              ))}
            </DocGrid>
          </Box>
        )
      })}
    </DocSection>
  )
}
