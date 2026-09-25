/**
 * Preset Gallery
 * Display and manage saved presets
 */

"use client"

import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material"
import {
  ExpandMore as ExpandIcon,
  Delete as DeleteIcon,
  Download as LoadIcon,
  Compare as CompareIcon,
} from "@mui/icons-material"
import { useState } from "react"
import { Preset, LogoConfig } from "../../types"
import { ExpanseLogoV3, ExpanseLogoV3_3D } from "expanse.dynamicAssets/logo"
import { configToProps } from "../../utils/configUtils"

interface PresetGalleryProps {
  presets: Preset[]
  onLoadPreset: (preset: Preset) => void
  onDeletePreset: (id: string) => void
  onComparePreset: (id: string) => void
  compareMode: boolean
}

export function PresetGallery({
  presets,
  onLoadPreset,
  onDeletePreset,
  onComparePreset,
  compareMode,
}: PresetGalleryProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [presetToDelete, setPresetToDelete] = useState<Preset | null>(null)

  const handleDeleteClick = (preset: Preset) => {
    setPresetToDelete(preset)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (presetToDelete) {
      onDeletePreset(presetToDelete.id)
    }
    setDeleteDialogOpen(false)
    setPresetToDelete(null)
  }

  if (presets.length === 0) {
    return (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <Typography fontWeight={600}>Saved Presets</Typography>
          <Chip label="0" size="small" sx={{ ml: 1 }} />
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            py={2}
          >
            No presets saved yet. Use "Save Preset" to store your
            configurations.
          </Typography>
        </AccordionDetails>
      </Accordion>
    )
  }

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <Typography fontWeight={600}>Saved Presets</Typography>
          <Chip label={presets.length} size="small" sx={{ ml: 1 }} />
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {presets.map((preset) => (
              <PresetCard
                key={preset.id}
                preset={preset}
                onLoad={() => onLoadPreset(preset)}
                onDelete={() => handleDeleteClick(preset)}
                onCompare={() => onComparePreset(preset.id)}
                compareMode={compareMode}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Preset?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{presetToDelete?.name}"? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

interface PresetCardProps {
  preset: Preset
  onLoad: () => void
  onDelete: () => void
  onCompare: () => void
  compareMode: boolean
}

function PresetCard({
  preset,
  onLoad,
  onDelete,
  onCompare,
  compareMode,
}: PresetCardProps) {
  const props = configToProps(preset.config)
  const LogoComponent = preset.config.use3D ? ExpanseLogoV3_3D : ExpanseLogoV3

  return (
    <Card variant="outlined" sx={{ display: "flex", alignItems: "center" }}>
      {/* Thumbnail */}
      <Box
        sx={{
          width: 60,
          height: 60,
          backgroundColor: preset.config.backgroundColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        <LogoComponent
          {...props}
          height={50}
          id={`preset-thumb-${preset.id}`}
        />
      </Box>

      {/* Info */}
      <CardContent sx={{ flex: 1, py: 1, px: 1.5, "&:last-child": { pb: 1 } }}>
        <Typography variant="body2" fontWeight={600} noWrap>
          {preset.name}
        </Typography>
        {preset.description && (
          <Typography variant="caption" color="text.secondary" noWrap>
            {preset.description}
          </Typography>
        )}
        <Typography variant="caption" color="text.secondary" display="block">
          {new Date(preset.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ flexShrink: 0, px: 1 }}>
        {compareMode && (
          <Tooltip title="Compare with this preset">
            <IconButton size="small" onClick={onCompare}>
              <CompareIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Load preset">
          <IconButton size="small" onClick={onLoad} color="primary">
            <LoadIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete preset">
          <IconButton size="small" onClick={onDelete} color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  )
}
