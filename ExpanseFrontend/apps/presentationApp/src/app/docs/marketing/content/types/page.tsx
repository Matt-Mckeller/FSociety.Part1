import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Chip, Stack, Alert } from '@mui/material';

const blockTypes = [
  { 
    type: 'TextBlock', 
    description: 'Rich text with markdown support', 
    useCase: 'Main explanatory content, definitions, narratives',
    color: '#1565c0',
  },
  { 
    type: 'CodeBlock', 
    description: 'Syntax-highlighted code with optional execution', 
    useCase: 'Programming tutorials, technical documentation, examples',
    color: '#7c4dff',
  },
  { 
    type: 'QuizBlock', 
    description: 'Inline quiz with question/answers', 
    useCase: 'Knowledge checks, assessments, gamified learning',
    color: '#00897b',
  },
  { 
    type: 'MediaBlock', 
    description: 'Image, video, SVG, Lottie animation', 
    useCase: 'Visual explanations, diagrams, demonstrations',
    color: '#f57c00',
  },
  { 
    type: 'InteractiveBlock', 
    description: 'Custom interactive component (WhyChip, expandable, etc.)', 
    useCase: 'Explorable explanations, interactive simulations',
    color: '#c62828',
  },
  { 
    type: 'AITransformBlock', 
    description: 'Cached AI-generated content variant', 
    useCase: 'Personalized explanations, alternative framings',
    color: '#5c6bc0',
  },
];

const contentFormats = [
  { format: 'Presentation Slides', description: 'Primary content format — linear, sequenced educational content' },
  { format: 'Reference Wiki', description: 'Non-linear, searchable knowledge base entries' },
  { format: 'Interactive Tutorials', description: 'Step-by-step guided experiences with checkpoints' },
  { format: 'Quizzes & Assessments', description: 'Knowledge testing with scoring and feedback' },
  { format: 'AI Conversations', description: 'Dynamic, personalized AI-generated content' },
];

export default function ContentTypesPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Content Types
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Block types and content formats used to author educational material in PresentationApp.
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 4 }}>
        Content is composed of <strong>blocks</strong> — reusable, typed units that can be combined and arranged 
        on slides. Each block type has specific rendering, editing, and AI transformation capabilities.
      </Alert>

      {/* Block Types */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
        Block Types
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        The foundational content units that can be placed on any slide.
      </Typography>

      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 180 }}><strong>Block Type</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>When to Use</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blockTypes.map((block) => (
              <TableRow key={block.type}>
                <TableCell>
                  <Chip 
                    label={block.type} 
                    size="small" 
                    sx={{ 
                      bgcolor: `${block.color}15`, 
                      color: block.color, 
                      fontWeight: 600,
                      fontFamily: 'monospace',
                    }} 
                  />
                </TableCell>
                <TableCell>{block.description}</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>{block.useCase}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 4 }} />

      {/* Content Formats */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Content Formats
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        Higher-level organizational structures that contain blocks.
      </Typography>

      <Stack spacing={2}>
        {contentFormats.map((format) => (
          <Paper 
            key={format.format}
            variant="outlined" 
            sx={{ 
              p: 2.5, 
              borderLeft: '4px solid #1565c0',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              {format.format}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {format.description}
            </Typography>
          </Paper>
        ))}
      </Stack>

      <Divider sx={{ my: 4 }} />

      {/* Authoring Guidelines */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Authoring Best Practices
      </Typography>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main' }}>
              Layered Complexity
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start with the simplest explanation, then layer in complexity. Each layer should build on the previous.
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main' }}>
              Multi-Modal Content
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Combine text, visuals, and interactive elements. Different learners benefit from different modalities.
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main' }}>
              Accessible by Default
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Write base content clearly and simply. Accessibility variants build on good base content.
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main' }}>
              AI-Ready Structure
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Structure content with clear sections and concepts. Well-structured content transforms better with AI.
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </>
  );
}
