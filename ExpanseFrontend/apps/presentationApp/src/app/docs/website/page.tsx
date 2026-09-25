'use client';

import { 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea, 
  Chip,
  Paper,
  LinearProgress,
  Stack,
  Divider,
} from '@mui/material';
import Link from 'next/link';
import LanguageIcon from '@mui/icons-material/Language';
import MapIcon from '@mui/icons-material/Map';
import ArticleIcon from '@mui/icons-material/Article';
import WidgetsIcon from '@mui/icons-material/Widgets';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

// ============================================================================
// Types
// ============================================================================

interface PageStatus {
  name: string;
  status: 'not-started' | 'planning' | 'draft' | 'review' | 'ready' | 'live';
  progress: number;
  href: string;
  icon: React.ReactNode;
  priority: 'P0' | 'P1' | 'P2';
}

// ============================================================================
// Data
// ============================================================================

const websitePages: PageStatus[] = [
  { name: 'Homepage', status: 'planning', progress: 20, href: '/docs/website/pages/homepage', icon: <HomeIcon />, priority: 'P0' },
  { name: 'Features', status: 'not-started', progress: 0, href: '/docs/website/pages/features', icon: <StarIcon />, priority: 'P0' },
  { name: 'Pricing', status: 'not-started', progress: 0, href: '/docs/website/pages/pricing', icon: <AttachMoneyIcon />, priority: 'P0' },
  { name: 'About', status: 'not-started', progress: 0, href: '/docs/website/pages/about', icon: <InfoIcon />, priority: 'P1' },
  { name: 'Contact', status: 'not-started', progress: 0, href: '/docs/website/pages/contact', icon: <ContactMailIcon />, priority: 'P1' },
  { name: 'Demo', status: 'not-started', progress: 0, href: '/docs/website/pages/demo', icon: <PlayCircleIcon />, priority: 'P0' },
];

const sections = [
  {
    title: 'Strategy',
    description: 'Website goals, sitemap, and conversion funnels',
    href: '/docs/website/strategy',
    icon: <MapIcon sx={{ fontSize: 32 }} />,
    status: 'in-progress',
  },
  {
    title: 'Pages',
    description: 'Individual page planning with content and design specs',
    href: '/docs/website/pages',
    icon: <ArticleIcon sx={{ fontSize: 32 }} />,
    status: 'in-progress',
  },
  {
    title: 'Components',
    description: 'Reusable website sections: heroes, CTAs, testimonials',
    href: '/docs/website/components',
    icon: <WidgetsIcon sx={{ fontSize: 32 }} />,
    status: 'placeholder',
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

function PageStatusCard({ page }: { page: PageStatus }) {
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
        sx={{ height: '100%', p: 2 }}
      >
        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ color: 'primary.main' }}>{page.icon}</Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {page.name}
              </Typography>
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
          
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
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
        </Stack>
      </CardActionArea>
    </Card>
  );
}

function OverallProgress() {
  const total = websitePages.length;
  const completed = websitePages.filter(p => p.status === 'live').length;
  const inProgress = websitePages.filter(p => ['planning', 'draft', 'review', 'ready'].includes(p.status)).length;
  const notStarted = websitePages.filter(p => p.status === 'not-started').length;
  
  const avgProgress = Math.round(websitePages.reduce((sum, p) => sum + p.progress, 0) / total);

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        mb: 4, 
        bgcolor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <TrendingUpIcon sx={{ color: '#3b82f6', fontSize: 28 }} />
        <Typography variant="h6" fontWeight={600}>
          Website Progress
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Overall Completion
            </Typography>
            <Typography variant="h4" fontWeight={700} color="primary">
              {avgProgress}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={avgProgress} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              bgcolor: '#e2e8f0',
            }}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Stack direction="row" spacing={3} divider={<Divider orientation="vertical" flexItem />}>
            <Box>
              <Typography variant="h5" fontWeight={700} color="#10b981">{completed}</Typography>
              <Typography variant="caption" color="text.secondary">Live</Typography>
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700} color="#3b82f6">{inProgress}</Typography>
              <Typography variant="caption" color="text.secondary">In Progress</Typography>
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700} color="#94a3b8">{notStarted}</Typography>
              <Typography variant="caption" color="text.secondary">Not Started</Typography>
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>{total}</Typography>
              <Typography variant="caption" color="text.secondary">Total Pages</Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function WebsitePage() {
  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <LanguageIcon sx={{ fontSize: 40, color: '#3b82f6' }} />
          <Typography variant="h2" sx={{ fontWeight: 700 }}>
            Website Planning
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Plan, design, and track the marketing website. Each page has its own planning document 
          with content specs, design mockups, SEO strategy, and implementation status.
        </Typography>
      </Box>

      {/* Overall Progress */}
      <OverallProgress />

      {/* Sections Grid */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Sections
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {sections.map((section) => (
          <Grid item xs={12} sm={6} md={4} key={section.title}>
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
                    <Box sx={{ color: 'primary.main' }}>
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

      {/* Page Status Grid */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Page Status
      </Typography>
      <Grid container spacing={2}>
        {websitePages.map((page) => (
          <Grid item xs={12} sm={6} md={4} key={page.name}>
            <PageStatusCard page={page} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
