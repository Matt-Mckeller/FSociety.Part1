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
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

// ============================================================================
// Data
// ============================================================================

const heroVariants = [
  {
    name: 'Centered Hero',
    description: 'Centered headline, subheadline, and CTAs with optional background image',
    bestFor: 'Clean, minimal homepages',
    elements: ['Headline', 'Subheadline', 'Primary CTA', 'Secondary CTA', 'Background'],
  },
  {
    name: 'Split Hero',
    description: 'Left: text content, Right: image/video/demo',
    bestFor: 'Product-focused pages, showing the product',
    elements: ['Headline', 'Subheadline', 'CTAs', 'Product image/video'],
  },
  {
    name: 'Hero with Form',
    description: 'Headline and form side-by-side or stacked',
    bestFor: 'Demo/signup landing pages',
    elements: ['Headline', 'Form fields', 'Submit CTA', 'Trust badges'],
  },
  {
    name: 'Video Hero',
    description: 'Large video background or embedded video player',
    bestFor: 'Emotional storytelling, product demos',
    elements: ['Video', 'Overlay text', 'CTA'],
  },
];

const contentRequirements = [
  { element: 'Headline', requirement: '6-12 words, clear value proposition', example: 'Ship faster with AI-powered code review' },
  { element: 'Subheadline', requirement: '15-25 words, supporting benefit', example: 'Catch bugs before they ship. Get instant feedback on every pull request.' },
  { element: 'Primary CTA', requirement: 'Action verb + benefit', example: 'Start Free Trial' },
  { element: 'Secondary CTA', requirement: 'Lower commitment option', example: 'Watch Demo' },
];

// ============================================================================
// Main Page
// ============================================================================

export default function HeroComponentPage() {
  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#eff6ff', borderRadius: 2 }}>
            <RocketLaunchIcon sx={{ fontSize: 32, color: '#3b82f6' }} />
          </Paper>
          <Box>
            <Typography variant="h2" sx={{ fontWeight: 700 }}>
              Hero Sections
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Above-the-fold hero layouts for maximum impact
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Variants */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>Variants</Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {heroVariants.map((variant, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  {variant.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {variant.description}
                </Typography>
                
                <Typography variant="caption" fontWeight={600} display="block" sx={{ mb: 0.5, color: '#10b981' }}>
                  Best for: {variant.bestFor}
                </Typography>
                
                <Typography variant="caption" fontWeight={600} display="block" sx={{ mt: 1.5, mb: 0.5 }}>
                  Elements:
                </Typography>
                <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                  {variant.elements.map((el, j) => (
                    <Chip key={j} label={el} size="small" variant="outlined" sx={{ fontSize: '0.65rem', height: 20 }} />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Content Requirements */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>Content Requirements</Typography>
      <Paper variant="outlined" sx={{ mb: 4 }}>
        {contentRequirements.map((item, i) => (
          <Box 
            key={i} 
            sx={{ 
              p: 2, 
              borderBottom: i < contentRequirements.length - 1 ? '1px solid #e2e8f0' : 'none',
            }}
          >
            <Typography variant="subtitle2" fontWeight={600}>
              {item.element}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {item.requirement}
            </Typography>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', bgcolor: '#f8fafc', p: 0.5, borderRadius: 0.5 }}>
              Example: "{item.example}"
            </Typography>
          </Box>
        ))}
      </Paper>

      {/* Design Notes */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>Design Guidelines</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="body2">• Headline should be readable in 2-3 seconds</Typography>
          <Typography variant="body2">• Primary CTA should have high contrast</Typography>
          <Typography variant="body2">• Hero image/video should support the message, not distract</Typography>
          <Typography variant="body2">• Mobile: stack vertically, prioritize text visibility</Typography>
          <Typography variant="body2">• Consider dark/light variants for brand versatility</Typography>
        </Stack>
      </Paper>
    </>
  );
}
