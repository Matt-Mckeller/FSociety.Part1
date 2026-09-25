import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Chip, Stack, Alert, List, ListItem, ListItemText } from '@mui/material';

const perspectivePipeline = [
  { view: 'Positive Perspective', description: 'Benefits, opportunities, success stories, optimistic framing' },
  { view: 'Negative Perspective', description: 'Risks, consequences, failure cases, cautionary framing' },
  { view: 'Dual View', description: 'Both perspectives presented side by side on the same content' },
  { view: 'Flip (Up ↔ Down)', description: 'Action to convert content from positive to negative framing and back' },
];

const emotionalEmbeddings = {
  virtues: ['Diligence', 'Patience', 'Gratitude', 'Courage', 'Compassion', 'Temperance', 'Humility'],
  vices: ['Shame', 'Gluttony', 'Greed', 'Sloth', 'Wrath', 'Envy', 'Pride'],
};

const engagementPipelines = [
  { pipeline: 'Goal Association', description: 'Links current content to the learner\'s stated goals — "This matters because it connects to your goal of X"' },
  { pipeline: 'Pain Point Association', description: 'Connects content to known pain points and challenges the learner faces' },
  { pipeline: 'Character Profile Mapping', description: "Adapts content presentation based on the learner's known characteristics, preferences, and behavioral patterns" },
  { pipeline: 'Interest Graph', description: "Surfaces connections between content and the learner's declared interests and hobbies" },
  { pipeline: 'Progress Narrative', description: 'Frames content as part of the learner\'s personal growth story — "You\'ve mastered X, now Y builds on that"' },
];

const styleTransforms = [
  { style: 'Storytelling', description: 'Wraps concepts in narrative structure with characters and plot' },
  { style: 'Vivid Imagery', description: 'Rich, sensory descriptions that paint mental pictures' },
  { style: 'Analogies', description: 'Connects new concepts to familiar ones through comparison' },
  { style: 'Technical', description: 'Precise, formal language with definitions and specifications' },
  { style: 'Semiotic', description: 'Symbol-based, abstract representation of concepts' },
  { style: 'Problem Solving', description: 'Frames content as challenges to solve' },
  { style: 'Kinesthetic', description: 'Action-oriented, "do this" instructions' },
];

export default function ContentPipelinesPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Content Pipelines
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Transformation pipelines that personalize content for different learners, contexts, and emotional states.
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 4 }}>
        Content pipelines are <strong>deeper transformations</strong> than single AI actions — they may combine 
        multiple strategies and affect the entire content presentation. These run server-side and results are cached.
      </Alert>

      {/* Perspective Pipeline */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
        Perspective Pipeline
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        Applies positive and negative framings to the same content, giving learners a balanced understanding.
        Useful for topics where both benefits and risks should be understood.
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 180 }}><strong>View</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {perspectivePipeline.map((row) => (
              <TableRow key={row.view}>
                <TableCell sx={{ fontWeight: 'bold' }}>{row.view}</TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 4 }} />

      {/* Emotional & Motivational Embedding */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Emotional & Motivational Embedding
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        Pipelines that embed emotional and motivational context into content, increasing engagement 
        by connecting material to deeper human drives.
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        <Paper variant="outlined" sx={{ p: 2.5, flex: 1, minWidth: 280 }}>
          <Typography variant="h6" color="success.main" gutterBottom sx={{ fontWeight: 600 }}>
            Virtue-Based Embeddings
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Frames content through positive human qualities and aspirations
          </Typography>
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            {emotionalEmbeddings.virtues.map((v) => (
              <Chip key={v} label={v} size="small" color="success" variant="outlined" sx={{ mb: 0.5 }} />
            ))}
          </Stack>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2.5, flex: 1, minWidth: 280 }}>
          <Typography variant="h6" color="warning.main" gutterBottom sx={{ fontWeight: 600 }}>
            Vice-Based Embeddings
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Frames content through consequences and "what happens when..." scenarios
          </Typography>
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            {emotionalEmbeddings.vices.map((v) => (
              <Chip key={v} label={v} size="small" color="warning" variant="outlined" sx={{ mb: 0.5 }} />
            ))}
          </Stack>
        </Paper>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Engagement Pipelines */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Engagement Pipelines
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        Pipelines that connect content to the learner's personal context — their goals, challenges, interests, and progress.
      </Typography>

      <Stack spacing={2} sx={{ mb: 4 }}>
        {engagementPipelines.map((item) => (
          <Paper 
            key={item.pipeline}
            variant="outlined" 
            sx={{ 
              p: 2.5, 
              borderLeft: '4px solid #7c4dff',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              {item.pipeline}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </Paper>
        ))}
      </Stack>

      <Divider sx={{ my: 4 }} />

      {/* Style Transforms */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Learning Style Transforms
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        AI can re-render content into alternative learning styles based on user preference or content type.
      </Typography>

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 150 }}><strong>Style</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {styleTransforms.map((row) => (
              <TableRow key={row.style}>
                <TableCell>
                  <Chip 
                    label={row.style} 
                    size="small" 
                    sx={{ 
                      bgcolor: '#f3e5f5', 
                      color: '#7b1fa2', 
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

      {/* Implementation Note */}
      <Alert severity="warning" sx={{ mb: 2 }}>
        <strong>Reference:</strong> For UI implementation of these pipelines, see {' '}
        <a href="/docs/features/learning" style={{ color: 'inherit' }}>Learning Features</a>. 
        For AI action details, see {' '}
        <a href="/docs/features/ai-actions" style={{ color: 'inherit' }}>AI Actions</a>.
      </Alert>
    </>
  );
}
