import { Typography, Grid, Card, CardContent, CardActionArea, Box, Paper, Chip } from '@mui/material';
import Link from 'next/link';
import InventoryIcon from '@mui/icons-material/Inventory';
import CodeIcon from '@mui/icons-material/Code';

const sections = [
  {
    title: 'Product',
    href: '/docs/planning/product',
    description: 'Requirements, features, audiences, goals, and business decisions',
    icon: InventoryIcon,
    color: '#1565c0',
    items: 11,
  },
  {
    title: 'Technical',
    href: '/docs/planning/technical',
    description: 'Architecture, data models, APIs, infrastructure, and technical specifications',
    icon: CodeIcon,
    color: '#7c4dff',
    items: 17,
  },
];

export default function PlanningIndexPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Planning
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          All planning documentation organized into Product (what we're building and why) and 
          Technical (how we're building it).
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Grid item xs={12} md={6} key={section.href}>
              <Card 
                variant="outlined"
                sx={{ 
                  height: '100%',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: section.color,
                    boxShadow: `0 4px 20px ${section.color}20`,
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                <CardActionArea 
                  component={Link} 
                  href={section.href}
                  sx={{ height: '100%', p: 1 }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box 
                        sx={{ 
                          p: 1.5, 
                          borderRadius: 2, 
                          bgcolor: `${section.color}15`,
                        }}
                      >
                        <Icon sx={{ color: section.color, fontSize: 32 }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                          <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            {section.title}
                          </Typography>
                          <Chip 
                            label={`${section.items} sections`} 
                            size="small" 
                            sx={{ bgcolor: `${section.color}15`, color: section.color, fontWeight: 500 }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
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
