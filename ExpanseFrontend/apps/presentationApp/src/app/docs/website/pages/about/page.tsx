'use client';

import { 
  Typography, 
  Box, 
  Paper,
  Stack,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

// ============================================================================
// Data
// ============================================================================

const pageInfo = {
  name: 'About',
  path: '/about',
  status: 'not-started' as const,
  progress: 0,
  priority: 'P1' as const,
};

const pageGoals = [
  { goal: 'Build trust by humanizing the company', complete: false },
  { goal: 'Communicate company mission and values', complete: false },
  { goal: 'Showcase the team and expertise', complete: false },
  { goal: 'Support employer branding for hiring', complete: false },
];

const sections = [
  {
    name: 'Company Hero',
    description: 'Mission statement and company intro',
    status: 'planned',
    content: [
      'Mission statement headline',
      'Brief company description',
      'Key differentiator or founding story hook',
    ],
  },
  {
    name: 'Our Story',
    description: 'Company founding and journey',
    status: 'planned',
    content: [
      'Founding story / problem discovered',
      'Key milestones',
      'Growth journey',
    ],
  },
  {
    name: 'Mission & Values',
    description: 'What we believe and how we work',
    status: 'planned',
    content: [
      'Mission statement',
      '3-5 core values with descriptions',
      'How values guide decisions',
    ],
  },
  {
    name: 'Team Section',
    description: 'Leadership and key team members',
    status: 'planned',
    content: [
      'Leadership team photos and bios',
      'Role and brief background',
      'Optional: LinkedIn links',
    ],
  },
  {
    name: 'Join Us CTA',
    description: 'Careers and culture callout',
    status: 'planned',
    content: [
      'Culture highlights',
      'Link to careers page or job listings',
      'Benefits preview',
    ],
  },
];

// ============================================================================
// Main Page
// ============================================================================

export default function AboutPlanningPage() {
  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#e0e7ff', borderRadius: 2 }}>
            <InfoIcon sx={{ fontSize: 32, color: '#6366f1' }} />
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
    </>
  );
}
