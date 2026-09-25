'use client';

import { 
  Typography, 
  Box, 
  Paper,
  Grid,
  Stack,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckIcon from '@mui/icons-material/Check';

// ============================================================================
// Data
// ============================================================================

const pageInfo = {
  name: 'Demo',
  path: '/demo',
  status: 'not-started' as const,
  progress: 0,
  priority: 'P0' as const,
};

const pageGoals = [
  { goal: 'Convert interested visitors to demo requests', complete: false },
  { goal: 'Qualify leads with relevant form fields', complete: false },
  { goal: 'Set expectations for demo process', complete: false },
  { goal: 'Provide value preview while they wait', complete: false },
];

const sections = [
  {
    name: 'Demo Hero',
    description: 'Compelling headline and form',
    status: 'planned',
    content: [
      'Action-oriented headline',
      'What they\'ll get from the demo',
      'Demo request form',
    ],
  },
  {
    name: 'What to Expect',
    description: 'Demo process overview',
    status: 'planned',
    content: [
      'Duration (e.g., "30-minute personalized demo")',
      'What will be covered',
      'Who should attend',
    ],
  },
  {
    name: 'Product Preview',
    description: 'Teaser of the product',
    status: 'planned',
    content: [
      'Product screenshots or video',
      'Key feature highlights',
      'Interactive demo embed (optional)',
    ],
  },
  {
    name: 'Social Proof',
    description: 'Build trust while they decide',
    status: 'planned',
    content: [
      'Customer testimonials',
      'Company logos',
      'Results/stats',
    ],
  },
];

const demoFormFields = [
  { field: 'First Name', required: true },
  { field: 'Last Name', required: true },
  { field: 'Work Email', required: true },
  { field: 'Company Name', required: true },
  { field: 'Job Title', required: false },
  { field: 'Company Size', required: true, type: 'select' },
  { field: 'How did you hear about us?', required: false, type: 'select' },
];

const demoHighlights = [
  'Personalized walkthrough',
  'Q&A with product expert',
  'Custom use case discussion',
  'Pricing and plan guidance',
];

// ============================================================================
// Main Page
// ============================================================================

export default function DemoPlanningPage() {
  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#dbeafe', borderRadius: 2 }}>
            <PlayCircleIcon sx={{ fontSize: 32, color: '#3b82f6' }} />
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

      {/* Demo Highlights */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>Demo Includes</Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {demoHighlights.map((highlight, i) => (
          <Grid item xs={6} sm={3} key={i}>
            <Paper variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckIcon sx={{ color: '#10b981', fontSize: 20 }} />
              <Typography variant="body2">{highlight}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Demo Form Fields */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>Demo Request Form</Typography>
      <Paper variant="outlined" sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={1}>
          {demoFormFields.map((field, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">{field.field}</Typography>
                {field.required && (
                  <Chip label="*" size="small" sx={{ bgcolor: '#fee2e2', color: '#dc2626', fontSize: '0.65rem', height: 16, minWidth: 16 }} />
                )}
                {field.type === 'select' && (
                  <Chip label="dropdown" size="small" variant="outlined" sx={{ fontSize: '0.6rem', height: 18 }} />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

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
