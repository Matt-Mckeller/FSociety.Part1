'use client';

import { 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea,
  Chip,
  Stack,
  LinearProgress,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
} from '@mui/material';
import Link from 'next/link';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useState } from 'react';

// ============================================================================
// Types
// ============================================================================

interface WebsitePage {
  name: string;
  path: string;
  description: string;
  status: 'not-started' | 'planning' | 'draft' | 'review' | 'ready' | 'live';
  progress: number;
  href: string;
  icon: React.ReactNode;
  priority: 'P0' | 'P1' | 'P2';
  sections: string[];
  lastUpdated?: string;
}

// ============================================================================
// Data
// ============================================================================

const websitePages: WebsitePage[] = [
  { 
    name: 'Homepage', 
    path: '/',
    description: 'First impression, value proposition, and primary CTAs',
    status: 'planning', 
    progress: 20, 
    href: '/docs/website/pages/homepage', 
    icon: <HomeIcon sx={{ fontSize: 28 }} />, 
    priority: 'P0',
    sections: ['Hero', 'Features Overview', 'Social Proof', 'CTA'],
    lastUpdated: '2024-01-15',
  },
  { 
    name: 'Features', 
    path: '/features',
    description: 'Detailed feature breakdown with benefits and use cases',
    status: 'not-started', 
    progress: 0, 
    href: '/docs/website/pages/features', 
    icon: <StarIcon sx={{ fontSize: 28 }} />, 
    priority: 'P0',
    sections: ['Feature Grid', 'Feature Details', 'Integrations', 'CTA'],
  },
  { 
    name: 'Pricing', 
    path: '/pricing',
    description: 'Plans, pricing tiers, and plan comparison',
    status: 'not-started', 
    progress: 0, 
    href: '/docs/website/pages/pricing', 
    icon: <AttachMoneyIcon sx={{ fontSize: 28 }} />, 
    priority: 'P0',
    sections: ['Pricing Cards', 'Feature Comparison', 'FAQ', 'CTA'],
  },
  { 
    name: 'About', 
    path: '/about',
    description: 'Company story, mission, team, and values',
    status: 'not-started', 
    progress: 0, 
    href: '/docs/website/pages/about', 
    icon: <InfoIcon sx={{ fontSize: 28 }} />, 
    priority: 'P1',
    sections: ['Mission', 'Story', 'Team', 'Values'],
  },
  { 
    name: 'Contact', 
    path: '/contact',
    description: 'Contact form, support options, and office info',
    status: 'not-started', 
    progress: 0, 
    href: '/docs/website/pages/contact', 
    icon: <ContactMailIcon sx={{ fontSize: 28 }} />, 
    priority: 'P1',
    sections: ['Contact Form', 'Support Options', 'FAQ'],
  },
  { 
    name: 'Demo', 
    path: '/demo',
    description: 'Demo request form and product preview',
    status: 'not-started', 
    progress: 0, 
    href: '/docs/website/pages/demo', 
    icon: <PlayCircleIcon sx={{ fontSize: 28 }} />, 
    priority: 'P0',
    sections: ['Demo Form', 'Product Preview', 'Testimonials'],
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

const statusColors: Record<string, { bg: string; text: string }> = {
  'not-started': { bg: '#f1f5f9', text: '#64748b' },
  'planning': { bg: '#e0f2fe', text: '#0369a1' },
  'draft': { bg: '#fef3c7', text: '#92400e' },
  'review': { bg: '#ede9fe', text: '#6d28d9' },
  'ready': { bg: '#d1fae5', text: '#047857' },
  'live': { bg: '#dcfce7', text: '#15803d' },
};

const priorityColors: Record<string, string> = {
  'P0': '#ef4444',
  'P1': '#f59e0b',
  'P2': '#6b7280',
};

// ============================================================================
// Components
// ============================================================================

function PageCard({ page }: { page: WebsitePage }) {
  const statusStyle = statusColors[page.status] || statusColors['not-started'];
  
  return (
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
        href={page.href}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ color: 'primary.main' }}>{page.icon}</Box>
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {page.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {page.path}
                </Typography>
              </Box>
            </Box>
            <Chip 
              label={page.priority} 
              size="small" 
              sx={{ 
                bgcolor: priorityColors[page.priority], 
                color: 'white',
                fontWeight: 600,
                fontSize: '0.65rem',
                height: 20,
              }} 
            />
          </Box>
          
          {/* Description */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
            {page.description}
          </Typography>
          
          {/* Sections */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" fontWeight={600} display="block" sx={{ mb: 0.5 }}>
              Sections
            </Typography>
            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
              {page.sections.slice(0, 4).map((section, i) => (
                <Chip 
                  key={i} 
                  label={section} 
                  size="small" 
                  variant="outlined"
                  sx={{ fontSize: '0.65rem', height: 20 }} 
                />
              ))}
              {page.sections.length > 4 && (
                <Chip 
                  label={`+${page.sections.length - 4}`} 
                  size="small" 
                  sx={{ fontSize: '0.65rem', height: 20, bgcolor: '#f1f5f9' }} 
                />
              )}
            </Stack>
          </Box>
          
          {/* Progress */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Chip 
                label={page.status.replace('-', ' ')} 
                size="small" 
                sx={{ 
                  bgcolor: statusStyle.bg, 
                  color: statusStyle.text,
                  fontWeight: 500,
                  fontSize: '0.7rem',
                  textTransform: 'capitalize',
                }} 
              />
              <Typography variant="caption" color="text.secondary">
                {page.progress}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={page.progress} 
              sx={{ 
                height: 4, 
                borderRadius: 2,
                bgcolor: '#e2e8f0',
                '& .MuiLinearProgress-bar': {
                  bgcolor: page.progress === 100 ? '#10b981' : '#3b82f6',
                },
              }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function PagesIndexPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  const byPriority = {
    P0: websitePages.filter(p => p.priority === 'P0'),
    P1: websitePages.filter(p => p.priority === 'P1'),
    P2: websitePages.filter(p => p.priority === 'P2'),
  };

  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ArticleIcon sx={{ fontSize: 36, color: '#3b82f6' }} />
            <Typography variant="h2" sx={{ fontWeight: 700 }}>
              Website Pages
            </Typography>
          </Box>
          
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(_, v) => v && setView(v)}
            size="small"
          >
            <ToggleButton value="grid">
              <GridViewIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="list">
              <ViewListIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Individual planning documents for each website page. Define content, design, 
          SEO strategy, and track implementation progress.
        </Typography>
      </Box>

      {/* Priority 0 Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Chip label="P0" size="small" sx={{ bgcolor: '#ef4444', color: 'white', fontWeight: 600 }} />
          <Typography variant="h6" fontWeight={600}>
            Must Have for Launch
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ({byPriority.P0.length} pages)
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {byPriority.P0.map((page) => (
            <Grid item xs={12} sm={6} md={4} key={page.name}>
              <PageCard page={page} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Priority 1 Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Chip label="P1" size="small" sx={{ bgcolor: '#f59e0b', color: 'white', fontWeight: 600 }} />
          <Typography variant="h6" fontWeight={600}>
            Important - Soon After Launch
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ({byPriority.P1.length} pages)
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {byPriority.P1.map((page) => (
            <Grid item xs={12} sm={6} md={4} key={page.name}>
              <PageCard page={page} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Add New Page Note */}
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 3, 
          bgcolor: '#f8fafc',
          borderStyle: 'dashed',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Need to add a new page? Create a new folder in <code>/docs/website/pages/[page-name]/</code> 
          with a <code>page.tsx</code> following the existing template structure.
        </Typography>
      </Paper>
    </>
  );
}
