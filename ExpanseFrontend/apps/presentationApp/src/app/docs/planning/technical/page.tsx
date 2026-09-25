import { Typography, Grid, Card, CardContent, CardActionArea, Box, Chip, Stack } from '@mui/material';
import Link from 'next/link';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ExtensionIcon from '@mui/icons-material/Extension';
import SettingsIcon from '@mui/icons-material/Settings';
import ApiIcon from '@mui/icons-material/Api';
import SecurityIcon from '@mui/icons-material/Security';
import CloudIcon from '@mui/icons-material/Cloud';
import LanguageIcon from '@mui/icons-material/Language';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import ArticleIcon from '@mui/icons-material/Article';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SpeedIcon from '@mui/icons-material/Speed';

const sections = [
  { title: 'Types', href: '/docs/planning/technical/types', icon: CodeIcon, color: '#1565c0', description: 'TypeScript types and interfaces', status: 'placeholder' },
  { title: 'Data Models', href: '/docs/planning/technical/data-models', icon: StorageIcon, color: '#7c4dff', description: 'Entity definitions and relationships', status: 'complete' },
  { title: 'Design', href: '/docs/planning/technical/design', icon: DesignServicesIcon, color: '#00897b', description: 'System design patterns and decisions', status: 'placeholder' },
  { title: 'Architecture', href: '/docs/planning/technical/architecture', icon: ArchitectureIcon, color: '#f57c00', description: 'Technology stack and integration strategy', status: 'complete' },
  { title: 'UI Components', href: '/docs/planning/technical/ui-components', icon: WidgetsIcon, color: '#e91e63', description: 'New and existing Storybook components', status: 'complete' },
  { title: 'React Context', href: '/docs/planning/technical/react-context', icon: AccountTreeIcon, color: '#5c6bc0', description: 'Context providers and data architecture', status: 'placeholder' },
  { title: 'Modules', href: '/docs/planning/technical/modules', icon: ExtensionIcon, color: '#26a69a', description: 'Feature modules and organization', status: 'partial' },
  { title: 'Logic', href: '/docs/planning/technical/logic', icon: SettingsIcon, color: '#8d6e63', description: 'Business logic and algorithms', status: 'placeholder' },
  { title: 'APIs', href: '/docs/planning/technical/apis', icon: ApiIcon, color: '#c62828', description: 'Backend API endpoints and contracts', status: 'partial' },
  { title: 'Security & Privacy', href: '/docs/planning/technical/security-privacy', icon: SecurityIcon, color: '#ffc107', description: 'Authentication, authorization, data protection', status: 'placeholder' },
  { title: 'Scaling', href: '/docs/planning/technical/scaling', icon: CloudIcon, color: '#78909c', description: 'Scalability and infrastructure', status: 'placeholder' },
  { title: 'Internationalization', href: '/docs/planning/technical/internationalization', icon: LanguageIcon, color: '#1565c0', description: 'Multi-language support and i18n', status: 'complete' },
  { title: 'Accessibility', href: '/docs/planning/technical/accessibility', icon: AccessibilityIcon, color: '#7c4dff', description: 'Accessibility modes and compliance', status: 'complete' },
  { title: 'Logging', href: '/docs/planning/technical/logging', icon: ArticleIcon, color: '#00897b', description: 'Application logging strategy', status: 'placeholder' },
  { title: 'Observability', href: '/docs/planning/technical/observability', icon: MonitorHeartIcon, color: '#f57c00', description: 'Monitoring, tracing, and debugging', status: 'placeholder' },
  { title: 'Analytics', href: '/docs/planning/technical/analytics', icon: AnalyticsIcon, color: '#e91e63', description: 'User telemetry and learning analytics', status: 'complete' },
  { title: 'Performance', href: '/docs/planning/technical/performance', icon: SpeedIcon, color: '#388e3c', description: 'Performance optimization strategies', status: 'placeholder' },
];

export default function TechnicalIndexPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Technical Planning
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          How we're building it. Architecture, data models, APIs, and technical specifications.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {sections.map((section) => {
          const Icon = section.icon;
          const statusColors: Record<string, { bg: string; text: string }> = {
            complete: { bg: '#dcfce7', text: '#166534' },
            partial: { bg: '#fef3c7', text: '#92400e' },
            placeholder: { bg: '#f1f5f9', text: '#64748b' },
          };
          const statusStyle = statusColors[section.status];
          
          return (
            <Grid item xs={12} sm={6} lg={4} key={section.href}>
              <Card 
                variant="outlined"
                sx={{ 
                  height: '100%',
                  transition: 'all 0.2s ease',
                  opacity: section.status === 'placeholder' ? 0.75 : 1,
                  '&:hover': {
                    borderColor: section.color,
                    transform: 'translateY(-2px)',
                    boxShadow: 1,
                  },
                }}
              >
                <CardActionArea 
                  component={Link} 
                  href={section.href}
                  sx={{ height: '100%' }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      <Box 
                        sx={{ 
                          p: 0.75, 
                          borderRadius: 1.5, 
                          bgcolor: `${section.color}12`,
                          height: 'fit-content',
                        }}
                      >
                        <Icon sx={{ color: section.color, fontSize: 18 }} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                            {section.title}
                          </Typography>
                          <Chip 
                            label={section.status} 
                            size="small" 
                            sx={{ 
                              height: 16, 
                              fontSize: '0.6rem', 
                              fontWeight: 600,
                              bgcolor: statusStyle.bg,
                              color: statusStyle.text,
                            }} 
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', lineHeight: 1.4 }}>
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
