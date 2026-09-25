'use client';

import { 
  Typography, 
  Box, 
  Paper,
  Grid,
  Stack,
  Chip,
  Divider,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

// ============================================================================
// Data
// ============================================================================

const pageInfo = {
  name: 'Features',
  path: '/features',
  status: 'not-started' as const,
  progress: 0,
  priority: 'P0' as const,
};

const pageGoals = [
  { goal: 'Detail all product features with clear benefits', complete: false },
  { goal: 'Help visitors understand how features solve their problems', complete: false },
  { goal: 'Drive visitors to demo or trial signup', complete: false },
  { goal: 'Support SEO for feature-related searches', complete: false },
];

const sections = [
  {
    name: 'Feature Hero',
    description: 'Page introduction with feature overview',
    status: 'planned',
    content: [
      'Compelling headline about product capabilities',
      'Brief overview paragraph',
      'Optional: feature count or highlight stats',
    ],
  },
  {
    name: 'Feature Grid',
    description: 'Overview grid of all major features',
    status: 'planned',
    content: [
      '6-12 features with icons',
      'Feature name + one-line description',
      'Click to expand or link to detail section',
    ],
  },
  {
    name: 'Feature Deep Dives',
    description: 'Detailed sections for top 3-4 features',
    status: 'planned',
    content: [
      'Feature name and detailed description',
      'Key benefits (bullet points)',
      'Screenshot or demo GIF',
      'Use case example',
    ],
  },
  {
    name: 'Integrations',
    description: 'Compatible tools and integrations',
    status: 'planned',
    content: [
      'Integration logos grid',
      'Brief description of integration capabilities',
      'Link to integrations page if separate',
    ],
  },
  {
    name: 'Comparison Table',
    description: 'Feature comparison across plans (optional)',
    status: 'planned',
    content: [
      'Feature availability by plan tier',
      'Clear check/x indicators',
      'Highlight recommended plan',
    ],
  },
  {
    name: 'CTA Section',
    description: 'Convert visitors to next step',
    status: 'planned',
    content: [
      'Action-oriented headline',
      'Primary CTA: "Start Free Trial" or "Request Demo"',
      'Secondary CTA: "View Pricing"',
    ],
  },
];

const seoStrategy = {
  title: '[Product Name] Features - [Key Capability]',
  metaDescription: 'Discover [Product] features including [feature 1], [feature 2], and more.',
  primaryKeywords: ['product features', 'capabilities', 'tools'],
};

// ============================================================================
// Main Page
// ============================================================================

export default function FeaturesPlanningPage() {
  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#fef3c7', borderRadius: 2 }}>
            <StarIcon sx={{ fontSize: 32, color: '#f59e0b' }} />
          </Paper>
          <Box>
            <Typography variant="h2" sx={{ fontWeight: 700 }}>
              {pageInfo.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Path: <code>{pageInfo.path}</code> • Priority: {pageInfo.priority}
            </Typography>
          </Box>
        </Box>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" fontWeight={600}>Progress</Typography>
            <Chip label={pageInfo.status.replace('-', ' ')} size="small" sx={{ bgcolor: '#f1f5f9', textTransform: 'capitalize' }} />
          </Box>
          <LinearProgress variant="determinate" value={pageInfo.progress} sx={{ height: 8, borderRadius: 4 }} />
        </Paper>
      </Box>

      {/* Goals */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>Page Goals</Typography>
      <Paper variant="outlined" sx={{ p: 2, mb: 4 }}>
        <Stack spacing={1}>
          {pageGoals.map((item, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <RadioButtonUncheckedIcon sx={{ color: '#cbd5e1', fontSize: 20 }} />
              <Typography variant="body2">{item.goal}</Typography>
            </Box>
          ))}
        </Stack>
      </Paper>

      {/* Sections */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>Page Sections</Typography>
      <Box sx={{ mb: 4 }}>
        {sections.map((section, i) => (
          <Accordion key={i} sx={{ border: '1px solid #e2e8f0', '&:before': { display: 'none' }, borderRadius: '8px !important', mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#fafafa' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <RadioButtonUncheckedIcon sx={{ color: '#cbd5e1' }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>{section.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{section.description}</Typography>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="caption" fontWeight={600} display="block" sx={{ mb: 1 }}>Content Requirements</Typography>
              <Stack spacing={0.5}>
                {section.content.map((item, j) => (
                  <Typography key={j} variant="body2" color="text.secondary">• {item}</Typography>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* SEO */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>SEO Strategy</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="caption" fontWeight={600}>Title Tag</Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', bgcolor: '#f8fafc', p: 1, borderRadius: 1, mt: 0.5 }}>
              {seoStrategy.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" fontWeight={600}>Meta Description</Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', bgcolor: '#f8fafc', p: 1, borderRadius: 1, mt: 0.5 }}>
              {seoStrategy.metaDescription}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" fontWeight={600}>Keywords</Typography>
            <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
              {seoStrategy.primaryKeywords.map((kw, i) => (
                <Chip key={i} label={kw} size="small" sx={{ bgcolor: '#dbeafe', color: '#1d4ed8' }} />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
