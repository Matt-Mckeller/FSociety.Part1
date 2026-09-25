import { Typography, Grid, Card, CardContent, CardActionArea, Box, Chip } from '@mui/material';
import Link from 'next/link';
import PeopleIcon from '@mui/icons-material/People';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import RadarIcon from '@mui/icons-material/Radar';

const sections = [
  {
    title: 'Audiences',
    description: 'Target user types and their specific content needs',
    href: '/docs/marketing/audiences',
    icon: <PeopleIcon sx={{ fontSize: 32 }} />,
    status: 'complete',
  },
  {
    title: 'Personas',
    description: 'Detailed user archetypes representing key segments',
    href: '/docs/marketing/personas',
    icon: <PersonSearchIcon sx={{ fontSize: 32 }} />,
    status: 'placeholder',
  },
  {
    title: 'Positioning',
    description: 'Market differentiation and competitive positioning',
    href: '/docs/marketing/positioning',
    icon: <RadarIcon sx={{ fontSize: 32 }} />,
    status: 'placeholder',
  },
];

export default function MarketingPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Marketing
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Target audiences, user personas, and market positioning that inform product decisions.
        </Typography>
      </Box>

      <Grid container spacing={3}>
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
    </>
  );
}
