import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Chip, Stack } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const techStack = [
  { aspect: 'Frontend', detail: 'React, MUI, Next.js', category: 'UI' },
  { aspect: 'Backend', detail: 'NestJS with TypeORM (PostgreSQL)', category: 'Backend' },
  { aspect: 'Authentication', detail: '@nestjs/passport (JWT)', category: 'Backend' },
  { aspect: 'Real-Time', detail: 'WebSockets (NestJS Gateway) for presenter mode sync and live collaboration', category: 'Backend' },
  { aspect: 'State Management', detail: 'Redux with backend persistence', category: 'UI' },
  { aspect: 'AI Integration', detail: 'Backend API routes proxying to AI services (OpenAI/Gemini/Claude)', category: 'AI' },
  { aspect: 'Content Storage', detail: 'Custom block-based content system with layered variants', category: 'Storage' },
  { aspect: 'Routing', detail: 'URL-addressable slides (e.g., /presentation/:presentationId/slide/:slideId)', category: 'Routing' },
  { aspect: 'Internationalization', detail: 'Multi-tier: react-i18next for UI + database content translations + AI-assisted fallback', category: 'Formatting' },
  { aspect: 'Component Library', detail: 'Storybook for all components', category: 'Dev Tooling' },
  { aspect: 'Design Philosophy', detail: 'Very modular and highly reusable', category: 'Architecture' },
];

const categoryColors: Record<string, string> = {
  'UI': '#1565c0',
  'Backend': '#7c4dff',
  'AI': '#00897b',
  'Storage': '#f57c00',
  'Routing': '#5c6bc0',
  'Formatting': '#e91e63',
  'Dev Tooling': '#388e3c',
  'Architecture': '#78909c',
};

const aiProviders = [
  { label: 'OpenAI', color: '#10a37f' },
  { label: 'Google Gemini', color: '#4285f4' },
  { label: 'Anthropic Claude', color: '#cc785c' },
  { label: 'Custom Logic', color: '#64748b' },
];

export default function TechnologyChoicesPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Technology Choices
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Technology stack and dependency decisions for PresentationApp.
        </Typography>
      </Box>

      {/* Technology Stack Table */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <CodeIcon sx={{ color: 'primary.main' }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Technology Stack
        </Typography>
      </Box>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 150 }}>Aspect</TableCell>
              <TableCell sx={{ width: 100 }}>Category</TableCell>
              <TableCell>Detail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {techStack.map((row) => (
              <TableRow key={row.aspect}>
                <TableCell sx={{ fontWeight: 500 }}>{row.aspect}</TableCell>
                <TableCell>
                  <Chip 
                    label={row.category} 
                    size="small" 
                    sx={{ 
                      bgcolor: `${categoryColors[row.category]}15`, 
                      color: categoryColors[row.category],
                      fontWeight: 500,
                      fontSize: '0.7rem',
                    }} 
                  />
                </TableCell>
                <TableCell>{row.detail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 4 }} />

      {/* AI Integration */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <SmartToyIcon sx={{ color: 'secondary.main' }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          AI Integration Strategy
        </Typography>
      </Box>
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 3, 
          mb: 4,
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          borderLeft: '4px solid',
          borderLeftColor: 'secondary.main',
        }}
      >
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Multi-Provider Approach:</strong> The system integrates with multiple AI providers
          rather than relying on a single vendor for flexibility and redundancy.
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {aiProviders.map((provider) => (
            <Chip 
              key={provider.label}
              label={provider.label} 
              sx={{ 
                fontWeight: 500,
                bgcolor: `${provider.color}15`,
                color: provider.color,
                borderColor: provider.color,
              }}
              variant="outlined"
            />
          ))}
        </Box>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Dependencies by Category */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Dependency Categories
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        Based on BuildProcess.md template categories:
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {Object.entries(categoryColors).map(([cat, color]) => (
          <Chip 
            key={cat}
            label={cat} 
            sx={{ 
              fontWeight: 500,
              bgcolor: `${color}15`,
              color: color,
            }}
          />
        ))}
      </Box>
    </>
  );
}
