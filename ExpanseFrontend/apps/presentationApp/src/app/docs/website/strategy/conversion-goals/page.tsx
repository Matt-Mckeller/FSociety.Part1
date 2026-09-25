'use client';

import { 
  Typography, 
  Box, 
  Paper,
  Grid,
  Stack,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// ============================================================================
// Data
// ============================================================================

const funnelStages = [
  {
    stage: 'Awareness',
    goal: 'Discover the product exists',
    pages: ['Homepage', 'Blog', 'Landing pages'],
    metrics: ['Unique visitors', 'Traffic sources'],
    color: '#3b82f6',
  },
  {
    stage: 'Interest',
    goal: 'Understand what it does',
    pages: ['Features', 'Use cases'],
    metrics: ['Time on page', 'Scroll depth'],
    color: '#8b5cf6',
  },
  {
    stage: 'Consideration',
    goal: 'Evaluate fit and pricing',
    pages: ['Pricing', 'Comparisons', 'Case studies'],
    metrics: ['Pricing page views', 'Plan toggles'],
    color: '#ec4899',
  },
  {
    stage: 'Intent',
    goal: 'Ready to try/buy',
    pages: ['Demo', 'Contact'],
    metrics: ['Demo requests', 'Form starts'],
    color: '#f59e0b',
  },
  {
    stage: 'Conversion',
    goal: 'Become a customer',
    pages: ['Signup', 'Thank you'],
    metrics: ['Trial signups', 'Conversion rate'],
    color: '#10b981',
  },
];

const primaryCTAs = [
  { cta: 'Request Demo', location: 'Header, Homepage hero, Features', target: 'Demo page form', priority: 'Primary' },
  { cta: 'Start Free Trial', location: 'Pricing page, Homepage', target: 'Signup flow', priority: 'Primary' },
  { cta: 'Contact Sales', location: 'Pricing enterprise, Contact', target: 'Contact form', priority: 'Secondary' },
  { cta: 'Learn More', location: 'Homepage sections', target: 'Features page', priority: 'Tertiary' },
];

const conversionGoals = [
  { goal: 'Demo Requests', description: 'Completed demo request form submissions', target: '50/month', tracking: 'Form submission event' },
  { goal: 'Trial Signups', description: 'New trial account registrations', target: '100/month', tracking: 'Account creation event' },
  { goal: 'Contact Form', description: 'Contact/sales inquiry submissions', target: '30/month', tracking: 'Form submission event' },
  { goal: 'Newsletter Signup', description: 'Email list subscriptions', target: '200/month', tracking: 'Email capture event' },
];

// ============================================================================
// Components
// ============================================================================

function FunnelStage({ stage, isLast }: { stage: typeof funnelStages[0]; isLast: boolean }) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          borderColor: stage.color,
          borderWidth: 2,
          bgcolor: `${stage.color}08`,
        }}
      >
        <Typography variant="subtitle1" fontWeight={700} sx={{ color: stage.color }}>
          {stage.stage}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {stage.goal}
        </Typography>
        
        <Box sx={{ mb: 1 }}>
          <Typography variant="caption" fontWeight={600} display="block" sx={{ mb: 0.5 }}>
            Pages
          </Typography>
          <Stack direction="row" spacing={0.5} flexWrap="wrap" justifyContent="center" useFlexGap>
            {stage.pages.map((page, i) => (
              <Chip key={i} label={page} size="small" sx={{ fontSize: '0.65rem', height: 20 }} />
            ))}
          </Stack>
        </Box>
        
        <Typography variant="caption" color="text.secondary">
          Track: {stage.metrics.join(', ')}
        </Typography>
      </Paper>
      
      {!isLast && (
        <ArrowDownwardIcon sx={{ color: '#cbd5e1', my: 1 }} />
      )}
    </Box>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function ConversionGoalsPage() {
  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <TrackChangesIcon sx={{ fontSize: 36, color: '#f59e0b' }} />
          <Typography variant="h2" sx={{ fontWeight: 700 }}>
            Conversion Goals
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Define what success looks like. Track visitor journeys from awareness to conversion
          with clear metrics and goals per funnel stage.
        </Typography>
      </Box>

      {/* Conversion Funnel */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
        Conversion Funnel
      </Typography>
      <Paper variant="outlined" sx={{ p: 3, mb: 4, bgcolor: '#fafafa' }}>
        <Grid container spacing={2}>
          {funnelStages.map((stage, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={stage.stage}>
              <FunnelStage stage={stage} isLast={index === funnelStages.length - 1} />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Primary CTAs */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
        Call-to-Actions
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f8fafc' }}>
              <TableCell sx={{ fontWeight: 600 }}>CTA</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Target</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {primaryCTAs.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>{row.cta}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{row.location}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{row.target}</Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={row.priority} 
                    size="small" 
                    sx={{ 
                      bgcolor: row.priority === 'Primary' ? '#dbeafe' : row.priority === 'Secondary' ? '#e0e7ff' : '#f1f5f9',
                      color: row.priority === 'Primary' ? '#1d4ed8' : row.priority === 'Secondary' ? '#4338ca' : '#64748b',
                      fontSize: '0.7rem',
                    }} 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Conversion Goal Targets */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <EmojiEventsIcon sx={{ color: '#f59e0b' }} />
        <Typography variant="h5" fontWeight={600}>
          Goal Targets
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {conversionGoals.map((goal, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {goal.goal}
                </Typography>
                <Chip 
                  label={goal.target} 
                  size="small" 
                  sx={{ bgcolor: '#dcfce7', color: '#15803d', fontWeight: 600 }} 
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {goal.description}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                <strong>Tracking:</strong> {goal.tracking}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Analytics Setup Note */}
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 3, 
          mt: 4,
          bgcolor: '#f8fafc',
          borderStyle: 'dashed',
        }}
      >
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
          Analytics Implementation Notes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Document which analytics tools will be used (Google Analytics, Mixpanel, etc.), 
          event naming conventions, and any required tracking pixels or scripts.
        </Typography>
      </Paper>
    </>
  );
}
