'use client';

import { 
  Typography, 
  Box, 
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PreviewIcon from '@mui/icons-material/Preview';

import { 
  WireframeProvider, 
  WireframeConfig,
  homepageWireframeConfig,
  featuresPageWireframeConfig,
  pricingPageWireframeConfig,
} from './WireframeProvider';
import { WireframePreview } from './WireframePreview';
import { WireframeControlPanel } from './WireframeControlPanel';

// ============================================================================
// Main Interactive Component
// ============================================================================

interface InteractiveWireframePreviewProps {
  config?: WireframeConfig;
  pageType?: 'homepage' | 'features' | 'pricing';
  defaultExpanded?: boolean;
}

export function InteractiveWireframePreview({ 
  config,
  pageType = 'homepage',
  defaultExpanded = false,
}: InteractiveWireframePreviewProps) {
  // Select config based on pageType if not provided directly
  const selectedConfig = config || (
    pageType === 'features' ? featuresPageWireframeConfig :
    pageType === 'pricing' ? pricingPageWireframeConfig :
    homepageWireframeConfig
  );

  return (
    <Accordion 
      defaultExpanded={defaultExpanded}
      sx={{ 
        mb: 4,
        border: '1px solid',
        borderColor: '#8b5cf6',
        borderRadius: '8px !important',
        '&:before': { display: 'none' },
        bgcolor: '#faf5ff',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ 
          bgcolor: '#f5f3ff',
          borderRadius: '8px',
          '&.Mui-expanded': {
            borderRadius: '8px 8px 0 0',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <PreviewIcon sx={{ color: '#8b5cf6' }} />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#5b21b6' }}>
              Interactive Page Preview
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Toggle sections and reorder to experiment with page layout
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 2, bgcolor: 'white' }}>
        <WireframeProvider initialConfig={selectedConfig}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <WireframeControlPanel />
            </Grid>
            <Grid item xs={12} md={8}>
              <WireframePreview />
            </Grid>
          </Grid>
        </WireframeProvider>
      </AccordionDetails>
    </Accordion>
  );
}
