'use client';

import { 
  Typography, 
  Box, 
  Paper,
  Grid,
  Stack,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import TouchAppIcon from '@mui/icons-material/TouchApp';

// ============================================================================
// Data
// ============================================================================

const ctaVariants = [
  {
    name: 'Simple CTA Banner',
    description: 'Headline + single button on contrasting background',
    bestFor: 'Page bottoms, clear conversion goal',
    bgStyle: 'Solid color or gradient',
  },
  {
    name: 'Two-Button CTA',
    description: 'Primary and secondary action options',
    bestFor: 'When users might have different intents',
    bgStyle: 'Flexible',
  },
  {
    name: 'CTA with Benefits',
    description: 'Headline + bullet points + button',
    bestFor: 'Reinforcing value before conversion',
    bgStyle: 'Usually light with accent colors',
  },
];

const contentRequirements = [
  { element: 'Headline', requirement: 'Action-oriented, creates urgency or excitement', example: 'Ready to transform your workflow?' },
  { element: 'Supporting Text', requirement: 'Optional, 1 sentence max', example: 'Join 10,000+ teams already using our platform.' },
  { element: 'Primary Button', requirement: 'Clear action verb', example: 'Start Free Trial' },
  { element: 'Secondary Button', requirement: 'Lower commitment option', example: 'Schedule a Demo' },
];

// ============================================================================
// Main Page
// ============================================================================

export default function CTAComponentPage() {
  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#fce7f3', borderRadius: 2 }}>
            <TouchAppIcon sx={{ fontSize: 32, color: '#ec4899' }} />
          </Paper>
          <Box>
            <Typography variant="h2" sx={{ fontWeight: 700 }}>
              CTA Sections
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Call-to-action blocks for conversion
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Variants */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>Variants</Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {ctaVariants.map((variant, i) => (
          <Grid item xs={12} sm={4} key={i}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  {variant.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {variant.description}
                </Typography>
                <Chip label={variant.bgStyle} size="small" variant="outlined" sx={{ mb: 1 }} />
                <Typography variant="caption" display="block" color="text.secondary">
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
              <Typography variant="caption" sx={{ fontFamily: 'monospace', bgcolor: '#f8fafc', p: 0.5, borderRadius: 0.5, display: 'inline-block', mt: 0.5 }}>
                "{item.example}"
              </Typography>
            </Box>
          ))}
        </Stack>
      </Paper>

      {/* Design Notes */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2, mt: 4 }}>Design Guidelines</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="body2">• Use contrasting background to make CTA stand out</Typography>
          <Typography variant="body2">• Primary button should be the most visually prominent element</Typography>
          <Typography variant="body2">• Keep copy concise - this is not the place for details</Typography>
          <Typography variant="body2">• Consider sticky CTA on mobile for long pages</Typography>
        </Stack>
      </Paper>
    </>
  );
}
