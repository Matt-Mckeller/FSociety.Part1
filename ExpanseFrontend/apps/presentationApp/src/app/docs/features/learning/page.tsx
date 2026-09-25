import { Typography, Paper, Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Alert, Chip, Card, CardContent, Grid } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

const aiStrategies = [
  { strategy: 'Active Recall', description: 'Forces retrieval of information rather than passive re-reading. Strengthens memory by making the learner reconstruct knowledge', example: 'After explaining protein digestion, the AI asks you to restate it in your own words', color: '#06b6d4' },
  { strategy: 'Desirable Difficulty', description: 'Introduces manageable challenges that strengthen retention. Adjustable difficulty setting', example: '"Predict what happens if you skip carbs after training"', color: '#8b5cf6' },
  { strategy: 'Chunking & Layering', description: 'Breaks topics into progressive layers from basic → complex. Each layer builds on the previous', example: 'Layer 1: Amino acids → Layer 2: Synthesis → Layer 3: Signaling → Layer 4: Optimization', color: '#10b981' },
  { strategy: 'Application Bias', description: 'Knowledge sticks better when applied to real scenarios', example: 'Simulate a 5-day training schedule with protein timing', color: '#f59e0b' },
  { strategy: 'Metacognition', description: "Prompts the learner to think about how they learn — identifying what's hard, what's easy, and why", example: '"Which part of this explanation is hardest to remember?"', color: '#ec4899' },
  { strategy: 'Retrieval > Re-reading', description: 'Actively recalling information strengthens memory more than passively consuming it', example: 'Explain → Restate → Expand cycle', color: '#3b82f6' },
];

const uiLearningFeatures = [
  { feature: 'Quizzes, Assignments, Questions', description: 'Optional questions to confirm understanding and improve learning. Completing a quiz rewards the user with coins', icon: '📝' },
  { feature: 'Why Chip', description: 'A clickable chip component that explains why a concept or section is important', icon: '❓' },
  { feature: 'Accessibility Mode Selector', description: 'User preference for content presentation style', icon: '♿' },
  { feature: 'Tooltips', description: 'Contextual help on hover', icon: '💡' },
  { feature: 'Content Style Transforms', description: 'AI can re-render slide content into alternative learning styles: Storytelling, Vivid Imagery, Analogies, Technical, Semiotic, Problem Solving, Kinesthetic', icon: '🎨' },
];

const relatedFeatures = [
  { label: 'AI Actions', href: '/docs/features/ai-actions', description: 'Discrete AI-driven actions' },
  { label: 'Action Bars', href: '/docs/features/action-bars', description: 'User interaction surfaces' },
  { label: 'Feedback System', href: '/docs/features/feedback', description: 'User feedback mechanisms' },
];

export default function LearningPage() {
  return (
    <>
      {/* Header with Icon */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 4 }}>
        <Box sx={{
          bgcolor: '#06b6d4',
          borderRadius: 2,
          p: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(6, 182, 212, 0.4)',
        }}>
          <SchoolIcon sx={{ color: 'white', fontSize: 32 }} />
        </Box>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
            Learning Features
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Pedagogical strategies, user actions, and UI elements that power intelligent learning
          </Typography>
        </Box>
      </Box>

      {/* Module & Architecture - Enhanced */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 2.5, 
          mb: 4, 
          background: 'linear-gradient(135deg, #f0fdfa 0%, #ecfeff 50%, #f0f9ff 100%)',
          borderLeft: '4px solid #06b6d4',
          borderRadius: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#0e7490' }}>
          Module & Architecture
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Chip 
            label="Content System" 
            size="small" 
            sx={{ mr: 0.5, mb: 0.5, bgcolor: '#06b6d4', color: 'white', fontWeight: 600 }} 
          />
          <Chip 
            label="AI Actions" 
            size="small" 
            sx={{ mr: 0.5, mb: 0.5, bgcolor: '#8b5cf6', color: 'white', fontWeight: 600 }} 
          />
          <Chip 
            label="Analytics" 
            size="small" 
            sx={{ mr: 0.5, mb: 0.5, bgcolor: '#10b981', color: 'white', fontWeight: 600 }} 
          />
        </Box>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1, fontWeight: 600 }}>
          Assumed React Context:
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          <Chip label="LearningContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', borderColor: '#06b6d4', color: '#0e7490' }} />
          <Chip label="ContentTransformContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', borderColor: '#06b6d4', color: '#0e7490' }} />
          <Chip label="AIActionsContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', borderColor: '#06b6d4', color: '#0e7490' }} />
          <Chip label="AccessibilityModeContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', borderColor: '#06b6d4', color: '#0e7490' }} />
        </Stack>
        <Typography variant="caption" sx={{ mt: 1.5, display: 'block', fontStyle: 'italic', color: '#b45309' }}>
          Note: Context structure is assumed and may not be complete.
        </Typography>
      </Paper>

      {/* Three Layers Visual */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 4, 
          bgcolor: '#fafafa',
          borderRadius: 2,
          border: '1px solid #e5e7eb',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}>
          Three Layers of Learning
        </Typography>
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={2} 
          alignItems="stretch"
          justifyContent="center"
        >
          {/* Layer 1: Pedagogical Strategies */}
          <Paper
            elevation={2}
            sx={{
              flex: 1,
              p: 2,
              textAlign: 'center',
              bgcolor: '#ecfeff',
              border: '2px solid #06b6d4',
              borderRadius: 2,
            }}
          >
            <Box sx={{ bgcolor: '#06b6d4', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1.5 }}>
              <PsychologyIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0e7490' }}>
              Pedagogical Strategies
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
              How AI teaches — the science-backed methods driving learning effectiveness
            </Typography>
          </Paper>

          {/* Arrow */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <ArrowForwardIcon sx={{ color: '#9ca3af', fontSize: 28 }} />
          </Box>

          {/* Layer 2: Discrete Actions */}
          <Paper
            elevation={2}
            sx={{
              flex: 1,
              p: 2,
              textAlign: 'center',
              bgcolor: '#f5f3ff',
              border: '2px solid #8b5cf6',
              borderRadius: 2,
            }}
          >
            <Box sx={{ bgcolor: '#8b5cf6', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1.5 }}>
              <TouchAppIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#6d28d9' }}>
              Discrete Actions
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
              What users trigger — explicit learning interactions and AI requests
            </Typography>
          </Paper>

          {/* Arrow */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <ArrowForwardIcon sx={{ color: '#9ca3af', fontSize: 28 }} />
          </Box>

          {/* Layer 3: UI Elements */}
          <Paper
            elevation={2}
            sx={{
              flex: 1,
              p: 2,
              textAlign: 'center',
              bgcolor: '#ecfdf5',
              border: '2px solid #10b981',
              borderRadius: 2,
            }}
          >
            <Box sx={{ bgcolor: '#10b981', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1.5 }}>
              <WidgetsIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#047857' }}>
              UI Elements
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
              What surfaces it — visual components that expose learning features
            </Typography>
          </Paper>
        </Stack>
      </Paper>

      <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
        Learning features are organized into three layers: the pedagogical strategies that guide how AI teaches,
        the discrete actions users can trigger, and the UI elements that surface learning interactions.
      </Typography>

      {/* AI Learning Strategies */}
      <Typography variant="h4" gutterBottom sx={{ mt: 4, fontWeight: 700 }}>
        AI Learning Strategies
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        These are the pedagogical principles that govern how the AI presents, reinforces, and tests knowledge.
        They should be surfaced as an interactive UI component — not just hidden background behaviors.
      </Typography>
      <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
        <strong>UI Surface:</strong> A Learning Strategy Panel (tab-based or action bar) that lets the user select
        a strategy and see the current content re-presented through that lens.
      </Alert>
      <TableContainer component={Paper} elevation={2} sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#0e7490' }}>
              <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>Strategy</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>Description</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>Example</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aiStrategies.map((row, index) => (
              <TableRow 
                key={row.strategy}
                sx={{ 
                  bgcolor: index % 2 === 0 ? 'white' : '#f8fafc',
                  '&:hover': { bgcolor: '#ecfeff' },
                }}
              >
                <TableCell sx={{ whiteSpace: 'nowrap', py: 1.5 }}>
                  <Chip 
                    label={row.strategy} 
                    size="small" 
                    sx={{ 
                      bgcolor: row.color, 
                      color: 'white', 
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }} 
                  />
                </TableCell>
                <TableCell sx={{ py: 1.5, lineHeight: 1.5 }}>{row.description}</TableCell>
                <TableCell sx={{ py: 1.5 }}>
                  <Box sx={{ 
                    bgcolor: '#f1f5f9', 
                    p: 1, 
                    borderRadius: 1, 
                    fontStyle: 'italic', 
                    fontSize: '0.75rem',
                    color: '#475569',
                    borderLeft: `3px solid ${row.color}`,
                  }}>
                    {row.example}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 4 }} />

      {/* Content Pipelines Reference */}
      <Typography variant="h4" gutterBottom>
        Content Pipelines & Transformations
      </Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Moved to Marketing:</strong> Content pipelines (Perspective, Emotional, Engagement) are now documented 
        in the <Link href="/docs/marketing/content/pipelines" style={{ color: 'inherit', fontWeight: 600 }}>Marketing → Content → Pipelines</Link> section, 
        as they relate to content strategy and personalization.
      </Alert>
      <Typography variant="body2" color="text.secondary" paragraph>
        Content pipelines are deeper transformations that process and re-render content through different lenses — 
        they may combine multiple strategies and affect the entire content presentation. See the dedicated section for:
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Stack spacing={1}>
          <Typography variant="body2">• <strong>Perspective Pipeline</strong> — Positive/negative framing</Typography>
          <Typography variant="body2">• <strong>Emotional & Motivational Embedding</strong> — Virtue/vice-based framing</Typography>
          <Typography variant="body2">• <strong>Engagement Pipelines</strong> — Goal, pain point, interest associations</Typography>
          <Typography variant="body2">• <strong>Learning Style Transforms</strong> — Storytelling, analogies, technical styles</Typography>
        </Stack>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* UI Learning Features - Cards */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        UI Learning Features
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Visual components and interactive elements that surface learning functionality to users.
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {uiLearningFeatures.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.feature}>
            <Card 
              elevation={0}
              sx={{ 
                height: '100%', 
                border: '1px solid #e5e7eb',
                borderRadius: 2,
                transition: 'all 0.2s ease',
                '&:hover': { 
                  borderColor: '#06b6d4',
                  boxShadow: '0 4px 12px rgba(6, 182, 212, 0.15)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <Typography variant="h5" component="span">{item.icon}</Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0e7490' }}>
                    {item.feature}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Related Features */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
        Related Features
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        {relatedFeatures.map((feature) => (
          <Link href={feature.href} key={feature.label} style={{ textDecoration: 'none', flex: 1 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                border: '1px solid #e5e7eb',
                borderRadius: 2,
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: '#8b5cf6',
                  bgcolor: '#faf5ff',
                },
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#6d28d9', mb: 0.5 }}>
                {feature.label} →
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Link>
        ))}
      </Stack>
    </>
  );
}
