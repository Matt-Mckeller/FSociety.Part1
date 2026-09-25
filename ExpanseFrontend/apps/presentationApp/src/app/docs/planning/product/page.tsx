import { Typography, Grid, Card, CardContent, CardActionArea, Box, Chip, Stack } from '@mui/material';
import Link from 'next/link';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import FlagIcon from '@mui/icons-material/Flag';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import ExtensionIcon from '@mui/icons-material/Extension';
import DiamondIcon from '@mui/icons-material/Diamond';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const sections = [
  { title: 'Knowledge & Wiki', href: '/docs/planning/product/knowledge-wiki', icon: MenuBookIcon, color: '#1565c0', description: 'Project overview and design principles', status: 'complete' },
  { title: 'Questions & Decisions', href: '/docs/planning/product/questions-decisions', icon: HelpOutlineIcon, color: '#7c4dff', description: 'Open questions, decisions made, important notes', status: 'placeholder' },
  { title: 'UX Details', href: '/docs/planning/product/ux-details', icon: TouchAppIcon, color: '#00897b', description: 'User experience specifications and interaction design', status: 'complete' },
  { title: 'Goals', href: '/docs/planning/product/goals', icon: FlagIcon, color: '#f57c00', description: 'Project objectives and success criteria', status: 'complete' },
  { title: 'Audiences', href: '/docs/planning/product/audiences', icon: PeopleIcon, color: '#e91e63', description: 'Target user types and their needs', status: 'complete' },
  { title: 'Technology Choices', href: '/docs/planning/product/technology-choices', icon: SettingsIcon, color: '#5c6bc0', description: 'Technology stack and dependency decisions', status: 'complete' },
  { title: 'Infrastructure', href: '/docs/planning/product/infrastructure', icon: CloudIcon, color: '#26a69a', description: 'Hosting, deployment, and infrastructure setup', status: 'placeholder' },
  { title: 'Databases', href: '/docs/planning/product/databases', icon: StorageIcon, color: '#8d6e63', description: 'Database selection and data storage strategy', status: 'placeholder' },
  { title: 'Features', href: '/docs/planning/product/features', icon: ExtensionIcon, color: '#c62828', description: '15 core feature modules fully documented', status: 'complete' },
  { title: 'Value Statements', href: '/docs/planning/product/value-statements', icon: DiamondIcon, color: '#ffc107', description: 'Value propositions and business offerings', status: 'placeholder' },
  { title: 'Feature Dependencies', href: '/docs/planning/product/feature-dependencies', icon: AccountTreeIcon, color: '#78909c', description: 'Interdependency hierarchy and build order', status: 'partial' },
];

export default function ProductIndexPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Product Planning
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          What we're building and why. Requirements, features, audiences, goals, and business decisions.
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
                        <Icon sx={{ color: section.color, fontSize: 20 }} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
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
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', lineHeight: 1.4 }}>
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
