'use client';

import { 
  Typography, 
  Box, 
  Paper,
  Grid,
  Stack,
  Chip,
  Card,
  CardContent,
} from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';

// ============================================================================
// Data
// ============================================================================

const featureGridVariants = [
  {
    name: '3-Column Grid',
    description: '3 features per row with icons and short descriptions',
    bestFor: 'Quick feature overview, homepage',
    columns: 3,
  },
  {
    name: '2-Column Cards',
    description: 'Larger cards with more detailed feature descriptions',
    bestFor: 'Feature deep-dives, landing pages',
    columns: 2,
  },
  {
    name: 'Icon Strip',
    description: 'Horizontal row of icons with labels',
    bestFor: 'Compact feature highlights, secondary sections',
    columns: 6,
  },
];

const contentRequirements = [
  { element: 'Feature Icon', requirement: 'Consistent icon style (outline or filled), brand colors' },
  { element: 'Feature Title', requirement: '2-4 words, clear feature name' },
  { element: 'Feature Description', requirement: '1-2 sentences, focus on benefit not just feature' },
  { element: 'Learn More Link', requirement: 'Optional, links to feature detail section' },
];

// ============================================================================
// Main Page
// ============================================================================

export default function FeaturesGridComponentPage() {
  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#dcfce7', borderRadius: 2 }}>
            <GridViewIcon sx={{ fontSize: 32, color: '#10b981' }} />
          </Paper>
          <Box>
            <Typography variant="h2" sx={{ fontWeight: 700 }}>
              Feature Grids
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Showcase product features in organized layouts
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Variants */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>Variants</Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {featureGridVariants.map((variant, i) => (
          <Grid item xs={12} sm={4} key={i}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  {variant.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {variant.description}
                </Typography>
                <Chip label={`${variant.columns} columns`} size="small" sx={{ bgcolor: '#f0fdf4', color: '#15803d' }} />
                <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                  Best for: {variant.bestFor}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Content Requirements */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>Content Requirements</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={2}>
          {contentRequirements.map((item, i) => (
            <Box key={i}>
              <Typography variant="subtitle2" fontWeight={600}>{item.element}</Typography>
              <Typography variant="body2" color="text.secondary">{item.requirement}</Typography>
            </Box>
          ))}
        </Stack>
      </Paper>
    </>
  );
}
