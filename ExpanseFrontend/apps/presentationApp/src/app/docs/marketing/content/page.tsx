import { Typography, Grid, Card, CardContent, CardActionArea, Box, Chip, Alert } from '@mui/material';
import Link from 'next/link';
import ArticleIcon from '@mui/icons-material/Article';
import TransformIcon from '@mui/icons-material/Transform';
import StrategyIcon from '@mui/icons-material/Psychology';

const sections = [
  {
    title: 'Content Types',
    description: 'Block types and content formats for authoring educational material',
    href: '/docs/marketing/content/types',
    icon: <ArticleIcon sx={{ fontSize: 32 }} />,
    status: 'complete',
  },
  {
    title: 'Content Pipelines',
    description: 'Personalization pipelines that transform content for different learners',
    href: '/docs/marketing/content/pipelines',
    icon: <TransformIcon sx={{ fontSize: 32 }} />,
    status: 'complete',
  },
  {
    title: 'Content Strategy',
    description: 'Editorial guidelines, content creation workflow, and quality standards',
    href: '/docs/marketing/content/strategy',
    icon: <StrategyIcon sx={{ fontSize: 32 }} />,
    status: 'placeholder',
  },
];

export default function ContentPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Content
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Content strategy, types, and transformation pipelines that enable personalized learning experiences.
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 4 }}>
        <strong>Content System:</strong> PresentationApp uses a layered content system where base content can be 
        transformed and personalized for different audiences, accessibility needs, languages, and learning styles. 
        This section covers the strategic aspects — for technical implementation, see {' '}
        <Link href="/docs/architecture" style={{ color: 'inherit' }}>Architecture</Link>.
      </Alert>

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

      {/* Content Layering Overview */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Content Layering System
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          All content passes through a layered merge system, allowing personalization at multiple levels.
        </Typography>
        <Box 
          sx={{ 
            p: 3, 
            bgcolor: '#1e293b',
            borderRadius: 2,
          }}
        >
          <Typography 
            component="pre" 
            sx={{ 
              fontFamily: '"Fira Code", monospace', 
              fontSize: 13, 
              m: 0,
              color: '#e2e8f0',
              lineHeight: 1.8,
            }}
          >
{`Base Content Layer (default authored content)
  └── Audience Layer (student/teacher/parent overrides)
       └── Accessibility Layer (ADHD/autism/dyslexia variants)
            └── Language Layer (i18n translations)
                 └── AI Cache Layer (cached AI transformations)`}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
