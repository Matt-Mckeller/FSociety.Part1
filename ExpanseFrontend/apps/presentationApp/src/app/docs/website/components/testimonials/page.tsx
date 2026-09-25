'use client';

import { 
  Typography, 
  Box, 
  Paper,
  Grid,
  Stack,
  Card,
  CardContent,
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

// ============================================================================
// Data
// ============================================================================

const testimonialVariants = [
  {
    name: 'Quote Cards',
    description: 'Individual cards with quote, name, title, company',
    bestFor: 'Multiple testimonials, grid layout',
    elements: ['Quote', 'Avatar', 'Name', 'Title', 'Company'],
  },
  {
    name: 'Carousel',
    description: 'Rotating testimonials with navigation',
    bestFor: 'Space-limited areas, single featured testimonial',
    elements: ['Quote', 'Avatar', 'Name', 'Navigation arrows'],
  },
  {
    name: 'Logo Bar + Quote',
    description: 'Customer logos with one featured testimonial',
    bestFor: 'Homepage social proof sections',
    elements: ['Logo grid', 'Featured quote', 'Customer count'],
  },
];

const contentRequirements = [
  { element: 'Quote', requirement: '2-4 sentences, specific and result-focused', example: 'Cut our code review time by 60%. The AI catches issues we would have missed.' },
  { element: 'Attribution', requirement: 'Full name, job title, company name' },
  { element: 'Avatar/Photo', requirement: 'Professional headshot, consistent sizing' },
  { element: 'Company Logo', requirement: 'SVG preferred, consistent height' },
];

// ============================================================================
// Main Page
// ============================================================================

export default function TestimonialsComponentPage() {
  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#fef3c7', borderRadius: 2 }}>
            <FormatQuoteIcon sx={{ fontSize: 32, color: '#f59e0b' }} />
          </Paper>
          <Box>
            <Typography variant="h2" sx={{ fontWeight: 700 }}>
              Testimonials
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Social proof sections to build trust
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Variants */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>Variants</Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {testimonialVariants.map((variant, i) => (
          <Grid item xs={12} sm={4} key={i}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  {variant.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {variant.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
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
              {item.example && (
                <Typography variant="caption" sx={{ fontFamily: 'monospace', bgcolor: '#f8fafc', p: 0.5, borderRadius: 0.5, display: 'inline-block', mt: 0.5 }}>
                  "{item.example}"
                </Typography>
              )}
            </Box>
          ))}
        </Stack>
      </Paper>
    </>
  );
}
