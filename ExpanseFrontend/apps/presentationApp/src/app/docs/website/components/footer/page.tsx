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
import ArticleIcon from '@mui/icons-material/Article';

// ============================================================================
// Data
// ============================================================================

const footerVariants = [
  {
    name: 'Multi-Column Footer',
    description: '4-5 columns with categorized links',
    bestFor: 'Sites with many pages and resources',
    columns: ['Product', 'Resources', 'Company', 'Legal'],
  },
  {
    name: 'Minimal Footer',
    description: 'Single row with essential links and copyright',
    bestFor: 'Simple sites, landing pages',
    columns: ['Links row', 'Social', 'Copyright'],
  },
];

const footerElements = [
  { element: 'Logo', requirement: 'Company logo, links to homepage' },
  { element: 'Navigation Links', requirement: 'Organized by category: Product, Resources, Company, Legal' },
  { element: 'Social Links', requirement: 'Icons for Twitter, LinkedIn, GitHub, etc.' },
  { element: 'Newsletter Signup', requirement: 'Optional email capture form' },
  { element: 'Copyright', requirement: '© Year Company Name. All rights reserved.' },
  { element: 'Legal Links', requirement: 'Privacy Policy, Terms of Service, Cookie Policy' },
];

// ============================================================================
// Main Page
// ============================================================================

export default function FooterComponentPage() {
  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#f1f5f9', borderRadius: 2 }}>
            <ArticleIcon sx={{ fontSize: 32, color: '#64748b' }} />
          </Paper>
          <Box>
            <Typography variant="h2" sx={{ fontWeight: 700 }}>
              Footer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Site-wide footer with navigation and legal info
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Variants */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>Variants</Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {footerVariants.map((variant, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  {variant.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {variant.description}
                </Typography>
                <Typography variant="caption" fontWeight={600} display="block" sx={{ mb: 0.5 }}>
                  Sections:
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {variant.columns.join(' • ')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Elements */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>Footer Elements</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={2}>
          {footerElements.map((item, i) => (
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
