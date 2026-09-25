import { Typography, Grid, Card, CardContent, CardActionArea, Box, Chip } from '@mui/material';
import Link from 'next/link';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ChecklistIcon from '@mui/icons-material/Checklist';

const sections = [
  { 
    title: 'User Journeys', 
    href: '/docs/testing/user-journeys', 
    icon: DirectionsRunIcon, 
    color: '#8b5cf6', 
    description: 'End-to-end user flows and scenarios',
    status: 'placeholder',
  },
  { 
    title: 'Test Cases', 
    href: '/docs/testing/test-cases', 
    icon: ChecklistIcon, 
    color: '#10b981', 
    description: 'Unit, integration, and E2E test specifications',
    status: 'placeholder',
  },
];

export default function TestingPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Testing
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          User journeys and test case documentation for quality assurance.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {sections.map((section) => {
          const Icon = section.icon;
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
                  sx={{ height: '100%', p: 3 }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box 
                      sx={{ 
                        p: 1.5, 
                        borderRadius: 2, 
                        bgcolor: `${section.color}12`,
                        height: 'fit-content',
                      }}
                    >
                      <Icon sx={{ color: section.color, fontSize: 28 }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {section.title}
                        </Typography>
                        <Chip 
                          label={section.status} 
                          size="small" 
                          sx={{ 
                            height: 18, 
                            fontSize: '0.65rem', 
                            fontWeight: 600,
                            bgcolor: '#f1f5f9',
                            color: '#64748b',
                          }} 
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
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
