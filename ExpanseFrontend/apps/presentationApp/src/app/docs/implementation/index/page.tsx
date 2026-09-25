import { Typography, Grid, Card, CardContent, CardActionArea, Box, Chip } from '@mui/material';
import Link from 'next/link';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import MapIcon from '@mui/icons-material/Map';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const sections = [
  { 
    title: 'Presets', 
    href: '/docs/implementation/presets', 
    icon: SettingsSuggestIcon, 
    color: '#8b5cf6', 
    description: 'Default configurations and presets',
    status: 'placeholder',
  },
  { 
    title: 'Plan', 
    href: '/docs/implementation/plan', 
    icon: MapIcon, 
    color: '#3b82f6', 
    description: 'High-level implementation roadmap',
    status: 'complete',
  },
  { 
    title: 'Priorities', 
    href: '/docs/implementation/priorities', 
    icon: PriorityHighIcon, 
    color: '#ef4444', 
    description: 'Feature prioritization and MVP scope',
    status: 'partial',
  },
  { 
    title: 'Strategies', 
    href: '/docs/implementation/strategies', 
    icon: PsychologyIcon, 
    color: '#10b981', 
    description: 'Technical implementation strategies',
    status: 'placeholder',
  },
  { 
    title: 'Phases', 
    href: '/docs/implementation/phases', 
    icon: AccountTreeIcon, 
    color: '#f59e0b', 
    description: 'Detailed build phases and milestones',
    status: 'complete',
  },
];

export default function ImplementationIndexPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Implementation
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Build plan, phases, priorities, and implementation strategies.
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
            <Grid item xs={12} sm={6} key={section.href}>
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
                  sx={{ height: '100%', p: 2.5 }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box 
                      sx={{ 
                        p: 1, 
                        borderRadius: 1.5, 
                        bgcolor: `${section.color}12`,
                        height: 'fit-content',
                      }}
                    >
                      <Icon sx={{ color: section.color, fontSize: 24 }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {section.title}
                        </Typography>
                        <Chip 
                          label={section.status} 
                          size="small" 
                          sx={{ 
                            height: 18, 
                            fontSize: '0.65rem', 
                            fontWeight: 600,
                            bgcolor: statusStyle.bg,
                            color: statusStyle.text,
                          }} 
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                        {section.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
