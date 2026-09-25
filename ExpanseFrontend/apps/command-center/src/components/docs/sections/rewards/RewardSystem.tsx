/**
 * Reward System Section
 *
 * Overview of reward system, loot boxes, and classifications.
 */
import CasinoRounded from "@mui/icons-material/CasinoRounded"
import { Typography, Box, Divider } from "@mui/material"
import { alpha } from "@mui/material/styles"
import {
  DocSection,
  DocGrid,
  DocCard,
  DocAlert,
  RarityChip,
  RewardHero,
  IconBadge,
  DocAccordion,
  DocChip,
} from "../../common"
import { rewards } from "../../../../data/docs"
import type { RewardClassification, RewardMedium } from "../../../../types/docs"
import {
  classificationGroupMeta,
  isSystemClassification,
  mediumMeta,
} from "./rewardMeta"

export default function RewardSystem() {
  const classifications = rewards.rewardClassifications as RewardClassification[]
  const systemClassifications = classifications.filter((c) =>
    isSystemClassification(c.id)
  )
  const externalClassifications = classifications.filter(
    (c) => !isSystemClassification(c.id)
  )
  const mediums = rewards.rewardMediums as RewardMedium[]

  return (
    <DocSection title="Reward System Overview" icon="🎁">
      <RewardHero
        icon={<CasinoRounded />}
        title="Reward System"
        subtitle={rewards.overview.summary}
        gradient={["#9333EA", "#6B21A8"]}
        stats={[
          { label: "classifications", value: classifications.length },
          { label: "reward mediums", value: mediums.length },
          { label: "rarity tiers", value: rewards.lootBoxes.rarityLevels.length },
        ]}
      />

      <DocAlert severity="info" title="Philosophy">
        {rewards.overview.philosophy}
      </DocAlert>

      <DocCard
        title="Loot Boxes"
        icon={<IconBadge icon={<CasinoRounded />} color="#D97706" />}
        description={rewards.lootBoxes.description}
        sx={{ my: 3 }}
      >
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
          {rewards.lootBoxes.rarityLevels.map((level, i) => (
            <RarityChip key={i} rarity={level} />
          ))}
        </Box>
      </DocCard>

      <Typography variant="h5" fontWeight={700} gutterBottom>
        Reward Classifications
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
          <IconBadge
            icon={classificationGroupMeta.system.icon}
            color={classificationGroupMeta.system.color}
            size="sm"
          />
          <Typography variant="h6" fontWeight={700} sx={{ color: classificationGroupMeta.system.color }}>
            {classificationGroupMeta.system.title}
          </Typography>
        </Box>
        <DocGrid columns={{ xs: 2, sm: 3, md: 5 }} spacing={1.5}>
          {systemClassifications.map((cls) => (
            <DocCard
              key={cls.id}
              title={cls.name}
              accentColor={classificationGroupMeta.system.color}
              compact
              sx={{
                textAlign: "center",
                bgcolor: alpha(classificationGroupMeta.system.color, 0.04),
              }}
            >
              <Typography variant="h4" sx={{ mt: -1 }}>
                {cls.icon}
              </Typography>
            </DocCard>
          ))}
        </DocGrid>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
          <IconBadge
            icon={classificationGroupMeta.external.icon}
            color={classificationGroupMeta.external.color}
            size="sm"
          />
          <Typography variant="h6" fontWeight={700} sx={{ color: classificationGroupMeta.external.color }}>
            {classificationGroupMeta.external.title}
          </Typography>
        </Box>
        <DocGrid columns={{ xs: 2, sm: 3, md: 5 }} spacing={1.5}>
          {externalClassifications.map((cls) => (
            <DocCard
              key={cls.id}
              title={cls.name}
              accentColor={classificationGroupMeta.external.color}
              compact
              sx={{
                textAlign: "center",
                bgcolor: alpha(classificationGroupMeta.external.color, 0.04),
              }}
            >
              <Typography variant="h4" sx={{ mt: -1 }}>
                {cls.icon}
              </Typography>
            </DocCard>
          ))}
        </DocGrid>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" fontWeight={700} gutterBottom>
        Reward Mediums
      </Typography>
      <DocGrid columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        {mediums.map((medium) => {
          const meta = mediumMeta[medium.id]
          const color = meta?.color ?? "#6B21A8"
          return (
            <DocCard
              key={medium.id}
              title={medium.name}
              description={medium.description}
              icon={<IconBadge icon={meta?.icon ?? "🎁"} color={color} />}
              accentColor={color}
              sx={{ bgcolor: alpha(color, 0.04) }}
            />
          )
        })}
      </DocGrid>

      <Divider sx={{ my: 3 }} />

      <DocAccordion
        title="Technical Reward Data Model"
        icon="🧩"
        subtitle="Backend schema for implementing rewards"
        defaultExpanded={false}
      >
        {rewards.rewardDataModel.coreFields.map((field) => (
          <Box key={field.field} sx={{ mb: 2.5 }}>
            <Typography variant="subtitle2" fontWeight={700}>
              {field.field}
            </Typography>
            {field.description && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {field.description}
              </Typography>
            )}
            {field.values && (
              <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                {field.values.map((v) => (
                  <DocChip key={v} label={v} size="small" variant="outlined" />
                ))}
              </Box>
            )}
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
          Quantity Fields
        </Typography>
        <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", mb: 2.5 }}>
          {rewards.rewardDataModel.quantityFields.map((f) => (
            <DocChip key={f.field} label={f.field} size="small" variant="outlined" />
          ))}
        </Box>

        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
          Financial Fields
        </Typography>
        <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
          {rewards.rewardDataModel.financialFields.map((f) => (
            <DocChip key={f.field} label={f.field} size="small" variant="outlined" />
          ))}
        </Box>
      </DocAccordion>
    </DocSection>
  )
}
