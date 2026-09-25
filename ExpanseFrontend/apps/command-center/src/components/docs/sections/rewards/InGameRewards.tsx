/**
 * In-Game Rewards Section
 *
 * In-game rewards, visual stimulation, and school improvements.
 */
import SportsEsportsRounded from "@mui/icons-material/SportsEsportsRounded"
import { Typography, Box } from "@mui/material"
import { alpha } from "@mui/material/styles"
import { DocSection, DocGrid, DocCard, DocChip, RewardHero, IconBadge } from "../../common"
import { rewards } from "../../../../data/docs"
import {
  inGameCategoryMeta,
  visualStimulationMeta,
  schoolImprovementsMeta,
  humanizeKey,
} from "./rewardMeta"

export default function InGameRewards() {
  const categories = Object.entries(rewards.inGameRewards)

  return (
    <DocSection title="In-Game Rewards" icon="🎮">
      <RewardHero
        icon={<SportsEsportsRounded />}
        title="In-Game Rewards"
        subtitle="Currency, achievements, and recognition earned inside the app - reinforced by animation and visual polish that make progress feel exciting."
        gradient={["#6B21A8", "#4C1D95"]}
        stats={[
          { label: "categories", value: categories.length },
          {
            label: "reward ideas",
            value: categories.reduce(
              (sum, [, items]) => sum + (items as string[]).length,
              0
            ),
          },
        ]}
      />

      {categories.map(([category, items]) => {
        const meta = inGameCategoryMeta[category]
        const label = meta?.label ?? humanizeKey(category)
        const color = meta?.color ?? "#6B21A8"

        return (
          <Box key={category} sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
              <IconBadge icon={meta?.icon ?? "🎮"} color={color} size="sm" />
              <Typography variant="h6" fontWeight={700} sx={{ color }}>
                {label}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {(items as string[]).map((item, i) => (
                <DocChip
                  key={i}
                  label={item}
                  sx={{
                    bgcolor: alpha(color, 0.1),
                    color,
                    border: `1px solid ${alpha(color, 0.3)}`,
                  }}
                />
              ))}
            </Box>
          </Box>
        )
      })}

      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <IconBadge icon={visualStimulationMeta.icon} color={visualStimulationMeta.color} />
          <Box>
            <Typography variant="h5" fontWeight={700}>
              {visualStimulationMeta.label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {rewards.visualStimulation.description}
            </Typography>
          </Box>
        </Box>
        <DocGrid columns={{ xs: 1, sm: 2 }} spacing={2}>
          {rewards.visualStimulation.examples.map((ex, i) => (
            <DocCard
              key={i}
              title={ex}
              icon="🎬"
              accentColor={visualStimulationMeta.color}
              compact
              sx={{ bgcolor: alpha(visualStimulationMeta.color, 0.04) }}
            />
          ))}
        </DocGrid>
      </Box>

      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
          <IconBadge icon={schoolImprovementsMeta.icon} color={schoolImprovementsMeta.color} />
          <Typography variant="h5" fontWeight={700}>
            {schoolImprovementsMeta.label}
          </Typography>
        </Box>
        <DocCard
          title="Collective, vote-driven upgrades"
          description={rewards.schoolImprovements.description}
          accentColor={schoolImprovementsMeta.color}
        >
          <Typography variant="subtitle2" gutterBottom sx={{ mt: 1 }}>
            Examples:
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
            {rewards.schoolImprovements.examples.map((ex, i) => (
              <DocChip
                key={i}
                label={ex}
                size="small"
                sx={{
                  bgcolor: alpha(schoolImprovementsMeta.color, 0.1),
                  color: schoolImprovementsMeta.color,
                }}
              />
            ))}
          </Box>
          <Typography variant="body2" color="text.secondary">
            <strong>Mechanism:</strong> {rewards.schoolImprovements.mechanism}
          </Typography>
        </DocCard>
      </Box>
    </DocSection>
  )
}
