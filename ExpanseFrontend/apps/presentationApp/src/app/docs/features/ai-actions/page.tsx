import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Alert, Divider, Chip, Stack, Grid } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CategoryIcon from '@mui/icons-material/Category';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

const actionCategories = [
  {
    category: 'Content Transform Actions',
    bar: 'Learning',
    actions: [
      { action: 'Expand', description: 'Adds more detail and depth' },
      { action: 'Simplify', description: 'Reduces complexity, simpler language' },
      { action: 'Clarify', description: 'Rephrases for clarity' },
      { action: 'Step-by-Step', description: 'Sequential breakdown' },
      { action: 'Visualize', description: 'Converts to visual representation' },
    ],
  },
  {
    category: 'Content Supplement Actions',
    bar: 'Learning',
    actions: [
      { action: 'Research', description: 'Pulls in additional context and sources' },
      { action: 'Associate', description: 'Related concepts and connections' },
      { action: 'Examples', description: 'Typical and edge-case examples' },
      { action: 'List Options', description: 'Available options for a topic' },
      { action: 'References', description: 'Source material and citations' },
    ],
  },
  {
    category: 'Visual Generation Actions',
    bar: 'Visual',
    actions: [
      { action: 'SVG', description: 'Generates SVG diagram' },
      { action: 'Image', description: 'Generates image' },
      { action: 'ASCII Art', description: 'Text-based visualization' },
      { action: 'Video', description: 'Video explanation' },
      { action: 'Short Video', description: '≤60s quick video' },
    ],
  },
  {
    category: 'Spatial & Structural Actions',
    bar: 'Spatial',
    actions: [
      { action: 'Mind Map', description: 'Generates connected node diagram of concepts' },
      { action: 'Timeline', description: 'Arranges content chronologically' },
      { action: 'Hierarchy', description: 'Shows parent-child relationships' },
      { action: 'Compare Side-by-Side', description: 'Places concepts in comparison layout' },
      { action: 'Flowchart', description: 'Process flow visualization' },
      { action: 'Matrix', description: '2D grid organization (e.g., pros/cons, categories)' },
      { action: 'Spatial Memory Palace', description: 'Maps concepts to imagined locations for memory' },
    ],
  },
  {
    category: 'Auditory Learning Actions',
    bar: 'Auditory',
    actions: [
      { action: 'Read Aloud', description: 'Text-to-speech narration of content' },
      { action: 'Explain Like a Podcast', description: 'Conversational audio-style explanation' },
      { action: 'Mnemonic Rhyme', description: 'Creates rhyme or rhythm-based memory aid' },
      { action: 'Song/Jingle', description: 'Generates musical memory hook (experimental)' },
      { action: 'Dialogue Format', description: 'Presents as conversation between voices' },
      { action: 'Summarize as Audio', description: 'Generates audio summary for listening' },
    ],
  },
  {
    category: 'Kinesthetic & Tactile Actions',
    bar: 'Kinesthetic',
    actions: [
      { action: 'Hands-On Exercise', description: 'Suggests physical activity or real-world practice' },
      { action: 'Build It', description: 'Step-by-step construction/assembly approach' },
      { action: 'Role Play', description: 'Simulates scenario for active participation' },
      { action: 'Gesture Guide', description: 'Suggests hand movements or physical mnemonics' },
      { action: 'Interactive Drag', description: 'Creates drag-and-drop interactive exercise' },
      { action: 'Real-World Task', description: 'Maps concept to tangible real-world action' },
    ],
  },
  {
    category: 'Sensory Association Actions',
    bar: 'Sensory',
    actions: [
      { action: 'Scent Association', description: 'Suggests real-world scent to associate with concept for memory anchoring' },
      { action: 'Texture/Material', description: 'Describes tactile qualities or suggests physical materials to touch' },
      { action: 'Color Coding', description: 'Applies color-based organization to content' },
      { action: 'Synesthesia Map', description: 'Cross-modal associations (e.g., "this concept feels like...")' },
      { action: 'Environmental Context', description: 'Suggests physical environment for studying (forest, library, etc.)' },
    ],
  },
  {
    category: 'Verbal & Linguistic Actions',
    bar: 'Verbal',
    actions: [
      { action: 'Define', description: 'Provides precise definitions and etymology' },
      { action: 'Synonym/Antonym', description: 'Shows related and opposite terms' },
      { action: 'Reword', description: 'Rephrases using different vocabulary' },
      { action: 'Debate Format', description: 'Presents as argument with thesis and counterpoints' },
      { action: 'Write It Out', description: 'Prompts user to write explanation in their own words' },
      { action: 'Vocabulary Builder', description: 'Extracts key terms with definitions' },
      { action: 'Language Origin', description: 'Etymology and linguistic roots of terminology' },
      { action: 'Acronym/Initialism', description: 'Creates memorable word-based memory device' },
    ],
  },
  {
    category: 'Nonverbal & Symbolic Actions',
    bar: 'Nonverbal',
    actions: [
      { action: 'Icon Set', description: 'Represents concepts as symbolic icons' },
      { action: 'Emoji Encode', description: 'Summarizes using emoji sequences' },
      { action: 'Body Language Cues', description: 'Describes nonverbal communication aspects' },
      { action: 'Gesture Mapping', description: 'Maps concepts to hand signals or physical gestures' },
      { action: 'Symbol System', description: 'Creates custom symbolic notation for the content' },
      { action: 'Visual Metaphor', description: 'Represents abstract concepts through concrete imagery' },
      { action: 'Silent Demonstration', description: 'Explains through visual demonstration without words' },
    ],
  },
  {
    category: 'Emotional & Affective Actions',
    bar: 'Emotional',
    actions: [
      { action: 'Emotional Hook', description: 'Connects content to an emotional story or scenario' },
      { action: 'Empathy Perspective', description: "Presents from another person's emotional viewpoint" },
      { action: 'Personal Relevance', description: "Connects to user's values, fears, hopes, or goals" },
      { action: 'Stakes & Consequences', description: 'Highlights emotional impact of understanding vs. not understanding' },
      { action: 'Celebrate Progress', description: 'Acknowledges emotional journey and growth' },
      { action: 'Fear to Confidence', description: 'Addresses anxiety and builds confidence around topic' },
      { action: 'Inspire', description: 'Motivational framing that connects to purpose' },
      { action: 'Reflect', description: 'Prompts emotional self-reflection on the content' },
    ],
  },
  {
    category: 'Logical & Mathematical Actions',
    bar: 'Logical',
    actions: [
      { action: 'Prove It', description: 'Provides logical proof or evidence chain' },
      { action: 'Pattern Recognition', description: 'Identifies repeating structures or sequences' },
      { action: 'Logic Chain', description: 'Step-by-step deductive reasoning' },
      { action: 'If-Then Analysis', description: 'Conditional logic breakdown' },
      { action: 'Algorithm', description: 'Presents as algorithmic steps' },
      { action: 'Formal Proof', description: 'Mathematical or logical proof format' },
      { action: 'Mathematical Model', description: 'Represents concept as equations or formulas' },
    ],
  },
  {
    category: 'Narrative & Story Actions',
    bar: 'Narrative',
    actions: [
      { action: 'Story Arc', description: 'Wraps concept in beginning-middle-end narrative' },
      { action: 'Character Journey', description: 'Personifies concept through character experience' },
      { action: 'Case Study', description: 'Real-world example with context and outcome' },
      { action: 'Historical Narrative', description: 'Tells the story of how something came to be' },
      { action: 'Scenario Walkthrough', description: 'Step-through of realistic situation' },
      { action: 'Parable', description: 'Moral lesson through allegorical story' },
      { action: 'Origin Story', description: 'How/why something was created or discovered' },
    ],
  },
  {
    category: 'Analogical & Comparative Actions',
    bar: 'Analogical',
    actions: [
      { action: 'Analogy', description: 'Maps concept to familiar comparison' },
      { action: 'Like X But...', description: 'Explains by similarity with key difference' },
      { action: 'Bridge Concept', description: 'Connects unknown to known concept' },
      { action: 'Contrast Pair', description: 'Highlights differences between two concepts' },
      { action: 'Cross-Domain Transfer', description: 'Applies concept from one field to another' },
    ],
  },
  {
    category: 'Critical Thinking Actions',
    bar: 'Critical',
    actions: [
      { action: "Devil's Advocate", description: 'Argues against the presented position' },
      { action: 'Fact Check', description: 'Verifies claims with evidence' },
      { action: 'Source Critique', description: 'Evaluates reliability of sources' },
      { action: 'Assumption Challenge', description: 'Surfaces hidden assumptions' },
      { action: 'Bias Detection', description: 'Identifies potential biases in content' },
      { action: 'Evidence Evaluate', description: 'Weighs strength of supporting evidence' },
    ],
  },
  {
    category: 'Memory Technique Actions',
    bar: 'Memory',
    actions: [
      { action: 'Spaced Repetition Cue', description: 'Schedules review at optimal intervals' },
      { action: 'Flashcard', description: 'Generates flashcard format' },
      { action: 'Chunking Guide', description: 'Groups information into memorable chunks' },
      { action: 'Peg System', description: 'Associates items with numbered pegs' },
      { action: 'Method of Loci', description: 'Maps to spatial memory palace' },
      { action: 'First-Letter Mnemonic', description: 'Creates acronym or acrostic' },
    ],
  },
  {
    category: 'Creative & Generative Actions',
    bar: 'Creative',
    actions: [
      { action: 'Create Your Own', description: 'Prompts user to generate original content' },
      { action: 'Remix', description: 'Combines concepts in new ways' },
      { action: 'What If', description: 'Explores hypothetical variations' },
      { action: 'Invention Challenge', description: 'Design something using the concept' },
      { action: 'Brainstorm', description: 'Generates multiple ideas or solutions' },
      { action: 'Design Prompt', description: 'Creative brief to apply concept' },
    ],
  },
  {
    category: 'Teaching Mode Actions',
    bar: 'Teaching',
    actions: [
      { action: 'Teach It', description: 'Prompts user to explain concept as teacher' },
      { action: 'Explain to Novice', description: 'Explain as if to complete beginner' },
      { action: 'Peer Mentor Mode', description: 'Simulate helping another learner' },
      { action: 'Create Tutorial', description: 'Build a how-to for others' },
      { action: 'Rubber Duck Debug', description: 'Explain step-by-step to find gaps' },
    ],
  },
  {
    category: 'Humor & Play Actions',
    bar: 'Play',
    actions: [
      { action: 'Game It', description: 'Turns content into game format' },
      { action: 'Joke Format', description: 'Presents concept as joke or punchline' },
      { action: 'Pun', description: 'Uses wordplay for memorability' },
      { action: 'Playful Scenario', description: 'Light-hearted hypothetical situation' },
      { action: 'Challenge Mode', description: 'Competitive framing with stakes' },
      { action: 'Easter Egg Hunt', description: 'Hidden discoveries within content' },
    ],
  },
  {
    category: 'Cultural & Historical Context Actions',
    bar: 'Cultural',
    actions: [
      { action: 'Historical Context', description: 'Places concept in historical setting' },
      { action: 'Cultural Lens', description: 'Views through different cultural perspective' },
      { action: 'Global Perspectives', description: 'Shows how concept varies across regions' },
      { action: 'Era Comparison', description: 'Compares across different time periods' },
      { action: 'Tradition/Origin', description: 'Cultural roots and traditions behind concept' },
    ],
  },
  {
    category: 'Procedural & Practical Actions',
    bar: 'Procedural',
    actions: [
      { action: 'Recipe Format', description: 'Step-by-step ingredients and instructions' },
      { action: 'Checklist', description: 'Actionable checklist to follow' },
      { action: 'SOP', description: 'Standard operating procedure format' },
      { action: 'Troubleshooting Guide', description: 'If-this-then-that problem solving' },
      { action: 'Decision Tree', description: 'Branching choices for decisions' },
      { action: 'Quick Reference', description: 'Condensed reference card format' },
    ],
  },
  {
    category: 'Learning & Metacognition Actions',
    bar: 'Learning',
    actions: [
      { action: 'Transform', description: 'Re-renders in different learning style' },
      { action: 'Quiz Me', description: 'Generates quiz on content' },
      { action: 'Build Mental Model', description: 'Structured mental framework' },
      { action: 'Problem Solve', description: 'Presents content as problem to solve' },
      { action: 'Chain Link', description: 'Connects to related concepts' },
    ],
  },
  {
    category: 'Error Detection & Misconception Actions',
    bar: 'Error',
    actions: [
      { action: 'Find the Error', description: 'Challenges user to identify mistake in content or response' },
      { action: 'Common Mistakes', description: 'Shows frequently made errors for this topic' },
      { action: 'Misconception Check', description: 'Tests for known misconceptions' },
      { action: 'Fact Verify', description: 'Cross-checks claims against reliable sources' },
      { action: 'Debug This', description: 'Step-by-step error identification in reasoning or process' },
      { action: 'Wrong Answer Analysis', description: 'Explains why incorrect answers are wrong' },
      { action: 'Accuracy Rating', description: "Rates accuracy of user's response with explanation" },
      { action: 'Trap Detection', description: 'Identifies common traps or trick questions' },
    ],
  },
  {
    category: 'Follow-Up Actions',
    bar: 'Follow-Up',
    actions: [
      { action: 'Continue Learning', description: 'Suggests next topics' },
      { action: 'Deep Dive', description: 'Goes deeper on current topic' },
      { action: 'Related Topics', description: 'Shows related areas' },
      { action: 'Next Steps', description: 'Actionable next steps' },
      { action: 'Review Previous', description: 'Revisits prior material' },
    ],
  },
  {
    category: 'Perspective Actions',
    bar: 'Perspective',
    actions: [
      { action: 'Positive View', description: 'Optimistic, benefit-focused framing' },
      { action: 'Negative View', description: 'Risk-focused, cautionary framing' },
      { action: 'Flip Perspective', description: 'Toggles between positive/negative' },
    ],
  },
  {
    category: 'Social & Feedback Actions',
    bar: 'Social',
    actions: [
      { action: "I'm Confused", description: 'Signals confusion' },
      { action: 'Help Me Understand', description: 'Requests explanation' },
      { action: 'I Get It', description: 'Confirms understanding' },
      { action: 'Slow Down / Speed Up', description: 'Pacing signals' },
      { action: 'Thumbs Up/Down', description: 'Binary feedback' },
      { action: 'Emoji React', description: 'Expressive reactions' },
      { action: 'Agree/Disagree', description: 'Opinion signals' },
      { action: 'Share', description: 'Share content' },
    ],
  },
];

export default function AIActionsPage() {
  const totalActions = actionCategories.reduce((sum, cat) => sum + cat.actions.length, 0);

  // Color mapping for action bars
  const barColors: Record<string, string> = {
    Learning: '#1565c0',
    Visual: '#7c4dff',
    Spatial: '#00897b',
    Auditory: '#f57c00',
    Kinesthetic: '#c62828',
    Sensory: '#6a1b9a',
    Verbal: '#0277bd',
    Nonverbal: '#388e3c',
    Emotional: '#e91e63',
    Logical: '#5c6bc0',
    Narrative: '#8d6e63',
    Analogical: '#00acc1',
    Critical: '#ef6c00',
    Memory: '#ffc107',
    Creative: '#ec407a',
    Teaching: '#26a69a',
    Navigation: '#78909c',
    Preference: '#ab47bc',
    Social: '#ff7043',
  };

  return (
    <>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#8b5cf615' }}>
          <SmartToyIcon sx={{ fontSize: 32, color: '#8b5cf6' }} />
        </Box>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>AI Actions</Typography>
          <Typography variant="body1" color="text.secondary">
            {totalActions}+ intelligent learning actions organized by category
          </Typography>
        </Box>
      </Box>

      <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.05rem', maxWidth: 700, mb: 3, lineHeight: 1.7 }}>
        All triggerable actions organized by category. Most actions are learning-focused — they transform,
        supplement, or reinforce content to improve comprehension and retention.
      </Typography>

      {/* Module & Architecture */}
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 2.5, 
          mb: 3, 
          background: 'linear-gradient(135deg, #f3e8ff 0%, #faf5ff 50%, #f5f3ff 100%)',
          borderLeft: '4px solid #8b5cf6',
          borderColor: '#e9d5ff',
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#6b21a8' }}>Module & Architecture</Typography>
        <Box sx={{ mb: 1.5 }}>
          <Chip 
            label="AI Actions" 
            size="small" 
            sx={{ mr: 0.5, mb: 0.5, bgcolor: '#8b5cf6', color: 'white', fontWeight: 600 }} 
          />
          <Chip 
            label="Content System" 
            size="small" 
            sx={{ mr: 0.5, mb: 0.5, bgcolor: '#a78bfa', color: 'white', fontWeight: 600 }} 
          />
          <Chip 
            label="Learning Engine" 
            size="small" 
            sx={{ mr: 0.5, mb: 0.5, bgcolor: '#c4b5fd', color: '#581c87', fontWeight: 600 }} 
          />
        </Box>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1, fontWeight: 600 }}>
          Assumed React Context:
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          <Chip label="AIActionsContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', borderColor: '#8b5cf6', color: '#7c3aed' }} />
          <Chip label="ContentTransformContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', borderColor: '#8b5cf6', color: '#7c3aed' }} />
          <Chip label="ActionCooldownContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', borderColor: '#8b5cf6', color: '#7c3aed' }} />
          <Chip label="LearningModeContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', borderColor: '#8b5cf6', color: '#7c3aed' }} />
        </Stack>
        <Typography variant="caption" color="warning.main" sx={{ mt: 1.5, display: 'block', fontStyle: 'italic' }}>
          Note: Context structure is assumed and may not be complete.
        </Typography>
      </Paper>

      {/* Stats Banner */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2.5, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
              color: 'white',
              borderRadius: 2,
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 28, mb: 0.5, opacity: 0.9 }} />
            <Typography variant="h3" sx={{ fontWeight: 700 }}>{totalActions}</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>Total Actions</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2.5, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
              color: 'white',
              borderRadius: 2,
            }}
          >
            <CategoryIcon sx={{ fontSize: 28, mb: 0.5, opacity: 0.9 }} />
            <Typography variant="h3" sx={{ fontWeight: 700 }}>{actionCategories.length}</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>Categories</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2.5, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)',
              color: 'white',
              borderRadius: 2,
            }}
          >
            <TouchAppIcon sx={{ fontSize: 28, mb: 0.5, opacity: 0.9 }} />
            <Typography variant="h3" sx={{ fontWeight: 700 }}>5</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>Action Bars</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Alert severity="info" sx={{ mb: 2 }} icon={false}>
        <strong>Results Rendering:</strong> Configurable per context — Chat Panel, Overlay, or Side Panel.
      </Alert>

      <Alert severity="warning" sx={{ mb: 4 }} icon={false}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          Simplification Required (Future Work)
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
          <li>Current {totalActions}+ actions need consolidation before implementation</li>
          <li><strong>Weights & Biases:</strong> Action relevance depends on content type</li>
          <li><strong>Content-Aware Ranking:</strong> AI should dynamically surface relevant actions</li>
          <li><strong>Progressive Disclosure:</strong> Start simplified; reveal more with mastery</li>
        </Box>
      </Alert>

      {/* Categories */}
      {actionCategories.map((category) => {
        const barColor = barColors[category.bar] || '#64748b';
        return (
          <Box key={category.category} sx={{ mb: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5, 
              mb: 1.5,
            }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {category.category}
              </Typography>
              <Box 
                sx={{ 
                  px: 1.5, 
                  py: 0.25, 
                  borderRadius: 1,
                  bgcolor: `${barColor}15`,
                  color: barColor,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                {category.bar} Bar
              </Box>
            </Box>
            <TableContainer 
              component={Paper} 
              variant="outlined"
              sx={{ 
                borderLeft: `4px solid ${barColor}`,
                overflow: 'hidden',
              }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: `${barColor}10` }}>
                    <TableCell sx={{ width: 200, fontWeight: 700, color: barColor }}>Action</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: barColor }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {category.actions.map((action, idx) => (
                    <TableRow 
                      key={action.action}
                      sx={{ 
                        '&:hover': { bgcolor: `${barColor}08` },
                        bgcolor: idx % 2 === 0 ? 'transparent' : 'grey.50',
                        transition: 'background-color 0.15s ease',
                      }}
                    >
                      <TableCell>
                        <Chip 
                          label={action.action} 
                          size="small" 
                          sx={{ 
                            fontWeight: 600, 
                            bgcolor: `${barColor}15`, 
                            color: barColor,
                            '&:hover': { bgcolor: `${barColor}25` },
                          }} 
                        />
                      </TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                        {action.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
      })}

      {/* Related Features */}
      <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Related Features</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Paper
              component={Link}
              href="/docs/features/action-bars"
              variant="outlined"
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#8b5cf6',
                  bgcolor: '#8b5cf608',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)',
                },
              }}
            >
              <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: '#8b5cf615' }}>
                <TouchAppIcon sx={{ color: '#8b5cf6' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Action Bars</Typography>
                <Typography variant="caption" color="text.secondary">Contextual action triggers</Typography>
              </Box>
              <ArrowForwardIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper
              component={Link}
              href="/docs/features/feedback"
              variant="outlined"
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#f59e0b',
                  bgcolor: '#f59e0b08',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)',
                },
              }}
            >
              <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: '#f59e0b15' }}>
                <FeedbackIcon sx={{ color: '#f59e0b' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Feedback</Typography>
                <Typography variant="caption" color="text.secondary">AI response feedback system</Typography>
              </Box>
              <ArrowForwardIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper
              component={Link}
              href="/docs/features/panels"
              variant="outlined"
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#06b6d4',
                  bgcolor: '#06b6d408',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(6, 182, 212, 0.15)',
                },
              }}
            >
              <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: '#06b6d415' }}>
                <ViewSidebarIcon sx={{ color: '#06b6d4' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Panels</Typography>
                <Typography variant="caption" color="text.secondary">Action result display areas</Typography>
              </Box>
              <ArrowForwardIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
