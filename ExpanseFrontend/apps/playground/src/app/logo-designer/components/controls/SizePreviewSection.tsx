/**
 * Size Preview Section
 * Collapsible accordion section showing logo at various sizes
 */

"use client"

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  Box,
} from "@mui/material"
import { ExpandMore as ExpandIcon } from "@mui/icons-material"
import { LogoConfig } from "../../types"
import { SizePreviewGrid } from "../preview/SizePreviewGrid"
import { SIZE_PRESETS } from "../../constants"

interface SizePreviewSectionProps {
  config: LogoConfig
}

export function SizePreviewSection({ config }: SizePreviewSectionProps) {
  return (
    <Accordion defaultExpanded={false}>
      <AccordionSummary expandIcon={<ExpandIcon />}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography fontWeight={600}>Size Previews</Typography>
          <Chip 
            label={`${SIZE_PRESETS.length} sizes`} 
            size="small" 
            variant="outlined"
            sx={{ height: 20, fontSize: '0.7rem' }}
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Preview how the logo appears at different sizes, from 16px favicon to 400px print.
        </Typography>
        <SizePreviewGrid config={config} />
      </AccordionDetails>
    </Accordion>
  )
}
