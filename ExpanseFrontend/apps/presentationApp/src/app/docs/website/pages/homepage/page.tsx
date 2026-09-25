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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import DevicesIcon from '@mui/icons-material/Devices';

import { InteractiveWireframePreview } from '@/components/website-preview';

// ============================================================================
// Types
// ============================================================================

interface PageSection {
  name: string;
  description: string;
  status: 'planned' | 'draft' | 'complete';
  content?: string[];
  designNotes?: string;
}

// ============================================================================
// Data
// ============================================================================

const pageInfo = {
  name: 'Homepage',
  path: '/',
  status: 'planning' as const,
  progress: 20,
  priority: 'P0' as const,
  lastUpdated: '2024-01-15',
  owner: 'Unassigned',
};

const pageGoals = [
  { goal: 'Communicate core value proposition in 5 seconds', complete: false },
  { goal: 'Drive visitors to demo request or features page', complete: false },
  { goal: 'Establish trust with social proof', complete: false },
  { goal: 'Work well for all target audiences', complete: false },
];

const sections: PageSection[] = [
  {
    name: 'Hero Section',
    description: 'Above the fold: headline, subheadline, primary CTA, hero image/demo',
    status: 'planned',
    content: [
      'Headline: Clear value proposition (8-12 words)',
      'Subheadline: Supporting benefit statement',
      'Primary CTA: "Request Demo" or "Start Free Trial"',
      'Secondary CTA: "Learn More" or "Watch Video"',
      'Hero visual: Product screenshot, demo video, or illustration',
    ],
    designNotes: 'Full-width, centered or split layout. Consider animated elements.',
  },
  {
    name: 'Features Overview',
    description: 'Quick feature highlights with icons and brief descriptions',
    status: 'planned',
    content: [
      '3-4 key features with icons',
      'One-line benefit for each',
      'Optional: link to full features page',
    ],
    designNotes: 'Grid or horizontal cards. Keep it scannable.',
  },
  {
    name: 'Social Proof',
    description: 'Testimonials, logos, stats to build trust',
    status: 'planned',
    content: [
      'Customer logos (5-8)',
      '1-2 testimonial quotes',
      'Key metrics/stats if available',
    ],
    designNotes: 'Logo bar + testimonial carousel or grid.',
  },
  {
    name: 'How It Works',
    description: 'Simple 3-step process explanation',
    status: 'planned',
    content: [
      'Step 1: Sign up / Get started',
      'Step 2: Configure / Setup',
      'Step 3: See results / Benefits',
    ],
    designNotes: 'Numbered steps or timeline visual.',
  },
  {
    name: 'Final CTA',
    description: 'Bottom-of-page conversion section',
    status: 'planned',
    content: [
      'Compelling closing headline',
      'Brief value reminder',
      'Primary CTA button',
    ],
    designNotes: 'Contrasting background, clear call to action.',
  },
];

const seoStrategy = {
  title: '[Product Name] - [Primary Value Proposition]',
  metaDescription: 'Meta description placeholder (150-160 characters)',
  primaryKeywords: ['primary keyword 1', 'primary keyword 2'],
  secondaryKeywords: ['secondary keyword 1', 'secondary keyword 2'],
  targetWordCount: '500-800',
};

const technicalRequirements = [
  { requirement: 'Responsive design', priority: 'Must', notes: 'Mobile-first approach' },
  { requirement: 'Performance < 3s load', priority: 'Must', notes: 'Optimize images, lazy load' },
  { requirement: 'Above fold < 1s LCP', priority: 'Must', notes: 'Critical CSS, preload hero' },
  { requirement: 'Analytics tracking', priority: 'Must', notes: 'Page views, scroll depth, CTA clicks' },
  { requirement: 'A/B testing ready', priority: 'Should', notes: 'Headline and CTA variants' },
  { requirement: 'Dark mode support', priority: 'Nice', notes: 'If design system supports' },
];

// ============================================================================
// Components
// ============================================================================

const statusColors: Record<string, { bg: string; text: string; icon: string }> = {
  'planned': { bg: '#e0f2fe', text: '#0369a1', icon: '#0ea5e9' },
  'draft': { bg: '#fef3c7', text: '#92400e', icon: '#f59e0b' },
  'complete': { bg: '#d1fae5', text: '#047857', icon: '#10b981' },
};

function SectionCard({ section }: { section: PageSection }) {
  const style = statusColors[section.status];
  
  return (
    <Accordion 
      defaultExpanded={section.status !== 'complete'}
      sx={{ 
        border: '1px solid #e2e8f0',
        '&:before': { display: 'none' },
        borderRadius: '8px !important',
        mb: 1,
        '&.Mui-expanded': { mb: 1 },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#fafafa' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', pr: 2 }}>
          <Box sx={{ color: style.icon }}>
            {section.status === 'complete' ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {section.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {section.description}
            </Typography>
          </Box>
          <Chip 
            label={section.status} 
            size="small" 
            sx={{ 
              bgcolor: style.bg, 
              color: style.text,
              fontWeight: 500,
              fontSize: '0.7rem',
              textTransform: 'capitalize',
            }} 
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Typography variant="caption" fontWeight={600} display="block" sx={{ mb: 1 }}>
              Content Requirements
            </Typography>
            <Stack spacing={0.5}>
              {section.content?.map((item, i) => (
                <Typography key={i} variant="body2" color="text.secondary">
                  • {item}
                </Typography>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="caption" fontWeight={600} display="block" sx={{ mb: 1 }}>
              Design Notes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {section.designNotes}
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function HomepagePlanningPage() {
  const completedSections = sections.filter(s => s.status === 'complete').length;
  const sectionProgress = Math.round((completedSections / sections.length) * 100);

  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 1.5, 
                bgcolor: '#eff6ff', 
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <HomeIcon sx={{ fontSize: 32, color: '#3b82f6' }} />
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
          
          <Stack spacing={1} alignItems="flex-end">
            <Chip 
              label={pageInfo.status} 
              sx={{ 
                bgcolor: '#e0f2fe', 
                color: '#0369a1',
                fontWeight: 600,
                textTransform: 'capitalize',
              }} 
            />
            <Typography variant="caption" color="text.secondary">
              Last updated: {pageInfo.lastUpdated}
            </Typography>
          </Stack>
        </Box>

        {/* Progress Bar */}
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" fontWeight={600}>
              Overall Progress
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {completedSections}/{sections.length} sections • {sectionProgress}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={sectionProgress} 
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Paper>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={3}>
          <Card variant="outlined">
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <EditIcon sx={{ color: '#64748b', mb: 0.5 }} />
              <Typography variant="h6" fontWeight={700}>{sections.length}</Typography>
              <Typography variant="caption" color="text.secondary">Sections</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card variant="outlined">
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <VisibilityIcon sx={{ color: '#64748b', mb: 0.5 }} />
              <Typography variant="h6" fontWeight={700}>{pageGoals.length}</Typography>
              <Typography variant="caption" color="text.secondary">Goals</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card variant="outlined">
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <SearchIcon sx={{ color: '#64748b', mb: 0.5 }} />
              <Typography variant="h6" fontWeight={700}>{seoStrategy.primaryKeywords.length}</Typography>
              <Typography variant="caption" color="text.secondary">Keywords</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card variant="outlined">
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <DevicesIcon sx={{ color: '#64748b', mb: 0.5 }} />
              <Typography variant="h6" fontWeight={700}>{technicalRequirements.filter(r => r.priority === 'Must').length}</Typography>
              <Typography variant="caption" color="text.secondary">Must-Have Reqs</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Page Goals */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
        Page Goals
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, mb: 4 }}>
        <Stack spacing={1}>
          {pageGoals.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {item.complete ? (
                <CheckCircleIcon sx={{ color: '#10b981', fontSize: 20 }} />
              ) : (
                <RadioButtonUncheckedIcon sx={{ color: '#cbd5e1', fontSize: 20 }} />
              )}
              <Typography 
                variant="body2" 
                sx={{ 
                  color: item.complete ? 'text.secondary' : 'text.primary',
                  textDecoration: item.complete ? 'line-through' : 'none',
                }}
              >
                {item.goal}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Paper>

      {/* Interactive Preview */}
      <InteractiveWireframePreview pageType="homepage" />

      {/* Page Sections */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
        Page Sections
      </Typography>
      <Box sx={{ mb: 4 }}>
        {sections.map((section, index) => (
          <SectionCard key={index} section={section} />
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* SEO Strategy */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
        SEO Strategy
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, mb: 4 }}>
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
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" fontWeight={600}>Primary Keywords</Typography>
            <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }} flexWrap="wrap" useFlexGap>
              {seoStrategy.primaryKeywords.map((kw, i) => (
                <Chip key={i} label={kw} size="small" sx={{ bgcolor: '#dbeafe', color: '#1d4ed8' }} />
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" fontWeight={600}>Secondary Keywords</Typography>
            <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }} flexWrap="wrap" useFlexGap>
              {seoStrategy.secondaryKeywords.map((kw, i) => (
                <Chip key={i} label={kw} size="small" variant="outlined" />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Technical Requirements */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
        Technical Requirements
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f8fafc' }}>
              <TableCell sx={{ fontWeight: 600 }}>Requirement</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {technicalRequirements.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.requirement}</TableCell>
                <TableCell>
                  <Chip 
                    label={row.priority} 
                    size="small" 
                    sx={{ 
                      bgcolor: row.priority === 'Must' ? '#fee2e2' : row.priority === 'Should' ? '#fef3c7' : '#f1f5f9',
                      color: row.priority === 'Must' ? '#dc2626' : row.priority === 'Should' ? '#d97706' : '#64748b',
                      fontSize: '0.7rem',
                    }} 
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{row.notes}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
