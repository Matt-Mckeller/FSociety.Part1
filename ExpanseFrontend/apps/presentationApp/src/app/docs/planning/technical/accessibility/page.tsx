import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Divider, Stack, Card, CardContent, Grid, Alert } from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

const accessibilityModes = [
  { 
    mode: 'ADHD Mode', 
    description: 'Reduced visual noise, focus highlighting, chunked content, optional timers and break reminders',
    features: ['Focus mode overlay', 'Progress chunking', 'Break reminders', 'Reduced animations'],
    color: '#8b5cf6',
  },
  { 
    mode: 'Dyslexia Mode', 
    description: 'OpenDyslexic font option, increased line/letter spacing, contrast adjustments, text-to-speech',
    features: ['OpenDyslexic font', 'Increased spacing', 'Color overlays', 'Text-to-speech'],
    color: '#06b6d4',
  },
  { 
    mode: 'Autism-Friendly', 
    description: 'Predictable layouts, reduced unexpected changes, clear navigation, literal language',
    features: ['Consistent layouts', 'Clear navigation', 'Reduced surprises', 'Literal language'],
    color: '#10b981',
  },
  { 
    mode: 'Screen Reader', 
    description: 'Full ARIA support, semantic HTML, image alt text, keyboard navigation',
    features: ['ARIA labels', 'Semantic HTML', 'Alt text', 'Skip links'],
    color: '#f59e0b',
  },
];

const contentVariants = [
  { variant: 'Simplified Text', description: 'AI-generated simplified version of complex content', implementation: 'AI Action + Cache' },
  { variant: 'Visual Emphasis', description: 'Key concepts highlighted with visual markers', implementation: 'CSS variant' },
  { variant: 'Audio Version', description: 'Text-to-speech audio for content blocks', implementation: 'TTS API' },
  { variant: 'High Contrast', description: 'Increased color contrast for visual impairment', implementation: 'Theme variant' },
];

const wcagChecklist = [
  { criterion: '1.1.1 Non-text Content', level: 'A', status: 'planned' },
  { criterion: '1.3.1 Info and Relationships', level: 'A', status: 'planned' },
  { criterion: '1.4.3 Contrast (Minimum)', level: 'AA', status: 'planned' },
  { criterion: '1.4.4 Resize Text', level: 'AA', status: 'planned' },
  { criterion: '2.1.1 Keyboard', level: 'A', status: 'planned' },
  { criterion: '2.4.1 Bypass Blocks', level: 'A', status: 'planned' },
  { criterion: '2.4.3 Focus Order', level: 'A', status: 'planned' },
  { criterion: '2.4.7 Focus Visible', level: 'AA', status: 'planned' },
  { criterion: '3.1.1 Language of Page', level: 'A', status: 'planned' },
  { criterion: '4.1.2 Name, Role, Value', level: 'A', status: 'planned' },
];

export default function AccessibilityPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Accessibility
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Multi-mode accessibility support designed for diverse learning needs including ADHD, dyslexia, 
          autism spectrum, and visual impairments.
        </Typography>
      </Box>

      <Alert severity="success" icon={<AccessibilityNewIcon />} sx={{ mb: 4 }}>
        Accessibility is a first-class feature, not an afterthought. Content variants are stored 
        in the database and served through the layered content system.
      </Alert>

      {/* Accessibility Modes */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Accessibility Modes
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {accessibilityModes.map((mode) => (
          <Grid item xs={12} md={6} key={mode.mode}>
            <Card 
              variant="outlined" 
              sx={{ 
                height: '100%',
                borderLeft: `4px solid ${mode.color}`,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {mode.mode}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {mode.description}
                </Typography>
                <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                  {mode.features.map((feature) => (
                    <Chip 
                      key={feature}
                      label={feature} 
                      size="small"
                      sx={{ 
                        fontSize: '0.7rem', 
                        mb: 0.5,
                        bgcolor: `${mode.color}15`,
                        color: mode.color,
                      }}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Content Variants */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Accessible Content Variants
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Content is stored with accessibility variants that can be selected per-user or per-session.
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600 }}>Variant</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Implementation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contentVariants.map((variant) => (
              <TableRow key={variant.variant}>
                <TableCell sx={{ fontWeight: 500 }}>{variant.variant}</TableCell>
                <TableCell>{variant.description}</TableCell>
                <TableCell>
                  <Chip 
                    label={variant.implementation} 
                    size="small"
                    sx={{ fontSize: '0.7rem', fontFamily: 'monospace' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 4 }} />

      {/* WCAG Compliance */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        WCAG 2.1 Compliance Checklist
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Targeting WCAG 2.1 AA compliance for core functionality.
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600 }}>Success Criterion</TableCell>
              <TableCell sx={{ fontWeight: 600, width: 80 }}>Level</TableCell>
              <TableCell sx={{ fontWeight: 600, width: 90 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wcagChecklist.map((item) => (
              <TableRow key={item.criterion}>
                <TableCell>{item.criterion}</TableCell>
                <TableCell>
                  <Chip 
                    label={item.level} 
                    size="small"
                    sx={{ 
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      bgcolor: item.level === 'AA' ? '#dbeafe' : '#dcfce7',
                      color: item.level === 'AA' ? '#1e40af' : '#166534',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={item.status} 
                    size="small"
                    sx={{ fontSize: '0.7rem', bgcolor: '#fef3c7', color: '#92400e' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 4 }} />

      {/* Content API */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Accessibility-Aware Content API
      </Typography>
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 2, 
          bgcolor: '#1e293b',
          borderRadius: 2,
          mb: 1,
        }}
      >
        <Typography 
          component="code" 
          sx={{ 
            fontFamily: '"Fira Code", "JetBrains Mono", monospace',
            color: '#38bdf8',
            fontSize: 14,
          }}
        >
          GET /api/content/:blockId?variant=adhd&audience=student
        </Typography>
      </Paper>
      <Typography variant="body2" color="text.secondary">
        Returns content with the specified accessibility variant applied. Variants are layered 
        on top of audience and language layers.
      </Typography>
    </>
  );
}
