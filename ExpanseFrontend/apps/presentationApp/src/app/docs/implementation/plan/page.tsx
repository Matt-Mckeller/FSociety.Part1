import { Typography, Box, Paper, Stack, Divider, Card, CardContent, Grid, Chip } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';

const buildOrder = [
  {
    step: 1,
    title: 'Presentation App Shell & Infrastructure',
    description: 'Core layout, routing, authentication, and navigation',
    deliverables: [
      'Next.js app structure',
      'Fixed shell layout with regions',
      'Route configuration',
      'Authentication integration',
    ],
  },
  {
    step: 2,
    title: 'Presentations & Content',
    description: 'Starting with Introduction presentation',
    deliverables: [
      'Slide navigation',
      'Content block rendering',
      'URL-addressable slides',
      'Basic content display',
    ],
  },
  {
    step: 3,
    title: 'Game Layer Integration',
    description: 'Status bars, profile, and gamification UI',
    deliverables: [
      'Game UI overlay',
      'XP and currency display',
      'Profile status bar',
      'Quest panel structure',
    ],
  },
  {
    step: 4,
    title: 'Interaction Layer',
    description: 'Action bars, feedback, and panels',
    deliverables: [
      'Action bar categories',
      'Feedback input bar',
      'Configurable panels',
      'Context menu',
    ],
  },
  {
    step: 5,
    title: 'Real-Time Features',
    description: 'Presenter mode and live collaboration',
    deliverables: [
      'WebSocket integration',
      'Presenter sync',
      'Audience feedback aggregation',
      'Self-paced toggle',
    ],
  },
  {
    step: 6,
    title: 'AI Integration',
    description: 'AI actions, transformations, and chat',
    deliverables: [
      'AI action routing',
      'Content transformations',
      'Chat integration',
      'Response caching',
    ],
  },
];

export default function PlanPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Implementation Plan
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          High-level roadmap for building the PresentationApp.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <MapIcon sx={{ color: 'primary.main' }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Build Order
        </Typography>
      </Box>

      <Stack spacing={2}>
        {buildOrder.map((item) => (
          <Card key={item.step} variant="outlined">
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: 2, 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {item.step}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    {item.description}
                  </Typography>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                    {item.deliverables.map((deliverable) => (
                      <Chip 
                        key={deliverable}
                        label={deliverable}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem', mb: 0.5 }}
                      />
                    ))}
                  </Stack>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  );
}
