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
  Stack,
} from '@mui/material';
import Link from 'next/link';
import WidgetsIcon from '@mui/icons-material/Widgets';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import ArticleIcon from '@mui/icons-material/Article';

// ============================================================================
// Data
// ============================================================================

interface ComponentType {
  name: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  variants: number;
  usedIn: string[];
  status: 'documented' | 'planned' | 'placeholder';
}

const componentTypes: ComponentType[] = [
  {
    name: 'Hero Sections',
    description: 'Above-the-fold hero layouts with headlines, CTAs, and visuals',
    href: '/docs/website/components/hero',
    icon: <RocketLaunchIcon sx={{ fontSize: 28 }} />,
    variants: 4,
    usedIn: ['Homepage', 'Features', 'Demo'],
    status: 'planned',
  },
  {
    name: 'Feature Grids',
    description: 'Feature showcase layouts with icons, descriptions, and benefits',
    href: '/docs/website/components/features-grid',
    icon: <GridViewIcon sx={{ fontSize: 28 }} />,
    variants: 3,
    usedIn: ['Homepage', 'Features'],
    status: 'planned',
  },
  {
    name: 'Testimonials',
    description: 'Social proof sections with quotes, attribution, and logos',
    href: '/docs/website/components/testimonials',
    icon: <FormatQuoteIcon sx={{ fontSize: 28 }} />,
    variants: 3,
    usedIn: ['Homepage', 'Demo', 'Pricing'],
    status: 'planned',
  },
  {
    name: 'CTA Sections',
    description: 'Call-to-action blocks for conversion points',
    href: '/docs/website/components/cta',
    icon: <TouchAppIcon sx={{ fontSize: 28 }} />,
    variants: 3,
    usedIn: ['Homepage', 'Features', 'Pricing', 'Demo'],
    status: 'planned',
  },
  {
    name: 'Footer',
    description: 'Site footer with navigation, legal links, and social',
    href: '/docs/website/components/footer',
    icon: <ArticleIcon sx={{ fontSize: 28 }} />,
    variants: 2,
    usedIn: ['All pages'],
    status: 'planned',
  },
];

// ============================================================================
// Components
// ============================================================================

function ComponentCard({ component }: { component: ComponentType }) {
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
        href={component.href}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <CardContent sx={{ flex: 1 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ color: '#8b5cf6' }}>{component.icon}</Box>
            <Chip 
              label={`${component.variants} variants`} 
              size="small" 
              sx={{ bgcolor: '#f3e8ff', color: '#7c3aed', fontSize: '0.7rem' }} 
            />
          </Box>
          
          {/* Title & Description */}
          <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
            {component.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {component.description}
          </Typography>
          
          {/* Used In */}
          <Typography variant="caption" fontWeight={600} display="block" sx={{ mb: 0.5 }}>
            Used in:
          </Typography>
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            {component.usedIn.map((page, i) => (
              <Chip 
                key={i} 
                label={page} 
                size="small" 
                variant="outlined"
                sx={{ fontSize: '0.65rem', height: 20 }} 
              />
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function ComponentsIndexPage() {
  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <WidgetsIcon sx={{ fontSize: 36, color: '#8b5cf6' }} />
          <Typography variant="h2" sx={{ fontWeight: 700 }}>
            Website Components
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Reusable section components that make up website pages. Define variants, 
          content requirements, and design specifications for each component type.
        </Typography>
      </Box>

      {/* Info Box */}
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 2, 
          mb: 4, 
          bgcolor: '#faf5ff',
          borderColor: '#e9d5ff',
        }}
      >
        <Typography variant="subtitle2" fontWeight={600} sx={{ color: '#7c3aed', mb: 0.5 }}>
          Component-Based Design
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Each website page is composed of these reusable sections. Defining components separately 
          ensures consistency across pages and makes it easier to iterate on designs.
        </Typography>
      </Paper>

      {/* Components Grid */}
      <Grid container spacing={2}>
        {componentTypes.map((component) => (
          <Grid item xs={12} sm={6} md={4} key={component.name}>
            <ComponentCard component={component} />
          </Grid>
        ))}
      </Grid>

      {/* Add Component Note */}
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 3, 
          mt: 4,
          bgcolor: '#f8fafc',
          borderStyle: 'dashed',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Need a new component type? Create a folder in <code>/docs/website/components/[name]/</code> 
          and document the variants, content requirements, and design specs.
        </Typography>
      </Paper>
    </>
  );
}
