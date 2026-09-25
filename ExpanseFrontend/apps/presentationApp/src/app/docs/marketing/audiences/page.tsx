import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Chip, Stack, Alert } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

const audienceTypes = [
  { type: 'Student', description: 'Learners / enrolled users', color: '#1565c0' },
  { type: 'Teacher', description: 'Educators / instructors', color: '#7c4dff' },
  { type: 'Parent', description: 'Parents / guardians', color: '#00897b' },
  { type: 'Administration', description: 'School / org administrators', color: '#f57c00' },
  { type: 'General Viewer', description: 'Public / general audience', color: '#78909c' },
  { type: 'Employee', description: 'Internal team members', color: '#5c6bc0' },
  { type: 'Applicant', description: 'Prospective users / applicants', color: '#8d6e63' },
];

const accessibilityModes = [
  { mode: 'Autism Mode', description: 'Structured, literal, predictable formatting. Reduced metaphor, clear explicit language, consistent visual patterns, sensory-considerate design' },
  { mode: 'ADHD Mode', description: 'Concise, additional engagement layers, chunked content with frequent micro-rewards and visual breaks, appropriate pacing' },
  { mode: 'Dyslexia Mode', description: 'OpenDyslexic-friendly fonts, increased letter/line spacing, simplified sentence structure' },
  { mode: 'Other Modes', description: 'Extensible framework for additional modes as needed' },
];

export default function AudiencesPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Audiences
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Target user types and their specific needs. Content can be tailored per audience through the content layering system.
        </Typography>
      </Box>

      {/* Audience Types */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
        Audience Types
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        Slides can be displayed to specific audience types and for specific presentations via the <code>audienceTypes[]</code> field.
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 180 }}>Type</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {audienceTypes.map((row) => (
              <TableRow key={row.type}>
                <TableCell>
                  <Chip 
                    label={row.type} 
                    size="small" 
                    sx={{ 
                      bgcolor: `${row.color}15`, 
                      color: row.color, 
                      fontWeight: 500,
                    }} 
                  />
                </TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 4 }} />

      {/* Accessibility & Special Education */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Accessibility & Special Education Modes
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        Alternative content presentation modes optimized for specific cognitive and learning needs.
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }} icon={false}>
        <strong>User Preference:</strong> Accessibility modes are selected via user profile settings, not a UI toggle. 
        The selected mode affects content variant resolution through the content layering system.
      </Alert>

      <Stack spacing={2}>
        {accessibilityModes.map((item) => (
          <Paper 
            key={item.mode}
            variant="outlined" 
            sx={{ 
              p: 2.5, 
              borderLeft: '4px solid #f57c00',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              {item.mode}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {item.description}
            </Typography>
          </Paper>
        ))}
      </Stack>

      <Divider sx={{ my: 4 }} />

      {/* Content Layering */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Content Layering for Audiences
      </Typography>
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 3, 
          bgcolor: '#1e293b',
          borderRadius: 2,
        }}
      >
        <Typography 
          component="pre" 
          sx={{ 
            fontFamily: '"Fira Code", monospace', 
            fontSize: 13, 
            m: 0,
            color: '#e2e8f0',
            lineHeight: 1.8,
          }}
        >
{`Base Content Layer (default)
  └── Audience Layer (student/teacher/parent overrides)
       └── Accessibility Layer (ADHD/autism/dyslexia variants)
            └── Language Layer (i18n translations)
                 └── AI Cache Layer (cached AI transformations)`}
        </Typography>
      </Paper>
    </>
  );
}
