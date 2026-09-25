/**
 * Size Preview Item
 * Single size preview card showing the logo at a specific size
 */

"use client"

import { Box, Typography, Tooltip, Paper } from "@mui/material"
import { ExpanseLogoV3, ExpanseLogoV3_3D } from "expanse.dynamicAssets/logo"
import { LogoConfig } from "../../types"
import { configToProps } from "../../utils/configUtils"
import { SizePreset } from "../../constants"

interface SizePreviewItemProps {
  preset: SizePreset
  config: LogoConfig
  showLabel?: boolean
  maxDisplaySize?: number
}

export function SizePreviewItem({ 
  preset, 
  config, 
  showLabel = true,
  maxDisplaySize = 120,
}: SizePreviewItemProps) {
  const props = configToProps(config)
  const LogoComponent = config.use3D ? ExpanseLogoV3_3D : ExpanseLogoV3

  // Display size is actual size up to maxDisplaySize
  const displaySize = Math.min(preset.size, maxDisplaySize)
  const containerSize = Math.max(displaySize + 16, 48) // Minimum container size

  return (
    <Tooltip 
      title={`${preset.name} (${preset.size}×${preset.size}px) - ${preset.description}`}
      placement="top"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <Paper
          elevation={1}
          sx={{
            width: containerSize,
            height: containerSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: config.backgroundColor,
            borderRadius: 1,
            overflow: 'hidden',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 3,
            },
          }}
        >
          <LogoComponent
            {...props}
            height={displaySize * 0.85}
            id={`size-preview-${preset.size}`}
          />
        </Paper>
        {showLabel && (
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ fontSize: '0.65rem', fontWeight: 500 }}
          >
            {preset.size}px
          </Typography>
        )}
      </Box>
    </Tooltip>
  )
}
