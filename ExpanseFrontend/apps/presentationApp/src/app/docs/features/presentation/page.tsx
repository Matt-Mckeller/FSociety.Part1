import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Chip, Stack, Card, CardContent, Grid, Divider, Alert } from '@mui/material'
import Link from 'next/link'
import SlideshowIcon from '@mui/icons-material/Slideshow'
import PresentToAllIcon from '@mui/icons-material/PresentToAll'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import ViewListIcon from '@mui/icons-material/ViewList'
import ScreenShareIcon from '@mui/icons-material/ScreenShare'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PercentIcon from '@mui/icons-material/Percent'
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion'
import GroupsIcon from '@mui/icons-material/Groups'
import LinkIcon from '@mui/icons-material/Link'

const audienceTypes = [
  { type: 'Student', description: 'Learners / enrolled users', icon: '🎓' },
  { type: 'Teacher', description: 'Educators / instructors', icon: '👩‍🏫' },
  { type: 'Parent', description: 'Parents / guardians', icon: '👨‍👩‍👧' },
  { type: 'Administration', description: 'School / org administrators', icon: '🏛️' },
  { type: 'General Viewer', description: 'Public / general audience', icon: '👁️' },
  { type: 'Employee', description: 'Internal team members', icon: '💼' },
  { type: 'Applicant', description: 'Prospective users / applicants', icon: '📝' },
]

const coreFeatures = [
  { 
    icon: <ViewListIcon sx={{ color: '#3b82f6' }} />,
    title: 'Fixed Screen Position',
    description: 'Entire app maintains a static shell layout; only primary content scrolls optionally per slide',
  },
  { 
    icon: <CheckCircleIcon sx={{ color: '#22c55e' }} />,
    title: 'Progress Tracking',
    description: 'Slide-based checkmarks + percentage-based overall completion displayed in navigation',
  },
  { 
    icon: <AutoAwesomeMotionIcon sx={{ color: '#a855f7' }} />,
    title: 'Polished Transitions',
    description: 'Slides have animated transitions and optimized UX for smooth presentation flow',
  },
  { 
    icon: <GroupsIcon sx={{ color: '#f59e0b' }} />,
    title: 'Configurable Audiences',
    description: 'Slides can be targeted to specific audience types and included in multiple presentations',
  },
]

const relatedFeatures = [
  { label: 'Collaboration', href: '/docs/features/collaboration', description: 'WebSocket sync & screen sharing' },
  { label: 'Panels', href: '/docs/features/panels', description: 'Configurable panel system' },
  { label: 'Feedback', href: '/docs/features/feedback', description: 'User reactions & signals' },
  { label: 'Game UI', href: '/docs/features/game-ui', description: 'XP, coins, progress overlay' },
]

export default function PresentationFeaturePage() {
  return (
    <>
      {/* Header with Icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#3b82f615' }}>
          <SlideshowIcon sx={{ fontSize: 32, color: '#3b82f6' }} />
        </Box>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            Presentation System
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Fixed-shell layout with slide navigation, presenter/learner modes, and audience targeting
          </Typography>
        </Box>
      </Box>

      {/* Module & Architecture - Enhanced */}
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 2.5, 
          mb: 4, 
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          borderLeft: '4px solid #3b82f6',
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Module & Architecture
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Chip label="Slide Engine" size="small" sx={{ mr: 0.5, mb: 0.5, bgcolor: '#3b82f6', color: 'white' }} />
          <Chip label="Presenter Mode" size="small" sx={{ mr: 0.5, mb: 0.5, bgcolor: '#8b5cf6', color: 'white' }} />
        </Box>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          <strong>Assumed React Context:</strong>
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          <Chip label="PresentationContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', fontFamily: 'monospace' }} />
          <Chip label="SlideContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', fontFamily: 'monospace' }} />
          <Chip label="PresenterModeContext" size="small" variant="outlined" sx={{ fontSize: '0.7rem', fontFamily: 'monospace' }} />
        </Stack>
        <Typography variant="caption" color="warning.main" sx={{ mt: 1.5, display: 'block', fontStyle: 'italic' }}>
          Note: Context structure is assumed and may not be complete.
        </Typography>
      </Paper>

      {/* Core Features - Card Grid */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
        <span>🎯</span> Core Features
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {coreFeatures.map((feature) => (
          <Grid item xs={12} sm={6} key={feature.title}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ mt: 0.5 }}>{feature.icon}</Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
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

      <Divider sx={{ my: 4 }} />

      {/* Viewing Modes - Enhanced Cards */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
        <span>👁️</span> Viewing Modes
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card 
            variant="outlined" 
            sx={{ 
              height: '100%',
              borderColor: '#3b82f6',
              borderWidth: 2,
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: '#3b82f615' }}>
                  <PresentToAllIcon sx={{ color: '#3b82f6' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Presenter Mode</Typography>
                <Chip label="Primary" size="small" color="primary" />
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                Presenter controls slide progression for the audience in real time via WebSocket. 
                All audience views are synced to the presenter's current slide automatically.
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                <Chip label="Real-time sync" size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                <Chip label="Audience reactions" size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                <Chip label="Pacing control" size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: '#22c55e15' }}>
                  <SelfImprovementIcon sx={{ color: '#22c55e' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Self-Paced Learner Mode</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                User navigates freely at their own pace. The presenter chat appears as a passive 
                overlay, allowing independent exploration while staying connected.
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                <Chip label="Free navigation" size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                <Chip label="Chat overlay" size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                <Chip label="Personal notes" size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Audience Types */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
        <span>👥</span> Audience Types
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Content can be tailored for different audience types. Each slide can be targeted to one or more audiences.
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600, width: 60 }}></TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {audienceTypes.map((row) => (
              <TableRow key={row.type}>
                <TableCell sx={{ fontSize: '1.25rem', textAlign: 'center' }}>{row.icon}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{row.type}</TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 4 }} />

      {/* Slide Registry */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
        <span>📋</span> Slide Registry
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Slides exist in a reusable registry. Each slide can belong to multiple presentations and target specific audiences.
      </Typography>
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 2, 
          bgcolor: '#1e293b',
          borderRadius: 2,
          mb: 4,
        }}
      >
        <Typography 
          component="pre" 
          sx={{ 
            fontFamily: '"Fira Code", "JetBrains Mono", monospace', 
            fontSize: 13, 
            m: 0,
            color: '#e2e8f0',
          }}
        >
          {`{
  id: "slide-finance-overview",
  name: "Finance Overview",
  presentationIds: ["investor", "founders", "advisors"],
  audienceTypes: ["employee", "administration"],
  order: 3,
  unlockLevel: 2
}`}
        </Typography>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Related Features */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
        <LinkIcon /> Related Features
      </Typography>
      <Grid container spacing={2}>
        {relatedFeatures.map((feature) => (
          <Grid item xs={12} sm={6} md={3} key={feature.label}>
            <Card 
              variant="outlined" 
              component={Link}
              href={feature.href}
              sx={{ 
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: 'primary.main',
                  transform: 'translateY(-2px)',
                  boxShadow: 1,
                },
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  {feature.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
