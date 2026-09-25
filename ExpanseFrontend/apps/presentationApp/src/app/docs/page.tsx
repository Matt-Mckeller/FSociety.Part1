import { Box, Typography, Container, Grid, Card, CardContent, CardActionArea, Paper, Chip } from '@mui/material';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExtensionIcon from '@mui/icons-material/Extension';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import WidgetsIcon from '@mui/icons-material/Widgets';

const sections = [
  { title: 'Overview', href: '/docs/overview', description: 'Project overview, goals, and design principles', icon: HomeIcon, color: '#1565c0' },
  { title: 'Architecture', href: '/docs/architecture', description: 'Technology stack, AI strategy, content system', icon: ArchitectureIcon, color: '#7c4dff' },
  { title: 'Data Models', href: '/docs/data-models', description: 'Entity definitions and relationships', icon: StorageIcon, color: '#00897b' },
  { title: 'Implementation', href: '/docs/implementation', description: '8-phase build plan', icon: BuildIcon, color: '#f57c00' },
  { title: 'Layout', href: '/docs/layout', description: 'Fixed shell UI regions', icon: DashboardIcon, color: '#c62828' },
  { title: 'Features', href: '/docs/features', description: '15 feature modules documented', icon: ExtensionIcon, color: '#6a1b9a' },
  { title: 'Analytics', href: '/docs/analytics', description: 'User telemetry and learning analytics', icon: AnalyticsIcon, color: '#0277bd' },
  { title: 'Components', href: '/docs/components', description: 'New + existing Storybook components', icon: WidgetsIcon, color: '#388e3c' },
];

export default function DocsIndex() {
  return (
    <>
      {/* Hero Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
          Documentation
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem', maxWidth: 600 }}>
          Complete wiki documentation for PresentationApp — a gamified learning platform with AI-powered content transformation.
        </Typography>
      </Box>

      {/* Source Badge */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 2, 
          mb: 4, 
          bgcolor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: 2,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Chip 
          label="Source" 
          size="small" 
          sx={{ bgcolor: '#1565c0', color: 'white', fontWeight: 600 }}
        />
        <Typography variant="body2" sx={{ color: '#1e40af' }}>
          Extracted from PresentationApp.md (1,123 lines) with 100% content coverage
        </Typography>
      </Paper>

      {/* Section Cards Grid */}
      <Grid container spacing={2.5}>
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Grid item xs={12} sm={6} key={section.href}>
              <Card 
                variant="outlined"
                sx={{ 
                  height: '100%',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: section.color,
                    boxShadow: `0 4px 12px ${section.color}20`,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <CardActionArea 
                  component={Link} 
                  href={section.href}
                  sx={{ height: '100%', alignItems: 'flex-start' }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box 
                        sx={{ 
                          p: 1, 
                          borderRadius: 2, 
                          bgcolor: `${section.color}12`,
                          display: 'flex',
                        }}
                      >
                        <Icon sx={{ color: section.color, fontSize: 24 }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}>
                          {section.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                          {section.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
