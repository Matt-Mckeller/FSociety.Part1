/**
 * Size Preview Grid
 * Grid of logo previews at various sizes, organized by category
 */

"use client"

import { Box, Typography, Divider } from "@mui/material"
import { LogoConfig } from "../../types"
import { 
  SIZE_PRESETS, 
  CATEGORY_LABELS, 
  CATEGORY_ORDER,
  groupPresetsByCategory,
  SizePreset 
} from "../../constants"
import { SizePreviewItem } from "./SizePreviewItem"

interface SizePreviewGridProps {
  config: LogoConfig
  presets?: SizePreset[]
}

export function SizePreviewGrid({ config, presets = SIZE_PRESETS }: SizePreviewGridProps) {
  const grouped = groupPresetsByCategory(presets)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {CATEGORY_ORDER.map((category) => {
        const categoryPresets = grouped[category]
        if (!categoryPresets || categoryPresets.length === 0) return null

        return (
          <Box key={category}>
            {/* Category Header */}
            <Typography 
              variant="overline" 
              color="text.secondary"
              sx={{ 
                fontSize: '0.65rem', 
                letterSpacing: '0.1em',
                mb: 1,
                display: 'block',
              }}
            >
              {CATEGORY_LABELS[category]}
            </Typography>

            {/* Size Items */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5,
                alignItems: 'flex-end',
              }}
            >
              {categoryPresets.map((preset) => (
                <SizePreviewItem
                  key={preset.size}
                  preset={preset}
                  config={config}
                />
              ))}
            </Box>

            {/* Divider between categories */}
            {category !== CATEGORY_ORDER[CATEGORY_ORDER.length - 1] && (
              <Divider sx={{ mt: 2 }} />
            )}
          </Box>
        )
      })}
    </Box>
  )
}
