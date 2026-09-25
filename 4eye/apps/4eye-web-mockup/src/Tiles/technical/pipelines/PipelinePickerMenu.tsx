"use client";

import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  alpha,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";

import {
  PIPELINE_LAYERS,
  isPipelineEquipped,
  pipelinesForSlot,
  type PipelineCharacter,
  type PipelineFill,
  type PipelineSlot,
} from "./data";

/**
 * PipelinePickerMenu — pick a pipeline to drop into a socket, or browse the
 * catalog to equip / unequip. Same control both adds and removes so a click
 * that clears a slot is never a one-way door.
 */
export function PipelinePickerMenu({
  anchorEl,
  onClose,
  fill,
  slot,
  pipelines,
  onSelect,
  onClear,
}: {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  fill: PipelineFill;
  /** When set, only pipelines that fit this socket are listed. */
  slot?: PipelineSlot;
  pipelines: PipelineCharacter[];
  onSelect: (pipelineId: string) => void;
  /** Unequip whatever is currently in `slot`. */
  onClear?: () => void;
}) {
  const open = Boolean(anchorEl);
  const candidates = slot ? pipelinesForSlot(slot) : pipelines;
  const occupied = slot ? Boolean(fill[slot.id]) : false;

  const layers = PIPELINE_LAYERS.map((layer) => ({
    layer,
    rows: candidates.filter((p) => p.layer === layer.id),
  })).filter((g) => g.rows.length > 0);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { maxHeight: 420, width: 300 } } }}
    >
      <Typography
        variant="caption"
        sx={{ display: "block", px: 2, py: 1, color: "text.disabled", fontWeight: 700 }}
      >
        {slot
          ? occupied
            ? `Change ${slot.label}`
            : `Equip ${slot.label}`
          : "Add or remove a pipeline"}
      </Typography>
      {slot && occupied && onClear && (
        <MenuItem
          onClick={() => {
            onClear();
            onClose();
          }}
        >
          <ListItemIcon>
            <RemoveCircleOutlineRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Unequip" slotProps={{ primary: { sx: { fontWeight: 700 } } }} />
        </MenuItem>
      )}
      {slot && occupied && onClear && layers.length > 0 && <Divider />}
      {layers.length === 0 ? (
        <Typography variant="body2" sx={{ px: 2, py: 1.25, color: "text.secondary" }}>
          {slot ? "Nothing fits this socket yet." : "No pipelines in the catalog."}
        </Typography>
      ) : (
        layers.map(({ layer, rows }, gi) => (
          <Box key={layer.id}>
            {gi > 0 && <Divider />}
            {(!slot || layers.length > 1) && (
              <Typography
                variant="caption"
                sx={{ display: "block", px: 2, pt: 1, pb: 0.5, color: "text.disabled", fontWeight: 800 }}
              >
                {layer.kicker} · {layer.label}
              </Typography>
            )}
            {rows.map((pipeline) => {
              const equipped = isPipelineEquipped(fill, pipeline.id);
              const here = slot ? fill[slot.id] === pipeline.id : equipped;
              const { Icon } = pipeline;
              return (
                <MenuItem
                  key={pipeline.id}
                  selected={here}
                  onClick={() => {
                    onSelect(pipeline.id);
                    onClose();
                  }}
                  sx={{ alignItems: "flex-start", py: 0.85 }}
                >
                  <ListItemIcon sx={{ mt: 0.15 }}>
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: alpha(pipeline.color, 0.14),
                        color: pipeline.color,
                      }}
                    >
                      <Icon sx={{ fontSize: 16 }} />
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={pipeline.name}
                    secondary={pipeline.subtext}
                    slotProps={{
                      primary: { sx: { fontWeight: 700, fontSize: 14 } },
                      secondary: { sx: { fontSize: 12 } },
                    }}
                  />
                  <Box sx={{ width: 22, flexShrink: 0, pt: 0.35, color: pipeline.color }}>
                    {here ? (
                      <CheckRoundedIcon sx={{ fontSize: 18 }} />
                    ) : equipped ? (
                      <CheckRoundedIcon sx={{ fontSize: 18, opacity: 0.4 }} />
                    ) : (
                      <AddRoundedIcon sx={{ fontSize: 18, color: "text.disabled" }} />
                    )}
                  </Box>
                </MenuItem>
              );
            })}
          </Box>
        ))
      )}
    </Menu>
  );
}
