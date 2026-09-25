"use client";

/**
 * EquippedPipelines — the character's currently slotted pipelines, grouped by
 * layer. Compact readout for the profile; the full body-and-cards experience
 * lives on the Pipelines page.
 *
 * Loadout is per user profile. Unequip with the row's remove control; add
 * pipelines back from the same panel (or open the Pipelines page to place
 * them on the body).
 */

import * as React from "react";
import { Box, Button, IconButton, Stack, Tooltip, Typography, alpha } from "@mui/material";
import NextLink from "next/link";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

import { route } from "@4eye/web/lib/routes";
import { useProfilesOptional } from "@4eye/web/Tiles/profiles/store/ProfileProvider";
import { Empty } from "./shared/EquipSlot";
import { ShowMore, useCapped } from "./shared/ShowMore";
import { useChannelInks } from "../theme/characterPalette";

import {
  PIPELINE_LAYERS,
  PIPELINES,
  SLOT_POSITION_XY,
  SLOT_TYPE_META,
  equippedAll,
  type PipelineLayerId,
} from "@4eye/web/Tiles/technical/pipelines/data";
import { SlotDisc } from "@4eye/web/Tiles/technical/pipelines/SlotDisc";
import { PipelinePickerMenu } from "@4eye/web/Tiles/technical/pipelines/PipelinePickerMenu";
import {
  setPipelineProfile,
  usePipelineLoadout,
} from "@4eye/web/Tiles/technical/pipelines/loadout";

const HEAD = 6;

export function EquippedPipelines() {
  const profileId = useProfilesOptional()?.profile.id;
  const loadout = usePipelineLoadout(profileId);
  const channels = useChannelInks();
  const ink = channels.equipped.ink;
  const [addAnchor, setAddAnchor] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (profileId) setPipelineProfile(profileId);
  }, [profileId]);

  const equipped = equippedAll(loadout.fill);
  const capped = useCapped(equipped, HEAD);

  const byLayer = PIPELINE_LAYERS.map((layer) => ({
    layer,
    rows: capped.items.filter((row) => row.slot.layer === layer.id),
  })).filter((g) => g.rows.length > 0);

  return (
    <Stack sx={{ gap: 1.25 }}>
      {equipped.length === 0 ? (
        <Empty label="No pipelines equipped on this profile." />
      ) : (
        byLayer.map(({ layer, rows }) => (
          <Box key={layer.id}>
            <Typography
              sx={{
                color: "text.secondary",
                fontWeight: 800,
                fontSize: "0.62rem",
                letterSpacing: "0.12em",
                mb: 0.6,
              }}
            >
              {layer.kicker} · {layer.label}
            </Typography>
            <Stack sx={{ gap: 0.5 }}>
              {rows.map(({ slot, pipeline }) => {
                const typeMeta = SLOT_TYPE_META[slot.type];
                const site = SLOT_POSITION_XY[slot.position];
                const { Icon } = pipeline;
                return (
                  <Stack
                    key={slot.id}
                    direction="row"
                    sx={{
                      alignItems: "center",
                      gap: 1,
                      px: 1,
                      py: 0.65,
                      borderRadius: 1.5,
                      border: "1px solid",
                      borderColor: alpha(pipeline.color, 0.28),
                      bgcolor: alpha(pipeline.color, 0.06),
                    }}
                  >
                    <SlotDisc shape={typeMeta.shape} color={pipeline.color} size={26}>
                      <Icon sx={{ fontSize: 14 }} />
                    </SlotDisc>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography sx={{ fontWeight: 800, fontSize: "0.78rem", lineHeight: 1.2 }}>
                        {pipeline.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.62rem",
                          color: "text.secondary",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {site.label} · {typeMeta.label}
                      </Typography>
                    </Box>
                    <Tooltip title={`Unequip ${pipeline.name}`} arrow>
                      <IconButton
                        size="small"
                        aria-label={`Unequip ${pipeline.name}`}
                        onClick={() => loadout.unequip(slot.id)}
                        sx={{ color: "text.secondary", "&:hover": { color: pipeline.color } }}
                      >
                        <CloseRoundedIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        ))
      )}
      <ShowMore capped={capped} accent={ink} noun="pipelines" />
      <Stack direction="row" sx={{ alignItems: "center", gap: 1.25, flexWrap: "wrap" }}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddRoundedIcon sx={{ fontSize: 16 }} />}
          onClick={(e) => setAddAnchor(e.currentTarget)}
          sx={{ textTransform: "none", fontWeight: 700 }}
        >
          Add pipeline
        </Button>
        <ManageLink />
      </Stack>
      <PipelinePickerMenu
        anchorEl={addAnchor}
        onClose={() => setAddAnchor(null)}
        fill={loadout.fill}
        pipelines={PIPELINES}
        onSelect={(pipelineId) => {
          const pipeline = PIPELINES.find((p) => p.id === pipelineId);
          if (pipeline) loadout.toggle(pipeline.id, pipeline.layer);
        }}
      />
    </Stack>
  );
}

function ManageLink() {
  return (
    <Box
      component={NextLink}
      href={route("/technical/pipelines")}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.6,
        color: "text.secondary",
        textDecoration: "none",
        fontSize: "0.72rem",
        fontWeight: 700,
        "&:hover": { color: "text.primary" },
      }}
    >
      Open Pipelines
      <OpenInNewRoundedIcon sx={{ fontSize: 14 }} />
    </Box>
  );
}

export function pipelineLayerLabel(id: PipelineLayerId): string {
  return PIPELINE_LAYERS.find((l) => l.id === id)?.label ?? id;
}
