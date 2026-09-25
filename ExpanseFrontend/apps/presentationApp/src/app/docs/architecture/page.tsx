import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Chip, Divider, Stack, Alert } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import LayersIcon from '@mui/icons-material/Layers';

const techStack = [
  { aspect: 'Frontend', detail: 'React, MUI, Next.js' },
  { aspect: 'Backend', detail: 'NestJS with TypeORM (PostgreSQL)' },
  { aspect: 'Authentication', detail: '@nestjs/passport (JWT)' },
  { aspect: 'Real-Time', detail: 'WebSockets (NestJS Gateway) for presenter mode sync and live collaboration' },
  { aspect: 'State Management', detail: 'Redux with backend persistence' },
  { aspect: 'AI Integration', detail: 'Backend API routes proxying to AI services (OpenAI/Gemini/Claude)' },
  { aspect: 'Content Storage', detail: 'Custom block-based content system with layered variants' },
  { aspect: 'Routing', detail: 'URL-addressable slides (e.g., /presentation/:presentationId/slide/:slideId)' },
  { aspect: 'Internationalization', detail: 'Multi-tier: react-i18next for UI + database content translations + AI-assisted fallback' },
  { aspect: 'Component Library', detail: 'Storybook for all components' },
  { aspect: 'Design Philosophy', detail: 'Very modular and highly reusable' },
];

const blockTypes = [
  { type: 'TextBlock', description: 'Rich text with markdown support', color: '#1565c0' },
  { type: 'CodeBlock', description: 'Syntax-highlighted code with optional execution', color: '#388e3c' },
  { type: 'QuizBlock', description: 'Inline quiz with question/answers', color: '#7c4dff' },
  { type: 'MediaBlock', description: 'Image, video, SVG, Lottie animation', color: '#f57c00' },
  { type: 'InteractiveBlock', description: 'Custom interactive component (why chip, expandable, etc.)', color: '#00897b' },
  { type: 'AITransformBlock', description: 'Cached AI-generated content variant', color: '#c62828' },
];

const aiProviders = [
  { label: 'OpenAI', color: '#10a37f' },
  { label: 'Google Gemini', color: '#4285f4' },
  { label: 'Anthropic Claude', color: '#cc785c' },
  { label: 'Custom Logic', color: '#64748b' },
];

export default function ArchitecturePage() {
  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Architecture & Technology
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
          Technical foundation powering the PresentationApp platform.
        </Typography>
      </Box>

      {/* Technology Stack */}
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
              <TableCell sx={{ width: 180 }}>Aspect</TableCell>
              <TableCell>Detail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {techStack.map((row) => (
              <TableRow key={row.aspect}>
                <TableCell sx={{ fontWeight: 500, color: 'text.primary' }}>{row.aspect}</TableCell>
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

      {/* Content System */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <StorageIcon sx={{ color: 'success.main' }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Content System
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
        A custom block-based content storage system enabling reusable content, layered variants, and AI transformation caching.
      </Typography>

      {/* Block Types */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        Block Types
      </Typography>
      <Stack spacing={1.5} sx={{ mb: 4 }}>
        {blockTypes.map((block) => (
          <Paper 
            key={block.type}
            variant="outlined" 
            sx={{ 
              p: 2, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              borderLeft: `4px solid ${block.color}`,
              '&:hover': { boxShadow: 1 },
            }}
          >
            <Box 
              component="code" 
              sx={{ 
                px: 1.5, 
                py: 0.5, 
                bgcolor: `${block.color}12`, 
                color: block.color,
                borderRadius: 1,
                fontWeight: 600,
                fontSize: '0.875rem',
                minWidth: 140,
              }}
            >
              {block.type}
            </Box>
            <Typography variant="body2" color="text.secondary">
              {block.description}
            </Typography>
          </Paper>
        ))}
      </Stack>

      <Divider sx={{ my: 4 }} />

      {/* Content Layering */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <LayersIcon sx={{ color: 'info.main' }} />
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Content Layering
        </Typography>
      </Box>
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 3, 
          bgcolor: '#1e293b',
          borderRadius: 2,
          mb: 3,
        }}
      >
        <Typography 
          component="pre" 
          sx={{ 
            fontFamily: '"Fira Code", "JetBrains Mono", monospace', 
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

      {/* Content API */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        Content API
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
          GET /api/content/:blockId?variant=adhd&locale=es&audience=student
        </Typography>
      </Paper>
      <Typography variant="body2" color="text.secondary">
        Returns merged content with all applicable layers applied.
      </Typography>
    </>
  );
}
