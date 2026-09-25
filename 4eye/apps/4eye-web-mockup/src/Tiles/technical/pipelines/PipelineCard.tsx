"use client";

import { Box, Button, Chip, Divider, Stack, Typography, alpha } from "@mui/material";
import { motion } from "framer-motion";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";

import {
  STAGE_STATUS_COLOR,
  PIPELINE_STATUS_META,
  type PipelineCharacter,
  type PipelineStage,
  type PipelineStat,
} from "./data";

function StageRow({ stage, accent, isLast }: { stage: PipelineStage; accent: string; isLast: boolean }) {
  const dotColor = STAGE_STATUS_COLOR[stage.status];
  const { Icon } = stage;
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1.25,
          px: 1.25,
          py: 0.875,
          borderRadius: 1.5,
          border: "1px solid",
          borderColor: alpha(accent, 0.18),
          bgcolor: alpha(accent, 0.04),
        }}
      >
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 1,
            bgcolor: alpha(accent, 0.12),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            mt: 0.125,
          }}
        >
          <Icon sx={{ fontSize: 16, color: accent }} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" alignItems="center" gap={0.75}>
            <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
              {stage.name}
            </Typography>
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: dotColor, flexShrink: 0 }} />
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary", display: "block", lineHeight: 1.4 }}>
            {stage.description}
          </Typography>
        </Box>
      </Box>
      {!isLast && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 0.25 }}>
          <ArrowDownwardRoundedIcon sx={{ fontSize: 14, color: alpha(accent, 0.45) }} />
        </Box>
      )}
    </Box>
  );
}

function StatRow({ stat }: { stat: PipelineStat }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
      <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>
        {stat.label}
      </Typography>
      <Typography
        variant="caption"
        sx={{ fontWeight: 800, color: stat.accent ?? "text.primary", fontVariantNumeric: "tabular-nums" }}
      >
        {stat.value}
      </Typography>
    </Box>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: -36, scale: 0.82 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export function PipelineCard({
  pipeline,
  dimmed,
  equipped,
  onHover,
  onToggleEquip,
}: {
  pipeline: PipelineCharacter;
  /** Lowered emphasis when another card is hovered. */
  dimmed?: boolean;
  equipped?: boolean;
  onHover?: (id: string | null) => void;
  onToggleEquip?: () => void;
}) {
  const { color, Icon } = pipeline;
  const statusMeta = PIPELINE_STATUS_META[pipeline.status];

  return (
    <Box
      component={motion.div}
      variants={cardVariants}
      transition={{ type: "spring", stiffness: 90, damping: 16 }}
      onMouseEnter={() => onHover?.(pipeline.id)}
      onMouseLeave={() => onHover?.(null)}
      sx={{
        position: "relative",
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: alpha(color, equipped ? 0.45 : 0.22),
        borderLeft: `4px solid ${color}`,
        bgcolor: "background.paper",
        overflow: "hidden",
        opacity: dimmed ? 0.55 : 1,
        transition: "opacity 0.2s, box-shadow 0.2s",
        boxShadow: dimmed ? "none" : `0 6px 24px -12px ${alpha(color, equipped ? 0.9 : 0.7)}`,
      }}
    >
      {/* connector nub pointing back up toward the spine */}
      <Box
        sx={{
          position: "absolute",
          top: -7,
          left: 28,
          width: 12,
          height: 12,
          borderRadius: "50%",
          bgcolor: color,
          boxShadow: `0 0 10px 1px ${alpha(color, 0.8)}`,
        }}
      />

      {/* ── Header ── */}
      <Box sx={{ px: 2, pt: 2, pb: 1.5 }}>
        <Stack direction="row" alignItems="flex-start" gap={1.5}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              bgcolor: alpha(color, 0.14),
              border: `1px solid ${alpha(color, 0.3)}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon sx={{ fontSize: 24, color }} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap">
              <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                {pipeline.name}
              </Typography>
              <Chip
                label={statusMeta.label}
                size="small"
                sx={{
                  height: 18,
                  fontSize: "0.62rem",
                  fontWeight: 800,
                  bgcolor: alpha(statusMeta.color, 0.12),
                  color: statusMeta.color,
                  border: `1px solid ${alpha(statusMeta.color, 0.35)}`,
                  "& .MuiChip-label": { px: 0.75 },
                }}
              />
            </Stack>
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.25 }}>
              {pipeline.subtext}
            </Typography>
            {onToggleEquip && (
              <Button
                size="small"
                variant={equipped ? "outlined" : "contained"}
                startIcon={
                  equipped ? (
                    <RemoveCircleOutlineRoundedIcon sx={{ fontSize: 16 }} />
                  ) : (
                    <AddCircleOutlineRoundedIcon sx={{ fontSize: 16 }} />
                  )
                }
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleEquip();
                }}
                sx={{
                  mt: 1,
                  textTransform: "none",
                  fontWeight: 800,
                  borderRadius: 2,
                  ...(equipped
                    ? { borderColor: alpha(color, 0.45), color }
                    : { bgcolor: color, color: "#fff", "&:hover": { bgcolor: alpha(color, 0.85) } }),
                }}
              >
                {equipped ? "Unequip" : "Equip"}
              </Button>
            )}
          </Box>
        </Stack>

        {/* Stats */}
        <Box
          sx={{
            mt: 1.5,
            px: 1.25,
            py: 1,
            borderRadius: 1.5,
            bgcolor: alpha(color, 0.04),
            border: "1px solid",
            borderColor: alpha(color, 0.1),
          }}
        >
          <Stack spacing={0.4}>
            {pipeline.stats.map((s) => (
              <StatRow key={s.label} stat={s} />
            ))}
          </Stack>
        </Box>
      </Box>

      <Divider sx={{ borderColor: alpha(color, 0.1) }} />

      {/* ── Stages ── */}
      <Box sx={{ px: 2, pt: 1.25, pb: 1.75 }}>
        <Typography
          variant="overline"
          sx={{ fontWeight: 800, color: "text.secondary", letterSpacing: 0.6, display: "block", mb: 0.75 }}
        >
          Flow Stages
        </Typography>
        <Stack spacing={0}>
          {pipeline.stages.map((stage, idx) => (
            <StageRow key={stage.id} stage={stage} accent={color} isLast={idx === pipeline.stages.length - 1} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
