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
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

// ============================================================================
// Data
// ============================================================================

const pageInfo = {
  name: 'Contact',
  path: '/contact',
  status: 'not-started' as const,
  progress: 0,
  priority: 'P1' as const,
};

const pageGoals = [
  { goal: 'Make it easy to reach the right team', complete: false },
  { goal: 'Capture leads with contact form', complete: false },
  { goal: 'Set expectations for response times', complete: false },
  { goal: 'Provide self-service options when possible', complete: false },
];

const sections = [
  {
    name: 'Contact Hero',
    description: 'Simple headline and intro',
    status: 'planned',
    content: [
      'Welcoming headline',
      'Brief intro about getting in touch',
      'Response time expectations',
    ],
  },
  {
    name: 'Contact Form',
    description: 'Main contact submission form',
    status: 'planned',
    content: [
      'Name, email, company fields',
      'Inquiry type dropdown',
      'Message textarea',
      'Submit button with confirmation',
    ],
  },
  {
    name: 'Contact Options',
    description: 'Alternative ways to reach us',
    status: 'planned',
    content: [
      'Sales inquiries email',
      'Support email/link',
      'Phone number (if applicable)',
      'Office address (if applicable)',
    ],
  },
  {
    name: 'FAQ / Self-Service',
    description: 'Common questions before contacting',
    status: 'planned',
    content: [
      'Link to documentation',
      'Link to help center',
      'Top 3-5 common questions',
    ],
  },
];

const formFields = [
  { field: 'Name', type: 'text', required: true },
  { field: 'Email', type: 'email', required: true },
  { field: 'Company', type: 'text', required: false },
  { field: 'Inquiry Type', type: 'select', required: true, options: ['Sales', 'Support', 'Partnership', 'Other'] },
  { field: 'Message', type: 'textarea', required: true },
];

// ============================================================================
// Main Page
// ============================================================================

export default function ContactPlanningPage() {
  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#fce7f3', borderRadius: 2 }}>
            <ContactMailIcon sx={{ fontSize: 32, color: '#ec4899' }} />
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

      {/* Form Fields */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>Contact Form Fields</Typography>
      <Paper variant="outlined" sx={{ p: 2, mb: 4 }}>
        <Stack spacing={1}>
          {formFields.map((field, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" fontWeight={600} sx={{ minWidth: 120 }}>
                {field.field}
              </Typography>
              <Chip label={field.type} size="small" variant="outlined" sx={{ fontSize: '0.65rem' }} />
              {field.required && (
                <Chip label="required" size="small" sx={{ bgcolor: '#fee2e2', color: '#dc2626', fontSize: '0.65rem' }} />
              )}
              {field.options && (
                <Typography variant="caption" color="text.secondary">
                  Options: {field.options.join(', ')}
                </Typography>
              )}
            </Box>
          ))}
        </Stack>
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
