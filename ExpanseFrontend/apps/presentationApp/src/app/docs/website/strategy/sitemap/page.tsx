'use client';

import { 
  Typography, 
  Box, 
  Paper,
  Stack,
  Chip,
} from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArticleIcon from '@mui/icons-material/Article';
import Link from 'next/link';

// ============================================================================
// Types
// ============================================================================

interface SitemapNode {
  name: string;
  path: string;
  icon: React.ReactNode;
  priority: 'P0' | 'P1' | 'P2';
  children?: SitemapNode[];
  docLink: string;
}

// ============================================================================
// Data
// ============================================================================

const sitemap: SitemapNode[] = [
  {
    name: 'Homepage',
    path: '/',
    icon: <HomeIcon sx={{ fontSize: 18 }} />,
    priority: 'P0',
    docLink: '/docs/website/pages/homepage',
  },
  {
    name: 'Features',
    path: '/features',
    icon: <StarIcon sx={{ fontSize: 18 }} />,
    priority: 'P0',
    docLink: '/docs/website/pages/features',
    children: [
      { name: 'Feature A', path: '/features/a', icon: <ArticleIcon sx={{ fontSize: 16 }} />, priority: 'P2', docLink: '#' },
      { name: 'Feature B', path: '/features/b', icon: <ArticleIcon sx={{ fontSize: 16 }} />, priority: 'P2', docLink: '#' },
    ],
  },
  {
    name: 'Pricing',
    path: '/pricing',
    icon: <AttachMoneyIcon sx={{ fontSize: 18 }} />,
    priority: 'P0',
    docLink: '/docs/website/pages/pricing',
  },
  {
    name: 'About',
    path: '/about',
    icon: <InfoIcon sx={{ fontSize: 18 }} />,
    priority: 'P1',
    docLink: '/docs/website/pages/about',
    children: [
      { name: 'Team', path: '/about/team', icon: <ArticleIcon sx={{ fontSize: 16 }} />, priority: 'P2', docLink: '#' },
      { name: 'Careers', path: '/about/careers', icon: <ArticleIcon sx={{ fontSize: 16 }} />, priority: 'P2', docLink: '#' },
    ],
  },
  {
    name: 'Contact',
    path: '/contact',
    icon: <ContactMailIcon sx={{ fontSize: 18 }} />,
    priority: 'P1',
    docLink: '/docs/website/pages/contact',
  },
  {
    name: 'Demo',
    path: '/demo',
    icon: <PlayCircleIcon sx={{ fontSize: 18 }} />,
    priority: 'P0',
    docLink: '/docs/website/pages/demo',
  },
];

// ============================================================================
// Components
// ============================================================================

const priorityColors: Record<string, { bg: string; text: string }> = {
  'P0': { bg: '#fee2e2', text: '#dc2626' },
  'P1': { bg: '#fef3c7', text: '#d97706' },
  'P2': { bg: '#f1f5f9', text: '#64748b' },
};

function SitemapNode({ node, depth = 0 }: { node: SitemapNode; depth?: number }) {
  const style = priorityColors[node.priority];
  
  return (
    <Box sx={{ ml: depth * 4 }}>
      <Paper
        variant="outlined"
        component={Link}
        href={node.docLink}
        sx={{
          p: 1.5,
          mb: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          bgcolor: 'white',
          textDecoration: 'none',
          color: 'inherit',
          transition: 'all 0.15s ease',
          borderLeft: depth > 0 ? '2px solid #e2e8f0' : 'none',
          '&:hover': {
            borderColor: '#3b82f6',
            bgcolor: '#f8fafc',
          },
        }}
      >
        <Box sx={{ color: '#64748b' }}>{node.icon}</Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" fontWeight={600}>
            {node.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {node.path}
          </Typography>
        </Box>
        <Chip 
          label={node.priority} 
          size="small" 
          sx={{ 
            bgcolor: style.bg, 
            color: style.text,
            fontWeight: 600,
            fontSize: '0.65rem',
            height: 20,
          }} 
        />
      </Paper>
      
      {node.children?.map((child, index) => (
        <SitemapNode key={index} node={child} depth={depth + 1} />
      ))}
    </Box>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function SitemapPage() {
  const p0Count = sitemap.filter(n => n.priority === 'P0').length;
  const p1Count = sitemap.filter(n => n.priority === 'P1').length;
  const totalPages = sitemap.length + sitemap.reduce((acc, n) => acc + (n.children?.length || 0), 0);

  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <AccountTreeIcon sx={{ fontSize: 36, color: '#8b5cf6' }} />
          <Typography variant="h2" sx={{ fontWeight: 700 }}>
            Sitemap
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Visual representation of the website structure. Click any page to view its planning document.
        </Typography>
      </Box>

      {/* Stats */}
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 2, 
          mb: 4, 
          display: 'flex',
          gap: 4,
          bgcolor: '#f8fafc',
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} color="primary">{totalPages}</Typography>
          <Typography variant="caption" color="text.secondary">Total Pages</Typography>
        </Box>
        <Box>
          <Typography variant="h4" fontWeight={700} sx={{ color: '#dc2626' }}>{p0Count}</Typography>
          <Typography variant="caption" color="text.secondary">Priority 0</Typography>
        </Box>
        <Box>
          <Typography variant="h4" fontWeight={700} sx={{ color: '#d97706' }}>{p1Count}</Typography>
          <Typography variant="caption" color="text.secondary">Priority 1</Typography>
        </Box>
      </Paper>

      {/* Legend */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Chip label="P0" size="small" sx={{ bgcolor: '#fee2e2', color: '#dc2626', fontSize: '0.65rem', height: 20 }} />
          <Typography variant="caption" color="text.secondary">Must have for launch</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Chip label="P1" size="small" sx={{ bgcolor: '#fef3c7', color: '#d97706', fontSize: '0.65rem', height: 20 }} />
          <Typography variant="caption" color="text.secondary">Important, soon after</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Chip label="P2" size="small" sx={{ bgcolor: '#f1f5f9', color: '#64748b', fontSize: '0.65rem', height: 20 }} />
          <Typography variant="caption" color="text.secondary">Nice to have</Typography>
        </Stack>
      </Box>

      {/* Sitemap Tree */}
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Site Structure
        </Typography>
        
        <Stack spacing={0}>
          {sitemap.map((node, index) => (
            <SitemapNode key={index} node={node} />
          ))}
        </Stack>
      </Paper>

      {/* Navigation Flow Note */}
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 3, 
          mt: 3,
          bgcolor: '#eff6ff',
          borderColor: '#bfdbfe',
        }}
      >
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1, color: '#1e40af' }}>
          Navigation Flow
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Primary navigation: Homepage → Features → Pricing → Demo (CTA)<br />
          Secondary navigation: About, Contact, Blog<br />
          Footer: All pages + legal (Privacy, Terms)
        </Typography>
      </Paper>
    </>
  );
}
