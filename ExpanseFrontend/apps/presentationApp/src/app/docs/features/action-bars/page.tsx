import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Alert, Chip, Stack, Grid, Card, CardContent } from '@mui/material'
import TouchAppIcon from '@mui/icons-material/TouchApp'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import TimerIcon from '@mui/icons-material/Timer'
import StarIcon from '@mui/icons-material/Star'
import AdsClickIcon from '@mui/icons-material/AdsClick'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Link from 'next/link'

const actionBars = [
  { bar: 'Learning Bar', actions: 'Expand, Simplify, Research, Clarify, Visualize, Transform, Associate, Examples, List Options, Step-by-Step, Quiz Me, Build Mental Model, Problem Solve, Chain Link, References', description: 'AI-powered content transformation and supplement actions', primary: true },
  { bar: 'Visual Bar', actions: 'SVG, Image, ASCII Art, Video, Short Video', description: 'Visual content generation — diagrams, images, video' },
  { bar: 'Spatial Bar', actions: 'Mind Map, Timeline, Hierarchy, Compare, Flowchart, Matrix, Memory Palace', description: 'Spatial reasoning and structural organization' },
  { bar: 'Auditory Bar', actions: 'Read Aloud, Podcast Style, Mnemonic Rhyme, Song/Jingle, Dialogue Format, Audio Summary', description: 'Audio and rhythm-based learning' },
  { bar: 'Kinesthetic Bar', actions: 'Hands-On Exercise, Build It, Role Play, Gesture Guide, Interactive Drag, Real-World Task', description: 'Physical engagement and doing-based learning' },
  { bar: 'Sensory Bar', actions: 'Scent Association, Texture/Material, Color Coding, Synesthesia Map, Environmental Context', description: 'Multi-sensory associations' },
  { bar: 'Verbal Bar', actions: 'Define, Synonym/Antonym, Reword, Debate Format, Write It Out, Vocabulary Builder, Language Origin, Acronym', description: 'Language and word-based learning' },
  { bar: 'Nonverbal Bar', actions: 'Icon Set, Emoji Encode, Body Language, Gesture Mapping, Symbol System, Visual Metaphor, Silent Demo', description: 'Symbolic and non-linguistic communication' },
  { bar: 'Emotional Bar', actions: 'Emotional Hook, Empathy Perspective, Personal Relevance, Stakes, Celebrate, Fear to Confidence, Inspire, Reflect', description: 'Emotional connection and affective learning' },
  { bar: 'Logical Bar', actions: 'Prove It, Pattern Recognition, Logic Chain, If-Then, Algorithm, Formal Proof, Mathematical Model', description: 'Deductive reasoning and formal logic' },
  { bar: 'Narrative Bar', actions: 'Story Arc, Character Journey, Case Study, Historical Narrative, Scenario, Parable, Origin Story', description: 'Story-based and case-based learning' },
  { bar: 'Analogical Bar', actions: 'Analogy, Like X But, Bridge Concept, Contrast Pair, Cross-Domain Transfer', description: 'Comparison and bridging learning' },
  { bar: 'Critical Bar', actions: "Devil's Advocate, Fact Check, Source Critique, Assumption Challenge, Bias Detection, Evidence Evaluate", description: 'Questioning and analytical thinking' },
  { bar: 'Memory Bar', actions: 'Spaced Repetition, Flashcard, Chunking Guide, Peg System, Method of Loci, First-Letter Mnemonic', description: 'Explicit memory encoding techniques' },
  { bar: 'Creative Bar', actions: 'Create Your Own, Remix, What If, Invention Challenge, Brainstorm, Design Prompt', description: 'Generative and creative learning' },
  { bar: 'Teaching Bar', actions: 'Teach It, Explain to Novice, Peer Mentor Mode, Create Tutorial, Rubber Duck Debug', description: 'Learning by teaching others' },
  { bar: 'Play Bar', actions: 'Game It, Joke Format, Pun, Playful Scenario, Challenge Mode, Easter Egg Hunt', description: 'Humor and gamified learning' },
  { bar: 'Cultural Bar', actions: 'Historical Context, Cultural Lens, Global Perspectives, Era Comparison, Tradition/Origin', description: 'Contextual and perspective learning' },
  { bar: 'Procedural Bar', actions: 'Recipe Format, Checklist, SOP, Troubleshooting Guide, Decision Tree, Quick Reference', description: 'How-to and practical formats' },
  { bar: 'Error Bar', actions: 'Find the Error, Common Mistakes, Misconception Check, Fact Verify, Debug This, Wrong Answer Analysis, Accuracy Rating, Trap Detection', description: 'Error detection and misconception correction' },
  { bar: 'Follow-Up Bar', actions: 'Continue Learning, Deep Dive, Related Topics, Next Steps, Review Previous', description: 'Continued learning and exploration' },
  { bar: 'Perspective Bar', actions: 'Positive View, Negative View, Flip Perspective', description: 'Positive/negative framing toggles' },
  { bar: 'Social Bar', actions: "I'm Confused, Help Me Understand, I Get It, Thumbs Up/Down, Emoji React, Share, Agree, Disagree", description: 'Real-time feedback and reactions' },
]

const features = [
  { icon: ToggleOnIcon, title: 'Toggleable', description: 'Activate bars from layout icons — switch between different action sets based on context', color: '#10b981' },
  { icon: TimerIcon, title: 'Cooldowns', description: 'Actions have cooldown timers to encourage thoughtful usage and prevent spam', color: '#f59e0b' },
  { icon: StarIcon, title: 'Resource Costs', description: 'Each action consumes resources (XP, coins, energy) creating meaningful choices', color: '#8b5cf6' },
  { icon: AdsClickIcon, title: 'Custom Click Actions', description: 'Context-aware popup FABs appear with relevant actions based on what is clicked', color: '#ec4899' },
]

const relatedFeatures = [
  { href: '/docs/features/ai-actions', label: 'AI Actions', description: 'Actions powered by AI' },
  { href: '/docs/features/feedback', label: 'Feedback System', description: 'User response handling' },
  { href: '/docs/features/game-ui', label: 'Game UI', description: 'Gamification elements' },
]

export default function ActionBarsPage() {
  const totalActions = actionBars.reduce((sum, bar) => sum + bar.actions.split(', ').length, 0)

  return (
    <>
      {/* Header with Icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#f59e0b15' }}>
          <TouchAppIcon sx={{ fontSize: 32, color: '#f59e0b' }} />
        </Box>
        <Box>
          <Typography variant="h3">Action Bars</Typography>
          <Typography variant="body1" color="text.secondary">
            Game-style action bars for slide-by-slide content interaction
          </Typography>
        </Box>
      </Box>

      {/* Module & Architecture */}
      <Paper variant="outlined" sx={{ 
        p: 2.5, 
        mb: 4, 
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        borderLeft: '4px solid #f59e0b',
        borderRadius: 2
      }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, color: '#f59e0b' }}>
          Module & Architecture
        </Typography>
        <Box sx={{ mb: 1.5 }}>
          <Chip 
            label="AI Actions" 
            size="small" 
            sx={{ mr: 0.5, mb: 0.5, bgcolor: '#f59e0b20', color: '#b45309', fontWeight: 500 }} 
          />
          <Chip 
            label="Game System" 
            size="small" 
            sx={{ mr: 0.5, mb: 0.5, bgcolor: '#8b5cf620', color: '#6d28d9', fontWeight: 500 }} 
          />
        </Box>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          <strong>Assumed React Context:</strong>
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          <Chip label="ActionBarContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', borderColor: '#d1d5db' }} />
          <Chip label="ActionCooldownContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', borderColor: '#d1d5db' }} />
          <Chip label="AIActionsContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', borderColor: '#d1d5db' }} />
        </Stack>
        <Typography variant="caption" color="warning.main" sx={{ mt: 1.5, display: 'block', fontStyle: 'italic' }}>
          Note: Context structure is assumed and may not be complete.
        </Typography>
      </Paper>

      <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 4 }}>
        Inspired by action bars from games like League of Legends, World of Warcraft, and Fortnite — 
        bringing familiar gaming UI patterns to educational content interaction.
      </Typography>

      {/* Feature Cards */}
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Key Features
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} key={feature.title}>
            <Card variant="outlined" sx={{ 
              height: '100%',
              transition: 'all 0.2s ease',
              '&:hover': { 
                boxShadow: 2,
                borderColor: feature.color,
              }
            }}>
              <CardContent sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ 
                  p: 1, 
                  borderRadius: 1.5, 
                  bgcolor: `${feature.color}15`,
                  height: 'fit-content'
                }}>
                  <feature.icon sx={{ fontSize: 24, color: feature.color }} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Action Bar Types Table */}
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Action Bar Types
        <Chip 
          label={`${actionBars.length} bars`} 
          size="small" 
          sx={{ ml: 1.5, bgcolor: '#f59e0b20', color: '#b45309' }} 
        />
        <Chip 
          label={`${totalActions}+ actions`} 
          size="small" 
          sx={{ ml: 0.5, bgcolor: '#8b5cf620', color: '#6d28d9' }} 
        />
      </Typography>

      <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
        <strong>Layout Experimentation:</strong> Bar organization is subject to iteration.
        Bars may be combined, split, or reorganized based on usage patterns and screen real estate.
      </Alert>

      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f8fafc' }}>
              <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #e5e7eb' }}>Bar</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #e5e7eb' }}>Actions</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #e5e7eb' }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {actionBars.map((row) => (
              <TableRow 
                key={row.bar} 
                sx={{ 
                  bgcolor: row.primary ? '#f59e0b08' : 'transparent',
                  transition: 'background-color 0.15s ease',
                  '&:hover': { bgcolor: row.primary ? '#f59e0b12' : '#f8fafc' }
                }}
              >
                <TableCell sx={{ whiteSpace: 'nowrap', borderBottom: '1px solid #f1f5f9' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.bar}</Typography>
                  {row.primary && (
                    <Chip 
                      label="primary" 
                      size="small" 
                      sx={{ mt: 0.5, height: 18, fontSize: '0.65rem', bgcolor: '#f59e0b', color: 'white' }} 
                    />
                  )}
                </TableCell>
                <TableCell sx={{ fontSize: 12, color: 'text.secondary', borderBottom: '1px solid #f1f5f9' }}>
                  {row.actions}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #f1f5f9' }}>
                  <Typography variant="body2">{row.description}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Related Features */}
      <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, bgcolor: '#fafafa' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'text.secondary' }}>
          Related Features
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {relatedFeatures.map((feature) => (
            <Chip
              key={feature.href}
              component={Link}
              href={feature.href}
              label={feature.label}
              icon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
              clickable
              sx={{ 
                bgcolor: 'white',
                border: '1px solid #e5e7eb',
                '&:hover': { 
                  bgcolor: '#f59e0b10',
                  borderColor: '#f59e0b',
                  color: '#b45309'
                }
              }}
            />
          ))}
        </Stack>
      </Paper>
    </>
  )
}
