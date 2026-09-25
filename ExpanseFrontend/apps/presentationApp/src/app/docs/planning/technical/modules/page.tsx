import { Typography, Box, Card, CardContent, Grid, Chip, Stack, Divider } from '@mui/material';

const modules = [
  {
    name: 'Content System',
    description: 'Block-based content management with versioning and variants',
    status: 'planned',
    features: ['ContentBlock CRUD', 'Version history', 'Variant management', 'AI transformation cache'],
  },
  {
    name: 'Slide Engine',
    description: 'Core slide rendering and navigation',
    status: 'planned',
    features: ['Slide registry', 'Block rendering', 'Navigation controls', 'URL-based routing'],
  },
  {
    name: 'AI Actions',
    description: 'AI-powered content transformations and assistance',
    status: 'planned',
    features: ['Multi-provider routing', 'Action bar UI', 'Response caching', 'Context injection'],
  },
  {
    name: 'Game System',
    description: 'Gamification layer with XP, quests, and rewards',
    status: 'existing',
    features: ['XP & leveling', 'Quest tracking', 'Inventory', 'Achievements'],
  },
  {
    name: 'Presenter Mode',
    description: 'Real-time slide sync and audience management',
    status: 'planned',
    features: ['WebSocket sync', 'Audience view', 'Feedback aggregation', 'Pacing controls'],
  },
  {
    name: 'Analytics',
    description: 'User telemetry and learning analytics',
    status: 'planned',
    features: ['Event tracking', 'Modality profiling', 'Engagement metrics', 'Presenter dashboard'],
  },
  {
    name: 'Accessibility',
    description: 'Multi-mode accessibility support',
    status: 'planned',
    features: ['ADHD mode', 'Dyslexia mode', 'Screen reader', 'Keyboard navigation'],
  },
  {
    name: 'Chat System',
    description: 'AI-powered contextual chat',
    status: 'existing',
    features: ['Chat UI', 'Message history', 'AI responses', 'Context awareness'],
  },
];

const statusColors: Record<string, { bg: string; color: string }> = {
  planned: { bg: '#fef3c7', color: '#92400e' },
  existing: { bg: '#dcfce7', color: '#166534' },
  'in-progress': { bg: '#dbeafe', color: '#1e40af' },
};

export default function ModulesPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Modules
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Feature modules and their organization within the application architecture.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {modules.map((module) => {
          const status = statusColors[module.status];
          return (
            <Grid item xs={12} md={6} key={module.name}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {module.name}
                    </Typography>
                    <Chip 
                      label={module.status} 
                      size="small"
                      sx={{ 
                        bgcolor: status.bg, 
                        color: status.color, 
                        fontWeight: 600,
                        fontSize: '0.7rem',
                      }} 
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {module.description}
                  </Typography>
                  <Divider sx={{ mb: 1.5 }} />
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                    {module.features.map((feature) => (
                      <Chip 
                        key={feature}
                        label={feature} 
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem', mb: 0.5 }}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
