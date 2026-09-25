import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Divider, Card, CardContent, Grid, Stack } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const priorityCategories = [
  {
    priority: 'P0 - Must Have (MVP)',
    color: '#dc2626',
    features: [
      'Slide navigation and content display',
      'Basic action bar with AI actions',
      'User authentication',
      'Self-paced mode',
      'Content variant system (audience + accessibility)',
    ],
  },
  {
    priority: 'P1 - Should Have',
    color: '#f59e0b',
    features: [
      'Gamification UI (XP, levels, quests)',
      'Presenter mode with sync',
      'Feedback system',
      'Chat integration',
      'Panel system',
    ],
  },
  {
    priority: 'P2 - Nice to Have',
    color: '#3b82f6',
    features: [
      'Advanced analytics dashboard',
      'Drag-and-drop panel docking',
      'Content authoring tools',
      'Social features',
      'Advanced AI strategies',
    ],
  },
  {
    priority: 'P3 - Future',
    color: '#6b7280',
    features: [
      'Mobile native apps',
      'Offline support',
      'Third-party integrations',
      'Advanced reporting',
      'Custom theme builder',
    ],
  },
];

const mvpDeliverables = [
  { feature: 'Slide Display', status: 'required', notes: 'Core content rendering' },
  { feature: 'Navigation', status: 'required', notes: 'Section/slide navigation' },
  { feature: 'Authentication', status: 'required', notes: 'User login/logout' },
  { feature: 'Action Bar', status: 'required', notes: 'AI action categories' },
  { feature: 'Content Variants', status: 'required', notes: 'Audience + accessibility' },
  { feature: 'Self-Paced Mode', status: 'required', notes: 'Individual viewing' },
  { feature: 'Gamification UI', status: 'stretch', notes: 'XP, level display' },
  { feature: 'Feedback Input', status: 'stretch', notes: 'Quick reactions' },
];

export default function PrioritiesPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Priorities
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Feature prioritization and MVP scope definition.
        </Typography>
      </Box>

      {/* Priority Categories */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <PriorityHighIcon sx={{ color: 'error.main' }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Priority Matrix
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {priorityCategories.map((category) => (
          <Grid item xs={12} md={6} key={category.priority}>
            <Card 
              variant="outlined" 
              sx={{ 
                height: '100%',
                borderLeft: `4px solid ${category.color}`,
              }}
            >
              <CardContent>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 1.5,
                    color: category.color,
                  }}
                >
                  {category.priority}
                </Typography>
                <Stack spacing={0.5}>
                  {category.features.map((feature) => (
                    <Box key={feature} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: category.color }} />
                      <Typography variant="body2" color="text.secondary">
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* MVP Scope */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        MVP Scope
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Features required for minimum viable product launch.
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600 }}>Feature</TableCell>
              <TableCell sx={{ fontWeight: 600, width: 100 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mvpDeliverables.map((item) => (
              <TableRow key={item.feature}>
                <TableCell sx={{ fontWeight: 500 }}>{item.feature}</TableCell>
                <TableCell>
                  <Chip 
                    label={item.status} 
                    size="small"
                    sx={{ 
                      fontSize: '0.7rem',
                      bgcolor: item.status === 'required' ? '#dcfce7' : '#fef3c7',
                      color: item.status === 'required' ? '#166534' : '#92400e',
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>{item.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
