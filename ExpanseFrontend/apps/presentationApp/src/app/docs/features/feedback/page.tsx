import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, List, ListItem, ListItemText, Divider, Alert, Chip, Stack, Card, CardContent, Grid } from '@mui/material'
import CampaignIcon from '@mui/icons-material/Campaign'
import PersonIcon from '@mui/icons-material/Person'
import MovieIcon from '@mui/icons-material/Movie'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SettingsIcon from '@mui/icons-material/Settings'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import TouchAppIcon from '@mui/icons-material/TouchApp'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Link from 'next/link'

const understandingSignals = [
  { reaction: "I'm Confused", emoji: "😕", description: "Signals the user doesn't understand — can trigger AI assistance or flag for presenter" },
  { reaction: "Help Me Understand", emoji: "🙋", description: "Requests additional explanation or alternative framing" },
  { reaction: "I Get It", emoji: "✅", description: "Confirms comprehension — positive signal to move forward" },
  { reaction: "Slow Down", emoji: "🐢", description: "Requests the presenter or content to pace slower" },
  { reaction: "Speed Up", emoji: "🚀", description: "Signals the user is ready for more" },
]

const engagementReactions = [
  { reaction: "I Like It", emoji: "👍", description: "Positive sentiment signal" },
  { reaction: "Great", emoji: "🌟", description: "Strong positive signal" },
  { reaction: "Thumbs Up / Down", emoji: "👍👎", description: "Binary feedback" },
  { reaction: "Emoji React", emoji: "😊", description: "Expressive emoji reactions (configurable set)" },
  { reaction: "Agree / Disagree", emoji: "✓✗", description: "Opinion signal on the current content" },
  { reaction: "Share", emoji: "📤", description: "Share the current content or slide" },
]

const visualAnimations = [
  { animation: 'Coin Gain', emoji: '🪙', trigger: 'Earning coins from interactions, quiz completion, slide progression', purpose: 'Reward reinforcement' },
  { animation: 'XP Gain', emoji: '⭐', trigger: 'Experience point increase', purpose: 'Progress acknowledgment' },
  { animation: 'Level Up', emoji: '🎉', trigger: 'Reaching new level', purpose: 'Milestone celebration' },
  { animation: 'Achievement Unlock', emoji: '🏆', trigger: 'Completing achievements', purpose: 'Accomplishment recognition' },
  { animation: 'Quest Complete', emoji: '✨', trigger: 'Finishing a quest', purpose: 'Goal completion celebration' },
  { animation: 'Streak Animation', emoji: '🔥', trigger: 'Maintaining consecutive learning sessions', purpose: 'Habit reinforcement' },
  { animation: 'Progress Bar Fill', emoji: '📊', trigger: 'Completing slides/sections', purpose: 'Forward momentum visualization' },
]

const audioFeedback = [
  { type: 'Reward Sounds', emoji: '🎵', examples: 'Coin collect, XP gain, level up fanfare', purpose: 'Reinforce positive actions' },
  { type: 'Completion Sounds', emoji: '🔔', examples: 'Quiz pass, achievement unlock, quest complete', purpose: 'Celebrate milestones' },
  { type: 'Transition Sounds', emoji: '🔊', examples: 'Slide change, section complete, panel toggle', purpose: 'Spatial awareness' },
  { type: 'Feedback Sounds', emoji: '✔️', examples: 'Correct answer, wrong answer, typing confirms', purpose: 'Immediate action response' },
  { type: 'Ambient/Focus Sounds', emoji: '🎧', examples: 'Optional background audio for concentration (future)', purpose: 'Learning environment' },
]

const learningSuggestions = [
  { type: 'Content Recommendations', emoji: '📚', description: '"Based on your quiz results, consider reviewing Section X"' },
  { type: 'Pacing Suggestions', emoji: '⏱️', description: '"You\'re moving quickly — take time to absorb this concept"' },
  { type: 'Learning Style Hints', emoji: '🎨', description: '"Try the \'Visualize\' action — visual learners often benefit from diagrams"' },
  { type: 'Comprehension Checks', emoji: '🤔', description: '"Before moving on, can you explain this in your own words?"' },
  { type: 'Alternative Approaches', emoji: '🔄', description: '"Struggling with this? Try the storytelling transform"' },
  { type: 'Resource Links', emoji: '🔗', description: '"Here\'s additional reading on this topic"' },
]

const wellnessSuggestions = [
  { type: 'Brain Break', emoji: '🧠', description: '"You\'ve been focused for 25 minutes — take a 5-minute break"' },
  { type: 'Stretch Reminder', emoji: '🤸', description: '"Time to stretch! Here\'s a quick 2-minute routine"' },
  { type: 'Movement Prompt', emoji: '🚶', description: '"Stand up and walk around for a moment"' },
  { type: 'Hydration Reminder', emoji: '💧', description: '"Don\'t forget to drink water"' },
  { type: 'Eye Rest', emoji: '👁️', description: '"Look away from the screen — focus on something 20 feet away for 20 seconds" (20-20-20 rule)' },
  { type: 'Breathing Exercise', emoji: '🌬️', description: '"Try a quick breathing exercise to reset focus"' },
  { type: 'Posture Check', emoji: '🪑', description: '"Check your posture — shoulders back, screen at eye level"' },
  { type: 'Energy Management', emoji: '⚡', description: '"Your focus may be dropping — consider a short walk or snack"' },
]

const processSuggestions = [
  { type: 'Pomodoro Prompt', emoji: '🍅', description: '"Try working in 25-minute focused blocks with 5-minute breaks"' },
  { type: 'Note-Taking Hint', emoji: '📝', description: '"Consider summarizing this section in your own notes"' },
  { type: 'Review Schedule', emoji: '📅', description: '"Schedule a review of this material tomorrow for better retention"' },
  { type: 'Active vs. Passive', emoji: '⚡', description: '"You\'ve been reading passively — try the Quiz Me action"' },
  { type: 'Environment Tip', emoji: '🎯', description: '"Minimize distractions — consider closing other tabs"' },
  { type: 'Time Boxing', emoji: '⏰', description: '"Set a timer for this section — aim for 15 minutes"' },
  { type: 'Interleaving Suggestion', emoji: '🔀', description: '"Mix up topics — switching between subjects can improve retention"' },
]

const goalFeedback = [
  { type: 'Goal Progress', emoji: '📈', description: '"This section advances your goal: [Goal Name] — 40% complete"' },
  { type: 'Goal Connection', emoji: '🔗', description: '"Why this matters: This skill directly supports your goal of X"' },
  { type: 'Milestone Tracking', emoji: '🏁', description: '"You\'ve completed 3 of 5 milestones toward [Goal]"' },
  { type: 'Pacing Toward Goals', emoji: '🎯', description: '"At this pace, you\'ll reach your goal by [Date]"' },
  { type: 'Goal Deviation Alerts', emoji: '⚠️', description: '"You\'ve been exploring tangent topics — want to refocus on [Goal]?"' },
  { type: 'Celebration & Reflection', emoji: '🎊', description: '"Goal achieved! Here\'s what you learned along the way"' },
]

const errorFeedback = [
  { type: 'Error Detected', emoji: '❌', description: '"That response contains an error — here\'s what to check"' },
  { type: 'Misconception Alert', emoji: '💡', description: '"Common misconception detected — here\'s the accurate understanding"' },
  { type: 'Inaccuracy Flag', emoji: '🚩', description: '"This information may be inaccurate — verify with sources"' },
  { type: 'Logic Gap', emoji: '🧩', description: '"There\'s a gap in the reasoning — consider this step"' },
  { type: 'Correction Suggestion', emoji: '✏️', description: '"Here\'s the corrected version with explanation"' },
  { type: 'Pattern of Errors', emoji: '🔍', description: '"You\'ve made similar errors before — let\'s address the root cause"' },
]

// Styled table header cell
const StyledHeaderCell = ({ children, bgcolor = '#ec4899' }: { children: React.ReactNode; bgcolor?: string }) => (
  <TableCell sx={{ bgcolor, color: 'white', fontWeight: 600, fontSize: '0.85rem' }}>
    {children}
  </TableCell>
)

// Styled table row with hover
const StyledTableRow = ({ children }: { children: React.ReactNode }) => (
  <TableRow sx={{ '&:hover': { bgcolor: '#fdf2f8' }, transition: 'background-color 0.2s' }}>
    {children}
  </TableRow>
)

// Section header component
const SectionHeader = ({ icon, title, subtitle, color = '#ec4899' }: { icon: React.ReactNode; title: string; subtitle?: string; color?: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, mt: 4 }}>
    <Box sx={{ 
      p: 1, 
      borderRadius: 2, 
      bgcolor: `${color}15`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, color }}>{title}</Typography>
      {subtitle && <Typography variant="body2" color="text.secondary">{subtitle}</Typography>}
    </Box>
  </Box>
)

// Subsection header
const SubsectionHeader = ({ emoji, title }: { emoji: string; title: string }) => (
  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, mt: 2 }}>
    <span style={{ fontSize: '1.2rem' }}>{emoji}</span> {title}
  </Typography>
)

export default function FeedbackFeaturePage() {
  return (
    <>
      {/* Page Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{ 
          p: 1.5, 
          borderRadius: 2, 
          bgcolor: '#ec489915',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <CampaignIcon sx={{ fontSize: 32, color: '#ec4899' }} />
        </Box>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>Feedback System</Typography>
          <Typography variant="body1" color="text.secondary">
            Two-way feedback: user signals and system reinforcement
          </Typography>
        </Box>
      </Box>

      {/* Module & Architecture */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 2.5, 
          mb: 4, 
          background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
          borderLeft: '4px solid #ec4899',
          borderRadius: 2
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, color: '#be185d' }}>
          📦 Module & Architecture
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Chip 
            label="Analytics" 
            size="small" 
            sx={{ 
              mr: 0.5, 
              mb: 0.5, 
              bgcolor: '#ec4899', 
              color: 'white',
              fontWeight: 600,
              '&:hover': { bgcolor: '#db2777' }
            }} 
          />
          <Chip 
            label="Game System" 
            size="small" 
            sx={{ 
              mr: 0.5, 
              mb: 0.5, 
              bgcolor: '#ec4899', 
              color: 'white',
              fontWeight: 600,
              '&:hover': { bgcolor: '#db2777' }
            }} 
          />
          <Chip 
            label="Presenter Mode" 
            size="small" 
            sx={{ 
              mr: 0.5, 
              mb: 0.5, 
              bgcolor: '#ec4899', 
              color: 'white',
              fontWeight: 600,
              '&:hover': { bgcolor: '#db2777' }
            }} 
          />
        </Box>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1, fontWeight: 600 }}>
          Assumed React Context:
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          <Chip label="FeedbackContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', borderColor: '#ec4899', color: '#be185d' }} />
          <Chip label="NotificationContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', borderColor: '#ec4899', color: '#be185d' }} />
          <Chip label="AudioFeedbackContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', borderColor: '#ec4899', color: '#be185d' }} />
          <Chip label="WellnessContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', borderColor: '#ec4899', color: '#be185d' }} />
        </Stack>
        <Typography variant="caption" sx={{ mt: 1.5, display: 'block', fontStyle: 'italic', color: '#9d174d' }}>
          ⚠️ Note: Context structure is assumed and may not be complete.
        </Typography>
      </Paper>

      {/* Overview Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', borderTop: '3px solid #3b82f6' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <PersonIcon sx={{ color: '#3b82f6' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>User → System</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Signals and input from learners including quick reactions, detailed feedback, and comprehension indicators
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', borderTop: '3px solid #10b981' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <SmartToyIcon sx={{ color: '#10b981' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>System → User</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Reinforcement and guidance including visual animations, audio feedback, suggestions, and error detection
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ===== User Input Feedback Section ===== */}
      <SectionHeader 
        icon={<PersonIcon sx={{ fontSize: 28, color: '#3b82f6' }} />}
        title="User → System Feedback"
        subtitle="Feedback that users provide to signal understanding, satisfaction, and improvement suggestions"
        color="#3b82f6"
      />

      {/* Quick Reactions Card */}
      <Card variant="outlined" sx={{ mb: 3, borderColor: '#e2e8f0' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <TouchAppIcon sx={{ color: '#8b5cf6' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Quick Reactions (Social Bar)</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" paragraph>
            Quick-reaction feedback options that let users signal their understanding and engagement in real time.
            These appear on the Social Bar and can also surface as floating reactions during presenter mode.
          </Typography>

          <SubsectionHeader emoji="🧠" title="Understanding Signals" />
          <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <StyledHeaderCell bgcolor="#8b5cf6">Reaction</StyledHeaderCell>
                  <StyledHeaderCell bgcolor="#8b5cf6">Description</StyledHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {understandingSignals.map((row) => (
                  <StyledTableRow key={row.reaction}>
                    <TableCell>
                      <Chip 
                        label={`${row.emoji} ${row.reaction}`} 
                        size="small" 
                        sx={{ fontWeight: 600, bgcolor: '#f3e8ff', color: '#7c3aed' }}
                      />
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <SubsectionHeader emoji="💬" title="Engagement Reactions" />
          <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <StyledHeaderCell bgcolor="#8b5cf6">Reaction</StyledHeaderCell>
                  <StyledHeaderCell bgcolor="#8b5cf6">Description</StyledHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {engagementReactions.map((row) => (
                  <StyledTableRow key={row.reaction}>
                    <TableCell>
                      <Chip 
                        label={`${row.emoji} ${row.reaction}`} 
                        size="small" 
                        sx={{ fontWeight: 600, bgcolor: '#f3e8ff', color: '#7c3aed' }}
                      />
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Alert severity="info" sx={{ mb: 3, bgcolor: '#eff6ff', '& .MuiAlert-icon': { color: '#3b82f6' } }}>
        In <strong>Presenter Mode</strong>, aggregated audience reactions can be displayed to the presenter in real time
        (e.g., "73% say I Get It, 12% say I'm Confused").
      </Alert>

      {/* Detailed Feedback Card */}
      <Card variant="outlined" sx={{ mb: 3, borderColor: '#e2e8f0' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <ChatBubbleOutlineIcon sx={{ color: '#0ea5e9' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Detailed Feedback (ContentFeedbackPanel)</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" paragraph>
            Longer-form feedback submitted through a dedicated panel:
          </Typography>
          <Grid container spacing={2}>
            {[
              { primary: "Text Input", secondary: "Free-form feedback text", emoji: "📝" },
              { primary: "Star/Emoji Rating", secondary: "Quantified satisfaction rating", emoji: "⭐" },
              { primary: "Category Tags", secondary: "Pre-defined categories (Confusing, Great, Needs Work, Outdated, etc.)", emoji: "🏷️" },
              { primary: "Slide/Block Reference", secondary: "Automatically captures which content the feedback applies to", emoji: "📍" },
            ].map((item) => (
              <Grid item xs={12} sm={6} key={item.primary}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, p: 1.5, bgcolor: '#f8fafc', borderRadius: 1 }}>
                  <Typography sx={{ fontSize: '1.2rem' }}>{item.emoji}</Typography>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{item.primary}</Typography>
                    <Typography variant="caption" color="text.secondary">{item.secondary}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* AI-Prompted Feedback Card */}
      <Card variant="outlined" sx={{ mb: 3, borderColor: '#e2e8f0' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <SmartToyIcon sx={{ color: '#f59e0b' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>AI-Prompted Feedback Requests</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" paragraph>
            AI can request structured feedback from users after key moments:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {[
              "Post-quiz completion",
              "After milestone achievements", 
              "On session end",
              "After specific content blocks flagged for feedback collection"
            ].map((item) => (
              <Chip 
                key={item}
                label={item}
                size="small"
                sx={{ bgcolor: '#fef3c7', color: '#92400e', fontWeight: 500 }}
              />
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Divider sx={{ my: 5, borderStyle: 'dashed' }} />

      {/* ===== System → User Feedback Section ===== */}
      <SectionHeader 
        icon={<SmartToyIcon sx={{ fontSize: 28, color: '#10b981' }} />}
        title="System → User Feedback"
        subtitle="Feedback the system provides to users to reinforce learning, increase engagement, and guide toward goals"
        color="#10b981"
      />

      {/* Visual Animation Feedback */}
      <Card variant="outlined" sx={{ mb: 3, borderColor: '#e2e8f0' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <MovieIcon sx={{ color: '#ec4899' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>🎮 Visual Animation Feedback</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" paragraph>
            Animations that provide immediate visual reinforcement:
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <StyledHeaderCell>Animation</StyledHeaderCell>
                  <StyledHeaderCell>Trigger</StyledHeaderCell>
                  <StyledHeaderCell>Purpose</StyledHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visualAnimations.map((row) => (
                  <StyledTableRow key={row.animation}>
                    <TableCell>
                      <Chip 
                        label={`${row.emoji} ${row.animation}`} 
                        size="small" 
                        sx={{ fontWeight: 600, bgcolor: '#fce7f3', color: '#be185d' }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.85rem' }}>{row.trigger}</TableCell>
                    <TableCell>
                      <Chip label={row.purpose} size="small" variant="outlined" sx={{ fontSize: '0.75rem' }} />
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Audio Feedback */}
      <Card variant="outlined" sx={{ mb: 3, borderColor: '#e2e8f0' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <VolumeUpIcon sx={{ color: '#6366f1' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>🔊 Audio Feedback</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" paragraph>
            Sound effects and audio cues that enhance the learning experience:
          </Typography>
          <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <StyledHeaderCell bgcolor="#6366f1">Audio Type</StyledHeaderCell>
                  <StyledHeaderCell bgcolor="#6366f1">Examples</StyledHeaderCell>
                  <StyledHeaderCell bgcolor="#6366f1">Purpose</StyledHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {audioFeedback.map((row) => (
                  <StyledTableRow key={row.type}>
                    <TableCell>
                      <Chip 
                        label={`${row.emoji} ${row.type}`} 
                        size="small" 
                        sx={{ fontWeight: 600, bgcolor: '#eef2ff', color: '#4338ca' }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.85rem' }}>{row.examples}</TableCell>
                    <TableCell>
                      <Chip label={row.purpose} size="small" variant="outlined" sx={{ fontSize: '0.75rem' }} />
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Alert severity="warning" sx={{ bgcolor: '#fffbeb', '& .MuiAlert-icon': { color: '#f59e0b' } }}>
            <strong>User Preference:</strong> Audio feedback can be muted or volume-adjusted via user settings.
          </Alert>
        </CardContent>
      </Card>

      {/* Learning Suggestions */}
      <Card variant="outlined" sx={{ mb: 3, borderColor: '#e2e8f0' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <LightbulbIcon sx={{ color: '#eab308' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>💡 Learning Suggestions (AI-Written)</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" paragraph>
            Written feedback and suggestions from the AI to improve learning outcomes:
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <StyledHeaderCell bgcolor="#eab308">Suggestion Type</StyledHeaderCell>
                  <StyledHeaderCell bgcolor="#eab308">Description</StyledHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {learningSuggestions.map((row) => (
                  <StyledTableRow key={row.type}>
                    <TableCell>
                      <Chip 
                        label={`${row.emoji} ${row.type}`} 
                        size="small" 
                        sx={{ fontWeight: 600, bgcolor: '#fef9c3', color: '#854d0e' }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#64748b' }}>{row.description}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Wellness & Process Suggestions */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ height: '100%', borderColor: '#e2e8f0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <FavoriteIcon sx={{ color: '#ef4444' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>❤️ Wellness Suggestions</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                Suggestions focused on physical and mental well-being:
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <StyledHeaderCell bgcolor="#ef4444">Type</StyledHeaderCell>
                      <StyledHeaderCell bgcolor="#ef4444">Description</StyledHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {wellnessSuggestions.map((row) => (
                      <StyledTableRow key={row.type}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <span>{row.emoji}</span>
                            <Typography variant="caption" sx={{ fontWeight: 600 }}>{row.type}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', fontStyle: 'italic', color: '#64748b' }}>{row.description}</TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ height: '100%', borderColor: '#e2e8f0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <SettingsIcon sx={{ color: '#0891b2' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>⚙️ Process & Method Suggestions</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                Suggestions for improving learning process and study habits:
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <StyledHeaderCell bgcolor="#0891b2">Type</StyledHeaderCell>
                      <StyledHeaderCell bgcolor="#0891b2">Description</StyledHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {processSuggestions.map((row) => (
                      <StyledTableRow key={row.type}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <span>{row.emoji}</span>
                            <Typography variant="caption" sx={{ fontWeight: 600 }}>{row.type}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', fontStyle: 'italic', color: '#64748b' }}>{row.description}</TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Goal-Oriented Feedback */}
      <Card variant="outlined" sx={{ mb: 3, borderColor: '#e2e8f0' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <TrackChangesIcon sx={{ color: '#22c55e' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>🎯 Goal-Oriented Feedback</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" paragraph>
            Feedback that connects learning to the user's stated goals and tracks progress:
          </Typography>
          <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <StyledHeaderCell bgcolor="#22c55e">Feedback Type</StyledHeaderCell>
                  <StyledHeaderCell bgcolor="#22c55e">Description</StyledHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {goalFeedback.map((row) => (
                  <StyledTableRow key={row.type}>
                    <TableCell>
                      <Chip 
                        label={`${row.emoji} ${row.type}`} 
                        size="small" 
                        sx={{ fontWeight: 600, bgcolor: '#dcfce7', color: '#166534' }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#64748b' }}>{row.description}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Alert severity="info" sx={{ bgcolor: '#eff6ff', '& .MuiAlert-icon': { color: '#3b82f6' } }}>
            <strong>Integration:</strong> Goal-oriented feedback connects to the Engagement Pipelines
            (Goal Association, Progress Narrative) defined in the Learning Features.
          </Alert>
        </CardContent>
      </Card>

      {/* Error Detection Feedback */}
      <Card variant="outlined" sx={{ mb: 4, borderColor: '#e2e8f0' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <ErrorOutlineIcon sx={{ color: '#dc2626' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>⚠️ Error Detection Feedback</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" paragraph>
            Feedback surfaced when the system detects potential errors, misconceptions, or inaccuracies:
          </Typography>
          <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <StyledHeaderCell bgcolor="#dc2626">Feedback Type</StyledHeaderCell>
                  <StyledHeaderCell bgcolor="#dc2626">Description</StyledHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {errorFeedback.map((row) => (
                  <StyledTableRow key={row.type}>
                    <TableCell>
                      <Chip 
                        label={`${row.emoji} ${row.type}`} 
                        size="small" 
                        sx={{ fontWeight: 600, bgcolor: '#fee2e2', color: '#991b1b' }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#64748b' }}>{row.description}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Alert severity="warning" sx={{ bgcolor: '#fffbeb', '& .MuiAlert-icon': { color: '#f59e0b' } }}>
            <strong>Teacher/Presenter View:</strong> Aggregated error detection helps instructors identify
            common misconceptions across the class.
          </Alert>
        </CardContent>
      </Card>

      {/* Related Features */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          bgcolor: '#f8fafc', 
          borderRadius: 2,
          border: '1px solid #e2e8f0'
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <ArrowForwardIcon sx={{ color: '#64748b' }} />
          Related Features
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Link href="/docs/features/action-bars" style={{ textDecoration: 'none' }}>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': { 
                    borderColor: '#ec4899',
                    bgcolor: '#fdf2f8',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b' }}>Action Bars</Typography>
                <Typography variant="caption" color="text.secondary">Quick actions & reactions</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link href="/docs/features/collaboration" style={{ textDecoration: 'none' }}>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': { 
                    borderColor: '#ec4899',
                    bgcolor: '#fdf2f8',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b' }}>Collaboration</Typography>
                <Typography variant="caption" color="text.secondary">Real-time feedback sharing</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link href="/docs/features/game-ui" style={{ textDecoration: 'none' }}>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': { 
                    borderColor: '#ec4899',
                    bgcolor: '#fdf2f8',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b' }}>Game UI</Typography>
                <Typography variant="caption" color="text.secondary">Visual reward systems</Typography>
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}
