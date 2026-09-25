'use client';

import { 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea,
  Paper,
  Chip,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
import MapIcon from '@mui/icons-material/Map';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import FlagIcon from '@mui/icons-material/Flag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// ============================================================================
// Data
// ============================================================================

const strategySubsections = [
  {
    title: 'Sitemap',
    description: 'Visual site structure and page hierarchy',
    href: '/docs/website/strategy/sitemap',
    icon: <AccountTreeIcon sx={{ fontSize: 32 }} />,
    status: 'in-progress',
  },
  {
    title: 'Conversion Goals',
    description: 'Funnels, CTAs, and success metrics',
    href: '/docs/website/strategy/conversion-goals',
    icon: <TrackChangesIcon sx={{ fontSize: 32 }} />,
    status: 'placeholder',
  },
];

const websiteGoals = [
  { goal: 'Clearly communicate product value proposition', complete: false },
  { goal: 'Drive demo requests and trial signups', complete: false },
  { goal: 'Establish trust and credibility', complete: false },
  { goal: 'Provide clear pricing and plan information', complete: false },
  { goal: 'Support SEO for key product terms', complete: false },
  { goal: 'Enable easy contact and support access', complete: false },
];

const keyMetrics = [
  { metric: 'Demo Request Rate', target: '3-5%', current: '-' },
  { metric: 'Time on Site', target: '> 2 min', current: '-' },
  { metric: 'Bounce Rate', target: '< 40%', current: '-' },
  { metric: 'Pages per Session', target: '> 3', current: '-' },
];

// ============================================================================
// Main Page
// ============================================================================

export default function StrategyPage() {
  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <MapIcon sx={{ fontSize: 36, color: '#6366f1' }} />
          <Typography variant="h2" sx={{ fontWeight: 700 }}>
            Website Strategy
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          High-level website goals, structure, and conversion strategy. Define what the website 
          needs to achieve and how success will be measured.
        </Typography>
      </Box>

      {/* Subsections */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {strategySubsections.map((section) => (
          <Grid item xs={12} sm={6} key={section.title}>
            <Card 
              variant="outlined" 
              sx={{ 
                height: '100%',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  transform: 'translateY(-2px)',
                  boxShadow: 2,
                },
              }}
            >
              <CardActionArea 
                component={Link} 
                href={section.href}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <CardContent sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                    <Box sx={{ color: '#6366f1' }}>
                      {section.icon}
                    </Box>
                    {section.status === 'placeholder' && (
                      <Chip 
                        label="Coming Soon" 
                        size="small" 
                        sx={{ 
                          bgcolor: '#fef3c7', 
                          color: '#92400e',
                          fontWeight: 500,
                          fontSize: '0.7rem',
                        }} 
                      />
                    )}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {section.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {section.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Website Goals */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <FlagIcon sx={{ color: '#10b981' }} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Website Goals
          </Typography>
        </Box>
        
        <Paper variant="outlined" sx={{ p: 2 }}>
          <List dense disablePadding>
            {websiteGoals.map((item, index) => (
              <ListItem key={index} disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {item.complete ? (
                    <CheckCircleIcon sx={{ color: '#10b981' }} />
                  ) : (
                    <RadioButtonUncheckedIcon sx={{ color: '#cbd5e1' }} />
                  )}
                </ListItemIcon>
                <ListItemText 
                  primary={item.goal}
                  primaryTypographyProps={{
                    color: item.complete ? 'text.secondary' : 'text.primary',
                    sx: item.complete ? { textDecoration: 'line-through' } : {},
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      {/* Key Metrics */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <TrendingUpIcon sx={{ color: '#3b82f6' }} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Key Metrics
          </Typography>
        </Box>
        
        <Grid container spacing={2}>
          {keyMetrics.map((item, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary" display="block">
                  {item.metric}
                </Typography>
                <Typography variant="h6" fontWeight={600} color="primary">
                  {item.target}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Target
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Quick Notes */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Strategy Notes
        </Typography>
        
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 3, 
            bgcolor: '#f8fafc',
            borderStyle: 'dashed',
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            Add strategic notes here: target audience insights, competitive positioning, 
            key differentiators, messaging pillars, brand voice guidelines, etc.
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Stack spacing={1}>
            <Typography variant="subtitle2" fontWeight={600}>
              Template sections to add:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Target Audience Summary (link to Marketing → Audiences)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Competitive Landscape
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Key Messaging Pillars
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Brand Voice & Tone
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • SEO Strategy Overview
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </>
  );
}
